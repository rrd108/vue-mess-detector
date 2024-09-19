import { describe, expect, it, vi } from 'vitest'
import { RULES } from '../rules/rules'
import coerceRules from './coerceRules'

describe('coerceRules', () => {
  const applyCoerceRules = coerceRules('apply')

  it('returns all rules when no argument is provided', () => {
    const result = applyCoerceRules()
    expect(result).toEqual(Object.keys(RULES))
  })

  it('correctly applies individual rules', () => {
    const result = applyCoerceRules('implicitParentChildCommunication,bigVif')
    expect(result).toEqual(expect.arrayContaining(['implicitParentChildCommunication', 'bigVif']))
  })

  it('correctly applies rulesets', () => {
    const result = applyCoerceRules('vue-caution')
    expect(result).toEqual(expect.arrayContaining(['implicitParentChildCommunication', 'implicitParentChildCommunication']))
  })

  it('correctly applies a mix of rulesets and individual rules', () => {
    const result = applyCoerceRules('vue-caution,bigVif')
    expect(result).toEqual(expect.arrayContaining(['implicitParentChildCommunication', 'elementSelectorsWithScoped', 'bigVif']))
  })

  it('logs an error and exits for invalid rules', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const processSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

    applyCoerceRules('gauranga')

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid apply values: gauranga'),
    )
    expect(processSpy).toHaveBeenCalledWith(1)

    consoleSpy.mockRestore()
    processSpy.mockRestore()
  })
})
