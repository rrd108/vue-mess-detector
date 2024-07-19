import Ft from "yargs";
import { format as ct, inspect as Rt } from "util";
import qe, { normalize as Lt, resolve as Q, dirname as Ie, basename as Tt, extname as Wt, relative as zt } from "path";
import Me, { readFileSync as Qe, statSync as lt, readdirSync as Pt, writeFile as Bt } from "fs";
import { notStrictEqual as It, strictEqual as Mt } from "assert";
import { fileURLToPath as Vt } from "url";
import { parse as Ut } from "@vue/compiler-sfc";
class de extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
function at() {
  return Dt() ? 0 : 1;
}
function Dt() {
  return Gt() && !process.defaultApp;
}
function Gt() {
  return !!process.versions.electron;
}
function Zt(e) {
  return e.slice(at() + 1);
}
function qt() {
  return process.argv[at()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function X(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", r = !1;
    const c = e.match(/^-+/);
    for (let a = c ? c[0].length : 0; a < e.length; a++) {
      let h = e.charAt(a);
      r && (r = !1, h = h.toUpperCase()), a !== 0 && (h === "-" || h === "_") ? r = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function ut(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let r = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? r += `${t}${n.charAt(c)}` : r += h;
  }
  return r;
}
function ft(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Qt(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, r = null, c = null;
  const a = [];
  for (let h = 0; h < e.length; h++) {
    if (n = r, r = e.charAt(h), r === " " && !c) {
      n !== " " && t++;
      continue;
    }
    r === c ? c = null : (r === "'" || r === '"') && !c && (c = r), a[t] || (a[t] = ""), a[t] += r;
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
let I;
class Kt {
  constructor(t) {
    I = t;
  }
  parse(t, n) {
    const r = Object.assign({
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
    }, n), c = Qt(t), a = typeof t == "string", h = Yt(Object.assign(/* @__PURE__ */ Object.create(null), r.alias)), d = Object.assign({
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
    }, r.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), r.default), F = r.configObjects || [], O = r.envPrefix, P = d["populate--"], G = P ? "--" : "_", Ee = /* @__PURE__ */ Object.create(null), Ke = /* @__PURE__ */ Object.create(null), Z = r.__ || I.format, u = {
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
    }, z = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Fe = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(r.array || []).filter(Boolean).forEach(function(s) {
      const i = typeof s == "object" ? s.key : s, f = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      f && (u[f][i] = !0), u.arrays[i] = !0, u.keys.push(i);
    }), [].concat(r.boolean || []).filter(Boolean).forEach(function(s) {
      u.bools[s] = !0, u.keys.push(s);
    }), [].concat(r.string || []).filter(Boolean).forEach(function(s) {
      u.strings[s] = !0, u.keys.push(s);
    }), [].concat(r.number || []).filter(Boolean).forEach(function(s) {
      u.numbers[s] = !0, u.keys.push(s);
    }), [].concat(r.count || []).filter(Boolean).forEach(function(s) {
      u.counts[s] = !0, u.keys.push(s);
    }), [].concat(r.normalize || []).filter(Boolean).forEach(function(s) {
      u.normalize[s] = !0, u.keys.push(s);
    }), typeof r.narg == "object" && Object.entries(r.narg).forEach(([s, i]) => {
      typeof i == "number" && (u.nargs[s] = i, u.keys.push(s));
    }), typeof r.coerce == "object" && Object.entries(r.coerce).forEach(([s, i]) => {
      typeof i == "function" && (u.coercions[s] = i, u.keys.push(s));
    }), typeof r.config < "u" && (Array.isArray(r.config) || typeof r.config == "string" ? [].concat(r.config).filter(Boolean).forEach(function(s) {
      u.configs[s] = !0;
    }) : typeof r.config == "object" && Object.entries(r.config).forEach(([s, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (u.configs[s] = i);
    })), wt(r.key, h, r.default, u.arrays), Object.keys(_).forEach(function(s) {
      (u.aliases[s] || []).forEach(function(i) {
        _[i] = _[s];
      });
    });
    let L = null;
    jt();
    let Ae = [];
    const x = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ye = {};
    for (let s = 0; s < c.length; s++) {
      const i = c[s], f = i.replace(/^-{3,}/, "---");
      let l, o, g, p, m, S;
      if (i !== "--" && /^-/.test(i) && Oe(i))
        Re(i);
      else if (f.match(/^---+(=|$)/)) {
        Re(i);
        continue;
      } else if (i.match(/^--.+=/) || !d["short-option-groups"] && i.match(/^-.+=/))
        p = i.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (b(p[1], u.arrays) ? s = Ce(s, p[1], c, p[2]) : b(p[1], u.nargs) !== !1 ? s = _e(s, p[1], c, p[2]) : A(p[1], p[2], !0));
      else if (i.match(Fe) && d["boolean-negation"])
        p = i.match(Fe), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], A(o, b(o, u.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !d["short-option-groups"] && i.match(/^-[^-]+/))
        p = i.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], b(o, u.arrays) ? s = Ce(s, o, c) : b(o, u.nargs) !== !1 ? s = _e(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(z)) && !b(o, u.bools) && !b(o, u.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      else if (i.match(/^-.\..+=/))
        p = i.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && A(p[1], p[2]);
      else if (i.match(/^-.\..+/) && !i.match(z))
        m = c[s + 1], p = i.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], m !== void 0 && !m.match(/^-/) && !b(o, u.bools) && !b(o, u.counts) ? (A(o, m), s++) : A(o, q(o)));
      else if (i.match(/^-[^-]+/) && !i.match(z)) {
        g = i.slice(1, -1).split(""), l = !1;
        for (let j = 0; j < g.length; j++) {
          if (m = i.slice(j + 2), g[j + 1] && g[j + 1] === "=") {
            S = i.slice(j + 3), o = g[j], b(o, u.arrays) ? s = Ce(s, o, c, S) : b(o, u.nargs) !== !1 ? s = _e(s, o, c, S) : A(o, S), l = !0;
            break;
          }
          if (m === "-") {
            A(g[j], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && b(m, u.bools) === !1) {
            A(g[j], m), l = !0;
            break;
          }
          if (g[j + 1] && g[j + 1].match(/\W/)) {
            A(g[j], m), l = !0;
            break;
          } else
            A(g[j], q(g[j]));
        }
        o = i.slice(-1)[0], !l && o !== "-" && (b(o, u.arrays) ? s = Ce(s, o, c) : b(o, u.nargs) !== !1 ? s = _e(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(z)) && !b(o, u.bools) && !b(o, u.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      } else if (i.match(/^-[0-9]$/) && i.match(z) && b(i.slice(1), u.bools))
        o = i.slice(1), A(o, q(o));
      else if (i === "--") {
        Ae = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        Ae = c.slice(s);
        break;
      } else
        Re(i);
    }
    He(x, !0), He(x, !1), Et(x), At(), Je(x, u.aliases, _, !0), _t(x), d["set-placeholder-key"] && Ct(x), Object.keys(u.counts).forEach(function(s) {
      K(x, s.split(".")) || A(s, 0);
    }), P && Ae.length && (x[G] = []), Ae.forEach(function(s) {
      x[G].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(x).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete x[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete x[s.split(".").map((i) => X(i)).join(".")], delete x[s];
    });
    function Re(s) {
      const i = we("_", s);
      (typeof i == "string" || typeof i == "number") && x._.push(i);
    }
    function _e(s, i, f, l) {
      let o, g = b(i, u.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return B(l) || (L = Error(Z("Argument unexpected for: %s", i))), A(i, q(i)), s;
      let p = B(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        f.length - (s + 1) + p < g && (L = Error(Z("Not enough arguments following: %s", i))), p = g;
      else {
        for (o = s + 1; o < f.length && (!f[o].match(/^-[^0-9]/) || f[o].match(z) || Oe(f[o])); o++)
          p++;
        p < g && (L = Error(Z("Not enough arguments following: %s", i)));
      }
      let m = Math.min(p, g);
      for (!B(l) && m > 0 && (A(i, l), m--), o = s + 1; o < m + s + 1; o++)
        A(i, f[o]);
      return s + m;
    }
    function Ce(s, i, f, l) {
      let o = [], g = l || f[s + 1];
      const p = b(i, u.nargs);
      if (b(i, u.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (B(g) || B(l) && /^-/.test(g) && !z.test(g) && !Oe(g)) {
        if (_[i] !== void 0) {
          const m = _[i];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        B(l) || o.push(Le(i, l, !0));
        for (let m = s + 1; m < f.length && !(!d["greedy-arrays"] && o.length > 0 || p && typeof p == "number" && o.length >= p || (g = f[m], /^-/.test(g) && !z.test(g) && !Oe(g))); m++)
          s = m, o.push(Le(i, g, a));
      }
      return typeof p == "number" && (p && o.length < p || isNaN(p) && o.length === 0) && (L = Error(Z("Not enough arguments following: %s", i))), A(i, o), s;
    }
    function A(s, i, f = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return X(p);
        }).join(".");
        Xe(s, g);
      }
      const l = Le(s, i, f), o = s.split(".");
      Y(x, o, l), u.aliases[s] && u.aliases[s].forEach(function(g) {
        const p = g.split(".");
        Y(x, p, l);
      }), o.length > 1 && d["dot-notation"] && (u.aliases[o[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(o);
        m.shift(), p = p.concat(m), (u.aliases[s] || []).includes(p.join(".")) || Y(x, p, l);
      }), b(s, u.normalize) && !b(s, u.arrays) && [s].concat(u.aliases[s] || []).forEach(function(p) {
        Object.defineProperty(Ye, p, {
          enumerable: !0,
          get() {
            return i;
          },
          set(m) {
            i = typeof m == "string" ? I.normalize(m) : m;
          }
        });
      });
    }
    function Xe(s, i) {
      u.aliases[s] && u.aliases[s].length || (u.aliases[s] = [i], Ee[i] = !0), u.aliases[i] && u.aliases[i].length || Xe(i, s);
    }
    function Le(s, i, f) {
      f && (i = Xt(i)), (b(s, u.bools) || b(s, u.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(o) {
        return we(s, o);
      }) : we(s, i);
      return b(s, u.counts) && (B(l) || typeof l == "boolean") && (l = We()), b(s, u.normalize) && b(s, u.arrays) && (Array.isArray(i) ? l = i.map((o) => I.normalize(o)) : l = I.normalize(i)), l;
    }
    function we(s, i) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, u.strings) && !b(s, u.bools) && !Array.isArray(i) && (ft(i) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !B(i) && b(s, u.numbers)) && (i = Number(i)), i;
    }
    function Et(s) {
      const i = /* @__PURE__ */ Object.create(null);
      Je(i, u.aliases, _), Object.keys(u.configs).forEach(function(f) {
        const l = s[f] || i[f];
        if (l)
          try {
            let o = null;
            const g = I.resolve(I.cwd(), l), p = u.configs[f];
            if (typeof p == "function") {
              try {
                o = p(g);
              } catch (m) {
                o = m;
              }
              if (o instanceof Error) {
                L = o;
                return;
              }
            } else
              o = I.require(g);
            Te(o);
          } catch (o) {
            o.name === "PermissionDenied" ? L = o : s[f] && (L = Error(Z("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Te(s, i) {
      Object.keys(s).forEach(function(f) {
        const l = s[f], o = i ? i + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Te(l, o) : (!K(x, o.split(".")) || b(o, u.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function At() {
      typeof F < "u" && F.forEach(function(s) {
        Te(s);
      });
    }
    function He(s, i) {
      if (typeof O > "u")
        return;
      const f = typeof O == "string" ? O : "", l = I.env();
      Object.keys(l).forEach(function(o) {
        if (f === "" || o.lastIndexOf(f, 0) === 0) {
          const g = o.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), X(p);
          });
          (i && u.configs[g.join(".")] || !i) && !K(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function _t(s) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!f.has(l) && (i = b(l, u.coercions), typeof i == "function"))
          try {
            const o = we(l, i(s[l]));
            [].concat(u.aliases[l] || [], l).forEach((g) => {
              f.add(g), s[g] = o;
            });
          } catch (o) {
            L = o;
          }
      });
    }
    function Ct(s) {
      return u.keys.forEach((i) => {
        ~i.indexOf(".") || typeof s[i] > "u" && (s[i] = void 0);
      }), s;
    }
    function Je(s, i, f, l = !1) {
      Object.keys(f).forEach(function(o) {
        K(s, o.split(".")) || (Y(s, o.split("."), f[o]), l && (Ke[o] = !0), (i[o] || []).forEach(function(g) {
          K(s, g.split(".")) || Y(s, g.split("."), f[o]);
        }));
      });
    }
    function K(s, i) {
      let f = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(o) {
        f = f[o] || {};
      });
      const l = i[i.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function Y(s, i, f) {
      let l = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(S) {
        S = et(S), typeof l == "object" && l[S] === void 0 && (l[S] = {}), typeof l[S] != "object" || Array.isArray(l[S]) ? (Array.isArray(l[S]) ? l[S].push({}) : l[S] = [l[S], {}], l = l[S][l[S].length - 1]) : l = l[S];
      });
      const o = et(i[i.length - 1]), g = b(i.join("."), u.arrays), p = Array.isArray(f);
      let m = d["duplicate-arguments-array"];
      !m && b(o, u.nargs) && (m = !0, (!B(l[o]) && u.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === u.nargs[o]) && (l[o] = void 0)), f === We() ? l[o] = We(l[o]) : Array.isArray(l[o]) ? m && g && p ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(f) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([f]) : !m && !!g == !!p ? l[o] = f : l[o] = l[o].concat([f]) : l[o] === void 0 && g ? l[o] = p ? f : [f] : m && !(l[o] === void 0 || b(o, u.counts) || b(o, u.bools)) ? l[o] = [l[o], f] : l[o] = f;
    }
    function wt(...s) {
      s.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== f && u.aliases[f].indexOf(o) === -1 && (u.aliases[f].push(o), Ee[o] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = ut(l, "-");
              o !== f && u.aliases[f].indexOf(o) === -1 && (u.aliases[f].push(o), Ee[o] = !0);
            }
          }), u.aliases[f].forEach(function(l) {
            u.aliases[l] = [f].concat(u.aliases[f].filter(function(o) {
              return l !== o;
            }));
          }));
        });
      });
    }
    function b(s, i) {
      const f = [].concat(u.aliases[s] || [], s), l = Object.keys(i), o = f.find((g) => l.includes(g));
      return o ? i[o] : !1;
    }
    function ke(s) {
      const i = Object.keys(u);
      return [].concat(i.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function Ot(s, ...i) {
      return [].concat(...i).some(function(l) {
        const o = s.match(l);
        return o && ke(o[1]);
      });
    }
    function xt(s) {
      if (s.match(z) || !s.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (f = s.slice(o + 2), !ke(l[o])) {
          i = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return i;
    }
    function Oe(s) {
      return d["unknown-options-as-args"] && Nt(s);
    }
    function Nt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(z) || xt(s) ? !1 : !Ot(s, /^-+([^=]+?)=[\s\S]*$/, Fe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function q(s) {
      return !b(s, u.bools) && !b(s, u.counts) && `${s}` in _ ? _[s] : St(vt(s));
    }
    function St(s) {
      return {
        [W.BOOLEAN]: !0,
        [W.STRING]: "",
        [W.NUMBER]: void 0,
        [W.ARRAY]: []
      }[s];
    }
    function vt(s) {
      let i = W.BOOLEAN;
      return b(s, u.strings) ? i = W.STRING : b(s, u.numbers) ? i = W.NUMBER : b(s, u.bools) ? i = W.BOOLEAN : b(s, u.arrays) && (i = W.ARRAY), i;
    }
    function B(s) {
      return s === void 0;
    }
    function jt() {
      Object.keys(u.counts).find((s) => b(s, u.arrays) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, u.nargs) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(Ye, x),
      configuration: d,
      defaulted: Object.assign({}, Ke),
      error: L,
      newAliases: Object.assign({}, Ee)
    };
  }
}
function Yt(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let r = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); r; ) {
    r = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(d) {
          return t[a].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), r = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(h, d, _) {
      return _.indexOf(h) === d;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function We(e) {
  return e !== void 0 ? e + 1 : 1;
}
function et(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Xt(e) {
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
var ze, Pe, Be;
const tt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, nt = (Pe = (ze = process == null ? void 0 : process.versions) === null || ze === void 0 ? void 0 : ze.node) !== null && Pe !== void 0 ? Pe : (Be = process == null ? void 0 : process.version) === null || Be === void 0 ? void 0 : Be.slice(1);
if (nt && Number(nt.match(/^([^.]+)/)[1]) < tt)
  throw Error(`yargs parser supports a minimum Node.js version of ${tt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Ht = process ? process.env : {}, ht = new Kt({
  cwd: process.cwd,
  env: () => Ht,
  format: ct,
  normalize: Lt,
  resolve: Q,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Qe(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), be = function(t, n) {
  return ht.parse(t.slice(), n).argv;
};
be.detailed = function(e, t) {
  return ht.parse(e.slice(), t);
};
be.camelCase = X;
be.decamelize = ut;
be.looksLikeNumber = ft;
const Jt = {
  right: on,
  center: rn
}, kt = 0, xe = 1, en = 2, Ne = 3;
class tn {
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
    const n = t.map((r) => typeof r == "string" ? this.colFromString(r) : r);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((c) => c.split("	"));
    let r = 0;
    return n.forEach((c) => {
      c.length > 1 && R.stringWidth(c[0]) > r && (r = Math.min(Math.floor(this.width * 0.5), R.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((a, h) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: h === 0 && c.length > 1 ? r : void 0
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
    return this.rasterize(t).forEach((r, c) => {
      let a = "";
      r.forEach((h, d) => {
        const { width: _ } = t[d], F = this.negatePadding(t[d]);
        let O = h;
        if (F > R.stringWidth(h) && (O += " ".repeat(F - R.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const G = Jt[t[d].align];
          O = G(O, F), R.stringWidth(O) < F && (O += " ".repeat((_ || 0) - R.stringWidth(O) - 1));
        }
        const P = t[d].padding || [0, 0, 0, 0];
        P[Ne] && (a += " ".repeat(P[Ne])), a += st(t[d], O, "| "), a += O, a += st(t[d], O, " |"), P[xe] && (a += " ".repeat(P[xe])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const r = t.match(/^ */), c = r ? r[0].length : 0, a = n.text, h = R.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], r = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = r[h], this.wrap ? c = R.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[kt] || 0).fill("")), c.push(...new Array(a.padding[en] || 0).fill(""))), c.forEach((d, _) => {
        n[_] || n.push([]);
        const F = n[_];
        for (let O = 0; O < h; O++)
          F[O] === void 0 && F.push("");
        F.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ne] || 0) + (t.padding[xe] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || R.stringWidth(h.text));
    let n = t.length, r = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, r -= h.width, h.width;
    }), a = n ? Math.floor(r / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, nn(t[d])) : h);
  }
}
function st(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function nn(e) {
  const t = e.padding || [], n = 1 + (t[Ne] || 0) + (t[xe] || 0);
  return e.border ? n + 4 : n;
}
function sn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function on(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function rn(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let R;
function cn(e, t) {
  return R = t, new tn({
    width: e?.width || sn(),
    wrap: e?.wrap
  });
}
const pt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function gt(e) {
  return e.replace(pt, "");
}
function ln(e, t) {
  const [n, r] = e.match(pt) || ["", ""];
  e = gt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && r && (c = `${n}${c}${r}`), c;
}
function an(e) {
  return cn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: gt,
    wrap: ln
  });
}
function un(e, t) {
  let n = Q(".", e), r;
  for (lt(n).isDirectory() || (n = Ie(n)); ; ) {
    if (r = t(n, Pt(n)), r)
      return Q(n, r);
    if (n = Ie(r = n), r === n)
      break;
  }
}
const fn = {
  fs: {
    readFileSync: Qe,
    writeFile: Bt
  },
  format: ct,
  resolve: Q,
  exists: (e) => {
    try {
      return lt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let T;
class hn {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let r = function() {
    };
    return typeof t[t.length - 1] == "function" && (r = t.pop()), r = r || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: r
    })) : r(), T.format.apply(T.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), r = t.shift(), c = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = c === 1 ? n : r;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: r
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const d = [h];
    return ~h.indexOf("%d") && d.push(c), T.format.apply(T.format, d.concat(t));
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
    let r = "";
    return t.forEach(function(c, a) {
      const h = n[a + 1];
      r += c, typeof h < "u" && (r += "%s");
    }), this.__.apply(this, [r].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], r = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(r, c), d = JSON.stringify(this.cache[c], null, 2);
    T.fs.writeFile(h, d, "utf-8", function(_) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(_);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      T.fs.readFileSync && (t = JSON.parse(T.fs.readFileSync(n, "utf-8")));
    } catch (r) {
      if (r instanceof SyntaxError && (r.message = "syntax error in " + n), r.code === "ENOENT")
        t = {};
      else
        throw r;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let r = T.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(r) && ~n.lastIndexOf("_")) {
      const c = T.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (r = c);
    }
    return r;
  }
  _fileExistsSync(t) {
    return T.exists(t);
  }
}
function pn(e, t) {
  T = t;
  const n = new hn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const gn = (e) => pn(e, fn), dn = "require is not supported by ESM", ot = "loading a directory of commands is not supported yet for ESM";
let $e;
try {
  $e = Vt(import.meta.url);
} catch {
  $e = process.cwd();
}
const mn = $e.substring(0, $e.lastIndexOf("node_modules"));
It, Mt, Rt, mn || process.cwd(), Tt, Ie, Wt, zt, Q, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Qe, gn({
  directory: Q($e, "../../../locales"),
  updateFiles: !1
});
const Ve = "\x1B[44m", N = "\x1B[43m", v = "\x1B[41m", $n = "\x1B[42m", E = "\x1B[0m", C = "\x1B[33m", w = "\x1B[36m", y = "\x1B[0m", Ue = 100, H = [], bn = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Ue && H.push({ fileName: t, scriptLength: n.length });
}, yn = () => (H.length > 0 && (console.log(
  `
${w}rrd${y} ${v}Long <script> blocks${E} in ${H.length} files.`
), console.log(
  `👉 ${C}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Ue} lines.${y}`
), H.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Ue * 2 ? v : N}(${e.scriptLength} lines)${E}`
  );
})), H.length), J = [], En = (e) => {
  J.push(e);
}, An = () => (J.length > 0 && (console.log(
  `
${w}rrd${y} ${N}Plain <script> blocks${E} in ${J.length} files.`
), console.log(`👉 ${C} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], _n = (e, t) => {
  const n = /\belse\b/gi, r = e.content.match(n);
  r?.length && k.push({ fileName: t, elseCount: r.length });
}, Cn = () => (k.length > 0 && (console.log(
  `
${w}rrd${y} ${N}else conditions${E} are used in ${k.length} files.`
), console.log(`👉 ${C}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${N}(${e.elseCount})${E}`);
})), k.length), wn = 5, On = 10, ee = [], xn = (e, t) => {
  const n = /\bif\b/gi, r = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, h = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(r), F = e.content.match(c), O = e.content.match(a), P = e.content.match(h), G = (d?.length || 0) + (_?.length || 0) + (F?.length || 0) + (O?.length || 0) + (P?.length || 0);
  G > wn && ee.push({ fileName: t, cyclomaticComplexity: G });
}, Nn = () => (ee.length > 0 && (console.log(
  `
${w}rrd${y} ${Ve}cyclomaticComplexity${E} is above moderate in ${ee.length} files.`
), console.log(`👉 ${C}Try to reduce complexity.${y}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > On ? v : N}(${e.cyclomaticComplexity})${E}`
  );
})), ee.length), te = [], Sn = (e) => {
  if (e.includes("pages"))
    return;
  const t = qe.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || te.push({ filePath: e });
}, vn = () => (te.length > 0 && (console.log(
  `
${w}vue-essential${y} ${v}single name component${E} is used in ${te.length} files.`
), console.log(
  `👉 ${C}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], jn = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, Fn = () => (ne.length > 0 && (console.log(
  `
${w}vue-essential${y} ${v}Global style ${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${C}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], Rn = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && se.push({ filePath: t });
}, Ln = () => (se.length > 0 && (console.log(
  `
${w}vue-essential${y} ${v}simple prop${E} is used in ${se.length} files.`
), console.log(
  `👉 ${C}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], Tn = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, r = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(r);
  (c?.length || a?.length) && oe.push({ filePath: t });
}, Wn = () => (oe.length > 0 && (console.log(
  `
${w}vue-essential${y} ${v}v-if used with v-for${E} in ${oe.length} files.`
), console.log(
  `👉 ${C}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], zn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, r = e.content.match(n);
  r?.length && (r.some((a) => a.includes(":key")) || re.push({ filePath: t }));
}, Pn = () => (re.length > 0 && (console.log(
  `
${w}vue-essential${y} ${v}v-for has no key${E} in ${re.length} files.`
), console.log(
  `👉 ${C}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], Bn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = qe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, r = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !r?.length && !a?.length && ie.push({ fileName: e });
}, In = () => (ie.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}component name is not PascalCase and not kebab-case${E} in ${ie.length} files.`
), console.log(
  `👉 ${C}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ie.forEach((e) => {
  console.log(`- ${v}${e.fileName}${E}`);
})), ie.length), ce = [], Mn = /^[a-z]+([A-Z][a-z]*)+$/, Vn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; )
    r[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Mn.test(a)).length && ce.push({ filePath: t });
}, Un = () => (ce.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}prop names are not camelCased${E} in ${ce.length} files.`
), console.log(
  `👉 ${C}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), ye = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), r = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return r + c - 1;
}, le = [], Dn = 40, Gn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > Dn) {
      const a = ye(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      le.push({ message: `${t}#${a} ${N}${h}${E}` });
    }
  });
}, Zn = () => (le.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}Lengthy template expression${E} found in ${le.length} files.`
), console.log(
  `👉 ${C}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), le.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), le.length), qn = /^(\(.*\)|\\?.)$/;
function D(e) {
  const t = e.toString();
  return qn.test(t) ? t : `(?:${t})`;
}
const Qn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Kn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Qn, "$1$2")})`);
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
      between: (n, r) => $(`${D(e)}{${n},${r}}`)
    }),
    optionally: () => $(`${D(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => $(`${e}`.replace(Kn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Yn = /[.*+?^${}()|[\]\\/]/g;
function rt(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function De(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Xn = $(".");
$("\\b\\w+\\b");
const ve = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Hn = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), Jn = $("\\t"), kn = $("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(Yn, "\\$&") : t).join("")
  );
}
function U(...e) {
  return $(`${D(M(...e))}+`);
}
const je = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, ae = [], es = (e, t) => {
  const n = e.template, r = je(
    "<",
    U(ve),
    V(U(rt(` 	
\r`))),
    U(De("/>")),
    V(U(rt(` 	
\r`))),
    V("/"),
    ">",
    ["g"]
  ), c = n.content.match(r);
  if (c === null)
    return;
  const a = je(":", U(ve), V(" "), "=", V(" "), De(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const _ = ye(e.source, h);
      ae.push({ message: `${t}#${_} ${N}${d}${E}` });
    }
  });
}, ts = () => (ae.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${C}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), ue = [], ns = (e, t) => {
  const n = e.template, r = je(
    "<",
    U(Hn.uppercase, ve),
    V(kn, Jn),
    V(U(De(">"))),
    "></",
    U(ve),
    ">",
    ["g"]
  ), c = n.content.match(r);
  c !== null && c.forEach((a) => {
    const h = ye(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    ue.push({ message: `${t}#${h} ${N}${d}${E}` });
  });
}, ss = () => (ue.length > 0 && (console.log(
  `
${w}vue-strong${y} - ${v}Component is not self closing${E} in ${ue.length} files.`
), console.log(
  `👉 ${C}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), ue.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ue.length), Se = [], Ge = [], os = ["v-slot", "v-bind", "v-on"], rs = (e, t) => {
  const n = e.template;
  os.forEach((r) => {
    if (n.content.includes(`${r}:`)) {
      const c = ye(e.source, r);
      Se.push({ message: `${t}:${c} ${N}${r}${E}` }), Ge.some((a) => a.filePath === t) || Ge.push({ filePath: t });
    }
  });
}, is = () => (Se.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}Directive shorthands not used${E} in ${Ge.length} files.`
), console.log(
  `👉 ${C}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Se.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Se.length), fe = [], cs = 5, ls = (e, t) => {
  const n = je("defineProps", V("<"), V("("), "{", U(Xn), "}", ["g", "s"]), r = e.content.match(n);
  if (r?.length) {
    const c = r[0].split(",").length;
    c > cs && fe.push({ fileName: t, propsCount: c });
  }
}, as = () => (fe.length > 0 && (console.log(
  `
${w}rrd${y} ${N}too many props${E} are used in ${fe.length} files.`
), console.log(`👉 ${C}Try to refactor your code to use less properties.${y}`), fe.forEach((e) => {
  console.log(`- ${e.fileName} ${N}(${e.propsCount})${E}`);
})), fe.length), he = [], dt = 20, us = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; ) {
    const c = r[1] || r[5];
    (r[2] || r[6]).split(`
`).length > dt && he.push({ filename: t, funcName: c });
  }
}, fs = () => (he.length > 0 && (console.log(
  `
${w}rrd${y} ${N}function size${E} exceeds recommended limit in ${he.length} files.`
), console.log(`👉 ${C}Functions must be shorter than ${dt} lines${y}`), he.forEach((e) => {
  console.log(`- ${e.filename} 🚨 ${N}(${e.funcName})${E}`);
})), he.length), pe = [], mt = 3, it = (e, t, n) => {
  const r = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  r.length > mt && pe.push({ filename: n, funcName: e, paramsCount: r.length });
}, hs = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; )
    r[1] ? it(r[1], r[2], t) : r[3] && it(r[3], r[4], t);
}, ps = () => (pe.length > 0 && (console.log(
  `
${w}rrd${y} ${N}parameter count${E} exceeds recommended limit in ${pe.length} files.`
), console.log(`👉 ${C}Max number of function parameters should be ${mt}${y}`), pe.forEach((e) => {
  console.log(`- ${N}${e.funcName}${E} in file ${e.filename} 🚨 ${N}(${e.paramsCount})${E}`);
})), pe.length), $t = 4, ge = [], gs = (e) => new Set(e.map((n) => n.filename)).size, ds = (e, t) => {
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; ) {
    const c = r[1];
    c.length < $t && ge.push({ filename: t, variable: c });
  }
}, ms = () => {
  if (ge.length > 0) {
    const e = gs(ge);
    console.log(
      `
${w}rrd${y} ${N}variable names${E} are too short in ${e} files.`
    ), console.log(
      `👉 ${C}Variable names must have a minimum length of ${$t}${y}`
    ), ge.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${N}(${t.variable})${E}`);
    });
  }
  return ge.length;
}, Ze = [], me = [], $s = 5, bs = (e, t) => {
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, r = e.content.match(n);
  r?.length && r.forEach((c) => {
    if (c.split(`
`).length > $s) {
      const a = c.split(`
`)[0], h = ye(e.content, a);
      Ze.push({ message: `${t}:${h} ${N}computed${E}` }), me.push({ filePath: t }), me.some((d) => d.filePath === t) || me.push({ filePath: t });
    }
  });
}, ys = () => (me.length > 0 && (console.log(
  `
${w}vue-strong${y} ${v}complicated computed property ${E} in ${me.length} files.`
), console.log(
  `👉 ${C}Refactor the computed properties to smaller ones.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), Ze.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Ze.length);
let bt = 0;
const Es = [
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
], yt = (e, t) => {
  const n = Me.readdirSync(e);
  bt += n.length;
  for (const r of n) {
    const c = qe.join(e, r);
    Me.statSync(c).isDirectory() ? Es.some((a) => c.includes(a)) && yt(c, t) : r.endsWith(".vue") && t(c);
  }
}, As = (e) => {
  console.log(`

${Ve}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  yt(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const r = Me.readFileSync(n, "utf-8"), { descriptor: c } = Ut(r);
    Sn(n), Bn(n), c.script && En(n);
    const a = c.scriptSetup || c.script;
    a && (Rn(a, n), Vn(a, n), bn(a, n), xn(a, n), _n(a, n), ls(a, n), us(a, n), hs(a, n), ds(a, n), bs(a, n)), c.styles.forEach((h) => {
      jn(h, n);
    }), c.template && (zn(c.template, n), Tn(c.template, n), ns(c, n), Gn(c.template, n), es(c, n), rs(c, n));
  }), console.log(`Found ${Ve}${bt}${E} Vue files`), t += vn(), t += Ln(), t += Pn(), t += Wn(), t += Fn(), t += In(), t += ss(), t += Un(), t += Zn(), t += ts(), t += is(), t += ys(), t += yn(), t += An(), t += Nn(), t += Cn(), t += as(), t += fs(), t += ps(), t += ms(), t || console.log(`${$n}No code smells detected!${E}`);
};
Ft(Zt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    As(e.path);
  }
).help().argv;
