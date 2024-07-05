import _t from "yargs";
import { format as tt, inspect as wt } from "util";
import Me, { normalize as Ct, resolve as Y, dirname as We, basename as Ot, extname as xt, relative as jt } from "path";
import Pe, { readFileSync as De, statSync as nt, readdirSync as St, writeFile as vt } from "fs";
import { notStrictEqual as Nt, strictEqual as Ft } from "assert";
import { fileURLToPath as Rt } from "url";
import { parse as Lt } from "@vue/compiler-sfc";
class he extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, he);
  }
}
function st() {
  return Wt() ? 0 : 1;
}
function Wt() {
  return Pt() && !process.defaultApp;
}
function Pt() {
  return !!process.versions.electron;
}
function Tt(e) {
  return e.slice(st() + 1);
}
function Bt() {
  return process.argv[st()];
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
      let p = e.charAt(a);
      i && (i = !1, p = p.toUpperCase()), a !== 0 && (p === "-" || p === "_") ? i = !0 : p !== "-" && p !== "_" && (n += p);
    }
    return n;
  }
}
function ot(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), p = e.charAt(c);
    a !== p && c > 0 ? i += `${t}${n.charAt(c)}` : i += p;
  }
  return i;
}
function rt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function It(e) {
  if (Array.isArray(e))
    return e.map((p) => typeof p != "string" ? p + "" : p);
  e = e.trim();
  let t = 0, n = null, i = null, c = null;
  const a = [];
  for (let p = 0; p < e.length; p++) {
    if (n = i, i = e.charAt(p), i === " " && !c) {
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
var W;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(W || (W = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let z;
class zt {
  constructor(t) {
    z = t;
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
    }, n), c = It(t), a = typeof t == "string", p = Mt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), d = Object.assign({
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
    }, i.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), i.default), N = i.configObjects || [], w = i.envPrefix, B = d["populate--"], G = B ? "--" : "_", de = /* @__PURE__ */ Object.create(null), Ve = /* @__PURE__ */ Object.create(null), q = i.__ || z.format, f = {
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
    }, P = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, xe = new RegExp("^--" + d["negation-prefix"] + "(.+)");
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
    })), dt(i.key, p, i.default, f.arrays), Object.keys(_).forEach(function(s) {
      (f.aliases[s] || []).forEach(function(r) {
        _[r] = _[s];
      });
    });
    let R = null;
    At();
    let me = [];
    const C = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Ge = {};
    for (let s = 0; s < c.length; s++) {
      const r = c[s], u = r.replace(/^-{3,}/, "---");
      let l, o, g, h, m, O;
      if (r !== "--" && /^-/.test(r) && Ee(r))
        je(r);
      else if (u.match(/^---+(=|$)/)) {
        je(r);
        continue;
      } else if (r.match(/^--.+=/) || !d["short-option-groups"] && r.match(/^-.+=/))
        h = r.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], f.arrays) ? s = be(s, h[1], c, h[2]) : b(h[1], f.nargs) !== !1 ? s = $e(s, h[1], c, h[2]) : A(h[1], h[2], !0));
      else if (r.match(xe) && d["boolean-negation"])
        h = r.match(xe), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], A(o, b(o, f.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !d["short-option-groups"] && r.match(/^-[^-]+/))
        h = r.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], b(o, f.arrays) ? s = be(s, o, c) : b(o, f.nargs) !== !1 ? s = $e(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      else if (r.match(/^-.\..+=/))
        h = r.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && A(h[1], h[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[s + 1], h = r.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], m !== void 0 && !m.match(/^-/) && !b(o, f.bools) && !b(o, f.counts) ? (A(o, m), s++) : A(o, Q(o)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        g = r.slice(1, -1).split(""), l = !1;
        for (let S = 0; S < g.length; S++) {
          if (m = r.slice(S + 2), g[S + 1] && g[S + 1] === "=") {
            O = r.slice(S + 3), o = g[S], b(o, f.arrays) ? s = be(s, o, c, O) : b(o, f.nargs) !== !1 ? s = $e(s, o, c, O) : A(o, O), l = !0;
            break;
          }
          if (m === "-") {
            A(g[S], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[S]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && b(m, f.bools) === !1) {
            A(g[S], m), l = !0;
            break;
          }
          if (g[S + 1] && g[S + 1].match(/\W/)) {
            A(g[S], m), l = !0;
            break;
          } else
            A(g[S], Q(g[S]));
        }
        o = r.slice(-1)[0], !l && o !== "-" && (b(o, f.arrays) ? s = be(s, o, c) : b(o, f.nargs) !== !1 ? s = $e(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && b(r.slice(1), f.bools))
        o = r.slice(1), A(o, Q(o));
      else if (r === "--") {
        me = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        me = c.slice(s);
        break;
      } else
        je(r);
    }
    Qe(C, !0), Qe(C, !1), ut(C), ht(), Ke(C, f.aliases, _, !0), pt(C), d["set-placeholder-key"] && gt(C), Object.keys(f.counts).forEach(function(s) {
      Z(C, s.split(".")) || A(s, 0);
    }), B && me.length && (C[G] = []), me.forEach(function(s) {
      C[G].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(C).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete C[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(p).map((s) => p[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete C[s.split(".").map((r) => X(r)).join(".")], delete C[s];
    });
    function je(s) {
      const r = ye("_", s);
      (typeof r == "string" || typeof r == "number") && C._.push(r);
    }
    function $e(s, r, u, l) {
      let o, g = b(r, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return I(l) || (R = Error(q("Argument unexpected for: %s", r))), A(r, Q(r)), s;
      let h = I(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + h < g && (R = Error(q("Not enough arguments following: %s", r))), h = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(P) || Ee(u[o])); o++)
          h++;
        h < g && (R = Error(q("Not enough arguments following: %s", r)));
      }
      let m = Math.min(h, g);
      for (!I(l) && m > 0 && (A(r, l), m--), o = s + 1; o < m + s + 1; o++)
        A(r, u[o]);
      return s + m;
    }
    function be(s, r, u, l) {
      let o = [], g = l || u[s + 1];
      const h = b(r, f.nargs);
      if (b(r, f.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (I(g) || I(l) && /^-/.test(g) && !P.test(g) && !Ee(g)) {
        if (_[r] !== void 0) {
          const m = _[r];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        I(l) || o.push(Se(r, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (g = u[m], /^-/.test(g) && !P.test(g) && !Ee(g))); m++)
          s = m, o.push(Se(r, g, a));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (R = Error(q("Not enough arguments following: %s", r))), A(r, o), s;
    }
    function A(s, r, u = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(h) {
          return X(h);
        }).join(".");
        qe(s, g);
      }
      const l = Se(s, r, u), o = s.split(".");
      H(C, o, l), f.aliases[s] && f.aliases[s].forEach(function(g) {
        const h = g.split(".");
        H(C, h, l);
      }), o.length > 1 && d["dot-notation"] && (f.aliases[o[0]] || []).forEach(function(g) {
        let h = g.split(".");
        const m = [].concat(o);
        m.shift(), h = h.concat(m), (f.aliases[s] || []).includes(h.join(".")) || H(C, h, l);
      }), b(s, f.normalize) && !b(s, f.arrays) && [s].concat(f.aliases[s] || []).forEach(function(h) {
        Object.defineProperty(Ge, h, {
          enumerable: !0,
          get() {
            return r;
          },
          set(m) {
            r = typeof m == "string" ? z.normalize(m) : m;
          }
        });
      });
    }
    function qe(s, r) {
      f.aliases[s] && f.aliases[s].length || (f.aliases[s] = [r], de[r] = !0), f.aliases[r] && f.aliases[r].length || qe(r, s);
    }
    function Se(s, r, u) {
      u && (r = Dt(r)), (b(s, f.bools) || b(s, f.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(o) {
        return ye(s, o);
      }) : ye(s, r);
      return b(s, f.counts) && (I(l) || typeof l == "boolean") && (l = Ne()), b(s, f.normalize) && b(s, f.arrays) && (Array.isArray(r) ? l = r.map((o) => z.normalize(o)) : l = z.normalize(r)), l;
    }
    function ye(s, r) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, f.strings) && !b(s, f.bools) && !Array.isArray(r) && (rt(r) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !I(r) && b(s, f.numbers)) && (r = Number(r)), r;
    }
    function ut(s) {
      const r = /* @__PURE__ */ Object.create(null);
      Ke(r, f.aliases, _), Object.keys(f.configs).forEach(function(u) {
        const l = s[u] || r[u];
        if (l)
          try {
            let o = null;
            const g = z.resolve(z.cwd(), l), h = f.configs[u];
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
              o = z.require(g);
            ve(o);
          } catch (o) {
            o.name === "PermissionDenied" ? R = o : s[u] && (R = Error(q("Invalid JSON config file: %s", l)));
          }
      });
    }
    function ve(s, r) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = r ? r + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? ve(l, o) : (!Z(C, o.split(".")) || b(o, f.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function ht() {
      typeof N < "u" && N.forEach(function(s) {
        ve(s);
      });
    }
    function Qe(s, r) {
      if (typeof w > "u")
        return;
      const u = typeof w == "string" ? w : "", l = z.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(h, m) {
            return m === 0 && (h = h.substring(u.length)), X(h);
          });
          (r && f.configs[g.join(".")] || !r) && !Z(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function pt(s) {
      let r;
      const u = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!u.has(l) && (r = b(l, f.coercions), typeof r == "function"))
          try {
            const o = ye(l, r(s[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              u.add(g), s[g] = o;
            });
          } catch (o) {
            R = o;
          }
      });
    }
    function gt(s) {
      return f.keys.forEach((r) => {
        ~r.indexOf(".") || typeof s[r] > "u" && (s[r] = void 0);
      }), s;
    }
    function Ke(s, r, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        Z(s, o.split(".")) || (H(s, o.split("."), u[o]), l && (Ve[o] = !0), (r[o] || []).forEach(function(g) {
          Z(s, g.split(".")) || H(s, g.split("."), u[o]);
        }));
      });
    }
    function Z(s, r) {
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
      const o = Ze(r[r.length - 1]), g = b(r.join("."), f.arrays), h = Array.isArray(u);
      let m = d["duplicate-arguments-array"];
      !m && b(o, f.nargs) && (m = !0, (!I(l[o]) && f.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === f.nargs[o]) && (l[o] = void 0)), u === Ne() ? l[o] = Ne(l[o]) : Array.isArray(l[o]) ? m && g && h ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!h ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = h ? u : [u] : m && !(l[o] === void 0 || b(o, f.counts) || b(o, f.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function dt(...s) {
      s.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          f.aliases[u] || (f.aliases[u] = [].concat(p[u] || []), f.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = X(l);
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), de[o] = !0);
            }
          }), f.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = ot(l, "-");
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), de[o] = !0);
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
    function Ye(s) {
      const r = Object.keys(f);
      return [].concat(r.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function mt(s, ...r) {
      return [].concat(...r).some(function(l) {
        const o = s.match(l);
        return o && Ye(o[1]);
      });
    }
    function $t(s) {
      if (s.match(P) || !s.match(/^-[^-]+/))
        return !1;
      let r = !0, u;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (u = s.slice(o + 2), !Ye(l[o])) {
          r = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return r;
    }
    function Ee(s) {
      return d["unknown-options-as-args"] && bt(s);
    }
    function bt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || $t(s) ? !1 : !mt(s, /^-+([^=]+?)=[\s\S]*$/, xe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function Q(s) {
      return !b(s, f.bools) && !b(s, f.counts) && `${s}` in _ ? _[s] : yt(Et(s));
    }
    function yt(s) {
      return {
        [W.BOOLEAN]: !0,
        [W.STRING]: "",
        [W.NUMBER]: void 0,
        [W.ARRAY]: []
      }[s];
    }
    function Et(s) {
      let r = W.BOOLEAN;
      return b(s, f.strings) ? r = W.STRING : b(s, f.numbers) ? r = W.NUMBER : b(s, f.bools) ? r = W.BOOLEAN : b(s, f.arrays) && (r = W.ARRAY), r;
    }
    function I(s) {
      return s === void 0;
    }
    function At() {
      Object.keys(f.counts).find((s) => b(s, f.arrays) ? (R = Error(q("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, f.nargs) ? (R = Error(q("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(Ge, C),
      configuration: d,
      defaulted: Object.assign({}, Ve),
      error: R,
      newAliases: Object.assign({}, de)
    };
  }
}
function Mt(e) {
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
    c = c.filter(function(p, d, _) {
      return _.indexOf(p) === d;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function Ne(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Ze(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Dt(e) {
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
var Fe, Re, Le;
const He = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Xe = (Re = (Fe = process == null ? void 0 : process.versions) === null || Fe === void 0 ? void 0 : Fe.node) !== null && Re !== void 0 ? Re : (Le = process == null ? void 0 : process.version) === null || Le === void 0 ? void 0 : Le.slice(1);
if (Xe && Number(Xe.match(/^([^.]+)/)[1]) < He)
  throw Error(`yargs parser supports a minimum Node.js version of ${He}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Ut = process ? process.env : {}, it = new zt({
  cwd: process.cwd,
  env: () => Ut,
  format: tt,
  normalize: Ct,
  resolve: Y,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(De(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ge = function(t, n) {
  return it.parse(t.slice(), n).argv;
};
ge.detailed = function(e, t) {
  return it.parse(e.slice(), t);
};
ge.camelCase = X;
ge.decamelize = ot;
ge.looksLikeNumber = rt;
const Vt = {
  right: Zt,
  center: Ht
}, Gt = 0, Ae = 1, qt = 2, _e = 3;
class Qt {
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
      this.div(...c.map((a, p) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
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
      let a = "";
      i.forEach((p, d) => {
        const { width: _ } = t[d], N = this.negatePadding(t[d]);
        let w = p;
        if (N > F.stringWidth(p) && (w += " ".repeat(N - F.stringWidth(p))), t[d].align && t[d].align !== "left" && this.wrap) {
          const G = Vt[t[d].align];
          w = G(w, N), F.stringWidth(w) < N && (w += " ".repeat((_ || 0) - F.stringWidth(w) - 1));
        }
        const B = t[d].padding || [0, 0, 0, 0];
        B[_e] && (a += " ".repeat(B[_e])), a += Je(t[d], w, "| "), a += w, a += Je(t[d], w, " |"), B[Ae] && (a += " ".repeat(B[Ae])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const i = t.match(/^ */), c = i ? i[0].length : 0, a = n.text, p = F.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < p ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - p) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], i = this.columnWidths(t);
    let c;
    return t.forEach((a, p) => {
      a.width = i[p], this.wrap ? c = F.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[Gt] || 0).fill("")), c.push(...new Array(a.padding[qt] || 0).fill(""))), c.forEach((d, _) => {
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
    return t.padding && (n -= (t.padding[_e] || 0) + (t.padding[Ae] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || F.stringWidth(p.text));
    let n = t.length, i = this.width;
    const c = t.map((p) => {
      if (p.width)
        return n--, i -= p.width, p.width;
    }), a = n ? Math.floor(i / n) : 0;
    return c.map((p, d) => p === void 0 ? Math.max(a, Kt(t[d])) : p);
  }
}
function Je(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Kt(e) {
  const t = e.padding || [], n = 1 + (t[_e] || 0) + (t[Ae] || 0);
  return e.border ? n + 4 : n;
}
function Yt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Zt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Ht(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let F;
function Xt(e, t) {
  return F = t, new Qt({
    width: e?.width || Yt(),
    wrap: e?.wrap
  });
}
const ct = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function lt(e) {
  return e.replace(ct, "");
}
function Jt(e, t) {
  const [n, i] = e.match(ct) || ["", ""];
  e = lt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && i && (c = `${n}${c}${i}`), c;
}
function kt(e) {
  return Xt(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: lt,
    wrap: Jt
  });
}
function en(e, t) {
  let n = Y(".", e), i;
  for (nt(n).isDirectory() || (n = We(n)); ; ) {
    if (i = t(n, St(n)), i)
      return Y(n, i);
    if (n = We(i = n), i === n)
      break;
  }
}
const tn = {
  fs: {
    readFileSync: De,
    writeFile: vt
  },
  format: tt,
  resolve: Y,
  exists: (e) => {
    try {
      return nt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let L;
class nn {
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
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = c === 1 ? n : i;
    this.cache[this.locale][n] && (p = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: i
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
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
    return t.forEach(function(c, a) {
      const p = n[a + 1];
      i += c, typeof p < "u" && (i += "%s");
    }), this.__.apply(this, [i].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], i = n.directory, c = n.locale, a = n.cb, p = this._resolveLocaleFile(i, c), d = JSON.stringify(this.cache[c], null, 2);
    L.fs.writeFile(p, d, "utf-8", function(_) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(_);
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
function sn(e, t) {
  L = t;
  const n = new nn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const on = (e) => sn(e, tn), rn = "require is not supported by ESM", ke = "loading a directory of commands is not supported yet for ESM";
let pe;
try {
  pe = Rt(import.meta.url);
} catch {
  pe = process.cwd();
}
const cn = pe.substring(0, pe.lastIndexOf("node_modules"));
Nt, Ft, wt, cn || process.cwd(), Ot, We, xt, jt, Y, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, De, on({
  directory: Y(pe, "../../../locales"),
  updateFiles: !1
});
const Te = "\x1B[44m", T = "\x1B[43m", v = "\x1B[41m", ln = "\x1B[42m", E = "\x1B[0m", x = "\x1B[33m", j = "\x1B[36m", y = "\x1B[0m", Be = 100, J = [], an = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Be && J.push({ fileName: t, scriptLength: n.length });
}, fn = () => (J.length > 0 && (console.log(
  `
${j}rrd${y} ${v}Long <script> blocks${E} in ${J.length} files.`
), console.log(
  `👉 ${x}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Be} lines.${y}`
), J.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Be * 2 ? v : T}(${e.scriptLength} lines)${E}`
  );
})), J.length), k = [], un = (e) => {
  k.push(e);
}, hn = () => (k.length > 0 && (console.log(
  `
${j}rrd${y} ${T}Plain <script> blocks${E} in ${k.length} files.`
), console.log(`👉 ${x} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), k.forEach((e) => {
  console.log(`- ${e}`);
})), k.length), ee = [], pn = (e, t) => {
  const n = /\belse\b/gi, i = e.content.match(n);
  i?.length && ee.push({ fileName: t, elseCount: i.length });
}, gn = () => (ee.length > 0 && (console.log(
  `
${j}rrd${y} ${T}else conditions${E} are used in ${ee.length} files.`
), console.log(`👉 ${x}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), ee.forEach((e) => {
  console.log(`- ${e.fileName} ${T}(${e.elseCount})${E}`);
})), ee.length), dn = 5, mn = 10, te = [], $n = (e, t) => {
  const n = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, p = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(i), N = e.content.match(c), w = e.content.match(a), B = e.content.match(p), G = (d?.length || 0) + (_?.length || 0) + (N?.length || 0) + (w?.length || 0) + (B?.length || 0);
  G > dn && te.push({ fileName: t, cyclomaticComplexity: G });
}, bn = () => (te.length > 0 && (console.log(
  `
${j}rrd${y} ${Te}cyclomaticComplexity${E} is above moderate in ${te.length} files.`
), console.log(`👉 ${x}Try to reduce complexity.${y}`), te.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > mn ? v : T}(${e.cyclomaticComplexity})${E}`
  );
})), te.length), ne = [], yn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Me.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || ne.push({ filePath: e });
}, En = () => (ne.length > 0 && (console.log(
  `
${j}vue-essential${y} ${v}single name component${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${x}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], An = (e, t) => {
  e.scoped || se.push({ filePath: t });
}, _n = () => (se.length > 0 && (console.log(
  `
${j}vue-essential${y} ${v}Global style ${E} is used in ${se.length} files.`
), console.log(
  `👉 ${x}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], wn = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && oe.push({ filePath: t });
}, Cn = () => (oe.length > 0 && (console.log(
  `
${j}vue-essential${y} ${v}simple prop${E} is used in ${oe.length} files.`
), console.log(
  `👉 ${x}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], On = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(i);
  (c?.length || a?.length) && re.push({ filePath: t });
}, xn = () => (re.length > 0 && (console.log(
  `
${j}vue-essential${y} ${v}v-if used with v-for${E} in ${re.length} files.`
), console.log(
  `👉 ${x}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], jn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(n);
  i?.length && (i.some((a) => a.includes(":key")) || ie.push({ filePath: t }));
}, Sn = () => (ie.length > 0 && (console.log(
  `
${j}vue-essential${y} ${v}v-for has no key${E} in ${ie.length} files.`
), console.log(
  `👉 ${x}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), ie.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ie.length), ce = [], vn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = Me.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !i?.length && !a?.length && ce.push({ fileName: e });
}, Nn = () => (ce.length > 0 && (console.log(
  `
${j}vue-strong${y} ${v}component name is not PascalCase and not kebab-abse${E} in ${ce.length} files.`
), console.log(
  `👉 ${x}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ce.forEach((e) => {
  console.log(`- ${v}${e.fileName}${E}`);
})), ce.length), le = [], Fn = /^[a-z]+([A-Z][a-z]*)+$/, Rn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Fn.test(a)).length && le.push({ filePath: t });
}, Ln = () => (le.length > 0 && (console.log(
  `
${j}vue-strong${y} ${v}prop names are not camelCased${E} in ${le.length} files.`
), console.log(
  `👉 ${x}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), le.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), le.length), K = [], Wn = 40, Pn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    c.length > Wn && (K.some((a) => a.filePath === t) || K.push({ filePath: t }));
  });
}, Tn = () => (K.length > 0 && (console.log(
  `
${j}vue-strong${y} ${v}Lengthy template expression${E} found in ${K.length} files.`
), console.log(
  `👉 ${x}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), K.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), K.length), Bn = /^(\(.*\)|\\?.)$/;
function V(e) {
  const t = e.toString();
  return Bn.test(t) ? t : `(?:${t})`;
}
const In = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, zn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(In, "$1$2")})`);
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
    times: Object.assign((n) => $(`${V(e)}{${n}}`), {
      any: () => $(`${V(e)}*`),
      atLeast: (n) => $(`${V(e)}{${n},}`),
      atMost: (n) => $(`${V(e)}{0,${n}}`),
      between: (n, i) => $(`${V(e)}{${n},${i}}`)
    }),
    optionally: () => $(`${V(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => $(`${e}`.replace(zn, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Mn = /[.*+?^${}()|[\]\\/]/g;
function et(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ie(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Dn = $(".");
$("\\b\\w+\\b");
const Ce = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Un = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), Vn = $("\\t"), Gn = $("\\n");
$("\\r");
$("\\W+"), $("\\W"), $("\\B"), $("\\D"), $("\\S"), Object.assign($("[^a-zA-Z]"), {
  lowercase: $("[^a-z]"),
  uppercase: $("[^A-Z]")
}), $("[^\\t]"), $("[^\\n]"), $("[^\\r]");
function D(...e) {
  return $(`${V(M(...e))}?`);
}
function M(...e) {
  return $(
    e.map((t) => typeof t == "string" ? t.replace(Mn, "\\$&") : t).join("")
  );
}
function U(...e) {
  return $(`${V(M(...e))}+`);
}
const Oe = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, Ue = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((p) => p.includes(t)) + 1;
  const n = e.indexOf(t), i = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return i + c - 1;
}, ae = [], qn = (e, t) => {
  const n = e.template, i = Oe(
    "<",
    U(Ce),
    D(U(et(` 	
\r`))),
    U(Ie("/>")),
    D(U(et(` 	
\r`))),
    D("/"),
    ">",
    ["g"]
  ), c = n.content.match(i);
  if (c === null)
    return;
  const a = Oe(":", U(Ce), D(" "), "=", D(" "), Ie(`'"`), [
    "g"
  ]);
  c.forEach((p) => {
    if (!p.includes(":"))
      return;
    const d = p.match(a);
    if (d?.length) {
      const _ = Ue(e.source, p);
      ae.push({ message: `${t}#${_} ${T}${d}${E}` });
    }
  });
}, Qn = () => (ae.length > 0 && (console.log(
  `
${j}vue-strong${y} ${v}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${x}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), fe = [], Kn = (e, t) => {
  const n = e.template, i = Oe(
    "<",
    U(Un.uppercase, Ce),
    D(Gn, Vn),
    D(U(Ie(">"))),
    "></",
    U(Ce),
    ">",
    ["g"]
  ), c = n.content.match(i);
  c !== null && c.forEach((a) => {
    const p = Ue(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    fe.push({ message: `${t}#${p} ${T}${d}${E}` });
  });
}, Yn = () => (fe.length > 0 && (console.log(
  `
${j}vue-strong${y} - ${v}Component is not self closing${E} in ${fe.length} files.`
), console.log(
  `👉 ${x}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length), we = [], ze = [], Zn = ["v-slot", "v-bind", "v-on"], Hn = (e, t) => {
  const n = e.template;
  Zn.forEach((i) => {
    if (n.content.includes(`${i}:`)) {
      const c = Ue(e.source, i);
      we.push({ message: `${t}:${c} ${T}${i}${E}` }), ze.some((a) => a.filrPath === t) || ze.push({ filrPath: t });
    }
  });
}, Xn = () => (we.length > 0 && (console.log(
  `
${j}vue-strong${y} ${v}Directive shorthands not used${E} in ${ze.length} files.`
), console.log(
  `👉 ${x}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), we.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), we.length), ue = [], Jn = 5, kn = (e, t) => {
  const n = Oe("defineProps", D("<"), D("("), "{", U(Dn), "}", ["g", "s"]), i = e.content.match(n);
  if (i?.length) {
    const c = i[0].split(",").length;
    c > Jn && ue.push({ fileName: t, propsCount: c });
  }
}, es = () => (ue.length > 0 && (console.log(
  `
${j}rrd${y} ${T}too many props${E} are used in ${ue.length} files.`
), console.log(`👉 ${x}Try to refactor your code to use less properties.${y}`), ue.forEach((e) => {
  console.log(`- ${e.fileName} ${T}(${e.propsCount})${E}`);
})), ue.length);
let at = 0;
const ts = [
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
], ft = (e, t) => {
  const n = Pe.readdirSync(e);
  at += n.length;
  for (const i of n) {
    const c = Me.join(e, i);
    Pe.statSync(c).isDirectory() ? ts.some((a) => c.includes(a)) && ft(c, t) : i.endsWith(".vue") && t(c);
  }
}, ns = (e) => {
  console.log(`

${Te}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  ft(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const i = Pe.readFileSync(n, "utf-8"), { descriptor: c } = Lt(i);
    yn(n), vn(n), c.script && un(n);
    const a = c.scriptSetup || c.script;
    a && (wn(a, n), Rn(a, n), an(a, n), $n(a, n), pn(a, n), kn(a, n)), c.styles.forEach((p) => {
      An(p, n);
    }), c.template && (jn(c.template, n), On(c.template, n), Kn(c, n), Pn(c.template, n), qn(c, n), Hn(c, n));
  }), console.log(`Found ${Te}${at}${E} Vue files`), t += En(), t += Cn(), t += Sn(), t += xn(), t += _n(), t += Nn(), t += Yn(), t += Ln(), t += Tn(), t += Qn(), t += Xn(), t += fn(), t += hn(), t += bn(), t += gn(), t += es(), t || console.log(`${ln}No code smells detected!${E}`);
};
_t(Tt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    ns(e.path);
  }
).help().argv;
