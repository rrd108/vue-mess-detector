export const camelToKebab = (str) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
