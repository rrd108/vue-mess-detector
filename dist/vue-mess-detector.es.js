import sn from "yargs";
import { format as jt, inspect as on } from "util";
import { normalize as rn, resolve as se, dirname as Re, basename as cn, extname as an, relative as ln } from "path";
import { readFileSync as ft, statSync as Rt, readdirSync as un, writeFile as fn } from "fs";
import { notStrictEqual as hn, strictEqual as pn } from "assert";
import { fileURLToPath as mn } from "url";
import xe from "node:fs/promises";
import ht from "node:path";
import { parse as dn } from "@vue/compiler-sfc";
class ce extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ce);
  }
}
function Pt() {
  return gn() ? 0 : 1;
}
function gn() {
  return $n() && !process.defaultApp;
}
function $n() {
  return !!process.versions.electron;
}
function bn(e) {
  return e.slice(Pt() + 1);
}
function yn() {
  return process.argv[Pt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ie(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const r = e.match(/^-+/);
    for (let a = r ? r[0].length : 0; a < e.length; a++) {
      let u = e.charAt(a);
      s && (s = !1, u = u.toUpperCase()), a !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function Lt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let r = 0; r < e.length; r++) {
    const a = n.charAt(r), u = e.charAt(r);
    a !== u && r > 0 ? s += `${t}${n.charAt(r)}` : s += u;
  }
  return s;
}
function Ft(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function En(e) {
  if (Array.isArray(e))
    return e.map((u) => typeof u != "string" ? u + "" : u);
  e = e.trim();
  let t = 0, n = null, s = null, r = null;
  const a = [];
  for (let u = 0; u < e.length; u++) {
    if (n = s, s = e.charAt(u), s === " " && !r) {
      n !== " " && t++;
      continue;
    }
    s === r ? r = null : (s === "'" || s === '"') && !r && (r = s), a[t] || (a[t] = ""), a[t] += s;
  }
  return a;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var V;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(V || (V = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let X;
class wn {
  constructor(t) {
    X = t;
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
    }, n), r = En(t), a = typeof t == "string", u = vn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), $ = Object.assign(/* @__PURE__ */ Object.create(null), s.default), v = s.configObjects || [], x = s.envPrefix, L = h["populate--"], M = L ? "--" : "_", he = /* @__PURE__ */ Object.create(null), pt = /* @__PURE__ */ Object.create(null), ee = s.__ || X.format, f = {
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
    }, q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ve = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(o) {
      const c = typeof o == "object" ? o.key : o, p = Object.keys(o).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      p && (f[p][c] = !0), f.arrays[c] = !0, f.keys.push(c);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(o) {
      f.bools[o] = !0, f.keys.push(o);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(o) {
      f.strings[o] = !0, f.keys.push(o);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(o) {
      f.numbers[o] = !0, f.keys.push(o);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(o) {
      f.counts[o] = !0, f.keys.push(o);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(o) {
      f.normalize[o] = !0, f.keys.push(o);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([o, c]) => {
      typeof c == "number" && (f.nargs[o] = c, f.keys.push(o));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([o, c]) => {
      typeof c == "function" && (f.coercions[o] = c, f.keys.push(o));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(o) {
      f.configs[o] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([o, c]) => {
      (typeof c == "boolean" || typeof c == "function") && (f.configs[o] = c);
    })), Xt(s.key, u, s.default, f.arrays), Object.keys($).forEach(function(o) {
      (f.aliases[o] || []).forEach(function(c) {
        $[c] = $[o];
      });
    });
    let U = null;
    nn();
    let pe = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), mt = {};
    for (let o = 0; o < r.length; o++) {
      const c = r[o], p = c.replace(/^-{3,}/, "---");
      let l, i, g, m, b, R;
      if (c !== "--" && /^-/.test(c) && $e(c))
        Ae(c);
      else if (p.match(/^---+(=|$)/)) {
        Ae(c);
        continue;
      } else if (c.match(/^--.+=/) || !h["short-option-groups"] && c.match(/^-.+=/))
        m = c.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], f.arrays) ? o = de(o, m[1], r, m[2]) : w(m[1], f.nargs) !== !1 ? o = me(o, m[1], r, m[2]) : _(m[1], m[2], !0));
      else if (c.match(ve) && h["boolean-negation"])
        m = c.match(ve), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], _(i, w(i, f.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !h["short-option-groups"] && c.match(/^-[^-]+/))
        m = c.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, f.arrays) ? o = de(o, i, r) : w(i, f.nargs) !== !1 ? o = me(o, i, r) : (b = r[o + 1], b !== void 0 && (!b.match(/^-/) || b.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test(b) ? (_(i, b), o++) : _(i, ne(i))));
      else if (c.match(/^-.\..+=/))
        m = c.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && _(m[1], m[2]);
      else if (c.match(/^-.\..+/) && !c.match(q))
        b = r[o + 1], m = c.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], b !== void 0 && !b.match(/^-/) && !w(i, f.bools) && !w(i, f.counts) ? (_(i, b), o++) : _(i, ne(i)));
      else if (c.match(/^-[^-]+/) && !c.match(q)) {
        g = c.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < g.length; F++) {
          if (b = c.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = c.slice(F + 3), i = g[F], w(i, f.arrays) ? o = de(o, i, r, R) : w(i, f.nargs) !== !1 ? o = me(o, i, r, R) : _(i, R), l = !0;
            break;
          }
          if (b === "-") {
            _(g[F], b);
            continue;
          }
          if (/[A-Za-z]/.test(g[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) && w(b, f.bools) === !1) {
            _(g[F], b), l = !0;
            break;
          }
          if (g[F + 1] && g[F + 1].match(/\W/)) {
            _(g[F], b), l = !0;
            break;
          } else
            _(g[F], ne(g[F]));
        }
        i = c.slice(-1)[0], !l && i !== "-" && (w(i, f.arrays) ? o = de(o, i, r) : w(i, f.nargs) !== !1 ? o = me(o, i, r) : (b = r[o + 1], b !== void 0 && (!/^(-|--)[^-]/.test(b) || b.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test(b) ? (_(i, b), o++) : _(i, ne(i))));
      } else if (c.match(/^-[0-9]$/) && c.match(q) && w(c.slice(1), f.bools))
        i = c.slice(1), _(i, ne(i));
      else if (c === "--") {
        pe = r.slice(o + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        pe = r.slice(o);
        break;
      } else
        Ae(c);
    }
    gt(j, !0), gt(j, !1), qt(j), Ht(), $t(j, f.aliases, $, !0), Kt(j), h["set-placeholder-key"] && Qt(j), Object.keys(f.counts).forEach(function(o) {
      oe(j, o.split(".")) || _(o, 0);
    }), L && pe.length && (j[M] = []), pe.forEach(function(o) {
      j[M].push(o);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete j[o];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((o) => u[o])).forEach((o) => {
      h["camel-case-expansion"] && o.includes("-") && delete j[o.split(".").map((c) => ie(c)).join(".")], delete j[o];
    });
    function Ae(o) {
      const c = ge("_", o);
      (typeof c == "string" || typeof c == "number") && j._.push(c);
    }
    function me(o, c, p, l) {
      let i, g = w(c, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return Q(l) || (U = Error(ee("Argument unexpected for: %s", c))), _(c, ne(c)), o;
      let m = Q(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (o + 1) + m < g && (U = Error(ee("Not enough arguments following: %s", c))), m = g;
      else {
        for (i = o + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(q) || $e(p[i])); i++)
          m++;
        m < g && (U = Error(ee("Not enough arguments following: %s", c)));
      }
      let b = Math.min(m, g);
      for (!Q(l) && b > 0 && (_(c, l), b--), i = o + 1; i < b + o + 1; i++)
        _(c, p[i]);
      return o + b;
    }
    function de(o, c, p, l) {
      let i = [], g = l || p[o + 1];
      const m = w(c, f.nargs);
      if (w(c, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (Q(g) || Q(l) && /^-/.test(g) && !q.test(g) && !$e(g)) {
        if ($[c] !== void 0) {
          const b = $[c];
          i = Array.isArray(b) ? b : [b];
        }
      } else {
        Q(l) || i.push(Ce(c, l, !0));
        for (let b = o + 1; b < p.length && !(!h["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || (g = p[b], /^-/.test(g) && !q.test(g) && !$e(g))); b++)
          o = b, i.push(Ce(c, g, a));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (U = Error(ee("Not enough arguments following: %s", c))), _(c, i), o;
    }
    function _(o, c, p = a) {
      if (/-/.test(o) && h["camel-case-expansion"]) {
        const g = o.split(".").map(function(m) {
          return ie(m);
        }).join(".");
        dt(o, g);
      }
      const l = Ce(o, c, p), i = o.split(".");
      re(j, i, l), f.aliases[o] && f.aliases[o].forEach(function(g) {
        const m = g.split(".");
        re(j, m, l);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let m = g.split(".");
        const b = [].concat(i);
        b.shift(), m = m.concat(b), (f.aliases[o] || []).includes(m.join(".")) || re(j, m, l);
      }), w(o, f.normalize) && !w(o, f.arrays) && [o].concat(f.aliases[o] || []).forEach(function(m) {
        Object.defineProperty(mt, m, {
          enumerable: !0,
          get() {
            return c;
          },
          set(b) {
            c = typeof b == "string" ? X.normalize(b) : b;
          }
        });
      });
    }
    function dt(o, c) {
      f.aliases[o] && f.aliases[o].length || (f.aliases[o] = [c], he[c] = !0), f.aliases[c] && f.aliases[c].length || dt(c, o);
    }
    function Ce(o, c, p) {
      p && (c = An(c)), (w(o, f.bools) || w(o, f.counts)) && typeof c == "string" && (c = c === "true");
      let l = Array.isArray(c) ? c.map(function(i) {
        return ge(o, i);
      }) : ge(o, c);
      return w(o, f.counts) && (Q(l) || typeof l == "boolean") && (l = Oe()), w(o, f.normalize) && w(o, f.arrays) && (Array.isArray(c) ? l = c.map((i) => X.normalize(i)) : l = X.normalize(c)), l;
    }
    function ge(o, c) {
      return !h["parse-positional-numbers"] && o === "_" || !w(o, f.strings) && !w(o, f.bools) && !Array.isArray(c) && (Ft(c) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !Q(c) && w(o, f.numbers)) && (c = Number(c)), c;
    }
    function qt(o) {
      const c = /* @__PURE__ */ Object.create(null);
      $t(c, f.aliases, $), Object.keys(f.configs).forEach(function(p) {
        const l = o[p] || c[p];
        if (l)
          try {
            let i = null;
            const g = X.resolve(X.cwd(), l), m = f.configs[p];
            if (typeof m == "function") {
              try {
                i = m(g);
              } catch (b) {
                i = b;
              }
              if (i instanceof Error) {
                U = i;
                return;
              }
            } else
              i = X.require(g);
            Se(i);
          } catch (i) {
            i.name === "PermissionDenied" ? U = i : o[p] && (U = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Se(o, c) {
      Object.keys(o).forEach(function(p) {
        const l = o[p], i = c ? c + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? Se(l, i) : (!oe(j, i.split(".")) || w(i, f.arrays) && h["combine-arrays"]) && _(i, l);
      });
    }
    function Ht() {
      typeof v < "u" && v.forEach(function(o) {
        Se(o);
      });
    }
    function gt(o, c) {
      if (typeof x > "u")
        return;
      const p = typeof x == "string" ? x : "", l = X.env();
      Object.keys(l).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const g = i.split("__").map(function(m, b) {
            return b === 0 && (m = m.substring(p.length)), ie(m);
          });
          (c && f.configs[g.join(".")] || !c) && !oe(o, g) && _(g.join("."), l[i]);
        }
      });
    }
    function Kt(o) {
      let c;
      const p = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(l) {
        if (!p.has(l) && (c = w(l, f.coercions), typeof c == "function"))
          try {
            const i = ge(l, c(o[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              p.add(g), o[g] = i;
            });
          } catch (i) {
            U = i;
          }
      });
    }
    function Qt(o) {
      return f.keys.forEach((c) => {
        ~c.indexOf(".") || typeof o[c] > "u" && (o[c] = void 0);
      }), o;
    }
    function $t(o, c, p, l = !1) {
      Object.keys(p).forEach(function(i) {
        oe(o, i.split(".")) || (re(o, i.split("."), p[i]), l && (pt[i] = !0), (c[i] || []).forEach(function(g) {
          oe(o, g.split(".")) || re(o, g.split("."), p[i]);
        }));
      });
    }
    function oe(o, c) {
      let p = o;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const l = c[c.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function re(o, c, p) {
      let l = o;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = yt(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const i = yt(c[c.length - 1]), g = w(c.join("."), f.arrays), m = Array.isArray(p);
      let b = h["duplicate-arguments-array"];
      !b && w(i, f.nargs) && (b = !0, (!Q(l[i]) && f.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === f.nargs[i]) && (l[i] = void 0)), p === Oe() ? l[i] = Oe(l[i]) : Array.isArray(l[i]) ? b && g && m ? l[i] = h["flatten-duplicate-arrays"] ? l[i].concat(p) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([p]) : !b && !!g == !!m ? l[i] = p : l[i] = l[i].concat([p]) : l[i] === void 0 && g ? l[i] = m ? p : [p] : b && !(l[i] === void 0 || w(i, f.counts) || w(i, f.bools)) ? l[i] = [l[i], p] : l[i] = p;
    }
    function Xt(...o) {
      o.forEach(function(c) {
        Object.keys(c || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const i = ie(l);
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const i = Lt(l, "-");
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].forEach(function(l) {
            f.aliases[l] = [p].concat(f.aliases[p].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function w(o, c) {
      const p = [].concat(f.aliases[o] || [], o), l = Object.keys(c), i = p.find((g) => l.includes(g));
      return i ? c[i] : !1;
    }
    function bt(o) {
      const c = Object.keys(f);
      return [].concat(c.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(o) : l[o];
      });
    }
    function Yt(o, ...c) {
      return [].concat(...c).some(function(l) {
        const i = o.match(l);
        return i && bt(i[1]);
      });
    }
    function Zt(o) {
      if (o.match(q) || !o.match(/^-[^-]+/))
        return !1;
      let c = !0, p;
      const l = o.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (p = o.slice(i + 2), !bt(l[i])) {
          c = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return c;
    }
    function $e(o) {
      return h["unknown-options-as-args"] && Jt(o);
    }
    function Jt(o) {
      return o = o.replace(/^-{3,}/, "--"), o.match(q) || Zt(o) ? !1 : !Yt(o, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ne(o) {
      return !w(o, f.bools) && !w(o, f.counts) && `${o}` in $ ? $[o] : en(tn(o));
    }
    function en(o) {
      return {
        [V.BOOLEAN]: !0,
        [V.STRING]: "",
        [V.NUMBER]: void 0,
        [V.ARRAY]: []
      }[o];
    }
    function tn(o) {
      let c = V.BOOLEAN;
      return w(o, f.strings) ? c = V.STRING : w(o, f.numbers) ? c = V.NUMBER : w(o, f.bools) ? c = V.BOOLEAN : w(o, f.arrays) && (c = V.ARRAY), c;
    }
    function Q(o) {
      return o === void 0;
    }
    function nn() {
      Object.keys(f.counts).find((o) => w(o, f.arrays) ? (U = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : w(o, f.nargs) ? (U = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(mt, j),
      configuration: h,
      defaulted: Object.assign({}, pt),
      error: U,
      newAliases: Object.assign({}, he)
    };
  }
}
function vn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(r) {
    t.push([].concat(e[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < t.length; r++)
      for (let a = r + 1; a < t.length; a++)
        if (t[r].filter(function(h) {
          return t[a].indexOf(h) !== -1;
        }).length) {
          t[r] = t[r].concat(t[a]), t.splice(a, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(r) {
    r = r.filter(function(u, h, $) {
      return $.indexOf(u) === h;
    });
    const a = r.pop();
    a !== void 0 && typeof a == "string" && (n[a] = r);
  }), n;
}
function Oe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function yt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function An(e) {
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
var _e, Ne, je;
const Et = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, wt = (Ne = (_e = process == null ? void 0 : process.versions) === null || _e === void 0 ? void 0 : _e.node) !== null && Ne !== void 0 ? Ne : (je = process == null ? void 0 : process.version) === null || je === void 0 ? void 0 : je.slice(1);
if (wt && Number(wt.match(/^([^.]+)/)[1]) < Et)
  throw Error(`yargs parser supports a minimum Node.js version of ${Et}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Cn = process ? process.env : {}, Tt = new wn({
  cwd: process.cwd,
  env: () => Cn,
  format: jt,
  normalize: rn,
  resolve: se,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(ft(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return Tt.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return Tt.parse(e.slice(), t);
};
fe.camelCase = ie;
fe.decamelize = Lt;
fe.looksLikeNumber = Ft;
const Sn = {
  right: Rn,
  center: Pn
}, xn = 0, be = 1, On = 2, ye = 3;
class _n {
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
`).map((r) => r.split("	"));
    let s = 0;
    return n.forEach((r) => {
      r.length > 1 && T.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), T.stringWidth(r[0])));
    }), n.forEach((r) => {
      this.div(...r.map((a, u) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: u === 0 && r.length > 1 ? s : void 0
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
    return this.rasterize(t).forEach((s, r) => {
      let a = "";
      s.forEach((u, h) => {
        const { width: $ } = t[h], v = this.negatePadding(t[h]);
        let x = u;
        if (v > T.stringWidth(u) && (x += " ".repeat(v - T.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const M = Sn[t[h].align];
          x = M(x, v), T.stringWidth(x) < v && (x += " ".repeat(($ || 0) - T.stringWidth(x) - 1));
        }
        const L = t[h].padding || [0, 0, 0, 0];
        L[ye] && (a += " ".repeat(L[ye])), a += vt(t[h], x, "| "), a += x, a += vt(t[h], x, " |"), L[be] && (a += " ".repeat(L[be])), r === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), r = s ? s[0].length : 0, a = n.text, u = T.stringWidth(a.trimRight());
    return n.span ? this.wrap ? r < u ? t : (n.hidden = !0, a.trimRight() + " ".repeat(r - u) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let r;
    return t.forEach((a, u) => {
      a.width = s[u], this.wrap ? r = T.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : r = a.text.split(`
`), a.border && (r.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (r.unshift(...new Array(a.padding[xn] || 0).fill("")), r.push(...new Array(a.padding[On] || 0).fill(""))), r.forEach((h, $) => {
        n[$] || n.push([]);
        const v = n[$];
        for (let x = 0; x < u; x++)
          v[x] === void 0 && v.push("");
        v.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[ye] || 0) + (t.padding[be] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((u) => u.width || T.stringWidth(u.text));
    let n = t.length, s = this.width;
    const r = t.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), a = n ? Math.floor(s / n) : 0;
    return r.map((u, h) => u === void 0 ? Math.max(a, Nn(t[h])) : u);
  }
}
function vt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Nn(e) {
  const t = e.padding || [], n = 1 + (t[ye] || 0) + (t[be] || 0);
  return e.border ? n + 4 : n;
}
function jn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Rn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Pn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Ln(e, t) {
  return T = t, new _n({
    width: e?.width || jn(),
    wrap: e?.wrap
  });
}
const Wt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function It(e) {
  return e.replace(Wt, "");
}
function Fn(e, t) {
  const [n, s] = e.match(Wt) || ["", ""];
  e = It(e);
  let r = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (r += `
`), r += e.charAt(a);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Tn(e) {
  return Ln(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: It,
    wrap: Fn
  });
}
function Wn(e, t) {
  let n = se(".", e), s;
  for (Rt(n).isDirectory() || (n = Re(n)); ; ) {
    if (s = t(n, un(n)), s)
      return se(n, s);
    if (n = Re(s = n), s === n)
      break;
  }
}
const In = {
  fs: {
    readFileSync: ft,
    writeFile: fn
  },
  format: jt,
  resolve: se,
  exists: (e) => {
    try {
      return Rt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let D;
class Mn {
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
    })) : s(), D.format.apply(D.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), r = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = r === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const h = [u];
    return ~u.indexOf("%d") && h.push(r), D.format.apply(D.format, h.concat(t));
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
    return t.forEach(function(r, a) {
      const u = n[a + 1];
      s += r, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, r = n.locale, a = n.cb, u = this._resolveLocaleFile(s, r), h = JSON.stringify(this.cache[r], null, 2);
    D.fs.writeFile(u, h, "utf-8", function($) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a($);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      D.fs.readFileSync && (t = JSON.parse(D.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = D.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const r = D.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(t) {
    return D.exists(t);
  }
}
function Bn(e, t) {
  D = t;
  const n = new Mn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const kn = (e) => Bn(e, In), zn = "require is not supported by ESM", At = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = mn(import.meta.url);
} catch {
  le = process.cwd();
}
const Un = le.substring(0, le.lastIndexOf("node_modules"));
hn, pn, on, Un || process.cwd(), cn, Re, an, ln, se, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ft, kn({
  directory: se(le, "../../../locales"),
  updateFiles: !1
});
const H = "\x1B[44m", C = "\x1B[43m", z = "\x1B[41m", Ct = "\x1B[42m", y = "\x1B[0m", A = "\x1B[33m", S = "\x1B[36m", d = "\x1B[0m", Dn = {
  "vue-caution": ["elementSelectorsWithScoped", "implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["elementAttributeOrder", "topLevelElementOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "fullWordComponentName",
    "multiAttributeElements",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression"
  ],
  rrd: [
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlLink",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps"
  ]
}, te = Object.keys(Dn), Pe = [], Le = 100, Vn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Le && Pe.push({ filePath: t, message: `${n.length > Le * 2 ? z : C}(${n.length} lines)${y}` });
}, Gn = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${A}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Le} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], qn = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${C}Plain <script> block${y} found` });
}, Hn = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${A} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Kn = /^(\(.*\)|\\?.)$/;
function Z(e) {
  const t = e.toString();
  return Kn.test(t) ? t : `(?:${t})`;
}
const Qn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Xn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(Qn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${B(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${B(...n)})`),
    after: (...n) => E(`(?<=${B(...n)})${e}`),
    before: (...n) => E(`${e}(?=${B(...n)})`),
    notAfter: (...n) => E(`(?<!${B(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${B(...n)})`),
    times: Object.assign((n) => E(`${Z(e)}{${n}}`), {
      any: () => E(`${Z(e)}*`),
      atLeast: (n) => E(`${Z(e)}{${n},}`),
      atMost: (n) => E(`${Z(e)}{0,${n}}`),
      between: (n, s) => E(`${Z(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${Z(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(Xn, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const Yn = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function I(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Zn(...e) {
  return E(`(?:${e.map((t) => B(t)).join("|")})`);
}
const Jn = E(".");
E("\\b\\w+\\b");
const J = E("\\w"), W = E("\\b"), es = E("\\d"), Y = E("\\s"), ae = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Mt = E("\\t"), Bt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function K(...e) {
  return E(`${Z(B(...e))}?`);
}
function B(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(Yn, "\\$&") : t).join("")
  );
}
function O(...e) {
  return E(`${Z(B(...e))}+`);
}
const k = "i", P = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(B(...e).toString(), [...t || ""].join(""));
}, Te = [], ts = (e, t) => {
  if (!e)
    return;
  const n = N(W, "else", W, [P, k]), s = e.content.match(n);
  s?.length && Te.push({ filePath: t, message: `else clauses found ${z}(${s.length})${y}` });
}, ns = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ else conditions${d}`,
      description: `👉 ${A}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], ss = 5, os = 10, rs = (e, t) => {
  if (!e)
    return;
  const n = N(W, "if", W, [P, k]), s = N(W, "else", W, [P, k]), r = N(W, "for", W, [P, k]), a = N(W, "while", W, [P, k]), u = N(W, "case", W, [P, k]), h = e.content.match(n), $ = e.content.match(s), v = e.content.match(r), x = e.content.match(a), L = e.content.match(u), M = (h?.length || 0) + ($?.length || 0) + (v?.length || 0) + (x?.length || 0) + (L?.length || 0);
  M > ss && We.push({ filePath: t, message: `${M > os ? z : C}(${M})${y}` });
}, is = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${A}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], cs = (e) => {
  if (e.includes("pages"))
    return;
  const t = ht.basename(e);
  if (t === "App.vue")
    return;
  const n = N(ae.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${C}single word${y}` });
}, as = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ single name component${d}`,
      description: `👉 ${A}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], ls = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Me.push({
      filePath: t,
      message: `${C}global style${y} used`
    });
  });
}, us = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ global style${d}`,
      description: `👉 ${A}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], fs = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [P, k]);
  e.content.match(n)?.length && Be.push({ filePath: t, message: `${C}Props type${y} not defined` });
}, hs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ simple prop${d}`,
      description: `👉 ${A}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, G = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, r = t.split(`
`).length;
  return s + r - 1;
}, ke = [], ps = (e, t) => {
  if (!e)
    return;
  const n = N(
    "<",
    O(I(">")),
    " v-if",
    O(I(">")),
    " v-for",
    O(I(">")),
    ">",
    [P, k]
  ), s = N(
    "<",
    O(I(">")),
    " v-for",
    O(I(">")),
    " v-if",
    O(I(">")),
    ">",
    [P, k]
  ), r = e.content.match(n), a = e.content.match(s);
  if (r?.length || a?.length) {
    const u = r?.length ? r[0] : a?.length ? a[0] : "", h = G(e.content, u);
    ke.push({ filePath: t, message: `line #${h} ${C}v-if used with v-for${y}` });
  }
}, ms = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${A}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ds = (e, t) => {
  if (!e)
    return;
  const n = N("<", O(I(">")), " v-for", O(I(">")), ">", [
    P,
    k
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${C}without a key${y}` }));
}, gs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${A}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], $s = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = ht.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(r);
  !s?.length && !a?.length && Ue.push({ filePath: e, message: `component name is ${C}not PascalCase, nor kebab-case.${y}` });
}, bs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${A}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], ys = N(
  O(ae.lowercase).at.lineStart(),
  O(ae.uppercase, ae.lowercase.times.any().grouped()).at.lineEnd()
), Es = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !ys.test(a)).length && De.push({ filePath: t, message: `prop names are ${C}not camelCased${y}` });
}, ws = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${A}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], vs = 40, As = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > vs) {
      const a = G(e.content, r), u = r.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${a} ${C}${u}${y}`
      });
    }
  });
}, Cs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${A}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ss = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    O(J),
    K(O(ue(` 	
\r`))),
    O(I("/>")),
    K(O(ue(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const a = N(":", O(J), K(" "), "=", K(" "), I(`'"`), [
    "g"
  ]);
  r?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(a);
    if (h?.length) {
      const $ = G(e.source, u);
      Ge.push({ filePath: t, message: `line #${$} ${C}${h}${y}` });
    }
  });
}, xs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${A}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Os = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    O(ae.uppercase, J),
    K(Bt, Mt),
    K(O(I(">"))),
    "></",
    O(J),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((a) => {
    const u = G(e.source, a), h = a.split(`
`).at(-1)?.trim() || "";
    qe.push({ filePath: t, message: `line #${u} ${C}${h}${y}` });
  });
}, _s = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${A}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], St = [], Ns = ["v-slot", "v-bind", "v-on"], js = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ns.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = G(e.source, s);
      He.push({ filePath: t, message: `line #${r} ${C}${s}${y}` }), St.some((a) => a.filePath === t) || St.push({ filePath: t });
    }
  });
}, Rs = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${A}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ps = 3, Ls = (e) => {
  const t = N(
    O(I("/")).grouped(),
    B(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = N(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), a = s.match(r);
    (!a || a.length < Ps) && Ke.push({ filePath: e, message: `${s} is not a ${C}full word.${y}` });
  }
}, Fs = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ full-word component names${d}`,
      description: `👉 ${A}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Ts = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), a = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: a }
  ].filter(($) => $.index !== -1);
  u.every(($, v) => v === 0 ? !0 : u[v - 1].index < $.index) || Qe.push({ filePath: t, message: `Top level elements are ${C}not following the correct order.${y}` });
}, Ws = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ top level element order${d}`,
      description: `👉 ${A}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], xt = [
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
], Is = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = s.exec(n)) !== null; ) {
    const u = a[1], h = a[2];
    if (h) {
      const v = Array.from(h.matchAll(r), (L) => L[1]).filter((L) => xt.includes(L));
      let x = -1;
      for (const L of v) {
        const M = xt.indexOf(L);
        if (M !== -1 && M < x) {
          Xe.push({
            filePath: t,
            message: `tag has attributes out of order ${C}(${u})${y}`
          });
          break;
        }
        x = M;
      }
    }
  }
}, Ms = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${A}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Bs = 5, ks = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", K("<"), K("("), "{", O(Jn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > Bs && Ye.push({ filePath: t, message: `props found ${z}(${r})${y}` });
  }
}, zs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ too many props${d}`,
      description: `👉 ${A}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], kt = 20;
function Us(e, t, n) {
  t.split(`
`).length > kt && Ze.push({ filePath: n, message: `function ${z}(${Hs(e)})${y} is too long` });
}
function Ds(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.slice(s, s + 5) === "const")
    for (s += 5; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function Vs(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function Gs(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function qs(e, t) {
  let n = 1, s = "", r = t;
  for (; r < e.length && n > 0; ) {
    const a = e[r];
    a === "{" && n++, a === "}" && n--, s += a, r++;
  }
  return { body: s, end: r };
}
function Hs(e) {
  return e.replace(/^const\s*/, "");
}
const Ks = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let r = 0;
  for (; r < s; ) {
    let a = "", u = "", h = !1;
    if (n.slice(r, r + 8) === "function")
      r += 8, h = !0, a = Ds(n, r), r = Vs(n, r);
    else if (n.slice(r, r + 5) === "const") {
      const $ = Gs(n, r);
      $ && (h = !0, a = $.name, r = $.bodyStart);
    }
    if (h) {
      const { body: $, end: v } = qs(n, r);
      u = $, r = v, Us(a, u, t);
    } else
      r++;
  }
}, Qs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ function size${d}`,
      description: `👉 ${A}Functions must be shorter than ${kt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], zt = 3, Ot = (e, t, n) => {
  const s = t.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > zt && Je.push({ filePath: n, message: `function ${C}${e}${y} has ${C}${s.length}${y} parameters` });
}, Xs = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Ot(s[1], s[2], t) : s[3] && Ot(s[3], s[4], t);
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ parameter count${d}`,
      description: `👉 ${A}Max number of function parameters should be ${zt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Zs = (e, t) => {
  if (!e)
    return;
  const n = N(
    "defineProps(",
    Y.times.any(),
    "[",
    Y.times.any(),
    O(ue(`'"`), O(J), ue(`'"`), Y.times.any(), K(",", Y.times.any())),
    "]",
    Y.times.any(),
    ")",
    [P]
  ), s = N(
    "<",
    O(J).grouped(),
    Y,
    I(">").times.any(),
    ":",
    O(J).grouped(),
    Y.times.any(),
    "=",
    Y.times.any(),
    '"props.',
    O(J).grouped(),
    '"',
    [P]
  );
  let r;
  const a = /* @__PURE__ */ new Set();
  for (; (r = n.exec(e.content)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach(($) => a.add($));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], $ = u[2], v = u[3];
    a.has(v) && $ === v && et.push({
      filePath: t,
      message: `Prop ${C}(${v})${y} is being drilled through ${C}${h}${y} component unmodified.`
    });
  }
}, Js = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ props drilling${d}`,
      description: `👉 ${A}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Ut = 4, eo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s[1];
    r.length < Ut && tt.push({ filePath: t, message: `${z}(${r})${y}` });
  }
}, to = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ short variable names${d}`,
      description: `👉 ${A}Variable names must have a minimum length of ${Ut}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Dt = [], Ee = [], no = 5, so = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > no) {
      const a = r.split(`
`)[0], u = G(e.content, a);
      Dt.push({ filePath: t, message: `line #${u} ${C}computed${y}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, oo = () => {
  const e = [];
  return Ee.length > 0 && Dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${A}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], ro = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const a = G(e.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${a} ${C}(${u})${y}` });
  });
}, io = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ component files${d}`,
      description: `👉 ${A}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], co = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(B("$parent").or("getCurrentInstance"), [P]), a = e.content.match(n), u = e.content.match(s);
  if (u) {
    const $ = u[1].split(".")[0], v = a ? a[1] : "";
    if (v.includes($)) {
      const x = G(e.content.trim(), v);
      we.push({
        filePath: t,
        message: `line #${x} ${C}(${$})${y}`
      });
    }
  }
  const h = e.content.match(r);
  if (h) {
    const $ = G(e.content.trim(), h[0]);
    we.push({
      filePath: t,
      message: `line #${$} ${C}(${h[0]})${y}`
    });
  }
}, ao = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${A}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], _t = 5, lo = 3, uo = (e, t) => {
  if (!e)
    return;
  const n = N(Mt.times.atLeast(_t).or(Y.times.atLeast(lo * _t)), [
    P,
    k
  ]);
  e.content.match(n)?.forEach((r) => {
    const a = G(e.content, r);
    st.push({
      filePath: t,
      message: `line #${a} ${C}indentation: ${r.length}${y}`
    });
  });
}, fo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ deep indentation${d}`,
      description: `👉 ${A}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], ho = (e, t) => {
  if (!e)
    return;
  const n = N("<a", W, [P, k]), s = e.content.match(n);
  s?.length && ot.push({ filePath: t, message: `${s?.length} ${C}html link found${y}` });
}, po = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ html link${d}`,
      description: `👉 ${A}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], mo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((r, a) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[a + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${a} if statement without curly braces: ${z}${u}${y}`
      });
    }
  });
}, go = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ if without curly braces${d}`,
      description: `👉 ${A}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], $o = (e, t) => {
  if (!e)
    return;
  const n = N(es, Zn(")", Bt), [P]);
  e.content.match(n)?.forEach((r) => {
    const a = G(e.content, r);
    it.push({
      filePath: t,
      message: `line #${a} ${C}magic number: ${r.length}${y}`
    });
  });
}, bo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}rrd ~ magic numbers${d}`,
      description: `👉 ${A}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ct = [], yo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const r = s[1], a = s[2];
    a.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && a.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${C}<${r}>${y} should have its attributes on separate lines` });
  }
}, Eo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${A}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, wo = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
], at = [], vo = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const a = r[1];
      wo.includes(a) && at.push({ filePath: t, message: `${C}(${a})${y}` });
    }
  });
}, Ao = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${S}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${A}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Co = (e) => {
  const t = {}, n = ({ file: a, rule: u, title: h, description: $, message: v }) => {
    const x = e === "rule" ? u : a;
    t[x] || (t[x] = []), t[x].push({ file: a, rule: u, title: h, description: $, message: v });
  }, s = (a) => {
    a().forEach((h) => {
      n(h);
    });
  };
  s(as), s(hs), s(gs), s(ms), s(us), s(bs), s(io), s(Rs), s(Fs), s(Eo), s(ws), s(xs), s(_s), s(oo), s(Cs), s(Ws), s(Ms), s(ao), s(Ao), s(is), s(fo), s(ns), s(Qs), s(po), s(go), s(bo), s(Ys), s(Hn), s(Js), s(Gn), s(to), s(zs);
  const r = [];
  return Object.keys(t).forEach((a) => {
    console.log(`
 - ${a}`), t[a].forEach((u) => {
      const h = u.message.includes(z);
      if (r.some(($) => $.file === u.file)) {
        const $ = r.find((v) => v.file === u.file);
        $ && (h ? $.errors++ : $.warnings++);
      } else
        r.push({ file: u.file, errors: h ? 1 : 0, warnings: h ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${u.rule}` : `   File: ${u.file}`), console.log(`   Description: ${u.description}`), console.log(`   Message: ${u.message || "🚨"}
`);
    });
  }), r;
}, So = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`), n.includes("vue-essential") && (cs(t), fs(s, t), ls(e.styles, t), ds(e.template, t), ps(e.template, t)), n.includes("vue-strong") && ($s(t), Es(s, t), ro(s, t), so(s, t), Os(e, t), As(e.template, t), Ss(e, t), js(e, t), Ls(t), yo(e.template, t)), n.includes("vue-recommended") && (Ts(e.source, t), Is(e.template, t)), n.includes("vue-caution") && (co(s, t), vo(e.styles, t)), n.includes("rrd") && (rs(s, t), uo(s, t), ts(s, t), Ks(s, t), ho(e.template, t), mo(s, t), $o(s, t), Xs(s, t), qn(e.script, t), Zs(s, t), Vn(s, t), eo(s, t), ks(s, t));
};
let lt = 0, ut = 0, Vt = [];
const xo = [
  "src",
  "components",
  "layouts",
  "pages",
  "server",
  "composables",
  "store",
  "utils",
  "plugins",
  "middleware"
], Gt = async (e) => {
  const t = await xe.readdir(e);
  for (const n of t) {
    const s = ht.join(e, n);
    if ((await xe.stat(s)).isDirectory())
      xo.some((a) => s.includes(`${a}`)) && await Gt(s);
    else if (n.endsWith(".vue") || n.endsWith(".ts") || n.endsWith(".js")) {
      lt++;
      const a = await xe.readFile(s, "utf-8");
      ut += a.split(/\r\n|\r|\n/).length;
      const { descriptor: u } = dn(a);
      (n.endsWith(".ts") || n.endsWith(".js")) && (u.script = { content: a }), So(u, s, Vt);
    }
  }
}, Oo = async (e, t = [], n) => {
  console.log(`

${H}Analyzing Vue files in ${e}${y}`);
  const s = te.filter(($) => !t.includes($));
  console.log(`Applying ${H}${t.length}${y} rulesets ${H}${t}${y} and ignoring ${H}${s.length}${y} rulesets ${H}${s}${y} grouping by ${H}${n}${y}`), Vt = t, await Gt(e), console.log(`Found ${H}${lt}${y} Vue files`);
  const r = Co(n), { errors: a, warnings: u } = r.reduce(($, { errors: v, warnings: x }) => ({ errors: $.errors + v, warnings: $.warnings + x }), { errors: 0, warnings: 0 });
  console.log(`Found ${z}${Intl.NumberFormat("en-US").format(a)} errors${y}, and ${C}${Intl.NumberFormat("en-US").format(u)} warnings${y}, ${H}${Intl.NumberFormat("en-US").format(ut)} lines${y} of code in ${H}${Intl.NumberFormat("en-US").format(lt)} files${y}`);
  const h = Math.ceil((1 - (a * 1.5 + u) / ut) * 100);
  h < 75 && console.log(`${z}Code health is LOW: ${h}%${y}`), h >= 75 && h < 85 && console.log(`${C}Code health is MEDIUM ${h}%${y}`), h >= 85 && h < 95 && console.log(`${H}Code health is OK: ${h}%${y}`), h >= 95 && console.log(`${Ct}Code health is GOOD: ${h}%${y}`), !a && !u && console.log(`${Ct}No code smells detected!${y}`);
};
sn(bn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    default: "./"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: te,
    coerce: Nt("ignore"),
    group: "Filter Rulesets:"
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: te,
    coerce: Nt("apply"),
    group: "Filter Rulesets:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => _o(t),
    default: "rule",
    group: "Group Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${z}Cannot use both --ignore and --apply options together.${y}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), Oo(e.path, t, e.group);
  }
).help().argv;
function Nt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((r) => !te.includes(r));
    return s.length > 0 && (console.error(
      `
${z}Invalid ${e} values: ${s.join(
        ", "
      )}${y}. 
${A}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function _o(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
