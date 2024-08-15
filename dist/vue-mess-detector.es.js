import sn from "yargs";
import { format as jt, inspect as on } from "util";
import { normalize as rn, resolve as se, dirname as Re, basename as cn, extname as an, relative as ln } from "path";
import { readFileSync as ft, statSync as Rt, readdirSync as un, writeFile as fn } from "fs";
import { notStrictEqual as hn, strictEqual as pn } from "assert";
import { fileURLToPath as mn } from "url";
import Oe from "node:fs/promises";
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
    const o = e.match(/^-+/);
    for (let c = o ? o[0].length : 0; c < e.length; c++) {
      let u = e.charAt(c);
      s && (s = !1, u = u.toUpperCase()), c !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function Lt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const c = n.charAt(o), u = e.charAt(o);
    c !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
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
  let t = 0, n = null, s = null, o = null;
  const c = [];
  for (let u = 0; u < e.length; u++) {
    if (n = s, s = e.charAt(u), s === " " && !o) {
      n !== " " && t++;
      continue;
    }
    s === o ? o = null : (s === "'" || s === '"') && !o && (o = s), c[t] || (c[t] = ""), c[t] += s;
  }
  return c;
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
    }, n), o = En(t), c = typeof t == "string", u = vn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), s.default), x = s.configObjects || [], O = s.envPrefix, L = h["populate--"], M = L ? "--" : "_", he = /* @__PURE__ */ Object.create(null), pt = /* @__PURE__ */ Object.create(null), ee = s.__ || X.format, f = {
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
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      p && (f[p][a] = !0), f.arrays[a] = !0, f.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(r) {
      f.bools[r] = !0, f.keys.push(r);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(r) {
      f.strings[r] = !0, f.keys.push(r);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(r) {
      f.numbers[r] = !0, f.keys.push(r);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(r) {
      f.counts[r] = !0, f.keys.push(r);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(r) {
      f.normalize[r] = !0, f.keys.push(r);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([r, a]) => {
      typeof a == "number" && (f.nargs[r] = a, f.keys.push(r));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([r, a]) => {
      typeof a == "function" && (f.coercions[r] = a, f.keys.push(r));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(r) {
      f.configs[r] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([r, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (f.configs[r] = a);
    })), Xt(s.key, u, s.default, f.arrays), Object.keys(E).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        E[a] = E[r];
      });
    });
    let z = null;
    nn();
    let pe = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), mt = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], p = a.replace(/^-{3,}/, "---");
      let l, i, g, m, $, R;
      if (a !== "--" && /^-/.test(a) && $e(a))
        Ae(a);
      else if (p.match(/^---+(=|$)/)) {
        Ae(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        m = a.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], f.arrays) ? r = de(r, m[1], o, m[2]) : w(m[1], f.nargs) !== !1 ? r = me(r, m[1], o, m[2]) : _(m[1], m[2], !0));
      else if (a.match(ve) && h["boolean-negation"])
        m = a.match(ve), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], _(i, w(i, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        m = a.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!$.match(/^-/) || $.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), r++) : _(i, ne(i))));
      else if (a.match(/^-.\..+=/))
        m = a.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && _(m[1], m[2]);
      else if (a.match(/^-.\..+/) && !a.match(q))
        $ = o[r + 1], m = a.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], $ !== void 0 && !$.match(/^-/) && !w(i, f.bools) && !w(i, f.counts) ? (_(i, $), r++) : _(i, ne(i)));
      else if (a.match(/^-[^-]+/) && !a.match(q)) {
        g = a.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < g.length; F++) {
          if ($ = a.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = a.slice(F + 3), i = g[F], w(i, f.arrays) ? r = de(r, i, o, R) : w(i, f.nargs) !== !1 ? r = me(r, i, o, R) : _(i, R), l = !0;
            break;
          }
          if ($ === "-") {
            _(g[F], $);
            continue;
          }
          if (/[A-Za-z]/.test(g[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && w($, f.bools) === !1) {
            _(g[F], $), l = !0;
            break;
          }
          if (g[F + 1] && g[F + 1].match(/\W/)) {
            _(g[F], $), l = !0;
            break;
          } else
            _(g[F], ne(g[F]));
        }
        i = a.slice(-1)[0], !l && i !== "-" && (w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), r++) : _(i, ne(i))));
      } else if (a.match(/^-[0-9]$/) && a.match(q) && w(a.slice(1), f.bools))
        i = a.slice(1), _(i, ne(i));
      else if (a === "--") {
        pe = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        pe = o.slice(r);
        break;
      } else
        Ae(a);
    }
    gt(j, !0), gt(j, !1), qt(j), Kt(), $t(j, f.aliases, E, !0), Ht(j), h["set-placeholder-key"] && Qt(j), Object.keys(f.counts).forEach(function(r) {
      oe(j, r.split(".")) || _(r, 0);
    }), L && pe.length && (j[M] = []), pe.forEach(function(r) {
      j[M].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete j[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete j[r.split(".").map((a) => ie(a)).join(".")], delete j[r];
    });
    function Ae(r) {
      const a = ge("_", r);
      (typeof a == "string" || typeof a == "number") && j._.push(a);
    }
    function me(r, a, p, l) {
      let i, g = w(a, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return Q(l) || (z = Error(ee("Argument unexpected for: %s", a))), _(a, ne(a)), r;
      let m = Q(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + m < g && (z = Error(ee("Not enough arguments following: %s", a))), m = g;
      else {
        for (i = r + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(q) || $e(p[i])); i++)
          m++;
        m < g && (z = Error(ee("Not enough arguments following: %s", a)));
      }
      let $ = Math.min(m, g);
      for (!Q(l) && $ > 0 && (_(a, l), $--), i = r + 1; i < $ + r + 1; i++)
        _(a, p[i]);
      return r + $;
    }
    function de(r, a, p, l) {
      let i = [], g = l || p[r + 1];
      const m = w(a, f.nargs);
      if (w(a, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (Q(g) || Q(l) && /^-/.test(g) && !q.test(g) && !$e(g)) {
        if (E[a] !== void 0) {
          const $ = E[a];
          i = Array.isArray($) ? $ : [$];
        }
      } else {
        Q(l) || i.push(Ce(a, l, !0));
        for (let $ = r + 1; $ < p.length && !(!h["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || (g = p[$], /^-/.test(g) && !q.test(g) && !$e(g))); $++)
          r = $, i.push(Ce(a, g, c));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (z = Error(ee("Not enough arguments following: %s", a))), _(a, i), r;
    }
    function _(r, a, p = c) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const g = r.split(".").map(function(m) {
          return ie(m);
        }).join(".");
        dt(r, g);
      }
      const l = Ce(r, a, p), i = r.split(".");
      re(j, i, l), f.aliases[r] && f.aliases[r].forEach(function(g) {
        const m = g.split(".");
        re(j, m, l);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let m = g.split(".");
        const $ = [].concat(i);
        $.shift(), m = m.concat($), (f.aliases[r] || []).includes(m.join(".")) || re(j, m, l);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(m) {
        Object.defineProperty(mt, m, {
          enumerable: !0,
          get() {
            return a;
          },
          set($) {
            a = typeof $ == "string" ? X.normalize($) : $;
          }
        });
      });
    }
    function dt(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], he[a] = !0), f.aliases[a] && f.aliases[a].length || dt(a, r);
    }
    function Ce(r, a, p) {
      p && (a = An(a)), (w(r, f.bools) || w(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let l = Array.isArray(a) ? a.map(function(i) {
        return ge(r, i);
      }) : ge(r, a);
      return w(r, f.counts) && (Q(l) || typeof l == "boolean") && (l = Se()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(a) ? l = a.map((i) => X.normalize(i)) : l = X.normalize(a)), l;
    }
    function ge(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(a) && (Ft(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !Q(a) && w(r, f.numbers)) && (a = Number(a)), a;
    }
    function qt(r) {
      const a = /* @__PURE__ */ Object.create(null);
      $t(a, f.aliases, E), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || a[p];
        if (l)
          try {
            let i = null;
            const g = X.resolve(X.cwd(), l), m = f.configs[p];
            if (typeof m == "function") {
              try {
                i = m(g);
              } catch ($) {
                i = $;
              }
              if (i instanceof Error) {
                z = i;
                return;
              }
            } else
              i = X.require(g);
            xe(i);
          } catch (i) {
            i.name === "PermissionDenied" ? z = i : r[p] && (z = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function xe(r, a) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], i = a ? a + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? xe(l, i) : (!oe(j, i.split(".")) || w(i, f.arrays) && h["combine-arrays"]) && _(i, l);
      });
    }
    function Kt() {
      typeof x < "u" && x.forEach(function(r) {
        xe(r);
      });
    }
    function gt(r, a) {
      if (typeof O > "u")
        return;
      const p = typeof O == "string" ? O : "", l = X.env();
      Object.keys(l).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const g = i.split("__").map(function(m, $) {
            return $ === 0 && (m = m.substring(p.length)), ie(m);
          });
          (a && f.configs[g.join(".")] || !a) && !oe(r, g) && _(g.join("."), l[i]);
        }
      });
    }
    function Ht(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(l) {
        if (!p.has(l) && (a = w(l, f.coercions), typeof a == "function"))
          try {
            const i = ge(l, a(r[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              p.add(g), r[g] = i;
            });
          } catch (i) {
            z = i;
          }
      });
    }
    function Qt(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function $t(r, a, p, l = !1) {
      Object.keys(p).forEach(function(i) {
        oe(r, i.split(".")) || (re(r, i.split("."), p[i]), l && (pt[i] = !0), (a[i] || []).forEach(function(g) {
          oe(r, g.split(".")) || re(r, g.split("."), p[i]);
        }));
      });
    }
    function oe(r, a) {
      let p = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const l = a[a.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function re(r, a, p) {
      let l = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(R) {
        R = yt(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const i = yt(a[a.length - 1]), g = w(a.join("."), f.arrays), m = Array.isArray(p);
      let $ = h["duplicate-arguments-array"];
      !$ && w(i, f.nargs) && ($ = !0, (!Q(l[i]) && f.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === f.nargs[i]) && (l[i] = void 0)), p === Se() ? l[i] = Se(l[i]) : Array.isArray(l[i]) ? $ && g && m ? l[i] = h["flatten-duplicate-arrays"] ? l[i].concat(p) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([p]) : !$ && !!g == !!m ? l[i] = p : l[i] = l[i].concat([p]) : l[i] === void 0 && g ? l[i] = m ? p : [p] : $ && !(l[i] === void 0 || w(i, f.counts) || w(i, f.bools)) ? l[i] = [l[i], p] : l[i] = p;
    }
    function Xt(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
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
    function w(r, a) {
      const p = [].concat(f.aliases[r] || [], r), l = Object.keys(a), i = p.find((g) => l.includes(g));
      return i ? a[i] : !1;
    }
    function bt(r) {
      const a = Object.keys(f);
      return [].concat(a.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function Yt(r, ...a) {
      return [].concat(...a).some(function(l) {
        const i = r.match(l);
        return i && bt(i[1]);
      });
    }
    function Zt(r) {
      if (r.match(q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const l = r.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (p = r.slice(i + 2), !bt(l[i])) {
          a = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return a;
    }
    function $e(r) {
      return h["unknown-options-as-args"] && Jt(r);
    }
    function Jt(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(q) || Zt(r) ? !1 : !Yt(r, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ne(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in E ? E[r] : en(tn(r));
    }
    function en(r) {
      return {
        [V.BOOLEAN]: !0,
        [V.STRING]: "",
        [V.NUMBER]: void 0,
        [V.ARRAY]: []
      }[r];
    }
    function tn(r) {
      let a = V.BOOLEAN;
      return w(r, f.strings) ? a = V.STRING : w(r, f.numbers) ? a = V.NUMBER : w(r, f.bools) ? a = V.BOOLEAN : w(r, f.arrays) && (a = V.ARRAY), a;
    }
    function Q(r) {
      return r === void 0;
    }
    function nn() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (z = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (z = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(mt, j),
      configuration: h,
      defaulted: Object.assign({}, pt),
      error: z,
      newAliases: Object.assign({}, he)
    };
  }
}
function vn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let c = o + 1; c < t.length; c++)
        if (t[o].filter(function(h) {
          return t[c].indexOf(h) !== -1;
        }).length) {
          t[o] = t[o].concat(t[c]), t.splice(c, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(u, h, E) {
      return E.indexOf(u) === h;
    });
    const c = o.pop();
    c !== void 0 && typeof c == "string" && (n[c] = o);
  }), n;
}
function Se(e) {
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
const xn = {
  right: Rn,
  center: Pn
}, On = 0, be = 1, Sn = 2, ye = 3;
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
`).map((o) => o.split("	"));
    let s = 0;
    return n.forEach((o) => {
      o.length > 1 && T.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), T.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((c, u) => ({
        text: c.trim(),
        padding: this.measurePadding(c),
        width: u === 0 && o.length > 1 ? s : void 0
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
    return this.rasterize(t).forEach((s, o) => {
      let c = "";
      s.forEach((u, h) => {
        const { width: E } = t[h], x = this.negatePadding(t[h]);
        let O = u;
        if (x > T.stringWidth(u) && (O += " ".repeat(x - T.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const M = xn[t[h].align];
          O = M(O, x), T.stringWidth(O) < x && (O += " ".repeat((E || 0) - T.stringWidth(O) - 1));
        }
        const L = t[h].padding || [0, 0, 0, 0];
        L[ye] && (c += " ".repeat(L[ye])), c += vt(t[h], O, "| "), c += O, c += vt(t[h], O, " |"), L[be] && (c += " ".repeat(L[be])), o === 0 && n.length > 0 && (c = this.renderInline(c, n[n.length - 1]));
      }), n.push({
        text: c.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, c = n.text, u = T.stringWidth(c.trimRight());
    return n.span ? this.wrap ? o < u ? t : (n.hidden = !0, c.trimRight() + " ".repeat(o - u) + t.trimLeft()) : (n.hidden = !0, c + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((c, u) => {
      c.width = s[u], this.wrap ? o = T.wrap(c.text, this.negatePadding(c), { hard: !0 }).split(`
`) : o = c.text.split(`
`), c.border && (o.unshift("." + "-".repeat(this.negatePadding(c) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(c) + 2) + "'")), c.padding && (o.unshift(...new Array(c.padding[On] || 0).fill("")), o.push(...new Array(c.padding[Sn] || 0).fill(""))), o.forEach((h, E) => {
        n[E] || n.push([]);
        const x = n[E];
        for (let O = 0; O < u; O++)
          x[O] === void 0 && x.push("");
        x.push(h);
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
    const o = t.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), c = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(c, Nn(t[h])) : u);
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
  let o = "";
  for (let c = 0; c < e.length; c++)
    c !== 0 && c % t === 0 && (o += `
`), o += e.charAt(c);
  return n && s && (o = `${n}${o}${s}`), o;
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
let U;
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
    })) : s(), U.format.apply(U.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let c = function() {
    };
    typeof t[t.length - 1] == "function" && (c = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = o === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c();
    const h = [u];
    return ~u.indexOf("%d") && h.push(o), U.format.apply(U.format, h.concat(t));
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
    return t.forEach(function(o, c) {
      const u = n[c + 1];
      s += o, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, c = n.cb, u = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    U.fs.writeFile(u, h, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), c(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      U.fs.readFileSync && (t = JSON.parse(U.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = U.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = U.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return U.exists(t);
  }
}
function Bn(e, t) {
  U = t;
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
const Dn = le.substring(0, le.lastIndexOf("node_modules"));
hn, pn, on, Dn || process.cwd(), cn, Re, an, ln, se, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ft, kn({
  directory: se(le, "../../../locales"),
  updateFiles: !1
});
const D = "\x1B[44m", C = "\x1B[43m", H = "\x1B[41m", Ct = "\x1B[42m", b = "\x1B[0m", v = "\x1B[33m", A = "\x1B[36m", d = "\x1B[0m", Un = {
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
}, te = Object.keys(Un), Pe = [], Le = 100, Vn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Le && Pe.push({ filePath: t, message: `${n.length > Le * 2 ? H : C}(${n.length} lines)${b}` });
}, Gn = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Le} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], qn = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${C}Plain <script> block${b} found` });
}, Kn = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Hn = /^(\(.*\)|\\?.)$/;
function Z(e) {
  const t = e.toString();
  return Hn.test(t) ? t : `(?:${t})`;
}
const Qn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Xn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function y(e) {
  const t = (n) => y(`(?<${n}>${`${e}`.replace(Qn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => y(`${e}${B(...n)}`), {
      referenceTo: (n) => y(`${e}\\k<${n}>`)
    }),
    or: (...n) => y(`(?:${e}|${B(...n)})`),
    after: (...n) => y(`(?<=${B(...n)})${e}`),
    before: (...n) => y(`${e}(?=${B(...n)})`),
    notAfter: (...n) => y(`(?<!${B(...n)})${e}`),
    notBefore: (...n) => y(`${e}(?!${B(...n)})`),
    times: Object.assign((n) => y(`${Z(e)}{${n}}`), {
      any: () => y(`${Z(e)}*`),
      atLeast: (n) => y(`${Z(e)}{${n},}`),
      atMost: (n) => y(`${Z(e)}{0,${n}}`),
      between: (n, s) => y(`${Z(e)}{${n},${s}}`)
    }),
    optionally: () => y(`${Z(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => y(`${e}`.replace(Xn, "($1$3)$2")),
    at: {
      lineStart: () => y(`^${e}`),
      lineEnd: () => y(`${e}$`)
    }
  };
}
const Yn = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return y(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function I(e) {
  return y(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Zn(...e) {
  return y(`(?:${e.map((t) => B(t)).join("|")})`);
}
const Jn = y(".");
y("\\b\\w+\\b");
const J = y("\\w"), W = y("\\b"), es = y("\\d"), Y = y("\\s"), ae = Object.assign(y("[a-zA-Z]"), {
  lowercase: y("[a-z]"),
  uppercase: y("[A-Z]")
}), Mt = y("\\t"), Bt = y("\\n");
y("\\r");
y("\\W+"), y("\\W"), y("\\B"), y("\\D"), y("\\S"), Object.assign(y("[^a-zA-Z]"), {
  lowercase: y("[^a-z]"),
  uppercase: y("[^A-Z]")
}), y("[^\\t]"), y("[^\\n]"), y("[^\\r]");
function K(...e) {
  return y(`${Z(B(...e))}?`);
}
function B(...e) {
  return y(
    e.map((t) => typeof t == "string" ? t.replace(Yn, "\\$&") : t).join("")
  );
}
function S(...e) {
  return y(`${Z(B(...e))}+`);
}
const k = "i", P = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(B(...e).toString(), [...t || ""].join(""));
}, Te = [], ts = (e, t) => {
  if (!e)
    return;
  const n = N(W, "else", W, [P, k]), s = e.content.match(n);
  s?.length && Te.push({ filePath: t, message: `else clauses found ${H}(${s.length})${b}` });
}, ns = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ else conditions${d}`,
      description: `👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], ss = 5, os = 10, rs = (e, t) => {
  if (!e)
    return;
  const n = N(W, "if", W, [P, k]), s = N(W, "else", W, [P, k]), o = N(W, "for", W, [P, k]), c = N(W, "while", W, [P, k]), u = N(W, "case", W, [P, k]), h = e.content.match(n), E = e.content.match(s), x = e.content.match(o), O = e.content.match(c), L = e.content.match(u), M = (h?.length || 0) + (E?.length || 0) + (x?.length || 0) + (O?.length || 0) + (L?.length || 0);
  M > ss && We.push({ filePath: t, message: `${M > os ? H : C}(${M})${b}` });
}, is = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${v}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
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
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${C}single word${b}` });
}, as = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ single name component${d}`,
      description: `👉 ${v}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], ls = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Me.push({
      filePath: t,
      message: `${C}global style${b} used`
    });
  });
}, us = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ global style${d}`,
      description: `👉 ${v}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], fs = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [P, k]);
  e.content.match(n)?.length && Be.push({ filePath: t, message: `${C}Props type${b} not defined` });
}, hs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ simple prop${d}`,
      description: `👉 ${v}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, G = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, ke = [], ps = (e, t) => {
  if (!e)
    return;
  const n = N(
    "<",
    S(I(">")),
    " v-if",
    S(I(">")),
    " v-for",
    S(I(">")),
    ">",
    [P, k]
  ), s = N(
    "<",
    S(I(">")),
    " v-for",
    S(I(">")),
    " v-if",
    S(I(">")),
    ">",
    [P, k]
  ), o = e.content.match(n), c = e.content.match(s);
  if (o?.length || c?.length) {
    const u = o?.length ? o[0] : c?.length ? c[0] : "", h = G(e.content, u);
    ke.push({ filePath: t, message: `line #${h} ${C}v-if used with v-for${b}` });
  }
}, ms = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${v}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ds = (e, t) => {
  if (!e)
    return;
  const n = N("<", S(I(">")), " v-for", S(I(">")), ">", [
    P,
    k
  ]), s = e.content.match(n);
  s?.length && (s.some((c) => c.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${C}without a key${b}` }));
}, gs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${v}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], $s = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = ht.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, c = t.match(o);
  !s?.length && !c?.length && De.push({ filePath: e, message: `component name is ${C}not PascalCase, nor kebab-case.${b}` });
}, bs = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], ys = N(
  S(ae.lowercase).at.lineStart(),
  S(ae.uppercase, ae.lowercase.times.any().grouped()).at.lineEnd()
), Es = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((c) => c.split(":")[0]).filter((c) => c.length).filter((c) => !ys.test(c)).length && Ue.push({ filePath: t, message: `prop names are ${C}not camelCased${b}` });
}, ws = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${v}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], vs = 40, As = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > vs) {
      const c = G(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${c} ${C}${u}${b}`
      });
    }
  });
}, Cs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${v}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], xs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(J),
    K(S(ue(` 	
\r`))),
    S(I("/>")),
    K(S(ue(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const c = N(":", S(J), K(" "), "=", K(" "), I(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(c);
    if (h?.length) {
      const E = G(e.source, u);
      Ge.push({ filePath: t, message: `line #${E} ${C}${h}${b}` });
    }
  });
}, Os = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${v}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Ss = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    S(ae.uppercase, J),
    K(Bt, Mt),
    K(S(I(">"))),
    "></",
    S(J),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((c) => {
    const u = G(e.source, c), h = c.split(`
`).at(-1)?.trim() || "";
    qe.push({ filePath: t, message: `line #${u} ${C}${h}${b}` });
  });
}, _s = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${v}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], xt = [], Ns = ["v-slot", "v-bind", "v-on"], js = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ns.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = G(e.source, s);
      Ke.push({ filePath: t, message: `line #${o} ${C}${s}${b}` }), xt.some((c) => c.filePath === t) || xt.push({ filePath: t });
    }
  });
}, Rs = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Ps = 3, Ls = (e) => {
  const t = N(
    S(I("/")).grouped(),
    B(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = N(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), c = s.match(o);
    (!c || c.length < Ps) && He.push({ filePath: e, message: `${s} is not a ${C}full word.${b}` });
  }
}, Fs = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ full-word component names${d}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Ts = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), c = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: c }
  ].filter((E) => E.index !== -1);
  u.every((E, x) => x === 0 ? !0 : u[x - 1].index < E.index) || Qe.push({ filePath: t, message: `Top level elements are ${C}not following the correct order.${b}` });
}, Ws = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ top level element order${d}`,
      description: `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Ot = [
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
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let c;
  for (; (c = s.exec(n)) !== null; ) {
    const u = c[1], h = c[2];
    if (h) {
      const x = Array.from(h.matchAll(o), (L) => L[1]).filter((L) => Ot.includes(L));
      let O = -1;
      for (const L of x) {
        const M = Ot.indexOf(L);
        if (M !== -1 && M < O) {
          Xe.push({
            filePath: t,
            message: `tag has attributes out of order ${C}(${u})${b}`
          });
          break;
        }
        O = M;
      }
    }
  }
}, Ms = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${v}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Bs = 5, ks = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", K("<"), K("("), "{", S(Jn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Bs && Ye.push({ filePath: t, message: `props found ${H}(${o})${b}` });
  }
}, zs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ too many props${d}`,
      description: `👉 ${v}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], kt = 20;
function Ds(e, t, n) {
  t.split(`
`).length > kt && Ze.push({ filePath: n, message: `function ${H}(${Ks(e)})${b} is too long` });
}
function Us(e, t) {
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
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const c = e[o];
    c === "{" && n++, c === "}" && n--, s += c, o++;
  }
  return { body: s, end: o };
}
function Ks(e) {
  return e.replace(/^const\s*/, "");
}
const Hs = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let c = "", u = "", h = !1;
    if (n.slice(o, o + 8) === "function")
      o += 8, h = !0, c = Us(n, o), o = Vs(n, o);
    else if (n.slice(o, o + 5) === "const") {
      const E = Gs(n, o);
      E && (h = !0, c = E.name, o = E.bodyStart);
    }
    if (h) {
      const { body: E, end: x } = qs(n, o);
      u = E, o = x, Ds(c, u, t);
    } else
      o++;
  }
}, Qs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ function size${d}`,
      description: `👉 ${v}Functions must be shorter than ${kt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], zt = 3, St = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > zt && Je.push({ filePath: n, message: `function ${C}${e}${b} has ${C}${s.length}${b} parameters` });
}, Xs = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? St(s[1], s[2], t) : s[3] && St(s[3], s[4], t);
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ parameter count${d}`,
      description: `👉 ${v}Max number of function parameters should be ${zt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
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
    S(ue(`'"`), S(J), ue(`'"`), Y.times.any(), K(",", Y.times.any())),
    "]",
    Y.times.any(),
    ")",
    [P]
  ), s = N(
    "<",
    S(J).grouped(),
    Y,
    I(">").times.any(),
    ":",
    S(J).grouped(),
    Y.times.any(),
    "=",
    Y.times.any(),
    '"props.',
    S(J).grouped(),
    '"',
    [P]
  );
  let o;
  const c = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((E) => c.add(E));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], E = u[2], x = u[3];
    c.has(x) && E === x && et.push({
      filePath: t,
      message: `Prop ${C}(${x})${b} is being drilled through ${C}${h}${b} component unmodified.`
    });
  }
}, Js = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ props drilling${d}`,
      description: `👉 ${v}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Dt = 4, eo = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Dt && tt.push({ filePath: t, message: `${H}(${o})${b}` });
  }
}, to = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ short variable names${d}`,
      description: `👉 ${v}Variable names must have a minimum length of ${Dt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ut = [], Ee = [], no = 5, so = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > no) {
      const c = o.split(`
`)[0], u = G(e.content, c);
      Ut.push({ filePath: t, message: `line #${u} ${C}computed${b}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, oo = () => {
  const e = [];
  return Ee.length > 0 && Ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${v}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], ro = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const c = G(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${c} ${C}(${u})${b}` });
  });
}, io = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component files${d}`,
      description: `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], co = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = N(B("$parent").or("getCurrentInstance"), [P]), c = e.content.match(n), u = e.content.match(s);
  if (u) {
    const E = u[1].split(".")[0], x = c ? c[1] : "";
    if (x.includes(E)) {
      const O = G(e.content.trim(), x);
      we.push({
        filePath: t,
        message: `line #${O} ${C}(${E})${b}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const E = G(e.content.trim(), h[0]);
    we.push({
      filePath: t,
      message: `line #${E} ${C}(${h[0]})${b}`
    });
  }
}, ao = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
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
  e.content.match(n)?.forEach((o) => {
    const c = G(e.content, o);
    st.push({
      filePath: t,
      message: `line #${c} ${C}indentation: ${o.length}${b}`
    });
  });
}, fo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ deep indentation${d}`,
      description: `👉 ${v}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], ho = (e, t) => {
  if (!e)
    return;
  const n = N("<a", W, [P, k]), s = e.content.match(n);
  s?.length && ot.push({ filePath: t, message: `${s?.length} ${C}html link found${b}` });
}, po = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ html link${d}`,
      description: `👉 ${v}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], mo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, c) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[c + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${c} if statement without curly braces: ${H}${u}${b}`
      });
    }
  });
}, go = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ if without curly braces${d}`,
      description: `👉 ${v}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], $o = (e, t) => {
  if (!e)
    return;
  const n = N(es, Zn(")", Bt), [P]);
  e.content.match(n)?.forEach((o) => {
    const c = G(e.content, o);
    it.push({
      filePath: t,
      message: `line #${c} ${C}magic number: ${o.length}${b}`
    });
  });
}, bo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ magic numbers${d}`,
      description: `👉 ${v}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ct = [], yo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], c = s[2];
    c.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && c.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${C}<${o}>${b} should have its attributes on separate lines` });
  }
}, Eo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${v}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
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
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const c = o[1];
      wo.includes(c) && at.push({ filePath: t, message: `${C}(${c})${b}` });
    }
  });
}, Ao = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${v}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Co = (e) => {
  let t = 0;
  const n = {}, s = ({ file: c, rule: u, title: h, description: E, message: x }) => {
    const O = e === "rule" ? u : c;
    n[O] || (n[O] = []), n[O].push({ file: c, rule: u, title: h, description: E, message: x });
  }, o = (c) => {
    c().forEach((h) => {
      s(h), t++;
    });
  };
  return o(as), o(hs), o(gs), o(ms), o(us), o(bs), o(io), o(Rs), o(Fs), o(Eo), o(ws), o(Os), o(_s), o(oo), o(Cs), o(Ws), o(Ms), o(ao), o(Ao), o(is), o(fo), o(ns), o(Qs), o(po), o(go), o(bo), o(Ys), o(Kn), o(Js), o(Gn), o(to), o(zs), Object.keys(n).forEach((c) => {
    console.log(`
 - ${c}`), n[c].forEach((u) => {
      console.log(e === "file" ? `   Rule: ${u.rule}` : `   File: ${u.file}`), console.log(`   Description: ${u.description}`), console.log(`   Message: ${u.message || "🚨"}
`);
    });
  }), t;
}, xo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`), n.includes("vue-essential") && (cs(t), fs(s, t), ls(e.styles, t), ds(e.template, t), ps(e.template, t)), n.includes("vue-strong") && ($s(t), Es(s, t), ro(s, t), so(s, t), Ss(e, t), As(e.template, t), xs(e, t), js(e, t), Ls(t), yo(e.template, t)), n.includes("vue-recommended") && (Ts(e.source, t), Is(e.template, t)), n.includes("vue-caution") && (co(s, t), vo(e.styles, t)), n.includes("rrd") && (rs(s, t), uo(s, t), ts(s, t), Hs(s, t), ho(e.template, t), mo(s, t), $o(s, t), Xs(s, t), qn(e.script, t), Zs(s, t), Vn(s, t), eo(s, t), ks(s, t));
};
let lt = 0, ut = 0, Vt = [];
const Oo = [
  "src",
  "components",
  "layouts",
  "pages"
  /* 'server',
  'composables',
  'store',
  'utils',
  'plugins',
  'middleware', */
], Gt = async (e) => {
  const t = await Oe.readdir(e);
  for (const n of t) {
    const s = ht.join(e, n);
    if ((await Oe.stat(s)).isDirectory())
      Oo.some((c) => s.includes(`${c}`)) && await Gt(s);
    else if (n.endsWith(".vue")) {
      lt++;
      const c = await Oe.readFile(s, "utf-8");
      ut += c.split(/\r\n|\r|\n/).length;
      const { descriptor: u } = dn(c);
      xo(u, s, Vt);
    }
  }
}, So = async (e, t = [], n) => {
  console.log(`

${D}Analyzing Vue files in ${e}${b}`);
  const s = te.filter((u) => !t.includes(u));
  console.log(`Applying ${D}${t.length}${b} rulesets ${D}${t}${b} and ignoring ${D}${s.length}${b} rulesets ${D}${s}${b} grouping by ${D}${n}${b}`), Vt = t, await Gt(e), console.log(`Found ${D}${lt}${b} Vue files`);
  const o = Co(n);
  console.log(`Found ${D}${o}${b} errors, ${D}${ut}${b} lines of code in ${D}${lt}${b} files`);
  const c = Math.ceil((1 - o / ut) * 100);
  c < 75 && console.log(`${H}Code health is LOW: ${c}%${b}`), c >= 75 && c < 85 && console.log(`${C}Code health is MEDIUM ${c}%${b}`), c >= 85 && c < 95 && console.log(`${D}Code health is OK: ${c}%${b}`), c >= 95 && console.log(`${Ct}Code health is GOOD: ${c}%${b}`), o || console.log(`${Ct}No code smells detected!${b}`);
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
${H}Cannot use both --ignore and --apply options together.${b}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), So(e.path, t, e.group);
  }
).help().argv;
function Nt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !te.includes(o));
    return s.length > 0 && (console.error(
      `
${H}Invalid ${e} values: ${s.join(
        ", "
      )}${b}. 
${v}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function _o(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
