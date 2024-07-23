import Wt from "yargs";
import { format as ft, inspect as Pt } from "util";
import Ye, { normalize as zt, resolve as Y, dirname as Ue, basename as It, extname as Bt, relative as Mt } from "path";
import De, { readFileSync as Xe, statSync as ht, readdirSync as Vt, writeFile as Ut } from "fs";
import { notStrictEqual as Dt, strictEqual as Gt } from "assert";
import { fileURLToPath as Zt } from "url";
import { parse as qt } from "@vue/compiler-sfc";
class be extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, be);
  }
}
function pt() {
  return Kt() ? 0 : 1;
}
function Kt() {
  return Qt() && !process.defaultApp;
}
function Qt() {
  return !!process.versions.electron;
}
function Yt(e) {
  return e.slice(pt() + 1);
}
function Xt() {
  return process.argv[pt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function k(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const c = e.match(/^-+/);
    for (let a = c ? c[0].length : 0; a < e.length; a++) {
      let h = e.charAt(a);
      s && (s = !1, h = h.toUpperCase()), a !== 0 && (h === "-" || h === "_") ? s = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function gt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? s += `${t}${n.charAt(c)}` : s += h;
  }
  return s;
}
function dt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Ht(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, s = null, c = null;
  const a = [];
  for (let h = 0; h < e.length; h++) {
    if (n = s, s = e.charAt(h), s === " " && !c) {
      n !== " " && t++;
      continue;
    }
    s === c ? c = null : (s === "'" || s === '"') && !c && (c = s), a[t] || (a[t] = ""), a[t] += s;
  }
  return a;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var W;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(W || (W = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let B;
class kt {
  constructor(t) {
    B = t;
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
    }, n), c = Ht(t), a = typeof t == "string", h = Jt(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), g = Object.assign({
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
    }, s.configuration), A = Object.assign(/* @__PURE__ */ Object.create(null), s.default), j = s.configObjects || [], x = s.envPrefix, z = g["populate--"], Z = z ? "--" : "_", _e = /* @__PURE__ */ Object.create(null), He = /* @__PURE__ */ Object.create(null), q = s.__ || B.format, u = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Te = new RegExp("^--" + g["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(o) {
      const r = typeof o == "object" ? o.key : o, f = Object.keys(o).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      f && (u[f][r] = !0), u.arrays[r] = !0, u.keys.push(r);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(o) {
      u.bools[o] = !0, u.keys.push(o);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(o) {
      u.strings[o] = !0, u.keys.push(o);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(o) {
      u.numbers[o] = !0, u.keys.push(o);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(o) {
      u.counts[o] = !0, u.keys.push(o);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(o) {
      u.normalize[o] = !0, u.keys.push(o);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([o, r]) => {
      typeof r == "number" && (u.nargs[o] = r, u.keys.push(o));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([o, r]) => {
      typeof r == "function" && (u.coercions[o] = r, u.keys.push(o));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(o) {
      u.configs[o] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([o, r]) => {
      (typeof r == "boolean" || typeof r == "function") && (u.configs[o] = r);
    })), St(s.key, h, s.default, u.arrays), Object.keys(A).forEach(function(o) {
      (u.aliases[o] || []).forEach(function(r) {
        A[r] = A[o];
      });
    });
    let L = null;
    Tt();
    let ve = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ke = {};
    for (let o = 0; o < c.length; o++) {
      const r = c[o], f = r.replace(/^-{3,}/, "---");
      let l, i, d, p, m, S;
      if (r !== "--" && /^-/.test(r) && Se(r))
        We(r);
      else if (f.match(/^---+(=|$)/)) {
        We(r);
        continue;
      } else if (r.match(/^--.+=/) || !g["short-option-groups"] && r.match(/^-.+=/))
        p = r.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (y(p[1], u.arrays) ? o = xe(o, p[1], c, p[2]) : y(p[1], u.nargs) !== !1 ? o = we(o, p[1], c, p[2]) : C(p[1], p[2], !0));
      else if (r.match(Te) && g["boolean-negation"])
        p = r.match(Te), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], C(i, y(i, u.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !g["short-option-groups"] && r.match(/^-[^-]+/))
        p = r.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], y(i, u.arrays) ? o = xe(o, i, c) : y(i, u.nargs) !== !1 ? o = we(o, i, c) : (m = c[o + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !y(i, u.bools) && !y(i, u.counts) || /^(true|false)$/.test(m) ? (C(i, m), o++) : C(i, K(i))));
      else if (r.match(/^-.\..+=/))
        p = r.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && C(p[1], p[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[o + 1], p = r.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], m !== void 0 && !m.match(/^-/) && !y(i, u.bools) && !y(i, u.counts) ? (C(i, m), o++) : C(i, K(i)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        d = r.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < d.length; F++) {
          if (m = r.slice(F + 2), d[F + 1] && d[F + 1] === "=") {
            S = r.slice(F + 3), i = d[F], y(i, u.arrays) ? o = xe(o, i, c, S) : y(i, u.nargs) !== !1 ? o = we(o, i, c, S) : C(i, S), l = !0;
            break;
          }
          if (m === "-") {
            C(d[F], m);
            continue;
          }
          if (/[A-Za-z]/.test(d[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && y(m, u.bools) === !1) {
            C(d[F], m), l = !0;
            break;
          }
          if (d[F + 1] && d[F + 1].match(/\W/)) {
            C(d[F], m), l = !0;
            break;
          } else
            C(d[F], K(d[F]));
        }
        i = r.slice(-1)[0], !l && i !== "-" && (y(i, u.arrays) ? o = xe(o, i, c) : y(i, u.nargs) !== !1 ? o = we(o, i, c) : (m = c[o + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !y(i, u.bools) && !y(i, u.counts) || /^(true|false)$/.test(m) ? (C(i, m), o++) : C(i, K(i))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && y(r.slice(1), u.bools))
        i = r.slice(1), C(i, K(i));
      else if (r === "--") {
        ve = c.slice(o + 1);
        break;
      } else if (g["halt-at-non-option"]) {
        ve = c.slice(o);
        break;
      } else
        We(r);
    }
    et(O, !0), et(O, !1), vt(O), wt(), tt(O, u.aliases, A, !0), xt(O), g["set-placeholder-key"] && Ot(O), Object.keys(u.counts).forEach(function(o) {
      X(O, o.split(".")) || C(o, 0);
    }), z && ve.length && (O[Z] = []), ve.forEach(function(o) {
      O[Z].push(o);
    }), g["camel-case-expansion"] && g["strip-dashed"] && Object.keys(O).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete O[o];
    }), g["strip-aliased"] && [].concat(...Object.keys(h).map((o) => h[o])).forEach((o) => {
      g["camel-case-expansion"] && o.includes("-") && delete O[o.split(".").map((r) => k(r)).join(".")], delete O[o];
    });
    function We(o) {
      const r = Oe("_", o);
      (typeof r == "string" || typeof r == "number") && O._.push(r);
    }
    function we(o, r, f, l) {
      let i, d = y(r, u.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return I(l) || (L = Error(q("Argument unexpected for: %s", r))), C(r, K(r)), o;
      let p = I(l) ? 0 : 1;
      if (g["nargs-eats-options"])
        f.length - (o + 1) + p < d && (L = Error(q("Not enough arguments following: %s", r))), p = d;
      else {
        for (i = o + 1; i < f.length && (!f[i].match(/^-[^0-9]/) || f[i].match(P) || Se(f[i])); i++)
          p++;
        p < d && (L = Error(q("Not enough arguments following: %s", r)));
      }
      let m = Math.min(p, d);
      for (!I(l) && m > 0 && (C(r, l), m--), i = o + 1; i < m + o + 1; i++)
        C(r, f[i]);
      return o + m;
    }
    function xe(o, r, f, l) {
      let i = [], d = l || f[o + 1];
      const p = y(r, u.nargs);
      if (y(r, u.bools) && !/^(true|false)$/.test(d))
        i.push(!0);
      else if (I(d) || I(l) && /^-/.test(d) && !P.test(d) && !Se(d)) {
        if (A[r] !== void 0) {
          const m = A[r];
          i = Array.isArray(m) ? m : [m];
        }
      } else {
        I(l) || i.push(Pe(r, l, !0));
        for (let m = o + 1; m < f.length && !(!g["greedy-arrays"] && i.length > 0 || p && typeof p == "number" && i.length >= p || (d = f[m], /^-/.test(d) && !P.test(d) && !Se(d))); m++)
          o = m, i.push(Pe(r, d, a));
      }
      return typeof p == "number" && (p && i.length < p || isNaN(p) && i.length === 0) && (L = Error(q("Not enough arguments following: %s", r))), C(r, i), o;
    }
    function C(o, r, f = a) {
      if (/-/.test(o) && g["camel-case-expansion"]) {
        const d = o.split(".").map(function(p) {
          return k(p);
        }).join(".");
        Je(o, d);
      }
      const l = Pe(o, r, f), i = o.split(".");
      H(O, i, l), u.aliases[o] && u.aliases[o].forEach(function(d) {
        const p = d.split(".");
        H(O, p, l);
      }), i.length > 1 && g["dot-notation"] && (u.aliases[i[0]] || []).forEach(function(d) {
        let p = d.split(".");
        const m = [].concat(i);
        m.shift(), p = p.concat(m), (u.aliases[o] || []).includes(p.join(".")) || H(O, p, l);
      }), y(o, u.normalize) && !y(o, u.arrays) && [o].concat(u.aliases[o] || []).forEach(function(p) {
        Object.defineProperty(ke, p, {
          enumerable: !0,
          get() {
            return r;
          },
          set(m) {
            r = typeof m == "string" ? B.normalize(m) : m;
          }
        });
      });
    }
    function Je(o, r) {
      u.aliases[o] && u.aliases[o].length || (u.aliases[o] = [r], _e[r] = !0), u.aliases[r] && u.aliases[r].length || Je(r, o);
    }
    function Pe(o, r, f) {
      f && (r = en(r)), (y(o, u.bools) || y(o, u.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(i) {
        return Oe(o, i);
      }) : Oe(o, r);
      return y(o, u.counts) && (I(l) || typeof l == "boolean") && (l = Ie()), y(o, u.normalize) && y(o, u.arrays) && (Array.isArray(r) ? l = r.map((i) => B.normalize(i)) : l = B.normalize(r)), l;
    }
    function Oe(o, r) {
      return !g["parse-positional-numbers"] && o === "_" || !y(o, u.strings) && !y(o, u.bools) && !Array.isArray(r) && (dt(r) && g["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !I(r) && y(o, u.numbers)) && (r = Number(r)), r;
    }
    function vt(o) {
      const r = /* @__PURE__ */ Object.create(null);
      tt(r, u.aliases, A), Object.keys(u.configs).forEach(function(f) {
        const l = o[f] || r[f];
        if (l)
          try {
            let i = null;
            const d = B.resolve(B.cwd(), l), p = u.configs[f];
            if (typeof p == "function") {
              try {
                i = p(d);
              } catch (m) {
                i = m;
              }
              if (i instanceof Error) {
                L = i;
                return;
              }
            } else
              i = B.require(d);
            ze(i);
          } catch (i) {
            i.name === "PermissionDenied" ? L = i : o[f] && (L = Error(q("Invalid JSON config file: %s", l)));
          }
      });
    }
    function ze(o, r) {
      Object.keys(o).forEach(function(f) {
        const l = o[f], i = r ? r + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && g["dot-notation"] ? ze(l, i) : (!X(O, i.split(".")) || y(i, u.arrays) && g["combine-arrays"]) && C(i, l);
      });
    }
    function wt() {
      typeof j < "u" && j.forEach(function(o) {
        ze(o);
      });
    }
    function et(o, r) {
      if (typeof x > "u")
        return;
      const f = typeof x == "string" ? x : "", l = B.env();
      Object.keys(l).forEach(function(i) {
        if (f === "" || i.lastIndexOf(f, 0) === 0) {
          const d = i.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), k(p);
          });
          (r && u.configs[d.join(".")] || !r) && !X(o, d) && C(d.join("."), l[i]);
        }
      });
    }
    function xt(o) {
      let r;
      const f = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(l) {
        if (!f.has(l) && (r = y(l, u.coercions), typeof r == "function"))
          try {
            const i = Oe(l, r(o[l]));
            [].concat(u.aliases[l] || [], l).forEach((d) => {
              f.add(d), o[d] = i;
            });
          } catch (i) {
            L = i;
          }
      });
    }
    function Ot(o) {
      return u.keys.forEach((r) => {
        ~r.indexOf(".") || typeof o[r] > "u" && (o[r] = void 0);
      }), o;
    }
    function tt(o, r, f, l = !1) {
      Object.keys(f).forEach(function(i) {
        X(o, i.split(".")) || (H(o, i.split("."), f[i]), l && (He[i] = !0), (r[i] || []).forEach(function(d) {
          X(o, d.split(".")) || H(o, d.split("."), f[i]);
        }));
      });
    }
    function X(o, r) {
      let f = o;
      g["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(i) {
        f = f[i] || {};
      });
      const l = r[r.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function H(o, r, f) {
      let l = o;
      g["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(S) {
        S = ot(S), typeof l == "object" && l[S] === void 0 && (l[S] = {}), typeof l[S] != "object" || Array.isArray(l[S]) ? (Array.isArray(l[S]) ? l[S].push({}) : l[S] = [l[S], {}], l = l[S][l[S].length - 1]) : l = l[S];
      });
      const i = ot(r[r.length - 1]), d = y(r.join("."), u.arrays), p = Array.isArray(f);
      let m = g["duplicate-arguments-array"];
      !m && y(i, u.nargs) && (m = !0, (!I(l[i]) && u.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === u.nargs[i]) && (l[i] = void 0)), f === Ie() ? l[i] = Ie(l[i]) : Array.isArray(l[i]) ? m && d && p ? l[i] = g["flatten-duplicate-arrays"] ? l[i].concat(f) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([f]) : !m && !!d == !!p ? l[i] = f : l[i] = l[i].concat([f]) : l[i] === void 0 && d ? l[i] = p ? f : [f] : m && !(l[i] === void 0 || y(i, u.counts) || y(i, u.bools)) ? l[i] = [l[i], f] : l[i] = f;
    }
    function St(...o) {
      o.forEach(function(r) {
        Object.keys(r || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && g["camel-case-expansion"]) {
              const i = k(l);
              i !== f && u.aliases[f].indexOf(i) === -1 && (u.aliases[f].push(i), _e[i] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && g["camel-case-expansion"]) {
              const i = gt(l, "-");
              i !== f && u.aliases[f].indexOf(i) === -1 && (u.aliases[f].push(i), _e[i] = !0);
            }
          }), u.aliases[f].forEach(function(l) {
            u.aliases[l] = [f].concat(u.aliases[f].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function y(o, r) {
      const f = [].concat(u.aliases[o] || [], o), l = Object.keys(r), i = f.find((d) => l.includes(d));
      return i ? r[i] : !1;
    }
    function nt(o) {
      const r = Object.keys(u);
      return [].concat(r.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(o) : l[o];
      });
    }
    function Nt(o, ...r) {
      return [].concat(...r).some(function(l) {
        const i = o.match(l);
        return i && nt(i[1]);
      });
    }
    function jt(o) {
      if (o.match(P) || !o.match(/^-[^-]+/))
        return !1;
      let r = !0, f;
      const l = o.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (f = o.slice(i + 2), !nt(l[i])) {
          r = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return r;
    }
    function Se(o) {
      return g["unknown-options-as-args"] && Ft(o);
    }
    function Ft(o) {
      return o = o.replace(/^-{3,}/, "--"), o.match(P) || jt(o) ? !1 : !Nt(o, /^-+([^=]+?)=[\s\S]*$/, Te, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function K(o) {
      return !y(o, u.bools) && !y(o, u.counts) && `${o}` in A ? A[o] : Rt(Lt(o));
    }
    function Rt(o) {
      return {
        [W.BOOLEAN]: !0,
        [W.STRING]: "",
        [W.NUMBER]: void 0,
        [W.ARRAY]: []
      }[o];
    }
    function Lt(o) {
      let r = W.BOOLEAN;
      return y(o, u.strings) ? r = W.STRING : y(o, u.numbers) ? r = W.NUMBER : y(o, u.bools) ? r = W.BOOLEAN : y(o, u.arrays) && (r = W.ARRAY), r;
    }
    function I(o) {
      return o === void 0;
    }
    function Tt() {
      Object.keys(u.counts).find((o) => y(o, u.arrays) ? (L = Error(q("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : y(o, u.nargs) ? (L = Error(q("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(ke, O),
      configuration: g,
      defaulted: Object.assign({}, He),
      error: L,
      newAliases: Object.assign({}, _e)
    };
  }
}
function Jt(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); s; ) {
    s = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(g) {
          return t[a].indexOf(g) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(h, g, A) {
      return A.indexOf(h) === g;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function Ie(e) {
  return e !== void 0 ? e + 1 : 1;
}
function ot(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function en(e) {
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
var Be, Me, Ve;
const st = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, it = (Me = (Be = process == null ? void 0 : process.versions) === null || Be === void 0 ? void 0 : Be.node) !== null && Me !== void 0 ? Me : (Ve = process == null ? void 0 : process.version) === null || Ve === void 0 ? void 0 : Ve.slice(1);
if (it && Number(it.match(/^([^.]+)/)[1]) < st)
  throw Error(`yargs parser supports a minimum Node.js version of ${st}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const tn = process ? process.env : {}, mt = new kt({
  cwd: process.cwd,
  env: () => tn,
  format: ft,
  normalize: zt,
  resolve: Y,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Xe(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Ae = function(t, n) {
  return mt.parse(t.slice(), n).argv;
};
Ae.detailed = function(e, t) {
  return mt.parse(e.slice(), t);
};
Ae.camelCase = k;
Ae.decamelize = gt;
Ae.looksLikeNumber = dt;
const nn = {
  right: an,
  center: un
}, on = 0, Ne = 1, sn = 2, je = 3;
class rn {
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
`).map((c) => c.split("	"));
    let s = 0;
    return n.forEach((c) => {
      c.length > 1 && R.stringWidth(c[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), R.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((a, h) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: h === 0 && c.length > 1 ? s : void 0
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
    const n = R.stripAnsi(t);
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
    return this.rasterize(t).forEach((s, c) => {
      let a = "";
      s.forEach((h, g) => {
        const { width: A } = t[g], j = this.negatePadding(t[g]);
        let x = h;
        if (j > R.stringWidth(h) && (x += " ".repeat(j - R.stringWidth(h))), t[g].align && t[g].align !== "left" && this.wrap) {
          const Z = nn[t[g].align];
          x = Z(x, j), R.stringWidth(x) < j && (x += " ".repeat((A || 0) - R.stringWidth(x) - 1));
        }
        const z = t[g].padding || [0, 0, 0, 0];
        z[je] && (a += " ".repeat(z[je])), a += rt(t[g], x, "| "), a += x, a += rt(t[g], x, " |"), z[Ne] && (a += " ".repeat(z[Ne])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), c = s ? s[0].length : 0, a = n.text, h = R.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = s[h], this.wrap ? c = R.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[on] || 0).fill("")), c.push(...new Array(a.padding[sn] || 0).fill(""))), c.forEach((g, A) => {
        n[A] || n.push([]);
        const j = n[A];
        for (let x = 0; x < h; x++)
          j[x] === void 0 && j.push("");
        j.push(g);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[je] || 0) + (t.padding[Ne] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || R.stringWidth(h.text));
    let n = t.length, s = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, s -= h.width, h.width;
    }), a = n ? Math.floor(s / n) : 0;
    return c.map((h, g) => h === void 0 ? Math.max(a, cn(t[g])) : h);
  }
}
function rt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function cn(e) {
  const t = e.padding || [], n = 1 + (t[je] || 0) + (t[Ne] || 0);
  return e.border ? n + 4 : n;
}
function ln() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function an(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function un(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let R;
function fn(e, t) {
  return R = t, new rn({
    width: e?.width || ln(),
    wrap: e?.wrap
  });
}
const $t = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function bt(e) {
  return e.replace($t, "");
}
function hn(e, t) {
  const [n, s] = e.match($t) || ["", ""];
  e = bt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && s && (c = `${n}${c}${s}`), c;
}
function pn(e) {
  return fn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: bt,
    wrap: hn
  });
}
function gn(e, t) {
  let n = Y(".", e), s;
  for (ht(n).isDirectory() || (n = Ue(n)); ; ) {
    if (s = t(n, Vt(n)), s)
      return Y(n, s);
    if (n = Ue(s = n), s === n)
      break;
  }
}
const dn = {
  fs: {
    readFileSync: Xe,
    writeFile: Ut
  },
  format: ft,
  resolve: Y,
  exists: (e) => {
    try {
      return ht(e).isFile();
    } catch {
      return !1;
    }
  }
};
let T;
class mn {
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
    })) : s(), T.format.apply(T.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), c = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = c === 1 ? n : s;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const g = [h];
    return ~h.indexOf("%d") && g.push(c), T.format.apply(T.format, g.concat(t));
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
    return t.forEach(function(c, a) {
      const h = n[a + 1];
      s += c, typeof h < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(s, c), g = JSON.stringify(this.cache[c], null, 2);
    T.fs.writeFile(h, g, "utf-8", function(A) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(A);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      T.fs.readFileSync && (t = JSON.parse(T.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = T.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const c = T.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (s = c);
    }
    return s;
  }
  _fileExistsSync(t) {
    return T.exists(t);
  }
}
function $n(e, t) {
  T = t;
  const n = new mn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const bn = (e) => $n(e, dn), yn = "require is not supported by ESM", ct = "loading a directory of commands is not supported yet for ESM";
let Ee;
try {
  Ee = Zt(import.meta.url);
} catch {
  Ee = process.cwd();
}
const En = Ee.substring(0, Ee.lastIndexOf("node_modules"));
Dt, Gt, Pt, En || process.cwd(), It, Ue, Bt, Mt, Y, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Xe, bn({
  directory: Y(Ee, "../../../locales"),
  updateFiles: !1
});
const Ge = "\x1B[44m", _ = "\x1B[43m", N = "\x1B[41m", An = "\x1B[42m", E = "\x1B[0m", v = "\x1B[33m", w = "\x1B[36m", b = "\x1B[0m", Ze = 100, J = [], Cn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Ze && J.push({ fileName: t, scriptLength: n.length });
}, _n = () => (J.length > 0 && (console.log(
  `
${w}rrd${b} ${N}Long <script> blocks${E} in ${J.length} files.`
), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Ze} lines.${b}`
), J.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Ze * 2 ? N : _}(${e.scriptLength} lines)${E}`
  );
})), J.length), ee = [], vn = (e, t) => {
  !e || !e.setup || ee.push(t);
}, wn = () => (ee.length > 0 && (console.log(
  `
${w}rrd${b} ${_}Plain <script> blocks${E} in ${ee.length} files.`
), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${b}`), ee.forEach((e) => {
  console.log(`- ${e}`);
})), ee.length), te = [], xn = (e, t) => {
  if (!e)
    return;
  const n = /\belse\b/gi, s = e.content.match(n);
  s?.length && te.push({ fileName: t, elseCount: s.length });
}, On = () => (te.length > 0 && (console.log(
  `
${w}rrd${b} ${_}else conditions${E} are used in ${te.length} files.`
), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${b}`), te.forEach((e) => {
  console.log(`- ${e.fileName} ${_}(${e.elseCount})${E}`);
})), te.length), Sn = 5, Nn = 10, ne = [], jn = (e, t) => {
  if (!e)
    return;
  const n = /\bif\b/gi, s = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, h = /\bcase\b/gi, g = e.content.match(n), A = e.content.match(s), j = e.content.match(c), x = e.content.match(a), z = e.content.match(h), Z = (g?.length || 0) + (A?.length || 0) + (j?.length || 0) + (x?.length || 0) + (z?.length || 0);
  Z > Sn && ne.push({ fileName: t, cyclomaticComplexity: Z });
}, Fn = () => (ne.length > 0 && (console.log(
  `
${w}rrd${b} ${Ge}cyclomaticComplexity${E} is above moderate in ${ne.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${b}`), ne.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Nn ? N : _}(${e.cyclomaticComplexity})${E}`
  );
})), ne.length), oe = [], Rn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Ye.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || oe.push({ filePath: e });
}, Ln = () => (oe.length > 0 && (console.log(
  `
${w}vue-essential${b} ${N}single name component${E} is used in ${oe.length} files.`
), console.log(
  `👉 ${v}Rename the component to use multi-word name.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), se = [], Tn = (e, t) => {
  e.forEach((n) => {
    n.scoped || se.push({ filePath: t });
  });
}, Wn = () => (se.length > 0 && (console.log(
  `
${w}vue-essential${b} ${N}Global style ${E} is used in ${se.length} files.`
), console.log(
  `👉 ${v}Use <style scoped>.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), ie = [], Pn = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && ie.push({ filePath: t });
}, zn = () => (ie.length > 0 && (console.log(
  `
${w}vue-essential${b} ${N}simple prop${E} is used in ${ie.length} files.`
), console.log(
  `👉 ${v}Add at least type definition.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), ie.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ie.length), re = [], In = (e, t) => {
  if (!e)
    return;
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, s = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(s);
  (c?.length || a?.length) && re.push({ filePath: t });
}, Bn = () => (re.length > 0 && (console.log(
  `
${w}vue-essential${b} ${N}v-if used with v-for${E} in ${re.length} files.`
), console.log(
  `👉 ${v}Move out the v-if to a computed property.${b} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ce = [], Mn = (e, t) => {
  if (!e)
    return;
  const n = /<[^>]+ v-for[^>]+>/gi, s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || ce.push({ filePath: t }));
}, Vn = () => (ce.length > 0 && (console.log(
  `
${w}vue-essential${b} ${N}v-for has no key${E} in ${ce.length} files.`
), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), le = [], Un = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = Ye.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !s?.length && !a?.length && le.push({ fileName: e });
}, Dn = () => (le.length > 0 && (console.log(
  `
${w}vue-strong${b} ${N}component name is not PascalCase and not kebab-case${E} in ${le.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), le.forEach((e) => {
  console.log(`- ${N}${e.fileName}${E}`);
})), le.length), ae = [], Gn = /^[a-z]+([A-Z][a-z]*)+$/, Zn = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Gn.test(a)).length && ae.push({ filePath: t });
}, qn = () => (ae.length > 0 && (console.log(
  `
${w}vue-strong${b} ${N}prop names are not camelCased${E} in ${ae.length} files.`
), console.log(
  `👉 ${v}Rename the props to camelCase.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ae.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ae.length), G = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return s + c - 1;
};
function Ce(e, t) {
  return new Set(e.map((s) => s[t])).size;
}
const ue = [], Kn = 40, Qn = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > Kn) {
      const a = G(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      ue.push({
        filename: t,
        message: `${t}#${a} ${_}${h}${E}`
      });
    }
  });
}, Yn = () => {
  if (ue.length > 0) {
    const e = Ce(ue, "filename");
    console.log(
      `
${w}vue-strong${b} ${N}Lengthy template expression${E} found in ${e} files.`
    ), console.log(
      `👉 ${v}Refactor the expression into a computed property.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), ue.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ue.length;
}, Xn = /^(\(.*\)|\\?.)$/;
function D(e) {
  const t = e.toString();
  return Xn.test(t) ? t : `(?:${t})`;
}
const Hn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, kn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Hn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => $(`${e}${M(...n)}`), {
      referenceTo: (n) => $(`${e}\\k<${n}>`)
    }),
    or: (...n) => $(`(?:${e}|${M(...n)})`),
    after: (...n) => $(`(?<=${M(...n)})${e}`),
    before: (...n) => $(`${e}(?=${M(...n)})`),
    notAfter: (...n) => $(`(?<!${M(...n)})${e}`),
    notBefore: (...n) => $(`${e}(?!${M(...n)})`),
    times: Object.assign((n) => $(`${D(e)}{${n}}`), {
      any: () => $(`${D(e)}*`),
      atLeast: (n) => $(`${D(e)}{${n},}`),
      atMost: (n) => $(`${D(e)}{0,${n}}`),
      between: (n, s) => $(`${D(e)}{${n},${s}}`)
    }),
    optionally: () => $(`${D(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => $(`${e}`.replace(kn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Jn = /[.*+?^${}()|[\]\\/]/g;
function lt(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function qe(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const eo = $(".");
$("\\b\\w+\\b");
const Re = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const to = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), no = $("\\t"), oo = $("\\n");
$("\\r");
$("\\W+"), $("\\W"), $("\\B"), $("\\D"), $("\\S"), Object.assign($("[^a-zA-Z]"), {
  lowercase: $("[^a-z]"),
  uppercase: $("[^A-Z]")
}), $("[^\\t]"), $("[^\\n]"), $("[^\\r]");
function V(...e) {
  return $(`${D(M(...e))}?`);
}
function M(...e) {
  return $(
    e.map((t) => typeof t == "string" ? t.replace(Jn, "\\$&") : t).join("")
  );
}
function U(...e) {
  return $(`${D(M(...e))}+`);
}
const Le = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, fe = [], so = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = Le(
    "<",
    U(Re),
    V(U(lt(` 	
\r`))),
    U(qe("/>")),
    V(U(lt(` 	
\r`))),
    V("/"),
    ">",
    ["g"]
  ), c = n.content.match(s);
  if (c === null)
    return;
  const a = Le(":", U(Re), V(" "), "=", V(" "), qe(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const g = h.match(a);
    if (g?.length) {
      const A = G(e.source, h);
      fe.push({ message: `${t}#${A} ${_}${g}${E}` });
    }
  });
}, io = () => (fe.length > 0 && (console.log(
  `
${w}vue-strong${b} ${N}Attribute value is not quoted${E} in ${fe.length} files.`
), console.log(
  `👉 ${v}Use quotes for attribute values.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length), he = [], ro = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = Le(
    "<",
    U(to.uppercase, Re),
    V(oo, no),
    V(U(qe(">"))),
    "></",
    U(Re),
    ">",
    ["g"]
  ), c = n.content.match(s);
  c !== null && c.forEach((a) => {
    const h = G(e.source, a), g = a.split(`
`).at(-1)?.trim() || "";
    he.push({ message: `${t}#${h} ${_}${g}${E}` });
  });
}, co = () => (he.length > 0 && (console.log(
  `
${w}vue-strong${b} - ${N}Component is not self closing${E} in ${he.length} files.`
), console.log(
  `👉 ${v}Components with no content should be self-closing.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), he.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), he.length), Fe = [], Ke = [], lo = ["v-slot", "v-bind", "v-on"], ao = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  lo.forEach((s) => {
    if (n.content.includes(`${s}:`)) {
      const c = G(e.source, s);
      Fe.push({ message: `${t}:${c} ${_}${s}${E}` }), Ke.some((a) => a.filePath === t) || Ke.push({ filePath: t });
    }
  });
}, uo = () => (Fe.length > 0 && (console.log(
  `
${w}vue-strong${b} ${N}Directive shorthands not used${E} in ${Ke.length} files.`
), console.log(
  `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Fe.length), pe = [], fo = 5, ho = (e, t) => {
  if (!e)
    return;
  const n = Le("defineProps", V("<"), V("("), "{", U(eo), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const c = s[0].split(",").length;
    c > fo && pe.push({ fileName: t, propsCount: c });
  }
}, po = () => (pe.length > 0 && (console.log(
  `
${w}rrd${b} ${_}too many props${E} are used in ${pe.length} files.`
), console.log(`👉 ${v}Try to refactor your code to use less properties.${b}`), pe.forEach((e) => {
  console.log(`- ${e.fileName} ${_}(${e.propsCount})${E}`);
})), pe.length), ge = [], yt = 20, go = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1] || s[5];
    (s[2] || s[6]).split(`
`).length > yt && ge.push({ filename: t, funcName: c });
  }
}, mo = () => {
  if (ge.length > 0) {
    const e = Ce(ge, "filename");
    console.log(
      `
${w}rrd${b} ${_}function size${E} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${v}Functions must be shorter than ${yt} lines${b}`), ge.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${_}(${t.funcName})${E}`);
    });
  }
  return ge.length;
}, de = [], Et = 3, at = (e, t, n) => {
  const s = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  s.length > Et && de.push({ filename: n, funcName: e, paramsCount: s.length });
}, $o = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? at(s[1], s[2], t) : s[3] && at(s[3], s[4], t);
}, bo = () => (de.length > 0 && (console.log(
  `
${w}rrd${b} ${_}parameter count${E} exceeds recommended limit in ${de.length} files.`
), console.log(`👉 ${v}Max number of function parameters should be ${Et}${b}`), de.forEach((e) => {
  console.log(
    `- ${_}${e.funcName}${E} in file ${e.filename} 🚨 ${_}(${e.paramsCount})${E}`
  );
})), de.length), At = 4, me = [], yo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1];
    c.length < At && me.push({ filename: t, variable: c });
  }
}, Eo = () => {
  if (me.length > 0) {
    const e = Ce(me, "filename");
    console.log(`
${w}rrd${b} ${_}variable names${E} are too short in ${e} files.`), console.log(`👉 ${v}Variable names must have a minimum length of ${At}${b}`), me.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${_}(${t.variable})${E}`);
    });
  }
  return me.length;
}, Qe = [], ye = [], Ao = 5, Co = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((c) => {
    if (c.split(`
`).length > Ao) {
      const a = c.split(`
`)[0], h = G(e.content, a);
      Qe.push({ message: `${t}:${h} ${_}computed${E}` }), ye.push({ filePath: t }), ye.some((g) => g.filePath === t) || ye.push({ filePath: t });
    }
  });
}, _o = () => (ye.length > 0 && (console.log(
  `
${w}vue-strong${b} ${N}complicated computed property ${E} in ${ye.length} files.`
), console.log(
  `👉 ${v}Refactor the computed properties to smaller ones.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), Qe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Qe.length), $e = [], vo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    const a = G(e.content.trim(), c), h = c.split(`
`).at(0)?.trim() || "";
    $e.push({ filename: t, message: `${t}#${a} ${_}(${h})${E}` });
  });
}, wo = () => {
  if ($e.length > 0) {
    const e = Ce($e, "filename");
    console.log(`
${w}vue-strong${b} ${N}component files${E} detected in ${e} files.`), console.log(
      `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), $e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return $e.length;
}, Q = [], xo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, c = /\$parent|getCurrentInstance/g, a = e.content.match(n), h = e.content.match(s);
  if (h) {
    const A = h[1].split(".")[0], j = a ? a[1] : "";
    if (j.includes(A)) {
      const x = G(e.content.trim(), j);
      Q.push({
        filename: t,
        message: `${t}#${x} ${_}(${A})${E}`
      });
    }
  }
  const g = e.content.match(c);
  if (g) {
    const A = G(e.content.trim(), g[0]);
    Q.push({
      filename: t,
      message: `${t}#${A} ${_}(${g[0]})${E}`
    });
  }
}, Oo = () => {
  if (Q.length > 0) {
    const e = Ce(
      Q,
      "filename"
    );
    console.log(
      `
${w}vue-caution${b} ${_}implicit parent-child communication${E} detected in ${e} files.`
    ), console.log(
      `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${b} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), Q.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Q.length;
}, So = () => {
  let e = 0;
  return e += Ln(), e += zn(), e += Vn(), e += Bn(), e += Wn(), e += Dn(), e += co(), e += qn(), e += Yn(), e += io(), e += uo(), e += _o(), e += wo(), e += Oo(), e += _n(), e += wn(), e += Fn(), e += On(), e += po(), e += mo(), e += bo(), e += Eo(), e;
}, No = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  n.includes("vue-essential") || (Rn(t), Pn(s, t), Tn(e.styles, t), Mn(e.template, t), In(e.template, t)), n.includes("vue-strong") || (Un(t), Zn(s, t), vo(s, t), Co(s, t), ro(e, t), Qn(e.template, t), so(e, t), ao(e, t)), n.includes("vue-caution") || xo(s, t), n.includes("rrd") || (vn(e.script, t), Cn(s, t), jn(s, t), xn(s, t), ho(s, t), go(s, t), $o(s, t), yo(s, t));
};
let Ct = 0;
const jo = [
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
], _t = (e, t) => {
  const n = De.readdirSync(e);
  Ct += n.length;
  for (const s of n) {
    const c = Ye.join(e, s);
    De.statSync(c).isDirectory() ? jo.some((a) => c.includes(a)) && _t(c, t) : s.endsWith(".vue") && t(c);
  }
}, Fo = (e, t = []) => {
  console.log(`

${Ge}Analyzing Vue files in ${e}${E}`), _t(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const s = De.readFileSync(n, "utf-8"), { descriptor: c } = qt(s);
    No(c, n, t);
  }), console.log(`Found ${Ge}${Ct}${E} Vue files`), So() || console.log(`${An}No code smells detected!${E}`);
}, Ro = {
  "vue-caution": ["implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-reccomended": [],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression"
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
}, ut = Object.keys(Ro);
Wt(Yt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rules to ignore",
    type: "string",
    coerce: (t) => {
      const n = t.split(","), s = n.filter((c) => !ut.includes(c));
      return s.length > 0 && (console.error(
        `
${N}Invalid ignore values: ${s.join(
          ", "
        )}${E}. 
${v}Allowed values are: ${[...ut].join(", ")}${b}

`
      ), process.exit(1)), n;
    }
  }),
  (e) => {
    Fo(e.path, e.ignore);
  }
).help().argv;
