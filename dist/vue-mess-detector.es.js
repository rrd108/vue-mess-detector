import le from "node:fs/promises";
import ie from "node:path";
import xn from "yargs";
import { format as Vt, inspect as An } from "util";
import { normalize as On, resolve as ue, dirname as We, basename as Cn, extname as Sn, relative as _n } from "path";
import { readFileSync as wt, statSync as Ht, readdirSync as Nn, writeFile as Rn } from "fs";
import { notStrictEqual as jn, strictEqual as Ln } from "assert";
import { fileURLToPath as Fn } from "url";
import { parse as Pn } from "@vue/compiler-sfc";
class de extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
function Gt() {
  return Tn() ? 0 : 1;
}
function Tn() {
  return In() && !process.defaultApp;
}
function In() {
  return !!process.versions.electron;
}
function Wn(e) {
  return e.slice(Gt() + 1);
}
function Mn() {
  return process.argv[Gt()];
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
function Kt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), l = e.charAt(o);
    r !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
  }
  return s;
}
function Zt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function kn(e) {
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
    }, n), o = kn(t), r = typeof t == "string", l = Dn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), u = Object.assign({
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
    }, s.configuration), d = Object.assign(/* @__PURE__ */ Object.create(null), s.default), E = s.configObjects || [], x = s.envPrefix, _ = u["populate--"], N = _ ? "--" : "_", M = /* @__PURE__ */ Object.create(null), se = /* @__PURE__ */ Object.create(null), ee = s.__ || ne.format, h = {
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
    }, V = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, fe = new RegExp("^--" + u["negation-prefix"] + "(.+)");
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
    })), gn(s.key, l, s.default, h.arrays), Object.keys(d).forEach(function(i) {
      (h.aliases[i] || []).forEach(function(a) {
        d[a] = d[i];
      });
    });
    let B = null;
    wn();
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
        g = a.match(/^--?(.+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(V)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ce(c))));
      else if (a.match(/^-.\..+=/))
        g = a.match(/^-([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && j(g[1], g[2]);
      else if (a.match(/^-.\..+/) && !a.match(V))
        y = o[i + 1], g = a.match(/^-(.\..+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], y !== void 0 && !y.match(/^-/) && !w(c, h.bools) && !w(c, h.counts) ? (j(c, y), i++) : j(c, ce(c)));
      else if (a.match(/^-[^-]+/) && !a.match(V)) {
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
        c = a.slice(-1)[0], !f && c !== "-" && (w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(V)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ce(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(V) && w(a.slice(1), h.bools))
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
    St(F, !0), St(F, !1), hn(F), pn(), _t(F, h.aliases, d, !0), mn(F), u["set-placeholder-key"] && dn(F), Object.keys(h.counts).forEach(function(i) {
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
        return te(f) || (B = Error(ee("Argument unexpected for: %s", a))), j(a, ce(a)), i;
      let g = te(f) ? 0 : 1;
      if (u["nargs-eats-options"])
        p.length - (i + 1) + g < b && (B = Error(ee("Not enough arguments following: %s", a))), g = b;
      else {
        for (c = i + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(V) || we(p[c])); c++)
          g++;
        g < b && (B = Error(ee("Not enough arguments following: %s", a)));
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
      else if (te(b) || te(f) && /^-/.test(b) && !V.test(b) && !we(b)) {
        if (d[a] !== void 0) {
          const y = d[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        te(f) || c.push(je(a, f, !0));
        for (let y = i + 1; y < p.length && !(!u["greedy-arrays"] && c.length > 0 || g && typeof g == "number" && c.length >= g || (b = p[y], /^-/.test(b) && !V.test(b) && !we(b))); y++)
          i = y, c.push(je(a, b, r));
      }
      return typeof g == "number" && (g && c.length < g || isNaN(g) && c.length === 0) && (B = Error(ee("Not enough arguments following: %s", a))), j(a, c), i;
    }
    function j(i, a, p = r) {
      if (/-/.test(i) && u["camel-case-expansion"]) {
        const b = i.split(".").map(function(g) {
          return me(g);
        }).join(".");
        Ct(i, b);
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
    function Ct(i, a) {
      h.aliases[i] && h.aliases[i].length || (h.aliases[i] = [a], M[a] = !0), h.aliases[a] && h.aliases[a].length || Ct(a, i);
    }
    function je(i, a, p) {
      p && (a = zn(a)), (w(i, h.bools) || w(i, h.counts)) && typeof a == "string" && (a = a === "true");
      let f = Array.isArray(a) ? a.map(function(c) {
        return ve(i, c);
      }) : ve(i, a);
      return w(i, h.counts) && (te(f) || typeof f == "boolean") && (f = Fe()), w(i, h.normalize) && w(i, h.arrays) && (Array.isArray(a) ? f = a.map((c) => ne.normalize(c)) : f = ne.normalize(a)), f;
    }
    function ve(i, a) {
      return !u["parse-positional-numbers"] && i === "_" || !w(i, h.strings) && !w(i, h.bools) && !Array.isArray(a) && (Zt(a) && u["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !te(a) && w(i, h.numbers)) && (a = Number(a)), a;
    }
    function hn(i) {
      const a = /* @__PURE__ */ Object.create(null);
      _t(a, h.aliases, d), Object.keys(h.configs).forEach(function(p) {
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
                B = c;
                return;
              }
            } else
              c = ne.require(b);
            Le(c);
          } catch (c) {
            c.name === "PermissionDenied" ? B = c : i[p] && (B = Error(ee("Invalid JSON config file: %s", f)));
          }
      });
    }
    function Le(i, a) {
      Object.keys(i).forEach(function(p) {
        const f = i[p], c = a ? a + "." + p : p;
        typeof f == "object" && f !== null && !Array.isArray(f) && u["dot-notation"] ? Le(f, c) : (!he(F, c.split(".")) || w(c, h.arrays) && u["combine-arrays"]) && j(c, f);
      });
    }
    function pn() {
      typeof E < "u" && E.forEach(function(i) {
        Le(i);
      });
    }
    function St(i, a) {
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
    function mn(i) {
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
            B = c;
          }
      });
    }
    function dn(i) {
      return h.keys.forEach((a) => {
        ~a.indexOf(".") || typeof i[a] > "u" && (i[a] = void 0);
      }), i;
    }
    function _t(i, a, p, f = !1) {
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
        T = Rt(T), typeof f == "object" && f[T] === void 0 && (f[T] = {}), typeof f[T] != "object" || Array.isArray(f[T]) ? (Array.isArray(f[T]) ? f[T].push({}) : f[T] = [f[T], {}], f = f[T][f[T].length - 1]) : f = f[T];
      });
      const c = Rt(a[a.length - 1]), b = w(a.join("."), h.arrays), g = Array.isArray(p);
      let y = u["duplicate-arguments-array"];
      !y && w(c, h.nargs) && (y = !0, (!te(f[c]) && h.nargs[c] === 1 || Array.isArray(f[c]) && f[c].length === h.nargs[c]) && (f[c] = void 0)), p === Fe() ? f[c] = Fe(f[c]) : Array.isArray(f[c]) ? y && b && g ? f[c] = u["flatten-duplicate-arrays"] ? f[c].concat(p) : (Array.isArray(f[c][0]) ? f[c] : [f[c]]).concat([p]) : !y && !!b == !!g ? f[c] = p : f[c] = f[c].concat([p]) : f[c] === void 0 && b ? f[c] = g ? p : [p] : y && !(f[c] === void 0 || w(c, h.counts) || w(c, h.bools)) ? f[c] = [f[c], p] : f[c] = p;
    }
    function gn(...i) {
      i.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          h.aliases[p] || (h.aliases[p] = [].concat(l[p] || []), h.aliases[p].concat(p).forEach(function(f) {
            if (/-/.test(f) && u["camel-case-expansion"]) {
              const c = me(f);
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), M[c] = !0);
            }
          }), h.aliases[p].concat(p).forEach(function(f) {
            if (f.length > 1 && /[A-Z]/.test(f) && u["camel-case-expansion"]) {
              const c = Kt(f, "-");
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
    function Nt(i) {
      const a = Object.keys(h);
      return [].concat(a.map((f) => h[f])).some(function(f) {
        return Array.isArray(f) ? f.includes(i) : f[i];
      });
    }
    function $n(i, ...a) {
      return [].concat(...a).some(function(f) {
        const c = i.match(f);
        return c && Nt(c[1]);
      });
    }
    function bn(i) {
      if (i.match(V) || !i.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const f = i.slice(1).split("");
      for (let c = 0; c < f.length; c++) {
        if (p = i.slice(c + 2), !Nt(f[c])) {
          a = !1;
          break;
        }
        if (f[c + 1] && f[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(f[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || f[c + 1] && f[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function we(i) {
      return u["unknown-options-as-args"] && yn(i);
    }
    function yn(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(V) || bn(i) ? !1 : !$n(i, /^-+([^=]+?)=[\s\S]*$/, fe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ce(i) {
      return !w(i, h.bools) && !w(i, h.counts) && `${i}` in d ? d[i] : En(vn(i));
    }
    function En(i) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[i];
    }
    function vn(i) {
      let a = q.BOOLEAN;
      return w(i, h.strings) ? a = q.STRING : w(i, h.numbers) ? a = q.NUMBER : w(i, h.bools) ? a = q.BOOLEAN : w(i, h.arrays) && (a = q.ARRAY), a;
    }
    function te(i) {
      return i === void 0;
    }
    function wn() {
      Object.keys(h.counts).find((i) => w(i, h.arrays) ? (B = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : w(i, h.nargs) ? (B = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(Ot, F),
      configuration: u,
      defaulted: Object.assign({}, se),
      error: B,
      newAliases: Object.assign({}, M)
    };
  }
}
function Dn(e) {
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
    o = o.filter(function(l, u, d) {
      return d.indexOf(l) === u;
    });
    const r = o.pop();
    r !== void 0 && typeof r == "string" && (n[r] = o);
  }), n;
}
function Fe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Rt(e) {
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
const jt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Lt = (Te = (Pe = process == null ? void 0 : process.versions) === null || Pe === void 0 ? void 0 : Pe.node) !== null && Te !== void 0 ? Te : (Ie = process == null ? void 0 : process.version) === null || Ie === void 0 ? void 0 : Ie.slice(1);
if (Lt && Number(Lt.match(/^([^.]+)/)[1]) < jt)
  throw Error(`yargs parser supports a minimum Node.js version of ${jt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Un = process ? process.env : {}, qt = new Bn({
  cwd: process.cwd,
  env: () => Un,
  format: Vt,
  normalize: On,
  resolve: ue,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(wt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), be = function(t, n) {
  return qt.parse(t.slice(), n).argv;
};
be.detailed = function(e, t) {
  return qt.parse(e.slice(), t);
};
be.camelCase = me;
be.decamelize = Kt;
be.looksLikeNumber = Zt;
const Vn = {
  right: Qn,
  center: Yn
}, Hn = 0, Ae = 1, Gn = 2, Oe = 3;
class Kn {
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
      o.length > 1 && D.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), D.stringWidth(o[0])));
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
    const n = D.stripAnsi(t);
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
        const { width: d } = t[u], E = this.negatePadding(t[u]);
        let x = l;
        if (E > D.stringWidth(l) && (x += " ".repeat(E - D.stringWidth(l))), t[u].align && t[u].align !== "left" && this.wrap) {
          const N = Vn[t[u].align];
          x = N(x, E), D.stringWidth(x) < E && (x += " ".repeat((d || 0) - D.stringWidth(x) - 1));
        }
        const _ = t[u].padding || [0, 0, 0, 0];
        _[Oe] && (r += " ".repeat(_[Oe])), r += Ft(t[u], x, "| "), r += x, r += Ft(t[u], x, " |"), _[Ae] && (r += " ".repeat(_[Ae])), o === 0 && n.length > 0 && (r = this.renderInline(r, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, r = n.text, l = D.stringWidth(r.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, r.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, r + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((r, l) => {
      r.width = s[l], this.wrap ? o = D.wrap(r.text, this.negatePadding(r), { hard: !0 }).split(`
`) : o = r.text.split(`
`), r.border && (o.unshift("." + "-".repeat(this.negatePadding(r) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(r) + 2) + "'")), r.padding && (o.unshift(...new Array(r.padding[Hn] || 0).fill("")), o.push(...new Array(r.padding[Gn] || 0).fill(""))), o.forEach((u, d) => {
        n[d] || n.push([]);
        const E = n[d];
        for (let x = 0; x < l; x++)
          E[x] === void 0 && E.push("");
        E.push(u);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Oe] || 0) + (t.padding[Ae] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || D.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), r = n ? Math.floor(s / n) : 0;
    return o.map((l, u) => l === void 0 ? Math.max(r, Zn(t[u])) : l);
  }
}
function Ft(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Zn(e) {
  const t = e.padding || [], n = 1 + (t[Oe] || 0) + (t[Ae] || 0);
  return e.border ? n + 4 : n;
}
function qn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Qn(e, t) {
  e = e.trim();
  const n = D.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Yn(e, t) {
  e = e.trim();
  const n = D.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let D;
function Xn(e, t) {
  return D = t, new Kn({
    width: e?.width || qn(),
    wrap: e?.wrap
  });
}
const Qt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Yt(e) {
  return e.replace(Qt, "");
}
function Jn(e, t) {
  const [n, s] = e.match(Qt) || ["", ""];
  e = Yt(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function es(e) {
  return Xn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Yt,
    wrap: Jn
  });
}
function ts(e, t) {
  let n = ue(".", e), s;
  for (Ht(n).isDirectory() || (n = We(n)); ; ) {
    if (s = t(n, Nn(n)), s) return ue(n, s);
    if (n = We(s = n), s === n) break;
  }
}
const ns = {
  fs: {
    readFileSync: wt,
    writeFile: Rn
  },
  format: Vt,
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
class ss {
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
    Z.fs.writeFile(l, u, "utf-8", function(d) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), r(d);
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
function os(e, t) {
  Z = t;
  const n = new ss(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const rs = (e) => os(e, ns), is = "require is not supported by ESM", Pt = "loading a directory of commands is not supported yet for ESM";
let ge;
try {
  ge = Fn(import.meta.url);
} catch {
  ge = process.cwd();
}
const cs = ge.substring(0, ge.lastIndexOf("node_modules"));
jn, Ln, An, cs || process.cwd(), Cn, We, Sn, _n, ue, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, wt, rs({
  directory: ue(ge, "../../../locales"),
  updateFiles: !1
});
const Y = "\x1B[44m", A = "\x1B[43m", k = "\x1B[41m", Xt = "\x1B[42m", $ = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", m = "\x1B[0m", as = [
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
], Me = [], ls = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const r = o[1];
      as.includes(r) && Me.push({ filePath: t, message: `${A}(${r})${$}` });
    }
  });
}, us = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, fs = /^(\(.*\)|\\?.)$/;
function oe(e) {
  const t = e.toString();
  return fs.test(t) ? t : `(?:${t})`;
}
const hs = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, ps = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(e) {
  const t = (n) => v(`(?<${n}>${`${e}`.replace(hs, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => v(`${e}${H(...n)}`), {
      referenceTo: (n) => v(`${e}\\k<${n}>`)
    }),
    or: (...n) => v(`(?:${e}|${H(...n)})`),
    after: (...n) => v(`(?<=${H(...n)})${e}`),
    before: (...n) => v(`${e}(?=${H(...n)})`),
    notAfter: (...n) => v(`(?<!${H(...n)})${e}`),
    notBefore: (...n) => v(`${e}(?!${H(...n)})`),
    times: Object.assign((n) => v(`${oe(e)}{${n}}`), {
      any: () => v(`${oe(e)}*`),
      atLeast: (n) => v(`${oe(e)}{${n},}`),
      atMost: (n) => v(`${oe(e)}{0,${n}}`),
      between: (n, s) => v(`${oe(e)}{${n},${s}}`)
    }),
    optionally: () => v(`${oe(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => v(`${e}`.replace(ps, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${e}`),
      lineEnd: () => v(`${e}$`)
    }
  };
}
const ms = /[.*+?^${}()|[\]\\/]/g;
function $e(e) {
  return v(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function U(e) {
  return v(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ds(...e) {
  return v(`(?:${e.map((t) => H(t)).join("|")})`);
}
const Ce = v(".");
v("\\b\\w+\\b");
const K = v("\\w"), z = v("\\b"), gs = v("\\d"), L = v("\\s"), Jt = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), en = v("\\t"), tn = v("\\n");
v("\\r");
v("\\W+"), v("\\W"), v("\\B"), v("\\D"), v("\\S"), Object.assign(v("[^a-zA-Z]"), {
  lowercase: v("[^a-z]"),
  uppercase: v("[^A-Z]")
}), v("[^\\t]"), v("[^\\n]"), v("[^\\r]");
function J(...e) {
  return v(`${oe(H(...e))}?`);
}
function H(...e) {
  return v(
    e.map((t) => typeof t == "string" ? t.replace(ms, "\\$&") : t).join("")
  );
}
function S(...e) {
  return v(`${oe(H(...e))}+`);
}
const G = "i", P = "g", R = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(H(...e).toString(), [...t || ""].join(""));
}, I = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u, d) => d >= n && u.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((l, u) => l + u.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, _e = [], $s = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = R(H("$parent").or("getCurrentInstance"), [P]), r = e.content.match(n), l = e.content.match(s);
  if (l) {
    const d = l[1].split(".")[0];
    if ((r ? r[1] : "").includes(d)) {
      const x = I(e.content.trim(), d);
      _e.push({
        filePath: t,
        message: `line #${x} ${A}(${d})${$}`
      });
    }
  }
  const u = e.content.match(o);
  if (u) {
    const d = I(e.content.trim(), u[0]);
    _e.push({
      filePath: t,
      message: `line #${d} ${A}(${u[0]})${$}`
    });
  }
}, bs = () => {
  const e = [];
  return _e.length > 0 && _e.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], ys = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ke.push({
      filePath: t,
      message: `${A}global style${$} used`
    });
  });
}, Es = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${m}`,
      description: `👉 ${O}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], vs = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps([", [P, G]);
  e.content.match(n)?.length && Be.push({ filePath: t, message: `${A}Props type${$} not defined` });
}, ws = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${m}`,
      description: `👉 ${O}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], xs = (e) => {
  if (e.includes("pages"))
    return;
  const t = ie.basename(e);
  if (t === "App.vue")
    return;
  const n = R(Jt.uppercase);
  t.slice(1).match(n)?.length || De.push({ filePath: e, message: `Component name is ${A}single word${$}` });
}, As = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${m}`,
      description: `👉 ${O}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], Os = (e, t) => {
  if (!e)
    return;
  const n = R("<", S(U(">")), " v-for", S(U(">")), ">", [
    P,
    G
  ]), s = e.content.match(n);
  s?.length && (s.some((r) => r.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${A}without a key${$}` }));
}, Cs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], Ss = (e, t) => {
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
    Ue.push({ filePath: t, message: `line #${u} ${A}v-if used with v-for${$}` });
  }
}, _s = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${O}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Tt = [
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
], Ns = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const l = r[1], u = r[2];
    if (u) {
      const E = Array.from(u.matchAll(o), (_) => _[1]).filter((_) => Tt.includes(_));
      let x = -1;
      for (const _ of E) {
        const N = Tt.indexOf(_);
        if (N !== -1 && N < x) {
          Ve.push({
            filePath: t,
            message: `tag has attributes out of order ${A}(${l})${$}`
          });
          break;
        }
        x = N;
      }
    }
  }
}, Rs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], js = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), r = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((d) => d.index !== -1);
  l.every((d, E) => E === 0 ? !0 : l[E - 1].index < d.index) || He.push({ filePath: t, message: `Top level elements are ${A}not following the correct order.${$}` });
}, Ls = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${m}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Fs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = ie.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, r = t.match(o);
  !s?.length && !r?.length && Ge.push({ filePath: e, message: `component name is ${A}not PascalCase, nor kebab-case.${$}` });
}, Ps = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ts = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const r = I(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    Ke.push({ filePath: t, message: `line #${r} ${A}(${l})${$}` });
  });
}, Is = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${m}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], It = [], Ws = ["v-slot", "v-bind", "v-on"], Ms = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ws.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Ze.push({ filePath: t, message: `line #${o} ${A}${s}${$}` }), It.some((r) => r.filePath === t) || It.push({ filePath: t });
    }
  });
}, ks = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Bs = 3, Ds = (e) => {
  const t = R(
    S(U("/")).grouped(),
    H(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = R(
      $e("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), r = s.match(o);
    (!r || r.length < Bs) && qe.push({ filePath: e, message: `${s} is not a ${A}full word.${$}` });
  }
}, zs = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${m}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Us = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], r = s[2];
    r.split(/\s+/).filter((u) => u.trim() !== "").length > 1 && r.split(`
`).length === 1 && Qe.push({ filePath: t, message: `Element ${A}<${o}>${$} should have its attributes on separate lines` });
  }
}, Vs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Hs = /^[a-z]+([A-Z][a-z]*)*$/, Gs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((r) => r.split(":")[0]).filter((r) => r.length).filter((r) => !Hs.test(r)).length && Ye.push({ filePath: t, message: `prop names are ${A}not camelCased${$}` });
}, Ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${O}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Zs = (e, t) => {
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
      const d = I(e.source, l);
      Xe.push({ filePath: t, message: `line #${d} ${A}${u}${$}` });
    }
  });
}, qs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${O}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Qs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(Jt.uppercase, K),
    J(tn, en),
    J(S(U(">"))),
    "></",
    S(K),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((r) => {
    const l = I(e.source, r), u = r.split(`
`).at(-1)?.trim() || "";
    Je.push({ filePath: t, message: `line #${l} ${A}${u}${$}` });
  });
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${O}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nn = [], Se = [], Xs = 5, Js = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > Xs) {
      const r = o.split(`
`)[0], l = I(e.content, r);
      nn.push({ filePath: t, message: `line #${l} ${A}computed${$}` }), Se.push({ filePath: t }), Se.some((u) => u.filePath === t) || Se.push({ filePath: t });
    }
  });
}, eo = () => {
  const e = [];
  return Se.length > 0 && nn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], to = 40, no = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > to) {
      const r = I(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      et.push({
        filePath: t,
        message: `line #${r} ${A}${l}${$}`
      });
    }
  });
}, so = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${O}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], sn = 5, oo = 2 * sn, ro = (e, t) => {
  if (!e)
    return;
  const n = R(z, "if", z, [P, G]), s = R(z, "else", z, [P, G]), o = R(z, "for", z, [P, G]), r = R(z, "while", z, [P, G]), l = R(z, "case", z, [P, G]), u = e.content.match(n), d = e.content.match(s), E = e.content.match(o), x = e.content.match(r), _ = e.content.match(l), N = (u?.length || 0) + (d?.length || 0) + (E?.length || 0) + (x?.length || 0) + (_?.length || 0);
  N > sn && tt.push({ filePath: t, message: `${N > oo ? k : A}(${N})${$}` });
}, io = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${O}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Wt = 5, co = 3, ao = (e, t) => {
  if (!e)
    return;
  const n = R(en.times.atLeast(Wt).or(L.times.atLeast(co * Wt)), [
    P,
    G
  ]);
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    nt.push({
      filePath: t,
      message: `line #${r} ${A}indentation: ${o.length}${$}`
    });
  });
}, lo = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${m}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], uo = (e, t) => {
  if (!e)
    return;
  const n = R(z, "else", z, [P, G]), s = e.content.match(n);
  s?.length && st.push({ filePath: t, message: `else clauses found ${k}(${s.length})${$}` });
}, fo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${m}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ne = [], ot = 20, ho = 5, po = 8;
function mo({ funcName: e, funcBody: t, lineNumber: n, filePath: s }) {
  const o = t.split(`
`).length, r = bo(e);
  if (o > 2 * ot) {
    Ne.push({ filePath: s, message: `function ${k}(${r}#${n})${$} is too long: ${k}${o} lines${$}` });
    return;
  }
  o >= ot && Ne.push({ filePath: s, message: `function ${A}(${r}#${n})${$} is too long: ${A}${o} lines${$}` });
}
function go(e, t) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = t;
  const s = n.exec(e);
  if (s) {
    const o = s[1], r = n.lastIndex;
    let l = 1, u = r;
    for (; l > 0 && u < e.length; )
      e[u] === "{" ? l++ : e[u] === "}" && l--, u++;
    const d = e.slice(r, u - 1).trim();
    return {
      name: o,
      body: d,
      end: u
      // Returns the position after the matched function
    };
  } else
    return null;
}
function $o(e, t) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = e.slice(t), o = n.exec(s);
  if (o) {
    const [, r] = o, l = t + o.index + o[0].length;
    let u = l, d = "";
    if (e[l] === "{") {
      let E = 1;
      for (u = l + 1; u < e.length && E > 0; )
        e[u] === "{" ? E++ : e[u] === "}" && E--, u++;
      d = e.slice(l + 1, u - 1).trim();
    } else {
      for (; u < e.length && e[u] !== ";"; )
        u++;
      d = e.slice(l, u).trim();
    }
    return {
      name: r,
      body: d,
      end: u
      // Position after the end of the function body
    };
  } else
    return null;
}
function bo(e) {
  return e.replace(/^const\s*/, "");
}
const yo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let r = "", l = "", u = !1;
    if (n.slice(o, o + po) === "function") {
      const d = go(n, o);
      d && (u = !0, r = d.name, l = d.body, o = d.end);
    }
    if (n.slice(o, o + ho) === "const") {
      const d = $o(n, o);
      d && (u = !0, r = d.name, l = d.body, o = d.end);
    }
    if (u) {
      const d = I(n.trim(), r);
      mo({ funcName: r, funcBody: l, lineNumber: d, filePath: t });
    } else
      o++;
  }
}, Eo = () => {
  const e = [];
  return Ne.length > 0 && Ne.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${m}`,
      description: `👉 ${O}Functions must be shorter than ${ot} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], vo = (e, t) => {
  if (!e)
    return;
  const n = R("<a", z, [P, G]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `${s?.length} ${A}html link found${$}` });
}, wo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${m}`,
      description: `👉 ${O}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], xo = (e, t) => {
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
        message: `line #${r} if statement without curly braces: ${k}${l}${$}`
      });
    }
  });
}, Ao = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${m}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Oo = (e, t) => {
  if (!e)
    return;
  const n = R(S(gs).as("magicNumber"), ds(")", tn), [P]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s.groups?.magicNumber, l = Number.parseInt(r ?? "0");
    if (l > 1) {
      const u = I(e.content, String(l), o);
      ct.push({
        filePath: t,
        message: `line #${u} ${A}magic number: ${l}${$}`
      }), o = u;
    }
  }
}, Co = () => {
  const e = [];
  return ct.length && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${m}`,
      description: `👉 ${O}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], So = (e, t) => {
  if (!e)
    return;
  const n = R(S(Ce), L, "?", L, S(Ce), L, ":", L, S(Ce));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const r = I(e.content, o);
      at.push({
        filePath: t,
        message: `line #${r} has ${A}nested ternary${$}`
      });
    }
  });
}, _o = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${m}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], No = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    lt.push({
      filePath: t,
      message: `line #${r} ${A}props destructuring found: ${o}${$}`
    });
  });
}, Ro = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${O}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], on = 3, Mt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > on && ut.push({ filePath: n, message: `function ${A}${e}${$} has ${A}${s.length}${$} parameters` });
}, jo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] && Mt(s[1], s[2], t), s[3] && Mt(s[3], s[4], t);
}, Lo = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${m}`,
      description: `👉 ${O}Max number of function parameters should be ${on}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], Fo = (e, t) => {
  !e || e.setup || ft.push({ filePath: t, message: `${A}Plain <script> block${$} found` });
}, Po = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], To = (e, t) => {
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
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((d) => r.add(d));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const u = l[1], d = l[2], E = l[3];
    r.has(E) && d === E && ht.push({
      filePath: t,
      message: `Prop ${A}(${E})${$} is being drilled through ${A}${u}${$} component unmodified.`
    });
  }
}, Io = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${m}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], mt = 100, Wo = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > mt && pt.push({ filePath: t, message: `${n.length > mt * 2 ? k : A}(${n.length} lines)${$}` });
}, Mo = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${mt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], rn = 4, ko = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < rn && dt.push({ filePath: t, message: `${k}(${o})${$}` });
  }
}, Bo = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${m}`,
      description: `👉 ${O}Variable names must have a minimum length of ${rn}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], Do = 5, zo = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps", J("<"), J("("), "{", S(Ce), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Do && gt.push({ filePath: t, message: `props found ${k}(${o})${$}` });
  }
}, Uo = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${m}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, $t = [], Vo = (e, t) => {
  if (!e)
    return;
  const n = R('v-for="(', L.times.any(), S(K).grouped(), L.times.any(), ",", L.times.any(), S(K).grouped(), L.times.any(), ")", S(L), "in", S(L), S(K).grouped(), [P]), s = R(':key="', L.times.any(), S(K).grouped(), L.times.any(), '"', [P]), o = [...e.content.matchAll(n)], r = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [u, d, E, x] = l;
    r.forEach((_) => {
      const N = _[1];
      if (N === E) {
        const M = I(e.content.trim(), N);
        $t.push({
          filePath: t,
          message: `line #${M} ${A}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Ho = () => {
  const e = [];
  return $t.length > 0 && $t.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], Go = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], r = s[1], l = I(e.content.trim(), o);
    bt.push({
      filePath: t,
      message: `line #${l} zero length comparison found ${A}(${r})${$}`
    });
  }
}, Ko = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${O}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, yt = [], Zo = (e, t) => {
  if (!e)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    yt.push({
      filePath: t,
      message: `line #${r} ${A}Avoid using 'var' for variable declarations: ${o}${$}`
    });
  });
}, qo = () => {
  const e = [];
  return yt.length > 0 && yt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ No Var Declaration${m}`,
      description: `👉 ${O}Avoid var declaration, use const or let instead of that.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qo = (e, t, n) => {
  const s = {}, o = ({ file: E, rule: x, title: _, description: N, message: M }) => {
    const se = e === "rule" ? x : E;
    s[se] || (s[se] = []), s[se].push({ file: E, rule: x, title: _, description: N, message: M });
  }, r = (E) => {
    E().forEach((_) => {
      o(_);
    });
  };
  r(As), r(ws), r(Cs), r(_s), r(Es), r(Ps), r(Is), r(ks), r(zs), r(Vs), r(Ks), r(qs), r(Ys), r(eo), r(so), r(Ls), r(Rs), r(bs), r(us), r(io), r(lo), r(fo), r(Eo), r(wo), r(Ao), r(Co), r(_o), r(Ro), r(qo), r(Lo), r(Po), r(Io), r(Mo), r(Bo), r(Uo), r(Ho), r(Ko);
  const l = [], u = Object.keys(s).sort((E, x) => {
    const _ = s[E].length, N = s[x].length;
    return t === "desc" ? N - _ : _ - N;
  }), d = [];
  return u.forEach((E) => {
    d.push({ info: `
 - ${E}` }), s[E].forEach((x) => {
      const _ = x.message.includes(k);
      if (l.some((N) => N.file === x.file)) {
        const N = l.find((M) => M.file === x.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        l.push({ file: x.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" && d.push({ info: `   Rule: ${x.rule}` }), e !== "file" && d.push({ info: `   File: ${x.file}` }), d.push({ info: `   Description: ${x.description}` }), d.push({ info: `   Message: ${x.message || "🚨"}
` }));
    });
  }), { output: d, health: l };
}, re = {
  "vue-caution": [
    "elementSelectorsWithScoped",
    "implicitParentChildCommunication"
  ],
  "vue-essential": [
    "globalStyle",
    "simpleProp",
    "singleNameComponent",
    "vforNoKey",
    "vifWithVfor"
  ],
  "vue-recommended": [
    "elementAttributeOrder",
    "topLevelElementOrder"
  ],
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
    "noVarDeclaration",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ]
}, xt = Object.keys(re), Yo = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue"), r = {
    // vue-essential
    simpleProp: () => vs(s, t),
    singleNameComponent: () => o && xs(t),
    globalStyle: () => o && ys(e.styles, t),
    vforNoKey: () => o && Os(e.template, t),
    vifWithVfor: () => o && Ss(e.template, t),
    // vue-strong
    simpleComputed: () => Js(s, t),
    componentFiles: () => o && Ts(s, t),
    propNameCasing: () => o && Gs(s, t),
    componentFilenameCasing: () => o && Fs(t),
    selfClosingComponents: () => o && Qs(e, t),
    templateSimpleExpression: () => o && no(e.template, t),
    quotedAttributeValues: () => o && Zs(e, t),
    directiveShorthands: () => o && Ms(e, t),
    fullWordComponentName: () => o && Ds(t),
    multiAttributeElements: () => o && Us(e.template, t),
    // vue-recommended
    topLevelElementOrder: () => o && js(e.source, t),
    elementAttributeOrder: () => o && Ns(e.template, t),
    // vue-caution
    implicitParentChildCommunication: () => o && $s(s, t),
    elementSelectorsWithScoped: () => o && ls(e.styles, t),
    // rrd
    cyclomaticComplexity: () => ro(s, t),
    deepIndentation: () => ao(s, t),
    elseCondition: () => uo(s, t),
    functionSize: () => yo(s, t),
    ifWithoutCurlyBraces: () => xo(s, t),
    magicNumbers: () => Oo(s, t),
    nestedTernary: () => So(s, t),
    parameterCount: () => jo(s, t),
    propsDrilling: () => To(s, t),
    scriptLength: () => Wo(s, t),
    shortVariableName: () => ko(s, t),
    tooManyProps: () => zo(s, t),
    noPropDestructure: () => No(s, t),
    noVarDeclaration: () => Zo(s, t),
    zeroLengthComparison: () => Go(s, t),
    htmlLink: () => o && vo(e.template, t),
    plainScript: () => o && Fo(e.script, t),
    vForWithIndexKey: () => o && Vo(e.template, t)
  };
  n.forEach((l) => {
    l in re ? re[l].forEach((u) => {
      u in r && r[u]();
    }) : l in r && r[l]();
  });
}, Xo = 1.5, kt = 75, Bt = 85, Dt = 95, cn = [...xt, ...Object.values(re).flat()], Jo = (e, t, n) => {
  const { errors: s, warnings: o } = e.reduce((u, { errors: d, warnings: E }) => ({ errors: u.errors + d, warnings: u.warnings + E }), { errors: 0, warnings: 0 }), r = [];
  r.push({ info: `Found ${k}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${A}${Intl.NumberFormat("en-US").format(o)} warnings${$}, ${Y}${Intl.NumberFormat("en-US").format(t)} lines${$} of code in ${Y}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const l = Math.ceil((1 - (s * Xo + o) / t) * 100);
  return l < kt && r.push({ info: `${k}Code health is LOW: ${l}%${$}
` }), l >= kt && l < Bt && r.push({ info: `${A}Code health is MEDIUM ${l}%${$}
` }), l >= Bt && l < Dt && r.push({ info: `${Y}Code health is OK: ${l}%${$}
` }), l >= Dt && r.push({ info: `${Xt}Code health is GOOD: ${l}%${$}
` }), { errors: s, warnings: o, output: r };
};
function er(e) {
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
let Et = 0, an = 0, ln = [];
const tr = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], At = [], ae = [], zt = async (e, t) => {
  if (!At.some((n) => e.endsWith(n)) && (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js"))) {
    Et++;
    const n = await le.readFile(t, "utf-8");
    an += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Pn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), ae.push({ info: `Analyzing ${t}...` }), Yo(s, t, ln);
  }
}, un = async (e) => {
  if (!(await le.stat(e)).isDirectory()) {
    await zt(e, e);
    return;
  }
  const n = await le.readdir(e);
  for (const s of n) {
    const o = ie.join(e, s);
    (await le.stat(o)).isDirectory() && !tr.some((l) => o.includes(l)) && !At.some((l) => o.endsWith(l)) && await un(o), await zt(o, o);
  }
}, nr = async ({ dir: e, apply: t = [], ignore: n = [], exclude: s, groupBy: o, level: r, orderBy: l }) => {
  const u = t.filter((X) => !n.includes(X)), { rulesets: d, individualRules: E } = er(u), x = d.length ? `${Y}${d.join(", ")}${$}` : "N/A", _ = E.length ? `${Y}${E.join(", ")}${$}` : "N/A";
  let N = `      Applying ${d.length} rulesets: ${x}`;
  E.length > 0 && (N += `
      Applying ${E.length} individual rules: ${_}`);
  const M = n.filter((X) => !d.includes(X)), se = M.length ? `${Y}${M.join(", ")}${$}` : "N/A";
  ae.push({ info: `${Y}Analyzing Vue, TS and JS files in ${e}${$}` }), ae.push({
    info: `${N}
      Ignoring ${M.length} rules/rulesets: ${se}
      Excluding ${s || "-"}
      Output level ${Y}${r}${$}
      Grouping by ${Y}${o}${$}
      Ordering ${Y}${l}${$}`
  }), ln = t.filter((X) => !n.includes(X)), s && At.push(...s.split(",")), await un(e), ae.push({ info: `Found ${Y}${Et}${$} files` });
  const { health: ee, output: h } = Qo(o, l, r), { errors: V, warnings: fe, output: B } = Jo(ee, an, Et);
  return !V && !fe && ae.push({ info: `
${Xt}No code smells detected!${$}` }), { output: ae, codeHealthOutput: B, reportOutput: h };
}, sr = ["rule", "file"], or = ["asc", "desc"], rr = ["all", "error"], ir = ["text", "json"], cr = {
  groupBy: sr,
  orderBy: or,
  outputLevel: rr,
  outputFormat: ir
}, xe = (e, t) => {
  const n = cr[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}, ar = async () => {
  let e = process.cwd();
  for (; e !== ie.parse(e).root; ) {
    const t = ie.join(e, "package.json");
    return await le.access(t), e;
  }
  e = ie.dirname(e);
}, Ut = (e) => (t) => {
  if (!t)
    return e === "apply" ? Object.keys(re) : void 0;
  const n = t.split(","), s = [], o = [];
  return n.forEach((r) => {
    xt.includes(r) ? s.push(...re[r]) : Object.values(re).some((l) => l.includes(r)) ? s.push(r) : o.push(r);
  }), o.length > 0 && (console.error(
    `
${k}Invalid ${e} values: ${o.join(
      ", "
    )}${$}. 
${O}Allowed values are: ${cn.join(", ")}${m}

`
  ), process.exit(1)), s;
}, fn = await ar();
fn || (console.error(`
${k}Cannot find project root.${$}

`), process.exit(1));
const vt = [];
let Q = {
  path: "./src",
  apply: Object.values(xt).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const e = ie.join(fn, "vue-mess-detector.json"), t = JSON.parse(await le.readFile(e, "utf-8"));
  Q = { ...Q, ...t }, vt.push({ info: `👉 Using configuration from ${e}` });
} catch {
  vt.push({ info: "👉 Using default configuration" });
}
xn(Wn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(Q).positional("path", {
    describe: "path to the Vue files",
    default: Q.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: cn,
    coerce: Ut("apply"),
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
    coerce: Ut("ignore"),
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
    nr({
      dir: e.path,
      apply: e.apply,
      ignore: e.ignore,
      exclude: e.exclude,
      groupBy: e.group,
      level: e.level,
      orderBy: e.order
    }).then((t) => {
      e.output == "text" && ([...vt, ...t.output].forEach((n) => {
        console.log(n.info);
      }), t.reportOutput?.forEach((n) => {
        console.log(n.info);
      }), t.codeHealthOutput?.forEach((n) => {
        console.log(n.info);
      })), e.output == "json" && console.log(JSON.stringify(t, null, 2));
    }).catch((t) => {
      console.error(`${k}${t}${$}`);
    });
  }
).help().argv;
