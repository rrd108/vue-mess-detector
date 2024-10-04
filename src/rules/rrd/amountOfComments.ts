import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { extractComments } from '../../helpers/extractComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const COMMENT_THRESHOLD = 30 // hardcoded limit

const checkAmountOfComments = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // Extract comments from the script content
  const content = script.content.trim()
  const comments = extractComments(content)

  // Calculate total characters in comments
  const totalCommentChars = comments.reduce((total, comment) => total + comment.length, 0)

  // Calculate the total content length (including comments)
  const totalContentChars = content.length

  // Calculate the percentage of comments
  const commentPercentage = (totalCommentChars / totalContentChars) * 100

  if (commentPercentage > COMMENT_THRESHOLD) {
    results.push({
      filePath,
      message: `The script block contains ${commentPercentage.toFixed(2)}% comments, which exceeds the limit of ${COMMENT_THRESHOLD}%.`,
    })
  }
}

const reportAmountOfComments = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ amount of comments</text_info>`,
        description: `👉 <text_warn>lots of comments found</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/amount-of-comments.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkAmountOfComments, reportAmountOfComments }
