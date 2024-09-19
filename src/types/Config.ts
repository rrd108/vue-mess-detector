import type { OverrideConfig } from "./Override"

export interface Config {
    path: string
    apply: string
    ignore: string
    exclude: string
    group: string
    level: string
    sort: string
    output: string
    override: OverrideConfig
    isDefault?: boolean
}
