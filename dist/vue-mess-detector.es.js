import le from "node:fs/promises";
import ie from "node:path";
import wn from "yargs";
import { format as Ut, inspect as xn } from "util";
import { normalize as On, resolve as ue, dirname as We, basename as An, extname as Cn, relative as Sn } from "path";
import { readFileSync as vt, statSync as Ht, readdirSync as _n, writeFile as Nn } from "fs";
import { notStrictEqual as Rn, strictEqual as jn } from "assert";
import { fileURLToPath as Ln } from "url";
import { parse as Fn } from "@vue/compiler-sfc";
class de extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
function Vt() {
  return Pn() ? 0 : 1;
}
function Pn() {
  return Tn() && !process.defaultApp;
}
function Tn() {
  return !!process.versions.electron;
}
function In(e) {
  return e.slice(Vt() + 1);
}
function Wn() {
  return process.argv[Vt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function me(e) {
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
function Gt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), l = e.charAt(o);
    r !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
  }
  return s;
}
function Kt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Mn(e) {
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
var q;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(q || (q = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ne;
class Bn {
  constructor(t) {
    ne = t;
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
    }, n), o = Mn(t), r = typeof t == "string", l = kn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), u = Object.assign({
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
    }, s.configuration), m = Object.assign(/* @__PURE__ */ Object.create(null), s.default), E = s.configObjects || [], x = s.envPrefix, _ = u["populate--"], N = _ ? "--" : "_", M = /* @__PURE__ */ Object.create(null), se = /* @__PURE__ */ Object.create(null), ee = s.__ || ne.format, h = {
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
    }, H = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, fe = new RegExp("^--" + u["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const a = typeof i == "object" ? i.key : i, p = Object.keys(i).map(function(f) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[f];
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
    })), dn(s.key, l, s.default, h.arrays), Object.keys(m).forEach(function(i) {
      (h.aliases[i] || []).forEach(function(a) {
        m[a] = m[i];
      });
    });
    let k = null;
    vn();
    let X = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ot = {};
    for (let i = 0; i < o.length; i++) {
      const a = o[i], p = a.replace(/^-{3,}/, "---");
      let f, c, b, g, y, T;
      if (a !== "--" && /^-/.test(a) && we(a))
        Re(a);
      else if (p.match(/^---+(=|$)/)) {
        Re(a);
        continue;
      } else if (a.match(/^--.+=/) || !u["short-option-groups"] && a.match(/^-.+=/))
        g = a.match(/^--?([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && (w(g[1], h.arrays) ? i = Ee(i, g[1], o, g[2]) : w(g[1], h.nargs) !== !1 ? i = ye(i, g[1], o, g[2]) : j(g[1], g[2], !0));
      else if (a.match(fe) && u["boolean-negation"])
        g = a.match(fe), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], j(c, w(c, h.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !u["short-option-groups"] && a.match(/^-[^-]+/))
        g = a.match(/^--?(.+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(H)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ce(c))));
      else if (a.match(/^-.\..+=/))
        g = a.match(/^-([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && j(g[1], g[2]);
      else if (a.match(/^-.\..+/) && !a.match(H))
        y = o[i + 1], g = a.match(/^-(.\..+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], y !== void 0 && !y.match(/^-/) && !w(c, h.bools) && !w(c, h.counts) ? (j(c, y), i++) : j(c, ce(c)));
      else if (a.match(/^-[^-]+/) && !a.match(H)) {
        b = a.slice(1, -1).split(""), f = !1;
        for (let W = 0; W < b.length; W++) {
          if (y = a.slice(W + 2), b[W + 1] && b[W + 1] === "=") {
            T = a.slice(W + 3), c = b[W], w(c, h.arrays) ? i = Ee(i, c, o, T) : w(c, h.nargs) !== !1 ? i = ye(i, c, o, T) : j(c, T), f = !0;
            break;
          }
          if (y === "-") {
            j(b[W], y);
            continue;
          }
          if (/[A-Za-z]/.test(b[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && w(y, h.bools) === !1) {
            j(b[W], y), f = !0;
            break;
          }
          if (b[W + 1] && b[W + 1].match(/\W/)) {
            j(b[W], y), f = !0;
            break;
          } else
            j(b[W], ce(b[W]));
        }
        c = a.slice(-1)[0], !f && c !== "-" && (w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(H)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ce(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(H) && w(a.slice(1), h.bools))
        c = a.slice(1), j(c, ce(c));
      else if (a === "--") {
        X = o.slice(i + 1);
        break;
      } else if (u["halt-at-non-option"]) {
        X = o.slice(i);
        break;
      } else
        Re(a);
    }
    Ct(F, !0), Ct(F, !1), fn(F), hn(), St(F, h.aliases, m, !0), pn(F), u["set-placeholder-key"] && mn(F), Object.keys(h.counts).forEach(function(i) {
      he(F, i.split(".")) || j(i, 0);
    }), _ && X.length && (F[N] = []), X.forEach(function(i) {
      F[N].push(i);
    }), u["camel-case-expansion"] && u["strip-dashed"] && Object.keys(F).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete F[i];
    }), u["strip-aliased"] && [].concat(...Object.keys(l).map((i) => l[i])).forEach((i) => {
      u["camel-case-expansion"] && i.includes("-") && delete F[i.split(".").map((a) => me(a)).join(".")], delete F[i];
    });
    function Re(i) {
      const a = ve("_", i);
      (typeof a == "string" || typeof a == "number") && F._.push(a);
    }
    function ye(i, a, p, f) {
      let c, b = w(a, h.nargs);
      if (b = typeof b != "number" || isNaN(b) ? 1 : b, b === 0)
        return te(f) || (k = Error(ee("Argument unexpected for: %s", a))), j(a, ce(a)), i;
      let g = te(f) ? 0 : 1;
      if (u["nargs-eats-options"])
        p.length - (i + 1) + g < b && (k = Error(ee("Not enough arguments following: %s", a))), g = b;
      else {
        for (c = i + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(H) || we(p[c])); c++)
          g++;
        g < b && (k = Error(ee("Not enough arguments following: %s", a)));
      }
      let y = Math.min(g, b);
      for (!te(f) && y > 0 && (j(a, f), y--), c = i + 1; c < y + i + 1; c++)
        j(a, p[c]);
      return i + y;
    }
    function Ee(i, a, p, f) {
      let c = [], b = f || p[i + 1];
      const g = w(a, h.nargs);
      if (w(a, h.bools) && !/^(true|false)$/.test(b))
        c.push(!0);
      else if (te(b) || te(f) && /^-/.test(b) && !H.test(b) && !we(b)) {
        if (m[a] !== void 0) {
          const y = m[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        te(f) || c.push(je(a, f, !0));
        for (let y = i + 1; y < p.length && !(!u["greedy-arrays"] && c.length > 0 || g && typeof g == "number" && c.length >= g || (b = p[y], /^-/.test(b) && !H.test(b) && !we(b))); y++)
          i = y, c.push(je(a, b, r));
      }
      return typeof g == "number" && (g && c.length < g || isNaN(g) && c.length === 0) && (k = Error(ee("Not enough arguments following: %s", a))), j(a, c), i;
    }
    function j(i, a, p = r) {
      if (/-/.test(i) && u["camel-case-expansion"]) {
        const b = i.split(".").map(function(g) {
          return me(g);
        }).join(".");
        At(i, b);
      }
      const f = je(i, a, p), c = i.split(".");
      pe(F, c, f), h.aliases[i] && h.aliases[i].forEach(function(b) {
        const g = b.split(".");
        pe(F, g, f);
      }), c.length > 1 && u["dot-notation"] && (h.aliases[c[0]] || []).forEach(function(b) {
        let g = b.split(".");
        const y = [].concat(c);
        y.shift(), g = g.concat(y), (h.aliases[i] || []).includes(g.join(".")) || pe(F, g, f);
      }), w(i, h.normalize) && !w(i, h.arrays) && [i].concat(h.aliases[i] || []).forEach(function(g) {
        Object.defineProperty(Ot, g, {
          enumerable: !0,
          get() {
            return a;
          },
          set(y) {
            a = typeof y == "string" ? ne.normalize(y) : y;
          }
        });
      });
    }
    function At(i, a) {
      h.aliases[i] && h.aliases[i].length || (h.aliases[i] = [a], M[a] = !0), h.aliases[a] && h.aliases[a].length || At(a, i);
    }
    function je(i, a, p) {
      p && (a = zn(a)), (w(i, h.bools) || w(i, h.counts)) && typeof a == "string" && (a = a === "true");
      let f = Array.isArray(a) ? a.map(function(c) {
        return ve(i, c);
      }) : ve(i, a);
      return w(i, h.counts) && (te(f) || typeof f == "boolean") && (f = Fe()), w(i, h.normalize) && w(i, h.arrays) && (Array.isArray(a) ? f = a.map((c) => ne.normalize(c)) : f = ne.normalize(a)), f;
    }
    function ve(i, a) {
      return !u["parse-positional-numbers"] && i === "_" || !w(i, h.strings) && !w(i, h.bools) && !Array.isArray(a) && (Kt(a) && u["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !te(a) && w(i, h.numbers)) && (a = Number(a)), a;
    }
    function fn(i) {
      const a = /* @__PURE__ */ Object.create(null);
      St(a, h.aliases, m), Object.keys(h.configs).forEach(function(p) {
        const f = i[p] || a[p];
        if (f)
          try {
            let c = null;
            const b = ne.resolve(ne.cwd(), f), g = h.configs[p];
            if (typeof g == "function") {
              try {
                c = g(b);
              } catch (y) {
                c = y;
              }
              if (c instanceof Error) {
                k = c;
                return;
              }
            } else
              c = ne.require(b);
            Le(c);
          } catch (c) {
            c.name === "PermissionDenied" ? k = c : i[p] && (k = Error(ee("Invalid JSON config file: %s", f)));
          }
      });
    }
    function Le(i, a) {
      Object.keys(i).forEach(function(p) {
        const f = i[p], c = a ? a + "." + p : p;
        typeof f == "object" && f !== null && !Array.isArray(f) && u["dot-notation"] ? Le(f, c) : (!he(F, c.split(".")) || w(c, h.arrays) && u["combine-arrays"]) && j(c, f);
      });
    }
    function hn() {
      typeof E < "u" && E.forEach(function(i) {
        Le(i);
      });
    }
    function Ct(i, a) {
      if (typeof x > "u")
        return;
      const p = typeof x == "string" ? x : "", f = ne.env();
      Object.keys(f).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const b = c.split("__").map(function(g, y) {
            return y === 0 && (g = g.substring(p.length)), me(g);
          });
          (a && h.configs[b.join(".")] || !a) && !he(i, b) && j(b.join("."), f[c]);
        }
      });
    }
    function pn(i) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(f) {
        if (!p.has(f) && (a = w(f, h.coercions), typeof a == "function"))
          try {
            const c = ve(f, a(i[f]));
            [].concat(h.aliases[f] || [], f).forEach((b) => {
              p.add(b), i[b] = c;
            });
          } catch (c) {
            k = c;
          }
      });
    }
    function mn(i) {
      return h.keys.forEach((a) => {
        ~a.indexOf(".") || typeof i[a] > "u" && (i[a] = void 0);
      }), i;
    }
    function St(i, a, p, f = !1) {
      Object.keys(p).forEach(function(c) {
        he(i, c.split(".")) || (pe(i, c.split("."), p[c]), f && (se[c] = !0), (a[c] || []).forEach(function(b) {
          he(i, b.split(".")) || pe(i, b.split("."), p[c]);
        }));
      });
    }
    function he(i, a) {
      let p = i;
      u["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const f = a[a.length - 1];
      return typeof p != "object" ? !1 : f in p;
    }
    function pe(i, a, p) {
      let f = i;
      u["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(T) {
        T = Nt(T), typeof f == "object" && f[T] === void 0 && (f[T] = {}), typeof f[T] != "object" || Array.isArray(f[T]) ? (Array.isArray(f[T]) ? f[T].push({}) : f[T] = [f[T], {}], f = f[T][f[T].length - 1]) : f = f[T];
      });
      const c = Nt(a[a.length - 1]), b = w(a.join("."), h.arrays), g = Array.isArray(p);
      let y = u["duplicate-arguments-array"];
      !y && w(c, h.nargs) && (y = !0, (!te(f[c]) && h.nargs[c] === 1 || Array.isArray(f[c]) && f[c].length === h.nargs[c]) && (f[c] = void 0)), p === Fe() ? f[c] = Fe(f[c]) : Array.isArray(f[c]) ? y && b && g ? f[c] = u["flatten-duplicate-arrays"] ? f[c].concat(p) : (Array.isArray(f[c][0]) ? f[c] : [f[c]]).concat([p]) : !y && !!b == !!g ? f[c] = p : f[c] = f[c].concat([p]) : f[c] === void 0 && b ? f[c] = g ? p : [p] : y && !(f[c] === void 0 || w(c, h.counts) || w(c, h.bools)) ? f[c] = [f[c], p] : f[c] = p;
    }
    function dn(...i) {
      i.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          h.aliases[p] || (h.aliases[p] = [].concat(l[p] || []), h.aliases[p].concat(p).forEach(function(f) {
            if (/-/.test(f) && u["camel-case-expansion"]) {
              const c = me(f);
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), M[c] = !0);
            }
          }), h.aliases[p].concat(p).forEach(function(f) {
            if (f.length > 1 && /[A-Z]/.test(f) && u["camel-case-expansion"]) {
              const c = Gt(f, "-");
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), M[c] = !0);
            }
          }), h.aliases[p].forEach(function(f) {
            h.aliases[f] = [p].concat(h.aliases[p].filter(function(c) {
              return f !== c;
            }));
          }));
        });
      });
    }
    function w(i, a) {
      const p = [].concat(h.aliases[i] || [], i), f = Object.keys(a), c = p.find((b) => f.includes(b));
      return c ? a[c] : !1;
    }
    function _t(i) {
      const a = Object.keys(h);
      return [].concat(a.map((f) => h[f])).some(function(f) {
        return Array.isArray(f) ? f.includes(i) : f[i];
      });
    }
    function gn(i, ...a) {
      return [].concat(...a).some(function(f) {
        const c = i.match(f);
        return c && _t(c[1]);
      });
    }
    function $n(i) {
      if (i.match(H) || !i.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const f = i.slice(1).split("");
      for (let c = 0; c < f.length; c++) {
        if (p = i.slice(c + 2), !_t(f[c])) {
          a = !1;
          break;
        }
        if (f[c + 1] && f[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(f[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || f[c + 1] && f[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function we(i) {
      return u["unknown-options-as-args"] && bn(i);
    }
    function bn(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(H) || $n(i) ? !1 : !gn(i, /^-+([^=]+?)=[\s\S]*$/, fe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ce(i) {
      return !w(i, h.bools) && !w(i, h.counts) && `${i}` in m ? m[i] : yn(En(i));
    }
    function yn(i) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[i];
    }
    function En(i) {
      let a = q.BOOLEAN;
      return w(i, h.strings) ? a = q.STRING : w(i, h.numbers) ? a = q.NUMBER : w(i, h.bools) ? a = q.BOOLEAN : w(i, h.arrays) && (a = q.ARRAY), a;
    }
    function te(i) {
      return i === void 0;
    }
    function vn() {
      Object.keys(h.counts).find((i) => w(i, h.arrays) ? (k = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : w(i, h.nargs) ? (k = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(Ot, F),
      configuration: u,
      defaulted: Object.assign({}, se),
      error: k,
      newAliases: Object.assign({}, M)
    };
  }
}
function kn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let r = o + 1; r < t.length; r++)
        if (t[o].filter(function(u) {
          return t[r].indexOf(u) !== -1;
        }).length) {
          t[o] = t[o].concat(t[r]), t.splice(r, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(l, u, m) {
      return m.indexOf(l) === u;
    });
    const r = o.pop();
    r !== void 0 && typeof r == "string" && (n[r] = o);
  }), n;
}
function Fe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Nt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function zn(e) {
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
const Rt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, jt = (Te = (Pe = process == null ? void 0 : process.versions) === null || Pe === void 0 ? void 0 : Pe.node) !== null && Te !== void 0 ? Te : (Ie = process == null ? void 0 : process.version) === null || Ie === void 0 ? void 0 : Ie.slice(1);
if (jt && Number(jt.match(/^([^.]+)/)[1]) < Rt)
  throw Error(`yargs parser supports a minimum Node.js version of ${Rt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Dn = process ? process.env : {}, Zt = new Bn({
  cwd: process.cwd,
  env: () => Dn,
  format: Ut,
  normalize: On,
  resolve: ue,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(vt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), be = function(t, n) {
  return Zt.parse(t.slice(), n).argv;
};
be.detailed = function(e, t) {
  return Zt.parse(e.slice(), t);
};
be.camelCase = me;
be.decamelize = Gt;
be.looksLikeNumber = Kt;
const Un = {
  right: qn,
  center: Qn
}, Hn = 0, Oe = 1, Vn = 2, Ae = 3;
class Gn {
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
      o.length > 1 && z.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), z.stringWidth(o[0])));
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
    const n = z.stripAnsi(t);
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
      s.forEach((l, u) => {
        const { width: m } = t[u], E = this.negatePadding(t[u]);
        let x = l;
        if (E > z.stringWidth(l) && (x += " ".repeat(E - z.stringWidth(l))), t[u].align && t[u].align !== "left" && this.wrap) {
          const N = Un[t[u].align];
          x = N(x, E), z.stringWidth(x) < E && (x += " ".repeat((m || 0) - z.stringWidth(x) - 1));
        }
        const _ = t[u].padding || [0, 0, 0, 0];
        _[Ae] && (r += " ".repeat(_[Ae])), r += Lt(t[u], x, "| "), r += x, r += Lt(t[u], x, " |"), _[Oe] && (r += " ".repeat(_[Oe])), o === 0 && n.length > 0 && (r = this.renderInline(r, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, r = n.text, l = z.stringWidth(r.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, r.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, r + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((r, l) => {
      r.width = s[l], this.wrap ? o = z.wrap(r.text, this.negatePadding(r), { hard: !0 }).split(`
`) : o = r.text.split(`
`), r.border && (o.unshift("." + "-".repeat(this.negatePadding(r) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(r) + 2) + "'")), r.padding && (o.unshift(...new Array(r.padding[Hn] || 0).fill("")), o.push(...new Array(r.padding[Vn] || 0).fill(""))), o.forEach((u, m) => {
        n[m] || n.push([]);
        const E = n[m];
        for (let x = 0; x < l; x++)
          E[x] === void 0 && E.push("");
        E.push(u);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ae] || 0) + (t.padding[Oe] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || z.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), r = n ? Math.floor(s / n) : 0;
    return o.map((l, u) => l === void 0 ? Math.max(r, Kn(t[u])) : l);
  }
}
function Lt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Kn(e) {
  const t = e.padding || [], n = 1 + (t[Ae] || 0) + (t[Oe] || 0);
  return e.border ? n + 4 : n;
}
function Zn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function qn(e, t) {
  e = e.trim();
  const n = z.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Qn(e, t) {
  e = e.trim();
  const n = z.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let z;
function Yn(e, t) {
  return z = t, new Gn({
    width: e?.width || Zn(),
    wrap: e?.wrap
  });
}
const qt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Qt(e) {
  return e.replace(qt, "");
}
function Xn(e, t) {
  const [n, s] = e.match(qt) || ["", ""];
  e = Qt(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Jn(e) {
  return Yn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Qt,
    wrap: Xn
  });
}
function es(e, t) {
  let n = ue(".", e), s;
  for (Ht(n).isDirectory() || (n = We(n)); ; ) {
    if (s = t(n, _n(n)), s)
      return ue(n, s);
    if (n = We(s = n), s === n)
      break;
  }
}
const ts = {
  fs: {
    readFileSync: vt,
    writeFile: Nn
  },
  format: Ut,
  resolve: ue,
  exists: (e) => {
    try {
      return Ht(e).isFile();
    } catch {
      return !1;
    }
  }
};
let Z;
class ns {
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
    })) : s(), Z.format.apply(Z.format, [this.cache[this.locale][n] || n].concat(t));
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
    const u = [l];
    return ~l.indexOf("%d") && u.push(o), Z.format.apply(Z.format, u.concat(t));
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
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, r = n.cb, l = this._resolveLocaleFile(s, o), u = JSON.stringify(this.cache[o], null, 2);
    Z.fs.writeFile(l, u, "utf-8", function(m) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), r(m);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      Z.fs.readFileSync && (t = JSON.parse(Z.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = Z.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = Z.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return Z.exists(t);
  }
}
function ss(e, t) {
  Z = t;
  const n = new ns(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const os = (e) => ss(e, ts), rs = "require is not supported by ESM", Ft = "loading a directory of commands is not supported yet for ESM";
let ge;
try {
  ge = Ln(import.meta.url);
} catch {
  ge = process.cwd();
}
const is = ge.substring(0, ge.lastIndexOf("node_modules"));
Rn, jn, xn, is || process.cwd(), An, We, Cn, Sn, ue, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, vt, os({
  directory: ue(ge, "../../../locales"),
  updateFiles: !1
});
const Y = "\x1B[44m", O = "\x1B[43m", B = "\x1B[41m", Yt = "\x1B[42m", $ = "\x1B[0m", A = "\x1B[33m", C = "\x1B[36m", d = "\x1B[0m", cs = [
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
], Me = [], as = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const r = o[1];
      cs.includes(r) && Me.push({ filePath: t, message: `${O}(${r})${$}` });
    }
  });
}, ls = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${A}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, us = /^(\(.*\)|\\?.)$/;
function oe(e) {
  const t = e.toString();
  return us.test(t) ? t : `(?:${t})`;
}
const fs = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, hs = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(e) {
  const t = (n) => v(`(?<${n}>${`${e}`.replace(fs, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => v(`${e}${V(...n)}`), {
      referenceTo: (n) => v(`${e}\\k<${n}>`)
    }),
    or: (...n) => v(`(?:${e}|${V(...n)})`),
    after: (...n) => v(`(?<=${V(...n)})${e}`),
    before: (...n) => v(`${e}(?=${V(...n)})`),
    notAfter: (...n) => v(`(?<!${V(...n)})${e}`),
    notBefore: (...n) => v(`${e}(?!${V(...n)})`),
    times: Object.assign((n) => v(`${oe(e)}{${n}}`), {
      any: () => v(`${oe(e)}*`),
      atLeast: (n) => v(`${oe(e)}{${n},}`),
      atMost: (n) => v(`${oe(e)}{0,${n}}`),
      between: (n, s) => v(`${oe(e)}{${n},${s}}`)
    }),
    optionally: () => v(`${oe(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => v(`${e}`.replace(hs, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${e}`),
      lineEnd: () => v(`${e}$`)
    }
  };
}
const ps = /[.*+?^${}()|[\]\\/]/g;
function $e(e) {
  return v(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function U(e) {
  return v(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ms(...e) {
  return v(`(?:${e.map((t) => V(t)).join("|")})`);
}
const Ce = v(".");
v("\\b\\w+\\b");
const K = v("\\w"), D = v("\\b"), ds = v("\\d"), L = v("\\s"), Xt = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), Jt = v("\\t"), en = v("\\n");
v("\\r");
v("\\W+"), v("\\W"), v("\\B"), v("\\D"), v("\\S"), Object.assign(v("[^a-zA-Z]"), {
  lowercase: v("[^a-z]"),
  uppercase: v("[^A-Z]")
}), v("[^\\t]"), v("[^\\n]"), v("[^\\r]");
function J(...e) {
  return v(`${oe(V(...e))}?`);
}
function V(...e) {
  return v(
    e.map((t) => typeof t == "string" ? t.replace(ps, "\\$&") : t).join("")
  );
}
function S(...e) {
  return v(`${oe(V(...e))}+`);
}
const G = "i", P = "g", R = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(V(...e).toString(), [...t || ""].join(""));
}, I = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u, m) => m >= n && u.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((l, u) => l + u.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, _e = [], gs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = R(V("$parent").or("getCurrentInstance"), [P]), r = e.content.match(n), l = e.content.match(s);
  if (l) {
    const m = l[1].split(".")[0];
    if ((r ? r[1] : "").includes(m)) {
      const x = I(e.content.trim(), m);
      _e.push({
        filePath: t,
        message: `line #${x} ${O}(${m})${$}`
      });
    }
  }
  const u = e.content.match(o);
  if (u) {
    const m = I(e.content.trim(), u[0]);
    _e.push({
      filePath: t,
      message: `line #${m} ${O}(${u[0]})${$}`
    });
  }
}, $s = () => {
  const e = [];
  return _e.length > 0 && _e.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${A}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], bs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${O}global style${$} used`
    });
  });
}, ys = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${d}`,
      description: `👉 ${A}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], Es = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps([", [P, G]);
  e.content.match(n)?.length && ke.push({ filePath: t, message: `${O}Props type${$} not defined` });
}, vs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${d}`,
      description: `👉 ${A}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ws = (e) => {
  if (e.includes("pages"))
    return;
  const t = ie.basename(e);
  if (t === "App.vue")
    return;
  const n = R(Xt.uppercase);
  t.slice(1).match(n)?.length || ze.push({ filePath: e, message: `Component name is ${O}single word${$}` });
}, xs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${d}`,
      description: `👉 ${A}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], Os = (e, t) => {
  if (!e)
    return;
  const n = R("<", S(U(">")), " v-for", S(U(">")), ">", [
    P,
    G
  ]), s = e.content.match(n);
  s?.length && (s.some((r) => r.includes(":key")) || De.push({ filePath: t, message: `v-for used ${O}without a key${$}` }));
}, As = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${A}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = R(
    "<",
    S(U(">")),
    " v-if",
    S(U(">")),
    " v-for",
    S(U(">")),
    ">",
    [P, G]
  ), s = R(
    "<",
    S(U(">")),
    " v-for",
    S(U(">")),
    " v-if",
    S(U(">")),
    ">",
    [P, G]
  ), o = e.content.match(n), r = e.content.match(s);
  if (o?.length || r?.length) {
    const l = o?.length ? o[0] : r?.length ? r[0] : "", u = I(e.content, l);
    Ue.push({ filePath: t, message: `line #${u} ${O}v-if used with v-for${$}` });
  }
}, Ss = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${A}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Pt = [
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
], _s = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const l = r[1], u = r[2];
    if (u) {
      const E = Array.from(u.matchAll(o), (_) => _[1]).filter((_) => Pt.includes(_));
      let x = -1;
      for (const _ of E) {
        const N = Pt.indexOf(_);
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
}, Ns = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${A}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Rs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), r = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((m) => m.index !== -1);
  l.every((m, E) => E === 0 ? !0 : l[E - 1].index < m.index) || Ve.push({ filePath: t, message: `Top level elements are ${O}not following the correct order.${$}` });
}, js = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${d}`,
      description: `👉 ${A}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ls = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = ie.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, r = t.match(o);
  !s?.length && !r?.length && Ge.push({ filePath: e, message: `component name is ${O}not PascalCase, nor kebab-case.${$}` });
}, Fs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${A}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ps = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const r = I(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    Ke.push({ filePath: t, message: `line #${r} ${O}(${l})${$}` });
  });
}, Ts = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${d}`,
      description: `👉 ${A}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Tt = [], Is = ["v-slot", "v-bind", "v-on"], Ws = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Is.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Ze.push({ filePath: t, message: `line #${o} ${O}${s}${$}` }), Tt.some((r) => r.filePath === t) || Tt.push({ filePath: t });
    }
  });
}, Ms = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${A}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Bs = 3, ks = (e) => {
  const t = R(
    S(U("/")).grouped(),
    V(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = R(
      $e("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), r = s.match(o);
    (!r || r.length < Bs) && qe.push({ filePath: e, message: `${s} is not a ${O}full word.${$}` });
  }
}, zs = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${d}`,
      description: `👉 ${A}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Ds = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], r = s[2];
    r.split(/\s+/).filter((u) => u.trim() !== "").length > 1 && r.split(`
`).length === 1 && Qe.push({ filePath: t, message: `Element ${O}<${o}>${$} should have its attributes on separate lines` });
  }
}, Us = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${A}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Hs = /^[a-z]+([A-Z][a-z]*)*$/, Vs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((r) => r.split(":")[0]).filter((r) => r.length).filter((r) => !Hs.test(r)).length && Ye.push({ filePath: t, message: `prop names are ${O}not camelCased${$}` });
}, Gs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${A}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Ks = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(K),
    J(S($e(` 	
\r`))),
    S(U("/>")),
    J(S($e(` 	
\r`))),
    J("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const r = R(":", S(K), J(" "), "=", J(" "), U(`'"`), [
    "g"
  ]);
  o?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const u = l.match(r);
    if (u?.length) {
      const m = I(e.source, l);
      Xe.push({ filePath: t, message: `line #${m} ${O}${u}${$}` });
    }
  });
}, Zs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${A}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], qs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(Xt.uppercase, K),
    J(en, Jt),
    J(S(U(">"))),
    "></",
    S(K),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((r) => {
    const l = I(e.source, r), u = r.split(`
`).at(-1)?.trim() || "";
    Je.push({ filePath: t, message: `line #${l} ${O}${u}${$}` });
  });
}, Qs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${A}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tn = [], Se = [], Ys = 5, Xs = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > Ys) {
      const r = o.split(`
`)[0], l = I(e.content, r);
      tn.push({ filePath: t, message: `line #${l} ${O}computed${$}` }), Se.push({ filePath: t }), Se.some((u) => u.filePath === t) || Se.push({ filePath: t });
    }
  });
}, Js = () => {
  const e = [];
  return Se.length > 0 && tn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${A}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], eo = 40, to = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > eo) {
      const r = I(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      et.push({
        filePath: t,
        message: `line #${r} ${O}${l}${$}`
      });
    }
  });
}, no = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${A}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], nn = 5, so = 2 * nn, oo = (e, t) => {
  if (!e)
    return;
  const n = R(D, "if", D, [P, G]), s = R(D, "else", D, [P, G]), o = R(D, "for", D, [P, G]), r = R(D, "while", D, [P, G]), l = R(D, "case", D, [P, G]), u = e.content.match(n), m = e.content.match(s), E = e.content.match(o), x = e.content.match(r), _ = e.content.match(l), N = (u?.length || 0) + (m?.length || 0) + (E?.length || 0) + (x?.length || 0) + (_?.length || 0);
  N > nn && tt.push({ filePath: t, message: `${N > so ? B : O}(${N})${$}` });
}, ro = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${A}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], It = 5, io = 3, co = (e, t) => {
  if (!e)
    return;
  const n = R(Jt.times.atLeast(It).or(L.times.atLeast(io * It)), [
    P,
    G
  ]);
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    nt.push({
      filePath: t,
      message: `line #${r} ${O}indentation: ${o.length}${$}`
    });
  });
}, ao = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${d}`,
      description: `👉 ${A}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], lo = (e, t) => {
  if (!e)
    return;
  const n = R(D, "else", D, [P, G]), s = e.content.match(n);
  s?.length && st.push({ filePath: t, message: `else clauses found ${B}(${s.length})${$}` });
}, uo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${d}`,
      description: `👉 ${A}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ne = [], ot = 20, fo = 5, ho = 8;
function po({ funcName: e, funcBody: t, lineNumber: n, filePath: s }) {
  const o = t.split(`
`).length, r = $o(e);
  if (o > 2 * ot) {
    Ne.push({ filePath: s, message: `function ${B}(${r}#${n})${$} is too long: ${B}${o} lines${$}` });
    return;
  }
  o >= ot && Ne.push({ filePath: s, message: `function ${O}(${r}#${n})${$} is too long: ${O}${o} lines${$}` });
}
function mo(e, t) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = t;
  const s = n.exec(e);
  if (s) {
    const o = s[1], r = n.lastIndex;
    let l = 1, u = r;
    for (; l > 0 && u < e.length; )
      e[u] === "{" ? l++ : e[u] === "}" && l--, u++;
    const m = e.slice(r, u - 1).trim();
    return {
      name: o,
      body: m,
      end: u
      // Returns the position after the matched function
    };
  } else
    return null;
}
function go(e, t) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = e.slice(t), o = n.exec(s);
  if (o) {
    const [, r] = o, l = t + o.index + o[0].length;
    let u = l, m = "";
    if (e[l] === "{") {
      let E = 1;
      for (u = l + 1; u < e.length && E > 0; )
        e[u] === "{" ? E++ : e[u] === "}" && E--, u++;
      m = e.slice(l + 1, u - 1).trim();
    } else {
      for (; u < e.length && e[u] !== ";"; )
        u++;
      m = e.slice(l, u).trim();
    }
    return {
      name: r,
      body: m,
      end: u
      // Position after the end of the function body
    };
  } else
    return null;
}
function $o(e) {
  return e.replace(/^const\s*/, "");
}
const bo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let r = "", l = "", u = !1;
    if (n.slice(o, o + ho) === "function") {
      const m = mo(n, o);
      m && (u = !0, r = m.name, l = m.body, o = m.end);
    }
    if (n.slice(o, o + fo) === "const") {
      const m = go(n, o);
      m && (u = !0, r = m.name, l = m.body, o = m.end);
    }
    if (u) {
      const m = I(n.trim(), r);
      po({ funcName: r, funcBody: l, lineNumber: m, filePath: t });
    } else
      o++;
  }
}, yo = () => {
  const e = [];
  return Ne.length > 0 && Ne.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${d}`,
      description: `👉 ${A}Functions must be shorter than ${ot} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], Eo = (e, t) => {
  if (!e)
    return;
  const n = R("<a", D, [P, G]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `${s?.length} ${O}html link found${$}` });
}, vo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${d}`,
      description: `👉 ${A}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], wo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, r) => {
    const l = o.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const u = s[r + 1]?.trim();
      (!u || !u.startsWith("{") && !l.endsWith("{")) && it.push({
        filePath: t,
        message: `line #${r} if statement without curly braces: ${B}${l}${$}`
      });
    }
  });
}, xo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${d}`,
      description: `👉 ${A}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Oo = (e, t) => {
  if (!e)
    return;
  const n = R(S(ds).as("magicNumber"), ms(")", en), [P]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s.groups?.magicNumber, l = Number.parseInt(r ?? "0");
    if (l > 1) {
      const u = I(e.content, String(l), o);
      ct.push({
        filePath: t,
        message: `line #${u} ${O}magic number: ${l}${$}`
      }), o = u;
    }
  }
}, Ao = () => {
  const e = [];
  return ct.length && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${d}`,
      description: `👉 ${A}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], Co = (e, t) => {
  if (!e)
    return;
  const n = R(S(Ce), L, "?", L, S(Ce), L, ":", L, S(Ce));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const r = I(e.content, o);
      at.push({
        filePath: t,
        message: `line #${r} has ${O}nested ternary${$}`
      });
    }
  });
}, So = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${d}`,
      description: `👉 ${A}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], _o = (e, t) => {
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
}, No = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ no Prop Destructure${d}`,
      description: `👉 ${A}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], sn = 3, Wt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > sn && ut.push({ filePath: n, message: `function ${O}${e}${$} has ${O}${s.length}${$} parameters` });
}, Ro = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] && Wt(s[1], s[2], t), s[3] && Wt(s[3], s[4], t);
}, jo = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${d}`,
      description: `👉 ${A}Max number of function parameters should be ${sn}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], Lo = (e, t) => {
  !e || e.setup || ft.push({ filePath: t, message: `${O}Plain <script> block${$} found` });
}, Fo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${A} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], Po = (e, t) => {
  if (!e)
    return;
  const n = R(
    "defineProps(",
    L.times.any(),
    "[",
    L.times.any(),
    S($e(`'"`), S(K), $e(`'"`), L.times.any(), J(",", L.times.any())),
    "]",
    L.times.any(),
    ")",
    [P]
  ), s = R(
    "<",
    S(K).grouped(),
    L,
    U(">").times.any(),
    ":",
    S(K).grouped(),
    L.times.any(),
    "=",
    L.times.any(),
    '"props.',
    S(K).grouped(),
    '"',
    [P]
  );
  let o;
  const r = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((m) => r.add(m));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const u = l[1], m = l[2], E = l[3];
    r.has(E) && m === E && ht.push({
      filePath: t,
      message: `Prop ${O}(${E})${$} is being drilled through ${O}${u}${$} component unmodified.`
    });
  }
}, To = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${d}`,
      description: `👉 ${A}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], mt = 100, Io = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > mt && pt.push({ filePath: t, message: `${n.length > mt * 2 ? B : O}(${n.length} lines)${$}` });
}, Wo = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${A}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${mt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], on = 4, Mo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < on && dt.push({ filePath: t, message: `${B}(${o})${$}` });
  }
}, Bo = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${d}`,
      description: `👉 ${A}Variable names must have a minimum length of ${on}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], ko = 5, zo = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps", J("<"), J("("), "{", S(Ce), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > ko && gt.push({ filePath: t, message: `props found ${B}(${o})${$}` });
  }
}, Do = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${d}`,
      description: `👉 ${A}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, $t = [], Uo = (e, t) => {
  if (!e)
    return;
  const n = R('v-for="(', L.times.any(), S(K).grouped(), L.times.any(), ",", L.times.any(), S(K).grouped(), L.times.any(), ")", S(L), "in", S(L), S(K).grouped(), [P]), s = R(':key="', L.times.any(), S(K).grouped(), L.times.any(), '"', [P]), o = [...e.content.matchAll(n)], r = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [u, m, E, x] = l;
    r.forEach((_) => {
      const N = _[1];
      if (N === E) {
        const M = I(e.content.trim(), N);
        $t.push({
          filePath: t,
          message: `line #${M} ${O}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Ho = () => {
  const e = [];
  return $t.length > 0 && $t.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${d}`,
      description: `👉 ${A}Avoid using index as key in v-for loops.${d} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], Vo = (e, t) => {
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
}, Go = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${d}`,
      description: `👉 ${A}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ko = (e, t, n) => {
  const s = {}, o = ({ file: E, rule: x, title: _, description: N, message: M }) => {
    const se = e === "rule" ? x : E;
    s[se] || (s[se] = []), s[se].push({ file: E, rule: x, title: _, description: N, message: M });
  }, r = (E) => {
    E().forEach((_) => {
      o(_);
    });
  };
  r(xs), r(vs), r(As), r(Ss), r(ys), r(Fs), r(Ts), r(Ms), r(zs), r(Us), r(Gs), r(Zs), r(Qs), r(Js), r(no), r(js), r(Ns), r($s), r(ls), r(ro), r(ao), r(uo), r(yo), r(vo), r(xo), r(Ao), r(So), r(No), r(jo), r(Fo), r(To), r(Wo), r(Bo), r(Do), r(Ho), r(Go);
  const l = [], u = Object.keys(s).sort((E, x) => {
    const _ = s[E].length, N = s[x].length;
    return t === "desc" ? N - _ : _ - N;
  }), m = [];
  return u.forEach((E) => {
    m.push({ info: `
 - ${E}` }), s[E].forEach((x) => {
      const _ = x.message.includes(B);
      if (l.some((N) => N.file === x.file)) {
        const N = l.find((M) => M.file === x.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        l.push({ file: x.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" && m.push({ info: `   Rule: ${x.rule}` }), e !== "file" && m.push({ info: `   File: ${x.file}` }), m.push({ info: `   Description: ${x.description}` }), m.push({ info: `   Message: ${x.message || "🚨"}
` }));
    });
  }), { output: m, health: l };
}, re = {
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
}, wt = Object.keys(re), Zo = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue"), r = {
    // vue-essential
    simpleProp: () => Es(s, t),
    singleNameComponent: () => o && ws(t),
    globalStyle: () => o && bs(e.styles, t),
    vforNoKey: () => o && Os(e.template, t),
    vifWithVfor: () => o && Cs(e.template, t),
    // vue-strong
    simpleComputed: () => Xs(s, t),
    componentFiles: () => o && Ps(s, t),
    propNameCasing: () => o && Vs(s, t),
    componentFilenameCasing: () => o && Ls(t),
    selfClosingComponents: () => o && qs(e, t),
    templateSimpleExpression: () => o && to(e.template, t),
    quotedAttributeValues: () => o && Ks(e, t),
    directiveShorthands: () => o && Ws(e, t),
    fullWordComponentName: () => o && ks(t),
    multiAttributeElements: () => o && Ds(e.template, t),
    // vue-recommended
    topLevelElementOrder: () => o && Rs(e.source, t),
    elementAttributeOrder: () => o && _s(e.template, t),
    // vue-caution
    implicitParentChildCommunication: () => o && gs(s, t),
    elementSelectorsWithScoped: () => o && as(e.styles, t),
    // rrd
    cyclomaticComplexity: () => oo(s, t),
    deepIndentation: () => co(s, t),
    elseCondition: () => lo(s, t),
    functionSize: () => bo(s, t),
    ifWithoutCurlyBraces: () => wo(s, t),
    magicNumbers: () => Oo(s, t),
    nestedTernary: () => Co(s, t),
    parameterCount: () => Ro(s, t),
    propsDrilling: () => Po(s, t),
    scriptLength: () => Io(s, t),
    shortVariableName: () => Mo(s, t),
    tooManyProps: () => zo(s, t),
    noPropDestructure: () => _o(s, t),
    zeroLengthComparison: () => Vo(s, t),
    htmlLink: () => o && Eo(e.template, t),
    plainScript: () => o && Lo(e.script, t),
    vForWithIndexKey: () => o && Uo(e.template, t)
  };
  n.forEach((l) => {
    l in re ? re[l].forEach((u) => {
      u in r && r[u]();
    }) : l in r && r[l]();
  });
}, qo = 1.5, Mt = 75, Bt = 85, kt = 95, rn = [...wt, ...Object.values(re).flat()], Qo = (e, t, n) => {
  const { errors: s, warnings: o } = e.reduce((u, { errors: m, warnings: E }) => ({ errors: u.errors + m, warnings: u.warnings + E }), { errors: 0, warnings: 0 }), r = [];
  r.push({ info: `Found ${B}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${O}${Intl.NumberFormat("en-US").format(o)} warnings${$}, ${Y}${Intl.NumberFormat("en-US").format(t)} lines${$} of code in ${Y}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const l = Math.ceil((1 - (s * qo + o) / t) * 100);
  return l < Mt && r.push({ info: `${B}Code health is LOW: ${l}%${$}
` }), l >= Mt && l < Bt && r.push({ info: `${O}Code health is MEDIUM ${l}%${$}
` }), l >= Bt && l < kt && r.push({ info: `${Y}Code health is OK: ${l}%${$}
` }), l >= kt && r.push({ info: `${Yt}Code health is GOOD: ${l}%${$}
` }), { errors: s, warnings: o, output: r };
};
function Yo(e) {
  const t = [], n = [];
  return Object.entries(re).forEach(([s, o]) => {
    if (o.every((r) => e.includes(r)))
      t.push(s);
    else {
      const r = o.filter((l) => e.includes(l));
      n.push(...r);
    }
  }), { rulesets: t, individualRules: n };
}
let yt = 0, cn = 0, an = [];
const Xo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], xt = [], ae = [], zt = async (e, t) => {
  if (!xt.some((n) => e.endsWith(n)) && (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js"))) {
    yt++;
    const n = await le.readFile(t, "utf-8");
    cn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Fn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), ae.push({ info: `Analyzing ${t}...` }), Zo(s, t, an);
  }
}, ln = async (e) => {
  if (!(await le.stat(e)).isDirectory()) {
    await zt(e, e);
    return;
  }
  const n = await le.readdir(e);
  for (const s of n) {
    const o = ie.join(e, s);
    (await le.stat(o)).isDirectory() && !Xo.some((l) => o.includes(l)) && !xt.some((l) => o.endsWith(l)) && await ln(o), await zt(o, o);
  }
}, Jo = async ({ dir: e, apply: t = [], ignore: n = [], exclude: s, groupBy: o, level: r, orderBy: l }) => {
  const u = t.filter((X) => !n.includes(X)), { rulesets: m, individualRules: E } = Yo(u), x = m.length ? `${Y}${m.join(", ")}${$}` : "N/A", _ = E.length ? `${Y}${E.join(", ")}${$}` : "N/A";
  let N = `      Applying ${m.length} rulesets: ${x}`;
  E.length > 0 && (N += `
      Applying ${E.length} individual rules: ${_}`);
  const M = n.filter((X) => !m.includes(X)), se = M.length ? `${Y}${M.join(", ")}${$}` : "N/A";
  ae.push({ info: `${Y}Analyzing Vue, TS and JS files in ${e}${$}` }), ae.push({
    info: `${N}
      Ignoring ${M.length} rules/rulesets: ${se}
      Excluding ${s || "-"}
      Output level ${Y}${r}${$}
      Grouping by ${Y}${o}${$}
      Ordering ${Y}${l}${$}`
  }), an = t.filter((X) => !n.includes(X)), s && xt.push(...s.split(",")), await ln(e), ae.push({ info: `Found ${Y}${yt}${$} files` });
  const { health: ee, output: h } = Ko(o, l, r), { errors: H, warnings: fe, output: k } = Qo(ee, cn, yt);
  return !H && !fe && ae.push({ info: `
${Yt}No code smells detected!${$}` }), { output: ae, codeHealthOutput: k, reportOutput: h };
}, er = ["rule", "file"], tr = ["asc", "desc"], nr = ["all", "error"], sr = ["text", "json"], or = {
  groupBy: er,
  orderBy: tr,
  outputLevel: nr,
  outputFormat: sr
}, xe = (e, t) => {
  const n = or[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}, rr = async () => {
  let e = process.cwd();
  for (; e !== ie.parse(e).root; ) {
    const t = ie.join(e, "package.json");
    return await le.access(t), e;
  }
  e = ie.dirname(e);
}, Dt = (e) => (t) => {
  if (!t)
    return e === "apply" ? Object.keys(re) : void 0;
  const n = t.split(","), s = [], o = [];
  return n.forEach((r) => {
    wt.includes(r) ? s.push(...re[r]) : Object.values(re).some((l) => l.includes(r)) ? s.push(r) : o.push(r);
  }), o.length > 0 && (console.error(
    `
${B}Invalid ${e} values: ${o.join(
      ", "
    )}${$}. 
${A}Allowed values are: ${rn.join(", ")}${d}

`
  ), process.exit(1)), s;
}, un = await rr();
un || (console.error(`
${B}Cannot find project root.${$}

`), process.exit(1));
const Et = [];
let Q = {
  path: "./src",
  apply: Object.values(wt).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const e = ie.join(un, "vue-mess-detector.json"), t = JSON.parse(await le.readFile(e, "utf-8"));
  Q = { ...Q, ...t }, Et.push({ info: `👉 Using configuration from ${e}` });
} catch {
  Et.push({ info: "👉 Using default configuration" });
}
wn(In(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(Q).positional("path", {
    describe: "path to the Vue files",
    default: Q.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: rn,
    coerce: Dt("apply"),
    group: "Filter Rulesets/Rules:",
    default: Q.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: Q.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => xe(t, "groupBy"),
    default: Q.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => xe(t, "outputLevel"),
    default: Q.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: Dt("ignore"),
    default: Q.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => xe(t, "orderBy"),
    default: Q.order,
    group: "Order Results:"
  }).option("output", {
    describe: "Output format",
    choices: ["text", "json"],
    coerce: (t) => xe(t, "outputFormat"),
    default: Q.output,
    group: "Output Format:"
  }),
  (e) => {
    Jo({
      dir: e.path,
      apply: e.apply,
      ignore: e.ignore,
      exclude: e.exclude,
      groupBy: e.group,
      level: e.level,
      orderBy: e.order
    }).then((t) => {
      e.output == "text" && ([...Et, ...t.output].forEach((n) => {
        console.log(n.info);
      }), t.reportOutput?.forEach((n) => {
        console.log(n.info);
      }), t.codeHealthOutput?.forEach((n) => {
        console.log(n.info);
      })), e.output == "json" && console.log(JSON.stringify(t, null, 2));
    }).catch((t) => {
      console.error(`${B}${t}${$}`);
    });
  }
).help().argv;
