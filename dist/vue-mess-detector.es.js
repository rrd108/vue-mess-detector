import fn from "yargs";
import { format as Ft, inspect as hn } from "util";
import { normalize as pn, resolve as oe, dirname as je, basename as mn, extname as dn, relative as gn } from "path";
import { readFileSync as ht, statSync as Pt, readdirSync as $n, writeFile as bn } from "fs";
import { notStrictEqual as yn, strictEqual as En } from "assert";
import { fileURLToPath as wn } from "url";
import Ce from "node:fs/promises";
import pt from "node:path";
import { parse as vn } from "@vue/compiler-sfc";
class ae extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ae);
  }
}
function Wt() {
  return An() ? 0 : 1;
}
function An() {
  return On() && !process.defaultApp;
}
function On() {
  return !!process.versions.electron;
}
function xn(e) {
  return e.slice(Wt() + 1);
}
function Cn() {
  return process.argv[Wt()];
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
function It(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const i = n.charAt(o), u = e.charAt(o);
    i !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Bt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Sn(e) {
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
let Y;
class _n {
  constructor(t) {
    Y = t;
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
    }, n), o = Sn(t), i = typeof t == "string", u = Nn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), g = Object.assign(/* @__PURE__ */ Object.create(null), s.default), v = s.configObjects || [], A = s.envPrefix, R = h["populate--"], L = R ? "--" : "_", ne = /* @__PURE__ */ Object.create(null), mt = /* @__PURE__ */ Object.create(null), ee = s.__ || Y.format, f = {
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
    })), sn(s.key, u, s.default, f.arrays), Object.keys(g).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        g[a] = g[r];
      });
    });
    let H = null;
    un();
    let he = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), dt = {};
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
    $t(T, !0), $t(T, !1), Jt(T), en(), bt(T, f.aliases, g, !0), tn(T), h["set-placeholder-key"] && nn(T), Object.keys(f.counts).forEach(function(r) {
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
        return X(l) || (H = Error(ee("Argument unexpected for: %s", a))), N(a, se(a)), r;
      let m = X(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + m < $ && (H = Error(ee("Not enough arguments following: %s", a))), m = $;
      else {
        for (c = r + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Q) || ge(p[c])); c++)
          m++;
        m < $ && (H = Error(ee("Not enough arguments following: %s", a)));
      }
      let b = Math.min(m, $);
      for (!X(l) && b > 0 && (N(a, l), b--), c = r + 1; c < b + r + 1; c++)
        N(a, p[c]);
      return r + b;
    }
    function me(r, a, p, l) {
      let c = [], $ = l || p[r + 1];
      const m = w(a, f.nargs);
      if (w(a, f.bools) && !/^(true|false)$/.test($))
        c.push(!0);
      else if (X($) || X(l) && /^-/.test($) && !Q.test($) && !ge($)) {
        if (g[a] !== void 0) {
          const b = g[a];
          c = Array.isArray(b) ? b : [b];
        }
      } else {
        X(l) || c.push(Oe(a, l, !0));
        for (let b = r + 1; b < p.length && !(!h["greedy-arrays"] && c.length > 0 || m && typeof m == "number" && c.length >= m || ($ = p[b], /^-/.test($) && !Q.test($) && !ge($))); b++)
          r = b, c.push(Oe(a, $, i));
      }
      return typeof m == "number" && (m && c.length < m || isNaN(m) && c.length === 0) && (H = Error(ee("Not enough arguments following: %s", a))), N(a, c), r;
    }
    function N(r, a, p = i) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const $ = r.split(".").map(function(m) {
          return ce(m);
        }).join(".");
        gt(r, $);
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
        Object.defineProperty(dt, m, {
          enumerable: !0,
          get() {
            return a;
          },
          set(b) {
            a = typeof b == "string" ? Y.normalize(b) : b;
          }
        });
      });
    }
    function gt(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], ne[a] = !0), f.aliases[a] && f.aliases[a].length || gt(a, r);
    }
    function Oe(r, a, p) {
      p && (a = Rn(a)), (w(r, f.bools) || w(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(c) {
        return de(r, c);
      }) : de(r, a);
      return w(r, f.counts) && (X(l) || typeof l == "boolean") && (l = Se()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(a) ? l = a.map((c) => Y.normalize(c)) : l = Y.normalize(a)), l;
    }
    function de(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(a) && (Bt(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !X(a) && w(r, f.numbers)) && (a = Number(a)), a;
    }
    function Jt(r) {
      const a = /* @__PURE__ */ Object.create(null);
      bt(a, f.aliases, g), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || a[p];
        if (l)
          try {
            let c = null;
            const $ = Y.resolve(Y.cwd(), l), m = f.configs[p];
            if (typeof m == "function") {
              try {
                c = m($);
              } catch (b) {
                c = b;
              }
              if (c instanceof Error) {
                H = c;
                return;
              }
            } else
              c = Y.require($);
            xe(c);
          } catch (c) {
            c.name === "PermissionDenied" ? H = c : r[p] && (H = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function xe(r, a) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], c = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? xe(l, c) : (!re(T, c.split(".")) || w(c, f.arrays) && h["combine-arrays"]) && N(c, l);
      });
    }
    function en() {
      typeof v < "u" && v.forEach(function(r) {
        xe(r);
      });
    }
    function $t(r, a) {
      if (typeof A > "u")
        return;
      const p = typeof A == "string" ? A : "", l = Y.env();
      Object.keys(l).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const $ = c.split("__").map(function(m, b) {
            return b === 0 && (m = m.substring(p.length)), ce(m);
          });
          (a && f.configs[$.join(".")] || !a) && !re(r, $) && N($.join("."), l[c]);
        }
      });
    }
    function tn(r) {
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
            H = c;
          }
      });
    }
    function nn(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function bt(r, a, p, l = !1) {
      Object.keys(p).forEach(function(c) {
        re(r, c.split(".")) || (ie(r, c.split("."), p[c]), l && (mt[c] = !0), (a[c] || []).forEach(function($) {
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
        P = Et(P), typeof l == "object" && l[P] === void 0 && (l[P] = {}), typeof l[P] != "object" || Array.isArray(l[P]) ? (Array.isArray(l[P]) ? l[P].push({}) : l[P] = [l[P], {}], l = l[P][l[P].length - 1]) : l = l[P];
      });
      const c = Et(a[a.length - 1]), $ = w(a.join("."), f.arrays), m = Array.isArray(p);
      let b = h["duplicate-arguments-array"];
      !b && w(c, f.nargs) && (b = !0, (!X(l[c]) && f.nargs[c] === 1 || Array.isArray(l[c]) && l[c].length === f.nargs[c]) && (l[c] = void 0)), p === Se() ? l[c] = Se(l[c]) : Array.isArray(l[c]) ? b && $ && m ? l[c] = h["flatten-duplicate-arrays"] ? l[c].concat(p) : (Array.isArray(l[c][0]) ? l[c] : [l[c]]).concat([p]) : !b && !!$ == !!m ? l[c] = p : l[c] = l[c].concat([p]) : l[c] === void 0 && $ ? l[c] = m ? p : [p] : b && !(l[c] === void 0 || w(c, f.counts) || w(c, f.bools)) ? l[c] = [l[c], p] : l[c] = p;
    }
    function sn(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const c = ce(l);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), ne[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const c = It(l, "-");
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
    function yt(r) {
      const a = Object.keys(f);
      return [].concat(a.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function on(r, ...a) {
      return [].concat(...a).some(function(l) {
        const c = r.match(l);
        return c && yt(c[1]);
      });
    }
    function rn(r) {
      if (r.match(Q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = r.slice(1).split("");
      for (let c = 0; c < l.length; c++) {
        if (p = r.slice(c + 2), !yt(l[c])) {
          a = !1;
          break;
        }
        if (l[c + 1] && l[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[c + 1] && l[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ge(r) {
      return h["unknown-options-as-args"] && cn(r);
    }
    function cn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Q) || rn(r) ? !1 : !on(r, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function se(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in g ? g[r] : an(ln(r));
    }
    function an(r) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[r];
    }
    function ln(r) {
      let a = K.BOOLEAN;
      return w(r, f.strings) ? a = K.STRING : w(r, f.numbers) ? a = K.NUMBER : w(r, f.bools) ? a = K.BOOLEAN : w(r, f.arrays) && (a = K.ARRAY), a;
    }
    function X(r) {
      return r === void 0;
    }
    function un() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (H = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (H = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(dt, T),
      configuration: h,
      defaulted: Object.assign({}, mt),
      error: H,
      newAliases: Object.assign({}, ne)
    };
  }
}
function Nn(e) {
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
function Et(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Rn(e) {
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
const wt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, vt = (Ne = (_e = process == null ? void 0 : process.versions) === null || _e === void 0 ? void 0 : _e.node) !== null && Ne !== void 0 ? Ne : (Re = process == null ? void 0 : process.version) === null || Re === void 0 ? void 0 : Re.slice(1);
if (vt && Number(vt.match(/^([^.]+)/)[1]) < wt)
  throw Error(`yargs parser supports a minimum Node.js version of ${wt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const jn = process ? process.env : {}, Mt = new _n({
  cwd: process.cwd,
  env: () => jn,
  format: Ft,
  normalize: pn,
  resolve: oe,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(ht(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return Mt.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return Mt.parse(e.slice(), t);
};
fe.camelCase = ce;
fe.decamelize = It;
fe.looksLikeNumber = Bt;
const Ln = {
  right: Bn,
  center: Mn
}, Tn = 0, $e = 1, Fn = 2, be = 3;
class Pn {
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
          const L = Ln[t[h].align];
          A = L(A, v), I.stringWidth(A) < v && (A += " ".repeat((g || 0) - I.stringWidth(A) - 1));
        }
        const R = t[h].padding || [0, 0, 0, 0];
        R[be] && (i += " ".repeat(R[be])), i += At(t[h], A, "| "), i += A, i += At(t[h], A, " |"), R[$e] && (i += " ".repeat(R[$e])), o === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
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
`), i.border && (o.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (o.unshift(...new Array(i.padding[Tn] || 0).fill("")), o.push(...new Array(i.padding[Fn] || 0).fill(""))), o.forEach((h, g) => {
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
    return o.map((u, h) => u === void 0 ? Math.max(i, Wn(t[h])) : u);
  }
}
function At(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Wn(e) {
  const t = e.padding || [], n = 1 + (t[be] || 0) + (t[$e] || 0);
  return e.border ? n + 4 : n;
}
function In() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Bn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Mn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let I;
function kn(e, t) {
  return I = t, new Pn({
    width: e?.width || In(),
    wrap: e?.wrap
  });
}
const kt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function zt(e) {
  return e.replace(kt, "");
}
function zn(e, t) {
  const [n, s] = e.match(kt) || ["", ""];
  e = zt(e);
  let o = "";
  for (let i = 0; i < e.length; i++)
    i !== 0 && i % t === 0 && (o += `
`), o += e.charAt(i);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Dn(e) {
  return kn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: zt,
    wrap: zn
  });
}
function Un(e, t) {
  let n = oe(".", e), s;
  for (Pt(n).isDirectory() || (n = je(n)); ; ) {
    if (s = t(n, $n(n)), s)
      return oe(n, s);
    if (n = je(s = n), s === n)
      break;
  }
}
const Vn = {
  fs: {
    readFileSync: ht,
    writeFile: bn
  },
  format: Ft,
  resolve: oe,
  exists: (e) => {
    try {
      return Pt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let G;
class Hn {
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
function Gn(e, t) {
  G = t;
  const n = new Hn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Kn = (e) => Gn(e, Vn), qn = "require is not supported by ESM", Ot = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = wn(import.meta.url);
} catch {
  le = process.cwd();
}
const Qn = le.substring(0, le.lastIndexOf("node_modules"));
yn, En, hn, Qn || process.cwd(), mn, je, dn, gn, oe, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ht, Kn({
  directory: oe(le, "../../../locales"),
  updateFiles: !1
});
const q = "\x1B[44m", x = "\x1B[43m", V = "\x1B[41m", Dt = "\x1B[42m", y = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", d = "\x1B[0m", Zn = {
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
}, te = Object.keys(Zn), Le = [], Te = 100, Xn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Te && Le.push({ filePath: t, message: `${n.length > Te * 2 ? V : x}(${n.length} lines)${y}` });
}, Yn = () => {
  const e = [];
  return Le.length > 0 && Le.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Te} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], Jn = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${x}Plain <script> block${y} found` });
}, es = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ts = /^(\(.*\)|\\?.)$/;
function J(e) {
  const t = e.toString();
  return ts.test(t) ? t : `(?:${t})`;
}
const ns = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, ss = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(ns, "$1$2")})`);
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
    grouped: () => E(`${e}`.replace(ss, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const os = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function rs(...e) {
  return E(`(?:${e.map((t) => z(t)).join("|")})`);
}
const ye = E(".");
E("\\b\\w+\\b");
const U = E("\\w"), B = E("\\b"), is = E("\\d"), j = E("\\s"), Ut = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Vt = E("\\t"), Ht = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Z(...e) {
  return E(`${J(z(...e))}?`);
}
function z(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(os, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${J(z(...e))}+`);
}
const D = "i", F = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, Pe = [], cs = (e, t) => {
  if (!e)
    return;
  const n = _(B, "else", B, [F, D]), s = e.content.match(n);
  s?.length && Pe.push({ filePath: t, message: `else clauses found ${V}(${s.length})${y}` });
}, as = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${d}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], ls = 5, us = 10, fs = (e, t) => {
  if (!e)
    return;
  const n = _(B, "if", B, [F, D]), s = _(B, "else", B, [F, D]), o = _(B, "for", B, [F, D]), i = _(B, "while", B, [F, D]), u = _(B, "case", B, [F, D]), h = e.content.match(n), g = e.content.match(s), v = e.content.match(o), A = e.content.match(i), R = e.content.match(u), L = (h?.length || 0) + (g?.length || 0) + (v?.length || 0) + (A?.length || 0) + (R?.length || 0);
  L > ls && We.push({ filePath: t, message: `${L > us ? V : x}(${L})${y}` });
}, hs = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${O}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], ps = (e) => {
  if (e.includes("pages"))
    return;
  const t = pt.basename(e);
  if (t === "App.vue")
    return;
  const n = _(Ut.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${x}single word${y}` });
}, ms = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${d}`,
      description: `👉 ${O}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], ds = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${x}global style${y} used`
    });
  });
}, gs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${d}`,
      description: `👉 ${O}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], $s = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [F, D]);
  e.content.match(n)?.length && Me.push({ filePath: t, message: `${x}Props type${y} not defined` });
}, bs = () => {
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
}, ke = [], ys = (e, t) => {
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
}, Es = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${O}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ws = (e, t) => {
  if (!e)
    return;
  const n = _("<", S(M(">")), " v-for", S(M(">")), ">", [
    F,
    D
  ]), s = e.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${x}without a key${y}` }));
}, vs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], As = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = pt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = t.match(o);
  !s?.length && !i?.length && De.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${y}` });
}, Os = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], xs = /^[a-z]+([A-Z][a-z]*)*$/, Cs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((i) => i.split(":")[0]).filter((i) => i.length).filter((i) => !xs.test(i)).length && Ue.push({ filePath: t, message: `prop names are ${x}not camelCased${y}` });
}, Ss = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${O}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], _s = 40, Ns = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > _s) {
      const i = k(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${i} ${x}${u}${y}`
      });
    }
  });
}, Rs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${O}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], js = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(U),
    Z(S(ue(` 	
\r`))),
    S(M("/>")),
    Z(S(ue(` 	
\r`))),
    Z("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const i = _(":", S(U), Z(" "), "=", Z(" "), M(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(i);
    if (h?.length) {
      const g = k(e.source, u);
      He.push({ filePath: t, message: `line #${g} ${x}${h}${y}` });
    }
  });
}, Ls = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${O}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ts = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(Ut.uppercase, U),
    Z(Ht, Vt),
    Z(S(M(">"))),
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
}, Fs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${O}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], xt = [], Ps = ["v-slot", "v-bind", "v-on"], Ws = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ps.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = k(e.source, s);
      Ke.push({ filePath: t, message: `line #${o} ${x}${s}${y}` }), xt.some((i) => i.filePath === t) || xt.push({ filePath: t });
    }
  });
}, Is = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Bs = 3, Ms = (e) => {
  const t = _(
    S(M("/")).grouped(),
    z(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = _(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [F]
    ), i = s.match(o);
    (!i || i.length < Bs) && qe.push({ filePath: e, message: `${s} is not a ${x}full word.${y}` });
  }
}, ks = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${d}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], zs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), i = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: i }
  ].filter((g) => g.index !== -1);
  u.every((g, v) => v === 0 ? !0 : u[v - 1].index < g.index) || Qe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${y}` });
}, Ds = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${d}`,
      description: `👉 ${O}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Ct = [
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
], Us = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let i;
  for (; (i = s.exec(n)) !== null; ) {
    const u = i[1], h = i[2];
    if (h) {
      const v = Array.from(h.matchAll(o), (R) => R[1]).filter((R) => Ct.includes(R));
      let A = -1;
      for (const R of v) {
        const L = Ct.indexOf(R);
        if (L !== -1 && L < A) {
          Ze.push({
            filePath: t,
            message: `tag has attributes out of order ${x}(${u})${y}`
          });
          break;
        }
        A = L;
      }
    }
  }
}, Vs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Hs = 5, Gs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Z("<"), Z("("), "{", S(ye), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Hs && Xe.push({ filePath: t, message: `props found ${V}(${o})${y}` });
  }
}, Ks = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${d}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Gt = 20;
function qs(e, t, n) {
  t.split(`
`).length > Gt && Ye.push({ filePath: n, message: `function ${V}(${Js(e)})${y} is too long` });
}
function Qs(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.startsWith("const"))
    for (s += 5; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function Zs(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function Xs(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function Ys(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const i = e[o];
    i === "{" && n++, i === "}" && n--, s += i, o++;
  }
  return { body: s, end: o };
}
function Js(e) {
  return e.replace(/^const\s*/, "");
}
const eo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let i = "", u = "", h = !1;
    if (n.slice(o, o + 8) === "function" && (o += 8, h = !0, i = Qs(n, o), o = Zs(n, o)), n.slice(o, o + 5) === "const") {
      const g = Xs(n, o);
      g && (h = !0, i = g.name, o = g.bodyStart);
    }
    if (h) {
      const { body: g, end: v } = Ys(n, o);
      u = g, o = v, qs(i, u, t);
    }
    h || o++;
  }
}, to = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${d}`,
      description: `👉 ${O}Functions must be shorter than ${Gt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Kt = 3, St = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Kt && Je.push({ filePath: n, message: `function ${x}${e}${y} has ${x}${s.length}${y} parameters` });
}, no = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? St(s[1], s[2], t) : s[3] && St(s[3], s[4], t);
}, so = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${d}`,
      description: `👉 ${O}Max number of function parameters should be ${Kt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], oo = (e, t) => {
  if (!e)
    return;
  const n = _(
    "defineProps(",
    j.times.any(),
    "[",
    j.times.any(),
    S(ue(`'"`), S(U), ue(`'"`), j.times.any(), Z(",", j.times.any())),
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
    i.has(v) && g === v && et.push({
      filePath: t,
      message: `Prop ${x}(${v})${y} is being drilled through ${x}${h}${y} component unmodified.`
    });
  }
}, ro = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${d}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], qt = 4, io = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < qt && tt.push({ filePath: t, message: `${V}(${o})${y}` });
  }
}, co = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${d}`,
      description: `👉 ${O}Variable names must have a minimum length of ${qt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qt = [], Ee = [], ao = 5, lo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > ao) {
      const i = o.split(`
`)[0], u = k(e.content, i);
      Qt.push({ filePath: t, message: `line #${u} ${x}computed${y}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, uo = () => {
  const e = [];
  return Ee.length > 0 && Qt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], fo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const i = k(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${i} ${x}(${u})${y}` });
  });
}, ho = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${d}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], po = (e, t) => {
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
}, mo = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], _t = 5, go = 3, $o = (e, t) => {
  if (!e)
    return;
  const n = _(Vt.times.atLeast(_t).or(j.times.atLeast(go * _t)), [
    F,
    D
  ]);
  e.content.match(n)?.forEach((o) => {
    const i = k(e.content, o);
    st.push({
      filePath: t,
      message: `line #${i} ${x}indentation: ${o.length}${y}`
    });
  });
}, bo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${d}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], yo = (e, t) => {
  if (!e)
    return;
  const n = _("<a", B, [F, D]), s = e.content.match(n);
  s?.length && ot.push({ filePath: t, message: `${s?.length} ${x}html link found${y}` });
}, Eo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${d}`,
      description: `👉 ${O}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], wo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, i) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[i + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${i} if statement without curly braces: ${V}${u}${y}`
      });
    }
  });
}, vo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${d}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], Ao = (e, t) => {
  if (!e)
    return;
  const n = _(is, rs(")", Ht), [F]);
  e.content.match(n)?.forEach((o) => {
    const i = k(e.content, o);
    it.push({
      filePath: t,
      message: `line #${i} ${x}magic number: ${o.length}${y}`
    });
  });
}, Oo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${d}`,
      description: `👉 ${O}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ct = [], xo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], i = s[2];
    i.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && i.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${x}<${o}>${y} should have its attributes on separate lines` });
  }
}, Co = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, So = [
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
], at = [], _o = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const i = o[1];
      So.includes(i) && at.push({ filePath: t, message: `${x}(${i})${y}` });
    }
  });
}, No = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], Ro = (e, t) => {
  if (!e)
    return;
  const n = _(S(ye), j, "?", j, S(ye), j, ":", j, S(ye));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const i = k(e.content, o);
      lt.push({
        filePath: t,
        message: `line #${i} has ${x}nested ternary${y}`
      });
    }
  });
}, jo = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${d}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = _('v-for="(', j.times.any(), S(U).grouped(), j.times.any(), ",", j.times.any(), S(U).grouped(), j.times.any(), ")", S(j), "in", S(j), S(U).grouped(), [F]), s = _(':key="', j.times.any(), S(U).grouped(), j.times.any(), '"', [F]), o = [...e.content.matchAll(n)], i = [...e.content.matchAll(s)];
  o.forEach((u) => {
    const [h, g, v, A] = u;
    i.forEach((R) => {
      const L = R[1];
      if (L === v) {
        const ne = k(e.content.trim(), L);
        ut.push({
          filePath: t,
          message: `line #${ne} ${x}index is being used as :key in v-for${y}`
        });
      }
    });
  });
}, To = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${d}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${d} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fo = (e, t) => {
  const n = {}, s = ({ file: h, rule: g, title: v, description: A, message: R }) => {
    const L = e === "rule" ? g : h;
    n[L] || (n[L] = []), n[L].push({ file: h, rule: g, title: v, description: A, message: R });
  }, o = (h) => {
    h().forEach((v) => {
      s(v);
    });
  };
  o(ms), o(bs), o(vs), o(Es), o(gs), o(Os), o(ho), o(Is), o(ks), o(Co), o(Ss), o(Ls), o(Fs), o(uo), o(Rs), o(Ds), o(Vs), o(mo), o(No), o(hs), o(bo), o(as), o(to), o(Eo), o(vo), o(Oo), o(jo), o(so), o(es), o(ro), o(Yn), o(co), o(Ks), o(To);
  const i = [];
  return Object.keys(n).sort((h, g) => {
    const v = n[h].length, A = n[g].length;
    return t === "desc" ? A - v : v - A;
  }).forEach((h) => {
    console.log(`
 - ${h}`), n[h].forEach((g) => {
      const v = g.message.includes(V);
      if (i.some((A) => A.file === g.file)) {
        const A = i.find((R) => R.file === g.file);
        A && (v ? A.errors++ : A.warnings++);
      } else
        i.push({ file: g.file, errors: v ? 1 : 0, warnings: v ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${g.rule}` : `   File: ${g.file}`), console.log(`   Description: ${g.description}`), console.log(`   Message: ${g.message || "🚨"}
`);
    });
  }), i;
}, Po = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && ($s(s, t), o && (ps(t), ds(e.styles, t), ws(e.template, t), ys(e.template, t))), n.includes("vue-strong") && (lo(s, t), o && (fo(s, t), Cs(s, t), As(t), Ts(e, t), Ns(e.template, t), js(e, t), Ws(e, t), Ms(t), xo(e.template, t))), n.includes("vue-recommended") && o && (zs(e.source, t), Us(e.template, t)), n.includes("vue-caution") && o && (po(s, t), _o(e.styles, t)), n.includes("rrd") && (fs(s, t), $o(s, t), cs(s, t), eo(s, t), wo(s, t), Ao(s, t), Ro(s, t), no(s, t), oo(s, t), Xn(s, t), io(s, t), Gs(s, t), o && (yo(e.template, t), Jn(e.script, t), Lo(e.template, t)));
}, Wo = 1.5, Nt = 75, Rt = 85, jt = 95, Io = ["rule", "file"], Bo = ["asc", "desc"], Mo = {
  groupBy: Io,
  orderBy: Bo
};
function Lt(e, t) {
  const n = Mo[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function ko(e, t, n) {
  const { errors: s, warnings: o } = e.reduce((u, { errors: h, warnings: g }) => ({ errors: u.errors + h, warnings: u.warnings + g }), { errors: 0, warnings: 0 });
  console.log(`Found ${V}${Intl.NumberFormat("en-US").format(s)} errors${y}, and ${x}${Intl.NumberFormat("en-US").format(o)} warnings${y}, ${q}${Intl.NumberFormat("en-US").format(t)} lines${y} of code in ${q}${Intl.NumberFormat("en-US").format(n)} files${y}`);
  const i = Math.ceil((1 - (s * Wo + o) / t) * 100);
  return i < Nt && console.log(`${V}Code health is LOW: ${i}%${y}`), i >= Nt && i < Rt && console.log(`${x}Code health is MEDIUM ${i}%${y}`), i >= Rt && i < jt && console.log(`${q}Code health is OK: ${i}%${y}`), i >= jt && console.log(`${Dt}Code health is GOOD: ${i}%${y}`), { errors: s, warnings: o };
}
let ft = 0, Zt = 0, Xt = [];
const zo = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt"], Yt = async (e) => {
  const t = await Ce.readdir(e);
  for (const n of t) {
    const s = pt.join(e, n);
    if ((await Ce.stat(s)).isDirectory())
      zo.some((i) => s.includes(i)) || await Yt(s);
    else if (n.endsWith(".vue") || n.endsWith(".ts") || n.endsWith(".js")) {
      ft++;
      const i = await Ce.readFile(s, "utf-8");
      Zt += i.split(/\r\n|\r|\n/).length;
      const { descriptor: u } = vn(i);
      (n.endsWith(".ts") || n.endsWith(".js")) && (u.script = { content: i }), Po(u, s, Xt);
    }
  }
}, Do = async ({ dir: e, apply: t = [], groupBy: n, orderBy: s }) => {
  console.log(`

${q}Analyzing Vue, TS and JS files in ${e}${y}`);
  const o = te.filter((g) => !t.includes(g));
  console.log(`Applying ${q}${t.length}${y} rulesets ${q}${t}${y}, ignoring ${q}${o.length}${y} rulesets ${q}${o}${y}, grouping by ${q}${n}${y}, ordering ${q}${s}${y}`), Xt = t, await Yt(e), console.log(`Found ${q}${ft}${y} files`);
  const i = Fo(n, s), { errors: u, warnings: h } = ko(i, Zt, ft);
  !u && !h && console.log(`${Dt}No code smells detected!${y}`);
};
fn(xn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    default: "./"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: te,
    coerce: Tt("ignore"),
    group: "Filter Rulesets:"
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: te,
    coerce: Tt("apply"),
    group: "Filter Rulesets:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Lt(t, "groupBy"),
    default: "rule",
    group: "Group Results:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => Lt(t, "orderBy"),
    default: "asc",
    group: "Order Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${V}Cannot use both --ignore and --apply options together.${y}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), Do({ dir: e.path, apply: t, groupBy: e.group, orderBy: e.order });
  }
).help().argv;
function Tt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !te.includes(o));
    return s.length > 0 && (console.error(
      `
${V}Invalid ${e} values: ${s.join(
        ", "
      )}${y}. 
${O}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
