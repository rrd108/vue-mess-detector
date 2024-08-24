import ae from "node:fs/promises";
import oe from "node:path";
import En from "yargs";
import { format as Dt, inspect as vn } from "util";
import { normalize as wn, resolve as le, dirname as We, basename as xn, extname as On, relative as An } from "path";
import { readFileSync as vt, statSync as Ut, readdirSync as Cn, writeFile as Sn } from "fs";
import { notStrictEqual as _n, strictEqual as Nn } from "assert";
import { fileURLToPath as Rn } from "url";
import { parse as jn } from "@vue/compiler-sfc";
class pe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, pe);
  }
}
function Ht() {
  return Ln() ? 0 : 1;
}
function Ln() {
  return Fn() && !process.defaultApp;
}
function Fn() {
  return !!process.versions.electron;
}
function Pn(e) {
  return e.slice(Ht() + 1);
}
function Tn() {
  return process.argv[Ht()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function he(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let r = o ? o[0].length : 0; r < e.length; r++) {
      let l = e.charAt(r);
      s && (s = !1, l = l.toUpperCase()), r !== 0 && (l === "-" || l === "_") ? s = !0 : l !== "-" && l !== "_" && (n += l);
    }
    return n;
  }
}
function Vt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), l = e.charAt(o);
    r !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
  }
  return s;
}
function Gt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function In(e) {
  if (Array.isArray(e))
    return e.map((l) => typeof l != "string" ? l + "" : l);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const r = [];
  for (let l = 0; l < e.length; l++) {
    if (n = s, s = e.charAt(l), s === " " && !o) {
      n !== " " && t++;
      continue;
    }
    s === o ? o = null : (s === "'" || s === '"') && !o && (o = s), r[t] || (r[t] = ""), r[t] += s;
  }
  return r;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Z;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(Z || (Z = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ee;
class Wn {
  constructor(t) {
    ee = t;
  }
  parse(t, n) {
    const s = Object.assign({
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
    }, n), o = In(t), r = typeof t == "string", l = Mn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), f = Object.assign({
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
    }, s.configuration), d = Object.assign(/* @__PURE__ */ Object.create(null), s.default), w = s.configObjects || [], x = s.envPrefix, _ = f["populate--"], N = _ ? "--" : "_", Q = /* @__PURE__ */ Object.create(null), re = /* @__PURE__ */ Object.create(null), ne = s.__ || ee.format, h = {
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
    }, Y = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ne = new RegExp("^--" + f["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const a = typeof i == "object" ? i.key : i, p = Object.keys(i).map(function(u) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[u];
      }).filter(Boolean).pop();
      p && (h[p][a] = !0), h.arrays[a] = !0, h.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(i) {
      h.bools[i] = !0, h.keys.push(i);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(i) {
      h.strings[i] = !0, h.keys.push(i);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(i) {
      h.numbers[i] = !0, h.keys.push(i);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(i) {
      h.counts[i] = !0, h.keys.push(i);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(i) {
      h.normalize[i] = !0, h.keys.push(i);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, a]) => {
      typeof a == "number" && (h.nargs[i] = a, h.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, a]) => {
      typeof a == "function" && (h.coercions[i] = a, h.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      h.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (h.configs[i] = a);
    })), pn(s.key, l, s.default, h.arrays), Object.keys(d).forEach(function(i) {
      (h.aliases[i] || []).forEach(function(a) {
        d[a] = d[i];
      });
    });
    let G = null;
    yn();
    let $e = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), xt = {};
    for (let i = 0; i < o.length; i++) {
      const a = o[i], p = a.replace(/^-{3,}/, "---");
      let u, c, b, g, y, T;
      if (a !== "--" && /^-/.test(a) && ve(a))
        Re(a);
      else if (p.match(/^---+(=|$)/)) {
        Re(a);
        continue;
      } else if (a.match(/^--.+=/) || !f["short-option-groups"] && a.match(/^-.+=/))
        g = a.match(/^--?([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && (v(g[1], h.arrays) ? i = ye(i, g[1], o, g[2]) : v(g[1], h.nargs) !== !1 ? i = be(i, g[1], o, g[2]) : j(g[1], g[2], !0));
      else if (a.match(Ne) && f["boolean-negation"])
        g = a.match(Ne), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], j(c, v(c, h.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !f["short-option-groups"] && a.match(/^-[^-]+/))
        g = a.match(/^--?(.+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], v(c, h.arrays) ? i = ye(i, c, o) : v(c, h.nargs) !== !1 ? i = be(i, c, o) : (y = o[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(Y)) && !v(c, h.bools) && !v(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ie(c))));
      else if (a.match(/^-.\..+=/))
        g = a.match(/^-([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && j(g[1], g[2]);
      else if (a.match(/^-.\..+/) && !a.match(Y))
        y = o[i + 1], g = a.match(/^-(.\..+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], y !== void 0 && !y.match(/^-/) && !v(c, h.bools) && !v(c, h.counts) ? (j(c, y), i++) : j(c, ie(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Y)) {
        b = a.slice(1, -1).split(""), u = !1;
        for (let W = 0; W < b.length; W++) {
          if (y = a.slice(W + 2), b[W + 1] && b[W + 1] === "=") {
            T = a.slice(W + 3), c = b[W], v(c, h.arrays) ? i = ye(i, c, o, T) : v(c, h.nargs) !== !1 ? i = be(i, c, o, T) : j(c, T), u = !0;
            break;
          }
          if (y === "-") {
            j(b[W], y);
            continue;
          }
          if (/[A-Za-z]/.test(b[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && v(y, h.bools) === !1) {
            j(b[W], y), u = !0;
            break;
          }
          if (b[W + 1] && b[W + 1].match(/\W/)) {
            j(b[W], y), u = !0;
            break;
          } else
            j(b[W], ie(b[W]));
        }
        c = a.slice(-1)[0], !u && c !== "-" && (v(c, h.arrays) ? i = ye(i, c, o) : v(c, h.nargs) !== !1 ? i = be(i, c, o) : (y = o[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(Y)) && !v(c, h.bools) && !v(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ie(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Y) && v(a.slice(1), h.bools))
        c = a.slice(1), j(c, ie(c));
      else if (a === "--") {
        $e = o.slice(i + 1);
        break;
      } else if (f["halt-at-non-option"]) {
        $e = o.slice(i);
        break;
      } else
        Re(a);
    }
    At(F, !0), At(F, !1), ln(F), un(), Ct(F, h.aliases, d, !0), fn(F), f["set-placeholder-key"] && hn(F), Object.keys(h.counts).forEach(function(i) {
      ue(F, i.split(".")) || j(i, 0);
    }), _ && $e.length && (F[N] = []), $e.forEach(function(i) {
      F[N].push(i);
    }), f["camel-case-expansion"] && f["strip-dashed"] && Object.keys(F).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete F[i];
    }), f["strip-aliased"] && [].concat(...Object.keys(l).map((i) => l[i])).forEach((i) => {
      f["camel-case-expansion"] && i.includes("-") && delete F[i.split(".").map((a) => he(a)).join(".")], delete F[i];
    });
    function Re(i) {
      const a = Ee("_", i);
      (typeof a == "string" || typeof a == "number") && F._.push(a);
    }
    function be(i, a, p, u) {
      let c, b = v(a, h.nargs);
      if (b = typeof b != "number" || isNaN(b) ? 1 : b, b === 0)
        return J(u) || (G = Error(ne("Argument unexpected for: %s", a))), j(a, ie(a)), i;
      let g = J(u) ? 0 : 1;
      if (f["nargs-eats-options"])
        p.length - (i + 1) + g < b && (G = Error(ne("Not enough arguments following: %s", a))), g = b;
      else {
        for (c = i + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Y) || ve(p[c])); c++)
          g++;
        g < b && (G = Error(ne("Not enough arguments following: %s", a)));
      }
      let y = Math.min(g, b);
      for (!J(u) && y > 0 && (j(a, u), y--), c = i + 1; c < y + i + 1; c++)
        j(a, p[c]);
      return i + y;
    }
    function ye(i, a, p, u) {
      let c = [], b = u || p[i + 1];
      const g = v(a, h.nargs);
      if (v(a, h.bools) && !/^(true|false)$/.test(b))
        c.push(!0);
      else if (J(b) || J(u) && /^-/.test(b) && !Y.test(b) && !ve(b)) {
        if (d[a] !== void 0) {
          const y = d[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        J(u) || c.push(je(a, u, !0));
        for (let y = i + 1; y < p.length && !(!f["greedy-arrays"] && c.length > 0 || g && typeof g == "number" && c.length >= g || (b = p[y], /^-/.test(b) && !Y.test(b) && !ve(b))); y++)
          i = y, c.push(je(a, b, r));
      }
      return typeof g == "number" && (g && c.length < g || isNaN(g) && c.length === 0) && (G = Error(ne("Not enough arguments following: %s", a))), j(a, c), i;
    }
    function j(i, a, p = r) {
      if (/-/.test(i) && f["camel-case-expansion"]) {
        const b = i.split(".").map(function(g) {
          return he(g);
        }).join(".");
        Ot(i, b);
      }
      const u = je(i, a, p), c = i.split(".");
      fe(F, c, u), h.aliases[i] && h.aliases[i].forEach(function(b) {
        const g = b.split(".");
        fe(F, g, u);
      }), c.length > 1 && f["dot-notation"] && (h.aliases[c[0]] || []).forEach(function(b) {
        let g = b.split(".");
        const y = [].concat(c);
        y.shift(), g = g.concat(y), (h.aliases[i] || []).includes(g.join(".")) || fe(F, g, u);
      }), v(i, h.normalize) && !v(i, h.arrays) && [i].concat(h.aliases[i] || []).forEach(function(g) {
        Object.defineProperty(xt, g, {
          enumerable: !0,
          get() {
            return a;
          },
          set(y) {
            a = typeof y == "string" ? ee.normalize(y) : y;
          }
        });
      });
    }
    function Ot(i, a) {
      h.aliases[i] && h.aliases[i].length || (h.aliases[i] = [a], Q[a] = !0), h.aliases[a] && h.aliases[a].length || Ot(a, i);
    }
    function je(i, a, p) {
      p && (a = Bn(a)), (v(i, h.bools) || v(i, h.counts)) && typeof a == "string" && (a = a === "true");
      let u = Array.isArray(a) ? a.map(function(c) {
        return Ee(i, c);
      }) : Ee(i, a);
      return v(i, h.counts) && (J(u) || typeof u == "boolean") && (u = Fe()), v(i, h.normalize) && v(i, h.arrays) && (Array.isArray(a) ? u = a.map((c) => ee.normalize(c)) : u = ee.normalize(a)), u;
    }
    function Ee(i, a) {
      return !f["parse-positional-numbers"] && i === "_" || !v(i, h.strings) && !v(i, h.bools) && !Array.isArray(a) && (Gt(a) && f["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !J(a) && v(i, h.numbers)) && (a = Number(a)), a;
    }
    function ln(i) {
      const a = /* @__PURE__ */ Object.create(null);
      Ct(a, h.aliases, d), Object.keys(h.configs).forEach(function(p) {
        const u = i[p] || a[p];
        if (u)
          try {
            let c = null;
            const b = ee.resolve(ee.cwd(), u), g = h.configs[p];
            if (typeof g == "function") {
              try {
                c = g(b);
              } catch (y) {
                c = y;
              }
              if (c instanceof Error) {
                G = c;
                return;
              }
            } else
              c = ee.require(b);
            Le(c);
          } catch (c) {
            c.name === "PermissionDenied" ? G = c : i[p] && (G = Error(ne("Invalid JSON config file: %s", u)));
          }
      });
    }
    function Le(i, a) {
      Object.keys(i).forEach(function(p) {
        const u = i[p], c = a ? a + "." + p : p;
        typeof u == "object" && u !== null && !Array.isArray(u) && f["dot-notation"] ? Le(u, c) : (!ue(F, c.split(".")) || v(c, h.arrays) && f["combine-arrays"]) && j(c, u);
      });
    }
    function un() {
      typeof w < "u" && w.forEach(function(i) {
        Le(i);
      });
    }
    function At(i, a) {
      if (typeof x > "u")
        return;
      const p = typeof x == "string" ? x : "", u = ee.env();
      Object.keys(u).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const b = c.split("__").map(function(g, y) {
            return y === 0 && (g = g.substring(p.length)), he(g);
          });
          (a && h.configs[b.join(".")] || !a) && !ue(i, b) && j(b.join("."), u[c]);
        }
      });
    }
    function fn(i) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(u) {
        if (!p.has(u) && (a = v(u, h.coercions), typeof a == "function"))
          try {
            const c = Ee(u, a(i[u]));
            [].concat(h.aliases[u] || [], u).forEach((b) => {
              p.add(b), i[b] = c;
            });
          } catch (c) {
            G = c;
          }
      });
    }
    function hn(i) {
      return h.keys.forEach((a) => {
        ~a.indexOf(".") || typeof i[a] > "u" && (i[a] = void 0);
      }), i;
    }
    function Ct(i, a, p, u = !1) {
      Object.keys(p).forEach(function(c) {
        ue(i, c.split(".")) || (fe(i, c.split("."), p[c]), u && (re[c] = !0), (a[c] || []).forEach(function(b) {
          ue(i, b.split(".")) || fe(i, b.split("."), p[c]);
        }));
      });
    }
    function ue(i, a) {
      let p = i;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const u = a[a.length - 1];
      return typeof p != "object" ? !1 : u in p;
    }
    function fe(i, a, p) {
      let u = i;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(T) {
        T = _t(T), typeof u == "object" && u[T] === void 0 && (u[T] = {}), typeof u[T] != "object" || Array.isArray(u[T]) ? (Array.isArray(u[T]) ? u[T].push({}) : u[T] = [u[T], {}], u = u[T][u[T].length - 1]) : u = u[T];
      });
      const c = _t(a[a.length - 1]), b = v(a.join("."), h.arrays), g = Array.isArray(p);
      let y = f["duplicate-arguments-array"];
      !y && v(c, h.nargs) && (y = !0, (!J(u[c]) && h.nargs[c] === 1 || Array.isArray(u[c]) && u[c].length === h.nargs[c]) && (u[c] = void 0)), p === Fe() ? u[c] = Fe(u[c]) : Array.isArray(u[c]) ? y && b && g ? u[c] = f["flatten-duplicate-arrays"] ? u[c].concat(p) : (Array.isArray(u[c][0]) ? u[c] : [u[c]]).concat([p]) : !y && !!b == !!g ? u[c] = p : u[c] = u[c].concat([p]) : u[c] === void 0 && b ? u[c] = g ? p : [p] : y && !(u[c] === void 0 || v(c, h.counts) || v(c, h.bools)) ? u[c] = [u[c], p] : u[c] = p;
    }
    function pn(...i) {
      i.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          h.aliases[p] || (h.aliases[p] = [].concat(l[p] || []), h.aliases[p].concat(p).forEach(function(u) {
            if (/-/.test(u) && f["camel-case-expansion"]) {
              const c = he(u);
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), Q[c] = !0);
            }
          }), h.aliases[p].concat(p).forEach(function(u) {
            if (u.length > 1 && /[A-Z]/.test(u) && f["camel-case-expansion"]) {
              const c = Vt(u, "-");
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), Q[c] = !0);
            }
          }), h.aliases[p].forEach(function(u) {
            h.aliases[u] = [p].concat(h.aliases[p].filter(function(c) {
              return u !== c;
            }));
          }));
        });
      });
    }
    function v(i, a) {
      const p = [].concat(h.aliases[i] || [], i), u = Object.keys(a), c = p.find((b) => u.includes(b));
      return c ? a[c] : !1;
    }
    function St(i) {
      const a = Object.keys(h);
      return [].concat(a.map((u) => h[u])).some(function(u) {
        return Array.isArray(u) ? u.includes(i) : u[i];
      });
    }
    function mn(i, ...a) {
      return [].concat(...a).some(function(u) {
        const c = i.match(u);
        return c && St(c[1]);
      });
    }
    function dn(i) {
      if (i.match(Y) || !i.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const u = i.slice(1).split("");
      for (let c = 0; c < u.length; c++) {
        if (p = i.slice(c + 2), !St(u[c])) {
          a = !1;
          break;
        }
        if (u[c + 1] && u[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(u[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || u[c + 1] && u[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ve(i) {
      return f["unknown-options-as-args"] && gn(i);
    }
    function gn(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(Y) || dn(i) ? !1 : !mn(i, /^-+([^=]+?)=[\s\S]*$/, Ne, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ie(i) {
      return !v(i, h.bools) && !v(i, h.counts) && `${i}` in d ? d[i] : $n(bn(i));
    }
    function $n(i) {
      return {
        [Z.BOOLEAN]: !0,
        [Z.STRING]: "",
        [Z.NUMBER]: void 0,
        [Z.ARRAY]: []
      }[i];
    }
    function bn(i) {
      let a = Z.BOOLEAN;
      return v(i, h.strings) ? a = Z.STRING : v(i, h.numbers) ? a = Z.NUMBER : v(i, h.bools) ? a = Z.BOOLEAN : v(i, h.arrays) && (a = Z.ARRAY), a;
    }
    function J(i) {
      return i === void 0;
    }
    function yn() {
      Object.keys(h.counts).find((i) => v(i, h.arrays) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : v(i, h.nargs) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(xt, F),
      configuration: f,
      defaulted: Object.assign({}, re),
      error: G,
      newAliases: Object.assign({}, Q)
    };
  }
}
function Mn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let r = o + 1; r < t.length; r++)
        if (t[o].filter(function(f) {
          return t[r].indexOf(f) !== -1;
        }).length) {
          t[o] = t[o].concat(t[r]), t.splice(r, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(l, f, d) {
      return d.indexOf(l) === f;
    });
    const r = o.pop();
    r !== void 0 && typeof r == "string" && (n[r] = o);
  }), n;
}
function Fe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function _t(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Bn(e) {
  return typeof e == "string" && (e[0] === "'" || e[0] === '"') && e[e.length - 1] === e[0] ? e.substring(1, e.length - 1) : e;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Pe, Te, Ie;
const Nt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Rt = (Te = (Pe = process == null ? void 0 : process.versions) === null || Pe === void 0 ? void 0 : Pe.node) !== null && Te !== void 0 ? Te : (Ie = process == null ? void 0 : process.version) === null || Ie === void 0 ? void 0 : Ie.slice(1);
if (Rt && Number(Rt.match(/^([^.]+)/)[1]) < Nt)
  throw Error(`yargs parser supports a minimum Node.js version of ${Nt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const kn = process ? process.env : {}, Kt = new Wn({
  cwd: process.cwd,
  env: () => kn,
  format: Dt,
  normalize: wn,
  resolve: le,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(vt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ge = function(t, n) {
  return Kt.parse(t.slice(), n).argv;
};
ge.detailed = function(e, t) {
  return Kt.parse(e.slice(), t);
};
ge.camelCase = he;
ge.decamelize = Vt;
ge.looksLikeNumber = Gt;
const zn = {
  right: Kn,
  center: Zn
}, Dn = 0, xe = 1, Un = 2, Oe = 3;
class Hn {
  constructor(t) {
    var n;
    this.width = t.width, this.wrap = (n = t.wrap) !== null && n !== void 0 ? n : !0, this.rows = [];
  }
  span(...t) {
    const n = this.div(...t);
    n.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const n = t.map((s) => typeof s == "string" ? this.colFromString(s) : s);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((o) => o.split("	"));
    let s = 0;
    return n.forEach((o) => {
      o.length > 1 && B.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), B.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((r, l) => ({
        text: r.trim(),
        padding: this.measurePadding(r),
        width: l === 0 && o.length > 1 ? s : void 0
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
    const n = B.stripAnsi(t);
    return [0, n.match(/\s*$/)[0].length, 0, n.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((n) => {
      this.rowToString(n, t);
    }), t.filter((n) => !n.hidden).map((n) => n.text).join(`
`);
  }
  rowToString(t, n) {
    return this.rasterize(t).forEach((s, o) => {
      let r = "";
      s.forEach((l, f) => {
        const { width: d } = t[f], w = this.negatePadding(t[f]);
        let x = l;
        if (w > B.stringWidth(l) && (x += " ".repeat(w - B.stringWidth(l))), t[f].align && t[f].align !== "left" && this.wrap) {
          const N = zn[t[f].align];
          x = N(x, w), B.stringWidth(x) < w && (x += " ".repeat((d || 0) - B.stringWidth(x) - 1));
        }
        const _ = t[f].padding || [0, 0, 0, 0];
        _[Oe] && (r += " ".repeat(_[Oe])), r += jt(t[f], x, "| "), r += x, r += jt(t[f], x, " |"), _[xe] && (r += " ".repeat(_[xe])), o === 0 && n.length > 0 && (r = this.renderInline(r, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, r = n.text, l = B.stringWidth(r.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, r.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, r + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((r, l) => {
      r.width = s[l], this.wrap ? o = B.wrap(r.text, this.negatePadding(r), { hard: !0 }).split(`
`) : o = r.text.split(`
`), r.border && (o.unshift("." + "-".repeat(this.negatePadding(r) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(r) + 2) + "'")), r.padding && (o.unshift(...new Array(r.padding[Dn] || 0).fill("")), o.push(...new Array(r.padding[Un] || 0).fill(""))), o.forEach((f, d) => {
        n[d] || n.push([]);
        const w = n[d];
        for (let x = 0; x < l; x++)
          w[x] === void 0 && w.push("");
        w.push(f);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Oe] || 0) + (t.padding[xe] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || B.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), r = n ? Math.floor(s / n) : 0;
    return o.map((l, f) => l === void 0 ? Math.max(r, Vn(t[f])) : l);
  }
}
function jt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Vn(e) {
  const t = e.padding || [], n = 1 + (t[Oe] || 0) + (t[xe] || 0);
  return e.border ? n + 4 : n;
}
function Gn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Kn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Zn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let B;
function qn(e, t) {
  return B = t, new Hn({
    width: e?.width || Gn(),
    wrap: e?.wrap
  });
}
const Zt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function qt(e) {
  return e.replace(Zt, "");
}
function Qn(e, t) {
  const [n, s] = e.match(Zt) || ["", ""];
  e = qt(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Yn(e) {
  return qn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: qt,
    wrap: Qn
  });
}
function Xn(e, t) {
  let n = le(".", e), s;
  for (Ut(n).isDirectory() || (n = We(n)); ; ) {
    if (s = t(n, Cn(n)), s) return le(n, s);
    if (n = We(s = n), s === n) break;
  }
}
const Jn = {
  fs: {
    readFileSync: vt,
    writeFile: Sn
  },
  format: Dt,
  resolve: le,
  exists: (e) => {
    try {
      return Ut(e).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class es {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let s = function() {
    };
    return typeof t[t.length - 1] == "function" && (s = t.pop()), s = s || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: s
    })) : s(), K.format.apply(K.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let r = function() {
    };
    typeof t[t.length - 1] == "function" && (r = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let l = o === 1 ? n : s;
    this.cache[this.locale][n] && (l = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: r
    })) : r();
    const f = [l];
    return ~l.indexOf("%d") && f.push(o), K.format.apply(K.format, f.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (this.cache[this.locale][n] = t[n]);
  }
  _taggedLiteral(t, ...n) {
    let s = "";
    return t.forEach(function(o, r) {
      const l = n[r + 1];
      s += o, typeof l < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, r = n.cb, l = this._resolveLocaleFile(s, o), f = JSON.stringify(this.cache[o], null, 2);
    K.fs.writeFile(l, f, "utf-8", function(d) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), r(d);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      K.fs.readFileSync && (t = JSON.parse(K.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = K.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = K.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return K.exists(t);
  }
}
function ts(e, t) {
  K = t;
  const n = new es(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const ns = (e) => ts(e, Jn), ss = "require is not supported by ESM", Lt = "loading a directory of commands is not supported yet for ESM";
let me;
try {
  me = Rn(import.meta.url);
} catch {
  me = process.cwd();
}
const os = me.substring(0, me.lastIndexOf("node_modules"));
_n, Nn, vn, os || process.cwd(), xn, We, On, An, le, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, vt, ns({
  directory: le(me, "../../../locales"),
  updateFiles: !1
});
const k = "\x1B[44m", O = "\x1B[43m", M = "\x1B[41m", Qt = "\x1B[42m", $ = "\x1B[0m", A = "\x1B[33m", C = "\x1B[36m", m = "\x1B[0m", rs = {
  "vue-caution": ["elementSelectorsWithScoped", "implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["elementAttributeOrder", "topLevelElementOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "fullWordComponentName",
    "multiAttributeElements",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression"
  ],
  rrd: [
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlLink",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "nestedTernary",
    "noPropDestructure",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ]
}, se = Object.keys(rs), is = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
], Me = [], cs = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const r = o[1];
      is.includes(r) && Me.push({ filePath: t, message: `${O}(${r})${$}` });
    }
  });
}, as = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${A}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ls = /^(\(.*\)|\\?.)$/;
function te(e) {
  const t = e.toString();
  return ls.test(t) ? t : `(?:${t})`;
}
const us = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, fs = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(us, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${U(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${U(...n)})`),
    after: (...n) => E(`(?<=${U(...n)})${e}`),
    before: (...n) => E(`${e}(?=${U(...n)})`),
    notAfter: (...n) => E(`(?<!${U(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${U(...n)})`),
    times: Object.assign((n) => E(`${te(e)}{${n}}`), {
      any: () => E(`${te(e)}*`),
      atLeast: (n) => E(`${te(e)}{${n},}`),
      atMost: (n) => E(`${te(e)}{0,${n}}`),
      between: (n, s) => E(`${te(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${te(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(fs, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const hs = /[.*+?^${}()|[\]\\/]/g;
function de(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function D(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ps(...e) {
  return E(`(?:${e.map((t) => U(t)).join("|")})`);
}
const Ae = E(".");
E("\\b\\w+\\b");
const V = E("\\w"), z = E("\\b"), ms = E("\\d"), L = E("\\s"), Yt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Xt = E("\\t"), Jt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function X(...e) {
  return E(`${te(U(...e))}?`);
}
function U(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(hs, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${te(U(...e))}+`);
}
const H = "i", P = "g", R = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(U(...e).toString(), [...t || ""].join(""));
}, I = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((f, d) => d >= n && f.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((l, f) => l + f.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, Se = [], ds = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = R(U("$parent").or("getCurrentInstance"), [P]), r = e.content.match(n), l = e.content.match(s);
  if (l) {
    const d = l[1].split(".")[0];
    if ((r ? r[1] : "").includes(d)) {
      const x = I(e.content.trim(), d);
      Se.push({
        filePath: t,
        message: `line #${x} ${O}(${d})${$}`
      });
    }
  }
  const f = e.content.match(o);
  if (f) {
    const d = I(e.content.trim(), f[0]);
    Se.push({
      filePath: t,
      message: `line #${d} ${O}(${f[0]})${$}`
    });
  }
}, gs = () => {
  const e = [];
  return Se.length > 0 && Se.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${A}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], $s = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${O}global style${$} used`
    });
  });
}, bs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${m}`,
      description: `👉 ${A}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], ys = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps([", [P, H]);
  e.content.match(n)?.length && ke.push({ filePath: t, message: `${O}Props type${$} not defined` });
}, Es = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${m}`,
      description: `👉 ${A}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], vs = (e) => {
  if (e.includes("pages"))
    return;
  const t = oe.basename(e);
  if (t === "App.vue")
    return;
  const n = R(Yt.uppercase);
  t.slice(1).match(n)?.length || ze.push({ filePath: e, message: `Component name is ${O}single word${$}` });
}, ws = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${m}`,
      description: `👉 ${A}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], xs = (e, t) => {
  if (!e)
    return;
  const n = R("<", S(D(">")), " v-for", S(D(">")), ">", [
    P,
    H
  ]), s = e.content.match(n);
  s?.length && (s.some((r) => r.includes(":key")) || De.push({ filePath: t, message: `v-for used ${O}without a key${$}` }));
}, Os = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${A}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], As = (e, t) => {
  if (!e)
    return;
  const n = R(
    "<",
    S(D(">")),
    " v-if",
    S(D(">")),
    " v-for",
    S(D(">")),
    ">",
    [P, H]
  ), s = R(
    "<",
    S(D(">")),
    " v-for",
    S(D(">")),
    " v-if",
    S(D(">")),
    ">",
    [P, H]
  ), o = e.content.match(n), r = e.content.match(s);
  if (o?.length || r?.length) {
    const l = o?.length ? o[0] : r?.length ? r[0] : "", f = I(e.content, l);
    Ue.push({ filePath: t, message: `line #${f} ${O}v-if used with v-for${$}` });
  }
}, Cs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${A}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Ft = [
  "is",
  "v-for",
  "v-if",
  "v-else-if",
  "v-else",
  "v-show",
  "v-cloak",
  "v-pre",
  "v-once",
  "id",
  "ref",
  "key",
  "v-model",
  "v-on",
  "v-html",
  "v-text"
], Ss = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const l = r[1], f = r[2];
    if (f) {
      const w = Array.from(f.matchAll(o), (_) => _[1]).filter((_) => Ft.includes(_));
      let x = -1;
      for (const _ of w) {
        const N = Ft.indexOf(_);
        if (N !== -1 && N < x) {
          He.push({
            filePath: t,
            message: `tag has attributes out of order ${O}(${l})${$}`
          });
          break;
        }
        x = N;
      }
    }
  }
}, _s = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${A}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Ns = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), r = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((d) => d.index !== -1);
  l.every((d, w) => w === 0 ? !0 : l[w - 1].index < d.index) || Ve.push({ filePath: t, message: `Top level elements are ${O}not following the correct order.${$}` });
}, Rs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${m}`,
      description: `👉 ${A}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], js = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = oe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, r = t.match(o);
  !s?.length && !r?.length && Ge.push({ filePath: e, message: `component name is ${O}not PascalCase, nor kebab-case.${$}` });
}, Ls = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${A}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Fs = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const r = I(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    Ke.push({ filePath: t, message: `line #${r} ${O}(${l})${$}` });
  });
}, Ps = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${m}`,
      description: `👉 ${A}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Pt = [], Ts = ["v-slot", "v-bind", "v-on"], Is = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ts.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Ze.push({ filePath: t, message: `line #${o} ${O}${s}${$}` }), Pt.some((r) => r.filePath === t) || Pt.push({ filePath: t });
    }
  });
}, Ws = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${A}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Ms = 3, Bs = (e) => {
  const t = R(
    S(D("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = R(
      de("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), r = s.match(o);
    (!r || r.length < Ms) && qe.push({ filePath: e, message: `${s} is not a ${O}full word.${$}` });
  }
}, ks = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${m}`,
      description: `👉 ${A}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], zs = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], r = s[2];
    r.split(/\s+/).filter((f) => f.trim() !== "").length > 1 && r.split(`
`).length === 1 && Qe.push({ filePath: t, message: `Element ${O}<${o}>${$} should have its attributes on separate lines` });
  }
}, Ds = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${A}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Us = /^[a-z]+([A-Z][a-z]*)*$/, Hs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((r) => r.split(":")[0]).filter((r) => r.length).filter((r) => !Us.test(r)).length && Ye.push({ filePath: t, message: `prop names are ${O}not camelCased${$}` });
}, Vs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${A}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Gs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(V),
    X(S(de(` 	
\r`))),
    S(D("/>")),
    X(S(de(` 	
\r`))),
    X("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const r = R(":", S(V), X(" "), "=", X(" "), D(`'"`), [
    "g"
  ]);
  o?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const f = l.match(r);
    if (f?.length) {
      const d = I(e.source, l);
      Xe.push({ filePath: t, message: `line #${d} ${O}${f}${$}` });
    }
  });
}, Ks = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${A}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Zs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(Yt.uppercase, V),
    X(Jt, Xt),
    X(S(D(">"))),
    "></",
    S(V),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((r) => {
    const l = I(e.source, r), f = r.split(`
`).at(-1)?.trim() || "";
    Je.push({ filePath: t, message: `line #${l} ${O}${f}${$}` });
  });
}, qs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${A}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, en = [], Ce = [], Qs = 5, Ys = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > Qs) {
      const r = o.split(`
`)[0], l = I(e.content, r);
      en.push({ filePath: t, message: `line #${l} ${O}computed${$}` }), Ce.push({ filePath: t }), Ce.some((f) => f.filePath === t) || Ce.push({ filePath: t });
    }
  });
}, Xs = () => {
  const e = [];
  return Ce.length > 0 && en.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${A}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Js = 40, eo = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Js) {
      const r = I(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      et.push({
        filePath: t,
        message: `line #${r} ${O}${l}${$}`
      });
    }
  });
}, to = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${A}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], tn = 5, no = 2 * tn, so = (e, t) => {
  if (!e)
    return;
  const n = R(z, "if", z, [P, H]), s = R(z, "else", z, [P, H]), o = R(z, "for", z, [P, H]), r = R(z, "while", z, [P, H]), l = R(z, "case", z, [P, H]), f = e.content.match(n), d = e.content.match(s), w = e.content.match(o), x = e.content.match(r), _ = e.content.match(l), N = (f?.length || 0) + (d?.length || 0) + (w?.length || 0) + (x?.length || 0) + (_?.length || 0);
  N > tn && tt.push({ filePath: t, message: `${N > no ? M : O}(${N})${$}` });
}, oo = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${A}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Tt = 5, ro = 3, io = (e, t) => {
  if (!e)
    return;
  const n = R(Xt.times.atLeast(Tt).or(L.times.atLeast(ro * Tt)), [
    P,
    H
  ]);
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    nt.push({
      filePath: t,
      message: `line #${r} ${O}indentation: ${o.length}${$}`
    });
  });
}, co = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${m}`,
      description: `👉 ${A}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], ao = (e, t) => {
  if (!e)
    return;
  const n = R(z, "else", z, [P, H]), s = e.content.match(n);
  s?.length && st.push({ filePath: t, message: `else clauses found ${M}(${s.length})${$}` });
}, lo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${m}`,
      description: `👉 ${A}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, _e = [], ot = 20, uo = 5, fo = 8;
function ho({ funcName: e, funcBody: t, lineNumber: n, filePath: s }) {
  const o = t.split(`
`).length, r = go(e);
  if (o > 2 * ot) {
    _e.push({ filePath: s, message: `function ${M}(${r}#${n})${$} is too long: ${M}${o} lines${$}` });
    return;
  }
  o >= ot && _e.push({ filePath: s, message: `function ${O}(${r}#${n})${$} is too long: ${O}${o} lines${$}` });
}
function po(e, t) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = t;
  const s = n.exec(e);
  if (s) {
    const o = s[1], r = n.lastIndex;
    let l = 1, f = r;
    for (; l > 0 && f < e.length; )
      e[f] === "{" ? l++ : e[f] === "}" && l--, f++;
    const d = e.slice(r, f - 1).trim();
    return {
      name: o,
      body: d,
      end: f
      // Returns the position after the matched function
    };
  } else
    return null;
}
function mo(e, t) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = e.slice(t), o = n.exec(s);
  if (o) {
    const [, r] = o, l = t + o.index + o[0].length;
    let f = l, d = "";
    if (e[l] === "{") {
      let w = 1;
      for (f = l + 1; f < e.length && w > 0; )
        e[f] === "{" ? w++ : e[f] === "}" && w--, f++;
      d = e.slice(l + 1, f - 1).trim();
    } else {
      for (; f < e.length && e[f] !== ";"; )
        f++;
      d = e.slice(l, f).trim();
    }
    return {
      name: r,
      body: d,
      end: f
      // Position after the end of the function body
    };
  } else
    return null;
}
function go(e) {
  return e.replace(/^const\s*/, "");
}
const $o = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let r = "", l = "", f = !1;
    if (n.slice(o, o + fo) === "function") {
      const d = po(n, o);
      d && (f = !0, r = d.name, l = d.body, o = d.end);
    }
    if (n.slice(o, o + uo) === "const") {
      const d = mo(n, o);
      d && (f = !0, r = d.name, l = d.body, o = d.end);
    }
    if (f) {
      const d = I(n.trim(), r);
      ho({ funcName: r, funcBody: l, lineNumber: d, filePath: t });
    } else
      o++;
  }
}, bo = () => {
  const e = [];
  return _e.length > 0 && _e.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${m}`,
      description: `👉 ${A}Functions must be shorter than ${ot} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], yo = (e, t) => {
  if (!e)
    return;
  const n = R("<a", z, [P, H]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `${s?.length} ${O}html link found${$}` });
}, Eo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${m}`,
      description: `👉 ${A}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], vo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, r) => {
    const l = o.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const f = s[r + 1]?.trim();
      (!f || !f.startsWith("{") && !l.endsWith("{")) && it.push({
        filePath: t,
        message: `line #${r} if statement without curly braces: ${M}${l}${$}`
      });
    }
  });
}, wo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${m}`,
      description: `👉 ${A}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], xo = (e, t) => {
  if (!e)
    return;
  const n = R(S(ms).as("magicNumber"), ps(")", Jt), [P]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s.groups?.magicNumber, l = Number.parseInt(r ?? "0");
    if (l > 1) {
      const f = I(e.content, String(l), o);
      ct.push({
        filePath: t,
        message: `line #${f} ${O}magic number: ${l}${$}`
      }), o = f;
    }
  }
}, Oo = () => {
  const e = [];
  return ct.length && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${m}`,
      description: `👉 ${A}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], Ao = (e, t) => {
  if (!e)
    return;
  const n = R(S(Ae), L, "?", L, S(Ae), L, ":", L, S(Ae));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const r = I(e.content, o);
      at.push({
        filePath: t,
        message: `line #${r} has ${O}nested ternary${$}`
      });
    }
  });
}, Co = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${m}`,
      description: `👉 ${A}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], So = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    lt.push({
      filePath: t,
      message: `line #${r} ${O}props destructuring found: ${o}${$}`
    });
  });
}, _o = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${A}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], nn = 3, It = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > nn && ut.push({ filePath: n, message: `function ${O}${e}${$} has ${O}${s.length}${$} parameters` });
}, No = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] && It(s[1], s[2], t), s[3] && It(s[3], s[4], t);
}, Ro = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${m}`,
      description: `👉 ${A}Max number of function parameters should be ${nn}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], jo = (e, t) => {
  !e || e.setup || ft.push({ filePath: t, message: `${O}Plain <script> block${$} found` });
}, Lo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${A} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], Fo = (e, t) => {
  if (!e)
    return;
  const n = R(
    "defineProps(",
    L.times.any(),
    "[",
    L.times.any(),
    S(de(`'"`), S(V), de(`'"`), L.times.any(), X(",", L.times.any())),
    "]",
    L.times.any(),
    ")",
    [P]
  ), s = R(
    "<",
    S(V).grouped(),
    L,
    D(">").times.any(),
    ":",
    S(V).grouped(),
    L.times.any(),
    "=",
    L.times.any(),
    '"props.',
    S(V).grouped(),
    '"',
    [P]
  );
  let o;
  const r = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((d) => r.add(d));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const f = l[1], d = l[2], w = l[3];
    r.has(w) && d === w && ht.push({
      filePath: t,
      message: `Prop ${O}(${w})${$} is being drilled through ${O}${f}${$} component unmodified.`
    });
  }
}, Po = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${m}`,
      description: `👉 ${A}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], mt = 100, To = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > mt && pt.push({ filePath: t, message: `${n.length > mt * 2 ? M : O}(${n.length} lines)${$}` });
}, Io = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${A}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${mt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], sn = 4, Wo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < sn && dt.push({ filePath: t, message: `${M}(${o})${$}` });
  }
}, Mo = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${m}`,
      description: `👉 ${A}Variable names must have a minimum length of ${sn}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], Bo = 5, ko = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps", X("<"), X("("), "{", S(Ae), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Bo && gt.push({ filePath: t, message: `props found ${M}(${o})${$}` });
  }
}, zo = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${m}`,
      description: `👉 ${A}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, $t = [], Do = (e, t) => {
  if (!e)
    return;
  const n = R('v-for="(', L.times.any(), S(V).grouped(), L.times.any(), ",", L.times.any(), S(V).grouped(), L.times.any(), ")", S(L), "in", S(L), S(V).grouped(), [P]), s = R(':key="', L.times.any(), S(V).grouped(), L.times.any(), '"', [P]), o = [...e.content.matchAll(n)], r = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [f, d, w, x] = l;
    r.forEach((_) => {
      const N = _[1];
      if (N === w) {
        const Q = I(e.content.trim(), N);
        $t.push({
          filePath: t,
          message: `line #${Q} ${O}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Uo = () => {
  const e = [];
  return $t.length > 0 && $t.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${A}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], Ho = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], r = s[1], l = I(e.content.trim(), o);
    bt.push({
      filePath: t,
      message: `line #${l} zero length comparison found ${O}(${r})${$}`
    });
  }
}, Vo = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${A}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Go = (e, t, n) => {
  const s = {}, o = ({ file: w, rule: x, title: _, description: N, message: Q }) => {
    const re = e === "rule" ? x : w;
    s[re] || (s[re] = []), s[re].push({ file: w, rule: x, title: _, description: N, message: Q });
  }, r = (w) => {
    w().forEach((_) => {
      o(_);
    });
  };
  r(ws), r(Es), r(Os), r(Cs), r(bs), r(Ls), r(Ps), r(Ws), r(ks), r(Ds), r(Vs), r(Ks), r(qs), r(Xs), r(to), r(Rs), r(_s), r(gs), r(as), r(oo), r(co), r(lo), r(bo), r(Eo), r(wo), r(Oo), r(Co), r(_o), r(Ro), r(Lo), r(Po), r(Io), r(Mo), r(zo), r(Uo), r(Vo);
  const l = [], f = Object.keys(s).sort((w, x) => {
    const _ = s[w].length, N = s[x].length;
    return t === "desc" ? N - _ : _ - N;
  }), d = [];
  return f.forEach((w) => {
    d.push({ info: `
 - ${w}` }), s[w].forEach((x) => {
      const _ = x.message.includes(M);
      if (l.some((N) => N.file === x.file)) {
        const N = l.find((Q) => Q.file === x.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        l.push({ file: x.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" && d.push({ info: `   Rule: ${x.rule}` }), e !== "file" && d.push({ info: `   File: ${x.file}` }), d.push({ info: `   Description: ${x.description}` }), d.push({ info: `   Message: ${x.message || "🚨"}
` }));
    });
  }), { output: d, health: l };
}, Ko = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue");
  n.includes("vue-essential") && (ys(s, t), o && (vs(t), $s(e.styles, t), xs(e.template, t), As(e.template, t))), n.includes("vue-strong") && (Ys(s, t), o && (Fs(s, t), Hs(s, t), js(t), Zs(e, t), eo(e.template, t), Gs(e, t), Is(e, t), Bs(t), zs(e.template, t))), n.includes("vue-recommended") && o && (Ns(e.source, t), Ss(e.template, t)), n.includes("vue-caution") && o && (ds(s, t), cs(e.styles, t)), n.includes("rrd") && (so(s, t), io(s, t), ao(s, t), $o(s, t), vo(s, t), xo(s, t), Ao(s, t), No(s, t), Fo(s, t), To(s, t), Wo(s, t), ko(s, t), So(s, t), Ho(s, t), o && (yo(e.template, t), jo(e.script, t), Do(e.template, t)));
}, Zo = 1.5, Wt = 75, Mt = 85, Bt = 95, qo = (e, t, n) => {
  const { errors: s, warnings: o } = e.reduce((f, { errors: d, warnings: w }) => ({ errors: f.errors + d, warnings: f.warnings + w }), { errors: 0, warnings: 0 }), r = [];
  r.push({ info: `Found ${M}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${O}${Intl.NumberFormat("en-US").format(o)} warnings${$}, ${k}${Intl.NumberFormat("en-US").format(t)} lines${$} of code in ${k}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const l = Math.ceil((1 - (s * Zo + o) / t) * 100);
  return l < Wt && r.push({ info: `${M}Code health is LOW: ${l}%${$}` }), l >= Wt && l < Mt && r.push({ info: `${O}Code health is MEDIUM ${l}%${$}` }), l >= Mt && l < Bt && r.push({ info: `${k}Code health is OK: ${l}%${$}` }), l >= Bt && r.push({ info: `${Qt}Code health is GOOD: ${l}%${$}` }), { errors: s, warnings: o, output: r };
};
let yt = 0, on = 0, rn = [];
const Qo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], wt = [], ce = [], kt = async (e, t) => {
  if (!wt.some((n) => e.endsWith(n)) && (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js"))) {
    yt++;
    const n = await ae.readFile(t, "utf-8");
    on += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = jn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), ce.push({ info: `Analyzing ${t}...` }), Ko(s, t, rn);
  }
}, cn = async (e) => {
  if (!(await ae.stat(e)).isDirectory()) {
    await kt(e, e);
    return;
  }
  const n = await ae.readdir(e);
  for (const s of n) {
    const o = oe.join(e, s);
    (await ae.stat(o)).isDirectory() && !Qo.some((l) => o.includes(l)) && !wt.some((l) => o.endsWith(l)) && await cn(o), await kt(o, o);
  }
}, Yo = async ({ dir: e, apply: t = [], exclude: n, groupBy: s, level: o, orderBy: r }) => {
  const l = se.filter((N) => !t.includes(N));
  ce.push({ info: `${k}Analyzing Vue, TS and JS files in ${e}${$}` }), ce.push({
    info: `Applying ${k}${t.length}${$} rulesets ${k}${t}${$}
      Ignoring ${k}${l.length}${$} rulesets ${k}${l}${$}
      Excluding ${k}${n || "-"}${$}
      Output level ${k}${o}${$}
      Grouping by ${k}${s}${$}
      Ordering ${k}${r}${$}`
  }), rn = t, n && wt.push(...n.split(",")), await cn(e), ce.push({ info: `Found ${k}${yt}${$} files` });
  const { health: f, output: d } = Go(s, r, o), { errors: w, warnings: x, output: _ } = qo(f, on, yt);
  return !w && !x && ce.push({ info: `${Qt}No code smells detected!${$}` }), { output: ce, codeHealthOutput: _, reportOutput: d };
}, Xo = ["rule", "file"], Jo = ["asc", "desc"], er = ["all", "error"], tr = ["text", "json"], nr = {
  groupBy: Xo,
  orderBy: Jo,
  outputLevel: er,
  outputFormat: tr
}, we = (e, t) => {
  const n = nr[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}, sr = async () => {
  let e = process.cwd();
  for (; e !== oe.parse(e).root; ) {
    const t = oe.join(e, "package.json");
    return await ae.access(t), e;
  }
  e = oe.dirname(e);
}, zt = (e) => (t) => {
  const n = t?.split(",");
  if (!n)
    return;
  const s = n.filter((o) => !se.includes(o));
  return s.length > 0 && (console.error(
    `
${M}Invalid ${e} values: ${s.join(
      ", "
    )}${$}. 
${A}Allowed values are: ${[...se].join(", ")}${m}

`
  ), process.exit(1)), n;
}, an = await sr();
an || (console.error(`
${M}Cannot find project root.${$}

`), process.exit(1));
const Et = [];
let q = {
  path: "./src",
  apply: void 0,
  // RULESETS.join(','),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const e = oe.join(an, "vue-mess-detector.json"), t = JSON.parse(await ae.readFile(e, "utf-8"));
  q = { ...q, ...t }, Et.push({ info: `👉 Using configuration from ${e}` });
} catch {
  Et.push({ info: "👉 Using default configuration" });
}
En(Pn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(q).positional("path", {
    describe: "path to the Vue files",
    default: q.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: se,
    coerce: zt("apply"),
    group: "Filter Rulesets:",
    default: q.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: q.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => we(t, "groupBy"),
    default: q.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => we(t, "outputLevel"),
    default: q.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: se,
    coerce: zt("ignore"),
    default: q.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => we(t, "orderBy"),
    default: q.order,
    group: "Order Results:"
  }).option("output", {
    describe: "Output format",
    choices: ["text", "json"],
    coerce: (t) => we(t, "outputFormat"),
    default: q.output,
    group: "Output Format:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${M}Cannot use both --ignore and --apply options together.${$}

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...se];
    e.apply && (t = e.apply), e.ignore && (t = se.filter((n) => !e.ignore.includes(n))), Yo({
      dir: e.path,
      apply: t,
      exclude: e.exclude,
      groupBy: e.group,
      level: e.level,
      orderBy: e.order
    }).then((n) => {
      e.output == "text" && ([...Et, ...n.output].forEach((s) => {
        console.log(s.info);
      }), n.reportOutput?.forEach((s) => {
        console.log(s.info);
      }), n.codeHealthOutput?.forEach((s) => {
        console.log(s.info);
      })), e.output == "json" && console.log(JSON.stringify(n, null, 2));
    }).catch((n) => {
      console.error(`${M}${n}${$}`);
    });
  }
).help().argv;
