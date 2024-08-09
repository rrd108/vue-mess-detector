import Kt from "yargs";
import { format as vt, inspect as Qt } from "util";
import it, { normalize as Xt, resolve as te, dirname as et, basename as Yt, extname as Ht, relative as Jt } from "path";
import tt, { readFileSync as ct, statSync as xt, readdirSync as en, writeFile as tn } from "fs";
import { notStrictEqual as nn, strictEqual as on } from "assert";
import { fileURLToPath as sn } from "url";
import { parse as rn } from "@vue/compiler-sfc";
class je extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, je);
  }
}
function wt() {
  return cn() ? 0 : 1;
}
function cn() {
  return ln() && !process.defaultApp;
}
function ln() {
  return !!process.versions.electron;
}
function an(e) {
  return e.slice(wt() + 1);
}
function un() {
  return process.argv[wt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function se(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", o = !1;
    const i = e.match(/^-+/);
    for (let l = i ? i[0].length : 0; l < e.length; l++) {
      let h = e.charAt(l);
      o && (o = !1, h = h.toUpperCase()), l !== 0 && (h === "-" || h === "_") ? o = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function St(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let o = "";
  for (let i = 0; i < e.length; i++) {
    const l = n.charAt(i), h = e.charAt(i);
    l !== h && i > 0 ? o += `${t}${n.charAt(i)}` : o += h;
  }
  return o;
}
function _t(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function fn(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, o = null, i = null;
  const l = [];
  for (let h = 0; h < e.length; h++) {
    if (n = o, o = e.charAt(h), o === " " && !i) {
      n !== " " && t++;
      continue;
    }
    o === i ? i = null : (o === "'" || o === '"') && !i && (i = o), l[t] || (l[t] = ""), l[t] += o;
  }
  return l;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var U;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(U || (U = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let Z;
class hn {
  constructor(t) {
    Z = t;
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
    }, n), i = fn(t), l = typeof t == "string", h = pn(Object.assign(/* @__PURE__ */ Object.create(null), o.alias)), d = Object.assign({
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
    }, o.configuration), C = Object.assign(/* @__PURE__ */ Object.create(null), o.default), _ = o.configObjects || [], w = o.envPrefix, L = d["populate--"], z = L ? "--" : "_", Ie = /* @__PURE__ */ Object.create(null), lt = /* @__PURE__ */ Object.create(null), H = o.__ || Z.format, u = {
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
    }, k = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, qe = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(o.array || []).filter(Boolean).forEach(function(s) {
      const c = typeof s == "object" ? s.key : s, f = Object.keys(s).map(function(a) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[a];
      }).filter(Boolean).pop();
      f && (u[f][c] = !0), u.arrays[c] = !0, u.keys.push(c);
    }), [].concat(o.boolean || []).filter(Boolean).forEach(function(s) {
      u.bools[s] = !0, u.keys.push(s);
    }), [].concat(o.string || []).filter(Boolean).forEach(function(s) {
      u.strings[s] = !0, u.keys.push(s);
    }), [].concat(o.number || []).filter(Boolean).forEach(function(s) {
      u.numbers[s] = !0, u.keys.push(s);
    }), [].concat(o.count || []).filter(Boolean).forEach(function(s) {
      u.counts[s] = !0, u.keys.push(s);
    }), [].concat(o.normalize || []).filter(Boolean).forEach(function(s) {
      u.normalize[s] = !0, u.keys.push(s);
    }), typeof o.narg == "object" && Object.entries(o.narg).forEach(([s, c]) => {
      typeof c == "number" && (u.nargs[s] = c, u.keys.push(s));
    }), typeof o.coerce == "object" && Object.entries(o.coerce).forEach(([s, c]) => {
      typeof c == "function" && (u.coercions[s] = c, u.keys.push(s));
    }), typeof o.config < "u" && (Array.isArray(o.config) || typeof o.config == "string" ? [].concat(o.config).filter(Boolean).forEach(function(s) {
      u.configs[s] = !0;
    }) : typeof o.config == "object" && Object.entries(o.config).forEach(([s, c]) => {
      (typeof c == "boolean" || typeof c == "function") && (u.configs[s] = c);
    })), Vt(o.key, h, o.default, u.arrays), Object.keys(C).forEach(function(s) {
      (u.aliases[s] || []).forEach(function(c) {
        C[c] = C[s];
      });
    });
    let P = null;
    Zt();
    let Be = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), at = {};
    for (let s = 0; s < i.length; s++) {
      const c = i[s], f = c.replace(/^-{3,}/, "---");
      let a, r, g, p, m, R;
      if (c !== "--" && /^-/.test(c) && Ve(c))
        Ze(c);
      else if (f.match(/^---+(=|$)/)) {
        Ze(c);
        continue;
      } else if (c.match(/^--.+=/) || !d["short-option-groups"] && c.match(/^-.+=/))
        p = c.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (E(p[1], u.arrays) ? s = ze(s, p[1], i, p[2]) : E(p[1], u.nargs) !== !1 ? s = Me(s, p[1], i, p[2]) : S(p[1], p[2], !0));
      else if (c.match(qe) && d["boolean-negation"])
        p = c.match(qe), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], S(r, E(r, u.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !d["short-option-groups"] && c.match(/^-[^-]+/))
        p = c.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], E(r, u.arrays) ? s = ze(s, r, i) : E(r, u.nargs) !== !1 ? s = Me(s, r, i) : (m = i[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(k)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (S(r, m), s++) : S(r, J(r))));
      else if (c.match(/^-.\..+=/))
        p = c.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && S(p[1], p[2]);
      else if (c.match(/^-.\..+/) && !c.match(k))
        m = i[s + 1], p = c.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], m !== void 0 && !m.match(/^-/) && !E(r, u.bools) && !E(r, u.counts) ? (S(r, m), s++) : S(r, J(r)));
      else if (c.match(/^-[^-]+/) && !c.match(k)) {
        g = c.slice(1, -1).split(""), a = !1;
        for (let T = 0; T < g.length; T++) {
          if (m = c.slice(T + 2), g[T + 1] && g[T + 1] === "=") {
            R = c.slice(T + 3), r = g[T], E(r, u.arrays) ? s = ze(s, r, i, R) : E(r, u.nargs) !== !1 ? s = Me(s, r, i, R) : S(r, R), a = !0;
            break;
          }
          if (m === "-") {
            S(g[T], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[T]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && E(m, u.bools) === !1) {
            S(g[T], m), a = !0;
            break;
          }
          if (g[T + 1] && g[T + 1].match(/\W/)) {
            S(g[T], m), a = !0;
            break;
          } else
            S(g[T], J(g[T]));
        }
        r = c.slice(-1)[0], !a && r !== "-" && (E(r, u.arrays) ? s = ze(s, r, i) : E(r, u.nargs) !== !1 ? s = Me(s, r, i) : (m = i[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(k)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (S(r, m), s++) : S(r, J(r))));
      } else if (c.match(/^-[0-9]$/) && c.match(k) && E(c.slice(1), u.bools))
        r = c.slice(1), S(r, J(r));
      else if (c === "--") {
        Be = i.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        Be = i.slice(s);
        break;
      } else
        Ze(c);
    }
    ft(F, !0), ft(F, !1), Bt(F), Mt(), ht(F, u.aliases, C, !0), zt(F), d["set-placeholder-key"] && Pt(F), Object.keys(u.counts).forEach(function(s) {
      ne(F, s.split(".")) || S(s, 0);
    }), L && Be.length && (F[z] = []), Be.forEach(function(s) {
      F[z].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(F).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete F[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete F[s.split(".").map((c) => se(c)).join(".")], delete F[s];
    });
    function Ze(s) {
      const c = Pe("_", s);
      (typeof c == "string" || typeof c == "number") && F._.push(c);
    }
    function Me(s, c, f, a) {
      let r, g = E(c, u.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return q(a) || (P = Error(H("Argument unexpected for: %s", c))), S(c, J(c)), s;
      let p = q(a) ? 0 : 1;
      if (d["nargs-eats-options"])
        f.length - (s + 1) + p < g && (P = Error(H("Not enough arguments following: %s", c))), p = g;
      else {
        for (r = s + 1; r < f.length && (!f[r].match(/^-[^0-9]/) || f[r].match(k) || Ve(f[r])); r++)
          p++;
        p < g && (P = Error(H("Not enough arguments following: %s", c)));
      }
      let m = Math.min(p, g);
      for (!q(a) && m > 0 && (S(c, a), m--), r = s + 1; r < m + s + 1; r++)
        S(c, f[r]);
      return s + m;
    }
    function ze(s, c, f, a) {
      let r = [], g = a || f[s + 1];
      const p = E(c, u.nargs);
      if (E(c, u.bools) && !/^(true|false)$/.test(g))
        r.push(!0);
      else if (q(g) || q(a) && /^-/.test(g) && !k.test(g) && !Ve(g)) {
        if (C[c] !== void 0) {
          const m = C[c];
          r = Array.isArray(m) ? m : [m];
        }
      } else {
        q(a) || r.push(Ke(c, a, !0));
        for (let m = s + 1; m < f.length && !(!d["greedy-arrays"] && r.length > 0 || p && typeof p == "number" && r.length >= p || (g = f[m], /^-/.test(g) && !k.test(g) && !Ve(g))); m++)
          s = m, r.push(Ke(c, g, l));
      }
      return typeof p == "number" && (p && r.length < p || isNaN(p) && r.length === 0) && (P = Error(H("Not enough arguments following: %s", c))), S(c, r), s;
    }
    function S(s, c, f = l) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return se(p);
        }).join(".");
        ut(s, g);
      }
      const a = Ke(s, c, f), r = s.split(".");
      oe(F, r, a), u.aliases[s] && u.aliases[s].forEach(function(g) {
        const p = g.split(".");
        oe(F, p, a);
      }), r.length > 1 && d["dot-notation"] && (u.aliases[r[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(r);
        m.shift(), p = p.concat(m), (u.aliases[s] || []).includes(p.join(".")) || oe(F, p, a);
      }), E(s, u.normalize) && !E(s, u.arrays) && [s].concat(u.aliases[s] || []).forEach(function(p) {
        Object.defineProperty(at, p, {
          enumerable: !0,
          get() {
            return c;
          },
          set(m) {
            c = typeof m == "string" ? Z.normalize(m) : m;
          }
        });
      });
    }
    function ut(s, c) {
      u.aliases[s] && u.aliases[s].length || (u.aliases[s] = [c], Ie[c] = !0), u.aliases[c] && u.aliases[c].length || ut(c, s);
    }
    function Ke(s, c, f) {
      f && (c = dn(c)), (E(s, u.bools) || E(s, u.counts)) && typeof c == "string" && (c = c === "true");
      let a = Array.isArray(c) ? c.map(function(r) {
        return Pe(s, r);
      }) : Pe(s, c);
      return E(s, u.counts) && (q(a) || typeof a == "boolean") && (a = Xe()), E(s, u.normalize) && E(s, u.arrays) && (Array.isArray(c) ? a = c.map((r) => Z.normalize(r)) : a = Z.normalize(c)), a;
    }
    function Pe(s, c) {
      return !d["parse-positional-numbers"] && s === "_" || !E(s, u.strings) && !E(s, u.bools) && !Array.isArray(c) && (_t(c) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !q(c) && E(s, u.numbers)) && (c = Number(c)), c;
    }
    function Bt(s) {
      const c = /* @__PURE__ */ Object.create(null);
      ht(c, u.aliases, C), Object.keys(u.configs).forEach(function(f) {
        const a = s[f] || c[f];
        if (a)
          try {
            let r = null;
            const g = Z.resolve(Z.cwd(), a), p = u.configs[f];
            if (typeof p == "function") {
              try {
                r = p(g);
              } catch (m) {
                r = m;
              }
              if (r instanceof Error) {
                P = r;
                return;
              }
            } else
              r = Z.require(g);
            Qe(r);
          } catch (r) {
            r.name === "PermissionDenied" ? P = r : s[f] && (P = Error(H("Invalid JSON config file: %s", a)));
          }
      });
    }
    function Qe(s, c) {
      Object.keys(s).forEach(function(f) {
        const a = s[f], r = c ? c + "." + f : f;
        typeof a == "object" && a !== null && !Array.isArray(a) && d["dot-notation"] ? Qe(a, r) : (!ne(F, r.split(".")) || E(r, u.arrays) && d["combine-arrays"]) && S(r, a);
      });
    }
    function Mt() {
      typeof _ < "u" && _.forEach(function(s) {
        Qe(s);
      });
    }
    function ft(s, c) {
      if (typeof w > "u")
        return;
      const f = typeof w == "string" ? w : "", a = Z.env();
      Object.keys(a).forEach(function(r) {
        if (f === "" || r.lastIndexOf(f, 0) === 0) {
          const g = r.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), se(p);
          });
          (c && u.configs[g.join(".")] || !c) && !ne(s, g) && S(g.join("."), a[r]);
        }
      });
    }
    function zt(s) {
      let c;
      const f = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(a) {
        if (!f.has(a) && (c = E(a, u.coercions), typeof c == "function"))
          try {
            const r = Pe(a, c(s[a]));
            [].concat(u.aliases[a] || [], a).forEach((g) => {
              f.add(g), s[g] = r;
            });
          } catch (r) {
            P = r;
          }
      });
    }
    function Pt(s) {
      return u.keys.forEach((c) => {
        ~c.indexOf(".") || typeof s[c] > "u" && (s[c] = void 0);
      }), s;
    }
    function ht(s, c, f, a = !1) {
      Object.keys(f).forEach(function(r) {
        ne(s, r.split(".")) || (oe(s, r.split("."), f[r]), a && (lt[r] = !0), (c[r] || []).forEach(function(g) {
          ne(s, g.split(".")) || oe(s, g.split("."), f[r]);
        }));
      });
    }
    function ne(s, c) {
      let f = s;
      d["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(r) {
        f = f[r] || {};
      });
      const a = c[c.length - 1];
      return typeof f != "object" ? !1 : a in f;
    }
    function oe(s, c, f) {
      let a = s;
      d["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = dt(R), typeof a == "object" && a[R] === void 0 && (a[R] = {}), typeof a[R] != "object" || Array.isArray(a[R]) ? (Array.isArray(a[R]) ? a[R].push({}) : a[R] = [a[R], {}], a = a[R][a[R].length - 1]) : a = a[R];
      });
      const r = dt(c[c.length - 1]), g = E(c.join("."), u.arrays), p = Array.isArray(f);
      let m = d["duplicate-arguments-array"];
      !m && E(r, u.nargs) && (m = !0, (!q(a[r]) && u.nargs[r] === 1 || Array.isArray(a[r]) && a[r].length === u.nargs[r]) && (a[r] = void 0)), f === Xe() ? a[r] = Xe(a[r]) : Array.isArray(a[r]) ? m && g && p ? a[r] = d["flatten-duplicate-arrays"] ? a[r].concat(f) : (Array.isArray(a[r][0]) ? a[r] : [a[r]]).concat([f]) : !m && !!g == !!p ? a[r] = f : a[r] = a[r].concat([f]) : a[r] === void 0 && g ? a[r] = p ? f : [f] : m && !(a[r] === void 0 || E(r, u.counts) || E(r, u.bools)) ? a[r] = [a[r], f] : a[r] = f;
    }
    function Vt(...s) {
      s.forEach(function(c) {
        Object.keys(c || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(a) {
            if (/-/.test(a) && d["camel-case-expansion"]) {
              const r = se(a);
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Ie[r] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(a) {
            if (a.length > 1 && /[A-Z]/.test(a) && d["camel-case-expansion"]) {
              const r = St(a, "-");
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Ie[r] = !0);
            }
          }), u.aliases[f].forEach(function(a) {
            u.aliases[a] = [f].concat(u.aliases[f].filter(function(r) {
              return a !== r;
            }));
          }));
        });
      });
    }
    function E(s, c) {
      const f = [].concat(u.aliases[s] || [], s), a = Object.keys(c), r = f.find((g) => a.includes(g));
      return r ? c[r] : !1;
    }
    function pt(s) {
      const c = Object.keys(u);
      return [].concat(c.map((a) => u[a])).some(function(a) {
        return Array.isArray(a) ? a.includes(s) : a[s];
      });
    }
    function Ut(s, ...c) {
      return [].concat(...c).some(function(a) {
        const r = s.match(a);
        return r && pt(r[1]);
      });
    }
    function Dt(s) {
      if (s.match(k) || !s.match(/^-[^-]+/))
        return !1;
      let c = !0, f;
      const a = s.slice(1).split("");
      for (let r = 0; r < a.length; r++) {
        if (f = s.slice(r + 2), !pt(a[r])) {
          c = !1;
          break;
        }
        if (a[r + 1] && a[r + 1] === "=" || f === "-" || /[A-Za-z]/.test(a[r]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || a[r + 1] && a[r + 1].match(/\W/))
          break;
      }
      return c;
    }
    function Ve(s) {
      return d["unknown-options-as-args"] && Gt(s);
    }
    function Gt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(k) || Dt(s) ? !1 : !Ut(s, /^-+([^=]+?)=[\s\S]*$/, qe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function J(s) {
      return !E(s, u.bools) && !E(s, u.counts) && `${s}` in C ? C[s] : kt(qt(s));
    }
    function kt(s) {
      return {
        [U.BOOLEAN]: !0,
        [U.STRING]: "",
        [U.NUMBER]: void 0,
        [U.ARRAY]: []
      }[s];
    }
    function qt(s) {
      let c = U.BOOLEAN;
      return E(s, u.strings) ? c = U.STRING : E(s, u.numbers) ? c = U.NUMBER : E(s, u.bools) ? c = U.BOOLEAN : E(s, u.arrays) && (c = U.ARRAY), c;
    }
    function q(s) {
      return s === void 0;
    }
    function Zt() {
      Object.keys(u.counts).find((s) => E(s, u.arrays) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : E(s, u.nargs) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(at, F),
      configuration: d,
      defaulted: Object.assign({}, lt),
      error: P,
      newAliases: Object.assign({}, Ie)
    };
  }
}
function pn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let o = !0;
  for (Object.keys(e).forEach(function(i) {
    t.push([].concat(e[i], i));
  }); o; ) {
    o = !1;
    for (let i = 0; i < t.length; i++)
      for (let l = i + 1; l < t.length; l++)
        if (t[i].filter(function(d) {
          return t[l].indexOf(d) !== -1;
        }).length) {
          t[i] = t[i].concat(t[l]), t.splice(l, 1), o = !0;
          break;
        }
  }
  return t.forEach(function(i) {
    i = i.filter(function(h, d, C) {
      return C.indexOf(h) === d;
    });
    const l = i.pop();
    l !== void 0 && typeof l == "string" && (n[l] = i);
  }), n;
}
function Xe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function dt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function dn(e) {
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
var Ye, He, Je;
const gt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, mt = (He = (Ye = process == null ? void 0 : process.versions) === null || Ye === void 0 ? void 0 : Ye.node) !== null && He !== void 0 ? He : (Je = process == null ? void 0 : process.version) === null || Je === void 0 ? void 0 : Je.slice(1);
if (mt && Number(mt.match(/^([^.]+)/)[1]) < gt)
  throw Error(`yargs parser supports a minimum Node.js version of ${gt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const gn = process ? process.env : {}, Ot = new hn({
  cwd: process.cwd,
  env: () => gn,
  format: vt,
  normalize: Xt,
  resolve: te,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(ct(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), We = function(t, n) {
  return Ot.parse(t.slice(), n).argv;
};
We.detailed = function(e, t) {
  return Ot.parse(e.slice(), t);
};
We.camelCase = se;
We.decamelize = St;
We.looksLikeNumber = _t;
const mn = {
  right: An,
  center: vn
}, $n = 0, Ue = 1, bn = 2, De = 3;
class yn {
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
`).map((i) => i.split("	"));
    let o = 0;
    return n.forEach((i) => {
      i.length > 1 && W.stringWidth(i[0]) > o && (o = Math.min(Math.floor(this.width * 0.5), W.stringWidth(i[0])));
    }), n.forEach((i) => {
      this.div(...i.map((l, h) => ({
        text: l.trim(),
        padding: this.measurePadding(l),
        width: h === 0 && i.length > 1 ? o : void 0
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
    const n = W.stripAnsi(t);
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
    return this.rasterize(t).forEach((o, i) => {
      let l = "";
      o.forEach((h, d) => {
        const { width: C } = t[d], _ = this.negatePadding(t[d]);
        let w = h;
        if (_ > W.stringWidth(h) && (w += " ".repeat(_ - W.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const z = mn[t[d].align];
          w = z(w, _), W.stringWidth(w) < _ && (w += " ".repeat((C || 0) - W.stringWidth(w) - 1));
        }
        const L = t[d].padding || [0, 0, 0, 0];
        L[De] && (l += " ".repeat(L[De])), l += $t(t[d], w, "| "), l += w, l += $t(t[d], w, " |"), L[Ue] && (l += " ".repeat(L[Ue])), i === 0 && n.length > 0 && (l = this.renderInline(l, n[n.length - 1]));
      }), n.push({
        text: l.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const o = t.match(/^ */), i = o ? o[0].length : 0, l = n.text, h = W.stringWidth(l.trimRight());
    return n.span ? this.wrap ? i < h ? t : (n.hidden = !0, l.trimRight() + " ".repeat(i - h) + t.trimLeft()) : (n.hidden = !0, l + t) : t;
  }
  rasterize(t) {
    const n = [], o = this.columnWidths(t);
    let i;
    return t.forEach((l, h) => {
      l.width = o[h], this.wrap ? i = W.wrap(l.text, this.negatePadding(l), { hard: !0 }).split(`
`) : i = l.text.split(`
`), l.border && (i.unshift("." + "-".repeat(this.negatePadding(l) + 2) + "."), i.push("'" + "-".repeat(this.negatePadding(l) + 2) + "'")), l.padding && (i.unshift(...new Array(l.padding[$n] || 0).fill("")), i.push(...new Array(l.padding[bn] || 0).fill(""))), i.forEach((d, C) => {
        n[C] || n.push([]);
        const _ = n[C];
        for (let w = 0; w < h; w++)
          _[w] === void 0 && _.push("");
        _.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[De] || 0) + (t.padding[Ue] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || W.stringWidth(h.text));
    let n = t.length, o = this.width;
    const i = t.map((h) => {
      if (h.width)
        return n--, o -= h.width, h.width;
    }), l = n ? Math.floor(o / n) : 0;
    return i.map((h, d) => h === void 0 ? Math.max(l, En(t[d])) : h);
  }
}
function $t(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function En(e) {
  const t = e.padding || [], n = 1 + (t[De] || 0) + (t[Ue] || 0);
  return e.border ? n + 4 : n;
}
function Cn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function An(e, t) {
  e = e.trim();
  const n = W.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function vn(e, t) {
  e = e.trim();
  const n = W.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let W;
function xn(e, t) {
  return W = t, new yn({
    width: e?.width || Cn(),
    wrap: e?.wrap
  });
}
const Nt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function jt(e) {
  return e.replace(Nt, "");
}
function wn(e, t) {
  const [n, o] = e.match(Nt) || ["", ""];
  e = jt(e);
  let i = "";
  for (let l = 0; l < e.length; l++)
    l !== 0 && l % t === 0 && (i += `
`), i += e.charAt(l);
  return n && o && (i = `${n}${i}${o}`), i;
}
function Sn(e) {
  return xn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: jt,
    wrap: wn
  });
}
function _n(e, t) {
  let n = te(".", e), o;
  for (xt(n).isDirectory() || (n = et(n)); ; ) {
    if (o = t(n, en(n)), o)
      return te(n, o);
    if (n = et(o = n), o === n)
      break;
  }
}
const On = {
  fs: {
    readFileSync: ct,
    writeFile: tn
  },
  format: vt,
  resolve: te,
  exists: (e) => {
    try {
      return xt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let V;
class Nn {
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
    })) : o(), V.format.apply(V.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), o = t.shift(), i = t.shift();
    let l = function() {
    };
    typeof t[t.length - 1] == "function" && (l = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = i === 1 ? n : o;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][i === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: o
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: l
    })) : l();
    const d = [h];
    return ~h.indexOf("%d") && d.push(i), V.format.apply(V.format, d.concat(t));
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
    return t.forEach(function(i, l) {
      const h = n[l + 1];
      o += i, typeof h < "u" && (o += "%s");
    }), this.__.apply(this, [o].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], o = n.directory, i = n.locale, l = n.cb, h = this._resolveLocaleFile(o, i), d = JSON.stringify(this.cache[i], null, 2);
    V.fs.writeFile(h, d, "utf-8", function(C) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), l(C);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      V.fs.readFileSync && (t = JSON.parse(V.fs.readFileSync(n, "utf-8")));
    } catch (o) {
      if (o instanceof SyntaxError && (o.message = "syntax error in " + n), o.code === "ENOENT")
        t = {};
      else
        throw o;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let o = V.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(o) && ~n.lastIndexOf("_")) {
      const i = V.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(i) && (o = i);
    }
    return o;
  }
  _fileExistsSync(t) {
    return V.exists(t);
  }
}
function jn(e, t) {
  V = t;
  const n = new Nn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Fn = (e) => jn(e, On), Rn = "require is not supported by ESM", bt = "loading a directory of commands is not supported yet for ESM";
let Le;
try {
  Le = sn(import.meta.url);
} catch {
  Le = process.cwd();
}
const Ln = Le.substring(0, Le.lastIndexOf("node_modules"));
nn, on, Qt, Ln || process.cwd(), Yt, et, Ht, Jt, te, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ct, Fn({
  directory: te(Le, "../../../locales"),
  updateFiles: !1
});
const re = "\x1B[44m", A = "\x1B[43m", O = "\x1B[41m", Tn = "\x1B[42m", $ = "\x1B[0m", v = "\x1B[33m", x = "\x1B[36m", b = "\x1B[0m", Wn = {
  "vue-caution": ["implicitParentChildCommunication", "elementSelectorsWithScoped"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["topLevelElementOrder", "elementAttributeOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression",
    "fullWordComponentName"
  ],
  rrd: [
    "cyclomaticComplexity",
    "elseCondition",
    "functionSize",
    "parameterCount",
    "plainScript",
    "scriptLenght",
    "shortVariableName",
    "tooManyProps"
  ]
}, Te = Object.keys(Wn), nt = 100, ie = [], In = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > nt && ie.push({ fileName: t, scriptLength: n.length });
}, Bn = () => (ie.length > 0 && (console.log(
  `
${x}rrd${b} ${O}Long <script> blocks${$} in ${ie.length} files.`
), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${nt} lines.${b}`
), ie.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > nt * 2 ? O : A}(${e.scriptLength} lines)${$}`
  );
})), ie.length), ce = [], Mn = (e, t) => {
  !e || !e.setup || ce.push(t);
}, zn = () => (ce.length > 0 && (console.log(
  `
${x}rrd${b} ${A}Plain <script> blocks${$} in ${ce.length} files.`
), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${b}`), ce.forEach((e) => {
  console.log(`- ${e}`);
})), ce.length), Pn = /^(\(.*\)|\\?.)$/;
function Y(e) {
  const t = e.toString();
  return Pn.test(t) ? t : `(?:${t})`;
}
const Vn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Un = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function y(e) {
  const t = (n) => y(`(?<${n}>${`${e}`.replace(Vn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => y(`${e}${D(...n)}`), {
      referenceTo: (n) => y(`${e}\\k<${n}>`)
    }),
    or: (...n) => y(`(?:${e}|${D(...n)})`),
    after: (...n) => y(`(?<=${D(...n)})${e}`),
    before: (...n) => y(`${e}(?=${D(...n)})`),
    notAfter: (...n) => y(`(?<!${D(...n)})${e}`),
    notBefore: (...n) => y(`${e}(?!${D(...n)})`),
    times: Object.assign((n) => y(`${Y(e)}{${n}}`), {
      any: () => y(`${Y(e)}*`),
      atLeast: (n) => y(`${Y(e)}{${n},}`),
      atMost: (n) => y(`${Y(e)}{0,${n}}`),
      between: (n, o) => y(`${Y(e)}{${n},${o}}`)
    }),
    optionally: () => y(`${Y(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => y(`${e}`.replace(Un, "($1$3)$2")),
    at: {
      lineStart: () => y(`^${e}`),
      lineEnd: () => y(`${e}$`)
    }
  };
}
const Dn = /[.*+?^${}()|[\]\\/]/g;
function ot(e) {
  return y(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return y(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Gn = y(".");
y("\\b\\w+\\b");
const ke = y("\\w"), B = y("\\b");
y("\\d");
const kn = y("\\s"), Fe = Object.assign(y("[a-zA-Z]"), {
  lowercase: y("[a-z]"),
  uppercase: y("[A-Z]")
}), Ft = y("\\t"), qn = y("\\n");
y("\\r");
y("\\W+"), y("\\W"), y("\\B"), y("\\D"), y("\\S"), Object.assign(y("[^a-zA-Z]"), {
  lowercase: y("[^a-z]"),
  uppercase: y("[^A-Z]")
}), y("[^\\t]"), y("[^\\n]"), y("[^\\r]");
function K(...e) {
  return y(`${Y(D(...e))}?`);
}
function D(...e) {
  return y(
    e.map((t) => typeof t == "string" ? t.replace(Dn, "\\$&") : t).join("")
  );
}
function N(...e) {
  return y(`${Y(D(...e))}+`);
}
const G = "i", I = "g", j = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(D(...e).toString(), [...t || ""].join(""));
}, le = [], Zn = (e, t) => {
  if (!e)
    return;
  const n = j(B, "else", B, [I, G]), o = e.content.match(n);
  o?.length && le.push({ fileName: t, elseCount: o.length });
}, Kn = () => (le.length > 0 && (console.log(
  `
${x}rrd${b} ${A}else conditions${$} are used in ${le.length} files.`
), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${b}`), le.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.elseCount})${$}`);
})), le.length), Qn = 5, Xn = 10, ae = [], Yn = (e, t) => {
  if (!e)
    return;
  const n = j(B, "if", B, [I, G]), o = j(B, "else", B, [I, G]), i = j(B, "for", B, [I, G]), l = j(B, "while", B, [I, G]), h = j(B, "case", B, [I, G]), d = e.content.match(n), C = e.content.match(o), _ = e.content.match(i), w = e.content.match(l), L = e.content.match(h), z = (d?.length || 0) + (C?.length || 0) + (_?.length || 0) + (w?.length || 0) + (L?.length || 0);
  z > Qn && ae.push({ fileName: t, cyclomaticComplexity: z });
}, Hn = () => (ae.length > 0 && (console.log(
  `
${x}rrd${b} ${re}cyclomaticComplexity${$} is above moderate in ${ae.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${b}`), ae.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Xn ? O : A}(${e.cyclomaticComplexity})${$}`
  );
})), ae.length), ue = [], Jn = (e) => {
  if (e.includes("pages"))
    return;
  const t = it.basename(e);
  if (t === "App.vue")
    return;
  const n = j(Fe.uppercase);
  t.slice(1).match(n)?.length || ue.push({ filePath: e });
}, eo = () => (ue.length > 0 && (console.log(
  `
${x}vue-essential${b} ${O}single name component${$} is used in ${ue.length} files.`
), console.log(
  `👉 ${v}Rename the component to use multi-word name.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ue.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ue.length), fe = [], to = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || fe.push({ filePath: t });
  });
}, no = () => (fe.length > 0 && (console.log(
  `
${x}vue-essential${b} ${O}Global style ${$} is used in ${fe.length} files.`
), console.log(
  `👉 ${v}Use <style scoped>.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), fe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), fe.length), he = [], oo = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps([", [I, G]);
  e.content.match(n)?.length && he.push({ filePath: t });
}, so = () => (he.length > 0 && (console.log(
  `
${x}vue-essential${b} ${O}simple prop${$} is used in ${he.length} files.`
), console.log(
  `👉 ${v}Add at least type definition.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), he.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), he.length), pe = [], ro = (e, t) => {
  if (!e)
    return;
  const n = j(
    "<",
    N(M(">")),
    " v-if",
    N(M(">")),
    " v-for",
    N(M(">")),
    ">",
    [I, G]
  ), o = j(
    "<",
    N(M(">")),
    " v-for",
    N(M(">")),
    " v-if",
    N(M(">")),
    ">",
    [I, G]
  ), i = e.content.match(n), l = e.content.match(o);
  (i?.length || l?.length) && pe.push({ filePath: t });
}, io = () => (pe.length > 0 && (console.log(
  `
${x}vue-essential${b} ${O}v-if used with v-for${$} in ${pe.length} files.`
), console.log(
  `👉 ${v}Move out the v-if to a computed property.${b} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), pe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), pe.length), de = [], co = (e, t) => {
  if (!e)
    return;
  const n = j("<", N(M(">")), " v-for", N(M(">")), ">", [
    I,
    G
  ]), o = e.content.match(n);
  o?.length && (o.some((l) => l.includes(":key")) || de.push({ filePath: t }));
}, lo = () => (de.length > 0 && (console.log(
  `
${x}vue-essential${b} ${O}v-for has no key${$} in ${de.length} files.`
), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), de.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), de.length), ge = [], ao = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = it.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, o = t.match(n), i = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, l = t.match(i);
  !o?.length && !l?.length && ge.push({ fileName: e });
}, uo = () => (ge.length > 0 && (console.log(
  `
${x}vue-strong${b} ${O}component name is not PascalCase and not kebab-case${$} in ${ge.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ge.forEach((e) => {
  console.log(`- ${O}${e.fileName}${$}`);
})), ge.length), me = [], fo = j(
  N(Fe.lowercase).at.lineStart(),
  N(Fe.uppercase, Fe.lowercase.times.any().grouped()).at.lineEnd()
), ho = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((l) => l.split(":")[0]).filter((l) => l.length).filter((l) => !fo.test(l)).length && me.push({ filePath: t });
}, po = () => (me.length > 0 && (console.log(
  `
${x}vue-strong${b} ${O}prop names are not camelCased${$} in ${me.length} files.`
), console.log(
  `👉 ${v}Rename the props to camelCase.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), me.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), me.length), Q = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), o = e.slice(0, n).split(`
`).length, i = t.split(`
`).length;
  return o + i - 1;
};
function X(e, t) {
  return new Set(e.map((o) => o[t])).size;
}
const $e = [], go = 40, mo = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((i) => i[1].trim()).forEach((i) => {
    if (i.length > go) {
      const l = Q(e.content, i), h = i.split(`
`).at(0)?.trim() || "";
      $e.push({
        filename: t,
        message: `${t}#${l} ${A}${h}${$}`
      });
    }
  });
}, $o = () => {
  if ($e.length > 0) {
    const e = X($e, "filename");
    console.log(
      `
${x}vue-strong${b} ${O}Lengthy template expression${$} found in ${e} files.`
    ), console.log(
      `👉 ${v}Refactor the expression into a computed property.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), $e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return $e.length;
}, be = [], bo = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = j(
    "<",
    N(ke),
    K(N(ot(` 	
\r`))),
    N(M("/>")),
    K(N(ot(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), i = n.content.match(o);
  if (i === null)
    return;
  const l = j(":", N(ke), K(" "), "=", K(" "), M(`'"`), [
    "g"
  ]);
  i.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(l);
    if (d?.length) {
      const C = Q(e.source, h);
      be.push({ message: `${t}#${C} ${A}${d}${$}` });
    }
  });
}, yo = () => (be.length > 0 && (console.log(
  `
${x}vue-strong${b} ${O}Attribute value is not quoted${$} in ${be.length} files.`
), console.log(
  `👉 ${v}Use quotes for attribute values.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), be.length), ye = [], Eo = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = j(
    "<",
    N(Fe.uppercase, ke),
    K(qn, Ft),
    K(N(M(">"))),
    "></",
    N(ke),
    ">",
    ["g"]
  ), i = n.content.match(o);
  i !== null && i.forEach((l) => {
    const h = Q(e.source, l), d = l.split(`
`).at(-1)?.trim() || "";
    ye.push({ message: `${t}#${h} ${A}${d}${$}` });
  });
}, Co = () => (ye.length > 0 && (console.log(
  `
${x}vue-strong${b} - ${O}Component is not self closing${$} in ${ye.length} files.`
), console.log(
  `👉 ${v}Components with no content should be self-closing.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), ye.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ye.length), Ge = [], st = [], Ao = ["v-slot", "v-bind", "v-on"], vo = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ao.forEach((o) => {
    if (n.content.includes(`${o}:`)) {
      const i = Q(e.source, o);
      Ge.push({ message: `${t}:${i} ${A}${o}${$}` }), st.some((l) => l.filePath === t) || st.push({ filePath: t });
    }
  });
}, xo = () => (Ge.length > 0 && (console.log(
  `
${x}vue-strong${b} ${O}Directive shorthands not used${$} in ${st.length} files.`
), console.log(
  `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Ge.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Ge.length), Ee = [], wo = 3, So = (e) => {
  const t = j(
    N(M("/")).grouped(),
    D(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const o = n[0]?.split(".vue")[0], i = j(
      ot("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [I]
    ), l = o.match(i);
    (!l || l.length < wo) && Ee.push({ filename: o, filePath: e });
  }
}, _o = () => {
  if (Ee.length > 0) {
    const e = X(Ee, "filename");
    console.log(`
${x}vue-strong${b} ${O}full-word component names${$} detected in ${e} files.`), console.log(
      `👉 ${v}Component names should prefer full words over abbreviations.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`
    ), Ee.forEach((t) => {
      console.log(`- ${t.filePath} 🚨 ${A}(${t.filename})${$}`);
    });
  }
  return Ee.length;
}, Ce = [], Oo = (e, t) => {
  const n = e.toString(), o = n.indexOf("<script setup>"), i = n.indexOf("<template>"), l = n.indexOf("<style>"), h = [
    { name: "script", index: o },
    { name: "template", index: i },
    { name: "style", index: l }
  ].filter((C) => C.index !== -1);
  h.every((C, _) => _ === 0 ? !0 : h[_ - 1].index < C.index) || Ce.push({ filename: t });
}, No = () => (Ce.length > 0 && (console.log(`
${x}vue-recommended${b} ${A}SFC top-level element order${$} detected in ${Ce.length} files.`), console.log(
  `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${b} See: https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order`
), Ce.forEach((e) => {
  console.log(` - ${e.filename} 🚨`);
})), Ce.length), Ae = [], yt = [
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
], jo = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), o = /<(\w+)(\s[^>]+)?>/g, i = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let l;
  for (; (l = o.exec(n)) !== null; ) {
    const h = l[1], d = l[2];
    if (d) {
      const _ = Array.from(d.matchAll(i), (L) => L[1]).filter((L) => yt.includes(L));
      let w = -1;
      for (const L of _) {
        const z = yt.indexOf(L);
        if (z !== -1 && z < w) {
          Ae.push({
            filename: t,
            message: `${t} tag has attributes out of order ${A}(${h})${$}`
          });
          break;
        }
        w = z;
      }
    }
  }
}, Fo = () => {
  if (Ae.length > 0) {
    const e = X(Ae, "filename");
    console.log(`
${x}vue-recommended${b} ${O}element attribute order ${$} detected in ${e} files.`), console.log(
      `👉 ${v}The attributes of elements (including components) should be ordered consistently.${b} See: https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order`
    ), Ae.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Ae.length;
}, ve = [], Ro = 5, Lo = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps", K("<"), K("("), "{", N(Gn), "}", ["g", "s"]), o = e.content.match(n);
  if (o?.length) {
    const i = o[0].split(",").length;
    i > Ro && ve.push({ fileName: t, propsCount: i });
  }
}, To = () => (ve.length > 0 && (console.log(
  `
${x}rrd${b} ${A}too many props${$} are used in ${ve.length} files.`
), console.log(`👉 ${v}Try to refactor your code to use less properties.${b}`), ve.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.propsCount})${$}`);
})), ve.length), xe = [], Rt = 20, Wo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const i = o[1] || o[5];
    (o[2] || o[6]).split(`
`).length > Rt && xe.push({ filename: t, funcName: i });
  }
}, Io = () => {
  if (xe.length > 0) {
    const e = X(xe, "filename");
    console.log(
      `
${x}rrd${b} ${A}function size${$} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${v}Functions must be shorter than ${Rt} lines${b}`), xe.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.funcName})${$}`);
    });
  }
  return xe.length;
}, we = [], Lt = 3, Et = (e, t, n) => {
  const o = t.split(",").map((i) => i.trim()).filter((i) => i.length > 0);
  o.length > Lt && we.push({ filename: n, funcName: e, paramsCount: o.length });
}, Bo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1] ? Et(o[1], o[2], t) : o[3] && Et(o[3], o[4], t);
}, Mo = () => (we.length > 0 && (console.log(
  `
${x}rrd${b} ${A}parameter count${$} exceeds recommended limit in ${we.length} files.`
), console.log(`👉 ${v}Max number of function parameters should be ${Lt}${b}`), we.forEach((e) => {
  console.log(
    `- ${A}${e.funcName}${$} in file ${e.filename} 🚨 ${A}(${e.paramsCount})${$}`
  );
})), we.length), Tt = 4, Se = [], zo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const i = o[1];
    i.length < Tt && Se.push({ filename: t, variable: i });
  }
}, Po = () => {
  if (Se.length > 0) {
    const e = X(Se, "filename");
    console.log(`
${x}rrd${b} ${A}variable names${$} are too short in ${e} files.`), console.log(`👉 ${v}Variable names must have a minimum length of ${Tt}${b}`), Se.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.variable})${$}`);
    });
  }
  return Se.length;
}, rt = [], Re = [], Vo = 5, Uo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, o = e.content.match(n);
  o?.length && o.forEach((i) => {
    if (i.split(`
`).length > Vo) {
      const l = i.split(`
`)[0], h = Q(e.content, l);
      rt.push({ message: `${t}:${h} ${A}computed${$}` }), Re.push({ filePath: t }), Re.some((d) => d.filePath === t) || Re.push({ filePath: t });
    }
  });
}, Do = () => (Re.length > 0 && (console.log(
  `
${x}vue-strong${b} ${O}complicated computed property ${$} in ${Re.length} files.`
), console.log(
  `👉 ${v}Refactor the computed properties to smaller ones.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), rt.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), rt.length), _e = [], Go = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((i) => i[1].trim()).forEach((i) => {
    const l = Q(e.content.trim(), i), h = i.split(`
`).at(0)?.trim() || "";
    _e.push({ filename: t, message: `${t}#${l} ${A}(${h})${$}` });
  });
}, ko = () => {
  if (_e.length > 0) {
    const e = X(_e, "filename");
    console.log(`
${x}vue-strong${b} ${O}component files${$} detected in ${e} files.`), console.log(
      `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), _e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return _e.length;
}, ee = [], qo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, o = /v-model\s*=\s*"([^"]+)"/, i = j(D("$parent").or("getCurrentInstance"), [I]), l = e.content.match(n), h = e.content.match(o);
  if (h) {
    const C = h[1].split(".")[0], _ = l ? l[1] : "";
    if (_.includes(C)) {
      const w = Q(e.content.trim(), _);
      ee.push({
        filename: t,
        message: `${t}#${w} ${A}(${C})${$}`
      });
    }
  }
  const d = e.content.match(i);
  if (d) {
    const C = Q(e.content.trim(), d[0]);
    ee.push({
      filename: t,
      message: `${t}#${C} ${A}(${d[0]})${$}`
    });
  }
}, Zo = () => {
  if (ee.length > 0) {
    const e = X(
      ee,
      "filename"
    );
    console.log(
      `
${x}vue-caution${b} ${A}implicit parent-child communication${$} detected in ${e} files.`
    ), console.log(
      `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${b} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), ee.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ee.length;
}, Oe = [], Ct = 5, Ko = 3, Qo = (e, t) => {
  if (!e)
    return;
  const n = j(Ft.times.atLeast(Ct).or(kn.times.atLeast(Ko * Ct)), [
    I,
    G
  ]);
  e.content.match(n)?.forEach((i) => {
    const l = Q(e.content, i);
    Oe.push({
      filePath: t,
      message: `${t}#${l} ${A}indentation: ${i.length}${$}`
    });
  });
}, Xo = () => {
  if (Oe.length > 0) {
    const e = X(Oe, "filePath");
    console.log(`
${x}rrd${b} ${A}deep indentation${$} found in ${e} files.`), console.log(
      `👉 ${v}Try to refactor your component to child components, to avoid deep indentations..${b}`
    ), Oe.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Oe.length;
}, Yo = [
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
], Ne = [], Ho = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((o) => {
    let i;
    for (; (i = n.exec(o.content)) !== null; ) {
      const l = i[1];
      Yo.includes(l) && Ne.push({ filename: t, selector: l });
    }
  });
}, Jo = () => {
  if (Ne.length > 0) {
    const e = X(Ne, "filename");
    console.log(
      `
${x}vue-caution${b} ${A}element selectors with scoped${$} found in ${e} files.`
    ), console.log(
      `👉 ${v}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${b} See: https://vuejs.org/style-guide/rules-use-with-caution.html#element-selectors-with-scoped`
    ), Ne.forEach((t) => {
      console.log(` - ${t.filename} 🚨 ${A}(${t.selector})${$}`);
    });
  }
  return Ne.length;
}, es = () => {
  let e = 0;
  return e += eo(), e += so(), e += lo(), e += io(), e += no(), e += uo(), e += Co(), e += po(), e += $o(), e += yo(), e += xo(), e += Do(), e += ko(), e += _o(), e += No(), e += Fo(), e += Zo(), e += Jo(), e += Hn(), e += Xo(), e += Kn(), e += Io(), e += Mo(), e += zn(), e += Bn(), e += Po(), e += To(), e;
}, ts = (e, t, n) => {
  const o = e.scriptSetup || e.script;
  n.includes("vue-essential") && (Jn(t), oo(o, t), to(e.styles, t), co(e.template, t), ro(e.template, t)), n.includes("vue-strong") && (ao(t), ho(o, t), Go(o, t), Uo(o, t), Eo(e, t), mo(e.template, t), bo(e, t), vo(e, t), So(t)), n.includes("vue-recommended") && (Oo(e.source, t), jo(e.template, t)), n.includes("vue-caution") && (qo(o, t), Ho(e.styles, t)), n.includes("rrd") && (Yn(o, t), Qo(o, t), Zn(o, t), Wo(o, t), Bo(o, t), Mn(e.script, t), In(o, t), zo(o, t), Lo(o, t));
};
let Wt = 0;
const ns = [
  "src",
  "components",
  "pages",
  "layouts",
  "server",
  "composables",
  "store",
  "utils",
  "plugins",
  "middleware"
], It = (e, t) => {
  const n = tt.readdirSync(e);
  Wt += n.length;
  for (const o of n) {
    const i = it.join(e, o);
    tt.statSync(i).isDirectory() ? ns.some((l) => i.includes(l)) && It(i, t) : o.endsWith(".vue") && t(i);
  }
}, os = (e, t = []) => {
  console.log(`

${re}Analyzing Vue files in ${e}${$}`);
  const n = Te.filter((o) => !t.includes(o));
  console.log(`Applying ${t.length} rulesets ${re}${t}${$} and ignoring ${n.length} rulesets ${re}${n}${$} `), It(e, (o) => {
    if (o.includes("App.vue") || o.includes("app.vue"))
      return;
    const i = tt.readFileSync(o, "utf-8"), { descriptor: l } = rn(i);
    ts(l, o, t);
  }), console.log(`Found ${re}${Wt}${$} Vue files`), es() || console.log(`${Tn}No code smells detected!${$}`);
};
Kt(an(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rulesets to ignore",
    type: "string",
    coerce: At("ignore")
  }).option("apply", {
    describe: "Comma-separated list of rulesets to apply",
    type: "string",
    coerce: At("apply")
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${O}Cannot use both --ignore and --apply options together.${$}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...Te];
    e.apply && (t = e.apply), e.ignore && (t = Te.filter((n) => !e.ignore.includes(n))), os(e.path, t);
  }
).help().argv;
function At(e) {
  return (t) => {
    const n = t.split(","), o = n.filter((i) => !Te.includes(i));
    return o.length > 0 && (console.error(
      `
${O}Invalid ${e} values: ${o.join(
        ", "
      )}${$}. 
${v}Allowed values are: ${[...Te].join(", ")}${b}

`
    ), process.exit(1)), n;
  };
}
