import { describe, expect, it, vi } from 'vitest'
import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { checkVifWithVfor, reportVifWithVfor } from './vifWithVfor'
import { BG_ERR, BG_RESET } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkVifWithVfor', () => {
  it('should not report files where v-for and v-if is not used together', () => {
    const script = {
      content: `<template>
      <div v-if="isActive">
        <ul>
            <li v-for="user in activeUsers">
                {{ user.name }}
            </li>
        </ul>
      </div>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'separate-vif-vfor.vue'
    checkVifWithVfor(script, fileName)
    expect(reportVifWithVfor()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files where v-for is used with v-if', () => {
    const script = {
      content: `<template>
      <ul>
      <li
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vif-with-vfor.vue'
    checkVifWithVfor(script, fileName)
    expect(reportVifWithVfor()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${BG_ERR}${fileName}${BG_RESET}`)
  })
})
