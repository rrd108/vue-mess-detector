import pn from "yargs";
import { format as Wt, inspect as mn } from "util";
import { normalize as dn, resolve as oe, dirname as je, basename as gn, extname as $n, relative as bn } from "path";
import { readFileSync as pt, statSync as It, readdirSync as yn, writeFile as En } from "fs";
import { notStrictEqual as wn, strictEqual as vn } from "assert";
import { fileURLToPath as An } from "url";
import Ce from "node:fs/promises";
import mt from "node:path";
import { parse as On } from "@vue/compiler-sfc";
class ae extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ae);
  }
}
function Bt() {
  return xn() ? 0 : 1;
}
function xn() {
  return Cn() && !process.defaultApp;
}
function Cn() {
  return !!process.versions.electron;
}
function Sn(e) {
  return e.slice(Bt() + 1);
}
function _n() {
  return process.argv[Bt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ce(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let i = o ? o[0].length : 0; i < e.length; i++) {
      let u = e.charAt(i);
      s && (s = !1, u = u.toUpperCase()), i !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function Mt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const i = n.charAt(o), u = e.charAt(o);
    i !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function kt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Nn(e) {
  if (Array.isArray(e))
    return e.map((u) => typeof u != "string" ? u + "" : u);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const i = [];
  for (let u = 0; u < e.length; u++) {
    if (n = s, s = e.charAt(u), s === " " && !o) {
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
var K;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(K || (K = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let X;
class Rn {
  constructor(t) {
    X = t;
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
    }, n), o = Nn(t), i = typeof t == "string", u = jn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), g = Object.assign(/* @__PURE__ */ Object.create(null), s.default), v = s.configObjects || [], A = s.envPrefix, R = h["populate--"], L = R ? "--" : "_", ne = /* @__PURE__ */ Object.create(null), dt = /* @__PURE__ */ Object.create(null), ee = s.__ || X.format, f = {
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
    }, Q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ve = new RegExp("^--" + h["negation-prefix"] + "(.+)");
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
    })), rn(s.key, u, s.default, f.arrays), Object.keys(g).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        g[a] = g[r];
      });
    });
    let V = null;
    hn();
    let he = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), gt = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], p = a.replace(/^-{3,}/, "---");
      let l, c, $, m, b, P;
      if (a !== "--" && /^-/.test(a) && ge(a))
        Ae(a);
      else if (p.match(/^---+(=|$)/)) {
        Ae(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        m = a.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], f.arrays) ? r = me(r, m[1], o, m[2]) : w(m[1], f.nargs) !== !1 ? r = pe(r, m[1], o, m[2]) : N(m[1], m[2], !0));
      else if (a.match(ve) && h["boolean-negation"])
        m = a.match(ve), m !== null && Array.isArray(m) && m.length >= 2 && (c = m[1], N(c, w(c, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        m = a.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (c = m[1], w(c, f.arrays) ? r = me(r, c, o) : w(c, f.nargs) !== !1 ? r = pe(r, c, o) : (b = o[r + 1], b !== void 0 && (!b.match(/^-/) || b.match(Q)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(b) ? (N(c, b), r++) : N(c, se(c))));
      else if (a.match(/^-.\..+=/))
        m = a.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && N(m[1], m[2]);
      else if (a.match(/^-.\..+/) && !a.match(Q))
        b = o[r + 1], m = a.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (c = m[1], b !== void 0 && !b.match(/^-/) && !w(c, f.bools) && !w(c, f.counts) ? (N(c, b), r++) : N(c, se(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Q)) {
        $ = a.slice(1, -1).split(""), l = !1;
        for (let W = 0; W < $.length; W++) {
          if (b = a.slice(W + 2), $[W + 1] && $[W + 1] === "=") {
            P = a.slice(W + 3), c = $[W], w(c, f.arrays) ? r = me(r, c, o, P) : w(c, f.nargs) !== !1 ? r = pe(r, c, o, P) : N(c, P), l = !0;
            break;
          }
          if (b === "-") {
            N($[W], b);
            continue;
          }
          if (/[A-Za-z]/.test($[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) && w(b, f.bools) === !1) {
            N($[W], b), l = !0;
            break;
          }
          if ($[W + 1] && $[W + 1].match(/\W/)) {
            N($[W], b), l = !0;
            break;
          } else
            N($[W], se($[W]));
        }
        c = a.slice(-1)[0], !l && c !== "-" && (w(c, f.arrays) ? r = me(r, c, o) : w(c, f.nargs) !== !1 ? r = pe(r, c, o) : (b = o[r + 1], b !== void 0 && (!/^(-|--)[^-]/.test(b) || b.match(Q)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(b) ? (N(c, b), r++) : N(c, se(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Q) && w(a.slice(1), f.bools))
        c = a.slice(1), N(c, se(c));
      else if (a === "--") {
        he = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        he = o.slice(r);
        break;
      } else
        Ae(a);
    }
    bt(T, !0), bt(T, !1), tn(T), nn(), yt(T, f.aliases, g, !0), sn(T), h["set-placeholder-key"] && on(T), Object.keys(f.counts).forEach(function(r) {
      re(T, r.split(".")) || N(r, 0);
    }), R && he.length && (T[L] = []), he.forEach(function(r) {
      T[L].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(T).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete T[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete T[r.split(".").map((a) => ce(a)).join(".")], delete T[r];
    });
    function Ae(r) {
      const a = de("_", r);
      (typeof a == "string" || typeof a == "number") && T._.push(a);
    }
    function pe(r, a, p, l) {
      let c, $ = w(a, f.nargs);
      if ($ = typeof $ != "number" || isNaN($) ? 1 : $, $ === 0)
        return Z(l) || (V = Error(ee("Argument unexpected for: %s", a))), N(a, se(a)), r;
      let m = Z(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + m < $ && (V = Error(ee("Not enough arguments following: %s", a))), m = $;
      else {
        for (c = r + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Q) || ge(p[c])); c++)
          m++;
        m < $ && (V = Error(ee("Not enough arguments following: %s", a)));
      }
      let b = Math.min(m, $);
      for (!Z(l) && b > 0 && (N(a, l), b--), c = r + 1; c < b + r + 1; c++)
        N(a, p[c]);
      return r + b;
    }
    function me(r, a, p, l) {
      let c = [], $ = l || p[r + 1];
      const m = w(a, f.nargs);
      if (w(a, f.bools) && !/^(true|false)$/.test($))
        c.push(!0);
      else if (Z($) || Z(l) && /^-/.test($) && !Q.test($) && !ge($)) {
        if (g[a] !== void 0) {
          const b = g[a];
          c = Array.isArray(b) ? b : [b];
        }
      } else {
        Z(l) || c.push(Oe(a, l, !0));
        for (let b = r + 1; b < p.length && !(!h["greedy-arrays"] && c.length > 0 || m && typeof m == "number" && c.length >= m || ($ = p[b], /^-/.test($) && !Q.test($) && !ge($))); b++)
          r = b, c.push(Oe(a, $, i));
      }
      return typeof m == "number" && (m && c.length < m || isNaN(m) && c.length === 0) && (V = Error(ee("Not enough arguments following: %s", a))), N(a, c), r;
    }
    function N(r, a, p = i) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const $ = r.split(".").map(function(m) {
          return ce(m);
        }).join(".");
        $t(r, $);
      }
      const l = Oe(r, a, p), c = r.split(".");
      ie(T, c, l), f.aliases[r] && f.aliases[r].forEach(function($) {
        const m = $.split(".");
        ie(T, m, l);
      }), c.length > 1 && h["dot-notation"] && (f.aliases[c[0]] || []).forEach(function($) {
        let m = $.split(".");
        const b = [].concat(c);
        b.shift(), m = m.concat(b), (f.aliases[r] || []).includes(m.join(".")) || ie(T, m, l);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(m) {
        Object.defineProperty(gt, m, {
          enumerable: !0,
          get() {
            return a;
          },
          set(b) {
            a = typeof b == "string" ? X.normalize(b) : b;
          }
        });
      });
    }
    function $t(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], ne[a] = !0), f.aliases[a] && f.aliases[a].length || $t(a, r);
    }
    function Oe(r, a, p) {
      p && (a = Ln(a)), (w(r, f.bools) || w(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(c) {
        return de(r, c);
      }) : de(r, a);
      return w(r, f.counts) && (Z(l) || typeof l == "boolean") && (l = Se()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(a) ? l = a.map((c) => X.normalize(c)) : l = X.normalize(a)), l;
    }
    function de(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(a) && (kt(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !Z(a) && w(r, f.numbers)) && (a = Number(a)), a;
    }
    function tn(r) {
      const a = /* @__PURE__ */ Object.create(null);
      yt(a, f.aliases, g), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || a[p];
        if (l)
          try {
            let c = null;
            const $ = X.resolve(X.cwd(), l), m = f.configs[p];
            if (typeof m == "function") {
              try {
                c = m($);
              } catch (b) {
                c = b;
              }
              if (c instanceof Error) {
                V = c;
                return;
              }
            } else
              c = X.require($);
            xe(c);
          } catch (c) {
            c.name === "PermissionDenied" ? V = c : r[p] && (V = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function xe(r, a) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], c = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? xe(l, c) : (!re(T, c.split(".")) || w(c, f.arrays) && h["combine-arrays"]) && N(c, l);
      });
    }
    function nn() {
      typeof v < "u" && v.forEach(function(r) {
        xe(r);
      });
    }
    function bt(r, a) {
      if (typeof A > "u")
        return;
      const p = typeof A == "string" ? A : "", l = X.env();
      Object.keys(l).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const $ = c.split("__").map(function(m, b) {
            return b === 0 && (m = m.substring(p.length)), ce(m);
          });
          (a && f.configs[$.join(".")] || !a) && !re(r, $) && N($.join("."), l[c]);
        }
      });
    }
    function sn(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(l) {
        if (!p.has(l) && (a = w(l, f.coercions), typeof a == "function"))
          try {
            const c = de(l, a(r[l]));
            [].concat(f.aliases[l] || [], l).forEach(($) => {
              p.add($), r[$] = c;
            });
          } catch (c) {
            V = c;
          }
      });
    }
    function on(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function yt(r, a, p, l = !1) {
      Object.keys(p).forEach(function(c) {
        re(r, c.split(".")) || (ie(r, c.split("."), p[c]), l && (dt[c] = !0), (a[c] || []).forEach(function($) {
          re(r, $.split(".")) || ie(r, $.split("."), p[c]);
        }));
      });
    }
    function re(r, a) {
      let p = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const l = a[a.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function ie(r, a, p) {
      let l = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(P) {
        P = wt(P), typeof l == "object" && l[P] === void 0 && (l[P] = {}), typeof l[P] != "object" || Array.isArray(l[P]) ? (Array.isArray(l[P]) ? l[P].push({}) : l[P] = [l[P], {}], l = l[P][l[P].length - 1]) : l = l[P];
      });
      const c = wt(a[a.length - 1]), $ = w(a.join("."), f.arrays), m = Array.isArray(p);
      let b = h["duplicate-arguments-array"];
      !b && w(c, f.nargs) && (b = !0, (!Z(l[c]) && f.nargs[c] === 1 || Array.isArray(l[c]) && l[c].length === f.nargs[c]) && (l[c] = void 0)), p === Se() ? l[c] = Se(l[c]) : Array.isArray(l[c]) ? b && $ && m ? l[c] = h["flatten-duplicate-arrays"] ? l[c].concat(p) : (Array.isArray(l[c][0]) ? l[c] : [l[c]]).concat([p]) : !b && !!$ == !!m ? l[c] = p : l[c] = l[c].concat([p]) : l[c] === void 0 && $ ? l[c] = m ? p : [p] : b && !(l[c] === void 0 || w(c, f.counts) || w(c, f.bools)) ? l[c] = [l[c], p] : l[c] = p;
    }
    function rn(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const c = ce(l);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), ne[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const c = Mt(l, "-");
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), ne[c] = !0);
            }
          }), f.aliases[p].forEach(function(l) {
            f.aliases[l] = [p].concat(f.aliases[p].filter(function(c) {
              return l !== c;
            }));
          }));
        });
      });
    }
    function w(r, a) {
      const p = [].concat(f.aliases[r] || [], r), l = Object.keys(a), c = p.find(($) => l.includes($));
      return c ? a[c] : !1;
    }
    function Et(r) {
      const a = Object.keys(f);
      return [].concat(a.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function cn(r, ...a) {
      return [].concat(...a).some(function(l) {
        const c = r.match(l);
        return c && Et(c[1]);
      });
    }
    function an(r) {
      if (r.match(Q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = r.slice(1).split("");
      for (let c = 0; c < l.length; c++) {
        if (p = r.slice(c + 2), !Et(l[c])) {
          a = !1;
          break;
        }
        if (l[c + 1] && l[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[c + 1] && l[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ge(r) {
      return h["unknown-options-as-args"] && ln(r);
    }
    function ln(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Q) || an(r) ? !1 : !cn(r, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function se(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in g ? g[r] : un(fn(r));
    }
    function un(r) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[r];
    }
    function fn(r) {
      let a = K.BOOLEAN;
      return w(r, f.strings) ? a = K.STRING : w(r, f.numbers) ? a = K.NUMBER : w(r, f.bools) ? a = K.BOOLEAN : w(r, f.arrays) && (a = K.ARRAY), a;
    }
    function Z(r) {
      return r === void 0;
    }
    function hn() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(gt, T),
      configuration: h,
      defaulted: Object.assign({}, dt),
      error: V,
      newAliases: Object.assign({}, ne)
    };
  }
}
function jn(e) {
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
    o = o.filter(function(u, h, g) {
      return g.indexOf(u) === h;
    });
    const i = o.pop();
    i !== void 0 && typeof i == "string" && (n[i] = o);
  }), n;
}
function Se(e) {
  return e !== void 0 ? e + 1 : 1;
}
function wt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Ln(e) {
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
var _e, Ne, Re;
const vt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, At = (Ne = (_e = process == null ? void 0 : process.versions) === null || _e === void 0 ? void 0 : _e.node) !== null && Ne !== void 0 ? Ne : (Re = process == null ? void 0 : process.version) === null || Re === void 0 ? void 0 : Re.slice(1);
if (At && Number(At.match(/^([^.]+)/)[1]) < vt)
  throw Error(`yargs parser supports a minimum Node.js version of ${vt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Tn = process ? process.env : {}, zt = new Rn({
  cwd: process.cwd,
  env: () => Tn,
  format: Wt,
  normalize: dn,
  resolve: oe,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(pt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return zt.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return zt.parse(e.slice(), t);
};
fe.camelCase = ce;
fe.decamelize = Mt;
fe.looksLikeNumber = kt;
const Fn = {
  right: kn,
  center: zn
}, Pn = 0, $e = 1, Wn = 2, be = 3;
class In {
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
      o.length > 1 && I.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), I.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((i, u) => ({
        text: i.trim(),
        padding: this.measurePadding(i),
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
    const n = I.stripAnsi(t);
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
      s.forEach((u, h) => {
        const { width: g } = t[h], v = this.negatePadding(t[h]);
        let A = u;
        if (v > I.stringWidth(u) && (A += " ".repeat(v - I.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const L = Fn[t[h].align];
          A = L(A, v), I.stringWidth(A) < v && (A += " ".repeat((g || 0) - I.stringWidth(A) - 1));
        }
        const R = t[h].padding || [0, 0, 0, 0];
        R[be] && (i += " ".repeat(R[be])), i += Ot(t[h], A, "| "), i += A, i += Ot(t[h], A, " |"), R[$e] && (i += " ".repeat(R[$e])), o === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
      }), n.push({
        text: i.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, i = n.text, u = I.stringWidth(i.trimRight());
    return n.span ? this.wrap ? o < u ? t : (n.hidden = !0, i.trimRight() + " ".repeat(o - u) + t.trimLeft()) : (n.hidden = !0, i + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((i, u) => {
      i.width = s[u], this.wrap ? o = I.wrap(i.text, this.negatePadding(i), { hard: !0 }).split(`
`) : o = i.text.split(`
`), i.border && (o.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (o.unshift(...new Array(i.padding[Pn] || 0).fill("")), o.push(...new Array(i.padding[Wn] || 0).fill(""))), o.forEach((h, g) => {
        n[g] || n.push([]);
        const v = n[g];
        for (let A = 0; A < u; A++)
          v[A] === void 0 && v.push("");
        v.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[be] || 0) + (t.padding[$e] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((u) => u.width || I.stringWidth(u.text));
    let n = t.length, s = this.width;
    const o = t.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), i = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(i, Bn(t[h])) : u);
  }
}
function Ot(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Bn(e) {
  const t = e.padding || [], n = 1 + (t[be] || 0) + (t[$e] || 0);
  return e.border ? n + 4 : n;
}
function Mn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function kn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function zn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let I;
function Dn(e, t) {
  return I = t, new In({
    width: e?.width || Mn(),
    wrap: e?.wrap
  });
}
const Dt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ut(e) {
  return e.replace(Dt, "");
}
function Un(e, t) {
  const [n, s] = e.match(Dt) || ["", ""];
  e = Ut(e);
  let o = "";
  for (let i = 0; i < e.length; i++)
    i !== 0 && i % t === 0 && (o += `
`), o += e.charAt(i);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Hn(e) {
  return Dn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Ut,
    wrap: Un
  });
}
function Vn(e, t) {
  let n = oe(".", e), s;
  for (It(n).isDirectory() || (n = je(n)); ; ) {
    if (s = t(n, yn(n)), s)
      return oe(n, s);
    if (n = je(s = n), s === n)
      break;
  }
}
const Gn = {
  fs: {
    readFileSync: pt,
    writeFile: En
  },
  format: Wt,
  resolve: oe,
  exists: (e) => {
    try {
      return It(e).isFile();
    } catch {
      return !1;
    }
  }
};
let G;
class Kn {
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
    })) : s(), G.format.apply(G.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let i = function() {
    };
    typeof t[t.length - 1] == "function" && (i = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = o === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i();
    const h = [u];
    return ~u.indexOf("%d") && h.push(o), G.format.apply(G.format, h.concat(t));
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
      const u = n[i + 1];
      s += o, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, i = n.cb, u = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    G.fs.writeFile(u, h, "utf-8", function(g) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), i(g);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      G.fs.readFileSync && (t = JSON.parse(G.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = G.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = G.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return G.exists(t);
  }
}
function qn(e, t) {
  G = t;
  const n = new Kn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Qn = (e) => qn(e, Gn), Yn = "require is not supported by ESM", xt = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = An(import.meta.url);
} catch {
  le = process.cwd();
}
const Zn = le.substring(0, le.lastIndexOf("node_modules"));
wn, vn, mn, Zn || process.cwd(), gn, je, $n, bn, oe, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, pt, Qn({
  directory: oe(le, "../../../locales"),
  updateFiles: !1
});
const q = "\x1B[44m", x = "\x1B[43m", H = "\x1B[41m", Ht = "\x1B[42m", y = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", d = "\x1B[0m", Xn = {
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
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey"
  ]
}, te = Object.keys(Xn), Le = [], Te = 100, Jn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Te && Le.push({ filePath: t, message: `${n.length > Te * 2 ? H : x}(${n.length} lines)${y}` });
}, es = () => {
  const e = [];
  return Le.length > 0 && Le.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Te} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], ts = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${x}Plain <script> block${y} found` });
}, ns = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ss = /^(\(.*\)|\\?.)$/;
function J(e) {
  const t = e.toString();
  return ss.test(t) ? t : `(?:${t})`;
}
const os = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, rs = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(os, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${z(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${z(...n)})`),
    after: (...n) => E(`(?<=${z(...n)})${e}`),
    before: (...n) => E(`${e}(?=${z(...n)})`),
    notAfter: (...n) => E(`(?<!${z(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${z(...n)})`),
    times: Object.assign((n) => E(`${J(e)}{${n}}`), {
      any: () => E(`${J(e)}*`),
      atLeast: (n) => E(`${J(e)}{${n},}`),
      atMost: (n) => E(`${J(e)}{0,${n}}`),
      between: (n, s) => E(`${J(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${J(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(rs, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const is = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function cs(...e) {
  return E(`(?:${e.map((t) => z(t)).join("|")})`);
}
const ye = E(".");
E("\\b\\w+\\b");
const U = E("\\w"), B = E("\\b"), as = E("\\d"), j = E("\\s"), Vt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Gt = E("\\t"), Kt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Y(...e) {
  return E(`${J(z(...e))}?`);
}
function z(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(is, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${J(z(...e))}+`);
}
const D = "i", F = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, Pe = [], ls = (e, t) => {
  if (!e)
    return;
  const n = _(B, "else", B, [F, D]), s = e.content.match(n);
  s?.length && Pe.push({ filePath: t, message: `else clauses found ${H}(${s.length})${y}` });
}, us = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${d}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], fs = 5, hs = 10, ps = (e, t) => {
  if (!e)
    return;
  const n = _(B, "if", B, [F, D]), s = _(B, "else", B, [F, D]), o = _(B, "for", B, [F, D]), i = _(B, "while", B, [F, D]), u = _(B, "case", B, [F, D]), h = e.content.match(n), g = e.content.match(s), v = e.content.match(o), A = e.content.match(i), R = e.content.match(u), L = (h?.length || 0) + (g?.length || 0) + (v?.length || 0) + (A?.length || 0) + (R?.length || 0);
  L > fs && We.push({ filePath: t, message: `${L > hs ? H : x}(${L})${y}` });
}, ms = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${O}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], ds = (e) => {
  if (e.includes("pages"))
    return;
  const t = mt.basename(e);
  if (t === "App.vue")
    return;
  const n = _(Vt.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${x}single word${y}` });
}, gs = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${d}`,
      description: `👉 ${O}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], $s = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${x}global style${y} used`
    });
  });
}, bs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${d}`,
      description: `👉 ${O}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], ys = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [F, D]);
  e.content.match(n)?.length && Me.push({ filePath: t, message: `${x}Props type${y} not defined` });
}, Es = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${d}`,
      description: `👉 ${O}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, k = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, ke = [], ws = (e, t) => {
  if (!e)
    return;
  const n = _(
    "<",
    S(M(">")),
    " v-if",
    S(M(">")),
    " v-for",
    S(M(">")),
    ">",
    [F, D]
  ), s = _(
    "<",
    S(M(">")),
    " v-for",
    S(M(">")),
    " v-if",
    S(M(">")),
    ">",
    [F, D]
  ), o = e.content.match(n), i = e.content.match(s);
  if (o?.length || i?.length) {
    const u = o?.length ? o[0] : i?.length ? i[0] : "", h = k(e.content, u);
    ke.push({ filePath: t, message: `line #${h} ${x}v-if used with v-for${y}` });
  }
}, vs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${O}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], As = (e, t) => {
  if (!e)
    return;
  const n = _("<", S(M(">")), " v-for", S(M(">")), ">", [
    F,
    D
  ]), s = e.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${x}without a key${y}` }));
}, Os = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], xs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = mt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = t.match(o);
  !s?.length && !i?.length && De.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${y}` });
}, Cs = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], Ss = /^[a-z]+([A-Z][a-z]*)*$/, _s = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((i) => i.split(":")[0]).filter((i) => i.length).filter((i) => !Ss.test(i)).length && Ue.push({ filePath: t, message: `prop names are ${x}not camelCased${y}` });
}, Ns = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${O}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Rs = 40, js = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Rs) {
      const i = k(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      He.push({
        filePath: t,
        message: `line #${i} ${x}${u}${y}`
      });
    }
  });
}, Ls = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${O}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Ts = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(U),
    Y(S(ue(` 	
\r`))),
    S(M("/>")),
    Y(S(ue(` 	
\r`))),
    Y("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const i = _(":", S(U), Y(" "), "=", Y(" "), M(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(i);
    if (h?.length) {
      const g = k(e.source, u);
      Ve.push({ filePath: t, message: `line #${g} ${x}${h}${y}` });
    }
  });
}, Fs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${O}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ps = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(Vt.uppercase, U),
    Y(Kt, Gt),
    Y(S(M(">"))),
    "></",
    S(U),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((i) => {
    const u = k(e.source, i), h = i.split(`
`).at(-1)?.trim() || "";
    Ge.push({ filePath: t, message: `line #${u} ${x}${h}${y}` });
  });
}, Ws = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${O}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ct = [], Is = ["v-slot", "v-bind", "v-on"], Bs = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Is.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = k(e.source, s);
      Ke.push({ filePath: t, message: `line #${o} ${x}${s}${y}` }), Ct.some((i) => i.filePath === t) || Ct.push({ filePath: t });
    }
  });
}, Ms = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], ks = 3, zs = (e) => {
  const t = _(
    S(M("/")).grouped(),
    z(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = _(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [F]
    ), i = s.match(o);
    (!i || i.length < ks) && qe.push({ filePath: e, message: `${s} is not a ${x}full word.${y}` });
  }
}, Ds = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${d}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Us = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), i = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: i }
  ].filter((g) => g.index !== -1);
  u.every((g, v) => v === 0 ? !0 : u[v - 1].index < g.index) || Qe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${y}` });
}, Hs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${d}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], St = [
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
], Vs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let i;
  for (; (i = s.exec(n)) !== null; ) {
    const u = i[1], h = i[2];
    if (h) {
      const v = Array.from(h.matchAll(o), (R) => R[1]).filter((R) => St.includes(R));
      let A = -1;
      for (const R of v) {
        const L = St.indexOf(R);
        if (L !== -1 && L < A) {
          Ye.push({
            filePath: t,
            message: `tag has attributes out of order ${x}(${u})${y}`
          });
          break;
        }
        A = L;
      }
    }
  }
}, Gs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Ks = 5, qs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Y("<"), Y("("), "{", S(ye), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Ks && Ze.push({ filePath: t, message: `props found ${H}(${o})${y}` });
  }
}, Qs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${d}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], qt = 20, Je = 5, _t = 8;
function Ys(e, t, n) {
  t.split(`
`).length > qt && Xe.push({ filePath: n, message: `function ${H}(${to(e)})${y} is too long` });
}
function Zs(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.slice(s, s + Je) === "const")
    for (s += Je; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function Xs(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function Js(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function eo(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const i = e[o];
    i === "{" && n++, i === "}" && n--, s += i, o++;
  }
  return { body: s, end: o };
}
function to(e) {
  return e.replace(/^const\s*/, "");
}
const no = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let i = "", u = "", h = !1;
    if (n.slice(o, o + _t) === "function" && (o += _t, h = !0, i = Zs(n, o), o = Xs(n, o)), n.slice(o, o + Je) === "const") {
      const g = Js(n, o);
      g && (h = !0, i = g.name, o = g.bodyStart);
    }
    if (h) {
      const { body: g, end: v } = eo(n, o);
      u = g, o = v, Ys(i, u, t);
    }
    h || o++;
  }
}, so = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${d}`,
      description: `👉 ${O}Functions must be shorter than ${qt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Qt = 3, Nt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Qt && et.push({ filePath: n, message: `function ${x}${e}${y} has ${x}${s.length}${y} parameters` });
}, oo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Nt(s[1], s[2], t) : s[3] && Nt(s[3], s[4], t);
}, ro = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${d}`,
      description: `👉 ${O}Max number of function parameters should be ${Qt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], io = (e, t) => {
  if (!e)
    return;
  const n = _(
    "defineProps(",
    j.times.any(),
    "[",
    j.times.any(),
    S(ue(`'"`), S(U), ue(`'"`), j.times.any(), Y(",", j.times.any())),
    "]",
    j.times.any(),
    ")",
    [F]
  ), s = _(
    "<",
    S(U).grouped(),
    j,
    M(">").times.any(),
    ":",
    S(U).grouped(),
    j.times.any(),
    "=",
    j.times.any(),
    '"props.',
    S(U).grouped(),
    '"',
    [F]
  );
  let o;
  const i = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((g) => i.add(g));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], g = u[2], v = u[3];
    i.has(v) && g === v && tt.push({
      filePath: t,
      message: `Prop ${x}(${v})${y} is being drilled through ${x}${h}${y} component unmodified.`
    });
  }
}, co = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${d}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Yt = 4, ao = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Yt && nt.push({ filePath: t, message: `${H}(${o})${y}` });
  }
}, lo = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${d}`,
      description: `👉 ${O}Variable names must have a minimum length of ${Yt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Zt = [], Ee = [], uo = 5, fo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > uo) {
      const i = o.split(`
`)[0], u = k(e.content, i);
      Zt.push({ filePath: t, message: `line #${u} ${x}computed${y}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, ho = () => {
  const e = [];
  return Ee.length > 0 && Zt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], po = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const i = k(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    st.push({ filePath: t, message: `line #${i} ${x}(${u})${y}` });
  });
}, mo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${d}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], go = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = _(z("$parent").or("getCurrentInstance"), [F]), i = e.content.match(n), u = e.content.match(s);
  if (u) {
    const g = u[1].split(".")[0], v = i ? i[1] : "";
    if (v.includes(g)) {
      const A = k(e.content.trim(), v);
      we.push({
        filePath: t,
        message: `line #${A} ${x}(${g})${y}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const g = k(e.content.trim(), h[0]);
    we.push({
      filePath: t,
      message: `line #${g} ${x}(${h[0]})${y}`
    });
  }
}, $o = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], Rt = 5, bo = 3, yo = (e, t) => {
  if (!e)
    return;
  const n = _(Gt.times.atLeast(Rt).or(j.times.atLeast(bo * Rt)), [
    F,
    D
  ]);
  e.content.match(n)?.forEach((o) => {
    const i = k(e.content, o);
    ot.push({
      filePath: t,
      message: `line #${i} ${x}indentation: ${o.length}${y}`
    });
  });
}, Eo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${d}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], wo = (e, t) => {
  if (!e)
    return;
  const n = _("<a", B, [F, D]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `${s?.length} ${x}html link found${y}` });
}, vo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${d}`,
      description: `👉 ${O}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], Ao = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, i) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[i + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && it.push({
        filePath: t,
        message: `line #${i} if statement without curly braces: ${H}${u}${y}`
      });
    }
  });
}, Oo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${d}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], xo = (e, t) => {
  if (!e)
    return;
  const n = _(S(as).as("magicNumber"), cs(")", Kt), [F]);
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s.groups?.magicNumber || "", i = k(e.content, o);
    ct.push({
      filePath: t,
      message: `line #${i} ${x}magic number: ${o}${y}`
    });
  }
}, Co = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${d}`,
      description: `👉 ${O}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], So = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], i = s[2];
    i.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && i.split(`
`).length === 1 && at.push({ filePath: t, message: `Element ${x}<${o}>${y} should have its attributes on separate lines` });
  }
}, _o = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, No = [
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
], lt = [], Ro = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const i = o[1];
      No.includes(i) && lt.push({ filePath: t, message: `${x}(${i})${y}` });
    }
  });
}, jo = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = _(S(ye), j, "?", j, S(ye), j, ":", j, S(ye));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const i = k(e.content, o);
      ut.push({
        filePath: t,
        message: `line #${i} has ${x}nested ternary${y}`
      });
    }
  });
}, To = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${d}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], Fo = (e, t) => {
  if (!e)
    return;
  const n = _('v-for="(', j.times.any(), S(U).grouped(), j.times.any(), ",", j.times.any(), S(U).grouped(), j.times.any(), ")", S(j), "in", S(j), S(U).grouped(), [F]), s = _(':key="', j.times.any(), S(U).grouped(), j.times.any(), '"', [F]), o = [...e.content.matchAll(n)], i = [...e.content.matchAll(s)];
  o.forEach((u) => {
    const [h, g, v, A] = u;
    i.forEach((R) => {
      const L = R[1];
      if (L === v) {
        const ne = k(e.content.trim(), L);
        ft.push({
          filePath: t,
          message: `line #${ne} ${x}index is being used as :key in v-for${y}`
        });
      }
    });
  });
}, Po = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${d}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${d} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Wo = (e, t) => {
  const n = {}, s = ({ file: h, rule: g, title: v, description: A, message: R }) => {
    const L = e === "rule" ? g : h;
    n[L] || (n[L] = []), n[L].push({ file: h, rule: g, title: v, description: A, message: R });
  }, o = (h) => {
    h().forEach((v) => {
      s(v);
    });
  };
  o(gs), o(Es), o(Os), o(vs), o(bs), o(Cs), o(mo), o(Ms), o(Ds), o(_o), o(Ns), o(Fs), o(Ws), o(ho), o(Ls), o(Hs), o(Gs), o($o), o(jo), o(ms), o(Eo), o(us), o(so), o(vo), o(Oo), o(Co), o(To), o(ro), o(ns), o(co), o(es), o(lo), o(Qs), o(Po);
  const i = [];
  return Object.keys(n).sort((h, g) => {
    const v = n[h].length, A = n[g].length;
    return t === "desc" ? A - v : v - A;
  }).forEach((h) => {
    console.log(`
 - ${h}`), n[h].forEach((g) => {
      const v = g.message.includes(H);
      if (i.some((A) => A.file === g.file)) {
        const A = i.find((R) => R.file === g.file);
        A && (v ? A.errors++ : A.warnings++);
      } else
        i.push({ file: g.file, errors: v ? 1 : 0, warnings: v ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${g.rule}` : `   File: ${g.file}`), console.log(`   Description: ${g.description}`), console.log(`   Message: ${g.message || "🚨"}
`);
    });
  }), i;
}, Io = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && (ys(s, t), o && (ds(t), $s(e.styles, t), As(e.template, t), ws(e.template, t))), n.includes("vue-strong") && (fo(s, t), o && (po(s, t), _s(s, t), xs(t), Ps(e, t), js(e.template, t), Ts(e, t), Bs(e, t), zs(t), So(e.template, t))), n.includes("vue-recommended") && o && (Us(e.source, t), Vs(e.template, t)), n.includes("vue-caution") && o && (go(s, t), Ro(e.styles, t)), n.includes("rrd") && (ps(s, t), yo(s, t), ls(s, t), no(s, t), Ao(s, t), xo(s, t), Lo(s, t), oo(s, t), io(s, t), Jn(s, t), ao(s, t), qs(s, t), o && (wo(e.template, t), ts(e.script, t), Fo(e.template, t)));
}, Bo = 1.5, jt = 75, Lt = 85, Tt = 95, Mo = ["rule", "file"], ko = ["asc", "desc"], zo = {
  groupBy: Mo,
  orderBy: ko
};
function Ft(e, t) {
  const n = zo[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function Do(e, t, n) {
  const { errors: s, warnings: o } = e.reduce((u, { errors: h, warnings: g }) => ({ errors: u.errors + h, warnings: u.warnings + g }), { errors: 0, warnings: 0 });
  console.log(`Found ${H}${Intl.NumberFormat("en-US").format(s)} errors${y}, and ${x}${Intl.NumberFormat("en-US").format(o)} warnings${y}, ${q}${Intl.NumberFormat("en-US").format(t)} lines${y} of code in ${q}${Intl.NumberFormat("en-US").format(n)} files${y}`);
  const i = Math.ceil((1 - (s * Bo + o) / t) * 100);
  return i < jt && console.log(`${H}Code health is LOW: ${i}%${y}`), i >= jt && i < Lt && console.log(`${x}Code health is MEDIUM ${i}%${y}`), i >= Lt && i < Tt && console.log(`${q}Code health is OK: ${i}%${y}`), i >= Tt && console.log(`${Ht}Code health is GOOD: ${i}%${y}`), { errors: s, warnings: o };
}
let ht = 0, Xt = 0, Jt = [];
const Uo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt"], en = async (e) => {
  const t = await Ce.readdir(e);
  for (const n of t) {
    const s = mt.join(e, n);
    if ((await Ce.stat(s)).isDirectory())
      Uo.some((i) => s.includes(i)) || await en(s);
    else if (n.endsWith(".vue") || n.endsWith("magicNumbers.ts") || n.endsWith(".js")) {
      ht++;
      const i = await Ce.readFile(s, "utf-8");
      Xt += i.split(/\r\n|\r|\n/).length;
      const { descriptor: u } = On(i);
      (n.endsWith(".ts") || n.endsWith(".js")) && (u.script = { content: i }), Io(u, s, Jt);
    }
  }
}, Ho = async ({ dir: e, apply: t = [], groupBy: n, orderBy: s }) => {
  console.log(`

${q}Analyzing Vue, TS and JS files in ${e}${y}`);
  const o = te.filter((g) => !t.includes(g));
  console.log(`Applying ${q}${t.length}${y} rulesets ${q}${t}${y}, ignoring ${q}${o.length}${y} rulesets ${q}${o}${y}, grouping by ${q}${n}${y}, ordering ${q}${s}${y}`), Jt = t, await en(e), console.log(`Found ${q}${ht}${y} files`);
  const i = Wo(n, s), { errors: u, warnings: h } = Do(i, Xt, ht);
  !u && !h && console.log(`${Ht}No code smells detected!${y}`);
};
pn(Sn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    default: "./"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: te,
    coerce: Pt("ignore"),
    group: "Filter Rulesets:"
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: te,
    coerce: Pt("apply"),
    group: "Filter Rulesets:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Ft(t, "groupBy"),
    default: "rule",
    group: "Group Results:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => Ft(t, "orderBy"),
    default: "asc",
    group: "Order Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${H}Cannot use both --ignore and --apply options together.${y}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), Ho({ dir: e.path, apply: t, groupBy: e.group, orderBy: e.order });
  }
).help().argv;
function Pt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !te.includes(o));
    return s.length > 0 && (console.error(
      `
${H}Invalid ${e} values: ${s.join(
        ", "
      )}${y}. 
${O}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
