import At from "yargs";
import { format as et, inspect as _t } from "util";
import ze, { normalize as wt, resolve as Z, dirname as Re, basename as Ct, extname as Ot, relative as xt } from "path";
import Le, { readFileSync as Me, statSync as tt, readdirSync as jt, writeFile as St } from "fs";
import { notStrictEqual as vt, strictEqual as Nt } from "assert";
import { fileURLToPath as Ft } from "url";
import { parse as Rt } from "@vue/compiler-sfc";
class ue extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ue);
  }
}
function nt() {
  return Lt() ? 0 : 1;
}
function Lt() {
  return Wt() && !process.defaultApp;
}
function Wt() {
  return !!process.versions.electron;
}
function Pt(e) {
  return e.slice(nt() + 1);
}
function Tt() {
  return process.argv[nt()];
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
function st(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const f = n.charAt(c), p = e.charAt(c);
    f !== p && c > 0 ? i += `${t}${n.charAt(c)}` : i += p;
  }
  return i;
}
function ot(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Bt(e) {
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
class It {
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
    }, n), c = Bt(t), f = typeof t == "string", p = zt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), d = Object.assign({
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
    }, i.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), i.default), N = i.configObjects || [], w = i.envPrefix, T = d["populate--"], V = T ? "--" : "_", ge = /* @__PURE__ */ Object.create(null), Ue = /* @__PURE__ */ Object.create(null), G = i.__ || I.format, a = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ce = new RegExp("^--" + d["negation-prefix"] + "(.+)");
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
    })), gt(i.key, p, i.default, a.arrays), Object.keys(_).forEach(function(s) {
      (a.aliases[s] || []).forEach(function(r) {
        _[r] = _[s];
      });
    });
    let R = null;
    Et();
    let de = [];
    const C = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ve = {};
    for (let s = 0; s < c.length; s++) {
      const r = c[s], u = r.replace(/^-{3,}/, "---");
      let l, o, g, h, m, O;
      if (r !== "--" && /^-/.test(r) && ye(r))
        Oe(r);
      else if (u.match(/^---+(=|$)/)) {
        Oe(r);
        continue;
      } else if (r.match(/^--.+=/) || !d["short-option-groups"] && r.match(/^-.+=/))
        h = r.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], a.arrays) ? s = $e(s, h[1], c, h[2]) : b(h[1], a.nargs) !== !1 ? s = me(s, h[1], c, h[2]) : A(h[1], h[2], !0));
      else if (r.match(Ce) && d["boolean-negation"])
        h = r.match(Ce), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], A(o, b(o, a.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !d["short-option-groups"] && r.match(/^-[^-]+/))
        h = r.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], b(o, a.arrays) ? s = $e(s, o, c) : b(o, a.nargs) !== !1 ? s = me(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, a.bools) && !b(o, a.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      else if (r.match(/^-.\..+=/))
        h = r.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && A(h[1], h[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[s + 1], h = r.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], m !== void 0 && !m.match(/^-/) && !b(o, a.bools) && !b(o, a.counts) ? (A(o, m), s++) : A(o, Q(o)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        g = r.slice(1, -1).split(""), l = !1;
        for (let x = 0; x < g.length; x++) {
          if (m = r.slice(x + 2), g[x + 1] && g[x + 1] === "=") {
            O = r.slice(x + 3), o = g[x], b(o, a.arrays) ? s = $e(s, o, c, O) : b(o, a.nargs) !== !1 ? s = me(s, o, c, O) : A(o, O), l = !0;
            break;
          }
          if (m === "-") {
            A(g[x], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[x]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && b(m, a.bools) === !1) {
            A(g[x], m), l = !0;
            break;
          }
          if (g[x + 1] && g[x + 1].match(/\W/)) {
            A(g[x], m), l = !0;
            break;
          } else
            A(g[x], Q(g[x]));
        }
        o = r.slice(-1)[0], !l && o !== "-" && (b(o, a.arrays) ? s = $e(s, o, c) : b(o, a.nargs) !== !1 ? s = me(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, a.bools) && !b(o, a.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && b(r.slice(1), a.bools))
        o = r.slice(1), A(o, Q(o));
      else if (r === "--") {
        de = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        de = c.slice(s);
        break;
      } else
        Oe(r);
    }
    qe(C, !0), qe(C, !1), ft(C), ut(), Qe(C, a.aliases, _, !0), ht(C), d["set-placeholder-key"] && pt(C), Object.keys(a.counts).forEach(function(s) {
      Y(C, s.split(".")) || A(s, 0);
    }), T && de.length && (C[V] = []), de.forEach(function(s) {
      C[V].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(C).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete C[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(p).map((s) => p[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete C[s.split(".").map((r) => X(r)).join(".")], delete C[s];
    });
    function Oe(s) {
      const r = be("_", s);
      (typeof r == "string" || typeof r == "number") && C._.push(r);
    }
    function me(s, r, u, l) {
      let o, g = b(r, a.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return B(l) || (R = Error(G("Argument unexpected for: %s", r))), A(r, Q(r)), s;
      let h = B(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + h < g && (R = Error(G("Not enough arguments following: %s", r))), h = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(P) || ye(u[o])); o++)
          h++;
        h < g && (R = Error(G("Not enough arguments following: %s", r)));
      }
      let m = Math.min(h, g);
      for (!B(l) && m > 0 && (A(r, l), m--), o = s + 1; o < m + s + 1; o++)
        A(r, u[o]);
      return s + m;
    }
    function $e(s, r, u, l) {
      let o = [], g = l || u[s + 1];
      const h = b(r, a.nargs);
      if (b(r, a.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (B(g) || B(l) && /^-/.test(g) && !P.test(g) && !ye(g)) {
        if (_[r] !== void 0) {
          const m = _[r];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        B(l) || o.push(xe(r, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (g = u[m], /^-/.test(g) && !P.test(g) && !ye(g))); m++)
          s = m, o.push(xe(r, g, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (R = Error(G("Not enough arguments following: %s", r))), A(r, o), s;
    }
    function A(s, r, u = f) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(h) {
          return X(h);
        }).join(".");
        Ge(s, g);
      }
      const l = xe(s, r, u), o = s.split(".");
      H(C, o, l), a.aliases[s] && a.aliases[s].forEach(function(g) {
        const h = g.split(".");
        H(C, h, l);
      }), o.length > 1 && d["dot-notation"] && (a.aliases[o[0]] || []).forEach(function(g) {
        let h = g.split(".");
        const m = [].concat(o);
        m.shift(), h = h.concat(m), (a.aliases[s] || []).includes(h.join(".")) || H(C, h, l);
      }), b(s, a.normalize) && !b(s, a.arrays) && [s].concat(a.aliases[s] || []).forEach(function(h) {
        Object.defineProperty(Ve, h, {
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
    function Ge(s, r) {
      a.aliases[s] && a.aliases[s].length || (a.aliases[s] = [r], ge[r] = !0), a.aliases[r] && a.aliases[r].length || Ge(r, s);
    }
    function xe(s, r, u) {
      u && (r = Mt(r)), (b(s, a.bools) || b(s, a.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(o) {
        return be(s, o);
      }) : be(s, r);
      return b(s, a.counts) && (B(l) || typeof l == "boolean") && (l = Se()), b(s, a.normalize) && b(s, a.arrays) && (Array.isArray(r) ? l = r.map((o) => I.normalize(o)) : l = I.normalize(r)), l;
    }
    function be(s, r) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, a.strings) && !b(s, a.bools) && !Array.isArray(r) && (ot(r) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !B(r) && b(s, a.numbers)) && (r = Number(r)), r;
    }
    function ft(s) {
      const r = /* @__PURE__ */ Object.create(null);
      Qe(r, a.aliases, _), Object.keys(a.configs).forEach(function(u) {
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
            je(o);
          } catch (o) {
            o.name === "PermissionDenied" ? R = o : s[u] && (R = Error(G("Invalid JSON config file: %s", l)));
          }
      });
    }
    function je(s, r) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = r ? r + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? je(l, o) : (!Y(C, o.split(".")) || b(o, a.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function ut() {
      typeof N < "u" && N.forEach(function(s) {
        je(s);
      });
    }
    function qe(s, r) {
      if (typeof w > "u")
        return;
      const u = typeof w == "string" ? w : "", l = I.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(h, m) {
            return m === 0 && (h = h.substring(u.length)), X(h);
          });
          (r && a.configs[g.join(".")] || !r) && !Y(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function ht(s) {
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
    function pt(s) {
      return a.keys.forEach((r) => {
        ~r.indexOf(".") || typeof s[r] > "u" && (s[r] = void 0);
      }), s;
    }
    function Qe(s, r, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        Y(s, o.split(".")) || (H(s, o.split("."), u[o]), l && (Ue[o] = !0), (r[o] || []).forEach(function(g) {
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
        O = Ze(O), typeof l == "object" && l[O] === void 0 && (l[O] = {}), typeof l[O] != "object" || Array.isArray(l[O]) ? (Array.isArray(l[O]) ? l[O].push({}) : l[O] = [l[O], {}], l = l[O][l[O].length - 1]) : l = l[O];
      });
      const o = Ze(r[r.length - 1]), g = b(r.join("."), a.arrays), h = Array.isArray(u);
      let m = d["duplicate-arguments-array"];
      !m && b(o, a.nargs) && (m = !0, (!B(l[o]) && a.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === a.nargs[o]) && (l[o] = void 0)), u === Se() ? l[o] = Se(l[o]) : Array.isArray(l[o]) ? m && g && h ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!h ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = h ? u : [u] : m && !(l[o] === void 0 || b(o, a.counts) || b(o, a.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function gt(...s) {
      s.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          a.aliases[u] || (a.aliases[u] = [].concat(p[u] || []), a.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== u && a.aliases[u].indexOf(o) === -1 && (a.aliases[u].push(o), ge[o] = !0);
            }
          }), a.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = st(l, "-");
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
    function Ke(s) {
      const r = Object.keys(a);
      return [].concat(r.map((l) => a[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function dt(s, ...r) {
      return [].concat(...r).some(function(l) {
        const o = s.match(l);
        return o && Ke(o[1]);
      });
    }
    function mt(s) {
      if (s.match(P) || !s.match(/^-[^-]+/))
        return !1;
      let r = !0, u;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (u = s.slice(o + 2), !Ke(l[o])) {
          r = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return r;
    }
    function ye(s) {
      return d["unknown-options-as-args"] && $t(s);
    }
    function $t(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || mt(s) ? !1 : !dt(s, /^-+([^=]+?)=[\s\S]*$/, Ce, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function Q(s) {
      return !b(s, a.bools) && !b(s, a.counts) && `${s}` in _ ? _[s] : bt(yt(s));
    }
    function bt(s) {
      return {
        [W.BOOLEAN]: !0,
        [W.STRING]: "",
        [W.NUMBER]: void 0,
        [W.ARRAY]: []
      }[s];
    }
    function yt(s) {
      let r = W.BOOLEAN;
      return b(s, a.strings) ? r = W.STRING : b(s, a.numbers) ? r = W.NUMBER : b(s, a.bools) ? r = W.BOOLEAN : b(s, a.arrays) && (r = W.ARRAY), r;
    }
    function B(s) {
      return s === void 0;
    }
    function Et() {
      Object.keys(a.counts).find((s) => b(s, a.arrays) ? (R = Error(G("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, a.nargs) ? (R = Error(G("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(Ve, C),
      configuration: d,
      defaulted: Object.assign({}, Ue),
      error: R,
      newAliases: Object.assign({}, ge)
    };
  }
}
function zt(e) {
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
    c = c.filter(function(p, d, _) {
      return _.indexOf(p) === d;
    });
    const f = c.pop();
    f !== void 0 && typeof f == "string" && (n[f] = c);
  }), n;
}
function Se(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Ze(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Mt(e) {
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
var ve, Ne, Fe;
const Ye = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, He = (Ne = (ve = process == null ? void 0 : process.versions) === null || ve === void 0 ? void 0 : ve.node) !== null && Ne !== void 0 ? Ne : (Fe = process == null ? void 0 : process.version) === null || Fe === void 0 ? void 0 : Fe.slice(1);
if (He && Number(He.match(/^([^.]+)/)[1]) < Ye)
  throw Error(`yargs parser supports a minimum Node.js version of ${Ye}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Dt = process ? process.env : {}, rt = new It({
  cwd: process.cwd,
  env: () => Dt,
  format: et,
  normalize: wt,
  resolve: Z,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Me(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), pe = function(t, n) {
  return rt.parse(t.slice(), n).argv;
};
pe.detailed = function(e, t) {
  return rt.parse(e.slice(), t);
};
pe.camelCase = X;
pe.decamelize = st;
pe.looksLikeNumber = ot;
const Ut = {
  right: Zt,
  center: Yt
}, Vt = 0, Ee = 1, Gt = 2, Ae = 3;
class qt {
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
        const { width: _ } = t[d], N = this.negatePadding(t[d]);
        let w = p;
        if (N > F.stringWidth(p) && (w += " ".repeat(N - F.stringWidth(p))), t[d].align && t[d].align !== "left" && this.wrap) {
          const V = Ut[t[d].align];
          w = V(w, N), F.stringWidth(w) < N && (w += " ".repeat((_ || 0) - F.stringWidth(w) - 1));
        }
        const T = t[d].padding || [0, 0, 0, 0];
        T[Ae] && (f += " ".repeat(T[Ae])), f += Xe(t[d], w, "| "), f += w, f += Xe(t[d], w, " |"), T[Ee] && (f += " ".repeat(T[Ee])), c === 0 && n.length > 0 && (f = this.renderInline(f, n[n.length - 1]));
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
`), f.border && (c.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (c.unshift(...new Array(f.padding[Vt] || 0).fill("")), c.push(...new Array(f.padding[Gt] || 0).fill(""))), c.forEach((d, _) => {
        n[_] || n.push([]);
        const N = n[_];
        for (let w = 0; w < p; w++)
          N[w] === void 0 && N.push("");
        N.push(d);
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
    return c.map((p, d) => p === void 0 ? Math.max(f, Qt(t[d])) : p);
  }
}
function Xe(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Qt(e) {
  const t = e.padding || [], n = 1 + (t[Ae] || 0) + (t[Ee] || 0);
  return e.border ? n + 4 : n;
}
function Kt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Zt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Yt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let F;
function Ht(e, t) {
  return F = t, new qt({
    width: e?.width || Kt(),
    wrap: e?.wrap
  });
}
const it = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ct(e) {
  return e.replace(it, "");
}
function Xt(e, t) {
  const [n, i] = e.match(it) || ["", ""];
  e = ct(e);
  let c = "";
  for (let f = 0; f < e.length; f++)
    f !== 0 && f % t === 0 && (c += `
`), c += e.charAt(f);
  return n && i && (c = `${n}${c}${i}`), c;
}
function Jt(e) {
  return Ht(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: ct,
    wrap: Xt
  });
}
function kt(e, t) {
  let n = Z(".", e), i;
  for (tt(n).isDirectory() || (n = Re(n)); ; ) {
    if (i = t(n, jt(n)), i)
      return Z(n, i);
    if (n = Re(i = n), i === n)
      break;
  }
}
const en = {
  fs: {
    readFileSync: Me,
    writeFile: St
  },
  format: et,
  resolve: Z,
  exists: (e) => {
    try {
      return tt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let L;
class tn {
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
    L.fs.writeFile(p, d, "utf-8", function(_) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), f(_);
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
function nn(e, t) {
  L = t;
  const n = new tn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const sn = (e) => nn(e, en), on = "require is not supported by ESM", Je = "loading a directory of commands is not supported yet for ESM";
let he;
try {
  he = Ft(import.meta.url);
} catch {
  he = process.cwd();
}
const rn = he.substring(0, he.lastIndexOf("node_modules"));
vt, Nt, _t, rn || process.cwd(), Ct, Re, Ot, xt, Z, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Me, sn({
  directory: Z(he, "../../../locales"),
  updateFiles: !1
});
const We = "\x1B[44m", U = "\x1B[43m", j = "\x1B[41m", cn = "\x1B[42m", E = "\x1B[0m", S = "\x1B[33m", v = "\x1B[36m", y = "\x1B[0m", Pe = 50, J = [], ln = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Pe && J.push({ fileName: t, scriptLength: n.length });
}, an = () => (J.length > 0 && (console.log(
  `
${v}rrd${y} ${j}Long <script> blocks${E} in ${J.length} files.`
), console.log(
  `👉 ${S}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Pe} lines.${y}`
), J.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Pe * 2 ? j : U}(${e.scriptLength} lines)${E}`
  );
})), J.length), k = [], fn = (e) => {
  k.push(e);
}, un = () => (k.length > 0 && (console.log(
  `
${v}rrd${y} ${U}Plain <script> blocks${E} in ${k.length} files.`
), console.log(`👉 ${S} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), k.forEach((e) => {
  console.log(`- ${e}`);
})), k.length), ee = [], hn = (e, t) => {
  const n = /\belse\b/gi, i = e.content.match(n);
  i?.length && ee.push({ fileName: t, elseCount: i.length });
}, pn = () => (ee.length > 0 && (console.log(
  `
${v}rrd${y} ${U}else conditions${E} are used in ${ee.length} files.`
), console.log(`👉 ${S}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), ee.forEach((e) => {
  console.log(`- ${e.fileName} ${U}(${e.elseCount})${E}`);
})), ee.length), gn = 5, dn = 10, te = [], mn = (e, t) => {
  const n = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, f = /\bwhile\b/gi, p = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(i), N = e.content.match(c), w = e.content.match(f), T = e.content.match(p), V = (d?.length || 0) + (_?.length || 0) + (N?.length || 0) + (w?.length || 0) + (T?.length || 0);
  V > gn && te.push({ fileName: t, cyclomaticComplexity: V });
}, $n = () => (te.length > 0 && (console.log(
  `
${v}rrd${y} ${We}cyclomaticComplexity${E} is above moderate in ${te.length} files.`
), console.log(`👉 ${S}Try to reduce complexity.${y}`), te.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > dn ? j : U}(${e.cyclomaticComplexity})${E}`
  );
})), te.length), ne = [], bn = (e) => {
  if (e.includes("pages"))
    return;
  const t = ze.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || ne.push({ filePath: e });
}, yn = () => (ne.length > 0 && (console.log(
  `
${v}vue-essential${y} ${j}single name component${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${S}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], En = (e, t) => {
  e.scoped || se.push({ filePath: t });
}, An = () => (se.length > 0 && (console.log(
  `
${v}vue-essential${y} ${j}Global style ${E} is used in ${se.length} files.`
), console.log(
  `👉 ${S}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], _n = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && oe.push({ filePath: t });
}, wn = () => (oe.length > 0 && (console.log(
  `
${v}vue-essential${y} ${j}simple prop${E} is used in ${oe.length} files.`
), console.log(
  `👉 ${S}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], Cn = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), f = e.content.match(i);
  (c?.length || f?.length) && re.push({ filePath: t });
}, On = () => (re.length > 0 && (console.log(
  `
${v}vue-essential${y} ${j}v-if used with v-for${E} in ${re.length} files.`
), console.log(
  `👉 ${S}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], xn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(n);
  i?.length && (i.some((f) => f.includes(":key")) || ie.push({ filePath: t }));
}, jn = () => (ie.length > 0 && (console.log(
  `
${v}vue-essential${y} ${j}v-for has no key${E} in ${ie.length} files.`
), console.log(
  `👉 ${S}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), ie.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ie.length), ce = [], Sn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = ze.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = t.match(c);
  !i?.length && !f?.length && ce.push({ fileName: e });
}, vn = () => (ce.length > 0 && (console.log(
  `
${v}vue-strong${y} ${j}component name is not PascalCase and not kebab-abse${E} in ${ce.length} files.`
), console.log(
  `👉 ${S}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ce.forEach((e) => {
  console.log(`- ${j}${e.fileName}${E}`);
})), ce.length), le = [], Nn = /^[a-z]+([A-Z][a-z]*)+$/, Fn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !Nn.test(f)).length && le.push({ filePath: t });
}, Rn = () => (le.length > 0 && (console.log(
  `
${v}vue-strong${y} ${j}prop names are not camelCased${E} in ${le.length} files.`
), console.log(
  `👉 ${S}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), le.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), le.length), K = [], Ln = 40, Wn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    c.length > Ln && (K.some((f) => f.filePath === t) || K.push({ filePath: t }));
  });
}, Pn = () => (K.length > 0 && (console.log(
  `
${v}vue-strong${y} ${j}Lengthy template expression${E} found in ${K.length} files.`
), console.log(
  `👉 ${S}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), K.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), K.length), Tn = /^(\(.*\)|\\?.)$/;
function M(e) {
  const t = e.toString();
  return Tn.test(t) ? t : `(?:${t})`;
}
const Bn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, In = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Bn, "$1$2")})`);
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
    grouped: () => $(`${e}`.replace(In, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const zn = /[.*+?^${}()|[\]\\/]/g;
function ke(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Te(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
$(".");
$("\\b\\w+\\b");
const we = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Mn = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), Dn = $("\\t"), Un = $("\\n");
$("\\r");
$("\\W+"), $("\\W"), $("\\B"), $("\\D"), $("\\S"), Object.assign($("[^a-zA-Z]"), {
  lowercase: $("[^a-z]"),
  uppercase: $("[^A-Z]")
}), $("[^\\t]"), $("[^\\n]"), $("[^\\r]");
function q(...e) {
  return $(`${M(z(...e))}?`);
}
function z(...e) {
  return $(
    e.map((t) => typeof t == "string" ? t.replace(zn, "\\$&") : t).join("")
  );
}
function D(...e) {
  return $(`${M(z(...e))}+`);
}
const Be = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, De = (e, t) => {
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
    D(we),
    q(D(ke(` 	
\r`))),
    D(Te("/>")),
    q(D(ke(` 	
\r`))),
    q("/"),
    ">",
    ["g"]
  ), c = n.content.match(i);
  if (c === null)
    return;
  const f = Be(":", D(we), q(" "), "=", q(" "), Te(`'"`), [
    "g"
  ]);
  c.forEach((p) => {
    if (!p.includes(":"))
      return;
    const d = p.match(f);
    if (d?.length) {
      const _ = De(e.source, p);
      ae.push({ message: `${t}#${_} ${U}${d}${E}` });
    }
  });
}, Gn = () => (ae.length > 0 && (console.log(
  `
${v}vue-strong${y} ${j}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${S}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), fe = [], qn = (e, t) => {
  const n = e.template, i = Be(
    "<",
    D(Mn.uppercase, we),
    q(Un, Dn),
    q(D(Te(">"))),
    "></",
    D(we),
    ">",
    ["g"]
  ), c = n.content.match(i);
  c !== null && c.forEach((f) => {
    const p = De(e.source, f), d = f.split(`
`).at(-1)?.trim() || "";
    fe.push({ message: `${t}#${p} ${U}${d}${E}` });
  });
}, Qn = () => (fe.length > 0 && (console.log(
  `
${v}vue-strong${y} - ${j}Component is not self closing${E} in ${fe.length} files.`
), console.log(
  `👉 ${S}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length), _e = [], Ie = [], Kn = ["v-slot", "v-bind", "v-on"], Zn = (e, t) => {
  const n = e.template;
  Kn.forEach((i) => {
    if (n.content.includes(`${i}:`)) {
      const c = De(e.source, i);
      _e.push({ message: `${t}:${c} ${U}${i}${E}` }), Ie.some((f) => f.filrPath === t) || Ie.push({ filrPath: t });
    }
  });
}, Yn = () => (_e.length > 0 && (console.log(
  `
${v}vue-strong${y} ${j}Directive shorthands not used${E} in ${Ie.length} files.`
), console.log(
  `👉 ${S}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), _e.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), _e.length);
let lt = 0;
const Hn = [
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
], at = (e, t) => {
  const n = Le.readdirSync(e);
  lt += n.length;
  for (const i of n) {
    const c = ze.join(e, i);
    Le.statSync(c).isDirectory() ? Hn.some((f) => c.includes(f)) && at(c, t) : i.endsWith(".vue") && t(c);
  }
}, Xn = (e) => {
  console.log(`

${We}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  at(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const i = Le.readFileSync(n, "utf-8"), { descriptor: c } = Rt(i);
    bn(n), Sn(n), c.script && fn(n);
    const f = c.scriptSetup || c.script;
    f && (_n(f, n), Fn(f, n), ln(f, n), mn(f, n), hn(f, n)), c.styles.forEach((p) => {
      En(p, n);
    }), c.template && (xn(c.template, n), Cn(c.template, n), qn(c, n), Wn(c.template, n), Vn(c, n), Zn(c, n));
  }), console.log(`Found ${We}${lt}${E} Vue files`), t += yn(), t += wn(), t += jn(), t += On(), t += An(), t += vn(), t += Qn(), t += Rn(), t += Pn(), t += Gn(), t += Yn(), t += an(), t += un(), t += $n(), t += pn(), t || console.log(`${cn}No code smells detected!${E}`);
};
At(Pt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    Xn(e.path);
  }
).help().argv;
