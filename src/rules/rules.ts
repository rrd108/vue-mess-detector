export const RULES = new Set(['vue-essential', 'vue-strong', 'vue-reccomended', 'vue-caution', 'rrd'])
export type RuleType = typeof RULES extends Set<infer T> ? T : never
