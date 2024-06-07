import it from "yargs";
import { format as Ie, inspect as rt } from "util";
import Ce, { normalize as ct, resolve as M, dirname as Ae, basename as at, extname as lt, relative as ft } from "path";
import _e, { readFileSync as je, statSync as ze, readdirSync as ut, writeFile as ht } from "fs";
import { notStrictEqual as pt, strictEqual as dt } from "assert";
import { fileURLToPath as gt } from "url";
import { parse as mt } from "@vue/compiler-sfc";
class te extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, te);
  }
}
function Me() {
  return bt() ? 0 : 1;
}
function bt() {
  return yt() && !process.defaultApp;
}
function yt() {
  return !!process.versions.electron;
}
function Et(n) {
  return n.slice(Me() + 1);
}
function $t() {
  return process.argv[Me()];
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
function Ge(n, e) {
  const s = n.toLowerCase();
  e = e || "-";
  let r = "";
  for (let a = 0; a < n.length; a++) {
    const f = s.charAt(a), d = n.charAt(a);
    f !== d && a > 0 ? r += `${e}${s.charAt(a)}` : r += d;
  }
  return r;
}
function Ve(n) {
  return n == null ? !1 : typeof n == "number" || /^0x[0-9a-f]+$/i.test(n) ? !0 : /^0[^.]/.test(n) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function At(n) {
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
var S;
(function(n) {
  n.BOOLEAN = "boolean", n.STRING = "string", n.NUMBER = "number", n.ARRAY = "array";
})(S || (S = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let B;
class _t {
  constructor(e) {
    B = e;
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
    }, s), a = At(e), f = typeof e == "string", d = Ot(Object.assign(/* @__PURE__ */ Object.create(null), r.alias)), m = Object.assign({
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
    }, r.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), r.default), C = r.configObjects || [], $ = r.envPrefix, R = m["populate--"], T = R ? "--" : "_", ie = /* @__PURE__ */ Object.create(null), xe = /* @__PURE__ */ Object.create(null), I = r.__ || B.format, l = {
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
    }, W = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, pe = new RegExp("^--" + m["negation-prefix"] + "(.+)");
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
    })), Xe(r.key, d, r.default, l.arrays), Object.keys(E).forEach(function(t) {
      (l.aliases[t] || []).forEach(function(i) {
        E[i] = E[t];
      });
    });
    let x = null;
    ot();
    let re = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ne = {};
    for (let t = 0; t < a.length; t++) {
      const i = a[t], u = i.replace(/^-{3,}/, "---");
      let c, o, p, h, g, _;
      if (i !== "--" && /^-/.test(i) && fe(i))
        de(i);
      else if (u.match(/^---+(=|$)/)) {
        de(i);
        continue;
      } else if (i.match(/^--.+=/) || !m["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], l.arrays) ? t = ae(t, h[1], a, h[2]) : b(h[1], l.nargs) !== !1 ? t = ce(t, h[1], a, h[2]) : y(h[1], h[2], !0));
      else if (i.match(pe) && m["boolean-negation"])
        h = i.match(pe), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], y(o, b(o, l.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !m["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], b(o, l.arrays) ? t = ae(t, o, a) : b(o, l.nargs) !== !1 ? t = ce(t, o, a) : (g = a[t + 1], g !== void 0 && (!g.match(/^-/) || g.match(W)) && !b(o, l.bools) && !b(o, l.counts) || /^(true|false)$/.test(g) ? (y(o, g), t++) : y(o, z(o))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(W))
        g = a[t + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], g !== void 0 && !g.match(/^-/) && !b(o, l.bools) && !b(o, l.counts) ? (y(o, g), t++) : y(o, z(o)));
      else if (i.match(/^-[^-]+/) && !i.match(W)) {
        p = i.slice(1, -1).split(""), c = !1;
        for (let w = 0; w < p.length; w++) {
          if (g = i.slice(w + 2), p[w + 1] && p[w + 1] === "=") {
            _ = i.slice(w + 3), o = p[w], b(o, l.arrays) ? t = ae(t, o, a, _) : b(o, l.nargs) !== !1 ? t = ce(t, o, a, _) : y(o, _), c = !0;
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
        o = i.slice(-1)[0], !c && o !== "-" && (b(o, l.arrays) ? t = ae(t, o, a) : b(o, l.nargs) !== !1 ? t = ce(t, o, a) : (g = a[t + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(W)) && !b(o, l.bools) && !b(o, l.counts) || /^(true|false)$/.test(g) ? (y(o, g), t++) : y(o, z(o))));
      } else if (i.match(/^-[0-9]$/) && i.match(W) && b(i.slice(1), l.bools))
        o = i.slice(1), y(o, z(o));
      else if (i === "--") {
        re = a.slice(t + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        re = a.slice(t);
        break;
      } else
        de(i);
    }
    Fe(A, !0), Fe(A, !1), qe(A), Ze(), ve(A, l.aliases, E, !0), He(A), m["set-placeholder-key"] && Je(A), Object.keys(l.counts).forEach(function(t) {
      G(A, t.split(".")) || y(t, 0);
    }), R && re.length && (A[T] = []), re.forEach(function(t) {
      A[T].push(t);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((t) => t !== "--" && t.includes("-")).forEach((t) => {
      delete A[t];
    }), m["strip-aliased"] && [].concat(...Object.keys(d).map((t) => d[t])).forEach((t) => {
      m["camel-case-expansion"] && t.includes("-") && delete A[t.split(".").map((i) => U(i)).join(".")], delete A[t];
    });
    function de(t) {
      const i = le("_", t);
      (typeof i == "string" || typeof i == "number") && A._.push(i);
    }
    function ce(t, i, u, c) {
      let o, p = b(i, l.nargs);
      if (p = typeof p != "number" || isNaN(p) ? 1 : p, p === 0)
        return P(c) || (x = Error(I("Argument unexpected for: %s", i))), y(i, z(i)), t;
      let h = P(c) ? 0 : 1;
      if (m["nargs-eats-options"])
        u.length - (t + 1) + h < p && (x = Error(I("Not enough arguments following: %s", i))), h = p;
      else {
        for (o = t + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(W) || fe(u[o])); o++)
          h++;
        h < p && (x = Error(I("Not enough arguments following: %s", i)));
      }
      let g = Math.min(h, p);
      for (!P(c) && g > 0 && (y(i, c), g--), o = t + 1; o < g + t + 1; o++)
        y(i, u[o]);
      return t + g;
    }
    function ae(t, i, u, c) {
      let o = [], p = c || u[t + 1];
      const h = b(i, l.nargs);
      if (b(i, l.bools) && !/^(true|false)$/.test(p))
        o.push(!0);
      else if (P(p) || P(c) && /^-/.test(p) && !W.test(p) && !fe(p)) {
        if (E[i] !== void 0) {
          const g = E[i];
          o = Array.isArray(g) ? g : [g];
        }
      } else {
        P(c) || o.push(ge(i, c, !0));
        for (let g = t + 1; g < u.length && !(!m["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (p = u[g], /^-/.test(p) && !W.test(p) && !fe(p))); g++)
          t = g, o.push(ge(i, p, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (x = Error(I("Not enough arguments following: %s", i))), y(i, o), t;
    }
    function y(t, i, u = f) {
      if (/-/.test(t) && m["camel-case-expansion"]) {
        const p = t.split(".").map(function(h) {
          return U(h);
        }).join(".");
        Se(t, p);
      }
      const c = ge(t, i, u), o = t.split(".");
      V(A, o, c), l.aliases[t] && l.aliases[t].forEach(function(p) {
        const h = p.split(".");
        V(A, h, c);
      }), o.length > 1 && m["dot-notation"] && (l.aliases[o[0]] || []).forEach(function(p) {
        let h = p.split(".");
        const g = [].concat(o);
        g.shift(), h = h.concat(g), (l.aliases[t] || []).includes(h.join(".")) || V(A, h, c);
      }), b(t, l.normalize) && !b(t, l.arrays) && [t].concat(l.aliases[t] || []).forEach(function(h) {
        Object.defineProperty(Ne, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(g) {
            i = typeof g == "string" ? B.normalize(g) : g;
          }
        });
      });
    }
    function Se(t, i) {
      l.aliases[t] && l.aliases[t].length || (l.aliases[t] = [i], ie[i] = !0), l.aliases[i] && l.aliases[i].length || Se(i, t);
    }
    function ge(t, i, u) {
      u && (i = wt(i)), (b(t, l.bools) || b(t, l.counts)) && typeof i == "string" && (i = i === "true");
      let c = Array.isArray(i) ? i.map(function(o) {
        return le(t, o);
      }) : le(t, i);
      return b(t, l.counts) && (P(c) || typeof c == "boolean") && (c = be()), b(t, l.normalize) && b(t, l.arrays) && (Array.isArray(i) ? c = i.map((o) => B.normalize(o)) : c = B.normalize(i)), c;
    }
    function le(t, i) {
      return !m["parse-positional-numbers"] && t === "_" || !b(t, l.strings) && !b(t, l.bools) && !Array.isArray(i) && (Ve(i) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !P(i) && b(t, l.numbers)) && (i = Number(i)), i;
    }
    function qe(t) {
      const i = /* @__PURE__ */ Object.create(null);
      ve(i, l.aliases, E), Object.keys(l.configs).forEach(function(u) {
        const c = t[u] || i[u];
        if (c)
          try {
            let o = null;
            const p = B.resolve(B.cwd(), c), h = l.configs[u];
            if (typeof h == "function") {
              try {
                o = h(p);
              } catch (g) {
                o = g;
              }
              if (o instanceof Error) {
                x = o;
                return;
              }
            } else
              o = B.require(p);
            me(o);
          } catch (o) {
            o.name === "PermissionDenied" ? x = o : t[u] && (x = Error(I("Invalid JSON config file: %s", c)));
          }
      });
    }
    function me(t, i) {
      Object.keys(t).forEach(function(u) {
        const c = t[u], o = i ? i + "." + u : u;
        typeof c == "object" && c !== null && !Array.isArray(c) && m["dot-notation"] ? me(c, o) : (!G(A, o.split(".")) || b(o, l.arrays) && m["combine-arrays"]) && y(o, c);
      });
    }
    function Ze() {
      typeof C < "u" && C.forEach(function(t) {
        me(t);
      });
    }
    function Fe(t, i) {
      if (typeof $ > "u")
        return;
      const u = typeof $ == "string" ? $ : "", c = B.env();
      Object.keys(c).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const p = o.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(u.length)), U(h);
          });
          (i && l.configs[p.join(".")] || !i) && !G(t, p) && y(p.join("."), c[o]);
        }
      });
    }
    function He(t) {
      let i;
      const u = /* @__PURE__ */ new Set();
      Object.keys(t).forEach(function(c) {
        if (!u.has(c) && (i = b(c, l.coercions), typeof i == "function"))
          try {
            const o = le(c, i(t[c]));
            [].concat(l.aliases[c] || [], c).forEach((p) => {
              u.add(p), t[p] = o;
            });
          } catch (o) {
            x = o;
          }
      });
    }
    function Je(t) {
      return l.keys.forEach((i) => {
        ~i.indexOf(".") || typeof t[i] > "u" && (t[i] = void 0);
      }), t;
    }
    function ve(t, i, u, c = !1) {
      Object.keys(u).forEach(function(o) {
        G(t, o.split(".")) || (V(t, o.split("."), u[o]), c && (xe[o] = !0), (i[o] || []).forEach(function(p) {
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
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(_) {
        _ = We(_), typeof c == "object" && c[_] === void 0 && (c[_] = {}), typeof c[_] != "object" || Array.isArray(c[_]) ? (Array.isArray(c[_]) ? c[_].push({}) : c[_] = [c[_], {}], c = c[_][c[_].length - 1]) : c = c[_];
      });
      const o = We(i[i.length - 1]), p = b(i.join("."), l.arrays), h = Array.isArray(u);
      let g = m["duplicate-arguments-array"];
      !g && b(o, l.nargs) && (g = !0, (!P(c[o]) && l.nargs[o] === 1 || Array.isArray(c[o]) && c[o].length === l.nargs[o]) && (c[o] = void 0)), u === be() ? c[o] = be(c[o]) : Array.isArray(c[o]) ? g && p && h ? c[o] = m["flatten-duplicate-arrays"] ? c[o].concat(u) : (Array.isArray(c[o][0]) ? c[o] : [c[o]]).concat([u]) : !g && !!p == !!h ? c[o] = u : c[o] = c[o].concat([u]) : c[o] === void 0 && p ? c[o] = h ? u : [u] : g && !(c[o] === void 0 || b(o, l.counts) || b(o, l.bools)) ? c[o] = [c[o], u] : c[o] = u;
    }
    function Xe(...t) {
      t.forEach(function(i) {
        Object.keys(i || {}).forEach(function(u) {
          l.aliases[u] || (l.aliases[u] = [].concat(d[u] || []), l.aliases[u].concat(u).forEach(function(c) {
            if (/-/.test(c) && m["camel-case-expansion"]) {
              const o = U(c);
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), ie[o] = !0);
            }
          }), l.aliases[u].concat(u).forEach(function(c) {
            if (c.length > 1 && /[A-Z]/.test(c) && m["camel-case-expansion"]) {
              const o = Ge(c, "-");
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), ie[o] = !0);
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
    function Le(t) {
      const i = Object.keys(l);
      return [].concat(i.map((c) => l[c])).some(function(c) {
        return Array.isArray(c) ? c.includes(t) : c[t];
      });
    }
    function ke(t, ...i) {
      return [].concat(...i).some(function(c) {
        const o = t.match(c);
        return o && Le(o[1]);
      });
    }
    function et(t) {
      if (t.match(W) || !t.match(/^-[^-]+/))
        return !1;
      let i = !0, u;
      const c = t.slice(1).split("");
      for (let o = 0; o < c.length; o++) {
        if (u = t.slice(o + 2), !Le(c[o])) {
          i = !1;
          break;
        }
        if (c[o + 1] && c[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(c[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || c[o + 1] && c[o + 1].match(/\W/))
          break;
      }
      return i;
    }
    function fe(t) {
      return m["unknown-options-as-args"] && tt(t);
    }
    function tt(t) {
      return t = t.replace(/^-{3,}/, "--"), t.match(W) || et(t) ? !1 : !ke(t, /^-+([^=]+?)=[\s\S]*$/, pe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function z(t) {
      return !b(t, l.bools) && !b(t, l.counts) && `${t}` in E ? E[t] : nt(st(t));
    }
    function nt(t) {
      return {
        [S.BOOLEAN]: !0,
        [S.STRING]: "",
        [S.NUMBER]: void 0,
        [S.ARRAY]: []
      }[t];
    }
    function st(t) {
      let i = S.BOOLEAN;
      return b(t, l.strings) ? i = S.STRING : b(t, l.numbers) ? i = S.NUMBER : b(t, l.bools) ? i = S.BOOLEAN : b(t, l.arrays) && (i = S.ARRAY), i;
    }
    function P(t) {
      return t === void 0;
    }
    function ot() {
      Object.keys(l.counts).find((t) => b(t, l.arrays) ? (x = Error(I("Invalid configuration: %s, opts.count excludes opts.array.", t)), !0) : b(t, l.nargs) ? (x = Error(I("Invalid configuration: %s, opts.count excludes opts.narg.", t)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(Ne, A),
      configuration: m,
      defaulted: Object.assign({}, xe),
      error: x,
      newAliases: Object.assign({}, ie)
    };
  }
}
function Ot(n) {
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
function be(n) {
  return n !== void 0 ? n + 1 : 1;
}
function We(n) {
  return n === "__proto__" ? "___proto___" : n;
}
function wt(n) {
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
var ye, Ee, $e;
const Re = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Pe = (Ee = (ye = process == null ? void 0 : process.versions) === null || ye === void 0 ? void 0 : ye.node) !== null && Ee !== void 0 ? Ee : ($e = process == null ? void 0 : process.version) === null || $e === void 0 ? void 0 : $e.slice(1);
if (Pe && Number(Pe.match(/^([^.]+)/)[1]) < Re)
  throw Error(`yargs parser supports a minimum Node.js version of ${Re}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Ct = process ? process.env : {}, Ue = new _t({
  cwd: process.cwd,
  env: () => Ct,
  format: Ie,
  normalize: ct,
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
}), oe = function(e, s) {
  return Ue.parse(e.slice(), s).argv;
};
oe.detailed = function(n, e) {
  return Ue.parse(n.slice(), e);
};
oe.camelCase = U;
oe.decamelize = Ge;
oe.looksLikeNumber = Ve;
const jt = {
  right: Lt,
  center: Wt
}, xt = 0, ue = 1, Nt = 2, he = 3;
class St {
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
      a.length > 1 && j.stringWidth(a[0]) > r && (r = Math.min(Math.floor(this.width * 0.5), j.stringWidth(a[0])));
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
    const s = j.stripAnsi(e);
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
        const { width: E } = e[m], C = this.negatePadding(e[m]);
        let $ = d;
        if (C > j.stringWidth(d) && ($ += " ".repeat(C - j.stringWidth(d))), e[m].align && e[m].align !== "left" && this.wrap) {
          const T = jt[e[m].align];
          $ = T($, C), j.stringWidth($) < C && ($ += " ".repeat((E || 0) - j.stringWidth($) - 1));
        }
        const R = e[m].padding || [0, 0, 0, 0];
        R[he] && (f += " ".repeat(R[he])), f += Be(e[m], $, "| "), f += $, f += Be(e[m], $, " |"), R[ue] && (f += " ".repeat(R[ue])), a === 0 && s.length > 0 && (f = this.renderInline(f, s[s.length - 1]));
      }), s.push({
        text: f.replace(/ +$/, ""),
        span: e.span
      });
    }), s;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, s) {
    const r = e.match(/^ */), a = r ? r[0].length : 0, f = s.text, d = j.stringWidth(f.trimRight());
    return s.span ? this.wrap ? a < d ? e : (s.hidden = !0, f.trimRight() + " ".repeat(a - d) + e.trimLeft()) : (s.hidden = !0, f + e) : e;
  }
  rasterize(e) {
    const s = [], r = this.columnWidths(e);
    let a;
    return e.forEach((f, d) => {
      f.width = r[d], this.wrap ? a = j.wrap(f.text, this.negatePadding(f), { hard: !0 }).split(`
`) : a = f.text.split(`
`), f.border && (a.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), a.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (a.unshift(...new Array(f.padding[xt] || 0).fill("")), a.push(...new Array(f.padding[Nt] || 0).fill(""))), a.forEach((m, E) => {
        s[E] || s.push([]);
        const C = s[E];
        for (let $ = 0; $ < d; $++)
          C[$] === void 0 && C.push("");
        C.push(m);
      });
    }), s;
  }
  negatePadding(e) {
    let s = e.width || 0;
    return e.padding && (s -= (e.padding[he] || 0) + (e.padding[ue] || 0)), e.border && (s -= 4), s;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((d) => d.width || j.stringWidth(d.text));
    let s = e.length, r = this.width;
    const a = e.map((d) => {
      if (d.width)
        return s--, r -= d.width, d.width;
    }), f = s ? Math.floor(r / s) : 0;
    return a.map((d, m) => d === void 0 ? Math.max(f, Ft(e[m])) : d);
  }
}
function Be(n, e, s) {
  return n.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? s : "  " : "";
}
function Ft(n) {
  const e = n.padding || [], s = 1 + (e[he] || 0) + (e[ue] || 0);
  return n.border ? s + 4 : s;
}
function vt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Lt(n, e) {
  n = n.trim();
  const s = j.stringWidth(n);
  return s < e ? " ".repeat(e - s) + n : n;
}
function Wt(n, e) {
  n = n.trim();
  const s = j.stringWidth(n);
  return s >= e ? n : " ".repeat(e - s >> 1) + n;
}
let j;
function Rt(n, e) {
  return j = e, new St({
    width: n?.width || vt(),
    wrap: n?.wrap
  });
}
const De = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ke(n) {
  return n.replace(De, "");
}
function Pt(n, e) {
  const [s, r] = n.match(De) || ["", ""];
  n = Ke(n);
  let a = "";
  for (let f = 0; f < n.length; f++)
    f !== 0 && f % e === 0 && (a += `
`), a += n.charAt(f);
  return s && r && (a = `${s}${a}${r}`), a;
}
function Bt(n) {
  return Rt(n, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Ke,
    wrap: Pt
  });
}
function Tt(n, e) {
  let s = M(".", n), r;
  for (ze(s).isDirectory() || (s = Ae(s)); ; ) {
    if (r = e(s, ut(s)), r)
      return M(s, r);
    if (s = Ae(r = s), r === s)
      break;
  }
}
const It = {
  fs: {
    readFileSync: je,
    writeFile: ht
  },
  format: Ie,
  resolve: M,
  exists: (n) => {
    try {
      return ze(n).isFile();
    } catch {
      return !1;
    }
  }
};
let N;
class zt {
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
    })) : r(), N.format.apply(N.format, [this.cache[this.locale][s] || s].concat(e));
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
    return ~d.indexOf("%d") && m.push(a), N.format.apply(N.format, m.concat(e));
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
    N.fs.writeFile(d, m, "utf-8", function(E) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), f(E);
    });
  }
  _readLocaleFile() {
    let e = {};
    const s = this._resolveLocaleFile(this.directory, this.locale);
    try {
      N.fs.readFileSync && (e = JSON.parse(N.fs.readFileSync(s, "utf-8")));
    } catch (r) {
      if (r instanceof SyntaxError && (r.message = "syntax error in " + s), r.code === "ENOENT")
        e = {};
      else
        throw r;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, s) {
    let r = N.resolve(e, "./", s + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(r) && ~s.lastIndexOf("_")) {
      const a = N.resolve(e, "./", s.split("_")[0] + ".json");
      this._fileExistsSync(a) && (r = a);
    }
    return r;
  }
  _fileExistsSync(e) {
    return N.exists(e);
  }
}
function Mt(n, e) {
  N = e;
  const s = new zt(n);
  return {
    __: s.__.bind(s),
    __n: s.__n.bind(s),
    setLocale: s.setLocale.bind(s),
    getLocale: s.getLocale.bind(s),
    updateLocale: s.updateLocale.bind(s),
    locale: s.locale
  };
}
const Gt = (n) => Mt(n, It), Vt = "require is not supported by ESM", Te = "loading a directory of commands is not supported yet for ESM";
let ne;
try {
  ne = gt(import.meta.url);
} catch {
  ne = process.cwd();
}
const Ut = ne.substring(0, ne.lastIndexOf("node_modules"));
pt, dt, rt, Ut || process.cwd(), at, Ae, lt, ft, M, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, je, Gt({
  directory: M(ne, "../../../locales"),
  updateFiles: !1
});
const Oe = "\x1B[44m", se = "\x1B[43m", F = "\x1B[41m", Dt = "\x1B[42m", O = "\x1B[0m", v = "\x1B[33m", L = "\x1B[0m", we = 50, D = [], Kt = (n, e) => {
  const s = n.content.split(`
`);
  s.length > we && D.push({ fileName: e, scriptLength: s.length });
}, Qt = () => (D.length > 0 && (console.log(`
${F}Long <script> blocks${O} in ${D.length} files.`), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${we} lines.${L}`
), D.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.scriptLength > we * 2 ? F : se}(${n.scriptLength} lines)${O}`
  );
})), D.length), K = [], Yt = (n) => {
  K.push(n);
}, qt = () => (K.length > 0 && (console.log(`
${se}Plain <script> blocks${O} in ${K.length} files.`), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${L}`), K.forEach((n) => {
  console.log(`- ${n}`);
})), K.length), Q = [], Zt = (n, e) => {
  const s = /\belse\b/gi, r = n.content.match(s);
  r?.length && Q.push({ fileName: e, elseCount: r.length });
}, Ht = () => (Q.length > 0 && (console.log(`
${se}else conditions${O} are used in ${Q.length} files.`), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${L}`), Q.forEach((n) => {
  console.log(`- ${n.fileName} ${se}(${n.elseCount})${O}`);
})), Q.length), Jt = 5, Xt = 10, Y = [], kt = (n, e) => {
  const s = /\bif\b/gi, r = /\belse\b/gi, a = /\bfor\b/gi, f = /\bwhile\b/gi, d = /\bcase\b/gi, m = n.content.match(s), E = n.content.match(r), C = n.content.match(a), $ = n.content.match(f), R = n.content.match(d), T = (m?.length || 0) + (E?.length || 0) + (C?.length || 0) + ($?.length || 0) + (R?.length || 0);
  T > Jt && Y.push({ fileName: e, cyclomaticComplexity: T });
}, en = () => (Y.length > 0 && (console.log(
  `
${Oe}cyclomaticComplexity${O} is above moderate in ${Y.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${L}`), Y.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.cyclomaticComplexity > Xt ? F : se}(${n.cyclomaticComplexity})${O}`
  );
})), Y.length), q = [], tn = (n) => {
  if (n.includes("pages"))
    return;
  const e = Ce.basename(n);
  if (e === "App.vue")
    return;
  const s = /[A-Z]/;
  e.slice(1).match(s)?.length || q.push({ filePath: n });
}, nn = () => (q.length > 0 && (console.log(`
${F}single name component${O} is used in ${q.length} files.`), console.log(
  `👉 ${v}Rename the component to use multi-word name.${L} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), q.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), q.length), Z = [], sn = (n, e) => {
  n.scoped || Z.push({ filePath: e });
}, on = () => (Z.length > 0 && (console.log(`
${F}Global style ${O} is used in ${Z.length} files.`), console.log(
  `👉 ${v}Use <style scoped>.${L} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), Z.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), Z.length), H = [], rn = (n, e) => {
  const s = /defineProps\(\[/gi;
  n.content.match(s)?.length && H.push({ filePath: e });
}, cn = () => (H.length > 0 && (console.log(`
${F}simple prop${O} is used in ${H.length} files.`), console.log(
  `👉 ${v}Add at least type definition.${L} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), H.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), H.length), J = [], an = (n, e) => {
  const s = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, r = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, a = n.content.match(s), f = n.content.match(r);
  (a?.length || f?.length) && J.push({ filePath: e });
}, ln = () => (J.length > 0 && (console.log(`
${F}v-if used with v-for${O} in ${J.length} files.`), console.log(
  `👉 ${v}Move out the v-if to a computed property.${L} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), J.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), J.length), X = [], fn = (n, e) => {
  const s = /<[^>]+ v-for[^>]+>/gi, r = n.content.match(s);
  r?.length && (r.some((f) => f.includes(":key")) || X.push({ filePath: e }));
}, un = () => (X.length > 0 && (console.log(`
${F}v-for has no key${O} in ${X.length} files.`), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${L} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), X.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), X.length), k = [], hn = (n) => {
  const e = Ce.basename(n), s = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, r = e.match(s), a = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = e.match(a);
  !r?.length && !f?.length && k.push({ fileName: n });
}, pn = () => (k.length > 0 && (console.log(
  `
${F}component name is not PascalCase and not kebab-abse${O} in ${k.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${L} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), k.forEach((n) => {
  console.log(`- ${F}${n.fileName}${O}`);
})), k.length), ee = [], dn = /^[a-z]+([A-Z][a-z]*)+$/, gn = (n, e) => {
  const s = /defineProps\({([^}]+)/g;
  let r;
  for (; (r = s.exec(n.content)) !== null; )
    r[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !dn.test(f)).length && ee.push({ filePath: e });
}, mn = () => (ee.length > 0 && (console.log(`
${F}prop names are not camelCased${O} in ${ee.length} files.`), console.log(
  `👉 ${v}Rename the props to camelCase.${L} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ee.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), ee.length);
let Qe = 0;
const Ye = (n, e) => {
  const s = _e.readdirSync(n);
  Qe += s.length;
  for (const r of s) {
    const a = Ce.join(n, r);
    _e.statSync(a).isDirectory() ? Ye(a, e) : r.endsWith(".vue") && e(a);
  }
}, bn = (n) => {
  console.log(`

${Oe}Analyzing Vue files in ${n}${O}`);
  let e = 0;
  Ye(n, (s) => {
    const r = _e.readFileSync(s, "utf-8"), { descriptor: a } = mt(r);
    tn(s), hn(s), a.script && Yt(s);
    const f = a.scriptSetup || a.script;
    f && (rn(f, s), gn(f, s), Kt(f, s), kt(f, s), Zt(f, s)), a.styles.forEach((d) => {
      sn(d, s);
    }), a.template && (fn(a.template, s), an(a.template, s));
  }), console.log(`Found ${Oe}${Qe}${O} Vue files`), e += nn(), e += cn(), e += un(), e += ln(), e += on(), e += pn(), e += mn(), e += Qt(), e += qt(), e += en(), e += Ht(), e || console.log(`${Dt}No code smells detected!${O}`);
};
it(Et(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (n) => n.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (n) => {
    bn(n.path);
  }
).help().argv;
