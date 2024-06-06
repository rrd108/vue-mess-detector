import { describe, expect, it, vi } from 'vitest'
import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET } from '../asceeCodes'
import { checkVforNoKey, reportVforNoKey } from './vforNoKey'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkVforNoKey', () => {
  it('should not report files where v-for has key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li
            v-for="todo in todos"
            :key="todo.id"
        >
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-with-key.vue'
    checkVforNoKey(script, fileName)
    expect(reportVforNoKey()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files where v-for has no key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-no-key.vue'
    checkVforNoKey(script, fileName)
    expect(reportVforNoKey()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} 🚨`)
  })
})
