export const RULES = new Set(['vue-essential', 'vue-strong', 'rrd'])
export type RuleType = typeof RULES extends Set<infer T> ? T : never
