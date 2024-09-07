// Helper function to determine if an option was passed via CLI
export function wasOptionPassed(option: string) {
  // Regular expression to match the exact option with any value
  const regex = new RegExp(`--${option}(?:=[^\\s]*)?$`)

  // eslint-disable-next-line node/prefer-global/process
  return process.argv.some(arg => regex.test(arg))
}
