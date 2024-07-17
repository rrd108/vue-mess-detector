import wt from "yargs";
import { format as nt, inspect as Ot } from "util";
import De, { normalize as xt, resolve as Z, dirname as Pe, basename as St, extname as jt, relative as Nt } from "path";
import Be, { readFileSync as Ge, statSync as st, readdirSync as vt, writeFile as Ft } from "fs";
import { notStrictEqual as Rt, strictEqual as Lt } from "assert";
import { fileURLToPath as Wt } from "url";
import { parse as Tt } from "@vue/compiler-sfc";
class pe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, pe);
  }
}
function ot() {
  return Pt() ? 0 : 1;
}
function Pt() {
  return Bt() && !process.defaultApp;
}
function Bt() {
  return !!process.versions.electron;
}
function It(e) {
  return e.slice(ot() + 1);
}
function zt() {
  return process.argv[ot()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function H(e) {
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
function rt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? i += `${t}${n.charAt(c)}` : i += h;
  }
  return i;
}
function it(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Mt(e) {
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
let z;
class Ut {
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
    }, n), c = Mt(t), a = typeof t == "string", h = Dt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), d = Object.assign({
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
    }, i.configuration), _ = Object.assign(/* @__PURE__ */ Object.create(null), i.default), v = i.configObjects || [], C = i.envPrefix, B = d["populate--"], V = B ? "--" : "_", me = /* @__PURE__ */ Object.create(null), Ve = /* @__PURE__ */ Object.create(null), q = i.__ || z.format, f = {
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
    })), $t(i.key, h, i.default, f.arrays), Object.keys(_).forEach(function(s) {
      (f.aliases[s] || []).forEach(function(r) {
        _[r] = _[s];
      });
    });
    let L = null;
    Ct();
    let $e = [];
    const w = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), qe = {};
    for (let s = 0; s < c.length; s++) {
      const r = c[s], u = r.replace(/^-{3,}/, "---");
      let l, o, g, p, m, O;
      if (r !== "--" && /^-/.test(r) && Ae(r))
        Ne(r);
      else if (u.match(/^---+(=|$)/)) {
        Ne(r);
        continue;
      } else if (r.match(/^--.+=/) || !d["short-option-groups"] && r.match(/^-.+=/))
        p = r.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (b(p[1], f.arrays) ? s = ye(s, p[1], c, p[2]) : b(p[1], f.nargs) !== !1 ? s = be(s, p[1], c, p[2]) : A(p[1], p[2], !0));
      else if (r.match(je) && d["boolean-negation"])
        p = r.match(je), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], A(o, b(o, f.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !d["short-option-groups"] && r.match(/^-[^-]+/))
        p = r.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], b(o, f.arrays) ? s = ye(s, o, c) : b(o, f.nargs) !== !1 ? s = be(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      else if (r.match(/^-.\..+=/))
        p = r.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && A(p[1], p[2]);
      else if (r.match(/^-.\..+/) && !r.match(P))
        m = c[s + 1], p = r.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (o = p[1], m !== void 0 && !m.match(/^-/) && !b(o, f.bools) && !b(o, f.counts) ? (A(o, m), s++) : A(o, Q(o)));
      else if (r.match(/^-[^-]+/) && !r.match(P)) {
        g = r.slice(1, -1).split(""), l = !1;
        for (let j = 0; j < g.length; j++) {
          if (m = r.slice(j + 2), g[j + 1] && g[j + 1] === "=") {
            O = r.slice(j + 3), o = g[j], b(o, f.arrays) ? s = ye(s, o, c, O) : b(o, f.nargs) !== !1 ? s = be(s, o, c, O) : A(o, O), l = !0;
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
            A(g[j], Q(g[j]));
        }
        o = r.slice(-1)[0], !l && o !== "-" && (b(o, f.arrays) ? s = ye(s, o, c) : b(o, f.nargs) !== !1 ? s = be(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(P)) && !b(o, f.bools) && !b(o, f.counts) || /^(true|false)$/.test(m) ? (A(o, m), s++) : A(o, Q(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(P) && b(r.slice(1), f.bools))
        o = r.slice(1), A(o, Q(o));
      else if (r === "--") {
        $e = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        $e = c.slice(s);
        break;
      } else
        Ne(r);
    }
    Ze(w, !0), Ze(w, !1), pt(w), gt(), Ke(w, f.aliases, _, !0), dt(w), d["set-placeholder-key"] && mt(w), Object.keys(f.counts).forEach(function(s) {
      K(w, s.split(".")) || A(s, 0);
    }), B && $e.length && (w[V] = []), $e.forEach(function(s) {
      w[V].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(w).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete w[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete w[s.split(".").map((r) => H(r)).join(".")], delete w[s];
    });
    function Ne(s) {
      const r = Ee("_", s);
      (typeof r == "string" || typeof r == "number") && w._.push(r);
    }
    function be(s, r, u, l) {
      let o, g = b(r, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return I(l) || (L = Error(q("Argument unexpected for: %s", r))), A(r, Q(r)), s;
      let p = I(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + p < g && (L = Error(q("Not enough arguments following: %s", r))), p = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(P) || Ae(u[o])); o++)
          p++;
        p < g && (L = Error(q("Not enough arguments following: %s", r)));
      }
      let m = Math.min(p, g);
      for (!I(l) && m > 0 && (A(r, l), m--), o = s + 1; o < m + s + 1; o++)
        A(r, u[o]);
      return s + m;
    }
    function ye(s, r, u, l) {
      let o = [], g = l || u[s + 1];
      const p = b(r, f.nargs);
      if (b(r, f.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (I(g) || I(l) && /^-/.test(g) && !P.test(g) && !Ae(g)) {
        if (_[r] !== void 0) {
          const m = _[r];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        I(l) || o.push(ve(r, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || p && typeof p == "number" && o.length >= p || (g = u[m], /^-/.test(g) && !P.test(g) && !Ae(g))); m++)
          s = m, o.push(ve(r, g, a));
      }
      return typeof p == "number" && (p && o.length < p || isNaN(p) && o.length === 0) && (L = Error(q("Not enough arguments following: %s", r))), A(r, o), s;
    }
    function A(s, r, u = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return H(p);
        }).join(".");
        Qe(s, g);
      }
      const l = ve(s, r, u), o = s.split(".");
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
            r = typeof m == "string" ? z.normalize(m) : m;
          }
        });
      });
    }
    function Qe(s, r) {
      f.aliases[s] && f.aliases[s].length || (f.aliases[s] = [r], me[r] = !0), f.aliases[r] && f.aliases[r].length || Qe(r, s);
    }
    function ve(s, r, u) {
      u && (r = Gt(r)), (b(s, f.bools) || b(s, f.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(o) {
        return Ee(s, o);
      }) : Ee(s, r);
      return b(s, f.counts) && (I(l) || typeof l == "boolean") && (l = Re()), b(s, f.normalize) && b(s, f.arrays) && (Array.isArray(r) ? l = r.map((o) => z.normalize(o)) : l = z.normalize(r)), l;
    }
    function Ee(s, r) {
      return !d["parse-positional-numbers"] && s === "_" || !b(s, f.strings) && !b(s, f.bools) && !Array.isArray(r) && (it(r) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !I(r) && b(s, f.numbers)) && (r = Number(r)), r;
    }
    function pt(s) {
      const r = /* @__PURE__ */ Object.create(null);
      Ke(r, f.aliases, _), Object.keys(f.configs).forEach(function(u) {
        const l = s[u] || r[u];
        if (l)
          try {
            let o = null;
            const g = z.resolve(z.cwd(), l), p = f.configs[u];
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
              o = z.require(g);
            Fe(o);
          } catch (o) {
            o.name === "PermissionDenied" ? L = o : s[u] && (L = Error(q("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Fe(s, r) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = r ? r + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Fe(l, o) : (!K(w, o.split(".")) || b(o, f.arrays) && d["combine-arrays"]) && A(o, l);
      });
    }
    function gt() {
      typeof v < "u" && v.forEach(function(s) {
        Fe(s);
      });
    }
    function Ze(s, r) {
      if (typeof C > "u")
        return;
      const u = typeof C == "string" ? C : "", l = z.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(u.length)), H(p);
          });
          (r && f.configs[g.join(".")] || !r) && !K(s, g) && A(g.join("."), l[o]);
        }
      });
    }
    function dt(s) {
      let r;
      const u = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!u.has(l) && (r = b(l, f.coercions), typeof r == "function"))
          try {
            const o = Ee(l, r(s[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              u.add(g), s[g] = o;
            });
          } catch (o) {
            L = o;
          }
      });
    }
    function mt(s) {
      return f.keys.forEach((r) => {
        ~r.indexOf(".") || typeof s[r] > "u" && (s[r] = void 0);
      }), s;
    }
    function Ke(s, r, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        K(s, o.split(".")) || (Y(s, o.split("."), u[o]), l && (Ve[o] = !0), (r[o] || []).forEach(function(g) {
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
      !m && b(o, f.nargs) && (m = !0, (!I(l[o]) && f.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === f.nargs[o]) && (l[o] = void 0)), u === Re() ? l[o] = Re(l[o]) : Array.isArray(l[o]) ? m && g && p ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!p ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = p ? u : [u] : m && !(l[o] === void 0 || b(o, f.counts) || b(o, f.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function $t(...s) {
      s.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          f.aliases[u] || (f.aliases[u] = [].concat(h[u] || []), f.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = H(l);
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), me[o] = !0);
            }
          }), f.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = rt(l, "-");
              o !== u && f.aliases[u].indexOf(o) === -1 && (f.aliases[u].push(o), me[o] = !0);
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
    function bt(s, ...r) {
      return [].concat(...r).some(function(l) {
        const o = s.match(l);
        return o && Ye(o[1]);
      });
    }
    function yt(s) {
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
    function Ae(s) {
      return d["unknown-options-as-args"] && Et(s);
    }
    function Et(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(P) || yt(s) ? !1 : !bt(s, /^-+([^=]+?)=[\s\S]*$/, je, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function Q(s) {
      return !b(s, f.bools) && !b(s, f.counts) && `${s}` in _ ? _[s] : At(_t(s));
    }
    function At(s) {
      return {
        [T.BOOLEAN]: !0,
        [T.STRING]: "",
        [T.NUMBER]: void 0,
        [T.ARRAY]: []
      }[s];
    }
    function _t(s) {
      let r = T.BOOLEAN;
      return b(s, f.strings) ? r = T.STRING : b(s, f.numbers) ? r = T.NUMBER : b(s, f.bools) ? r = T.BOOLEAN : b(s, f.arrays) && (r = T.ARRAY), r;
    }
    function I(s) {
      return s === void 0;
    }
    function Ct() {
      Object.keys(f.counts).find((s) => b(s, f.arrays) ? (L = Error(q("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : b(s, f.nargs) ? (L = Error(q("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(qe, w),
      configuration: d,
      defaulted: Object.assign({}, Ve),
      error: L,
      newAliases: Object.assign({}, me)
    };
  }
}
function Dt(e) {
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
function Re(e) {
  return e !== void 0 ? e + 1 : 1;
}
function He(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Gt(e) {
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
var Le, We, Te;
const Xe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Je = (We = (Le = process == null ? void 0 : process.versions) === null || Le === void 0 ? void 0 : Le.node) !== null && We !== void 0 ? We : (Te = process == null ? void 0 : process.version) === null || Te === void 0 ? void 0 : Te.slice(1);
if (Je && Number(Je.match(/^([^.]+)/)[1]) < Xe)
  throw Error(`yargs parser supports a minimum Node.js version of ${Xe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Vt = process ? process.env : {}, ct = new Ut({
  cwd: process.cwd,
  env: () => Vt,
  format: nt,
  normalize: xt,
  resolve: Z,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Ge(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), de = function(t, n) {
  return ct.parse(t.slice(), n).argv;
};
de.detailed = function(e, t) {
  return ct.parse(e.slice(), t);
};
de.camelCase = H;
de.decamelize = rt;
de.looksLikeNumber = it;
const qt = {
  right: Xt,
  center: Jt
}, Qt = 0, _e = 1, Zt = 2, Ce = 3;
class Kt {
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
      i.forEach((h, d) => {
        const { width: _ } = t[d], v = this.negatePadding(t[d]);
        let C = h;
        if (v > F.stringWidth(h) && (C += " ".repeat(v - F.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const V = qt[t[d].align];
          C = V(C, v), F.stringWidth(C) < v && (C += " ".repeat((_ || 0) - F.stringWidth(C) - 1));
        }
        const B = t[d].padding || [0, 0, 0, 0];
        B[Ce] && (a += " ".repeat(B[Ce])), a += ke(t[d], C, "| "), a += C, a += ke(t[d], C, " |"), B[_e] && (a += " ".repeat(B[_e])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const i = t.match(/^ */), c = i ? i[0].length : 0, a = n.text, h = F.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], i = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = i[h], this.wrap ? c = F.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[Qt] || 0).fill("")), c.push(...new Array(a.padding[Zt] || 0).fill(""))), c.forEach((d, _) => {
        n[_] || n.push([]);
        const v = n[_];
        for (let C = 0; C < h; C++)
          v[C] === void 0 && v.push("");
        v.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ce] || 0) + (t.padding[_e] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || F.stringWidth(h.text));
    let n = t.length, i = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, i -= h.width, h.width;
    }), a = n ? Math.floor(i / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, Yt(t[d])) : h);
  }
}
function ke(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Yt(e) {
  const t = e.padding || [], n = 1 + (t[Ce] || 0) + (t[_e] || 0);
  return e.border ? n + 4 : n;
}
function Ht() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Xt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Jt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let F;
function kt(e, t) {
  return F = t, new Kt({
    width: e?.width || Ht(),
    wrap: e?.wrap
  });
}
const lt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function at(e) {
  return e.replace(lt, "");
}
function en(e, t) {
  const [n, i] = e.match(lt) || ["", ""];
  e = at(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && i && (c = `${n}${c}${i}`), c;
}
function tn(e) {
  return kt(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: at,
    wrap: en
  });
}
function nn(e, t) {
  let n = Z(".", e), i;
  for (st(n).isDirectory() || (n = Pe(n)); ; ) {
    if (i = t(n, vt(n)), i)
      return Z(n, i);
    if (n = Pe(i = n), i === n)
      break;
  }
}
const sn = {
  fs: {
    readFileSync: Ge,
    writeFile: Ft
  },
  format: nt,
  resolve: Z,
  exists: (e) => {
    try {
      return st(e).isFile();
    } catch {
      return !1;
    }
  }
};
let W;
class on {
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
function rn(e, t) {
  W = t;
  const n = new on(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const cn = (e) => rn(e, sn), ln = "require is not supported by ESM", et = "loading a directory of commands is not supported yet for ESM";
let ge;
try {
  ge = Wt(import.meta.url);
} catch {
  ge = process.cwd();
}
const an = ge.substring(0, ge.lastIndexOf("node_modules"));
Rt, Lt, Ot, an || process.cwd(), St, Pe, jt, Nt, Z, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Ge, cn({
  directory: Z(ge, "../../../locales"),
  updateFiles: !1
});
const Ie = "\x1B[44m", R = "\x1B[43m", N = "\x1B[41m", fn = "\x1B[42m", E = "\x1B[0m", x = "\x1B[33m", S = "\x1B[36m", y = "\x1B[0m", ze = 100, X = [], un = (e, t) => {
  const n = e.content.split(`
`);
  n.length > ze && X.push({ fileName: t, scriptLength: n.length });
}, hn = () => (X.length > 0 && (console.log(
  `
${S}rrd${y} ${N}Long <script> blocks${E} in ${X.length} files.`
), console.log(
  `👉 ${x}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${ze} lines.${y}`
), X.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > ze * 2 ? N : R}(${e.scriptLength} lines)${E}`
  );
})), X.length), J = [], pn = (e) => {
  J.push(e);
}, gn = () => (J.length > 0 && (console.log(
  `
${S}rrd${y} ${R}Plain <script> blocks${E} in ${J.length} files.`
), console.log(`👉 ${x} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], dn = (e, t) => {
  const n = /\belse\b/gi, i = e.content.match(n);
  i?.length && k.push({ fileName: t, elseCount: i.length });
}, mn = () => (k.length > 0 && (console.log(
  `
${S}rrd${y} ${R}else conditions${E} are used in ${k.length} files.`
), console.log(`👉 ${x}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${R}(${e.elseCount})${E}`);
})), k.length), $n = 5, bn = 10, ee = [], yn = (e, t) => {
  const n = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, a = /\bwhile\b/gi, h = /\bcase\b/gi, d = e.content.match(n), _ = e.content.match(i), v = e.content.match(c), C = e.content.match(a), B = e.content.match(h), V = (d?.length || 0) + (_?.length || 0) + (v?.length || 0) + (C?.length || 0) + (B?.length || 0);
  V > $n && ee.push({ fileName: t, cyclomaticComplexity: V });
}, En = () => (ee.length > 0 && (console.log(
  `
${S}rrd${y} ${Ie}cyclomaticComplexity${E} is above moderate in ${ee.length} files.`
), console.log(`👉 ${x}Try to reduce complexity.${y}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > bn ? N : R}(${e.cyclomaticComplexity})${E}`
  );
})), ee.length), te = [], An = (e) => {
  if (e.includes("pages"))
    return;
  const t = De.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || te.push({ filePath: e });
}, _n = () => (te.length > 0 && (console.log(
  `
${S}vue-essential${y} ${N}single name component${E} is used in ${te.length} files.`
), console.log(
  `👉 ${x}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], Cn = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, wn = () => (ne.length > 0 && (console.log(
  `
${S}vue-essential${y} ${N}Global style ${E} is used in ${ne.length} files.`
), console.log(
  `👉 ${x}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], On = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && se.push({ filePath: t });
}, xn = () => (se.length > 0 && (console.log(
  `
${S}vue-essential${y} ${N}simple prop${E} is used in ${se.length} files.`
), console.log(
  `👉 ${x}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], Sn = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), a = e.content.match(i);
  (c?.length || a?.length) && oe.push({ filePath: t });
}, jn = () => (oe.length > 0 && (console.log(
  `
${S}vue-essential${y} ${N}v-if used with v-for${E} in ${oe.length} files.`
), console.log(
  `👉 ${x}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], Nn = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(n);
  i?.length && (i.some((a) => a.includes(":key")) || re.push({ filePath: t }));
}, vn = () => (re.length > 0 && (console.log(
  `
${S}vue-essential${y} ${N}v-for has no key${E} in ${re.length} files.`
), console.log(
  `👉 ${x}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], Fn = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = De.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !i?.length && !a?.length && ie.push({ fileName: e });
}, Rn = () => (ie.length > 0 && (console.log(
  `
${S}vue-strong${y} ${N}component name is not PascalCase and not kebab-case${E} in ${ie.length} files.`
), console.log(
  `👉 ${x}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ie.forEach((e) => {
  console.log(`- ${N}${e.fileName}${E}`);
})), ie.length), ce = [], Ln = /^[a-z]+([A-Z][a-z]*)+$/, Wn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Ln.test(a)).length && ce.push({ filePath: t });
}, Tn = () => (ce.length > 0 && (console.log(
  `
${S}vue-strong${y} ${N}prop names are not camelCased${E} in ${ce.length} files.`
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
}, le = [], Pn = 40, Bn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > Pn) {
      const a = Se(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      le.push({ message: `${t}#${a} ${R}${h}${E}` });
    }
  });
}, In = () => (le.length > 0 && (console.log(
  `
${S}vue-strong${y} ${N}Lengthy template expression${E} found in ${le.length} files.`
), console.log(
  `👉 ${x}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), le.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), le.length), zn = /^(\(.*\)|\\?.)$/;
function G(e) {
  const t = e.toString();
  return zn.test(t) ? t : `(?:${t})`;
}
const Mn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Un = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function $(e) {
  const t = (n) => $(`(?<${n}>${`${e}`.replace(Mn, "$1$2")})`);
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
    grouped: () => $(`${e}`.replace(Un, "($1$3)$2")),
    at: {
      lineStart: () => $(`^${e}`),
      lineEnd: () => $(`${e}$`)
    }
  };
}
const Dn = /[.*+?^${}()|[\]\\/]/g;
function tt(e) {
  return $(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Me(e) {
  return $(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Gn = $(".");
$("\\b\\w+\\b");
const Oe = $("\\w");
$("\\b");
$("\\d");
$("\\s");
const Vn = Object.assign($("[a-zA-Z]"), {
  lowercase: $("[a-z]"),
  uppercase: $("[A-Z]")
}), qn = $("\\t"), Qn = $("\\n");
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
    e.map((t) => typeof t == "string" ? t.replace(Dn, "\\$&") : t).join("")
  );
}
function D(...e) {
  return $(`${G(M(...e))}+`);
}
const xe = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, ae = [], Zn = (e, t) => {
  const n = e.template, i = xe(
    "<",
    D(Oe),
    U(D(tt(` 	
\r`))),
    D(Me("/>")),
    U(D(tt(` 	
\r`))),
    U("/"),
    ">",
    ["g"]
  ), c = n.content.match(i);
  if (c === null)
    return;
  const a = xe(":", D(Oe), U(" "), "=", U(" "), Me(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const _ = Se(e.source, h);
      ae.push({ message: `${t}#${_} ${R}${d}${E}` });
    }
  });
}, Kn = () => (ae.length > 0 && (console.log(
  `
${S}vue-strong${y} ${N}Attribute value is not quoted${E} in ${ae.length} files.`
), console.log(
  `👉 ${x}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length), fe = [], Yn = (e, t) => {
  const n = e.template, i = xe(
    "<",
    D(Vn.uppercase, Oe),
    U(Qn, qn),
    U(D(Me(">"))),
    "></",
    D(Oe),
    ">",
    ["g"]
  ), c = n.content.match(i);
  c !== null && c.forEach((a) => {
    const h = Se(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    fe.push({ message: `${t}#${h} ${R}${d}${E}` });
  });
}, Hn = () => (fe.length > 0 && (console.log(
  `
${S}vue-strong${y} - ${N}Component is not self closing${E} in ${fe.length} files.`
), console.log(
  `👉 ${x}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), fe.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), fe.length), we = [], Ue = [], Xn = ["v-slot", "v-bind", "v-on"], Jn = (e, t) => {
  const n = e.template;
  Xn.forEach((i) => {
    if (n.content.includes(`${i}:`)) {
      const c = Se(e.source, i);
      we.push({ message: `${t}:${c} ${R}${i}${E}` }), Ue.some((a) => a.filePath === t) || Ue.push({ filePath: t });
    }
  });
}, kn = () => (we.length > 0 && (console.log(
  `
${S}vue-strong${y} ${N}Directive shorthands not used${E} in ${Ue.length} files.`
), console.log(
  `👉 ${x}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), we.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), we.length), ue = [], es = 5, ts = (e, t) => {
  const n = xe("defineProps", U("<"), U("("), "{", D(Gn), "}", ["g", "s"]), i = e.content.match(n);
  if (i?.length) {
    const c = i[0].split(",").length;
    c > es && ue.push({ fileName: t, propsCount: c });
  }
}, ns = () => (ue.length > 0 && (console.log(
  `
${S}rrd${y} ${R}too many props${E} are used in ${ue.length} files.`
), console.log(`👉 ${x}Try to refactor your code to use less properties.${y}`), ue.forEach((e) => {
  console.log(`- ${e.fileName} ${R}(${e.propsCount})${E}`);
})), ue.length), he = [], ft = 20, ss = (e, t) => {
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let i;
  for (; (i = n.exec(e.content)) !== null; ) {
    const c = i[1] || i[5];
    (i[2] || i[6]).split(`
`).length > ft && he.push({ filename: t, funcName: c });
  }
}, os = () => (he.length > 0 && (console.log(
  `
${S}rrd${y} ${R}function size${E} exceeds recommended limit in ${he.length} files.`
), console.log(`👉 ${x}Functions must be shorter than ${ft} lines${y}`), he.forEach((e) => {
  console.log(`- ${e.filename} 🚨 ${R}(${e.funcName})${E}`);
})), he.length);
let ut = 0;
const rs = [
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
], ht = (e, t) => {
  const n = Be.readdirSync(e);
  ut += n.length;
  for (const i of n) {
    const c = De.join(e, i);
    Be.statSync(c).isDirectory() ? rs.some((a) => c.includes(a)) && ht(c, t) : i.endsWith(".vue") && t(c);
  }
}, is = (e) => {
  console.log(`

${Ie}Analyzing Vue files in ${e}${E}`);
  let t = 0;
  ht(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const i = Be.readFileSync(n, "utf-8"), { descriptor: c } = Tt(i);
    An(n), Fn(n), c.script && pn(n);
    const a = c.scriptSetup || c.script;
    a && (On(a, n), Wn(a, n), un(a, n), yn(a, n), dn(a, n), ts(a, n), ss(a, n)), c.styles.forEach((h) => {
      Cn(h, n);
    }), c.template && (Nn(c.template, n), Sn(c.template, n), Yn(c, n), Bn(c.template, n), Zn(c, n), Jn(c, n));
  }), console.log(`Found ${Ie}${ut}${E} Vue files`), t += _n(), t += xn(), t += vn(), t += jn(), t += wn(), t += Rn(), t += Hn(), t += Tn(), t += In(), t += Kn(), t += kn(), t += hn(), t += gn(), t += En(), t += mn(), t += ns(), t += os(), t || console.log(`${fn}No code smells detected!${E}`);
};
wt(It(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }),
  (e) => {
    is(e.path);
  }
).help().argv;
