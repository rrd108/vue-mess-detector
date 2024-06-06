import ot from "yargs";
import { format as Te, inspect as it } from "util";
import we, { normalize as rt, resolve as M, dirname as $e, basename as ct, extname as at, relative as lt } from "path";
import Ae, { readFileSync as je, statSync as Ie, readdirSync as ft, writeFile as ut } from "fs";
import { notStrictEqual as ht, strictEqual as pt } from "assert";
import { fileURLToPath as dt } from "url";
import { parse as gt } from "@vue/compiler-sfc";
class ee extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ee);
  }
}
function ze() {
  return mt() ? 0 : 1;
}
function mt() {
  return bt() && !process.defaultApp;
}
function bt() {
  return !!process.versions.electron;
}
function yt(n) {
  return n.slice(ze() + 1);
}
function Et() {
  return process.argv[ze()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function U(n) {
  if (n !== n.toLowerCase() && n !== n.toUpperCase() || (n = n.toLowerCase()), n.indexOf("-") === -1 && n.indexOf("_") === -1)
    return n;
  {
    let o = "", c = !1;
    const a = n.match(/^-+/);
    for (let u = a ? a[0].length : 0; u < n.length; u++) {
      let d = n.charAt(u);
      c && (c = !1, d = d.toUpperCase()), u !== 0 && (d === "-" || d === "_") ? c = !0 : d !== "-" && d !== "_" && (o += d);
    }
    return o;
  }
}
function Me(n, e) {
  const o = n.toLowerCase();
  e = e || "-";
  let c = "";
  for (let a = 0; a < n.length; a++) {
    const u = o.charAt(a), d = n.charAt(a);
    u !== d && a > 0 ? c += `${e}${o.charAt(a)}` : c += d;
  }
  return c;
}
function Ge(n) {
  return n == null ? !1 : typeof n == "number" || /^0x[0-9a-f]+$/i.test(n) ? !0 : /^0[^.]/.test(n) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(n);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function $t(n) {
  if (Array.isArray(n))
    return n.map((d) => typeof d != "string" ? d + "" : d);
  n = n.trim();
  let e = 0, o = null, c = null, a = null;
  const u = [];
  for (let d = 0; d < n.length; d++) {
    if (o = c, c = n.charAt(d), c === " " && !a) {
      o !== " " && e++;
      continue;
    }
    c === a ? a = null : (c === "'" || c === '"') && !a && (a = c), u[e] || (u[e] = ""), u[e] += c;
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
let P;
class At {
  constructor(e) {
    P = e;
  }
  parse(e, o) {
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
    }, o), a = $t(e), u = typeof e == "string", d = _t(Object.assign(/* @__PURE__ */ Object.create(null), c.alias)), m = Object.assign({
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
    }, c.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), c.default), j = c.configObjects || [], $ = c.envPrefix, R = m["populate--"], T = R ? "--" : "_", oe = /* @__PURE__ */ Object.create(null), Ce = /* @__PURE__ */ Object.create(null), I = c.__ || P.format, l = {
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
    }, F = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, he = new RegExp("^--" + m["negation-prefix"] + "(.+)");
    [].concat(c.array || []).filter(Boolean).forEach(function(t) {
      const i = typeof t == "object" ? t.key : t, f = Object.keys(t).map(function(r) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[r];
      }).filter(Boolean).pop();
      f && (l[f][i] = !0), l.arrays[i] = !0, l.keys.push(i);
    }), [].concat(c.boolean || []).filter(Boolean).forEach(function(t) {
      l.bools[t] = !0, l.keys.push(t);
    }), [].concat(c.string || []).filter(Boolean).forEach(function(t) {
      l.strings[t] = !0, l.keys.push(t);
    }), [].concat(c.number || []).filter(Boolean).forEach(function(t) {
      l.numbers[t] = !0, l.keys.push(t);
    }), [].concat(c.count || []).filter(Boolean).forEach(function(t) {
      l.counts[t] = !0, l.keys.push(t);
    }), [].concat(c.normalize || []).filter(Boolean).forEach(function(t) {
      l.normalize[t] = !0, l.keys.push(t);
    }), typeof c.narg == "object" && Object.entries(c.narg).forEach(([t, i]) => {
      typeof i == "number" && (l.nargs[t] = i, l.keys.push(t));
    }), typeof c.coerce == "object" && Object.entries(c.coerce).forEach(([t, i]) => {
      typeof i == "function" && (l.coercions[t] = i, l.keys.push(t));
    }), typeof c.config < "u" && (Array.isArray(c.config) || typeof c.config == "string" ? [].concat(c.config).filter(Boolean).forEach(function(t) {
      l.configs[t] = !0;
    }) : typeof c.config == "object" && Object.entries(c.config).forEach(([t, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (l.configs[t] = i);
    })), Je(c.key, d, c.default, l.arrays), Object.keys(E).forEach(function(t) {
      (l.aliases[t] || []).forEach(function(i) {
        E[i] = E[t];
      });
    });
    let x = null;
    st();
    let ie = [];
    const A = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), xe = {};
    for (let t = 0; t < a.length; t++) {
      const i = a[t], f = i.replace(/^-{3,}/, "---");
      let r, s, p, h, g, _;
      if (i !== "--" && /^-/.test(i) && le(i))
        pe(i);
      else if (f.match(/^---+(=|$)/)) {
        pe(i);
        continue;
      } else if (i.match(/^--.+=/) || !m["short-option-groups"] && i.match(/^-.+=/))
        h = i.match(/^--?([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && (b(h[1], l.arrays) ? t = ce(t, h[1], a, h[2]) : b(h[1], l.nargs) !== !1 ? t = re(t, h[1], a, h[2]) : y(h[1], h[2], !0));
      else if (i.match(he) && m["boolean-negation"])
        h = i.match(he), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], y(s, b(s, l.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !m["short-option-groups"] && i.match(/^-[^-]+/))
        h = i.match(/^--?(.+)/), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], b(s, l.arrays) ? t = ce(t, s, a) : b(s, l.nargs) !== !1 ? t = re(t, s, a) : (g = a[t + 1], g !== void 0 && (!g.match(/^-/) || g.match(F)) && !b(s, l.bools) && !b(s, l.counts) || /^(true|false)$/.test(g) ? (y(s, g), t++) : y(s, z(s))));
      else if (i.match(/^-.\..+=/))
        h = i.match(/^-([^=]+)=([\s\S]*)$/), h !== null && Array.isArray(h) && h.length >= 3 && y(h[1], h[2]);
      else if (i.match(/^-.\..+/) && !i.match(F))
        g = a[t + 1], h = i.match(/^-(.\..+)/), h !== null && Array.isArray(h) && h.length >= 2 && (s = h[1], g !== void 0 && !g.match(/^-/) && !b(s, l.bools) && !b(s, l.counts) ? (y(s, g), t++) : y(s, z(s)));
      else if (i.match(/^-[^-]+/) && !i.match(F)) {
        p = i.slice(1, -1).split(""), r = !1;
        for (let w = 0; w < p.length; w++) {
          if (g = i.slice(w + 2), p[w + 1] && p[w + 1] === "=") {
            _ = i.slice(w + 3), s = p[w], b(s, l.arrays) ? t = ce(t, s, a, _) : b(s, l.nargs) !== !1 ? t = re(t, s, a, _) : y(s, _), r = !0;
            break;
          }
          if (g === "-") {
            y(p[w], g);
            continue;
          }
          if (/[A-Za-z]/.test(p[w]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && b(g, l.bools) === !1) {
            y(p[w], g), r = !0;
            break;
          }
          if (p[w + 1] && p[w + 1].match(/\W/)) {
            y(p[w], g), r = !0;
            break;
          } else
            y(p[w], z(p[w]));
        }
        s = i.slice(-1)[0], !r && s !== "-" && (b(s, l.arrays) ? t = ce(t, s, a) : b(s, l.nargs) !== !1 ? t = re(t, s, a) : (g = a[t + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(F)) && !b(s, l.bools) && !b(s, l.counts) || /^(true|false)$/.test(g) ? (y(s, g), t++) : y(s, z(s))));
      } else if (i.match(/^-[0-9]$/) && i.match(F) && b(i.slice(1), l.bools))
        s = i.slice(1), y(s, z(s));
      else if (i === "--") {
        ie = a.slice(t + 1);
        break;
      } else if (m["halt-at-non-option"]) {
        ie = a.slice(t);
        break;
      } else
        pe(i);
    }
    Se(A, !0), Se(A, !1), Ye(A), qe(), Fe(A, l.aliases, E, !0), He(A), m["set-placeholder-key"] && Ze(A), Object.keys(l.counts).forEach(function(t) {
      G(A, t.split(".")) || y(t, 0);
    }), R && ie.length && (A[T] = []), ie.forEach(function(t) {
      A[T].push(t);
    }), m["camel-case-expansion"] && m["strip-dashed"] && Object.keys(A).filter((t) => t !== "--" && t.includes("-")).forEach((t) => {
      delete A[t];
    }), m["strip-aliased"] && [].concat(...Object.keys(d).map((t) => d[t])).forEach((t) => {
      m["camel-case-expansion"] && t.includes("-") && delete A[t.split(".").map((i) => U(i)).join(".")], delete A[t];
    });
    function pe(t) {
      const i = ae("_", t);
      (typeof i == "string" || typeof i == "number") && A._.push(i);
    }
    function re(t, i, f, r) {
      let s, p = b(i, l.nargs);
      if (p = typeof p != "number" || isNaN(p) ? 1 : p, p === 0)
        return B(r) || (x = Error(I("Argument unexpected for: %s", i))), y(i, z(i)), t;
      let h = B(r) ? 0 : 1;
      if (m["nargs-eats-options"])
        f.length - (t + 1) + h < p && (x = Error(I("Not enough arguments following: %s", i))), h = p;
      else {
        for (s = t + 1; s < f.length && (!f[s].match(/^-[^0-9]/) || f[s].match(F) || le(f[s])); s++)
          h++;
        h < p && (x = Error(I("Not enough arguments following: %s", i)));
      }
      let g = Math.min(h, p);
      for (!B(r) && g > 0 && (y(i, r), g--), s = t + 1; s < g + t + 1; s++)
        y(i, f[s]);
      return t + g;
    }
    function ce(t, i, f, r) {
      let s = [], p = r || f[t + 1];
      const h = b(i, l.nargs);
      if (b(i, l.bools) && !/^(true|false)$/.test(p))
        s.push(!0);
      else if (B(p) || B(r) && /^-/.test(p) && !F.test(p) && !le(p)) {
        if (E[i] !== void 0) {
          const g = E[i];
          s = Array.isArray(g) ? g : [g];
        }
      } else {
        B(r) || s.push(de(i, r, !0));
        for (let g = t + 1; g < f.length && !(!m["greedy-arrays"] && s.length > 0 || h && typeof h == "number" && s.length >= h || (p = f[g], /^-/.test(p) && !F.test(p) && !le(p))); g++)
          t = g, s.push(de(i, p, u));
      }
      return typeof h == "number" && (h && s.length < h || isNaN(h) && s.length === 0) && (x = Error(I("Not enough arguments following: %s", i))), y(i, s), t;
    }
    function y(t, i, f = u) {
      if (/-/.test(t) && m["camel-case-expansion"]) {
        const p = t.split(".").map(function(h) {
          return U(h);
        }).join(".");
        Ne(t, p);
      }
      const r = de(t, i, f), s = t.split(".");
      V(A, s, r), l.aliases[t] && l.aliases[t].forEach(function(p) {
        const h = p.split(".");
        V(A, h, r);
      }), s.length > 1 && m["dot-notation"] && (l.aliases[s[0]] || []).forEach(function(p) {
        let h = p.split(".");
        const g = [].concat(s);
        g.shift(), h = h.concat(g), (l.aliases[t] || []).includes(h.join(".")) || V(A, h, r);
      }), b(t, l.normalize) && !b(t, l.arrays) && [t].concat(l.aliases[t] || []).forEach(function(h) {
        Object.defineProperty(xe, h, {
          enumerable: !0,
          get() {
            return i;
          },
          set(g) {
            i = typeof g == "string" ? P.normalize(g) : g;
          }
        });
      });
    }
    function Ne(t, i) {
      l.aliases[t] && l.aliases[t].length || (l.aliases[t] = [i], oe[i] = !0), l.aliases[i] && l.aliases[i].length || Ne(i, t);
    }
    function de(t, i, f) {
      f && (i = Ot(i)), (b(t, l.bools) || b(t, l.counts)) && typeof i == "string" && (i = i === "true");
      let r = Array.isArray(i) ? i.map(function(s) {
        return ae(t, s);
      }) : ae(t, i);
      return b(t, l.counts) && (B(r) || typeof r == "boolean") && (r = me()), b(t, l.normalize) && b(t, l.arrays) && (Array.isArray(i) ? r = i.map((s) => P.normalize(s)) : r = P.normalize(i)), r;
    }
    function ae(t, i) {
      return !m["parse-positional-numbers"] && t === "_" || !b(t, l.strings) && !b(t, l.bools) && !Array.isArray(i) && (Ge(i) && m["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !B(i) && b(t, l.numbers)) && (i = Number(i)), i;
    }
    function Ye(t) {
      const i = /* @__PURE__ */ Object.create(null);
      Fe(i, l.aliases, E), Object.keys(l.configs).forEach(function(f) {
        const r = t[f] || i[f];
        if (r)
          try {
            let s = null;
            const p = P.resolve(P.cwd(), r), h = l.configs[f];
            if (typeof h == "function") {
              try {
                s = h(p);
              } catch (g) {
                s = g;
              }
              if (s instanceof Error) {
                x = s;
                return;
              }
            } else
              s = P.require(p);
            ge(s);
          } catch (s) {
            s.name === "PermissionDenied" ? x = s : t[f] && (x = Error(I("Invalid JSON config file: %s", r)));
          }
      });
    }
    function ge(t, i) {
      Object.keys(t).forEach(function(f) {
        const r = t[f], s = i ? i + "." + f : f;
        typeof r == "object" && r !== null && !Array.isArray(r) && m["dot-notation"] ? ge(r, s) : (!G(A, s.split(".")) || b(s, l.arrays) && m["combine-arrays"]) && y(s, r);
      });
    }
    function qe() {
      typeof j < "u" && j.forEach(function(t) {
        ge(t);
      });
    }
    function Se(t, i) {
      if (typeof $ > "u")
        return;
      const f = typeof $ == "string" ? $ : "", r = P.env();
      Object.keys(r).forEach(function(s) {
        if (f === "" || s.lastIndexOf(f, 0) === 0) {
          const p = s.split("__").map(function(h, g) {
            return g === 0 && (h = h.substring(f.length)), U(h);
          });
          (i && l.configs[p.join(".")] || !i) && !G(t, p) && y(p.join("."), r[s]);
        }
      });
    }
    function He(t) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(t).forEach(function(r) {
        if (!f.has(r) && (i = b(r, l.coercions), typeof i == "function"))
          try {
            const s = ae(r, i(t[r]));
            [].concat(l.aliases[r] || [], r).forEach((p) => {
              f.add(p), t[p] = s;
            });
          } catch (s) {
            x = s;
          }
      });
    }
    function Ze(t) {
      return l.keys.forEach((i) => {
        ~i.indexOf(".") || typeof t[i] > "u" && (t[i] = void 0);
      }), t;
    }
    function Fe(t, i, f, r = !1) {
      Object.keys(f).forEach(function(s) {
        G(t, s.split(".")) || (V(t, s.split("."), f[s]), r && (Ce[s] = !0), (i[s] || []).forEach(function(p) {
          G(t, p.split(".")) || V(t, p.split("."), f[s]);
        }));
      });
    }
    function G(t, i) {
      let f = t;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(s) {
        f = f[s] || {};
      });
      const r = i[i.length - 1];
      return typeof f != "object" ? !1 : r in f;
    }
    function V(t, i, f) {
      let r = t;
      m["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(_) {
        _ = Le(_), typeof r == "object" && r[_] === void 0 && (r[_] = {}), typeof r[_] != "object" || Array.isArray(r[_]) ? (Array.isArray(r[_]) ? r[_].push({}) : r[_] = [r[_], {}], r = r[_][r[_].length - 1]) : r = r[_];
      });
      const s = Le(i[i.length - 1]), p = b(i.join("."), l.arrays), h = Array.isArray(f);
      let g = m["duplicate-arguments-array"];
      !g && b(s, l.nargs) && (g = !0, (!B(r[s]) && l.nargs[s] === 1 || Array.isArray(r[s]) && r[s].length === l.nargs[s]) && (r[s] = void 0)), f === me() ? r[s] = me(r[s]) : Array.isArray(r[s]) ? g && p && h ? r[s] = m["flatten-duplicate-arrays"] ? r[s].concat(f) : (Array.isArray(r[s][0]) ? r[s] : [r[s]]).concat([f]) : !g && !!p == !!h ? r[s] = f : r[s] = r[s].concat([f]) : r[s] === void 0 && p ? r[s] = h ? f : [f] : g && !(r[s] === void 0 || b(s, l.counts) || b(s, l.bools)) ? r[s] = [r[s], f] : r[s] = f;
    }
    function Je(...t) {
      t.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          l.aliases[f] || (l.aliases[f] = [].concat(d[f] || []), l.aliases[f].concat(f).forEach(function(r) {
            if (/-/.test(r) && m["camel-case-expansion"]) {
              const s = U(r);
              s !== f && l.aliases[f].indexOf(s) === -1 && (l.aliases[f].push(s), oe[s] = !0);
            }
          }), l.aliases[f].concat(f).forEach(function(r) {
            if (r.length > 1 && /[A-Z]/.test(r) && m["camel-case-expansion"]) {
              const s = Me(r, "-");
              s !== f && l.aliases[f].indexOf(s) === -1 && (l.aliases[f].push(s), oe[s] = !0);
            }
          }), l.aliases[f].forEach(function(r) {
            l.aliases[r] = [f].concat(l.aliases[f].filter(function(s) {
              return r !== s;
            }));
          }));
        });
      });
    }
    function b(t, i) {
      const f = [].concat(l.aliases[t] || [], t), r = Object.keys(i), s = f.find((p) => r.includes(p));
      return s ? i[s] : !1;
    }
    function ve(t) {
      const i = Object.keys(l);
      return [].concat(i.map((r) => l[r])).some(function(r) {
        return Array.isArray(r) ? r.includes(t) : r[t];
      });
    }
    function Xe(t, ...i) {
      return [].concat(...i).some(function(r) {
        const s = t.match(r);
        return s && ve(s[1]);
      });
    }
    function ke(t) {
      if (t.match(F) || !t.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const r = t.slice(1).split("");
      for (let s = 0; s < r.length; s++) {
        if (f = t.slice(s + 2), !ve(r[s])) {
          i = !1;
          break;
        }
        if (r[s + 1] && r[s + 1] === "=" || f === "-" || /[A-Za-z]/.test(r[s]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || r[s + 1] && r[s + 1].match(/\W/))
          break;
      }
      return i;
    }
    function le(t) {
      return m["unknown-options-as-args"] && et(t);
    }
    function et(t) {
      return t = t.replace(/^-{3,}/, "--"), t.match(F) || ke(t) ? !1 : !Xe(t, /^-+([^=]+?)=[\s\S]*$/, he, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function z(t) {
      return !b(t, l.bools) && !b(t, l.counts) && `${t}` in E ? E[t] : tt(nt(t));
    }
    function tt(t) {
      return {
        [S.BOOLEAN]: !0,
        [S.STRING]: "",
        [S.NUMBER]: void 0,
        [S.ARRAY]: []
      }[t];
    }
    function nt(t) {
      let i = S.BOOLEAN;
      return b(t, l.strings) ? i = S.STRING : b(t, l.numbers) ? i = S.NUMBER : b(t, l.bools) ? i = S.BOOLEAN : b(t, l.arrays) && (i = S.ARRAY), i;
    }
    function B(t) {
      return t === void 0;
    }
    function st() {
      Object.keys(l.counts).find((t) => b(t, l.arrays) ? (x = Error(I("Invalid configuration: %s, opts.count excludes opts.array.", t)), !0) : b(t, l.nargs) ? (x = Error(I("Invalid configuration: %s, opts.count excludes opts.narg.", t)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(xe, A),
      configuration: m,
      defaulted: Object.assign({}, Ce),
      error: x,
      newAliases: Object.assign({}, oe)
    };
  }
}
function _t(n) {
  const e = [], o = /* @__PURE__ */ Object.create(null);
  let c = !0;
  for (Object.keys(n).forEach(function(a) {
    e.push([].concat(n[a], a));
  }); c; ) {
    c = !1;
    for (let a = 0; a < e.length; a++)
      for (let u = a + 1; u < e.length; u++)
        if (e[a].filter(function(m) {
          return e[u].indexOf(m) !== -1;
        }).length) {
          e[a] = e[a].concat(e[u]), e.splice(u, 1), c = !0;
          break;
        }
  }
  return e.forEach(function(a) {
    a = a.filter(function(d, m, E) {
      return E.indexOf(d) === m;
    });
    const u = a.pop();
    u !== void 0 && typeof u == "string" && (o[u] = a);
  }), o;
}
function me(n) {
  return n !== void 0 ? n + 1 : 1;
}
function Le(n) {
  return n === "__proto__" ? "___proto___" : n;
}
function Ot(n) {
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
var be, ye, Ee;
const We = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Re = (ye = (be = process == null ? void 0 : process.versions) === null || be === void 0 ? void 0 : be.node) !== null && ye !== void 0 ? ye : (Ee = process == null ? void 0 : process.version) === null || Ee === void 0 ? void 0 : Ee.slice(1);
if (Re && Number(Re.match(/^([^.]+)/)[1]) < We)
  throw Error(`yargs parser supports a minimum Node.js version of ${We}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const wt = process ? process.env : {}, Ve = new At({
  cwd: process.cwd,
  env: () => wt,
  format: Te,
  normalize: rt,
  resolve: M,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (n) => {
    if (typeof require < "u")
      return require(n);
    if (n.match(/\.json$/))
      return JSON.parse(je(n, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), se = function(e, o) {
  return Ve.parse(e.slice(), o).argv;
};
se.detailed = function(n, e) {
  return Ve.parse(n.slice(), e);
};
se.camelCase = U;
se.decamelize = Me;
se.looksLikeNumber = Ge;
const jt = {
  right: vt,
  center: Lt
}, Ct = 0, fe = 1, xt = 2, ue = 3;
class Nt {
  constructor(e) {
    var o;
    this.width = e.width, this.wrap = (o = e.wrap) !== null && o !== void 0 ? o : !0, this.rows = [];
  }
  span(...e) {
    const o = this.div(...e);
    o.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...e) {
    if (e.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...e) && typeof e[0] == "string")
      return this.applyLayoutDSL(e[0]);
    const o = e.map((c) => typeof c == "string" ? this.colFromString(c) : c);
    return this.rows.push(o), o;
  }
  shouldApplyLayoutDSL(...e) {
    return e.length === 1 && typeof e[0] == "string" && /[\t\n]/.test(e[0]);
  }
  applyLayoutDSL(e) {
    const o = e.split(`
`).map((a) => a.split("	"));
    let c = 0;
    return o.forEach((a) => {
      a.length > 1 && C.stringWidth(a[0]) > c && (c = Math.min(Math.floor(this.width * 0.5), C.stringWidth(a[0])));
    }), o.forEach((a) => {
      this.div(...a.map((u, d) => ({
        text: u.trim(),
        padding: this.measurePadding(u),
        width: d === 0 && a.length > 1 ? c : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(e) {
    return {
      text: e,
      padding: this.measurePadding(e)
    };
  }
  measurePadding(e) {
    const o = C.stripAnsi(e);
    return [0, o.match(/\s*$/)[0].length, 0, o.match(/^\s*/)[0].length];
  }
  toString() {
    const e = [];
    return this.rows.forEach((o) => {
      this.rowToString(o, e);
    }), e.filter((o) => !o.hidden).map((o) => o.text).join(`
`);
  }
  rowToString(e, o) {
    return this.rasterize(e).forEach((c, a) => {
      let u = "";
      c.forEach((d, m) => {
        const { width: E } = e[m], j = this.negatePadding(e[m]);
        let $ = d;
        if (j > C.stringWidth(d) && ($ += " ".repeat(j - C.stringWidth(d))), e[m].align && e[m].align !== "left" && this.wrap) {
          const T = jt[e[m].align];
          $ = T($, j), C.stringWidth($) < j && ($ += " ".repeat((E || 0) - C.stringWidth($) - 1));
        }
        const R = e[m].padding || [0, 0, 0, 0];
        R[ue] && (u += " ".repeat(R[ue])), u += Be(e[m], $, "| "), u += $, u += Be(e[m], $, " |"), R[fe] && (u += " ".repeat(R[fe])), a === 0 && o.length > 0 && (u = this.renderInline(u, o[o.length - 1]));
      }), o.push({
        text: u.replace(/ +$/, ""),
        span: e.span
      });
    }), o;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, o) {
    const c = e.match(/^ */), a = c ? c[0].length : 0, u = o.text, d = C.stringWidth(u.trimRight());
    return o.span ? this.wrap ? a < d ? e : (o.hidden = !0, u.trimRight() + " ".repeat(a - d) + e.trimLeft()) : (o.hidden = !0, u + e) : e;
  }
  rasterize(e) {
    const o = [], c = this.columnWidths(e);
    let a;
    return e.forEach((u, d) => {
      u.width = c[d], this.wrap ? a = C.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`) : a = u.text.split(`
`), u.border && (a.unshift("." + "-".repeat(this.negatePadding(u) + 2) + "."), a.push("'" + "-".repeat(this.negatePadding(u) + 2) + "'")), u.padding && (a.unshift(...new Array(u.padding[Ct] || 0).fill("")), a.push(...new Array(u.padding[xt] || 0).fill(""))), a.forEach((m, E) => {
        o[E] || o.push([]);
        const j = o[E];
        for (let $ = 0; $ < d; $++)
          j[$] === void 0 && j.push("");
        j.push(m);
      });
    }), o;
  }
  negatePadding(e) {
    let o = e.width || 0;
    return e.padding && (o -= (e.padding[ue] || 0) + (e.padding[fe] || 0)), e.border && (o -= 4), o;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((d) => d.width || C.stringWidth(d.text));
    let o = e.length, c = this.width;
    const a = e.map((d) => {
      if (d.width)
        return o--, c -= d.width, d.width;
    }), u = o ? Math.floor(c / o) : 0;
    return a.map((d, m) => d === void 0 ? Math.max(u, St(e[m])) : d);
  }
}
function Be(n, e, o) {
  return n.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? o : "  " : "";
}
function St(n) {
  const e = n.padding || [], o = 1 + (e[ue] || 0) + (e[fe] || 0);
  return n.border ? o + 4 : o;
}
function Ft() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function vt(n, e) {
  n = n.trim();
  const o = C.stringWidth(n);
  return o < e ? " ".repeat(e - o) + n : n;
}
function Lt(n, e) {
  n = n.trim();
  const o = C.stringWidth(n);
  return o >= e ? n : " ".repeat(e - o >> 1) + n;
}
let C;
function Wt(n, e) {
  return C = e, new Nt({
    width: n?.width || Ft(),
    wrap: n?.wrap
  });
}
const Ue = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function De(n) {
  return n.replace(Ue, "");
}
function Rt(n, e) {
  const [o, c] = n.match(Ue) || ["", ""];
  n = De(n);
  let a = "";
  for (let u = 0; u < n.length; u++)
    u !== 0 && u % e === 0 && (a += `
`), a += n.charAt(u);
  return o && c && (a = `${o}${a}${c}`), a;
}
function Bt(n) {
  return Wt(n, {
    stringWidth: (e) => [...e].length,
    stripAnsi: De,
    wrap: Rt
  });
}
function Pt(n, e) {
  let o = M(".", n), c;
  for (Ie(o).isDirectory() || (o = $e(o)); ; ) {
    if (c = e(o, ft(o)), c)
      return M(o, c);
    if (o = $e(c = o), c === o)
      break;
  }
}
const Tt = {
  fs: {
    readFileSync: je,
    writeFile: ut
  },
  format: Te,
  resolve: M,
  exists: (n) => {
    try {
      return Ie(n).isFile();
    } catch {
      return !1;
    }
  }
};
let N;
class It {
  constructor(e) {
    e = e || {}, this.directory = e.directory || "./locales", this.updateFiles = typeof e.updateFiles == "boolean" ? e.updateFiles : !0, this.locale = e.locale || "en", this.fallbackToLanguage = typeof e.fallbackToLanguage == "boolean" ? e.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...e) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const o = e.shift();
    let c = function() {
    };
    return typeof e[e.length - 1] == "function" && (c = e.pop()), c = c || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][o] && this.updateFiles ? (this.cache[this.locale][o] = o, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c(), N.format.apply(N.format, [this.cache[this.locale][o] || o].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), o = e.shift(), c = e.shift(), a = e.shift();
    let u = function() {
    };
    typeof e[e.length - 1] == "function" && (u = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let d = a === 1 ? o : c;
    this.cache[this.locale][o] && (d = this.cache[this.locale][o][a === 1 ? "one" : "other"]), !this.cache[this.locale][o] && this.updateFiles ? (this.cache[this.locale][o] = {
      one: o,
      other: c
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: u
    })) : u();
    const m = [d];
    return ~d.indexOf("%d") && m.push(a), N.format.apply(N.format, m.concat(e));
  }
  setLocale(e) {
    this.locale = e;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(e) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const o in e)
      Object.prototype.hasOwnProperty.call(e, o) && (this.cache[this.locale][o] = e[o]);
  }
  _taggedLiteral(e, ...o) {
    let c = "";
    return e.forEach(function(a, u) {
      const d = o[u + 1];
      c += a, typeof d < "u" && (c += "%s");
    }), this.__.apply(this, [c].concat([].slice.call(o, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, o = this.writeQueue[0], c = o.directory, a = o.locale, u = o.cb, d = this._resolveLocaleFile(c, a), m = JSON.stringify(this.cache[a], null, 2);
    N.fs.writeFile(d, m, "utf-8", function(E) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), u(E);
    });
  }
  _readLocaleFile() {
    let e = {};
    const o = this._resolveLocaleFile(this.directory, this.locale);
    try {
      N.fs.readFileSync && (e = JSON.parse(N.fs.readFileSync(o, "utf-8")));
    } catch (c) {
      if (c instanceof SyntaxError && (c.message = "syntax error in " + o), c.code === "ENOENT")
        e = {};
      else
        throw c;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, o) {
    let c = N.resolve(e, "./", o + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(c) && ~o.lastIndexOf("_")) {
      const a = N.resolve(e, "./", o.split("_")[0] + ".json");
      this._fileExistsSync(a) && (c = a);
    }
    return c;
  }
  _fileExistsSync(e) {
    return N.exists(e);
  }
}
function zt(n, e) {
  N = e;
  const o = new It(n);
  return {
    __: o.__.bind(o),
    __n: o.__n.bind(o),
    setLocale: o.setLocale.bind(o),
    getLocale: o.getLocale.bind(o),
    updateLocale: o.updateLocale.bind(o),
    locale: o.locale
  };
}
const Mt = (n) => zt(n, Tt), Gt = "require is not supported by ESM", Pe = "loading a directory of commands is not supported yet for ESM";
let te;
try {
  te = dt(import.meta.url);
} catch {
  te = process.cwd();
}
const Vt = te.substring(0, te.lastIndexOf("node_modules"));
ht, pt, it, Vt || process.cwd(), ct, $e, at, lt, M, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, je, Mt({
  directory: M(te, "../../../locales"),
  updateFiles: !1
});
const _e = "\x1B[44m", ne = "\x1B[43m", v = "\x1B[41m", Ut = "\x1B[42m", O = "\x1B[0m", L = "\x1B[33m", W = "\x1B[0m", Oe = 50, D = [], Dt = (n, e) => {
  const o = n.content.split(`
`);
  o.length > Oe && D.push({ fileName: e, scriptLength: o.length });
}, Kt = () => (D.length > 0 && (console.log(`
${v}Long <script> blocks${O} in ${D.length} files.`), console.log(
  `👉 ${L}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Oe} lines.${W}`
), D.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.scriptLength > Oe * 2 ? v : ne}(${n.scriptLength} lines)${O}`
  );
})), D.length), K = [], Qt = (n) => {
  K.push(n);
}, Yt = () => (K.length > 0 && (console.log(`
${ne}Plain <script> blocks${O} in ${K.length} files.`), console.log(`👉 ${L} Consider using <script setup> to leverage the new SFC <script> syntax.${W}`), K.forEach((n) => {
  console.log(`- ${n}`);
})), K.length), Q = [], qt = (n, e) => {
  const o = /\belse\b/gi, c = n.content.match(o);
  c?.length && Q.push({ fileName: e, elseCount: c.length });
}, Ht = () => (Q.length > 0 && (console.log(`
${ne}else conditions${O} are used in ${Q.length} files.`), console.log(`👉 ${L}Try to rewrite the conditions in a way that the else clause is not necessary.${W}`), Q.forEach((n) => {
  console.log(`- ${n.fileName} ${ne}(${n.elseCount})${O}`);
})), Q.length), Zt = 5, Jt = 10, Y = [], Xt = (n, e) => {
  const o = /\bif\b/gi, c = /\belse\b/gi, a = /\bfor\b/gi, u = /\bwhile\b/gi, d = /\bcase\b/gi, m = n.content.match(o), E = n.content.match(c), j = n.content.match(a), $ = n.content.match(u), R = n.content.match(d), T = (m?.length || 0) + (E?.length || 0) + (j?.length || 0) + ($?.length || 0) + (R?.length || 0);
  T > Zt && Y.push({ fileName: e, cyclomaticComplexity: T });
}, kt = () => (Y.length > 0 && (console.log(
  `
${_e}cyclomaticComplexity${O} is above moderate in ${Y.length} files.`
), console.log(`👉 ${L}Try to reduce complexity.${W}`), Y.forEach((n) => {
  console.log(
    `- ${n.fileName} ${n.cyclomaticComplexity > Jt ? v : ne}(${n.cyclomaticComplexity})${O}`
  );
})), Y.length), q = [], en = (n) => {
  if (n.includes("pages"))
    return;
  const e = we.basename(n);
  if (e === "App.vue")
    return;
  const o = /[A-Z]/;
  e.slice(1).match(o)?.length || q.push({ filePath: n });
}, tn = () => (q.length > 0 && (console.log(`
${v}single name component${O} is used in ${q.length} files.`), console.log(
  `👉 ${L}Rename the component to use multi-word name.${W} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), q.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), q.length), H = [], nn = (n, e) => {
  n.scoped || H.push({ filePath: e });
}, sn = () => (H.length > 0 && (console.log(`
${v}Global style ${O} is used in ${H.length} files.`), console.log(
  `👉 ${L}Use <style scoped>.${W} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), H.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), H.length), Z = [], on = (n, e) => {
  const o = /defineProps\(\[/gi;
  n.content.match(o)?.length && Z.push({ filePath: e });
}, rn = () => (Z.length > 0 && (console.log(`
${v}simple prop${O} is used in ${Z.length} files.`), console.log(
  `👉 ${L}Add at least type definition.${W} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), Z.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), Z.length), J = [], cn = (n, e) => {
  const o = /<[^>]+ v-if[^>]+ v-for[^>]+>/gi, c = /<[^>]+ v-for[^>]+ v-if[^>]+>/gi, a = n.content.match(o), u = n.content.match(c);
  (a?.length || u?.length) && J.push({ filePath: e });
}, an = () => (J.length > 0 && (console.log(`
${v}v-if used with v-for${O} in ${J.length} files.`), console.log(
  `👉 ${L}Move out the v-if to a computed property.${W} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), J.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), J.length), X = [], ln = (n, e) => {
  const o = /<[^>]+ v-for[^>]+>/gi, c = n.content.match(o);
  c?.length && (c.some((u) => u.includes(":key")) || X.push({ filePath: e }));
}, fn = () => (X.length > 0 && (console.log(`
${v}v-for has no key${O} in ${X.length} files.`), console.log(
  `👉 ${L}Add a \`:key\` property to all v-for.${W} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), X.forEach((n) => {
  console.log(`- ${n.filePath} 🚨`);
})), X.length), k = [], un = (n) => {
  const e = we.basename(n), o = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, c = e.match(o), a = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, u = e.match(a);
  !c?.length && !u?.length && k.push({ fileName: n });
}, hn = () => (k.length > 0 && (console.log(
  `
${v}component name is not PascalCase and not kebab-abse${O} in ${k.length} files.`
), console.log(
  `👉 ${L}Rename the component to use PascalCase or kebab-case file name.${W} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), k.forEach((n) => {
  console.log(`- ${v}${n.fileName}${O}`);
})), k.length);
let Ke = 0;
const Qe = (n, e) => {
  const o = Ae.readdirSync(n);
  Ke += o.length;
  for (const c of o) {
    const a = we.join(n, c);
    Ae.statSync(a).isDirectory() ? Qe(a, e) : c.endsWith(".vue") && e(a);
  }
}, pn = (n) => {
  console.log(`

${_e}Analyzing Vue files in ${n}${O}`);
  let e = 0;
  Qe(n, (o) => {
    const c = Ae.readFileSync(o, "utf-8"), { descriptor: a } = gt(c);
    en(o), un(o), a.script && Qt(o);
    const u = a.scriptSetup || a.script;
    u && (on(u, o), Dt(u, o), Xt(u, o), qt(u, o)), a.styles.forEach((d) => {
      nn(d, o);
    }), a.template && (ln(a.template, o), cn(a.template, o));
  }), console.log(`Found ${_e}${Ke}${O} Vue files`), e += tn(), e += rn(), e += fn(), e += an(), e += sn(), e += hn(), e += Kt(), e += Yt(), e += kt(), e += Ht(), e || console.log(`${Ut}No code smells detected!${O}`);
};
ot(yt(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (n) => n.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./src"
  }),
  (n) => {
    pn(n.path);
  }
).help().argv;
