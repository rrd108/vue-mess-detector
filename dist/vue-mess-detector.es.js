import jt from "yargs";
import { format as rt, inspect as vt } from "util";
import Ge, { normalize as Ft, resolve as Q, dirname as Be, basename as Rt, extname as Lt, relative as Wt } from "path";
import Ie, { readFileSync as Ze, statSync as it, readdirSync as Tt, writeFile as Pt } from "fs";
import { notStrictEqual as zt, strictEqual as Bt } from "assert";
import { fileURLToPath as It } from "url";
import { parse as Mt } from "@vue/compiler-sfc";
class de extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
function ct() {
  return Vt() ? 0 : 1;
}
function Vt() {
  return Ut() && !process.defaultApp;
}
function Ut() {
  return !!process.versions.electron;
}
function Dt(e) {
  return e.slice(ct() + 1);
}
function Gt() {
  return process.argv[ct()];
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
function lt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let r = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? r += `${t}${n.charAt(c)}` : r += h;
  }
  return r;
}
function at(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Zt(e) {
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
var T;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(T || (T = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let I;
class qt {
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
    }, n), c = Zt(t), a = typeof t == "string", h = Qt(Object.assign(/* @__PURE__ */ Object.create(null), r.alias)), d = Object.assign({
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
    }, r.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), r.default), F = r.configObjects || [], C = r.envPrefix, z = d["populate--"], G = z ? "--" : "_", be = /* @__PURE__ */ Object.create(null), qe = /* @__PURE__ */ Object.create(null), Z = r.__ || I.format, u = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ve = new RegExp("^--" + d["negation-prefix"] + "(.+)");
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
    })), _t(r.key, h, r.default, u.arrays), Object.keys(_).forEach(function(s) {
      (u.aliases[s] || []).forEach(function(i) {
        _[i] = _[s];
      });
    });
    let L = null;
    St();
    let ye = [];
    const w = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Qe = {};
    for (let s = 0; s < c.length; s++) {
      const i = c[s], f = i.replace(/^-{3,}/, "---");
      let l, o, g, p, m, N;
      if (i !== "--" && /^-/.test(i) && Ce(i))
        Fe(i);
      else if (f.match(/^---+(=|$)/)) {
        Fe(i);
        continue;
      } else if (i.match(/^--.+=/) || !d["short-option-groups"] && i.match(/^-.+=/))
        p = i.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (b(p[1], u.arrays) ? s = Ae(s, p[1], c, p[2]) : b(p[1], u.nargs) !== !1 ? s = Ee(s, p[1], c, p[2]) : A(p[1], p[2], !0));
      else if (i.match(ve) && d["boolean-negation"])
        p = i.match(ve), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], A(o, b(o, u.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !d["short-option-groups"] && i.match(/^-[^-]+/))
        p = i.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], b(o, u.arrays) ? s = Ae(s, o, c) : b(o, u.nargs) !== !1 ? s = Ee(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, u.bools) && !b(o, u.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      else if (i.match(/^-.\..+=/))
        p = i.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && A(p[1], p[2]);
      else if (i.match(/^-.\..+/) && !i.match(P))
        m = c[s + 1], p = i.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], m !== void 0 && !m.match(/^-/) && !b(o, u.bools) && !b(o, u.counts) ? (A(o, m), s++) : A(o, q(o)));
      else if (i.match(/^-[^-]+/) && !i.match(P)) {
        g = i.slice(1, -1).split(""), l = !1;
        for (let j = 0; j < g.length; j++) {
          if (m = i.slice(j + 2), g[j + 1] && g[j + 1] === "=") {
            N = i.slice(j + 3), o = g[j], b(o, u.arrays) ? s = Ae(s, o, c, N) : b(o, u.nargs) !== !1 ? s = Ee(s, o, c, N) : A(o, N), l = !0;
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
        o = i.slice(-1)[0], !l && o !== "-" && (b(o, u.arrays) ? s = Ae(s, o, c) : b(o, u.nargs) !== !1 ? s = Ee(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, u.bools) && !b(o, u.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      } else if (i.match(/^-[0-9]$/) && i.match(P) && b(i.slice(1), u.bools))
        o = i.slice(1), A(o, q(o));
      else if (i === "--") {
        ye = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        ye = c.slice(s);
        break;
      } else
        Fe(i);
    }
    Ye(w, !0), Ye(w, !1), bt(w), yt(), Xe(w, u.aliases, _, !0), Et(w), d["set-placeholder-key"] && At(w), Object.keys(u.counts).forEach(function(s) {
      K(w, s.split(".")) || A(s, 0);
    }), z && ye.length && (w[G] = []), ye.forEach(function(s) {
      w[G].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(w).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete w[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete w[s.split(".").map((i) => X(i)).join(".")], delete w[s];
    });
    function Fe(s) {
      const i = _e("_", s);
      (typeof i == "string" || typeof i == "number") && w._.push(i);
    }
    function Ee(s, i, f, l) {
      let o, g = b(i, u.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return B(l) || (L = Error(Z("Argument unexpected for: %s", i))), A(i, q(i)), s;
      let p = B(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        f.length - (s + 1) + p < g && (L = Error(Z("Not enough arguments following: %s", i))), p = g;
      else {
        for (o = s + 1; o < f.length && (!f[o].match(/^-[^0-9]/) || f[o].match(P) || Ce(f[o])); o++)
          p++;
        p < g && (L = Error(Z("Not enough arguments following: %s", i)));
      }
      let m = Math.min(p, g);
      for (!B(l) && m > 0 && (A(i, l), m--), o = s + 1; o < m + s + 1; o++)
        A(i, f[o]);
      return s + m;
    }
    function Ae(s, i, f, l) {
      let o = [], g = l || f[s + 1];
      const p = b(i, u.nargs);
      if (b(i, u.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (B(g) || B(l) && /^-/.test(g) && !P.test(g) && !Ce(g)) {
        if (_[i] !== void 0) {
          const m = _[i];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        B(l) || o.push(Re(i, l, !0));
        for (let m = s + 1; m < f.length && !(!d["greedy-arrays"] && o.length > 0 || p && typeof p == "number" && o.length >= p || (g = f[m], /^-/.test(g) && !P.test(g) && !Ce(g))); m++)
          s = m, o.push(Re(i, g, a));
      }
      return typeof p == "number" && (p && o.length < p || isNaN(p) && o.length === 0) && (L = Error(Z("Not enough arguments following: %s", i))), A(i, o), s;
    }
    function A(s, i, f = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return X(p);
        }).join(".");
        Ke(s, g);
      }
      const l = Re(s, i, f), o = s.split(".");
      Y(w, o, l), u.aliases[s] && u.aliases[s].forEach(function(g) {
        const p = g.split(".");
        Y(w, p, l);
      }), o.length > 1 && d["dot-notation"] && (u.aliases[o[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(o);
        m.shift(), p = p.concat(m), (u.aliases[s] || []).includes(p.join(".")) || Y(w, p, l);
      }), b(s, u.normalize) && !b(s, u.arrays) && [s].concat(u.aliases[s] || []).forEach(function(p) {
        Object.defineProperty(Qe, p, {
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
    function Ke(s, i) {
      u.aliases[s] && u.aliases[s].length || (u.aliases[s] = [i], be[i] = !0), u.aliases[i] && u.aliases[i].length || Ke(i, s);
    }
    function Re(s, i, f) {
      f && (i = Kt(i)), (b(s, u.bools) || b(s, u.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(o) {
        return _e(s, o);
      }) : _e(s, i);
      return b(s, u.counts) && (B(l) || typeof l == "boolean") && (l = We()), b(s, u.normalize) && b(s, u.arrays) && (Array.isArray(i) ? l = i.map((o) => I.normalize(o)) : l = I.normalize(i)), l;
    }
    function _e(s, i) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, u.strings) && !b(s, u.bools) && !Array.isArray(i) && (at(i) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !B(i) && b(s, u.numbers)) && (i = Number(i)), i;
    }
    function bt(s) {
      const i = /* @__PURE__ */ Object.create(null);
      Xe(i, u.aliases, _), Object.keys(u.configs).forEach(function(f) {
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
            Le(o);
          } catch (o) {
            o.name === "PermissionDenied" ? L = o : s[f] && (L = Error(Z("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Le(s, i) {
      Object.keys(s).forEach(function(f) {
        const l = s[f], o = i ? i + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Le(l, o) : (!K(w, o.split(".")) || b(o, u.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function yt() {
      typeof F < "u" && F.forEach(function(s) {
        Le(s);
      });
    }
    function Ye(s, i) {
      if (typeof C > "u")
        return;
      const f = typeof C == "string" ? C : "", l = I.env();
      Object.keys(l).forEach(function(o) {
        if (f === "" || o.lastIndexOf(f, 0) === 0) {
          const g = o.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), X(p);
          });
          (i && u.configs[g.join(".")] || !i) && !K(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function Et(s) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!f.has(l) && (i = b(l, u.coercions), typeof i == "function"))
          try {
            const o = _e(l, i(s[l]));
            [].concat(u.aliases[l] || [], l).forEach((g) => {
              f.add(g), s[g] = o;
            });
          } catch (o) {
            L = o;
          }
      });
    }
    function At(s) {
      return u.keys.forEach((i) => {
        ~i.indexOf(".") || typeof s[i] > "u" && (s[i] = void 0);
      }), s;
    }
    function Xe(s, i, f, l = !1) {
      Object.keys(f).forEach(function(o) {
        K(s, o.split(".")) || (Y(s, o.split("."), f[o]), l && (qe[o] = !0), (i[o] || []).forEach(function(g) {
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
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(N) {
        N = Je(N), typeof l == "object" && l[N] === void 0 && (l[N] = {}), typeof l[N] != "object" || Array.isArray(l[N]) ? (Array.isArray(l[N]) ? l[N].push({}) : l[N] = [l[N], {}], l = l[N][l[N].length - 1]) : l = l[N];
      });
      const o = Je(i[i.length - 1]), g = b(i.join("."), u.arrays), p = Array.isArray(f);
      let m = d["duplicate-arguments-array"];
      !m && b(o, u.nargs) && (m = !0, (!B(l[o]) && u.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === u.nargs[o]) && (l[o] = void 0)), f === We() ? l[o] = We(l[o]) : Array.isArray(l[o]) ? m && g && p ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(f) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([f]) : !m && !!g == !!p ? l[o] = f : l[o] = l[o].concat([f]) : l[o] === void 0 && g ? l[o] = p ? f : [f] : m && !(l[o] === void 0 || b(o, u.counts) || b(o, u.bools)) ? l[o] = [l[o], f] : l[o] = f;
    }
    function _t(...s) {
      s.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== f && u.aliases[f].indexOf(o) === -1 && (u.aliases[f].push(o), be[o] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = lt(l, "-");
              o !== f && u.aliases[f].indexOf(o) === -1 && (u.aliases[f].push(o), be[o] = !0);
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
    function He(s) {
      const i = Object.keys(u);
      return [].concat(i.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function Ct(s, ...i) {
      return [].concat(...i).some(function(l) {
        const o = s.match(l);
        return o && He(o[1]);
      });
    }
    function wt(s) {
      if (s.match(P) || !s.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (f = s.slice(o + 2), !He(l[o])) {
          i = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return i;
    }
    function Ce(s) {
      return d["unknown-options-as-args"] && Ot(s);
    }
    function Ot(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || wt(s) ? !1 : !Ct(s, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function q(s) {
      return !b(s, u.bools) && !b(s, u.counts) && `${s}` in _ ? _[s] : xt(Nt(s));
    }
    function xt(s) {
      return {
        [T.BOOLEAN]: !0,
        [T.STRING]: "",
        [T.NUMBER]: void 0,
        [T.ARRAY]: []
      }[s];
    }
    function Nt(s) {
      let i = T.BOOLEAN;
      return b(s, u.strings) ? i = T.STRING : b(s, u.numbers) ? i = T.NUMBER : b(s, u.bools) ? i = T.BOOLEAN : b(s, u.arrays) && (i = T.ARRAY), i;
    }
    function B(s) {
      return s === void 0;
    }
    function St() {
      Object.keys(u.counts).find((s) => b(s, u.arrays) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, u.nargs) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(Qe, w),
      configuration: d,
      defaulted: Object.assign({}, qe),
      error: L,
      newAliases: Object.assign({}, be)
    };
  }
}
function Qt(e) {
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
function Je(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Kt(e) {
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
var Te, Pe, ze;
const ke = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, et = (Pe = (Te = process == null ? void 0 : process.versions) === null || Te === void 0 ? void 0 : Te.node) !== null && Pe !== void 0 ? Pe : (ze = process == null ? void 0 : process.version) === null || ze === void 0 ? void 0 : ze.slice(1);
if (et && Number(et.match(/^([^.]+)/)[1]) < ke)
  throw Error(`yargs parser supports a minimum Node.js version of ${ke}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Yt = process ? process.env : {}, ut = new qt({
  cwd: process.cwd,
  env: () => Yt,
  format: rt,
  normalize: Ft,
  resolve: Q,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Ze(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), $e = function(t, n) {
  return ut.parse(t.slice(), n).argv;
};
$e.detailed = function(e, t) {
  return ut.parse(e.slice(), t);
};
$e.camelCase = X;
$e.decamelize = lt;
$e.looksLikeNumber = at;
const Xt = {
  right: nn,
  center: sn
}, Ht = 0, we = 1, Jt = 2, Oe = 3;
class kt {
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
        let C = h;
        if (F > R.stringWidth(h) && (C += " ".repeat(F - R.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const G = Xt[t[d].align];
          C = G(C, F), R.stringWidth(C) < F && (C += " ".repeat((_ || 0) - R.stringWidth(C) - 1));
        }
        const z = t[d].padding || [0, 0, 0, 0];
        z[Oe] && (a += " ".repeat(z[Oe])), a += tt(t[d], C, "| "), a += C, a += tt(t[d], C, " |"), z[we] && (a += " ".repeat(z[we])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
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
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[Ht] || 0).fill("")), c.push(...new Array(a.padding[Jt] || 0).fill(""))), c.forEach((d, _) => {
        n[_] || n.push([]);
        const F = n[_];
        for (let C = 0; C < h; C++)
          F[C] === void 0 && F.push("");
        F.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Oe] || 0) + (t.padding[we] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || R.stringWidth(h.text));
    let n = t.length, r = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, r -= h.width, h.width;
    }), a = n ? Math.floor(r / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, en(t[d])) : h);
  }
}
function tt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function en(e) {
  const t = e.padding || [], n = 1 + (t[Oe] || 0) + (t[we] || 0);
  return e.border ? n + 4 : n;
}
function tn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function nn(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function sn(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let R;
function on(e, t) {
  return R = t, new kt({
    width: e?.width || tn(),
    wrap: e?.wrap
  });
}
const ft = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ht(e) {
  return e.replace(ft, "");
}
function rn(e, t) {
  const [n, r] = e.match(ft) || ["", ""];
  e = ht(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && r && (c = `${n}${c}${r}`), c;
}
function cn(e) {
  return on(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: ht,
    wrap: rn
  });
}
function ln(e, t) {
  let n = Q(".", e), r;
  for (it(n).isDirectory() || (n = Be(n)); ; ) {
    if (r = t(n, Tt(n)), r)
      return Q(n, r);
    if (n = Be(r = n), r === n)
      break;
  }
}
const an = {
  fs: {
    readFileSync: Ze,
    writeFile: Pt
  },
  format: rt,
  resolve: Q,
  exists: (e) => {
    try {
      return it(e).isFile();
    } catch {
      return !1;
    }
  }
};
let W;
class un {
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
    })) : r(), W.format.apply(W.format, [this.cache[this.locale][n] || n].concat(t));
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
    return ~h.indexOf("%d") && d.push(c), W.format.apply(W.format, d.concat(t));
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
    W.fs.writeFile(h, d, "utf-8", function(_) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(_);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      W.fs.readFileSync && (t = JSON.parse(W.fs.readFileSync(n, "utf-8")));
    } catch (r) {
      if (r instanceof SyntaxError && (r.message = "syntax error in " + n), r.code === "ENOENT")
        t = {};
      else
        throw r;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let r = W.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(r) && ~n.lastIndexOf("_")) {
      const c = W.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (r = c);
    }
    return r;
  }
  _fileExistsSync(t) {
    return W.exists(t);
  }
}
function fn(e, t) {
  W = t;
  const n = new un(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const hn = (e) => fn(e, an), pn = "require is not supported by ESM", nt = "loading a directory of commands is not supported yet for ESM";
let me;
try {
  me = It(import.meta.url);
} catch {
  me = process.cwd();
}
const gn = me.substring(0, me.lastIndexOf("node_modules"));
zt, Bt, vt, gn || process.cwd(), Rt, Be, Lt, Wt, Q, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Ze, hn({
  directory: Q(me, "../../../locales"),
  updateFiles: !1
});
const Me = "\x1B[44m", S = "\x1B[43m", v = "\x1B[41m", dn = "\x1B[42m", E = "\x1B[0m", O = "\x1B[33m", x = "\x1B[36m", y = "\x1B[0m", Ve = 100, H = [], mn = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Ve && H.push({ fileName: t, scriptLength: n.length });
}, $n = () => (H.length > 0 && (console.log(
  `
${x}rrd${y} ${v}Long <script> blocks${E} in ${H.length} files.`
), console.log(
  `👉 ${O}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Ve} lines.${y}`
), H.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Ve * 2 ? v : S}(${e.scriptLength} lines)${E}`
  );
})), H.length), J = [], bn = (e) => {
  J.push(e);
}, yn = () => (J.length > 0 && (console.log(
  `
${x}rrd${y} ${S}Plain <script> blocks${E} in ${J.length} files.`
), console.log(`👉 ${O} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], En = (e, t) => {
  const n = /\belse\b/gi, r = e.content.match(n);
  r?.length && k.push({ fileName: t, elseCount: r.length });
}, An = () => (k.length > 0 && (console.log(
  `
${x}rrd${y} ${S}else conditions${E} are used in ${k.length} files.`
), console.log(`👉 ${O}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${S}(${e.elseCount})${E}`);
})), k.length), _n = 5, Cn = 10, ee = [], wn = (e, t) => {
  const n = /\bif\b/gi, r = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, h = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(r), F = e.content.match(c), C = e.content.match(a), z = e.content.match(h), G = (d?.length || 0) + (_?.length || 0) + (F?.length || 0) + (C?.length || 0) + (z?.length || 0);
  G > _n && ee.push({ fileName: t, cyclomaticComplexity: G });
}, On = () => (ee.length > 0 && (console.log(
  `
${x}rrd${y} ${Me}cyclomaticComplexity${E} is above moderate in ${ee.length} files.`
), console.log(`👉 ${O}Try to reduce complexity.${y}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Cn ? v : S}(${e.cyclomaticComplexity})${E}`
  );
})), ee.length), te = [], xn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Ge.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || te.push({ filePath: e });
}, Nn = () => (te.length > 0 && (console.log(
  `
${x}vue-essential${y} ${v}single name component${E} is used in ${te.length} files.`
), console.log(
  `👉 ${O}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], Sn = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, jn = () => (ne.length > 0 && (console.log(
  `
${x}vue-essential${y} ${v}Global style ${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${O}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], vn = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && se.push({ filePath: t });
}, Fn = () => (se.length > 0 && (console.log(
  `
${x}vue-essential${y} ${v}simple prop${E} is used in ${se.length} files.`
), console.log(
  `👉 ${O}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], Rn = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, r = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(r);
  (c?.length || a?.length) && oe.push({ filePath: t });
}, Ln = () => (oe.length > 0 && (console.log(
  `
${x}vue-essential${y} ${v}v-if used with v-for${E} in ${oe.length} files.`
), console.log(
  `👉 ${O}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], Wn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, r = e.content.match(n);
  r?.length && (r.some((a) => a.includes(":key")) || re.push({ filePath: t }));
}, Tn = () => (re.length > 0 && (console.log(
  `
${x}vue-essential${y} ${v}v-for has no key${E} in ${re.length} files.`
), console.log(
  `👉 ${O}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], Pn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = Ge.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, r = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !r?.length && !a?.length && ie.push({ fileName: e });
}, zn = () => (ie.length > 0 && (console.log(
  `
${x}vue-strong${y} ${v}component name is not PascalCase and not kebab-case${E} in ${ie.length} files.`
), console.log(
  `👉 ${O}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ie.forEach((e) => {
  console.log(`- ${v}${e.fileName}${E}`);
})), ie.length), ce = [], Bn = /^[a-z]+([A-Z][a-z]*)+$/, In = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; )
    r[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Bn.test(a)).length && ce.push({ filePath: t });
}, Mn = () => (ce.length > 0 && (console.log(
  `
${x}vue-strong${y} ${v}prop names are not camelCased${E} in ${ce.length} files.`
), console.log(
  `👉 ${O}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), je = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), r = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return r + c - 1;
}, le = [], Vn = 40, Un = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > Vn) {
      const a = je(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      le.push({ message: `${t}#${a} ${S}${h}${E}` });
    }
  });
}, Dn = () => (le.length > 0 && (console.log(
  `
${x}vue-strong${y} ${v}Lengthy template expression${E} found in ${le.length} files.`
), console.log(
  `👉 ${O}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), le.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), le.length), Gn = /^(\(.*\)|\\?.)$/;
function D(e) {
  const t = e.toString();
  return Gn.test(t) ? t : `(?:${t})`;
}
const Zn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, qn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Zn, "$1$2")})`);
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
    grouped: () => $(`${e}`.replace(qn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Qn = /[.*+?^${}()|[\]\\/]/g;
function st(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ue(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Kn = $(".");
$("\\b\\w+\\b");
const Ne = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Yn = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), Xn = $("\\t"), Hn = $("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(Qn, "\\$&") : t).join("")
  );
}
function U(...e) {
  return $(`${D(M(...e))}+`);
}
const Se = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, ae = [], Jn = (e, t) => {
  const n = e.template, r = Se(
    "<",
    U(Ne),
    V(U(st(` 	
\r`))),
    U(Ue("/>")),
    V(U(st(` 	
\r`))),
    V("/"),
    ">",
    ["g"]
  ), c = n.content.match(r);
  if (c === null)
    return;
  const a = Se(":", U(Ne), V(" "), "=", V(" "), Ue(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const _ = je(e.source, h);
      ae.push({ message: `${t}#${_} ${S}${d}${E}` });
    }
  });
}, kn = () => (ae.length > 0 && (console.log(
  `
${x}vue-strong${y} ${v}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${O}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), ue = [], es = (e, t) => {
  const n = e.template, r = Se(
    "<",
    U(Yn.uppercase, Ne),
    V(Hn, Xn),
    V(U(Ue(">"))),
    "></",
    U(Ne),
    ">",
    ["g"]
  ), c = n.content.match(r);
  c !== null && c.forEach((a) => {
    const h = je(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    ue.push({ message: `${t}#${h} ${S}${d}${E}` });
  });
}, ts = () => (ue.length > 0 && (console.log(
  `
${x}vue-strong${y} - ${v}Component is not self closing${E} in ${ue.length} files.`
), console.log(
  `👉 ${O}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), ue.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ue.length), xe = [], De = [], ns = ["v-slot", "v-bind", "v-on"], ss = (e, t) => {
  const n = e.template;
  ns.forEach((r) => {
    if (n.content.includes(`${r}:`)) {
      const c = je(e.source, r);
      xe.push({ message: `${t}:${c} ${S}${r}${E}` }), De.some((a) => a.filePath === t) || De.push({ filePath: t });
    }
  });
}, os = () => (xe.length > 0 && (console.log(
  `
${x}vue-strong${y} ${v}Directive shorthands not used${E} in ${De.length} files.`
), console.log(
  `👉 ${O}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), xe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), xe.length), fe = [], rs = 5, is = (e, t) => {
  const n = Se("defineProps", V("<"), V("("), "{", U(Kn), "}", ["g", "s"]), r = e.content.match(n);
  if (r?.length) {
    const c = r[0].split(",").length;
    c > rs && fe.push({ fileName: t, propsCount: c });
  }
}, cs = () => (fe.length > 0 && (console.log(
  `
${x}rrd${y} ${S}too many props${E} are used in ${fe.length} files.`
), console.log(`👉 ${O}Try to refactor your code to use less properties.${y}`), fe.forEach((e) => {
  console.log(`- ${e.fileName} ${S}(${e.propsCount})${E}`);
})), fe.length), he = [], pt = 20, ls = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; ) {
    const c = r[1] || r[5];
    (r[2] || r[6]).split(`
`).length > pt && he.push({ filename: t, funcName: c });
  }
}, as = () => (he.length > 0 && (console.log(
  `
${x}rrd${y} ${S}function size${E} exceeds recommended limit in ${he.length} files.`
), console.log(`👉 ${O}Functions must be shorter than ${pt} lines${y}`), he.forEach((e) => {
  console.log(`- ${e.filename} 🚨 ${S}(${e.funcName})${E}`);
})), he.length), pe = [], gt = 3, ot = (e, t, n) => {
  const r = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  r.length > gt && pe.push({ filename: n, funcName: e, paramsCount: r.length });
}, us = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; )
    r[1] ? ot(r[1], r[2], t) : r[3] && ot(r[3], r[4], t);
}, fs = () => (pe.length > 0 && (console.log(
  `
${x}rrd${y} ${S}parameter count${E} exceeds recommended limit in ${pe.length} files.`
), console.log(`👉 ${O}Max number of function parameters should be ${gt}${y}`), pe.forEach((e) => {
  console.log(`- ${S}${e.funcName}${E} in file ${e.filename} 🚨 ${S}(${e.paramsCount})${E}`);
})), pe.length), dt = 4, ge = [], hs = (e) => new Set(e.map((n) => n.filename)).size, ps = (e, t) => {
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; ) {
    const c = r[1];
    c.length < dt && ge.push({ filename: t, variable: c });
  }
}, gs = () => {
  if (ge.length > 0) {
    const e = hs(ge);
    console.log(
      `
${x}rrd${y} ${S}variable names${E} are too short in ${e} files.`
    ), console.log(
      `👉 ${O}Variable names must have a minimum length of ${dt}${y}`
    ), ge.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${S}(${t.variable})${E}`);
    });
  }
  return ge.length;
};
let mt = 0;
const ds = [
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
], $t = (e, t) => {
  const n = Ie.readdirSync(e);
  mt += n.length;
  for (const r of n) {
    const c = Ge.join(e, r);
    Ie.statSync(c).isDirectory() ? ds.some((a) => c.includes(a)) && $t(c, t) : r.endsWith(".vue") && t(c);
  }
}, ms = (e) => {
  console.log(`

${Me}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  $t(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const r = Ie.readFileSync(n, "utf-8"), { descriptor: c } = Mt(r);
    xn(n), Pn(n), c.script && bn(n);
    const a = c.scriptSetup || c.script;
    a && (vn(a, n), In(a, n), mn(a, n), wn(a, n), En(a, n), is(a, n), ls(a, n), us(a, n), ps(a, n)), c.styles.forEach((h) => {
      Sn(h, n);
    }), c.template && (Wn(c.template, n), Rn(c.template, n), es(c, n), Un(c.template, n), Jn(c, n), ss(c, n));
  }), console.log(`Found ${Me}${mt}${E} Vue files`), t += Nn(), t += Fn(), t += Tn(), t += Ln(), t += jn(), t += zn(), t += ts(), t += Mn(), t += Dn(), t += kn(), t += os(), t += $n(), t += yn(), t += On(), t += An(), t += cs(), t += as(), t += fs(), t += gs(), t || console.log(`${dn}No code smells detected!${E}`);
};
jt(Dt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    ms(e.path);
  }
).help().argv;
