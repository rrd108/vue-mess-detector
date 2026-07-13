import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkComputedSideEffects } from './rules/rrd/computedSideEffects'
import { checkMagicNumbers } from './rules/rrd/magicNumbers'
import { reportRules } from './rulesReport'

// The rule key in the output includes <text_info> tags from the offense.rule field
const MAGIC_NUMBERS_KEY = '<text_info>rrd ~ magic numbers</text_info>'
const COMPUTED_SIDE_EFFECTS_KEY = '<text_info>rrd ~ computed side effects</text_info>'

describe('reportRules — empty groups not displayed (issue #346)', () => {
  it('should include groups that have offenses in the output', () => {
    // magicNumbers produces <bg_warn> messages (warnings)
    const script = { content: 'if (ms < 100) { }' } as SFCScriptBlock
    const fileName = 'test-with-warning.vue'
    checkMagicNumbers(script, fileName)

    const { output } = reportRules('rule', 'desc', 'all', {} as any)

    // magic numbers group should be present
    expect(output[MAGIC_NUMBERS_KEY]).toBeDefined()
    expect(output[MAGIC_NUMBERS_KEY].length).toBeGreaterThan(0)
  })

  it('should not output empty groups when level=error filters out all warnings', () => {
    // magicNumbers produces <bg_warn> messages (warnings), not <bg_err>
    const script = { content: 'if (ms < 100) { }' } as SFCScriptBlock
    const fileName = 'test-warning-only.vue'
    checkMagicNumbers(script, fileName)

    // level=error filters out warnings, so the group should NOT appear
    const { output } = reportRules('rule', 'desc', 'error', {} as any)

    expect(output[MAGIC_NUMBERS_KEY]).toBeUndefined()
  })

  it('should include error-level groups even when level=error', () => {
    // computedSideEffects produces <bg_err> messages (errors)
    const script = { content: 'const c = computed(() => { let total = 0; total = 1; return total })' } as SFCScriptBlock
    const fileName = 'test-with-error.vue'
    checkComputedSideEffects(script, fileName)

    const { output } = reportRules('rule', 'desc', 'error', {} as any)

    expect(output[COMPUTED_SIDE_EFFECTS_KEY]).toBeDefined()
    expect(output[COMPUTED_SIDE_EFFECTS_KEY].length).toBeGreaterThan(0)
  })
})
