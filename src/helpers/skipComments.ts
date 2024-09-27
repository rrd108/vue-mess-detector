import { char, charNotIn, createRegExp, exactly, global, maybe, oneOrMore } from 'magic-regexp'

export const skipComments = (content: string) => {
  const regex = createRegExp(
    (exactly('/*')
      .and(charNotIn('*').times.any(), maybe('\n').as('newline'), exactly('*').notBefore('/').or(oneOrMore(charNotIn('*'))))
      .and('*/')
    )
      .or(
        exactly('//').and(oneOrMore(char)),
      ).or(
        exactly('<!--').and(oneOrMore(char)),
      ),
    [global],
  )

  return content.replace(regex, (match) => {
    const newlines = match.match(/\n/g)
    return newlines ? newlines.join('') : ''
  })
}
