import ae from "node:fs/promises";
import oe from "node:path";
import vn from "yargs";
import { format as Vt, inspect as On } from "util";
import { normalize as An, resolve as le, dirname as Ie, basename as xn, extname as Sn, relative as Cn } from "path";
import { readFileSync as vt, statSync as Gt, readdirSync as _n, writeFile as Nn } from "fs";
import { notStrictEqual as jn, strictEqual as Rn } from "assert";
import { fileURLToPath as Ln } from "url";
import { parse as Fn } from "@vue/compiler-sfc";
class pe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, pe);
  }
}
function Kt() {
  return Pn() ? 0 : 1;
}
function Pn() {
  return Tn() && !process.defaultApp;
}
function Tn() {
  return !!process.versions.electron;
}
function Wn(e) {
  return e.slice(Kt() + 1);
}
function In() {
  return process.argv[Kt()];
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
    for (let i = o ? o[0].length : 0; i < e.length; i++) {
      let l = e.charAt(i);
      s && (s = !1, l = l.toUpperCase()), i !== 0 && (l === "-" || l === "_") ? s = !0 : l !== "-" && l !== "_" && (n += l);
    }
    return n;
  }
}
function qt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const i = n.charAt(o), l = e.charAt(o);
    i !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
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
function Mn(e) {
  if (Array.isArray(e))
    return e.map((l) => typeof l != "string" ? l + "" : l);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const i = [];
  for (let l = 0; l < e.length; l++) {
    if (n = s, s = e.charAt(l), s === " " && !o) {
      n !== " " && t++;
      continue;
    }
    s === o ? o = null : (s === "'" || s === '"') && !o && (o = s), i[t] || (i[t] = ""), i[t] += s;
  }
  return i;
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
let ee;
class Bn {
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
    }, n), o = Mn(t), i = typeof t == "string", l = kn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), b = Object.assign(/* @__PURE__ */ Object.create(null), s.default), O = s.configObjects || [], v = s.envPrefix, _ = h["populate--"], N = _ ? "--" : "_", Q = /* @__PURE__ */ Object.create(null), re = /* @__PURE__ */ Object.create(null), ne = s.__ || ee.format, f = {
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
    }, Y = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ne = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(u) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[u];
      }).filter(Boolean).pop();
      p && (f[p][a] = !0), f.arrays[a] = !0, f.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(r) {
      f.bools[r] = !0, f.keys.push(r);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(r) {
      f.strings[r] = !0, f.keys.push(r);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(r) {
      f.numbers[r] = !0, f.keys.push(r);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(r) {
      f.counts[r] = !0, f.keys.push(r);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(r) {
      f.normalize[r] = !0, f.keys.push(r);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([r, a]) => {
      typeof a == "number" && (f.nargs[r] = a, f.keys.push(r));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([r, a]) => {
      typeof a == "function" && (f.coercions[r] = a, f.keys.push(r));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(r) {
      f.configs[r] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([r, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (f.configs[r] = a);
    })), dn(s.key, l, s.default, f.arrays), Object.keys(b).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        b[a] = b[r];
      });
    });
    let G = null;
    wn();
    let $e = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), At = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], p = a.replace(/^-{3,}/, "---");
      let u, c, $, d, y, T;
      if (a !== "--" && /^-/.test(a) && we(a))
        je(a);
      else if (p.match(/^---+(=|$)/)) {
        je(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        d = a.match(/^--?([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && (w(d[1], f.arrays) ? r = ye(r, d[1], o, d[2]) : w(d[1], f.nargs) !== !1 ? r = be(r, d[1], o, d[2]) : R(d[1], d[2], !0));
      else if (a.match(Ne) && h["boolean-negation"])
        d = a.match(Ne), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], R(c, w(c, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        d = a.match(/^--?(.+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], w(c, f.arrays) ? r = ye(r, c, o) : w(c, f.nargs) !== !1 ? r = be(r, c, o) : (y = o[r + 1], y !== void 0 && (!y.match(/^-/) || y.match(Y)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), r++) : R(c, ie(c))));
      else if (a.match(/^-.\..+=/))
        d = a.match(/^-([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && R(d[1], d[2]);
      else if (a.match(/^-.\..+/) && !a.match(Y))
        y = o[r + 1], d = a.match(/^-(.\..+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], y !== void 0 && !y.match(/^-/) && !w(c, f.bools) && !w(c, f.counts) ? (R(c, y), r++) : R(c, ie(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Y)) {
        $ = a.slice(1, -1).split(""), u = !1;
        for (let W = 0; W < $.length; W++) {
          if (y = a.slice(W + 2), $[W + 1] && $[W + 1] === "=") {
            T = a.slice(W + 3), c = $[W], w(c, f.arrays) ? r = ye(r, c, o, T) : w(c, f.nargs) !== !1 ? r = be(r, c, o, T) : R(c, T), u = !0;
            break;
          }
          if (y === "-") {
            R($[W], y);
            continue;
          }
          if (/[A-Za-z]/.test($[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && w(y, f.bools) === !1) {
            R($[W], y), u = !0;
            break;
          }
          if ($[W + 1] && $[W + 1].match(/\W/)) {
            R($[W], y), u = !0;
            break;
          } else
            R($[W], ie($[W]));
        }
        c = a.slice(-1)[0], !u && c !== "-" && (w(c, f.arrays) ? r = ye(r, c, o) : w(c, f.nargs) !== !1 ? r = be(r, c, o) : (y = o[r + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(Y)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), r++) : R(c, ie(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Y) && w(a.slice(1), f.bools))
        c = a.slice(1), R(c, ie(c));
      else if (a === "--") {
        $e = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        $e = o.slice(r);
        break;
      } else
        je(a);
    }
    St(F, !0), St(F, !1), fn(F), hn(), Ct(F, f.aliases, b, !0), pn(F), h["set-placeholder-key"] && mn(F), Object.keys(f.counts).forEach(function(r) {
      ue(F, r.split(".")) || R(r, 0);
    }), _ && $e.length && (F[N] = []), $e.forEach(function(r) {
      F[N].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(F).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete F[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(l).map((r) => l[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete F[r.split(".").map((a) => he(a)).join(".")], delete F[r];
    });
    function je(r) {
      const a = Ee("_", r);
      (typeof a == "string" || typeof a == "number") && F._.push(a);
    }
    function be(r, a, p, u) {
      let c, $ = w(a, f.nargs);
      if ($ = typeof $ != "number" || isNaN($) ? 1 : $, $ === 0)
        return J(u) || (G = Error(ne("Argument unexpected for: %s", a))), R(a, ie(a)), r;
      let d = J(u) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + d < $ && (G = Error(ne("Not enough arguments following: %s", a))), d = $;
      else {
        for (c = r + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Y) || we(p[c])); c++)
          d++;
        d < $ && (G = Error(ne("Not enough arguments following: %s", a)));
      }
      let y = Math.min(d, $);
      for (!J(u) && y > 0 && (R(a, u), y--), c = r + 1; c < y + r + 1; c++)
        R(a, p[c]);
      return r + y;
    }
    function ye(r, a, p, u) {
      let c = [], $ = u || p[r + 1];
      const d = w(a, f.nargs);
      if (w(a, f.bools) && !/^(true|false)$/.test($))
        c.push(!0);
      else if (J($) || J(u) && /^-/.test($) && !Y.test($) && !we($)) {
        if (b[a] !== void 0) {
          const y = b[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        J(u) || c.push(Re(a, u, !0));
        for (let y = r + 1; y < p.length && !(!h["greedy-arrays"] && c.length > 0 || d && typeof d == "number" && c.length >= d || ($ = p[y], /^-/.test($) && !Y.test($) && !we($))); y++)
          r = y, c.push(Re(a, $, i));
      }
      return typeof d == "number" && (d && c.length < d || isNaN(d) && c.length === 0) && (G = Error(ne("Not enough arguments following: %s", a))), R(a, c), r;
    }
    function R(r, a, p = i) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const $ = r.split(".").map(function(d) {
          return he(d);
        }).join(".");
        xt(r, $);
      }
      const u = Re(r, a, p), c = r.split(".");
      fe(F, c, u), f.aliases[r] && f.aliases[r].forEach(function($) {
        const d = $.split(".");
        fe(F, d, u);
      }), c.length > 1 && h["dot-notation"] && (f.aliases[c[0]] || []).forEach(function($) {
        let d = $.split(".");
        const y = [].concat(c);
        y.shift(), d = d.concat(y), (f.aliases[r] || []).includes(d.join(".")) || fe(F, d, u);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(d) {
        Object.defineProperty(At, d, {
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
    function xt(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], Q[a] = !0), f.aliases[a] && f.aliases[a].length || xt(a, r);
    }
    function Re(r, a, p) {
      p && (a = zn(a)), (w(r, f.bools) || w(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let u = Array.isArray(a) ? a.map(function(c) {
        return Ee(r, c);
      }) : Ee(r, a);
      return w(r, f.counts) && (J(u) || typeof u == "boolean") && (u = Fe()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(a) ? u = a.map((c) => ee.normalize(c)) : u = ee.normalize(a)), u;
    }
    function Ee(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(a) && (Zt(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !J(a) && w(r, f.numbers)) && (a = Number(a)), a;
    }
    function fn(r) {
      const a = /* @__PURE__ */ Object.create(null);
      Ct(a, f.aliases, b), Object.keys(f.configs).forEach(function(p) {
        const u = r[p] || a[p];
        if (u)
          try {
            let c = null;
            const $ = ee.resolve(ee.cwd(), u), d = f.configs[p];
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
              c = ee.require($);
            Le(c);
          } catch (c) {
            c.name === "PermissionDenied" ? G = c : r[p] && (G = Error(ne("Invalid JSON config file: %s", u)));
          }
      });
    }
    function Le(r, a) {
      Object.keys(r).forEach(function(p) {
        const u = r[p], c = a ? a + "." + p : p;
        typeof u == "object" && u !== null && !Array.isArray(u) && h["dot-notation"] ? Le(u, c) : (!ue(F, c.split(".")) || w(c, f.arrays) && h["combine-arrays"]) && R(c, u);
      });
    }
    function hn() {
      typeof O < "u" && O.forEach(function(r) {
        Le(r);
      });
    }
    function St(r, a) {
      if (typeof v > "u")
        return;
      const p = typeof v == "string" ? v : "", u = ee.env();
      Object.keys(u).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const $ = c.split("__").map(function(d, y) {
            return y === 0 && (d = d.substring(p.length)), he(d);
          });
          (a && f.configs[$.join(".")] || !a) && !ue(r, $) && R($.join("."), u[c]);
        }
      });
    }
    function pn(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(u) {
        if (!p.has(u) && (a = w(u, f.coercions), typeof a == "function"))
          try {
            const c = Ee(u, a(r[u]));
            [].concat(f.aliases[u] || [], u).forEach(($) => {
              p.add($), r[$] = c;
            });
          } catch (c) {
            G = c;
          }
      });
    }
    function mn(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function Ct(r, a, p, u = !1) {
      Object.keys(p).forEach(function(c) {
        ue(r, c.split(".")) || (fe(r, c.split("."), p[c]), u && (re[c] = !0), (a[c] || []).forEach(function($) {
          ue(r, $.split(".")) || fe(r, $.split("."), p[c]);
        }));
      });
    }
    function ue(r, a) {
      let p = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const u = a[a.length - 1];
      return typeof p != "object" ? !1 : u in p;
    }
    function fe(r, a, p) {
      let u = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(T) {
        T = Nt(T), typeof u == "object" && u[T] === void 0 && (u[T] = {}), typeof u[T] != "object" || Array.isArray(u[T]) ? (Array.isArray(u[T]) ? u[T].push({}) : u[T] = [u[T], {}], u = u[T][u[T].length - 1]) : u = u[T];
      });
      const c = Nt(a[a.length - 1]), $ = w(a.join("."), f.arrays), d = Array.isArray(p);
      let y = h["duplicate-arguments-array"];
      !y && w(c, f.nargs) && (y = !0, (!J(u[c]) && f.nargs[c] === 1 || Array.isArray(u[c]) && u[c].length === f.nargs[c]) && (u[c] = void 0)), p === Fe() ? u[c] = Fe(u[c]) : Array.isArray(u[c]) ? y && $ && d ? u[c] = h["flatten-duplicate-arrays"] ? u[c].concat(p) : (Array.isArray(u[c][0]) ? u[c] : [u[c]]).concat([p]) : !y && !!$ == !!d ? u[c] = p : u[c] = u[c].concat([p]) : u[c] === void 0 && $ ? u[c] = d ? p : [p] : y && !(u[c] === void 0 || w(c, f.counts) || w(c, f.bools)) ? u[c] = [u[c], p] : u[c] = p;
    }
    function dn(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(l[p] || []), f.aliases[p].concat(p).forEach(function(u) {
            if (/-/.test(u) && h["camel-case-expansion"]) {
              const c = he(u);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Q[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(u) {
            if (u.length > 1 && /[A-Z]/.test(u) && h["camel-case-expansion"]) {
              const c = qt(u, "-");
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Q[c] = !0);
            }
          }), f.aliases[p].forEach(function(u) {
            f.aliases[u] = [p].concat(f.aliases[p].filter(function(c) {
              return u !== c;
            }));
          }));
        });
      });
    }
    function w(r, a) {
      const p = [].concat(f.aliases[r] || [], r), u = Object.keys(a), c = p.find(($) => u.includes($));
      return c ? a[c] : !1;
    }
    function _t(r) {
      const a = Object.keys(f);
      return [].concat(a.map((u) => f[u])).some(function(u) {
        return Array.isArray(u) ? u.includes(r) : u[r];
      });
    }
    function gn(r, ...a) {
      return [].concat(...a).some(function(u) {
        const c = r.match(u);
        return c && _t(c[1]);
      });
    }
    function $n(r) {
      if (r.match(Y) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const u = r.slice(1).split("");
      for (let c = 0; c < u.length; c++) {
        if (p = r.slice(c + 2), !_t(u[c])) {
          a = !1;
          break;
        }
        if (u[c + 1] && u[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(u[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || u[c + 1] && u[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function we(r) {
      return h["unknown-options-as-args"] && bn(r);
    }
    function bn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Y) || $n(r) ? !1 : !gn(r, /^-+([^=]+?)=[\s\S]*$/, Ne, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ie(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in b ? b[r] : yn(En(r));
    }
    function yn(r) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[r];
    }
    function En(r) {
      let a = q.BOOLEAN;
      return w(r, f.strings) ? a = q.STRING : w(r, f.numbers) ? a = q.NUMBER : w(r, f.bools) ? a = q.BOOLEAN : w(r, f.arrays) && (a = q.ARRAY), a;
    }
    function J(r) {
      return r === void 0;
    }
    function wn() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (G = Error(ne("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(At, F),
      configuration: h,
      defaulted: Object.assign({}, re),
      error: G,
      newAliases: Object.assign({}, Q)
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
      for (let i = o + 1; i < t.length; i++)
        if (t[o].filter(function(h) {
          return t[i].indexOf(h) !== -1;
        }).length) {
          t[o] = t[o].concat(t[i]), t.splice(i, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(l, h, b) {
      return b.indexOf(l) === h;
    });
    const i = o.pop();
    i !== void 0 && typeof i == "string" && (n[i] = o);
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
var Pe, Te, We;
const jt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Rt = (Te = (Pe = process == null ? void 0 : process.versions) === null || Pe === void 0 ? void 0 : Pe.node) !== null && Te !== void 0 ? Te : (We = process == null ? void 0 : process.version) === null || We === void 0 ? void 0 : We.slice(1);
if (Rt && Number(Rt.match(/^([^.]+)/)[1]) < jt)
  throw Error(`yargs parser supports a minimum Node.js version of ${jt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Dn = process ? process.env : {}, Qt = new Bn({
  cwd: process.cwd,
  env: () => Dn,
  format: Vt,
  normalize: An,
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
  return Qt.parse(t.slice(), n).argv;
};
ge.detailed = function(e, t) {
  return Qt.parse(e.slice(), t);
};
ge.camelCase = he;
ge.decamelize = qt;
ge.looksLikeNumber = Zt;
const Un = {
  right: Zn,
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
      o.length > 1 && B.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), B.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((i, l) => ({
        text: i.trim(),
        padding: this.measurePadding(i),
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
      let i = "";
      s.forEach((l, h) => {
        const { width: b } = t[h], O = this.negatePadding(t[h]);
        let v = l;
        if (O > B.stringWidth(l) && (v += " ".repeat(O - B.stringWidth(l))), t[h].align && t[h].align !== "left" && this.wrap) {
          const N = Un[t[h].align];
          v = N(v, O), B.stringWidth(v) < O && (v += " ".repeat((b || 0) - B.stringWidth(v) - 1));
        }
        const _ = t[h].padding || [0, 0, 0, 0];
        _[Ae] && (i += " ".repeat(_[Ae])), i += Lt(t[h], v, "| "), i += v, i += Lt(t[h], v, " |"), _[Oe] && (i += " ".repeat(_[Oe])), o === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
      }), n.push({
        text: i.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, i = n.text, l = B.stringWidth(i.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, i.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, i + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((i, l) => {
      i.width = s[l], this.wrap ? o = B.wrap(i.text, this.negatePadding(i), { hard: !0 }).split(`
`) : o = i.text.split(`
`), i.border && (o.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (o.unshift(...new Array(i.padding[Hn] || 0).fill("")), o.push(...new Array(i.padding[Vn] || 0).fill(""))), o.forEach((h, b) => {
        n[b] || n.push([]);
        const O = n[b];
        for (let v = 0; v < l; v++)
          O[v] === void 0 && O.push("");
        O.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ae] || 0) + (t.padding[Oe] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || B.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), i = n ? Math.floor(s / n) : 0;
    return o.map((l, h) => l === void 0 ? Math.max(i, Kn(t[h])) : l);
  }
}
function Lt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Kn(e) {
  const t = e.padding || [], n = 1 + (t[Ae] || 0) + (t[Oe] || 0);
  return e.border ? n + 4 : n;
}
function qn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Zn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Qn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let B;
function Yn(e, t) {
  return B = t, new Gn({
    width: e?.width || qn(),
    wrap: e?.wrap
  });
}
const Yt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Xt(e) {
  return e.replace(Yt, "");
}
function Xn(e, t) {
  const [n, s] = e.match(Yt) || ["", ""];
  e = Xt(e);
  let o = "";
  for (let i = 0; i < e.length; i++)
    i !== 0 && i % t === 0 && (o += `
`), o += e.charAt(i);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Jn(e) {
  return Yn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Xt,
    wrap: Xn
  });
}
function es(e, t) {
  let n = le(".", e), s;
  for (Gt(n).isDirectory() || (n = Ie(n)); ; ) {
    if (s = t(n, _n(n)), s) return le(n, s);
    if (n = Ie(s = n), s === n) break;
  }
}
const ts = {
  fs: {
    readFileSync: vt,
    writeFile: Nn
  },
  format: Vt,
  resolve: le,
  exists: (e) => {
    try {
      return Gt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
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
    })) : s(), K.format.apply(K.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let i = function() {
    };
    typeof t[t.length - 1] == "function" && (i = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let l = o === 1 ? n : s;
    this.cache[this.locale][n] && (l = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i();
    const h = [l];
    return ~l.indexOf("%d") && h.push(o), K.format.apply(K.format, h.concat(t));
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
    return t.forEach(function(o, i) {
      const l = n[i + 1];
      s += o, typeof l < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, i = n.cb, l = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    K.fs.writeFile(l, h, "utf-8", function(b) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), i(b);
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
function ss(e, t) {
  K = t;
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
let me;
try {
  me = Ln(import.meta.url);
} catch {
  me = process.cwd();
}
const is = me.substring(0, me.lastIndexOf("node_modules"));
jn, Rn, On, is || process.cwd(), xn, Ie, Sn, Cn, le, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, vt, os({
  directory: le(me, "../../../locales"),
  updateFiles: !1
});
const k = "\x1B[44m", A = "\x1B[43m", I = "\x1B[41m", Jt = "\x1B[42m", g = "\x1B[0m", x = "\x1B[33m", S = "\x1B[36m", m = "\x1B[0m", cs = {
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
}, se = Object.keys(cs), as = [
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
      const i = o[1];
      as.includes(i) && Me.push({ filePath: t, message: `${A}(${i})${g}` });
    }
  });
}, us = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${x}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, fs = /^(\(.*\)|\\?.)$/;
function te(e) {
  const t = e.toString();
  return fs.test(t) ? t : `(?:${t})`;
}
const hs = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, ps = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(hs, "$1$2")})`);
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
    grouped: () => E(`${e}`.replace(ps, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const ms = /[.*+?^${}()|[\]\\/]/g;
function de(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function D(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ds(...e) {
  return E(`(?:${e.map((t) => U(t)).join("|")})`);
}
const xe = E(".");
E("\\b\\w+\\b");
const V = E("\\w"), z = E("\\b"), gs = E("\\d"), L = E("\\s"), en = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), tn = E("\\t"), nn = E("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(ms, "\\$&") : t).join("")
  );
}
function C(...e) {
  return E(`${te(U(...e))}+`);
}
const H = "i", P = "g", j = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(U(...e).toString(), [...t || ""].join(""));
}, M = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h, b) => b >= n && h.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((l, h) => l + h.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, Ce = [], $s = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = j(U("$parent").or("getCurrentInstance"), [P]), i = e.content.match(n), l = e.content.match(s);
  if (l) {
    const b = l[1].split(".")[0];
    if ((i ? i[1] : "").includes(b)) {
      const v = M(e.content.trim(), b);
      Ce.push({
        filePath: t,
        message: `line #${v} ${A}(${b})${g}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const b = M(e.content.trim(), h[0]);
    Ce.push({
      filePath: t,
      message: `line #${b} ${A}(${h[0]})${g}`
    });
  }
}, bs = () => {
  const e = [];
  return Ce.length > 0 && Ce.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${x}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], ys = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${A}global style${g} used`
    });
  });
}, Es = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ global style${m}`,
      description: `👉 ${x}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], ws = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps([", [P, H]);
  e.content.match(n)?.length && ke.push({ filePath: t, message: `${A}Props type${g} not defined` });
}, vs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ simple prop${m}`,
      description: `👉 ${x}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], Os = (e) => {
  if (e.includes("pages"))
    return;
  const t = oe.basename(e);
  if (t === "App.vue")
    return;
  const n = j(en.uppercase);
  t.slice(1).match(n)?.length || ze.push({ filePath: e, message: `Component name is ${A}single word${g}` });
}, As = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ single name component${m}`,
      description: `👉 ${x}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], xs = (e, t) => {
  if (!e)
    return;
  const n = j("<", C(D(">")), " v-for", C(D(">")), ">", [
    P,
    H
  ]), s = e.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || De.push({ filePath: t, message: `v-for used ${A}without a key${g}` }));
}, Ss = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${x}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = j(
    "<",
    C(D(">")),
    " v-if",
    C(D(">")),
    " v-for",
    C(D(">")),
    ">",
    [P, H]
  ), s = j(
    "<",
    C(D(">")),
    " v-for",
    C(D(">")),
    " v-if",
    C(D(">")),
    ">",
    [P, H]
  ), o = e.content.match(n), i = e.content.match(s);
  if (o?.length || i?.length) {
    const l = o?.length ? o[0] : i?.length ? i[0] : "", h = M(e.content, l);
    Ue.push({ filePath: t, message: `line #${h} ${A}v-if used with v-for${g}` });
  }
}, _s = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${x}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
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
], Ns = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let i;
  for (; (i = s.exec(n)) !== null; ) {
    const l = i[1], h = i[2];
    if (h) {
      const O = Array.from(h.matchAll(o), (_) => _[1]).filter((_) => Pt.includes(_));
      let v = -1;
      for (const _ of O) {
        const N = Pt.indexOf(_);
        if (N !== -1 && N < v) {
          He.push({
            filePath: t,
            message: `tag has attributes out of order ${A}(${l})${g}`
          });
          break;
        }
        v = N;
      }
    }
  }
}, js = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${x}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Rs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), i = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: i }
  ].filter((b) => b.index !== -1);
  l.every((b, O) => O === 0 ? !0 : l[O - 1].index < b.index) || Ve.push({ filePath: t, message: `Top level elements are ${A}not following the correct order.${g}` });
}, Ls = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ top level element order${m}`,
      description: `👉 ${x}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Fs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = oe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = t.match(o);
  !s?.length && !i?.length && Ge.push({ filePath: e, message: `component name is ${A}not PascalCase, nor kebab-case.${g}` });
}, Ps = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${x}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ts = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const i = M(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    Ke.push({ filePath: t, message: `line #${i} ${A}(${l})${g}` });
  });
}, Ws = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component files${m}`,
      description: `👉 ${x}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Tt = [], Is = ["v-slot", "v-bind", "v-on"], Ms = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Is.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = M(e.source, s);
      qe.push({ filePath: t, message: `line #${o} ${A}${s}${g}` }), Tt.some((i) => i.filePath === t) || Tt.push({ filePath: t });
    }
  });
}, Bs = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${x}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], ks = 3, zs = (e) => {
  const t = j(
    C(D("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = j(
      de("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), i = s.match(o);
    (!i || i.length < ks) && Ze.push({ filePath: e, message: `${s} is not a ${A}full word.${g}` });
  }
}, Ds = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ full-word component names${m}`,
      description: `👉 ${x}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Us = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], i = s[2];
    i.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && i.split(`
`).length === 1 && Qe.push({ filePath: t, message: `Element ${A}<${o}>${g} should have its attributes on separate lines` });
  }
}, Hs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${x}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Vs = /^[a-z]+([A-Z][a-z]*)*$/, Gs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((i) => i.split(":")[0]).filter((i) => i.length).filter((i) => !Vs.test(i)).length && Ye.push({ filePath: t, message: `prop names are ${A}not camelCased${g}` });
}, Ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${x}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], qs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = j(
    "<",
    C(V),
    X(C(de(` 	
\r`))),
    C(D("/>")),
    X(C(de(` 	
\r`))),
    X("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const i = j(":", C(V), X(" "), "=", X(" "), D(`'"`), [
    "g"
  ]);
  o?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const h = l.match(i);
    if (h?.length) {
      const b = M(e.source, l);
      Xe.push({ filePath: t, message: `line #${b} ${A}${h}${g}` });
    }
  });
}, Zs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${x}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Qs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = j(
    "<",
    C(en.uppercase, V),
    X(nn, tn),
    X(C(D(">"))),
    "></",
    C(V),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((i) => {
    const l = M(e.source, i), h = i.split(`
`).at(-1)?.trim() || "";
    Je.push({ filePath: t, message: `line #${l} ${A}${h}${g}` });
  });
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${x}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, sn = [], Se = [], Xs = 5, Js = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > Xs) {
      const i = o.split(`
`)[0], l = M(e.content, i);
      sn.push({ filePath: t, message: `line #${l} ${A}computed${g}` }), Se.push({ filePath: t }), Se.some((h) => h.filePath === t) || Se.push({ filePath: t });
    }
  });
}, eo = () => {
  const e = [];
  return Se.length > 0 && sn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${x}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], to = 40, no = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > to) {
      const i = M(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      et.push({
        filePath: t,
        message: `line #${i} ${A}${l}${g}`
      });
    }
  });
}, so = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${x}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], oo = 5, ro = 10, io = (e, t) => {
  if (!e)
    return;
  const n = j(z, "if", z, [P, H]), s = j(z, "else", z, [P, H]), o = j(z, "for", z, [P, H]), i = j(z, "while", z, [P, H]), l = j(z, "case", z, [P, H]), h = e.content.match(n), b = e.content.match(s), O = e.content.match(o), v = e.content.match(i), _ = e.content.match(l), N = (h?.length || 0) + (b?.length || 0) + (O?.length || 0) + (v?.length || 0) + (_?.length || 0);
  N > oo && tt.push({ filePath: t, message: `${N > ro ? I : A}(${N})${g}` });
}, co = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${x}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Wt = 5, ao = 3, lo = (e, t) => {
  if (!e)
    return;
  const n = j(tn.times.atLeast(Wt).or(L.times.atLeast(ao * Wt)), [
    P,
    H
  ]);
  e.content.match(n)?.forEach((o) => {
    const i = M(e.content, o);
    nt.push({
      filePath: t,
      message: `line #${i} ${A}indentation: ${o.length}${g}`
    });
  });
}, uo = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ deep indentation${m}`,
      description: `👉 ${x}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], fo = (e, t) => {
  if (!e)
    return;
  const n = j(z, "else", z, [P, H]), s = e.content.match(n);
  s?.length && st.push({ filePath: t, message: `else clauses found ${I}(${s.length})${g}` });
}, ho = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ else conditions${m}`,
      description: `👉 ${x}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, _e = [], ot = 20, rt = 5, It = 8;
function po(e, t, n) {
  const s = t.split(`
`).length;
  if (s > 2 * ot) {
    _e.push({ filePath: n, message: `function ${I}(${Mt(e)})${g} is too long: ${I}${s} lines${g}` });
    return;
  }
  s > ot && _e.push({ filePath: n, message: `function ${A}(${Mt(e)})${g} is too long: ${A}${s} lines${g}` });
}
function mo(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.slice(s, s + rt) === "const")
    for (s += rt; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function go(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function $o(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function bo(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const i = e[o];
    i === "{" && n++, i === "}" && n--, s += i, o++;
  }
  return { body: s, end: o };
}
function Mt(e) {
  return e.replace(/^const\s*/, "");
}
const yo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let i = "", l = "", h = !1;
    if (n.slice(o, o + It) === "function" && (o += It, h = !0, i = mo(n, o), o = go(n, o)), n.slice(o, o + rt) === "const") {
      const b = $o(n, o);
      b && (h = !0, i = b.name, o = b.bodyStart);
    }
    if (h) {
      const { body: b, end: O } = bo(n, o);
      l = b, o = O, po(i, l, t);
    }
    h || o++;
  }
}, Eo = () => {
  const e = [];
  return _e.length > 0 && _e.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ function size${m}`,
      description: `👉 ${x}Functions must be shorter than ${ot} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], wo = (e, t) => {
  if (!e)
    return;
  const n = j("<a", z, [P, H]), s = e.content.match(n);
  s?.length && it.push({ filePath: t, message: `${s?.length} ${A}html link found${g}` });
}, vo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ html link${m}`,
      description: `👉 ${x}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Oo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, i) => {
    const l = o.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const h = s[i + 1]?.trim();
      (!h || !h.startsWith("{") && !l.endsWith("{")) && ct.push({
        filePath: t,
        message: `line #${i} if statement without curly braces: ${I}${l}${g}`
      });
    }
  });
}, Ao = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ if without curly braces${m}`,
      description: `👉 ${x}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, at = [], xo = (e, t) => {
  if (!e)
    return;
  const n = j(C(gs).as("magicNumber"), ds(")", nn), [P]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const i = s.groups?.magicNumber, l = Number.parseInt(i ?? "0");
    if (l > 1) {
      const h = M(e.content, String(l), o);
      at.push({
        filePath: t,
        message: `line #${h} ${A}magic number: ${l}${g}`
      }), o = h;
    }
  }
}, So = () => {
  const e = [];
  return at.length && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ magic numbers${m}`,
      description: `👉 ${x}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, lt = [], Co = (e, t) => {
  if (!e)
    return;
  const n = j(C(xe), L, "?", L, C(xe), L, ":", L, C(xe));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const i = M(e.content, o);
      lt.push({
        filePath: t,
        message: `line #${i} has ${A}nested ternary${g}`
      });
    }
  });
}, _o = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ nested Ternary${m}`,
      description: `👉 ${x}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], No = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  e.content.match(n)?.forEach((o) => {
    const i = M(e.content, o);
    ut.push({
      filePath: t,
      message: `line #${i} ${A}props destructuring found: ${o}${g}`
    });
  });
}, jo = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${x}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], on = 3, Bt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > on && ft.push({ filePath: n, message: `function ${A}${e}${g} has ${A}${s.length}${g} parameters` });
}, Ro = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] && Bt(s[1], s[2], t), s[3] && Bt(s[3], s[4], t);
}, Lo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ parameter count${m}`,
      description: `👉 ${x}Max number of function parameters should be ${on}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], Fo = (e, t) => {
  !e || e.setup || ht.push({ filePath: t, message: `${A}Plain <script> block${g} found` });
}, Po = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${x} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], To = (e, t) => {
  if (!e)
    return;
  const n = j(
    "defineProps(",
    L.times.any(),
    "[",
    L.times.any(),
    C(de(`'"`), C(V), de(`'"`), L.times.any(), X(",", L.times.any())),
    "]",
    L.times.any(),
    ")",
    [P]
  ), s = j(
    "<",
    C(V).grouped(),
    L,
    D(">").times.any(),
    ":",
    C(V).grouped(),
    L.times.any(),
    "=",
    L.times.any(),
    '"props.',
    C(V).grouped(),
    '"',
    [P]
  );
  let o;
  const i = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((b) => i.add(b));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const h = l[1], b = l[2], O = l[3];
    i.has(O) && b === O && pt.push({
      filePath: t,
      message: `Prop ${A}(${O})${g} is being drilled through ${A}${h}${g} component unmodified.`
    });
  }
}, Wo = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ props drilling${m}`,
      description: `👉 ${x}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, mt = [], dt = 100, Io = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > dt && mt.push({ filePath: t, message: `${n.length > dt * 2 ? I : A}(${n.length} lines)${g}` });
}, Mo = () => {
  const e = [];
  return mt.length > 0 && mt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${x}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${dt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], rn = 4, Bo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < rn && gt.push({ filePath: t, message: `${I}(${o})${g}` });
  }
}, ko = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ short variable names${m}`,
      description: `👉 ${x}Variable names must have a minimum length of ${rn}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, $t = [], zo = 5, Do = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps", X("<"), X("("), "{", C(xe), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > zo && $t.push({ filePath: t, message: `props found ${I}(${o})${g}` });
  }
}, Uo = () => {
  const e = [];
  return $t.length > 0 && $t.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ too many props${m}`,
      description: `👉 ${x}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], Ho = (e, t) => {
  if (!e)
    return;
  const n = j('v-for="(', L.times.any(), C(V).grouped(), L.times.any(), ",", L.times.any(), C(V).grouped(), L.times.any(), ")", C(L), "in", C(L), C(V).grouped(), [P]), s = j(':key="', L.times.any(), C(V).grouped(), L.times.any(), '"', [P]), o = [...e.content.matchAll(n)], i = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [h, b, O, v] = l;
    i.forEach((_) => {
      const N = _[1];
      if (N === O) {
        const Q = M(e.content.trim(), N);
        bt.push({
          filePath: t,
          message: `line #${Q} ${A}index is being used as :key in v-for${g}`
        });
      }
    });
  });
}, Vo = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${x}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, yt = [], Go = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], i = s[1], l = M(e.content.trim(), o);
    yt.push({
      filePath: t,
      message: `line #${l} zero length comparison found ${A}(${i})${g}`
    });
  }
}, Ko = () => {
  const e = [];
  return yt.length > 0 && yt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${x}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qo = (e, t, n) => {
  const s = {}, o = ({ file: O, rule: v, title: _, description: N, message: Q }) => {
    const re = e === "rule" ? v : O;
    s[re] || (s[re] = []), s[re].push({ file: O, rule: v, title: _, description: N, message: Q });
  }, i = (O) => {
    O().forEach((_) => {
      o(_);
    });
  };
  i(As), i(vs), i(Ss), i(_s), i(Es), i(Ps), i(Ws), i(Bs), i(Ds), i(Hs), i(Ks), i(Zs), i(Ys), i(eo), i(so), i(Ls), i(js), i(bs), i(us), i(co), i(uo), i(ho), i(Eo), i(vo), i(Ao), i(So), i(_o), i(jo), i(Lo), i(Po), i(Wo), i(Mo), i(ko), i(Uo), i(Vo), i(Ko);
  const l = [], h = Object.keys(s).sort((O, v) => {
    const _ = s[O].length, N = s[v].length;
    return t === "desc" ? N - _ : _ - N;
  }), b = [];
  return h.forEach((O) => {
    b.push({ info: `
 - ${O}` }), s[O].forEach((v) => {
      const _ = v.message.includes(I);
      if (l.some((N) => N.file === v.file)) {
        const N = l.find((Q) => Q.file === v.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        l.push({ file: v.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" && b.push({ info: `   Rule: ${v.rule}` }), e !== "file" && b.push({ info: `   File: ${v.file}` }), b.push({ info: `   Description: ${v.description}` }), b.push({ info: `   Message: ${v.message || "🚨"}
` }));
    });
  }), { output: b, health: l };
}, Zo = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue");
  n.includes("vue-essential") && (ws(s, t), o && (Os(t), ys(e.styles, t), xs(e.template, t), Cs(e.template, t))), n.includes("vue-strong") && (Js(s, t), o && (Ts(s, t), Gs(s, t), Fs(t), Qs(e, t), no(e.template, t), qs(e, t), Ms(e, t), zs(t), Us(e.template, t))), n.includes("vue-recommended") && o && (Rs(e.source, t), Ns(e.template, t)), n.includes("vue-caution") && o && ($s(s, t), ls(e.styles, t)), n.includes("rrd") && (io(s, t), lo(s, t), fo(s, t), yo(s, t), Oo(s, t), xo(s, t), Co(s, t), Ro(s, t), To(s, t), Io(s, t), Bo(s, t), Do(s, t), No(s, t), Go(s, t), o && (wo(e.template, t), Fo(e.script, t), Ho(e.template, t)));
}, Qo = 1.5, kt = 75, zt = 85, Dt = 95, Yo = (e, t, n) => {
  const { errors: s, warnings: o } = e.reduce((h, { errors: b, warnings: O }) => ({ errors: h.errors + b, warnings: h.warnings + O }), { errors: 0, warnings: 0 }), i = [];
  i.push({ info: `Found ${I}${Intl.NumberFormat("en-US").format(s)} errors${g}, and ${A}${Intl.NumberFormat("en-US").format(o)} warnings${g}, ${k}${Intl.NumberFormat("en-US").format(t)} lines${g} of code in ${k}${Intl.NumberFormat("en-US").format(n)} files${g}` });
  const l = Math.ceil((1 - (s * Qo + o) / t) * 100);
  return l < kt && i.push({ info: `${I}Code health is LOW: ${l}%${g}` }), l >= kt && l < zt && i.push({ info: `${A}Code health is MEDIUM ${l}%${g}` }), l >= zt && l < Dt && i.push({ info: `${k}Code health is OK: ${l}%${g}` }), l >= Dt && i.push({ info: `${Jt}Code health is GOOD: ${l}%${g}` }), { errors: s, warnings: o, output: i };
};
let Et = 0, cn = 0, an = [];
const Xo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], Ot = [], ce = [], Ut = async (e, t) => {
  if (!Ot.some((n) => e.endsWith(n)) && (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js"))) {
    Et++;
    const n = await ae.readFile(t, "utf-8");
    cn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Fn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), ce.push({ info: `Analyzing ${t}...` }), Zo(s, t, an);
  }
}, ln = async (e) => {
  if (!(await ae.stat(e)).isDirectory()) {
    await Ut(e, e);
    return;
  }
  const n = await ae.readdir(e);
  for (const s of n) {
    const o = oe.join(e, s);
    (await ae.stat(o)).isDirectory() && !Xo.some((l) => o.includes(l)) && !Ot.some((l) => o.endsWith(l)) && await ln(o), await Ut(o, o);
  }
}, Jo = async ({ dir: e, apply: t = [], exclude: n, groupBy: s, level: o, orderBy: i }) => {
  const l = se.filter((N) => !t.includes(N));
  ce.push({ info: `${k}Analyzing Vue, TS and JS files in ${e}${g}` }), ce.push({
    info: `Applying ${k}${t.length}${g} rulesets ${k}${t}${g}
      Ignoring ${k}${l.length}${g} rulesets ${k}${l}${g}
      Excluding ${k}${n || "-"}${g}
      Output level ${k}${o}${g}
      Grouping by ${k}${s}${g}
      Ordering ${k}${i}${g}`
  }), an = t, n && Ot.push(...n.split(",")), await ln(e), ce.push({ info: `Found ${k}${Et}${g} files` });
  const { health: h, output: b } = qo(s, i, o), { errors: O, warnings: v, output: _ } = Yo(h, cn, Et);
  return !O && !v && ce.push({ info: `${Jt}No code smells detected!${g}` }), { output: ce, codeHealthOutput: _, reportOutput: b };
}, er = ["rule", "file"], tr = ["asc", "desc"], nr = ["all", "error"], sr = ["text", "json"], or = {
  groupBy: er,
  orderBy: tr,
  outputLevel: nr,
  outputFormat: sr
}, ve = (e, t) => {
  const n = or[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}, rr = async () => {
  let e = process.cwd();
  for (; e !== oe.parse(e).root; ) {
    const t = oe.join(e, "package.json");
    return await ae.access(t), e;
  }
  e = oe.dirname(e);
}, Ht = (e) => (t) => {
  const n = t?.split(",");
  if (!n)
    return;
  const s = n.filter((o) => !se.includes(o));
  return s.length > 0 && (console.error(
    `
${I}Invalid ${e} values: ${s.join(
      ", "
    )}${g}. 
${x}Allowed values are: ${[...se].join(", ")}${m}

`
  ), process.exit(1)), n;
}, un = await rr();
un || (console.error(`
${I}Cannot find project root.${g}

`), process.exit(1));
const wt = [];
let Z = {
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
  const e = oe.join(un, "vue-mess-detector.json"), t = JSON.parse(await ae.readFile(e, "utf-8"));
  Z = { ...Z, ...t }, wt.push({ info: `👉 Using configuration from ${e}` });
} catch {
  wt.push({ info: "👉 Using default configuration" });
}
vn(Wn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(Z).positional("path", {
    describe: "path to the Vue files",
    default: Z.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: se,
    coerce: Ht("apply"),
    group: "Filter Rulesets:",
    default: Z.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: Z.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => ve(t, "groupBy"),
    default: Z.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => ve(t, "outputLevel"),
    default: Z.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: se,
    coerce: Ht("ignore"),
    default: Z.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => ve(t, "orderBy"),
    default: Z.order,
    group: "Order Results:"
  }).option("output", {
    describe: "Output format",
    choices: ["text", "json"],
    coerce: (t) => ve(t, "outputFormat"),
    default: Z.output,
    group: "Output Format:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${I}Cannot use both --ignore and --apply options together.${g}

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...se];
    e.apply && (t = e.apply), e.ignore && (t = se.filter((n) => !e.ignore.includes(n))), Jo({
      dir: e.path,
      apply: t,
      exclude: e.exclude,
      groupBy: e.group,
      level: e.level,
      orderBy: e.order
    }).then((n) => {
      e.output == "text" && ([...wt, ...n.output].forEach((s) => {
        console.log(s.info);
      }), n.reportOutput?.forEach((s) => {
        console.log(s.info);
      }), n.codeHealthOutput?.forEach((s) => {
        console.log(s.info);
      })), e.output == "json" && console.log(JSON.stringify(n, null, 2));
    }).catch((n) => {
      console.error(`${I}${n}${g}`);
    });
  }
).help().argv;
