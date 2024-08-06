import kt from "yargs";
import { format as At, inspect as Kt } from "util";
import rt, { normalize as Qt, resolve as te, dirname as Je, basename as Xt, extname as Yt, relative as Ht } from "path";
import et, { readFileSync as it, statSync as vt, readdirSync as Jt, writeFile as en } from "fs";
import { notStrictEqual as tn, strictEqual as nn } from "assert";
import { fileURLToPath as on } from "url";
import { parse as sn } from "@vue/compiler-sfc";
class Ne extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Ne);
  }
}
function xt() {
  return rn() ? 0 : 1;
}
function rn() {
  return cn() && !process.defaultApp;
}
function cn() {
  return !!process.versions.electron;
}
function ln(e) {
  return e.slice(xt() + 1);
}
function an() {
  return process.argv[xt()];
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
    let n = "", o = !1;
    const c = e.match(/^-+/);
    for (let a = c ? c[0].length : 0; a < e.length; a++) {
      let h = e.charAt(a);
      o && (o = !1, h = h.toUpperCase()), a !== 0 && (h === "-" || h === "_") ? o = !0 : h !== "-" && h !== "_" && (n += h);
    }
    return n;
  }
}
function _t(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let o = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? o += `${t}${n.charAt(c)}` : o += h;
  }
  return o;
}
function wt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function un(e) {
  if (Array.isArray(e))
    return e.map((h) => typeof h != "string" ? h + "" : h);
  e = e.trim();
  let t = 0, n = null, o = null, c = null;
  const a = [];
  for (let h = 0; h < e.length; h++) {
    if (n = o, o = e.charAt(h), o === " " && !c) {
      n !== " " && t++;
      continue;
    }
    o === c ? c = null : (o === "'" || o === '"') && !c && (c = o), a[t] || (a[t] = ""), a[t] += o;
  }
  return a;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var U;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(U || (U = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let k;
class fn {
  constructor(t) {
    k = t;
  }
  parse(t, n) {
    const o = Object.assign({
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
    }, n), c = un(t), a = typeof t == "string", h = hn(Object.assign(/* @__PURE__ */ Object.create(null), o.alias)), d = Object.assign({
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
    }, o.configuration), C = Object.assign(/* @__PURE__ */ Object.create(null), o.default), O = o.configObjects || [], _ = o.envPrefix, L = d["populate--"], z = L ? "--" : "_", We = /* @__PURE__ */ Object.create(null), ct = /* @__PURE__ */ Object.create(null), H = o.__ || k.format, u = {
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
    }, q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, qe = new RegExp("^--" + d["negation-prefix"] + "(.+)");
    [].concat(o.array || []).filter(Boolean).forEach(function(s) {
      const i = typeof s == "object" ? s.key : s, f = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      f && (u[f][i] = !0), u.arrays[i] = !0, u.keys.push(i);
    }), [].concat(o.boolean || []).filter(Boolean).forEach(function(s) {
      u.bools[s] = !0, u.keys.push(s);
    }), [].concat(o.string || []).filter(Boolean).forEach(function(s) {
      u.strings[s] = !0, u.keys.push(s);
    }), [].concat(o.number || []).filter(Boolean).forEach(function(s) {
      u.numbers[s] = !0, u.keys.push(s);
    }), [].concat(o.count || []).filter(Boolean).forEach(function(s) {
      u.counts[s] = !0, u.keys.push(s);
    }), [].concat(o.normalize || []).filter(Boolean).forEach(function(s) {
      u.normalize[s] = !0, u.keys.push(s);
    }), typeof o.narg == "object" && Object.entries(o.narg).forEach(([s, i]) => {
      typeof i == "number" && (u.nargs[s] = i, u.keys.push(s));
    }), typeof o.coerce == "object" && Object.entries(o.coerce).forEach(([s, i]) => {
      typeof i == "function" && (u.coercions[s] = i, u.keys.push(s));
    }), typeof o.config < "u" && (Array.isArray(o.config) || typeof o.config == "string" ? [].concat(o.config).filter(Boolean).forEach(function(s) {
      u.configs[s] = !0;
    }) : typeof o.config == "object" && Object.entries(o.config).forEach(([s, i]) => {
      (typeof i == "boolean" || typeof i == "function") && (u.configs[s] = i);
    })), Pt(o.key, h, o.default, u.arrays), Object.keys(C).forEach(function(s) {
      (u.aliases[s] || []).forEach(function(i) {
        C[i] = C[s];
      });
    });
    let P = null;
    Zt();
    let Ie = [];
    const F = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), lt = {};
    for (let s = 0; s < c.length; s++) {
      const i = c[s], f = i.replace(/^-{3,}/, "---");
      let l, r, g, p, m, R;
      if (i !== "--" && /^-/.test(i) && Pe(i))
        Ze(i);
      else if (f.match(/^---+(=|$)/)) {
        Ze(i);
        continue;
      } else if (i.match(/^--.+=/) || !d["short-option-groups"] && i.match(/^-.+=/))
        p = i.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (E(p[1], u.arrays) ? s = Me(s, p[1], c, p[2]) : E(p[1], u.nargs) !== !1 ? s = Be(s, p[1], c, p[2]) : w(p[1], p[2], !0));
      else if (i.match(qe) && d["boolean-negation"])
        p = i.match(qe), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], w(r, E(r, u.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !d["short-option-groups"] && i.match(/^-[^-]+/))
        p = i.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], E(r, u.arrays) ? s = Me(s, r, c) : E(r, u.nargs) !== !1 ? s = Be(s, r, c) : (m = c[s + 1], m !== void 0 && (!m.match(/^-/) || m.match(q)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (w(r, m), s++) : w(r, J(r))));
      else if (i.match(/^-.\..+=/))
        p = i.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && w(p[1], p[2]);
      else if (i.match(/^-.\..+/) && !i.match(q))
        m = c[s + 1], p = i.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], m !== void 0 && !m.match(/^-/) && !E(r, u.bools) && !E(r, u.counts) ? (w(r, m), s++) : w(r, J(r)));
      else if (i.match(/^-[^-]+/) && !i.match(q)) {
        g = i.slice(1, -1).split(""), l = !1;
        for (let T = 0; T < g.length; T++) {
          if (m = i.slice(T + 2), g[T + 1] && g[T + 1] === "=") {
            R = i.slice(T + 3), r = g[T], E(r, u.arrays) ? s = Me(s, r, c, R) : E(r, u.nargs) !== !1 ? s = Be(s, r, c, R) : w(r, R), l = !0;
            break;
          }
          if (m === "-") {
            w(g[T], m);
            continue;
          }
          if (/[A-Za-z]/.test(g[T]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && E(m, u.bools) === !1) {
            w(g[T], m), l = !0;
            break;
          }
          if (g[T + 1] && g[T + 1].match(/\W/)) {
            w(g[T], m), l = !0;
            break;
          } else
            w(g[T], J(g[T]));
        }
        r = i.slice(-1)[0], !l && r !== "-" && (E(r, u.arrays) ? s = Me(s, r, c) : E(r, u.nargs) !== !1 ? s = Be(s, r, c) : (m = c[s + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(q)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (w(r, m), s++) : w(r, J(r))));
      } else if (i.match(/^-[0-9]$/) && i.match(q) && E(i.slice(1), u.bools))
        r = i.slice(1), w(r, J(r));
      else if (i === "--") {
        Ie = c.slice(s + 1);
        break;
      } else if (d["halt-at-non-option"]) {
        Ie = c.slice(s);
        break;
      } else
        Ze(i);
    }
    ut(F, !0), ut(F, !1), It(F), Bt(), ft(F, u.aliases, C, !0), Mt(F), d["set-placeholder-key"] && zt(F), Object.keys(u.counts).forEach(function(s) {
      ne(F, s.split(".")) || w(s, 0);
    }), L && Ie.length && (F[z] = []), Ie.forEach(function(s) {
      F[z].push(s);
    }), d["camel-case-expansion"] && d["strip-dashed"] && Object.keys(F).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete F[s];
    }), d["strip-aliased"] && [].concat(...Object.keys(h).map((s) => h[s])).forEach((s) => {
      d["camel-case-expansion"] && s.includes("-") && delete F[s.split(".").map((i) => se(i)).join(".")], delete F[s];
    });
    function Ze(s) {
      const i = ze("_", s);
      (typeof i == "string" || typeof i == "number") && F._.push(i);
    }
    function Be(s, i, f, l) {
      let r, g = E(i, u.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return Z(l) || (P = Error(H("Argument unexpected for: %s", i))), w(i, J(i)), s;
      let p = Z(l) ? 0 : 1;
      if (d["nargs-eats-options"])
        f.length - (s + 1) + p < g && (P = Error(H("Not enough arguments following: %s", i))), p = g;
      else {
        for (r = s + 1; r < f.length && (!f[r].match(/^-[^0-9]/) || f[r].match(q) || Pe(f[r])); r++)
          p++;
        p < g && (P = Error(H("Not enough arguments following: %s", i)));
      }
      let m = Math.min(p, g);
      for (!Z(l) && m > 0 && (w(i, l), m--), r = s + 1; r < m + s + 1; r++)
        w(i, f[r]);
      return s + m;
    }
    function Me(s, i, f, l) {
      let r = [], g = l || f[s + 1];
      const p = E(i, u.nargs);
      if (E(i, u.bools) && !/^(true|false)$/.test(g))
        r.push(!0);
      else if (Z(g) || Z(l) && /^-/.test(g) && !q.test(g) && !Pe(g)) {
        if (C[i] !== void 0) {
          const m = C[i];
          r = Array.isArray(m) ? m : [m];
        }
      } else {
        Z(l) || r.push(ke(i, l, !0));
        for (let m = s + 1; m < f.length && !(!d["greedy-arrays"] && r.length > 0 || p && typeof p == "number" && r.length >= p || (g = f[m], /^-/.test(g) && !q.test(g) && !Pe(g))); m++)
          s = m, r.push(ke(i, g, a));
      }
      return typeof p == "number" && (p && r.length < p || isNaN(p) && r.length === 0) && (P = Error(H("Not enough arguments following: %s", i))), w(i, r), s;
    }
    function w(s, i, f = a) {
      if (/-/.test(s) && d["camel-case-expansion"]) {
        const g = s.split(".").map(function(p) {
          return se(p);
        }).join(".");
        at(s, g);
      }
      const l = ke(s, i, f), r = s.split(".");
      oe(F, r, l), u.aliases[s] && u.aliases[s].forEach(function(g) {
        const p = g.split(".");
        oe(F, p, l);
      }), r.length > 1 && d["dot-notation"] && (u.aliases[r[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const m = [].concat(r);
        m.shift(), p = p.concat(m), (u.aliases[s] || []).includes(p.join(".")) || oe(F, p, l);
      }), E(s, u.normalize) && !E(s, u.arrays) && [s].concat(u.aliases[s] || []).forEach(function(p) {
        Object.defineProperty(lt, p, {
          enumerable: !0,
          get() {
            return i;
          },
          set(m) {
            i = typeof m == "string" ? k.normalize(m) : m;
          }
        });
      });
    }
    function at(s, i) {
      u.aliases[s] && u.aliases[s].length || (u.aliases[s] = [i], We[i] = !0), u.aliases[i] && u.aliases[i].length || at(i, s);
    }
    function ke(s, i, f) {
      f && (i = pn(i)), (E(s, u.bools) || E(s, u.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(r) {
        return ze(s, r);
      }) : ze(s, i);
      return E(s, u.counts) && (Z(l) || typeof l == "boolean") && (l = Qe()), E(s, u.normalize) && E(s, u.arrays) && (Array.isArray(i) ? l = i.map((r) => k.normalize(r)) : l = k.normalize(i)), l;
    }
    function ze(s, i) {
      return !d["parse-positional-numbers"] && s === "_" || !E(s, u.strings) && !E(s, u.bools) && !Array.isArray(i) && (wt(i) && d["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !Z(i) && E(s, u.numbers)) && (i = Number(i)), i;
    }
    function It(s) {
      const i = /* @__PURE__ */ Object.create(null);
      ft(i, u.aliases, C), Object.keys(u.configs).forEach(function(f) {
        const l = s[f] || i[f];
        if (l)
          try {
            let r = null;
            const g = k.resolve(k.cwd(), l), p = u.configs[f];
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
              r = k.require(g);
            Ke(r);
          } catch (r) {
            r.name === "PermissionDenied" ? P = r : s[f] && (P = Error(H("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ke(s, i) {
      Object.keys(s).forEach(function(f) {
        const l = s[f], r = i ? i + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && d["dot-notation"] ? Ke(l, r) : (!ne(F, r.split(".")) || E(r, u.arrays) && d["combine-arrays"]) && w(r, l);
      });
    }
    function Bt() {
      typeof O < "u" && O.forEach(function(s) {
        Ke(s);
      });
    }
    function ut(s, i) {
      if (typeof _ > "u")
        return;
      const f = typeof _ == "string" ? _ : "", l = k.env();
      Object.keys(l).forEach(function(r) {
        if (f === "" || r.lastIndexOf(f, 0) === 0) {
          const g = r.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), se(p);
          });
          (i && u.configs[g.join(".")] || !i) && !ne(s, g) && w(g.join("."), l[r]);
        }
      });
    }
    function Mt(s) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!f.has(l) && (i = E(l, u.coercions), typeof i == "function"))
          try {
            const r = ze(l, i(s[l]));
            [].concat(u.aliases[l] || [], l).forEach((g) => {
              f.add(g), s[g] = r;
            });
          } catch (r) {
            P = r;
          }
      });
    }
    function zt(s) {
      return u.keys.forEach((i) => {
        ~i.indexOf(".") || typeof s[i] > "u" && (s[i] = void 0);
      }), s;
    }
    function ft(s, i, f, l = !1) {
      Object.keys(f).forEach(function(r) {
        ne(s, r.split(".")) || (oe(s, r.split("."), f[r]), l && (ct[r] = !0), (i[r] || []).forEach(function(g) {
          ne(s, g.split(".")) || oe(s, g.split("."), f[r]);
        }));
      });
    }
    function ne(s, i) {
      let f = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(r) {
        f = f[r] || {};
      });
      const l = i[i.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function oe(s, i, f) {
      let l = s;
      d["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(R) {
        R = pt(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const r = pt(i[i.length - 1]), g = E(i.join("."), u.arrays), p = Array.isArray(f);
      let m = d["duplicate-arguments-array"];
      !m && E(r, u.nargs) && (m = !0, (!Z(l[r]) && u.nargs[r] === 1 || Array.isArray(l[r]) && l[r].length === u.nargs[r]) && (l[r] = void 0)), f === Qe() ? l[r] = Qe(l[r]) : Array.isArray(l[r]) ? m && g && p ? l[r] = d["flatten-duplicate-arrays"] ? l[r].concat(f) : (Array.isArray(l[r][0]) ? l[r] : [l[r]]).concat([f]) : !m && !!g == !!p ? l[r] = f : l[r] = l[r].concat([f]) : l[r] === void 0 && g ? l[r] = p ? f : [f] : m && !(l[r] === void 0 || E(r, u.counts) || E(r, u.bools)) ? l[r] = [l[r], f] : l[r] = f;
    }
    function Pt(...s) {
      s.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && d["camel-case-expansion"]) {
              const r = se(l);
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), We[r] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && d["camel-case-expansion"]) {
              const r = _t(l, "-");
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), We[r] = !0);
            }
          }), u.aliases[f].forEach(function(l) {
            u.aliases[l] = [f].concat(u.aliases[f].filter(function(r) {
              return l !== r;
            }));
          }));
        });
      });
    }
    function E(s, i) {
      const f = [].concat(u.aliases[s] || [], s), l = Object.keys(i), r = f.find((g) => l.includes(g));
      return r ? i[r] : !1;
    }
    function ht(s) {
      const i = Object.keys(u);
      return [].concat(i.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function Vt(s, ...i) {
      return [].concat(...i).some(function(l) {
        const r = s.match(l);
        return r && ht(r[1]);
      });
    }
    function Ut(s) {
      if (s.match(q) || !s.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const l = s.slice(1).split("");
      for (let r = 0; r < l.length; r++) {
        if (f = s.slice(r + 2), !ht(l[r])) {
          i = !1;
          break;
        }
        if (l[r + 1] && l[r + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[r]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[r + 1] && l[r + 1].match(/\W/))
          break;
      }
      return i;
    }
    function Pe(s) {
      return d["unknown-options-as-args"] && Dt(s);
    }
    function Dt(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(q) || Ut(s) ? !1 : !Vt(s, /^-+([^=]+?)=[\s\S]*$/, qe, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function J(s) {
      return !E(s, u.bools) && !E(s, u.counts) && `${s}` in C ? C[s] : Gt(qt(s));
    }
    function Gt(s) {
      return {
        [U.BOOLEAN]: !0,
        [U.STRING]: "",
        [U.NUMBER]: void 0,
        [U.ARRAY]: []
      }[s];
    }
    function qt(s) {
      let i = U.BOOLEAN;
      return E(s, u.strings) ? i = U.STRING : E(s, u.numbers) ? i = U.NUMBER : E(s, u.bools) ? i = U.BOOLEAN : E(s, u.arrays) && (i = U.ARRAY), i;
    }
    function Z(s) {
      return s === void 0;
    }
    function Zt() {
      Object.keys(u.counts).find((s) => E(s, u.arrays) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : E(s, u.nargs) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(lt, F),
      configuration: d,
      defaulted: Object.assign({}, ct),
      error: P,
      newAliases: Object.assign({}, We)
    };
  }
}
function hn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let o = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); o; ) {
    o = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(d) {
          return t[a].indexOf(d) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), o = !0;
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
function pt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function pn(e) {
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
const dt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, gt = (Ye = (Xe = process == null ? void 0 : process.versions) === null || Xe === void 0 ? void 0 : Xe.node) !== null && Ye !== void 0 ? Ye : (He = process == null ? void 0 : process.version) === null || He === void 0 ? void 0 : He.slice(1);
if (gt && Number(gt.match(/^([^.]+)/)[1]) < dt)
  throw Error(`yargs parser supports a minimum Node.js version of ${dt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const dn = process ? process.env : {}, Ot = new fn({
  cwd: process.cwd,
  env: () => dn,
  format: At,
  normalize: Qt,
  resolve: te,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(it(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Te = function(t, n) {
  return Ot.parse(t.slice(), n).argv;
};
Te.detailed = function(e, t) {
  return Ot.parse(e.slice(), t);
};
Te.camelCase = se;
Te.decamelize = _t;
Te.looksLikeNumber = wt;
const gn = {
  right: Cn,
  center: An
}, mn = 0, Ve = 1, $n = 2, Ue = 3;
class bn {
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
    const n = t.map((o) => typeof o == "string" ? this.colFromString(o) : o);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((c) => c.split("	"));
    let o = 0;
    return n.forEach((c) => {
      c.length > 1 && W.stringWidth(c[0]) > o && (o = Math.min(Math.floor(this.width * 0.5), W.stringWidth(c[0])));
    }), n.forEach((c) => {
      this.div(...c.map((a, h) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: h === 0 && c.length > 1 ? o : void 0
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
    const n = W.stripAnsi(t);
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
    return this.rasterize(t).forEach((o, c) => {
      let a = "";
      o.forEach((h, d) => {
        const { width: C } = t[d], O = this.negatePadding(t[d]);
        let _ = h;
        if (O > W.stringWidth(h) && (_ += " ".repeat(O - W.stringWidth(h))), t[d].align && t[d].align !== "left" && this.wrap) {
          const z = gn[t[d].align];
          _ = z(_, O), W.stringWidth(_) < O && (_ += " ".repeat((C || 0) - W.stringWidth(_) - 1));
        }
        const L = t[d].padding || [0, 0, 0, 0];
        L[Ue] && (a += " ".repeat(L[Ue])), a += mt(t[d], _, "| "), a += _, a += mt(t[d], _, " |"), L[Ve] && (a += " ".repeat(L[Ve])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const o = t.match(/^ */), c = o ? o[0].length : 0, a = n.text, h = W.stringWidth(a.trimRight());
    return n.span ? this.wrap ? c < h ? t : (n.hidden = !0, a.trimRight() + " ".repeat(c - h) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], o = this.columnWidths(t);
    let c;
    return t.forEach((a, h) => {
      a.width = o[h], this.wrap ? c = W.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : c = a.text.split(`
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[mn] || 0).fill("")), c.push(...new Array(a.padding[$n] || 0).fill(""))), c.forEach((d, C) => {
        n[C] || n.push([]);
        const O = n[C];
        for (let _ = 0; _ < h; _++)
          O[_] === void 0 && O.push("");
        O.push(d);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Ue] || 0) + (t.padding[Ve] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || W.stringWidth(h.text));
    let n = t.length, o = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, o -= h.width, h.width;
    }), a = n ? Math.floor(o / n) : 0;
    return c.map((h, d) => h === void 0 ? Math.max(a, yn(t[d])) : h);
  }
}
function mt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function yn(e) {
  const t = e.padding || [], n = 1 + (t[Ue] || 0) + (t[Ve] || 0);
  return e.border ? n + 4 : n;
}
function En() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Cn(e, t) {
  e = e.trim();
  const n = W.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function An(e, t) {
  e = e.trim();
  const n = W.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let W;
function vn(e, t) {
  return W = t, new bn({
    width: e?.width || En(),
    wrap: e?.wrap
  });
}
const St = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Nt(e) {
  return e.replace(St, "");
}
function xn(e, t) {
  const [n, o] = e.match(St) || ["", ""];
  e = Nt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && o && (c = `${n}${c}${o}`), c;
}
function _n(e) {
  return vn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Nt,
    wrap: xn
  });
}
function wn(e, t) {
  let n = te(".", e), o;
  for (vt(n).isDirectory() || (n = Je(n)); ; ) {
    if (o = t(n, Jt(n)), o)
      return te(n, o);
    if (n = Je(o = n), o === n)
      break;
  }
}
const On = {
  fs: {
    readFileSync: it,
    writeFile: en
  },
  format: At,
  resolve: te,
  exists: (e) => {
    try {
      return vt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let V;
class Sn {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let o = function() {
    };
    return typeof t[t.length - 1] == "function" && (o = t.pop()), o = o || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o(), V.format.apply(V.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), o = t.shift(), c = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let h = c === 1 ? n : o;
    this.cache[this.locale][n] && (h = this.cache[this.locale][n][c === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: o
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const d = [h];
    return ~h.indexOf("%d") && d.push(c), V.format.apply(V.format, d.concat(t));
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
    let o = "";
    return t.forEach(function(c, a) {
      const h = n[a + 1];
      o += c, typeof h < "u" && (o += "%s");
    }), this.__.apply(this, [o].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], o = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(o, c), d = JSON.stringify(this.cache[c], null, 2);
    V.fs.writeFile(h, d, "utf-8", function(C) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(C);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      V.fs.readFileSync && (t = JSON.parse(V.fs.readFileSync(n, "utf-8")));
    } catch (o) {
      if (o instanceof SyntaxError && (o.message = "syntax error in " + n), o.code === "ENOENT")
        t = {};
      else
        throw o;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let o = V.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(o) && ~n.lastIndexOf("_")) {
      const c = V.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (o = c);
    }
    return o;
  }
  _fileExistsSync(t) {
    return V.exists(t);
  }
}
function Nn(e, t) {
  V = t;
  const n = new Sn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const jn = (e) => Nn(e, On), Fn = "require is not supported by ESM", $t = "loading a directory of commands is not supported yet for ESM";
let Re;
try {
  Re = on(import.meta.url);
} catch {
  Re = process.cwd();
}
const Rn = Re.substring(0, Re.lastIndexOf("node_modules"));
tn, nn, Kt, Rn || process.cwd(), Xt, Je, Yt, Ht, te, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, it, jn({
  directory: te(Re, "../../../locales"),
  updateFiles: !1
});
const re = "\x1B[44m", A = "\x1B[43m", S = "\x1B[41m", Ln = "\x1B[42m", $ = "\x1B[0m", v = "\x1B[33m", x = "\x1B[36m", b = "\x1B[0m", Tn = {
  "vue-caution": ["implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["topLevelElementOrder", "elementAttributeOrder"],
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
}, Le = Object.keys(Tn), tt = 100, ie = [], Wn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > tt && ie.push({ fileName: t, scriptLength: n.length });
}, In = () => (ie.length > 0 && (console.log(
  `
${x}rrd${b} ${S}Long <script> blocks${$} in ${ie.length} files.`
), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${tt} lines.${b}`
), ie.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > tt * 2 ? S : A}(${e.scriptLength} lines)${$}`
  );
})), ie.length), ce = [], Bn = (e, t) => {
  !e || !e.setup || ce.push(t);
}, Mn = () => (ce.length > 0 && (console.log(
  `
${x}rrd${b} ${A}Plain <script> blocks${$} in ${ce.length} files.`
), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${b}`), ce.forEach((e) => {
  console.log(`- ${e}`);
})), ce.length), zn = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return zn.test(t) ? t : `(?:${t})`;
}
const Pn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Vn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function y(e) {
  const t = (n) => y(`(?<${n}>${`${e}`.replace(Pn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => y(`${e}${D(...n)}`), {
      referenceTo: (n) => y(`${e}\\k<${n}>`)
    }),
    or: (...n) => y(`(?:${e}|${D(...n)})`),
    after: (...n) => y(`(?<=${D(...n)})${e}`),
    before: (...n) => y(`${e}(?=${D(...n)})`),
    notAfter: (...n) => y(`(?<!${D(...n)})${e}`),
    notBefore: (...n) => y(`${e}(?!${D(...n)})`),
    times: Object.assign((n) => y(`${X(e)}{${n}}`), {
      any: () => y(`${X(e)}*`),
      atLeast: (n) => y(`${X(e)}{${n},}`),
      atMost: (n) => y(`${X(e)}{0,${n}}`),
      between: (n, o) => y(`${X(e)}{${n},${o}}`)
    }),
    optionally: () => y(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => y(`${e}`.replace(Vn, "($1$3)$2")),
    at: {
      lineStart: () => y(`^${e}`),
      lineEnd: () => y(`${e}$`)
    }
  };
}
const Un = /[.*+?^${}()|[\]\\/]/g;
function nt(e) {
  return y(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return y(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Dn = y(".");
y("\\b\\w+\\b");
const Ge = y("\\w"), B = y("\\b");
y("\\d");
const Gn = y("\\s"), je = Object.assign(y("[a-zA-Z]"), {
  lowercase: y("[a-z]"),
  uppercase: y("[A-Z]")
}), jt = y("\\t"), qn = y("\\n");
y("\\r");
y("\\W+"), y("\\W"), y("\\B"), y("\\D"), y("\\S"), Object.assign(y("[^a-zA-Z]"), {
  lowercase: y("[^a-z]"),
  uppercase: y("[^A-Z]")
}), y("[^\\t]"), y("[^\\n]"), y("[^\\r]");
function K(...e) {
  return y(`${X(D(...e))}?`);
}
function D(...e) {
  return y(
    e.map((t) => typeof t == "string" ? t.replace(Un, "\\$&") : t).join("")
  );
}
function N(...e) {
  return y(`${X(D(...e))}+`);
}
const G = "i", I = "g", j = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(D(...e).toString(), [...t || ""].join(""));
}, le = [], Zn = (e, t) => {
  if (!e)
    return;
  const n = j(B, "else", B, [I, G]), o = e.content.match(n);
  o?.length && le.push({ fileName: t, elseCount: o.length });
}, kn = () => (le.length > 0 && (console.log(
  `
${x}rrd${b} ${A}else conditions${$} are used in ${le.length} files.`
), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${b}`), le.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.elseCount})${$}`);
})), le.length), Kn = 5, Qn = 10, ae = [], Xn = (e, t) => {
  if (!e)
    return;
  const n = j(B, "if", B, [I, G]), o = j(B, "else", B, [I, G]), c = j(B, "for", B, [I, G]), a = j(B, "while", B, [I, G]), h = j(B, "case", B, [I, G]), d = e.content.match(n), C = e.content.match(o), O = e.content.match(c), _ = e.content.match(a), L = e.content.match(h), z = (d?.length || 0) + (C?.length || 0) + (O?.length || 0) + (_?.length || 0) + (L?.length || 0);
  z > Kn && ae.push({ fileName: t, cyclomaticComplexity: z });
}, Yn = () => (ae.length > 0 && (console.log(
  `
${x}rrd${b} ${re}cyclomaticComplexity${$} is above moderate in ${ae.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${b}`), ae.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Qn ? S : A}(${e.cyclomaticComplexity})${$}`
  );
})), ae.length), ue = [], Hn = (e) => {
  if (e.includes("pages"))
    return;
  const t = rt.basename(e);
  if (t === "App.vue")
    return;
  const n = j(je.uppercase);
  t.slice(1).match(n)?.length || ue.push({ filePath: e });
}, Jn = () => (ue.length > 0 && (console.log(
  `
${x}vue-essential${b} ${S}single name component${$} is used in ${ue.length} files.`
), console.log(
  `👉 ${v}Rename the component to use multi-word name.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ue.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ue.length), fe = [], eo = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || fe.push({ filePath: t });
  });
}, to = () => (fe.length > 0 && (console.log(
  `
${x}vue-essential${b} ${S}Global style ${$} is used in ${fe.length} files.`
), console.log(
  `👉 ${v}Use <style scoped>.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), fe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), fe.length), he = [], no = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps([", [I, G]);
  e.content.match(n)?.length && he.push({ filePath: t });
}, oo = () => (he.length > 0 && (console.log(
  `
${x}vue-essential${b} ${S}simple prop${$} is used in ${he.length} files.`
), console.log(
  `👉 ${v}Add at least type definition.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), he.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), he.length), pe = [], so = (e, t) => {
  if (!e)
    return;
  const n = j(
    "<",
    N(M(">")),
    " v-if",
    N(M(">")),
    " v-for",
    N(M(">")),
    ">",
    [I, G]
  ), o = j(
    "<",
    N(M(">")),
    " v-for",
    N(M(">")),
    " v-if",
    N(M(">")),
    ">",
    [I, G]
  ), c = e.content.match(n), a = e.content.match(o);
  (c?.length || a?.length) && pe.push({ filePath: t });
}, ro = () => (pe.length > 0 && (console.log(
  `
${x}vue-essential${b} ${S}v-if used with v-for${$} in ${pe.length} files.`
), console.log(
  `👉 ${v}Move out the v-if to a computed property.${b} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), pe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), pe.length), de = [], io = (e, t) => {
  if (!e)
    return;
  const n = j("<", N(M(">")), " v-for", N(M(">")), ">", [
    I,
    G
  ]), o = e.content.match(n);
  o?.length && (o.some((a) => a.includes(":key")) || de.push({ filePath: t }));
}, co = () => (de.length > 0 && (console.log(
  `
${x}vue-essential${b} ${S}v-for has no key${$} in ${de.length} files.`
), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), de.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), de.length), ge = [], lo = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = rt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, o = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !o?.length && !a?.length && ge.push({ fileName: e });
}, ao = () => (ge.length > 0 && (console.log(
  `
${x}vue-strong${b} ${S}component name is not PascalCase and not kebab-case${$} in ${ge.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ge.forEach((e) => {
  console.log(`- ${S}${e.fileName}${$}`);
})), ge.length), me = [], uo = j(
  N(je.lowercase).at.lineStart(),
  N(je.uppercase, je.lowercase.times.any().grouped()).at.lineEnd()
), fo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !uo.test(a)).length && me.push({ filePath: t });
}, ho = () => (me.length > 0 && (console.log(
  `
${x}vue-strong${b} ${S}prop names are not camelCased${$} in ${me.length} files.`
), console.log(
  `👉 ${v}Rename the props to camelCase.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), me.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), me.length), Q = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h) => h.includes(t)) + 1;
  const n = e.indexOf(t), o = e.slice(0, n).split(`
`).length, c = t.split(`
`).length;
  return o + c - 1;
};
function Y(e, t) {
  return new Set(e.map((o) => o[t])).size;
}
const $e = [], po = 40, go = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > po) {
      const a = Q(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      $e.push({
        filename: t,
        message: `${t}#${a} ${A}${h}${$}`
      });
    }
  });
}, mo = () => {
  if ($e.length > 0) {
    const e = Y($e, "filename");
    console.log(
      `
${x}vue-strong${b} ${S}Lengthy template expression${$} found in ${e} files.`
    ), console.log(
      `👉 ${v}Refactor the expression into a computed property.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), $e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return $e.length;
}, be = [], $o = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = j(
    "<",
    N(Ge),
    K(N(nt(` 	
\r`))),
    N(M("/>")),
    K(N(nt(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), c = n.content.match(o);
  if (c === null)
    return;
  const a = j(":", N(Ge), K(" "), "=", K(" "), M(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const d = h.match(a);
    if (d?.length) {
      const C = Q(e.source, h);
      be.push({ message: `${t}#${C} ${A}${d}${$}` });
    }
  });
}, bo = () => (be.length > 0 && (console.log(
  `
${x}vue-strong${b} ${S}Attribute value is not quoted${$} in ${be.length} files.`
), console.log(
  `👉 ${v}Use quotes for attribute values.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), be.length), ye = [], yo = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = j(
    "<",
    N(je.uppercase, Ge),
    K(qn, jt),
    K(N(M(">"))),
    "></",
    N(Ge),
    ">",
    ["g"]
  ), c = n.content.match(o);
  c !== null && c.forEach((a) => {
    const h = Q(e.source, a), d = a.split(`
`).at(-1)?.trim() || "";
    ye.push({ message: `${t}#${h} ${A}${d}${$}` });
  });
}, Eo = () => (ye.length > 0 && (console.log(
  `
${x}vue-strong${b} - ${S}Component is not self closing${$} in ${ye.length} files.`
), console.log(
  `👉 ${v}Components with no content should be self-closing.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), ye.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), ye.length), De = [], ot = [], Co = ["v-slot", "v-bind", "v-on"], Ao = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Co.forEach((o) => {
    if (n.content.includes(`${o}:`)) {
      const c = Q(e.source, o);
      De.push({ message: `${t}:${c} ${A}${o}${$}` }), ot.some((a) => a.filePath === t) || ot.push({ filePath: t });
    }
  });
}, vo = () => (De.length > 0 && (console.log(
  `
${x}vue-strong${b} ${S}Directive shorthands not used${$} in ${ot.length} files.`
), console.log(
  `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), De.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), De.length), Ee = [], xo = 3, _o = (e) => {
  const t = j(
    N(M("/")).grouped(),
    D(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const o = n[0]?.split(".vue")[0], c = j(
      nt("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [I]
    ), a = o.match(c);
    (!a || a.length < xo) && Ee.push({ filename: o, filePath: e });
  }
}, wo = () => {
  if (Ee.length > 0) {
    const e = Y(Ee, "filename");
    console.log(`
${x}vue-strong${b} ${S}full-word component names${$} detected in ${e} files.`), console.log(
      `👉 ${v}Component names should prefer full words over abbreviations.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`
    ), Ee.forEach((t) => {
      console.log(`- ${t.filePath} 🚨 ${A}(${t.filename})${$}`);
    });
  }
  return Ee.length;
}, Ce = [], Oo = (e, t) => {
  const n = e.toString(), o = n.indexOf("<script setup>"), c = n.indexOf("<template>"), a = n.indexOf("<style>"), h = [
    { name: "script", index: o },
    { name: "template", index: c },
    { name: "style", index: a }
  ].filter((C) => C.index !== -1);
  h.every((C, O) => O === 0 ? !0 : h[O - 1].index < C.index) || Ce.push({ filename: t });
}, So = () => (Ce.length > 0 && (console.log(`
${x}vue-recommended${b} ${A}SFC top-level element order${$} detected in ${Ce.length} files.`), console.log(
  `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${b} See: https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order`
), Ce.forEach((e) => {
  console.log(` - ${e.filename} 🚨`);
})), Ce.length), Ae = [], bt = [
  "is",
  "v-for",
  "v-if",
  "v-else-if",
  "v-else",
  "v-show",
  "v-cloak",
  "v-pre",
  "v-once",
  "id",
  "ref",
  "key",
  "v-model",
  "v-on",
  "v-html",
  "v-text"
], No = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), o = /<(\w+)(\s[^>]+)?>/g, c = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = o.exec(n)) !== null; ) {
    const h = a[1], d = a[2];
    if (d) {
      const O = Array.from(d.matchAll(c), (L) => L[1]).filter((L) => bt.includes(L));
      let _ = -1;
      for (const L of O) {
        const z = bt.indexOf(L);
        if (z !== -1 && z < _) {
          Ae.push({
            filename: t,
            message: `${t} tag has attributes out of order ${A}(${h})${$}`
          });
          break;
        }
        _ = z;
      }
    }
  }
}, jo = () => {
  if (Ae.length > 0) {
    const e = Y(Ae, "filename");
    console.log(`
${x}vue-recommended${b} ${S}element attribute order ${$} detected in ${e} files.`), console.log(
      `👉 ${v}The attributes of elements (including components) should be ordered consistently.${b} See: https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order`
    ), Ae.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Ae.length;
}, ve = [], Fo = 5, Ro = (e, t) => {
  if (!e)
    return;
  const n = j("defineProps", K("<"), K("("), "{", N(Dn), "}", ["g", "s"]), o = e.content.match(n);
  if (o?.length) {
    const c = o[0].split(",").length;
    c > Fo && ve.push({ fileName: t, propsCount: c });
  }
}, Lo = () => (ve.length > 0 && (console.log(
  `
${x}rrd${b} ${A}too many props${$} are used in ${ve.length} files.`
), console.log(`👉 ${v}Try to refactor your code to use less properties.${b}`), ve.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.propsCount})${$}`);
})), ve.length), xe = [], Ft = 20, To = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const c = o[1] || o[5];
    (o[2] || o[6]).split(`
`).length > Ft && xe.push({ filename: t, funcName: c });
  }
}, Wo = () => {
  if (xe.length > 0) {
    const e = Y(xe, "filename");
    console.log(
      `
${x}rrd${b} ${A}function size${$} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${v}Functions must be shorter than ${Ft} lines${b}`), xe.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.funcName})${$}`);
    });
  }
  return xe.length;
}, _e = [], Rt = 3, yt = (e, t, n) => {
  const o = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  o.length > Rt && _e.push({ filename: n, funcName: e, paramsCount: o.length });
}, Io = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1] ? yt(o[1], o[2], t) : o[3] && yt(o[3], o[4], t);
}, Bo = () => (_e.length > 0 && (console.log(
  `
${x}rrd${b} ${A}parameter count${$} exceeds recommended limit in ${_e.length} files.`
), console.log(`👉 ${v}Max number of function parameters should be ${Rt}${b}`), _e.forEach((e) => {
  console.log(
    `- ${A}${e.funcName}${$} in file ${e.filename} 🚨 ${A}(${e.paramsCount})${$}`
  );
})), _e.length), Lt = 4, we = [], Mo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const c = o[1];
    c.length < Lt && we.push({ filename: t, variable: c });
  }
}, zo = () => {
  if (we.length > 0) {
    const e = Y(we, "filename");
    console.log(`
${x}rrd${b} ${A}variable names${$} are too short in ${e} files.`), console.log(`👉 ${v}Variable names must have a minimum length of ${Lt}${b}`), we.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.variable})${$}`);
    });
  }
  return we.length;
}, st = [], Fe = [], Po = 5, Vo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, o = e.content.match(n);
  o?.length && o.forEach((c) => {
    if (c.split(`
`).length > Po) {
      const a = c.split(`
`)[0], h = Q(e.content, a);
      st.push({ message: `${t}:${h} ${A}computed${$}` }), Fe.push({ filePath: t }), Fe.some((d) => d.filePath === t) || Fe.push({ filePath: t });
    }
  });
}, Uo = () => (Fe.length > 0 && (console.log(
  `
${x}vue-strong${b} ${S}complicated computed property ${$} in ${Fe.length} files.`
), console.log(
  `👉 ${v}Refactor the computed properties to smaller ones.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), st.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), st.length), Oe = [], Do = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    const a = Q(e.content.trim(), c), h = c.split(`
`).at(0)?.trim() || "";
    Oe.push({ filename: t, message: `${t}#${a} ${A}(${h})${$}` });
  });
}, Go = () => {
  if (Oe.length > 0) {
    const e = Y(Oe, "filename");
    console.log(`
${x}vue-strong${b} ${S}component files${$} detected in ${e} files.`), console.log(
      `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), Oe.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Oe.length;
}, ee = [], qo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, o = /v-model\s*=\s*"([^"]+)"/, c = j(D("$parent").or("getCurrentInstance"), [I]), a = e.content.match(n), h = e.content.match(o);
  if (h) {
    const C = h[1].split(".")[0], O = a ? a[1] : "";
    if (O.includes(C)) {
      const _ = Q(e.content.trim(), O);
      ee.push({
        filename: t,
        message: `${t}#${_} ${A}(${C})${$}`
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
}, Zo = () => {
  if (ee.length > 0) {
    const e = Y(
      ee,
      "filename"
    );
    console.log(
      `
${x}vue-caution${b} ${A}implicit parent-child communication${$} detected in ${e} files.`
    ), console.log(
      `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${b} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), ee.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ee.length;
}, Se = [], Et = 5, ko = 3, Ko = (e, t) => {
  if (!e)
    return;
  const n = j(jt.times.atLeast(Et).or(Gn.times.atLeast(ko * Et)), [
    I,
    G
  ]);
  e.content.match(n)?.forEach((c) => {
    const a = Q(e.content, c);
    Se.push({
      filePath: t,
      message: `${t}#${a} ${A}indentation: ${c.length}${$}`
    });
  });
}, Qo = () => {
  if (Se.length > 0) {
    const e = Y(Se, "filePath");
    console.log(`
${x}rrd${b} ${A}deep indentation${$} found in ${e} files.`), console.log(
      `👉 ${v}Try to refactor your component to child components, to avoid deep indentations..${b}`
    ), Se.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return Se.length;
}, Xo = () => {
  let e = 0;
  return e += Jn(), e += oo(), e += co(), e += ro(), e += to(), e += ao(), e += Eo(), e += ho(), e += mo(), e += bo(), e += vo(), e += Uo(), e += Go(), e += wo(), e += So(), e += jo(), e += Zo(), e += Yn(), e += Qo(), e += kn(), e += Wo(), e += Bo(), e += Mn(), e += In(), e += zo(), e += Lo(), e;
}, Yo = (e, t, n) => {
  const o = e.scriptSetup || e.script;
  n.includes("vue-essential") && (Hn(t), no(o, t), eo(e.styles, t), io(e.template, t), so(e.template, t)), n.includes("vue-strong") && (lo(t), fo(o, t), Do(o, t), Vo(o, t), yo(e, t), go(e.template, t), $o(e, t), Ao(e, t), _o(t)), n.includes("vue-recommended") && (Oo(e.source, t), No(e.template, t)), n.includes("vue-caution") && qo(o, t), n.includes("rrd") && (Xn(o, t), Ko(o, t), Zn(o, t), To(o, t), Io(o, t), Bn(e.script, t), Wn(o, t), Mo(o, t), Ro(o, t));
};
let Tt = 0;
const Ho = [
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
], Wt = (e, t) => {
  const n = et.readdirSync(e);
  Tt += n.length;
  for (const o of n) {
    const c = rt.join(e, o);
    et.statSync(c).isDirectory() ? Ho.some((a) => c.includes(a)) && Wt(c, t) : o.endsWith(".vue") && t(c);
  }
}, Jo = (e, t = []) => {
  console.log(`

${re}Analyzing Vue files in ${e}${$}`);
  const n = Le.filter((o) => !t.includes(o));
  console.log(`Applying ${t.length} rules ${re}${t}${$} and ignoring ${n.length} rules ${re}${n}${$} rulesets`), Wt(e, (o) => {
    if (o.includes("App.vue") || o.includes("app.vue"))
      return;
    const c = et.readFileSync(o, "utf-8"), { descriptor: a } = sn(c);
    Yo(a, o, t);
  }), console.log(`Found ${re}${Tt}${$} Vue files`), Xo() || console.log(`${Ln}No code smells detected!${$}`);
};
kt(ln(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rulesets to ignore",
    type: "string",
    coerce: Ct("ignore")
  }).option("apply", {
    describe: "Comma-separated list of rulesets to apply",
    type: "string",
    coerce: Ct("apply")
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${S}Cannot use both --ignore and --apply options together.${$}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...Le];
    e.apply && (t = e.apply), e.ignore && (t = Le.filter((n) => !e.ignore.includes(n))), Jo(e.path, t);
  }
).help().argv;
function Ct(e) {
  return (t) => {
    const n = t.split(","), o = n.filter((c) => !Le.includes(c));
    return o.length > 0 && (console.error(
      `
${S}Invalid ${e} values: ${o.join(
        ", "
      )}${$}. 
${v}Allowed values are: ${[...Le].join(", ")}${b}

`
    ), process.exit(1)), n;
  };
}
