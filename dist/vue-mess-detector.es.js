import Ze from 'yargs'
import { format as Re, inspect as ke } from 'util'
import et, { normalize as tt, resolve as I, dirname as de, basename as nt, extname as it, relative as st } from 'path'
import je, { readFileSync as be, statSync as Be, readdirSync as rt, writeFile as ot } from 'fs'
import { notStrictEqual as ct, strictEqual as at } from 'assert'
import { fileURLToPath as lt } from 'url'
import { parse as ft } from '@vue/compiler-sfc'
class Y extends Error {
  constructor(t) {
    super(t || 'yargs error'), (this.name = 'YError'), Error.captureStackTrace && Error.captureStackTrace(this, Y)
  }
}
function Pe() {
  return ut() ? 0 : 1
}
function ut() {
  return ht() && !process.defaultApp
}
function ht() {
  return !!process.versions.electron
}
function dt(s) {
  return s.slice(Pe() + 1)
}
function pt() {
  return process.argv[Pe()]
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function M(s) {
  if (
    ((s !== s.toLowerCase() && s !== s.toUpperCase()) || (s = s.toLowerCase()),
    s.indexOf('-') === -1 && s.indexOf('_') === -1)
  )
    return s
  {
    let r = '',
      c = !1
    const l = s.match(/^-+/)
    for (let u = l ? l[0].length : 0; u < s.length; u++) {
      let d = s.charAt(u)
      c && ((c = !1), (d = d.toUpperCase())),
        u !== 0 && (d === '-' || d === '_') ? (c = !0) : d !== '-' && d !== '_' && (r += d)
    }
    return r
  }
}
function Te(s, t) {
  const r = s.toLowerCase()
  t = t || '-'
  let c = ''
  for (let l = 0; l < s.length; l++) {
    const u = r.charAt(l),
      d = s.charAt(l)
    u !== d && l > 0 ? (c += `${t}${r.charAt(l)}`) : (c += d)
  }
  return c
}
function Ie(s) {
  return s == null
    ? !1
    : typeof s == 'number' || /^0x[0-9a-f]+$/i.test(s)
    ? !0
    : /^0[^.]/.test(s)
    ? !1
    : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(s)
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function gt(s) {
  if (Array.isArray(s)) return s.map(d => (typeof d != 'string' ? d + '' : d))
  s = s.trim()
  let t = 0,
    r = null,
    c = null,
    l = null
  const u = []
  for (let d = 0; d < s.length; d++) {
    if (((r = c), (c = s.charAt(d)), c === ' ' && !l)) {
      r !== ' ' && t++
      continue
    }
    c === l ? (l = null) : (c === "'" || c === '"') && !l && (l = c), u[t] || (u[t] = ''), (u[t] += c)
  }
  return u
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var N
;(function (s) {
  ;(s.BOOLEAN = 'boolean'), (s.STRING = 'string'), (s.NUMBER = 'number'), (s.ARRAY = 'array')
})(N || (N = {}))
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let R
class mt {
  constructor(t) {
    R = t
  }
  parse(t, r) {
    const c = Object.assign(
        {
          alias: void 0,
          array: void 0,
          boolean: void 0,
          config: void 0,
          configObjects: void 0,
          configuration: void 0,
          coerce: void 0,
          count: void 0,
          default: void 0,
          envPrefix: void 0,
          narg: void 0,
          normalize: void 0,
          string: void 0,
          number: void 0,
          __: void 0,
          key: void 0,
        },
        r
      ),
      l = gt(t),
      u = typeof t == 'string',
      d = bt(Object.assign(/* @__PURE__ */ Object.create(null), c.alias)),
      m = Object.assign(
        {
          'boolean-negation': !0,
          'camel-case-expansion': !0,
          'combine-arrays': !1,
          'dot-notation': !0,
          'duplicate-arguments-array': !0,
          'flatten-duplicate-arrays': !0,
          'greedy-arrays': !0,
          'halt-at-non-option': !1,
          'nargs-eats-options': !1,
          'negation-prefix': 'no-',
          'parse-numbers': !0,
          'parse-positional-numbers': !0,
          'populate--': !1,
          'set-placeholder-key': !1,
          'short-option-groups': !0,
          'strip-aliased': !1,
          'strip-dashed': !1,
          'unknown-options-as-args': !1,
        },
        c.configuration
      ),
      E = Object.assign(/* @__PURE__ */ Object.create(null), c.default),
      j = c.configObjects || [],
      _ = c.envPrefix,
      F = m['populate--'],
      B = F ? '--' : '_',
      K = /* @__PURE__ */ Object.create(null),
      ye = /* @__PURE__ */ Object.create(null),
      P = c.__ || R.format,
      a = {
        aliases: /* @__PURE__ */ Object.create(null),
        arrays: /* @__PURE__ */ Object.create(null),
        bools: /* @__PURE__ */ Object.create(null),
        strings: /* @__PURE__ */ Object.create(null),
        numbers: /* @__PURE__ */ Object.create(null),
        counts: /* @__PURE__ */ Object.create(null),
        normalize: /* @__PURE__ */ Object.create(null),
        configs: /* @__PURE__ */ Object.create(null),
        nargs: /* @__PURE__ */ Object.create(null),
        coercions: /* @__PURE__ */ Object.create(null),
        keys: [],
      },
      L = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/,
      re = new RegExp('^--' + m['negation-prefix'] + '(.+)')
    ;[]
      .concat(c.array || [])
      .filter(Boolean)
      .forEach(function (e) {
        const i = typeof e == 'object' ? e.key : e,
          f = Object.keys(e)
            .map(function (o) {
              return {
                boolean: 'bools',
                string: 'strings',
                number: 'numbers',
              }[o]
            })
            .filter(Boolean)
            .pop()
        f && (a[f][i] = !0), (a.arrays[i] = !0), a.keys.push(i)
      }),
      []
        .concat(c.boolean || [])
        .filter(Boolean)
        .forEach(function (e) {
          ;(a.bools[e] = !0), a.keys.push(e)
        }),
      []
        .concat(c.string || [])
        .filter(Boolean)
        .forEach(function (e) {
          ;(a.strings[e] = !0), a.keys.push(e)
        }),
      []
        .concat(c.number || [])
        .filter(Boolean)
        .forEach(function (e) {
          ;(a.numbers[e] = !0), a.keys.push(e)
        }),
      []
        .concat(c.count || [])
        .filter(Boolean)
        .forEach(function (e) {
          ;(a.counts[e] = !0), a.keys.push(e)
        }),
      []
        .concat(c.normalize || [])
        .filter(Boolean)
        .forEach(function (e) {
          ;(a.normalize[e] = !0), a.keys.push(e)
        }),
      typeof c.narg == 'object' &&
        Object.entries(c.narg).forEach(([e, i]) => {
          typeof i == 'number' && ((a.nargs[e] = i), a.keys.push(e))
        }),
      typeof c.coerce == 'object' &&
        Object.entries(c.coerce).forEach(([e, i]) => {
          typeof i == 'function' && ((a.coercions[e] = i), a.keys.push(e))
        }),
      typeof c.config < 'u' &&
        (Array.isArray(c.config) || typeof c.config == 'string'
          ? []
              .concat(c.config)
              .filter(Boolean)
              .forEach(function (e) {
                a.configs[e] = !0
              })
          : typeof c.config == 'object' &&
            Object.entries(c.config).forEach(([e, i]) => {
              ;(typeof i == 'boolean' || typeof i == 'function') && (a.configs[e] = i)
            })),
      Ye(c.key, d, c.default, a.arrays),
      Object.keys(E).forEach(function (e) {
        ;(a.aliases[e] || []).forEach(function (i) {
          E[i] = E[e]
        })
      })
    let x = null
    Xe()
    let J = []
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }),
      Ee = {}
    for (let e = 0; e < l.length; e++) {
      const i = l[e],
        f = i.replace(/^-{3,}/, '---')
      let o, n, p, h, g, O
      if (i !== '--' && /^-/.test(i) && ee(i)) oe(i)
      else if (f.match(/^---+(=|$)/)) {
        oe(i)
        continue
      } else if (i.match(/^--.+=/) || (!m['short-option-groups'] && i.match(/^-.+=/)))
        (h = i.match(/^--?([^=]+)=([\s\S]*)$/)),
          h !== null &&
            Array.isArray(h) &&
            h.length >= 3 &&
            (b(h[1], a.arrays)
              ? (e = Z(e, h[1], l, h[2]))
              : b(h[1], a.nargs) !== !1
              ? (e = X(e, h[1], l, h[2]))
              : y(h[1], h[2], !0))
      else if (i.match(re) && m['boolean-negation'])
        (h = i.match(re)), h !== null && Array.isArray(h) && h.length >= 2 && ((n = h[1]), y(n, b(n, a.arrays) ? [!1] : !1))
      else if (i.match(/^--.+/) || (!m['short-option-groups'] && i.match(/^-[^-]+/)))
        (h = i.match(/^--?(.+)/)),
          h !== null &&
            Array.isArray(h) &&
            h.length >= 2 &&
            ((n = h[1]),
            b(n, a.arrays)
              ? (e = Z(e, n, l))
              : b(n, a.nargs) !== !1
              ? (e = X(e, n, l))
              : ((g = l[e + 1]),
                (g !== void 0 && (!g.match(/^-/) || g.match(L)) && !b(n, a.bools) && !b(n, a.counts)) ||
                /^(true|false)$/.test(g)
                  ? (y(n, g), e++)
                  : y(n, T(n))))
      else if (i.match(/^-.\..+=/))
        (h = i.match(/^-([^=]+)=([\s\S]*)$/)), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2])
      else if (i.match(/^-.\..+/) && !i.match(L))
        (g = l[e + 1]),
          (h = i.match(/^-(.\..+)/)),
          h !== null &&
            Array.isArray(h) &&
            h.length >= 2 &&
            ((n = h[1]), g !== void 0 && !g.match(/^-/) && !b(n, a.bools) && !b(n, a.counts) ? (y(n, g), e++) : y(n, T(n)))
      else if (i.match(/^-[^-]+/) && !i.match(L)) {
        ;(p = i.slice(1, -1).split('')), (o = !1)
        for (let w = 0; w < p.length; w++) {
          if (((g = i.slice(w + 2)), p[w + 1] && p[w + 1] === '=')) {
            ;(O = i.slice(w + 3)),
              (n = p[w]),
              b(n, a.arrays) ? (e = Z(e, n, l, O)) : b(n, a.nargs) !== !1 ? (e = X(e, n, l, O)) : y(n, O),
              (o = !0)
            break
          }
          if (g === '-') {
            y(p[w], g)
            continue
          }
          if (/[A-Za-z]/.test(p[w]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, a.bools) === !1) {
            y(p[w], g), (o = !0)
            break
          }
          if (p[w + 1] && p[w + 1].match(/\W/)) {
            y(p[w], g), (o = !0)
            break
          } else y(p[w], T(p[w]))
        }
        ;(n = i.slice(-1)[0]),
          !o &&
            n !== '-' &&
            (b(n, a.arrays)
              ? (e = Z(e, n, l))
              : b(n, a.nargs) !== !1
              ? (e = X(e, n, l))
              : ((g = l[e + 1]),
                (g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(L)) && !b(n, a.bools) && !b(n, a.counts)) ||
                /^(true|false)$/.test(g)
                  ? (y(n, g), e++)
                  : y(n, T(n))))
      } else if (i.match(/^-[0-9]$/) && i.match(L) && b(i.slice(1), a.bools)) (n = i.slice(1)), y(n, T(n))
      else if (i === '--') {
        J = l.slice(e + 1)
        break
      } else if (m['halt-at-non-option']) {
        J = l.slice(e)
        break
      } else oe(i)
    }
    Ae(A, !0),
      Ae(A, !1),
      Ue(A),
      De(),
      Oe(A, a.aliases, E, !0),
      Ge(A),
      m['set-placeholder-key'] && Qe(A),
      Object.keys(a.counts).forEach(function (e) {
        v(A, e.split('.')) || y(e, 0)
      }),
      F && J.length && (A[B] = []),
      J.forEach(function (e) {
        A[B].push(e)
      }),
      m['camel-case-expansion'] &&
        m['strip-dashed'] &&
        Object.keys(A)
          .filter(e => e !== '--' && e.includes('-'))
          .forEach(e => {
            delete A[e]
          }),
      m['strip-aliased'] &&
        [].concat(...Object.keys(d).map(e => d[e])).forEach(e => {
          m['camel-case-expansion'] &&
            e.includes('-') &&
            delete A[
              e
                .split('.')
                .map(i => M(i))
                .join('.')
            ],
            delete A[e]
        })
    function oe(e) {
      const i = k('_', e)
      ;(typeof i == 'string' || typeof i == 'number') && A._.push(i)
    }
    function X(e, i, f, o) {
      let n,
        p = b(i, a.nargs)
      if (((p = typeof p != 'number' || isNaN(p) ? 1 : p), p === 0))
        return W(o) || (x = Error(P('Argument unexpected for: %s', i))), y(i, T(i)), e
      let h = W(o) ? 0 : 1
      if (m['nargs-eats-options'])
        f.length - (e + 1) + h < p && (x = Error(P('Not enough arguments following: %s', i))), (h = p)
      else {
        for (n = e + 1; n < f.length && (!f[n].match(/^-[^0-9]/) || f[n].match(L) || ee(f[n])); n++) h++
        h < p && (x = Error(P('Not enough arguments following: %s', i)))
      }
      let g = Math.min(h, p)
      for (!W(o) && g > 0 && (y(i, o), g--), n = e + 1; n < g + e + 1; n++) y(i, f[n])
      return e + g
    }
    function Z(e, i, f, o) {
      let n = [],
        p = o || f[e + 1]
      const h = b(i, a.nargs)
      if (b(i, a.bools) && !/^(true|false)$/.test(p)) n.push(!0)
      else if (W(p) || (W(o) && /^-/.test(p) && !L.test(p) && !ee(p))) {
        if (E[i] !== void 0) {
          const g = E[i]
          n = Array.isArray(g) ? g : [g]
        }
      } else {
        W(o) || n.push(ce(i, o, !0))
        for (
          let g = e + 1;
          g < f.length &&
          !(
            (!m['greedy-arrays'] && n.length > 0) ||
            (h && typeof h == 'number' && n.length >= h) ||
            ((p = f[g]), /^-/.test(p) && !L.test(p) && !ee(p))
          );
          g++
        )
          (e = g), n.push(ce(i, p, u))
      }
      return (
        typeof h == 'number' &&
          ((h && n.length < h) || (isNaN(h) && n.length === 0)) &&
          (x = Error(P('Not enough arguments following: %s', i))),
        y(i, n),
        e
      )
    }
    function y(e, i, f = u) {
      if (/-/.test(e) && m['camel-case-expansion']) {
        const p = e
          .split('.')
          .map(function (h) {
            return M(h)
          })
          .join('.')
        _e(e, p)
      }
      const o = ce(e, i, f),
        n = e.split('.')
      z(A, n, o),
        a.aliases[e] &&
          a.aliases[e].forEach(function (p) {
            const h = p.split('.')
            z(A, h, o)
          }),
        n.length > 1 &&
          m['dot-notation'] &&
          (a.aliases[n[0]] || []).forEach(function (p) {
            let h = p.split('.')
            const g = [].concat(n)
            g.shift(), (h = h.concat(g)), (a.aliases[e] || []).includes(h.join('.')) || z(A, h, o)
          }),
        b(e, a.normalize) &&
          !b(e, a.arrays) &&
          [e].concat(a.aliases[e] || []).forEach(function (h) {
            Object.defineProperty(Ee, h, {
              enumerable: !0,
              get() {
                return i
              },
              set(g) {
                i = typeof g == 'string' ? R.normalize(g) : g
              },
            })
          })
    }
    function _e(e, i) {
      ;(a.aliases[e] && a.aliases[e].length) || ((a.aliases[e] = [i]), (K[i] = !0)),
        (a.aliases[i] && a.aliases[i].length) || _e(i, e)
    }
    function ce(e, i, f) {
      f && (i = yt(i)), (b(e, a.bools) || b(e, a.counts)) && typeof i == 'string' && (i = i === 'true')
      let o = Array.isArray(i)
        ? i.map(function (n) {
            return k(e, n)
          })
        : k(e, i)
      return (
        b(e, a.counts) && (W(o) || typeof o == 'boolean') && (o = le()),
        b(e, a.normalize) && b(e, a.arrays) && (Array.isArray(i) ? (o = i.map(n => R.normalize(n))) : (o = R.normalize(i))),
        o
      )
    }
    function k(e, i) {
      return (
        (!m['parse-positional-numbers'] && e === '_') ||
          (!b(e, a.strings) &&
            !b(e, a.bools) &&
            !Array.isArray(i) &&
            ((Ie(i) && m['parse-numbers'] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`)))) ||
              (!W(i) && b(e, a.numbers))) &&
            (i = Number(i))),
        i
      )
    }
    function Ue(e) {
      const i = /* @__PURE__ */ Object.create(null)
      Oe(i, a.aliases, E),
        Object.keys(a.configs).forEach(function (f) {
          const o = e[f] || i[f]
          if (o)
            try {
              let n = null
              const p = R.resolve(R.cwd(), o),
                h = a.configs[f]
              if (typeof h == 'function') {
                try {
                  n = h(p)
                } catch (g) {
                  n = g
                }
                if (n instanceof Error) {
                  x = n
                  return
                }
              } else n = R.require(p)
              ae(n)
            } catch (n) {
              n.name === 'PermissionDenied' ? (x = n) : e[f] && (x = Error(P('Invalid JSON config file: %s', o)))
            }
        })
    }
    function ae(e, i) {
      Object.keys(e).forEach(function (f) {
        const o = e[f],
          n = i ? i + '.' + f : f
        typeof o == 'object' && o !== null && !Array.isArray(o) && m['dot-notation']
          ? ae(o, n)
          : (!v(A, n.split('.')) || (b(n, a.arrays) && m['combine-arrays'])) && y(n, o)
      })
    }
    function De() {
      typeof j < 'u' &&
        j.forEach(function (e) {
          ae(e)
        })
    }
    function Ae(e, i) {
      if (typeof _ > 'u') return
      const f = typeof _ == 'string' ? _ : '',
        o = R.env()
      Object.keys(o).forEach(function (n) {
        if (f === '' || n.lastIndexOf(f, 0) === 0) {
          const p = n.split('__').map(function (h, g) {
            return g === 0 && (h = h.substring(f.length)), M(h)
          })
          ;((i && a.configs[p.join('.')]) || !i) && !v(e, p) && y(p.join('.'), o[n])
        }
      })
    }
    function Ge(e) {
      let i
      const f = /* @__PURE__ */ new Set()
      Object.keys(e).forEach(function (o) {
        if (!f.has(o) && ((i = b(o, a.coercions)), typeof i == 'function'))
          try {
            const n = k(o, i(e[o]))
            ;[].concat(a.aliases[o] || [], o).forEach(p => {
              f.add(p), (e[p] = n)
            })
          } catch (n) {
            x = n
          }
      })
    }
    function Qe(e) {
      return (
        a.keys.forEach(i => {
          ~i.indexOf('.') || (typeof e[i] > 'u' && (e[i] = void 0))
        }),
        e
      )
    }
    function Oe(e, i, f, o = !1) {
      Object.keys(f).forEach(function (n) {
        v(e, n.split('.')) ||
          (z(e, n.split('.'), f[n]),
          o && (ye[n] = !0),
          (i[n] || []).forEach(function (p) {
            v(e, p.split('.')) || z(e, p.split('.'), f[n])
          }))
      })
    }
    function v(e, i) {
      let f = e
      m['dot-notation'] || (i = [i.join('.')]),
        i.slice(0, -1).forEach(function (n) {
          f = f[n] || {}
        })
      const o = i[i.length - 1]
      return typeof f != 'object' ? !1 : o in f
    }
    function z(e, i, f) {
      let o = e
      m['dot-notation'] || (i = [i.join('.')]),
        i.slice(0, -1).forEach(function (O) {
          ;(O = $e(O)),
            typeof o == 'object' && o[O] === void 0 && (o[O] = {}),
            typeof o[O] != 'object' || Array.isArray(o[O])
              ? (Array.isArray(o[O]) ? o[O].push({}) : (o[O] = [o[O], {}]), (o = o[O][o[O].length - 1]))
              : (o = o[O])
        })
      const n = $e(i[i.length - 1]),
        p = b(i.join('.'), a.arrays),
        h = Array.isArray(f)
      let g = m['duplicate-arguments-array']
      !g &&
        b(n, a.nargs) &&
        ((g = !0),
        ((!W(o[n]) && a.nargs[n] === 1) || (Array.isArray(o[n]) && o[n].length === a.nargs[n])) && (o[n] = void 0)),
        f === le()
          ? (o[n] = le(o[n]))
          : Array.isArray(o[n])
          ? g && p && h
            ? (o[n] = m['flatten-duplicate-arrays'] ? o[n].concat(f) : (Array.isArray(o[n][0]) ? o[n] : [o[n]]).concat([f]))
            : !g && !!p == !!h
            ? (o[n] = f)
            : (o[n] = o[n].concat([f]))
          : o[n] === void 0 && p
          ? (o[n] = h ? f : [f])
          : g && !(o[n] === void 0 || b(n, a.counts) || b(n, a.bools))
          ? (o[n] = [o[n], f])
          : (o[n] = f)
    }
    function Ye(...e) {
      e.forEach(function (i) {
        Object.keys(i || {}).forEach(function (f) {
          a.aliases[f] ||
            ((a.aliases[f] = [].concat(d[f] || [])),
            a.aliases[f].concat(f).forEach(function (o) {
              if (/-/.test(o) && m['camel-case-expansion']) {
                const n = M(o)
                n !== f && a.aliases[f].indexOf(n) === -1 && (a.aliases[f].push(n), (K[n] = !0))
              }
            }),
            a.aliases[f].concat(f).forEach(function (o) {
              if (o.length > 1 && /[A-Z]/.test(o) && m['camel-case-expansion']) {
                const n = Te(o, '-')
                n !== f && a.aliases[f].indexOf(n) === -1 && (a.aliases[f].push(n), (K[n] = !0))
              }
            }),
            a.aliases[f].forEach(function (o) {
              a.aliases[o] = [f].concat(
                a.aliases[f].filter(function (n) {
                  return o !== n
                })
              )
            }))
        })
      })
    }
    function b(e, i) {
      const f = [].concat(a.aliases[e] || [], e),
        o = Object.keys(i),
        n = f.find(p => o.includes(p))
      return n ? i[n] : !1
    }
    function we(e) {
      const i = Object.keys(a)
      return [].concat(i.map(o => a[o])).some(function (o) {
        return Array.isArray(o) ? o.includes(e) : o[e]
      })
    }
    function qe(e, ...i) {
      return [].concat(...i).some(function (o) {
        const n = e.match(o)
        return n && we(n[1])
      })
    }
    function Ve(e) {
      if (e.match(L) || !e.match(/^-[^-]+/)) return !1
      let i = !0,
        f
      const o = e.slice(1).split('')
      for (let n = 0; n < o.length; n++) {
        if (((f = e.slice(n + 2)), !we(o[n]))) {
          i = !1
          break
        }
        if (
          (o[n + 1] && o[n + 1] === '=') ||
          f === '-' ||
          (/[A-Za-z]/.test(o[n]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f)) ||
          (o[n + 1] && o[n + 1].match(/\W/))
        )
          break
      }
      return i
    }
    function ee(e) {
      return m['unknown-options-as-args'] && He(e)
    }
    function He(e) {
      return (
        (e = e.replace(/^-{3,}/, '--')),
        e.match(L) || Ve(e)
          ? !1
          : !qe(e, /^-+([^=]+?)=[\s\S]*$/, re, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/)
      )
    }
    function T(e) {
      return !b(e, a.bools) && !b(e, a.counts) && `${e}` in E ? E[e] : Ke(Je(e))
    }
    function Ke(e) {
      return {
        [N.BOOLEAN]: !0,
        [N.STRING]: '',
        [N.NUMBER]: void 0,
        [N.ARRAY]: [],
      }[e]
    }
    function Je(e) {
      let i = N.BOOLEAN
      return (
        b(e, a.strings)
          ? (i = N.STRING)
          : b(e, a.numbers)
          ? (i = N.NUMBER)
          : b(e, a.bools)
          ? (i = N.BOOLEAN)
          : b(e, a.arrays) && (i = N.ARRAY),
        i
      )
    }
    function W(e) {
      return e === void 0
    }
    function Xe() {
      Object.keys(a.counts).find(e =>
        b(e, a.arrays)
          ? ((x = Error(P('Invalid configuration: %s, opts.count excludes opts.array.', e))), !0)
          : b(e, a.nargs)
          ? ((x = Error(P('Invalid configuration: %s, opts.count excludes opts.narg.', e))), !0)
          : !1
      )
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(Ee, A),
      configuration: m,
      defaulted: Object.assign({}, ye),
      error: x,
      newAliases: Object.assign({}, K),
    }
  }
}
function bt(s) {
  const t = [],
    r = /* @__PURE__ */ Object.create(null)
  let c = !0
  for (
    Object.keys(s).forEach(function (l) {
      t.push([].concat(s[l], l))
    });
    c;

  ) {
    c = !1
    for (let l = 0; l < t.length; l++)
      for (let u = l + 1; u < t.length; u++)
        if (
          t[l].filter(function (m) {
            return t[u].indexOf(m) !== -1
          }).length
        ) {
          ;(t[l] = t[l].concat(t[u])), t.splice(u, 1), (c = !0)
          break
        }
  }
  return (
    t.forEach(function (l) {
      l = l.filter(function (d, m, E) {
        return E.indexOf(d) === m
      })
      const u = l.pop()
      u !== void 0 && typeof u == 'string' && (r[u] = l)
    }),
    r
  )
}
function le(s) {
  return s !== void 0 ? s + 1 : 1
}
function $e(s) {
  return s === '__proto__' ? '___proto___' : s
}
function yt(s) {
  return typeof s == 'string' && (s[0] === "'" || s[0] === '"') && s[s.length - 1] === s[0]
    ? s.substring(1, s.length - 1)
    : s
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var fe, ue, he
const xe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12,
  Ce =
    (ue = (fe = process == null ? void 0 : process.versions) === null || fe === void 0 ? void 0 : fe.node) !== null &&
    ue !== void 0
      ? ue
      : (he = process == null ? void 0 : process.version) === null || he === void 0
      ? void 0
      : he.slice(1)
if (Ce && Number(Ce.match(/^([^.]+)/)[1]) < xe)
  throw Error(
    `yargs parser supports a minimum Node.js version of ${xe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`
  )
const Et = process ? process.env : {},
  ve = new mt({
    cwd: process.cwd,
    env: () => Et,
    format: Re,
    normalize: tt,
    resolve: I,
    // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
    // we can exercise all the lines below:
    require: s => {
      if (typeof require < 'u') return require(s)
      if (s.match(/\.json$/)) return JSON.parse(be(s, 'utf8'))
      throw Error('only .json config files are supported in ESM')
    },
  }),
  H = function (t, r) {
    return ve.parse(t.slice(), r).argv
  }
H.detailed = function (s, t) {
  return ve.parse(s.slice(), t)
}
H.camelCase = M
H.decamelize = Te
H.looksLikeNumber = Ie
const _t = {
    right: xt,
    center: Ct,
  },
  At = 0,
  te = 1,
  Ot = 2,
  ne = 3
class wt {
  constructor(t) {
    var r
    ;(this.width = t.width), (this.wrap = (r = t.wrap) !== null && r !== void 0 ? r : !0), (this.rows = [])
  }
  span(...t) {
    const r = this.div(...t)
    r.span = !0
  }
  resetOutput() {
    this.rows = []
  }
  div(...t) {
    if ((t.length === 0 && this.div(''), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == 'string'))
      return this.applyLayoutDSL(t[0])
    const r = t.map(c => (typeof c == 'string' ? this.colFromString(c) : c))
    return this.rows.push(r), r
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == 'string' && /[\t\n]/.test(t[0])
  }
  applyLayoutDSL(t) {
    const r = t
      .split(
        `
`
      )
      .map(l => l.split('	'))
    let c = 0
    return (
      r.forEach(l => {
        l.length > 1 && $.stringWidth(l[0]) > c && (c = Math.min(Math.floor(this.width * 0.5), $.stringWidth(l[0])))
      }),
      r.forEach(l => {
        this.div(
          ...l.map((u, d) => ({
            text: u.trim(),
            padding: this.measurePadding(u),
            width: d === 0 && l.length > 1 ? c : void 0,
          }))
        )
      }),
      this.rows[this.rows.length - 1]
    )
  }
  colFromString(t) {
    return {
      text: t,
      padding: this.measurePadding(t),
    }
  }
  measurePadding(t) {
    const r = $.stripAnsi(t)
    return [0, r.match(/\s*$/)[0].length, 0, r.match(/^\s*/)[0].length]
  }
  toString() {
    const t = []
    return (
      this.rows.forEach(r => {
        this.rowToString(r, t)
      }),
      t.filter(r => !r.hidden).map(r => r.text).join(`
`)
    )
  }
  rowToString(t, r) {
    return (
      this.rasterize(t).forEach((c, l) => {
        let u = ''
        c.forEach((d, m) => {
          const { width: E } = t[m],
            j = this.negatePadding(t[m])
          let _ = d
          if (
            (j > $.stringWidth(d) && (_ += ' '.repeat(j - $.stringWidth(d))),
            t[m].align && t[m].align !== 'left' && this.wrap)
          ) {
            const B = _t[t[m].align]
            ;(_ = B(_, j)), $.stringWidth(_) < j && (_ += ' '.repeat((E || 0) - $.stringWidth(_) - 1))
          }
          const F = t[m].padding || [0, 0, 0, 0]
          F[ne] && (u += ' '.repeat(F[ne])),
            (u += Ne(t[m], _, '| ')),
            (u += _),
            (u += Ne(t[m], _, ' |')),
            F[te] && (u += ' '.repeat(F[te])),
            l === 0 && r.length > 0 && (u = this.renderInline(u, r[r.length - 1]))
        }),
          r.push({
            text: u.replace(/ +$/, ''),
            span: t.span,
          })
      }),
      r
    )
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, r) {
    const c = t.match(/^ */),
      l = c ? c[0].length : 0,
      u = r.text,
      d = $.stringWidth(u.trimRight())
    return r.span
      ? this.wrap
        ? l < d
          ? t
          : ((r.hidden = !0), u.trimRight() + ' '.repeat(l - d) + t.trimLeft())
        : ((r.hidden = !0), u + t)
      : t
  }
  rasterize(t) {
    const r = [],
      c = this.columnWidths(t)
    let l
    return (
      t.forEach((u, d) => {
        ;(u.width = c[d]),
          this.wrap
            ? (l = $.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`))
            : (l = u.text.split(`
`)),
          u.border &&
            (l.unshift('.' + '-'.repeat(this.negatePadding(u) + 2) + '.'),
            l.push("'" + '-'.repeat(this.negatePadding(u) + 2) + "'")),
          u.padding &&
            (l.unshift(...new Array(u.padding[At] || 0).fill('')), l.push(...new Array(u.padding[Ot] || 0).fill(''))),
          l.forEach((m, E) => {
            r[E] || r.push([])
            const j = r[E]
            for (let _ = 0; _ < d; _++) j[_] === void 0 && j.push('')
            j.push(m)
          })
      }),
      r
    )
  }
  negatePadding(t) {
    let r = t.width || 0
    return t.padding && (r -= (t.padding[ne] || 0) + (t.padding[te] || 0)), t.border && (r -= 4), r
  }
  columnWidths(t) {
    if (!this.wrap) return t.map(d => d.width || $.stringWidth(d.text))
    let r = t.length,
      c = this.width
    const l = t.map(d => {
        if (d.width) return r--, (c -= d.width), d.width
      }),
      u = r ? Math.floor(c / r) : 0
    return l.map((d, m) => (d === void 0 ? Math.max(u, jt(t[m])) : d))
  }
}
function Ne(s, t, r) {
  return s.border ? (/[.']-+[.']/.test(t) ? '' : t.trim().length !== 0 ? r : '  ') : ''
}
function jt(s) {
  const t = s.padding || [],
    r = 1 + (t[ne] || 0) + (t[te] || 0)
  return s.border ? r + 4 : r
}
function $t() {
  return typeof process == 'object' && process.stdout && process.stdout.columns ? process.stdout.columns : 80
}
function xt(s, t) {
  s = s.trim()
  const r = $.stringWidth(s)
  return r < t ? ' '.repeat(t - r) + s : s
}
function Ct(s, t) {
  s = s.trim()
  const r = $.stringWidth(s)
  return r >= t ? s : ' '.repeat((t - r) >> 1) + s
}
let $
function Nt(s, t) {
  return (
    ($ = t),
    new wt({
      width: s?.width || $t(),
      wrap: s?.wrap,
    })
  )
}
const ze = new RegExp('\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)', 'g')
function Me(s) {
  return s.replace(ze, '')
}
function Lt(s, t) {
  const [r, c] = s.match(ze) || ['', '']
  s = Me(s)
  let l = ''
  for (let u = 0; u < s.length; u++)
    u !== 0 &&
      u % t === 0 &&
      (l += `
`),
      (l += s.charAt(u))
  return r && c && (l = `${r}${l}${c}`), l
}
function St(s) {
  return Nt(s, {
    stringWidth: t => [...t].length,
    stripAnsi: Me,
    wrap: Lt,
  })
}
function Ft(s, t) {
  let r = I('.', s),
    c
  for (Be(r).isDirectory() || (r = de(r)); ; ) {
    if (((c = t(r, rt(r))), c)) return I(r, c)
    if (((r = de((c = r))), c === r)) break
  }
}
const Wt = {
  fs: {
    readFileSync: be,
    writeFile: ot,
  },
  format: Re,
  resolve: I,
  exists: s => {
    try {
      return Be(s).isFile()
    } catch {
      return !1
    }
  },
}
let C
class Rt {
  constructor(t) {
    ;(t = t || {}),
      (this.directory = t.directory || './locales'),
      (this.updateFiles = typeof t.updateFiles == 'boolean' ? t.updateFiles : !0),
      (this.locale = t.locale || 'en'),
      (this.fallbackToLanguage = typeof t.fallbackToLanguage == 'boolean' ? t.fallbackToLanguage : !0),
      (this.cache = /* @__PURE__ */ Object.create(null)),
      (this.writeQueue = [])
  }
  __(...t) {
    if (typeof arguments[0] != 'string') return this._taggedLiteral(arguments[0], ...arguments)
    const r = t.shift()
    let c = function () {}
    return (
      typeof t[t.length - 1] == 'function' && (c = t.pop()),
      (c = c || function () {}),
      this.cache[this.locale] || this._readLocaleFile(),
      !this.cache[this.locale][r] && this.updateFiles
        ? ((this.cache[this.locale][r] = r),
          this._enqueueWrite({
            directory: this.directory,
            locale: this.locale,
            cb: c,
          }))
        : c(),
      C.format.apply(C.format, [this.cache[this.locale][r] || r].concat(t))
    )
  }
  __n() {
    const t = Array.prototype.slice.call(arguments),
      r = t.shift(),
      c = t.shift(),
      l = t.shift()
    let u = function () {}
    typeof t[t.length - 1] == 'function' && (u = t.pop()), this.cache[this.locale] || this._readLocaleFile()
    let d = l === 1 ? r : c
    this.cache[this.locale][r] && (d = this.cache[this.locale][r][l === 1 ? 'one' : 'other']),
      !this.cache[this.locale][r] && this.updateFiles
        ? ((this.cache[this.locale][r] = {
            one: r,
            other: c,
          }),
          this._enqueueWrite({
            directory: this.directory,
            locale: this.locale,
            cb: u,
          }))
        : u()
    const m = [d]
    return ~d.indexOf('%d') && m.push(l), C.format.apply(C.format, m.concat(t))
  }
  setLocale(t) {
    this.locale = t
  }
  getLocale() {
    return this.locale
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile()
    for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (this.cache[this.locale][r] = t[r])
  }
  _taggedLiteral(t, ...r) {
    let c = ''
    return (
      t.forEach(function (l, u) {
        const d = r[u + 1]
        ;(c += l), typeof d < 'u' && (c += '%s')
      }),
      this.__.apply(this, [c].concat([].slice.call(r, 1)))
    )
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue()
  }
  _processWriteQueue() {
    const t = this,
      r = this.writeQueue[0],
      c = r.directory,
      l = r.locale,
      u = r.cb,
      d = this._resolveLocaleFile(c, l),
      m = JSON.stringify(this.cache[l], null, 2)
    C.fs.writeFile(d, m, 'utf-8', function (E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), u(E)
    })
  }
  _readLocaleFile() {
    let t = {}
    const r = this._resolveLocaleFile(this.directory, this.locale)
    try {
      C.fs.readFileSync && (t = JSON.parse(C.fs.readFileSync(r, 'utf-8')))
    } catch (c) {
      if ((c instanceof SyntaxError && (c.message = 'syntax error in ' + r), c.code === 'ENOENT')) t = {}
      else throw c
    }
    this.cache[this.locale] = t
  }
  _resolveLocaleFile(t, r) {
    let c = C.resolve(t, './', r + '.json')
    if (this.fallbackToLanguage && !this._fileExistsSync(c) && ~r.lastIndexOf('_')) {
      const l = C.resolve(t, './', r.split('_')[0] + '.json')
      this._fileExistsSync(l) && (c = l)
    }
    return c
  }
  _fileExistsSync(t) {
    return C.exists(t)
  }
}
function Bt(s, t) {
  C = t
  const r = new Rt(s)
  return {
    __: r.__.bind(r),
    __n: r.__n.bind(r),
    setLocale: r.setLocale.bind(r),
    getLocale: r.getLocale.bind(r),
    updateLocale: r.updateLocale.bind(r),
    locale: r.locale,
  }
}
const Pt = s => Bt(s, Wt),
  Tt = 'require is not supported by ESM',
  Le = 'loading a directory of commands is not supported yet for ESM'
let q
try {
  q = lt(import.meta.url)
} catch {
  q = process.cwd()
}
const It = q.substring(0, q.lastIndexOf('node_modules'))
ct,
  at,
  ke,
  It || process.cwd(),
  nt,
  de,
  it,
  st,
  I,
  process.cwd,
  process.exit,
  process.nextTick,
  typeof process.stdout.columns < 'u' && process.stdout.columns,
  be,
  Pt({
    directory: I(q, '../../../locales'),
    updateFiles: !1,
  })
const pe = '\x1B[44m',
  V = '\x1B[43m',
  ge = '\x1B[41m',
  vt = '\x1B[42m',
  S = '\x1B[0m',
  ie = '\x1B[33m',
  se = '\x1B[0m',
  me = 50,
  U = [],
  Se = (s, t) => {
    const r = s.content.split(`
`)
    r.length > me && U.push({ fileName: t, scriptLength: r.length })
  },
  zt = () => (
    U.length > 0 &&
      (console.log(`
${ge}Long <script> blocks${S} in ${U.length} files.`),
      console.log(
        `👉 ${ie}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${me} lines.${se}`
      ),
      U.forEach(s => {
        console.log(`- ${s.fileName} ${s.scriptLength > me * 2 ? ge : V}(${s.scriptLength} lines)${S}`)
      })),
    U.length
  ),
  D = [],
  Mt = s => {
    D.push(s)
  },
  Ut = () => (
    D.length > 0 &&
      (console.log(`
${V}Plain <script> blocks${S} in ${D.length} files.`),
      console.log(`👉 ${ie} Consider using <script setup> to leverage the new SFC <script> syntax.${se}`),
      D.forEach(s => {
        console.log(`- ${s}`)
      })),
    D.length
  ),
  G = [],
  Fe = (s, t) => {
    const r = /\belse\b/gi,
      c = s.content.match(r)
    c?.length && G.push({ fileName: t, elseCount: c.length })
  },
  Dt = () => (
    G.length > 0 &&
      (console.log(`
${V}else conditions${S} are used in ${G.length} files.`),
      console.log(`👉 ${ie}Try to rewrite the conditions in a way that the else clause is not necessary.${se}`),
      G.forEach(s => {
        console.log(`- ${s.fileName} ${V}(${s.elseCount})${S}`)
      })),
    G.length
  ),
  Gt = 5,
  Qt = 10,
  Q = [],
  We = (s, t) => {
    const r = /\bif\b/gi,
      c = /\belse\b/gi,
      l = /\bfor\b/gi,
      u = /\bwhile\b/gi,
      d = /\bcase\b/gi,
      m = s.content.match(r),
      E = s.content.match(c),
      j = s.content.match(l),
      _ = s.content.match(u),
      F = s.content.match(d),
      B = (m?.length || 0) + (E?.length || 0) + (j?.length || 0) + (_?.length || 0) + (F?.length || 0)
    B > Gt && Q.push({ fileName: t, cyclomaticComplexity: B })
  },
  Yt = () => (
    Q.length > 0 &&
      (console.log(
        `
${pe}cyclomaticComplexity${S} is above moderate in ${Q.length} files.`
      ),
      console.log(`👉 ${ie}Try to reduce complexity.${se}`),
      Q.forEach(s => {
        console.log(`- ${s.fileName} ${s.cyclomaticComplexity > Qt ? ge : V}(${s.cyclomaticComplexity})${S}`)
      })),
    Q.length
  ),
  qt = s => {
    console.log(`

${pe}Analyzing Vue files in ${s}${S}`)
    const t = je.readdirSync(s).filter(c => c.endsWith('.vue'))
    console.log(`Found ${pe}${t.length}${S} Vue files`)
    let r = 0
    t.forEach(c => {
      const l = et.join(s, c),
        u = je.readFileSync(l, 'utf-8'),
        { descriptor: d } = ft(u)
      d.scriptSetup && (Se(d.scriptSetup, l), Fe(d.scriptSetup, l), We(d.scriptSetup, l)),
        d.script && (Mt(l), Se(d.script, l), Fe(d.script, l), We(d.script, l))
    }),
      (r += zt()),
      (r += Ut()),
      (r += Dt()),
      (r += Yt()),
      r || console.log(`${vt}No code smells detected!${S}`)
  }
Ze(dt(process.argv))
  .command(
    'analyze [path]',
    'Analyze Vue files for code smells',
    s =>
      s.positional('path', {
        describe: 'path to the Vue files',
        type: 'string',
        default: './src',
      }),
    s => {
      qt(s.path)
    }
  )
  .help().argv
