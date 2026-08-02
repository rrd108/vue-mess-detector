import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoPropDestructure, reportNoPropDestructure } from './noPropDestructure'

const description = `👉 <text_warn>Avoid destructuring a runtime props object because it loses reactivity. Access \`props.propName\` instead, or destructure directly from \`defineProps()\` in Vue 3.5+.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`

describe('checkNoPropDestructure', () => {
  it('does not report access through the props object', () => {
    const script = {
      content: `
      <script setup>
        const props = defineProps();
        const myProp = props.myProp;
      </script>
      `,
    } as SFCScriptBlock

    checkNoPropDestructure(script, 'safe-props-access.vue')

    expect(reportNoPropDestructure()).toStrictEqual([])
  })

  it('does not report Vue 3.5 reactive props destructure', () => {
    const script = {
      content: `
      <script setup>
        const { propA = 'default', propB } = defineProps<{ propA?: string, propB: string }>();
      </script>
      `,
    } as SFCScriptBlock

    checkNoPropDestructure(script, 'reactive-props-destructure.vue')

    expect(reportNoPropDestructure()).toStrictEqual([])
  })

  it('reports destructuring from a runtime props object', () => {
    const script = {
      content: `
      <script setup>
        const props = defineProps();
        const { propA } = props;
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'runtime-props-destructure.vue'

    checkNoPropDestructure(script, fileName)

    expect(reportNoPropDestructure()).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description,
        message: `line #4 <bg_warn>props destructuring found: const { propA } = props</bg_warn> 🚨`,
      },
    ])
  })

  it('reports multiple runtime destructures including defaults', () => {
    const script = {
      content: `
      <script setup>
        const props = defineProps();
        const { propA = 'default' } = props;
        let { propB } = props;
      </script>
      `,
    } as SFCScriptBlock
    const fileName = 'multiple-runtime-props-destructures.vue'

    checkNoPropDestructure(script, fileName)

    expect(reportNoPropDestructure()).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description,
        message: `line #4 <bg_warn>props destructuring found: const { propA = 'default' } = props</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description,
        message: `line #5 <bg_warn>props destructuring found: let { propB } = props</bg_warn> 🚨`,
      },
    ])
  })

  it('does not report destructuring unrelated values', () => {
    const script = {
      content: `
      <script setup>
        const { value } = ref('value');
      </script>
      `,
    } as SFCScriptBlock

    checkNoPropDestructure(script, 'unrelated-destructure.vue')

    expect(reportNoPropDestructure()).toStrictEqual([])
  })
})
