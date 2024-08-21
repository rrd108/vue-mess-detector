import ie from "node:fs/promises";
import oe from "node:path";
import $n from "yargs";
import { format as Mt, inspect as bn } from "util";
import { normalize as yn, resolve as ce, dirname as Fe, basename as En, extname as wn, relative as vn } from "path";
import { readFileSync as $t, statSync as kt, readdirSync as An, writeFile as On } from "fs";
import { notStrictEqual as xn, strictEqual as Cn } from "assert";
import { fileURLToPath as Sn } from "url";
import { parse as _n } from "@vue/compiler-sfc";
class fe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, fe);
  }
}
function zt() {
  return Nn() ? 0 : 1;
}
function Nn() {
  return Rn() && !process.defaultApp;
}
function Rn() {
  return !!process.versions.electron;
}
function jn(e) {
  return e.slice(zt() + 1);
}
function Ln() {
  return process.argv[zt()];
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
function Dt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const r = n.charAt(o), u = e.charAt(o);
    r !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Ut(e) {
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
    }, n), o = Tn(t), i = typeof t == "string", u = Pn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), g = Object.assign(/* @__PURE__ */ Object.create(null), s.default), w = s.configObjects || [], A = s.envPrefix, _ = h["populate--"], L = _ ? "--" : "_", Z = /* @__PURE__ */ Object.create(null), bt = /* @__PURE__ */ Object.create(null), se = s.__ || J.format, f = {
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
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
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
    })), un(s.key, u, s.default, f.arrays), Object.keys(g).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        g[a] = g[r];
      });
    });
    let G = null;
    gn();
    let de = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), yt = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], p = a.replace(/^-{3,}/, "---");
      let l, c, $, d, y, P;
      if (a !== "--" && /^-/.test(a) && ye(a))
        Ce(a);
      else if (p.match(/^---+(=|$)/)) {
        Ce(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        d = a.match(/^--?([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && (v(d[1], f.arrays) ? r = $e(r, d[1], o, d[2]) : v(d[1], f.nargs) !== !1 ? r = ge(r, d[1], o, d[2]) : R(d[1], d[2], !0));
      else if (a.match(xe) && h["boolean-negation"])
        d = a.match(xe), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], R(c, v(c, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        d = a.match(/^--?(.+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], v(c, f.arrays) ? r = $e(r, c, o) : v(c, f.nargs) !== !1 ? r = ge(r, c, o) : (y = o[r + 1], y !== void 0 && (!y.match(/^-/) || y.match(Q)) && !v(c, f.bools) && !v(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), r++) : R(c, re(c))));
      else if (a.match(/^-.\..+=/))
        d = a.match(/^-([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && R(d[1], d[2]);
      else if (a.match(/^-.\..+/) && !a.match(Q))
        y = o[r + 1], d = a.match(/^-(.\..+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], y !== void 0 && !y.match(/^-/) && !v(c, f.bools) && !v(c, f.counts) ? (R(c, y), r++) : R(c, re(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Q)) {
        $ = a.slice(1, -1).split(""), l = !1;
        for (let W = 0; W < $.length; W++) {
          if (y = a.slice(W + 2), $[W + 1] && $[W + 1] === "=") {
            P = a.slice(W + 3), c = $[W], v(c, f.arrays) ? r = $e(r, c, o, P) : v(c, f.nargs) !== !1 ? r = ge(r, c, o, P) : R(c, P), l = !0;
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
        c = a.slice(-1)[0], !l && c !== "-" && (v(c, f.arrays) ? r = $e(r, c, o) : v(c, f.nargs) !== !1 ? r = ge(r, c, o) : (y = o[r + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(Q)) && !v(c, f.bools) && !v(c, f.counts) || /^(true|false)$/.test(y) ? (R(c, y), r++) : R(c, re(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Q) && v(a.slice(1), f.bools))
        c = a.slice(1), R(c, re(c));
      else if (a === "--") {
        de = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        de = o.slice(r);
        break;
      } else
        Ce(a);
    }
    wt(T, !0), wt(T, !1), rn(T), cn(), vt(T, f.aliases, g, !0), an(T), h["set-placeholder-key"] && ln(T), Object.keys(f.counts).forEach(function(r) {
      ae(T, r.split(".")) || R(r, 0);
    }), _ && de.length && (T[L] = []), de.forEach(function(r) {
      T[L].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(T).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete T[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete T[r.split(".").map((a) => ue(a)).join(".")], delete T[r];
    });
    function Ce(r) {
      const a = be("_", r);
      (typeof a == "string" || typeof a == "number") && T._.push(a);
    }
    function ge(r, a, p, l) {
      let c, $ = v(a, f.nargs);
      if ($ = typeof $ != "number" || isNaN($) ? 1 : $, $ === 0)
        return X(l) || (G = Error(se("Argument unexpected for: %s", a))), R(a, re(a)), r;
      let d = X(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + d < $ && (G = Error(se("Not enough arguments following: %s", a))), d = $;
      else {
        for (c = r + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Q) || ye(p[c])); c++)
          d++;
        d < $ && (G = Error(se("Not enough arguments following: %s", a)));
      }
      let y = Math.min(d, $);
      for (!X(l) && y > 0 && (R(a, l), y--), c = r + 1; c < y + r + 1; c++)
        R(a, p[c]);
      return i + y;
    }
    function $e(r, a, p, l) {
      let c = [], $ = l || p[r + 1];
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
        for (let y = r + 1; y < p.length && !(!h["greedy-arrays"] && c.length > 0 || d && typeof d == "number" && c.length >= d || ($ = p[y], /^-/.test($) && !Q.test($) && !ye($))); y++)
          r = y, c.push(Se(a, $, i));
      }
      return typeof d == "number" && (d && c.length < d || isNaN(d) && c.length === 0) && (G = Error(se("Not enough arguments following: %s", a))), R(a, c), r;
    }
    function R(r, a, p = i) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const $ = r.split(".").map(function(d) {
          return ue(d);
        }).join(".");
        Et(r, $);
      }
      const l = Se(r, a, p), c = r.split(".");
      le(T, c, l), f.aliases[r] && f.aliases[r].forEach(function($) {
        const d = $.split(".");
        le(T, d, l);
      }), c.length > 1 && h["dot-notation"] && (f.aliases[c[0]] || []).forEach(function($) {
        let d = $.split(".");
        const y = [].concat(c);
        y.shift(), d = d.concat(y), (f.aliases[r] || []).includes(d.join(".")) || le(T, d, l);
      }), v(r, f.normalize) && !v(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(d) {
        Object.defineProperty(yt, d, {
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
    function Et(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], Z[a] = !0), f.aliases[a] && f.aliases[a].length || Et(a, r);
    }
    function Se(r, a, p) {
      p && (a = Wn(a)), (v(r, f.bools) || v(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(c) {
        return be(r, c);
      }) : be(r, a);
      return v(r, f.counts) && (X(l) || typeof l == "boolean") && (l = Ne()), v(r, f.normalize) && v(r, f.arrays) && (Array.isArray(a) ? l = a.map((c) => J.normalize(c)) : l = J.normalize(a)), l;
    }
    function be(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !v(r, f.strings) && !v(r, f.bools) && !Array.isArray(a) && (Ut(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !X(a) && v(r, f.numbers)) && (a = Number(a)), a;
    }
    function rn(r) {
      const a = /* @__PURE__ */ Object.create(null);
      vt(a, f.aliases, g), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || a[p];
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
            c.name === "PermissionDenied" ? G = c : r[p] && (G = Error(se("Invalid JSON config file: %s", l)));
          }
      });
    }
    function _e(r, a) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], c = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? _e(l, c) : (!ae(T, c.split(".")) || v(c, f.arrays) && h["combine-arrays"]) && R(c, l);
      });
    }
    function cn() {
      typeof w < "u" && w.forEach(function(r) {
        _e(r);
      });
    }
    function wt(r, a) {
      if (typeof A > "u")
        return;
      const p = typeof A == "string" ? A : "", l = J.env();
      Object.keys(l).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const $ = c.split("__").map(function(d, y) {
            return y === 0 && (d = d.substring(p.length)), ue(d);
          });
          (a && f.configs[$.join(".")] || !a) && !ae(r, $) && R($.join("."), l[c]);
        }
      });
    }
    function an(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(l) {
        if (!p.has(l) && (a = v(l, f.coercions), typeof a == "function"))
          try {
            const c = be(l, a(r[l]));
            [].concat(f.aliases[l] || [], l).forEach(($) => {
              p.add($), i[$] = c;
            });
          } catch (c) {
            G = c;
          }
      });
    }
    function ln(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof i[a] > "u" && (i[a] = void 0);
      }), i;
    }
    function vt(r, a, p, l = !1) {
      Object.keys(p).forEach(function(c) {
        ae(r, c.split(".")) || (le(r, c.split("."), p[c]), l && (bt[c] = !0), (a[c] || []).forEach(function($) {
          ae(r, $.split(".")) || le(r, $.split("."), p[c]);
        }));
      });
    }
    function ae(r, a) {
      let p = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const l = a[a.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function le(r, a, p) {
      let l = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(P) {
        P = Ot(P), typeof l == "object" && l[P] === void 0 && (l[P] = {}), typeof l[P] != "object" || Array.isArray(l[P]) ? (Array.isArray(l[P]) ? l[P].push({}) : l[P] = [l[P], {}], l = l[P][l[P].length - 1]) : l = l[P];
      });
      const c = Ot(a[a.length - 1]), $ = v(a.join("."), f.arrays), d = Array.isArray(p);
      let y = h["duplicate-arguments-array"];
      !y && v(c, f.nargs) && (y = !0, (!X(l[c]) && f.nargs[c] === 1 || Array.isArray(l[c]) && l[c].length === f.nargs[c]) && (l[c] = void 0)), p === Ne() ? l[c] = Ne(l[c]) : Array.isArray(l[c]) ? y && $ && d ? l[c] = h["flatten-duplicate-arrays"] ? l[c].concat(p) : (Array.isArray(l[c][0]) ? l[c] : [l[c]]).concat([p]) : !y && !!$ == !!d ? l[c] = p : l[c] = l[c].concat([p]) : l[c] === void 0 && $ ? l[c] = d ? p : [p] : y && !(l[c] === void 0 || v(c, f.counts) || v(c, f.bools)) ? l[c] = [l[c], p] : l[c] = p;
    }
    function un(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const c = ue(l);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Z[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const c = Dt(l, "-");
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
    function At(r) {
      const a = Object.keys(f);
      return [].concat(a.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(i) : l[i];
      });
    }
    function fn(r, ...a) {
      return [].concat(...a).some(function(l) {
        const c = r.match(l);
        return c && At(c[1]);
      });
    }
    function hn(r) {
      if (r.match(Q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = i.slice(1).split("");
      for (let c = 0; c < l.length; c++) {
        if (p = r.slice(c + 2), !At(l[c])) {
          a = !1;
          break;
        }
        if (l[c + 1] && l[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[c + 1] && l[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ye(r) {
      return h["unknown-options-as-args"] && pn(r);
    }
    function pn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Q) || hn(r) ? !1 : !fn(r, /^-+([^=]+?)=[\s\S]*$/, xe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function re(r) {
      return !v(r, f.bools) && !v(r, f.counts) && `${r}` in g ? g[r] : mn(dn(r));
    }
    function mn(r) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[i];
    }
    function dn(r) {
      let a = q.BOOLEAN;
      return v(i, f.strings) ? a = q.STRING : v(i, f.numbers) ? a = q.NUMBER : v(i, f.bools) ? a = q.BOOLEAN : v(i, f.arrays) && (a = q.ARRAY), a;
    }
    function X(i) {
      return i === void 0;
    }
    function gn() {
      Object.keys(f.counts).find((r) => v(r, f.arrays) ? (G = Error(se("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : v(r, f.nargs) ? (G = Error(se("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(yt, T),
      configuration: h,
      defaulted: Object.assign({}, bt),
      error: G,
      newAliases: Object.assign({}, Z)
    };
  }
}
function Pn(e) {
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
function Ot(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Wn(e) {
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
const xt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Ct = (je = (Re = process == null ? void 0 : process.versions) === null || Re === void 0 ? void 0 : Re.node) !== null && je !== void 0 ? je : (Le = process == null ? void 0 : process.version) === null || Le === void 0 ? void 0 : Le.slice(1);
if (Ct && Number(Ct.match(/^([^.]+)/)[1]) < xt)
  throw Error(`yargs parser supports a minimum Node.js version of ${xt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const In = process ? process.env : {}, Ht = new Fn({
  cwd: process.cwd,
  env: () => In,
  format: Mt,
  normalize: yn,
  resolve: ce,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse($t(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), me = function(t, n) {
  return Ht.parse(t.slice(), n).argv;
};
me.detailed = function(e, t) {
  return Ht.parse(e.slice(), t);
};
me.camelCase = ue;
me.decamelize = Dt;
me.looksLikeNumber = Ut;
const Bn = {
  right: Hn,
  center: Vn
}, Mn = 0, Ee = 1, kn = 2, we = 3;
class zn {
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
          const L = Bn[t[h].align];
          A = L(A, w), B.stringWidth(A) < w && (A += " ".repeat((g || 0) - B.stringWidth(A) - 1));
        }
        const _ = t[h].padding || [0, 0, 0, 0];
        _[we] && (i += " ".repeat(_[we])), i += St(t[h], A, "| "), i += A, i += St(t[h], A, " |"), _[Ee] && (i += " ".repeat(_[Ee])), o === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
      }), n.push({
        text: r.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, i = n.text, u = B.stringWidth(i.trimRight());
    return n.span ? this.wrap ? o < u ? t : (n.hidden = !0, i.trimRight() + " ".repeat(o - u) + t.trimLeft()) : (n.hidden = !0, i + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((i, u) => {
      i.width = s[u], this.wrap ? o = B.wrap(i.text, this.negatePadding(i), { hard: !0 }).split(`
`) : o = i.text.split(`
`), i.border && (o.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (o.unshift(...new Array(i.padding[Mn] || 0).fill("")), o.push(...new Array(i.padding[kn] || 0).fill(""))), o.forEach((h, g) => {
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
    }), i = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(i, Dn(t[h])) : u);
  }
}
function St(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Dn(e) {
  const t = e.padding || [], n = 1 + (t[we] || 0) + (t[Ee] || 0);
  return e.border ? n + 4 : n;
}
function Un() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Hn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Vn(e, t) {
  e = e.trim();
  const n = B.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let B;
function Gn(e, t) {
  return B = t, new zn({
    width: e?.width || Un(),
    wrap: e?.wrap
  });
}
const Vt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Gt(e) {
  return e.replace(Vt, "");
}
function Kn(e, t) {
  const [n, s] = e.match(Vt) || ["", ""];
  e = Gt(e);
  let o = "";
  for (let r = 0; r < e.length; r++)
    r !== 0 && r % t === 0 && (o += `
`), o += e.charAt(r);
  return n && s && (o = `${n}${o}${s}`), o;
}
function qn(e) {
  return Gn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Gt,
    wrap: Kn
  });
}
function Zn(e, t) {
  let n = ce(".", e), s;
  for (kt(n).isDirectory() || (n = Fe(n)); ; ) {
    if (s = t(n, An(n)), s)
      return ce(n, s);
    if (n = Fe(s = n), s === n)
      break;
  }
}
const Qn = {
  fs: {
    readFileSync: $t,
    writeFile: On
  },
  format: Mt,
  resolve: ce,
  exists: (e) => {
    try {
      return kt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class Yn {
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
function Xn(e, t) {
  K = t;
  const n = new Yn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Jn = (e) => Xn(e, Qn), es = "require is not supported by ESM", _t = "loading a directory of commands is not supported yet for ESM";
let he;
try {
  he = Sn(import.meta.url);
} catch {
  he = process.cwd();
}
const ts = he.substring(0, he.lastIndexOf("node_modules"));
xn, Cn, bn, ts || process.cwd(), En, Fe, wn, vn, ce, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, $t, Jn({
  directory: ce(he, "../../../locales"),
  updateFiles: !1
});
const D = "\x1B[44m", x = "\x1B[43m", z = "\x1B[41m", Kt = "\x1B[42m", b = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", m = "\x1B[0m", ns = {
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
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ]
}, ne = Object.keys(ns), Pe = [], We = 100, ss = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > We && Pe.push({ filePath: t, message: `${n.length > We * 2 ? z : x}(${n.length} lines)${b}` });
}, os = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${We} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], rs = (e, t) => {
  !e || e.setup || Ie.push({ filePath: t, message: `${x}Plain <script> block${b} found` });
}, is = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, cs = /^(\(.*\)|\\?.)$/;
function te(e) {
  const t = e.toString();
  return cs.test(t) ? t : `(?:${t})`;
}
const as = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, ls = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(as, "$1$2")})`);
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
    grouped: () => E(`${e}`.replace(ls, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const us = /[.*+?^${}()|[\]\\/]/g;
function pe(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function k(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function fs(...e) {
  return E(`(?:${e.map((t) => U(t)).join("|")})`);
}
const ve = E(".");
E("\\b\\w+\\b");
const V = E("\\w"), M = E("\\b"), hs = E("\\d"), j = E("\\s"), qt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Zt = E("\\t"), Qt = E("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(us, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${te(U(...e))}+`);
}
const H = "i", F = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(U(...e).toString(), [...t || ""].join(""));
}, Be = [], ps = (e, t) => {
  if (!e)
    return;
  const n = N(M, "else", M, [F, H]), s = e.content.match(n);
  s?.length && Be.push({ filePath: t, message: `else clauses found ${z}(${s.length})${b}` });
}, ms = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${m}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], ds = 5, gs = 10, $s = (e, t) => {
  if (!e)
    return;
  const n = N(M, "if", M, [F, H]), s = N(M, "else", M, [F, H]), o = N(M, "for", M, [F, H]), i = N(M, "while", M, [F, H]), u = N(M, "case", M, [F, H]), h = e.content.match(n), g = e.content.match(s), w = e.content.match(o), A = e.content.match(i), _ = e.content.match(u), L = (h?.length || 0) + (g?.length || 0) + (w?.length || 0) + (A?.length || 0) + (_?.length || 0);
  L > ds && Me.push({ filePath: t, message: `${L > gs ? z : x}(${L})${b}` });
}, bs = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${O}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], ys = (e) => {
  if (e.includes("pages"))
    return;
  const t = oe.basename(e);
  if (t === "App.vue")
    return;
  const n = N(qt.uppercase);
  t.slice(1).match(n)?.length || ke.push({ filePath: e, message: `Component name is ${x}single word${b}` });
}, Es = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${m}`,
      description: `👉 ${O}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ws = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ze.push({
      filePath: t,
      message: `${x}global style${b} used`
    });
  });
}, vs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${m}`,
      description: `👉 ${O}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], As = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [F, H]);
  e.content.match(n)?.length && De.push({ filePath: t, message: `${x}Props type${b} not defined` });
}, Os = () => {
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
}, Ue = [], xs = (e, t) => {
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
    [F, H]
  ), s = N(
    "<",
    S(k(">")),
    " v-for",
    S(k(">")),
    " v-if",
    S(k(">")),
    ">",
    [F, H]
  ), o = e.content.match(n), i = e.content.match(s);
  if (o?.length || i?.length) {
    const u = o?.length ? o[0] : i?.length ? i[0] : "", h = I(e.content, u);
    Ue.push({ filePath: t, message: `line #${h} ${x}v-if used with v-for${b}` });
  }
}, Cs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${O}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Ss = (e, t) => {
  if (!e)
    return;
  const n = N("<", S(k(">")), " v-for", S(k(">")), ">", [
    F,
    H
  ]), s = e.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || He.push({ filePath: t, message: `v-for used ${x}without a key${b}` }));
}, _s = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Ns = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = oe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = t.match(o);
  !s?.length && !i?.length && Ve.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${b}` });
}, Rs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], js = /^[a-z]+([A-Z][a-z]*)*$/, Ls = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((i) => i.split(":")[0]).filter((i) => i.length).filter((i) => !js.test(i)).length && Ge.push({ filePath: t, message: `prop names are ${x}not camelCased${b}` });
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
}, Ke = [], Fs = 40, Ps = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Fs) {
      const i = I(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ke.push({
        filePath: t,
        message: `line #${r} ${x}${u}${b}`
      });
    }
  });
}, Ws = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${O}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Is = (e, t) => {
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
  const i = N(":", S(V), Y(" "), "=", Y(" "), k(`'"`), [
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
}, Bs = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${O}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Ms = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(qt.uppercase, V),
    Y(Qt, Zt),
    Y(S(k(">"))),
    "></",
    S(V),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((i) => {
    const u = I(e.source, i), h = i.split(`
`).at(-1)?.trim() || "";
    Ze.push({ filePath: t, message: `line #${u} ${x}${h}${b}` });
  });
}, ks = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${O}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Nt = [], zs = ["v-slot", "v-bind", "v-on"], Ds = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  zs.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Qe.push({ filePath: t, message: `line #${o} ${x}${s}${b}` }), Nt.some((i) => i.filePath === t) || Nt.push({ filePath: t });
    }
  });
}, Us = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Hs = 3, Vs = (e) => {
  const t = N(
    S(k("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = N(
      pe("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [F]
    ), i = s.match(o);
    (!i || i.length < Hs) && Ye.push({ filePath: e, message: `${s} is not a ${x}full word.${b}` });
  }
}, Gs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${m}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Ks = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), i = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: r }
  ].filter((g) => g.index !== -1);
  u.every((g, w) => w === 0 ? !0 : u[w - 1].index < g.index) || Xe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${b}` });
}, qs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${m}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Rt = [
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
], Zs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let r;
  for (; (r = s.exec(n)) !== null; ) {
    const u = r[1], h = r[2];
    if (h) {
      const w = Array.from(h.matchAll(o), (_) => _[1]).filter((_) => Rt.includes(_));
      let A = -1;
      for (const _ of w) {
        const L = Rt.indexOf(_);
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
}, Qs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Ys = 5, Xs = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", Y("<"), Y("("), "{", S(ve), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Ys && et.push({ filePath: t, message: `props found ${z}(${o})${b}` });
  }
}, Js = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${m}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Yt = 20, nt = 5, jt = 8;
function eo(e, t, n) {
  t.split(`
`).length > Yt && tt.push({ filePath: n, message: `function ${z}(${ro(e)})${b} is too long` });
}
function to(e, t) {
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
function no(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function so(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function oo(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const r = e[o];
    r === "{" && n++, r === "}" && n--, s += r, o++;
  }
  return { body: s, end: o };
}
function ro(e) {
  return e.replace(/^const\s*/, "");
}
const io = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let i = "", u = "", h = !1;
    if (n.slice(o, o + jt) === "function" && (o += jt, h = !0, i = to(n, o), o = no(n, o)), n.slice(o, o + nt) === "const") {
      const g = so(n, o);
      g && (h = !0, i = g.name, o = g.bodyStart);
    }
    if (h) {
      const { body: g, end: w } = oo(n, o);
      u = g, o = w, eo(i, u, t);
    }
    h || o++;
  }
}, co = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${m}`,
      description: `👉 ${O}Functions must be shorter than ${Yt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], Xt = 3, Lt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Xt && st.push({ filePath: n, message: `function ${x}${e}${b} has ${x}${s.length}${b} parameters` });
}, ao = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Lt(s[1], s[2], t) : s[3] && Lt(s[3], s[4], t);
}, lo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${m}`,
      description: `👉 ${O}Max number of function parameters should be ${Xt}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], uo = (e, t) => {
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
    [P]
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
    [P]
  );
  let o;
  const r = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((g) => r.add(g));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], g = u[2], w = u[3];
    i.has(w) && g === w && ot.push({
      filePath: t,
      message: `Prop ${x}(${w})${b} is being drilled through ${x}${h}${b} component unmodified.`
    });
  }
}, fo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${m}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], Jt = 4, ho = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Jt && rt.push({ filePath: t, message: `${z}(${o})${b}` });
  }
}, po = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${m}`,
      description: `👉 ${O}Variable names must have a minimum length of ${Jt}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, en = [], Ae = [], mo = 5, go = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > mo) {
      const i = o.split(`
`)[0], u = I(e.content, i);
      en.push({ filePath: t, message: `line #${u} ${x}computed${b}` }), Ae.push({ filePath: t }), Ae.some((h) => h.filePath === t) || Ae.push({ filePath: t });
    }
  });
}, $o = () => {
  const e = [];
  return Ae.length > 0 && en.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], bo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const i = I(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    it.push({ filePath: t, message: `line #${i} ${x}(${u})${b}` });
  });
}, yo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${m}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Oe = [], Eo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = N(U("$parent").or("getCurrentInstance"), [F]), i = e.content.match(n), u = e.content.match(s);
  if (u) {
    const g = u[1].split(".")[0];
    if ((i ? i[1] : "").includes(g)) {
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
}, wo = () => {
  const e = [];
  return Oe.length > 0 && Oe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Tt = 5, vo = 3, Ao = (e, t) => {
  if (!e)
    return;
  const n = N(Zt.times.atLeast(Tt).or(j.times.atLeast(vo * Tt)), [
    F,
    H
  ]);
  e.content.match(n)?.forEach((o) => {
    const i = I(e.content, o);
    ct.push({
      filePath: t,
      message: `line #${r} ${x}indentation: ${o.length}${b}`
    });
  });
}, Oo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${m}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, at = [], xo = (e, t) => {
  if (!e)
    return;
  const n = N("<a", M, [F, H]), s = e.content.match(n);
  s?.length && at.push({ filePath: t, message: `${s?.length} ${x}html link found${b}` });
}, Co = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${m}`,
      description: `👉 ${O}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], So = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, r) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[i + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && lt.push({
        filePath: t,
        message: `line #${i} if statement without curly braces: ${z}${u}${b}`
      });
    }
  });
}, _o = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${m}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], No = (e, t) => {
  if (!e)
    return;
  const n = N(S(hs).as("magicNumber"), fs(")", Qt), [F]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const i = s.groups?.magicNumber || "", u = I(e.content, i, o);
    ut.push({
      filePath: t,
      message: `line #${u} ${x}magic number: ${r}${b}`
    }), o = u;
  }
}, Ro = () => {
  const e = [];
  return ut.length && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${m}`,
      description: `👉 ${O}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ft = [], jo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], i = s[2];
    i.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && i.split(`
`).length === 1 && ft.push({ filePath: t, message: `Element ${x}<${o}>${b} should have its attributes on separate lines` });
  }
}, Lo = () => {
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
      const i = o[1];
      To.includes(i) && ht.push({ filePath: t, message: `${x}(${i})${b}` });
    }
  });
}, Po = () => {
  const e = [];
  return ht.length > 0 && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, pt = [], Wo = (e, t) => {
  if (!e)
    return;
  const n = N(S(ve), j, "?", j, S(ve), j, ":", j, S(ve));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const i = I(e.content, o);
      pt.push({
        filePath: t,
        message: `line #${r} has ${x}nested ternary${b}`
      });
    }
  });
}, Io = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${m}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, mt = [], Bo = (e, t) => {
  if (!e)
    return;
  const n = N('v-for="(', j.times.any(), S(V).grouped(), j.times.any(), ",", j.times.any(), S(V).grouped(), j.times.any(), ")", S(j), "in", S(j), S(V).grouped(), [F]), s = N(':key="', j.times.any(), S(V).grouped(), j.times.any(), '"', [F]), o = [...e.content.matchAll(n)], i = [...e.content.matchAll(s)];
  o.forEach((u) => {
    const [h, g, w, A] = u;
    i.forEach((_) => {
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
}, Mo = () => {
  const e = [];
  return mt.length > 0 && mt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], ko = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], i = s[1], u = I(e.content.trim(), o);
    dt.push({
      filePath: t,
      message: `line #${u} zero length comparison found ${x}(${i})${b}`
    });
  }
}, zo = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${O}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Do = (e, t, n) => {
  const s = {}, o = ({ file: g, rule: w, title: A, description: _, message: L }) => {
    const Z = e === "rule" ? w : g;
    s[Z] || (s[Z] = []), s[Z].push({ file: g, rule: w, title: A, description: _, message: L });
  }, i = (g) => {
    g().forEach((A) => {
      o(A);
    });
  };
  i(Es), i(Os), i(_s), i(Cs), i(vs), i(Rs), i(yo), i(Us), i(Gs), i(Lo), i(Ts), i(Bs), i(ks), i($o), i(Ws), i(qs), i(Qs), i(wo), i(Po), i(bs), i(Oo), i(ms), i(co), i(Co), i(_o), i(Ro), i(Io), i(lo), i(is), i(fo), i(os), i(po), i(Js), i(Mo), i(zo);
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
}, Uo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && (As(s, t), o && (ys(t), ws(e.styles, t), Ss(e.template, t), xs(e.template, t))), n.includes("vue-strong") && (go(s, t), o && (bo(s, t), Ls(s, t), Ns(t), Ms(e, t), Ps(e.template, t), Is(e, t), Ds(e, t), Vs(t), jo(e.template, t))), n.includes("vue-recommended") && o && (Ks(e.source, t), Zs(e.template, t)), n.includes("vue-caution") && o && (Eo(s, t), Fo(e.styles, t)), n.includes("rrd") && ($s(s, t), Ao(s, t), ps(s, t), io(s, t), So(s, t), No(s, t), Wo(s, t), ao(s, t), uo(s, t), ss(s, t), ho(s, t), Xs(s, t), ko(s, t), o && (xo(e.template, t), rs(e.script, t), Bo(e.template, t)));
}, Ho = 1.5, Ft = 75, Pt = 85, Wt = 95, Vo = ["rule", "file"], Go = ["asc", "desc"], Ko = ["all", "error"], qo = {
  groupBy: Vo,
  orderBy: Go,
  outputLevel: Ko
};
function Te(e, t) {
  const n = qo[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function Zo(e, t, n) {
  const { errors: s, warnings: o } = e.reduce((u, { errors: h, warnings: g }) => ({ errors: u.errors + h, warnings: u.warnings + g }), { errors: 0, warnings: 0 });
  console.log(`Found ${z}${Intl.NumberFormat("en-US").format(s)} errors${b}, and ${x}${Intl.NumberFormat("en-US").format(o)} warnings${b}, ${D}${Intl.NumberFormat("en-US").format(t)} lines${b} of code in ${D}${Intl.NumberFormat("en-US").format(n)} files${b}`);
  const i = Math.ceil((1 - (s * Ho + o) / t) * 100);
  return i < Ft && console.log(`${z}Code health is LOW: ${i}%${b}`), i >= Ft && i < Pt && console.log(`${x}Code health is MEDIUM ${i}%${b}`), i >= Pt && i < Wt && console.log(`${D}Code health is OK: ${i}%${b}`), i >= Wt && console.log(`${Kt}Code health is GOOD: ${i}%${b}`), { errors: s, warnings: o };
}
let gt = 0, tn = 0, nn = [];
const Qo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", "vendor"], sn = async (e) => {
  if (!(await ie.stat(e)).isDirectory()) {
    await It(e, e);
    return;
  }
  const n = await ie.readdir(e);
  for (const s of n) {
    const o = oe.join(e, s);
    (await ie.stat(o)).isDirectory() && (Qo.some((u) => o.includes(u)) || await sn(o)), await It(o, o);
  }
}, It = async (e, t) => {
  if (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js")) {
    gt++;
    const n = await ie.readFile(t, "utf-8");
    tn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = _n(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), Uo(s, t, nn);
  }
}, Yo = async ({ dir: e, level: t, apply: n = [], groupBy: s, orderBy: o }) => {
  const i = ne.filter((w) => !n.includes(w));
  console.log(`

${D}Analyzing Vue, TS and JS files in ${e}${b}`), console.log(`Applying ${D}${n.length}${b} rulesets ${D}${n}${b}
    Ignoring ${D}${i.length}${b} rulesets ${D}${i}${b}
    Output level ${D}${t}${b}
    Grouping by ${D}${s}${b}
    Ordering ${D}${o}${b}`), nn = n, await sn(e), console.log(`Found ${D}${gt}${b} files`);
  const u = Do(s, o, t), { errors: h, warnings: g } = Zo(u, tn, gt);
  !h && !g && console.log(`${Kt}No code smells detected!${b}`);
}, Xo = async () => {
  let e = process.cwd();
  for (; e !== oe.parse(e).root; ) {
    const t = oe.join(e, "package.json");
    return await ie.access(t), e;
  }
  e = oe.dirname(e);
}, on = await Xo();
on || (console.error(`
${z}Cannot find project root.${b}

`), process.exit(1));
let ee = {
  path: "./src",
  apply: ne.join(","),
  ignore: void 0,
  group: "rule",
  level: "all",
  order: "desc"
};
try {
  const e = oe.join(on, "vue-mess-detector.json");
  ee = JSON.parse(await ie.readFile(e, "utf-8")), console.log(`👉 Using configuration from ${e}`);
} catch {
  console.log("👉 Using default configuration");
}
$n(jn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(ee).positional("path", {
    describe: "path to the Vue files",
    default: ee.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: ne,
    coerce: Bt("apply"),
    group: "Filter Rulesets:",
    default: ee.apply
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Te(t, "groupBy"),
    default: ee.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => Te(t, "outputLevel"),
    default: ee.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: ne,
    coerce: Bt("ignore"),
    default: ee.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => Te(t, "orderBy"),
    default: ee.order,
    group: "Order Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${z}Cannot use both --ignore and --apply options together.${b}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...ne];
    e.apply && (t = e.apply), e.ignore && (t = ne.filter((n) => !e.ignore.includes(n))), Yo({ dir: e.path, level: e.level, apply: t, groupBy: e.group, orderBy: e.order });
  }
).help().argv;
function Bt(e) {
  return (t) => {
    const n = t?.split(",");
    if (!n)
      return;
    const s = n.filter((o) => !ne.includes(o));
    return s.length > 0 && (console.error(
      `
${z}Invalid ${e} values: ${s.join(
        ", "
      )}${b}. 
${O}Allowed values are: ${[...ne].join(", ")}${m}

`
    ), process.exit(1)), n;
  };
}
