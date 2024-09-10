export const BG_INFO = '\x1B[44m'
export const BG_WARN = '\x1B[43m'
export const BG_ERR = '\x1B[41m'
export const BG_OK = '\x1B[42m'
export const BG_RESET = '\x1B[0m'

export const TEXT_WARN = '\x1B[33m'
export const TEXT_INFO = '\x1B[36m'
export const TEXT_RESET = '\x1B[0m'

export const tags2Ascee = (str: string) => str.replace(/<bg_err>/g, BG_ERR)
  .replace(/<bg_warn>/g, BG_WARN)
  .replace(/<bg_info>/g, BG_INFO)
  .replace(/<bg_ok>/g, BG_OK)
  .replace(/<\/bg_err>/g, BG_RESET)
  .replace(/<\/bg_warn>/g, BG_RESET)
  .replace(/<\/bg_info>/g, BG_RESET)
  .replace(/<\/bg_ok>/g, BG_RESET)
  .replace(/<text_warn>/g, TEXT_WARN)
  .replace(/<text_info>/g, TEXT_INFO)
  .replace(/<\/text_warn>/g, TEXT_RESET)
  .replace(/<\/text_info>/g, TEXT_RESET)
