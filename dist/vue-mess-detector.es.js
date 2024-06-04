import et from "yargs";
import { format as Re, inspect as tt } from "util";
import We, { normalize as nt, resolve as P, dirname as me, basename as st, extname as it, relative as rt } from "path";
import be, { readFileSync as _e, statSync as Be, readdirSync as ot, writeFile as ct } from "fs";
import { notStrictEqual as at, strictEqual as lt } from "assert";
import { fileURLToPath as ft } from "url";
import { parse as ut } from "@vue/compiler-sfc";
class J extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, J);
  }
}
function Te() {
  return ht() ? 0 : 1;
}
function ht() {
  return dt() && !process.defaultApp;
}
function dt() {
  return !!process.versions.electron;
}
function pt(n) {
  return n.slice(Te() + 1);
}
function gt() {
  return process.argv[Te()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function D(n) {
  if (n !== n.toLowerCase() && n !== n.toUpperCase() || (n = n.toLowerCase()), n.indexOf("-") === -1 && n.indexOf("_") === -1)
    return n;
  {
    let r = "", c = !1;
    const l = n.match(/^-+/);
    for (let u = l ? l[0].length : 0; u < n.length; u++) {
      let p = n.charAt(u);
      c && (c = !1, p = p.toUpperCase()), u !== 0 && (p === "-" || p === "_") ? c = !0 : p !== "-" && p !== "_" && (r += p);
    }
    return r;
  }
}
function Ie(n, t) {
  const r = n.toLowerCase();
  t = t || "-";
  let c = "";
  for (let l = 0; l < n.length; l++) {
    const u = r.charAt(l), p = n.charAt(l);
    u !== p && l > 0 ? c += `${t}${r.charAt(l)}` : c += p;
  }
  return c;
}
function ve(n) {
  return n == null ? !1 : typeof n == "number" || /^0x[0-9a-f]+$/i.test(n) ? !0 : /^0[^.]/.test(n) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function mt(n) {
  if (Array.isArray(n))
    return n.map((p) => typeof p != "string" ? p + "" : p);
  n = n.trim();
  let t = 0, r = null, c = null, l = null;
  const u = [];
  for (let p = 0; p < n.length; p++) {
    if (r = c, c = n.charAt(p), c === " " && !l) {
      r !== " " && t++;
      continue;
    }
    c === l ? l = null : (c === "'" || c === '"') && !l && (l = c), u[t] || (u[t] = ""), u[t] += c;
  }
  return u;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var S;
(function(n) {
  n.BOOLEAN = "boolean", n.STRING = "string", n.NUMBER = "number", n.ARRAY = "array";
})(S || (S = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let W;
class bt {
  constructor(t) {
    W = t;
  }
  parse(t, r) {
    const c = Object.assign({
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
    }, r), l = mt(t), u = typeof t == "string", p = yt(Object.assign(/* @__PURE__ */ Object.create(null), c.alias)), m = Object.assign({
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
    }, c.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), c.default), j = c.configObjects || [], _ = c.envPrefix, F = m["populate--"], B = F ? "--" : "_", ee = /* @__PURE__ */ Object.create(null), Ae = /* @__PURE__ */ Object.create(null), T = c.__ || W.format, a = {
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
    }, L = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ae = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(c.array || []).filter(Boolean).forEach(function(e) {
      const i = typeof e == "object" ? e.key : e, f = Object.keys(e).map(function(o) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[o];
      }).filter(Boolean).pop();
      f && (a[f][i] = !0), a.arrays[i] = !0, a.keys.push(i);
    }), [].concat(c.boolean || []).filter(Boolean).forEach(function(e) {
      a.bools[e] = !0, a.keys.push(e);
    }), [].concat(c.string || []).filter(Boolean).forEach(function(e) {
      a.strings[e] = !0, a.keys.push(e);
    }), [].concat(c.number || []).filter(Boolean).forEach(function(e) {
      a.numbers[e] = !0, a.keys.push(e);
    }), [].concat(c.count || []).filter(Boolean).forEach(function(e) {
      a.counts[e] = !0, a.keys.push(e);
    }), [].concat(c.normalize || []).filter(Boolean).forEach(function(e) {
      a.normalize[e] = !0, a.keys.push(e);
    }), typeof c.narg == "object" && Object.entries(c.narg).forEach(([e, i]) => {
      typeof i == "number" && (a.nargs[e] = i, a.keys.push(e));
    }), typeof c.coerce == "object" && Object.entries(c.coerce).forEach(([e, i]) => {
      typeof i == "function" && (a.coercions[e] = i, a.keys.push(e));
    }), typeof c.config < "u" && (Array.isArray(c.config) || typeof c.config == "string" ? [].concat(c.config).filter(Boolean).forEach(function(e) {
      a.configs[e] = !0;
    }) : typeof c.config == "object" && Object.entries(c.config).forEach(([e, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (a.configs[e] = i);
    })), Ve(c.key, p, c.default, a.arrays), Object.keys(E).forEach(function(e) {
      (a.aliases[e] || []).forEach(function(i) {
        E[i] = E[e];
      });
    });
    let C = null;
    ke();
    let te = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Oe = {};
    for (let e = 0; e < l.length; e++) {
      const i = l[e], f = i.replace(/^-{3,}/, "---");
      let o, s, d, h, g, O;
      if (i !== "--" && /^-/.test(i) && re(i))
        le(i);
      else if (f.match(/^---+(=|$)/)) {
        le(i);
        continue;
      } else if (i.match(/^--.+=/) || !m["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], a.arrays) ? e = se(e, h[1], l, h[2]) : b(h[1], a.nargs) !== !1 ? e = ne(e, h[1], l, h[2]) : y(h[1], h[2], !0));
      else if (i.match(ae) && m["boolean-negation"])
        h = i.match(ae), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], y(s, b(s, a.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !m["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], b(s, a.arrays) ? e = se(e, s, l) : b(s, a.nargs) !== !1 ? e = ne(e, s, l) : (g = l[e + 1], g !== void 0 && (!g.match(/^-/) || g.match(L)) && !b(s, a.bools) && !b(s, a.counts) || /^(true|false)$/.test(g) ? (y(s, g), e++) : y(s, v(s))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(L))
        g = l[e + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], g !== void 0 && !g.match(/^-/) && !b(s, a.bools) && !b(s, a.counts) ? (y(s, g), e++) : y(s, v(s)));
      else if (i.match(/^-[^-]+/) && !i.match(L)) {
        d = i.slice(1, -1).split(""), o = !1;
        for (let $ = 0; $ < d.length; $++) {
          if (g = i.slice($ + 2), d[$ + 1] && d[$ + 1] === "=") {
            O = i.slice($ + 3), s = d[$], b(s, a.arrays) ? e = se(e, s, l, O) : b(s, a.nargs) !== !1 ? e = ne(e, s, l, O) : y(s, O), o = !0;
            break;
          }
          if (g === "-") {
            y(d[$], g);
            continue;
          }
          if (/[A-Za-z]/.test(d[$]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, a.bools) === !1) {
            y(d[$], g), o = !0;
            break;
          }
          if (d[$ + 1] && d[$ + 1].match(/\W/)) {
            y(d[$], g), o = !0;
            break;
          } else
            y(d[$], v(d[$]));
        }
        s = i.slice(-1)[0], !o && s !== "-" && (b(s, a.arrays) ? e = se(e, s, l) : b(s, a.nargs) !== !1 ? e = ne(e, s, l) : (g = l[e + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(L)) && !b(s, a.bools) && !b(s, a.counts) || /^(true|false)$/.test(g) ? (y(s, g), e++) : y(s, v(s))));
      } else if (i.match(/^-[0-9]$/) && i.match(L) && b(i.slice(1), a.bools))
        s = i.slice(1), y(s, v(s));
      else if (i === "--") {
        te = l.slice(e + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        te = l.slice(e);
        break;
      } else
        le(i);
    }
    we(A, !0), we(A, !1), De(A), Qe(), je(A, a.aliases, E, !0), Ye(A), m["set-placeholder-key"] && qe(A), Object.keys(a.counts).forEach(function(e) {
      G(A, e.split(".")) || y(e, 0);
    }), F && te.length && (A[B] = []), te.forEach(function(e) {
      A[B].push(e);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((e) => e !== "--" && e.includes("-")).forEach((e) => {
      delete A[e];
    }), m["strip-aliased"] && [].concat(...Object.keys(p).map((e) => p[e])).forEach((e) => {
      m["camel-case-expansion"] && e.includes("-") && delete A[e.split(".").map((i) => D(i)).join(".")], delete A[e];
    });
    function le(e) {
      const i = ie("_", e);
      (typeof i == "string" || typeof i == "number") && A._.push(i);
    }
    function ne(e, i, f, o) {
      let s, d = b(i, a.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return R(o) || (C = Error(T("Argument unexpected for: %s", i))), y(i, v(i)), e;
      let h = R(o) ? 0 : 1;
      if (m["nargs-eats-options"])
        f.length - (e + 1) + h < d && (C = Error(T("Not enough arguments following: %s", i))), h = d;
      else {
        for (s = e + 1; s < f.length && (!f[s].match(/^-[^0-9]/) || f[s].match(L) || re(f[s])); s++)
          h++;
        h < d && (C = Error(T("Not enough arguments following: %s", i)));
      }
      let g = Math.min(h, d);
      for (!R(o) && g > 0 && (y(i, o), g--), s = e + 1; s < g + e + 1; s++)
        y(i, f[s]);
      return e + g;
    }
    function se(e, i, f, o) {
      let s = [], d = o || f[e + 1];
      const h = b(i, a.nargs);
      if (b(i, a.bools) && !/^(true|false)$/.test(d))
        s.push(!0);
      else if (R(d) || R(o) && /^-/.test(d) && !L.test(d) && !re(d)) {
        if (E[i] !== void 0) {
          const g = E[i];
          s = Array.isArray(g) ? g : [g];
        }
      } else {
        R(o) || s.push(fe(i, o, !0));
        for (let g = e + 1; g < f.length && !(!m["greedy-arrays"] && s.length > 0 || h && typeof h == "number" && s.length >= h || (d = f[g], /^-/.test(d) && !L.test(d) && !re(d))); g++)
          e = g, s.push(fe(i, d, u));
      }
      return typeof h == "number" && (h && s.length < h || isNaN(h) && s.length === 0) && (C = Error(T("Not enough arguments following: %s", i))), y(i, s), e;
    }
    function y(e, i, f = u) {
      if (/-/.test(e) && m["camel-case-expansion"]) {
        const d = e.split(".").map(function(h) {
          return D(h);
        }).join(".");
        $e(e, d);
      }
      const o = fe(e, i, f), s = e.split(".");
      U(A, s, o), a.aliases[e] && a.aliases[e].forEach(function(d) {
        const h = d.split(".");
        U(A, h, o);
      }), s.length > 1 && m["dot-notation"] && (a.aliases[s[0]] || []).forEach(function(d) {
        let h = d.split(".");
        const g = [].concat(s);
        g.shift(), h = h.concat(g), (a.aliases[e] || []).includes(h.join(".")) || U(A, h, o);
      }), b(e, a.normalize) && !b(e, a.arrays) && [e].concat(a.aliases[e] || []).forEach(function(h) {
        Object.defineProperty(Oe, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(g) {
            i = typeof g == "string" ? W.normalize(g) : g;
          }
        });
      });
    }
    function $e(e, i) {
      a.aliases[e] && a.aliases[e].length || (a.aliases[e] = [i], ee[i] = !0), a.aliases[i] && a.aliases[i].length || $e(i, e);
    }
    function fe(e, i, f) {
      f && (i = Et(i)), (b(e, a.bools) || b(e, a.counts)) && typeof i == "string" && (i = i === "true");
      let o = Array.isArray(i) ? i.map(function(s) {
        return ie(e, s);
      }) : ie(e, i);
      return b(e, a.counts) && (R(o) || typeof o == "boolean") && (o = he()), b(e, a.normalize) && b(e, a.arrays) && (Array.isArray(i) ? o = i.map((s) => W.normalize(s)) : o = W.normalize(i)), o;
    }
    function ie(e, i) {
      return !m["parse-positional-numbers"] && e === "_" || !b(e, a.strings) && !b(e, a.bools) && !Array.isArray(i) && (ve(i) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !R(i) && b(e, a.numbers)) && (i = Number(i)), i;
    }
    function De(e) {
      const i = /* @__PURE__ */ Object.create(null);
      je(i, a.aliases, E), Object.keys(a.configs).forEach(function(f) {
        const o = e[f] || i[f];
        if (o)
          try {
            let s = null;
            const d = W.resolve(W.cwd(), o), h = a.configs[f];
            if (typeof h == "function") {
              try {
                s = h(d);
              } catch (g) {
                s = g;
              }
              if (s instanceof Error) {
                C = s;
                return;
              }
            } else
              s = W.require(d);
            ue(s);
          } catch (s) {
            s.name === "PermissionDenied" ? C = s : e[f] && (C = Error(T("Invalid JSON config file: %s", o)));
          }
      });
    }
    function ue(e, i) {
      Object.keys(e).forEach(function(f) {
        const o = e[f], s = i ? i + "." + f : f;
        typeof o == "object" && o !== null && !Array.isArray(o) && m["dot-notation"] ? ue(o, s) : (!G(A, s.split(".")) || b(s, a.arrays) && m["combine-arrays"]) && y(s, o);
      });
    }
    function Qe() {
      typeof j < "u" && j.forEach(function(e) {
        ue(e);
      });
    }
    function we(e, i) {
      if (typeof _ > "u")
        return;
      const f = typeof _ == "string" ? _ : "", o = W.env();
      Object.keys(o).forEach(function(s) {
        if (f === "" || s.lastIndexOf(f, 0) === 0) {
          const d = s.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(f.length)), D(h);
          });
          (i && a.configs[d.join(".")] || !i) && !G(e, d) && y(d.join("."), o[s]);
        }
      });
    }
    function Ye(e) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(e).forEach(function(o) {
        if (!f.has(o) && (i = b(o, a.coercions), typeof i == "function"))
          try {
            const s = ie(o, i(e[o]));
            [].concat(a.aliases[o] || [], o).forEach((d) => {
              f.add(d), e[d] = s;
            });
          } catch (s) {
            C = s;
          }
      });
    }
    function qe(e) {
      return a.keys.forEach((i) => {
        ~i.indexOf(".") || typeof e[i] > "u" && (e[i] = void 0);
      }), e;
    }
    function je(e, i, f, o = !1) {
      Object.keys(f).forEach(function(s) {
        G(e, s.split(".")) || (U(e, s.split("."), f[s]), o && (Ae[s] = !0), (i[s] || []).forEach(function(d) {
          G(e, d.split(".")) || U(e, d.split("."), f[s]);
        }));
      });
    }
    function G(e, i) {
      let f = e;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(s) {
        f = f[s] || {};
      });
      const o = i[i.length - 1];
      return typeof f != "object" ? !1 : o in f;
    }
    function U(e, i, f) {
      let o = e;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(O) {
        O = Ce(O), typeof o == "object" && o[O] === void 0 && (o[O] = {}), typeof o[O] != "object" || Array.isArray(o[O]) ? (Array.isArray(o[O]) ? o[O].push({}) : o[O] = [o[O], {}], o = o[O][o[O].length - 1]) : o = o[O];
      });
      const s = Ce(i[i.length - 1]), d = b(i.join("."), a.arrays), h = Array.isArray(f);
      let g = m["duplicate-arguments-array"];
      !g && b(s, a.nargs) && (g = !0, (!R(o[s]) && a.nargs[s] === 1 || Array.isArray(o[s]) && o[s].length === a.nargs[s]) && (o[s] = void 0)), f === he() ? o[s] = he(o[s]) : Array.isArray(o[s]) ? g && d && h ? o[s] = m["flatten-duplicate-arrays"] ? o[s].concat(f) : (Array.isArray(o[s][0]) ? o[s] : [o[s]]).concat([f]) : !g && !!d == !!h ? o[s] = f : o[s] = o[s].concat([f]) : o[s] === void 0 && d ? o[s] = h ? f : [f] : g && !(o[s] === void 0 || b(s, a.counts) || b(s, a.bools)) ? o[s] = [o[s], f] : o[s] = f;
    }
    function Ve(...e) {
      e.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          a.aliases[f] || (a.aliases[f] = [].concat(p[f] || []), a.aliases[f].concat(f).forEach(function(o) {
            if (/-/.test(o) && m["camel-case-expansion"]) {
              const s = D(o);
              s !== f && a.aliases[f].indexOf(s) === -1 && (a.aliases[f].push(s), ee[s] = !0);
            }
          }), a.aliases[f].concat(f).forEach(function(o) {
            if (o.length > 1 && /[A-Z]/.test(o) && m["camel-case-expansion"]) {
              const s = Ie(o, "-");
              s !== f && a.aliases[f].indexOf(s) === -1 && (a.aliases[f].push(s), ee[s] = !0);
            }
          }), a.aliases[f].forEach(function(o) {
            a.aliases[o] = [f].concat(a.aliases[f].filter(function(s) {
              return o !== s;
            }));
          }));
        });
      });
    }
    function b(e, i) {
      const f = [].concat(a.aliases[e] || [], e), o = Object.keys(i), s = f.find((d) => o.includes(d));
      return s ? i[s] : !1;
    }
    function xe(e) {
      const i = Object.keys(a);
      return [].concat(i.map((o) => a[o])).some(function(o) {
        return Array.isArray(o) ? o.includes(e) : o[e];
      });
    }
    function He(e, ...i) {
      return [].concat(...i).some(function(o) {
        const s = e.match(o);
        return s && xe(s[1]);
      });
    }
    function Ke(e) {
      if (e.match(L) || !e.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const o = e.slice(1).split("");
      for (let s = 0; s < o.length; s++) {
        if (f = e.slice(s + 2), !xe(o[s])) {
          i = !1;
          break;
        }
        if (o[s + 1] && o[s + 1] === "=" || f === "-" || /[A-Za-z]/.test(o[s]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || o[s + 1] && o[s + 1].match(/\W/))
          break;
      }
      return i;
    }
    function re(e) {
      return m["unknown-options-as-args"] && Je(e);
    }
    function Je(e) {
      return e = e.replace(/^-{3,}/, "--"), e.match(L) || Ke(e) ? !1 : !He(e, /^-+([^=]+?)=[\s\S]*$/, ae, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function v(e) {
      return !b(e, a.bools) && !b(e, a.counts) && `${e}` in E ? E[e] : Xe(Ze(e));
    }
    function Xe(e) {
      return {
        [S.BOOLEAN]: !0,
        [S.STRING]: "",
        [S.NUMBER]: void 0,
        [S.ARRAY]: []
      }[e];
    }
    function Ze(e) {
      let i = S.BOOLEAN;
      return b(e, a.strings) ? i = S.STRING : b(e, a.numbers) ? i = S.NUMBER : b(e, a.bools) ? i = S.BOOLEAN : b(e, a.arrays) && (i = S.ARRAY), i;
    }
    function R(e) {
      return e === void 0;
    }
    function ke() {
      Object.keys(a.counts).find((e) => b(e, a.arrays) ? (C = Error(T("Invalid configuration: %s, opts.count excludes opts.array.", e)), !0) : b(e, a.nargs) ? (C = Error(T("Invalid configuration: %s, opts.count excludes opts.narg.", e)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(Oe, A),
      configuration: m,
      defaulted: Object.assign({}, Ae),
      error: C,
      newAliases: Object.assign({}, ee)
    };
  }
}
function yt(n) {
  const t = [], r = /* @__PURE__ */ Object.create(null);
  let c = !0;
  for (Object.keys(n).forEach(function(l) {
    t.push([].concat(n[l], l));
  }); c; ) {
    c = !1;
    for (let l = 0; l < t.length; l++)
      for (let u = l + 1; u < t.length; u++)
        if (t[l].filter(function(m) {
          return t[u].indexOf(m) !== -1;
        }).length) {
          t[l] = t[l].concat(t[u]), t.splice(u, 1), c = !0;
          break;
        }
  }
  return t.forEach(function(l) {
    l = l.filter(function(p, m, E) {
      return E.indexOf(p) === m;
    });
    const u = l.pop();
    u !== void 0 && typeof u == "string" && (r[u] = l);
  }), r;
}
function he(n) {
  return n !== void 0 ? n + 1 : 1;
}
function Ce(n) {
  return n === "__proto__" ? "___proto___" : n;
}
function Et(n) {
  return typeof n == "string" && (n[0] === "'" || n[0] === '"') && n[n.length - 1] === n[0] ? n.substring(1, n.length - 1) : n;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var de, pe, ge;
const Ne = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Se = (pe = (de = process == null ? void 0 : process.versions) === null || de === void 0 ? void 0 : de.node) !== null && pe !== void 0 ? pe : (ge = process == null ? void 0 : process.version) === null || ge === void 0 ? void 0 : ge.slice(1);
if (Se && Number(Se.match(/^([^.]+)/)[1]) < Ne)
  throw Error(`yargs parser supports a minimum Node.js version of ${Ne}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const _t = process ? process.env : {}, Pe = new bt({
  cwd: process.cwd,
  env: () => _t,
  format: Re,
  normalize: nt,
  resolve: P,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (n) => {
    if (typeof require < "u")
      return require(n);
    if (n.match(/\.json$/))
      return JSON.parse(_e(n, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), k = function(t, r) {
  return Pe.parse(t.slice(), r).argv;
};
k.detailed = function(n, t) {
  return Pe.parse(n.slice(), t);
};
k.camelCase = D;
k.decamelize = Ie;
k.looksLikeNumber = ve;
const At = {
  right: Ct,
  center: Nt
}, Ot = 0, oe = 1, $t = 2, ce = 3;
class wt {
  constructor(t) {
    var r;
    this.width = t.width, this.wrap = (r = t.wrap) !== null && r !== void 0 ? r : !0, this.rows = [];
  }
  span(...t) {
    const r = this.div(...t);
    r.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const r = t.map((c) => typeof c == "string" ? this.colFromString(c) : c);
    return this.rows.push(r), r;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const r = t.split(`
`).map((l) => l.split("	"));
    let c = 0;
    return r.forEach((l) => {
      l.length > 1 && x.stringWidth(l[0]) > c && (c = Math.min(Math.floor(this.width * 0.5), x.stringWidth(l[0])));
    }), r.forEach((l) => {
      this.div(...l.map((u, p) => ({
        text: u.trim(),
        padding: this.measurePadding(u),
        width: p === 0 && l.length > 1 ? c : void 0
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
    const r = x.stripAnsi(t);
    return [0, r.match(/\s*$/)[0].length, 0, r.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((r) => {
      this.rowToString(r, t);
    }), t.filter((r) => !r.hidden).map((r) => r.text).join(`
`);
  }
  rowToString(t, r) {
    return this.rasterize(t).forEach((c, l) => {
      let u = "";
      c.forEach((p, m) => {
        const { width: E } = t[m], j = this.negatePadding(t[m]);
        let _ = p;
        if (j > x.stringWidth(p) && (_ += " ".repeat(j - x.stringWidth(p))), t[m].align && t[m].align !== "left" && this.wrap) {
          const B = At[t[m].align];
          _ = B(_, j), x.stringWidth(_) < j && (_ += " ".repeat((E || 0) - x.stringWidth(_) - 1));
        }
        const F = t[m].padding || [0, 0, 0, 0];
        F[ce] && (u += " ".repeat(F[ce])), u += Le(t[m], _, "| "), u += _, u += Le(t[m], _, " |"), F[oe] && (u += " ".repeat(F[oe])), l === 0 && r.length > 0 && (u = this.renderInline(u, r[r.length - 1]));
      }), r.push({
        text: u.replace(/ +$/, ""),
        span: t.span
      });
    }), r;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, r) {
    const c = t.match(/^ */), l = c ? c[0].length : 0, u = r.text, p = x.stringWidth(u.trimRight());
    return r.span ? this.wrap ? l < p ? t : (r.hidden = !0, u.trimRight() + " ".repeat(l - p) + t.trimLeft()) : (r.hidden = !0, u + t) : t;
  }
  rasterize(t) {
    const r = [], c = this.columnWidths(t);
    let l;
    return t.forEach((u, p) => {
      u.width = c[p], this.wrap ? l = x.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`) : l = u.text.split(`
`), u.border && (l.unshift("." + "-".repeat(this.negatePadding(u) + 2) + "."), l.push("'" + "-".repeat(this.negatePadding(u) + 2) + "'")), u.padding && (l.unshift(...new Array(u.padding[Ot] || 0).fill("")), l.push(...new Array(u.padding[$t] || 0).fill(""))), l.forEach((m, E) => {
        r[E] || r.push([]);
        const j = r[E];
        for (let _ = 0; _ < p; _++)
          j[_] === void 0 && j.push("");
        j.push(m);
      });
    }), r;
  }
  negatePadding(t) {
    let r = t.width || 0;
    return t.padding && (r -= (t.padding[ce] || 0) + (t.padding[oe] || 0)), t.border && (r -= 4), r;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((p) => p.width || x.stringWidth(p.text));
    let r = t.length, c = this.width;
    const l = t.map((p) => {
      if (p.width)
        return r--, c -= p.width, p.width;
    }), u = r ? Math.floor(c / r) : 0;
    return l.map((p, m) => p === void 0 ? Math.max(u, jt(t[m])) : p);
  }
}
function Le(n, t, r) {
  return n.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? r : "  " : "";
}
function jt(n) {
  const t = n.padding || [], r = 1 + (t[ce] || 0) + (t[oe] || 0);
  return n.border ? r + 4 : r;
}
function xt() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Ct(n, t) {
  n = n.trim();
  const r = x.stringWidth(n);
  return r < t ? " ".repeat(t - r) + n : n;
}
function Nt(n, t) {
  n = n.trim();
  const r = x.stringWidth(n);
  return r >= t ? n : " ".repeat(t - r >> 1) + n;
}
let x;
function St(n, t) {
  return x = t, new wt({
    width: n?.width || xt(),
    wrap: n?.wrap
  });
}
const ze = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Me(n) {
  return n.replace(ze, "");
}
function Lt(n, t) {
  const [r, c] = n.match(ze) || ["", ""];
  n = Me(n);
  let l = "";
  for (let u = 0; u < n.length; u++)
    u !== 0 && u % t === 0 && (l += `
`), l += n.charAt(u);
  return r && c && (l = `${r}${l}${c}`), l;
}
function Ft(n) {
  return St(n, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Me,
    wrap: Lt
  });
}
function Rt(n, t) {
  let r = P(".", n), c;
  for (Be(r).isDirectory() || (r = me(r)); ; ) {
    if (c = t(r, ot(r)), c)
      return P(r, c);
    if (r = me(c = r), c === r)
      break;
  }
}
const Wt = {
  fs: {
    readFileSync: _e,
    writeFile: ct
  },
  format: Re,
  resolve: P,
  exists: (n) => {
    try {
      return Be(n).isFile();
    } catch {
      return !1;
    }
  }
};
let N;
class Bt {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const r = t.shift();
    let c = function() {
    };
    return typeof t[t.length - 1] == "function" && (c = t.pop()), c = c || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = r, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c(), N.format.apply(N.format, [this.cache[this.locale][r] || r].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), r = t.shift(), c = t.shift(), l = t.shift();
    let u = function() {
    };
    typeof t[t.length - 1] == "function" && (u = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let p = l === 1 ? r : c;
    this.cache[this.locale][r] && (p = this.cache[this.locale][r][l === 1 ? "one" : "other"]), !this.cache[this.locale][r] && this.updateFiles ? (this.cache[this.locale][r] = {
      one: r,
      other: c
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: u
    })) : u();
    const m = [p];
    return ~p.indexOf("%d") && m.push(l), N.format.apply(N.format, m.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (this.cache[this.locale][r] = t[r]);
  }
  _taggedLiteral(t, ...r) {
    let c = "";
    return t.forEach(function(l, u) {
      const p = r[u + 1];
      c += l, typeof p < "u" && (c += "%s");
    }), this.__.apply(this, [c].concat([].slice.call(r, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, r = this.writeQueue[0], c = r.directory, l = r.locale, u = r.cb, p = this._resolveLocaleFile(c, l), m = JSON.stringify(this.cache[l], null, 2);
    N.fs.writeFile(p, m, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), u(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const r = this._resolveLocaleFile(this.directory, this.locale);
    try {
      N.fs.readFileSync && (t = JSON.parse(N.fs.readFileSync(r, "utf-8")));
    } catch (c) {
      if (c instanceof SyntaxError && (c.message = "syntax error in " + r), c.code === "ENOENT")
        t = {};
      else
        throw c;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, r) {
    let c = N.resolve(t, "./", r + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(c) && ~r.lastIndexOf("_")) {
      const l = N.resolve(t, "./", r.split("_")[0] + ".json");
      this._fileExistsSync(l) && (c = l);
    }
    return c;
  }
  _fileExistsSync(t) {
    return N.exists(t);
  }
}
function Tt(n, t) {
  N = t;
  const r = new Bt(n);
  return {
    __: r.__.bind(r),
    __n: r.__n.bind(r),
    setLocale: r.setLocale.bind(r),
    getLocale: r.getLocale.bind(r),
    updateLocale: r.updateLocale.bind(r),
    locale: r.locale
  };
}
const It = (n) => Tt(n, Wt), vt = "require is not supported by ESM", Fe = "loading a directory of commands is not supported yet for ESM";
let X;
try {
  X = ft(import.meta.url);
} catch {
  X = process.cwd();
}
const Pt = X.substring(0, X.lastIndexOf("node_modules"));
at, lt, tt, Pt || process.cwd(), st, me, it, rt, P, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, _e, It({
  directory: P(X, "../../../locales"),
  updateFiles: !1
});
const ye = "\x1B[44m", Z = "\x1B[43m", I = "\x1B[41m", zt = "\x1B[42m", w = "\x1B[0m", z = "\x1B[33m", M = "\x1B[0m", Ee = 50, Q = [], Mt = (n, t) => {
  const r = n.content.split(`
`);
  r.length > Ee && Q.push({ fileName: t, scriptLength: r.length });
}, Gt = () => (Q.length > 0 && (console.log(`
${I}Long <script> blocks${w} in ${Q.length} files.`), console.log(
  `👉 ${z}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Ee} lines.${M}`
), Q.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.scriptLength > Ee * 2 ? I : Z}(${n.scriptLength} lines)${w}`
  );
})), Q.length), Y = [], Ut = (n) => {
  Y.push(n);
}, Dt = () => (Y.length > 0 && (console.log(`
${Z}Plain <script> blocks${w} in ${Y.length} files.`), console.log(`👉 ${z} Consider using <script setup> to leverage the new SFC <script> syntax.${M}`), Y.forEach((n) => {
  console.log(`- ${n}`);
})), Y.length), q = [], Qt = (n, t) => {
  const r = /\belse\b/gi, c = n.content.match(r);
  c?.length && q.push({ fileName: t, elseCount: c.length });
}, Yt = () => (q.length > 0 && (console.log(`
${Z}else conditions${w} are used in ${q.length} files.`), console.log(`👉 ${z}Try to rewrite the conditions in a way that the else clause is not necessary.${M}`), q.forEach((n) => {
  console.log(`- ${n.fileName} ${Z}(${n.elseCount})${w}`);
})), q.length), qt = 5, Vt = 10, V = [], Ht = (n, t) => {
  const r = /\bif\b/gi, c = /\belse\b/gi, l = /\bfor\b/gi, u = /\bwhile\b/gi, p = /\bcase\b/gi, m = n.content.match(r), E = n.content.match(c), j = n.content.match(l), _ = n.content.match(u), F = n.content.match(p), B = (m?.length || 0) + (E?.length || 0) + (j?.length || 0) + (_?.length || 0) + (F?.length || 0);
  B > qt && V.push({ fileName: t, cyclomaticComplexity: B });
}, Kt = () => (V.length > 0 && (console.log(
  `
${ye}cyclomaticComplexity${w} is above moderate in ${V.length} files.`
), console.log(`👉 ${z}Try to reduce complexity.${M}`), V.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.cyclomaticComplexity > Vt ? I : Z}(${n.cyclomaticComplexity})${w}`
  );
})), V.length), H = [], Jt = (n) => {
  if (n.includes("pages"))
    return;
  const t = We.basename(n);
  if (t === "App.vue")
    return;
  const r = /[A-Z]/;
  t.slice(1).match(r)?.length || H.push({ fileName: n });
}, Xt = () => (H.length > 0 && (console.log(`
${I}single name component${w} is used in ${H.length} files.`), console.log(
  `👉 ${z}Rename the component to use multi-word name.${M} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), H.forEach((n) => {
  console.log(`- ${I}${n.fileName}${w}`);
})), H.length), K = [], Zt = (n, t) => {
  n.scoped || K.push({ fileName: t });
}, kt = () => (K.length > 0 && (console.log(`
${I}Global style ${w} is used in ${K.length} files.`), console.log(
  `👉 ${z}Use <style scoped>.${M} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), K.forEach((n) => {
  console.log(`- ${I}${n.fileName}${w}`);
})), K.length);
let Ge = 0;
const Ue = (n, t) => {
  const r = be.readdirSync(n);
  Ge += r.length;
  for (const c of r) {
    const l = We.join(n, c);
    be.statSync(l).isDirectory() ? Ue(l, t) : c.endsWith(".vue") && t(l);
  }
}, en = (n) => {
  console.log(`

${ye}Analyzing Vue files in ${n}${w}`);
  let t = 0;
  Ue(n, (r) => {
    const c = be.readFileSync(r, "utf-8"), { descriptor: l } = ut(c);
    l.script && Ut(r);
    const u = l.scriptSetup || l.script;
    u && (Mt(u, r), Jt(r), Ht(u, r), Qt(u, r)), l.styles.forEach((p) => {
      Zt(p, r);
    });
  }), console.log(`Found ${ye}${Ge}${w} Vue files`), t += Gt(), t += Dt(), t += Kt(), t += Xt(), t += Yt(), t += kt(), t || console.log(`${zt}No code smells detected!${w}`);
};
et(pt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (n) => n.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (n) => {
    en(n.path);
  }
).help().argv;
