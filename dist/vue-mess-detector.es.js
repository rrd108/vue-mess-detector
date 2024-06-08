import $t from "yargs";
import { format as He, inspect as yt } from "util";
import Be, { normalize as Et, resolve as K, dirname as Fe, basename as At, extname as _t, relative as wt } from "path";
import Re, { readFileSync as Te, statSync as Xe, readdirSync as Ot, writeFile as Ct } from "fs";
import { notStrictEqual as xt, strictEqual as jt } from "assert";
import { fileURLToPath as St } from "url";
import { parse as Nt } from "@vue/compiler-sfc";
class fe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, fe);
  }
}
function Je() {
  return Ft() ? 0 : 1;
}
function Ft() {
  return Rt() && !process.defaultApp;
}
function Rt() {
  return !!process.versions.electron;
}
function vt(e) {
  return e.slice(Je() + 1);
}
function Lt() {
  return process.argv[Je()];
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
    let n = "", r = !1;
    const c = e.match(/^-+/);
    for (let f = c ? c[0].length : 0; f < e.length; f++) {
      let p = e.charAt(f);
      r && (r = !1, p = p.toUpperCase()), f !== 0 && (p === "-" || p === "_") ? r = !0 : p !== "-" && p !== "_" && (n += p);
    }
    return n;
  }
}
function ke(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let r = "";
  for (let c = 0; c < e.length; c++) {
    const f = n.charAt(c), p = e.charAt(c);
    f !== p && c > 0 ? r += `${t}${n.charAt(c)}` : r += p;
  }
  return r;
}
function et(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Wt(e) {
  if (Array.isArray(e))
    return e.map((p) => typeof p != "string" ? p + "" : p);
  e = e.trim();
  let t = 0, n = null, r = null, c = null;
  const f = [];
  for (let p = 0; p < e.length; p++) {
    if (n = r, r = e.charAt(p), r === " " && !c) {
      n !== " " && t++;
      continue;
    }
    r === c ? c = null : (r === "'" || r === '"') && !c && (c = r), f[t] || (f[t] = ""), f[t] += r;
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
class Pt {
  constructor(t) {
    T = t;
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
    }, n), c = Wt(t), f = typeof t == "string", p = Bt(Object.assign(/* @__PURE__ */ Object.create(null), r.alias)), d = Object.assign({
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
    }, r.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), r.default), N = r.configObjects || [], _ = r.envPrefix, P = d["populate--"], V = P ? "--" : "_", pe = /* @__PURE__ */ Object.create(null), Ie = /* @__PURE__ */ Object.create(null), G = r.__ || T.format, a = {
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
    }, W = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, _e = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(r.array || []).filter(Boolean).forEach(function(s) {
      const i = typeof s == "object" ? s.key : s, u = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      u && (a[u][i] = !0), a.arrays[i] = !0, a.keys.push(i);
    }), [].concat(r.boolean || []).filter(Boolean).forEach(function(s) {
      a.bools[s] = !0, a.keys.push(s);
    }), [].concat(r.string || []).filter(Boolean).forEach(function(s) {
      a.strings[s] = !0, a.keys.push(s);
    }), [].concat(r.number || []).filter(Boolean).forEach(function(s) {
      a.numbers[s] = !0, a.keys.push(s);
    }), [].concat(r.count || []).filter(Boolean).forEach(function(s) {
      a.counts[s] = !0, a.keys.push(s);
    }), [].concat(r.normalize || []).filter(Boolean).forEach(function(s) {
      a.normalize[s] = !0, a.keys.push(s);
    }), typeof r.narg == "object" && Object.entries(r.narg).forEach(([s, i]) => {
      typeof i == "number" && (a.nargs[s] = i, a.keys.push(s));
    }), typeof r.coerce == "object" && Object.entries(r.coerce).forEach(([s, i]) => {
      typeof i == "function" && (a.coercions[s] = i, a.keys.push(s));
    }), typeof r.config < "u" && (Array.isArray(r.config) || typeof r.config == "string" ? [].concat(r.config).filter(Boolean).forEach(function(s) {
      a.configs[s] = !0;
    }) : typeof r.config == "object" && Object.entries(r.config).forEach(([s, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (a.configs[s] = i);
    })), ut(r.key, p, r.default, a.arrays), Object.keys(E).forEach(function(s) {
      (a.aliases[s] || []).forEach(function(i) {
        E[i] = E[s];
      });
    });
    let R = null;
    bt();
    let ge = [];
    const w = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ze = {};
    for (let s = 0; s < c.length; s++) {
      const i = c[s], u = i.replace(/^-{3,}/, "---");
      let l, o, g, h, m, O;
      if (i !== "--" && /^-/.test(i) && $e(i))
        we(i);
      else if (u.match(/^---+(=|$)/)) {
        we(i);
        continue;
      } else if (i.match(/^--.+=/) || !d["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && ($(h[1], a.arrays) ? s = me(s, h[1], c, h[2]) : $(h[1], a.nargs) !== !1 ? s = de(s, h[1], c, h[2]) : y(h[1], h[2], !0));
      else if (i.match(_e) && d["boolean-negation"])
        h = i.match(_e), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], y(o, $(o, a.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !d["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], $(o, a.arrays) ? s = me(s, o, c) : $(o, a.nargs) !== !1 ? s = de(s, o, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(W)) && !$(o, a.bools) && !$(o, a.counts) || /^(true|false)$/.test(m) ? (y(o, m), s++) : y(o, q(o))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(W))
        m = c[s + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (o = h[1], m !== void 0 && !m.match(/^-/) && !$(o, a.bools) && !$(o, a.counts) ? (y(o, m), s++) : y(o, q(o)));
      else if (i.match(/^-[^-]+/) && !i.match(W)) {
        g = i.slice(1, -1).split(""), l = !1;
        for (let C = 0; C < g.length; C++) {
          if (m = i.slice(C + 2), g[C + 1] && g[C + 1] === "=") {
            O = i.slice(C + 3), o = g[C], $(o, a.arrays) ? s = me(s, o, c, O) : $(o, a.nargs) !== !1 ? s = de(s, o, c, O) : y(o, O), l = !0;
            break;
          }
          if (m === "-") {
            y(g[C], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[C]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && $(m, a.bools) === !1) {
            y(g[C], m), l = !0;
            break;
          }
          if (g[C + 1] && g[C + 1].match(/\W/)) {
            y(g[C], m), l = !0;
            break;
          } else
            y(g[C], q(g[C]));
        }
        o = i.slice(-1)[0], !l && o !== "-" && ($(o, a.arrays) ? s = me(s, o, c) : $(o, a.nargs) !== !1 ? s = de(s, o, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(W)) && !$(o, a.bools) && !$(o, a.counts) || /^(true|false)$/.test(m) ? (y(o, m), s++) : y(o, q(o))));
      } else if (i.match(/^-[0-9]$/) && i.match(W) && $(i.slice(1), a.bools))
        o = i.slice(1), y(o, q(o));
      else if (i === "--") {
        ge = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        ge = c.slice(s);
        break;
      } else
        we(i);
    }
    Ve(w, !0), Ve(w, !1), ct(w), lt(), Ge(w, a.aliases, E, !0), at(w), d["set-placeholder-key"] && ft(w), Object.keys(a.counts).forEach(function(s) {
      Z(w, s.split(".")) || y(s, 0);
    }), P && ge.length && (w[V] = []), ge.forEach(function(s) {
      w[V].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(w).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete w[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(p).map((s) => p[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete w[s.split(".").map((i) => H(i)).join(".")], delete w[s];
    });
    function we(s) {
      const i = be("_", s);
      (typeof i == "string" || typeof i == "number") && w._.push(i);
    }
    function de(s, i, u, l) {
      let o, g = $(i, a.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return B(l) || (R = Error(G("Argument unexpected for: %s", i))), y(i, q(i)), s;
      let h = B(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        u.length - (s + 1) + h < g && (R = Error(G("Not enough arguments following: %s", i))), h = g;
      else {
        for (o = s + 1; o < u.length && (!u[o].match(/^-[^0-9]/) || u[o].match(W) || $e(u[o])); o++)
          h++;
        h < g && (R = Error(G("Not enough arguments following: %s", i)));
      }
      let m = Math.min(h, g);
      for (!B(l) && m > 0 && (y(i, l), m--), o = s + 1; o < m + s + 1; o++)
        y(i, u[o]);
      return s + m;
    }
    function me(s, i, u, l) {
      let o = [], g = l || u[s + 1];
      const h = $(i, a.nargs);
      if ($(i, a.bools) && !/^(true|false)$/.test(g))
        o.push(!0);
      else if (B(g) || B(l) && /^-/.test(g) && !W.test(g) && !$e(g)) {
        if (E[i] !== void 0) {
          const m = E[i];
          o = Array.isArray(m) ? m : [m];
        }
      } else {
        B(l) || o.push(Oe(i, l, !0));
        for (let m = s + 1; m < u.length && !(!d["greedy-arrays"] && o.length > 0 || h && typeof h == "number" && o.length >= h || (g = u[m], /^-/.test(g) && !W.test(g) && !$e(g))); m++)
          s = m, o.push(Oe(i, g, f));
      }
      return typeof h == "number" && (h && o.length < h || isNaN(h) && o.length === 0) && (R = Error(G("Not enough arguments following: %s", i))), y(i, o), s;
    }
    function y(s, i, u = f) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(h) {
          return H(h);
        }).join(".");
        Me(s, g);
      }
      const l = Oe(s, i, u), o = s.split(".");
      Y(w, o, l), a.aliases[s] && a.aliases[s].forEach(function(g) {
        const h = g.split(".");
        Y(w, h, l);
      }), o.length > 1 && d["dot-notation"] && (a.aliases[o[0]] || []).forEach(function(g) {
        let h = g.split(".");
        const m = [].concat(o);
        m.shift(), h = h.concat(m), (a.aliases[s] || []).includes(h.join(".")) || Y(w, h, l);
      }), $(s, a.normalize) && !$(s, a.arrays) && [s].concat(a.aliases[s] || []).forEach(function(h) {
        Object.defineProperty(ze, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(m) {
            i = typeof m == "string" ? T.normalize(m) : m;
          }
        });
      });
    }
    function Me(s, i) {
      a.aliases[s] && a.aliases[s].length || (a.aliases[s] = [i], pe[i] = !0), a.aliases[i] && a.aliases[i].length || Me(i, s);
    }
    function Oe(s, i, u) {
      u && (i = Tt(i)), ($(s, a.bools) || $(s, a.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(o) {
        return be(s, o);
      }) : be(s, i);
      return $(s, a.counts) && (B(l) || typeof l == "boolean") && (l = xe()), $(s, a.normalize) && $(s, a.arrays) && (Array.isArray(i) ? l = i.map((o) => T.normalize(o)) : l = T.normalize(i)), l;
    }
    function be(s, i) {
      return !d["parse-positional-numbers"] && s === "_" || !$(s, a.strings) && !$(s, a.bools) && !Array.isArray(i) && (et(i) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !B(i) && $(s, a.numbers)) && (i = Number(i)), i;
    }
    function ct(s) {
      const i = /* @__PURE__ */ Object.create(null);
      Ge(i, a.aliases, E), Object.keys(a.configs).forEach(function(u) {
        const l = s[u] || i[u];
        if (l)
          try {
            let o = null;
            const g = T.resolve(T.cwd(), l), h = a.configs[u];
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
              o = T.require(g);
            Ce(o);
          } catch (o) {
            o.name === "PermissionDenied" ? R = o : s[u] && (R = Error(G("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ce(s, i) {
      Object.keys(s).forEach(function(u) {
        const l = s[u], o = i ? i + "." + u : u;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Ce(l, o) : (!Z(w, o.split(".")) || $(o, a.arrays) && d["combine-arrays"]) && y(o, l);
      });
    }
    function lt() {
      typeof N < "u" && N.forEach(function(s) {
        Ce(s);
      });
    }
    function Ve(s, i) {
      if (typeof _ > "u")
        return;
      const u = typeof _ == "string" ? _ : "", l = T.env();
      Object.keys(l).forEach(function(o) {
        if (u === "" || o.lastIndexOf(u, 0) === 0) {
          const g = o.split("__").map(function(h, m) {
            return m === 0 && (h = h.substring(u.length)), H(h);
          });
          (i && a.configs[g.join(".")] || !i) && !Z(s, g) && y(g.join("."), l[o]);
        }
      });
    }
    function at(s) {
      let i;
      const u = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!u.has(l) && (i = $(l, a.coercions), typeof i == "function"))
          try {
            const o = be(l, i(s[l]));
            [].concat(a.aliases[l] || [], l).forEach((g) => {
              u.add(g), s[g] = o;
            });
          } catch (o) {
            R = o;
          }
      });
    }
    function ft(s) {
      return a.keys.forEach((i) => {
        ~i.indexOf(".") || typeof s[i] > "u" && (s[i] = void 0);
      }), s;
    }
    function Ge(s, i, u, l = !1) {
      Object.keys(u).forEach(function(o) {
        Z(s, o.split(".")) || (Y(s, o.split("."), u[o]), l && (Ie[o] = !0), (i[o] || []).forEach(function(g) {
          Z(s, g.split(".")) || Y(s, g.split("."), u[o]);
        }));
      });
    }
    function Z(s, i) {
      let u = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(o) {
        u = u[o] || {};
      });
      const l = i[i.length - 1];
      return typeof u != "object" ? !1 : l in u;
    }
    function Y(s, i, u) {
      let l = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(O) {
        O = De(O), typeof l == "object" && l[O] === void 0 && (l[O] = {}), typeof l[O] != "object" || Array.isArray(l[O]) ? (Array.isArray(l[O]) ? l[O].push({}) : l[O] = [l[O], {}], l = l[O][l[O].length - 1]) : l = l[O];
      });
      const o = De(i[i.length - 1]), g = $(i.join("."), a.arrays), h = Array.isArray(u);
      let m = d["duplicate-arguments-array"];
      !m && $(o, a.nargs) && (m = !0, (!B(l[o]) && a.nargs[o] === 1 || Array.isArray(l[o]) && l[o].length === a.nargs[o]) && (l[o] = void 0)), u === xe() ? l[o] = xe(l[o]) : Array.isArray(l[o]) ? m && g && h ? l[o] = d["flatten-duplicate-arrays"] ? l[o].concat(u) : (Array.isArray(l[o][0]) ? l[o] : [l[o]]).concat([u]) : !m && !!g == !!h ? l[o] = u : l[o] = l[o].concat([u]) : l[o] === void 0 && g ? l[o] = h ? u : [u] : m && !(l[o] === void 0 || $(o, a.counts) || $(o, a.bools)) ? l[o] = [l[o], u] : l[o] = u;
    }
    function ut(...s) {
      s.forEach(function(i) {
        Object.keys(i || {}).forEach(function(u) {
          a.aliases[u] || (a.aliases[u] = [].concat(p[u] || []), a.aliases[u].concat(u).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const o = H(l);
              o !== u && a.aliases[u].indexOf(o) === -1 && (a.aliases[u].push(o), pe[o] = !0);
            }
          }), a.aliases[u].concat(u).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const o = ke(l, "-");
              o !== u && a.aliases[u].indexOf(o) === -1 && (a.aliases[u].push(o), pe[o] = !0);
            }
          }), a.aliases[u].forEach(function(l) {
            a.aliases[l] = [u].concat(a.aliases[u].filter(function(o) {
              return l !== o;
            }));
          }));
        });
      });
    }
    function $(s, i) {
      const u = [].concat(a.aliases[s] || [], s), l = Object.keys(i), o = u.find((g) => l.includes(g));
      return o ? i[o] : !1;
    }
    function Ue(s) {
      const i = Object.keys(a);
      return [].concat(i.map((l) => a[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function ht(s, ...i) {
      return [].concat(...i).some(function(l) {
        const o = s.match(l);
        return o && Ue(o[1]);
      });
    }
    function pt(s) {
      if (s.match(W) || !s.match(/^-[^-]+/))
        return !1;
      let i = !0, u;
      const l = s.slice(1).split("");
      for (let o = 0; o < l.length; o++) {
        if (u = s.slice(o + 2), !Ue(l[o])) {
          i = !1;
          break;
        }
        if (l[o + 1] && l[o + 1] === "=" || u === "-" || /[A-Za-z]/.test(l[o]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(u) || l[o + 1] && l[o + 1].match(/\W/))
          break;
      }
      return i;
    }
    function $e(s) {
      return d["unknown-options-as-args"] && gt(s);
    }
    function gt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(W) || pt(s) ? !1 : !ht(s, /^-+([^=]+?)=[\s\S]*$/, _e, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function q(s) {
      return !$(s, a.bools) && !$(s, a.counts) && `${s}` in E ? E[s] : dt(mt(s));
    }
    function dt(s) {
      return {
        [L.BOOLEAN]: !0,
        [L.STRING]: "",
        [L.NUMBER]: void 0,
        [L.ARRAY]: []
      }[s];
    }
    function mt(s) {
      let i = L.BOOLEAN;
      return $(s, a.strings) ? i = L.STRING : $(s, a.numbers) ? i = L.NUMBER : $(s, a.bools) ? i = L.BOOLEAN : $(s, a.arrays) && (i = L.ARRAY), i;
    }
    function B(s) {
      return s === void 0;
    }
    function bt() {
      Object.keys(a.counts).find((s) => $(s, a.arrays) ? (R = Error(G("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : $(s, a.nargs) ? (R = Error(G("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(ze, w),
      configuration: d,
      defaulted: Object.assign({}, Ie),
      error: R,
      newAliases: Object.assign({}, pe)
    };
  }
}
function Bt(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let r = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); r; ) {
    r = !1;
    for (let c = 0; c < t.length; c++)
      for (let f = c + 1; f < t.length; f++)
        if (t[c].filter(function(d) {
          return t[f].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[f]), t.splice(f, 1), r = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(p, d, E) {
      return E.indexOf(p) === d;
    });
    const f = c.pop();
    f !== void 0 && typeof f == "string" && (n[f] = c);
  }), n;
}
function xe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function De(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Tt(e) {
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
var je, Se, Ne;
const qe = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Qe = (Se = (je = process == null ? void 0 : process.versions) === null || je === void 0 ? void 0 : je.node) !== null && Se !== void 0 ? Se : (Ne = process == null ? void 0 : process.version) === null || Ne === void 0 ? void 0 : Ne.slice(1);
if (Qe && Number(Qe.match(/^([^.]+)/)[1]) < qe)
  throw Error(`yargs parser supports a minimum Node.js version of ${qe}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const It = process ? process.env : {}, tt = new Pt({
  cwd: process.cwd,
  env: () => It,
  format: He,
  normalize: Et,
  resolve: K,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Te(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), he = function(t, n) {
  return tt.parse(t.slice(), n).argv;
};
he.detailed = function(e, t) {
  return tt.parse(e.slice(), t);
};
he.camelCase = H;
he.decamelize = ke;
he.looksLikeNumber = et;
const zt = {
  right: qt,
  center: Qt
}, Mt = 0, ye = 1, Vt = 2, Ee = 3;
class Gt {
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
      c.length > 1 && F.stringWidth(c[0]) > r && (r = Math.min(Math.floor(this.width * 0.5), F.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((f, p) => ({
        text: f.trim(),
        padding: this.measurePadding(f),
        width: p === 0 && c.length > 1 ? r : void 0
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
    return this.rasterize(t).forEach((r, c) => {
      let f = "";
      r.forEach((p, d) => {
        const { width: E } = t[d], N = this.negatePadding(t[d]);
        let _ = p;
        if (N > F.stringWidth(p) && (_ += " ".repeat(N - F.stringWidth(p))), t[d].align && t[d].align !== "left" && this.wrap) {
          const V = zt[t[d].align];
          _ = V(_, N), F.stringWidth(_) < N && (_ += " ".repeat((E || 0) - F.stringWidth(_) - 1));
        }
        const P = t[d].padding || [0, 0, 0, 0];
        P[Ee] && (f += " ".repeat(P[Ee])), f += Ke(t[d], _, "| "), f += _, f += Ke(t[d], _, " |"), P[ye] && (f += " ".repeat(P[ye])), c === 0 && n.length > 0 && (f = this.renderInline(f, n[n.length - 1]));
      }), n.push({
        text: f.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const r = t.match(/^ */), c = r ? r[0].length : 0, f = n.text, p = F.stringWidth(f.trimRight());
    return n.span ? this.wrap ? c < p ? t : (n.hidden = !0, f.trimRight() + " ".repeat(c - p) + t.trimLeft()) : (n.hidden = !0, f + t) : t;
  }
  rasterize(t) {
    const n = [], r = this.columnWidths(t);
    let c;
    return t.forEach((f, p) => {
      f.width = r[p], this.wrap ? c = F.wrap(f.text, this.negatePadding(f), { hard: !0 }).split(`
`) : c = f.text.split(`
`), f.border && (c.unshift("." + "-".repeat(this.negatePadding(f) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(f) + 2) + "'")), f.padding && (c.unshift(...new Array(f.padding[Mt] || 0).fill("")), c.push(...new Array(f.padding[Vt] || 0).fill(""))), c.forEach((d, E) => {
        n[E] || n.push([]);
        const N = n[E];
        for (let _ = 0; _ < p; _++)
          N[_] === void 0 && N.push("");
        N.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ee] || 0) + (t.padding[ye] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || F.stringWidth(p.text));
    let n = t.length, r = this.width;
    const c = t.map((p) => {
      if (p.width)
        return n--, r -= p.width, p.width;
    }), f = n ? Math.floor(r / n) : 0;
    return c.map((p, d) => p === void 0 ? Math.max(f, Ut(t[d])) : p);
  }
}
function Ke(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Ut(e) {
  const t = e.padding || [], n = 1 + (t[Ee] || 0) + (t[ye] || 0);
  return e.border ? n + 4 : n;
}
function Dt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function qt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Qt(e, t) {
  e = e.trim();
  const n = F.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let F;
function Kt(e, t) {
  return F = t, new Gt({
    width: e?.width || Dt(),
    wrap: e?.wrap
  });
}
const nt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function st(e) {
  return e.replace(nt, "");
}
function Zt(e, t) {
  const [n, r] = e.match(nt) || ["", ""];
  e = st(e);
  let c = "";
  for (let f = 0; f < e.length; f++)
    f !== 0 && f % t === 0 && (c += `
`), c += e.charAt(f);
  return n && r && (c = `${n}${c}${r}`), c;
}
function Yt(e) {
  return Kt(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: st,
    wrap: Zt
  });
}
function Ht(e, t) {
  let n = K(".", e), r;
  for (Xe(n).isDirectory() || (n = Fe(n)); ; ) {
    if (r = t(n, Ot(n)), r)
      return K(n, r);
    if (n = Fe(r = n), r === n)
      break;
  }
}
const Xt = {
  fs: {
    readFileSync: Te,
    writeFile: Ct
  },
  format: He,
  resolve: K,
  exists: (e) => {
    try {
      return Xe(e).isFile();
    } catch {
      return !1;
    }
  }
};
let v;
class Jt {
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
    })) : r(), v.format.apply(v.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), r = t.shift(), c = t.shift();
    let f = function() {
    };
    typeof t[t.length - 1] == "function" && (f = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = c === 1 ? n : r;
    this.cache[this.locale][n] && (p = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: r
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: f
    })) : f();
    const d = [p];
    return ~p.indexOf("%d") && d.push(c), v.format.apply(v.format, d.concat(t));
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
    return t.forEach(function(c, f) {
      const p = n[f + 1];
      r += c, typeof p < "u" && (r += "%s");
    }), this.__.apply(this, [r].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], r = n.directory, c = n.locale, f = n.cb, p = this._resolveLocaleFile(r, c), d = JSON.stringify(this.cache[c], null, 2);
    v.fs.writeFile(p, d, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), f(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      v.fs.readFileSync && (t = JSON.parse(v.fs.readFileSync(n, "utf-8")));
    } catch (r) {
      if (r instanceof SyntaxError && (r.message = "syntax error in " + n), r.code === "ENOENT")
        t = {};
      else
        throw r;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let r = v.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(r) && ~n.lastIndexOf("_")) {
      const c = v.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (r = c);
    }
    return r;
  }
  _fileExistsSync(t) {
    return v.exists(t);
  }
}
function kt(e, t) {
  v = t;
  const n = new Jt(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const en = (e) => kt(e, Xt), tn = "require is not supported by ESM", Ze = "loading a directory of commands is not supported yet for ESM";
let ue;
try {
  ue = St(import.meta.url);
} catch {
  ue = process.cwd();
}
const nn = ue.substring(0, ue.lastIndexOf("node_modules"));
xt, jt, yt, nn || process.cwd(), At, Fe, _t, wt, K, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Te, en({
  directory: K(ue, "../../../locales"),
  updateFiles: !1
});
const ve = "\x1B[44m", D = "\x1B[43m", j = "\x1B[41m", sn = "\x1B[42m", A = "\x1B[0m", S = "\x1B[33m", on = "\x1B[36m", x = "\x1B[0m", Le = 50, X = [], rn = (e, t) => {
  const n = e.content.split(`
`);
  n.length > Le && X.push({ fileName: t, scriptLength: n.length });
}, cn = () => (X.length > 0 && (console.log(`
${j}Long <script> blocks${A} in ${X.length} files.`), console.log(
  `👉 ${S}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Le} lines.${x}`
), X.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > Le * 2 ? j : D}(${e.scriptLength} lines)${A}`
  );
})), X.length), J = [], ln = (e) => {
  J.push(e);
}, an = () => (J.length > 0 && (console.log(`
${D}Plain <script> blocks${A} in ${J.length} files.`), console.log(`👉 ${S} Consider using <script setup> to leverage the new SFC <script> syntax.${x}`), J.forEach((e) => {
  console.log(`- ${e}`);
})), J.length), k = [], fn = (e, t) => {
  const n = /\belse\b/gi, r = e.content.match(n);
  r?.length && k.push({ fileName: t, elseCount: r.length });
}, un = () => (k.length > 0 && (console.log(`
${D}else conditions${A} are used in ${k.length} files.`), console.log(`👉 ${S}Try to rewrite the conditions in a way that the else clause is not necessary.${x}`), k.forEach((e) => {
  console.log(`- ${e.fileName} ${D}(${e.elseCount})${A}`);
})), k.length), hn = 5, pn = 10, ee = [], gn = (e, t) => {
  const n = /\bif\b/gi, r = /\belse\b/gi, c = /\bfor\b/gi, f = /\bwhile\b/gi, p = /\bcase\b/gi, d = e.content.match(n), E = e.content.match(r), N = e.content.match(c), _ = e.content.match(f), P = e.content.match(p), V = (d?.length || 0) + (E?.length || 0) + (N?.length || 0) + (_?.length || 0) + (P?.length || 0);
  V > hn && ee.push({ fileName: t, cyclomaticComplexity: V });
}, dn = () => (ee.length > 0 && (console.log(
  `
${ve}cyclomaticComplexity${A} is above moderate in ${ee.length} files.`
), console.log(`👉 ${S}Try to reduce complexity.${x}`), ee.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > pn ? j : D}(${e.cyclomaticComplexity})${A}`
  );
})), ee.length), te = [], mn = (e) => {
  if (e.includes("pages"))
    return;
  const t = Be.basename(e);
  if (t === "App.vue")
    return;
  const n = /[A-Z]/;
  t.slice(1).match(n)?.length || te.push({ filePath: e });
}, bn = () => (te.length > 0 && (console.log(`
${j}single name component${A} is used in ${te.length} files.`), console.log(
  `👉 ${S}Rename the component to use multi-word name.${x} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), te.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), te.length), ne = [], $n = (e, t) => {
  e.scoped || ne.push({ filePath: t });
}, yn = () => (ne.length > 0 && (console.log(`
${j}Global style ${A} is used in ${ne.length} files.`), console.log(
  `👉 ${S}Use <style scoped>.${x} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ne.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ne.length), se = [], En = (e, t) => {
  const n = /defineProps\(\[/gi;
  e.content.match(n)?.length && se.push({ filePath: t });
}, An = () => (se.length > 0 && (console.log(`
${j}simple prop${A} is used in ${se.length} files.`), console.log(
  `👉 ${S}Add at least type definition.${x} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), se.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), se.length), oe = [], _n = (e, t) => {
  const n = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, r = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, c = e.content.match(n), f = e.content.match(r);
  (c?.length || f?.length) && oe.push({ filePath: t });
}, wn = () => (oe.length > 0 && (console.log(`
${j}v-if used with v-for${A} in ${oe.length} files.`), console.log(
  `👉 ${S}Move out the v-if to a computed property.${x} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), oe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), oe.length), ie = [], On = (e, t) => {
  const n = /<[^>]+ v-for[^>]+>/gi, r = e.content.match(n);
  r?.length && (r.some((f) => f.includes(":key")) || ie.push({ filePath: t }));
}, Cn = () => (ie.length > 0 && (console.log(`
${j}v-for has no key${A} in ${ie.length} files.`), console.log(
  `👉 ${S}Add a \`:key\` property to all v-for.${x} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), ie.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ie.length), re = [], xn = (e) => {
  const t = Be.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, r = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, f = t.match(c);
  !r?.length && !f?.length && re.push({ fileName: e });
}, jn = () => (re.length > 0 && (console.log(
  `
${j}component name is not PascalCase and not kebab-abse${A} in ${re.length} files.`
), console.log(
  `👉 ${S}Rename the component to use PascalCase or kebab-case file name.${x} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), re.forEach((e) => {
  console.log(`- ${j}${e.fileName}${A}`);
})), re.length), ce = [], Sn = /^[a-z]+([A-Z][a-z]*)+$/, Nn = (e, t) => {
  const n = /defineProps\({([^}]+)/g;
  let r;
  for (; (r = n.exec(e.content)) !== null; )
    r[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((f) => f.split(":")[0]).filter((f) => f.length).filter((f) => !Sn.test(f)).length && ce.push({ filePath: t });
}, Fn = () => (ce.length > 0 && (console.log(`
${j}prop names are not camelCased${A} in ${ce.length} files.`), console.log(
  `👉 ${S}Rename the props to camelCase.${x} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), ce.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ce.length), Q = [], Rn = 40, vn = (e, t) => {
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    c.length > Rn && (Q.some((f) => f.filePath === t) || Q.push({ filePath: t }));
  });
}, Ln = () => (Q.length > 0 && (console.log(`
${j}Lengthy template expression${A} found in ${Q.length} files.`), console.log(
  `👉 ${S}Refactor the expression into a computed property.${x} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
), Q.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), Q.length), Wn = /^(\(.*\)|\\?.)$/;
function z(e) {
  const t = e.toString();
  return Wn.test(t) ? t : `(?:${t})`;
}
const Pn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Bn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(Pn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => b(`${e}${I(...n)}`), {
      referenceTo: (n) => b(`${e}\\k<${n}>`)
    }),
    or: (...n) => b(`(?:${e}|${I(...n)})`),
    after: (...n) => b(`(?<=${I(...n)})${e}`),
    before: (...n) => b(`${e}(?=${I(...n)})`),
    notAfter: (...n) => b(`(?<!${I(...n)})${e}`),
    notBefore: (...n) => b(`${e}(?!${I(...n)})`),
    times: Object.assign((n) => b(`${z(e)}{${n}}`), {
      any: () => b(`${z(e)}*`),
      atLeast: (n) => b(`${z(e)}{${n},}`),
      atMost: (n) => b(`${z(e)}{0,${n}}`),
      between: (n, r) => b(`${z(e)}{${n},${r}}`)
    }),
    optionally: () => b(`${z(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Bn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const Tn = /[.*+?^${}()|[\]\\/]/g;
function Ye(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function We(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
b(".");
b("\\b\\w+\\b");
const Ae = b("\\w");
b("\\b");
b("\\d");
b("\\s");
const In = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), zn = b("\\t"), Mn = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function U(...e) {
  return b(`${z(I(...e))}?`);
}
function I(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(Tn, "\\$&") : t).join("")
  );
}
function M(...e) {
  return b(`${z(I(...e))}+`);
}
const Pe = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(I(...e).toString(), [...t || ""].join(""));
}, ot = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((p) => p.includes(t)) + 1;
  const n = e.indexOf(t), r = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return r + c - 1;
}, le = [], Vn = (e, t) => {
  const n = e.template, r = Pe(
    "<",
    M(Ae),
    U(M(Ye(` 	
\r`))),
    M(We("/>")),
    U(M(Ye(` 	
\r`))),
    U("/"),
    ">",
    ["g"]
  ), c = n.content.match(r);
  if (c === null)
    return;
  const f = Pe(":", M(Ae), U(" "), "=", U(" "), We(`'"`), [
    "g"
  ]);
  c.forEach((p) => {
    if (!p.includes(":"))
      return;
    const d = p.match(f);
    if (d?.length) {
      const E = ot(e.source, p);
      le.push({ message: `${t}#${E} ${D}${d}${A}` });
    }
  });
}, Gn = () => (le.length > 0 && (console.log(`
${j}Attribute value is not quoted${A} in ${le.length} files.`), console.log(
  `👉 ${S}Use quotes for attribute values.${x} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), le.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), le.length), ae = [], Un = (e, t) => {
  const n = e.template, r = Pe(
    "<",
    M(In.uppercase, Ae),
    U(Mn, zn),
    U(M(We(">"))),
    "></",
    M(Ae),
    ">",
    ["g"]
  ), c = n.content.match(r);
  c !== null && c.forEach((f) => {
    const p = ot(e.source, f), d = f.split(`
`).at(-1)?.trim() || "";
    ae.push({ message: `${t}#${p} ${D}${d}${A}` });
  });
}, Dn = () => (ae.length > 0 && (console.log(
  `
${on}vue-strong${x} - ${j}Component is not self closing${A} in ${ae.length} files.`
), console.log(
  `👉 ${S}Components with no content should be self-closing.${x} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), ae.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ae.length);
let it = 0;
const rt = (e, t) => {
  const n = Re.readdirSync(e);
  it += n.length;
  for (const r of n) {
    const c = Be.join(e, r);
    Re.statSync(c).isDirectory() ? rt(c, t) : r.endsWith(".vue") && t(c);
  }
}, qn = (e) => {
  console.log(`

${ve}Analyzing Vue files in ${e}${A}`);
  let t = 0;
  rt(e, (n) => {
    const r = Re.readFileSync(n, "utf-8"), { descriptor: c } = Nt(r);
    mn(n), xn(n), c.script && ln(n);
    const f = c.scriptSetup || c.script;
    f && (En(f, n), Nn(f, n), rn(f, n), gn(f, n), fn(f, n)), c.styles.forEach((p) => {
      $n(p, n);
    }), c.template && (On(c.template, n), _n(c.template, n), Un(c, n), vn(c.template, n), Vn(c, n));
  }), console.log(`Found ${ve}${it}${A} Vue files`), t += bn(), t += An(), t += Cn(), t += wn(), t += yn(), t += jn(), t += Dn(), t += Fn(), t += Ln(), t += Gn(), t += cn(), t += an(), t += dn(), t += un(), t || console.log(`${sn}No code smells detected!${A}`);
};
$t(vt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (e) => {
    qn(e.path);
  }
).help().argv;
