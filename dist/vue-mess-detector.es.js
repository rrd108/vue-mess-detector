import mn from "yargs";
import { format as It, inspect as dn } from "util";
import { normalize as gn, resolve as oe, dirname as je, basename as $n, extname as bn, relative as yn } from "path";
import { readFileSync as pt, statSync as Bt, readdirSync as En, writeFile as wn } from "fs";
import { notStrictEqual as vn, strictEqual as An } from "assert";
import { fileURLToPath as On } from "url";
import $e from "node:fs/promises";
import mt from "node:path";
import { parse as xn } from "@vue/compiler-sfc";
class ae extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ae);
  }
}
function Mt() {
  return Cn() ? 0 : 1;
}
function Cn() {
  return Sn() && !process.defaultApp;
}
function Sn() {
  return !!process.versions.electron;
}
function _n(e) {
  return e.slice(Mt() + 1);
}
function Nn() {
  return process.argv[Mt()];
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
    let n = "", o = !1;
    const s = e.match(/^-+/);
    for (let c = s ? s[0].length : 0; c < e.length; c++) {
      let u = e.charAt(c);
      o && (o = !1, u = u.toUpperCase()), c !== 0 && (u === "-" || u === "_") ? o = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function kt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let o = "";
  for (let s = 0; s < e.length; s++) {
    const c = n.charAt(s), u = e.charAt(s);
    c !== u && s > 0 ? o += `${t}${n.charAt(s)}` : o += u;
  }
  return o;
}
function zt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Rn(e) {
  if (Array.isArray(e))
    return e.map((u) => typeof u != "string" ? u + "" : u);
  e = e.trim();
  let t = 0, n = null, o = null, s = null;
  const c = [];
  for (let u = 0; u < e.length; u++) {
    if (n = o, o = e.charAt(u), o === " " && !s) {
      n !== " " && t++;
      continue;
    }
    o === s ? s = null : (o === "'" || o === '"') && !s && (s = o), c[t] || (c[t] = ""), c[t] += o;
  }
  return c;
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
class jn {
  constructor(t) {
    X = t;
  }
  parse(t, n) {
    const o = Object.assign({
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
    }, n), s = Rn(t), c = typeof t == "string", u = Ln(Object.assign(/* @__PURE__ */ Object.create(null), o.alias)), f = Object.assign({
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
    }, o.configuration), g = Object.assign(/* @__PURE__ */ Object.create(null), o.default), v = o.configObjects || [], A = o.envPrefix, R = f["populate--"], L = R ? "--" : "_", ne = /* @__PURE__ */ Object.create(null), dt = /* @__PURE__ */ Object.create(null), ee = o.__ || X.format, h = {
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
    }, Q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ae = new RegExp("^--" + f["negation-prefix"] + "(.+)");
    [].concat(o.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      p && (h[p][a] = !0), h.arrays[a] = !0, h.keys.push(a);
    }), [].concat(o.boolean || []).filter(Boolean).forEach(function(r) {
      h.bools[r] = !0, h.keys.push(r);
    }), [].concat(o.string || []).filter(Boolean).forEach(function(r) {
      h.strings[r] = !0, h.keys.push(r);
    }), [].concat(o.number || []).filter(Boolean).forEach(function(r) {
      h.numbers[r] = !0, h.keys.push(r);
    }), [].concat(o.count || []).filter(Boolean).forEach(function(r) {
      h.counts[r] = !0, h.keys.push(r);
    }), [].concat(o.normalize || []).filter(Boolean).forEach(function(r) {
      h.normalize[r] = !0, h.keys.push(r);
    }), typeof o.narg == "object" && Object.entries(o.narg).forEach(([r, a]) => {
      typeof a == "number" && (h.nargs[r] = a, h.keys.push(r));
    }), typeof o.coerce == "object" && Object.entries(o.coerce).forEach(([r, a]) => {
      typeof a == "function" && (h.coercions[r] = a, h.keys.push(r));
    }), typeof o.config < "u" && (Array.isArray(o.config) || typeof o.config == "string" ? [].concat(o.config).filter(Boolean).forEach(function(r) {
      h.configs[r] = !0;
    }) : typeof o.config == "object" && Object.entries(o.config).forEach(([r, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (h.configs[r] = a);
    })), cn(o.key, u, o.default, h.arrays), Object.keys(g).forEach(function(r) {
      (h.aliases[r] || []).forEach(function(a) {
        g[a] = g[r];
      });
    });
    let V = null;
    pn();
    let he = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), gt = {};
    for (let r = 0; r < s.length; r++) {
      const a = s[r], p = a.replace(/^-{3,}/, "---");
      let l, i, $, m, b, P;
      if (a !== "--" && /^-/.test(a) && ge(a))
        Oe(a);
      else if (p.match(/^---+(=|$)/)) {
        Oe(a);
        continue;
      } else if (a.match(/^--.+=/) || !f["short-option-groups"] && a.match(/^-.+=/))
        m = a.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], h.arrays) ? r = me(r, m[1], s, m[2]) : w(m[1], h.nargs) !== !1 ? r = pe(r, m[1], s, m[2]) : N(m[1], m[2], !0));
      else if (a.match(Ae) && f["boolean-negation"])
        m = a.match(Ae), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], N(i, w(i, h.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !f["short-option-groups"] && a.match(/^-[^-]+/))
        m = a.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, h.arrays) ? r = me(r, i, s) : w(i, h.nargs) !== !1 ? r = pe(r, i, s) : (b = s[r + 1], b !== void 0 && (!b.match(/^-/) || b.match(Q)) && !w(i, h.bools) && !w(i, h.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, se(i))));
      else if (a.match(/^-.\..+=/))
        m = a.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && N(m[1], m[2]);
      else if (a.match(/^-.\..+/) && !a.match(Q))
        b = s[r + 1], m = a.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], b !== void 0 && !b.match(/^-/) && !w(i, h.bools) && !w(i, h.counts) ? (N(i, b), r++) : N(i, se(i)));
      else if (a.match(/^-[^-]+/) && !a.match(Q)) {
        $ = a.slice(1, -1).split(""), l = !1;
        for (let W = 0; W < $.length; W++) {
          if (b = a.slice(W + 2), $[W + 1] && $[W + 1] === "=") {
            P = a.slice(W + 3), i = $[W], w(i, h.arrays) ? r = me(r, i, s, P) : w(i, h.nargs) !== !1 ? r = pe(r, i, s, P) : N(i, P), l = !0;
            break;
          }
          if (b === "-") {
            N($[W], b);
            continue;
          }
          if (/[A-Za-z]/.test($[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) && w(b, h.bools) === !1) {
            N($[W], b), l = !0;
            break;
          }
          if ($[W + 1] && $[W + 1].match(/\W/)) {
            N($[W], b), l = !0;
            break;
          } else
            N($[W], se($[W]));
        }
        i = a.slice(-1)[0], !l && i !== "-" && (w(i, h.arrays) ? r = me(r, i, s) : w(i, h.nargs) !== !1 ? r = pe(r, i, s) : (b = s[r + 1], b !== void 0 && (!/^(-|--)[^-]/.test(b) || b.match(Q)) && !w(i, h.bools) && !w(i, h.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, se(i))));
      } else if (a.match(/^-[0-9]$/) && a.match(Q) && w(a.slice(1), h.bools))
        i = a.slice(1), N(i, se(i));
      else if (a === "--") {
        he = s.slice(r + 1);
        break;
      } else if (f["halt-at-non-option"]) {
        he = s.slice(r);
        break;
      } else
        Oe(a);
    }
    bt(T, !0), bt(T, !1), nn(T), sn(), yt(T, h.aliases, g, !0), on(T), f["set-placeholder-key"] && rn(T), Object.keys(h.counts).forEach(function(r) {
      re(T, r.split(".")) || N(r, 0);
    }), R && he.length && (T[L] = []), he.forEach(function(r) {
      T[L].push(r);
    }), f["camel-case-expansion"] && f["strip-dashed"] && Object.keys(T).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete T[r];
    }), f["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      f["camel-case-expansion"] && r.includes("-") && delete T[r.split(".").map((a) => ce(a)).join(".")], delete T[r];
    });
    function Oe(r) {
      const a = de("_", r);
      (typeof a == "string" || typeof a == "number") && T._.push(a);
    }
    function pe(r, a, p, l) {
      let i, $ = w(a, h.nargs);
      if ($ = typeof $ != "number" || isNaN($) ? 1 : $, $ === 0)
        return Z(l) || (V = Error(ee("Argument unexpected for: %s", a))), N(a, se(a)), r;
      let m = Z(l) ? 0 : 1;
      if (f["nargs-eats-options"])
        p.length - (r + 1) + m < $ && (V = Error(ee("Not enough arguments following: %s", a))), m = $;
      else {
        for (i = r + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(Q) || ge(p[i])); i++)
          m++;
        m < $ && (V = Error(ee("Not enough arguments following: %s", a)));
      }
      let b = Math.min(m, $);
      for (!Z(l) && b > 0 && (N(a, l), b--), i = r + 1; i < b + r + 1; i++)
        N(a, p[i]);
      return r + b;
    }
    function me(r, a, p, l) {
      let i = [], $ = l || p[r + 1];
      const m = w(a, h.nargs);
      if (w(a, h.bools) && !/^(true|false)$/.test($))
        i.push(!0);
      else if (Z($) || Z(l) && /^-/.test($) && !Q.test($) && !ge($)) {
        if (g[a] !== void 0) {
          const b = g[a];
          i = Array.isArray(b) ? b : [b];
        }
      } else {
        Z(l) || i.push(xe(a, l, !0));
        for (let b = r + 1; b < p.length && !(!f["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || ($ = p[b], /^-/.test($) && !Q.test($) && !ge($))); b++)
          r = b, i.push(xe(a, $, c));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (V = Error(ee("Not enough arguments following: %s", a))), N(a, i), r;
    }
    function N(r, a, p = c) {
      if (/-/.test(r) && f["camel-case-expansion"]) {
        const $ = r.split(".").map(function(m) {
          return ce(m);
        }).join(".");
        $t(r, $);
      }
      const l = xe(r, a, p), i = r.split(".");
      ie(T, i, l), h.aliases[r] && h.aliases[r].forEach(function($) {
        const m = $.split(".");
        ie(T, m, l);
      }), i.length > 1 && f["dot-notation"] && (h.aliases[i[0]] || []).forEach(function($) {
        let m = $.split(".");
        const b = [].concat(i);
        b.shift(), m = m.concat(b), (h.aliases[r] || []).includes(m.join(".")) || ie(T, m, l);
      }), w(r, h.normalize) && !w(r, h.arrays) && [r].concat(h.aliases[r] || []).forEach(function(m) {
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
      h.aliases[r] && h.aliases[r].length || (h.aliases[r] = [a], ne[a] = !0), h.aliases[a] && h.aliases[a].length || $t(a, r);
    }
    function xe(r, a, p) {
      p && (a = Tn(a)), (w(r, h.bools) || w(r, h.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(i) {
        return de(r, i);
      }) : de(r, a);
      return w(r, h.counts) && (Z(l) || typeof l == "boolean") && (l = Se()), w(r, h.normalize) && w(r, h.arrays) && (Array.isArray(a) ? l = a.map((i) => X.normalize(i)) : l = X.normalize(a)), l;
    }
    function de(r, a) {
      return !f["parse-positional-numbers"] && r === "_" || !w(r, h.strings) && !w(r, h.bools) && !Array.isArray(a) && (zt(a) && f["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !Z(a) && w(r, h.numbers)) && (a = Number(a)), a;
    }
    function nn(r) {
      const a = /* @__PURE__ */ Object.create(null);
      yt(a, h.aliases, g), Object.keys(h.configs).forEach(function(p) {
        const l = r[p] || a[p];
        if (l)
          try {
            let i = null;
            const $ = X.resolve(X.cwd(), l), m = h.configs[p];
            if (typeof m == "function") {
              try {
                i = m($);
              } catch (b) {
                i = b;
              }
              if (i instanceof Error) {
                V = i;
                return;
              }
            } else
              i = X.require($);
            Ce(i);
          } catch (i) {
            i.name === "PermissionDenied" ? V = i : r[p] && (V = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ce(r, a) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], i = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && f["dot-notation"] ? Ce(l, i) : (!re(T, i.split(".")) || w(i, h.arrays) && f["combine-arrays"]) && N(i, l);
      });
    }
    function sn() {
      typeof v < "u" && v.forEach(function(r) {
        Ce(r);
      });
    }
    function bt(r, a) {
      if (typeof A > "u")
        return;
      const p = typeof A == "string" ? A : "", l = X.env();
      Object.keys(l).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const $ = i.split("__").map(function(m, b) {
            return b === 0 && (m = m.substring(p.length)), ce(m);
          });
          (a && h.configs[$.join(".")] || !a) && !re(r, $) && N($.join("."), l[i]);
        }
      });
    }
    function on(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(l) {
        if (!p.has(l) && (a = w(l, h.coercions), typeof a == "function"))
          try {
            const i = de(l, a(r[l]));
            [].concat(h.aliases[l] || [], l).forEach(($) => {
              p.add($), r[$] = i;
            });
          } catch (i) {
            V = i;
          }
      });
    }
    function rn(r) {
      return h.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function yt(r, a, p, l = !1) {
      Object.keys(p).forEach(function(i) {
        re(r, i.split(".")) || (ie(r, i.split("."), p[i]), l && (dt[i] = !0), (a[i] || []).forEach(function($) {
          re(r, $.split(".")) || ie(r, $.split("."), p[i]);
        }));
      });
    }
    function re(r, a) {
      let p = r;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const l = a[a.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function ie(r, a, p) {
      let l = r;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(P) {
        P = wt(P), typeof l == "object" && l[P] === void 0 && (l[P] = {}), typeof l[P] != "object" || Array.isArray(l[P]) ? (Array.isArray(l[P]) ? l[P].push({}) : l[P] = [l[P], {}], l = l[P][l[P].length - 1]) : l = l[P];
      });
      const i = wt(a[a.length - 1]), $ = w(a.join("."), h.arrays), m = Array.isArray(p);
      let b = f["duplicate-arguments-array"];
      !b && w(i, h.nargs) && (b = !0, (!Z(l[i]) && h.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === h.nargs[i]) && (l[i] = void 0)), p === Se() ? l[i] = Se(l[i]) : Array.isArray(l[i]) ? b && $ && m ? l[i] = f["flatten-duplicate-arrays"] ? l[i].concat(p) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([p]) : !b && !!$ == !!m ? l[i] = p : l[i] = l[i].concat([p]) : l[i] === void 0 && $ ? l[i] = m ? p : [p] : b && !(l[i] === void 0 || w(i, h.counts) || w(i, h.bools)) ? l[i] = [l[i], p] : l[i] = p;
    }
    function cn(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          h.aliases[p] || (h.aliases[p] = [].concat(u[p] || []), h.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && f["camel-case-expansion"]) {
              const i = ce(l);
              i !== p && h.aliases[p].indexOf(i) === -1 && (h.aliases[p].push(i), ne[i] = !0);
            }
          }), h.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && f["camel-case-expansion"]) {
              const i = kt(l, "-");
              i !== p && h.aliases[p].indexOf(i) === -1 && (h.aliases[p].push(i), ne[i] = !0);
            }
          }), h.aliases[p].forEach(function(l) {
            h.aliases[l] = [p].concat(h.aliases[p].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function w(r, a) {
      const p = [].concat(h.aliases[r] || [], r), l = Object.keys(a), i = p.find(($) => l.includes($));
      return i ? a[i] : !1;
    }
    function Et(r) {
      const a = Object.keys(h);
      return [].concat(a.map((l) => h[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function an(r, ...a) {
      return [].concat(...a).some(function(l) {
        const i = r.match(l);
        return i && Et(i[1]);
      });
    }
    function ln(r) {
      if (r.match(Q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = r.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (p = r.slice(i + 2), !Et(l[i])) {
          a = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ge(r) {
      return f["unknown-options-as-args"] && un(r);
    }
    function un(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Q) || ln(r) ? !1 : !an(r, /^-+([^=]+?)=[\s\S]*$/, Ae, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function se(r) {
      return !w(r, h.bools) && !w(r, h.counts) && `${r}` in g ? g[r] : fn(hn(r));
    }
    function fn(r) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[r];
    }
    function hn(r) {
      let a = K.BOOLEAN;
      return w(r, h.strings) ? a = K.STRING : w(r, h.numbers) ? a = K.NUMBER : w(r, h.bools) ? a = K.BOOLEAN : w(r, h.arrays) && (a = K.ARRAY), a;
    }
    function Z(r) {
      return r === void 0;
    }
    function pn() {
      Object.keys(h.counts).find((r) => w(r, h.arrays) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, h.nargs) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(gt, T),
      configuration: f,
      defaulted: Object.assign({}, dt),
      error: V,
      newAliases: Object.assign({}, ne)
    };
  }
}
function Ln(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let o = !0;
  for (Object.keys(e).forEach(function(s) {
    t.push([].concat(e[s], s));
  }); o; ) {
    o = !1;
    for (let s = 0; s < t.length; s++)
      for (let c = s + 1; c < t.length; c++)
        if (t[s].filter(function(f) {
          return t[c].indexOf(f) !== -1;
        }).length) {
          t[s] = t[s].concat(t[c]), t.splice(c, 1), o = !0;
          break;
        }
  }
  return t.forEach(function(s) {
    s = s.filter(function(u, f, g) {
      return g.indexOf(u) === f;
    });
    const c = s.pop();
    c !== void 0 && typeof c == "string" && (n[c] = s);
  }), n;
}
function Se(e) {
  return e !== void 0 ? e + 1 : 1;
}
function wt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Tn(e) {
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
const Fn = process ? process.env : {}, Dt = new jn({
  cwd: process.cwd,
  env: () => Fn,
  format: It,
  normalize: gn,
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
  return Dt.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return Dt.parse(e.slice(), t);
};
fe.camelCase = ce;
fe.decamelize = kt;
fe.looksLikeNumber = zt;
const Pn = {
  right: zn,
  center: Dn
}, Wn = 0, be = 1, In = 2, ye = 3;
class Bn {
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
    const n = t.map((o) => typeof o == "string" ? this.colFromString(o) : o);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((s) => s.split("	"));
    let o = 0;
    return n.forEach((s) => {
      s.length > 1 && I.stringWidth(s[0]) > o && (o = Math.min(Math.floor(this.width * 0.5), I.stringWidth(s[0])));
    }), n.forEach((s) => {
      this.div(...s.map((c, u) => ({
        text: c.trim(),
        padding: this.measurePadding(c),
        width: u === 0 && s.length > 1 ? o : void 0
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
    return this.rasterize(t).forEach((o, s) => {
      let c = "";
      o.forEach((u, f) => {
        const { width: g } = t[f], v = this.negatePadding(t[f]);
        let A = u;
        if (v > I.stringWidth(u) && (A += " ".repeat(v - I.stringWidth(u))), t[f].align && t[f].align !== "left" && this.wrap) {
          const L = Pn[t[f].align];
          A = L(A, v), I.stringWidth(A) < v && (A += " ".repeat((g || 0) - I.stringWidth(A) - 1));
        }
        const R = t[f].padding || [0, 0, 0, 0];
        R[ye] && (c += " ".repeat(R[ye])), c += Ot(t[f], A, "| "), c += A, c += Ot(t[f], A, " |"), R[be] && (c += " ".repeat(R[be])), s === 0 && n.length > 0 && (c = this.renderInline(c, n[n.length - 1]));
      }), n.push({
        text: c.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const o = t.match(/^ */), s = o ? o[0].length : 0, c = n.text, u = I.stringWidth(c.trimRight());
    return n.span ? this.wrap ? s < u ? t : (n.hidden = !0, c.trimRight() + " ".repeat(s - u) + t.trimLeft()) : (n.hidden = !0, c + t) : t;
  }
  rasterize(t) {
    const n = [], o = this.columnWidths(t);
    let s;
    return t.forEach((c, u) => {
      c.width = o[u], this.wrap ? s = I.wrap(c.text, this.negatePadding(c), { hard: !0 }).split(`
`) : s = c.text.split(`
`), c.border && (s.unshift("." + "-".repeat(this.negatePadding(c) + 2) + "."), s.push("'" + "-".repeat(this.negatePadding(c) + 2) + "'")), c.padding && (s.unshift(...new Array(c.padding[Wn] || 0).fill("")), s.push(...new Array(c.padding[In] || 0).fill(""))), s.forEach((f, g) => {
        n[g] || n.push([]);
        const v = n[g];
        for (let A = 0; A < u; A++)
          v[A] === void 0 && v.push("");
        v.push(f);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[ye] || 0) + (t.padding[be] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((u) => u.width || I.stringWidth(u.text));
    let n = t.length, o = this.width;
    const s = t.map((u) => {
      if (u.width)
        return n--, o -= u.width, u.width;
    }), c = n ? Math.floor(o / n) : 0;
    return s.map((u, f) => u === void 0 ? Math.max(c, Mn(t[f])) : u);
  }
}
function Ot(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Mn(e) {
  const t = e.padding || [], n = 1 + (t[ye] || 0) + (t[be] || 0);
  return e.border ? n + 4 : n;
}
function kn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function zn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Dn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let I;
function Un(e, t) {
  return I = t, new Bn({
    width: e?.width || kn(),
    wrap: e?.wrap
  });
}
const Ut = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ht(e) {
  return e.replace(Ut, "");
}
function Hn(e, t) {
  const [n, o] = e.match(Ut) || ["", ""];
  e = Ht(e);
  let s = "";
  for (let c = 0; c < e.length; c++)
    c !== 0 && c % t === 0 && (s += `
`), s += e.charAt(c);
  return n && o && (s = `${n}${s}${o}`), s;
}
function Vn(e) {
  return Un(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Ht,
    wrap: Hn
  });
}
function Gn(e, t) {
  let n = oe(".", e), o;
  for (Bt(n).isDirectory() || (n = je(n)); ; ) {
    if (o = t(n, En(n)), o)
      return oe(n, o);
    if (n = je(o = n), o === n)
      break;
  }
}
const Kn = {
  fs: {
    readFileSync: pt,
    writeFile: wn
  },
  format: It,
  resolve: oe,
  exists: (e) => {
    try {
      return Bt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let G;
class qn {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let o = function() {
    };
    return typeof t[t.length - 1] == "function" && (o = t.pop()), o = o || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o(), G.format.apply(G.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), o = t.shift(), s = t.shift();
    let c = function() {
    };
    typeof t[t.length - 1] == "function" && (c = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = s === 1 ? n : o;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][s === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: o
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c();
    const f = [u];
    return ~u.indexOf("%d") && f.push(s), G.format.apply(G.format, f.concat(t));
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
    let o = "";
    return t.forEach(function(s, c) {
      const u = n[c + 1];
      o += s, typeof u < "u" && (o += "%s");
    }), this.__.apply(this, [o].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], o = n.directory, s = n.locale, c = n.cb, u = this._resolveLocaleFile(o, s), f = JSON.stringify(this.cache[s], null, 2);
    G.fs.writeFile(u, f, "utf-8", function(g) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), c(g);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      G.fs.readFileSync && (t = JSON.parse(G.fs.readFileSync(n, "utf-8")));
    } catch (o) {
      if (o instanceof SyntaxError && (o.message = "syntax error in " + n), o.code === "ENOENT")
        t = {};
      else
        throw o;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let o = G.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(o) && ~n.lastIndexOf("_")) {
      const s = G.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(s) && (o = s);
    }
    return o;
  }
  _fileExistsSync(t) {
    return G.exists(t);
  }
}
function Qn(e, t) {
  G = t;
  const n = new qn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Yn = (e) => Qn(e, Kn), Zn = "require is not supported by ESM", xt = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = On(import.meta.url);
} catch {
  le = process.cwd();
}
const Xn = le.substring(0, le.lastIndexOf("node_modules"));
vn, An, dn, Xn || process.cwd(), $n, je, bn, yn, oe, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, pt, Yn({
  directory: oe(le, "../../../locales"),
  updateFiles: !1
});
const q = "\x1B[44m", x = "\x1B[43m", H = "\x1B[41m", Vt = "\x1B[42m", y = "\x1B[0m", O = "\x1B[33m", C = "\x1B[36m", d = "\x1B[0m", Jn = {
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
}, te = Object.keys(Jn), Le = [], Te = 100, es = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Te && Le.push({ filePath: t, message: `${n.length > Te * 2 ? H : x}(${n.length} lines)${y}` });
}, ts = () => {
  const e = [];
  return Le.length > 0 && Le.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Te} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], ns = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${x}Plain <script> block${y} found` });
}, ss = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, os = /^(\(.*\)|\\?.)$/;
function J(e) {
  const t = e.toString();
  return os.test(t) ? t : `(?:${t})`;
}
const rs = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, is = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(rs, "$1$2")})`);
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
      between: (n, o) => E(`${J(e)}{${n},${o}}`)
    }),
    optionally: () => E(`${J(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(is, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const cs = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function as(...e) {
  return E(`(?:${e.map((t) => z(t)).join("|")})`);
}
const Ee = E(".");
E("\\b\\w+\\b");
const U = E("\\w"), B = E("\\b"), ls = E("\\d"), j = E("\\s"), Gt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Kt = E("\\t"), qt = E("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(cs, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${J(z(...e))}+`);
}
const D = "i", F = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, Pe = [], us = (e, t) => {
  if (!e)
    return;
  const n = _(B, "else", B, [F, D]), o = e.content.match(n);
  o?.length && Pe.push({ filePath: t, message: `else clauses found ${H}(${o.length})${y}` });
}, fs = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${d}`,
      description: `👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], hs = 5, ps = 10, ms = (e, t) => {
  if (!e)
    return;
  const n = _(B, "if", B, [F, D]), o = _(B, "else", B, [F, D]), s = _(B, "for", B, [F, D]), c = _(B, "while", B, [F, D]), u = _(B, "case", B, [F, D]), f = e.content.match(n), g = e.content.match(o), v = e.content.match(s), A = e.content.match(c), R = e.content.match(u), L = (f?.length || 0) + (g?.length || 0) + (v?.length || 0) + (A?.length || 0) + (R?.length || 0);
  L > hs && We.push({ filePath: t, message: `${L > ps ? H : x}(${L})${y}` });
}, ds = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${O}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], gs = (e) => {
  if (e.includes("pages"))
    return;
  const t = mt.basename(e);
  if (t === "App.vue")
    return;
  const n = _(Gt.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${x}single word${y}` });
}, $s = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${d}`,
      description: `👉 ${O}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], bs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${x}global style${y} used`
    });
  });
}, ys = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${d}`,
      description: `👉 ${O}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], Es = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [F, D]);
  e.content.match(n)?.length && Me.push({ filePath: t, message: `${x}Props type${y} not defined` });
}, ws = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${d}`,
      description: `👉 ${O}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, k = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((f, g) => g >= n && f.includes(t)) + 1;
  const o = e.split(`
`).slice(0, n).reduce((u, f) => u + f.length, 0), s = e.indexOf(t, o);
  return e.slice(0, s).split(`
`).length;
}, ke = [], vs = (e, t) => {
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
  ), o = _(
    "<",
    S(M(">")),
    " v-for",
    S(M(">")),
    " v-if",
    S(M(">")),
    ">",
    [F, D]
  ), s = e.content.match(n), c = e.content.match(o);
  if (s?.length || c?.length) {
    const u = s?.length ? s[0] : c?.length ? c[0] : "", f = k(e.content, u);
    ke.push({ filePath: t, message: `line #${f} ${x}v-if used with v-for${y}` });
  }
}, As = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${O}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], Os = (e, t) => {
  if (!e)
    return;
  const n = _("<", S(M(">")), " v-for", S(M(">")), ">", [
    F,
    D
  ]), o = e.content.match(n);
  o?.length && (o.some((c) => c.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${x}without a key${y}` }));
}, xs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${O}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], Cs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = mt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, o = t.match(n), s = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, c = t.match(s);
  !o?.length && !c?.length && De.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${y}` });
}, Ss = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], _s = /^[a-z]+([A-Z][a-z]*)*$/, Ns = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((c) => c.split(":")[0]).filter((c) => c.length).filter((c) => !_s.test(c)).length && Ue.push({ filePath: t, message: `prop names are ${x}not camelCased${y}` });
}, Rs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${O}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], js = 40, Ls = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((s) => s[1].trim()).forEach((s) => {
    if (s.length > js) {
      const c = k(e.content, s), u = s.split(`
`).at(0)?.trim() || "";
      He.push({
        filePath: t,
        message: `line #${c} ${x}${u}${y}`
      });
    }
  });
}, Ts = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${O}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Fs = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = _(
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
  ), s = n?.content.match(o);
  if (s === null)
    return;
  const c = _(":", S(U), Y(" "), "=", Y(" "), M(`'"`), [
    "g"
  ]);
  s?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const f = u.match(c);
    if (f?.length) {
      const g = k(e.source, u);
      Ve.push({ filePath: t, message: `line #${g} ${x}${f}${y}` });
    }
  });
}, Ps = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${O}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ws = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = _(
    "<",
    S(Gt.uppercase, U),
    Y(qt, Kt),
    Y(S(M(">"))),
    "></",
    S(U),
    ">",
    ["g"]
  ), s = n?.content?.match(o);
  s !== null && s?.forEach((c) => {
    const u = k(e.source, c), f = c.split(`
`).at(-1)?.trim() || "";
    Ge.push({ filePath: t, message: `line #${u} ${x}${f}${y}` });
  });
}, Is = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${O}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ct = [], Bs = ["v-slot", "v-bind", "v-on"], Ms = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Bs.forEach((o) => {
    if (n?.content.includes(`${o}:`)) {
      const s = k(e.source, o);
      Ke.push({ filePath: t, message: `line #${s} ${x}${o}${y}` }), Ct.some((c) => c.filePath === t) || Ct.push({ filePath: t });
    }
  });
}, ks = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], zs = 3, Ds = (e) => {
  const t = _(
    S(M("/")).grouped(),
    z(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const o = n[0]?.split(".vue")[0], s = _(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [F]
    ), c = o.match(s);
    (!c || c.length < zs) && qe.push({ filePath: e, message: `${o} is not a ${x}full word.${y}` });
  }
}, Us = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${d}`,
      description: `👉 ${O}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Hs = (e, t) => {
  const n = e.toString(), o = n.indexOf("<script setup>"), s = n.indexOf("<template>"), c = n.indexOf("<style>"), u = [
    { name: "script", index: o },
    { name: "template", index: s },
    { name: "style", index: c }
  ].filter((g) => g.index !== -1);
  u.every((g, v) => v === 0 ? !0 : u[v - 1].index < g.index) || Qe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${y}` });
}, Vs = () => {
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
], Gs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), o = /<(\w+)(\s[^>]+)?>/g, s = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let c;
  for (; (c = o.exec(n)) !== null; ) {
    const u = c[1], f = c[2];
    if (f) {
      const v = Array.from(f.matchAll(s), (R) => R[1]).filter((R) => St.includes(R));
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
}, Ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${O}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], qs = 5, Qs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Y("<"), Y("("), "{", S(Ee), "}", ["g", "s"]), o = e.content.match(n);
  if (o?.length) {
    const s = o[0].split(",").length;
    s > qs && Ze.push({ filePath: t, message: `props found ${H}(${s})${y}` });
  }
}, Ys = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${d}`,
      description: `👉 ${O}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Qt = 20, Je = 5, _t = 8;
function Zs(e, t, n) {
  t.split(`
`).length > Qt && Xe.push({ filePath: n, message: `function ${H}(${no(e)})${y} is too long` });
}
function Xs(e, t) {
  let n = "", o = t;
  for (; o < e.length && /\s/.test(e[o]); )
    o++;
  if (e.slice(o, o + Je) === "const")
    for (o += Je; o < e.length && /\s/.test(e[o]); )
      o++;
  for (; o < e.length && /[\w$]/.test(e[o]); )
    n += e[o], o++;
  return n.trim();
}
function Js(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function eo(e, t) {
  let n = "", o = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (o = t + 2, { name: n, bodyStart: o });
}
function to(e, t) {
  let n = 1, o = "", s = t;
  for (; s < e.length && n > 0; ) {
    const c = e[s];
    c === "{" && n++, c === "}" && n--, o += c, s++;
  }
  return { body: o, end: s };
}
function no(e) {
  return e.replace(/^const\s*/, "");
}
const so = (e, t) => {
  if (!e)
    return;
  const n = e.content, o = n.length;
  let s = 0;
  for (; s < o; ) {
    let c = "", u = "", f = !1;
    if (n.slice(s, s + _t) === "function" && (s += _t, f = !0, c = Xs(n, s), s = Js(n, s)), n.slice(s, s + Je) === "const") {
      const g = eo(n, s);
      g && (f = !0, c = g.name, s = g.bodyStart);
    }
    if (f) {
      const { body: g, end: v } = to(n, s);
      u = g, s = v, Zs(c, u, t);
    }
    f || s++;
  }
}, oo = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${d}`,
      description: `👉 ${O}Functions must be shorter than ${Qt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Yt = 3, Nt = (e, t, n) => {
  const o = t.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
  o.length > Yt && et.push({ filePath: n, message: `function ${x}${e}${y} has ${x}${o.length}${y} parameters` });
}, ro = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1] ? Nt(o[1], o[2], t) : o[3] && Nt(o[3], o[4], t);
}, io = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${d}`,
      description: `👉 ${O}Max number of function parameters should be ${Yt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], co = (e, t) => {
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
  ), o = _(
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
  let s;
  const c = /* @__PURE__ */ new Set();
  for (; (s = n.exec(e.content)) !== null; )
    s[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((g) => c.add(g));
  let u;
  for (; (u = o.exec(e.content)) !== null; ) {
    const f = u[1], g = u[2], v = u[3];
    c.has(v) && g === v && tt.push({
      filePath: t,
      message: `Prop ${x}(${v})${y} is being drilled through ${x}${f}${y} component unmodified.`
    });
  }
}, ao = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${d}`,
      description: `👉 ${O}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Zt = 4, lo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const s = o[1];
    s.length < Zt && nt.push({ filePath: t, message: `${H}(${s})${y}` });
  }
}, uo = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${d}`,
      description: `👉 ${O}Variable names must have a minimum length of ${Zt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xt = [], we = [], fo = 5, ho = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, o = e.content.match(n);
  o?.length && o.forEach((s) => {
    if (s.split(`
`).length > fo) {
      const c = s.split(`
`)[0], u = k(e.content, c);
      Xt.push({ filePath: t, message: `line #${u} ${x}computed${y}` }), we.push({ filePath: t }), we.some((f) => f.filePath === t) || we.push({ filePath: t });
    }
  });
}, po = () => {
  const e = [];
  return we.length > 0 && Xt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${O}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], mo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((s) => s[1].trim()).forEach((s) => {
    const c = k(e.content.trim(), s), u = s.split(`
`).at(0)?.trim() || "";
    st.push({ filePath: t, message: `line #${c} ${x}(${u})${y}` });
  });
}, go = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${d}`,
      description: `👉 ${O}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ve = [], $o = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, o = /v-model\s*=\s*"([^"]+)"/, s = _(z("$parent").or("getCurrentInstance"), [F]), c = e.content.match(n), u = e.content.match(o);
  if (u) {
    const g = u[1].split(".")[0];
    if ((c ? c[1] : "").includes(g)) {
      const A = k(e.content.trim(), g);
      ve.push({
        filePath: t,
        message: `line #${A} ${x}(${g})${y}`
      });
    }
  }
  const f = e.content.match(s);
  if (f) {
    const g = k(e.content.trim(), f[0]);
    ve.push({
      filePath: t,
      message: `line #${g} ${x}(${f[0]})${y}`
    });
  }
}, bo = () => {
  const e = [];
  return ve.length > 0 && ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${O}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], Rt = 5, yo = 3, Eo = (e, t) => {
  if (!e)
    return;
  const n = _(Kt.times.atLeast(Rt).or(j.times.atLeast(yo * Rt)), [
    F,
    D
  ]);
  e.content.match(n)?.forEach((s) => {
    const c = k(e.content, s);
    ot.push({
      filePath: t,
      message: `line #${c} ${x}indentation: ${s.length}${y}`
    });
  });
}, wo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${d}`,
      description: `👉 ${O}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], vo = (e, t) => {
  if (!e)
    return;
  const n = _("<a", B, [F, D]), o = e.content.match(n);
  o?.length && rt.push({ filePath: t, message: `${o?.length} ${x}html link found${y}` });
}, Ao = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${d}`,
      description: `👉 ${O}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], Oo = (e, t) => {
  if (!e)
    return;
  const o = e.content.split(`
`);
  o.forEach((s, c) => {
    const u = s.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const f = o[c + 1]?.trim();
      (!f || !f.startsWith("{") && !u.endsWith("{")) && it.push({
        filePath: t,
        message: `line #${c} if statement without curly braces: ${H}${u}${y}`
      });
    }
  });
}, xo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${d}`,
      description: `👉 ${O}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], Co = (e, t) => {
  if (!e)
    return;
  const n = _(S(ls).as("magicNumber"), as(")", qt), [F]);
  let o, s = 0;
  for (; (o = n.exec(e.content)) !== null; ) {
    const c = o.groups?.magicNumber || "", u = k(e.content, c, s);
    ct.push({
      filePath: t,
      message: `line #${u} ${x}magic number: ${c}${y}`
    }), s = u;
  }
}, So = () => {
  const e = [];
  return ct.length && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${d}`,
      description: `👉 ${O}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], _o = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const s = o[1], c = o[2];
    c.split(/\s+/).filter((f) => f.trim() !== "").length > 1 && c.split(`
`).length === 1 && at.push({ filePath: t, message: `Element ${x}<${s}>${y} should have its attributes on separate lines` });
  }
}, No = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${O}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ro = [
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
], lt = [], jo = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((o) => {
    let s;
    for (; (s = n.exec(o.content)) !== null; ) {
      const c = s[1];
      Ro.includes(c) && lt.push({ filePath: t, message: `${x}(${c})${y}` });
    }
  });
}, Lo = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${O}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], To = (e, t) => {
  if (!e)
    return;
  const n = _(S(Ee), j, "?", j, S(Ee), j, ":", j, S(Ee));
  e.content.match(n)?.forEach((s) => {
    if (s.split("?").length - 1 > 1) {
      const c = k(e.content, s);
      ut.push({
        filePath: t,
        message: `line #${c} has ${x}nested ternary${y}`
      });
    }
  });
}, Fo = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${d}`,
      description: `👉 ${O}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], Po = (e, t) => {
  if (!e)
    return;
  const n = _('v-for="(', j.times.any(), S(U).grouped(), j.times.any(), ",", j.times.any(), S(U).grouped(), j.times.any(), ")", S(j), "in", S(j), S(U).grouped(), [F]), o = _(':key="', j.times.any(), S(U).grouped(), j.times.any(), '"', [F]), s = [...e.content.matchAll(n)], c = [...e.content.matchAll(o)];
  s.forEach((u) => {
    const [f, g, v, A] = u;
    c.forEach((R) => {
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
}, Wo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${d}`,
      description: `👉 ${O}Avoid using index as key in v-for loops.${d} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Io = (e, t) => {
  const n = {}, o = ({ file: f, rule: g, title: v, description: A, message: R }) => {
    const L = e === "rule" ? g : f;
    n[L] || (n[L] = []), n[L].push({ file: f, rule: g, title: v, description: A, message: R });
  }, s = (f) => {
    f().forEach((v) => {
      o(v);
    });
  };
  s($s), s(ws), s(xs), s(As), s(ys), s(Ss), s(go), s(ks), s(Us), s(No), s(Rs), s(Ps), s(Is), s(po), s(Ts), s(Vs), s(Ks), s(bo), s(Lo), s(ds), s(wo), s(fs), s(oo), s(Ao), s(xo), s(So), s(Fo), s(io), s(ss), s(ao), s(ts), s(uo), s(Ys), s(Wo);
  const c = [];
  return Object.keys(n).sort((f, g) => {
    const v = n[f].length, A = n[g].length;
    return t === "desc" ? A - v : v - A;
  }).forEach((f) => {
    console.log(`
 - ${f}`), n[f].forEach((g) => {
      const v = g.message.includes(H);
      if (c.some((A) => A.file === g.file)) {
        const A = c.find((R) => R.file === g.file);
        A && (v ? A.errors++ : A.warnings++);
      } else
        c.push({ file: g.file, errors: v ? 1 : 0, warnings: v ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${g.rule}` : `   File: ${g.file}`), console.log(`   Description: ${g.description}`), console.log(`   Message: ${g.message || "🚨"}
`);
    });
  }), c;
}, Bo = (e, t, n) => {
  const o = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const s = t.endsWith(".vue");
  n.includes("vue-essential") && (Es(o, t), s && (gs(t), bs(e.styles, t), Os(e.template, t), vs(e.template, t))), n.includes("vue-strong") && (ho(o, t), s && (mo(o, t), Ns(o, t), Cs(t), Ws(e, t), Ls(e.template, t), Fs(e, t), Ms(e, t), Ds(t), _o(e.template, t))), n.includes("vue-recommended") && s && (Hs(e.source, t), Gs(e.template, t)), n.includes("vue-caution") && s && ($o(o, t), jo(e.styles, t)), n.includes("rrd") && (ms(o, t), Eo(o, t), us(o, t), so(o, t), Oo(o, t), Co(o, t), To(o, t), ro(o, t), co(o, t), es(o, t), lo(o, t), Qs(o, t), s && (vo(e.template, t), ns(e.script, t), Po(e.template, t)));
}, Mo = 1.5, jt = 75, Lt = 85, Tt = 95, ko = ["rule", "file"], zo = ["asc", "desc"], Do = {
  groupBy: ko,
  orderBy: zo
};
function Ft(e, t) {
  const n = Do[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function Uo(e, t, n) {
  const { errors: o, warnings: s } = e.reduce((u, { errors: f, warnings: g }) => ({ errors: u.errors + f, warnings: u.warnings + g }), { errors: 0, warnings: 0 });
  console.log(`Found ${H}${Intl.NumberFormat("en-US").format(o)} errors${y}, and ${x}${Intl.NumberFormat("en-US").format(s)} warnings${y}, ${q}${Intl.NumberFormat("en-US").format(t)} lines${y} of code in ${q}${Intl.NumberFormat("en-US").format(n)} files${y}`);
  const c = Math.ceil((1 - (o * Mo + s) / t) * 100);
  return c < jt && console.log(`${H}Code health is LOW: ${c}%${y}`), c >= jt && c < Lt && console.log(`${x}Code health is MEDIUM ${c}%${y}`), c >= Lt && c < Tt && console.log(`${q}Code health is OK: ${c}%${y}`), c >= Tt && console.log(`${Vt}Code health is GOOD: ${c}%${y}`), { errors: o, warnings: s };
}
let ht = 0, Jt = 0, en = [];
const Ho = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt"], tn = async (e) => {
  if (!(await $e.stat(e)).isDirectory()) {
    await Pt(e, e);
    return;
  }
  const n = await $e.readdir(e);
  for (const o of n) {
    const s = mt.join(e, o);
    (await $e.stat(s)).isDirectory() && (Ho.some((u) => s.includes(u)) || await tn(s)), await Pt(s, s);
  }
}, Pt = async (e, t) => {
  if (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js")) {
    ht++;
    const n = await $e.readFile(t, "utf-8");
    Jt += n.split(/\r\n|\r|\n/).length;
    const { descriptor: o } = xn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (o.script = { content: n }), Bo(o, t, en);
  }
}, Vo = async ({ dir: e, apply: t = [], groupBy: n, orderBy: o }) => {
  console.log(`

${q}Analyzing Vue, TS and JS files in ${e}${y}`);
  const s = te.filter((g) => !t.includes(g));
  console.log(`Applying ${q}${t.length}${y} rulesets ${q}${t}${y}, ignoring ${q}${s.length}${y} rulesets ${q}${s}${y}, grouping by ${q}${n}${y}, ordering ${q}${o}${y}`), en = t, await tn(e), console.log(`Found ${q}${ht}${y} files`);
  const c = Io(n, o), { errors: u, warnings: f } = Uo(c, Jt, ht);
  !u && !f && console.log(`${Vt}No code smells detected!${y}`);
};
mn(_n(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    default: "./"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: te,
    coerce: Wt("ignore"),
    group: "Filter Rulesets:"
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: te,
    coerce: Wt("apply"),
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
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), Vo({ dir: e.path, apply: t, groupBy: e.group, orderBy: e.order });
  }
).help().argv;
function Wt(e) {
  return (t) => {
    const n = t.split(","), o = n.filter((s) => !te.includes(s));
    return o.length > 0 && (console.error(
      `
${H}Invalid ${e} values: ${o.join(
        ", "
      )}${y}. 
${O}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
