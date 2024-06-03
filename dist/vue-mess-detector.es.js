import et from "yargs";
import { format as Re, inspect as tt } from "util";
import nt, { normalize as st, resolve as P, dirname as de, basename as it, extname as rt, relative as ot } from "path";
import pe, { readFileSync as ye, statSync as Be, readdirSync as ct, writeFile as at } from "fs";
import { notStrictEqual as lt, strictEqual as ft } from "assert";
import { fileURLToPath as ut } from "url";
import { parse as ht } from "@vue/compiler-sfc";
class Y extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Y);
  }
}
function Te() {
  return dt() ? 0 : 1;
}
function dt() {
  return pt() && !process.defaultApp;
}
function pt() {
  return !!process.versions.electron;
}
function gt(i) {
  return i.slice(Te() + 1);
}
function mt() {
  return process.argv[Te()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function M(i) {
  if (i !== i.toLowerCase() && i !== i.toUpperCase() || (i = i.toLowerCase()), i.indexOf("-") === -1 && i.indexOf("_") === -1)
    return i;
  {
    let r = "", c = !1;
    const a = i.match(/^-+/);
    for (let u = a ? a[0].length : 0; u < i.length; u++) {
      let p = i.charAt(u);
      c && (c = !1, p = p.toUpperCase()), u !== 0 && (p === "-" || p === "_") ? c = !0 : p !== "-" && p !== "_" && (r += p);
    }
    return r;
  }
}
function Ie(i, t) {
  const r = i.toLowerCase();
  t = t || "-";
  let c = "";
  for (let a = 0; a < i.length; a++) {
    const u = r.charAt(a), p = i.charAt(a);
    u !== p && a > 0 ? c += `${t}${r.charAt(a)}` : c += p;
  }
  return c;
}
function Pe(i) {
  return i == null ? !1 : typeof i == "number" || /^0x[0-9a-f]+$/i.test(i) ? !0 : /^0[^.]/.test(i) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(i);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function bt(i) {
  if (Array.isArray(i))
    return i.map((p) => typeof p != "string" ? p + "" : p);
  i = i.trim();
  let t = 0, r = null, c = null, a = null;
  const u = [];
  for (let p = 0; p < i.length; p++) {
    if (r = c, c = i.charAt(p), c === " " && !a) {
      r !== " " && t++;
      continue;
    }
    c === a ? a = null : (c === "'" || c === '"') && !a && (a = c), u[t] || (u[t] = ""), u[t] += c;
  }
  return u;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var N;
(function(i) {
  i.BOOLEAN = "boolean", i.STRING = "string", i.NUMBER = "number", i.ARRAY = "array";
})(N || (N = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let R;
class yt {
  constructor(t) {
    R = t;
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
    }, r), a = bt(t), u = typeof t == "string", p = Et(Object.assign(/* @__PURE__ */ Object.create(null), c.alias)), m = Object.assign({
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
    }, c.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), c.default), j = c.configObjects || [], _ = c.envPrefix, F = m["populate--"], B = F ? "--" : "_", K = /* @__PURE__ */ Object.create(null), Ee = /* @__PURE__ */ Object.create(null), T = c.__ || R.format, l = {
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
    }, L = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, re = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(c.array || []).filter(Boolean).forEach(function(e) {
      const s = typeof e == "object" ? e.key : e, f = Object.keys(e).map(function(o) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[o];
      }).filter(Boolean).pop();
      f && (l[f][s] = !0), l.arrays[s] = !0, l.keys.push(s);
    }), [].concat(c.boolean || []).filter(Boolean).forEach(function(e) {
      l.bools[e] = !0, l.keys.push(e);
    }), [].concat(c.string || []).filter(Boolean).forEach(function(e) {
      l.strings[e] = !0, l.keys.push(e);
    }), [].concat(c.number || []).filter(Boolean).forEach(function(e) {
      l.numbers[e] = !0, l.keys.push(e);
    }), [].concat(c.count || []).filter(Boolean).forEach(function(e) {
      l.counts[e] = !0, l.keys.push(e);
    }), [].concat(c.normalize || []).filter(Boolean).forEach(function(e) {
      l.normalize[e] = !0, l.keys.push(e);
    }), typeof c.narg == "object" && Object.entries(c.narg).forEach(([e, s]) => {
      typeof s == "number" && (l.nargs[e] = s, l.keys.push(e));
    }), typeof c.coerce == "object" && Object.entries(c.coerce).forEach(([e, s]) => {
      typeof s == "function" && (l.coercions[e] = s, l.keys.push(e));
    }), typeof c.config < "u" && (Array.isArray(c.config) || typeof c.config == "string" ? [].concat(c.config).filter(Boolean).forEach(function(e) {
      l.configs[e] = !0;
    }) : typeof c.config == "object" && Object.entries(c.config).forEach(([e, s]) => {
      (typeof s == "boolean" || typeof s == "function") && (l.configs[e] = s);
    })), Ve(c.key, p, c.default, l.arrays), Object.keys(E).forEach(function(e) {
      (l.aliases[e] || []).forEach(function(s) {
        E[s] = E[e];
      });
    });
    let x = null;
    ke();
    let J = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), _e = {};
    for (let e = 0; e < a.length; e++) {
      const s = a[e], f = s.replace(/^-{3,}/, "---");
      let o, n, d, h, g, O;
      if (s !== "--" && /^-/.test(s) && ee(s))
        oe(s);
      else if (f.match(/^---+(=|$)/)) {
        oe(s);
        continue;
      } else if (s.match(/^--.+=/) || !m["short-option-groups"] && s.match(/^-.+=/))
        h = s.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], l.arrays) ? e = Z(e, h[1], a, h[2]) : b(h[1], l.nargs) !== !1 ? e = X(e, h[1], a, h[2]) : y(h[1], h[2], !0));
      else if (s.match(re) && m["boolean-negation"])
        h = s.match(re), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], y(n, b(n, l.arrays) ? [!1] : !1));
      else if (s.match(/^--.+/) || !m["short-option-groups"] && s.match(/^-[^-]+/))
        h = s.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], b(n, l.arrays) ? e = Z(e, n, a) : b(n, l.nargs) !== !1 ? e = X(e, n, a) : (g = a[e + 1], g !== void 0 && (!g.match(/^-/) || g.match(L)) && !b(n, l.bools) && !b(n, l.counts) || /^(true|false)$/.test(g) ? (y(n, g), e++) : y(n, I(n))));
      else if (s.match(/^-.\..+=/))
        h = s.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (s.match(/^-.\..+/) && !s.match(L))
        g = a[e + 1], h = s.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (n = h[1], g !== void 0 && !g.match(/^-/) && !b(n, l.bools) && !b(n, l.counts) ? (y(n, g), e++) : y(n, I(n)));
      else if (s.match(/^-[^-]+/) && !s.match(L)) {
        d = s.slice(1, -1).split(""), o = !1;
        for (let w = 0; w < d.length; w++) {
          if (g = s.slice(w + 2), d[w + 1] && d[w + 1] === "=") {
            O = s.slice(w + 3), n = d[w], b(n, l.arrays) ? e = Z(e, n, a, O) : b(n, l.nargs) !== !1 ? e = X(e, n, a, O) : y(n, O), o = !0;
            break;
          }
          if (g === "-") {
            y(d[w], g);
            continue;
          }
          if (/[A-Za-z]/.test(d[w]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, l.bools) === !1) {
            y(d[w], g), o = !0;
            break;
          }
          if (d[w + 1] && d[w + 1].match(/\W/)) {
            y(d[w], g), o = !0;
            break;
          } else
            y(d[w], I(d[w]));
        }
        n = s.slice(-1)[0], !o && n !== "-" && (b(n, l.arrays) ? e = Z(e, n, a) : b(n, l.nargs) !== !1 ? e = X(e, n, a) : (g = a[e + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(L)) && !b(n, l.bools) && !b(n, l.counts) || /^(true|false)$/.test(g) ? (y(n, g), e++) : y(n, I(n))));
      } else if (s.match(/^-[0-9]$/) && s.match(L) && b(s.slice(1), l.bools))
        n = s.slice(1), y(n, I(n));
      else if (s === "--") {
        J = a.slice(e + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        J = a.slice(e);
        break;
      } else
        oe(s);
    }
    Oe(A, !0), Oe(A, !1), Ge(A), Qe(), we(A, l.aliases, E, !0), Ye(A), m["set-placeholder-key"] && qe(A), Object.keys(l.counts).forEach(function(e) {
      v(A, e.split(".")) || y(e, 0);
    }), F && J.length && (A[B] = []), J.forEach(function(e) {
      A[B].push(e);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((e) => e !== "--" && e.includes("-")).forEach((e) => {
      delete A[e];
    }), m["strip-aliased"] && [].concat(...Object.keys(p).map((e) => p[e])).forEach((e) => {
      m["camel-case-expansion"] && e.includes("-") && delete A[e.split(".").map((s) => M(s)).join(".")], delete A[e];
    });
    function oe(e) {
      const s = k("_", e);
      (typeof s == "string" || typeof s == "number") && A._.push(s);
    }
    function X(e, s, f, o) {
      let n, d = b(s, l.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return W(o) || (x = Error(T("Argument unexpected for: %s", s))), y(s, I(s)), e;
      let h = W(o) ? 0 : 1;
      if (m["nargs-eats-options"])
        f.length - (e + 1) + h < d && (x = Error(T("Not enough arguments following: %s", s))), h = d;
      else {
        for (n = e + 1; n < f.length && (!f[n].match(/^-[^0-9]/) || f[n].match(L) || ee(f[n])); n++)
          h++;
        h < d && (x = Error(T("Not enough arguments following: %s", s)));
      }
      let g = Math.min(h, d);
      for (!W(o) && g > 0 && (y(s, o), g--), n = e + 1; n < g + e + 1; n++)
        y(s, f[n]);
      return e + g;
    }
    function Z(e, s, f, o) {
      let n = [], d = o || f[e + 1];
      const h = b(s, l.nargs);
      if (b(s, l.bools) && !/^(true|false)$/.test(d))
        n.push(!0);
      else if (W(d) || W(o) && /^-/.test(d) && !L.test(d) && !ee(d)) {
        if (E[s] !== void 0) {
          const g = E[s];
          n = Array.isArray(g) ? g : [g];
        }
      } else {
        W(o) || n.push(ce(s, o, !0));
        for (let g = e + 1; g < f.length && !(!m["greedy-arrays"] && n.length > 0 || h && typeof h == "number" && n.length >= h || (d = f[g], /^-/.test(d) && !L.test(d) && !ee(d))); g++)
          e = g, n.push(ce(s, d, u));
      }
      return typeof h == "number" && (h && n.length < h || isNaN(h) && n.length === 0) && (x = Error(T("Not enough arguments following: %s", s))), y(s, n), e;
    }
    function y(e, s, f = u) {
      if (/-/.test(e) && m["camel-case-expansion"]) {
        const d = e.split(".").map(function(h) {
          return M(h);
        }).join(".");
        Ae(e, d);
      }
      const o = ce(e, s, f), n = e.split(".");
      z(A, n, o), l.aliases[e] && l.aliases[e].forEach(function(d) {
        const h = d.split(".");
        z(A, h, o);
      }), n.length > 1 && m["dot-notation"] && (l.aliases[n[0]] || []).forEach(function(d) {
        let h = d.split(".");
        const g = [].concat(n);
        g.shift(), h = h.concat(g), (l.aliases[e] || []).includes(h.join(".")) || z(A, h, o);
      }), b(e, l.normalize) && !b(e, l.arrays) && [e].concat(l.aliases[e] || []).forEach(function(h) {
        Object.defineProperty(_e, h, {
          enumerable: !0,
          get() {
            return s;
          },
          set(g) {
            s = typeof g == "string" ? R.normalize(g) : g;
          }
        });
      });
    }
    function Ae(e, s) {
      l.aliases[e] && l.aliases[e].length || (l.aliases[e] = [s], K[s] = !0), l.aliases[s] && l.aliases[s].length || Ae(s, e);
    }
    function ce(e, s, f) {
      f && (s = _t(s)), (b(e, l.bools) || b(e, l.counts)) && typeof s == "string" && (s = s === "true");
      let o = Array.isArray(s) ? s.map(function(n) {
        return k(e, n);
      }) : k(e, s);
      return b(e, l.counts) && (W(o) || typeof o == "boolean") && (o = le()), b(e, l.normalize) && b(e, l.arrays) && (Array.isArray(s) ? o = s.map((n) => R.normalize(n)) : o = R.normalize(s)), o;
    }
    function k(e, s) {
      return !m["parse-positional-numbers"] && e === "_" || !b(e, l.strings) && !b(e, l.bools) && !Array.isArray(s) && (Pe(s) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${s}`))) || !W(s) && b(e, l.numbers)) && (s = Number(s)), s;
    }
    function Ge(e) {
      const s = /* @__PURE__ */ Object.create(null);
      we(s, l.aliases, E), Object.keys(l.configs).forEach(function(f) {
        const o = e[f] || s[f];
        if (o)
          try {
            let n = null;
            const d = R.resolve(R.cwd(), o), h = l.configs[f];
            if (typeof h == "function") {
              try {
                n = h(d);
              } catch (g) {
                n = g;
              }
              if (n instanceof Error) {
                x = n;
                return;
              }
            } else
              n = R.require(d);
            ae(n);
          } catch (n) {
            n.name === "PermissionDenied" ? x = n : e[f] && (x = Error(T("Invalid JSON config file: %s", o)));
          }
      });
    }
    function ae(e, s) {
      Object.keys(e).forEach(function(f) {
        const o = e[f], n = s ? s + "." + f : f;
        typeof o == "object" && o !== null && !Array.isArray(o) && m["dot-notation"] ? ae(o, n) : (!v(A, n.split(".")) || b(n, l.arrays) && m["combine-arrays"]) && y(n, o);
      });
    }
    function Qe() {
      typeof j < "u" && j.forEach(function(e) {
        ae(e);
      });
    }
    function Oe(e, s) {
      if (typeof _ > "u")
        return;
      const f = typeof _ == "string" ? _ : "", o = R.env();
      Object.keys(o).forEach(function(n) {
        if (f === "" || n.lastIndexOf(f, 0) === 0) {
          const d = n.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(f.length)), M(h);
          });
          (s && l.configs[d.join(".")] || !s) && !v(e, d) && y(d.join("."), o[n]);
        }
      });
    }
    function Ye(e) {
      let s;
      const f = /* @__PURE__ */ new Set();
      Object.keys(e).forEach(function(o) {
        if (!f.has(o) && (s = b(o, l.coercions), typeof s == "function"))
          try {
            const n = k(o, s(e[o]));
            [].concat(l.aliases[o] || [], o).forEach((d) => {
              f.add(d), e[d] = n;
            });
          } catch (n) {
            x = n;
          }
      });
    }
    function qe(e) {
      return l.keys.forEach((s) => {
        ~s.indexOf(".") || typeof e[s] > "u" && (e[s] = void 0);
      }), e;
    }
    function we(e, s, f, o = !1) {
      Object.keys(f).forEach(function(n) {
        v(e, n.split(".")) || (z(e, n.split("."), f[n]), o && (Ee[n] = !0), (s[n] || []).forEach(function(d) {
          v(e, d.split(".")) || z(e, d.split("."), f[n]);
        }));
      });
    }
    function v(e, s) {
      let f = e;
      m["dot-notation"] || (s = [s.join(".")]), s.slice(0, -1).forEach(function(n) {
        f = f[n] || {};
      });
      const o = s[s.length - 1];
      return typeof f != "object" ? !1 : o in f;
    }
    function z(e, s, f) {
      let o = e;
      m["dot-notation"] || (s = [s.join(".")]), s.slice(0, -1).forEach(function(O) {
        O = $e(O), typeof o == "object" && o[O] === void 0 && (o[O] = {}), typeof o[O] != "object" || Array.isArray(o[O]) ? (Array.isArray(o[O]) ? o[O].push({}) : o[O] = [o[O], {}], o = o[O][o[O].length - 1]) : o = o[O];
      });
      const n = $e(s[s.length - 1]), d = b(s.join("."), l.arrays), h = Array.isArray(f);
      let g = m["duplicate-arguments-array"];
      !g && b(n, l.nargs) && (g = !0, (!W(o[n]) && l.nargs[n] === 1 || Array.isArray(o[n]) && o[n].length === l.nargs[n]) && (o[n] = void 0)), f === le() ? o[n] = le(o[n]) : Array.isArray(o[n]) ? g && d && h ? o[n] = m["flatten-duplicate-arrays"] ? o[n].concat(f) : (Array.isArray(o[n][0]) ? o[n] : [o[n]]).concat([f]) : !g && !!d == !!h ? o[n] = f : o[n] = o[n].concat([f]) : o[n] === void 0 && d ? o[n] = h ? f : [f] : g && !(o[n] === void 0 || b(n, l.counts) || b(n, l.bools)) ? o[n] = [o[n], f] : o[n] = f;
    }
    function Ve(...e) {
      e.forEach(function(s) {
        Object.keys(s || {}).forEach(function(f) {
          l.aliases[f] || (l.aliases[f] = [].concat(p[f] || []), l.aliases[f].concat(f).forEach(function(o) {
            if (/-/.test(o) && m["camel-case-expansion"]) {
              const n = M(o);
              n !== f && l.aliases[f].indexOf(n) === -1 && (l.aliases[f].push(n), K[n] = !0);
            }
          }), l.aliases[f].concat(f).forEach(function(o) {
            if (o.length > 1 && /[A-Z]/.test(o) && m["camel-case-expansion"]) {
              const n = Ie(o, "-");
              n !== f && l.aliases[f].indexOf(n) === -1 && (l.aliases[f].push(n), K[n] = !0);
            }
          }), l.aliases[f].forEach(function(o) {
            l.aliases[o] = [f].concat(l.aliases[f].filter(function(n) {
              return o !== n;
            }));
          }));
        });
      });
    }
    function b(e, s) {
      const f = [].concat(l.aliases[e] || [], e), o = Object.keys(s), n = f.find((d) => o.includes(d));
      return n ? s[n] : !1;
    }
    function je(e) {
      const s = Object.keys(l);
      return [].concat(s.map((o) => l[o])).some(function(o) {
        return Array.isArray(o) ? o.includes(e) : o[e];
      });
    }
    function He(e, ...s) {
      return [].concat(...s).some(function(o) {
        const n = e.match(o);
        return n && je(n[1]);
      });
    }
    function Ke(e) {
      if (e.match(L) || !e.match(/^-[^-]+/))
        return !1;
      let s = !0, f;
      const o = e.slice(1).split("");
      for (let n = 0; n < o.length; n++) {
        if (f = e.slice(n + 2), !je(o[n])) {
          s = !1;
          break;
        }
        if (o[n + 1] && o[n + 1] === "=" || f === "-" || /[A-Za-z]/.test(o[n]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || o[n + 1] && o[n + 1].match(/\W/))
          break;
      }
      return s;
    }
    function ee(e) {
      return m["unknown-options-as-args"] && Je(e);
    }
    function Je(e) {
      return e = e.replace(/^-{3,}/, "--"), e.match(L) || Ke(e) ? !1 : !He(e, /^-+([^=]+?)=[\s\S]*$/, re, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function I(e) {
      return !b(e, l.bools) && !b(e, l.counts) && `${e}` in E ? E[e] : Xe(Ze(e));
    }
    function Xe(e) {
      return {
        [N.BOOLEAN]: !0,
        [N.STRING]: "",
        [N.NUMBER]: void 0,
        [N.ARRAY]: []
      }[e];
    }
    function Ze(e) {
      let s = N.BOOLEAN;
      return b(e, l.strings) ? s = N.STRING : b(e, l.numbers) ? s = N.NUMBER : b(e, l.bools) ? s = N.BOOLEAN : b(e, l.arrays) && (s = N.ARRAY), s;
    }
    function W(e) {
      return e === void 0;
    }
    function ke() {
      Object.keys(l.counts).find((e) => b(e, l.arrays) ? (x = Error(T("Invalid configuration: %s, opts.count excludes opts.array.", e)), !0) : b(e, l.nargs) ? (x = Error(T("Invalid configuration: %s, opts.count excludes opts.narg.", e)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(_e, A),
      configuration: m,
      defaulted: Object.assign({}, Ee),
      error: x,
      newAliases: Object.assign({}, K)
    };
  }
}
function Et(i) {
  const t = [], r = /* @__PURE__ */ Object.create(null);
  let c = !0;
  for (Object.keys(i).forEach(function(a) {
    t.push([].concat(i[a], a));
  }); c; ) {
    c = !1;
    for (let a = 0; a < t.length; a++)
      for (let u = a + 1; u < t.length; u++)
        if (t[a].filter(function(m) {
          return t[u].indexOf(m) !== -1;
        }).length) {
          t[a] = t[a].concat(t[u]), t.splice(u, 1), c = !0;
          break;
        }
  }
  return t.forEach(function(a) {
    a = a.filter(function(p, m, E) {
      return E.indexOf(p) === m;
    });
    const u = a.pop();
    u !== void 0 && typeof u == "string" && (r[u] = a);
  }), r;
}
function le(i) {
  return i !== void 0 ? i + 1 : 1;
}
function $e(i) {
  return i === "__proto__" ? "___proto___" : i;
}
function _t(i) {
  return typeof i == "string" && (i[0] === "'" || i[0] === '"') && i[i.length - 1] === i[0] ? i.substring(1, i.length - 1) : i;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var fe, ue, he;
const xe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Ce = (ue = (fe = process == null ? void 0 : process.versions) === null || fe === void 0 ? void 0 : fe.node) !== null && ue !== void 0 ? ue : (he = process == null ? void 0 : process.version) === null || he === void 0 ? void 0 : he.slice(1);
if (Ce && Number(Ce.match(/^([^.]+)/)[1]) < xe)
  throw Error(`yargs parser supports a minimum Node.js version of ${xe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const At = process ? process.env : {}, ve = new yt({
  cwd: process.cwd,
  env: () => At,
  format: Re,
  normalize: st,
  resolve: P,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (i) => {
    if (typeof require < "u")
      return require(i);
    if (i.match(/\.json$/))
      return JSON.parse(ye(i, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), H = function(t, r) {
  return ve.parse(t.slice(), r).argv;
};
H.detailed = function(i, t) {
  return ve.parse(i.slice(), t);
};
H.camelCase = M;
H.decamelize = Ie;
H.looksLikeNumber = Pe;
const Ot = {
  right: Nt,
  center: Lt
}, wt = 0, te = 1, jt = 2, ne = 3;
class $t {
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
`).map((a) => a.split("	"));
    let c = 0;
    return r.forEach((a) => {
      a.length > 1 && $.stringWidth(a[0]) > c && (c = Math.min(Math.floor(this.width * 0.5), $.stringWidth(a[0])));
    }), r.forEach((a) => {
      this.div(...a.map((u, p) => ({
        text: u.trim(),
        padding: this.measurePadding(u),
        width: p === 0 && a.length > 1 ? c : void 0
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
    const r = $.stripAnsi(t);
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
    return this.rasterize(t).forEach((c, a) => {
      let u = "";
      c.forEach((p, m) => {
        const { width: E } = t[m], j = this.negatePadding(t[m]);
        let _ = p;
        if (j > $.stringWidth(p) && (_ += " ".repeat(j - $.stringWidth(p))), t[m].align && t[m].align !== "left" && this.wrap) {
          const B = Ot[t[m].align];
          _ = B(_, j), $.stringWidth(_) < j && (_ += " ".repeat((E || 0) - $.stringWidth(_) - 1));
        }
        const F = t[m].padding || [0, 0, 0, 0];
        F[ne] && (u += " ".repeat(F[ne])), u += Ne(t[m], _, "| "), u += _, u += Ne(t[m], _, " |"), F[te] && (u += " ".repeat(F[te])), a === 0 && r.length > 0 && (u = this.renderInline(u, r[r.length - 1]));
      }), r.push({
        text: u.replace(/ +$/, ""),
        span: t.span
      });
    }), r;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, r) {
    const c = t.match(/^ */), a = c ? c[0].length : 0, u = r.text, p = $.stringWidth(u.trimRight());
    return r.span ? this.wrap ? a < p ? t : (r.hidden = !0, u.trimRight() + " ".repeat(a - p) + t.trimLeft()) : (r.hidden = !0, u + t) : t;
  }
  rasterize(t) {
    const r = [], c = this.columnWidths(t);
    let a;
    return t.forEach((u, p) => {
      u.width = c[p], this.wrap ? a = $.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`) : a = u.text.split(`
`), u.border && (a.unshift("." + "-".repeat(this.negatePadding(u) + 2) + "."), a.push("'" + "-".repeat(this.negatePadding(u) + 2) + "'")), u.padding && (a.unshift(...new Array(u.padding[wt] || 0).fill("")), a.push(...new Array(u.padding[jt] || 0).fill(""))), a.forEach((m, E) => {
        r[E] || r.push([]);
        const j = r[E];
        for (let _ = 0; _ < p; _++)
          j[_] === void 0 && j.push("");
        j.push(m);
      });
    }), r;
  }
  negatePadding(t) {
    let r = t.width || 0;
    return t.padding && (r -= (t.padding[ne] || 0) + (t.padding[te] || 0)), t.border && (r -= 4), r;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || $.stringWidth(p.text));
    let r = t.length, c = this.width;
    const a = t.map((p) => {
      if (p.width)
        return r--, c -= p.width, p.width;
    }), u = r ? Math.floor(c / r) : 0;
    return a.map((p, m) => p === void 0 ? Math.max(u, xt(t[m])) : p);
  }
}
function Ne(i, t, r) {
  return i.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? r : "  " : "";
}
function xt(i) {
  const t = i.padding || [], r = 1 + (t[ne] || 0) + (t[te] || 0);
  return i.border ? r + 4 : r;
}
function Ct() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Nt(i, t) {
  i = i.trim();
  const r = $.stringWidth(i);
  return r < t ? " ".repeat(t - r) + i : i;
}
function Lt(i, t) {
  i = i.trim();
  const r = $.stringWidth(i);
  return r >= t ? i : " ".repeat(t - r >> 1) + i;
}
let $;
function St(i, t) {
  return $ = t, new $t({
    width: i?.width || Ct(),
    wrap: i?.wrap
  });
}
const ze = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Me(i) {
  return i.replace(ze, "");
}
function Ft(i, t) {
  const [r, c] = i.match(ze) || ["", ""];
  i = Me(i);
  let a = "";
  for (let u = 0; u < i.length; u++)
    u !== 0 && u % t === 0 && (a += `
`), a += i.charAt(u);
  return r && c && (a = `${r}${a}${c}`), a;
}
function Wt(i) {
  return St(i, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Me,
    wrap: Ft
  });
}
function Rt(i, t) {
  let r = P(".", i), c;
  for (Be(r).isDirectory() || (r = de(r)); ; ) {
    if (c = t(r, ct(r)), c)
      return P(r, c);
    if (r = de(c = r), c === r)
      break;
  }
}
const Bt = {
  fs: {
    readFileSync: ye,
    writeFile: at
  },
  format: Re,
  resolve: P,
  exists: (i) => {
    try {
      return Be(i).isFile();
    } catch {
      return !1;
    }
  }
};
let C;
class Tt {
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
    })) : c(), C.format.apply(C.format, [this.cache[this.locale][r] || r].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), r = t.shift(), c = t.shift(), a = t.shift();
    let u = function() {
    };
    typeof t[t.length - 1] == "function" && (u = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = a === 1 ? r : c;
    this.cache[this.locale][r] && (p = this.cache[this.locale][r][a === 1 ? "one" : "other"]), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = {
      one: r,
      other: c
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: u
    })) : u();
    const m = [p];
    return ~p.indexOf("%d") && m.push(a), C.format.apply(C.format, m.concat(t));
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
    return t.forEach(function(a, u) {
      const p = r[u + 1];
      c += a, typeof p < "u" && (c += "%s");
    }), this.__.apply(this, [c].concat([].slice.call(r, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, r = this.writeQueue[0], c = r.directory, a = r.locale, u = r.cb, p = this._resolveLocaleFile(c, a), m = JSON.stringify(this.cache[a], null, 2);
    C.fs.writeFile(p, m, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), u(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const r = this._resolveLocaleFile(this.directory, this.locale);
    try {
      C.fs.readFileSync && (t = JSON.parse(C.fs.readFileSync(r, "utf-8")));
    } catch (c) {
      if (c instanceof SyntaxError && (c.message = "syntax error in " + r), c.code === "ENOENT")
        t = {};
      else
        throw c;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, r) {
    let c = C.resolve(t, "./", r + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(c) && ~r.lastIndexOf("_")) {
      const a = C.resolve(t, "./", r.split("_")[0] + ".json");
      this._fileExistsSync(a) && (c = a);
    }
    return c;
  }
  _fileExistsSync(t) {
    return C.exists(t);
  }
}
function It(i, t) {
  C = t;
  const r = new Tt(i);
  return {
    __: r.__.bind(r),
    __n: r.__n.bind(r),
    setLocale: r.setLocale.bind(r),
    getLocale: r.getLocale.bind(r),
    updateLocale: r.updateLocale.bind(r),
    locale: r.locale
  };
}
const Pt = (i) => It(i, Bt), vt = "require is not supported by ESM", Le = "loading a directory of commands is not supported yet for ESM";
let q;
try {
  q = ut(import.meta.url);
} catch {
  q = process.cwd();
}
const zt = q.substring(0, q.lastIndexOf("node_modules"));
lt, ft, tt, zt || process.cwd(), it, de, rt, ot, P, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ye, Pt({
  directory: P(q, "../../../locales"),
  updateFiles: !1
});
const ge = "\x1B[44m", V = "\x1B[43m", me = "\x1B[41m", Mt = "\x1B[42m", S = "\x1B[0m", se = "\x1B[33m", ie = "\x1B[0m", be = 50, D = [], Se = (i, t) => {
  const r = i.content.split(`
`);
  r.length > be && D.push({ fileName: t, scriptLength: r.length });
}, Dt = () => (D.length > 0 && (console.log(`
${me}Long <script> blocks${S} in ${D.length} files.`), console.log(
  `👉 ${se}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${be} lines.${ie}`
), D.forEach((i) => {
  console.log(
    `- ${i.fileName} ${i.scriptLength > be * 2 ? me : V}(${i.scriptLength} lines)${S}`
  );
})), D.length), U = [], Ut = (i) => {
  U.push(i);
}, Gt = () => (U.length > 0 && (console.log(`
${V}Plain <script> blocks${S} in ${U.length} files.`), console.log(`👉 ${se} Consider using <script setup> to leverage the new SFC <script> syntax.${ie}`), U.forEach((i) => {
  console.log(`- ${i}`);
})), U.length), G = [], Fe = (i, t) => {
  const r = /\belse\b/gi, c = i.content.match(r);
  c?.length && G.push({ fileName: t, elseCount: c.length });
}, Qt = () => (G.length > 0 && (console.log(`
${V}else conditions${S} are used in ${G.length} files.`), console.log(`👉 ${se}Try to rewrite the conditions in a way that the else clause is not necessary.${ie}`), G.forEach((i) => {
  console.log(`- ${i.fileName} ${V}(${i.elseCount})${S}`);
})), G.length), Yt = 5, qt = 10, Q = [], We = (i, t) => {
  const r = /\bif\b/gi, c = /\belse\b/gi, a = /\bfor\b/gi, u = /\bwhile\b/gi, p = /\bcase\b/gi, m = i.content.match(r), E = i.content.match(c), j = i.content.match(a), _ = i.content.match(u), F = i.content.match(p), B = (m?.length || 0) + (E?.length || 0) + (j?.length || 0) + (_?.length || 0) + (F?.length || 0);
  B > Yt && Q.push({ fileName: t, cyclomaticComplexity: B });
}, Vt = () => (Q.length > 0 && (console.log(
  `
${ge}cyclomaticComplexity${S} is above moderate in ${Q.length} files.`
), console.log(`👉 ${se}Try to reduce complexity.${ie}`), Q.forEach((i) => {
  console.log(
    `- ${i.fileName} ${i.cyclomaticComplexity > qt ? me : V}(${i.cyclomaticComplexity})${S}`
  );
})), Q.length);
let De = 0;
const Ue = (i, t) => {
  const r = pe.readdirSync(i);
  De += r.length;
  for (const c of r) {
    const a = nt.join(i, c);
    pe.statSync(a).isDirectory() ? Ue(a, t) : c.endsWith(".vue") && t(a);
  }
}, Ht = (i) => {
  console.log(`

${ge}Analyzing Vue files in ${i}${S}`);
  let t = 0;
  Ue(i, (r) => {
    const c = pe.readFileSync(r, "utf-8"), { descriptor: a } = ht(c);
    a.scriptSetup && (Se(a.scriptSetup, r), Fe(a.scriptSetup, r), We(a.scriptSetup, r)), a.script && (Ut(r), Se(a.script, r), Fe(a.script, r), We(a.script, r));
  }), console.log(`Found ${ge}${De}${S} Vue files`), t += Dt(), t += Gt(), t += Qt(), t += Vt(), t || console.log(`${Mt}No code smells detected!${S}`);
};
et(gt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (i) => i.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (i) => {
    Ht(i.path);
  }
).help().argv;
