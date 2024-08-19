import { beforeEach, describe, expect, it } from 'vitest';
import type { SFCScriptBlock } from '@vue/compiler-sfc';
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes';
import { checkNoPropDestructure, reportNoPropDestructure, resetNoPropDestructure } from './noPropDestructure';

describe('checkNoPropDestructure', () => {
  beforeEach(() => {
    resetNoPropDestructure();
  });

  it('should not report files without props destructuring', () => {
    const script = {
      content: `
      <script setup>
        const props = defineProps();
        const myProp = 'value';
      </script>
      `,
    } as SFCScriptBlock;
    const fileName = 'noPropDestructure.vue';
    checkNoPropDestructure(script, fileName);
    expect(reportNoPropDestructure().length).toBe(0);
    expect(reportNoPropDestructure()).toStrictEqual([]);
  });

  it('should report files with single props destructuring', () => {
    const script = {
      content: `
      <script setup>
        const { propA } = defineProps();
      </script>
      `,
    } as SFCScriptBlock;
    const fileName = 'noPropDestructure-single.vue';
    checkNoPropDestructure(script, fileName);
    const offenses = reportNoPropDestructure();
    expect(offenses.length).toBe(1);
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Prop Destructure${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = props\`.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 ${BG_WARN}props destructuring found: const { propA } = defineProps()${BG_RESET} 🚨`,
      },
    ]);
  });

  it('should report files with multiple props destructuring instances', () => {
    const script = {
      content: `
      <script setup>
        const { propA } = defineProps();
        const { propB } = defineProps();
      </script>
      `,
    } as SFCScriptBlock;
    const fileName = 'noPropDestructure-multiple.vue';
    checkNoPropDestructure(script, fileName);
    const offenses = reportNoPropDestructure();
    expect(offenses.length).toBe(2);
    expect(offenses).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Prop Destructure${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = props\`.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #3 ${BG_WARN}props destructuring found: const { propA } = defineProps()${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Prop Destructure${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = props\`.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `line #4 ${BG_WARN}props destructuring found: const { propB } = defineProps()${BG_RESET} 🚨`,
      },
    ]);
  });
});
