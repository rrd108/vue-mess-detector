import fs from 'node:fs/promises'
import path from 'node:path'
import { execa } from 'execa'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { normalizePath } from './helpers/normalizePath'
import { BG_ERR, BG_INFO, BG_RESET, TEXT_INFO, TEXT_RESET } from './rules/asceeCodes'

describe('yarn analyze command with default configuration', () => {
  it('should execute without any flags and path', async () => {
    const { stdout } = await execa('yarn', ['analyze'])
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
    expect(stdout).toContain(`Functions must be shorter than`)
  })

  it('should execute without any flags with path', async () => {
    const { stdout } = await execa('yarn', ['analyze', './'])
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should error out when both apply and ignore are used', async () => {
    try {
      await execa('yarn', ['analyze', '--ignore=vue-strong', '--apply=rrd'])
    }
    catch (error: any) {
      expect(error.stderr).toContain('Cannot use both --ignore and --apply options together.')
      expect(error.exitCode).toBe(1)
    }
  })

  it('should report error for invalid ignore rulesets and exit with code 1', async () => {
    try {
      await execa('yarn', ['analyze', '--ignore=gauranga,vue-strong'])
    }
    catch (error) {
      expect((error as any).stderr).toContain('Invalid ignore values: gauranga')
      expect((error as any).exitCode).toBe(1)
    }
  })

  it('should execute with valid ignore rulesets', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--ignore=vue-strong,rrd'])
    expect(stderr).not.toContain('Invalid ignore values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid ignore rules', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--ignore=functionSize'])
    expect(stderr).not.toContain('Invalid ignore values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid ignore rulesets and individual rules', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--ignore=rrd,nestedTernary'])
    expect(stderr).not.toContain('Invalid ignore values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid ignore individual rules and rulesets', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--ignore=functionSize,vue-essential'])
    expect(stderr).not.toContain('Invalid ignore values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should report error for invalid apply rulesets and exit with code 1', async () => {
    try {
      await execa('yarn', ['analyze', '--apply=gauranga,vue-strong'])
    }
    catch (error) {
      expect((error as any).stderr).toContain('Invalid apply values: gauranga')
      expect((error as any).exitCode).toBe(1)
    }
  })

  it('should execute with valid apply rulesets', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--apply=vue-strong,rrd'])
    expect(stderr).not.toContain('Invalid apply values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid apply rules', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--apply=nestedTernary,functionSize,topLevelElementOrder'])
    expect(stderr).not.toContain('Invalid apply values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid apply rulesets and individual rules', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--apply=vue-strong,nestedTernary'])
    expect(stderr).not.toContain('Invalid apply values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should execute with valid apply individual rules and rulesets', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', '--apply=magicNumbers,vue-essential'])
    expect(stderr).not.toContain('Invalid apply values')
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
  })

  it('should output json', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--output=json'])
    expect(stdout).toContain(`Analyzing Vue, TS and JS files in`)
    expect(stdout).toContain(`codeHealthOutput`)
  })

  it('should execute with group parameter', async () => {
    const { stdout } = await execa('yarn', ['analyze', './src/rules/vue-caution', '--group=file'])
    expect(stdout).toContain(`Functions must be shorter than`)
  })

  it('should execute with sort parameter', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--sort=asc'])
    expect(stdout).toContain(`Analyzing Vue, TS and JS files in`)
  })

  it('should execute with level parameter', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--level=error'])
    expect(stdout).toContain(`Analyzing Vue, TS and JS files in`)
  })

  it('should execute with exclude parameter', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--exclude=helpers'])
    expect(stdout).toContain('Excluding helpers')
  })

  it('should execute with exclude wildcard for test files', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--apply=rrd', '--level=error', '--exclude=*.test.ts'])
    const normalizedStdout = normalizePath(stdout)
    expect(normalizedStdout).toContain('Excluding *.test.ts')
    expect(normalizedStdout).toContain('Analyzing src/rules/rrd/complicatedConditions.ts...')
    expect(normalizedStdout).not.toContain('Analyzing src/rules/rrd/complicatedConditions.test.ts...')
    expect(normalizedStdout).not.toContain('Analyzing src/helpers/skipComments.test.ts...')
  })

  it('should execute with exclude wildcard for a subdirectory', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--exclude=src/rules/security/*'])
    const normalizedStdout = normalizePath(stdout)
    expect(normalizedStdout).toContain('Excluding src/rules/security/*')
    expect(normalizedStdout).not.toContain('Analyzing src/rules/security/apiWithoutMethod.test.ts...')
  })

  it('should execute with multiple exclude patterns', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--exclude=src/rules/*.test.ts,src/rules/rrd/*'])
    const normalizedStdout = normalizePath(stdout)
    expect(normalizedStdout).toContain('Excluding src/rules/*.test.ts,src/rules/rrd/*')
    expect(normalizedStdout).not.toContain('Analyzing src/rules/getLineNumber.test.ts...')
    expect(normalizedStdout).not.toContain('Analyzing src/rules/rrd/complicatedConditions.test.ts...')
  })

  it('should execute with table output', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--output=table'])
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
    // expect(stdout).toContain('┌─') // Table border character
  })

  it('should error out when invalid value is used for a flag', async () => {
    try {
      await execa('yarn', ['analyze', '--output=gauranga'])
      // If the command doesn't throw, fail the test
      expect(true).toBe(false)
    }
    catch (error) {
      expect((error as any).stderr).toContain(`Invalid option ${BG_ERR}gauranga${BG_RESET} provided for flag ${TEXT_INFO}outputFormat${TEXT_RESET}. Valid options are: ${BG_INFO}text, json, table${BG_RESET}.`)
    }
  })
})

describe('yarn analyze command with configuration file', () => {
  const projectRoot = path.resolve(__dirname, '..')
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const config = JSON.stringify({
    apply: 'vue-strong,vue-recommended',
    level: 'error',
  }, null, 2)

  beforeAll(async () => {
    await fs.writeFile(configPath, config)
  })

  afterAll(async () => {
    await fs.unlink(configPath)
  })

  it('should execute without any flags and path', async () => {
    const { stdout } = await execa('yarn', ['analyze'])
    expect(stdout).toContain(`👉 Using configuration from ${BG_INFO}vue-mess-detector.json${BG_RESET}`)
    expect(stdout).toContain('Analyzing Vue, TS and JS files in ')
    expect(stdout).toContain(`Applying 2 rulesets: ${BG_INFO}vue-recommended, vue-strong${BG_RESET}`)
  })

  it('should error out when both apply and ignore are used', async () => {
    try {
      await execa('yarn', ['analyze', '--ignore=vue-strong'])
    }
    catch (error: any) {
      expect(error.stderr).toContain('Cannot use both --ignore and --apply options together.')
      expect(error.exitCode).toBe(1)
    }
  })
})

describe('yarn analyze command with conflicting flags in configuration file', () => {
  const projectRoot = path.resolve(__dirname, '..')
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const config = JSON.stringify({
    apply: 'vue-strong,vue-recommended',
    ignore: 'rrd',
  }, null, 2)

  beforeAll(async () => {
    await fs.writeFile(configPath, config)
  })

  afterAll(async () => {
    await fs.unlink(configPath)
  })

  it('should error out when both apply and ignore are used', async () => {
    try {
      await execa('yarn', ['analyze'])
    }
    catch (error: any) {
      expect(error.stderr).toContain('Cannot use both --ignore and --apply options together.')
      expect(error.exitCode).toBe(1)
    }
  })
})

describe('yarn analyze command with override in configuration file', () => {
  const projectRoot = path.resolve(__dirname, '..')
  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  const maxFunctionSize = 100
  const config = JSON.stringify({
    override: {
      maxFunctionSize,
    },
  }, null, 2)

  beforeAll(async () => {
    await fs.writeFile(configPath, config)
  })

  afterAll(async () => {
    await fs.unlink(configPath)
  })

  it('should execute with and use override', async () => {
    const { stdout } = await execa('yarn', ['analyze', '--apply=functionSize'])
    expect(stdout).toContain(`👉 Using configuration from ${BG_INFO}vue-mess-detector.json${BG_RESET}`)
  })
})
