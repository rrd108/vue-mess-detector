import { describe, expect, it, vi } from 'vitest';
import { SFCScriptBlock } from '@vue/compiler-sfc';
import { checkShortVariableName, reportShortVariableName } from './shortVariableName';
import { BG_RESET, BG_WARN } from '../asceeCodes';

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('shortVariableName', () => {
  it('should not report files where variable names are not too short', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        const isLoading = ref(false);
        </script>
      `
    } as SFCScriptBlock;
    const filename = 'not-short-variable-name.vue';
    checkShortVariableName(script, filename);
    expect(reportShortVariableName()).toBe(0);
    expect(mockConsoleLog).not.toHaveBeenCalled();
  })

  it('should report files where one variable is too short', () => {
    const script = {
      content: `
        <script setup>
        let age = 10;
        </script>
      `
    } as SFCScriptBlock;
    const filename = 'short-variable-name.vue';
    const variable = 'age';
    checkShortVariableName(script, filename);
    expect(reportShortVariableName()).toBe(1);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${filename} 🚨 ${BG_WARN}(${variable})${BG_RESET}`);
  })
  
  it('should report files where more than one variable are too short', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        const age = ref(10);
        let gps = ref(null);
        var isLoading = false;
        const lng = 5;
        </script>
      `
    } as SFCScriptBlock;
    const filename = 'multiple-short-variable-name.vue';
    const variable = 'lng';
    checkShortVariableName(script, filename);
    expect(reportShortVariableName()).toBe(4);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${filename} 🚨 ${BG_WARN}(${variable})${BG_RESET}`);
  })
})