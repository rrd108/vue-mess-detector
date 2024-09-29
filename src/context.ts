let isNuxt = false

export const setIsNuxt = (value: boolean) => {
  isNuxt = value
}

export const getIsNuxt = () => isNuxt

let hasServer = false

export const setHasServer = (value: boolean) => {
  hasServer = value
}

export const getHasServer = () => hasServer
