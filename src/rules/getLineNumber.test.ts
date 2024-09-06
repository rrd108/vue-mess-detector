import { describe, expect, it } from 'vitest'
import getLineNumber from './getLineNumber'

describe('getLineNumber', () => {
  it('should return the correct line number for a single-line pattern', () => {
    const source = `line1\nline2\nline3\nline4`
    const pattern = 'line2'
    expect(getLineNumber(source, pattern)).toBe(2)
  })

  it('should return the correct line numbers for a single-line pattern multiple results', () => {
    const source = `line1
        rrd     // line 2
        line3
        rrd     // line 4
        line5`
    const pattern = 'rrd'
    const firstResultLineNumber = 2
    expect(getLineNumber(source, pattern)).toBe(firstResultLineNumber)
    expect(getLineNumber(source, pattern, firstResultLineNumber)).toBe(4)
  })

  it('should return the correct line numbers for a multi-line pattern multiple results', () => {
    const source = `line 1
        line 2
        rrd
        gauranga
        line 5
        line 6
        rrd
        gauranga
        line 9`

    const pattern = `rrd
        gauranga`

    const firstResultLineNumber = 3
    expect(getLineNumber(source, pattern)).toBe(firstResultLineNumber)
    expect(getLineNumber(source, pattern, firstResultLineNumber)).toBe(7)
  })

  it('should return the correct line number when using the from parameter', () => {
    const source = `line1
        line2
        pattern
        line4
        pattern
        line6`
    const pattern = 'pattern'
    expect(getLineNumber(source, pattern)).toBe(3)
    expect(getLineNumber(source, pattern, 3)).toBe(5)
  })
})
