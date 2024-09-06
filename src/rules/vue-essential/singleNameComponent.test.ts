import { beforeEach, describe, expect, it } from 'vitest'

import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkSingleNameComponent, reportSingleNameComponent, resetSingleNameComponent } from './singleNameComponent'

describe('checkSingleNameComponent', () => {
  beforeEach(() => {
    resetSingleNameComponent()
  })

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
      rule: `${TEXT_INFO}vue-essential ~ single name component${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `Component name is ${BG_ERR}single word${BG_RESET} 🚨`,
    }])
  })
})
