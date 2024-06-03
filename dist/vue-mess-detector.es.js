import ke from "yargs";
import { format as Fe, inspect as et } from "util";
import Re, { normalize as tt, resolve as P, dirname as ge, basename as nt, extname as st, relative as it } from "path";
import me, { readFileSync as Ee, statSync as We, readdirSync as rt, writeFile as ot } from "fs";
import { notStrictEqual as ct, strictEqual as at } from "assert";
import { fileURLToPath as lt } from "url";
import { parse as ft } from "@vue/compiler-sfc";
class q extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, q);
  }
}
function Be() {
  return ut() ? 0 : 1;
}
function ut() {
  return ht() && !process.defaultApp;
}
function ht() {
  return !!process.versions.electron;
}
function dt(s) {
  return s.slice(Be() + 1);
}
function pt() {
  return process.argv[Be()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function M(s) {
  if (s !== s.toLowerCase() && s !== s.toUpperCase() || (s = s.toLowerCase()), s.indexOf("-") === -1 && s.indexOf("_") === -1)
    return s;
  {
    let r = "", c = !1;
    const l = s.match(/^-+/);
    for (let u = l ? l[0].length : 0; u < s.length; u++) {
      let p = s.charAt(u);
      c && (c = !1, p = p.toUpperCase()), u !== 0 && (p === "-" || p === "_") ? c = !0 : p !== "-" && p !== "_" && (r += p);
    }
    return r;
  }
}
function Te(s, t) {
  const r = s.toLowerCase();
  t = t || "-";
  let c = "";
  for (let l = 0; l < s.length; l++) {
    const u = r.charAt(l), p = s.charAt(l);
    u !== p && l > 0 ? c += `${t}${r.charAt(l)}` : c += p;
  }
  return c;
}
function Ie(s) {
  return s == null ? !1 : typeof s == "number" || /^0x[0-9a-f]+$/i.test(s) ? !0 : /^0[^.]/.test(s) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(s);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function gt(s) {
  if (Array.isArray(s))
    return s.map((p) => typeof p != "string" ? p + "" : p);
  s = s.trim();
  let t = 0, r = null, c = null, l = null;
  const u = [];
  for (let p = 0; p < s.length; p++) {
    if (r = c, c = s.charAt(p), c === " " && !l) {
      r !== " " && t++;
      continue;
    }
    c === l ? l = null : (c === "'" || c === '"') && !l && (l = c), u[t] || (u[t] = ""), u[t] += c;
  }
  return u;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var L;
(function(s) {
  s.BOOLEAN = "boolean", s.STRING = "string", s.NUMBER = "number", s.ARRAY = "array";
})(L || (L = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let W;
class mt {
  constructor(t) {
    W = t;
  }
  parse(t, r) {
    const c = Object.assign({
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
      key: void 0
    }, r), l = gt(t), u = typeof t == "string", p = bt(Object.assign(/* @__PURE__ */ Object.create(null), c.alias)), m = Object.assign({
      "boolean-negation": !0,
      "camel-case-expansion": !0,
      "combine-arrays": !1,
      "dot-notation": !0,
      "duplicate-arguments-array": !0,
      "flatten-duplicate-arrays": !0,
      "greedy-arrays": !0,
      "halt-at-non-option": !1,
      "nargs-eats-options": !1,
      "negation-prefix": "no-",
      "parse-numbers": !0,
      "parse-positional-numbers": !0,
      "populate--": !1,
      "set-placeholder-key": !1,
      "short-option-groups": !0,
      "strip-aliased": !1,
      "strip-dashed": !1,
      "unknown-options-as-args": !1
    }, c.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), c.default), $ = c.configObjects || [], _ = c.envPrefix, F = m["populate--"], B = F ? "--" : "_", k = /* @__PURE__ */ Object.create(null), _e = /* @__PURE__ */ Object.create(null), T = c.__ || W.format, a = {
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
      keys: []
    }, S = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ce = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(c.array || []).filter(Boolean).forEach(function(e) {
      const i = typeof e == "object" ? e.key : e, f = Object.keys(e).map(function(o) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[o];
      }).filter(Boolean).pop();
      f && (a[f][i] = !0), a.arrays[i] = !0, a.keys.push(i);
    }), [].concat(c.boolean || []).filter(Boolean).forEach(function(e) {
      a.bools[e] = !0, a.keys.push(e);
    }), [].concat(c.string || []).filter(Boolean).forEach(function(e) {
      a.strings[e] = !0, a.keys.push(e);
    }), [].concat(c.number || []).filter(Boolean).forEach(function(e) {
      a.numbers[e] = !0, a.keys.push(e);
    }), [].concat(c.count || []).filter(Boolean).forEach(function(e) {
      a.counts[e] = !0, a.keys.push(e);
    }), [].concat(c.normalize || []).filter(Boolean).forEach(function(e) {
      a.normalize[e] = !0, a.keys.push(e);
    }), typeof c.narg == "object" && Object.entries(c.narg).forEach(([e, i]) => {
      typeof i == "number" && (a.nargs[e] = i, a.keys.push(e));
    }), typeof c.coerce == "object" && Object.entries(c.coerce).forEach(([e, i]) => {
      typeof i == "function" && (a.coercions[e] = i, a.keys.push(e));
    }), typeof c.config < "u" && (Array.isArray(c.config) || typeof c.config == "string" ? [].concat(c.config).filter(Boolean).forEach(function(e) {
      a.configs[e] = !0;
    }) : typeof c.config == "object" && Object.entries(c.config).forEach(([e, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (a.configs[e] = i);
    })), qe(c.key, p, c.default, a.arrays), Object.keys(E).forEach(function(e) {
      (a.aliases[e] || []).forEach(function(i) {
        E[i] = E[e];
      });
    });
    let C = null;
    Ze();
    let ee = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ae = {};
    for (let e = 0; e < l.length; e++) {
      const i = l[e], f = i.replace(/^-{3,}/, "---");
      let o, n, d, h, g, O;
      if (i !== "--" && /^-/.test(i) && ie(i))
        ae(i);
      else if (f.match(/^---+(=|$)/)) {
        ae(i);
        continue;
      } else if (i.match(/^--.+=/) || !m["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], a.arrays) ? e = ne(e, h[1], l, h[2]) : b(h[1], a.nargs) !== !1 ? e = te(e, h[1], l, h[2]) : y(h[1], h[2], !0));
      else if (i.match(ce) && m["boolean-negation"])
        h = i.match(ce), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], y(n, b(n, a.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !m["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], b(n, a.arrays) ? e = ne(e, n, l) : b(n, a.nargs) !== !1 ? e = te(e, n, l) : (g = l[e + 1], g !== void 0 && (!g.match(/^-/) || g.match(S)) && !b(n, a.bools) && !b(n, a.counts) || /^(true|false)$/.test(g) ? (y(n, g), e++) : y(n, I(n))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(S))
        g = l[e + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], g !== void 0 && !g.match(/^-/) && !b(n, a.bools) && !b(n, a.counts) ? (y(n, g), e++) : y(n, I(n)));
      else if (i.match(/^-[^-]+/) && !i.match(S)) {
        d = i.slice(1, -1).split(""), o = !1;
        for (let w = 0; w < d.length; w++) {
          if (g = i.slice(w + 2), d[w + 1] && d[w + 1] === "=") {
            O = i.slice(w + 3), n = d[w], b(n, a.arrays) ? e = ne(e, n, l, O) : b(n, a.nargs) !== !1 ? e = te(e, n, l, O) : y(n, O), o = !0;
            break;
          }
          if (g === "-") {
            y(d[w], g);
            continue;
          }
          if (/[A-Za-z]/.test(d[w]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, a.bools) === !1) {
            y(d[w], g), o = !0;
            break;
          }
          if (d[w + 1] && d[w + 1].match(/\W/)) {
            y(d[w], g), o = !0;
            break;
          } else
            y(d[w], I(d[w]));
        }
        n = i.slice(-1)[0], !o && n !== "-" && (b(n, a.arrays) ? e = ne(e, n, l) : b(n, a.nargs) !== !1 ? e = te(e, n, l) : (g = l[e + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(S)) && !b(n, a.bools) && !b(n, a.counts) || /^(true|false)$/.test(g) ? (y(n, g), e++) : y(n, I(n))));
      } else if (i.match(/^-[0-9]$/) && i.match(S) && b(i.slice(1), a.bools))
        n = i.slice(1), y(n, I(n));
      else if (i === "--") {
        ee = l.slice(e + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        ee = l.slice(e);
        break;
      } else
        ae(i);
    }
    we(A, !0), we(A, !1), Ue(A), Ge(), $e(A, a.aliases, E, !0), Qe(A), m["set-placeholder-key"] && Ye(A), Object.keys(a.counts).forEach(function(e) {
      v(A, e.split(".")) || y(e, 0);
    }), F && ee.length && (A[B] = []), ee.forEach(function(e) {
      A[B].push(e);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((e) => e !== "--" && e.includes("-")).forEach((e) => {
      delete A[e];
    }), m["strip-aliased"] && [].concat(...Object.keys(p).map((e) => p[e])).forEach((e) => {
      m["camel-case-expansion"] && e.includes("-") && delete A[e.split(".").map((i) => M(i)).join(".")], delete A[e];
    });
    function ae(e) {
      const i = se("_", e);
      (typeof i == "string" || typeof i == "number") && A._.push(i);
    }
    function te(e, i, f, o) {
      let n, d = b(i, a.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return R(o) || (C = Error(T("Argument unexpected for: %s", i))), y(i, I(i)), e;
      let h = R(o) ? 0 : 1;
      if (m["nargs-eats-options"])
        f.length - (e + 1) + h < d && (C = Error(T("Not enough arguments following: %s", i))), h = d;
      else {
        for (n = e + 1; n < f.length && (!f[n].match(/^-[^0-9]/) || f[n].match(S) || ie(f[n])); n++)
          h++;
        h < d && (C = Error(T("Not enough arguments following: %s", i)));
      }
      let g = Math.min(h, d);
      for (!R(o) && g > 0 && (y(i, o), g--), n = e + 1; n < g + e + 1; n++)
        y(i, f[n]);
      return e + g;
    }
    function ne(e, i, f, o) {
      let n = [], d = o || f[e + 1];
      const h = b(i, a.nargs);
      if (b(i, a.bools) && !/^(true|false)$/.test(d))
        n.push(!0);
      else if (R(d) || R(o) && /^-/.test(d) && !S.test(d) && !ie(d)) {
        if (E[i] !== void 0) {
          const g = E[i];
          n = Array.isArray(g) ? g : [g];
        }
      } else {
        R(o) || n.push(le(i, o, !0));
        for (let g = e + 1; g < f.length && !(!m["greedy-arrays"] && n.length > 0 || h && typeof h == "number" && n.length >= h || (d = f[g], /^-/.test(d) && !S.test(d) && !ie(d))); g++)
          e = g, n.push(le(i, d, u));
      }
      return typeof h == "number" && (h && n.length < h || isNaN(h) && n.length === 0) && (C = Error(T("Not enough arguments following: %s", i))), y(i, n), e;
    }
    function y(e, i, f = u) {
      if (/-/.test(e) && m["camel-case-expansion"]) {
        const d = e.split(".").map(function(h) {
          return M(h);
        }).join(".");
        Oe(e, d);
      }
      const o = le(e, i, f), n = e.split(".");
      z(A, n, o), a.aliases[e] && a.aliases[e].forEach(function(d) {
        const h = d.split(".");
        z(A, h, o);
      }), n.length > 1 && m["dot-notation"] && (a.aliases[n[0]] || []).forEach(function(d) {
        let h = d.split(".");
        const g = [].concat(n);
        g.shift(), h = h.concat(g), (a.aliases[e] || []).includes(h.join(".")) || z(A, h, o);
      }), b(e, a.normalize) && !b(e, a.arrays) && [e].concat(a.aliases[e] || []).forEach(function(h) {
        Object.defineProperty(Ae, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(g) {
            i = typeof g == "string" ? W.normalize(g) : g;
          }
        });
      });
    }
    function Oe(e, i) {
      a.aliases[e] && a.aliases[e].length || (a.aliases[e] = [i], k[i] = !0), a.aliases[i] && a.aliases[i].length || Oe(i, e);
    }
    function le(e, i, f) {
      f && (i = yt(i)), (b(e, a.bools) || b(e, a.counts)) && typeof i == "string" && (i = i === "true");
      let o = Array.isArray(i) ? i.map(function(n) {
        return se(e, n);
      }) : se(e, i);
      return b(e, a.counts) && (R(o) || typeof o == "boolean") && (o = ue()), b(e, a.normalize) && b(e, a.arrays) && (Array.isArray(i) ? o = i.map((n) => W.normalize(n)) : o = W.normalize(i)), o;
    }
    function se(e, i) {
      return !m["parse-positional-numbers"] && e === "_" || !b(e, a.strings) && !b(e, a.bools) && !Array.isArray(i) && (Ie(i) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !R(i) && b(e, a.numbers)) && (i = Number(i)), i;
    }
    function Ue(e) {
      const i = /* @__PURE__ */ Object.create(null);
      $e(i, a.aliases, E), Object.keys(a.configs).forEach(function(f) {
        const o = e[f] || i[f];
        if (o)
          try {
            let n = null;
            const d = W.resolve(W.cwd(), o), h = a.configs[f];
            if (typeof h == "function") {
              try {
                n = h(d);
              } catch (g) {
                n = g;
              }
              if (n instanceof Error) {
                C = n;
                return;
              }
            } else
              n = W.require(d);
            fe(n);
          } catch (n) {
            n.name === "PermissionDenied" ? C = n : e[f] && (C = Error(T("Invalid JSON config file: %s", o)));
          }
      });
    }
    function fe(e, i) {
      Object.keys(e).forEach(function(f) {
        const o = e[f], n = i ? i + "." + f : f;
        typeof o == "object" && o !== null && !Array.isArray(o) && m["dot-notation"] ? fe(o, n) : (!v(A, n.split(".")) || b(n, a.arrays) && m["combine-arrays"]) && y(n, o);
      });
    }
    function Ge() {
      typeof $ < "u" && $.forEach(function(e) {
        fe(e);
      });
    }
    function we(e, i) {
      if (typeof _ > "u")
        return;
      const f = typeof _ == "string" ? _ : "", o = W.env();
      Object.keys(o).forEach(function(n) {
        if (f === "" || n.lastIndexOf(f, 0) === 0) {
          const d = n.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(f.length)), M(h);
          });
          (i && a.configs[d.join(".")] || !i) && !v(e, d) && y(d.join("."), o[n]);
        }
      });
    }
    function Qe(e) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(e).forEach(function(o) {
        if (!f.has(o) && (i = b(o, a.coercions), typeof i == "function"))
          try {
            const n = se(o, i(e[o]));
            [].concat(a.aliases[o] || [], o).forEach((d) => {
              f.add(d), e[d] = n;
            });
          } catch (n) {
            C = n;
          }
      });
    }
    function Ye(e) {
      return a.keys.forEach((i) => {
        ~i.indexOf(".") || typeof e[i] > "u" && (e[i] = void 0);
      }), e;
    }
    function $e(e, i, f, o = !1) {
      Object.keys(f).forEach(function(n) {
        v(e, n.split(".")) || (z(e, n.split("."), f[n]), o && (_e[n] = !0), (i[n] || []).forEach(function(d) {
          v(e, d.split(".")) || z(e, d.split("."), f[n]);
        }));
      });
    }
    function v(e, i) {
      let f = e;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(n) {
        f = f[n] || {};
      });
      const o = i[i.length - 1];
      return typeof f != "object" ? !1 : o in f;
    }
    function z(e, i, f) {
      let o = e;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(O) {
        O = xe(O), typeof o == "object" && o[O] === void 0 && (o[O] = {}), typeof o[O] != "object" || Array.isArray(o[O]) ? (Array.isArray(o[O]) ? o[O].push({}) : o[O] = [o[O], {}], o = o[O][o[O].length - 1]) : o = o[O];
      });
      const n = xe(i[i.length - 1]), d = b(i.join("."), a.arrays), h = Array.isArray(f);
      let g = m["duplicate-arguments-array"];
      !g && b(n, a.nargs) && (g = !0, (!R(o[n]) && a.nargs[n] === 1 || Array.isArray(o[n]) && o[n].length === a.nargs[n]) && (o[n] = void 0)), f === ue() ? o[n] = ue(o[n]) : Array.isArray(o[n]) ? g && d && h ? o[n] = m["flatten-duplicate-arrays"] ? o[n].concat(f) : (Array.isArray(o[n][0]) ? o[n] : [o[n]]).concat([f]) : !g && !!d == !!h ? o[n] = f : o[n] = o[n].concat([f]) : o[n] === void 0 && d ? o[n] = h ? f : [f] : g && !(o[n] === void 0 || b(n, a.counts) || b(n, a.bools)) ? o[n] = [o[n], f] : o[n] = f;
    }
    function qe(...e) {
      e.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          a.aliases[f] || (a.aliases[f] = [].concat(p[f] || []), a.aliases[f].concat(f).forEach(function(o) {
            if (/-/.test(o) && m["camel-case-expansion"]) {
              const n = M(o);
              n !== f && a.aliases[f].indexOf(n) === -1 && (a.aliases[f].push(n), k[n] = !0);
            }
          }), a.aliases[f].concat(f).forEach(function(o) {
            if (o.length > 1 && /[A-Z]/.test(o) && m["camel-case-expansion"]) {
              const n = Te(o, "-");
              n !== f && a.aliases[f].indexOf(n) === -1 && (a.aliases[f].push(n), k[n] = !0);
            }
          }), a.aliases[f].forEach(function(o) {
            a.aliases[o] = [f].concat(a.aliases[f].filter(function(n) {
              return o !== n;
            }));
          }));
        });
      });
    }
    function b(e, i) {
      const f = [].concat(a.aliases[e] || [], e), o = Object.keys(i), n = f.find((d) => o.includes(d));
      return n ? i[n] : !1;
    }
    function je(e) {
      const i = Object.keys(a);
      return [].concat(i.map((o) => a[o])).some(function(o) {
        return Array.isArray(o) ? o.includes(e) : o[e];
      });
    }
    function Ve(e, ...i) {
      return [].concat(...i).some(function(o) {
        const n = e.match(o);
        return n && je(n[1]);
      });
    }
    function He(e) {
      if (e.match(S) || !e.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const o = e.slice(1).split("");
      for (let n = 0; n < o.length; n++) {
        if (f = e.slice(n + 2), !je(o[n])) {
          i = !1;
          break;
        }
        if (o[n + 1] && o[n + 1] === "=" || f === "-" || /[A-Za-z]/.test(o[n]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || o[n + 1] && o[n + 1].match(/\W/))
          break;
      }
      return i;
    }
    function ie(e) {
      return m["unknown-options-as-args"] && Ke(e);
    }
    function Ke(e) {
      return e = e.replace(/^-{3,}/, "--"), e.match(S) || He(e) ? !1 : !Ve(e, /^-+([^=]+?)=[\s\S]*$/, ce, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function I(e) {
      return !b(e, a.bools) && !b(e, a.counts) && `${e}` in E ? E[e] : Je(Xe(e));
    }
    function Je(e) {
      return {
        [L.BOOLEAN]: !0,
        [L.STRING]: "",
        [L.NUMBER]: void 0,
        [L.ARRAY]: []
      }[e];
    }
    function Xe(e) {
      let i = L.BOOLEAN;
      return b(e, a.strings) ? i = L.STRING : b(e, a.numbers) ? i = L.NUMBER : b(e, a.bools) ? i = L.BOOLEAN : b(e, a.arrays) && (i = L.ARRAY), i;
    }
    function R(e) {
      return e === void 0;
    }
    function Ze() {
      Object.keys(a.counts).find((e) => b(e, a.arrays) ? (C = Error(T("Invalid configuration: %s, opts.count excludes opts.array.", e)), !0) : b(e, a.nargs) ? (C = Error(T("Invalid configuration: %s, opts.count excludes opts.narg.", e)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(Ae, A),
      configuration: m,
      defaulted: Object.assign({}, _e),
      error: C,
      newAliases: Object.assign({}, k)
    };
  }
}
function bt(s) {
  const t = [], r = /* @__PURE__ */ Object.create(null);
  let c = !0;
  for (Object.keys(s).forEach(function(l) {
    t.push([].concat(s[l], l));
  }); c; ) {
    c = !1;
    for (let l = 0; l < t.length; l++)
      for (let u = l + 1; u < t.length; u++)
        if (t[l].filter(function(m) {
          return t[u].indexOf(m) !== -1;
        }).length) {
          t[l] = t[l].concat(t[u]), t.splice(u, 1), c = !0;
          break;
        }
  }
  return t.forEach(function(l) {
    l = l.filter(function(p, m, E) {
      return E.indexOf(p) === m;
    });
    const u = l.pop();
    u !== void 0 && typeof u == "string" && (r[u] = l);
  }), r;
}
function ue(s) {
  return s !== void 0 ? s + 1 : 1;
}
function xe(s) {
  return s === "__proto__" ? "___proto___" : s;
}
function yt(s) {
  return typeof s == "string" && (s[0] === "'" || s[0] === '"') && s[s.length - 1] === s[0] ? s.substring(1, s.length - 1) : s;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var he, de, pe;
const Ce = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Ne = (de = (he = process == null ? void 0 : process.versions) === null || he === void 0 ? void 0 : he.node) !== null && de !== void 0 ? de : (pe = process == null ? void 0 : process.version) === null || pe === void 0 ? void 0 : pe.slice(1);
if (Ne && Number(Ne.match(/^([^.]+)/)[1]) < Ce)
  throw Error(`yargs parser supports a minimum Node.js version of ${Ce}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Et = process ? process.env : {}, Pe = new mt({
  cwd: process.cwd,
  env: () => Et,
  format: Fe,
  normalize: tt,
  resolve: P,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (s) => {
    if (typeof require < "u")
      return require(s);
    if (s.match(/\.json$/))
      return JSON.parse(Ee(s, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), J = function(t, r) {
  return Pe.parse(t.slice(), r).argv;
};
J.detailed = function(s, t) {
  return Pe.parse(s.slice(), t);
};
J.camelCase = M;
J.decamelize = Te;
J.looksLikeNumber = Ie;
const _t = {
  right: xt,
  center: Ct
}, At = 0, re = 1, Ot = 2, oe = 3;
class wt {
  constructor(t) {
    var r;
    this.width = t.width, this.wrap = (r = t.wrap) !== null && r !== void 0 ? r : !0, this.rows = [];
  }
  span(...t) {
    const r = this.div(...t);
    r.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const r = t.map((c) => typeof c == "string" ? this.colFromString(c) : c);
    return this.rows.push(r), r;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const r = t.split(`
`).map((l) => l.split("	"));
    let c = 0;
    return r.forEach((l) => {
      l.length > 1 && j.stringWidth(l[0]) > c && (c = Math.min(Math.floor(this.width * 0.5), j.stringWidth(l[0])));
    }), r.forEach((l) => {
      this.div(...l.map((u, p) => ({
        text: u.trim(),
        padding: this.measurePadding(u),
        width: p === 0 && l.length > 1 ? c : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(t) {
    return {
      text: t,
      padding: this.measurePadding(t)
    };
  }
  measurePadding(t) {
    const r = j.stripAnsi(t);
    return [0, r.match(/\s*$/)[0].length, 0, r.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((r) => {
      this.rowToString(r, t);
    }), t.filter((r) => !r.hidden).map((r) => r.text).join(`
`);
  }
  rowToString(t, r) {
    return this.rasterize(t).forEach((c, l) => {
      let u = "";
      c.forEach((p, m) => {
        const { width: E } = t[m], $ = this.negatePadding(t[m]);
        let _ = p;
        if ($ > j.stringWidth(p) && (_ += " ".repeat($ - j.stringWidth(p))), t[m].align && t[m].align !== "left" && this.wrap) {
          const B = _t[t[m].align];
          _ = B(_, $), j.stringWidth(_) < $ && (_ += " ".repeat((E || 0) - j.stringWidth(_) - 1));
        }
        const F = t[m].padding || [0, 0, 0, 0];
        F[oe] && (u += " ".repeat(F[oe])), u += Le(t[m], _, "| "), u += _, u += Le(t[m], _, " |"), F[re] && (u += " ".repeat(F[re])), l === 0 && r.length > 0 && (u = this.renderInline(u, r[r.length - 1]));
      }), r.push({
        text: u.replace(/ +$/, ""),
        span: t.span
      });
    }), r;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, r) {
    const c = t.match(/^ */), l = c ? c[0].length : 0, u = r.text, p = j.stringWidth(u.trimRight());
    return r.span ? this.wrap ? l < p ? t : (r.hidden = !0, u.trimRight() + " ".repeat(l - p) + t.trimLeft()) : (r.hidden = !0, u + t) : t;
  }
  rasterize(t) {
    const r = [], c = this.columnWidths(t);
    let l;
    return t.forEach((u, p) => {
      u.width = c[p], this.wrap ? l = j.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`) : l = u.text.split(`
`), u.border && (l.unshift("." + "-".repeat(this.negatePadding(u) + 2) + "."), l.push("'" + "-".repeat(this.negatePadding(u) + 2) + "'")), u.padding && (l.unshift(...new Array(u.padding[At] || 0).fill("")), l.push(...new Array(u.padding[Ot] || 0).fill(""))), l.forEach((m, E) => {
        r[E] || r.push([]);
        const $ = r[E];
        for (let _ = 0; _ < p; _++)
          $[_] === void 0 && $.push("");
        $.push(m);
      });
    }), r;
  }
  negatePadding(t) {
    let r = t.width || 0;
    return t.padding && (r -= (t.padding[oe] || 0) + (t.padding[re] || 0)), t.border && (r -= 4), r;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || j.stringWidth(p.text));
    let r = t.length, c = this.width;
    const l = t.map((p) => {
      if (p.width)
        return r--, c -= p.width, p.width;
    }), u = r ? Math.floor(c / r) : 0;
    return l.map((p, m) => p === void 0 ? Math.max(u, $t(t[m])) : p);
  }
}
function Le(s, t, r) {
  return s.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? r : "  " : "";
}
function $t(s) {
  const t = s.padding || [], r = 1 + (t[oe] || 0) + (t[re] || 0);
  return s.border ? r + 4 : r;
}
function jt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function xt(s, t) {
  s = s.trim();
  const r = j.stringWidth(s);
  return r < t ? " ".repeat(t - r) + s : s;
}
function Ct(s, t) {
  s = s.trim();
  const r = j.stringWidth(s);
  return r >= t ? s : " ".repeat(t - r >> 1) + s;
}
let j;
function Nt(s, t) {
  return j = t, new wt({
    width: s?.width || jt(),
    wrap: s?.wrap
  });
}
const ve = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ze(s) {
  return s.replace(ve, "");
}
function Lt(s, t) {
  const [r, c] = s.match(ve) || ["", ""];
  s = ze(s);
  let l = "";
  for (let u = 0; u < s.length; u++)
    u !== 0 && u % t === 0 && (l += `
`), l += s.charAt(u);
  return r && c && (l = `${r}${l}${c}`), l;
}
function St(s) {
  return Nt(s, {
    stringWidth: (t) => [...t].length,
    stripAnsi: ze,
    wrap: Lt
  });
}
function Ft(s, t) {
  let r = P(".", s), c;
  for (We(r).isDirectory() || (r = ge(r)); ; ) {
    if (c = t(r, rt(r)), c)
      return P(r, c);
    if (r = ge(c = r), c === r)
      break;
  }
}
const Rt = {
  fs: {
    readFileSync: Ee,
    writeFile: ot
  },
  format: Fe,
  resolve: P,
  exists: (s) => {
    try {
      return We(s).isFile();
    } catch {
      return !1;
    }
  }
};
let N;
class Wt {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const r = t.shift();
    let c = function() {
    };
    return typeof t[t.length - 1] == "function" && (c = t.pop()), c = c || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = r, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c(), N.format.apply(N.format, [this.cache[this.locale][r] || r].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), r = t.shift(), c = t.shift(), l = t.shift();
    let u = function() {
    };
    typeof t[t.length - 1] == "function" && (u = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = l === 1 ? r : c;
    this.cache[this.locale][r] && (p = this.cache[this.locale][r][l === 1 ? "one" : "other"]), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = {
      one: r,
      other: c
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: u
    })) : u();
    const m = [p];
    return ~p.indexOf("%d") && m.push(l), N.format.apply(N.format, m.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (this.cache[this.locale][r] = t[r]);
  }
  _taggedLiteral(t, ...r) {
    let c = "";
    return t.forEach(function(l, u) {
      const p = r[u + 1];
      c += l, typeof p < "u" && (c += "%s");
    }), this.__.apply(this, [c].concat([].slice.call(r, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, r = this.writeQueue[0], c = r.directory, l = r.locale, u = r.cb, p = this._resolveLocaleFile(c, l), m = JSON.stringify(this.cache[l], null, 2);
    N.fs.writeFile(p, m, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), u(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const r = this._resolveLocaleFile(this.directory, this.locale);
    try {
      N.fs.readFileSync && (t = JSON.parse(N.fs.readFileSync(r, "utf-8")));
    } catch (c) {
      if (c instanceof SyntaxError && (c.message = "syntax error in " + r), c.code === "ENOENT")
        t = {};
      else
        throw c;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, r) {
    let c = N.resolve(t, "./", r + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(c) && ~r.lastIndexOf("_")) {
      const l = N.resolve(t, "./", r.split("_")[0] + ".json");
      this._fileExistsSync(l) && (c = l);
    }
    return c;
  }
  _fileExistsSync(t) {
    return N.exists(t);
  }
}
function Bt(s, t) {
  N = t;
  const r = new Wt(s);
  return {
    __: r.__.bind(r),
    __n: r.__n.bind(r),
    setLocale: r.setLocale.bind(r),
    getLocale: r.getLocale.bind(r),
    updateLocale: r.updateLocale.bind(r),
    locale: r.locale
  };
}
const Tt = (s) => Bt(s, Rt), It = "require is not supported by ESM", Se = "loading a directory of commands is not supported yet for ESM";
let V;
try {
  V = lt(import.meta.url);
} catch {
  V = process.cwd();
}
const Pt = V.substring(0, V.lastIndexOf("node_modules"));
ct, at, et, Pt || process.cwd(), nt, ge, st, it, P, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Ee, Tt({
  directory: P(V, "../../../locales"),
  updateFiles: !1
});
const be = "\x1B[44m", H = "\x1B[43m", K = "\x1B[41m", vt = "\x1B[42m", x = "\x1B[0m", X = "\x1B[33m", Z = "\x1B[0m", ye = 50, D = [], zt = (s, t) => {
  const r = s.content.split(`
`);
  r.length > ye && D.push({ fileName: t, scriptLength: r.length });
}, Mt = () => (D.length > 0 && (console.log(`
${K}Long <script> blocks${x} in ${D.length} files.`), console.log(
  `👉 ${X}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${ye} lines.${Z}`
), D.forEach((s) => {
  console.log(
    `- ${s.fileName} ${s.scriptLength > ye * 2 ? K : H}(${s.scriptLength} lines)${x}`
  );
})), D.length), U = [], Dt = (s) => {
  U.push(s);
}, Ut = () => (U.length > 0 && (console.log(`
${H}Plain <script> blocks${x} in ${U.length} files.`), console.log(`👉 ${X} Consider using <script setup> to leverage the new SFC <script> syntax.${Z}`), U.forEach((s) => {
  console.log(`- ${s}`);
})), U.length), G = [], Gt = (s, t) => {
  const r = /\belse\b/gi, c = s.content.match(r);
  c?.length && G.push({ fileName: t, elseCount: c.length });
}, Qt = () => (G.length > 0 && (console.log(`
${H}else conditions${x} are used in ${G.length} files.`), console.log(`👉 ${X}Try to rewrite the conditions in a way that the else clause is not necessary.${Z}`), G.forEach((s) => {
  console.log(`- ${s.fileName} ${H}(${s.elseCount})${x}`);
})), G.length), Yt = 5, qt = 10, Q = [], Vt = (s, t) => {
  const r = /\bif\b/gi, c = /\belse\b/gi, l = /\bfor\b/gi, u = /\bwhile\b/gi, p = /\bcase\b/gi, m = s.content.match(r), E = s.content.match(c), $ = s.content.match(l), _ = s.content.match(u), F = s.content.match(p), B = (m?.length || 0) + (E?.length || 0) + ($?.length || 0) + (_?.length || 0) + (F?.length || 0);
  B > Yt && Q.push({ fileName: t, cyclomaticComplexity: B });
}, Ht = () => (Q.length > 0 && (console.log(
  `
${be}cyclomaticComplexity${x} is above moderate in ${Q.length} files.`
), console.log(`👉 ${X}Try to reduce complexity.${Z}`), Q.forEach((s) => {
  console.log(
    `- ${s.fileName} ${s.cyclomaticComplexity > qt ? K : H}(${s.cyclomaticComplexity})${x}`
  );
})), Q.length), Y = [], Kt = (s) => {
  if (s.includes("pages"))
    return;
  const t = Re.basename(s);
  if (t === "App.vue")
    return;
  const r = /[A-Z]/;
  t.slice(1).match(r)?.length || Y.push({ fileName: s });
}, Jt = () => (Y.length > 0 && (console.log(`
${K}single name component${x} is used in ${Y.length} files.`), console.log(
  `👉 ${X}Rename the component.${Z} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), Y.forEach((s) => {
  console.log(`- ${K}(${s.fileName})${x}`);
})), Y.length);
let Me = 0;
const De = (s, t) => {
  const r = me.readdirSync(s);
  Me += r.length;
  for (const c of r) {
    const l = Re.join(s, c);
    me.statSync(l).isDirectory() ? De(l, t) : c.endsWith(".vue") && t(l);
  }
}, Xt = (s) => {
  console.log(`

${be}Analyzing Vue files in ${s}${x}`);
  let t = 0;
  De(s, (r) => {
    const c = me.readFileSync(r, "utf-8"), { descriptor: l } = ft(c);
    l.script && Dt(r);
    const u = l.scriptSetup || l.script;
    u && (zt(u, r), Gt(u, r), Vt(u, r), Kt(r));
  }), console.log(`Found ${be}${Me}${x} Vue files`), t += Mt(), t += Ut(), t += Qt(), t += Ht(), t += Jt(), t || console.log(`${vt}No code smells detected!${x}`);
};
ke(dt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (s) => s.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (s) => {
    Xt(s.path);
  }
).help().argv;
