import { describe, expect, it } from 'vitest'
import { checkSingleNameComponent, reportSingleNameComponent } from './singleNameComponent'

describe('checkSingleNameComponent', () => {
  it('ignores pages directory', () => {
    checkSingleNameComponent('pages/SomeComponent.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores App.vue', () => {
    checkSingleNameComponent('components/App.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores app.vue', () => {
    checkSingleNameComponent('components/app.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores index.vue', () => {
    checkSingleNameComponent('components/users/index.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it.todo('ignores [string].vue', () => {
    checkSingleNameComponent('components/[id].vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('ignores multi-word component', () => {
    checkSingleNameComponent('components/AppHeader.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('detects single name component', () => {
    checkSingleNameComponent('components/Header.vue')
    const result = reportSingleNameComponent()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: 'components/Header.vue',
      rule: `<text_info>vue-essential ~ single name component</text_info>`,
      description: `👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `Component name is <bg_err>single word</bg_err> 🚨`,
    }])
  })
})
