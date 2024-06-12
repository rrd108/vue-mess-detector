import yt from "yargs";
import { format as Xe, inspect as Et } from "util";
import Te, { normalize as At, resolve as Z, dirname as Fe, basename as _t, extname as wt, relative as Ct } from "path";
import Re, { readFileSync as Ie, statSync as Je, readdirSync as Ot, writeFile as xt } from "fs";
import { notStrictEqual as jt, strictEqual as St } from "assert";
import { fileURLToPath as Nt } from "url";
import { parse as vt } from "@vue/compiler-sfc";
class ue extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ue);
  }
}
function ke() {
  return Ft() ? 0 : 1;
}
function Ft() {
  return Rt() && !process.defaultApp;
}
function Rt() {
  return !!process.versions.electron;
}
function Lt(e) {
  return e.slice(ke() + 1);
}
function Wt() {
  return process.argv[ke()];
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
    for (let f = c ? c[0].length : 0; f < e.length; f++) {
      let p = e.charAt(f);
      i && (i = !1, p = p.toUpperCase()), f !== 0 && (p === "-" || p === "_") ? i = !0 : p !== "-" && p !== "_" && (n += p);
    }
    return n;
  }
}
function et(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const f = n.charAt(c), p = e.charAt(c);
    f !== p && c > 0 ? i += `${t}${n.charAt(c)}` : i += p;
  }
  return i;
}
function tt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Pt(e) {
  if (Array.isArray(e))
    return e.map((p) => typeof p != "string" ? p + "" : p);
  e = e.trim();
  let t = 0, n = null, i = null, c = null;
  const f = [];
  for (let p = 0; p < e.length; p++) {
    if (n = i, i = e.charAt(p), i === " " && !c) {
      n !== " " && t++;
      continue;
    }
    i === c ? c = null : (i === "'" || i === '"') && !c && (c = i), f[t] || (f[t] = ""), f[t] += i;
  }
  return f;
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
class Bt {
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
    }, n), c = Pt(t), f = typeof t == "string", p = Tt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), d = Object.assign({
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
    }, i.configuration), A = Object.assign(/* @__PURE__ */ Object.create(null), i.default), v = i.configObjects || [], w = i.envPrefix, B = d["populate--"], G = B ? "--" : "_", ge = /* @__PURE__ */ Object.create(null), ze = /* @__PURE__ */ Object.create(null), U = i.__ || I.format, a = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, we = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(i.array || []).filter(Boolean).forEach(function(s) {
      const r = typeof s == "object" ? s.key : s, u = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      u && (a[u][r] = !0), a.arrays[r] = !0, a.keys.push(r);
    }), [].concat(i.boolean || []).filter(Boolean).forEach(function(s) {
      a.bools[s] = !0, a.keys.push(s);
    }), [].concat(i.string || []).filter(Boolean).forEach(function(s) {
      a.strings[s] = !0, a.keys.push(s);
    }), [].concat(i.number || []).filter(Boolean).forEach(function(s) {
      a.numbers[s] = !0, a.keys.push(s);
    }), [].concat(i.count || []).filter(Boolean).forEach(function(s) {
      a.counts[s] = !0, a.keys.push(s);
    }), [].concat(i.normalize || []).filter(Boolean).forEach(function(s) {
      a.normalize[s] = !0, a.keys.push(s);
    }), typeof i.narg == "object" && Object.entries(i.narg).forEach(([s, r]) => {
      typeof r == "number" && (a.nargs[s] = r, a.keys.push(s));
    }), typeof i.coerce == "object" && Object.entries(i.coerce).forEach(([s, r]) => {
      typeof r == "function" && (a.coercions[s] = r, a.keys.push(s));
    }), typeof i.config < "u" && (Array.isArray(i.config) || typeof i.config == "string" ? [].concat(i.config).filter(Boolean).forEach(function(s) {
      a.configs[s] = !0;
    }) : typeof i.config == "object" && Object.entries(i.config).forEach(([s, r]) => {
      (typeof r == "boolean" || typeof r == "function") && (a.configs[s] = r);
    })), ht(i.key, p, i.default, a.arrays), Object.keys(A).forEach(function(s) {
      (a.aliases[s] || []).forEach(function(r) {
        A[r] = A[s];
      });
    });
    let R = null;
    bt();
    let de = [];
    const C = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Me = {};
    for (let s = 0; s < c.length; s++) {
      const r = c[s], u = r.replace(/^-{3,}/, "---");
      let l, o, g, h, m, O;
      if (r !== "--" && /^-/.test(r) && ye(r))
        Ce(r);
      else if (u.match(/^---+(=|$)/)) {
        Ce(r);
        continue;
      } else if (r.match(/^--.+=/) || !d["short-option-groups"] && r.match(/^-.+=/))
        h = r.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], a.arrays) ? s = $e(s, h[1], c, h[2]) : b(h[1], a.nargs) !== !1 ? s = me(s, h[1], c, h[2]) : E(h[1], h[2], !0));
      else if (r.match(we) && d["boolean-negation"])
        h = r.match(we), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], E(o, b(o, a.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !d["short-option-groups"] && r.match(/^-[^-]+/))
        h = r.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], b(o, a.arrays) ? s = $e(s, o, c) : b(o, a.nargs) !== !1 ? s = me(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, a.bools) && !b(o, a.counts) || /^(true|false)$/.test(m) ? (E(o, m), s++) : E(o, Q(o))));
      else if (r.match(/^-.\..+=/))
        h = r.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && E(h[1], h[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[s + 1], h = r.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], m !== void 0 && !m.match(/^-/) && !b(o, a.bools) && !b(o, a.counts) ? (E(o, m), s++) : E(o, Q(o)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        g = r.slice(1, -1).split(""), l = !1;
        for (let x = 0; x < g.length; x++) {
          if (m = r.slice(x + 2), g[x + 1] && g[x + 1] === "=") {
            O = r.slice(x + 3), o = g[x], b(o, a.arrays) ? s = $e(s, o, c, O) : b(o, a.nargs) !== !1 ? s = me(s, o, c, O) : E(o, O), l = !0;
            break;
          }
          if (m === "-") {
            E(g[x], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[x]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && b(m, a.bools) === !1) {
            E(g[x], m), l = !0;
            break;
          }
          if (g[x + 1] && g[x + 1].match(/\W/)) {
            E(g[x], m), l = !0;
            break;
          } else
            E(g[x], Q(g[x]));
        }
        o = r.slice(-1)[0], !l && o !== "-" && (b(o, a.arrays) ? s = $e(s, o, c) : b(o, a.nargs) !== !1 ? s = me(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, a.bools) && !b(o, a.counts) || /^(true|false)$/.test(m) ? (E(o, m), s++) : E(o, Q(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && b(r.slice(1), a.bools))
        o = r.slice(1), E(o, Q(o));
      else if (r === "--") {
        de = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        de = c.slice(s);
        break;
      } else
        Ce(r);
    }
    Ge(C, !0), Ge(C, !1), lt(C), at(), Ue(C, a.aliases, A, !0), ft(C), d["set-placeholder-key"] && ut(C), Object.keys(a.counts).forEach(function(s) {
      Y(C, s.split(".")) || E(s, 0);
    }), B && de.length && (C[G] = []), de.forEach(function(s) {
      C[G].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(C).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete C[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(p).map((s) => p[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete C[s.split(".").map((r) => X(r)).join(".")], delete C[s];
    });
    function Ce(s) {
      const r = be("_", s);
      (typeof r == "string" || typeof r == "number") && C._.push(r);
    }
    function me(s, r, u, l) {
      let o, g = b(r, a.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return T(l) || (R = Error(U("Argument unexpected for: %s", r))), E(r, Q(r)), s;
      let h = T(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + h < g && (R = Error(U("Not enough arguments following: %s", r))), h = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(P) || ye(u[o])); o++)
          h++;
        h < g && (R = Error(U("Not enough arguments following: %s", r)));
      }
      let m = Math.min(h, g);
      for (!T(l) && m > 0 && (E(r, l), m--), o = s + 1; o < m + s + 1; o++)
        E(r, u[o]);
      return s + m;
    }
    function $e(s, r, u, l) {
      let o = [], g = l || u[s + 1];
      const h = b(r, a.nargs);
      if (b(r, a.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (T(g) || T(l) && /^-/.test(g) && !P.test(g) && !ye(g)) {
        if (A[r] !== void 0) {
          const m = A[r];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        T(l) || o.push(Oe(r, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (g = u[m], /^-/.test(g) && !P.test(g) && !ye(g))); m++)
          s = m, o.push(Oe(r, g, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (R = Error(U("Not enough arguments following: %s", r))), E(r, o), s;
    }
    function E(s, r, u = f) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(h) {
          return X(h);
        }).join(".");
        Ve(s, g);
      }
      const l = Oe(s, r, u), o = s.split(".");
      H(C, o, l), a.aliases[s] && a.aliases[s].forEach(function(g) {
        const h = g.split(".");
        H(C, h, l);
      }), o.length > 1 && d["dot-notation"] && (a.aliases[o[0]] || []).forEach(function(g) {
        let h = g.split(".");
        const m = [].concat(o);
        m.shift(), h = h.concat(m), (a.aliases[s] || []).includes(h.join(".")) || H(C, h, l);
      }), b(s, a.normalize) && !b(s, a.arrays) && [s].concat(a.aliases[s] || []).forEach(function(h) {
        Object.defineProperty(Me, h, {
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
    function Ve(s, r) {
      a.aliases[s] && a.aliases[s].length || (a.aliases[s] = [r], ge[r] = !0), a.aliases[r] && a.aliases[r].length || Ve(r, s);
    }
    function Oe(s, r, u) {
      u && (r = It(r)), (b(s, a.bools) || b(s, a.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(o) {
        return be(s, o);
      }) : be(s, r);
      return b(s, a.counts) && (T(l) || typeof l == "boolean") && (l = je()), b(s, a.normalize) && b(s, a.arrays) && (Array.isArray(r) ? l = r.map((o) => I.normalize(o)) : l = I.normalize(r)), l;
    }
    function be(s, r) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, a.strings) && !b(s, a.bools) && !Array.isArray(r) && (tt(r) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !T(r) && b(s, a.numbers)) && (r = Number(r)), r;
    }
    function lt(s) {
      const r = /* @__PURE__ */ Object.create(null);
      Ue(r, a.aliases, A), Object.keys(a.configs).forEach(function(u) {
        const l = s[u] || r[u];
        if (l)
          try {
            let o = null;
            const g = I.resolve(I.cwd(), l), h = a.configs[u];
            if (typeof h == "function") {
              try {
                o = h(g);
              } catch (m) {
                o = m;
              }
              if (o instanceof Error) {
                R = o;
                return;
              }
            } else
              o = I.require(g);
            xe(o);
          } catch (o) {
            o.name === "PermissionDenied" ? R = o : s[u] && (R = Error(U("Invalid JSON config file: %s", l)));
          }
      });
    }
    function xe(s, r) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = r ? r + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? xe(l, o) : (!Y(C, o.split(".")) || b(o, a.arrays) && d["combine-arrays"]) && E(o, l);
      });
    }
    function at() {
      typeof v < "u" && v.forEach(function(s) {
        xe(s);
      });
    }
    function Ge(s, r) {
      if (typeof w > "u")
        return;
      const u = typeof w == "string" ? w : "", l = I.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(h, m) {
            return m === 0 && (h = h.substring(u.length)), X(h);
          });
          (r && a.configs[g.join(".")] || !r) && !Y(s, g) && E(g.join("."), l[o]);
        }
      });
    }
    function ft(s) {
      let r;
      const u = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!u.has(l) && (r = b(l, a.coercions), typeof r == "function"))
          try {
            const o = be(l, r(s[l]));
            [].concat(a.aliases[l] || [], l).forEach((g) => {
              u.add(g), s[g] = o;
            });
          } catch (o) {
            R = o;
          }
      });
    }
    function ut(s) {
      return a.keys.forEach((r) => {
        ~r.indexOf(".") || typeof s[r] > "u" && (s[r] = void 0);
      }), s;
    }
    function Ue(s, r, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        Y(s, o.split(".")) || (H(s, o.split("."), u[o]), l && (ze[o] = !0), (r[o] || []).forEach(function(g) {
          Y(s, g.split(".")) || H(s, g.split("."), u[o]);
        }));
      });
    }
    function Y(s, r) {
      let u = s;
      d["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(o) {
        u = u[o] || {};
      });
      const l = r[r.length - 1];
      return typeof u != "object" ? !1 : l in u;
    }
    function H(s, r, u) {
      let l = s;
      d["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(O) {
        O = qe(O), typeof l == "object" && l[O] === void 0 && (l[O] = {}), typeof l[O] != "object" || Array.isArray(l[O]) ? (Array.isArray(l[O]) ? l[O].push({}) : l[O] = [l[O], {}], l = l[O][l[O].length - 1]) : l = l[O];
      });
      const o = qe(r[r.length - 1]), g = b(r.join("."), a.arrays), h = Array.isArray(u);
      let m = d["duplicate-arguments-array"];
      !m && b(o, a.nargs) && (m = !0, (!T(l[o]) && a.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === a.nargs[o]) && (l[o] = void 0)), u === je() ? l[o] = je(l[o]) : Array.isArray(l[o]) ? m && g && h ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!h ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = h ? u : [u] : m && !(l[o] === void 0 || b(o, a.counts) || b(o, a.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function ht(...s) {
      s.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          a.aliases[u] || (a.aliases[u] = [].concat(p[u] || []), a.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== u && a.aliases[u].indexOf(o) === -1 && (a.aliases[u].push(o), ge[o] = !0);
            }
          }), a.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = et(l, "-");
              o !== u && a.aliases[u].indexOf(o) === -1 && (a.aliases[u].push(o), ge[o] = !0);
            }
          }), a.aliases[u].forEach(function(l) {
            a.aliases[l] = [u].concat(a.aliases[u].filter(function(o) {
              return l !== o;
            }));
          }));
        });
      });
    }
    function b(s, r) {
      const u = [].concat(a.aliases[s] || [], s), l = Object.keys(r), o = u.find((g) => l.includes(g));
      return o ? r[o] : !1;
    }
    function De(s) {
      const r = Object.keys(a);
      return [].concat(r.map((l) => a[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function pt(s, ...r) {
      return [].concat(...r).some(function(l) {
        const o = s.match(l);
        return o && De(o[1]);
      });
    }
    function gt(s) {
      if (s.match(P) || !s.match(/^-[^-]+/))
        return !1;
      let r = !0, u;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (u = s.slice(o + 2), !De(l[o])) {
          r = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return r;
    }
    function ye(s) {
      return d["unknown-options-as-args"] && dt(s);
    }
    function dt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || gt(s) ? !1 : !pt(s, /^-+([^=]+?)=[\s\S]*$/, we, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function Q(s) {
      return !b(s, a.bools) && !b(s, a.counts) && `${s}` in A ? A[s] : mt($t(s));
    }
    function mt(s) {
      return {
        [W.BOOLEAN]: !0,
        [W.STRING]: "",
        [W.NUMBER]: void 0,
        [W.ARRAY]: []
      }[s];
    }
    function $t(s) {
      let r = W.BOOLEAN;
      return b(s, a.strings) ? r = W.STRING : b(s, a.numbers) ? r = W.NUMBER : b(s, a.bools) ? r = W.BOOLEAN : b(s, a.arrays) && (r = W.ARRAY), r;
    }
    function T(s) {
      return s === void 0;
    }
    function bt() {
      Object.keys(a.counts).find((s) => b(s, a.arrays) ? (R = Error(U("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, a.nargs) ? (R = Error(U("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(Me, C),
      configuration: d,
      defaulted: Object.assign({}, ze),
      error: R,
      newAliases: Object.assign({}, ge)
    };
  }
}
function Tt(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let i = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); i; ) {
    i = !1;
    for (let c = 0; c < t.length; c++)
      for (let f = c + 1; f < t.length; f++)
        if (t[c].filter(function(d) {
          return t[f].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[f]), t.splice(f, 1), i = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(p, d, A) {
      return A.indexOf(p) === d;
    });
    const f = c.pop();
    f !== void 0 && typeof f == "string" && (n[f] = c);
  }), n;
}
function je(e) {
  return e !== void 0 ? e + 1 : 1;
}
function qe(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function It(e) {
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
var Se, Ne, ve;
const Qe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Ke = (Ne = (Se = process == null ? void 0 : process.versions) === null || Se === void 0 ? void 0 : Se.node) !== null && Ne !== void 0 ? Ne : (ve = process == null ? void 0 : process.version) === null || ve === void 0 ? void 0 : ve.slice(1);
if (Ke && Number(Ke.match(/^([^.]+)/)[1]) < Qe)
  throw Error(`yargs parser supports a minimum Node.js version of ${Qe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const zt = process ? process.env : {}, nt = new Bt({
  cwd: process.cwd,
  env: () => zt,
  format: Xe,
  normalize: At,
  resolve: Z,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Ie(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), pe = function(t, n) {
  return nt.parse(t.slice(), n).argv;
};
pe.detailed = function(e, t) {
  return nt.parse(e.slice(), t);
};
pe.camelCase = X;
pe.decamelize = et;
pe.looksLikeNumber = tt;
const Mt = {
  right: Qt,
  center: Kt
}, Vt = 0, Ee = 1, Gt = 2, Ae = 3;
class Ut {
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
      c.length > 1 && F.stringWidth(c[0]) > i && (i = Math.min(Math.floor(this.width * 0.5), F.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((f, p) => ({
        text: f.trim(),
        padding: this.measurePadding(f),
        width: p === 0 && c.length > 1 ? i : void 0
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
    const n = F.stripAnsi(t);
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
      let f = "";
      i.forEach((p, d) => {
        const { width: A } = t[d], v = this.negatePadding(t[d]);
        let w = p;
        if (v > F.stringWidth(p) && (w += " ".repeat(v - F.stringWidth(p))), t[d].align && t[d].align !== "left" && this.wrap) {
          const G = Mt[t[d].align];
          w = G(w, v), F.stringWidth(w) < v && (w += " ".repeat((A || 0) - F.stringWidth(w) - 1));
        }
        const B = t[d].padding || [0, 0, 0, 0];
        B[Ae] && (f += " ".repeat(B[Ae])), f += Ze(t[d], w, "| "), f += w, f += Ze(t[d], w, " |"), B[Ee] && (f += " ".repeat(B[Ee])), c === 0 && n.length > 0 && (f = this.renderInline(f, n[n.length - 1]));
      }), n.push({
        text: f.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const i = t.match(/^ */), c = i ? i[0].length : 0, f = n.text, p = F.stringWidth(f.trimRight());
    return n.span ? this.wrap ? c < p ? t : (n.hidden = !0, f.trimRight() + " ".repeat(c - p) + t.trimLeft()) : (n.hidden = !0, f + t) : t;
  }
  rasterize(t) {
    const n = [], i = this.columnWidths(t);
    let c;
    return t.forEach((f, p) => {
      f.width = i[p], this.wrap ? c = F.wrap(f.text, this.negatePadding(f), { hard: !0 }).split(`
`) : c = f.text.split(`
`), f.border && (c.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (c.unshift(...new Array(f.padding[Vt] || 0).fill("")), c.push(...new Array(f.padding[Gt] || 0).fill(""))), c.forEach((d, A) => {
        n[A] || n.push([]);
        const v = n[A];
        for (let w = 0; w < p; w++)
          v[w] === void 0 && v.push("");
        v.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ae] || 0) + (t.padding[Ee] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || F.stringWidth(p.text));
    let n = t.length, i = this.width;
    const c = t.map((p) => {
      if (p.width)
        return n--, i -= p.width, p.width;
    }), f = n ? Math.floor(i / n) : 0;
    return c.map((p, d) => p === void 0 ? Math.max(f, Dt(t[d])) : p);
  }
}
function Ze(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Dt(e) {
  const t = e.padding || [], n = 1 + (t[Ae] || 0) + (t[Ee] || 0);
  return e.border ? n + 4 : n;
}
function qt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Qt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Kt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let F;
function Zt(e, t) {
  return F = t, new Ut({
    width: e?.width || qt(),
    wrap: e?.wrap
  });
}
const st = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ot(e) {
  return e.replace(st, "");
}
function Yt(e, t) {
  const [n, i] = e.match(st) || ["", ""];
  e = ot(e);
  let c = "";
  for (let f = 0; f < e.length; f++)
    f !== 0 && f % t === 0 && (c += `
`), c += e.charAt(f);
  return n && i && (c = `${n}${c}${i}`), c;
}
function Ht(e) {
  return Zt(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: ot,
    wrap: Yt
  });
}
function Xt(e, t) {
  let n = Z(".", e), i;
  for (Je(n).isDirectory() || (n = Fe(n)); ; ) {
    if (i = t(n, Ot(n)), i)
      return Z(n, i);
    if (n = Fe(i = n), i === n)
      break;
  }
}
const Jt = {
  fs: {
    readFileSync: Ie,
    writeFile: xt
  },
  format: Xe,
  resolve: Z,
  exists: (e) => {
    try {
      return Je(e).isFile();
    } catch {
      return !1;
    }
  }
};
let L;
class kt {
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
    })) : i(), L.format.apply(L.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), i = t.shift(), c = t.shift();
    let f = function() {
    };
    typeof t[t.length - 1] == "function" && (f = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = c === 1 ? n : i;
    this.cache[this.locale][n] && (p = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: i
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: f
    })) : f();
    const d = [p];
    return ~p.indexOf("%d") && d.push(c), L.format.apply(L.format, d.concat(t));
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
    return t.forEach(function(c, f) {
      const p = n[f + 1];
      i += c, typeof p < "u" && (i += "%s");
    }), this.__.apply(this, [i].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], i = n.directory, c = n.locale, f = n.cb, p = this._resolveLocaleFile(i, c), d = JSON.stringify(this.cache[c], null, 2);
    L.fs.writeFile(p, d, "utf-8", function(A) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), f(A);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      L.fs.readFileSync && (t = JSON.parse(L.fs.readFileSync(n, "utf-8")));
    } catch (i) {
      if (i instanceof SyntaxError && (i.message = "syntax error in " + n), i.code === "ENOENT")
        t = {};
      else
        throw i;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let i = L.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(i) && ~n.lastIndexOf("_")) {
      const c = L.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (i = c);
    }
    return i;
  }
  _fileExistsSync(t) {
    return L.exists(t);
  }
}
function en(e, t) {
  L = t;
  const n = new kt(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const tn = (e) => en(e, Jt), nn = "require is not supported by ESM", Ye = "loading a directory of commands is not supported yet for ESM";
let he;
try {
  he = Nt(import.meta.url);
} catch {
  he = process.cwd();
}
const sn = he.substring(0, he.lastIndexOf("node_modules"));
jt, St, Et, sn || process.cwd(), _t, Fe, wt, Ct, Z, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Ie, tn({
  directory: Z(he, "../../../locales"),
  updateFiles: !1
});
const Le = "\x1B[44m", q = "\x1B[43m", j = "\x1B[41m", on = "\x1B[42m", _ = "\x1B[0m", S = "\x1B[33m", N = "\x1B[36m", y = "\x1B[0m", We = 50, J = [], rn = (e, t) => {
  const n = e.content.split(`
`);
  n.length > We && J.push({ fileName: t, scriptLength: n.length });
}, cn = () => (J.length > 0 && (console.log(
  `
${N}rrd${y} ${j}Long <script> blocks${_} in ${J.length} files.`
), console.log(
  `👉 ${S}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${We} lines.${y}`
), J.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > We * 2 ? j : q}(${e.scriptLength} lines)${_}`
  );
})), J.length), k = [], ln = (e) => {
  k.push(e);
}, an = () => (k.length > 0 && (console.log(
  `
${N}rrd${y} ${q}Plain <script> blocks${_} in ${k.length} files.`
), console.log(`👉 ${S} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), k.forEach((e) => {
  console.log(`- ${e}`);
})), k.length), ee = [], fn = (e, t) => {
  const n = /\belse\b/gi, i = e.content.match(n);
  i?.length && ee.push({ fileName: t, elseCount: i.length });
}, un = () => (ee.length > 0 && (console.log(
  `
${N}rrd${y} ${q}else conditions${_} are used in ${ee.length} files.`
), console.log(`👉 ${S}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), ee.forEach((e) => {
  console.log(`- ${e.fileName} ${q}(${e.elseCount})${_}`);
})), ee.length), hn = 5, pn = 10, te = [], gn = (e, t) => {
  const n = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, f = /\bwhile\b/gi, p = /\bcase\b/gi, d = e.content.match(n), A = e.content.match(i), v = e.content.match(c), w = e.content.match(f), B = e.content.match(p), G = (d?.length || 0) + (A?.length || 0) + (v?.length || 0) + (w?.length || 0) + (B?.length || 0);
  G > hn && te.push({ fileName: t, cyclomaticComplexity: G });
}, dn = () => (te.length > 0 && (console.log(
  `
${N}rrd${y} ${Le}cyclomaticComplexity${_} is above moderate in ${te.length} files.`
), console.log(`👉 ${S}Try to reduce complexity.${y}`), te.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > pn ? j : q}(${e.cyclomaticComplexity})${_}`
  );
})), te.length), ne = [], mn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Te.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || ne.push({ filePath: e });
}, $n = () => (ne.length > 0 && (console.log(
  `
${N}vue-essential${y} ${j}single name component${_} is used in ${ne.length} files.`
), console.log(
  `👉 ${S}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], bn = (e, t) => {
  e.scoped || se.push({ filePath: t });
}, yn = () => (se.length > 0 && (console.log(
  `
${N}vue-essential${y} ${j}Global style ${_} is used in ${se.length} files.`
), console.log(
  `👉 ${S}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], En = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && oe.push({ filePath: t });
}, An = () => (oe.length > 0 && (console.log(
  `
${N}vue-essential${y} ${j}simple prop${_} is used in ${oe.length} files.`
), console.log(
  `👉 ${S}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], _n = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), f = e.content.match(i);
  (c?.length || f?.length) && re.push({ filePath: t });
}, wn = () => (re.length > 0 && (console.log(
  `
${N}vue-essential${y} ${j}v-if used with v-for${_} in ${re.length} files.`
), console.log(
  `👉 ${S}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], Cn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(n);
  i?.length && (i.some((f) => f.includes(":key")) || ie.push({ filePath: t }));
}, On = () => (ie.length > 0 && (console.log(
  `
${N}vue-essential${y} ${j}v-for has no key${_} in ${ie.length} files.`
), console.log(
  `👉 ${S}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), ie.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ie.length), ce = [], xn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = Te.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = t.match(c);
  !i?.length && !f?.length && ce.push({ fileName: e });
}, jn = () => (ce.length > 0 && (console.log(
  `
${N}vue-strong${y} ${j}component name is not PascalCase and not kebab-abse${_} in ${ce.length} files.`
), console.log(
  `👉 ${S}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ce.forEach((e) => {
  console.log(`- ${j}${e.fileName}${_}`);
})), ce.length), le = [], Sn = /^[a-z]+([A-Z][a-z]*)+$/, Nn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !Sn.test(f)).length && le.push({ filePath: t });
}, vn = () => (le.length > 0 && (console.log(
  `
${N}vue-strong${y} ${j}prop names are not camelCased${_} in ${le.length} files.`
), console.log(
  `👉 ${S}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), le.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), le.length), K = [], Fn = 40, Rn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    c.length > Fn && (K.some((f) => f.filePath === t) || K.push({ filePath: t }));
  });
}, Ln = () => (K.length > 0 && (console.log(
  `
${N}vue-strong${y} ${j}Lengthy template expression${_} found in ${K.length} files.`
), console.log(
  `👉 ${S}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), K.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), K.length), Wn = /^(\(.*\)|\\?.)$/;
function M(e) {
  const t = e.toString();
  return Wn.test(t) ? t : `(?:${t})`;
}
const Pn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Bn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Pn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => $(`${e}${z(...n)}`), {
      referenceTo: (n) => $(`${e}\\k<${n}>`)
    }),
    or: (...n) => $(`(?:${e}|${z(...n)})`),
    after: (...n) => $(`(?<=${z(...n)})${e}`),
    before: (...n) => $(`${e}(?=${z(...n)})`),
    notAfter: (...n) => $(`(?<!${z(...n)})${e}`),
    notBefore: (...n) => $(`${e}(?!${z(...n)})`),
    times: Object.assign((n) => $(`${M(e)}{${n}}`), {
      any: () => $(`${M(e)}*`),
      atLeast: (n) => $(`${M(e)}{${n},}`),
      atMost: (n) => $(`${M(e)}{0,${n}}`),
      between: (n, i) => $(`${M(e)}{${n},${i}}`)
    }),
    optionally: () => $(`${M(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => $(`${e}`.replace(Bn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Tn = /[.*+?^${}()|[\]\\/]/g;
function He(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Pe(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
$(".");
$("\\b\\w+\\b");
const _e = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const In = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), zn = $("\\t"), Mn = $("\\n");
$("\\r");
$("\\W+"), $("\\W"), $("\\B"), $("\\D"), $("\\S"), Object.assign($("[^a-zA-Z]"), {
  lowercase: $("[^a-z]"),
  uppercase: $("[^A-Z]")
}), $("[^\\t]"), $("[^\\n]"), $("[^\\r]");
function D(...e) {
  return $(`${M(z(...e))}?`);
}
function z(...e) {
  return $(
    e.map((t) => typeof t == "string" ? t.replace(Tn, "\\$&") : t).join("")
  );
}
function V(...e) {
  return $(`${M(z(...e))}+`);
}
const Be = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, rt = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((p) => p.includes(t)) + 1;
  const n = e.indexOf(t), i = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return i + c - 1;
}, ae = [], Vn = (e, t) => {
  const n = e.template, i = Be(
    "<",
    V(_e),
    D(V(He(` 	
\r`))),
    V(Pe("/>")),
    D(V(He(` 	
\r`))),
    D("/"),
    ">",
    ["g"]
  ), c = n.content.match(i);
  if (c === null)
    return;
  const f = Be(":", V(_e), D(" "), "=", D(" "), Pe(`'"`), [
    "g"
  ]);
  c.forEach((p) => {
    if (!p.includes(":"))
      return;
    const d = p.match(f);
    if (d?.length) {
      const A = rt(e.source, p);
      ae.push({ message: `${t}#${A} ${q}${d}${_}` });
    }
  });
}, Gn = () => (ae.length > 0 && (console.log(
  `
${N}vue-strong${y} ${j}Attribute value is not quoted${_} in ${ae.length} files.`
), console.log(
  `👉 ${S}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), fe = [], Un = (e, t) => {
  const n = e.template, i = Be(
    "<",
    V(In.uppercase, _e),
    D(Mn, zn),
    D(V(Pe(">"))),
    "></",
    V(_e),
    ">",
    ["g"]
  ), c = n.content.match(i);
  c !== null && c.forEach((f) => {
    const p = rt(e.source, f), d = f.split(`
`).at(-1)?.trim() || "";
    fe.push({ message: `${t}#${p} ${q}${d}${_}` });
  });
}, Dn = () => (fe.length > 0 && (console.log(
  `
${N}vue-strong${y} - ${j}Component is not self closing${_} in ${fe.length} files.`
), console.log(
  `👉 ${S}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length);
let it = 0;
const qn = [
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
], ct = (e, t) => {
  const n = Re.readdirSync(e);
  it += n.length;
  for (const i of n) {
    const c = Te.join(e, i);
    Re.statSync(c).isDirectory() ? qn.some((f) => c.includes(f)) && ct(c, t) : i.endsWith(".vue") && t(c);
  }
}, Qn = (e) => {
  console.log(`

${Le}Analyzing Vue files in ${e}${_}`);
  let t = 0;
  ct(e, (n) => {
    const i = Re.readFileSync(n, "utf-8"), { descriptor: c } = vt(i);
    mn(n), xn(n), c.script && ln(n);
    const f = c.scriptSetup || c.script;
    f && (En(f, n), Nn(f, n), rn(f, n), gn(f, n), fn(f, n)), c.styles.forEach((p) => {
      bn(p, n);
    }), c.template && (Cn(c.template, n), _n(c.template, n), Un(c, n), Rn(c.template, n), Vn(c, n));
  }), console.log(`Found ${Le}${it}${_} Vue files`), t += $n(), t += An(), t += On(), t += wn(), t += yn(), t += jn(), t += Dn(), t += vn(), t += Ln(), t += Gn(), t += cn(), t += an(), t += dn(), t += un(), t || console.log(`${on}No code smells detected!${_}`);
};
yt(Lt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    Qn(e.path);
  }
).help().argv;
