import { describe, expect, it, vi } from 'vitest'
import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET } from '../asceeCodes'
import { checkTemplateSimpleExpression, reportTemplateSimpleExpression } from './templateSimpleExpression'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkTemplateSimpleExpression', () => {
  it('should not report files where template expression is simple', () => {
    const script = {
      content: `<template>
      {{ normalizedFullName }}
      {{ chantGauranga }}
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'simple-expression.vue'
    checkTemplateSimpleExpression(script, fileName)
    expect(reportTemplateSimpleExpression()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files where template expression is not simple', () => {
    const script = {
      content: `<template>
        <div>
          {{
            fullName.split(' ').filter((word, idx) => word).map((word) => {
                return word[0].toUpperCase() + word.slice(1)
            }).join(' ')
          }}
        </div>
      </template>`,
    } as SFCTemplateBlock
    const fileName = 'not-simple-expression.vue'
    const lineNumber = 4;
    checkTemplateSimpleExpression(script, fileName)
    expect(reportTemplateSimpleExpression()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} (Line ${lineNumber}) 🚨`)
  })
})
