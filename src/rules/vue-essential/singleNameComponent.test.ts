import { describe, expect, it } from 'vitest'
import { checkSingleNameComponent, reportSingleNameComponent } from './singleNameComponent'

describe('checkSingleNameComponent', () => {
  it('ignores pages directory', () => {
    checkSingleNameComponent('pages/SomeComponent.vue')
    expect(reportSingleNameComponent().length).toBe(0)
    expect(reportSingleNameComponent()).toStrictEqual([])
  })

  it('ignores App.vue', () => {
    checkSingleNameComponent('components/App.vue')
    expect(reportSingleNameComponent().length).toBe(0)
    expect(reportSingleNameComponent()).toStrictEqual([])
  })

  it('ignores multi-word component', () => {
    checkSingleNameComponent('components/AppHeader.vue')
    expect(reportSingleNameComponent().length).toBe(0)
    expect(reportSingleNameComponent()).toStrictEqual([])
  })

  it('detects single name component', () => {
    checkSingleNameComponent('components/Header.vue')
    expect(reportSingleNameComponent().length).toBe(1)
    expect(reportSingleNameComponent()).toStrictEqual([{
      file: 'components/Header.vue',
      rule: `<text_info>vue-essential ~ single name component</text_info>`,
      description: `👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `Component name is <bg_err>single word</bg_err> 🚨`,
    }])
  })
})
