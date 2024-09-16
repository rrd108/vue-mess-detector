import { describe, expect, it } from 'vitest'
import { skipComments } from './skipComments'

// Helper function to normalize whitespace while preserving new lines
const normalizeWhitespace = (str: string) =>
  str.split('\n').map(line => line.trim()).join('\n').trim()

describe('skipComments', () => {
  it('should not affect code without comments', () => {
    const input = `const x = 5
        const y = 10`
    const expected = `const x = 5
        const y = 10`
    expect(skipComments(input)).toBe(expected)
  })

  it('should remove single-line comments', () => {
    const input = `const x = 5 // This is a comment
        const y = 10`
    const expected = `const x = 5 
        const y = 10`
    expect(skipComments(input)).toBe(expected)
  })

  it('should remove multi-line comments', () => {
    const input = `const x = 5
        /* This is a
        multi-line comment */
        const y = 10`
    const expected = `const x = 5
        
    
        const y = 10`
    console.info(skipComments(input))
    expect(normalizeWhitespace(skipComments(input))).toBe(normalizeWhitespace(expected))
  })

  it('should handle mixed comments', () => {
    const input = `// Single line
        const x = 5
        /* Multi-line */
        const y = 10 // End of line`
    const expected = `
        const x = 5

        const y = 10 `
    expect(normalizeWhitespace(skipComments(input))).toBe(normalizeWhitespace(expected))
  })
})
