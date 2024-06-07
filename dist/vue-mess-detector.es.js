import rt from "yargs";
import { format as ze, inspect as ct } from "util";
import Ce, { normalize as at, resolve as M, dirname as _e, basename as lt, extname as ft, relative as ut } from "path";
import Oe, { readFileSync as je, statSync as Me, readdirSync as ht, writeFile as pt } from "fs";
import { notStrictEqual as dt, strictEqual as gt } from "assert";
import { fileURLToPath as mt } from "url";
import { parse as bt } from "@vue/compiler-sfc";
class ne extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ne);
  }
}
function Ge() {
  return yt() ? 0 : 1;
}
function yt() {
  return Et() && !process.defaultApp;
}
function Et() {
  return !!process.versions.electron;
}
function $t(n) {
  return n.slice(Ge() + 1);
}
function At() {
  return process.argv[Ge()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function U(n) {
  if (n !== n.toLowerCase() && n !== n.toUpperCase() || (n = n.toLowerCase()), n.indexOf("-") === -1 && n.indexOf("_") === -1)
    return n;
  {
    let s = "", r = !1;
    const a = n.match(/^-+/);
    for (let f = a ? a[0].length : 0; f < n.length; f++) {
      let d = n.charAt(f);
      r && (r = !1, d = d.toUpperCase()), f !== 0 && (d === "-" || d === "_") ? r = !0 : d !== "-" && d !== "_" && (s += d);
    }
    return s;
  }
}
function Ve(n, e) {
  const s = n.toLowerCase();
  e = e || "-";
  let r = "";
  for (let a = 0; a < n.length; a++) {
    const f = s.charAt(a), d = n.charAt(a);
    f !== d && a > 0 ? r += `${e}${s.charAt(a)}` : r += d;
  }
  return r;
}
function Ue(n) {
  return n == null ? !1 : typeof n == "number" || /^0x[0-9a-f]+$/i.test(n) ? !0 : /^0[^.]/.test(n) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function _t(n) {
  if (Array.isArray(n))
    return n.map((d) => typeof d != "string" ? d + "" : d);
  n = n.trim();
  let e = 0, s = null, r = null, a = null;
  const f = [];
  for (let d = 0; d < n.length; d++) {
    if (s = r, r = n.charAt(d), r === " " && !a) {
      s !== " " && e++;
      continue;
    }
    r === a ? a = null : (r === "'" || r === '"') && !a && (a = r), f[e] || (f[e] = ""), f[e] += r;
  }
  return f;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var L;
(function(n) {
  n.BOOLEAN = "boolean", n.STRING = "string", n.NUMBER = "number", n.ARRAY = "array";
})(L || (L = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let T;
class Ot {
  constructor(e) {
    T = e;
  }
  parse(e, s) {
    const r = Object.assign({
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
    }, s), a = _t(e), f = typeof e == "string", d = wt(Object.assign(/* @__PURE__ */ Object.create(null), r.alias)), m = Object.assign({
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
    }, r.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), r.default), x = r.configObjects || [], $ = r.envPrefix, W = m["populate--"], B = W ? "--" : "_", re = /* @__PURE__ */ Object.create(null), Ne = /* @__PURE__ */ Object.create(null), I = r.__ || T.format, l = {
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
    }, R = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, de = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(r.array || []).filter(Boolean).forEach(function(t) {
      const i = typeof t == "object" ? t.key : t, u = Object.keys(t).map(function(c) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[c];
      }).filter(Boolean).pop();
      u && (l[u][i] = !0), l.arrays[i] = !0, l.keys.push(i);
    }), [].concat(r.boolean || []).filter(Boolean).forEach(function(t) {
      l.bools[t] = !0, l.keys.push(t);
    }), [].concat(r.string || []).filter(Boolean).forEach(function(t) {
      l.strings[t] = !0, l.keys.push(t);
    }), [].concat(r.number || []).filter(Boolean).forEach(function(t) {
      l.numbers[t] = !0, l.keys.push(t);
    }), [].concat(r.count || []).filter(Boolean).forEach(function(t) {
      l.counts[t] = !0, l.keys.push(t);
    }), [].concat(r.normalize || []).filter(Boolean).forEach(function(t) {
      l.normalize[t] = !0, l.keys.push(t);
    }), typeof r.narg == "object" && Object.entries(r.narg).forEach(([t, i]) => {
      typeof i == "number" && (l.nargs[t] = i, l.keys.push(t));
    }), typeof r.coerce == "object" && Object.entries(r.coerce).forEach(([t, i]) => {
      typeof i == "function" && (l.coercions[t] = i, l.keys.push(t));
    }), typeof r.config < "u" && (Array.isArray(r.config) || typeof r.config == "string" ? [].concat(r.config).filter(Boolean).forEach(function(t) {
      l.configs[t] = !0;
    }) : typeof r.config == "object" && Object.entries(r.config).forEach(([t, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (l.configs[t] = i);
    })), ke(r.key, d, r.default, l.arrays), Object.keys(E).forEach(function(t) {
      (l.aliases[t] || []).forEach(function(i) {
        E[i] = E[t];
      });
    });
    let F = null;
    it();
    let ce = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Se = {};
    for (let t = 0; t < a.length; t++) {
      const i = a[t], u = i.replace(/^-{3,}/, "---");
      let c, o, p, h, g, O;
      if (i !== "--" && /^-/.test(i) && ue(i))
        ge(i);
      else if (u.match(/^---+(=|$)/)) {
        ge(i);
        continue;
      } else if (i.match(/^--.+=/) || !m["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], l.arrays) ? t = le(t, h[1], a, h[2]) : b(h[1], l.nargs) !== !1 ? t = ae(t, h[1], a, h[2]) : y(h[1], h[2], !0));
      else if (i.match(de) && m["boolean-negation"])
        h = i.match(de), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], y(o, b(o, l.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !m["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], b(o, l.arrays) ? t = le(t, o, a) : b(o, l.nargs) !== !1 ? t = ae(t, o, a) : (g = a[t + 1], g !== void 0 && (!g.match(/^-/) || g.match(R)) && !b(o, l.bools) && !b(o, l.counts) || /^(true|false)$/.test(g) ? (y(o, g), t++) : y(o, z(o))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(R))
        g = a[t + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], g !== void 0 && !g.match(/^-/) && !b(o, l.bools) && !b(o, l.counts) ? (y(o, g), t++) : y(o, z(o)));
      else if (i.match(/^-[^-]+/) && !i.match(R)) {
        p = i.slice(1, -1).split(""), c = !1;
        for (let w = 0; w < p.length; w++) {
          if (g = i.slice(w + 2), p[w + 1] && p[w + 1] === "=") {
            O = i.slice(w + 3), o = p[w], b(o, l.arrays) ? t = le(t, o, a, O) : b(o, l.nargs) !== !1 ? t = ae(t, o, a, O) : y(o, O), c = !0;
            break;
          }
          if (g === "-") {
            y(p[w], g);
            continue;
          }
          if (/[A-Za-z]/.test(p[w]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, l.bools) === !1) {
            y(p[w], g), c = !0;
            break;
          }
          if (p[w + 1] && p[w + 1].match(/\W/)) {
            y(p[w], g), c = !0;
            break;
          } else
            y(p[w], z(p[w]));
        }
        o = i.slice(-1)[0], !c && o !== "-" && (b(o, l.arrays) ? t = le(t, o, a) : b(o, l.nargs) !== !1 ? t = ae(t, o, a) : (g = a[t + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(R)) && !b(o, l.bools) && !b(o, l.counts) || /^(true|false)$/.test(g) ? (y(o, g), t++) : y(o, z(o))));
      } else if (i.match(/^-[0-9]$/) && i.match(R) && b(i.slice(1), l.bools))
        o = i.slice(1), y(o, z(o));
      else if (i === "--") {
        ce = a.slice(t + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        ce = a.slice(t);
        break;
      } else
        ge(i);
    }
    ve(A, !0), ve(A, !1), He(A), Ze(), Le(A, l.aliases, E, !0), Xe(A), m["set-placeholder-key"] && Je(A), Object.keys(l.counts).forEach(function(t) {
      G(A, t.split(".")) || y(t, 0);
    }), W && ce.length && (A[B] = []), ce.forEach(function(t) {
      A[B].push(t);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((t) => t !== "--" && t.includes("-")).forEach((t) => {
      delete A[t];
    }), m["strip-aliased"] && [].concat(...Object.keys(d).map((t) => d[t])).forEach((t) => {
      m["camel-case-expansion"] && t.includes("-") && delete A[t.split(".").map((i) => U(i)).join(".")], delete A[t];
    });
    function ge(t) {
      const i = fe("_", t);
      (typeof i == "string" || typeof i == "number") && A._.push(i);
    }
    function ae(t, i, u, c) {
      let o, p = b(i, l.nargs);
      if (p = typeof p != "number" || isNaN(p) ? 1 : p, p === 0)
        return P(c) || (F = Error(I("Argument unexpected for: %s", i))), y(i, z(i)), t;
      let h = P(c) ? 0 : 1;
      if (m["nargs-eats-options"])
        u.length - (t + 1) + h < p && (F = Error(I("Not enough arguments following: %s", i))), h = p;
      else {
        for (o = t + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(R) || ue(u[o])); o++)
          h++;
        h < p && (F = Error(I("Not enough arguments following: %s", i)));
      }
      let g = Math.min(h, p);
      for (!P(c) && g > 0 && (y(i, c), g--), o = t + 1; o < g + t + 1; o++)
        y(i, u[o]);
      return t + g;
    }
    function le(t, i, u, c) {
      let o = [], p = c || u[t + 1];
      const h = b(i, l.nargs);
      if (b(i, l.bools) && !/^(true|false)$/.test(p))
        o.push(!0);
      else if (P(p) || P(c) && /^-/.test(p) && !R.test(p) && !ue(p)) {
        if (E[i] !== void 0) {
          const g = E[i];
          o = Array.isArray(g) ? g : [g];
        }
      } else {
        P(c) || o.push(me(i, c, !0));
        for (let g = t + 1; g < u.length && !(!m["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (p = u[g], /^-/.test(p) && !R.test(p) && !ue(p))); g++)
          t = g, o.push(me(i, p, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (F = Error(I("Not enough arguments following: %s", i))), y(i, o), t;
    }
    function y(t, i, u = f) {
      if (/-/.test(t) && m["camel-case-expansion"]) {
        const p = t.split(".").map(function(h) {
          return U(h);
        }).join(".");
        Fe(t, p);
      }
      const c = me(t, i, u), o = t.split(".");
      V(A, o, c), l.aliases[t] && l.aliases[t].forEach(function(p) {
        const h = p.split(".");
        V(A, h, c);
      }), o.length > 1 && m["dot-notation"] && (l.aliases[o[0]] || []).forEach(function(p) {
        let h = p.split(".");
        const g = [].concat(o);
        g.shift(), h = h.concat(g), (l.aliases[t] || []).includes(h.join(".")) || V(A, h, c);
      }), b(t, l.normalize) && !b(t, l.arrays) && [t].concat(l.aliases[t] || []).forEach(function(h) {
        Object.defineProperty(Se, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(g) {
            i = typeof g == "string" ? T.normalize(g) : g;
          }
        });
      });
    }
    function Fe(t, i) {
      l.aliases[t] && l.aliases[t].length || (l.aliases[t] = [i], re[i] = !0), l.aliases[i] && l.aliases[i].length || Fe(i, t);
    }
    function me(t, i, u) {
      u && (i = xt(i)), (b(t, l.bools) || b(t, l.counts)) && typeof i == "string" && (i = i === "true");
      let c = Array.isArray(i) ? i.map(function(o) {
        return fe(t, o);
      }) : fe(t, i);
      return b(t, l.counts) && (P(c) || typeof c == "boolean") && (c = ye()), b(t, l.normalize) && b(t, l.arrays) && (Array.isArray(i) ? c = i.map((o) => T.normalize(o)) : c = T.normalize(i)), c;
    }
    function fe(t, i) {
      return !m["parse-positional-numbers"] && t === "_" || !b(t, l.strings) && !b(t, l.bools) && !Array.isArray(i) && (Ue(i) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !P(i) && b(t, l.numbers)) && (i = Number(i)), i;
    }
    function He(t) {
      const i = /* @__PURE__ */ Object.create(null);
      Le(i, l.aliases, E), Object.keys(l.configs).forEach(function(u) {
        const c = t[u] || i[u];
        if (c)
          try {
            let o = null;
            const p = T.resolve(T.cwd(), c), h = l.configs[u];
            if (typeof h == "function") {
              try {
                o = h(p);
              } catch (g) {
                o = g;
              }
              if (o instanceof Error) {
                F = o;
                return;
              }
            } else
              o = T.require(p);
            be(o);
          } catch (o) {
            o.name === "PermissionDenied" ? F = o : t[u] && (F = Error(I("Invalid JSON config file: %s", c)));
          }
      });
    }
    function be(t, i) {
      Object.keys(t).forEach(function(u) {
        const c = t[u], o = i ? i + "." + u : u;
        typeof c == "object" && c !== null && !Array.isArray(c) && m["dot-notation"] ? be(c, o) : (!G(A, o.split(".")) || b(o, l.arrays) && m["combine-arrays"]) && y(o, c);
      });
    }
    function Ze() {
      typeof x < "u" && x.forEach(function(t) {
        be(t);
      });
    }
    function ve(t, i) {
      if (typeof $ > "u")
        return;
      const u = typeof $ == "string" ? $ : "", c = T.env();
      Object.keys(c).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const p = o.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(u.length)), U(h);
          });
          (i && l.configs[p.join(".")] || !i) && !G(t, p) && y(p.join("."), c[o]);
        }
      });
    }
    function Xe(t) {
      let i;
      const u = /* @__PURE__ */ new Set();
      Object.keys(t).forEach(function(c) {
        if (!u.has(c) && (i = b(c, l.coercions), typeof i == "function"))
          try {
            const o = fe(c, i(t[c]));
            [].concat(l.aliases[c] || [], c).forEach((p) => {
              u.add(p), t[p] = o;
            });
          } catch (o) {
            F = o;
          }
      });
    }
    function Je(t) {
      return l.keys.forEach((i) => {
        ~i.indexOf(".") || typeof t[i] > "u" && (t[i] = void 0);
      }), t;
    }
    function Le(t, i, u, c = !1) {
      Object.keys(u).forEach(function(o) {
        G(t, o.split(".")) || (V(t, o.split("."), u[o]), c && (Ne[o] = !0), (i[o] || []).forEach(function(p) {
          G(t, p.split(".")) || V(t, p.split("."), u[o]);
        }));
      });
    }
    function G(t, i) {
      let u = t;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(o) {
        u = u[o] || {};
      });
      const c = i[i.length - 1];
      return typeof u != "object" ? !1 : c in u;
    }
    function V(t, i, u) {
      let c = t;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(O) {
        O = We(O), typeof c == "object" && c[O] === void 0 && (c[O] = {}), typeof c[O] != "object" || Array.isArray(c[O]) ? (Array.isArray(c[O]) ? c[O].push({}) : c[O] = [c[O], {}], c = c[O][c[O].length - 1]) : c = c[O];
      });
      const o = We(i[i.length - 1]), p = b(i.join("."), l.arrays), h = Array.isArray(u);
      let g = m["duplicate-arguments-array"];
      !g && b(o, l.nargs) && (g = !0, (!P(c[o]) && l.nargs[o] === 1 || Array.isArray(c[o]) && c[o].length === l.nargs[o]) && (c[o] = void 0)), u === ye() ? c[o] = ye(c[o]) : Array.isArray(c[o]) ? g && p && h ? c[o] = m["flatten-duplicate-arrays"] ? c[o].concat(u) : (Array.isArray(c[o][0]) ? c[o] : [c[o]]).concat([u]) : !g && !!p == !!h ? c[o] = u : c[o] = c[o].concat([u]) : c[o] === void 0 && p ? c[o] = h ? u : [u] : g && !(c[o] === void 0 || b(o, l.counts) || b(o, l.bools)) ? c[o] = [c[o], u] : c[o] = u;
    }
    function ke(...t) {
      t.forEach(function(i) {
        Object.keys(i || {}).forEach(function(u) {
          l.aliases[u] || (l.aliases[u] = [].concat(d[u] || []), l.aliases[u].concat(u).forEach(function(c) {
            if (/-/.test(c) && m["camel-case-expansion"]) {
              const o = U(c);
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), re[o] = !0);
            }
          }), l.aliases[u].concat(u).forEach(function(c) {
            if (c.length > 1 && /[A-Z]/.test(c) && m["camel-case-expansion"]) {
              const o = Ve(c, "-");
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), re[o] = !0);
            }
          }), l.aliases[u].forEach(function(c) {
            l.aliases[c] = [u].concat(l.aliases[u].filter(function(o) {
              return c !== o;
            }));
          }));
        });
      });
    }
    function b(t, i) {
      const u = [].concat(l.aliases[t] || [], t), c = Object.keys(i), o = u.find((p) => c.includes(p));
      return o ? i[o] : !1;
    }
    function Re(t) {
      const i = Object.keys(l);
      return [].concat(i.map((c) => l[c])).some(function(c) {
        return Array.isArray(c) ? c.includes(t) : c[t];
      });
    }
    function et(t, ...i) {
      return [].concat(...i).some(function(c) {
        const o = t.match(c);
        return o && Re(o[1]);
      });
    }
    function tt(t) {
      if (t.match(R) || !t.match(/^-[^-]+/))
        return !1;
      let i = !0, u;
      const c = t.slice(1).split("");
      for (let o = 0; o < c.length; o++) {
        if (u = t.slice(o + 2), !Re(c[o])) {
          i = !1;
          break;
        }
        if (c[o + 1] && c[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(c[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || c[o + 1] && c[o + 1].match(/\W/))
          break;
      }
      return i;
    }
    function ue(t) {
      return m["unknown-options-as-args"] && nt(t);
    }
    function nt(t) {
      return t = t.replace(/^-{3,}/, "--"), t.match(R) || tt(t) ? !1 : !et(t, /^-+([^=]+?)=[\s\S]*$/, de, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function z(t) {
      return !b(t, l.bools) && !b(t, l.counts) && `${t}` in E ? E[t] : st(ot(t));
    }
    function st(t) {
      return {
        [L.BOOLEAN]: !0,
        [L.STRING]: "",
        [L.NUMBER]: void 0,
        [L.ARRAY]: []
      }[t];
    }
    function ot(t) {
      let i = L.BOOLEAN;
      return b(t, l.strings) ? i = L.STRING : b(t, l.numbers) ? i = L.NUMBER : b(t, l.bools) ? i = L.BOOLEAN : b(t, l.arrays) && (i = L.ARRAY), i;
    }
    function P(t) {
      return t === void 0;
    }
    function it() {
      Object.keys(l.counts).find((t) => b(t, l.arrays) ? (F = Error(I("Invalid configuration: %s, opts.count excludes opts.array.", t)), !0) : b(t, l.nargs) ? (F = Error(I("Invalid configuration: %s, opts.count excludes opts.narg.", t)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(Se, A),
      configuration: m,
      defaulted: Object.assign({}, Ne),
      error: F,
      newAliases: Object.assign({}, re)
    };
  }
}
function wt(n) {
  const e = [], s = /* @__PURE__ */ Object.create(null);
  let r = !0;
  for (Object.keys(n).forEach(function(a) {
    e.push([].concat(n[a], a));
  }); r; ) {
    r = !1;
    for (let a = 0; a < e.length; a++)
      for (let f = a + 1; f < e.length; f++)
        if (e[a].filter(function(m) {
          return e[f].indexOf(m) !== -1;
        }).length) {
          e[a] = e[a].concat(e[f]), e.splice(f, 1), r = !0;
          break;
        }
  }
  return e.forEach(function(a) {
    a = a.filter(function(d, m, E) {
      return E.indexOf(d) === m;
    });
    const f = a.pop();
    f !== void 0 && typeof f == "string" && (s[f] = a);
  }), s;
}
function ye(n) {
  return n !== void 0 ? n + 1 : 1;
}
function We(n) {
  return n === "__proto__" ? "___proto___" : n;
}
function xt(n) {
  return typeof n == "string" && (n[0] === "'" || n[0] === '"') && n[n.length - 1] === n[0] ? n.substring(1, n.length - 1) : n;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Ee, $e, Ae;
const Pe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Te = ($e = (Ee = process == null ? void 0 : process.versions) === null || Ee === void 0 ? void 0 : Ee.node) !== null && $e !== void 0 ? $e : (Ae = process == null ? void 0 : process.version) === null || Ae === void 0 ? void 0 : Ae.slice(1);
if (Te && Number(Te.match(/^([^.]+)/)[1]) < Pe)
  throw Error(`yargs parser supports a minimum Node.js version of ${Pe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Ct = process ? process.env : {}, De = new Ot({
  cwd: process.cwd,
  env: () => Ct,
  format: ze,
  normalize: at,
  resolve: M,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (n) => {
    if (typeof require < "u")
      return require(n);
    if (n.match(/\.json$/))
      return JSON.parse(je(n, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ie = function(e, s) {
  return De.parse(e.slice(), s).argv;
};
ie.detailed = function(n, e) {
  return De.parse(n.slice(), e);
};
ie.camelCase = U;
ie.decamelize = Ve;
ie.looksLikeNumber = Ue;
const jt = {
  right: Rt,
  center: Wt
}, Nt = 0, he = 1, St = 2, pe = 3;
class Ft {
  constructor(e) {
    var s;
    this.width = e.width, this.wrap = (s = e.wrap) !== null && s !== void 0 ? s : !0, this.rows = [];
  }
  span(...e) {
    const s = this.div(...e);
    s.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...e) {
    if (e.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...e) && typeof e[0] == "string")
      return this.applyLayoutDSL(e[0]);
    const s = e.map((r) => typeof r == "string" ? this.colFromString(r) : r);
    return this.rows.push(s), s;
  }
  shouldApplyLayoutDSL(...e) {
    return e.length === 1 && typeof e[0] == "string" && /[\t\n]/.test(e[0]);
  }
  applyLayoutDSL(e) {
    const s = e.split(`
`).map((a) => a.split("	"));
    let r = 0;
    return s.forEach((a) => {
      a.length > 1 && C.stringWidth(a[0]) > r && (r = Math.min(Math.floor(this.width * 0.5), C.stringWidth(a[0])));
    }), s.forEach((a) => {
      this.div(...a.map((f, d) => ({
        text: f.trim(),
        padding: this.measurePadding(f),
        width: d === 0 && a.length > 1 ? r : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(e) {
    return {
      text: e,
      padding: this.measurePadding(e)
    };
  }
  measurePadding(e) {
    const s = C.stripAnsi(e);
    return [0, s.match(/\s*$/)[0].length, 0, s.match(/^\s*/)[0].length];
  }
  toString() {
    const e = [];
    return this.rows.forEach((s) => {
      this.rowToString(s, e);
    }), e.filter((s) => !s.hidden).map((s) => s.text).join(`
`);
  }
  rowToString(e, s) {
    return this.rasterize(e).forEach((r, a) => {
      let f = "";
      r.forEach((d, m) => {
        const { width: E } = e[m], x = this.negatePadding(e[m]);
        let $ = d;
        if (x > C.stringWidth(d) && ($ += " ".repeat(x - C.stringWidth(d))), e[m].align && e[m].align !== "left" && this.wrap) {
          const B = jt[e[m].align];
          $ = B($, x), C.stringWidth($) < x && ($ += " ".repeat((E || 0) - C.stringWidth($) - 1));
        }
        const W = e[m].padding || [0, 0, 0, 0];
        W[pe] && (f += " ".repeat(W[pe])), f += Be(e[m], $, "| "), f += $, f += Be(e[m], $, " |"), W[he] && (f += " ".repeat(W[he])), a === 0 && s.length > 0 && (f = this.renderInline(f, s[s.length - 1]));
      }), s.push({
        text: f.replace(/ +$/, ""),
        span: e.span
      });
    }), s;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, s) {
    const r = e.match(/^ */), a = r ? r[0].length : 0, f = s.text, d = C.stringWidth(f.trimRight());
    return s.span ? this.wrap ? a < d ? e : (s.hidden = !0, f.trimRight() + " ".repeat(a - d) + e.trimLeft()) : (s.hidden = !0, f + e) : e;
  }
  rasterize(e) {
    const s = [], r = this.columnWidths(e);
    let a;
    return e.forEach((f, d) => {
      f.width = r[d], this.wrap ? a = C.wrap(f.text, this.negatePadding(f), { hard: !0 }).split(`
`) : a = f.text.split(`
`), f.border && (a.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), a.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (a.unshift(...new Array(f.padding[Nt] || 0).fill("")), a.push(...new Array(f.padding[St] || 0).fill(""))), a.forEach((m, E) => {
        s[E] || s.push([]);
        const x = s[E];
        for (let $ = 0; $ < d; $++)
          x[$] === void 0 && x.push("");
        x.push(m);
      });
    }), s;
  }
  negatePadding(e) {
    let s = e.width || 0;
    return e.padding && (s -= (e.padding[pe] || 0) + (e.padding[he] || 0)), e.border && (s -= 4), s;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((d) => d.width || C.stringWidth(d.text));
    let s = e.length, r = this.width;
    const a = e.map((d) => {
      if (d.width)
        return s--, r -= d.width, d.width;
    }), f = s ? Math.floor(r / s) : 0;
    return a.map((d, m) => d === void 0 ? Math.max(f, vt(e[m])) : d);
  }
}
function Be(n, e, s) {
  return n.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? s : "  " : "";
}
function vt(n) {
  const e = n.padding || [], s = 1 + (e[pe] || 0) + (e[he] || 0);
  return n.border ? s + 4 : s;
}
function Lt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Rt(n, e) {
  n = n.trim();
  const s = C.stringWidth(n);
  return s < e ? " ".repeat(e - s) + n : n;
}
function Wt(n, e) {
  n = n.trim();
  const s = C.stringWidth(n);
  return s >= e ? n : " ".repeat(e - s >> 1) + n;
}
let C;
function Pt(n, e) {
  return C = e, new Ft({
    width: n?.width || Lt(),
    wrap: n?.wrap
  });
}
const Ke = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Qe(n) {
  return n.replace(Ke, "");
}
function Tt(n, e) {
  const [s, r] = n.match(Ke) || ["", ""];
  n = Qe(n);
  let a = "";
  for (let f = 0; f < n.length; f++)
    f !== 0 && f % e === 0 && (a += `
`), a += n.charAt(f);
  return s && r && (a = `${s}${a}${r}`), a;
}
function Bt(n) {
  return Pt(n, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Qe,
    wrap: Tt
  });
}
function It(n, e) {
  let s = M(".", n), r;
  for (Me(s).isDirectory() || (s = _e(s)); ; ) {
    if (r = e(s, ht(s)), r)
      return M(s, r);
    if (s = _e(r = s), r === s)
      break;
  }
}
const zt = {
  fs: {
    readFileSync: je,
    writeFile: pt
  },
  format: ze,
  resolve: M,
  exists: (n) => {
    try {
      return Me(n).isFile();
    } catch {
      return !1;
    }
  }
};
let v;
class Mt {
  constructor(e) {
    e = e || {}, this.directory = e.directory || "./locales", this.updateFiles = typeof e.updateFiles == "boolean" ? e.updateFiles : !0, this.locale = e.locale || "en", this.fallbackToLanguage = typeof e.fallbackToLanguage == "boolean" ? e.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...e) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const s = e.shift();
    let r = function() {
    };
    return typeof e[e.length - 1] == "function" && (r = e.pop()), r = r || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][s] && this.updateFiles ? (this.cache[this.locale][s] = s, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: r
    })) : r(), v.format.apply(v.format, [this.cache[this.locale][s] || s].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), s = e.shift(), r = e.shift(), a = e.shift();
    let f = function() {
    };
    typeof e[e.length - 1] == "function" && (f = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let d = a === 1 ? s : r;
    this.cache[this.locale][s] && (d = this.cache[this.locale][s][a === 1 ? "one" : "other"]), !this.cache[this.locale][s] && this.updateFiles ? (this.cache[this.locale][s] = {
      one: s,
      other: r
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: f
    })) : f();
    const m = [d];
    return ~d.indexOf("%d") && m.push(a), v.format.apply(v.format, m.concat(e));
  }
  setLocale(e) {
    this.locale = e;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(e) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (this.cache[this.locale][s] = e[s]);
  }
  _taggedLiteral(e, ...s) {
    let r = "";
    return e.forEach(function(a, f) {
      const d = s[f + 1];
      r += a, typeof d < "u" && (r += "%s");
    }), this.__.apply(this, [r].concat([].slice.call(s, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, s = this.writeQueue[0], r = s.directory, a = s.locale, f = s.cb, d = this._resolveLocaleFile(r, a), m = JSON.stringify(this.cache[a], null, 2);
    v.fs.writeFile(d, m, "utf-8", function(E) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), f(E);
    });
  }
  _readLocaleFile() {
    let e = {};
    const s = this._resolveLocaleFile(this.directory, this.locale);
    try {
      v.fs.readFileSync && (e = JSON.parse(v.fs.readFileSync(s, "utf-8")));
    } catch (r) {
      if (r instanceof SyntaxError && (r.message = "syntax error in " + s), r.code === "ENOENT")
        e = {};
      else
        throw r;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, s) {
    let r = v.resolve(e, "./", s + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(r) && ~s.lastIndexOf("_")) {
      const a = v.resolve(e, "./", s.split("_")[0] + ".json");
      this._fileExistsSync(a) && (r = a);
    }
    return r;
  }
  _fileExistsSync(e) {
    return v.exists(e);
  }
}
function Gt(n, e) {
  v = e;
  const s = new Mt(n);
  return {
    __: s.__.bind(s),
    __n: s.__n.bind(s),
    setLocale: s.setLocale.bind(s),
    getLocale: s.getLocale.bind(s),
    updateLocale: s.updateLocale.bind(s),
    locale: s.locale
  };
}
const Vt = (n) => Gt(n, zt), Ut = "require is not supported by ESM", Ie = "loading a directory of commands is not supported yet for ESM";
let se;
try {
  se = mt(import.meta.url);
} catch {
  se = process.cwd();
}
const Dt = se.substring(0, se.lastIndexOf("node_modules"));
dt, gt, ct, Dt || process.cwd(), lt, _e, ft, ut, M, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, je, Vt({
  directory: M(se, "../../../locales"),
  updateFiles: !1
});
const we = "\x1B[44m", oe = "\x1B[43m", j = "\x1B[41m", Kt = "\x1B[42m", _ = "\x1B[0m", N = "\x1B[33m", S = "\x1B[0m", xe = 50, D = [], Qt = (n, e) => {
  const s = n.content.split(`
`);
  s.length > xe && D.push({ fileName: e, scriptLength: s.length });
}, Yt = () => (D.length > 0 && (console.log(`
${j}Long <script> blocks${_} in ${D.length} files.`), console.log(
  `👉 ${N}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${xe} lines.${S}`
), D.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.scriptLength > xe * 2 ? j : oe}(${n.scriptLength} lines)${_}`
  );
})), D.length), K = [], qt = (n) => {
  K.push(n);
}, Ht = () => (K.length > 0 && (console.log(`
${oe}Plain <script> blocks${_} in ${K.length} files.`), console.log(`👉 ${N} Consider using <script setup> to leverage the new SFC <script> syntax.${S}`), K.forEach((n) => {
  console.log(`- ${n}`);
})), K.length), Q = [], Zt = (n, e) => {
  const s = /\belse\b/gi, r = n.content.match(s);
  r?.length && Q.push({ fileName: e, elseCount: r.length });
}, Xt = () => (Q.length > 0 && (console.log(`
${oe}else conditions${_} are used in ${Q.length} files.`), console.log(`👉 ${N}Try to rewrite the conditions in a way that the else clause is not necessary.${S}`), Q.forEach((n) => {
  console.log(`- ${n.fileName} ${oe}(${n.elseCount})${_}`);
})), Q.length), Jt = 5, kt = 10, Y = [], en = (n, e) => {
  const s = /\bif\b/gi, r = /\belse\b/gi, a = /\bfor\b/gi, f = /\bwhile\b/gi, d = /\bcase\b/gi, m = n.content.match(s), E = n.content.match(r), x = n.content.match(a), $ = n.content.match(f), W = n.content.match(d), B = (m?.length || 0) + (E?.length || 0) + (x?.length || 0) + ($?.length || 0) + (W?.length || 0);
  B > Jt && Y.push({ fileName: e, cyclomaticComplexity: B });
}, tn = () => (Y.length > 0 && (console.log(
  `
${we}cyclomaticComplexity${_} is above moderate in ${Y.length} files.`
), console.log(`👉 ${N}Try to reduce complexity.${S}`), Y.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.cyclomaticComplexity > kt ? j : oe}(${n.cyclomaticComplexity})${_}`
  );
})), Y.length), q = [], nn = (n) => {
  if (n.includes("pages"))
    return;
  const e = Ce.basename(n);
  if (e === "App.vue")
    return;
  const s = /[A-Z]/;
  e.slice(1).match(s)?.length || q.push({ filePath: n });
}, sn = () => (q.length > 0 && (console.log(`
${j}single name component${_} is used in ${q.length} files.`), console.log(
  `👉 ${N}Rename the component to use multi-word name.${S} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), q.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), q.length), H = [], on = (n, e) => {
  n.scoped || H.push({ filePath: e });
}, rn = () => (H.length > 0 && (console.log(`
${j}Global style ${_} is used in ${H.length} files.`), console.log(
  `👉 ${N}Use <style scoped>.${S} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), H.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), H.length), Z = [], cn = (n, e) => {
  const s = /defineProps\(\[/gi;
  n.content.match(s)?.length && Z.push({ filePath: e });
}, an = () => (Z.length > 0 && (console.log(`
${j}simple prop${_} is used in ${Z.length} files.`), console.log(
  `👉 ${N}Add at least type definition.${S} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), Z.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), Z.length), X = [], ln = (n, e) => {
  const s = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, r = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, a = n.content.match(s), f = n.content.match(r);
  (a?.length || f?.length) && X.push({ filePath: e });
}, fn = () => (X.length > 0 && (console.log(`
${j}v-if used with v-for${_} in ${X.length} files.`), console.log(
  `👉 ${N}Move out the v-if to a computed property.${S} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), X.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), X.length), J = [], un = (n, e) => {
  const s = /<[^>]+ v-for[^>]+>/gi, r = n.content.match(s);
  r?.length && (r.some((f) => f.includes(":key")) || J.push({ filePath: e }));
}, hn = () => (J.length > 0 && (console.log(`
${j}v-for has no key${_} in ${J.length} files.`), console.log(
  `👉 ${N}Add a \`:key\` property to all v-for.${S} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), J.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), J.length), k = [], pn = (n) => {
  const e = Ce.basename(n), s = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, r = e.match(s), a = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = e.match(a);
  !r?.length && !f?.length && k.push({ fileName: n });
}, dn = () => (k.length > 0 && (console.log(
  `
${j}component name is not PascalCase and not kebab-abse${_} in ${k.length} files.`
), console.log(
  `👉 ${N}Rename the component to use PascalCase or kebab-case file name.${S} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), k.forEach((n) => {
  console.log(`- ${j}${n.fileName}${_}`);
})), k.length), ee = [], gn = /^[a-z]+([A-Z][a-z]*)+$/, mn = (n, e) => {
  const s = /defineProps\({([^}]+)/g;
  let r;
  for (; (r = s.exec(n.content)) !== null; )
    r[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !gn.test(f)).length && ee.push({ filePath: e });
}, bn = () => (ee.length > 0 && (console.log(`
${j}prop names are not camelCased${_} in ${ee.length} files.`), console.log(
  `👉 ${N}Rename the props to camelCase.${S} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ee.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), ee.length), te = [], yn = 40, En = (n, e) => {
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...n.content.matchAll(s)].map((a) => a[1].trim()).forEach((a) => {
    a.length > yn && te.push({ filePath: e });
  });
}, $n = () => (te.length > 0 && (console.log(`
${j}Lengthy template expression${_} found in ${te.length} files.`), console.log(
  `👉 ${N}Refactor the expression into a computed property.${S} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), te.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), te.length);
let Ye = 0;
const qe = (n, e) => {
  const s = Oe.readdirSync(n);
  Ye += s.length;
  for (const r of s) {
    const a = Ce.join(n, r);
    Oe.statSync(a).isDirectory() ? qe(a, e) : r.endsWith(".vue") && e(a);
  }
}, An = (n) => {
  console.log(`

${we}Analyzing Vue files in ${n}${_}`);
  let e = 0;
  qe(n, (s) => {
    const r = Oe.readFileSync(s, "utf-8"), { descriptor: a } = bt(r);
    nn(s), pn(s), a.script && qt(s);
    const f = a.scriptSetup || a.script;
    f && (cn(f, s), mn(f, s), Qt(f, s), en(f, s), Zt(f, s)), a.styles.forEach((d) => {
      on(d, s);
    }), a.template && (un(a.template, s), ln(a.template, s), En(a.template, s));
  }), console.log(`Found ${we}${Ye}${_} Vue files`), e += sn(), e += an(), e += hn(), e += fn(), e += rn(), e += dn(), e += bn(), e += $n(), e += Yt(), e += Ht(), e += tn(), e += Xt(), e || console.log(`${Kt}No code smells detected!${_}`);
};
rt($t(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (n) => n.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (n) => {
    An(n.path);
  }
).help().argv;
