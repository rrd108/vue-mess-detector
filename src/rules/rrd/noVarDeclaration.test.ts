import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoVarDeclaration, reportNoVarDeclaration } from './noVarDeclaration'

describe('checkNoVarDeclaration', () => {
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
    const result = reportNoVarDeclaration()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with a single var declaration', () => {
    const script = {
      content: `
        var x = 5;
      `,
    } as SFCScriptBlock
    const fileName = 'noVarDeclaration-single.vue'
    checkNoVarDeclaration(script, fileName)
    const result = reportNoVarDeclaration()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #2 <bg_warn>Avoid using 'var' for variable declarations: var x = 5;</bg_warn> 🚨`,
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
    const result = reportNoVarDeclaration()
    expect(result.length).toBe(4)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #2 <bg_warn>Avoid using 'var' for variable declarations: var a = 1;</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #3 <bg_warn>Avoid using 'var' for variable declarations: var b = 2;</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #4 <bg_warn>Avoid using 'var' for variable declarations: var c = 3;</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `line #5 <bg_warn>Avoid using 'var' for variable declarations: var d = a + b;</bg_warn> 🚨`,
      },
    ])
  })
})
