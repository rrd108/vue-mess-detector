import ie from "node:fs/promises";
import oe from "node:path";
import bn from "yargs";
import { format as kt, inspect as yn } from "util";
import { normalize as En, resolve as ce, dirname as Te, basename as wn, extname as vn, relative as An } from "path";
import { readFileSync as bt, statSync as zt, readdirSync as On, writeFile as xn } from "fs";
import { notStrictEqual as Cn, strictEqual as Sn } from "assert";
import { fileURLToPath as _n } from "url";
import { parse as Nn } from "@vue/compiler-sfc";
class fe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, fe);
  }
}
function Dt() {
  return Rn() ? 0 : 1;
}
function Rn() {
  return jn() && !process.defaultApp;
}
function jn() {
  return !!process.versions.electron;
}
function Ln(e) {
  return e.slice(Dt() + 1);
}
function Pn() {
  return process.argv[Dt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ue(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let r = o ? o[0].length : 0; r < e.length; r++) {
      let u = e.charAt(r);
      s && (s = !1, u = u.toUpperCase()), r !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function Ut(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), u = e.charAt(o);
    r !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Ht(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Tn(e) {
  if (Array.isArray(e))
    return e.map((u) => typeof u != "string" ? u + "" : u);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const r = [];
  for (let u = 0; u < e.length; u++) {
    if (n = s, s = e.charAt(u), s === " " && !o) {
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
let J;
class Fn {
  constructor(t) {
    J = t;
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
    }, n), o = Tn(t), r = typeof t == "string", u = Wn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), g = Object.assign(/* @__PURE__ */ Object.create(null), s.default), w = s.configObjects || [], A = s.envPrefix, _ = h["populate--"], L = _ ? "--" : "_", Z = /* @__PURE__ */ Object.create(null), yt = /* @__PURE__ */ Object.create(null), ne = s.__ || J.format, f = {
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
    }, Q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, xe = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const a = typeof i == "object" ? i.key : i, p = Object.keys(i).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      p && (f[p][a] = !0), f.arrays[a] = !0, f.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(i) {
      f.bools[i] = !0, f.keys.push(i);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(i) {
      f.strings[i] = !0, f.keys.push(i);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(i) {
      f.numbers[i] = !0, f.keys.push(i);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(i) {
      f.counts[i] = !0, f.keys.push(i);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(i) {
      f.normalize[i] = !0, f.keys.push(i);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, a]) => {
      typeof a == "number" && (f.nargs[i] = a, f.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, a]) => {
      typeof a == "function" && (f.coercions[i] = a, f.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      f.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (f.configs[i] = a);
    })), fn(s.key, u, s.default, f.arrays), Object.keys(g).forEach(function(i) {
      (f.aliases[i] || []).forEach(function(a) {
        g[a] = g[i];
      });
    });
    let G = null;
    $n();
    let de = [];
    const P = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Et = {};
    for (let i = 0; i < o.length; i++) {
      const a = o[i], p = a.replace(/^-{3,}/, "---");
      let l, c, $, d, y, F;
      if (a !== "--" && /^-/.test(a) && ye(a))
        Ce(a);
      else if (p.match(/^---+(=|$)/)) {
        Ce(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        d = a.match(/^--?([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && (v(d[1], f.arrays) ? i = $e(i, d[1], o, d[2]) : v(d[1], f.nargs) !== !1 ? i = ge(i, d[1], o, d[2]) : R(d[1], d[2], !0));
      else if (a.match(xe) && h["boolean-negation"])
        d = a.match(xe), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], R(c, v(c, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        d = a.match(/^--?(.+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], v(c, f.arrays) ? i = $e(i, c, o) : v(c, f.nargs) !== !1 ? i = ge(i, c, o) : (y = o[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(Q)) && !v(c, f.bools) && !v(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), i++) : R(c, re(c))));
      else if (a.match(/^-.\..+=/))
        d = a.match(/^-([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && R(d[1], d[2]);
      else if (a.match(/^-.\..+/) && !a.match(Q))
        y = o[i + 1], d = a.match(/^-(.\..+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], y !== void 0 && !y.match(/^-/) && !v(c, f.bools) && !v(c, f.counts) ? (R(c, y), i++) : R(c, re(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Q)) {
        $ = a.slice(1, -1).split(""), l = !1;
        for (let W = 0; W < $.length; W++) {
          if (y = a.slice(W + 2), $[W + 1] && $[W + 1] === "=") {
            F = a.slice(W + 3), c = $[W], v(c, f.arrays) ? i = $e(i, c, o, F) : v(c, f.nargs) !== !1 ? i = ge(i, c, o, F) : R(c, F), l = !0;
            break;
          }
          if (y === "-") {
            R($[W], y);
            continue;
          }
          if (/[A-Za-z]/.test($[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && v(y, f.bools) === !1) {
            R($[W], y), l = !0;
            break;
          }
          if ($[W + 1] && $[W + 1].match(/\W/)) {
            R($[W], y), l = !0;
            break;
          } else
            R($[W], re($[W]));
        }
        c = a.slice(-1)[0], !l && c !== "-" && (v(c, f.arrays) ? i = $e(i, c, o) : v(c, f.nargs) !== !1 ? i = ge(i, c, o) : (y = o[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(Q)) && !v(c, f.bools) && !v(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), i++) : R(c, re(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Q) && v(a.slice(1), f.bools))
        c = a.slice(1), R(c, re(c));
      else if (a === "--") {
        de = o.slice(i + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        de = o.slice(i);
        break;
      } else
        Ce(a);
    }
    vt(P, !0), vt(P, !1), cn(P), an(), At(P, f.aliases, g, !0), ln(P), h["set-placeholder-key"] && un(P), Object.keys(f.counts).forEach(function(i) {
      ae(P, i.split(".")) || R(i, 0);
    }), _ && de.length && (P[L] = []), de.forEach(function(i) {
      P[L].push(i);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(P).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete P[i];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((i) => u[i])).forEach((i) => {
      h["camel-case-expansion"] && i.includes("-") && delete P[i.split(".").map((a) => ue(a)).join(".")], delete P[i];
    });
    function Ce(i) {
      const a = be("_", i);
      (typeof a == "string" || typeof a == "number") && P._.push(a);
    }
    function ge(i, a, p, l) {
      let c, $ = v(a, f.nargs);
      if ($ = typeof $ != "number" || isNaN($) ? 1 : $, $ === 0)
        return X(l) || (G = Error(ne("Argument unexpected for: %s", a))), R(a, re(a)), i;
      let d = X(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (i + 1) + d < $ && (G = Error(ne("Not enough arguments following: %s", a))), d = $;
      else {
        for (c = i + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Q) || ye(p[c])); c++)
          d++;
        d < $ && (G = Error(ne("Not enough arguments following: %s", a)));
      }
      let y = Math.min(d, $);
      for (!X(l) && y > 0 && (R(a, l), y--), c = i + 1; c < y + i + 1; c++)
        R(a, p[c]);
      return i + y;
    }
    function $e(i, a, p, l) {
      let c = [], $ = l || p[i + 1];
      const d = v(a, f.nargs);
      if (v(a, f.bools) && !/^(true|false)$/.test($))
        c.push(!0);
      else if (X($) || X(l) && /^-/.test($) && !Q.test($) && !ye($)) {
        if (g[a] !== void 0) {
          const y = g[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        X(l) || c.push(Se(a, l, !0));
        for (let y = i + 1; y < p.length && !(!h["greedy-arrays"] && c.length > 0 || d && typeof d == "number" && c.length >= d || ($ = p[y], /^-/.test($) && !Q.test($) && !ye($))); y++)
          i = y, c.push(Se(a, $, r));
      }
      return typeof d == "number" && (d && c.length < d || isNaN(d) && c.length === 0) && (G = Error(ne("Not enough arguments following: %s", a))), R(a, c), i;
    }
    function R(i, a, p = r) {
      if (/-/.test(i) && h["camel-case-expansion"]) {
        const $ = i.split(".").map(function(d) {
          return ue(d);
        }).join(".");
        wt(i, $);
      }
      const l = Se(i, a, p), c = i.split(".");
      le(P, c, l), f.aliases[i] && f.aliases[i].forEach(function($) {
        const d = $.split(".");
        le(P, d, l);
      }), c.length > 1 && h["dot-notation"] && (f.aliases[c[0]] || []).forEach(function($) {
        let d = $.split(".");
        const y = [].concat(c);
        y.shift(), d = d.concat(y), (f.aliases[i] || []).includes(d.join(".")) || le(P, d, l);
      }), v(i, f.normalize) && !v(i, f.arrays) && [i].concat(f.aliases[i] || []).forEach(function(d) {
        Object.defineProperty(Et, d, {
          enumerable: !0,
          get() {
            return a;
          },
          set(y) {
            a = typeof y == "string" ? J.normalize(y) : y;
          }
        });
      });
    }
    function wt(i, a) {
      f.aliases[i] && f.aliases[i].length || (f.aliases[i] = [a], Z[a] = !0), f.aliases[a] && f.aliases[a].length || wt(a, i);
    }
    function Se(i, a, p) {
      p && (a = In(a)), (v(i, f.bools) || v(i, f.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(c) {
        return be(i, c);
      }) : be(i, a);
      return v(i, f.counts) && (X(l) || typeof l == "boolean") && (l = Ne()), v(i, f.normalize) && v(i, f.arrays) && (Array.isArray(a) ? l = a.map((c) => J.normalize(c)) : l = J.normalize(a)), l;
    }
    function be(i, a) {
      return !h["parse-positional-numbers"] && i === "_" || !v(i, f.strings) && !v(i, f.bools) && !Array.isArray(a) && (Ht(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !X(a) && v(i, f.numbers)) && (a = Number(a)), a;
    }
    function cn(i) {
      const a = /* @__PURE__ */ Object.create(null);
      At(a, f.aliases, g), Object.keys(f.configs).forEach(function(p) {
        const l = i[p] || a[p];
        if (l)
          try {
            let c = null;
            const $ = J.resolve(J.cwd(), l), d = f.configs[p];
            if (typeof d == "function") {
              try {
                c = d($);
              } catch (y) {
                c = y;
              }
              if (c instanceof Error) {
                G = c;
                return;
              }
            } else
              c = J.require($);
            _e(c);
          } catch (c) {
            c.name === "PermissionDenied" ? G = c : i[p] && (G = Error(ne("Invalid JSON config file: %s", l)));
          }
      });
    }
    function _e(i, a) {
      Object.keys(i).forEach(function(p) {
        const l = i[p], c = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? _e(l, c) : (!ae(P, c.split(".")) || v(c, f.arrays) && h["combine-arrays"]) && R(c, l);
      });
    }
    function an() {
      typeof w < "u" && w.forEach(function(i) {
        _e(i);
      });
    }
    function vt(i, a) {
      if (typeof A > "u")
        return;
      const p = typeof A == "string" ? A : "", l = J.env();
      Object.keys(l).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const $ = c.split("__").map(function(d, y) {
            return y === 0 && (d = d.substring(p.length)), ue(d);
          });
          (a && f.configs[$.join(".")] || !a) && !ae(i, $) && R($.join("."), l[c]);
        }
      });
    }
    function ln(i) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(l) {
        if (!p.has(l) && (a = v(l, f.coercions), typeof a == "function"))
          try {
            const c = be(l, a(i[l]));
            [].concat(f.aliases[l] || [], l).forEach(($) => {
              p.add($), i[$] = c;
            });
          } catch (c) {
            G = c;
          }
      });
    }
    function un(i) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof i[a] > "u" && (i[a] = void 0);
      }), i;
    }
    function At(i, a, p, l = !1) {
      Object.keys(p).forEach(function(c) {
        ae(i, c.split(".")) || (le(i, c.split("."), p[c]), l && (yt[c] = !0), (a[c] || []).forEach(function($) {
          ae(i, $.split(".")) || le(i, $.split("."), p[c]);
        }));
      });
    }
    function ae(i, a) {
      let p = i;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const l = a[a.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function le(i, a, p) {
      let l = i;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(F) {
        F = xt(F), typeof l == "object" && l[F] === void 0 && (l[F] = {}), typeof l[F] != "object" || Array.isArray(l[F]) ? (Array.isArray(l[F]) ? l[F].push({}) : l[F] = [l[F], {}], l = l[F][l[F].length - 1]) : l = l[F];
      });
      const c = xt(a[a.length - 1]), $ = v(a.join("."), f.arrays), d = Array.isArray(p);
      let y = h["duplicate-arguments-array"];
      !y && v(c, f.nargs) && (y = !0, (!X(l[c]) && f.nargs[c] === 1 || Array.isArray(l[c]) && l[c].length === f.nargs[c]) && (l[c] = void 0)), p === Ne() ? l[c] = Ne(l[c]) : Array.isArray(l[c]) ? y && $ && d ? l[c] = h["flatten-duplicate-arrays"] ? l[c].concat(p) : (Array.isArray(l[c][0]) ? l[c] : [l[c]]).concat([p]) : !y && !!$ == !!d ? l[c] = p : l[c] = l[c].concat([p]) : l[c] === void 0 && $ ? l[c] = d ? p : [p] : y && !(l[c] === void 0 || v(c, f.counts) || v(c, f.bools)) ? l[c] = [l[c], p] : l[c] = p;
    }
    function fn(...i) {
      i.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const c = ue(l);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Z[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const c = Ut(l, "-");
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Z[c] = !0);
            }
          }), f.aliases[p].forEach(function(l) {
            f.aliases[l] = [p].concat(f.aliases[p].filter(function(c) {
              return l !== c;
            }));
          }));
        });
      });
    }
    function v(i, a) {
      const p = [].concat(f.aliases[i] || [], i), l = Object.keys(a), c = p.find(($) => l.includes($));
      return c ? a[c] : !1;
    }
    function Ot(i) {
      const a = Object.keys(f);
      return [].concat(a.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(i) : l[i];
      });
    }
    function hn(i, ...a) {
      return [].concat(...a).some(function(l) {
        const c = i.match(l);
        return c && Ot(c[1]);
      });
    }
    function pn(i) {
      if (i.match(Q) || !i.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = i.slice(1).split("");
      for (let c = 0; c < l.length; c++) {
        if (p = i.slice(c + 2), !Ot(l[c])) {
          a = !1;
          break;
        }
        if (l[c + 1] && l[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[c + 1] && l[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ye(i) {
      return h["unknown-options-as-args"] && mn(i);
    }
    function mn(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(Q) || pn(i) ? !1 : !hn(i, /^-+([^=]+?)=[\s\S]*$/, xe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function re(i) {
      return !v(i, f.bools) && !v(i, f.counts) && `${i}` in g ? g[i] : dn(gn(i));
    }
    function dn(i) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[i];
    }
    function gn(i) {
      let a = q.BOOLEAN;
      return v(i, f.strings) ? a = q.STRING : v(i, f.numbers) ? a = q.NUMBER : v(i, f.bools) ? a = q.BOOLEAN : v(i, f.arrays) && (a = q.ARRAY), a;
    }
    function X(i) {
      return i === void 0;
    }
    function $n() {
      Object.keys(f.counts).find((i) => v(i, f.arrays) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : v(i, f.nargs) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(Et, P),
      configuration: h,
      defaulted: Object.assign({}, yt),
      error: G,
      newAliases: Object.assign({}, Z)
    };
  }
}
function Wn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let r = o + 1; r < t.length; r++)
        if (t[o].filter(function(h) {
          return t[r].indexOf(h) !== -1;
        }).length) {
          t[o] = t[o].concat(t[r]), t.splice(r, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(u, h, g) {
      return g.indexOf(u) === h;
    });
    const r = o.pop();
    r !== void 0 && typeof r == "string" && (n[r] = o);
  }), n;
}
function Ne(e) {
  return e !== void 0 ? e + 1 : 1;
}
function xt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function In(e) {
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
var Re, je, Le;
const Ct = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, St = (je = (Re = process == null ? void 0 : process.versions) === null || Re === void 0 ? void 0 : Re.node) !== null && je !== void 0 ? je : (Le = process == null ? void 0 : process.version) === null || Le === void 0 ? void 0 : Le.slice(1);
if (St && Number(St.match(/^([^.]+)/)[1]) < Ct)
  throw Error(`yargs parser supports a minimum Node.js version of ${Ct}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Bn = process ? process.env : {}, Vt = new Fn({
  cwd: process.cwd,
  env: () => Bn,
  format: kt,
  normalize: En,
  resolve: ce,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(bt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), me = function(t, n) {
  return Vt.parse(t.slice(), n).argv;
};
me.detailed = function(e, t) {
  return Vt.parse(e.slice(), t);
};
me.camelCase = ue;
me.decamelize = Ut;
me.looksLikeNumber = Ht;
const Mn = {
  right: Vn,
  center: Gn
}, kn = 0, Ee = 1, zn = 2, we = 3;
class Dn {
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
      this.div(...o.map((r, u) => ({
        text: r.trim(),
        padding: this.measurePadding(r),
        width: u === 0 && o.length > 1 ? s : void 0
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
      s.forEach((u, h) => {
        const { width: g } = t[h], w = this.negatePadding(t[h]);
        let A = u;
        if (w > B.stringWidth(u) && (A += " ".repeat(w - B.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const L = Mn[t[h].align];
          A = L(A, w), B.stringWidth(A) < w && (A += " ".repeat((g || 0) - B.stringWidth(A) - 1));
        }
        const _ = t[h].padding || [0, 0, 0, 0];
        _[we] && (r += " ".repeat(_[we])), r += _t(t[h], A, "| "), r += A, r += _t(t[h], A, " |"), _[Ee] && (r += " ".repeat(_[Ee])), o === 0 && n.length > 0 && (r = this.renderInline(r, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, r = n.text, u = B.stringWidth(r.trimRight());
    return n.span ? this.wrap ? o < u ? t : (n.hidden = !0, r.trimRight() + " ".repeat(o - u) + t.trimLeft()) : (n.hidden = !0, r + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((r, u) => {
      r.width = s[u], this.wrap ? o = B.wrap(r.text, this.negatePadding(r), { hard: !0 }).split(`
`) : o = r.text.split(`
`), r.border && (o.unshift("." + "-".repeat(this.negatePadding(r) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(r) + 2) + "'")), r.padding && (o.unshift(...new Array(r.padding[kn] || 0).fill("")), o.push(...new Array(r.padding[zn] || 0).fill(""))), o.forEach((h, g) => {
        n[g] || n.push([]);
        const w = n[g];
        for (let A = 0; A < u; A++)
          w[A] === void 0 && w.push("");
        w.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[we] || 0) + (t.padding[Ee] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((u) => u.width || B.stringWidth(u.text));
    let n = t.length, s = this.width;
    const o = t.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), r = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(r, Un(t[h])) : u);
  }
}
function _t(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Un(e) {
  const t = e.padding || [], n = 1 + (t[we] || 0) + (t[Ee] || 0);
  return e.border ? n + 4 : n;
}
function Hn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Vn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Gn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let B;
function Kn(e, t) {
  return B = t, new Dn({
    width: e?.width || Hn(),
    wrap: e?.wrap
  });
}
const Gt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Kt(e) {
  return e.replace(Gt, "");
}
function qn(e, t) {
  const [n, s] = e.match(Gt) || ["", ""];
  e = Kt(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Zn(e) {
  return Kn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Kt,
    wrap: qn
  });
}
function Qn(e, t) {
  let n = ce(".", e), s;
  for (zt(n).isDirectory() || (n = Te(n)); ; ) {
    if (s = t(n, On(n)), s)
      return ce(n, s);
    if (n = Te(s = n), s === n)
      break;
  }
}
const Yn = {
  fs: {
    readFileSync: bt,
    writeFile: xn
  },
  format: kt,
  resolve: ce,
  exists: (e) => {
    try {
      return zt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class Xn {
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
    let u = o === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: r
    })) : r();
    const h = [u];
    return ~u.indexOf("%d") && h.push(o), K.format.apply(K.format, h.concat(t));
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
      const u = n[r + 1];
      s += o, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, r = n.cb, u = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    K.fs.writeFile(u, h, "utf-8", function(g) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), r(g);
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
function Jn(e, t) {
  K = t;
  const n = new Xn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const es = (e) => Jn(e, Yn), ts = "require is not supported by ESM", Nt = "loading a directory of commands is not supported yet for ESM";
let he;
try {
  he = _n(import.meta.url);
} catch {
  he = process.cwd();
}
const ns = he.substring(0, he.lastIndexOf("node_modules"));
Cn, Sn, yn, ns || process.cwd(), wn, Te, vn, An, ce, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, bt, es({
  directory: ce(he, "../../../locales"),
  updateFiles: !1
});
const D = "\x1B[44m", x = "\x1B[43m", z = "\x1B[41m", qt = "\x1B[42m", b = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", m = "\x1B[0m", ss = {
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
}, se = Object.keys(ss), Fe = [], We = 100, os = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > We && Fe.push({ filePath: t, message: `${n.length > We * 2 ? z : x}(${n.length} lines)${b}` });
}, rs = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${We} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], is = (e, t) => {
  !e || e.setup || Ie.push({ filePath: t, message: `${x}Plain <script> block${b} found` });
}, cs = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, as = /^(\(.*\)|\\?.)$/;
function te(e) {
  const t = e.toString();
  return as.test(t) ? t : `(?:${t})`;
}
const ls = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, us = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(ls, "$1$2")})`);
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
    grouped: () => E(`${e}`.replace(us, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const fs = /[.*+?^${}()|[\]\\/]/g;
function pe(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function k(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function hs(...e) {
  return E(`(?:${e.map((t) => U(t)).join("|")})`);
}
const ve = E(".");
E("\\b\\w+\\b");
const V = E("\\w"), M = E("\\b"), ps = E("\\d"), j = E("\\s"), Zt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Qt = E("\\t"), Yt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Y(...e) {
  return E(`${te(U(...e))}?`);
}
function U(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(fs, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${te(U(...e))}+`);
}
const H = "i", T = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(U(...e).toString(), [...t || ""].join(""));
}, Be = [], ms = (e, t) => {
  if (!e)
    return;
  const n = N(M, "else", M, [T, H]), s = e.content.match(n);
  s?.length && Be.push({ filePath: t, message: `else clauses found ${z}(${s.length})${b}` });
}, ds = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${m}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], gs = 5, $s = 10, bs = (e, t) => {
  if (!e)
    return;
  const n = N(M, "if", M, [T, H]), s = N(M, "else", M, [T, H]), o = N(M, "for", M, [T, H]), r = N(M, "while", M, [T, H]), u = N(M, "case", M, [T, H]), h = e.content.match(n), g = e.content.match(s), w = e.content.match(o), A = e.content.match(r), _ = e.content.match(u), L = (h?.length || 0) + (g?.length || 0) + (w?.length || 0) + (A?.length || 0) + (_?.length || 0);
  L > gs && Me.push({ filePath: t, message: `${L > $s ? z : x}(${L})${b}` });
}, ys = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${O}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], Es = (e) => {
  if (e.includes("pages"))
    return;
  const t = oe.basename(e);
  if (t === "App.vue")
    return;
  const n = N(Zt.uppercase);
  t.slice(1).match(n)?.length || ke.push({ filePath: e, message: `Component name is ${x}single word${b}` });
}, ws = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${m}`,
      description: `👉 ${O}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], vs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ze.push({
      filePath: t,
      message: `${x}global style${b} used`
    });
  });
}, As = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${m}`,
      description: `👉 ${O}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], Os = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [T, H]);
  e.content.match(n)?.length && De.push({ filePath: t, message: `${x}Props type${b} not defined` });
}, xs = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${m}`,
      description: `👉 ${O}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, I = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h, g) => g >= n && h.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((u, h) => u + h.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, Ue = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = N(
    "<",
    S(k(">")),
    " v-if",
    S(k(">")),
    " v-for",
    S(k(">")),
    ">",
    [T, H]
  ), s = N(
    "<",
    S(k(">")),
    " v-for",
    S(k(">")),
    " v-if",
    S(k(">")),
    ">",
    [T, H]
  ), o = e.content.match(n), r = e.content.match(s);
  if (o?.length || r?.length) {
    const u = o?.length ? o[0] : r?.length ? r[0] : "", h = I(e.content, u);
    Ue.push({ filePath: t, message: `line #${h} ${x}v-if used with v-for${b}` });
  }
}, Ss = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${O}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], _s = (e, t) => {
  if (!e)
    return;
  const n = N("<", S(k(">")), " v-for", S(k(">")), ">", [
    T,
    H
  ]), s = e.content.match(n);
  s?.length && (s.some((r) => r.includes(":key")) || He.push({ filePath: t, message: `v-for used ${x}without a key${b}` }));
}, Ns = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Rs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = oe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, r = t.match(o);
  !s?.length && !r?.length && Ve.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${b}` });
}, js = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ls = /^[a-z]+([A-Z][a-z]*)*$/, Ps = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((r) => r.split(":")[0]).filter((r) => r.length).filter((r) => !Ls.test(r)).length && Ge.push({ filePath: t, message: `prop names are ${x}not camelCased${b}` });
}, Ts = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${O}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Fs = 40, Ws = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Fs) {
      const r = I(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ke.push({
        filePath: t,
        message: `line #${r} ${x}${u}${b}`
      });
    }
  });
}, Is = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${O}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Bs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(V),
    Y(S(pe(` 	
\r`))),
    S(k("/>")),
    Y(S(pe(` 	
\r`))),
    Y("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const r = N(":", S(V), Y(" "), "=", Y(" "), k(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(r);
    if (h?.length) {
      const g = I(e.source, u);
      qe.push({ filePath: t, message: `line #${g} ${x}${h}${b}` });
    }
  });
}, Ms = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${O}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], ks = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(Zt.uppercase, V),
    Y(Yt, Qt),
    Y(S(k(">"))),
    "></",
    S(V),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((r) => {
    const u = I(e.source, r), h = r.split(`
`).at(-1)?.trim() || "";
    Ze.push({ filePath: t, message: `line #${u} ${x}${h}${b}` });
  });
}, zs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${O}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Rt = [], Ds = ["v-slot", "v-bind", "v-on"], Us = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ds.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Qe.push({ filePath: t, message: `line #${o} ${x}${s}${b}` }), Rt.some((r) => r.filePath === t) || Rt.push({ filePath: t });
    }
  });
}, Hs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Vs = 3, Gs = (e) => {
  const t = N(
    S(k("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = N(
      pe("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [T]
    ), r = s.match(o);
    (!r || r.length < Vs) && Ye.push({ filePath: e, message: `${s} is not a ${x}full word.${b}` });
  }
}, Ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${m}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], qs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), r = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((g) => g.index !== -1);
  u.every((g, w) => w === 0 ? !0 : u[w - 1].index < g.index) || Xe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${b}` });
}, Zs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${m}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], jt = [
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
], Qs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const u = r[1], h = r[2];
    if (h) {
      const w = Array.from(h.matchAll(o), (_) => _[1]).filter((_) => jt.includes(_));
      let A = -1;
      for (const _ of w) {
        const L = jt.indexOf(_);
        if (L !== -1 && L < A) {
          Je.push({
            filePath: t,
            message: `tag has attributes out of order ${x}(${u})${b}`
          });
          break;
        }
        A = L;
      }
    }
  }
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Xs = 5, Js = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", Y("<"), Y("("), "{", S(ve), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Xs && et.push({ filePath: t, message: `props found ${z}(${o})${b}` });
  }
}, eo = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${m}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Xt = 20, nt = 5, Lt = 8;
function to(e, t, n) {
  t.split(`
`).length > Xt && tt.push({ filePath: n, message: `function ${z}(${io(e)})${b} is too long` });
}
function no(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.slice(s, s + nt) === "const")
    for (s += nt; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function so(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function oo(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function ro(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const r = e[o];
    r === "{" && n++, r === "}" && n--, s += r, o++;
  }
  return { body: s, end: o };
}
function io(e) {
  return e.replace(/^const\s*/, "");
}
const co = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let r = "", u = "", h = !1;
    if (n.slice(o, o + Lt) === "function" && (o += Lt, h = !0, r = no(n, o), o = so(n, o)), n.slice(o, o + nt) === "const") {
      const g = oo(n, o);
      g && (h = !0, r = g.name, o = g.bodyStart);
    }
    if (h) {
      const { body: g, end: w } = ro(n, o);
      u = g, o = w, to(r, u, t);
    }
    h || o++;
  }
}, ao = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${m}`,
      description: `👉 ${O}Functions must be shorter than ${Xt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], Jt = 3, Pt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Jt && st.push({ filePath: n, message: `function ${x}${e}${b} has ${x}${s.length}${b} parameters` });
}, lo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Pt(s[1], s[2], t) : s[3] && Pt(s[3], s[4], t);
}, uo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${m}`,
      description: `👉 ${O}Max number of function parameters should be ${Jt}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], fo = (e, t) => {
  if (!e)
    return;
  const n = N(
    "defineProps(",
    j.times.any(),
    "[",
    j.times.any(),
    S(pe(`'"`), S(V), pe(`'"`), j.times.any(), Y(",", j.times.any())),
    "]",
    j.times.any(),
    ")",
    [T]
  ), s = N(
    "<",
    S(V).grouped(),
    j,
    k(">").times.any(),
    ":",
    S(V).grouped(),
    j.times.any(),
    "=",
    j.times.any(),
    '"props.',
    S(V).grouped(),
    '"',
    [T]
  );
  let o;
  const r = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((g) => r.add(g));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], g = u[2], w = u[3];
    r.has(w) && g === w && ot.push({
      filePath: t,
      message: `Prop ${x}(${w})${b} is being drilled through ${x}${h}${b} component unmodified.`
    });
  }
}, ho = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${m}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], en = 4, po = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < en && rt.push({ filePath: t, message: `${z}(${o})${b}` });
  }
}, mo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${m}`,
      description: `👉 ${O}Variable names must have a minimum length of ${en}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tn = [], Ae = [], go = 5, $o = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > go) {
      const r = o.split(`
`)[0], u = I(e.content, r);
      tn.push({ filePath: t, message: `line #${u} ${x}computed${b}` }), Ae.push({ filePath: t }), Ae.some((h) => h.filePath === t) || Ae.push({ filePath: t });
    }
  });
}, bo = () => {
  const e = [];
  return Ae.length > 0 && tn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], yo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const r = I(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    it.push({ filePath: t, message: `line #${r} ${x}(${u})${b}` });
  });
}, Eo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${m}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Oe = [], wo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = N(U("$parent").or("getCurrentInstance"), [T]), r = e.content.match(n), u = e.content.match(s);
  if (u) {
    const g = u[1].split(".")[0];
    if ((r ? r[1] : "").includes(g)) {
      const A = I(e.content.trim(), g);
      Oe.push({
        filePath: t,
        message: `line #${A} ${x}(${g})${b}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const g = I(e.content.trim(), h[0]);
    Oe.push({
      filePath: t,
      message: `line #${g} ${x}(${h[0]})${b}`
    });
  }
}, vo = () => {
  const e = [];
  return Oe.length > 0 && Oe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Tt = 5, Ao = 3, Oo = (e, t) => {
  if (!e)
    return;
  const n = N(Qt.times.atLeast(Tt).or(j.times.atLeast(Ao * Tt)), [
    T,
    H
  ]);
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    ct.push({
      filePath: t,
      message: `line #${r} ${x}indentation: ${o.length}${b}`
    });
  });
}, xo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${m}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, at = [], Co = (e, t) => {
  if (!e)
    return;
  const n = N("<a", M, [T, H]), s = e.content.match(n);
  s?.length && at.push({ filePath: t, message: `${s?.length} ${x}html link found${b}` });
}, So = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${m}`,
      description: `👉 ${O}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], _o = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, r) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[r + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && lt.push({
        filePath: t,
        message: `line #${r} if statement without curly braces: ${z}${u}${b}`
      });
    }
  });
}, No = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${m}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], Ro = (e, t) => {
  if (!e)
    return;
  const n = N(S(ps).as("magicNumber"), hs(")", Yt), [T]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s.groups?.magicNumber;
    if (r) {
      const u = I(e.content, r, o);
      ut.push({
        filePath: t,
        message: `line #${u} ${x}magic number: ${r}${b}`
      }), o = u;
    }
  }
}, jo = () => {
  const e = [];
  return ut.length && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${m}`,
      description: `👉 ${O}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ft = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], r = s[2];
    r.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && r.split(`
`).length === 1 && ft.push({ filePath: t, message: `Element ${x}<${o}>${b} should have its attributes on separate lines` });
  }
}, Po = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, To = [
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
], ht = [], Fo = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const r = o[1];
      To.includes(r) && ht.push({ filePath: t, message: `${x}(${r})${b}` });
    }
  });
}, Wo = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], Io = (e, t) => {
  if (!e)
    return;
  const n = N(S(ve), j, "?", j, S(ve), j, ":", j, S(ve));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const r = I(e.content, o);
      pt.push({
        filePath: t,
        message: `line #${r} has ${x}nested ternary${b}`
      });
    }
  });
}, Bo = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${m}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, mt = [], Mo = (e, t) => {
  if (!e)
    return;
  const n = N('v-for="(', j.times.any(), S(V).grouped(), j.times.any(), ",", j.times.any(), S(V).grouped(), j.times.any(), ")", S(j), "in", S(j), S(V).grouped(), [T]), s = N(':key="', j.times.any(), S(V).grouped(), j.times.any(), '"', [T]), o = [...e.content.matchAll(n)], r = [...e.content.matchAll(s)];
  o.forEach((u) => {
    const [h, g, w, A] = u;
    r.forEach((_) => {
      const L = _[1];
      if (L === w) {
        const Z = I(e.content.trim(), L);
        mt.push({
          filePath: t,
          message: `line #${Z} ${x}index is being used as :key in v-for${b}`
        });
      }
    });
  });
}, ko = () => {
  const e = [];
  return mt.length > 0 && mt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], zo = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], r = s[1], u = I(e.content.trim(), o);
    dt.push({
      filePath: t,
      message: `line #${u} zero length comparison found ${x}(${r})${b}`
    });
  }
}, Do = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${O}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], Uo = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^\}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:\[[^\]]*\]|\{[^\}]*\})?\s*\)/g;
  e.content.match(n)?.forEach((o) => {
    const r = I(e.content, o);
    gt.push({
      filePath: t,
      message: `line #${r} ${x}props destructuring found: ${o}${b}`
    });
  });
}, Ho = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${O}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Vo = (e, t, n) => {
  const s = {}, o = ({ file: g, rule: w, title: A, description: _, message: L }) => {
    const Z = e === "rule" ? w : g;
    s[Z] || (s[Z] = []), s[Z].push({ file: g, rule: w, title: A, description: _, message: L });
  }, r = (g) => {
    g().forEach((A) => {
      o(A);
    });
  };
  r(ws), r(xs), r(Ns), r(Ss), r(As), r(js), r(Eo), r(Hs), r(Ks), r(Po), r(Ts), r(Ms), r(zs), r(bo), r(Is), r(Zs), r(Ys), r(vo), r(Wo), r(ys), r(xo), r(ds), r(ao), r(So), r(No), r(jo), r(Bo), r(Ho), r(uo), r(cs), r(ho), r(rs), r(mo), r(eo), r(ko), r(Do);
  const u = [];
  return Object.keys(s).sort((g, w) => {
    const A = s[g].length, _ = s[w].length;
    return t === "desc" ? _ - A : A - _;
  }).forEach((g) => {
    console.log(`
 - ${g}`), s[g].forEach((w) => {
      const A = w.message.includes(z);
      if (u.some((_) => _.file === w.file)) {
        const _ = u.find((L) => L.file === w.file);
        _ && (A ? _.errors++ : _.warnings++);
      } else
        u.push({ file: w.file, errors: A ? 1 : 0, warnings: A ? 0 : 1 });
      n === "error" && !A || (console.log(e === "file" ? `   Rule: ${w.rule}` : `   File: ${w.file}`), console.log(`   Description: ${w.description}`), console.log(`   Message: ${w.message || "🚨"}
`));
    });
  }), u;
}, Go = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && (Os(s, t), o && (Es(t), vs(e.styles, t), _s(e.template, t), Cs(e.template, t))), n.includes("vue-strong") && ($o(s, t), o && (yo(s, t), Ps(s, t), Rs(t), ks(e, t), Ws(e.template, t), Bs(e, t), Us(e, t), Gs(t), Lo(e.template, t))), n.includes("vue-recommended") && o && (qs(e.source, t), Qs(e.template, t)), n.includes("vue-caution") && o && (wo(s, t), Fo(e.styles, t)), n.includes("rrd") && (bs(s, t), Oo(s, t), ms(s, t), co(s, t), _o(s, t), Ro(s, t), Io(s, t), lo(s, t), fo(s, t), os(s, t), po(s, t), Js(s, t), Uo(s, t), zo(s, t), o && (Co(e.template, t), is(e.script, t), Mo(e.template, t)));
}, Ko = 1.5, Ft = 75, Wt = 85, It = 95, qo = ["rule", "file"], Zo = ["asc", "desc"], Qo = ["all", "error"], Yo = {
  groupBy: qo,
  orderBy: Zo,
  outputLevel: Qo
};
function Pe(e, t) {
  const n = Yo[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function Xo(e, t, n) {
  const { errors: s, warnings: o } = e.reduce((u, { errors: h, warnings: g }) => ({ errors: u.errors + h, warnings: u.warnings + g }), { errors: 0, warnings: 0 });
  console.log(`Found ${z}${Intl.NumberFormat("en-US").format(s)} errors${b}, and ${x}${Intl.NumberFormat("en-US").format(o)} warnings${b}, ${D}${Intl.NumberFormat("en-US").format(t)} lines${b} of code in ${D}${Intl.NumberFormat("en-US").format(n)} files${b}`);
  const r = Math.ceil((1 - (s * Ko + o) / t) * 100);
  return r < Ft && console.log(`${z}Code health is LOW: ${r}%${b}`), r >= Ft && r < Wt && console.log(`${x}Code health is MEDIUM ${r}%${b}`), r >= Wt && r < It && console.log(`${D}Code health is OK: ${r}%${b}`), r >= It && console.log(`${qt}Code health is GOOD: ${r}%${b}`), { errors: s, warnings: o };
}
let $t = 0, nn = 0, sn = [];
const Jo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], on = async (e) => {
  if (!(await ie.stat(e)).isDirectory()) {
    await Bt(e, e);
    return;
  }
  const n = await ie.readdir(e);
  for (const s of n) {
    const o = oe.join(e, s);
    (await ie.stat(o)).isDirectory() && (Jo.some((u) => o.includes(u)) || await on(o)), await Bt(o, o);
  }
}, Bt = async (e, t) => {
  if (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js")) {
    $t++;
    const n = await ie.readFile(t, "utf-8");
    nn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Nn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), Go(s, t, sn);
  }
}, er = async ({ dir: e, level: t, apply: n = [], groupBy: s, orderBy: o }) => {
  const r = se.filter((w) => !n.includes(w));
  console.log(`

${D}Analyzing Vue, TS and JS files in ${e}${b}`), console.log(`Applying ${D}${n.length}${b} rulesets ${D}${n}${b}
    Ignoring ${D}${r.length}${b} rulesets ${D}${r}${b}
    Output level ${D}${t}${b}
    Grouping by ${D}${s}${b}
    Ordering ${D}${o}${b}`), sn = n, await on(e), console.log(`Found ${D}${$t}${b} files`);
  const u = Vo(s, o, t), { errors: h, warnings: g } = Xo(u, nn, $t);
  !h && !g && console.log(`${qt}No code smells detected!${b}`);
}, tr = async () => {
  let e = process.cwd();
  for (; e !== oe.parse(e).root; ) {
    const t = oe.join(e, "package.json");
    return await ie.access(t), e;
  }
  e = oe.dirname(e);
}, rn = await tr();
rn || (console.error(`
${z}Cannot find project root.${b}

`), process.exit(1));
let ee = {
  path: "./src",
  apply: void 0,
  // RULESETS.join(','),
  ignore: void 0,
  group: "rule",
  level: "all",
  order: "desc"
};
try {
  const e = oe.join(rn, "vue-mess-detector.json"), t = JSON.parse(await ie.readFile(e, "utf-8"));
  ee = { ...ee, ...t }, console.log(`👉 Using configuration from ${e}`);
} catch {
  console.log("👉 Using default configuration");
}
bn(Ln(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(ee).positional("path", {
    describe: "path to the Vue files",
    default: ee.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: se,
    coerce: Mt("apply"),
    group: "Filter Rulesets:",
    default: ee.apply
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Pe(t, "groupBy"),
    default: ee.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => Pe(t, "outputLevel"),
    default: ee.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: se,
    coerce: Mt("ignore"),
    default: ee.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => Pe(t, "orderBy"),
    default: ee.order,
    group: "Order Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${z}Cannot use both --ignore and --apply options together.${b}

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...se];
    e.apply && (t = e.apply), e.ignore && (t = se.filter((n) => !e.ignore.includes(n))), er({ dir: e.path, level: e.level, apply: t, groupBy: e.group, orderBy: e.order });
  }
).help().argv;
function Mt(e) {
  return (t) => {
    const n = t?.split(",");
    if (!n)
      return;
    const s = n.filter((o) => !se.includes(o));
    return s.length > 0 && (console.error(
      `
${z}Invalid ${e} values: ${s.join(
        ", "
      )}${b}. 
${O}Allowed values are: ${[...se].join(", ")}${m}

`
    ), process.exit(1)), n;
  };
}
