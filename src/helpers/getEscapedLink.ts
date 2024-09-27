import path from 'node:path'
import { ESCAPE_END, ESCAPE_MIDDLE, ESCAPE_START } from './constants'

/**
 * Generates an escaped link string for terminal output.
 *
 * This function constructs a string that includes escape sequences for terminal
 * hyperlinking. It takes a file path and an optional text parameter. If the text
 * parameter is not provided, the file path will be used as the link text.
 *
 * @param {string} filePath - The file path to be included in the link.
 * @param {string} [text] - Optional text to be displayed as the link. If not provided, the file path will be used.
 * @returns {string} The escaped link string for terminal output.
 */
export function getEscapedLink(filePath: string, text?: string | undefined): string {
  return `${ESCAPE_START}file://${path.resolve(filePath)}${ESCAPE_MIDDLE}${text ?? filePath}${ESCAPE_END}`
}
