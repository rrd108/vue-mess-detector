import mt from "yargs";
import { format as Ye, inspect as bt } from "util";
import ve, { normalize as yt, resolve as D, dirname as Se, basename as $t, extname as Et, relative as At } from "path";
import Ne, { readFileSync as Le, statSync as He, readdirSync as _t, writeFile as wt } from "fs";
import { notStrictEqual as Ot, strictEqual as xt } from "assert";
import { fileURLToPath as Ct } from "url";
import { parse as jt } from "@vue/compiler-sfc";
class le extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, le);
  }
}
function Xe() {
  return St() ? 0 : 1;
}
function St() {
  return Nt() && !process.defaultApp;
}
function Nt() {
  return !!process.versions.electron;
}
function Rt(e) {
  return e.slice(Xe() + 1);
}
function Ft() {
  return process.argv[Xe()];
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
    let s = "", i = !1;
    const c = e.match(/^-+/);
    for (let f = c ? c[0].length : 0; f < e.length; f++) {
      let p = e.charAt(f);
      i && (i = !1, p = p.toUpperCase()), f !== 0 && (p === "-" || p === "_") ? i = !0 : p !== "-" && p !== "_" && (s += p);
    }
    return s;
  }
}
function Je(e, t) {
  const s = e.toLowerCase();
  t = t || "-";
  let i = "";
  for (let c = 0; c < e.length; c++) {
    const f = s.charAt(c), p = e.charAt(c);
    f !== p && c > 0 ? i += `${t}${s.charAt(c)}` : i += p;
  }
  return i;
}
function ke(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function vt(e) {
  if (Array.isArray(e))
    return e.map((p) => typeof p != "string" ? p + "" : p);
  e = e.trim();
  let t = 0, s = null, i = null, c = null;
  const f = [];
  for (let p = 0; p < e.length; p++) {
    if (s = i, i = e.charAt(p), i === " " && !c) {
      s !== " " && t++;
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
var L;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(L || (L = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let T;
class Lt {
  constructor(t) {
    T = t;
  }
  parse(t, s) {
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
    }, s), c = vt(t), f = typeof t == "string", p = Wt(Object.assign(/* @__PURE__ */ Object.create(null), i.alias)), m = Object.assign({
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
    }, i.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), i.default), x = i.configObjects || [], A = i.envPrefix, P = m["populate--"], M = P ? "--" : "_", he = /* @__PURE__ */ Object.create(null), We = /* @__PURE__ */ Object.create(null), V = i.__ || T.format, l = {
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
    }, W = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ee = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(i.array || []).filter(Boolean).forEach(function(n) {
      const r = typeof n == "object" ? n.key : n, u = Object.keys(n).map(function(a) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[a];
      }).filter(Boolean).pop();
      u && (l[u][r] = !0), l.arrays[r] = !0, l.keys.push(r);
    }), [].concat(i.boolean || []).filter(Boolean).forEach(function(n) {
      l.bools[n] = !0, l.keys.push(n);
    }), [].concat(i.string || []).filter(Boolean).forEach(function(n) {
      l.strings[n] = !0, l.keys.push(n);
    }), [].concat(i.number || []).filter(Boolean).forEach(function(n) {
      l.numbers[n] = !0, l.keys.push(n);
    }), [].concat(i.count || []).filter(Boolean).forEach(function(n) {
      l.counts[n] = !0, l.keys.push(n);
    }), [].concat(i.normalize || []).filter(Boolean).forEach(function(n) {
      l.normalize[n] = !0, l.keys.push(n);
    }), typeof i.narg == "object" && Object.entries(i.narg).forEach(([n, r]) => {
      typeof r == "number" && (l.nargs[n] = r, l.keys.push(n));
    }), typeof i.coerce == "object" && Object.entries(i.coerce).forEach(([n, r]) => {
      typeof r == "function" && (l.coercions[n] = r, l.keys.push(n));
    }), typeof i.config < "u" && (Array.isArray(i.config) || typeof i.config == "string" ? [].concat(i.config).filter(Boolean).forEach(function(n) {
      l.configs[n] = !0;
    }) : typeof i.config == "object" && Object.entries(i.config).forEach(([n, r]) => {
      (typeof r == "boolean" || typeof r == "function") && (l.configs[n] = r);
    })), lt(i.key, p, i.default, l.arrays), Object.keys(E).forEach(function(n) {
      (l.aliases[n] || []).forEach(function(r) {
        E[r] = E[n];
      });
    });
    let F = null;
    gt();
    let pe = [];
    const w = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Pe = {};
    for (let n = 0; n < c.length; n++) {
      const r = c[n], u = r.replace(/^-{3,}/, "---");
      let a, o, d, h, g, O;
      if (r !== "--" && /^-/.test(r) && be(r))
        Ae(r);
      else if (u.match(/^---+(=|$)/)) {
        Ae(r);
        continue;
      } else if (r.match(/^--.+=/) || !m["short-option-groups"] && r.match(/^-.+=/))
        h = r.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (y(h[1], l.arrays) ? n = ge(n, h[1], c, h[2]) : y(h[1], l.nargs) !== !1 ? n = de(n, h[1], c, h[2]) : $(h[1], h[2], !0));
      else if (r.match(Ee) && m["boolean-negation"])
        h = r.match(Ee), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], $(o, y(o, l.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !m["short-option-groups"] && r.match(/^-[^-]+/))
        h = r.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], y(o, l.arrays) ? n = ge(n, o, c) : y(o, l.nargs) !== !1 ? n = de(n, o, c) : (g = c[n + 1], g !== void 0 && (!g.match(/^-/) || g.match(W)) && !y(o, l.bools) && !y(o, l.counts) || /^(true|false)$/.test(g) ? ($(o, g), n++) : $(o, G(o))));
      else if (r.match(/^-.\..+=/))
        h = r.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && $(h[1], h[2]);
      else if (r.match(/^-.\..+/) && !r.match(W))
        g = c[n + 1], h = r.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], g !== void 0 && !g.match(/^-/) && !y(o, l.bools) && !y(o, l.counts) ? ($(o, g), n++) : $(o, G(o)));
      else if (r.match(/^-[^-]+/) && !r.match(W)) {
        d = r.slice(1, -1).split(""), a = !1;
        for (let C = 0; C < d.length; C++) {
          if (g = r.slice(C + 2), d[C + 1] && d[C + 1] === "=") {
            O = r.slice(C + 3), o = d[C], y(o, l.arrays) ? n = ge(n, o, c, O) : y(o, l.nargs) !== !1 ? n = de(n, o, c, O) : $(o, O), a = !0;
            break;
          }
          if (g === "-") {
            $(d[C], g);
            continue;
          }
          if (/[A-Za-z]/.test(d[C]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && y(g, l.bools) === !1) {
            $(d[C], g), a = !0;
            break;
          }
          if (d[C + 1] && d[C + 1].match(/\W/)) {
            $(d[C], g), a = !0;
            break;
          } else
            $(d[C], G(d[C]));
        }
        o = r.slice(-1)[0], !a && o !== "-" && (y(o, l.arrays) ? n = ge(n, o, c) : y(o, l.nargs) !== !1 ? n = de(n, o, c) : (g = c[n + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(W)) && !y(o, l.bools) && !y(o, l.counts) || /^(true|false)$/.test(g) ? ($(o, g), n++) : $(o, G(o))));
      } else if (r.match(/^-[0-9]$/) && r.match(W) && y(r.slice(1), l.bools))
        o = r.slice(1), $(o, G(o));
      else if (r === "--") {
        pe = c.slice(n + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        pe = c.slice(n);
        break;
      } else
        Ae(r);
    }
    Te(w, !0), Te(w, !1), rt(w), it(), Ie(w, l.aliases, E, !0), ct(w), m["set-placeholder-key"] && at(w), Object.keys(l.counts).forEach(function(n) {
      Q(w, n.split(".")) || $(n, 0);
    }), P && pe.length && (w[M] = []), pe.forEach(function(n) {
      w[M].push(n);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(w).filter((n) => n !== "--" && n.includes("-")).forEach((n) => {
      delete w[n];
    }), m["strip-aliased"] && [].concat(...Object.keys(p).map((n) => p[n])).forEach((n) => {
      m["camel-case-expansion"] && n.includes("-") && delete w[n.split(".").map((r) => H(r)).join(".")], delete w[n];
    });
    function Ae(n) {
      const r = me("_", n);
      (typeof r == "string" || typeof r == "number") && w._.push(r);
    }
    function de(n, r, u, a) {
      let o, d = y(r, l.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return B(a) || (F = Error(V("Argument unexpected for: %s", r))), $(r, G(r)), n;
      let h = B(a) ? 0 : 1;
      if (m["nargs-eats-options"])
        u.length - (n + 1) + h < d && (F = Error(V("Not enough arguments following: %s", r))), h = d;
      else {
        for (o = n + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(W) || be(u[o])); o++)
          h++;
        h < d && (F = Error(V("Not enough arguments following: %s", r)));
      }
      let g = Math.min(h, d);
      for (!B(a) && g > 0 && ($(r, a), g--), o = n + 1; o < g + n + 1; o++)
        $(r, u[o]);
      return n + g;
    }
    function ge(n, r, u, a) {
      let o = [], d = a || u[n + 1];
      const h = y(r, l.nargs);
      if (y(r, l.bools) && !/^(true|false)$/.test(d))
        o.push(!0);
      else if (B(d) || B(a) && /^-/.test(d) && !W.test(d) && !be(d)) {
        if (E[r] !== void 0) {
          const g = E[r];
          o = Array.isArray(g) ? g : [g];
        }
      } else {
        B(a) || o.push(_e(r, a, !0));
        for (let g = n + 1; g < u.length && !(!m["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (d = u[g], /^-/.test(d) && !W.test(d) && !be(d))); g++)
          n = g, o.push(_e(r, d, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (F = Error(V("Not enough arguments following: %s", r))), $(r, o), n;
    }
    function $(n, r, u = f) {
      if (/-/.test(n) && m["camel-case-expansion"]) {
        const d = n.split(".").map(function(h) {
          return H(h);
        }).join(".");
        Be(n, d);
      }
      const a = _e(n, r, u), o = n.split(".");
      K(w, o, a), l.aliases[n] && l.aliases[n].forEach(function(d) {
        const h = d.split(".");
        K(w, h, a);
      }), o.length > 1 && m["dot-notation"] && (l.aliases[o[0]] || []).forEach(function(d) {
        let h = d.split(".");
        const g = [].concat(o);
        g.shift(), h = h.concat(g), (l.aliases[n] || []).includes(h.join(".")) || K(w, h, a);
      }), y(n, l.normalize) && !y(n, l.arrays) && [n].concat(l.aliases[n] || []).forEach(function(h) {
        Object.defineProperty(Pe, h, {
          enumerable: !0,
          get() {
            return r;
          },
          set(g) {
            r = typeof g == "string" ? T.normalize(g) : g;
          }
        });
      });
    }
    function Be(n, r) {
      l.aliases[n] && l.aliases[n].length || (l.aliases[n] = [r], he[r] = !0), l.aliases[r] && l.aliases[r].length || Be(r, n);
    }
    function _e(n, r, u) {
      u && (r = Pt(r)), (y(n, l.bools) || y(n, l.counts)) && typeof r == "string" && (r = r === "true");
      let a = Array.isArray(r) ? r.map(function(o) {
        return me(n, o);
      }) : me(n, r);
      return y(n, l.counts) && (B(a) || typeof a == "boolean") && (a = Oe()), y(n, l.normalize) && y(n, l.arrays) && (Array.isArray(r) ? a = r.map((o) => T.normalize(o)) : a = T.normalize(r)), a;
    }
    function me(n, r) {
      return !m["parse-positional-numbers"] && n === "_" || !y(n, l.strings) && !y(n, l.bools) && !Array.isArray(r) && (ke(r) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !B(r) && y(n, l.numbers)) && (r = Number(r)), r;
    }
    function rt(n) {
      const r = /* @__PURE__ */ Object.create(null);
      Ie(r, l.aliases, E), Object.keys(l.configs).forEach(function(u) {
        const a = n[u] || r[u];
        if (a)
          try {
            let o = null;
            const d = T.resolve(T.cwd(), a), h = l.configs[u];
            if (typeof h == "function") {
              try {
                o = h(d);
              } catch (g) {
                o = g;
              }
              if (o instanceof Error) {
                F = o;
                return;
              }
            } else
              o = T.require(d);
            we(o);
          } catch (o) {
            o.name === "PermissionDenied" ? F = o : n[u] && (F = Error(V("Invalid JSON config file: %s", a)));
          }
      });
    }
    function we(n, r) {
      Object.keys(n).forEach(function(u) {
        const a = n[u], o = r ? r + "." + u : u;
        typeof a == "object" && a !== null && !Array.isArray(a) && m["dot-notation"] ? we(a, o) : (!Q(w, o.split(".")) || y(o, l.arrays) && m["combine-arrays"]) && $(o, a);
      });
    }
    function it() {
      typeof x < "u" && x.forEach(function(n) {
        we(n);
      });
    }
    function Te(n, r) {
      if (typeof A > "u")
        return;
      const u = typeof A == "string" ? A : "", a = T.env();
      Object.keys(a).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const d = o.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(u.length)), H(h);
          });
          (r && l.configs[d.join(".")] || !r) && !Q(n, d) && $(d.join("."), a[o]);
        }
      });
    }
    function ct(n) {
      let r;
      const u = /* @__PURE__ */ new Set();
      Object.keys(n).forEach(function(a) {
        if (!u.has(a) && (r = y(a, l.coercions), typeof r == "function"))
          try {
            const o = me(a, r(n[a]));
            [].concat(l.aliases[a] || [], a).forEach((d) => {
              u.add(d), n[d] = o;
            });
          } catch (o) {
            F = o;
          }
      });
    }
    function at(n) {
      return l.keys.forEach((r) => {
        ~r.indexOf(".") || typeof n[r] > "u" && (n[r] = void 0);
      }), n;
    }
    function Ie(n, r, u, a = !1) {
      Object.keys(u).forEach(function(o) {
        Q(n, o.split(".")) || (K(n, o.split("."), u[o]), a && (We[o] = !0), (r[o] || []).forEach(function(d) {
          Q(n, d.split(".")) || K(n, d.split("."), u[o]);
        }));
      });
    }
    function Q(n, r) {
      let u = n;
      m["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(o) {
        u = u[o] || {};
      });
      const a = r[r.length - 1];
      return typeof u != "object" ? !1 : a in u;
    }
    function K(n, r, u) {
      let a = n;
      m["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(O) {
        O = Me(O), typeof a == "object" && a[O] === void 0 && (a[O] = {}), typeof a[O] != "object" || Array.isArray(a[O]) ? (Array.isArray(a[O]) ? a[O].push({}) : a[O] = [a[O], {}], a = a[O][a[O].length - 1]) : a = a[O];
      });
      const o = Me(r[r.length - 1]), d = y(r.join("."), l.arrays), h = Array.isArray(u);
      let g = m["duplicate-arguments-array"];
      !g && y(o, l.nargs) && (g = !0, (!B(a[o]) && l.nargs[o] === 1 || Array.isArray(a[o]) && a[o].length === l.nargs[o]) && (a[o] = void 0)), u === Oe() ? a[o] = Oe(a[o]) : Array.isArray(a[o]) ? g && d && h ? a[o] = m["flatten-duplicate-arrays"] ? a[o].concat(u) : (Array.isArray(a[o][0]) ? a[o] : [a[o]]).concat([u]) : !g && !!d == !!h ? a[o] = u : a[o] = a[o].concat([u]) : a[o] === void 0 && d ? a[o] = h ? u : [u] : g && !(a[o] === void 0 || y(o, l.counts) || y(o, l.bools)) ? a[o] = [a[o], u] : a[o] = u;
    }
    function lt(...n) {
      n.forEach(function(r) {
        Object.keys(r || {}).forEach(function(u) {
          l.aliases[u] || (l.aliases[u] = [].concat(p[u] || []), l.aliases[u].concat(u).forEach(function(a) {
            if (/-/.test(a) && m["camel-case-expansion"]) {
              const o = H(a);
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), he[o] = !0);
            }
          }), l.aliases[u].concat(u).forEach(function(a) {
            if (a.length > 1 && /[A-Z]/.test(a) && m["camel-case-expansion"]) {
              const o = Je(a, "-");
              o !== u && l.aliases[u].indexOf(o) === -1 && (l.aliases[u].push(o), he[o] = !0);
            }
          }), l.aliases[u].forEach(function(a) {
            l.aliases[a] = [u].concat(l.aliases[u].filter(function(o) {
              return a !== o;
            }));
          }));
        });
      });
    }
    function y(n, r) {
      const u = [].concat(l.aliases[n] || [], n), a = Object.keys(r), o = u.find((d) => a.includes(d));
      return o ? r[o] : !1;
    }
    function ze(n) {
      const r = Object.keys(l);
      return [].concat(r.map((a) => l[a])).some(function(a) {
        return Array.isArray(a) ? a.includes(n) : a[n];
      });
    }
    function ft(n, ...r) {
      return [].concat(...r).some(function(a) {
        const o = n.match(a);
        return o && ze(o[1]);
      });
    }
    function ut(n) {
      if (n.match(W) || !n.match(/^-[^-]+/))
        return !1;
      let r = !0, u;
      const a = n.slice(1).split("");
      for (let o = 0; o < a.length; o++) {
        if (u = n.slice(o + 2), !ze(a[o])) {
          r = !1;
          break;
        }
        if (a[o + 1] && a[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(a[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || a[o + 1] && a[o + 1].match(/\W/))
          break;
      }
      return r;
    }
    function be(n) {
      return m["unknown-options-as-args"] && ht(n);
    }
    function ht(n) {
      return n = n.replace(/^-{3,}/, "--"), n.match(W) || ut(n) ? !1 : !ft(n, /^-+([^=]+?)=[\s\S]*$/, Ee, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function G(n) {
      return !y(n, l.bools) && !y(n, l.counts) && `${n}` in E ? E[n] : pt(dt(n));
    }
    function pt(n) {
      return {
        [L.BOOLEAN]: !0,
        [L.STRING]: "",
        [L.NUMBER]: void 0,
        [L.ARRAY]: []
      }[n];
    }
    function dt(n) {
      let r = L.BOOLEAN;
      return y(n, l.strings) ? r = L.STRING : y(n, l.numbers) ? r = L.NUMBER : y(n, l.bools) ? r = L.BOOLEAN : y(n, l.arrays) && (r = L.ARRAY), r;
    }
    function B(n) {
      return n === void 0;
    }
    function gt() {
      Object.keys(l.counts).find((n) => y(n, l.arrays) ? (F = Error(V("Invalid configuration: %s, opts.count excludes opts.array.", n)), !0) : y(n, l.nargs) ? (F = Error(V("Invalid configuration: %s, opts.count excludes opts.narg.", n)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(Pe, w),
      configuration: m,
      defaulted: Object.assign({}, We),
      error: F,
      newAliases: Object.assign({}, he)
    };
  }
}
function Wt(e) {
  const t = [], s = /* @__PURE__ */ Object.create(null);
  let i = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); i; ) {
    i = !1;
    for (let c = 0; c < t.length; c++)
      for (let f = c + 1; f < t.length; f++)
        if (t[c].filter(function(m) {
          return t[f].indexOf(m) !== -1;
        }).length) {
          t[c] = t[c].concat(t[f]), t.splice(f, 1), i = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(p, m, E) {
      return E.indexOf(p) === m;
    });
    const f = c.pop();
    f !== void 0 && typeof f == "string" && (s[f] = c);
  }), s;
}
function Oe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Me(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Pt(e) {
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
var xe, Ce, je;
const Ve = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Ge = (Ce = (xe = process == null ? void 0 : process.versions) === null || xe === void 0 ? void 0 : xe.node) !== null && Ce !== void 0 ? Ce : (je = process == null ? void 0 : process.version) === null || je === void 0 ? void 0 : je.slice(1);
if (Ge && Number(Ge.match(/^([^.]+)/)[1]) < Ve)
  throw Error(`yargs parser supports a minimum Node.js version of ${Ve}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Bt = process ? process.env : {}, et = new Lt({
  cwd: process.cwd,
  env: () => Bt,
  format: Ye,
  normalize: yt,
  resolve: D,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Le(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ue = function(t, s) {
  return et.parse(t.slice(), s).argv;
};
ue.detailed = function(e, t) {
  return et.parse(e.slice(), t);
};
ue.camelCase = H;
ue.decamelize = Je;
ue.looksLikeNumber = ke;
const Tt = {
  right: Ut,
  center: Dt
}, It = 0, ye = 1, zt = 2, $e = 3;
class Mt {
  constructor(t) {
    var s;
    this.width = t.width, this.wrap = (s = t.wrap) !== null && s !== void 0 ? s : !0, this.rows = [];
  }
  span(...t) {
    const s = this.div(...t);
    s.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const s = t.map((i) => typeof i == "string" ? this.colFromString(i) : i);
    return this.rows.push(s), s;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const s = t.split(`
`).map((c) => c.split("	"));
    let i = 0;
    return s.forEach((c) => {
      c.length > 1 && j.stringWidth(c[0]) > i && (i = Math.min(Math.floor(this.width * 0.5), j.stringWidth(c[0])));
    }), s.forEach((c) => {
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
    const s = j.stripAnsi(t);
    return [0, s.match(/\s*$/)[0].length, 0, s.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((s) => {
      this.rowToString(s, t);
    }), t.filter((s) => !s.hidden).map((s) => s.text).join(`
`);
  }
  rowToString(t, s) {
    return this.rasterize(t).forEach((i, c) => {
      let f = "";
      i.forEach((p, m) => {
        const { width: E } = t[m], x = this.negatePadding(t[m]);
        let A = p;
        if (x > j.stringWidth(p) && (A += " ".repeat(x - j.stringWidth(p))), t[m].align && t[m].align !== "left" && this.wrap) {
          const M = Tt[t[m].align];
          A = M(A, x), j.stringWidth(A) < x && (A += " ".repeat((E || 0) - j.stringWidth(A) - 1));
        }
        const P = t[m].padding || [0, 0, 0, 0];
        P[$e] && (f += " ".repeat(P[$e])), f += Ue(t[m], A, "| "), f += A, f += Ue(t[m], A, " |"), P[ye] && (f += " ".repeat(P[ye])), c === 0 && s.length > 0 && (f = this.renderInline(f, s[s.length - 1]));
      }), s.push({
        text: f.replace(/ +$/, ""),
        span: t.span
      });
    }), s;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, s) {
    const i = t.match(/^ */), c = i ? i[0].length : 0, f = s.text, p = j.stringWidth(f.trimRight());
    return s.span ? this.wrap ? c < p ? t : (s.hidden = !0, f.trimRight() + " ".repeat(c - p) + t.trimLeft()) : (s.hidden = !0, f + t) : t;
  }
  rasterize(t) {
    const s = [], i = this.columnWidths(t);
    let c;
    return t.forEach((f, p) => {
      f.width = i[p], this.wrap ? c = j.wrap(f.text, this.negatePadding(f), { hard: !0 }).split(`
`) : c = f.text.split(`
`), f.border && (c.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (c.unshift(...new Array(f.padding[It] || 0).fill("")), c.push(...new Array(f.padding[zt] || 0).fill(""))), c.forEach((m, E) => {
        s[E] || s.push([]);
        const x = s[E];
        for (let A = 0; A < p; A++)
          x[A] === void 0 && x.push("");
        x.push(m);
      });
    }), s;
  }
  negatePadding(t) {
    let s = t.width || 0;
    return t.padding && (s -= (t.padding[$e] || 0) + (t.padding[ye] || 0)), t.border && (s -= 4), s;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || j.stringWidth(p.text));
    let s = t.length, i = this.width;
    const c = t.map((p) => {
      if (p.width)
        return s--, i -= p.width, p.width;
    }), f = s ? Math.floor(i / s) : 0;
    return c.map((p, m) => p === void 0 ? Math.max(f, Vt(t[m])) : p);
  }
}
function Ue(e, t, s) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? s : "  " : "";
}
function Vt(e) {
  const t = e.padding || [], s = 1 + (t[$e] || 0) + (t[ye] || 0);
  return e.border ? s + 4 : s;
}
function Gt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Ut(e, t) {
  e = e.trim();
  const s = j.stringWidth(e);
  return s < t ? " ".repeat(t - s) + e : e;
}
function Dt(e, t) {
  e = e.trim();
  const s = j.stringWidth(e);
  return s >= t ? e : " ".repeat(t - s >> 1) + e;
}
let j;
function qt(e, t) {
  return j = t, new Mt({
    width: e?.width || Gt(),
    wrap: e?.wrap
  });
}
const tt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function nt(e) {
  return e.replace(tt, "");
}
function Qt(e, t) {
  const [s, i] = e.match(tt) || ["", ""];
  e = nt(e);
  let c = "";
  for (let f = 0; f < e.length; f++)
    f !== 0 && f % t === 0 && (c += `
`), c += e.charAt(f);
  return s && i && (c = `${s}${c}${i}`), c;
}
function Kt(e) {
  return qt(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: nt,
    wrap: Qt
  });
}
function Zt(e, t) {
  let s = D(".", e), i;
  for (He(s).isDirectory() || (s = Se(s)); ; ) {
    if (i = t(s, _t(s)), i)
      return D(s, i);
    if (s = Se(i = s), i === s)
      break;
  }
}
const Yt = {
  fs: {
    readFileSync: Le,
    writeFile: wt
  },
  format: Ye,
  resolve: D,
  exists: (e) => {
    try {
      return He(e).isFile();
    } catch {
      return !1;
    }
  }
};
let v;
class Ht {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const s = t.shift();
    let i = function() {
    };
    return typeof t[t.length - 1] == "function" && (i = t.pop()), i = i || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][s] && this.updateFiles ? (this.cache[this.locale][s] = s, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i(), v.format.apply(v.format, [this.cache[this.locale][s] || s].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), s = t.shift(), i = t.shift(), c = t.shift();
    let f = function() {
    };
    typeof t[t.length - 1] == "function" && (f = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = c === 1 ? s : i;
    this.cache[this.locale][s] && (p = this.cache[this.locale][s][c === 1 ? "one" : "other"]), !this.cache[this.locale][s] && this.updateFiles ? (this.cache[this.locale][s] = {
      one: s,
      other: i
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: f
    })) : f();
    const m = [p];
    return ~p.indexOf("%d") && m.push(c), v.format.apply(v.format, m.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (this.cache[this.locale][s] = t[s]);
  }
  _taggedLiteral(t, ...s) {
    let i = "";
    return t.forEach(function(c, f) {
      const p = s[f + 1];
      i += c, typeof p < "u" && (i += "%s");
    }), this.__.apply(this, [i].concat([].slice.call(s, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, s = this.writeQueue[0], i = s.directory, c = s.locale, f = s.cb, p = this._resolveLocaleFile(i, c), m = JSON.stringify(this.cache[c], null, 2);
    v.fs.writeFile(p, m, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), f(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const s = this._resolveLocaleFile(this.directory, this.locale);
    try {
      v.fs.readFileSync && (t = JSON.parse(v.fs.readFileSync(s, "utf-8")));
    } catch (i) {
      if (i instanceof SyntaxError && (i.message = "syntax error in " + s), i.code === "ENOENT")
        t = {};
      else
        throw i;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, s) {
    let i = v.resolve(t, "./", s + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(i) && ~s.lastIndexOf("_")) {
      const c = v.resolve(t, "./", s.split("_")[0] + ".json");
      this._fileExistsSync(c) && (i = c);
    }
    return i;
  }
  _fileExistsSync(t) {
    return v.exists(t);
  }
}
function Xt(e, t) {
  v = t;
  const s = new Ht(e);
  return {
    __: s.__.bind(s),
    __n: s.__n.bind(s),
    setLocale: s.setLocale.bind(s),
    getLocale: s.getLocale.bind(s),
    updateLocale: s.updateLocale.bind(s),
    locale: s.locale
  };
}
const Jt = (e) => Xt(e, Yt), kt = "require is not supported by ESM", De = "loading a directory of commands is not supported yet for ESM";
let fe;
try {
  fe = Ct(import.meta.url);
} catch {
  fe = process.cwd();
}
const en = fe.substring(0, fe.lastIndexOf("node_modules"));
Ot, xt, bt, en || process.cwd(), $t, Se, Et, At, D, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Le, Jt({
  directory: D(fe, "../../../locales"),
  updateFiles: !1
});
const Re = "\x1B[44m", q = "\x1B[43m", S = "\x1B[41m", tn = "\x1B[42m", _ = "\x1B[0m", N = "\x1B[33m", R = "\x1B[0m", Fe = 50, X = [], nn = (e, t) => {
  const s = e.content.split(`
`);
  s.length > Fe && X.push({ fileName: t, scriptLength: s.length });
}, sn = () => (X.length > 0 && (console.log(`
${S}Long <script> blocks${_} in ${X.length} files.`), console.log(
  `👉 ${N}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Fe} lines.${R}`
), X.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Fe * 2 ? S : q}(${e.scriptLength} lines)${_}`
  );
})), X.length), J = [], on = (e) => {
  J.push(e);
}, rn = () => (J.length > 0 && (console.log(`
${q}Plain <script> blocks${_} in ${J.length} files.`), console.log(`👉 ${N} Consider using <script setup> to leverage the new SFC <script> syntax.${R}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], cn = (e, t) => {
  const s = /\belse\b/gi, i = e.content.match(s);
  i?.length && k.push({ fileName: t, elseCount: i.length });
}, an = () => (k.length > 0 && (console.log(`
${q}else conditions${_} are used in ${k.length} files.`), console.log(`👉 ${N}Try to rewrite the conditions in a way that the else clause is not necessary.${R}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${q}(${e.elseCount})${_}`);
})), k.length), ln = 5, fn = 10, ee = [], un = (e, t) => {
  const s = /\bif\b/gi, i = /\belse\b/gi, c = /\bfor\b/gi, f = /\bwhile\b/gi, p = /\bcase\b/gi, m = e.content.match(s), E = e.content.match(i), x = e.content.match(c), A = e.content.match(f), P = e.content.match(p), M = (m?.length || 0) + (E?.length || 0) + (x?.length || 0) + (A?.length || 0) + (P?.length || 0);
  M > ln && ee.push({ fileName: t, cyclomaticComplexity: M });
}, hn = () => (ee.length > 0 && (console.log(
  `
${Re}cyclomaticComplexity${_} is above moderate in ${ee.length} files.`
), console.log(`👉 ${N}Try to reduce complexity.${R}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > fn ? S : q}(${e.cyclomaticComplexity})${_}`
  );
})), ee.length), te = [], pn = (e) => {
  if (e.includes("pages"))
    return;
  const t = ve.basename(e);
  if (t === "App.vue")
    return;
  const s = /[A-Z]/;
  t.slice(1).match(s)?.length || te.push({ filePath: e });
}, dn = () => (te.length > 0 && (console.log(`
${S}single name component${_} is used in ${te.length} files.`), console.log(
  `👉 ${N}Rename the component to use multi-word name.${R} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], gn = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, mn = () => (ne.length > 0 && (console.log(`
${S}Global style ${_} is used in ${ne.length} files.`), console.log(
  `👉 ${N}Use <style scoped>.${R} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], bn = (e, t) => {
  const s = /defineProps\(\[/gi;
  e.content.match(s)?.length && se.push({ filePath: t });
}, yn = () => (se.length > 0 && (console.log(`
${S}simple prop${_} is used in ${se.length} files.`), console.log(
  `👉 ${N}Add at least type definition.${R} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], $n = (e, t) => {
  const s = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, i = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(s), f = e.content.match(i);
  (c?.length || f?.length) && oe.push({ filePath: t });
}, En = () => (oe.length > 0 && (console.log(`
${S}v-if used with v-for${_} in ${oe.length} files.`), console.log(
  `👉 ${N}Move out the v-if to a computed property.${R} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), re = [], An = (e, t) => {
  const s = /<[^>]+ v-for[^>]+>/gi, i = e.content.match(s);
  i?.length && (i.some((f) => f.includes(":key")) || re.push({ filePath: t }));
}, _n = () => (re.length > 0 && (console.log(`
${S}v-for has no key${_} in ${re.length} files.`), console.log(
  `👉 ${N}Add a \`:key\` property to all v-for.${R} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), re.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), re.length), ie = [], wn = (e) => {
  const t = ve.basename(e), s = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, i = t.match(s), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = t.match(c);
  !i?.length && !f?.length && ie.push({ fileName: e });
}, On = () => (ie.length > 0 && (console.log(
  `
${S}component name is not PascalCase and not kebab-abse${_} in ${ie.length} files.`
), console.log(
  `👉 ${N}Rename the component to use PascalCase or kebab-case file name.${R} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ie.forEach((e) => {
  console.log(`- ${S}${e.fileName}${_}`);
})), ie.length), ce = [], xn = /^[a-z]+([A-Z][a-z]*)+$/, Cn = (e, t) => {
  const s = /defineProps\({([^}]+)/g;
  let i;
  for (; (i = s.exec(e.content)) !== null; )
    i[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !xn.test(f)).length && ce.push({ filePath: t });
}, jn = () => (ce.length > 0 && (console.log(`
${S}prop names are not camelCased${_} in ${ce.length} files.`), console.log(
  `👉 ${N}Rename the props to camelCase.${R} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), U = [], Sn = 40, Nn = (e, t) => {
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(s)].map((c) => c[1].trim()).forEach((c) => {
    c.length > Sn && (U.some((f) => f.filePath === t) || U.push({ filePath: t }));
  });
}, Rn = () => (U.length > 0 && (console.log(`
${S}Lengthy template expression${_} found in ${U.length} files.`), console.log(
  `👉 ${N}Refactor the expression into a computed property.${R} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), U.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), U.length), Fn = /^(\(.*\)|\\?.)$/;
function z(e) {
  const t = e.toString();
  return Fn.test(t) ? t : `(?:${t})`;
}
const vn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Ln = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (s) => b(`(?<${s}>${`${e}`.replace(vn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...s) => b(`${e}${I(...s)}`), {
      referenceTo: (s) => b(`${e}\\k<${s}>`)
    }),
    or: (...s) => b(`(?:${e}|${I(...s)})`),
    after: (...s) => b(`(?<=${I(...s)})${e}`),
    before: (...s) => b(`${e}(?=${I(...s)})`),
    notAfter: (...s) => b(`(?<!${I(...s)})${e}`),
    notBefore: (...s) => b(`${e}(?!${I(...s)})`),
    times: Object.assign((s) => b(`${z(e)}{${s}}`), {
      any: () => b(`${z(e)}*`),
      atLeast: (s) => b(`${z(e)}{${s},}`),
      atMost: (s) => b(`${z(e)}{0,${s}}`),
      between: (s, i) => b(`${z(e)}{${s},${i}}`)
    }),
    optionally: () => b(`${z(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Ln, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const Wn = /[.*+?^${}()|[\]\\/]/g;
function qe(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Qe(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
b(".");
b("\\b\\w+\\b");
const Ke = b("\\w");
b("\\b");
b("\\d");
b("\\s");
Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
});
b("\\t");
b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function Z(...e) {
  return b(`${z(I(...e))}?`);
}
function I(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(Wn, "\\$&") : t).join("")
  );
}
function Y(...e) {
  return b(`${z(I(...e))}+`);
}
const Ze = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(I(...e).toString(), [...t || ""].join(""));
}, ae = [], Pn = (e, t) => {
  const s = e.template, i = Ze(
    "<",
    Y(Ke),
    Z(Y(qe(` 	
\r`))),
    Y(Qe("/>")),
    Z(Y(qe(` 	
\r`))),
    Z("/"),
    ">",
    ["g"]
  ), c = s.content.match(i);
  if (c === null)
    return;
  const f = Ze(":", Y(Ke), Z(" "), "=", Z(" "), Qe(`'"`), [
    "g"
  ]);
  e.scriptSetup || e.script, c.forEach((p) => {
    if (!p.includes(":"))
      return;
    const m = p.match(f);
    if (m?.length) {
      const x = e.source.split(`
`).findIndex((A) => A.includes(m[0])) + 1;
      ae.push({ message: `${t}#${x} ${q}${m}${_}` });
    }
  });
}, Bn = () => (ae.length > 0 && (console.log(`
${S}Attribute value is not quoted${_} in ${ae.length} files.`), console.log(
  `👉 ${N}Use quotes for attribute values.${R} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length);
let st = 0;
const ot = (e, t) => {
  const s = Ne.readdirSync(e);
  st += s.length;
  for (const i of s) {
    const c = ve.join(e, i);
    Ne.statSync(c).isDirectory() ? ot(c, t) : i.endsWith(".vue") && t(c);
  }
}, Tn = (e) => {
  console.log(`

${Re}Analyzing Vue files in ${e}${_}`);
  let t = 0;
  ot(e, (s) => {
    const i = Ne.readFileSync(s, "utf-8"), { descriptor: c } = jt(i);
    pn(s), wn(s), c.script && on(s);
    const f = c.scriptSetup || c.script;
    f && (bn(f, s), Cn(f, s), nn(f, s), un(f, s), cn(f, s)), c.styles.forEach((p) => {
      gn(p, s);
    }), c.template && (An(c.template, s), $n(c.template, s), Nn(c.template, s), Pn(c, s));
  }), console.log(`Found ${Re}${st}${_} Vue files`), t += dn(), t += yn(), t += _n(), t += En(), t += mn(), t += On(), t += jn(), t += Rn(), t += Bn(), t += sn(), t += rn(), t += hn(), t += an(), t || console.log(`${tn}No code smells detected!${_}`);
};
mt(Rt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (e) => {
    Tn(e.path);
  }
).help().argv;
