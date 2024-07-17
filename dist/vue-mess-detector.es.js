import Nt from "yargs";
import { format as ot, inspect as St } from "util";
import Ge, { normalize as jt, resolve as Q, dirname as Be, basename as vt, extname as Ft, relative as Rt } from "path";
import ze, { readFileSync as Ve, statSync as rt, readdirSync as Lt, writeFile as Wt } from "fs";
import { notStrictEqual as Tt, strictEqual as Pt } from "assert";
import { fileURLToPath as Bt } from "url";
import { parse as zt } from "@vue/compiler-sfc";
class ge extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ge);
  }
}
function it() {
  return It() ? 0 : 1;
}
function It() {
  return Mt() && !process.defaultApp;
}
function Mt() {
  return !!process.versions.electron;
}
function Ut(e) {
  return e.slice(it() + 1);
}
function Dt() {
  return process.argv[it()];
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
    let n = "", i = !1;
    const c = e.match(/^-+/);
    for (let a = c ? c[0].length : 0; a < e.length; a++) {
      let h = e.charAt(a);
      i && (i = !1, h = h.toUpperCase()), a !== 0 && (h === "-" || h === "_") ? i = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function ct(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? i += `${t}${n.charAt(c)}` : i += h;
  }
  return i;
}
function lt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Gt(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, i = null, c = null;
  const a = [];
  for (let h = 0; h < e.length; h++) {
    if (n = i, i = e.charAt(h), i === " " && !c) {
      n !== " " && t++;
      continue;
    }
    i === c ? c = null : (i === "'" || i === '"') && !c && (c = i), a[t] || (a[t] = ""), a[t] += i;
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
class Vt {
  constructor(t) {
    I = t;
  }
  parse(t, n) {
    const i = Object.assign({
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
    }, n), c = Gt(t), a = typeof t == "string", h = Zt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), d = Object.assign({
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
    }, i.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), i.default), F = i.configObjects || [], C = i.envPrefix, B = d["populate--"], V = B ? "--" : "_", $e = /* @__PURE__ */ Object.create(null), Ze = /* @__PURE__ */ Object.create(null), Z = i.__ || I.format, f = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, je = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(i.array || []).filter(Boolean).forEach(function(s) {
      const r = typeof s == "object" ? s.key : s, u = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      u && (f[u][r] = !0), f.arrays[r] = !0, f.keys.push(r);
    }), [].concat(i.boolean || []).filter(Boolean).forEach(function(s) {
      f.bools[s] = !0, f.keys.push(s);
    }), [].concat(i.string || []).filter(Boolean).forEach(function(s) {
      f.strings[s] = !0, f.keys.push(s);
    }), [].concat(i.number || []).filter(Boolean).forEach(function(s) {
      f.numbers[s] = !0, f.keys.push(s);
    }), [].concat(i.count || []).filter(Boolean).forEach(function(s) {
      f.counts[s] = !0, f.keys.push(s);
    }), [].concat(i.normalize || []).filter(Boolean).forEach(function(s) {
      f.normalize[s] = !0, f.keys.push(s);
    }), typeof i.narg == "object" && Object.entries(i.narg).forEach(([s, r]) => {
      typeof r == "number" && (f.nargs[s] = r, f.keys.push(s));
    }), typeof i.coerce == "object" && Object.entries(i.coerce).forEach(([s, r]) => {
      typeof r == "function" && (f.coercions[s] = r, f.keys.push(s));
    }), typeof i.config < "u" && (Array.isArray(i.config) || typeof i.config == "string" ? [].concat(i.config).filter(Boolean).forEach(function(s) {
      f.configs[s] = !0;
    }) : typeof i.config == "object" && Object.entries(i.config).forEach(([s, r]) => {
      (typeof r == "boolean" || typeof r == "function") && (f.configs[s] = r);
    })), Et(i.key, h, i.default, f.arrays), Object.keys(_).forEach(function(s) {
      (f.aliases[s] || []).forEach(function(r) {
        _[r] = _[s];
      });
    });
    let L = null;
    xt();
    let be = [];
    const w = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), qe = {};
    for (let s = 0; s < c.length; s++) {
      const r = c[s], u = r.replace(/^-{3,}/, "---");
      let l, o, g, p, m, O;
      if (r !== "--" && /^-/.test(r) && _e(r))
        ve(r);
      else if (u.match(/^---+(=|$)/)) {
        ve(r);
        continue;
      } else if (r.match(/^--.+=/) || !d["short-option-groups"] && r.match(/^-.+=/))
        p = r.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (b(p[1], f.arrays) ? s = Ee(s, p[1], c, p[2]) : b(p[1], f.nargs) !== !1 ? s = ye(s, p[1], c, p[2]) : A(p[1], p[2], !0));
      else if (r.match(je) && d["boolean-negation"])
        p = r.match(je), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], A(o, b(o, f.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !d["short-option-groups"] && r.match(/^-[^-]+/))
        p = r.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], b(o, f.arrays) ? s = Ee(s, o, c) : b(o, f.nargs) !== !1 ? s = ye(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      else if (r.match(/^-.\..+=/))
        p = r.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && A(p[1], p[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[s + 1], p = r.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], m !== void 0 && !m.match(/^-/) && !b(o, f.bools) && !b(o, f.counts) ? (A(o, m), s++) : A(o, q(o)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        g = r.slice(1, -1).split(""), l = !1;
        for (let j = 0; j < g.length; j++) {
          if (m = r.slice(j + 2), g[j + 1] && g[j + 1] === "=") {
            O = r.slice(j + 3), o = g[j], b(o, f.arrays) ? s = Ee(s, o, c, O) : b(o, f.nargs) !== !1 ? s = ye(s, o, c, O) : A(o, O), l = !0;
            break;
          }
          if (m === "-") {
            A(g[j], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && b(m, f.bools) === !1) {
            A(g[j], m), l = !0;
            break;
          }
          if (g[j + 1] && g[j + 1].match(/\W/)) {
            A(g[j], m), l = !0;
            break;
          } else
            A(g[j], q(g[j]));
        }
        o = r.slice(-1)[0], !l && o !== "-" && (b(o, f.arrays) ? s = Ee(s, o, c) : b(o, f.nargs) !== !1 ? s = ye(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, q(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && b(r.slice(1), f.bools))
        o = r.slice(1), A(o, q(o));
      else if (r === "--") {
        be = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        be = c.slice(s);
        break;
      } else
        ve(r);
    }
    Ke(w, !0), Ke(w, !1), mt(w), $t(), Ye(w, f.aliases, _, !0), bt(w), d["set-placeholder-key"] && yt(w), Object.keys(f.counts).forEach(function(s) {
      K(w, s.split(".")) || A(s, 0);
    }), B && be.length && (w[V] = []), be.forEach(function(s) {
      w[V].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(w).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete w[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete w[s.split(".").map((r) => X(r)).join(".")], delete w[s];
    });
    function ve(s) {
      const r = Ae("_", s);
      (typeof r == "string" || typeof r == "number") && w._.push(r);
    }
    function ye(s, r, u, l) {
      let o, g = b(r, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return z(l) || (L = Error(Z("Argument unexpected for: %s", r))), A(r, q(r)), s;
      let p = z(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + p < g && (L = Error(Z("Not enough arguments following: %s", r))), p = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(P) || _e(u[o])); o++)
          p++;
        p < g && (L = Error(Z("Not enough arguments following: %s", r)));
      }
      let m = Math.min(p, g);
      for (!z(l) && m > 0 && (A(r, l), m--), o = s + 1; o < m + s + 1; o++)
        A(r, u[o]);
      return s + m;
    }
    function Ee(s, r, u, l) {
      let o = [], g = l || u[s + 1];
      const p = b(r, f.nargs);
      if (b(r, f.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (z(g) || z(l) && /^-/.test(g) && !P.test(g) && !_e(g)) {
        if (_[r] !== void 0) {
          const m = _[r];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        z(l) || o.push(Fe(r, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || p && typeof p == "number" && o.length >= p || (g = u[m], /^-/.test(g) && !P.test(g) && !_e(g))); m++)
          s = m, o.push(Fe(r, g, a));
      }
      return typeof p == "number" && (p && o.length < p || isNaN(p) && o.length === 0) && (L = Error(Z("Not enough arguments following: %s", r))), A(r, o), s;
    }
    function A(s, r, u = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return X(p);
        }).join(".");
        Qe(s, g);
      }
      const l = Fe(s, r, u), o = s.split(".");
      Y(w, o, l), f.aliases[s] && f.aliases[s].forEach(function(g) {
        const p = g.split(".");
        Y(w, p, l);
      }), o.length > 1 && d["dot-notation"] && (f.aliases[o[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(o);
        m.shift(), p = p.concat(m), (f.aliases[s] || []).includes(p.join(".")) || Y(w, p, l);
      }), b(s, f.normalize) && !b(s, f.arrays) && [s].concat(f.aliases[s] || []).forEach(function(p) {
        Object.defineProperty(qe, p, {
          enumerable: !0,
          get() {
            return r;
          },
          set(m) {
            r = typeof m == "string" ? I.normalize(m) : m;
          }
        });
      });
    }
    function Qe(s, r) {
      f.aliases[s] && f.aliases[s].length || (f.aliases[s] = [r], $e[r] = !0), f.aliases[r] && f.aliases[r].length || Qe(r, s);
    }
    function Fe(s, r, u) {
      u && (r = qt(r)), (b(s, f.bools) || b(s, f.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(o) {
        return Ae(s, o);
      }) : Ae(s, r);
      return b(s, f.counts) && (z(l) || typeof l == "boolean") && (l = Le()), b(s, f.normalize) && b(s, f.arrays) && (Array.isArray(r) ? l = r.map((o) => I.normalize(o)) : l = I.normalize(r)), l;
    }
    function Ae(s, r) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, f.strings) && !b(s, f.bools) && !Array.isArray(r) && (lt(r) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !z(r) && b(s, f.numbers)) && (r = Number(r)), r;
    }
    function mt(s) {
      const r = /* @__PURE__ */ Object.create(null);
      Ye(r, f.aliases, _), Object.keys(f.configs).forEach(function(u) {
        const l = s[u] || r[u];
        if (l)
          try {
            let o = null;
            const g = I.resolve(I.cwd(), l), p = f.configs[u];
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
            Re(o);
          } catch (o) {
            o.name === "PermissionDenied" ? L = o : s[u] && (L = Error(Z("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Re(s, r) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = r ? r + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Re(l, o) : (!K(w, o.split(".")) || b(o, f.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function $t() {
      typeof F < "u" && F.forEach(function(s) {
        Re(s);
      });
    }
    function Ke(s, r) {
      if (typeof C > "u")
        return;
      const u = typeof C == "string" ? C : "", l = I.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(u.length)), X(p);
          });
          (r && f.configs[g.join(".")] || !r) && !K(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function bt(s) {
      let r;
      const u = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!u.has(l) && (r = b(l, f.coercions), typeof r == "function"))
          try {
            const o = Ae(l, r(s[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              u.add(g), s[g] = o;
            });
          } catch (o) {
            L = o;
          }
      });
    }
    function yt(s) {
      return f.keys.forEach((r) => {
        ~r.indexOf(".") || typeof s[r] > "u" && (s[r] = void 0);
      }), s;
    }
    function Ye(s, r, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        K(s, o.split(".")) || (Y(s, o.split("."), u[o]), l && (Ze[o] = !0), (r[o] || []).forEach(function(g) {
          K(s, g.split(".")) || Y(s, g.split("."), u[o]);
        }));
      });
    }
    function K(s, r) {
      let u = s;
      d["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(o) {
        u = u[o] || {};
      });
      const l = r[r.length - 1];
      return typeof u != "object" ? !1 : l in u;
    }
    function Y(s, r, u) {
      let l = s;
      d["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(O) {
        O = He(O), typeof l == "object" && l[O] === void 0 && (l[O] = {}), typeof l[O] != "object" || Array.isArray(l[O]) ? (Array.isArray(l[O]) ? l[O].push({}) : l[O] = [l[O], {}], l = l[O][l[O].length - 1]) : l = l[O];
      });
      const o = He(r[r.length - 1]), g = b(r.join("."), f.arrays), p = Array.isArray(u);
      let m = d["duplicate-arguments-array"];
      !m && b(o, f.nargs) && (m = !0, (!z(l[o]) && f.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === f.nargs[o]) && (l[o] = void 0)), u === Le() ? l[o] = Le(l[o]) : Array.isArray(l[o]) ? m && g && p ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!p ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = p ? u : [u] : m && !(l[o] === void 0 || b(o, f.counts) || b(o, f.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function Et(...s) {
      s.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          f.aliases[u] || (f.aliases[u] = [].concat(h[u] || []), f.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), $e[o] = !0);
            }
          }), f.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = ct(l, "-");
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), $e[o] = !0);
            }
          }), f.aliases[u].forEach(function(l) {
            f.aliases[l] = [u].concat(f.aliases[u].filter(function(o) {
              return l !== o;
            }));
          }));
        });
      });
    }
    function b(s, r) {
      const u = [].concat(f.aliases[s] || [], s), l = Object.keys(r), o = u.find((g) => l.includes(g));
      return o ? r[o] : !1;
    }
    function Xe(s) {
      const r = Object.keys(f);
      return [].concat(r.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function At(s, ...r) {
      return [].concat(...r).some(function(l) {
        const o = s.match(l);
        return o && Xe(o[1]);
      });
    }
    function _t(s) {
      if (s.match(P) || !s.match(/^-[^-]+/))
        return !1;
      let r = !0, u;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (u = s.slice(o + 2), !Xe(l[o])) {
          r = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return r;
    }
    function _e(s) {
      return d["unknown-options-as-args"] && Ct(s);
    }
    function Ct(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || _t(s) ? !1 : !At(s, /^-+([^=]+?)=[\s\S]*$/, je, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function q(s) {
      return !b(s, f.bools) && !b(s, f.counts) && `${s}` in _ ? _[s] : wt(Ot(s));
    }
    function wt(s) {
      return {
        [T.BOOLEAN]: !0,
        [T.STRING]: "",
        [T.NUMBER]: void 0,
        [T.ARRAY]: []
      }[s];
    }
    function Ot(s) {
      let r = T.BOOLEAN;
      return b(s, f.strings) ? r = T.STRING : b(s, f.numbers) ? r = T.NUMBER : b(s, f.bools) ? r = T.BOOLEAN : b(s, f.arrays) && (r = T.ARRAY), r;
    }
    function z(s) {
      return s === void 0;
    }
    function xt() {
      Object.keys(f.counts).find((s) => b(s, f.arrays) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, f.nargs) ? (L = Error(Z("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(qe, w),
      configuration: d,
      defaulted: Object.assign({}, Ze),
      error: L,
      newAliases: Object.assign({}, $e)
    };
  }
}
function Zt(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let i = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); i; ) {
    i = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(d) {
          return t[a].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), i = !0;
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
function Le(e) {
  return e !== void 0 ? e + 1 : 1;
}
function He(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function qt(e) {
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
var We, Te, Pe;
const Je = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, ke = (Te = (We = process == null ? void 0 : process.versions) === null || We === void 0 ? void 0 : We.node) !== null && Te !== void 0 ? Te : (Pe = process == null ? void 0 : process.version) === null || Pe === void 0 ? void 0 : Pe.slice(1);
if (ke && Number(ke.match(/^([^.]+)/)[1]) < Je)
  throw Error(`yargs parser supports a minimum Node.js version of ${Je}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Qt = process ? process.env : {}, at = new Vt({
  cwd: process.cwd,
  env: () => Qt,
  format: ot,
  normalize: jt,
  resolve: Q,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Ve(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), me = function(t, n) {
  return at.parse(t.slice(), n).argv;
};
me.detailed = function(e, t) {
  return at.parse(e.slice(), t);
};
me.camelCase = X;
me.decamelize = ct;
me.looksLikeNumber = lt;
const Kt = {
  right: en,
  center: tn
}, Yt = 0, Ce = 1, Xt = 2, we = 3;
class Ht {
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
    const n = t.map((i) => typeof i == "string" ? this.colFromString(i) : i);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((c) => c.split("	"));
    let i = 0;
    return n.forEach((c) => {
      c.length > 1 && R.stringWidth(c[0]) > i && (i = Math.min(Math.floor(this.width * 0.5), R.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((a, h) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: h === 0 && c.length > 1 ? i : void 0
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
    return this.rasterize(t).forEach((i, c) => {
      let a = "";
      i.forEach((h, d) => {
        const { width: _ } = t[d], F = this.negatePadding(t[d]);
        let C = h;
        if (F > R.stringWidth(h) && (C += " ".repeat(F - R.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const V = Kt[t[d].align];
          C = V(C, F), R.stringWidth(C) < F && (C += " ".repeat((_ || 0) - R.stringWidth(C) - 1));
        }
        const B = t[d].padding || [0, 0, 0, 0];
        B[we] && (a += " ".repeat(B[we])), a += et(t[d], C, "| "), a += C, a += et(t[d], C, " |"), B[Ce] && (a += " ".repeat(B[Ce])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const i = t.match(/^ */), c = i ? i[0].length : 0, a = n.text, h = R.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], i = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = i[h], this.wrap ? c = R.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[Yt] || 0).fill("")), c.push(...new Array(a.padding[Xt] || 0).fill(""))), c.forEach((d, _) => {
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
    return t.padding && (n -= (t.padding[we] || 0) + (t.padding[Ce] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || R.stringWidth(h.text));
    let n = t.length, i = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, i -= h.width, h.width;
    }), a = n ? Math.floor(i / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, Jt(t[d])) : h);
  }
}
function et(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Jt(e) {
  const t = e.padding || [], n = 1 + (t[we] || 0) + (t[Ce] || 0);
  return e.border ? n + 4 : n;
}
function kt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function en(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function tn(e, t) {
  e = e.trim();
  const n = R.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let R;
function nn(e, t) {
  return R = t, new Ht({
    width: e?.width || kt(),
    wrap: e?.wrap
  });
}
const ft = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ut(e) {
  return e.replace(ft, "");
}
function sn(e, t) {
  const [n, i] = e.match(ft) || ["", ""];
  e = ut(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && i && (c = `${n}${c}${i}`), c;
}
function on(e) {
  return nn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: ut,
    wrap: sn
  });
}
function rn(e, t) {
  let n = Q(".", e), i;
  for (rt(n).isDirectory() || (n = Be(n)); ; ) {
    if (i = t(n, Lt(n)), i)
      return Q(n, i);
    if (n = Be(i = n), i === n)
      break;
  }
}
const cn = {
  fs: {
    readFileSync: Ve,
    writeFile: Wt
  },
  format: ot,
  resolve: Q,
  exists: (e) => {
    try {
      return rt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let W;
class ln {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let i = function() {
    };
    return typeof t[t.length - 1] == "function" && (i = t.pop()), i = i || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i(), W.format.apply(W.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), i = t.shift(), c = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = c === 1 ? n : i;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: i
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
    let i = "";
    return t.forEach(function(c, a) {
      const h = n[a + 1];
      i += c, typeof h < "u" && (i += "%s");
    }), this.__.apply(this, [i].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], i = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(i, c), d = JSON.stringify(this.cache[c], null, 2);
    W.fs.writeFile(h, d, "utf-8", function(_) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(_);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      W.fs.readFileSync && (t = JSON.parse(W.fs.readFileSync(n, "utf-8")));
    } catch (i) {
      if (i instanceof SyntaxError && (i.message = "syntax error in " + n), i.code === "ENOENT")
        t = {};
      else
        throw i;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let i = W.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(i) && ~n.lastIndexOf("_")) {
      const c = W.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (i = c);
    }
    return i;
  }
  _fileExistsSync(t) {
    return W.exists(t);
  }
}
function an(e, t) {
  W = t;
  const n = new ln(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const fn = (e) => an(e, cn), un = "require is not supported by ESM", tt = "loading a directory of commands is not supported yet for ESM";
let de;
try {
  de = Bt(import.meta.url);
} catch {
  de = process.cwd();
}
const hn = de.substring(0, de.lastIndexOf("node_modules"));
Tt, Pt, St, hn || process.cwd(), vt, Be, Ft, Rt, Q, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Ve, fn({
  directory: Q(de, "../../../locales"),
  updateFiles: !1
});
const Ie = "\x1B[44m", S = "\x1B[43m", v = "\x1B[41m", pn = "\x1B[42m", E = "\x1B[0m", x = "\x1B[33m", N = "\x1B[36m", y = "\x1B[0m", Me = 100, H = [], gn = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Me && H.push({ fileName: t, scriptLength: n.length });
}, dn = () => (H.length > 0 && (console.log(
  `
${N}rrd${y} ${v}Long <script> blocks${E} in ${H.length} files.`
), console.log(
  `👉 ${x}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Me} lines.${y}`
), H.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Me * 2 ? v : S}(${e.scriptLength} lines)${E}`
  );
})), H.length), J = [], mn = (e) => {
  J.push(e);
}, $n = () => (J.length > 0 && (console.log(
  `
${N}rrd${y} ${S}Plain <script> blocks${E} in ${J.length} files.`
), console.log(`👉 ${x} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], bn = (e, t) => {
  const n = /\belse\b/gi, i = e.content.match(n);
  i?.length && k.push({ fileName: t, elseCount: i.length });
}, yn = () => (k.length > 0 && (console.log(
  `
${N}rrd${y} ${S}else conditions${E} are used in ${k.length} files.`
), console.log(`👉 ${x}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${S}(${e.elseCount})${E}`);
})), k.length), En = 5, An = 10, ee = [], _n = (e, t) => {
  const n = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, h = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(i), F = e.content.match(c), C = e.content.match(a), B = e.content.match(h), V = (d?.length || 0) + (_?.length || 0) + (F?.length || 0) + (C?.length || 0) + (B?.length || 0);
  V > En && ee.push({ fileName: t, cyclomaticComplexity: V });
}, Cn = () => (ee.length > 0 && (console.log(
  `
${N}rrd${y} ${Ie}cyclomaticComplexity${E} is above moderate in ${ee.length} files.`
), console.log(`👉 ${x}Try to reduce complexity.${y}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > An ? v : S}(${e.cyclomaticComplexity})${E}`
  );
})), ee.length), te = [], wn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Ge.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || te.push({ filePath: e });
}, On = () => (te.length > 0 && (console.log(
  `
${N}vue-essential${y} ${v}single name component${E} is used in ${te.length} files.`
), console.log(
  `👉 ${x}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], xn = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, Nn = () => (ne.length > 0 && (console.log(
  `
${N}vue-essential${y} ${v}Global style ${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${x}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], Sn = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && se.push({ filePath: t });
}, jn = () => (se.length > 0 && (console.log(
  `
${N}vue-essential${y} ${v}simple prop${E} is used in ${se.length} files.`
), console.log(
  `👉 ${x}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], vn = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(i);
  (c?.length || a?.length) && oe.push({ filePath: t });
}, Fn = () => (oe.length > 0 && (console.log(
  `
${N}vue-essential${y} ${v}v-if used with v-for${E} in ${oe.length} files.`
), console.log(
  `👉 ${x}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], Rn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(n);
  i?.length && (i.some((a) => a.includes(":key")) || re.push({ filePath: t }));
}, Ln = () => (re.length > 0 && (console.log(
  `
${N}vue-essential${y} ${v}v-for has no key${E} in ${re.length} files.`
), console.log(
  `👉 ${x}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], Wn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = Ge.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !i?.length && !a?.length && ie.push({ fileName: e });
}, Tn = () => (ie.length > 0 && (console.log(
  `
${N}vue-strong${y} ${v}component name is not PascalCase and not kebab-case${E} in ${ie.length} files.`
), console.log(
  `👉 ${x}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ie.forEach((e) => {
  console.log(`- ${v}${e.fileName}${E}`);
})), ie.length), ce = [], Pn = /^[a-z]+([A-Z][a-z]*)+$/, Bn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Pn.test(a)).length && ce.push({ filePath: t });
}, zn = () => (ce.length > 0 && (console.log(
  `
${N}vue-strong${y} ${v}prop names are not camelCased${E} in ${ce.length} files.`
), console.log(
  `👉 ${x}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), Se = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), i = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return i + c - 1;
}, le = [], In = 40, Mn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > In) {
      const a = Se(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      le.push({ message: `${t}#${a} ${S}${h}${E}` });
    }
  });
}, Un = () => (le.length > 0 && (console.log(
  `
${N}vue-strong${y} ${v}Lengthy template expression${E} found in ${le.length} files.`
), console.log(
  `👉 ${x}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), le.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), le.length), Dn = /^(\(.*\)|\\?.)$/;
function G(e) {
  const t = e.toString();
  return Dn.test(t) ? t : `(?:${t})`;
}
const Gn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Vn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Gn, "$1$2")})`);
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
    times: Object.assign((n) => $(`${G(e)}{${n}}`), {
      any: () => $(`${G(e)}*`),
      atLeast: (n) => $(`${G(e)}{${n},}`),
      atMost: (n) => $(`${G(e)}{0,${n}}`),
      between: (n, i) => $(`${G(e)}{${n},${i}}`)
    }),
    optionally: () => $(`${G(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => $(`${e}`.replace(Vn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Zn = /[.*+?^${}()|[\]\\/]/g;
function nt(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ue(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const qn = $(".");
$("\\b\\w+\\b");
const xe = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Qn = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), Kn = $("\\t"), Yn = $("\\n");
$("\\r");
$("\\W+"), $("\\W"), $("\\B"), $("\\D"), $("\\S"), Object.assign($("[^a-zA-Z]"), {
  lowercase: $("[^a-z]"),
  uppercase: $("[^A-Z]")
}), $("[^\\t]"), $("[^\\n]"), $("[^\\r]");
function U(...e) {
  return $(`${G(M(...e))}?`);
}
function M(...e) {
  return $(
    e.map((t) => typeof t == "string" ? t.replace(Zn, "\\$&") : t).join("")
  );
}
function D(...e) {
  return $(`${G(M(...e))}+`);
}
const Ne = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, ae = [], Xn = (e, t) => {
  const n = e.template, i = Ne(
    "<",
    D(xe),
    U(D(nt(` 	
\r`))),
    D(Ue("/>")),
    U(D(nt(` 	
\r`))),
    U("/"),
    ">",
    ["g"]
  ), c = n.content.match(i);
  if (c === null)
    return;
  const a = Ne(":", D(xe), U(" "), "=", U(" "), Ue(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const _ = Se(e.source, h);
      ae.push({ message: `${t}#${_} ${S}${d}${E}` });
    }
  });
}, Hn = () => (ae.length > 0 && (console.log(
  `
${N}vue-strong${y} ${v}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${x}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), fe = [], Jn = (e, t) => {
  const n = e.template, i = Ne(
    "<",
    D(Qn.uppercase, xe),
    U(Yn, Kn),
    U(D(Ue(">"))),
    "></",
    D(xe),
    ">",
    ["g"]
  ), c = n.content.match(i);
  c !== null && c.forEach((a) => {
    const h = Se(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    fe.push({ message: `${t}#${h} ${S}${d}${E}` });
  });
}, kn = () => (fe.length > 0 && (console.log(
  `
${N}vue-strong${y} - ${v}Component is not self closing${E} in ${fe.length} files.`
), console.log(
  `👉 ${x}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length), Oe = [], De = [], es = ["v-slot", "v-bind", "v-on"], ts = (e, t) => {
  const n = e.template;
  es.forEach((i) => {
    if (n.content.includes(`${i}:`)) {
      const c = Se(e.source, i);
      Oe.push({ message: `${t}:${c} ${S}${i}${E}` }), De.some((a) => a.filePath === t) || De.push({ filePath: t });
    }
  });
}, ns = () => (Oe.length > 0 && (console.log(
  `
${N}vue-strong${y} ${v}Directive shorthands not used${E} in ${De.length} files.`
), console.log(
  `👉 ${x}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Oe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Oe.length), ue = [], ss = 5, os = (e, t) => {
  const n = Ne("defineProps", U("<"), U("("), "{", D(qn), "}", ["g", "s"]), i = e.content.match(n);
  if (i?.length) {
    const c = i[0].split(",").length;
    c > ss && ue.push({ fileName: t, propsCount: c });
  }
}, rs = () => (ue.length > 0 && (console.log(
  `
${N}rrd${y} ${S}too many props${E} are used in ${ue.length} files.`
), console.log(`👉 ${x}Try to refactor your code to use less properties.${y}`), ue.forEach((e) => {
  console.log(`- ${e.fileName} ${S}(${e.propsCount})${E}`);
})), ue.length), he = [], ht = 20, is = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; ) {
    const c = i[1] || i[5];
    (i[2] || i[6]).split(`
`).length > ht && he.push({ filename: t, funcName: c });
  }
}, cs = () => (he.length > 0 && (console.log(
  `
${N}rrd${y} ${S}function size${E} exceeds recommended limit in ${he.length} files.`
), console.log(`👉 ${x}Functions must be shorter than ${ht} lines${y}`), he.forEach((e) => {
  console.log(`- ${e.filename} 🚨 ${S}(${e.funcName})${E}`);
})), he.length), pe = [], pt = 3, st = (e, t, n) => {
  const i = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  i.length > pt && pe.push({ filename: n, funcName: e, paramsCount: i.length });
}, ls = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1] ? st(i[1], i[2], t) : i[3] && st(i[3], i[4], t);
}, as = () => (pe.length > 0 && (console.log(
  `
${N}rrd${y} ${S}parameter count${E} exceeds recommended limit in ${pe.length} files.`
), console.log(`👉 ${x}Max number of function parameters should be ${pt}${y}`), pe.forEach((e) => {
  console.log(`- ${S}${e.funcName}${E} in file ${e.filename} 🚨 ${S}(${e.paramsCount})${E}`);
})), pe.length);
let gt = 0;
const fs = [
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
], dt = (e, t) => {
  const n = ze.readdirSync(e);
  gt += n.length;
  for (const i of n) {
    const c = Ge.join(e, i);
    ze.statSync(c).isDirectory() ? fs.some((a) => c.includes(a)) && dt(c, t) : i.endsWith(".vue") && t(c);
  }
}, us = (e) => {
  console.log(`

${Ie}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  dt(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const i = ze.readFileSync(n, "utf-8"), { descriptor: c } = zt(i);
    wn(n), Wn(n), c.script && mn(n);
    const a = c.scriptSetup || c.script;
    a && (Sn(a, n), Bn(a, n), gn(a, n), _n(a, n), bn(a, n), os(a, n), is(a, n), ls(a, n)), c.styles.forEach((h) => {
      xn(h, n);
    }), c.template && (Rn(c.template, n), vn(c.template, n), Jn(c, n), Mn(c.template, n), Xn(c, n), ts(c, n));
  }), console.log(`Found ${Ie}${gt}${E} Vue files`), t += On(), t += jn(), t += Ln(), t += Fn(), t += Nn(), t += Tn(), t += kn(), t += zn(), t += Un(), t += Hn(), t += ns(), t += dn(), t += $n(), t += Cn(), t += yn(), t += rs(), t += cs(), t += as(), t || console.log(`${pn}No code smells detected!${E}`);
};
Nt(Ut(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    us(e.path);
  }
).help().argv;
