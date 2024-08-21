import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkNoVarDeclaration, reportNoVarDeclaration, resetNoVarDeclaration } from './noVarDeclaration'

describe('checkNoVarDeclaration', () => {
  beforeEach(() => {
    resetNoVarDeclaration()
  })

  it('should not report files with no var declarations', () => {
    const script = {
      content: `
        const x = 5;
        let y = 10;
        function test() {
          const z = x + y;
        }
      `,
    } as SFCScriptBlock
    const fileName = 'noVarDeclaration.vue'
    checkNoVarDeclaration(script, fileName)
    expect(reportNoVarDeclaration().length).toBe(0)
    expect(reportNoVarDeclaration()).toStrictEqual([])
  })

  it('should report files with a single var declaration', () => {
    const script = {
      content: `
        var x = 5;
      `,
    } as SFCScriptBlock
    const fileName = 'noVarDeclaration-single.vue'
    checkNoVarDeclaration(script, fileName)
    expect(reportNoVarDeclaration().length).toBe(1)
    expect(reportNoVarDeclaration()).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #2 ${BG_WARN}Avoid using 'var' for variable declarations: var x = 5;${BG_RESET} 🚨`,
      },
    ])
  })

  it('should report files with multiple var declarations', () => {
    const script = {
      content: `
        var a = 1;
        var b = 2;
        var c = 3;
        var d = a + b;
      `,
    } as SFCScriptBlock
    const fileName = 'noVarDeclaration-multiple.vue'
    checkNoVarDeclaration(script, fileName)
    expect(reportNoVarDeclaration().length).toBe(4)
    expect(reportNoVarDeclaration()).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #2 ${BG_WARN}Avoid using 'var' for variable declarations: var a = 1;${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #3 ${BG_WARN}Avoid using 'var' for variable declarations: var b = 2;${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #4 ${BG_WARN}Avoid using 'var' for variable declarations: var c = 3;${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #5 ${BG_WARN}Avoid using 'var' for variable declarations: var d = a + b;${BG_RESET} 🚨`,
      },
    ])
  })
})
