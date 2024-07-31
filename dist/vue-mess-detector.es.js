import qt from "yargs";
import { format as Et, inspect as Zt } from "util";
import st, { normalize as Kt, resolve as te, dirname as ke, basename as Qt, extname as Xt, relative as Yt } from "path";
import Je, { readFileSync as rt, statSync as Ct, readdirSync as Ht, writeFile as kt } from "fs";
import { notStrictEqual as Jt, strictEqual as en } from "assert";
import { fileURLToPath as tn } from "url";
import { parse as nn } from "@vue/compiler-sfc";
class Se extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Se);
  }
}
function At() {
  return on() ? 0 : 1;
}
function on() {
  return sn() && !process.defaultApp;
}
function sn() {
  return !!process.versions.electron;
}
function rn(e) {
  return e.slice(At() + 1);
}
function cn() {
  return process.argv[At()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function se(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const c = e.match(/^-+/);
    for (let a = c ? c[0].length : 0; a < e.length; a++) {
      let h = e.charAt(a);
      s && (s = !1, h = h.toUpperCase()), a !== 0 && (h === "-" || h === "_") ? s = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function vt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? s += `${t}${n.charAt(c)}` : s += h;
  }
  return s;
}
function _t(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ln(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, s = null, c = null;
  const a = [];
  for (let h = 0; h < e.length; h++) {
    if (n = s, s = e.charAt(h), s === " " && !c) {
      n !== " " && t++;
      continue;
    }
    s === c ? c = null : (s === "'" || s === '"') && !c && (c = s), a[t] || (a[t] = ""), a[t] += s;
  }
  return a;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var z;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(z || (z = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let Z;
class an {
  constructor(t) {
    Z = t;
  }
  parse(t, n) {
    const s = Object.assign({
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
    }, n), c = ln(t), a = typeof t == "string", h = un(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), d = Object.assign({
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
    }, s.configuration), C = Object.assign(/* @__PURE__ */ Object.create(null), s.default), j = s.configObjects || [], w = s.envPrefix, G = d["populate--"], Y = G ? "--" : "_", Te = /* @__PURE__ */ Object.create(null), it = /* @__PURE__ */ Object.create(null), H = s.__ || Z.format, u = {
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
    }, D = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ge = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(o) {
      const i = typeof o == "object" ? o.key : o, f = Object.keys(o).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      f && (u[f][i] = !0), u.arrays[i] = !0, u.keys.push(i);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(o) {
      u.bools[o] = !0, u.keys.push(o);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(o) {
      u.strings[o] = !0, u.keys.push(o);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(o) {
      u.numbers[o] = !0, u.keys.push(o);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(o) {
      u.counts[o] = !0, u.keys.push(o);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(o) {
      u.normalize[o] = !0, u.keys.push(o);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([o, i]) => {
      typeof i == "number" && (u.nargs[o] = i, u.keys.push(o));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([o, i]) => {
      typeof i == "function" && (u.coercions[o] = i, u.keys.push(o));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(o) {
      u.configs[o] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([o, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (u.configs[o] = i);
    })), Pt(s.key, h, s.default, u.arrays), Object.keys(C).forEach(function(o) {
      (u.aliases[o] || []).forEach(function(i) {
        C[i] = C[o];
      });
    });
    let P = null;
    Gt();
    let We = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ct = {};
    for (let o = 0; o < c.length; o++) {
      const i = c[o], f = i.replace(/^-{3,}/, "---");
      let l, r, g, p, m, R;
      if (i !== "--" && /^-/.test(i) && Me(i))
        qe(i);
      else if (f.match(/^---+(=|$)/)) {
        qe(i);
        continue;
      } else if (i.match(/^--.+=/) || !d["short-option-groups"] && i.match(/^-.+=/))
        p = i.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (E(p[1], u.arrays) ? o = Be(o, p[1], c, p[2]) : E(p[1], u.nargs) !== !1 ? o = Ie(o, p[1], c, p[2]) : x(p[1], p[2], !0));
      else if (i.match(Ge) && d["boolean-negation"])
        p = i.match(Ge), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], x(r, E(r, u.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !d["short-option-groups"] && i.match(/^-[^-]+/))
        p = i.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], E(r, u.arrays) ? o = Be(o, r, c) : E(r, u.nargs) !== !1 ? o = Ie(o, r, c) : (m = c[o + 1], m !== void 0 && (!m.match(/^-/) || m.match(D)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (x(r, m), o++) : x(r, J(r))));
      else if (i.match(/^-.\..+=/))
        p = i.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && x(p[1], p[2]);
      else if (i.match(/^-.\..+/) && !i.match(D))
        m = c[o + 1], p = i.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], m !== void 0 && !m.match(/^-/) && !E(r, u.bools) && !E(r, u.counts) ? (x(r, m), o++) : x(r, J(r)));
      else if (i.match(/^-[^-]+/) && !i.match(D)) {
        g = i.slice(1, -1).split(""), l = !1;
        for (let L = 0; L < g.length; L++) {
          if (m = i.slice(L + 2), g[L + 1] && g[L + 1] === "=") {
            R = i.slice(L + 3), r = g[L], E(r, u.arrays) ? o = Be(o, r, c, R) : E(r, u.nargs) !== !1 ? o = Ie(o, r, c, R) : x(r, R), l = !0;
            break;
          }
          if (m === "-") {
            x(g[L], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[L]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && E(m, u.bools) === !1) {
            x(g[L], m), l = !0;
            break;
          }
          if (g[L + 1] && g[L + 1].match(/\W/)) {
            x(g[L], m), l = !0;
            break;
          } else
            x(g[L], J(g[L]));
        }
        r = i.slice(-1)[0], !l && r !== "-" && (E(r, u.arrays) ? o = Be(o, r, c) : E(r, u.nargs) !== !1 ? o = Ie(o, r, c) : (m = c[o + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(D)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (x(r, m), o++) : x(r, J(r))));
      } else if (i.match(/^-[0-9]$/) && i.match(D) && E(i.slice(1), u.bools))
        r = i.slice(1), x(r, J(r));
      else if (i === "--") {
        We = c.slice(o + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        We = c.slice(o);
        break;
      } else
        qe(i);
    }
    at(F, !0), at(F, !1), Tt(F), Wt(), ut(F, u.aliases, C, !0), It(F), d["set-placeholder-key"] && Bt(F), Object.keys(u.counts).forEach(function(o) {
      ne(F, o.split(".")) || x(o, 0);
    }), G && We.length && (F[Y] = []), We.forEach(function(o) {
      F[Y].push(o);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(F).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete F[o];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((o) => h[o])).forEach((o) => {
      d["camel-case-expansion"] && o.includes("-") && delete F[o.split(".").map((i) => se(i)).join(".")], delete F[o];
    });
    function qe(o) {
      const i = Pe("_", o);
      (typeof i == "string" || typeof i == "number") && F._.push(i);
    }
    function Ie(o, i, f, l) {
      let r, g = E(i, u.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return q(l) || (P = Error(H("Argument unexpected for: %s", i))), x(i, J(i)), o;
      let p = q(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        f.length - (o + 1) + p < g && (P = Error(H("Not enough arguments following: %s", i))), p = g;
      else {
        for (r = o + 1; r < f.length && (!f[r].match(/^-[^0-9]/) || f[r].match(D) || Me(f[r])); r++)
          p++;
        p < g && (P = Error(H("Not enough arguments following: %s", i)));
      }
      let m = Math.min(p, g);
      for (!q(l) && m > 0 && (x(i, l), m--), r = o + 1; r < m + o + 1; r++)
        x(i, f[r]);
      return o + m;
    }
    function Be(o, i, f, l) {
      let r = [], g = l || f[o + 1];
      const p = E(i, u.nargs);
      if (E(i, u.bools) && !/^(true|false)$/.test(g))
        r.push(!0);
      else if (q(g) || q(l) && /^-/.test(g) && !D.test(g) && !Me(g)) {
        if (C[i] !== void 0) {
          const m = C[i];
          r = Array.isArray(m) ? m : [m];
        }
      } else {
        q(l) || r.push(Ze(i, l, !0));
        for (let m = o + 1; m < f.length && !(!d["greedy-arrays"] && r.length > 0 || p && typeof p == "number" && r.length >= p || (g = f[m], /^-/.test(g) && !D.test(g) && !Me(g))); m++)
          o = m, r.push(Ze(i, g, a));
      }
      return typeof p == "number" && (p && r.length < p || isNaN(p) && r.length === 0) && (P = Error(H("Not enough arguments following: %s", i))), x(i, r), o;
    }
    function x(o, i, f = a) {
      if (/-/.test(o) && d["camel-case-expansion"]) {
        const g = o.split(".").map(function(p) {
          return se(p);
        }).join(".");
        lt(o, g);
      }
      const l = Ze(o, i, f), r = o.split(".");
      oe(F, r, l), u.aliases[o] && u.aliases[o].forEach(function(g) {
        const p = g.split(".");
        oe(F, p, l);
      }), r.length > 1 && d["dot-notation"] && (u.aliases[r[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(r);
        m.shift(), p = p.concat(m), (u.aliases[o] || []).includes(p.join(".")) || oe(F, p, l);
      }), E(o, u.normalize) && !E(o, u.arrays) && [o].concat(u.aliases[o] || []).forEach(function(p) {
        Object.defineProperty(ct, p, {
          enumerable: !0,
          get() {
            return i;
          },
          set(m) {
            i = typeof m == "string" ? Z.normalize(m) : m;
          }
        });
      });
    }
    function lt(o, i) {
      u.aliases[o] && u.aliases[o].length || (u.aliases[o] = [i], Te[i] = !0), u.aliases[i] && u.aliases[i].length || lt(i, o);
    }
    function Ze(o, i, f) {
      f && (i = fn(i)), (E(o, u.bools) || E(o, u.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(r) {
        return Pe(o, r);
      }) : Pe(o, i);
      return E(o, u.counts) && (q(l) || typeof l == "boolean") && (l = Qe()), E(o, u.normalize) && E(o, u.arrays) && (Array.isArray(i) ? l = i.map((r) => Z.normalize(r)) : l = Z.normalize(i)), l;
    }
    function Pe(o, i) {
      return !d["parse-positional-numbers"] && o === "_" || !E(o, u.strings) && !E(o, u.bools) && !Array.isArray(i) && (_t(i) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !q(i) && E(o, u.numbers)) && (i = Number(i)), i;
    }
    function Tt(o) {
      const i = /* @__PURE__ */ Object.create(null);
      ut(i, u.aliases, C), Object.keys(u.configs).forEach(function(f) {
        const l = o[f] || i[f];
        if (l)
          try {
            let r = null;
            const g = Z.resolve(Z.cwd(), l), p = u.configs[f];
            if (typeof p == "function") {
              try {
                r = p(g);
              } catch (m) {
                r = m;
              }
              if (r instanceof Error) {
                P = r;
                return;
              }
            } else
              r = Z.require(g);
            Ke(r);
          } catch (r) {
            r.name === "PermissionDenied" ? P = r : o[f] && (P = Error(H("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ke(o, i) {
      Object.keys(o).forEach(function(f) {
        const l = o[f], r = i ? i + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Ke(l, r) : (!ne(F, r.split(".")) || E(r, u.arrays) && d["combine-arrays"]) && x(r, l);
      });
    }
    function Wt() {
      typeof j < "u" && j.forEach(function(o) {
        Ke(o);
      });
    }
    function at(o, i) {
      if (typeof w > "u")
        return;
      const f = typeof w == "string" ? w : "", l = Z.env();
      Object.keys(l).forEach(function(r) {
        if (f === "" || r.lastIndexOf(f, 0) === 0) {
          const g = r.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), se(p);
          });
          (i && u.configs[g.join(".")] || !i) && !ne(o, g) && x(g.join("."), l[r]);
        }
      });
    }
    function It(o) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(l) {
        if (!f.has(l) && (i = E(l, u.coercions), typeof i == "function"))
          try {
            const r = Pe(l, i(o[l]));
            [].concat(u.aliases[l] || [], l).forEach((g) => {
              f.add(g), o[g] = r;
            });
          } catch (r) {
            P = r;
          }
      });
    }
    function Bt(o) {
      return u.keys.forEach((i) => {
        ~i.indexOf(".") || typeof o[i] > "u" && (o[i] = void 0);
      }), o;
    }
    function ut(o, i, f, l = !1) {
      Object.keys(f).forEach(function(r) {
        ne(o, r.split(".")) || (oe(o, r.split("."), f[r]), l && (it[r] = !0), (i[r] || []).forEach(function(g) {
          ne(o, g.split(".")) || oe(o, g.split("."), f[r]);
        }));
      });
    }
    function ne(o, i) {
      let f = o;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(r) {
        f = f[r] || {};
      });
      const l = i[i.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function oe(o, i, f) {
      let l = o;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(R) {
        R = ht(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const r = ht(i[i.length - 1]), g = E(i.join("."), u.arrays), p = Array.isArray(f);
      let m = d["duplicate-arguments-array"];
      !m && E(r, u.nargs) && (m = !0, (!q(l[r]) && u.nargs[r] === 1 || Array.isArray(l[r]) && l[r].length === u.nargs[r]) && (l[r] = void 0)), f === Qe() ? l[r] = Qe(l[r]) : Array.isArray(l[r]) ? m && g && p ? l[r] = d["flatten-duplicate-arrays"] ? l[r].concat(f) : (Array.isArray(l[r][0]) ? l[r] : [l[r]]).concat([f]) : !m && !!g == !!p ? l[r] = f : l[r] = l[r].concat([f]) : l[r] === void 0 && g ? l[r] = p ? f : [f] : m && !(l[r] === void 0 || E(r, u.counts) || E(r, u.bools)) ? l[r] = [l[r], f] : l[r] = f;
    }
    function Pt(...o) {
      o.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const r = se(l);
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Te[r] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const r = vt(l, "-");
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Te[r] = !0);
            }
          }), u.aliases[f].forEach(function(l) {
            u.aliases[l] = [f].concat(u.aliases[f].filter(function(r) {
              return l !== r;
            }));
          }));
        });
      });
    }
    function E(o, i) {
      const f = [].concat(u.aliases[o] || [], o), l = Object.keys(i), r = f.find((g) => l.includes(g));
      return r ? i[r] : !1;
    }
    function ft(o) {
      const i = Object.keys(u);
      return [].concat(i.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(o) : l[o];
      });
    }
    function Mt(o, ...i) {
      return [].concat(...i).some(function(l) {
        const r = o.match(l);
        return r && ft(r[1]);
      });
    }
    function zt(o) {
      if (o.match(D) || !o.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const l = o.slice(1).split("");
      for (let r = 0; r < l.length; r++) {
        if (f = o.slice(r + 2), !ft(l[r])) {
          i = !1;
          break;
        }
        if (l[r + 1] && l[r + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[r]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[r + 1] && l[r + 1].match(/\W/))
          break;
      }
      return i;
    }
    function Me(o) {
      return d["unknown-options-as-args"] && Vt(o);
    }
    function Vt(o) {
      return o = o.replace(/^-{3,}/, "--"), o.match(D) || zt(o) ? !1 : !Mt(o, /^-+([^=]+?)=[\s\S]*$/, Ge, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function J(o) {
      return !E(o, u.bools) && !E(o, u.counts) && `${o}` in C ? C[o] : Ut(Dt(o));
    }
    function Ut(o) {
      return {
        [z.BOOLEAN]: !0,
        [z.STRING]: "",
        [z.NUMBER]: void 0,
        [z.ARRAY]: []
      }[o];
    }
    function Dt(o) {
      let i = z.BOOLEAN;
      return E(o, u.strings) ? i = z.STRING : E(o, u.numbers) ? i = z.NUMBER : E(o, u.bools) ? i = z.BOOLEAN : E(o, u.arrays) && (i = z.ARRAY), i;
    }
    function q(o) {
      return o === void 0;
    }
    function Gt() {
      Object.keys(u.counts).find((o) => E(o, u.arrays) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : E(o, u.nargs) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(ct, F),
      configuration: d,
      defaulted: Object.assign({}, it),
      error: P,
      newAliases: Object.assign({}, Te)
    };
  }
}
function un(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); s; ) {
    s = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(d) {
          return t[a].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(h, d, C) {
      return C.indexOf(h) === d;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function Qe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function ht(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function fn(e) {
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
var Xe, Ye, He;
const pt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, dt = (Ye = (Xe = process == null ? void 0 : process.versions) === null || Xe === void 0 ? void 0 : Xe.node) !== null && Ye !== void 0 ? Ye : (He = process == null ? void 0 : process.version) === null || He === void 0 ? void 0 : He.slice(1);
if (dt && Number(dt.match(/^([^.]+)/)[1]) < pt)
  throw Error(`yargs parser supports a minimum Node.js version of ${pt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const hn = process ? process.env : {}, xt = new an({
  cwd: process.cwd,
  env: () => hn,
  format: Et,
  normalize: Kt,
  resolve: te,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(rt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Le = function(t, n) {
  return xt.parse(t.slice(), n).argv;
};
Le.detailed = function(e, t) {
  return xt.parse(e.slice(), t);
};
Le.camelCase = se;
Le.decamelize = vt;
Le.looksLikeNumber = _t;
const pn = {
  right: bn,
  center: En
}, dn = 0, ze = 1, gn = 2, Ve = 3;
class mn {
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
    const n = t.map((s) => typeof s == "string" ? this.colFromString(s) : s);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((c) => c.split("	"));
    let s = 0;
    return n.forEach((c) => {
      c.length > 1 && T.stringWidth(c[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), T.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((a, h) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: h === 0 && c.length > 1 ? s : void 0
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
    const n = T.stripAnsi(t);
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
    return this.rasterize(t).forEach((s, c) => {
      let a = "";
      s.forEach((h, d) => {
        const { width: C } = t[d], j = this.negatePadding(t[d]);
        let w = h;
        if (j > T.stringWidth(h) && (w += " ".repeat(j - T.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const Y = pn[t[d].align];
          w = Y(w, j), T.stringWidth(w) < j && (w += " ".repeat((C || 0) - T.stringWidth(w) - 1));
        }
        const G = t[d].padding || [0, 0, 0, 0];
        G[Ve] && (a += " ".repeat(G[Ve])), a += gt(t[d], w, "| "), a += w, a += gt(t[d], w, " |"), G[ze] && (a += " ".repeat(G[ze])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), c = s ? s[0].length : 0, a = n.text, h = T.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = s[h], this.wrap ? c = T.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[dn] || 0).fill("")), c.push(...new Array(a.padding[gn] || 0).fill(""))), c.forEach((d, C) => {
        n[C] || n.push([]);
        const j = n[C];
        for (let w = 0; w < h; w++)
          j[w] === void 0 && j.push("");
        j.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ve] || 0) + (t.padding[ze] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || T.stringWidth(h.text));
    let n = t.length, s = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, s -= h.width, h.width;
    }), a = n ? Math.floor(s / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, $n(t[d])) : h);
  }
}
function gt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function $n(e) {
  const t = e.padding || [], n = 1 + (t[Ve] || 0) + (t[ze] || 0);
  return e.border ? n + 4 : n;
}
function yn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function bn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function En(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Cn(e, t) {
  return T = t, new mn({
    width: e?.width || yn(),
    wrap: e?.wrap
  });
}
const wt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ot(e) {
  return e.replace(wt, "");
}
function An(e, t) {
  const [n, s] = e.match(wt) || ["", ""];
  e = Ot(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && s && (c = `${n}${c}${s}`), c;
}
function vn(e) {
  return Cn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Ot,
    wrap: An
  });
}
function _n(e, t) {
  let n = te(".", e), s;
  for (Ct(n).isDirectory() || (n = ke(n)); ; ) {
    if (s = t(n, Ht(n)), s)
      return te(n, s);
    if (n = ke(s = n), s === n)
      break;
  }
}
const xn = {
  fs: {
    readFileSync: rt,
    writeFile: kt
  },
  format: Et,
  resolve: te,
  exists: (e) => {
    try {
      return Ct(e).isFile();
    } catch {
      return !1;
    }
  }
};
let M;
class wn {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let s = function() {
    };
    return typeof t[t.length - 1] == "function" && (s = t.pop()), s = s || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: s
    })) : s(), M.format.apply(M.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), c = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = c === 1 ? n : s;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const d = [h];
    return ~h.indexOf("%d") && d.push(c), M.format.apply(M.format, d.concat(t));
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
    let s = "";
    return t.forEach(function(c, a) {
      const h = n[a + 1];
      s += c, typeof h < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(s, c), d = JSON.stringify(this.cache[c], null, 2);
    M.fs.writeFile(h, d, "utf-8", function(C) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(C);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      M.fs.readFileSync && (t = JSON.parse(M.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = M.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const c = M.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (s = c);
    }
    return s;
  }
  _fileExistsSync(t) {
    return M.exists(t);
  }
}
function On(e, t) {
  M = t;
  const n = new wn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Sn = (e) => On(e, xn), Nn = "require is not supported by ESM", mt = "loading a directory of commands is not supported yet for ESM";
let Fe;
try {
  Fe = tn(import.meta.url);
} catch {
  Fe = process.cwd();
}
const jn = Fe.substring(0, Fe.lastIndexOf("node_modules"));
Jt, en, Zt, jn || process.cwd(), Qt, ke, Xt, Yt, te, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, rt, Sn({
  directory: te(Fe, "../../../locales"),
  updateFiles: !1
});
const re = "\x1B[44m", A = "\x1B[43m", N = "\x1B[41m", Fn = "\x1B[42m", $ = "\x1B[0m", v = "\x1B[33m", _ = "\x1B[36m", y = "\x1B[0m", Rn = {
  "vue-caution": ["implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["topLevelElementOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression",
    "fullWordComponentName"
  ],
  rrd: [
    "cyclomaticComplexity",
    "elseCondition",
    "functionSize",
    "parameterCount",
    "plainScript",
    "scriptLenght",
    "shortVariableName",
    "tooManyProps"
  ]
}, Re = Object.keys(Rn), et = 100, ie = [], Ln = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > et && ie.push({ fileName: t, scriptLength: n.length });
}, Tn = () => (ie.length > 0 && (console.log(
  `
${_}rrd${y} ${N}Long <script> blocks${$} in ${ie.length} files.`
), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${et} lines.${y}`
), ie.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > et * 2 ? N : A}(${e.scriptLength} lines)${$}`
  );
})), ie.length), ce = [], Wn = (e, t) => {
  !e || !e.setup || ce.push(t);
}, In = () => (ce.length > 0 && (console.log(
  `
${_}rrd${y} ${A}Plain <script> blocks${$} in ${ce.length} files.`
), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${y}`), ce.forEach((e) => {
  console.log(`- ${e}`);
})), ce.length), Bn = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return Bn.test(t) ? t : `(?:${t})`;
}
const Pn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Mn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(Pn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => b(`${e}${V(...n)}`), {
      referenceTo: (n) => b(`${e}\\k<${n}>`)
    }),
    or: (...n) => b(`(?:${e}|${V(...n)})`),
    after: (...n) => b(`(?<=${V(...n)})${e}`),
    before: (...n) => b(`${e}(?=${V(...n)})`),
    notAfter: (...n) => b(`(?<!${V(...n)})${e}`),
    notBefore: (...n) => b(`${e}(?!${V(...n)})`),
    times: Object.assign((n) => b(`${X(e)}{${n}}`), {
      any: () => b(`${X(e)}*`),
      atLeast: (n) => b(`${X(e)}{${n},}`),
      atMost: (n) => b(`${X(e)}{0,${n}}`),
      between: (n, s) => b(`${X(e)}{${n},${s}}`)
    }),
    optionally: () => b(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Mn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const zn = /[.*+?^${}()|[\]\\/]/g;
function tt(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function B(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Vn = b(".");
b("\\b\\w+\\b");
const De = b("\\w"), I = b("\\b");
b("\\d");
const Un = b("\\s"), Ne = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), St = b("\\t"), Dn = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function K(...e) {
  return b(`${X(V(...e))}?`);
}
function V(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(zn, "\\$&") : t).join("")
  );
}
function O(...e) {
  return b(`${X(V(...e))}+`);
}
const U = "i", W = "g", S = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(V(...e).toString(), [...t || ""].join(""));
}, le = [], Gn = (e, t) => {
  if (!e)
    return;
  const n = S(I, "else", I, [W, U]), s = e.content.match(n);
  s?.length && le.push({ fileName: t, elseCount: s.length });
}, qn = () => (le.length > 0 && (console.log(
  `
${_}rrd${y} ${A}else conditions${$} are used in ${le.length} files.`
), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${y}`), le.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.elseCount})${$}`);
})), le.length), Zn = 5, Kn = 10, ae = [], Qn = (e, t) => {
  if (!e)
    return;
  const n = S(I, "if", I, [W, U]), s = S(I, "else", I, [W, U]), c = S(I, "for", I, [W, U]), a = S(I, "while", I, [W, U]), h = S(I, "case", I, [W, U]), d = e.content.match(n), C = e.content.match(s), j = e.content.match(c), w = e.content.match(a), G = e.content.match(h), Y = (d?.length || 0) + (C?.length || 0) + (j?.length || 0) + (w?.length || 0) + (G?.length || 0);
  Y > Zn && ae.push({ fileName: t, cyclomaticComplexity: Y });
}, Xn = () => (ae.length > 0 && (console.log(
  `
${_}rrd${y} ${re}cyclomaticComplexity${$} is above moderate in ${ae.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${y}`), ae.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Kn ? N : A}(${e.cyclomaticComplexity})${$}`
  );
})), ae.length), ue = [], Yn = (e) => {
  if (e.includes("pages"))
    return;
  const t = st.basename(e);
  if (t === "App.vue")
    return;
  const n = S(Ne.uppercase);
  t.slice(1).match(n)?.length || ue.push({ filePath: e });
}, Hn = () => (ue.length > 0 && (console.log(
  `
${_}vue-essential${y} ${N}single name component${$} is used in ${ue.length} files.`
), console.log(
  `👉 ${v}Rename the component to use multi-word name.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ue.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ue.length), fe = [], kn = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || fe.push({ filePath: t });
  });
}, Jn = () => (fe.length > 0 && (console.log(
  `
${_}vue-essential${y} ${N}Global style ${$} is used in ${fe.length} files.`
), console.log(
  `👉 ${v}Use <style scoped>.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), fe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), fe.length), he = [], eo = (e, t) => {
  if (!e)
    return;
  const n = S("defineProps([", [W, U]);
  e.content.match(n)?.length && he.push({ filePath: t });
}, to = () => (he.length > 0 && (console.log(
  `
${_}vue-essential${y} ${N}simple prop${$} is used in ${he.length} files.`
), console.log(
  `👉 ${v}Add at least type definition.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), he.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), he.length), pe = [], no = (e, t) => {
  if (!e)
    return;
  const n = S(
    "<",
    O(B(">")),
    " v-if",
    O(B(">")),
    " v-for",
    O(B(">")),
    ">",
    [W, U]
  ), s = S(
    "<",
    O(B(">")),
    " v-for",
    O(B(">")),
    " v-if",
    O(B(">")),
    ">",
    [W, U]
  ), c = e.content.match(n), a = e.content.match(s);
  (c?.length || a?.length) && pe.push({ filePath: t });
}, oo = () => (pe.length > 0 && (console.log(
  `
${_}vue-essential${y} ${N}v-if used with v-for${$} in ${pe.length} files.`
), console.log(
  `👉 ${v}Move out the v-if to a computed property.${y} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), pe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), pe.length), de = [], so = (e, t) => {
  if (!e)
    return;
  const n = S("<", O(B(">")), " v-for", O(B(">")), ">", [
    W,
    U
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || de.push({ filePath: t }));
}, ro = () => (de.length > 0 && (console.log(
  `
${_}vue-essential${y} ${N}v-for has no key${$} in ${de.length} files.`
), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${y} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), de.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), de.length), ge = [], io = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = st.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !s?.length && !a?.length && ge.push({ fileName: e });
}, co = () => (ge.length > 0 && (console.log(
  `
${_}vue-strong${y} ${N}component name is not PascalCase and not kebab-case${$} in ${ge.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ge.forEach((e) => {
  console.log(`- ${N}${e.fileName}${$}`);
})), ge.length), me = [], lo = S(
  O(Ne.lowercase).at.lineStart(),
  O(Ne.uppercase, Ne.lowercase.times.any().grouped()).at.lineEnd()
), ao = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !lo.test(a)).length && me.push({ filePath: t });
}, uo = () => (me.length > 0 && (console.log(
  `
${_}vue-strong${y} ${N}prop names are not camelCased${$} in ${me.length} files.`
), console.log(
  `👉 ${v}Rename the props to camelCase.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), me.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), me.length), Q = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return s + c - 1;
};
function k(e, t) {
  return new Set(e.map((s) => s[t])).size;
}
const $e = [], fo = 40, ho = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > fo) {
      const a = Q(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      $e.push({
        filename: t,
        message: `${t}#${a} ${A}${h}${$}`
      });
    }
  });
}, po = () => {
  if ($e.length > 0) {
    const e = k($e, "filename");
    console.log(
      `
${_}vue-strong${y} ${N}Lengthy template expression${$} found in ${e} files.`
    ), console.log(
      `👉 ${v}Refactor the expression into a computed property.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), $e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return $e.length;
}, ye = [], go = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = S(
    "<",
    O(De),
    K(O(tt(` 	
\r`))),
    O(B("/>")),
    K(O(tt(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), c = n.content.match(s);
  if (c === null)
    return;
  const a = S(":", O(De), K(" "), "=", K(" "), B(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const C = Q(e.source, h);
      ye.push({ message: `${t}#${C} ${A}${d}${$}` });
    }
  });
}, mo = () => (ye.length > 0 && (console.log(
  `
${_}vue-strong${y} ${N}Attribute value is not quoted${$} in ${ye.length} files.`
), console.log(
  `👉 ${v}Use quotes for attribute values.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), ye.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ye.length), be = [], $o = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = S(
    "<",
    O(Ne.uppercase, De),
    K(Dn, St),
    K(O(B(">"))),
    "></",
    O(De),
    ">",
    ["g"]
  ), c = n.content.match(s);
  c !== null && c.forEach((a) => {
    const h = Q(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    be.push({ message: `${t}#${h} ${A}${d}${$}` });
  });
}, yo = () => (be.length > 0 && (console.log(
  `
${_}vue-strong${y} - ${N}Component is not self closing${$} in ${be.length} files.`
), console.log(
  `👉 ${v}Components with no content should be self-closing.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), be.length), Ue = [], nt = [], bo = ["v-slot", "v-bind", "v-on"], Eo = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  bo.forEach((s) => {
    if (n.content.includes(`${s}:`)) {
      const c = Q(e.source, s);
      Ue.push({ message: `${t}:${c} ${A}${s}${$}` }), nt.some((a) => a.filePath === t) || nt.push({ filePath: t });
    }
  });
}, Co = () => (Ue.length > 0 && (console.log(
  `
${_}vue-strong${y} ${N}Directive shorthands not used${$} in ${nt.length} files.`
), console.log(
  `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Ue.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Ue.length), Ee = [], Ao = (e) => {
  const t = S(
    O(B("/")).grouped(),
    V(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], c = S(
      tt("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [W]
    ), a = s.match(c);
    (!a || a.length < 3) && Ee.push({ filename: s, filePath: e });
  }
}, vo = () => {
  if (Ee.length > 0) {
    const e = k(Ee, "filename");
    console.log(`
${_}vue-strong${y} ${N}full-word component names${$} detected in ${e} files.`), console.log(
      `👉 ${v}Component names should prefer full words over abbreviations.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`
    ), Ee.forEach((t) => {
      console.log(`- ${t.filePath} 🚨 ${A}(${t.filename})${$}`);
    });
  }
  return Ee.length;
}, Ce = [], _o = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), c = n.indexOf("<template>"), a = n.indexOf("<style>"), h = [
    { name: "script", index: s },
    { name: "template", index: c },
    { name: "style", index: a }
  ].filter((C) => C.index !== -1);
  h.every((C, j) => j === 0 ? !0 : h[j - 1].index < C.index) || Ce.push({ filename: t });
}, xo = () => (Ce.length > 0 && (console.log(`
${_}vue-recommended${y} ${A}SFC top-level element order${$} detected in ${Ce.length} files.`), console.log(
  `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${y} See: https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order`
), Ce.forEach((e) => {
  console.log(` - ${e.filename} 🚨`);
})), Ce.length), Ae = [], wo = 5, Oo = (e, t) => {
  if (!e)
    return;
  const n = S("defineProps", K("<"), K("("), "{", O(Vn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const c = s[0].split(",").length;
    c > wo && Ae.push({ fileName: t, propsCount: c });
  }
}, So = () => (Ae.length > 0 && (console.log(
  `
${_}rrd${y} ${A}too many props${$} are used in ${Ae.length} files.`
), console.log(`👉 ${v}Try to refactor your code to use less properties.${y}`), Ae.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.propsCount})${$}`);
})), Ae.length), ve = [], Nt = 20, No = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1] || s[5];
    (s[2] || s[6]).split(`
`).length > Nt && ve.push({ filename: t, funcName: c });
  }
}, jo = () => {
  if (ve.length > 0) {
    const e = k(ve, "filename");
    console.log(
      `
${_}rrd${y} ${A}function size${$} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${v}Functions must be shorter than ${Nt} lines${y}`), ve.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.funcName})${$}`);
    });
  }
  return ve.length;
}, _e = [], jt = 3, $t = (e, t, n) => {
  const s = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  s.length > jt && _e.push({ filename: n, funcName: e, paramsCount: s.length });
}, Fo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? $t(s[1], s[2], t) : s[3] && $t(s[3], s[4], t);
}, Ro = () => (_e.length > 0 && (console.log(
  `
${_}rrd${y} ${A}parameter count${$} exceeds recommended limit in ${_e.length} files.`
), console.log(`👉 ${v}Max number of function parameters should be ${jt}${y}`), _e.forEach((e) => {
  console.log(
    `- ${A}${e.funcName}${$} in file ${e.filename} 🚨 ${A}(${e.paramsCount})${$}`
  );
})), _e.length), Ft = 4, xe = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1];
    c.length < Ft && xe.push({ filename: t, variable: c });
  }
}, To = () => {
  if (xe.length > 0) {
    const e = k(xe, "filename");
    console.log(`
${_}rrd${y} ${A}variable names${$} are too short in ${e} files.`), console.log(`👉 ${v}Variable names must have a minimum length of ${Ft}${y}`), xe.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.variable})${$}`);
    });
  }
  return xe.length;
}, ot = [], je = [], Wo = 5, Io = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((c) => {
    if (c.split(`
`).length > Wo) {
      const a = c.split(`
`)[0], h = Q(e.content, a);
      ot.push({ message: `${t}:${h} ${A}computed${$}` }), je.push({ filePath: t }), je.some((d) => d.filePath === t) || je.push({ filePath: t });
    }
  });
}, Bo = () => (je.length > 0 && (console.log(
  `
${_}vue-strong${y} ${N}complicated computed property ${$} in ${je.length} files.`
), console.log(
  `👉 ${v}Refactor the computed properties to smaller ones.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), ot.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ot.length), we = [], Po = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    const a = Q(e.content.trim(), c), h = c.split(`
`).at(0)?.trim() || "";
    we.push({ filename: t, message: `${t}#${a} ${A}(${h})${$}` });
  });
}, Mo = () => {
  if (we.length > 0) {
    const e = k(we, "filename");
    console.log(`
${_}vue-strong${y} ${N}component files${$} detected in ${e} files.`), console.log(
      `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${y} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), we.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return we.length;
}, ee = [], zo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, c = S(V("$parent").or("getCurrentInstance"), [W]), a = e.content.match(n), h = e.content.match(s);
  if (h) {
    const C = h[1].split(".")[0], j = a ? a[1] : "";
    if (j.includes(C)) {
      const w = Q(e.content.trim(), j);
      ee.push({
        filename: t,
        message: `${t}#${w} ${A}(${C})${$}`
      });
    }
  }
  const d = e.content.match(c);
  if (d) {
    const C = Q(e.content.trim(), d[0]);
    ee.push({
      filename: t,
      message: `${t}#${C} ${A}(${d[0]})${$}`
    });
  }
}, Vo = () => {
  if (ee.length > 0) {
    const e = k(
      ee,
      "filename"
    );
    console.log(
      `
${_}vue-caution${y} ${A}implicit parent-child communication${$} detected in ${e} files.`
    ), console.log(
      `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${y} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), ee.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ee.length;
}, Oe = [], yt = 5, Uo = 3, Do = (e, t) => {
  if (!e)
    return;
  const n = S(St.times.atLeast(yt).or(Un.times.atLeast(Uo * yt)), [
    W,
    U
  ]);
  e.content.match(n)?.forEach((c) => {
    const a = Q(e.content, c);
    Oe.push({
      filePath: t,
      message: `${t}#${a} ${A}indentation: ${c.length}${$}`
    });
  });
}, Go = () => {
  if (Oe.length > 0) {
    const e = k(Oe, "filePath");
    console.log(`
${_}rrd${y} ${A}deep indentation${$} found in ${e} files.`), console.log(
      `👉 ${v}Try to refactor your component to child components, to avoid deep indentations..${y}`
    ), Oe.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Oe.length;
}, qo = () => {
  let e = 0;
  return e += Hn(), e += to(), e += ro(), e += oo(), e += Jn(), e += co(), e += yo(), e += uo(), e += po(), e += mo(), e += Co(), e += Bo(), e += Mo(), e += vo(), e += xo(), e += Vo(), e += Xn(), e += Go(), e += qn(), e += jo(), e += Ro(), e += In(), e += Tn(), e += To(), e += So(), e;
}, Zo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  n.includes("vue-essential") && (Yn(t), eo(s, t), kn(e.styles, t), so(e.template, t), no(e.template, t)), n.includes("vue-strong") && (io(t), ao(s, t), Po(s, t), Io(s, t), $o(e, t), ho(e.template, t), go(e, t), Eo(e, t), Ao(t)), n.includes("vue-recommended") && _o(e.source, t), n.includes("vue-caution") && zo(s, t), n.includes("rrd") && (Qn(s, t), Do(s, t), Gn(s, t), No(s, t), Fo(s, t), Wn(e.script, t), Ln(s, t), Lo(s, t), Oo(s, t));
};
let Rt = 0;
const Ko = [
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
], Lt = (e, t) => {
  const n = Je.readdirSync(e);
  Rt += n.length;
  for (const s of n) {
    const c = st.join(e, s);
    Je.statSync(c).isDirectory() ? Ko.some((a) => c.includes(a)) && Lt(c, t) : s.endsWith(".vue") && t(c);
  }
}, Qo = (e, t = []) => {
  console.log(`

${re}Analyzing Vue files in ${e}${$}`), console.log(`Applying ${re}${t}${$} and ignoring ${re}${Re.filter((n) => !t.includes(n))}${$} rulesets`), Lt(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const s = Je.readFileSync(n, "utf-8"), { descriptor: c } = nn(s);
    Zo(c, n, t);
  }), console.log(`Found ${re}${Rt}${$} Vue files`), qo() || console.log(`${Fn}No code smells detected!${$}`);
};
qt(rn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rulesets to ignore",
    type: "string",
    coerce: bt("ignore")
  }).option("apply", {
    describe: "Comma-separated list of rulesets to apply",
    type: "string",
    coerce: bt("apply")
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${N}Cannot use both --ignore and --apply options together.${$}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...Re];
    e.apply && (t = e.apply), e.ignore && (t = Re.filter((n) => !e.ignore.includes(n))), Qo(e.path, t);
  }
).help().argv;
function bt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((c) => !Re.includes(c));
    return s.length > 0 && (console.error(
      `
${N}Invalid ${e} values: ${s.join(
        ", "
      )}${$}. 
${v}Allowed values are: ${[...Re].join(", ")}${y}

`
    ), process.exit(1)), n;
  };
}
