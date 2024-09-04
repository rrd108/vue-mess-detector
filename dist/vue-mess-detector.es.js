import pe from "node:fs/promises";
import Z from "node:path";
import Ws from "yargs";
import Ms, { format as qn, inspect as Is } from "util";
import { normalize as ks, resolve as Ee, dirname as ft, basename as Ps, extname as zs, relative as Hs } from "path";
import { readFileSync as nn, statSync as Un, readdirSync as Vs, writeFile as Gs } from "fs";
import { notStrictEqual as qs, strictEqual as Us } from "assert";
import { fileURLToPath as Zs } from "url";
import Ks from "os";
import { parse as Ys } from "@vue/compiler-sfc";
import sn from "node:fs";
import { fileURLToPath as Js } from "node:url";
class xe extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, xe);
  }
}
function Zn() {
  return Qs() ? 0 : 1;
}
function Qs() {
  return Xs() && !process.defaultApp;
}
function Xs() {
  return !!process.versions.electron;
}
function eu(t) {
  return t.slice(Zn() + 1);
}
function tu() {
  return process.argv[Zn()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ye(t) {
  if (t !== t.toLowerCase() && t !== t.toUpperCase() || (t = t.toLowerCase()), t.indexOf("-") === -1 && t.indexOf("_") === -1)
    return t;
  {
    let n = "", s = !1;
    const u = t.match(/^-+/);
    for (let o = u ? u[0].length : 0; o < t.length; o++) {
      let r = t.charAt(o);
      s && (s = !1, r = r.toUpperCase()), o !== 0 && (r === "-" || r === "_") ? s = !0 : r !== "-" && r !== "_" && (n += r);
    }
    return n;
  }
}
function Kn(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let u = 0; u < t.length; u++) {
    const o = n.charAt(u), r = t.charAt(u);
    o !== r && u > 0 ? s += `${e}${n.charAt(u)}` : s += r;
  }
  return s;
}
function Yn(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function nu(t) {
  if (Array.isArray(t))
    return t.map((r) => typeof r != "string" ? r + "" : r);
  t = t.trim();
  let e = 0, n = null, s = null, u = null;
  const o = [];
  for (let r = 0; r < t.length; r++) {
    if (n = s, s = t.charAt(r), s === " " && !u) {
      n !== " " && e++;
      continue;
    }
    s === u ? u = null : (s === "'" || s === '"') && !u && (u = s), o[e] || (o[e] = ""), o[e] += s;
  }
  return o;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var se;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(se || (se = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ae;
class su {
  constructor(e) {
    ae = e;
  }
  parse(e, n) {
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
    }, n), u = nu(e), o = typeof e == "string", r = uu(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), c = Object.assign({
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
    }, s.configuration), h = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, A = c["populate--"], y = A ? "--" : "_", E = /* @__PURE__ */ Object.create(null), C = /* @__PURE__ */ Object.create(null), F = s.__ || ae.format, a = {
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
    }, w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, B = new RegExp("^--" + c["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const D = typeof i == "object" ? i.key : i, g = Object.keys(i).map(function(f) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[f];
      }).filter(Boolean).pop();
      g && (a[g][D] = !0), a.arrays[D] = !0, a.keys.push(D);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(i) {
      a.bools[i] = !0, a.keys.push(i);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(i) {
      a.strings[i] = !0, a.keys.push(i);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(i) {
      a.numbers[i] = !0, a.keys.push(i);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(i) {
      a.counts[i] = !0, a.keys.push(i);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(i) {
      a.normalize[i] = !0, a.keys.push(i);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, D]) => {
      typeof D == "number" && (a.nargs[i] = D, a.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, D]) => {
      typeof D == "function" && (a.coercions[i] = D, a.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      a.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, D]) => {
      (typeof D == "boolean" || typeof D == "function") && (a.configs[i] = D);
    })), Os(s.key, r, s.default, a.arrays), Object.keys(h).forEach(function(i) {
      (a.aliases[i] || []).forEach(function(D) {
        h[D] = h[i];
      });
    });
    let L = null;
    Ts();
    let W = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), de = {};
    for (let i = 0; i < u.length; i++) {
      const D = u[i], g = D.replace(/^-{3,}/, "---");
      let f, l, x, b, v, V;
      if (D !== "--" && /^-/.test(D) && _e(D))
        te(D);
      else if (g.match(/^---+(=|$)/)) {
        te(D);
        continue;
      } else if (D.match(/^--.+=/) || !c["short-option-groups"] && D.match(/^-.+=/))
        b = D.match(/^--?([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && (O(b[1], a.arrays) ? i = Oe(i, b[1], u, b[2]) : O(b[1], a.nargs) !== !1 ? i = me(i, b[1], u, b[2]) : I(b[1], b[2], !0));
      else if (D.match(B) && c["boolean-negation"])
        b = D.match(B), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], I(l, O(l, a.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !c["short-option-groups"] && D.match(/^-[^-]+/))
        b = D.match(/^--?(.+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], O(l, a.arrays) ? i = Oe(i, l, u) : O(l, a.nargs) !== !1 ? i = me(i, l, u) : (v = u[i + 1], v !== void 0 && (!v.match(/^-/) || v.match(w)) && !O(l, a.bools) && !O(l, a.counts) || /^(true|false)$/.test(v) ? (I(l, v), i++) : I(l, ge(l))));
      else if (D.match(/^-.\..+=/))
        b = D.match(/^-([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && I(b[1], b[2]);
      else if (D.match(/^-.\..+/) && !D.match(w))
        v = u[i + 1], b = D.match(/^-(.\..+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], v !== void 0 && !v.match(/^-/) && !O(l, a.bools) && !O(l, a.counts) ? (I(l, v), i++) : I(l, ge(l)));
      else if (D.match(/^-[^-]+/) && !D.match(w)) {
        x = D.slice(1, -1).split(""), f = !1;
        for (let q = 0; q < x.length; q++) {
          if (v = D.slice(q + 2), x[q + 1] && x[q + 1] === "=") {
            V = D.slice(q + 3), l = x[q], O(l, a.arrays) ? i = Oe(i, l, u, V) : O(l, a.nargs) !== !1 ? i = me(i, l, u, V) : I(l, V), f = !0;
            break;
          }
          if (v === "-") {
            I(x[q], v);
            continue;
          }
          if (/[A-Za-z]/.test(x[q]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(v) && O(v, a.bools) === !1) {
            I(x[q], v), f = !0;
            break;
          }
          if (x[q + 1] && x[q + 1].match(/\W/)) {
            I(x[q], v), f = !0;
            break;
          } else
            I(x[q], ge(x[q]));
        }
        l = D.slice(-1)[0], !f && l !== "-" && (O(l, a.arrays) ? i = Oe(i, l, u) : O(l, a.nargs) !== !1 ? i = me(i, l, u) : (v = u[i + 1], v !== void 0 && (!/^(-|--)[^-]/.test(v) || v.match(w)) && !O(l, a.bools) && !O(l, a.counts) || /^(true|false)$/.test(v) ? (I(l, v), i++) : I(l, ge(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(w) && O(D.slice(1), a.bools))
        l = D.slice(1), I(l, ge(l));
      else if (D === "--") {
        W = u.slice(i + 1);
        break;
      } else if (c["halt-at-non-option"]) {
        W = u.slice(i);
        break;
      } else
        te(D);
    }
    pn(T, !0), pn(T, !1), As(T), vs(), dn(T, a.aliases, h, !0), Bs(T), c["set-placeholder-key"] && Ss(T), Object.keys(a.counts).forEach(function(i) {
      $e(T, i.split(".")) || I(i, 0);
    }), A && W.length && (T[y] = []), W.forEach(function(i) {
      T[y].push(i);
    }), c["camel-case-expansion"] && c["strip-dashed"] && Object.keys(T).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete T[i];
    }), c["strip-aliased"] && [].concat(...Object.keys(r).map((i) => r[i])).forEach((i) => {
      c["camel-case-expansion"] && i.includes("-") && delete T[i.split(".").map((D) => ye(D)).join(".")], delete T[i];
    });
    function te(i) {
      const D = Re("_", i);
      (typeof D == "string" || typeof D == "number") && T._.push(D);
    }
    function me(i, D, g, f) {
      let l, x = O(D, a.nargs);
      if (x = typeof x != "number" || isNaN(x) ? 1 : x, x === 0)
        return ce(f) || (L = Error(F("Argument unexpected for: %s", D))), I(D, ge(D)), i;
      let b = ce(f) ? 0 : 1;
      if (c["nargs-eats-options"])
        g.length - (i + 1) + b < x && (L = Error(F("Not enough arguments following: %s", D))), b = x;
      else {
        for (l = i + 1; l < g.length && (!g[l].match(/^-[^0-9]/) || g[l].match(w) || _e(g[l])); l++)
          b++;
        b < x && (L = Error(F("Not enough arguments following: %s", D)));
      }
      let v = Math.min(b, x);
      for (!ce(f) && v > 0 && (I(D, f), v--), l = i + 1; l < v + i + 1; l++)
        I(D, g[l]);
      return i + v;
    }
    function Oe(i, D, g, f) {
      let l = [], x = f || g[i + 1];
      const b = O(D, a.nargs);
      if (O(D, a.bools) && !/^(true|false)$/.test(x))
        l.push(!0);
      else if (ce(x) || ce(f) && /^-/.test(x) && !w.test(x) && !_e(x)) {
        if (h[D] !== void 0) {
          const v = h[D];
          l = Array.isArray(v) ? v : [v];
        }
      } else {
        ce(f) || l.push(qe(D, f, !0));
        for (let v = i + 1; v < g.length && !(!c["greedy-arrays"] && l.length > 0 || b && typeof b == "number" && l.length >= b || (x = g[v], /^-/.test(x) && !w.test(x) && !_e(x))); v++)
          i = v, l.push(qe(D, x, o));
      }
      return typeof b == "number" && (b && l.length < b || isNaN(b) && l.length === 0) && (L = Error(F("Not enough arguments following: %s", D))), I(D, l), i;
    }
    function I(i, D, g = o) {
      if (/-/.test(i) && c["camel-case-expansion"]) {
        const x = i.split(".").map(function(b) {
          return ye(b);
        }).join(".");
        hn(i, x);
      }
      const f = qe(i, D, g), l = i.split(".");
      be(T, l, f), a.aliases[i] && a.aliases[i].forEach(function(x) {
        const b = x.split(".");
        be(T, b, f);
      }), l.length > 1 && c["dot-notation"] && (a.aliases[l[0]] || []).forEach(function(x) {
        let b = x.split(".");
        const v = [].concat(l);
        v.shift(), b = b.concat(v), (a.aliases[i] || []).includes(b.join(".")) || be(T, b, f);
      }), O(i, a.normalize) && !O(i, a.arrays) && [i].concat(a.aliases[i] || []).forEach(function(b) {
        Object.defineProperty(de, b, {
          enumerable: !0,
          get() {
            return D;
          },
          set(v) {
            D = typeof v == "string" ? ae.normalize(v) : v;
          }
        });
      });
    }
    function hn(i, D) {
      a.aliases[i] && a.aliases[i].length || (a.aliases[i] = [D], E[D] = !0), a.aliases[D] && a.aliases[D].length || hn(D, i);
    }
    function qe(i, D, g) {
      g && (D = ru(D)), (O(i, a.bools) || O(i, a.counts)) && typeof D == "string" && (D = D === "true");
      let f = Array.isArray(D) ? D.map(function(l) {
        return Re(i, l);
      }) : Re(i, D);
      return O(i, a.counts) && (ce(f) || typeof f == "boolean") && (f = Ze()), O(i, a.normalize) && O(i, a.arrays) && (Array.isArray(D) ? f = D.map((l) => ae.normalize(l)) : f = ae.normalize(D)), f;
    }
    function Re(i, D) {
      return !c["parse-positional-numbers"] && i === "_" || !O(i, a.strings) && !O(i, a.bools) && !Array.isArray(D) && (Yn(D) && c["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !ce(D) && O(i, a.numbers)) && (D = Number(D)), D;
    }
    function As(i) {
      const D = /* @__PURE__ */ Object.create(null);
      dn(D, a.aliases, h), Object.keys(a.configs).forEach(function(g) {
        const f = i[g] || D[g];
        if (f)
          try {
            let l = null;
            const x = ae.resolve(ae.cwd(), f), b = a.configs[g];
            if (typeof b == "function") {
              try {
                l = b(x);
              } catch (v) {
                l = v;
              }
              if (l instanceof Error) {
                L = l;
                return;
              }
            } else
              l = ae.require(x);
            Ue(l);
          } catch (l) {
            l.name === "PermissionDenied" ? L = l : i[g] && (L = Error(F("Invalid JSON config file: %s", f)));
          }
      });
    }
    function Ue(i, D) {
      Object.keys(i).forEach(function(g) {
        const f = i[g], l = D ? D + "." + g : g;
        typeof f == "object" && f !== null && !Array.isArray(f) && c["dot-notation"] ? Ue(f, l) : (!$e(T, l.split(".")) || O(l, a.arrays) && c["combine-arrays"]) && I(l, f);
      });
    }
    function vs() {
      typeof p < "u" && p.forEach(function(i) {
        Ue(i);
      });
    }
    function pn(i, D) {
      if (typeof d > "u")
        return;
      const g = typeof d == "string" ? d : "", f = ae.env();
      Object.keys(f).forEach(function(l) {
        if (g === "" || l.lastIndexOf(g, 0) === 0) {
          const x = l.split("__").map(function(b, v) {
            return v === 0 && (b = b.substring(g.length)), ye(b);
          });
          (D && a.configs[x.join(".")] || !D) && !$e(i, x) && I(x.join("."), f[l]);
        }
      });
    }
    function Bs(i) {
      let D;
      const g = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(f) {
        if (!g.has(f) && (D = O(f, a.coercions), typeof D == "function"))
          try {
            const l = Re(f, D(i[f]));
            [].concat(a.aliases[f] || [], f).forEach((x) => {
              g.add(x), i[x] = l;
            });
          } catch (l) {
            L = l;
          }
      });
    }
    function Ss(i) {
      return a.keys.forEach((D) => {
        ~D.indexOf(".") || typeof i[D] > "u" && (i[D] = void 0);
      }), i;
    }
    function dn(i, D, g, f = !1) {
      Object.keys(g).forEach(function(l) {
        $e(i, l.split(".")) || (be(i, l.split("."), g[l]), f && (C[l] = !0), (D[l] || []).forEach(function(x) {
          $e(i, x.split(".")) || be(i, x.split("."), g[l]);
        }));
      });
    }
    function $e(i, D) {
      let g = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        g = g[l] || {};
      });
      const f = D[D.length - 1];
      return typeof g != "object" ? !1 : f in g;
    }
    function be(i, D, g) {
      let f = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(V) {
        V = gn(V), typeof f == "object" && f[V] === void 0 && (f[V] = {}), typeof f[V] != "object" || Array.isArray(f[V]) ? (Array.isArray(f[V]) ? f[V].push({}) : f[V] = [f[V], {}], f = f[V][f[V].length - 1]) : f = f[V];
      });
      const l = gn(D[D.length - 1]), x = O(D.join("."), a.arrays), b = Array.isArray(g);
      let v = c["duplicate-arguments-array"];
      !v && O(l, a.nargs) && (v = !0, (!ce(f[l]) && a.nargs[l] === 1 || Array.isArray(f[l]) && f[l].length === a.nargs[l]) && (f[l] = void 0)), g === Ze() ? f[l] = Ze(f[l]) : Array.isArray(f[l]) ? v && x && b ? f[l] = c["flatten-duplicate-arrays"] ? f[l].concat(g) : (Array.isArray(f[l][0]) ? f[l] : [f[l]]).concat([g]) : !v && !!x == !!b ? f[l] = g : f[l] = f[l].concat([g]) : f[l] === void 0 && x ? f[l] = b ? g : [g] : v && !(f[l] === void 0 || O(l, a.counts) || O(l, a.bools)) ? f[l] = [f[l], g] : f[l] = g;
    }
    function Os(...i) {
      i.forEach(function(D) {
        Object.keys(D || {}).forEach(function(g) {
          a.aliases[g] || (a.aliases[g] = [].concat(r[g] || []), a.aliases[g].concat(g).forEach(function(f) {
            if (/-/.test(f) && c["camel-case-expansion"]) {
              const l = ye(f);
              l !== g && a.aliases[g].indexOf(l) === -1 && (a.aliases[g].push(l), E[l] = !0);
            }
          }), a.aliases[g].concat(g).forEach(function(f) {
            if (f.length > 1 && /[A-Z]/.test(f) && c["camel-case-expansion"]) {
              const l = Kn(f, "-");
              l !== g && a.aliases[g].indexOf(l) === -1 && (a.aliases[g].push(l), E[l] = !0);
            }
          }), a.aliases[g].forEach(function(f) {
            a.aliases[f] = [g].concat(a.aliases[g].filter(function(l) {
              return f !== l;
            }));
          }));
        });
      });
    }
    function O(i, D) {
      const g = [].concat(a.aliases[i] || [], i), f = Object.keys(D), l = g.find((x) => f.includes(x));
      return l ? D[l] : !1;
    }
    function mn(i) {
      const D = Object.keys(a);
      return [].concat(D.map((f) => a[f])).some(function(f) {
        return Array.isArray(f) ? f.includes(i) : f[i];
      });
    }
    function Rs(i, ...D) {
      return [].concat(...D).some(function(f) {
        const l = i.match(f);
        return l && mn(l[1]);
      });
    }
    function _s(i) {
      if (i.match(w) || !i.match(/^-[^-]+/))
        return !1;
      let D = !0, g;
      const f = i.slice(1).split("");
      for (let l = 0; l < f.length; l++) {
        if (g = i.slice(l + 2), !mn(f[l])) {
          D = !1;
          break;
        }
        if (f[l + 1] && f[l + 1] === "=" || g === "-" || /[A-Za-z]/.test(f[l]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) || f[l + 1] && f[l + 1].match(/\W/))
          break;
      }
      return D;
    }
    function _e(i) {
      return c["unknown-options-as-args"] && Ns(i);
    }
    function Ns(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(w) || _s(i) ? !1 : !Rs(i, /^-+([^=]+?)=[\s\S]*$/, B, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ge(i) {
      return !O(i, a.bools) && !O(i, a.counts) && `${i}` in h ? h[i] : Ls(js(i));
    }
    function Ls(i) {
      return {
        [se.BOOLEAN]: !0,
        [se.STRING]: "",
        [se.NUMBER]: void 0,
        [se.ARRAY]: []
      }[i];
    }
    function js(i) {
      let D = se.BOOLEAN;
      return O(i, a.strings) ? D = se.STRING : O(i, a.numbers) ? D = se.NUMBER : O(i, a.bools) ? D = se.BOOLEAN : O(i, a.arrays) && (D = se.ARRAY), D;
    }
    function ce(i) {
      return i === void 0;
    }
    function Ts() {
      Object.keys(a.counts).find((i) => O(i, a.arrays) ? (L = Error(F("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : O(i, a.nargs) ? (L = Error(F("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(de, T),
      configuration: c,
      defaulted: Object.assign({}, C),
      error: L,
      newAliases: Object.assign({}, E)
    };
  }
}
function uu(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(u) {
    e.push([].concat(t[u], u));
  }); s; ) {
    s = !1;
    for (let u = 0; u < e.length; u++)
      for (let o = u + 1; o < e.length; o++)
        if (e[u].filter(function(c) {
          return e[o].indexOf(c) !== -1;
        }).length) {
          e[u] = e[u].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(u) {
    u = u.filter(function(r, c, h) {
      return h.indexOf(r) === c;
    });
    const o = u.pop();
    o !== void 0 && typeof o == "string" && (n[o] = u);
  }), n;
}
function Ze(t) {
  return t !== void 0 ? t + 1 : 1;
}
function gn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function ru(t) {
  return typeof t == "string" && (t[0] === "'" || t[0] === '"') && t[t.length - 1] === t[0] ? t.substring(1, t.length - 1) : t;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Ke, Ye, Je;
const Fn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Cn = (Ye = (Ke = process == null ? void 0 : process.versions) === null || Ke === void 0 ? void 0 : Ke.node) !== null && Ye !== void 0 ? Ye : (Je = process == null ? void 0 : process.version) === null || Je === void 0 ? void 0 : Je.slice(1);
if (Cn && Number(Cn.match(/^([^.]+)/)[1]) < Fn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Fn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const ou = process ? process.env : {}, Jn = new su({
  cwd: process.cwd,
  env: () => ou,
  format: qn,
  normalize: ks,
  resolve: Ee,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(nn(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Be = function(e, n) {
  return Jn.parse(e.slice(), n).argv;
};
Be.detailed = function(t, e) {
  return Jn.parse(t.slice(), e);
};
Be.camelCase = ye;
Be.decamelize = Kn;
Be.looksLikeNumber = Yn;
const iu = {
  right: hu,
  center: pu
}, cu = 0, Le = 1, au = 2, je = 3;
class lu {
  constructor(e) {
    var n;
    this.width = e.width, this.wrap = (n = e.wrap) !== null && n !== void 0 ? n : !0, this.rows = [];
  }
  span(...e) {
    const n = this.div(...e);
    n.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...e) {
    if (e.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...e) && typeof e[0] == "string")
      return this.applyLayoutDSL(e[0]);
    const n = e.map((s) => typeof s == "string" ? this.colFromString(s) : s);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...e) {
    return e.length === 1 && typeof e[0] == "string" && /[\t\n]/.test(e[0]);
  }
  applyLayoutDSL(e) {
    const n = e.split(`
`).map((u) => u.split("	"));
    let s = 0;
    return n.forEach((u) => {
      u.length > 1 && Y.stringWidth(u[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), Y.stringWidth(u[0])));
    }), n.forEach((u) => {
      this.div(...u.map((o, r) => ({
        text: o.trim(),
        padding: this.measurePadding(o),
        width: r === 0 && u.length > 1 ? s : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(e) {
    return {
      text: e,
      padding: this.measurePadding(e)
    };
  }
  measurePadding(e) {
    const n = Y.stripAnsi(e);
    return [0, n.match(/\s*$/)[0].length, 0, n.match(/^\s*/)[0].length];
  }
  toString() {
    const e = [];
    return this.rows.forEach((n) => {
      this.rowToString(n, e);
    }), e.filter((n) => !n.hidden).map((n) => n.text).join(`
`);
  }
  rowToString(e, n) {
    return this.rasterize(e).forEach((s, u) => {
      let o = "";
      s.forEach((r, c) => {
        const { width: h } = e[c], p = this.negatePadding(e[c]);
        let d = r;
        if (p > Y.stringWidth(r) && (d += " ".repeat(p - Y.stringWidth(r))), e[c].align && e[c].align !== "left" && this.wrap) {
          const y = iu[e[c].align];
          d = y(d, p), Y.stringWidth(d) < p && (d += " ".repeat((h || 0) - Y.stringWidth(d) - 1));
        }
        const A = e[c].padding || [0, 0, 0, 0];
        A[je] && (o += " ".repeat(A[je])), o += En(e[c], d, "| "), o += d, o += En(e[c], d, " |"), A[Le] && (o += " ".repeat(A[Le])), u === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), u = s ? s[0].length : 0, o = n.text, r = Y.stringWidth(o.trimRight());
    return n.span ? this.wrap ? u < r ? e : (n.hidden = !0, o.trimRight() + " ".repeat(u - r) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let u;
    return e.forEach((o, r) => {
      o.width = s[r], this.wrap ? u = Y.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : u = o.text.split(`
`), o.border && (u.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), u.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (u.unshift(...new Array(o.padding[cu] || 0).fill("")), u.push(...new Array(o.padding[au] || 0).fill(""))), u.forEach((c, h) => {
        n[h] || n.push([]);
        const p = n[h];
        for (let d = 0; d < r; d++)
          p[d] === void 0 && p.push("");
        p.push(c);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[je] || 0) + (e.padding[Le] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((r) => r.width || Y.stringWidth(r.text));
    let n = e.length, s = this.width;
    const u = e.map((r) => {
      if (r.width)
        return n--, s -= r.width, r.width;
    }), o = n ? Math.floor(s / n) : 0;
    return u.map((r, c) => r === void 0 ? Math.max(o, Du(e[c])) : r);
  }
}
function En(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Du(t) {
  const e = t.padding || [], n = 1 + (e[je] || 0) + (e[Le] || 0);
  return t.border ? n + 4 : n;
}
function fu() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function hu(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function pu(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Y;
function du(t, e) {
  return Y = e, new lu({
    width: t?.width || fu(),
    wrap: t?.wrap
  });
}
const Qn = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Xn(t) {
  return t.replace(Qn, "");
}
function mu(t, e) {
  const [n, s] = t.match(Qn) || ["", ""];
  t = Xn(t);
  let u = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (u += `
`), u += t.charAt(o);
  return n && s && (u = `${n}${u}${s}`), u;
}
function gu(t) {
  return du(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Xn,
    wrap: mu
  });
}
function Fu(t, e) {
  let n = Ee(".", t), s;
  for (Un(n).isDirectory() || (n = ft(n)); ; ) {
    if (s = e(n, Vs(n)), s) return Ee(n, s);
    if (n = ft(s = n), s === n) break;
  }
}
const Cu = {
  fs: {
    readFileSync: nn,
    writeFile: Gs
  },
  format: qn,
  resolve: Ee,
  exists: (t) => {
    try {
      return Un(t).isFile();
    } catch {
      return !1;
    }
  }
};
let ne;
class Eu {
  constructor(e) {
    e = e || {}, this.directory = e.directory || "./locales", this.updateFiles = typeof e.updateFiles == "boolean" ? e.updateFiles : !0, this.locale = e.locale || "en", this.fallbackToLanguage = typeof e.fallbackToLanguage == "boolean" ? e.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...e) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = e.shift();
    let s = function() {
    };
    return typeof e[e.length - 1] == "function" && (s = e.pop()), s = s || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: s
    })) : s(), ne.format.apply(ne.format, [this.cache[this.locale][n] || n].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), u = e.shift();
    let o = function() {
    };
    typeof e[e.length - 1] == "function" && (o = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let r = u === 1 ? n : s;
    this.cache[this.locale][n] && (r = this.cache[this.locale][n][u === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o();
    const c = [r];
    return ~r.indexOf("%d") && c.push(u), ne.format.apply(ne.format, c.concat(e));
  }
  setLocale(e) {
    this.locale = e;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(e) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (this.cache[this.locale][n] = e[n]);
  }
  _taggedLiteral(e, ...n) {
    let s = "";
    return e.forEach(function(u, o) {
      const r = n[o + 1];
      s += u, typeof r < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, u = n.locale, o = n.cb, r = this._resolveLocaleFile(s, u), c = JSON.stringify(this.cache[u], null, 2);
    ne.fs.writeFile(r, c, "utf-8", function(h) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(h);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      ne.fs.readFileSync && (e = JSON.parse(ne.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = ne.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const u = ne.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(u) && (s = u);
    }
    return s;
  }
  _fileExistsSync(e) {
    return ne.exists(e);
  }
}
function $u(t, e) {
  ne = e;
  const n = new Eu(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const bu = (t) => $u(t, Cu), yu = "require is not supported by ESM", $n = "loading a directory of commands is not supported yet for ESM";
let Ae;
try {
  Ae = Zs(import.meta.url);
} catch {
  Ae = process.cwd();
}
const wu = Ae.substring(0, Ae.lastIndexOf("node_modules"));
qs, Us, Is, wu || process.cwd(), Ps, ft, zs, Hs, Ee, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, nn, bu({
  directory: Ee(Ae, "../../../locales"),
  updateFiles: !1
});
function xu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let un = [], es = 0;
const G = (t, e) => {
  es >= e && un.push(t);
};
G.WARN = 1;
G.INFO = 2;
G.DEBUG = 3;
G.reset = () => {
  un = [];
};
G.setDebugLevel = (t) => {
  es = t;
};
G.warn = (t) => G(t, G.WARN);
G.info = (t) => G(t, G.INFO);
G.debug = (t) => G(t, G.DEBUG);
G.debugMessages = () => un;
var rn = G, on = { exports: {} }, Au = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const vu = Au;
var Bu = (t) => typeof t == "string" ? t.replace(vu(), "") : t, cn = { exports: {} };
const ts = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
t === 9001 || // LEFT-POINTING ANGLE BRACKET
t === 9002 || // RIGHT-POINTING ANGLE BRACKET
// CJK Radicals Supplement .. Enclosed CJK Letters and Months
11904 <= t && t <= 12871 && t !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
12880 <= t && t <= 19903 || // CJK Unified Ideographs .. Yi Radicals
19968 <= t && t <= 42182 || // Hangul Jamo Extended-A
43360 <= t && t <= 43388 || // Hangul Syllables
44032 <= t && t <= 55203 || // CJK Compatibility Ideographs
63744 <= t && t <= 64255 || // Vertical Forms
65040 <= t && t <= 65049 || // CJK Compatibility Forms .. Small Form Variants
65072 <= t && t <= 65131 || // Halfwidth and Fullwidth Forms
65281 <= t && t <= 65376 || 65504 <= t && t <= 65510 || // Kana Supplement
110592 <= t && t <= 110593 || // Enclosed Ideographic Supplement
127488 <= t && t <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
131072 <= t && t <= 262141);
cn.exports = ts;
cn.exports.default = ts;
var Su = cn.exports, Ou = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const Ru = Bu, _u = Su, Nu = Ou, ns = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = Ru(t), t.length === 0))
    return 0;
  t = t.replace(Nu(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += _u(s) ? 2 : 1);
  }
  return e;
};
on.exports = ns;
on.exports.default = ns;
var Lu = on.exports;
const bn = Lu;
function Ie(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ie(t) {
  let e = Ie();
  return ("" + t).replace(e, "").split(`
`).reduce(function(u, o) {
    return bn(o) > u ? bn(o) : u;
  }, 0);
}
function we(t, e) {
  return Array(e + 1).join(t);
}
function ju(t, e, n, s) {
  let u = ie(t);
  if (e + 1 >= u) {
    let o = e - u;
    switch (s) {
      case "right": {
        t = we(n, o) + t;
        break;
      }
      case "center": {
        let r = Math.ceil(o / 2), c = o - r;
        t = we(n, c) + t + we(n, r);
        break;
      }
      default: {
        t = t + we(n, o);
        break;
      }
    }
  }
  return t;
}
let Fe = {};
function Se(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", Fe[e] = { set: t, to: !0 }, Fe[n] = { set: t, to: !1 }, Fe[t] = { on: e, off: n };
}
Se("bold", 1, 22);
Se("italics", 3, 23);
Se("underline", 4, 24);
Se("inverse", 7, 27);
Se("strikethrough", 9, 29);
function ss(t, e) {
  let n = e[1] ? parseInt(e[1].split(";")[0]) : 0;
  if (n >= 30 && n <= 39 || n >= 90 && n <= 97) {
    t.lastForegroundAdded = e[0];
    return;
  }
  if (n >= 40 && n <= 49 || n >= 100 && n <= 107) {
    t.lastBackgroundAdded = e[0];
    return;
  }
  if (n === 0) {
    for (let u in t)
      Object.prototype.hasOwnProperty.call(t, u) && delete t[u];
    return;
  }
  let s = Fe[e[0]];
  s && (t[s.set] = s.to);
}
function Tu(t) {
  let e = Ie(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    ss(s, n), n = e.exec(t);
  return s;
}
function us(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e += Fe[u].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function Wu(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e = Fe[u].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Mu(t, e) {
  if (t.length === ie(t))
    return t.substr(0, e);
  for (; ie(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Iu(t, e) {
  let n = Ie(!0), s = t.split(Ie()), u = 0, o = 0, r = "", c, h = {};
  for (; o < e; ) {
    c = n.exec(t);
    let p = s[u];
    if (u++, o + ie(p) > e && (p = Mu(p, e - o)), r += p, o += ie(p), o < e) {
      if (!c)
        break;
      r += c[0], ss(h, c);
    }
  }
  return us(h, r);
}
function ku(t, e, n) {
  if (n = n || "…", ie(t) <= e)
    return t;
  e -= ie(n);
  let u = Iu(t, e);
  u += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !u.includes(o) && (u += o), u;
}
function Pu() {
  return {
    chars: {
      top: "─",
      "top-mid": "┬",
      "top-left": "┌",
      "top-right": "┐",
      bottom: "─",
      "bottom-mid": "┴",
      "bottom-left": "└",
      "bottom-right": "┘",
      left: "│",
      "left-mid": "├",
      mid: "─",
      "mid-mid": "┼",
      right: "│",
      "right-mid": "┤",
      middle: "│"
    },
    truncate: "…",
    colWidths: [],
    rowHeights: [],
    colAligns: [],
    rowAligns: [],
    style: {
      "padding-left": 1,
      "padding-right": 1,
      head: ["red"],
      border: ["grey"],
      compact: !1
    },
    head: []
  };
}
function zu(t, e) {
  t = t || {}, e = e || Pu();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function Hu(t, e) {
  let n = [], s = e.split(/(\s+)/g), u = [], o = 0, r;
  for (let c = 0; c < s.length; c += 2) {
    let h = s[c], p = o + ie(h);
    o > 0 && r && (p += r.length), p > t ? (o !== 0 && n.push(u.join("")), u = [h], o = ie(h)) : (u.push(r || "", h), o = p), r = s[c + 1];
  }
  return o && n.push(u.join("")), n;
}
function Vu(t, e) {
  let n = [], s = "";
  function u(r, c) {
    for (s.length && c && (s += c), s += r; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let r = 0; r < o.length; r += 2)
    u(o[r], r && o[r - 1]);
  return s.length && n.push(s), n;
}
function Gu(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const u = n ? Hu : Vu;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, u(t, e[o]));
  return s;
}
function qu(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let u = Wu(e, t[s]);
    e = Tu(u);
    let o = Object.assign({}, e);
    n.push(us(o, u));
  }
  return n;
}
function Uu(t, e) {
  const n = "\x1B]", s = "\x07", u = ";";
  return [n, "8", u, u, t || e, s, e, n, "8", u, u, s].join("");
}
var rs = {
  strlen: ie,
  repeat: we,
  pad: ju,
  truncate: ku,
  mergeOptions: zu,
  wordWrap: Gu,
  colorizeLines: qu,
  hyperlink: Uu
}, os = { exports: {} }, Ge = { exports: {} }, Qe = { exports: {} }, Xe = { exports: {} }, et = { exports: {} }, yn;
function Zu() {
  return yn || (yn = 1, function(t) {
    var e = {};
    t.exports = e;
    var n = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(n).forEach(function(s) {
      var u = n[s], o = e[s] = [];
      o.open = "\x1B[" + u[0] + "m", o.close = "\x1B[" + u[1] + "m";
    });
  }(et)), et.exports;
}
var tt, wn;
function Ku() {
  return wn || (wn = 1, tt = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", u = e.indexOf(s + t);
    return u !== -1 && (n === -1 ? !0 : u < n);
  }), tt;
}
var nt, xn;
function Yu() {
  if (xn) return nt;
  xn = 1;
  var t = Ks, e = Ku(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function u(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (c && !c.isTTY && s !== !0)
      return 0;
    var h = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(A) {
        return A in n;
      }) || n.CI_NAME === "codeship" ? 1 : h;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in n) {
      var d = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", h);
  }
  function r(c) {
    var h = o(c);
    return u(h);
  }
  return nt = {
    supportsColor: r,
    stdout: r(process.stdout),
    stderr: r(process.stderr)
  }, nt;
}
var st = { exports: {} }, An;
function Ju() {
  return An || (An = 1, function(t) {
    t.exports = function(n, s) {
      var u = "";
      n = n || "Run the trap, drop the bass", n = n.split("");
      var o = {
        a: ["@", "Ą", "Ⱥ", "Ʌ", "Δ", "Λ", "Д"],
        b: ["ß", "Ɓ", "Ƀ", "ɮ", "β", "฿"],
        c: ["©", "Ȼ", "Ͼ"],
        d: ["Ð", "Ɗ", "Ԁ", "ԁ", "Ԃ", "ԃ"],
        e: [
          "Ë",
          "ĕ",
          "Ǝ",
          "ɘ",
          "Σ",
          "ξ",
          "Ҽ",
          "੬"
        ],
        f: ["Ӻ"],
        g: ["ɢ"],
        h: ["Ħ", "ƕ", "Ң", "Һ", "Ӈ", "Ԋ"],
        i: ["༏"],
        j: ["Ĵ"],
        k: ["ĸ", "Ҡ", "Ӄ", "Ԟ"],
        l: ["Ĺ"],
        m: ["ʍ", "Ӎ", "ӎ", "Ԡ", "ԡ", "൩"],
        n: ["Ñ", "ŋ", "Ɲ", "Ͷ", "Π", "Ҋ"],
        o: [
          "Ø",
          "õ",
          "ø",
          "Ǿ",
          "ʘ",
          "Ѻ",
          "ם",
          "۝",
          "๏"
        ],
        p: ["Ƿ", "Ҏ"],
        q: ["্"],
        r: ["®", "Ʀ", "Ȑ", "Ɍ", "ʀ", "Я"],
        s: ["§", "Ϟ", "ϟ", "Ϩ"],
        t: ["Ł", "Ŧ", "ͳ"],
        u: ["Ʊ", "Ս"],
        v: ["ט"],
        w: ["Ш", "Ѡ", "Ѽ", "൰"],
        x: ["Ҳ", "Ӿ", "Ӽ", "ӽ"],
        y: ["¥", "Ұ", "Ӌ"],
        z: ["Ƶ", "ɀ"]
      };
      return n.forEach(function(r) {
        r = r.toLowerCase();
        var c = o[r] || [" "], h = Math.floor(Math.random() * c.length);
        typeof o[r] < "u" ? u += o[r][h] : u += r;
      }), u;
    };
  }(st)), st.exports;
}
var ut = { exports: {} }, vn;
function Qu() {
  return vn || (vn = 1, function(t) {
    t.exports = function(n, s) {
      n = n || "   he is here   ";
      var u = {
        up: [
          "̍",
          "̎",
          "̄",
          "̅",
          "̿",
          "̑",
          "̆",
          "̐",
          "͒",
          "͗",
          "͑",
          "̇",
          "̈",
          "̊",
          "͂",
          "̓",
          "̈",
          "͊",
          "͋",
          "͌",
          "̃",
          "̂",
          "̌",
          "͐",
          "̀",
          "́",
          "̋",
          "̏",
          "̒",
          "̓",
          "̔",
          "̽",
          "̉",
          "ͣ",
          "ͤ",
          "ͥ",
          "ͦ",
          "ͧ",
          "ͨ",
          "ͩ",
          "ͪ",
          "ͫ",
          "ͬ",
          "ͭ",
          "ͮ",
          "ͯ",
          "̾",
          "͛",
          "͆",
          "̚"
        ],
        down: [
          "̖",
          "̗",
          "̘",
          "̙",
          "̜",
          "̝",
          "̞",
          "̟",
          "̠",
          "̤",
          "̥",
          "̦",
          "̩",
          "̪",
          "̫",
          "̬",
          "̭",
          "̮",
          "̯",
          "̰",
          "̱",
          "̲",
          "̳",
          "̹",
          "̺",
          "̻",
          "̼",
          "ͅ",
          "͇",
          "͈",
          "͉",
          "͍",
          "͎",
          "͓",
          "͔",
          "͕",
          "͖",
          "͙",
          "͚",
          "̣"
        ],
        mid: [
          "̕",
          "̛",
          "̀",
          "́",
          "͘",
          "̡",
          "̢",
          "̧",
          "̨",
          "̴",
          "̵",
          "̶",
          "͜",
          "͝",
          "͞",
          "͟",
          "͠",
          "͢",
          "̸",
          "̷",
          "͡",
          " ҉"
        ]
      }, o = [].concat(u.up, u.down, u.mid);
      function r(p) {
        var d = Math.floor(Math.random() * p);
        return d;
      }
      function c(p) {
        var d = !1;
        return o.filter(function(A) {
          d = A === p;
        }), d;
      }
      function h(p, d) {
        var A = "", y, E;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (E in p)
          if (!c(E)) {
            switch (A = A + p[E], y = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                y.up = r(8), y.mid = r(2), y.down = r(8);
                break;
              case "maxi":
                y.up = r(16) + 3, y.mid = r(4) + 1, y.down = r(64) + 3;
                break;
              default:
                y.up = r(8) + 1, y.mid = r(6) / 2, y.down = r(8) + 1;
                break;
            }
            var C = ["up", "mid", "down"];
            for (var F in C)
              for (var a = C[F], w = 0; w <= y[a]; w++)
                d[a] && (A = A + u[a][r(u[a].length)]);
          }
        return A;
      }
      return h(n, s);
    };
  }(ut)), ut.exports;
}
var rt = { exports: {} }, Bn;
function Xu() {
  return Bn || (Bn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, u) {
        if (n === " ") return n;
        switch (s % 3) {
          case 0:
            return e.red(n);
          case 1:
            return e.white(n);
          case 2:
            return e.blue(n);
        }
      };
    };
  }(rt)), rt.exports;
}
var ot = { exports: {} }, Sn;
function er() {
  return Sn || (Sn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, u) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(ot)), ot.exports;
}
var it = { exports: {} }, On;
function tr() {
  return On || (On = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, u, o) {
        return s === " " ? s : e[n[u++ % n.length]](s);
      };
    };
  }(it)), it.exports;
}
var ct = { exports: {} }, Rn;
function nr() {
  return Rn || (Rn = 1, function(t) {
    t.exports = function(e) {
      var n = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
      ];
      return function(s, u, o) {
        return s === " " ? s : e[n[Math.round(Math.random() * (n.length - 2))]](s);
      };
    };
  }(ct)), ct.exports;
}
var _n;
function sr() {
  return _n || (_n = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Ms, s = e.styles = Zu(), u = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = Yu().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(F) {
      return ("" + F).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(a, w) {
      if (!e.enabled)
        return a + "";
      var B = s[w];
      return !B && w in e ? e[w](a) : B.open + a + B.close;
    };
    var r = /[|\\{}()[\]^$+*?.]/g, c = function(F) {
      if (typeof F != "string")
        throw new TypeError("Expected a string");
      return F.replace(r, "\\$&");
    };
    function h(F) {
      var a = function w() {
        return A.apply(w, arguments);
      };
      return a._styles = F, a.__proto__ = d, a;
    }
    var p = function() {
      var F = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(a) {
        s[a].closeRe = new RegExp(c(s[a].close), "g"), F[a] = {
          get: function() {
            return h(this._styles.concat(a));
          }
        };
      }), F;
    }(), d = u(function() {
    }, p);
    function A() {
      var F = Array.prototype.slice.call(arguments), a = F.map(function(T) {
        return T != null && T.constructor === String ? T : n.inspect(T);
      }).join(" ");
      if (!e.enabled || !a)
        return a;
      for (var w = a.indexOf(`
`) != -1, B = this._styles, L = B.length; L--; ) {
        var W = s[B[L]];
        a = W.open + a.replace(W.closeRe, W.open) + W.close, w && (a = a.replace(o, function(T) {
          return W.close + T + W.open;
        }));
      }
      return a;
    }
    e.setTheme = function(F) {
      if (typeof F == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var a in F)
        (function(w) {
          e[w] = function(B) {
            if (typeof F[w] == "object") {
              var L = B;
              for (var W in F[w])
                L = e[F[w][W]](L);
              return L;
            }
            return e[F[w]](B);
          };
        })(a);
    };
    function y() {
      var F = {};
      return Object.keys(p).forEach(function(a) {
        F[a] = {
          get: function() {
            return h([a]);
          }
        };
      }), F;
    }
    var E = function(a, w) {
      var B = w.split("");
      return B = B.map(a), B.join("");
    };
    e.trap = Ju(), e.zalgo = Qu(), e.maps = {}, e.maps.america = Xu()(e), e.maps.zebra = er()(e), e.maps.rainbow = tr()(e), e.maps.random = nr()(e);
    for (var C in e.maps)
      (function(F) {
        e[F] = function(a) {
          return E(e.maps[F], a);
        };
      })(C);
    u(e, y());
  }(Xe)), Xe.exports;
}
var Nn;
function ur() {
  return Nn || (Nn = 1, function(t) {
    var e = sr();
    t.exports = e;
  }(Qe)), Qe.exports;
}
const { info: rr, debug: is } = rn, K = rs;
let or = class Te {
  /**
   * A representation of a cell within the table.
   * Implementations must have `init` and `draw` methods,
   * as well as `colSpan`, `rowSpan`, `desiredHeight` and `desiredWidth` properties.
   * @param options
   * @constructor
   */
  constructor(e) {
    this.setOptions(e), this.x = null, this.y = null;
  }
  setOptions(e) {
    ["boolean", "number", "bigint", "string"].indexOf(typeof e) !== -1 && (e = { content: "" + e }), e = e || {}, this.options = e;
    let n = e.content;
    if (["boolean", "number", "bigint", "string"].indexOf(typeof n) !== -1)
      this.content = String(n);
    else if (!n)
      this.content = this.options.href || "";
    else
      throw new Error("Content needs to be a primitive, got: " + typeof n);
    this.colSpan = e.colSpan || 1, this.rowSpan = e.rowSpan || 1, this.options.href && Object.defineProperty(this, "href", {
      get() {
        return this.options.href;
      }
    });
  }
  mergeTableOptions(e, n) {
    this.cells = n;
    let s = this.options.chars || {}, u = e.chars, o = this.chars = {};
    cr.forEach(function(h) {
      at(s, u, h, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let r = this.options.style = this.options.style || {}, c = e.style;
    at(r, c, "padding-left", this), at(r, c, "padding-right", this), this.head = r.head || c.head, this.border = r.border || c.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = K.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let r = 1;
        for (; r < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + r], r++;
      }
      const { wrapOnWordBoundary: u = !0 } = e, { wrapOnWordBoundary: o = u } = this.options;
      return this.wrapLines(K.wordWrap(this.fixedWidth, this.content, o));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = K.colorizeLines(e);
    return this.href ? n.map((s) => K.hyperlink(this.href, s)) : n;
  }
  /**
   * Initializes the Cells data structure.
   *
   * @param tableOptions - A fully populated set of tableOptions.
   * In addition to the standard default values, tableOptions must have fully populated the
   * `colWidths` and `rowWidths` arrays. Those arrays must have lengths equal to the number
   * of columns or rows (respectively) in this table, and each array item must be a Number.
   *
   */
  init(e) {
    let n = this.x, s = this.y;
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(jn, -1), this.height = this.heights.reduce(jn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
  }
  /**
   * Draws the given line of the cell.
   * This default implementation defers to methods `drawTop`, `drawBottom`, `drawLine` and `drawEmpty`.
   * @param lineNum - can be `top`, `bottom` or a numerical line number.
   * @param spanningCell - will be a number if being called from a RowSpanCell, and will represent how
   * many rows below it's being called from. Otherwise it's undefined.
   * @returns {String} The representation of this line.
   */
  draw(e, n) {
    if (e == "top") return this.drawTop(this.drawRight);
    if (e == "bottom") return this.drawBottom(this.drawRight);
    let s = K.truncate(this.content, 10, this.truncate);
    e || rr(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
    let u = Math.max(this.height - this.lines.length, 0), o;
    switch (this.vAlign) {
      case "center":
        o = Math.ceil(u / 2);
        break;
      case "bottom":
        o = u;
        break;
      default:
        o = 0;
    }
    if (e < o || e >= o + this.lines.length)
      return this.drawEmpty(this.drawRight, n);
    let r = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - o, this.drawRight, r, n);
  }
  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(e) {
    let n = [];
    return this.cells ? this.widths.forEach(function(s, u) {
      n.push(this._topLeftChar(u)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof Te.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof Te.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof Te.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = ur();
        for (let u = this[e].length - 1; u >= 0; u--)
          s = s[this[e][u]];
        return s(n);
      } catch {
        return n;
      }
    else
      return n;
  }
  /**
   * Renders a line of text.
   * @param lineNum - Which line of text to render. This is not necessarily the line within the cell.
   * There may be top-padding above the first line of text.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param forceTruncationSymbol - `true` if the rendered text should end with the truncation symbol even
   * if the text fits. This is used when the cell is vertically truncated. If `false` the text should
   * only include the truncation symbol if the text will not fit horizontally within the cell width.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawLine(e, n, s, u) {
    let o = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && u && this.cells) {
      let y = this.cells[this.y + u][this.x - 1];
      for (; y instanceof ht; )
        y = this.cells[y.y][y.x - 1];
      y instanceof pt || (o = this.chars.rightMid);
    }
    let r = K.repeat(" ", this.paddingLeft), c = n ? this.chars.right : "", h = K.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let A = K.truncate(p, d, this.truncate);
    return A = K.pad(A, d, " ", this.hAlign), A = r + A + h, this.stylizeLine(o, A, c);
  }
  stylizeLine(e, n, s) {
    return e = this.wrapWithStyleColors("border", e), s = this.wrapWithStyleColors("border", s), this.y === 0 && (n = this.wrapWithStyleColors("head", n)), e + n + s;
  }
  /**
   * Renders the bottom line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawBottom(e) {
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = K.repeat(this.chars.bottom, this.width), u = e ? this.chars.bottomRight : "";
    return this.wrapWithStyleColors("border", n + s + u);
  }
  /**
   * Renders a blank line of text within the cell. Used for top and/or bottom padding.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawEmpty(e, n) {
    let s = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && n && this.cells) {
      let r = this.cells[this.y + n][this.x - 1];
      for (; r instanceof ht; )
        r = this.cells[r.y][r.x - 1];
      r instanceof pt || (s = this.chars.rightMid);
    }
    let u = e ? this.chars.right : "", o = K.repeat(" ", this.width);
    return this.stylizeLine(s, o, u);
  }
}, ht = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && is(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, pt = class {
  /**
   * A placeholder Cell for a Cell that spans multiple rows.
   * It delegates rendering to the original cell, but adds the appropriate offset.
   * @param originalCell
   * @constructor
   */
  constructor(e) {
    this.originalCell = e;
  }
  init(e) {
    let n = this.y, s = this.originalCell.y;
    this.cellOffset = n - s, this.offset = ir(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (is(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function Ln(...t) {
  return t.filter((e) => e != null).shift();
}
function at(t, e, n, s) {
  let u = n.split("-");
  u.length > 1 ? (u[1] = u[1].charAt(0).toUpperCase() + u[1].substr(1), u = u.join(""), s[u] = Ln(t[u], t[n], e[u], e[n])) : s[n] = Ln(t[n], e[n]);
}
function ir(t, e, n) {
  let s = t[e];
  for (let u = 1; u < n; u++)
    s += 1 + t[e + u];
  return s;
}
function jn(t, e) {
  return t + e + 1;
}
let cr = [
  "top",
  "top-mid",
  "top-left",
  "top-right",
  "bottom",
  "bottom-mid",
  "bottom-left",
  "bottom-right",
  "left",
  "left-mid",
  "mid",
  "mid-mid",
  "right",
  "right-mid",
  "middle"
];
Ge.exports = or;
Ge.exports.ColSpanCell = ht;
Ge.exports.RowSpanCell = pt;
var ar = Ge.exports;
const { warn: lr, debug: Dr } = rn, dt = ar, { ColSpanCell: fr, RowSpanCell: hr } = dt;
(function() {
  function t(E, C) {
    return E[C] > 0 ? t(E, C + 1) : C;
  }
  function e(E) {
    let C = {};
    E.forEach(function(F, a) {
      let w = 0;
      F.forEach(function(B) {
        B.y = a, B.x = a ? t(C, w) : w;
        const L = B.rowSpan || 1, W = B.colSpan || 1;
        if (L > 1)
          for (let T = 0; T < W; T++)
            C[B.x + T] = L;
        w = B.x + W;
      }), Object.keys(C).forEach((B) => {
        C[B]--, C[B] < 1 && delete C[B];
      });
    });
  }
  function n(E) {
    let C = 0;
    return E.forEach(function(F) {
      F.forEach(function(a) {
        C = Math.max(C, a.x + (a.colSpan || 1));
      });
    }), C;
  }
  function s(E) {
    return E.length;
  }
  function u(E, C) {
    let F = E.y, a = E.y - 1 + (E.rowSpan || 1), w = C.y, B = C.y - 1 + (C.rowSpan || 1), L = !(F > B || w > a), W = E.x, T = E.x - 1 + (E.colSpan || 1), de = C.x, te = C.x - 1 + (C.colSpan || 1), me = !(W > te || de > T);
    return L && me;
  }
  function o(E, C, F) {
    let a = Math.min(E.length - 1, F), w = { x: C, y: F };
    for (let B = 0; B <= a; B++) {
      let L = E[B];
      for (let W = 0; W < L.length; W++)
        if (u(w, L[W]))
          return !0;
    }
    return !1;
  }
  function r(E, C, F, a) {
    for (let w = F; w < a; w++)
      if (o(E, w, C))
        return !1;
    return !0;
  }
  function c(E) {
    E.forEach(function(C, F) {
      C.forEach(function(a) {
        for (let w = 1; w < a.rowSpan; w++) {
          let B = new hr(a);
          B.x = a.x, B.y = a.y + w, B.colSpan = a.colSpan, p(B, E[F + w]);
        }
      });
    });
  }
  function h(E) {
    for (let C = E.length - 1; C >= 0; C--) {
      let F = E[C];
      for (let a = 0; a < F.length; a++) {
        let w = F[a];
        for (let B = 1; B < w.colSpan; B++) {
          let L = new fr();
          L.x = w.x + B, L.y = w.y, F.splice(a + 1, 0, L);
        }
      }
    }
  }
  function p(E, C) {
    let F = 0;
    for (; F < C.length && C[F].x < E.x; )
      F++;
    C.splice(F, 0, E);
  }
  function d(E) {
    let C = s(E), F = n(E);
    Dr(`Max rows: ${C}; Max cols: ${F}`);
    for (let a = 0; a < C; a++)
      for (let w = 0; w < F; w++)
        if (!o(E, w, a)) {
          let B = { x: w, y: a, colSpan: 1, rowSpan: 1 };
          for (w++; w < F && !o(E, w, a); )
            B.colSpan++, w++;
          let L = a + 1;
          for (; L < C && r(E, L, B.x, B.x + B.colSpan); )
            B.rowSpan++, L++;
          let W = new dt(B);
          W.x = B.x, W.y = B.y, lr(`Missing cell at ${W.y}-${W.x}.`), p(W, E[a]);
        }
  }
  function A(E) {
    return E.map(function(C) {
      if (!Array.isArray(C)) {
        let F = Object.keys(C)[0];
        C = C[F], Array.isArray(C) ? (C = C.slice(), C.unshift(F)) : C = [F, C];
      }
      return C.map(function(F) {
        return new dt(F);
      });
    });
  }
  function y(E) {
    let C = A(E);
    return e(C), d(C), c(C), h(C), C;
  }
  os.exports = {
    makeTableLayout: y,
    layoutTable: e,
    addRowSpanCells: c,
    maxWidth: n,
    fillInTable: d,
    computeWidths: Tn("colSpan", "desiredWidth", "x", 1),
    computeHeights: Tn("rowSpan", "desiredHeight", "y", 1)
  };
})();
function Tn(t, e, n, s) {
  return function(u, o) {
    let r = [], c = [], h = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? c.push(d) : r[d[n]] = Math.max(r[d[n]] || 0, d[e] || 0, s);
      });
    }), u.forEach(function(p, d) {
      typeof p == "number" && (r[d] = p);
    });
    for (let p = c.length - 1; p >= 0; p--) {
      let d = c[p], A = d[t], y = d[n], E = r[y], C = typeof u[y] == "number" ? 0 : 1;
      if (typeof E == "number")
        for (let F = 1; F < A; F++)
          E += 1 + r[y + F], typeof u[y + F] != "number" && C++;
      else
        E = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!h[y] || h[y] < E) && (h[y] = E);
      if (d[e] > E) {
        let F = 0;
        for (; C > 0 && d[e] > E; ) {
          if (typeof u[y + F] != "number") {
            let a = Math.round((d[e] - E) / C);
            E += a, r[y + F] += a, C--;
          }
          F++;
        }
      }
    }
    Object.assign(u, r, h);
    for (let p = 0; p < u.length; p++)
      u[p] = Math.max(s, u[p] || 0);
  };
}
var pr = os.exports;
const le = rn, dr = rs, lt = pr;
let cs = class extends Array {
  constructor(e) {
    super();
    const n = dr.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          le.setDebugLevel(le.WARN);
          break;
        case "number":
          le.setDebugLevel(n.debug);
          break;
        case "string":
          le.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          le.setDebugLevel(le.WARN), le.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return le.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = lt.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(r) {
        r.mergeTableOptions(this.options, s);
      }, this);
    }, this), lt.computeWidths(this.options.colWidths, s), lt.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(r) {
        r.init(this.options);
      }, this);
    }, this);
    let u = [];
    for (let o = 0; o < s.length; o++) {
      let r = s[o], c = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && Dt(r, "top", u);
      for (let h = 0; h < c; h++)
        Dt(r, h, u);
      o + 1 == s.length && Dt(r, "bottom", u);
    }
    return u.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
cs.reset = () => le.reset();
function Dt(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let u = s.join("");
  u.length && n.push(u);
}
var mr = cs, gr = mr;
const Fr = /* @__PURE__ */ xu(gr), X = "\x1B[44m", N = "\x1B[43m", z = "\x1B[41m", mt = "\x1B[42m", $ = "\x1B[0m", _ = "\x1B[33m", R = "\x1B[36m", m = "\x1B[0m", Cr = [
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
], gt = [], Er = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let u;
    for (; (u = n.exec(s.content)) !== null; ) {
      const o = u[1];
      Cr.includes(o) && gt.push({ filePath: e, message: `${N}(${o})${$}` });
    }
  });
}, $r = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${_}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, br = /^(\(.*\)|\\?.)$/;
function De(t) {
  const e = t.toString();
  return br.test(e) ? e : `(?:${e})`;
}
const yr = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, wr = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function S(t) {
  const e = (n) => S(`(?<${n}>${`${t}`.replace(yr, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => S(`${t}${Q(...n)}`), {
      referenceTo: (n) => S(`${t}\\k<${n}>`)
    }),
    or: (...n) => S(`(?:${t}|${Q(...n)})`),
    after: (...n) => S(`(?<=${Q(...n)})${t}`),
    before: (...n) => S(`${t}(?=${Q(...n)})`),
    notAfter: (...n) => S(`(?<!${Q(...n)})${t}`),
    notBefore: (...n) => S(`${t}(?!${Q(...n)})`),
    times: Object.assign((n) => S(`${De(t)}{${n}}`), {
      any: () => S(`${De(t)}*`),
      atLeast: (n) => S(`${De(t)}{${n},}`),
      atMost: (n) => S(`${De(t)}{0,${n}}`),
      between: (n, s) => S(`${De(t)}{${n},${s}}`)
    }),
    optionally: () => S(`${De(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => S(`${t}`.replace(wr, "($1$3)$2")),
    at: {
      lineStart: () => S(`^${t}`),
      lineEnd: () => S(`${t}$`)
    }
  };
}
const xr = /[.*+?^${}()|[\]\\/]/g;
function ve(t) {
  return S(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function U(t) {
  return S(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function We(...t) {
  return S(`(?:${t.map((e) => Q(e)).join("|")})`);
}
const Ce = S(".");
S("\\b\\w+\\b");
const ee = S("\\w"), J = S("\\b"), Ar = S("\\d"), P = S("\\s"), as = Object.assign(S("[a-zA-Z]"), {
  lowercase: S("[a-z]"),
  uppercase: S("[A-Z]")
}), ls = S("\\t"), Ds = S("\\n");
S("\\r");
S("\\W+"), S("\\W"), S("\\B"), S("\\D"), S("\\S"), Object.assign(S("[^a-zA-Z]"), {
  lowercase: S("[^a-z]"),
  uppercase: S("[^A-Z]")
}), S("[^\\t]"), S("[^\\n]"), S("[^\\r]");
function oe(...t) {
  return S(`${De(Q(...t))}?`);
}
function Q(...t) {
  return S(
    t.map((e) => typeof e == "string" ? e.replace(xr, "\\$&") : e).join("")
  );
}
function j(...t) {
  return S(`${De(Q(...t))}+`);
}
const re = "i", k = "g", M = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(Q(...t).toString(), [...e || ""].join(""));
}, H = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((c, h) => h >= n && c.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((r, c) => r + c.length, 0), u = t.indexOf(e, s);
  return t.slice(0, u).split(`
`).length;
}, ke = [], vr = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, u = M(Q("$parent").or("getCurrentInstance"), [k]), o = t.content.match(n), r = t.content.match(s);
  if (r) {
    const h = r[1].split(".")[0];
    if ((o ? o[1] : "").includes(h)) {
      const d = H(t.content.trim(), h);
      ke.push({
        filePath: e,
        message: `line #${d} ${N}(${h})${$}`
      });
    }
  }
  const c = t.content.match(u);
  if (c) {
    const h = H(t.content.trim(), c[0]);
    ke.push({
      filePath: e,
      message: `line #${h} ${N}(${c[0]})${$}`
    });
  }
}, Br = () => {
  const t = [];
  return ke.length > 0 && ke.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${_}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], Sr = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || Ft.push({
      filePath: e,
      message: `${z}global style${$} used`
    });
  });
}, Or = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-essential ~ global style${m}`,
      description: `👉 ${_}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], Rr = (t, e) => {
  if (!t)
    return;
  const n = M("defineProps([", [k, re]);
  t.content.match(n)?.length && Ct.push({ filePath: e, message: `${z}Props type${$} not defined` });
}, _r = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-essential ~ simple prop${m}`,
      description: `👉 ${_}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], Nr = (t) => {
  if (t.includes("pages"))
    return;
  const e = Z.basename(t);
  if (e === "App.vue")
    return;
  const n = M(as.uppercase);
  e.slice(1).match(n)?.length || Et.push({ filePath: t, message: `Component name is ${z}single word${$}` });
}, Lr = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-essential ~ single name component${m}`,
      description: `👉 ${_}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], jr = (t, e) => {
  if (!t)
    return;
  const n = M("<", j(U(">")), " v-for", j(U(">")), ">", [
    k,
    re
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || $t.push({ filePath: e, message: `v-for used ${z}without a key${$}` }));
}, Tr = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${_}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], Wr = (t, e) => {
  if (!t)
    return;
  const n = M(
    "<",
    j(U(">")),
    " v-if",
    j(U(">")),
    " v-for",
    j(U(">")),
    ">",
    [k, re]
  ), s = M(
    "<",
    j(U(">")),
    " v-for",
    j(U(">")),
    " v-if",
    j(U(">")),
    ">",
    [k, re]
  ), u = t.content.match(n), o = t.content.match(s);
  if (u?.length || o?.length) {
    const r = u?.length ? u[0] : o?.length ? o[0] : "", c = H(t.content, r);
    bt.push({ filePath: e, message: `line #${c} ${z}v-if used with v-for${$}` });
  }
}, Mr = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${_}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], Wn = [
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
], Ir = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, u = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const r = o[1], c = o[2];
    if (c) {
      const p = Array.from(c.matchAll(u), (A) => A[1]).filter((A) => Wn.includes(A));
      let d = -1;
      for (const A of p) {
        const y = Wn.indexOf(A);
        if (y !== -1 && y < d) {
          yt.push({
            filePath: e,
            message: `tag has attributes out of order ${N}(${r})${$}`
          });
          break;
        }
        d = y;
      }
    }
  }
}, kr = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${_}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], Pr = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), u = n.indexOf("<template>"), o = n.indexOf("<style>"), r = [
    { name: "script", index: s },
    { name: "template", index: u },
    { name: "style", index: o }
  ].filter((h) => h.index !== -1);
  r.every((h, p) => p === 0 ? !0 : r[p - 1].index < h.index) || wt.push({ filePath: e, message: `Top level elements are ${N}not following the correct order.${$}` });
}, zr = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-recommended ~ top level element order${m}`,
      description: `👉 ${_}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], Hr = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = Z.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), u = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(u);
  !s?.length && !o?.length && xt.push({ filePath: t, message: `component name is ${N}not PascalCase, nor kebab-case.${$}` });
}, Vr = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${_}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], Gr = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    const o = H(t.content.trim(), u), r = u.split(`
`).at(0)?.trim() || "";
    At.push({ filePath: e, message: `line #${o} ${N}(${r})${$}` });
  });
}, qr = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ component files${m}`,
      description: `👉 ${_}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], Mn = [], Ur = ["v-slot", "v-bind", "v-on"], Zr = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Ur.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const u = H(t.source, s);
      vt.push({ filePath: e, message: `line #${u} ${N}${s}${$}` }), Mn.some((o) => o.filePath === e) || Mn.push({ filePath: e });
    }
  });
}, Kr = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${_}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], Yr = 3, Jr = (t) => {
  const e = M(
    j(U("/")).grouped(),
    Q(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], u = M(
      ve("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [k]
    ), o = s.match(u);
    (!o || o.length < Yr) && Bt.push({ filePath: t, message: `${s} is not a ${N}full word.${$}` });
  }
}, Qr = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ full-word component names${m}`,
      description: `👉 ${_}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], Xr = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1], o = s[2];
    o.split(/\s+/).filter((c) => c.trim() !== "").length > 1 && o.split(`
`).length === 1 && St.push({ filePath: e, message: `Element ${N}<${u}>${$} should have its attributes on separate lines` });
  }
}, eo = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${_}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], to = /^[a-z]+([A-Z][a-z]*)*$/, no = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !to.test(o)).length && Ot.push({ filePath: e, message: `prop names are ${N}not camelCased${$}` });
}, so = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${_}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], uo = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = M(
    "<",
    j(ee),
    oe(j(ve(` 	
\r`))),
    j(U("/>")),
    oe(j(ve(` 	
\r`))),
    oe("/"),
    ">",
    ["g"]
  ), u = n?.content.match(s);
  if (u === null)
    return;
  const o = M(":", j(ee), oe(" "), "=", oe(" "), U(`'"`), [
    "g"
  ]);
  u?.forEach((r) => {
    if (!r.includes(":"))
      return;
    const c = r.match(o);
    if (c?.length) {
      const h = H(t.source, r);
      Rt.push({ filePath: e, message: `line #${h} ${N}${c}${$}` });
    }
  });
}, ro = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${_}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], oo = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = M(
    "<",
    j(as.uppercase, ee),
    oe(Ds, ls),
    oe(j(U(">"))),
    "></",
    j(ee),
    ">",
    ["g"]
  ), u = n?.content?.match(s);
  u !== null && u?.forEach((o) => {
    const r = H(t.source, o), c = o.split(`
`).at(-1)?.trim() || "";
    _t.push({ filePath: e, message: `line #${r} ${N}${c}${$}` });
  });
}, io = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${_}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, fs = [], Me = [], co = 5, ao = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((u) => {
    if (u.split(`
`).length > co) {
      const o = u.split(`
`)[0], r = H(t.content, o);
      fs.push({ filePath: e, message: `line #${r} ${N}computed${$}` }), Me.push({ filePath: e }), Me.some((c) => c.filePath === e) || Me.push({ filePath: e });
    }
  });
}, lo = () => {
  const t = [];
  return Me.length > 0 && fs.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${_}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], Do = 40, fo = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    if (u.length > Do) {
      const o = H(t.content, u), r = u.split(`
`).at(0)?.trim() || "";
      Nt.push({
        filePath: e,
        message: `line #${o} ${N}${r}${$}`
      });
    }
  });
}, ho = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${_}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pe = [], po = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, c = H(t.content, o);
    if (r > n * 2) {
      Pe.push({
        filePath: e,
        message: `line #${c} ${z}has a v-if with ${r} lines${$}`
      });
      return;
    }
    r > n && Pe.push({
      filePath: e,
      message: `line #${c} ${N}has a v-if with ${r} lines${$}`
    });
  });
}, mo = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ big v-if${m}`,
      description: `👉 ${_}Big v-if can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ze = [], go = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, c = H(t.content, o);
    if (r > n * 2) {
      ze.push({
        filePath: e,
        message: `line #${c} ${z}has a v-show with ${r} lines${$}`
      });
      return;
    }
    r > n && ze.push({
      filePath: e,
      message: `line #${c} ${N}has a v-show with ${r} lines${$}`
    });
  });
}, Fo = () => {
  const t = [];
  return ze.length > 0 && ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ big v-show${m}`,
      description: `👉 ${_}Big v-show can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], hs = 4, Co = 2 * hs, Eo = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const u = M(
    We(
      "if",
      'v-if="',
      j(Ce).groupedAs("condition").and("?").and(j(Ce)).and(":"),
      // ternary
      "="
    ).and(
      j(
        We(
          "&&",
          "||",
          U(`"'`)
        )
      )
    ),
    [k]
  ), o = M(
    We("&&", "||"),
    [k]
  ), r = (c, h) => {
    const p = c.match(u);
    p && p.forEach((d) => {
      const A = (d.match(o) || []).length + 1;
      if (A > hs) {
        const y = H(c, d);
        Lt.push({
          filePath: e,
          message: `line #${y} ${A > Co ? z : N}${h} has a complicated condition with ${A} blocks${$}`
        });
      }
    });
  };
  n && r(n.content, "script"), s && r(s.content, "template");
}, $o = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ complicated conditions${m}`,
      description: `👉 ${_}Simplify complex conditions by breaking them down into smaller, more manageable parts.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], ps = 5, bo = 2 * ps, yo = (t, e) => {
  if (!t)
    return;
  const n = M(J, "if", J, [k, re]), s = M(J, "else", J, [k, re]), u = M(J, "for", J, [k, re]), o = M(J, "while", J, [k, re]), r = M(J, "case", J, [k, re]), c = t.content.match(n), h = t.content.match(s), p = t.content.match(u), d = t.content.match(o), A = t.content.match(r), y = (c?.length || 0) + (h?.length || 0) + (p?.length || 0) + (d?.length || 0) + (A?.length || 0);
  y > ps && jt.push({ filePath: e, message: `Cyclomatic complexity is ${y > bo ? `${z}very high` : `${N}high`} (${y})${$}` });
}, wo = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${_}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], In = 5, xo = 3, Ao = (t, e) => {
  if (!t)
    return;
  const n = M(ls.times.atLeast(In).at.lineStart().or(P.times.atLeast(xo * In).at.lineStart()), [k]), s = t.content.match(n);
  let u = 0;
  s?.forEach((o) => {
    const r = H(t.content, o, u);
    Tt.push({
      filePath: e,
      message: `line #${r} ${N}indentation: ${o.length}${$}`
    }), u = r;
  });
}, vo = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ deep indentation${m}`,
      description: `👉 ${_}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], Bo = (t, e) => {
  if (!t)
    return;
  const n = M(J, "else", J, [k, re]), s = t.content.match(n);
  s?.length && Wt.push({ filePath: e, message: `else clauses found ${z}(${s.length})${$}` });
}, So = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ else conditions${m}`,
      description: `👉 ${_}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, He = [], Mt = 20, Oo = 5, Ro = 8;
function _o({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const u = e.split(`
`).length, o = jo(t);
  if (u > 2 * Mt) {
    He.push({ filePath: s, message: `function ${z}(${o}#${n})${$} is too long: ${z}${u} lines${$}` });
    return;
  }
  u >= Mt && He.push({ filePath: s, message: `function ${N}(${o}#${n})${$} is too long: ${N}${u} lines${$}` });
}
function No(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const u = s[1], o = n.lastIndex;
    let r = 1, c = o;
    for (; r > 0 && c < t.length; )
      t[c] === "{" ? r++ : t[c] === "}" && r--, c++;
    const h = t.slice(o, c - 1).trim();
    return {
      name: u,
      body: h,
      end: c
      // Returns the position after the matched function
    };
  } else
    return null;
}
function Lo(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), u = n.exec(s);
  if (u) {
    const [, o] = u, r = e + u.index + u[0].length;
    let c = r, h = "";
    if (t[r] === "{") {
      let p = 1;
      for (c = r + 1; c < t.length && p > 0; )
        t[c] === "{" ? p++ : t[c] === "}" && p--, c++;
      h = t.slice(r + 1, c - 1).trim();
    } else {
      for (; c < t.length && t[c] !== ";"; )
        c++;
      h = t.slice(r, c).trim();
    }
    return {
      name: o,
      body: h,
      end: c
      // Position after the end of the function body
    };
  } else
    return null;
}
function jo(t) {
  return t.replace(/^const\s*/, "");
}
const To = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let u = 0;
  for (; u < s; ) {
    let o = "", r = "", c = !1;
    if (n.slice(u, u + Ro) === "function") {
      const h = No(n, u);
      h && (c = !0, o = h.name, r = h.body, u = h.end);
    }
    if (n.slice(u, u + Oo) === "const") {
      const h = Lo(n, u);
      h && (c = !0, o = h.name, r = h.body, u = h.end);
    }
    if (c) {
      const h = H(n.trim(), o);
      _o({ funcName: o, funcBody: r, lineNumber: h, filePath: e });
    } else
      u++;
  }
}, Wo = () => {
  const t = [];
  return He.length > 0 && He.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ function size${m}`,
      description: `👉 ${_}Functions must be shorter than ${Mt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], Mo = (t, e) => {
  if (!t)
    return;
  const n = M("<", Q("img").or("picture"), [k]), s = t.content.match(n);
  if (s?.length) {
    let u = 0;
    s.forEach((o) => {
      const r = H(t.content, o, u), c = o.slice(1);
      It.push({
        filePath: e,
        message: `line #${r} ${N}${c} element found${$}`
      }), u = r;
    });
  }
}, Io = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ html image elements${m}`,
      description: `👉 ${_}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], ko = (t, e) => {
  if (!t)
    return;
  const n = M("<a", J, [k, re]), s = t.content.match(n);
  s?.length && kt.push({ filePath: e, message: `${s?.length} ${N}html link found${$}` });
}, Po = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ html link${m}`,
      description: `👉 ${_}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], zo = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((u, o) => {
    const r = u.trim();
    if (r.startsWith("if (") && !r.includes("{")) {
      const c = s[o + 1]?.trim();
      (!c || !c.startsWith("{") && !r.endsWith("{")) && Pt.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: ${z}${r}${$}`
      });
    }
  });
}, Ho = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ if without curly braces${m}`,
      description: `👉 ${_}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], Vo = (t, e) => {
  if (!t)
    return;
  const n = M(j(Ar).as("magicNumber"), We(")", Ds), [k]);
  let s, u = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, r = Number.parseInt(o ?? "0");
    if (r > 1) {
      const c = H(t.content, String(r), u);
      zt.push({
        filePath: e,
        message: `line #${c} ${N}magic number: ${r}${$}`
      }), u = c;
    }
  }
}, Go = () => {
  const t = [];
  return zt.length && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ magic numbers${m}`,
      description: `👉 ${_}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Ht = [], qo = (t, e) => {
  if (!t)
    return;
  const n = M(j(Ce), P, "?", P, j(Ce), P, ":", P, j(Ce));
  t.content.match(n)?.forEach((u) => {
    if (u.split("?").length - 1 > 1) {
      const o = H(t.content, u);
      Ht.push({
        filePath: e,
        message: `line #${o} has ${N}nested ternary${$}`
      });
    }
  });
}, Uo = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ nested Ternary${m}`,
      description: `👉 ${_}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Zo = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((u) => {
    const o = H(t.content, u);
    Vt.push({
      filePath: e,
      message: `line #${o} ${N}props destructuring found: ${u}${$}`
    });
  });
}, Ko = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${_}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], Yo = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((u) => {
    const o = H(t.content, u);
    Gt.push({
      filePath: e,
      message: `line #${o} ${N}Avoid using 'var' for variable declarations: ${u}${$}`
    });
  });
}, Jo = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ No Var Declaration${m}`,
      description: `👉 ${_}Avoid var declaration, use const or let instead of that.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], ds = 3, kn = (t, e, n) => {
  const s = e.split(",").map((u) => u.trim()).filter((u) => u.length > 0);
  s.length > ds && qt.push({ filePath: n, message: `function ${N}${t}${$} has ${N}${s.length}${$} parameters` });
}, Qo = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && kn(s[1], s[2], e), s[3] && kn(s[3], s[4], e);
}, Xo = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ parameter count${m}`,
      description: `👉 ${_}Max number of function parameters should be ${ds}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], ei = (t, e) => {
  !t || t.setup || Ut.push({ filePath: e, message: `${N}Plain <script> block${$} found` });
}, ti = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${_} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], ni = (t, e) => {
  if (!t)
    return;
  const n = M(
    "defineProps(",
    P.times.any(),
    "[",
    P.times.any(),
    j(ve(`'"`), j(ee), ve(`'"`), P.times.any(), oe(",", P.times.any())),
    "]",
    P.times.any(),
    ")",
    [k]
  ), s = M(
    "<",
    j(ee).grouped(),
    P,
    U(">").times.any(),
    ":",
    j(ee).grouped(),
    P.times.any(),
    "=",
    P.times.any(),
    '"props.',
    j(ee).grouped(),
    '"',
    [k]
  );
  let u;
  const o = /* @__PURE__ */ new Set();
  for (; (u = n.exec(t.content)) !== null; )
    u[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((h) => o.add(h));
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const c = r[1], h = r[2], p = r[3];
    o.has(p) && h === p && Zt.push({
      filePath: e,
      message: `Prop ${N}(${p})${$} is being drilled through ${N}${c}${$} component unmodified.`
    });
  }
}, si = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ props drilling${m}`,
      description: `👉 ${_}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], Yt = 100, ui = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > Yt && Kt.push({ filePath: e, message: `${n.length > Yt * 2 ? z : N}(${n.length} lines)${$}` });
}, ri = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${_}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Yt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Jt = [], ms = 4, oi = ["i", "key"], ii = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1];
    u.length < ms && !oi.includes(u) && Jt.push({ filePath: e, message: `variable: ${N}(${u})${$}` });
  }
}, ci = () => {
  const t = [];
  return Jt.length > 0 && Jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ short variable names${m}`,
      description: `👉 ${_}Variable names must have a minimum length of ${ms}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Qt = [], ai = 5, li = (t, e) => {
  if (!t)
    return;
  const n = M("defineProps", oe("<"), oe("("), "{", j(Ce), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const u = s[0].split(",").length;
    u > ai && Qt.push({ filePath: e, message: `props found ${z}(${u})${$}` });
  }
}, Di = () => {
  const t = [];
  return Qt.length > 0 && Qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ too many props${m}`,
      description: `👉 ${_}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Xt = [], fi = (t, e) => {
  if (!t)
    return;
  const n = M('v-for="(', P.times.any(), j(ee).grouped(), P.times.any(), ",", P.times.any(), j(ee).grouped(), P.times.any(), ")", j(P), "in", j(P), j(ee).grouped(), [k]), s = M(':key="', P.times.any(), j(ee).grouped(), P.times.any(), '"', [k]), u = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  u.forEach((r) => {
    const [c, h, p, d] = r;
    o.forEach((A) => {
      const y = A[1];
      if (y === p) {
        const E = H(t.content.trim(), y);
        Xt.push({
          filePath: e,
          message: `line #${E} ${N}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, hi = () => {
  const t = [];
  return Xt.length > 0 && Xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${_}Avoid using index as key in v-for loops.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, en = [], pi = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[0], o = s[1], r = H(t.content.trim(), u);
    en.push({
      filePath: e,
      message: `line #${r} zero length comparison found ${N}(${o})${$}`
    });
  }
}, di = () => {
  const t = [];
  return en.length > 0 && en.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${R}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${_}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, mi = (t, e, n) => {
  const s = {}, u = [], o = ({ file: p, rule: d, title: A, description: y, message: E }) => {
    const C = t === "rule" ? d : p;
    s[C] || (s[C] = []), s[C].push({ file: p, rule: d, title: A, description: y, message: E });
  }, r = (p) => {
    p().forEach((A) => {
      o(A);
    });
  };
  r(Lr), r(_r), r(Tr), r(Mr), r(Or), r(Vr), r(qr), r(Kr), r(Qr), r(eo), r(so), r(ro), r(io), r(lo), r(ho), r(zr), r(kr), r(Br), r($r), r(mo), r(Fo), r($o), r(wo), r(vo), r(So), r(Wo), r(Io), r(Po), r(Ho), r(Go), r(Uo), r(Ko), r(Jo), r(Xo), r(ti), r(si), r(ri), r(ci), r(Di), r(hi), r(di);
  const c = Object.keys(s).sort((p, d) => {
    const A = s[p].length, y = s[d].length;
    return e === "desc" ? y - A : A - y;
  }), h = {};
  return c.forEach((p) => {
    h[p] = [], s[p].forEach((d, A) => {
      const y = d.message.includes(z);
      if (u.some((E) => E.file === d.file)) {
        const E = u.find((C) => C.file === d.file);
        E && (y ? E.errors++ : E.warnings++);
      } else
        u.push({ file: d.file, errors: y ? 1 : 0, warnings: y ? 0 : 1 });
      n === "error" && !y || (h[p][A] = { id: "", description: "", message: "" }, t === "file" && (h[p][A].id = d.rule), t !== "file" && (h[p][A].id = d.file), h[p][A].description = d.description, h[p][A].message = d.message || "🚨");
    });
  }), { output: h, health: u };
}, fe = {
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
    "complicatedConditions",
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlImageElements",
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
}, an = Object.keys(fe);
let gs = !1;
const gi = (t) => {
  gs = t;
}, Fi = () => gs, Ci = (t, e, n) => {
  const s = t.scriptSetup || t.script, u = e.endsWith(".vue"), o = {
    // vue-essential
    simpleProp: () => Rr(s, e),
    singleNameComponent: () => u && Nr(e),
    globalStyle: () => u && Sr(t.styles, e),
    vforNoKey: () => u && jr(t.template, e),
    vifWithVfor: () => u && Wr(t.template, e),
    // vue-strong
    simpleComputed: () => ao(s, e),
    componentFiles: () => u && Gr(s, e),
    propNameCasing: () => u && no(s, e),
    componentFilenameCasing: () => u && Hr(e),
    selfClosingComponents: () => u && oo(t, e),
    templateSimpleExpression: () => u && fo(t.template, e),
    quotedAttributeValues: () => u && uo(t, e),
    directiveShorthands: () => u && Zr(t, e),
    fullWordComponentName: () => u && Jr(e),
    multiAttributeElements: () => u && Xr(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => u && Pr(t.source, e),
    elementAttributeOrder: () => u && Ir(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => u && vr(s, e),
    elementSelectorsWithScoped: () => u && Er(t.styles, e),
    // rrd
    bigVif: () => po(t.template, e),
    bigVShow: () => go(t.template, e),
    complicatedConditions: () => Eo(t, e),
    cyclomaticComplexity: () => yo(s, e),
    deepIndentation: () => Ao(s, e),
    elseCondition: () => Bo(s, e),
    functionSize: () => To(s, e),
    htmlImageElements: () => Fi() && Mo(t.template, e),
    htmlLink: () => u && ko(t.template, e),
    ifWithoutCurlyBraces: () => zo(s, e),
    magicNumbers: () => Vo(s, e),
    nestedTernary: () => qo(s, e),
    noPropDestructure: () => Zo(s, e),
    noVarDeclaration: () => Yo(s, e),
    parameterCount: () => Qo(s, e),
    plainScript: () => u && ei(t.script, e),
    propsDrilling: () => ni(s, e),
    scriptLength: () => ui(s, e),
    shortVariableName: () => ii(s, e),
    tooManyProps: () => li(s, e),
    vForWithIndexKey: () => u && fi(t.template, e),
    zeroLengthComparison: () => pi(s, e)
  };
  n.forEach((r) => {
    r in fe ? fe[r].forEach((c) => {
      c in o && o[c]();
    }) : r in o && o[r]();
  });
}, Ei = 1.5, Pn = 75, zn = 85, Hn = 95, Fs = [...an, ...Object.values(fe).flat()], $i = (t, e, n) => {
  const { errors: s, warnings: u } = t.reduce((y, { errors: E, warnings: C }) => ({ errors: y.errors + E, warnings: y.warnings + C }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found ${z}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${N}${Intl.NumberFormat("en-US").format(u)} warnings${$}, ${X}${Intl.NumberFormat("en-US").format(e)} lines${$} of code in ${X}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const r = Math.ceil((1 - (s * Ei + u) / e) * 100), c = 60, h = u ? Math.max(1, Math.ceil(u / e * c)) : 0, p = s ? Math.max(1, c - Math.ceil(r * c / 100) - h) : 0, d = c - p - h, A = `${mt}${" ".repeat(d)}${N}${" ".repeat(h)}${z}${" ".repeat(p)}${$}`;
  return o.push({ info: `Code Health: [${A}] ${r}%
` }), r < Pn && o.push({ info: `${z}Code health is LOW: ${r}%${$}
` }), r >= Pn && r < zn && o.push({ info: `${N}Code health is MEDIUM ${r}%${$}
` }), r >= zn && r < Hn && o.push({ info: `${X}Code health is OK: ${r}%${$}
` }), r >= Hn && o.push({ info: `${mt}Code health is GOOD: ${r}%${$}
` }), { errors: s, warnings: u, output: o };
};
function bi(t) {
  const e = [], n = [];
  return Object.entries(fe).forEach(([s, u]) => {
    if (u.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = u.filter((r) => t.includes(r));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
const ln = async (t) => {
  let e = t;
  for (; e !== Z.parse(e).root; ) {
    const n = Z.join(e, "package.json");
    try {
      return await pe.access(n), e;
    } catch {
      e = Z.dirname(e);
    }
  }
  throw new Error("Project root not found");
}, Cs = async (t) => {
  let e = "";
  if (!t) {
    const s = Js(import.meta.url), u = Z.dirname(s), o = Z.resolve(u, "..");
    e = Z.join(o, "package.json");
  }
  return t && (e = Z.join(t, "package.json")), JSON.parse(await pe.readFile(e, "utf-8"));
}, Dn = await ln(process.cwd()) || "", Es = async (t, e) => {
  const n = Z.join(Dn, "package.json");
  return sn.existsSync(n) ? !!(await Cs(e)).dependencies[t] : !1;
}, $s = async (t) => {
  const e = ["nuxt.config.js", "nuxt.config.ts"];
  return await Es("nuxt", t) || e.some((n) => sn.existsSync(Z.join(Dn, n)));
}, yi = async (t) => {
  const e = ["vue.config.js", "vue.config.ts"];
  return !await $s(t) && (await Es("vue", t) || e.some((s) => sn.existsSync(Z.join(Dn, s))));
};
let tn = 0, bs = 0, ys = [];
const wi = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], fn = [], he = [], Vn = async (t, e) => {
  if (!fn.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    tn++;
    const n = await pe.readFile(e, "utf-8");
    bs += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Ys(n);
    (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), he.push({ info: `Analyzing ${e}...` }), Ci(s, e, ys);
  }
}, ws = async (t) => {
  if (!(await pe.stat(t)).isDirectory()) {
    await Vn(t, t);
    return;
  }
  const n = await pe.readdir(t);
  for (const s of n) {
    const u = Z.join(t, s);
    (await pe.stat(u)).isDirectory() && !wi.some((r) => u.includes(r)) && !fn.some((r) => u.endsWith(r)) && await ws(u), await Vn(u, u);
  }
}, xi = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: u, level: o, orderBy: r }) => {
  const c = e.filter((te) => !n.includes(te)), { rulesets: h, individualRules: p } = bi(c), d = h.length ? `${X}${h.join(", ")}${$}` : "N/A", A = p.length ? `${X}${p.join(", ")}${$}` : "N/A";
  let y = `      Applying ${h.length} rulesets: ${d}`;
  p.length > 0 && (y += `
      Applying ${p.length} individual rules: ${A}`);
  const E = n.filter((te) => !h.includes(te)), C = E.length ? `${X}${E.join(", ")}${$}` : "N/A", F = await ln(t), a = await yi(F), w = await $s(F);
  gi(w), he.push({ info: `${X}Analyzing Vue, TS and JS files in ${t}${$}` }), he.push({ info: `      Project type: ${X}${w ? "Nuxt" : ""}${a ? "Vue" : ""}${!w && !a ? "?" : ""}${$}` }), he.push({
    info: `${y}
      Ignoring ${E.length} rules/rulesets: ${C}
      Excluding ${s || "-"}
      Output level ${X}${o}${$}
      Grouping by ${X}${u}${$}
      Ordering ${X}${r}${$}`
  }), ys = e.filter((te) => !n.includes(te)), s && fn.push(...s.split(",")), await ws(t), he.push({ info: `Found ${X}${tn}${$} files` });
  const { health: B, output: L } = mi(u, r, o), { errors: W, warnings: T, output: de } = $i(B, bs, tn);
  return !W && !T && he.push({ info: `
${mt}No code smells detected!${$}` }), { output: he, codeHealthOutput: de, reportOutput: L };
}, xs = ["text", "json", "table"], Ai = ["rule", "file"], vi = ["asc", "desc"], Bi = ["all", "error"], Si = {
  groupBy: Ai,
  orderBy: vi,
  outputLevel: Bi,
  outputFormat: xs
}, Ne = (t, e) => {
  const n = Si[e];
  return n.includes(t) || (console.error(
    `
Invalid option "${t}" provided for flag "${e}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), t;
}, Gn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(fe) : void 0;
  const n = e.split(","), s = [], u = [];
  return n.forEach((o) => {
    an.includes(o) ? s.push(...fe[o]) : Object.values(fe).some((r) => r.includes(o)) ? s.push(o) : u.push(o);
  }), u.length > 0 && (console.error(
    `
${z}Invalid ${t} values: ${u.join(
      ", "
    )}${$}. 
${_}Allowed values are: ${Fs.join(", ")}${m}

`
  ), process.exit(1)), s;
}, Oi = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4], Ri = await ln(Oi || "./src"), _i = await Cs(), Ve = [];
let ue = {
  path: "./src",
  apply: Object.values(an).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const t = Z.join(Ri, "vue-mess-detector.json"), e = JSON.parse(await pe.readFile(t, "utf-8"));
  ue = { ...ue, ...e }, Ve.push({ info: `👉 Using configuration from ${t}` });
} catch {
  Ve.push({ info: "👉 Using default configuration" });
}
Ws(eu(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (t) => t.config(ue).positional("path", {
    describe: "path to the Vue files",
    default: ue.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: Fs,
    coerce: Gn("apply"),
    group: "Filter Rulesets/Rules:",
    default: ue.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: ue.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (e) => Ne(e, "groupBy"),
    default: ue.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (e) => Ne(e, "outputLevel"),
    default: ue.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: Gn("ignore"),
    default: ue.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (e) => Ne(e, "orderBy"),
    default: ue.order,
    group: "Order Results:"
  }).option("output", {
    describe: "Output format",
    choices: xs,
    coerce: (e) => Ne(e, "outputFormat"),
    default: ue.output,
    group: "Output Format:"
  }),
  (t) => {
    xi({
      dir: t.path,
      apply: t.apply,
      ignore: t.ignore,
      exclude: t.exclude,
      groupBy: t.group,
      level: t.level,
      orderBy: t.order
    }).then((e) => {
      if (t.output == "text") {
        [...Ve, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput)
          console.log(`
- ${R} ${n}${m}`), e.reportOutput[n].forEach((s) => {
            console.log(`   ${s.id}`), console.log(`   ${s.description}`), console.log(`   ${s.message}
`);
          });
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      if (t.output == "table") {
        [...Ve, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput) {
          const s = new Fr({
            head: ["id", "message"],
            colWidths: [60, 60],
            wordWrap: !0,
            wrapOnWordBoundary: !1
          });
          console.log("-".repeat(120)), t.group == "rule" && (console.log(`${R}Rule: ${n}${m}`), console.log(`Description: ${e.reportOutput[n][0].description}`), e.reportOutput[n].forEach((u) => {
            s.push([u.id, u.message]);
          })), t.group == "file" && (console.log(`${R}File: ${n}${m}`), e.reportOutput[n].forEach((u) => {
            s.push([`${u.id}
${u.description.replace("See: ", `See:
`)}`, u.message]);
          })), console.log(s.toString());
        }
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      t.output == "json" && console.log(JSON.stringify(e, null, 2));
    }).catch((e) => {
      console.error(`${z}${e}${$}`);
    });
  }
).version("version", "Show version number", _i.version).alias("version", "v").help().argv;
