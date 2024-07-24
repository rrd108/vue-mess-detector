import Ut from "yargs";
import { format as $t, inspect as Dt } from "util";
import et, { normalize as Gt, resolve as ee, dirname as Qe, basename as qt, extname as Zt, relative as Kt } from "path";
import Xe, { readFileSync as tt, statSync as bt, readdirSync as Qt, writeFile as Xt } from "fs";
import { notStrictEqual as Yt, strictEqual as Ht } from "assert";
import { fileURLToPath as kt } from "url";
import { parse as Jt } from "@vue/compiler-sfc";
class we extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, we);
  }
}
function yt() {
  return en() ? 0 : 1;
}
function en() {
  return tn() && !process.defaultApp;
}
function tn() {
  return !!process.versions.electron;
}
function nn(e) {
  return e.slice(yt() + 1);
}
function on() {
  return process.argv[yt()];
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
function Et(e, t) {
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
function sn(e) {
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
var B;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(B || (B = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let q;
class rn {
  constructor(t) {
    q = t;
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
    }, n), c = sn(t), a = typeof t == "string", h = cn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), g = Object.assign({
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
    }, s.configuration), A = Object.assign(/* @__PURE__ */ Object.create(null), s.default), R = s.configObjects || [], S = s.envPrefix, D = g["populate--"], Y = D ? "--" : "_", je = /* @__PURE__ */ Object.create(null), nt = /* @__PURE__ */ Object.create(null), H = s.__ || q.format, u = {
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
    }, U = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Me = new RegExp("^--" + g["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(o) {
      const r = typeof o == "object" ? o.key : o, f = Object.keys(o).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      f && (u[f][r] = !0), u.arrays[r] = !0, u.keys.push(r);
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
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([o, r]) => {
      typeof r == "number" && (u.nargs[o] = r, u.keys.push(o));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([o, r]) => {
      typeof r == "function" && (u.coercions[o] = r, u.keys.push(o));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(o) {
      u.configs[o] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([o, r]) => {
      (typeof r == "boolean" || typeof r == "function") && (u.configs[o] = r);
    })), Wt(s.key, h, s.default, u.arrays), Object.keys(A).forEach(function(o) {
      (u.aliases[o] || []).forEach(function(r) {
        A[r] = A[o];
      });
    });
    let I = null;
    Vt();
    let Fe = [];
    const x = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ot = {};
    for (let o = 0; o < c.length; o++) {
      const r = c[o], f = r.replace(/^-{3,}/, "---");
      let l, i, d, p, m, N;
      if (r !== "--" && /^-/.test(r) && We(r))
        Ve(r);
      else if (f.match(/^---+(=|$)/)) {
        Ve(r);
        continue;
      } else if (r.match(/^--.+=/) || !g["short-option-groups"] && r.match(/^-.+=/))
        p = r.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (E(p[1], u.arrays) ? o = Le(o, p[1], c, p[2]) : E(p[1], u.nargs) !== !1 ? o = Re(o, p[1], c, p[2]) : _(p[1], p[2], !0));
      else if (r.match(Me) && g["boolean-negation"])
        p = r.match(Me), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], _(i, E(i, u.arrays) ? [!1] : !1));
      else if (r.match(/^--.+/) || !g["short-option-groups"] && r.match(/^-[^-]+/))
        p = r.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], E(i, u.arrays) ? o = Le(o, i, c) : E(i, u.nargs) !== !1 ? o = Re(o, i, c) : (m = c[o + 1], m !== void 0 && (!m.match(/^-/) || m.match(U)) && !E(i, u.bools) && !E(i, u.counts) || /^(true|false)$/.test(m) ? (_(i, m), o++) : _(i, k(i))));
      else if (r.match(/^-.\..+=/))
        p = r.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && _(p[1], p[2]);
      else if (r.match(/^-.\..+/) && !r.match(U))
        m = c[o + 1], p = r.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], m !== void 0 && !m.match(/^-/) && !E(i, u.bools) && !E(i, u.counts) ? (_(i, m), o++) : _(i, k(i)));
      else if (r.match(/^-[^-]+/) && !r.match(U)) {
        d = r.slice(1, -1).split(""), l = !1;
        for (let L = 0; L < d.length; L++) {
          if (m = r.slice(L + 2), d[L + 1] && d[L + 1] === "=") {
            N = r.slice(L + 3), i = d[L], E(i, u.arrays) ? o = Le(o, i, c, N) : E(i, u.nargs) !== !1 ? o = Re(o, i, c, N) : _(i, N), l = !0;
            break;
          }
          if (m === "-") {
            _(d[L], m);
            continue;
          }
          if (/[A-Za-z]/.test(d[L]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) && E(m, u.bools) === !1) {
            _(d[L], m), l = !0;
            break;
          }
          if (d[L + 1] && d[L + 1].match(/\W/)) {
            _(d[L], m), l = !0;
            break;
          } else
            _(d[L], k(d[L]));
        }
        i = r.slice(-1)[0], !l && i !== "-" && (E(i, u.arrays) ? o = Le(o, i, c) : E(i, u.nargs) !== !1 ? o = Re(o, i, c) : (m = c[o + 1], m !== void 0 && (!/^(-|--)[^-]/.test(m) || m.match(U)) && !E(i, u.bools) && !E(i, u.counts) || /^(true|false)$/.test(m) ? (_(i, m), o++) : _(i, k(i))));
      } else if (r.match(/^-[0-9]$/) && r.match(U) && E(r.slice(1), u.bools))
        i = r.slice(1), _(i, k(i));
      else if (r === "--") {
        Fe = c.slice(o + 1);
        break;
      } else if (g["halt-at-non-option"]) {
        Fe = c.slice(o);
        break;
      } else
        Ve(r);
    }
    it(x, !0), it(x, !1), Ft(x), Rt(), rt(x, u.aliases, A, !0), Lt(x), g["set-placeholder-key"] && Tt(x), Object.keys(u.counts).forEach(function(o) {
      ne(x, o.split(".")) || _(o, 0);
    }), D && Fe.length && (x[Y] = []), Fe.forEach(function(o) {
      x[Y].push(o);
    }), g["camel-case-expansion"] && g["strip-dashed"] && Object.keys(x).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete x[o];
    }), g["strip-aliased"] && [].concat(...Object.keys(h).map((o) => h[o])).forEach((o) => {
      g["camel-case-expansion"] && o.includes("-") && delete x[o.split(".").map((r) => se(r)).join(".")], delete x[o];
    });
    function Ve(o) {
      const r = Te("_", o);
      (typeof r == "string" || typeof r == "number") && x._.push(r);
    }
    function Re(o, r, f, l) {
      let i, d = E(r, u.nargs);
      if (d = typeof d != "number" || isNaN(d) ? 1 : d, d === 0)
        return G(l) || (I = Error(H("Argument unexpected for: %s", r))), _(r, k(r)), o;
      let p = G(l) ? 0 : 1;
      if (g["nargs-eats-options"])
        f.length - (o + 1) + p < d && (I = Error(H("Not enough arguments following: %s", r))), p = d;
      else {
        for (i = o + 1; i < f.length && (!f[i].match(/^-[^0-9]/) || f[i].match(U) || We(f[i])); i++)
          p++;
        p < d && (I = Error(H("Not enough arguments following: %s", r)));
      }
      let m = Math.min(p, d);
      for (!G(l) && m > 0 && (_(r, l), m--), i = o + 1; i < m + o + 1; i++)
        _(r, f[i]);
      return o + m;
    }
    function Le(o, r, f, l) {
      let i = [], d = l || f[o + 1];
      const p = E(r, u.nargs);
      if (E(r, u.bools) && !/^(true|false)$/.test(d))
        i.push(!0);
      else if (G(d) || G(l) && /^-/.test(d) && !U.test(d) && !We(d)) {
        if (A[r] !== void 0) {
          const m = A[r];
          i = Array.isArray(m) ? m : [m];
        }
      } else {
        G(l) || i.push(Ue(r, l, !0));
        for (let m = o + 1; m < f.length && !(!g["greedy-arrays"] && i.length > 0 || p && typeof p == "number" && i.length >= p || (d = f[m], /^-/.test(d) && !U.test(d) && !We(d))); m++)
          o = m, i.push(Ue(r, d, a));
      }
      return typeof p == "number" && (p && i.length < p || isNaN(p) && i.length === 0) && (I = Error(H("Not enough arguments following: %s", r))), _(r, i), o;
    }
    function _(o, r, f = a) {
      if (/-/.test(o) && g["camel-case-expansion"]) {
        const d = o.split(".").map(function(p) {
          return se(p);
        }).join(".");
        st(o, d);
      }
      const l = Ue(o, r, f), i = o.split(".");
      oe(x, i, l), u.aliases[o] && u.aliases[o].forEach(function(d) {
        const p = d.split(".");
        oe(x, p, l);
      }), i.length > 1 && g["dot-notation"] && (u.aliases[i[0]] || []).forEach(function(d) {
        let p = d.split(".");
        const m = [].concat(i);
        m.shift(), p = p.concat(m), (u.aliases[o] || []).includes(p.join(".")) || oe(x, p, l);
      }), E(o, u.normalize) && !E(o, u.arrays) && [o].concat(u.aliases[o] || []).forEach(function(p) {
        Object.defineProperty(ot, p, {
          enumerable: !0,
          get() {
            return r;
          },
          set(m) {
            r = typeof m == "string" ? q.normalize(m) : m;
          }
        });
      });
    }
    function st(o, r) {
      u.aliases[o] && u.aliases[o].length || (u.aliases[o] = [r], je[r] = !0), u.aliases[r] && u.aliases[r].length || st(r, o);
    }
    function Ue(o, r, f) {
      f && (r = ln(r)), (E(o, u.bools) || E(o, u.counts)) && typeof r == "string" && (r = r === "true");
      let l = Array.isArray(r) ? r.map(function(i) {
        return Te(o, i);
      }) : Te(o, r);
      return E(o, u.counts) && (G(l) || typeof l == "boolean") && (l = Ge()), E(o, u.normalize) && E(o, u.arrays) && (Array.isArray(r) ? l = r.map((i) => q.normalize(i)) : l = q.normalize(r)), l;
    }
    function Te(o, r) {
      return !g["parse-positional-numbers"] && o === "_" || !E(o, u.strings) && !E(o, u.bools) && !Array.isArray(r) && (At(r) && g["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${r}`))) || !G(r) && E(o, u.numbers)) && (r = Number(r)), r;
    }
    function Ft(o) {
      const r = /* @__PURE__ */ Object.create(null);
      rt(r, u.aliases, A), Object.keys(u.configs).forEach(function(f) {
        const l = o[f] || r[f];
        if (l)
          try {
            let i = null;
            const d = q.resolve(q.cwd(), l), p = u.configs[f];
            if (typeof p == "function") {
              try {
                i = p(d);
              } catch (m) {
                i = m;
              }
              if (i instanceof Error) {
                I = i;
                return;
              }
            } else
              i = q.require(d);
            De(i);
          } catch (i) {
            i.name === "PermissionDenied" ? I = i : o[f] && (I = Error(H("Invalid JSON config file: %s", l)));
          }
      });
    }
    function De(o, r) {
      Object.keys(o).forEach(function(f) {
        const l = o[f], i = r ? r + "." + f : f;
        typeof l == "object" && l !== null && !Array.isArray(l) && g["dot-notation"] ? De(l, i) : (!ne(x, i.split(".")) || E(i, u.arrays) && g["combine-arrays"]) && _(i, l);
      });
    }
    function Rt() {
      typeof R < "u" && R.forEach(function(o) {
        De(o);
      });
    }
    function it(o, r) {
      if (typeof S > "u")
        return;
      const f = typeof S == "string" ? S : "", l = q.env();
      Object.keys(l).forEach(function(i) {
        if (f === "" || i.lastIndexOf(f, 0) === 0) {
          const d = i.split("__").map(function(p, m) {
            return m === 0 && (p = p.substring(f.length)), se(p);
          });
          (r && u.configs[d.join(".")] || !r) && !ne(o, d) && _(d.join("."), l[i]);
        }
      });
    }
    function Lt(o) {
      let r;
      const f = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(l) {
        if (!f.has(l) && (r = E(l, u.coercions), typeof r == "function"))
          try {
            const i = Te(l, r(o[l]));
            [].concat(u.aliases[l] || [], l).forEach((d) => {
              f.add(d), o[d] = i;
            });
          } catch (i) {
            I = i;
          }
      });
    }
    function Tt(o) {
      return u.keys.forEach((r) => {
        ~r.indexOf(".") || typeof o[r] > "u" && (o[r] = void 0);
      }), o;
    }
    function rt(o, r, f, l = !1) {
      Object.keys(f).forEach(function(i) {
        ne(o, i.split(".")) || (oe(o, i.split("."), f[i]), l && (nt[i] = !0), (r[i] || []).forEach(function(d) {
          ne(o, d.split(".")) || oe(o, d.split("."), f[i]);
        }));
      });
    }
    function ne(o, r) {
      let f = o;
      g["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(i) {
        f = f[i] || {};
      });
      const l = r[r.length - 1];
      return typeof f != "object" ? !1 : l in f;
    }
    function oe(o, r, f) {
      let l = o;
      g["dot-notation"] || (r = [r.join(".")]), r.slice(0, -1).forEach(function(N) {
        N = lt(N), typeof l == "object" && l[N] === void 0 && (l[N] = {}), typeof l[N] != "object" || Array.isArray(l[N]) ? (Array.isArray(l[N]) ? l[N].push({}) : l[N] = [l[N], {}], l = l[N][l[N].length - 1]) : l = l[N];
      });
      const i = lt(r[r.length - 1]), d = E(r.join("."), u.arrays), p = Array.isArray(f);
      let m = g["duplicate-arguments-array"];
      !m && E(i, u.nargs) && (m = !0, (!G(l[i]) && u.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === u.nargs[i]) && (l[i] = void 0)), f === Ge() ? l[i] = Ge(l[i]) : Array.isArray(l[i]) ? m && d && p ? l[i] = g["flatten-duplicate-arrays"] ? l[i].concat(f) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([f]) : !m && !!d == !!p ? l[i] = f : l[i] = l[i].concat([f]) : l[i] === void 0 && d ? l[i] = p ? f : [f] : m && !(l[i] === void 0 || E(i, u.counts) || E(i, u.bools)) ? l[i] = [l[i], f] : l[i] = f;
    }
    function Wt(...o) {
      o.forEach(function(r) {
        Object.keys(r || {}).forEach(function(f) {
          u.aliases[f] || (u.aliases[f] = [].concat(h[f] || []), u.aliases[f].concat(f).forEach(function(l) {
            if (/-/.test(l) && g["camel-case-expansion"]) {
              const i = se(l);
              i !== f && u.aliases[f].indexOf(i) === -1 && (u.aliases[f].push(i), je[i] = !0);
            }
          }), u.aliases[f].concat(f).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && g["camel-case-expansion"]) {
              const i = Et(l, "-");
              i !== f && u.aliases[f].indexOf(i) === -1 && (u.aliases[f].push(i), je[i] = !0);
            }
          }), u.aliases[f].forEach(function(l) {
            u.aliases[l] = [f].concat(u.aliases[f].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function E(o, r) {
      const f = [].concat(u.aliases[o] || [], o), l = Object.keys(r), i = f.find((d) => l.includes(d));
      return i ? r[i] : !1;
    }
    function ct(o) {
      const r = Object.keys(u);
      return [].concat(r.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(o) : l[o];
      });
    }
    function It(o, ...r) {
      return [].concat(...r).some(function(l) {
        const i = o.match(l);
        return i && ct(i[1]);
      });
    }
    function Pt(o) {
      if (o.match(U) || !o.match(/^-[^-]+/))
        return !1;
      let r = !0, f;
      const l = o.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (f = o.slice(i + 2), !ct(l[i])) {
          r = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || f === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(f) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return r;
    }
    function We(o) {
      return g["unknown-options-as-args"] && Bt(o);
    }
    function Bt(o) {
      return o = o.replace(/^-{3,}/, "--"), o.match(U) || Pt(o) ? !1 : !It(o, /^-+([^=]+?)=[\s\S]*$/, Me, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function k(o) {
      return !E(o, u.bools) && !E(o, u.counts) && `${o}` in A ? A[o] : zt(Mt(o));
    }
    function zt(o) {
      return {
        [B.BOOLEAN]: !0,
        [B.STRING]: "",
        [B.NUMBER]: void 0,
        [B.ARRAY]: []
      }[o];
    }
    function Mt(o) {
      let r = B.BOOLEAN;
      return E(o, u.strings) ? r = B.STRING : E(o, u.numbers) ? r = B.NUMBER : E(o, u.bools) ? r = B.BOOLEAN : E(o, u.arrays) && (r = B.ARRAY), r;
    }
    function G(o) {
      return o === void 0;
    }
    function Vt() {
      Object.keys(u.counts).find((o) => E(o, u.arrays) ? (I = Error(H("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : E(o, u.nargs) ? (I = Error(H("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(ot, x),
      configuration: g,
      defaulted: Object.assign({}, nt),
      error: I,
      newAliases: Object.assign({}, je)
    };
  }
}
function cn(e) {
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
    c = c.filter(function(h, g, A) {
      return A.indexOf(h) === g;
    });
    const a = c.pop();
    a !== void 0 && typeof a == "string" && (n[a] = c);
  }), n;
}
function Ge(e) {
  return e !== void 0 ? e + 1 : 1;
}
function lt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function ln(e) {
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
var qe, Ze, Ke;
const at = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, ut = (Ze = (qe = process == null ? void 0 : process.versions) === null || qe === void 0 ? void 0 : qe.node) !== null && Ze !== void 0 ? Ze : (Ke = process == null ? void 0 : process.version) === null || Ke === void 0 ? void 0 : Ke.slice(1);
if (ut && Number(ut.match(/^([^.]+)/)[1]) < at)
  throw Error(`yargs parser supports a minimum Node.js version of ${at}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const an = process ? process.env : {}, Ct = new rn({
  cwd: process.cwd,
  env: () => an,
  format: $t,
  normalize: Gt,
  resolve: ee,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(tt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Ne = function(t, n) {
  return Ct.parse(t.slice(), n).argv;
};
Ne.detailed = function(e, t) {
  return Ct.parse(e.slice(), t);
};
Ne.camelCase = se;
Ne.decamelize = Et;
Ne.looksLikeNumber = At;
const un = {
  right: mn,
  center: $n
}, fn = 0, Ie = 1, hn = 2, Pe = 3;
class pn {
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
        const { width: A } = t[g], R = this.negatePadding(t[g]);
        let S = h;
        if (R > T.stringWidth(h) && (S += " ".repeat(R - T.stringWidth(h))), t[g].align && t[g].align !== "left" && this.wrap) {
          const Y = un[t[g].align];
          S = Y(S, R), T.stringWidth(S) < R && (S += " ".repeat((A || 0) - T.stringWidth(S) - 1));
        }
        const D = t[g].padding || [0, 0, 0, 0];
        D[Pe] && (a += " ".repeat(D[Pe])), a += ft(t[g], S, "| "), a += S, a += ft(t[g], S, " |"), D[Ie] && (a += " ".repeat(D[Ie])), c === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
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
`), a.border && (c.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), c.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (c.unshift(...new Array(a.padding[fn] || 0).fill("")), c.push(...new Array(a.padding[hn] || 0).fill(""))), c.forEach((g, A) => {
        n[A] || n.push([]);
        const R = n[A];
        for (let S = 0; S < h; S++)
          R[S] === void 0 && R.push("");
        R.push(g);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Pe] || 0) + (t.padding[Ie] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((h) => h.width || T.stringWidth(h.text));
    let n = t.length, s = this.width;
    const c = t.map((h) => {
      if (h.width)
        return n--, s -= h.width, h.width;
    }), a = n ? Math.floor(s / n) : 0;
    return c.map((h, g) => h === void 0 ? Math.max(a, gn(t[g])) : h);
  }
}
function ft(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function gn(e) {
  const t = e.padding || [], n = 1 + (t[Pe] || 0) + (t[Ie] || 0);
  return e.border ? n + 4 : n;
}
function dn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function mn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function $n(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function bn(e, t) {
  return T = t, new pn({
    width: e?.width || dn(),
    wrap: e?.wrap
  });
}
const _t = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function vt(e) {
  return e.replace(_t, "");
}
function yn(e, t) {
  const [n, s] = e.match(_t) || ["", ""];
  e = vt(e);
  let c = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (c += `
`), c += e.charAt(a);
  return n && s && (c = `${n}${c}${s}`), c;
}
function En(e) {
  return bn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: vt,
    wrap: yn
  });
}
function An(e, t) {
  let n = ee(".", e), s;
  for (bt(n).isDirectory() || (n = Qe(n)); ; ) {
    if (s = t(n, Qt(n)), s)
      return ee(n, s);
    if (n = Qe(s = n), s === n)
      break;
  }
}
const Cn = {
  fs: {
    readFileSync: tt,
    writeFile: Xt
  },
  format: $t,
  resolve: ee,
  exists: (e) => {
    try {
      return bt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let P;
class _n {
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
    })) : s(), P.format.apply(P.format, [this.cache[this.locale][n] || n].concat(t));
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
    return ~h.indexOf("%d") && g.push(c), P.format.apply(P.format, g.concat(t));
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
    P.fs.writeFile(h, g, "utf-8", function(A) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(A);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      P.fs.readFileSync && (t = JSON.parse(P.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = P.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const c = P.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(c) && (s = c);
    }
    return s;
  }
  _fileExistsSync(t) {
    return P.exists(t);
  }
}
function vn(e, t) {
  P = t;
  const n = new _n(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const wn = (e) => vn(e, Cn), Sn = "require is not supported by ESM", ht = "loading a directory of commands is not supported yet for ESM";
let Oe;
try {
  Oe = kt(import.meta.url);
} catch {
  Oe = process.cwd();
}
const xn = Oe.substring(0, Oe.lastIndexOf("node_modules"));
Yt, Ht, Dt, xn || process.cwd(), qt, Qe, Zt, Kt, ee, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, tt, wn({
  directory: ee(Oe, "../../../locales"),
  updateFiles: !1
});
const Ye = "\x1B[44m", C = "\x1B[43m", j = "\x1B[41m", On = "\x1B[42m", y = "\x1B[0m", v = "\x1B[33m", w = "\x1B[36m", $ = "\x1B[0m", He = 100, ie = [], Nn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > He && ie.push({ fileName: t, scriptLength: n.length });
}, jn = () => (ie.length > 0 && (console.log(
  `
${w}rrd${$} ${j}Long <script> blocks${y} in ${ie.length} files.`
), console.log(
  `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${He} lines.${$}`
), ie.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.scriptLength > He * 2 ? j : C}(${e.scriptLength} lines)${y}`
  );
})), ie.length), re = [], Fn = (e, t) => {
  !e || !e.setup || re.push(t);
}, Rn = () => (re.length > 0 && (console.log(
  `
${w}rrd${$} ${C}Plain <script> blocks${y} in ${re.length} files.`
), console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${$}`), re.forEach((e) => {
  console.log(`- ${e}`);
})), re.length), Ln = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return Ln.test(t) ? t : `(?:${t})`;
}
const Tn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Wn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(Tn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => b(`${e}${Z(...n)}`), {
      referenceTo: (n) => b(`${e}\\k<${n}>`)
    }),
    or: (...n) => b(`(?:${e}|${Z(...n)})`),
    after: (...n) => b(`(?<=${Z(...n)})${e}`),
    before: (...n) => b(`${e}(?=${Z(...n)})`),
    notAfter: (...n) => b(`(?<!${Z(...n)})${e}`),
    notBefore: (...n) => b(`${e}(?!${Z(...n)})`),
    times: Object.assign((n) => b(`${X(e)}{${n}}`), {
      any: () => b(`${X(e)}*`),
      atLeast: (n) => b(`${X(e)}{${n},}`),
      atMost: (n) => b(`${X(e)}{0,${n}}`),
      between: (n, s) => b(`${X(e)}{${n},${s}}`)
    }),
    optionally: () => b(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Wn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const In = /[.*+?^${}()|[\]\\/]/g;
function pt(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function z(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Pn = b(".");
b("\\b\\w+\\b");
const ze = b("\\w"), W = b("\\b");
b("\\d");
const Bn = b("\\s"), Se = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), wt = b("\\t"), zn = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function K(...e) {
  return b(`${X(Z(...e))}?`);
}
function Z(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(In, "\\$&") : t).join("")
  );
}
function O(...e) {
  return b(`${X(Z(...e))}+`);
}
const M = "i", V = "g", F = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(Z(...e).toString(), [...t || ""].join(""));
}, ce = [], Mn = (e, t) => {
  if (!e)
    return;
  const n = F(W, "else", W, [V, M]), s = e.content.match(n);
  s?.length && ce.push({ fileName: t, elseCount: s.length });
}, Vn = () => (ce.length > 0 && (console.log(
  `
${w}rrd${$} ${C}else conditions${y} are used in ${ce.length} files.`
), console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${$}`), ce.forEach((e) => {
  console.log(`- ${e.fileName} ${C}(${e.elseCount})${y}`);
})), ce.length), Un = 5, Dn = 10, le = [], Gn = (e, t) => {
  if (!e)
    return;
  const n = F(W, "if", W, [V, M]), s = F(W, "else", W, [V, M]), c = F(W, "for", W, [V, M]), a = F(W, "while", W, [V, M]), h = F(W, "case", W, [V, M]), g = e.content.match(n), A = e.content.match(s), R = e.content.match(c), S = e.content.match(a), D = e.content.match(h), Y = (g?.length || 0) + (A?.length || 0) + (R?.length || 0) + (S?.length || 0) + (D?.length || 0);
  Y > Un && le.push({ fileName: t, cyclomaticComplexity: Y });
}, qn = () => (le.length > 0 && (console.log(
  `
${w}rrd${$} ${Ye}cyclomaticComplexity${y} is above moderate in ${le.length} files.`
), console.log(`👉 ${v}Try to reduce complexity.${$}`), le.forEach((e) => {
  console.log(
    `- ${e.fileName} ${e.cyclomaticComplexity > Dn ? j : C}(${e.cyclomaticComplexity})${y}`
  );
})), le.length), ae = [], Zn = (e) => {
  if (e.includes("pages"))
    return;
  const t = et.basename(e);
  if (t === "App.vue")
    return;
  const n = F(Se.uppercase);
  t.slice(1).match(n)?.length || ae.push({ filePath: e });
}, Kn = () => (ae.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}single name component${y} is used in ${ae.length} files.`
), console.log(
  `👉 ${v}Rename the component to use multi-word name.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`
), ae.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ae.length), ue = [], Qn = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || ue.push({ filePath: t });
  });
}, Xn = () => (ue.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}Global style ${y} is used in ${ue.length} files.`
), console.log(
  `👉 ${v}Use <style scoped>.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`
), ue.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), ue.length), fe = [], Yn = (e, t) => {
  if (!e)
    return;
  const n = F("defineProps([", [V, M]);
  e.content.match(n)?.length && fe.push({ filePath: t });
}, Hn = () => (fe.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}simple prop${y} is used in ${fe.length} files.`
), console.log(
  `👉 ${v}Add at least type definition.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`
), fe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), fe.length), he = [], kn = (e, t) => {
  if (!e)
    return;
  const n = F(
    "<",
    O(z(">")),
    " v-if",
    O(z(">")),
    " v-for",
    O(z(">")),
    ">",
    [V, M]
  ), s = F(
    "<",
    O(z(">")),
    " v-for",
    O(z(">")),
    " v-if",
    O(z(">")),
    ">",
    [V, M]
  ), c = e.content.match(n), a = e.content.match(s);
  (c?.length || a?.length) && he.push({ filePath: t });
}, Jn = () => (he.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}v-if used with v-for${y} in ${he.length} files.`
), console.log(
  `👉 ${v}Move out the v-if to a computed property.${$} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`
), he.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), he.length), pe = [], eo = (e, t) => {
  if (!e)
    return;
  const n = F("<", O(z(">")), " v-for", O(z(">")), ">", [
    V,
    M
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || pe.push({ filePath: t }));
}, to = () => (pe.length > 0 && (console.log(
  `
${w}vue-essential${$} ${j}v-for has no key${y} in ${pe.length} files.`
), console.log(
  `👉 ${v}Add a \`:key\` property to all v-for.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`
), pe.forEach((e) => {
  console.log(`- ${e.filePath} 🚨`);
})), pe.length), ge = [], no = (e) => {
  if (e.includes("pages/") || e.includes("layouts/"))
    return;
  const t = et.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), c = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(c);
  !s?.length && !a?.length && ge.push({ fileName: e });
}, oo = () => (ge.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}component name is not PascalCase and not kebab-case${y} in ${ge.length} files.`
), console.log(
  `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`
), ge.forEach((e) => {
  console.log(`- ${j}${e.fileName}${y}`);
})), ge.length), de = [], so = F(
  O(Se.lowercase).at.lineStart(),
  O(Se.uppercase, Se.lowercase.times.any().grouped()).at.lineEnd()
), io = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !so.test(a)).length && de.push({ filePath: t });
}, ro = () => (de.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}prop names are not camelCased${y} in ${de.length} files.`
), console.log(
  `👉 ${v}Rename the props to camelCase.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
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
function te(e, t) {
  return new Set(e.map((s) => s[t])).size;
}
const me = [], co = 40, lo = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    if (c.length > co) {
      const a = Q(e.content, c), h = c.split(`
`).at(0)?.trim() || "";
      me.push({
        filename: t,
        message: `${t}#${a} ${C}${h}${y}`
      });
    }
  });
}, ao = () => {
  if (me.length > 0) {
    const e = te(me, "filename");
    console.log(
      `
${w}vue-strong${$} ${j}Lengthy template expression${y} found in ${e} files.`
    ), console.log(
      `👉 ${v}Refactor the expression into a computed property.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    ), me.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return me.length;
}, $e = [], uo = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = F(
    "<",
    O(ze),
    K(O(pt(` 	
\r`))),
    O(z("/>")),
    K(O(pt(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), c = n.content.match(s);
  if (c === null)
    return;
  const a = F(":", O(ze), K(" "), "=", K(" "), z(`'"`), [
    "g"
  ]);
  c.forEach((h) => {
    if (!h.includes(":"))
      return;
    const g = h.match(a);
    if (g?.length) {
      const A = Q(e.source, h);
      $e.push({ message: `${t}#${A} ${C}${g}${y}` });
    }
  });
}, fo = () => ($e.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}Attribute value is not quoted${y} in ${$e.length} files.`
), console.log(
  `👉 ${v}Use quotes for attribute values.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
), $e.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), $e.length), be = [], ho = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = F(
    "<",
    O(Se.uppercase, ze),
    K(zn, wt),
    K(O(z(">"))),
    "></",
    O(ze),
    ">",
    ["g"]
  ), c = n.content.match(s);
  c !== null && c.forEach((a) => {
    const h = Q(e.source, a), g = a.split(`
`).at(-1)?.trim() || "";
    be.push({ message: `${t}#${h} ${C}${g}${y}` });
  });
}, po = () => (be.length > 0 && (console.log(
  `
${w}vue-strong${$} - ${j}Component is not self closing${y} in ${be.length} files.`
), console.log(
  `👉 ${v}Components with no content should be self-closing.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
), be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), be.length), Be = [], ke = [], go = ["v-slot", "v-bind", "v-on"], mo = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  go.forEach((s) => {
    if (n.content.includes(`${s}:`)) {
      const c = Q(e.source, s);
      Be.push({ message: `${t}:${c} ${C}${s}${y}` }), ke.some((a) => a.filePath === t) || ke.push({ filePath: t });
    }
  });
}, $o = () => (Be.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}Directive shorthands not used${y} in ${ke.length} files.`
), console.log(
  `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
), Be.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Be.length), ye = [], bo = 5, yo = (e, t) => {
  if (!e)
    return;
  const n = F("defineProps", K("<"), K("("), "{", O(Pn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const c = s[0].split(",").length;
    c > bo && ye.push({ fileName: t, propsCount: c });
  }
}, Eo = () => (ye.length > 0 && (console.log(
  `
${w}rrd${$} ${C}too many props${y} are used in ${ye.length} files.`
), console.log(`👉 ${v}Try to refactor your code to use less properties.${$}`), ye.forEach((e) => {
  console.log(`- ${e.fileName} ${C}(${e.propsCount})${y}`);
})), ye.length), Ee = [], St = 20, Ao = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}|const\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{([^{}]*(([^{}]*{[^{}]*}[^{}]*)*[^{}]*))}/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1] || s[5];
    (s[2] || s[6]).split(`
`).length > St && Ee.push({ filename: t, funcName: c });
  }
}, Co = () => {
  if (Ee.length > 0) {
    const e = te(Ee, "filename");
    console.log(
      `
${w}rrd${$} ${C}function size${y} exceeds recommended limit in ${e} files.`
    ), console.log(`👉 ${v}Functions must be shorter than ${St} lines${$}`), Ee.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${C}(${t.funcName})${y}`);
    });
  }
  return Ee.length;
}, Ae = [], xt = 3, gt = (e, t, n) => {
  const s = t.split(",").map((c) => c.trim()).filter((c) => c.length > 0);
  s.length > xt && Ae.push({ filename: n, funcName: e, paramsCount: s.length });
}, _o = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*{|const\s+([a-zA-Z0-9_$]+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? gt(s[1], s[2], t) : s[3] && gt(s[3], s[4], t);
}, vo = () => (Ae.length > 0 && (console.log(
  `
${w}rrd${$} ${C}parameter count${y} exceeds recommended limit in ${Ae.length} files.`
), console.log(`👉 ${v}Max number of function parameters should be ${xt}${$}`), Ae.forEach((e) => {
  console.log(
    `- ${C}${e.funcName}${y} in file ${e.filename} 🚨 ${C}(${e.paramsCount})${y}`
  );
})), Ae.length), Ot = 4, Ce = [], wo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const c = s[1];
    c.length < Ot && Ce.push({ filename: t, variable: c });
  }
}, So = () => {
  if (Ce.length > 0) {
    const e = te(Ce, "filename");
    console.log(`
${w}rrd${$} ${C}variable names${y} are too short in ${e} files.`), console.log(`👉 ${v}Variable names must have a minimum length of ${Ot}${$}`), Ce.forEach((t) => {
      console.log(`- ${t.filename} 🚨 ${C}(${t.variable})${y}`);
    });
  }
  return Ce.length;
}, Je = [], xe = [], xo = 5, Oo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((c) => {
    if (c.split(`
`).length > xo) {
      const a = c.split(`
`)[0], h = Q(e.content, a);
      Je.push({ message: `${t}:${h} ${C}computed${y}` }), xe.push({ filePath: t }), xe.some((g) => g.filePath === t) || xe.push({ filePath: t });
    }
  });
}, No = () => (xe.length > 0 && (console.log(
  `
${w}vue-strong${$} ${j}complicated computed property ${y} in ${xe.length} files.`
), console.log(
  `👉 ${v}Refactor the computed properties to smaller ones.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
), Je.forEach((e) => {
  console.log(`- ${e.message} 🚨`);
})), Je.length), _e = [], jo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((c) => c[1].trim()).forEach((c) => {
    const a = Q(e.content.trim(), c), h = c.split(`
`).at(0)?.trim() || "";
    _e.push({ filename: t, message: `${t}#${a} ${C}(${h})${y}` });
  });
}, Fo = () => {
  if (_e.length > 0) {
    const e = te(_e, "filename");
    console.log(`
${w}vue-strong${$} ${j}component files${y} detected in ${e} files.`), console.log(
      `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`
    ), _e.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return _e.length;
}, J = [], Ro = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, c = /\$parent|getCurrentInstance/g, a = e.content.match(n), h = e.content.match(s);
  if (h) {
    const A = h[1].split(".")[0], R = a ? a[1] : "";
    if (R.includes(A)) {
      const S = Q(e.content.trim(), R);
      J.push({
        filename: t,
        message: `${t}#${S} ${C}(${A})${y}`
      });
    }
  }
  const g = e.content.match(c);
  if (g) {
    const A = Q(e.content.trim(), g[0]);
    J.push({
      filename: t,
      message: `${t}#${A} ${C}(${g[0]})${y}`
    });
  }
}, Lo = () => {
  if (J.length > 0) {
    const e = te(
      J,
      "filename"
    );
    console.log(
      `
${w}vue-caution${$} ${C}implicit parent-child communication${y} detected in ${e} files.`
    ), console.log(
      `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${$} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`
    ), J.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return J.length;
}, ve = [], dt = 5, To = 3, Wo = (e, t) => {
  if (!e)
    return;
  const n = F(wt.times.atLeast(dt).or(Bn.times.atLeast(To * dt)), [
    V,
    M
  ]);
  e.content.match(n)?.forEach((c) => {
    const a = Q(e.content, c);
    ve.push({
      filePath: t,
      message: `${t}#${a} ${C}indentation: ${c.length}${y}`
    });
  });
}, Io = () => {
  if (ve.length > 0) {
    const e = te(ve, "filePath");
    console.log(`
${w}rrd${$} ${C}deep indentation${y} found in ${e} files.`), console.log(
      `👉 ${v}Try to refactor your component to child components, to avoid deep indentations..${$}`
    ), ve.forEach((t) => {
      console.log(`- ${t.message} 🚨`);
    });
  }
  return ve.length;
}, Po = () => {
  let e = 0;
  return e += Kn(), e += Hn(), e += to(), e += Jn(), e += Xn(), e += oo(), e += po(), e += ro(), e += ao(), e += fo(), e += $o(), e += No(), e += Fo(), e += Lo(), e += qn(), e += Io(), e += Vn(), e += Co(), e += vo(), e += Rn(), e += jn(), e += So(), e += Eo(), e;
}, Bo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  n.includes("vue-essential") || (Zn(t), Yn(s, t), Qn(e.styles, t), eo(e.template, t), kn(e.template, t)), n.includes("vue-strong") || (no(t), io(s, t), jo(s, t), Oo(s, t), ho(e, t), lo(e.template, t), uo(e, t), mo(e, t)), n.includes("vue-caution") || Ro(s, t), n.includes("rrd") || (Gn(s, t), Wo(s, t), Mn(s, t), Ao(s, t), _o(s, t), Fn(e.script, t), Nn(s, t), wo(s, t), yo(s, t));
};
let Nt = 0;
const zo = [
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
], jt = (e, t) => {
  const n = Xe.readdirSync(e);
  Nt += n.length;
  for (const s of n) {
    const c = et.join(e, s);
    Xe.statSync(c).isDirectory() ? zo.some((a) => c.includes(a)) && jt(c, t) : s.endsWith(".vue") && t(c);
  }
}, Mo = (e, t = []) => {
  console.log(`

${Ye}Analyzing Vue files in ${e}${y}`), jt(e, (n) => {
    if (n.includes("App.vue") || n.includes("app.vue"))
      return;
    const s = Xe.readFileSync(n, "utf-8"), { descriptor: c } = Jt(s);
    Bo(c, n, t);
  }), console.log(`Found ${Ye}${Nt}${y} Vue files`), Po() || console.log(`${On}No code smells detected!${y}`);
}, Vo = {
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
    "templateSimpleExpression"
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
}, mt = Object.keys(Vo);
Ut(nn(process.argv)).command(
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
      const n = t.split(","), s = n.filter((c) => !mt.includes(c));
      return s.length > 0 && (console.error(
        `
${j}Invalid ignore values: ${s.join(
          ", "
        )}${y}. 
${v}Allowed values are: ${[...mt].join(", ")}${$}

`
      ), process.exit(1)), n;
    }
  }),
  (e) => {
    Mo(e.path, e.ignore);
  }
).help().argv;
