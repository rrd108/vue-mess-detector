import ce from "node:fs/promises";
import re from "node:path";
import On from "yargs";
import { format as Kt, inspect as Sn } from "util";
import { normalize as Cn, resolve as ue, dirname as Be, basename as _n, extname as Nn, relative as Rn } from "path";
import { readFileSync as At, statSync as Zt, readdirSync as jn, writeFile as Ln } from "fs";
import { notStrictEqual as Fn, strictEqual as Pn } from "assert";
import { fileURLToPath as In } from "url";
import { parse as Tn } from "@vue/compiler-sfc";
class de extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
function qt() {
  return Wn() ? 0 : 1;
}
function Wn() {
  return Mn() && !process.defaultApp;
}
function Mn() {
  return !!process.versions.electron;
}
function Bn(e) {
  return e.slice(qt() + 1);
}
function kn() {
  return process.argv[qt()];
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
      let a = e.charAt(r);
      s && (s = !1, a = a.toUpperCase()), r !== 0 && (a === "-" || a === "_") ? s = !0 : a !== "-" && a !== "_" && (n += a);
    }
    return n;
  }
}
function Qt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), a = e.charAt(o);
    r !== a && o > 0 ? s += `${t}${n.charAt(o)}` : s += a;
  }
  return s;
}
function Xt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function zn(e) {
  if (Array.isArray(e))
    return e.map((a) => typeof a != "string" ? a + "" : a);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const r = [];
  for (let a = 0; a < e.length; a++) {
    if (n = s, s = e.charAt(a), s === " " && !o) {
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
class Dn {
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
    }, n), o = zn(t), r = typeof t == "string", a = Vn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), u = Object.assign({
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
    }, s.configuration), d = Object.assign(/* @__PURE__ */ Object.create(null), s.default), E = s.configObjects || [], x = s.envPrefix, _ = u["populate--"], N = _ ? "--" : "_", B = /* @__PURE__ */ Object.create(null), se = /* @__PURE__ */ Object.create(null), ee = s.__ || ne.format, h = {
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
    }, U = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, fe = new RegExp("^--" + u["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const l = typeof i == "object" ? i.key : i, p = Object.keys(i).map(function(f) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[f];
      }).filter(Boolean).pop();
      p && (h[p][l] = !0), h.arrays[l] = !0, h.keys.push(l);
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
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, l]) => {
      typeof l == "number" && (h.nargs[i] = l, h.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, l]) => {
      typeof l == "function" && (h.coercions[i] = l, h.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      h.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, l]) => {
      (typeof l == "boolean" || typeof l == "function") && (h.configs[i] = l);
    })), bn(s.key, a, s.default, h.arrays), Object.keys(d).forEach(function(i) {
      (h.aliases[i] || []).forEach(function(l) {
        d[l] = d[i];
      });
    });
    let k = null;
    An();
    let Y = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), _t = {};
    for (let i = 0; i < o.length; i++) {
      const l = o[i], p = l.replace(/^-{3,}/, "---");
      let f, c, b, g, y, T;
      if (l !== "--" && /^-/.test(l) && we(l))
        Le(l);
      else if (p.match(/^---+(=|$)/)) {
        Le(l);
        continue;
      } else if (l.match(/^--.+=/) || !u["short-option-groups"] && l.match(/^-.+=/))
        g = l.match(/^--?([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && (w(g[1], h.arrays) ? i = Ee(i, g[1], o, g[2]) : w(g[1], h.nargs) !== !1 ? i = ye(i, g[1], o, g[2]) : j(g[1], g[2], !0));
      else if (l.match(fe) && u["boolean-negation"])
        g = l.match(fe), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], j(c, w(c, h.arrays) ? [!1] : !1));
      else if (l.match(/^--.+/) || !u["short-option-groups"] && l.match(/^-[^-]+/))
        g = l.match(/^--?(.+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(U)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ae(c))));
      else if (l.match(/^-.\..+=/))
        g = l.match(/^-([^=]+)=([\s\S]*)$/), g !== null && Array.isArray(g) && g.length >= 3 && j(g[1], g[2]);
      else if (l.match(/^-.\..+/) && !l.match(U))
        y = o[i + 1], g = l.match(/^-(.\..+)/), g !== null && Array.isArray(g) && g.length >= 2 && (c = g[1], y !== void 0 && !y.match(/^-/) && !w(c, h.bools) && !w(c, h.counts) ? (j(c, y), i++) : j(c, ae(c)));
      else if (l.match(/^-[^-]+/) && !l.match(U)) {
        b = l.slice(1, -1).split(""), f = !1;
        for (let M = 0; M < b.length; M++) {
          if (y = l.slice(M + 2), b[M + 1] && b[M + 1] === "=") {
            T = l.slice(M + 3), c = b[M], w(c, h.arrays) ? i = Ee(i, c, o, T) : w(c, h.nargs) !== !1 ? i = ye(i, c, o, T) : j(c, T), f = !0;
            break;
          }
          if (y === "-") {
            j(b[M], y);
            continue;
          }
          if (/[A-Za-z]/.test(b[M]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && w(y, h.bools) === !1) {
            j(b[M], y), f = !0;
            break;
          }
          if (b[M + 1] && b[M + 1].match(/\W/)) {
            j(b[M], y), f = !0;
            break;
          } else
            j(b[M], ae(b[M]));
        }
        c = l.slice(-1)[0], !f && c !== "-" && (w(c, h.arrays) ? i = Ee(i, c, o) : w(c, h.nargs) !== !1 ? i = ye(i, c, o) : (y = o[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(U)) && !w(c, h.bools) && !w(c, h.counts) || /^(true|false)$/.test(y) ? (j(c, y), i++) : j(c, ae(c))));
      } else if (l.match(/^-[0-9]$/) && l.match(U) && w(l.slice(1), h.bools))
        c = l.slice(1), j(c, ae(c));
      else if (l === "--") {
        Y = o.slice(i + 1);
        break;
      } else if (u["halt-at-non-option"]) {
        Y = o.slice(i);
        break;
      } else
        Le(l);
    }
    Rt(F, !0), Rt(F, !1), mn(F), dn(), jt(F, h.aliases, d, !0), gn(F), u["set-placeholder-key"] && $n(F), Object.keys(h.counts).forEach(function(i) {
      he(F, i.split(".")) || j(i, 0);
    }), _ && Y.length && (F[N] = []), Y.forEach(function(i) {
      F[N].push(i);
    }), u["camel-case-expansion"] && u["strip-dashed"] && Object.keys(F).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete F[i];
    }), u["strip-aliased"] && [].concat(...Object.keys(a).map((i) => a[i])).forEach((i) => {
      u["camel-case-expansion"] && i.includes("-") && delete F[i.split(".").map((l) => me(l)).join(".")], delete F[i];
    });
    function Le(i) {
      const l = ve("_", i);
      (typeof l == "string" || typeof l == "number") && F._.push(l);
    }
    function ye(i, l, p, f) {
      let c, b = w(l, h.nargs);
      if (b = typeof b != "number" || isNaN(b) ? 1 : b, b === 0)
        return te(f) || (k = Error(ee("Argument unexpected for: %s", l))), j(l, ae(l)), i;
      let g = te(f) ? 0 : 1;
      if (u["nargs-eats-options"])
        p.length - (i + 1) + g < b && (k = Error(ee("Not enough arguments following: %s", l))), g = b;
      else {
        for (c = i + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(U) || we(p[c])); c++)
          g++;
        g < b && (k = Error(ee("Not enough arguments following: %s", l)));
      }
      let y = Math.min(g, b);
      for (!te(f) && y > 0 && (j(l, f), y--), c = i + 1; c < y + i + 1; c++)
        j(l, p[c]);
      return i + y;
    }
    function Ee(i, l, p, f) {
      let c = [], b = f || p[i + 1];
      const g = w(l, h.nargs);
      if (w(l, h.bools) && !/^(true|false)$/.test(b))
        c.push(!0);
      else if (te(b) || te(f) && /^-/.test(b) && !U.test(b) && !we(b)) {
        if (d[l] !== void 0) {
          const y = d[l];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        te(f) || c.push(Fe(l, f, !0));
        for (let y = i + 1; y < p.length && !(!u["greedy-arrays"] && c.length > 0 || g && typeof g == "number" && c.length >= g || (b = p[y], /^-/.test(b) && !U.test(b) && !we(b))); y++)
          i = y, c.push(Fe(l, b, r));
      }
      return typeof g == "number" && (g && c.length < g || isNaN(g) && c.length === 0) && (k = Error(ee("Not enough arguments following: %s", l))), j(l, c), i;
    }
    function j(i, l, p = r) {
      if (/-/.test(i) && u["camel-case-expansion"]) {
        const b = i.split(".").map(function(g) {
          return me(g);
        }).join(".");
        Nt(i, b);
      }
      const f = Fe(i, l, p), c = i.split(".");
      pe(F, c, f), h.aliases[i] && h.aliases[i].forEach(function(b) {
        const g = b.split(".");
        pe(F, g, f);
      }), c.length > 1 && u["dot-notation"] && (h.aliases[c[0]] || []).forEach(function(b) {
        let g = b.split(".");
        const y = [].concat(c);
        y.shift(), g = g.concat(y), (h.aliases[i] || []).includes(g.join(".")) || pe(F, g, f);
      }), w(i, h.normalize) && !w(i, h.arrays) && [i].concat(h.aliases[i] || []).forEach(function(g) {
        Object.defineProperty(_t, g, {
          enumerable: !0,
          get() {
            return l;
          },
          set(y) {
            l = typeof y == "string" ? ne.normalize(y) : y;
          }
        });
      });
    }
    function Nt(i, l) {
      h.aliases[i] && h.aliases[i].length || (h.aliases[i] = [l], B[l] = !0), h.aliases[l] && h.aliases[l].length || Nt(l, i);
    }
    function Fe(i, l, p) {
      p && (l = Un(l)), (w(i, h.bools) || w(i, h.counts)) && typeof l == "string" && (l = l === "true");
      let f = Array.isArray(l) ? l.map(function(c) {
        return ve(i, c);
      }) : ve(i, l);
      return w(i, h.counts) && (te(f) || typeof f == "boolean") && (f = Ie()), w(i, h.normalize) && w(i, h.arrays) && (Array.isArray(l) ? f = l.map((c) => ne.normalize(c)) : f = ne.normalize(l)), f;
    }
    function ve(i, l) {
      return !u["parse-positional-numbers"] && i === "_" || !w(i, h.strings) && !w(i, h.bools) && !Array.isArray(l) && (Xt(l) && u["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${l}`))) || !te(l) && w(i, h.numbers)) && (l = Number(l)), l;
    }
    function mn(i) {
      const l = /* @__PURE__ */ Object.create(null);
      jt(l, h.aliases, d), Object.keys(h.configs).forEach(function(p) {
        const f = i[p] || l[p];
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
            Pe(c);
          } catch (c) {
            c.name === "PermissionDenied" ? k = c : i[p] && (k = Error(ee("Invalid JSON config file: %s", f)));
          }
      });
    }
    function Pe(i, l) {
      Object.keys(i).forEach(function(p) {
        const f = i[p], c = l ? l + "." + p : p;
        typeof f == "object" && f !== null && !Array.isArray(f) && u["dot-notation"] ? Pe(f, c) : (!he(F, c.split(".")) || w(c, h.arrays) && u["combine-arrays"]) && j(c, f);
      });
    }
    function dn() {
      typeof E < "u" && E.forEach(function(i) {
        Pe(i);
      });
    }
    function Rt(i, l) {
      if (typeof x > "u")
        return;
      const p = typeof x == "string" ? x : "", f = ne.env();
      Object.keys(f).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const b = c.split("__").map(function(g, y) {
            return y === 0 && (g = g.substring(p.length)), me(g);
          });
          (l && h.configs[b.join(".")] || !l) && !he(i, b) && j(b.join("."), f[c]);
        }
      });
    }
    function gn(i) {
      let l;
      const p = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(f) {
        if (!p.has(f) && (l = w(f, h.coercions), typeof l == "function"))
          try {
            const c = ve(f, l(i[f]));
            [].concat(h.aliases[f] || [], f).forEach((b) => {
              p.add(b), i[b] = c;
            });
          } catch (c) {
            k = c;
          }
      });
    }
    function $n(i) {
      return h.keys.forEach((l) => {
        ~l.indexOf(".") || typeof i[l] > "u" && (i[l] = void 0);
      }), i;
    }
    function jt(i, l, p, f = !1) {
      Object.keys(p).forEach(function(c) {
        he(i, c.split(".")) || (pe(i, c.split("."), p[c]), f && (se[c] = !0), (l[c] || []).forEach(function(b) {
          he(i, b.split(".")) || pe(i, b.split("."), p[c]);
        }));
      });
    }
    function he(i, l) {
      let p = i;
      u["dot-notation"] || (l = [l.join(".")]), l.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const f = l[l.length - 1];
      return typeof p != "object" ? !1 : f in p;
    }
    function pe(i, l, p) {
      let f = i;
      u["dot-notation"] || (l = [l.join(".")]), l.slice(0, -1).forEach(function(T) {
        T = Ft(T), typeof f == "object" && f[T] === void 0 && (f[T] = {}), typeof f[T] != "object" || Array.isArray(f[T]) ? (Array.isArray(f[T]) ? f[T].push({}) : f[T] = [f[T], {}], f = f[T][f[T].length - 1]) : f = f[T];
      });
      const c = Ft(l[l.length - 1]), b = w(l.join("."), h.arrays), g = Array.isArray(p);
      let y = u["duplicate-arguments-array"];
      !y && w(c, h.nargs) && (y = !0, (!te(f[c]) && h.nargs[c] === 1 || Array.isArray(f[c]) && f[c].length === h.nargs[c]) && (f[c] = void 0)), p === Ie() ? f[c] = Ie(f[c]) : Array.isArray(f[c]) ? y && b && g ? f[c] = u["flatten-duplicate-arrays"] ? f[c].concat(p) : (Array.isArray(f[c][0]) ? f[c] : [f[c]]).concat([p]) : !y && !!b == !!g ? f[c] = p : f[c] = f[c].concat([p]) : f[c] === void 0 && b ? f[c] = g ? p : [p] : y && !(f[c] === void 0 || w(c, h.counts) || w(c, h.bools)) ? f[c] = [f[c], p] : f[c] = p;
    }
    function bn(...i) {
      i.forEach(function(l) {
        Object.keys(l || {}).forEach(function(p) {
          h.aliases[p] || (h.aliases[p] = [].concat(a[p] || []), h.aliases[p].concat(p).forEach(function(f) {
            if (/-/.test(f) && u["camel-case-expansion"]) {
              const c = me(f);
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), B[c] = !0);
            }
          }), h.aliases[p].concat(p).forEach(function(f) {
            if (f.length > 1 && /[A-Z]/.test(f) && u["camel-case-expansion"]) {
              const c = Qt(f, "-");
              c !== p && h.aliases[p].indexOf(c) === -1 && (h.aliases[p].push(c), B[c] = !0);
            }
          }), h.aliases[p].forEach(function(f) {
            h.aliases[f] = [p].concat(h.aliases[p].filter(function(c) {
              return f !== c;
            }));
          }));
        });
      });
    }
    function w(i, l) {
      const p = [].concat(h.aliases[i] || [], i), f = Object.keys(l), c = p.find((b) => f.includes(b));
      return c ? l[c] : !1;
    }
    function Lt(i) {
      const l = Object.keys(h);
      return [].concat(l.map((f) => h[f])).some(function(f) {
        return Array.isArray(f) ? f.includes(i) : f[i];
      });
    }
    function yn(i, ...l) {
      return [].concat(...l).some(function(f) {
        const c = i.match(f);
        return c && Lt(c[1]);
      });
    }
    function En(i) {
      if (i.match(U) || !i.match(/^-[^-]+/))
        return !1;
      let l = !0, p;
      const f = i.slice(1).split("");
      for (let c = 0; c < f.length; c++) {
        if (p = i.slice(c + 2), !Lt(f[c])) {
          l = !1;
          break;
        }
        if (f[c + 1] && f[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(f[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || f[c + 1] && f[c + 1].match(/\W/))
          break;
      }
      return l;
    }
    function we(i) {
      return u["unknown-options-as-args"] && vn(i);
    }
    function vn(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(U) || En(i) ? !1 : !yn(i, /^-+([^=]+?)=[\s\S]*$/, fe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ae(i) {
      return !w(i, h.bools) && !w(i, h.counts) && `${i}` in d ? d[i] : wn(xn(i));
    }
    function wn(i) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[i];
    }
    function xn(i) {
      let l = q.BOOLEAN;
      return w(i, h.strings) ? l = q.STRING : w(i, h.numbers) ? l = q.NUMBER : w(i, h.bools) ? l = q.BOOLEAN : w(i, h.arrays) && (l = q.ARRAY), l;
    }
    function te(i) {
      return i === void 0;
    }
    function An() {
      Object.keys(h.counts).find((i) => w(i, h.arrays) ? (k = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : w(i, h.nargs) ? (k = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(_t, F),
      configuration: u,
      defaulted: Object.assign({}, se),
      error: k,
      newAliases: Object.assign({}, B)
    };
  }
}
function Vn(e) {
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
    o = o.filter(function(a, u, d) {
      return d.indexOf(a) === u;
    });
    const r = o.pop();
    r !== void 0 && typeof r == "string" && (n[r] = o);
  }), n;
}
function Ie(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Ft(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Un(e) {
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
var Te, We, Me;
const Pt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, It = (We = (Te = process == null ? void 0 : process.versions) === null || Te === void 0 ? void 0 : Te.node) !== null && We !== void 0 ? We : (Me = process == null ? void 0 : process.version) === null || Me === void 0 ? void 0 : Me.slice(1);
if (It && Number(It.match(/^([^.]+)/)[1]) < Pt)
  throw Error(`yargs parser supports a minimum Node.js version of ${Pt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Hn = process ? process.env : {}, Yt = new Dn({
  cwd: process.cwd,
  env: () => Hn,
  format: Kt,
  normalize: Cn,
  resolve: ue,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(At(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), be = function(t, n) {
  return Yt.parse(t.slice(), n).argv;
};
be.detailed = function(e, t) {
  return Yt.parse(e.slice(), t);
};
be.camelCase = me;
be.decamelize = Qt;
be.looksLikeNumber = Xt;
const Gn = {
  right: Yn,
  center: Jn
}, Kn = 0, Ae = 1, Zn = 2, Oe = 3;
class qn {
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
      this.div(...o.map((r, a) => ({
        text: r.trim(),
        padding: this.measurePadding(r),
        width: a === 0 && o.length > 1 ? s : void 0
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
      s.forEach((a, u) => {
        const { width: d } = t[u], E = this.negatePadding(t[u]);
        let x = a;
        if (E > z.stringWidth(a) && (x += " ".repeat(E - z.stringWidth(a))), t[u].align && t[u].align !== "left" && this.wrap) {
          const N = Gn[t[u].align];
          x = N(x, E), z.stringWidth(x) < E && (x += " ".repeat((d || 0) - z.stringWidth(x) - 1));
        }
        const _ = t[u].padding || [0, 0, 0, 0];
        _[Oe] && (r += " ".repeat(_[Oe])), r += Tt(t[u], x, "| "), r += x, r += Tt(t[u], x, " |"), _[Ae] && (r += " ".repeat(_[Ae])), o === 0 && n.length > 0 && (r = this.renderInline(r, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, r = n.text, a = z.stringWidth(r.trimRight());
    return n.span ? this.wrap ? o < a ? t : (n.hidden = !0, r.trimRight() + " ".repeat(o - a) + t.trimLeft()) : (n.hidden = !0, r + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((r, a) => {
      r.width = s[a], this.wrap ? o = z.wrap(r.text, this.negatePadding(r), { hard: !0 }).split(`
`) : o = r.text.split(`
`), r.border && (o.unshift("." + "-".repeat(this.negatePadding(r) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(r) + 2) + "'")), r.padding && (o.unshift(...new Array(r.padding[Kn] || 0).fill("")), o.push(...new Array(r.padding[Zn] || 0).fill(""))), o.forEach((u, d) => {
        n[d] || n.push([]);
        const E = n[d];
        for (let x = 0; x < a; x++)
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
      return t.map((a) => a.width || z.stringWidth(a.text));
    let n = t.length, s = this.width;
    const o = t.map((a) => {
      if (a.width)
        return n--, s -= a.width, a.width;
    }), r = n ? Math.floor(s / n) : 0;
    return o.map((a, u) => a === void 0 ? Math.max(r, Qn(t[u])) : a);
  }
}
function Tt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Qn(e) {
  const t = e.padding || [], n = 1 + (t[Oe] || 0) + (t[Ae] || 0);
  return e.border ? n + 4 : n;
}
function Xn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Yn(e, t) {
  e = e.trim();
  const n = z.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Jn(e, t) {
  e = e.trim();
  const n = z.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let z;
function es(e, t) {
  return z = t, new qn({
    width: e?.width || Xn(),
    wrap: e?.wrap
  });
}
const Jt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function en(e) {
  return e.replace(Jt, "");
}
function ts(e, t) {
  const [n, s] = e.match(Jt) || ["", ""];
  e = en(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function ns(e) {
  return es(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: en,
    wrap: ts
  });
}
function ss(e, t) {
  let n = ue(".", e), s;
  for (Zt(n).isDirectory() || (n = Be(n)); ; ) {
    if (s = t(n, jn(n)), s) return ue(n, s);
    if (n = Be(s = n), s === n) break;
  }
}
const os = {
  fs: {
    readFileSync: At,
    writeFile: Ln
  },
  format: Kt,
  resolve: ue,
  exists: (e) => {
    try {
      return Zt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let Z;
class rs {
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
    let a = o === 1 ? n : s;
    this.cache[this.locale][n] && (a = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: r
    })) : r();
    const u = [a];
    return ~a.indexOf("%d") && u.push(o), Z.format.apply(Z.format, u.concat(t));
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
      const a = n[r + 1];
      s += o, typeof a < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, r = n.cb, a = this._resolveLocaleFile(s, o), u = JSON.stringify(this.cache[o], null, 2);
    Z.fs.writeFile(a, u, "utf-8", function(d) {
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
function is(e, t) {
  Z = t;
  const n = new rs(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const cs = (e) => is(e, os), as = "require is not supported by ESM", Wt = "loading a directory of commands is not supported yet for ESM";
let ge;
try {
  ge = In(import.meta.url);
} catch {
  ge = process.cwd();
}
const ls = ge.substring(0, ge.lastIndexOf("node_modules"));
Fn, Pn, Sn, ls || process.cwd(), _n, Be, Nn, Rn, ue, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, At, cs({
  directory: ue(ge, "../../../locales"),
  updateFiles: !1
});
const X = "\x1B[44m", A = "\x1B[43m", W = "\x1B[41m", tn = "\x1B[42m", $ = "\x1B[0m", O = "\x1B[33m", S = "\x1B[36m", m = "\x1B[0m", us = [
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
], ke = [], fs = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const r = o[1];
      us.includes(r) && ke.push({ filePath: t, message: `${A}(${r})${$}` });
    }
  });
}, hs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ps = /^(\(.*\)|\\?.)$/;
function oe(e) {
  const t = e.toString();
  return ps.test(t) ? t : `(?:${t})`;
}
const ms = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, ds = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(e) {
  const t = (n) => v(`(?<${n}>${`${e}`.replace(ms, "$1$2")})`);
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
    grouped: () => v(`${e}`.replace(ds, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${e}`),
      lineEnd: () => v(`${e}$`)
    }
  };
}
const gs = /[.*+?^${}()|[\]\\/]/g;
function $e(e) {
  return v(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function V(e) {
  return v(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function $s(...e) {
  return v(`(?:${e.map((t) => H(t)).join("|")})`);
}
const Se = v(".");
v("\\b\\w+\\b");
const K = v("\\w"), D = v("\\b"), bs = v("\\d"), L = v("\\s"), nn = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), sn = v("\\t"), on = v("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(gs, "\\$&") : t).join("")
  );
}
function C(...e) {
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
`).slice(0, n).reduce((a, u) => a + u.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, _e = [], ys = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = R(H("$parent").or("getCurrentInstance"), [P]), r = e.content.match(n), a = e.content.match(s);
  if (a) {
    const d = a[1].split(".")[0];
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
}, Es = () => {
  const e = [];
  return _e.length > 0 && _e.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], vs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ze.push({
      filePath: t,
      message: `${A}global style${$} used`
    });
  });
}, ws = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ global style${m}`,
      description: `👉 ${O}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], xs = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps([", [P, G]);
  e.content.match(n)?.length && De.push({ filePath: t, message: `${A}Props type${$} not defined` });
}, As = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ simple prop${m}`,
      description: `👉 ${O}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Os = (e) => {
  if (e.includes("pages"))
    return;
  const t = re.basename(e);
  if (t === "App.vue")
    return;
  const n = R(nn.uppercase);
  t.slice(1).match(n)?.length || Ve.push({ filePath: e, message: `Component name is ${A}single word${$}` });
}, Ss = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ single name component${m}`,
      description: `👉 ${O}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = R("<", C(V(">")), " v-for", C(V(">")), ">", [
    P,
    G
  ]), s = e.content.match(n);
  s?.length && (s.some((r) => r.includes(":key")) || Ue.push({ filePath: t, message: `v-for used ${A}without a key${$}` }));
}, _s = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Ns = (e, t) => {
  if (!e)
    return;
  const n = R(
    "<",
    C(V(">")),
    " v-if",
    C(V(">")),
    " v-for",
    C(V(">")),
    ">",
    [P, G]
  ), s = R(
    "<",
    C(V(">")),
    " v-for",
    C(V(">")),
    " v-if",
    C(V(">")),
    ">",
    [P, G]
  ), o = e.content.match(n), r = e.content.match(s);
  if (o?.length || r?.length) {
    const a = o?.length ? o[0] : r?.length ? r[0] : "", u = I(e.content, a);
    He.push({ filePath: t, message: `line #${u} ${A}v-if used with v-for${$}` });
  }
}, Rs = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${O}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Mt = [
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
], js = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const a = r[1], u = r[2];
    if (u) {
      const E = Array.from(u.matchAll(o), (_) => _[1]).filter((_) => Mt.includes(_));
      let x = -1;
      for (const _ of E) {
        const N = Mt.indexOf(_);
        if (N !== -1 && N < x) {
          Ge.push({
            filePath: t,
            message: `tag has attributes out of order ${A}(${a})${$}`
          });
          break;
        }
        x = N;
      }
    }
  }
}, Ls = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Fs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), r = n.indexOf("<style>"), a = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((d) => d.index !== -1);
  a.every((d, E) => E === 0 ? !0 : a[E - 1].index < d.index) || Ke.push({ filePath: t, message: `Top level elements are ${A}not following the correct order.${$}` });
}, Ps = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ top level element order${m}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Is = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = re.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, r = t.match(o);
  !s?.length && !r?.length && Ze.push({ filePath: e, message: `component name is ${A}not PascalCase, nor kebab-case.${$}` });
}, Ts = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Ws = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const r = I(e.content.trim(), o), a = o.split(`
`).at(0)?.trim() || "";
    qe.push({ filePath: t, message: `line #${r} ${A}(${a})${$}` });
  });
}, Ms = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component files${m}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Bt = [], Bs = ["v-slot", "v-bind", "v-on"], ks = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Bs.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Qe.push({ filePath: t, message: `line #${o} ${A}${s}${$}` }), Bt.some((r) => r.filePath === t) || Bt.push({ filePath: t });
    }
  });
}, zs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Ds = 3, Vs = (e) => {
  const t = R(
    C(V("/")).grouped(),
    H(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = R(
      $e("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), r = s.match(o);
    (!r || r.length < Ds) && Xe.push({ filePath: e, message: `${s} is not a ${A}full word.${$}` });
  }
}, Us = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ full-word component names${m}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Hs = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], r = s[2];
    r.split(/\s+/).filter((u) => u.trim() !== "").length > 1 && r.split(`
`).length === 1 && Ye.push({ filePath: t, message: `Element ${A}<${o}>${$} should have its attributes on separate lines` });
  }
}, Gs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Ks = /^[a-z]+([A-Z][a-z]*)*$/, Zs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((r) => r.split(":")[0]).filter((r) => r.length).filter((r) => !Ks.test(r)).length && Je.push({ filePath: t, message: `prop names are ${A}not camelCased${$}` });
}, qs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${O}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Qs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    C(K),
    J(C($e(` 	
\r`))),
    C(V("/>")),
    J(C($e(` 	
\r`))),
    J("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const r = R(":", C(K), J(" "), "=", J(" "), V(`'"`), [
    "g"
  ]);
  o?.forEach((a) => {
    if (!a.includes(":"))
      return;
    const u = a.match(r);
    if (u?.length) {
      const d = I(e.source, a);
      et.push({ filePath: t, message: `line #${d} ${A}${u}${$}` });
    }
  });
}, Xs = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${O}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Ys = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    C(nn.uppercase, K),
    J(on, sn),
    J(C(V(">"))),
    "></",
    C(K),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((r) => {
    const a = I(e.source, r), u = r.split(`
`).at(-1)?.trim() || "";
    tt.push({ filePath: t, message: `line #${a} ${A}${u}${$}` });
  });
}, Js = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${O}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rn = [], Ce = [], eo = 5, to = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > eo) {
      const r = o.split(`
`)[0], a = I(e.content, r);
      rn.push({ filePath: t, message: `line #${a} ${A}computed${$}` }), Ce.push({ filePath: t }), Ce.some((u) => u.filePath === t) || Ce.push({ filePath: t });
    }
  });
}, no = () => {
  const e = [];
  return Ce.length > 0 && rn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], so = 40, oo = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > so) {
      const r = I(e.content, o), a = o.split(`
`).at(0)?.trim() || "";
      nt.push({
        filePath: t,
        message: `line #${r} ${A}${a}${$}`
      });
    }
  });
}, ro = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${O}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], cn = 5, io = 2 * cn, co = (e, t) => {
  if (!e)
    return;
  const n = R(D, "if", D, [P, G]), s = R(D, "else", D, [P, G]), o = R(D, "for", D, [P, G]), r = R(D, "while", D, [P, G]), a = R(D, "case", D, [P, G]), u = e.content.match(n), d = e.content.match(s), E = e.content.match(o), x = e.content.match(r), _ = e.content.match(a), N = (u?.length || 0) + (d?.length || 0) + (E?.length || 0) + (x?.length || 0) + (_?.length || 0);
  N > cn && st.push({ filePath: t, message: `${N > io ? W : A}(${N})${$}` });
}, ao = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${O}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], kt = 5, lo = 3, uo = (e, t) => {
  if (!e)
    return;
  const n = R(sn.times.atLeast(kt).or(L.times.atLeast(lo * kt)), [
    P,
    G
  ]);
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    ot.push({
      filePath: t,
      message: `line #${r} ${A}indentation: ${o.length}${$}`
    });
  });
}, fo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ deep indentation${m}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], ho = (e, t) => {
  if (!e)
    return;
  const n = R(D, "else", D, [P, G]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `else clauses found ${W}(${s.length})${$}` });
}, po = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ else conditions${m}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ne = [], it = 20, mo = 5, go = 8;
function $o({ funcName: e, funcBody: t, lineNumber: n, filePath: s }) {
  const o = t.split(`
`).length, r = Eo(e);
  if (o > 2 * it) {
    Ne.push({ filePath: s, message: `function ${W}(${r}#${n})${$} is too long: ${W}${o} lines${$}` });
    return;
  }
  o >= it && Ne.push({ filePath: s, message: `function ${A}(${r}#${n})${$} is too long: ${A}${o} lines${$}` });
}
function bo(e, t) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = t;
  const s = n.exec(e);
  if (s) {
    const o = s[1], r = n.lastIndex;
    let a = 1, u = r;
    for (; a > 0 && u < e.length; )
      e[u] === "{" ? a++ : e[u] === "}" && a--, u++;
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
function yo(e, t) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = e.slice(t), o = n.exec(s);
  if (o) {
    const [, r] = o, a = t + o.index + o[0].length;
    let u = a, d = "";
    if (e[a] === "{") {
      let E = 1;
      for (u = a + 1; u < e.length && E > 0; )
        e[u] === "{" ? E++ : e[u] === "}" && E--, u++;
      d = e.slice(a + 1, u - 1).trim();
    } else {
      for (; u < e.length && e[u] !== ";"; )
        u++;
      d = e.slice(a, u).trim();
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
function Eo(e) {
  return e.replace(/^const\s*/, "");
}
const vo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let r = "", a = "", u = !1;
    if (n.slice(o, o + go) === "function") {
      const d = bo(n, o);
      d && (u = !0, r = d.name, a = d.body, o = d.end);
    }
    if (n.slice(o, o + mo) === "const") {
      const d = yo(n, o);
      d && (u = !0, r = d.name, a = d.body, o = d.end);
    }
    if (u) {
      const d = I(n.trim(), r);
      $o({ funcName: r, funcBody: a, lineNumber: d, filePath: t });
    } else
      o++;
  }
}, wo = () => {
  const e = [];
  return Ne.length > 0 && Ne.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ function size${m}`,
      description: `👉 ${O}Functions must be shorter than ${it} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], xo = (e, t) => {
  if (!e)
    return;
  const n = R("<a", D, [P, G]), s = e.content.match(n);
  s?.length && ct.push({ filePath: t, message: `${s?.length} ${A}html link found${$}` });
}, Ao = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ html link${m}`,
      description: `👉 ${O}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, at = [], Oo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, r) => {
    const a = o.trim();
    if (a.startsWith("if (") && !a.includes("{")) {
      const u = s[r + 1]?.trim();
      (!u || !u.startsWith("{") && !a.endsWith("{")) && at.push({
        filePath: t,
        message: `line #${r} if statement without curly braces: ${W}${a}${$}`
      });
    }
  });
}, So = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ if without curly braces${m}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], Co = (e, t) => {
  if (!e)
    return;
  const n = R(C(bs).as("magicNumber"), $s(")", on), [P]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s.groups?.magicNumber, a = Number.parseInt(r ?? "0");
    if (a > 1) {
      const u = I(e.content, String(a), o);
      lt.push({
        filePath: t,
        message: `line #${u} ${A}magic number: ${a}${$}`
      }), o = u;
    }
  }
}, _o = () => {
  const e = [];
  return lt.length && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ magic numbers${m}`,
      description: `👉 ${O}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ut = [], No = (e, t) => {
  if (!e)
    return;
  const n = R(C(Se), L, "?", L, C(Se), L, ":", L, C(Se));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const r = I(e.content, o);
      ut.push({
        filePath: t,
        message: `line #${r} has ${A}nested ternary${$}`
      });
    }
  });
}, Ro = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ nested Ternary${m}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], jo = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    ft.push({
      filePath: t,
      message: `line #${r} ${A}props destructuring found: ${o}${$}`
    });
  });
}, Lo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${O}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], Fo = (e, t) => {
  if (!e)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    ht.push({
      filePath: t,
      message: `line #${r} ${A}Avoid using 'var' for variable declarations: ${o}${$}`
    });
  });
}, Po = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ No Var Declaration${m}`,
      description: `👉 ${O}Avoid var declaration, use const or let instead of that.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], an = 3, zt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > an && pt.push({ filePath: n, message: `function ${A}${e}${$} has ${A}${s.length}${$} parameters` });
}, Io = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] && zt(s[1], s[2], t), s[3] && zt(s[3], s[4], t);
}, To = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ parameter count${m}`,
      description: `👉 ${O}Max number of function parameters should be ${an}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, mt = [], Wo = (e, t) => {
  !e || e.setup || mt.push({ filePath: t, message: `${A}Plain <script> block${$} found` });
}, Mo = () => {
  const e = [];
  return mt.length > 0 && mt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], Bo = (e, t) => {
  if (!e)
    return;
  const n = R(
    "defineProps(",
    L.times.any(),
    "[",
    L.times.any(),
    C($e(`'"`), C(K), $e(`'"`), L.times.any(), J(",", L.times.any())),
    "]",
    L.times.any(),
    ")",
    [P]
  ), s = R(
    "<",
    C(K).grouped(),
    L,
    V(">").times.any(),
    ":",
    C(K).grouped(),
    L.times.any(),
    "=",
    L.times.any(),
    '"props.',
    C(K).grouped(),
    '"',
    [P]
  );
  let o;
  const r = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((d) => r.add(d));
  let a;
  for (; (a = s.exec(e.content)) !== null; ) {
    const u = a[1], d = a[2], E = a[3];
    r.has(E) && d === E && dt.push({
      filePath: t,
      message: `Prop ${A}(${E})${$} is being drilled through ${A}${u}${$} component unmodified.`
    });
  }
}, ko = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ props drilling${m}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], $t = 100, zo = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > $t && gt.push({ filePath: t, message: `${n.length > $t * 2 ? W : A}(${n.length} lines)${$}` });
}, Do = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${$t} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], ln = 4, Vo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < ln && bt.push({ filePath: t, message: `${W}(${o})${$}` });
  }
}, Uo = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ short variable names${m}`,
      description: `👉 ${O}Variable names must have a minimum length of ${ln}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, yt = [], Ho = 5, Go = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps", J("<"), J("("), "{", C(Se), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Ho && yt.push({ filePath: t, message: `props found ${W}(${o})${$}` });
  }
}, Ko = () => {
  const e = [];
  return yt.length > 0 && yt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ too many props${m}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Et = [], Zo = (e, t) => {
  if (!e)
    return;
  const n = R('v-for="(', L.times.any(), C(K).grouped(), L.times.any(), ",", L.times.any(), C(K).grouped(), L.times.any(), ")", C(L), "in", C(L), C(K).grouped(), [P]), s = R(':key="', L.times.any(), C(K).grouped(), L.times.any(), '"', [P]), o = [...e.content.matchAll(n)], r = [...e.content.matchAll(s)];
  o.forEach((a) => {
    const [u, d, E, x] = a;
    r.forEach((_) => {
      const N = _[1];
      if (N === E) {
        const B = I(e.content.trim(), N);
        Et.push({
          filePath: t,
          message: `line #${B} ${A}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, qo = () => {
  const e = [];
  return Et.length > 0 && Et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, vt = [], Qo = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], r = s[1], a = I(e.content.trim(), o);
    vt.push({
      filePath: t,
      message: `line #${a} zero length comparison found ${A}(${r})${$}`
    });
  }
}, Xo = () => {
  const e = [];
  return vt.length > 0 && vt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${O}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Re = [], Yo = (e, t) => {
  if (!e)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (e.content.match(s) || []).forEach((r) => {
    const a = r.split(`
`).length, u = I(e.content, r);
    if (a > n * 2) {
      Re.push({
        filePath: t,
        message: `line #${u} ${W}has a v-if with ${a} lines${$}`
      });
      return;
    }
    a > n && Re.push({
      filePath: t,
      message: `line #${u} ${A}has a v-if with ${a} lines${$}`
    });
  });
}, Jo = () => {
  const e = [];
  return Re.length > 0 && Re.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ big v-if${m}`,
      description: `👉 ${O}Big v-if can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, je = [], er = (e, t) => {
  if (!e)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (e.content.match(s) || []).forEach((r) => {
    const a = r.split(`
`).length, u = I(e.content, r);
    if (a > n * 2) {
      je.push({
        filePath: t,
        message: `line #${u} ${W}has a v-show with ${a} lines${$}`
      });
      return;
    }
    a > n && je.push({
      filePath: t,
      message: `line #${u} ${A}has a v-show with ${a} lines${$}`
    });
  });
}, tr = () => {
  const e = [];
  return je.length > 0 && je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ big v-show${m}`,
      description: `👉 ${O}Big v-show can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nr = (e, t, n) => {
  const s = {}, o = ({ file: E, rule: x, title: _, description: N, message: B }) => {
    const se = e === "rule" ? x : E;
    s[se] || (s[se] = []), s[se].push({ file: E, rule: x, title: _, description: N, message: B });
  }, r = (E) => {
    E().forEach((_) => {
      o(_);
    });
  };
  r(Ss), r(As), r(_s), r(Rs), r(ws), r(Ts), r(Ms), r(zs), r(Us), r(Gs), r(qs), r(Xs), r(Js), r(no), r(ro), r(Ps), r(Ls), r(Es), r(hs), r(Jo), r(tr), r(ao), r(fo), r(po), r(wo), r(Ao), r(So), r(_o), r(Ro), r(Lo), r(Po), r(To), r(Mo), r(ko), r(Do), r(Uo), r(Ko), r(qo), r(Xo);
  const a = [], u = Object.keys(s).sort((E, x) => {
    const _ = s[E].length, N = s[x].length;
    return t === "desc" ? N - _ : _ - N;
  }), d = [];
  return u.forEach((E) => {
    d.push({ info: `
 - ${E}` }), s[E].forEach((x) => {
      const _ = x.message.includes(W);
      if (a.some((N) => N.file === x.file)) {
        const N = a.find((B) => B.file === x.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        a.push({ file: x.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" && d.push({ info: `   Rule: ${x.rule}` }), e !== "file" && d.push({ info: `   File: ${x.file}` }), d.push({ info: `   Description: ${x.description}` }), d.push({ info: `   Message: ${x.message || "🚨"}
` }));
    });
  }), { output: d, health: a };
}, ie = {
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
    "bigVif",
    "bigVshow",
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
}, Ot = Object.keys(ie), sr = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue"), r = {
    // vue-essential
    simpleProp: () => xs(s, t),
    singleNameComponent: () => o && Os(t),
    globalStyle: () => o && vs(e.styles, t),
    vforNoKey: () => o && Cs(e.template, t),
    vifWithVfor: () => o && Ns(e.template, t),
    // vue-strong
    simpleComputed: () => to(s, t),
    componentFiles: () => o && Ws(s, t),
    propNameCasing: () => o && Zs(s, t),
    componentFilenameCasing: () => o && Is(t),
    selfClosingComponents: () => o && Ys(e, t),
    templateSimpleExpression: () => o && oo(e.template, t),
    quotedAttributeValues: () => o && Qs(e, t),
    directiveShorthands: () => o && ks(e, t),
    fullWordComponentName: () => o && Vs(t),
    multiAttributeElements: () => o && Hs(e.template, t),
    // vue-recommended
    topLevelElementOrder: () => o && Fs(e.source, t),
    elementAttributeOrder: () => o && js(e.template, t),
    // vue-caution
    implicitParentChildCommunication: () => o && ys(s, t),
    elementSelectorsWithScoped: () => o && fs(e.styles, t),
    // rrd
    bigVif: () => Yo(e.template, t),
    bigVShow: () => er(e.template, t),
    cyclomaticComplexity: () => co(s, t),
    deepIndentation: () => uo(s, t),
    elseCondition: () => ho(s, t),
    functionSize: () => vo(s, t),
    ifWithoutCurlyBraces: () => Oo(s, t),
    magicNumbers: () => Co(s, t),
    nestedTernary: () => No(s, t),
    parameterCount: () => Io(s, t),
    propsDrilling: () => Bo(s, t),
    scriptLength: () => zo(s, t),
    shortVariableName: () => Vo(s, t),
    tooManyProps: () => Go(s, t),
    noPropDestructure: () => jo(s, t),
    noVarDeclaration: () => Fo(s, t),
    zeroLengthComparison: () => Qo(s, t),
    htmlLink: () => o && xo(e.template, t),
    plainScript: () => o && Wo(e.script, t),
    vForWithIndexKey: () => o && Zo(e.template, t)
  };
  n.forEach((a) => {
    a in ie ? ie[a].forEach((u) => {
      u in r && r[u]();
    }) : a in r && r[a]();
  });
}, or = 1.5, Dt = 75, Vt = 85, Ut = 95, un = [...Ot, ...Object.values(ie).flat()], rr = (e, t, n) => {
  const { errors: s, warnings: o } = e.reduce((u, { errors: d, warnings: E }) => ({ errors: u.errors + d, warnings: u.warnings + E }), { errors: 0, warnings: 0 }), r = [];
  r.push({ info: `Found ${W}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${A}${Intl.NumberFormat("en-US").format(o)} warnings${$}, ${X}${Intl.NumberFormat("en-US").format(t)} lines${$} of code in ${X}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const a = Math.ceil((1 - (s * or + o) / t) * 100);
  return a < Dt && r.push({ info: `${W}Code health is LOW: ${a}%${$}
` }), a >= Dt && a < Vt && r.push({ info: `${A}Code health is MEDIUM ${a}%${$}
` }), a >= Vt && a < Ut && r.push({ info: `${X}Code health is OK: ${a}%${$}
` }), a >= Ut && r.push({ info: `${tn}Code health is GOOD: ${a}%${$}
` }), { errors: s, warnings: o, output: r };
};
function ir(e) {
  const t = [], n = [];
  return Object.entries(ie).forEach(([s, o]) => {
    if (o.every((r) => e.includes(r)))
      t.push(s);
    else {
      const r = o.filter((a) => e.includes(a));
      n.push(...r);
    }
  }), { rulesets: t, individualRules: n };
}
let wt = 0, fn = 0, hn = [];
const cr = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], St = [], le = [], Ht = async (e, t) => {
  if (!St.some((n) => e.endsWith(n)) && (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js"))) {
    wt++;
    const n = await ce.readFile(t, "utf-8");
    fn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Tn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), le.push({ info: `Analyzing ${t}...` }), sr(s, t, hn);
  }
}, pn = async (e) => {
  if (!(await ce.stat(e)).isDirectory()) {
    await Ht(e, e);
    return;
  }
  const n = await ce.readdir(e);
  for (const s of n) {
    const o = re.join(e, s);
    (await ce.stat(o)).isDirectory() && !cr.some((a) => o.includes(a)) && !St.some((a) => o.endsWith(a)) && await pn(o), await Ht(o, o);
  }
}, ar = async ({ dir: e, apply: t = [], ignore: n = [], exclude: s, groupBy: o, level: r, orderBy: a }) => {
  const u = t.filter((Y) => !n.includes(Y)), { rulesets: d, individualRules: E } = ir(u), x = d.length ? `${X}${d.join(", ")}${$}` : "N/A", _ = E.length ? `${X}${E.join(", ")}${$}` : "N/A";
  let N = `      Applying ${d.length} rulesets: ${x}`;
  E.length > 0 && (N += `
      Applying ${E.length} individual rules: ${_}`);
  const B = n.filter((Y) => !d.includes(Y)), se = B.length ? `${X}${B.join(", ")}${$}` : "N/A";
  le.push({ info: `${X}Analyzing Vue, TS and JS files in ${e}${$}` }), le.push({
    info: `${N}
      Ignoring ${B.length} rules/rulesets: ${se}
      Excluding ${s || "-"}
      Output level ${X}${r}${$}
      Grouping by ${X}${o}${$}
      Ordering ${X}${a}${$}`
  }), hn = t.filter((Y) => !n.includes(Y)), s && St.push(...s.split(",")), await pn(e), le.push({ info: `Found ${X}${wt}${$} files` });
  const { health: ee, output: h } = nr(o, a, r), { errors: U, warnings: fe, output: k } = rr(ee, fn, wt);
  return !U && !fe && le.push({ info: `
${tn}No code smells detected!${$}` }), { output: le, codeHealthOutput: k, reportOutput: h };
}, lr = ["rule", "file"], ur = ["asc", "desc"], fr = ["all", "error"], hr = ["text", "json"], pr = {
  groupBy: lr,
  orderBy: ur,
  outputLevel: fr,
  outputFormat: hr
}, xe = (e, t) => {
  const n = pr[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}, mr = async () => {
  let e = process.cwd();
  for (; e !== re.parse(e).root; ) {
    const t = re.join(e, "package.json");
    return await ce.access(t), e;
  }
  e = re.dirname(e);
}, Gt = (e) => (t) => {
  if (!t)
    return e === "apply" ? Object.keys(ie) : void 0;
  const n = t.split(","), s = [], o = [];
  return n.forEach((r) => {
    Ot.includes(r) ? s.push(...ie[r]) : Object.values(ie).some((a) => a.includes(r)) ? s.push(r) : o.push(r);
  }), o.length > 0 && (console.error(
    `
${W}Invalid ${e} values: ${o.join(
      ", "
    )}${$}. 
${O}Allowed values are: ${un.join(", ")}${m}

`
  ), process.exit(1)), s;
}, Ct = await mr();
Ct || (console.error(`
${W}Cannot find project root.${$}

`), process.exit(1));
const dr = JSON.parse(await ce.readFile(re.join(Ct, "package.json"), "utf-8")), xt = [];
let Q = {
  path: "./src",
  apply: Object.values(Ot).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const e = re.join(Ct, "vue-mess-detector.json"), t = JSON.parse(await ce.readFile(e, "utf-8"));
  Q = { ...Q, ...t }, xt.push({ info: `👉 Using configuration from ${e}` });
} catch {
  xt.push({ info: "👉 Using default configuration" });
}
On(Bn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(Q).positional("path", {
    describe: "path to the Vue files",
    default: Q.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: un,
    coerce: Gt("apply"),
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
    coerce: Gt("ignore"),
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
    ar({
      dir: e.path,
      apply: e.apply,
      ignore: e.ignore,
      exclude: e.exclude,
      groupBy: e.group,
      level: e.level,
      orderBy: e.order
    }).then((t) => {
      e.output == "text" && ([...xt, ...t.output].forEach((n) => {
        console.log(n.info);
      }), t.reportOutput?.forEach((n) => {
        console.log(n.info);
      }), t.codeHealthOutput?.forEach((n) => {
        console.log(n.info);
      })), e.output == "json" && console.log(JSON.stringify(t, null, 2));
    }).catch((t) => {
      console.error(`${W}${t}${$}`);
    });
  }
).version("version", "Show version number", dr.version).alias("version", "v").help().argv;
