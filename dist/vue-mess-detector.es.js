import Dt from "yargs";
import { format as bt, inspect as Gt } from "util";
import nt, { normalize as qt, resolve as te, dirname as Xe, basename as Zt, extname as Kt, relative as Qt } from "path";
import Ye, { readFileSync as ot, statSync as yt, readdirSync as Xt, writeFile as Yt } from "fs";
import { notStrictEqual as Ht, strictEqual as kt } from "assert";
import { fileURLToPath as Jt } from "url";
import { parse as en } from "@vue/compiler-sfc";
class xe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, xe);
  }
}
function Et() {
  return tn() ? 0 : 1;
}
function tn() {
  return nn() && !process.defaultApp;
}
function nn() {
  return !!process.versions.electron;
}
function on(e) {
  return e.slice(Et() + 1);
}
function sn() {
  return process.argv[Et()];
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
function Ct(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let c = 0; c < e.length; c++) {
    const a = n.charAt(c), h = e.charAt(c);
    a !== h && c > 0 ? s += `${t}${n.charAt(c)}` : s += h;
  }
  return s;
}
function At(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function rn(e) {
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
class cn {
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
    }, n), c = rn(t), a = typeof t == "string", h = ln(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), g = Object.assign({
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
    }, s.configuration), C = Object.assign(/* @__PURE__ */ Object.create(null), s.default), R = s.configObjects || [], x = s.envPrefix, G = g["populate--"], Y = G ? "--" : "_", Fe = /* @__PURE__ */ Object.create(null), st = /* @__PURE__ */ Object.create(null), H = s.__ || Z.format, u = {
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
    }, D = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ve = new RegExp("^--" + g["negation-prefix"] + "(.+)");
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
    })), It(s.key, h, s.default, u.arrays), Object.keys(C).forEach(function(o) {
      (u.aliases[o] || []).forEach(function(i) {
        C[i] = C[o];
      });
    });
    let P = null;
    Ut();
    let Re = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), rt = {};
    for (let o = 0; o < c.length; o++) {
      const i = c[o], f = i.replace(/^-{3,}/, "---");
      let l, r, d, p, m, F;
      if (i !== "--" && /^-/.test(i) && Ie(i))
        Ue(i);
      else if (f.match(/^---+(=|$)/)) {
        Ue(i);
        continue;
      } else if (i.match(/^--.+=/) || !g["short-option-groups"] && i.match(/^-.+=/))
        p = i.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (E(p[1], u.arrays) ? o = Te(o, p[1], c, p[2]) : E(p[1], u.nargs) !== !1 ? o = Le(o, p[1], c, p[2]) : v(p[1], p[2], !0));
      else if (i.match(Ve) && g["boolean-negation"])
        p = i.match(Ve), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], v(r, E(r, u.arrays) ? [!1] : !1));
      else if (i.match(/^--.+/) || !g["short-option-groups"] && i.match(/^-[^-]+/))
        p = i.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], E(r, u.arrays) ? o = Te(o, r, c) : E(r, u.nargs) !== !1 ? o = Le(o, r, c) : (m = c[o + 1], m !== void 0 && (!m.match(/^-/) || m.match(D)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (v(r, m), o++) : v(r, J(r))));
      else if (i.match(/^-.\..+=/))
        p = i.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && v(p[1], p[2]);
      else if (i.match(/^-.\..+/) && !i.match(D))
        m = c[o + 1], p = i.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (r = p[1], m !== void 0 && !m.match(/^-/) && !E(r, u.bools) && !E(r, u.counts) ? (v(r, m), o++) : v(r, J(r)));
      else if (i.match(/^-[^-]+/) && !i.match(D)) {
        d = i.slice(1, -1).split(""), l = !1;
        for (let L = 0; L < d.length; L++) {
          if (m = i.slice(L + 2), d[L + 1] && d[L + 1] === "=") {
            F = i.slice(L + 3), r = d[L], E(r, u.arrays) ? o = Te(o, r, c, F) : E(r, u.nargs) !== !1 ? o = Le(o, r, c, F) : v(r, F), l = !0;
            break;
          }
          if (m === "-") {
            v(d[L], m);
            continue;
          }
          if (/[A-Za-z]/.test(d[L]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && E(m, u.bools) === !1) {
            v(d[L], m), l = !0;
            break;
          }
          if (d[L + 1] && d[L + 1].match(/\W/)) {
            v(d[L], m), l = !0;
            break;
          } else
            v(d[L], J(d[L]));
        }
        r = i.slice(-1)[0], !l && r !== "-" && (E(r, u.arrays) ? o = Te(o, r, c) : E(r, u.nargs) !== !1 ? o = Le(o, r, c) : (m = c[o + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(D)) && !E(r, u.bools) && !E(r, u.counts) || /^(true|false)$/.test(m) ? (v(r, m), o++) : v(r, J(r))));
      } else if (i.match(/^-[0-9]$/) && i.match(D) && E(i.slice(1), u.bools))
        r = i.slice(1), v(r, J(r));
      else if (i === "--") {
        Re = c.slice(o + 1);
        break;
      } else if (g["halt-at-non-option"]) {
        Re = c.slice(o);
        break;
      } else
        Ue(i);
    }
    ct(O, !0), ct(O, !1), Rt(O), Lt(), lt(O, u.aliases, C, !0), Tt(O), g["set-placeholder-key"] && Wt(O), Object.keys(u.counts).forEach(function(o) {
      ne(O, o.split(".")) || v(o, 0);
    }), G && Re.length && (O[Y] = []), Re.forEach(function(o) {
      O[Y].push(o);
    }), g["camel-case-expansion"] && g["strip-dashed"] && Object.keys(O).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete O[o];
    }), g["strip-aliased"] && [].concat(...Object.keys(h).map((o) => h[o])).forEach((o) => {
      g["camel-case-expansion"] && o.includes("-") && delete O[o.split(".").map((i) => se(i)).join(".")], delete O[o];
    });
    function Ue(o) {
      const i = We("_", o);
      (typeof i == "string" || typeof i == "number") && O._.push(i);
    }
    function Le(o, i, f, l) {
      let r, d = E(i, u.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return q(l) || (P = Error(H("Argument unexpected for: %s", i))), v(i, J(i)), o;
      let p = q(l) ? 0 : 1;
      if (g["nargs-eats-options"])
        f.length - (o + 1) + p < d && (P = Error(H("Not enough arguments following: %s", i))), p = d;
      else {
        for (r = o + 1; r < f.length && (!f[r].match(/^-[^0-9]/) || f[r].match(D) || Ie(f[r])); r++)
          p++;
        p < d && (P = Error(H("Not enough arguments following: %s", i)));
      }
      let m = Math.min(p, d);
      for (!q(l) && m > 0 && (v(i, l), m--), r = o + 1; r < m + o + 1; r++)
        v(i, f[r]);
      return o + m;
    }
    function Te(o, i, f, l) {
      let r = [], d = l || f[o + 1];
      const p = E(i, u.nargs);
      if (E(i, u.bools) && !/^(true|false)$/.test(d))
        r.push(!0);
      else if (q(d) || q(l) && /^-/.test(d) && !D.test(d) && !Ie(d)) {
        if (C[i] !== void 0) {
          const m = C[i];
          r = Array.isArray(m) ? m : [m];
        }
      } else {
        q(l) || r.push(De(i, l, !0));
        for (let m = o + 1; m < f.length && !(!g["greedy-arrays"] && r.length > 0 || p && typeof p == "number" && r.length >= p || (d = f[m], /^-/.test(d) && !D.test(d) && !Ie(d))); m++)
          o = m, r.push(De(i, d, a));
      }
      return typeof p == "number" && (p && r.length < p || isNaN(p) && r.length === 0) && (P = Error(H("Not enough arguments following: %s", i))), v(i, r), o;
    }
    function v(o, i, f = a) {
      if (/-/.test(o) && g["camel-case-expansion"]) {
        const d = o.split(".").map(function(p) {
          return se(p);
        }).join(".");
        it(o, d);
      }
      const l = De(o, i, f), r = o.split(".");
      oe(O, r, l), u.aliases[o] && u.aliases[o].forEach(function(d) {
        const p = d.split(".");
        oe(O, p, l);
      }), r.length > 1 && g["dot-notation"] && (u.aliases[r[0]] || []).forEach(function(d) {
        let p = d.split(".");
        const m = [].concat(r);
        m.shift(), p = p.concat(m), (u.aliases[o] || []).includes(p.join(".")) || oe(O, p, l);
      }), E(o, u.normalize) && !E(o, u.arrays) && [o].concat(u.aliases[o] || []).forEach(function(p) {
        Object.defineProperty(rt, p, {
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
    function it(o, i) {
      u.aliases[o] && u.aliases[o].length || (u.aliases[o] = [i], Fe[i] = !0), u.aliases[i] && u.aliases[i].length || it(i, o);
    }
    function De(o, i, f) {
      f && (i = an(i)), (E(o, u.bools) || E(o, u.counts)) && typeof i == "string" && (i = i === "true");
      let l = Array.isArray(i) ? i.map(function(r) {
        return We(o, r);
      }) : We(o, i);
      return E(o, u.counts) && (q(l) || typeof l == "boolean") && (l = qe()), E(o, u.normalize) && E(o, u.arrays) && (Array.isArray(i) ? l = i.map((r) => Z.normalize(r)) : l = Z.normalize(i)), l;
    }
    function We(o, i) {
      return !g["parse-positional-numbers"] && o === "_" || !E(o, u.strings) && !E(o, u.bools) && !Array.isArray(i) && (At(i) && g["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${i}`))) || !q(i) && E(o, u.numbers)) && (i = Number(i)), i;
    }
    function Rt(o) {
      const i = /* @__PURE__ */ Object.create(null);
      lt(i, u.aliases, C), Object.keys(u.configs).forEach(function(f) {
        const l = o[f] || i[f];
        if (l)
          try {
            let r = null;
            const d = Z.resolve(Z.cwd(), l), p = u.configs[f];
            if (typeof p == "function") {
              try {
                r = p(d);
              } catch (m) {
                r = m;
              }
              if (r instanceof Error) {
                P = r;
                return;
              }
            } else
              r = Z.require(d);
            Ge(r);
          } catch (r) {
            r.name === "PermissionDenied" ? P = r : o[f] && (P = Error(H("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ge(o, i) {
      Object.keys(o).forEach(function(f) {
        const l = o[f], r = i ? i + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && g["dot-notation"] ? Ge(l, r) : (!ne(O, r.split(".")) || E(r, u.arrays) && g["combine-arrays"]) && v(r, l);
      });
    }
    function Lt() {
      typeof R < "u" && R.forEach(function(o) {
        Ge(o);
      });
    }
    function ct(o, i) {
      if (typeof x > "u")
        return;
      const f = typeof x == "string" ? x : "", l = Z.env();
      Object.keys(l).forEach(function(r) {
        if (f === "" || r.lastIndexOf(f, 0) === 0) {
          const d = r.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), se(p);
          });
          (i && u.configs[d.join(".")] || !i) && !ne(o, d) && v(d.join("."), l[r]);
        }
      });
    }
    function Tt(o) {
      let i;
      const f = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(l) {
        if (!f.has(l) && (i = E(l, u.coercions), typeof i == "function"))
          try {
            const r = We(l, i(o[l]));
            [].concat(u.aliases[l] || [], l).forEach((d) => {
              f.add(d), o[d] = r;
            });
          } catch (r) {
            P = r;
          }
      });
    }
    function Wt(o) {
      return u.keys.forEach((i) => {
        ~i.indexOf(".") || typeof o[i] > "u" && (o[i] = void 0);
      }), o;
    }
    function lt(o, i, f, l = !1) {
      Object.keys(f).forEach(function(r) {
        ne(o, r.split(".")) || (oe(o, r.split("."), f[r]), l && (st[r] = !0), (i[r] || []).forEach(function(d) {
          ne(o, d.split(".")) || oe(o, d.split("."), f[r]);
        }));
      });
    }
    function ne(o, i) {
      let f = o;
      g["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(r) {
        f = f[r] || {};
      });
      const l = i[i.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function oe(o, i, f) {
      let l = o;
      g["dot-notation"] || (i = [i.join(".")]), i.slice(0, -1).forEach(function(F) {
        F = ut(F), typeof l == "object" && l[F] === void 0 && (l[F] = {}), typeof l[F] != "object" || Array.isArray(l[F]) ? (Array.isArray(l[F]) ? l[F].push({}) : l[F] = [l[F], {}], l = l[F][l[F].length - 1]) : l = l[F];
      });
      const r = ut(i[i.length - 1]), d = E(i.join("."), u.arrays), p = Array.isArray(f);
      let m = g["duplicate-arguments-array"];
      !m && E(r, u.nargs) && (m = !0, (!q(l[r]) && u.nargs[r] === 1 || Array.isArray(l[r]) && l[r].length === u.nargs[r]) && (l[r] = void 0)), f === qe() ? l[r] = qe(l[r]) : Array.isArray(l[r]) ? m && d && p ? l[r] = g["flatten-duplicate-arrays"] ? l[r].concat(f) : (Array.isArray(l[r][0]) ? l[r] : [l[r]]).concat([f]) : !m && !!d == !!p ? l[r] = f : l[r] = l[r].concat([f]) : l[r] === void 0 && d ? l[r] = p ? f : [f] : m && !(l[r] === void 0 || E(r, u.counts) || E(r, u.bools)) ? l[r] = [l[r], f] : l[r] = f;
    }
    function It(...o) {
      o.forEach(function(i) {
        Object.keys(i || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && g["camel-case-expansion"]) {
              const r = se(l);
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Fe[r] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && g["camel-case-expansion"]) {
              const r = Ct(l, "-");
              r !== f && u.aliases[f].indexOf(r) === -1 && (u.aliases[f].push(r), Fe[r] = !0);
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
      const f = [].concat(u.aliases[o] || [], o), l = Object.keys(i), r = f.find((d) => l.includes(d));
      return r ? i[r] : !1;
    }
    function at(o) {
      const i = Object.keys(u);
      return [].concat(i.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(o) : l[o];
      });
    }
    function Bt(o, ...i) {
      return [].concat(...i).some(function(l) {
        const r = o.match(l);
        return r && at(r[1]);
      });
    }
    function Pt(o) {
      if (o.match(D) || !o.match(/^-[^-]+/))
        return !1;
      let i = !0, f;
      const l = o.slice(1).split("");
      for (let r = 0; r < l.length; r++) {
        if (f = o.slice(r + 2), !at(l[r])) {
          i = !1;
          break;
        }
        if (l[r + 1] && l[r + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[r]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[r + 1] && l[r + 1].match(/\W/))
          break;
      }
      return i;
    }
    function Ie(o) {
      return g["unknown-options-as-args"] && Mt(o);
    }
    function Mt(o) {
      return o = o.replace(/^-{3,}/, "--"), o.match(D) || Pt(o) ? !1 : !Bt(o, /^-+([^=]+?)=[\s\S]*$/, Ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function J(o) {
      return !E(o, u.bools) && !E(o, u.counts) && `${o}` in C ? C[o] : zt(Vt(o));
    }
    function zt(o) {
      return {
        [z.BOOLEAN]: !0,
        [z.STRING]: "",
        [z.NUMBER]: void 0,
        [z.ARRAY]: []
      }[o];
    }
    function Vt(o) {
      let i = z.BOOLEAN;
      return E(o, u.strings) ? i = z.STRING : E(o, u.numbers) ? i = z.NUMBER : E(o, u.bools) ? i = z.BOOLEAN : E(o, u.arrays) && (i = z.ARRAY), i;
    }
    function q(o) {
      return o === void 0;
    }
    function Ut() {
      Object.keys(u.counts).find((o) => E(o, u.arrays) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : E(o, u.nargs) ? (P = Error(H("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(rt, O),
      configuration: g,
      defaulted: Object.assign({}, st),
      error: P,
      newAliases: Object.assign({}, Fe)
    };
  }
}
function ln(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(c) {
    t.push([].concat(e[c], c));
  }); s; ) {
    s = !1;
    for (let c = 0; c < t.length; c++)
      for (let a = c + 1; a < t.length; a++)
        if (t[c].filter(function(g) {
          return t[a].indexOf(g) !== -1;
        }).length) {
          t[c] = t[c].concat(t[a]), t.splice(a, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(c) {
    c = c.filter(function(h, g, C) {
      return C.indexOf(h) === g;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function qe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function ut(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function an(e) {
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
var Ze, Ke, Qe;
const ft = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, ht = (Ke = (Ze = process == null ? void 0 : process.versions) === null || Ze === void 0 ? void 0 : Ze.node) !== null && Ke !== void 0 ? Ke : (Qe = process == null ? void 0 : process.version) === null || Qe === void 0 ? void 0 : Qe.slice(1);
if (ht && Number(ht.match(/^([^.]+)/)[1]) < ft)
  throw Error(`yargs parser supports a minimum Node.js version of ${ft}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const un = process ? process.env : {}, _t = new cn({
  cwd: process.cwd,
  env: () => un,
  format: bt,
  normalize: qt,
  resolve: te,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(ot(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), je = function(t, n) {
  return _t.parse(t.slice(), n).argv;
};
je.detailed = function(e, t) {
  return _t.parse(e.slice(), t);
};
je.camelCase = se;
je.decamelize = Ct;
je.looksLikeNumber = At;
const fn = {
  right: $n,
  center: bn
}, hn = 0, Be = 1, pn = 2, Pe = 3;
class gn {
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
      s.forEach((h, g) => {
        const { width: C } = t[g], R = this.negatePadding(t[g]);
        let x = h;
        if (R > T.stringWidth(h) && (x += " ".repeat(R - T.stringWidth(h))), t[g].align && t[g].align !== "left" && this.wrap) {
          const Y = fn[t[g].align];
          x = Y(x, R), T.stringWidth(x) < R && (x += " ".repeat((C || 0) - T.stringWidth(x) - 1));
        }
        const G = t[g].padding || [0, 0, 0, 0];
        G[Pe] && (a += " ".repeat(G[Pe])), a += pt(t[g], x, "| "), a += x, a += pt(t[g], x, " |"), G[Be] && (a += " ".repeat(G[Be])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
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
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[hn] || 0).fill("")), c.push(...new Array(a.padding[pn] || 0).fill(""))), c.forEach((g, C) => {
        n[C] || n.push([]);
        const R = n[C];
        for (let x = 0; x < h; x++)
          R[x] === void 0 && R.push("");
        R.push(g);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Pe] || 0) + (t.padding[Be] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || T.stringWidth(h.text));
    let n = t.length, s = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, s -= h.width, h.width;
    }), a = n ? Math.floor(s / n) : 0;
    return c.map((h, g) => h === void 0 ? Math.max(a, dn(t[g])) : h);
  }
}
function pt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function dn(e) {
  const t = e.padding || [], n = 1 + (t[Pe] || 0) + (t[Be] || 0);
  return e.border ? n + 4 : n;
}
function mn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function $n(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function bn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function yn(e, t) {
  return T = t, new gn({
    width: e?.width || mn(),
    wrap: e?.wrap
  });
}
const vt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function wt(e) {
  return e.replace(vt, "");
}
function En(e, t) {
  const [n, s] = e.match(vt) || ["", ""];
  e = wt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && s && (c = `${n}${c}${s}`), c;
}
function Cn(e) {
  return yn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: wt,
    wrap: En
  });
}
function An(e, t) {
  let n = te(".", e), s;
  for (yt(n).isDirectory() || (n = Xe(n)); ; ) {
    if (s = t(n, Xt(n)), s)
      return te(n, s);
    if (n = Xe(s = n), s === n)
      break;
  }
}
const _n = {
  fs: {
    readFileSync: ot,
    writeFile: Yt
  },
  format: bt,
  resolve: te,
  exists: (e) => {
    try {
      return yt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let M;
class vn {
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
    const g = [h];
    return ~h.indexOf("%d") && g.push(c), M.format.apply(M.format, g.concat(t));
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
    const t = this, n = this.writeQueue[0], s = n.directory, c = n.locale, a = n.cb, h = this._resolveLocaleFile(s, c), g = JSON.stringify(this.cache[c], null, 2);
    M.fs.writeFile(h, g, "utf-8", function(C) {
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
function wn(e, t) {
  M = t;
  const n = new vn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const xn = (e) => wn(e, _n), Sn = "require is not supported by ESM", gt = "loading a directory of commands is not supported yet for ESM";
let Oe;
try {
  Oe = Jt(import.meta.url);
} catch {
  Oe = process.cwd();
}
const Nn = Oe.substring(0, Oe.lastIndexOf("node_modules"));
Ht, kt, Gt, Nn || process.cwd(), Zt, Xe, Kt, Qt, te, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ot, xn({
  directory: te(Oe, "../../../locales"),
  updateFiles: !1
});
const He = "\x1B[44m", A = "\x1B[43m", j = "\x1B[41m", On = "\x1B[42m", b = "\x1B[0m", _ = "\x1B[33m", w = "\x1B[36m", $ = "\x1B[0m", ke = 100, re = [], jn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > ke && re.push({ fileName: t, scriptLength: n.length });
}, Fn = () => (re.length > 0 && (console.log(
  `
${w}rrd${$} ${j}Long <script> blocks${b} in ${re.length} files.`
), console.log(
  `👉 ${_}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${ke} lines.${$}`
), re.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > ke * 2 ? j : A}(${e.scriptLength} lines)${b}`
  );
})), re.length), ie = [], Rn = (e, t) => {
  !e || !e.setup || ie.push(t);
}, Ln = () => (ie.length > 0 && (console.log(
  `
${w}rrd${$} ${A}Plain <script> blocks${b} in ${ie.length} files.`
), console.log(`👉 ${_} Consider using <script setup> to leverage the new SFC <script> syntax.${$}`), ie.forEach((e) => {
  console.log(`- ${e}`);
})), ie.length), Tn = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return Tn.test(t) ? t : `(?:${t})`;
}
const Wn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, In = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function y(e) {
  const t = (n) => y(`(?<${n}>${`${e}`.replace(Wn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => y(`${e}${V(...n)}`), {
      referenceTo: (n) => y(`${e}\\k<${n}>`)
    }),
    or: (...n) => y(`(?:${e}|${V(...n)})`),
    after: (...n) => y(`(?<=${V(...n)})${e}`),
    before: (...n) => y(`${e}(?=${V(...n)})`),
    notAfter: (...n) => y(`(?<!${V(...n)})${e}`),
    notBefore: (...n) => y(`${e}(?!${V(...n)})`),
    times: Object.assign((n) => y(`${X(e)}{${n}}`), {
      any: () => y(`${X(e)}*`),
      atLeast: (n) => y(`${X(e)}{${n},}`),
      atMost: (n) => y(`${X(e)}{0,${n}}`),
      between: (n, s) => y(`${X(e)}{${n},${s}}`)
    }),
    optionally: () => y(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => y(`${e}`.replace(In, "($1$3)$2")),
    at: {
      lineStart: () => y(`^${e}`),
      lineEnd: () => y(`${e}$`)
    }
  };
}
const Bn = /[.*+?^${}()|[\]\\/]/g;
function Je(e) {
  return y(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function B(e) {
  return y(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Pn = y(".");
y("\\b\\w+\\b");
const ze = y("\\w"), I = y("\\b");
y("\\d");
const Mn = y("\\s"), Se = Object.assign(y("[a-zA-Z]"), {
  lowercase: y("[a-z]"),
  uppercase: y("[A-Z]")
}), xt = y("\\t"), zn = y("\\n");
y("\\r");
y("\\W+"), y("\\W"), y("\\B"), y("\\D"), y("\\S"), Object.assign(y("[^a-zA-Z]"), {
  lowercase: y("[^a-z]"),
  uppercase: y("[^A-Z]")
}), y("[^\\t]"), y("[^\\n]"), y("[^\\r]");
function K(...e) {
  return y(`${X(V(...e))}?`);
}
function V(...e) {
  return y(
    e.map((t) => typeof t == "string" ? t.replace(Bn, "\\$&") : t).join("")
  );
}
function S(...e) {
  return y(`${X(V(...e))}+`);
}
const U = "i", W = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(V(...e).toString(), [...t || ""].join(""));
}, ce = [], Vn = (e, t) => {
  if (!e)
    return;
  const n = N(I, "else", I, [W, U]), s = e.content.match(n);
  s?.length && ce.push({ fileName: t, elseCount: s.length });
}, Un = () => (ce.length > 0 && (console.log(
  `
${w}rrd${$} ${A}else conditions${b} are used in ${ce.length} files.`
), console.log(`👉 ${_}Try to rewrite the conditions in a way that the else clause is not necessary.${$}`), ce.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.elseCount})${b}`);
})), ce.length), Dn = 5, Gn = 10, le = [], qn = (e, t) => {
  if (!e)
    return;
  const n = N(I, "if", I, [W, U]), s = N(I, "else", I, [W, U]), c = N(I, "for", I, [W, U]), a = N(I, "while", I, [W, U]), h = N(I, "case", I, [W, U]), g = e.content.match(n), C = e.content.match(s), R = e.content.match(c), x = e.content.match(a), G = e.content.match(h), Y = (g?.length || 0) + (C?.length || 0) + (R?.length || 0) + (x?.length || 0) + (G?.length || 0);
  Y > Dn && le.push({ fileName: t, cyclomaticComplexity: Y });
}, Zn = () => (le.length > 0 && (console.log(
  `
${w}rrd${$} ${He}cyclomaticComplexity${b} is above moderate in ${le.length} files.`
), console.log(`👉 ${_}Try to reduce complexity.${$}`), le.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Gn ? j : A}(${e.cyclomaticComplexity})${b}`
  );
})), le.length), ae = [], Kn = (e) => {
  if (e.includes("pages"))
    return;
  const t = nt.basename(e);
  if (t === "App.vue")
    return;
  const n = N(Se.uppercase);
  t.slice(1).match(n)?.length || ae.push({ filePath: e });
}, Qn = () => (ae.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}single name component${b} is used in ${ae.length} files.`
), console.log(
  `👉 ${_}Rename the component to use multi-word name.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ae.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ae.length), ue = [], Xn = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ue.push({ filePath: t });
  });
}, Yn = () => (ue.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}Global style ${b} is used in ${ue.length} files.`
), console.log(
  `👉 ${_}Use <style scoped>.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ue.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ue.length), fe = [], Hn = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [W, U]);
  e.content.match(n)?.length && fe.push({ filePath: t });
}, kn = () => (fe.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}simple prop${b} is used in ${fe.length} files.`
), console.log(
  `👉 ${_}Add at least type definition.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), fe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), fe.length), he = [], Jn = (e, t) => {
  if (!e)
    return;
  const n = N(
    "<",
    S(B(">")),
    " v-if",
    S(B(">")),
    " v-for",
    S(B(">")),
    ">",
    [W, U]
  ), s = N(
    "<",
    S(B(">")),
    " v-for",
    S(B(">")),
    " v-if",
    S(B(">")),
    ">",
    [W, U]
  ), c = e.content.match(n), a = e.content.match(s);
  (c?.length || a?.length) && he.push({ filePath: t });
}, eo = () => (he.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}v-if used with v-for${b} in ${he.length} files.`
), console.log(
  `👉 ${_}Move out the v-if to a computed property.${$} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), he.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), he.length), pe = [], to = (e, t) => {
  if (!e)
    return;
  const n = N("<", S(B(">")), " v-for", S(B(">")), ">", [
    W,
    U
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || pe.push({ filePath: t }));
}, no = () => (pe.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}v-for has no key${b} in ${pe.length} files.`
), console.log(
  `👉 ${_}Add a \`:key\` property to all v-for.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), pe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), pe.length), ge = [], oo = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = nt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !s?.length && !a?.length && ge.push({ fileName: e });
}, so = () => (ge.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}component name is not PascalCase and not kebab-case${b} in ${ge.length} files.`
), console.log(
  `👉 ${_}Rename the component to use PascalCase or kebab-case file name.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ge.forEach((e) => {
  console.log(`- ${j}${e.fileName}${b}`);
})), ge.length), de = [], ro = N(
  S(Se.lowercase).at.lineStart(),
  S(Se.uppercase, Se.lowercase.times.any().grouped()).at.lineEnd()
), io = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !ro.test(a)).length && de.push({ filePath: t });
}, co = () => (de.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}prop names are not camelCased${b} in ${de.length} files.`
), console.log(
  `👉 ${_}Rename the props to camelCase.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
), de.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), de.length), Q = (e, t) => {
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
const me = [], lo = 40, ao = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > lo) {
      const a = Q(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      me.push({
        filename: t,
        message: `${t}#${a} ${A}${h}${b}`
      });
    }
  });
}, uo = () => {
  if (me.length > 0) {
    const e = k(me, "filename");
    console.log(
      `
${w}vue-strong${$} ${j}Lengthy template expression${b} found in ${e} files.`
    ), console.log(
      `👉 ${_}Refactor the expression into a computed property.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), me.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return me.length;
}, $e = [], fo = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(ze),
    K(S(Je(` 	
\r`))),
    S(B("/>")),
    K(S(Je(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), c = n.content.match(s);
  if (c === null)
    return;
  const a = N(":", S(ze), K(" "), "=", K(" "), B(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const g = h.match(a);
    if (g?.length) {
      const C = Q(e.source, h);
      $e.push({ message: `${t}#${C} ${A}${g}${b}` });
    }
  });
}, ho = () => ($e.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}Attribute value is not quoted${b} in ${$e.length} files.`
), console.log(
  `👉 ${_}Use quotes for attribute values.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), $e.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), $e.length), be = [], po = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(Se.uppercase, ze),
    K(zn, xt),
    K(S(B(">"))),
    "></",
    S(ze),
    ">",
    ["g"]
  ), c = n.content.match(s);
  c !== null && c.forEach((a) => {
    const h = Q(e.source, a), g = a.split(`
`).at(-1)?.trim() || "";
    be.push({ message: `${t}#${h} ${A}${g}${b}` });
  });
}, go = () => (be.length > 0 && (console.log(
  `
${w}vue-strong${$} - ${j}Component is not self closing${b} in ${be.length} files.`
), console.log(
  `👉 ${_}Components with no content should be self-closing.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), be.length), Me = [], et = [], mo = ["v-slot", "v-bind", "v-on"], $o = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  mo.forEach((s) => {
    if (n.content.includes(`${s}:`)) {
      const c = Q(e.source, s);
      Me.push({ message: `${t}:${c} ${A}${s}${b}` }), et.some((a) => a.filePath === t) || et.push({ filePath: t });
    }
  });
}, bo = () => (Me.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}Directive shorthands not used${b} in ${et.length} files.`
), console.log(
  `👉 ${_}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Me.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Me.length), ye = [], yo = (e) => {
  const t = N(
    S(B("/")).grouped(),
    V(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], c = N(
      Je("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [W]
    ), a = s.match(c);
    (!a || a.length < 3) && ye.push({ filename: s, filePath: e });
  }
}, Eo = () => {
  if (ye.length > 0) {
    const e = k(ye, "filename");
    console.log(`
${w}vue-strong${$} ${j}full-word component names${b} detected in ${e} files.`), console.log(
      `👉 ${_}Component names should prefer full words over abbreviations.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`
    ), ye.forEach((t) => {
      console.log(`- ${t.filePath} 🚨 ${A}(${t.filename})${b}`);
    });
  }
  return ye.length;
}, Ee = [], Co = 5, Ao = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", K("<"), K("("), "{", S(Pn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const c = s[0].split(",").length;
    c > Co && Ee.push({ fileName: t, propsCount: c });
  }
}, _o = () => (Ee.length > 0 && (console.log(
  `
${w}rrd${$} ${A}too many props${b} are used in ${Ee.length} files.`
), console.log(`👉 ${_}Try to refactor your code to use less properties.${$}`), Ee.forEach((e) => {
  console.log(`- ${e.fileName} ${A}(${e.propsCount})${b}`);
})), Ee.length), Ce = [], St = 20, vo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1] || s[5];
    (s[2] || s[6]).split(`
`).length > St && Ce.push({ filename: t, funcName: c });
  }
}, wo = () => {
  if (Ce.length > 0) {
    const e = k(Ce, "filename");
    console.log(
      `
${w}rrd${$} ${A}function size${b} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${_}Functions must be shorter than ${St} lines${$}`), Ce.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.funcName})${b}`);
    });
  }
  return Ce.length;
}, Ae = [], Nt = 3, dt = (e, t, n) => {
  const s = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  s.length > Nt && Ae.push({ filename: n, funcName: e, paramsCount: s.length });
}, xo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? dt(s[1], s[2], t) : s[3] && dt(s[3], s[4], t);
}, So = () => (Ae.length > 0 && (console.log(
  `
${w}rrd${$} ${A}parameter count${b} exceeds recommended limit in ${Ae.length} files.`
), console.log(`👉 ${_}Max number of function parameters should be ${Nt}${$}`), Ae.forEach((e) => {
  console.log(
    `- ${A}${e.funcName}${b} in file ${e.filename} 🚨 ${A}(${e.paramsCount})${b}`
  );
})), Ae.length), Ot = 4, _e = [], No = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1];
    c.length < Ot && _e.push({ filename: t, variable: c });
  }
}, Oo = () => {
  if (_e.length > 0) {
    const e = k(_e, "filename");
    console.log(`
${w}rrd${$} ${A}variable names${b} are too short in ${e} files.`), console.log(`👉 ${_}Variable names must have a minimum length of ${Ot}${$}`), _e.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${A}(${t.variable})${b}`);
    });
  }
  return _e.length;
}, tt = [], Ne = [], jo = 5, Fo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((c) => {
    if (c.split(`
`).length > jo) {
      const a = c.split(`
`)[0], h = Q(e.content, a);
      tt.push({ message: `${t}:${h} ${A}computed${b}` }), Ne.push({ filePath: t }), Ne.some((g) => g.filePath === t) || Ne.push({ filePath: t });
    }
  });
}, Ro = () => (Ne.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}complicated computed property ${b} in ${Ne.length} files.`
), console.log(
  `👉 ${_}Refactor the computed properties to smaller ones.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), tt.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), tt.length), ve = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    const a = Q(e.content.trim(), c), h = c.split(`
`).at(0)?.trim() || "";
    ve.push({ filename: t, message: `${t}#${a} ${A}(${h})${b}` });
  });
}, To = () => {
  if (ve.length > 0) {
    const e = k(ve, "filename");
    console.log(`
${w}vue-strong${$} ${j}component files${b} detected in ${e} files.`), console.log(
      `👉 ${_}Whenever a build system is available to concatenate files, each component should be in its own file.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), ve.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ve.length;
}, ee = [], Wo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, c = N(V("$parent").or("getCurrentInstance"), [W]), a = e.content.match(n), h = e.content.match(s);
  if (h) {
    const C = h[1].split(".")[0], R = a ? a[1] : "";
    if (R.includes(C)) {
      const x = Q(e.content.trim(), R);
      ee.push({
        filename: t,
        message: `${t}#${x} ${A}(${C})${b}`
      });
    }
  }
  const g = e.content.match(c);
  if (g) {
    const C = Q(e.content.trim(), g[0]);
    ee.push({
      filename: t,
      message: `${t}#${C} ${A}(${g[0]})${b}`
    });
  }
}, Io = () => {
  if (ee.length > 0) {
    const e = k(
      ee,
      "filename"
    );
    console.log(
      `
${w}vue-caution${$} ${A}implicit parent-child communication${b} detected in ${e} files.`
    ), console.log(
      `👉 ${_}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${$} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), ee.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ee.length;
}, we = [], mt = 5, Bo = 3, Po = (e, t) => {
  if (!e)
    return;
  const n = N(xt.times.atLeast(mt).or(Mn.times.atLeast(Bo * mt)), [
    W,
    U
  ]);
  e.content.match(n)?.forEach((c) => {
    const a = Q(e.content, c);
    we.push({
      filePath: t,
      message: `${t}#${a} ${A}indentation: ${c.length}${b}`
    });
  });
}, Mo = () => {
  if (we.length > 0) {
    const e = k(we, "filePath");
    console.log(`
${w}rrd${$} ${A}deep indentation${b} found in ${e} files.`), console.log(
      `👉 ${_}Try to refactor your component to child components, to avoid deep indentations..${$}`
    ), we.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return we.length;
}, zo = () => {
  let e = 0;
  return e += Qn(), e += kn(), e += no(), e += eo(), e += Yn(), e += so(), e += go(), e += co(), e += uo(), e += ho(), e += bo(), e += Ro(), e += To(), e += Eo(), e += Io(), e += Zn(), e += Mo(), e += Un(), e += wo(), e += So(), e += Ln(), e += Fn(), e += Oo(), e += _o(), e;
}, Vo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  n.includes("vue-essential") || (Kn(t), Hn(s, t), Xn(e.styles, t), to(e.template, t), Jn(e.template, t)), n.includes("vue-strong") || (oo(t), io(s, t), Lo(s, t), Fo(s, t), po(e, t), ao(e.template, t), fo(e, t), $o(e, t), yo(t)), n.includes("vue-caution") || Wo(s, t), n.includes("rrd") || (qn(s, t), Po(s, t), Vn(s, t), vo(s, t), xo(s, t), Rn(e.script, t), jn(s, t), No(s, t), Ao(s, t));
};
let jt = 0;
const Uo = [
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
], Ft = (e, t) => {
  const n = Ye.readdirSync(e);
  jt += n.length;
  for (const s of n) {
    const c = nt.join(e, s);
    Ye.statSync(c).isDirectory() ? Uo.some((a) => c.includes(a)) && Ft(c, t) : s.endsWith(".vue") && t(c);
  }
}, Do = (e, t = []) => {
  console.log(`

${He}Analyzing Vue files in ${e}${b}`), Ft(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const s = Ye.readFileSync(n, "utf-8"), { descriptor: c } = en(s);
    Vo(c, n, t);
  }), console.log(`Found ${He}${jt}${b} Vue files`), zo() || console.log(`${On}No code smells detected!${b}`);
}, Go = {
  "vue-caution": ["implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-reccomended": [],
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
}, $t = Object.keys(Go);
Dt(on(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rules to ignore",
    type: "string",
    coerce: (t) => {
      const n = t.split(","), s = n.filter((c) => !$t.includes(c));
      return s.length > 0 && (console.error(
        `
${j}Invalid ignore values: ${s.join(
          ", "
        )}${b}. 
${_}Allowed values are: ${[...$t].join(", ")}${$}

`
      ), process.exit(1)), n;
    }
  }),
  (e) => {
    Do(e.path, e.ignore);
  }
).help().argv;
