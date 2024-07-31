import { describe, expect, it } from 'vitest'
import { execa } from 'execa'

describe('yarn analyze command', () => {
  it('should report error for invalid ignore rules and exit with code 1', async () => {
    try {
      await execa('yarn', ['analyze', './test/', '--ignore=gauranga,vue-strong'])
    } catch (error) {
      expect((error as any).stderr).toContain('Invalid ignore values: gauranga')
      expect((error as any).exitCode).toBe(1)
    }
  })

  it('should execute with valid ignore rules', async () => {
    const { stdout, stderr } = await execa('yarn', ['analyze', './test/', '--ignore=vue-strong,rrd'])
    expect(stderr).not.toContain('Invalid ignore values')
    expect(stdout).toContain('Analyzing Vue files in ./test/')
  })
})
