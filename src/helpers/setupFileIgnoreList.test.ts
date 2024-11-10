import type minimatch from 'minimatch'
import { describe, expect, it, vi } from 'vitest'
import { checkFileIgnoreRules } from './setupFileIgnoreList'

// Use `importActual` to partially mock `minimatch`
vi.mock('minimatch', async () => {
  const actual = await vi.importActual<typeof minimatch>('minimatch')
  return {
    ...actual,
    default: (filePath: string, pattern: string) => filePath === pattern,
  }
})

describe('checkFileIgnoreRules', () => {
  it('should return apply unchanged if no matching rules in fileIgnoreRules (Scenario 1)', () => {
    const filePath = 'test/file/path'
    const fileIgnoreRules = {} // No ignore rules
    const _apply = ['rule1', 'rule3']
    const result = checkFileIgnoreRules(filePath, fileIgnoreRules, _apply)
    expect(result).toEqual(_apply) // Should return unchanged
  })

  it('should remove matching rules from apply if they exist in fileIgnoreRules (Scenario 2)', () => {
    const filePath = 'test/file/path'
    const fileIgnoreRules = {
      'test/file/path': 'rule1, rule3', // Matching rules
    }
    const _apply = ['rule1', 'rule2', 'rule3']
    const result = checkFileIgnoreRules(filePath, fileIgnoreRules, _apply)
    expect(result).toEqual(['rule2']) // Should remove 'rule1' and 'rule3'
  })

  it('should remove rules from apply if fileIgnoreRules has rulesets containing those rules (Scenario 3)', () => {
    const filePath = 'test/file/path'
    const fileIgnoreRules = {
      'test/file/path': 'vue-caution', // ruleSet1 contains rule1 and rule2
    }
    const _apply = ['rule1', 'rule2', 'elementSelectorsWithScoped', 'implicitParentChildCommunication']
    const result = checkFileIgnoreRules(filePath, fileIgnoreRules, _apply)
    expect(result).toEqual(['rule1', 'rule2']) // Should remove 'elementSelectorsWithScoped' and 'implicitParentChildCommunication'
  })
})
