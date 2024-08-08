import { beforeEach, describe, expect, it } from 'vitest'

import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
      description: `👉 ${TEXT_WARN}Rename the component to use multi-word name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`,
      message: `🚨`,
    }])
  })
})
