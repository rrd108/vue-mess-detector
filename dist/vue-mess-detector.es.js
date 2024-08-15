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
    const r = e.match(/^-+/);
    for (let a = r ? r[0].length : 0; a < e.length; a++) {
      let l = e.charAt(a);
      s && (s = !1, l = l.toUpperCase()), a !== 0 && (l === "-" || l === "_") ? s = !0 : l !== "-" && l !== "_" && (n += l);
    }
    return n;
  }
}
function Lt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let r = 0; r < e.length; r++) {
    const a = n.charAt(r), l = e.charAt(r);
    a !== l && r > 0 ? s += `${t}${n.charAt(r)}` : s += l;
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
    return e.map((l) => typeof l != "string" ? l + "" : l);
  e = e.trim();
  let t = 0, n = null, s = null, r = null;
  const a = [];
  for (let l = 0; l < e.length; l++) {
    if (n = s, s = e.charAt(l), s === " " && !r) {
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
    }, n), r = En(t), a = typeof t == "string", l = vn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), y = Object.assign(/* @__PURE__ */ Object.create(null), s.default), x = s.configObjects || [], O = s.envPrefix, L = h["populate--"], M = L ? "--" : "_", he = /* @__PURE__ */ Object.create(null), pt = /* @__PURE__ */ Object.create(null), ee = s.__ || X.format, f = {
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
      const c = typeof o == "object" ? o.key : o, p = Object.keys(o).map(function(u) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[u];
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
    })), Xt(s.key, l, s.default, f.arrays), Object.keys(y).forEach(function(o) {
      (f.aliases[o] || []).forEach(function(c) {
        y[c] = y[o];
      });
    });
    let z = null;
    nn();
    let pe = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), mt = {};
    for (let o = 0; o < r.length; o++) {
      const c = r[o], p = c.replace(/^-{3,}/, "---");
      let u, i, g, m, $, R;
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
        m = c.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, f.arrays) ? o = de(o, i, r) : w(i, f.nargs) !== !1 ? o = me(o, i, r) : ($ = r[o + 1], $ !== void 0 && (!$.match(/^-/) || $.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), o++) : _(i, ne(i))));
      else if (c.match(/^-.\..+=/))
        m = c.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && _(m[1], m[2]);
      else if (c.match(/^-.\..+/) && !c.match(q))
        $ = r[o + 1], m = c.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], $ !== void 0 && !$.match(/^-/) && !w(i, f.bools) && !w(i, f.counts) ? (_(i, $), o++) : _(i, ne(i)));
      else if (c.match(/^-[^-]+/) && !c.match(q)) {
        g = c.slice(1, -1).split(""), u = !1;
        for (let F = 0; F < g.length; F++) {
          if ($ = c.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = c.slice(F + 3), i = g[F], w(i, f.arrays) ? o = de(o, i, r, R) : w(i, f.nargs) !== !1 ? o = me(o, i, r, R) : _(i, R), u = !0;
            break;
          }
          if ($ === "-") {
            _(g[F], $);
            continue;
          }
          if (/[A-Za-z]/.test(g[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && w($, f.bools) === !1) {
            _(g[F], $), u = !0;
            break;
          }
          if (g[F + 1] && g[F + 1].match(/\W/)) {
            _(g[F], $), u = !0;
            break;
          } else
            _(g[F], ne(g[F]));
        }
        i = c.slice(-1)[0], !u && i !== "-" && (w(i, f.arrays) ? o = de(o, i, r) : w(i, f.nargs) !== !1 ? o = me(o, i, r) : ($ = r[o + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(q)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), o++) : _(i, ne(i))));
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
    gt(j, !0), gt(j, !1), qt(j), Ht(), $t(j, f.aliases, y, !0), Kt(j), h["set-placeholder-key"] && Qt(j), Object.keys(f.counts).forEach(function(o) {
      oe(j, o.split(".")) || _(o, 0);
    }), L && pe.length && (j[M] = []), pe.forEach(function(o) {
      j[M].push(o);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((o) => o !== "--" && o.includes("-")).forEach((o) => {
      delete j[o];
    }), h["strip-aliased"] && [].concat(...Object.keys(l).map((o) => l[o])).forEach((o) => {
      h["camel-case-expansion"] && o.includes("-") && delete j[o.split(".").map((c) => ie(c)).join(".")], delete j[o];
    });
    function Ae(o) {
      const c = ge("_", o);
      (typeof c == "string" || typeof c == "number") && j._.push(c);
    }
    function me(o, c, p, u) {
      let i, g = w(c, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return Q(u) || (z = Error(ee("Argument unexpected for: %s", c))), _(c, ne(c)), o;
      let m = Q(u) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (o + 1) + m < g && (z = Error(ee("Not enough arguments following: %s", c))), m = g;
      else {
        for (i = o + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(q) || $e(p[i])); i++)
          m++;
        m < g && (z = Error(ee("Not enough arguments following: %s", c)));
      }
      let $ = Math.min(m, g);
      for (!Q(u) && $ > 0 && (_(c, u), $--), i = o + 1; i < $ + o + 1; i++)
        _(c, p[i]);
      return o + $;
    }
    function de(o, c, p, u) {
      let i = [], g = u || p[o + 1];
      const m = w(c, f.nargs);
      if (w(c, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (Q(g) || Q(u) && /^-/.test(g) && !q.test(g) && !$e(g)) {
        if (y[c] !== void 0) {
          const $ = y[c];
          i = Array.isArray($) ? $ : [$];
        }
      } else {
        Q(u) || i.push(Ce(c, u, !0));
        for (let $ = o + 1; $ < p.length && !(!h["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || (g = p[$], /^-/.test(g) && !q.test(g) && !$e(g))); $++)
          o = $, i.push(Ce(c, g, a));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (z = Error(ee("Not enough arguments following: %s", c))), _(c, i), o;
    }
    function _(o, c, p = a) {
      if (/-/.test(o) && h["camel-case-expansion"]) {
        const g = o.split(".").map(function(m) {
          return ie(m);
        }).join(".");
        dt(o, g);
      }
      const u = Ce(o, c, p), i = o.split(".");
      re(j, i, u), f.aliases[o] && f.aliases[o].forEach(function(g) {
        const m = g.split(".");
        re(j, m, u);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let m = g.split(".");
        const $ = [].concat(i);
        $.shift(), m = m.concat($), (f.aliases[o] || []).includes(m.join(".")) || re(j, m, u);
      }), w(o, f.normalize) && !w(o, f.arrays) && [o].concat(f.aliases[o] || []).forEach(function(m) {
        Object.defineProperty(mt, m, {
          enumerable: !0,
          get() {
            return c;
          },
          set($) {
            c = typeof $ == "string" ? X.normalize($) : $;
          }
        });
      });
    }
    function dt(o, c) {
      f.aliases[o] && f.aliases[o].length || (f.aliases[o] = [c], he[c] = !0), f.aliases[c] && f.aliases[c].length || dt(c, o);
    }
    function Ce(o, c, p) {
      p && (c = An(c)), (w(o, f.bools) || w(o, f.counts)) && typeof c == "string" && (c = c === "true");
      let u = Array.isArray(c) ? c.map(function(i) {
        return ge(o, i);
      }) : ge(o, c);
      return w(o, f.counts) && (Q(u) || typeof u == "boolean") && (u = Se()), w(o, f.normalize) && w(o, f.arrays) && (Array.isArray(c) ? u = c.map((i) => X.normalize(i)) : u = X.normalize(c)), u;
    }
    function ge(o, c) {
      return !h["parse-positional-numbers"] && o === "_" || !w(o, f.strings) && !w(o, f.bools) && !Array.isArray(c) && (Ft(c) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !Q(c) && w(o, f.numbers)) && (c = Number(c)), c;
    }
    function qt(o) {
      const c = /* @__PURE__ */ Object.create(null);
      $t(c, f.aliases, y), Object.keys(f.configs).forEach(function(p) {
        const u = o[p] || c[p];
        if (u)
          try {
            let i = null;
            const g = X.resolve(X.cwd(), u), m = f.configs[p];
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
            i.name === "PermissionDenied" ? z = i : o[p] && (z = Error(ee("Invalid JSON config file: %s", u)));
          }
      });
    }
    function xe(o, c) {
      Object.keys(o).forEach(function(p) {
        const u = o[p], i = c ? c + "." + p : p;
        typeof u == "object" && u !== null && !Array.isArray(u) && h["dot-notation"] ? xe(u, i) : (!oe(j, i.split(".")) || w(i, f.arrays) && h["combine-arrays"]) && _(i, u);
      });
    }
    function Ht() {
      typeof x < "u" && x.forEach(function(o) {
        xe(o);
      });
    }
    function gt(o, c) {
      if (typeof O > "u")
        return;
      const p = typeof O == "string" ? O : "", u = X.env();
      Object.keys(u).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const g = i.split("__").map(function(m, $) {
            return $ === 0 && (m = m.substring(p.length)), ie(m);
          });
          (c && f.configs[g.join(".")] || !c) && !oe(o, g) && _(g.join("."), u[i]);
        }
      });
    }
    function Kt(o) {
      let c;
      const p = /* @__PURE__ */ new Set();
      Object.keys(o).forEach(function(u) {
        if (!p.has(u) && (c = w(u, f.coercions), typeof c == "function"))
          try {
            const i = ge(u, c(o[u]));
            [].concat(f.aliases[u] || [], u).forEach((g) => {
              p.add(g), o[g] = i;
            });
          } catch (i) {
            z = i;
          }
      });
    }
    function Qt(o) {
      return f.keys.forEach((c) => {
        ~c.indexOf(".") || typeof o[c] > "u" && (o[c] = void 0);
      }), o;
    }
    function $t(o, c, p, u = !1) {
      Object.keys(p).forEach(function(i) {
        oe(o, i.split(".")) || (re(o, i.split("."), p[i]), u && (pt[i] = !0), (c[i] || []).forEach(function(g) {
          oe(o, g.split(".")) || re(o, g.split("."), p[i]);
        }));
      });
    }
    function oe(o, c) {
      let p = o;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const u = c[c.length - 1];
      return typeof p != "object" ? !1 : u in p;
    }
    function re(o, c, p) {
      let u = o;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = yt(R), typeof u == "object" && u[R] === void 0 && (u[R] = {}), typeof u[R] != "object" || Array.isArray(u[R]) ? (Array.isArray(u[R]) ? u[R].push({}) : u[R] = [u[R], {}], u = u[R][u[R].length - 1]) : u = u[R];
      });
      const i = yt(c[c.length - 1]), g = w(c.join("."), f.arrays), m = Array.isArray(p);
      let $ = h["duplicate-arguments-array"];
      !$ && w(i, f.nargs) && ($ = !0, (!Q(u[i]) && f.nargs[i] === 1 || Array.isArray(u[i]) && u[i].length === f.nargs[i]) && (u[i] = void 0)), p === Se() ? u[i] = Se(u[i]) : Array.isArray(u[i]) ? $ && g && m ? u[i] = h["flatten-duplicate-arrays"] ? u[i].concat(p) : (Array.isArray(u[i][0]) ? u[i] : [u[i]]).concat([p]) : !$ && !!g == !!m ? u[i] = p : u[i] = u[i].concat([p]) : u[i] === void 0 && g ? u[i] = m ? p : [p] : $ && !(u[i] === void 0 || w(i, f.counts) || w(i, f.bools)) ? u[i] = [u[i], p] : u[i] = p;
    }
    function Xt(...o) {
      o.forEach(function(c) {
        Object.keys(c || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(l[p] || []), f.aliases[p].concat(p).forEach(function(u) {
            if (/-/.test(u) && h["camel-case-expansion"]) {
              const i = ie(u);
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(u) {
            if (u.length > 1 && /[A-Z]/.test(u) && h["camel-case-expansion"]) {
              const i = Lt(u, "-");
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].forEach(function(u) {
            f.aliases[u] = [p].concat(f.aliases[p].filter(function(i) {
              return u !== i;
            }));
          }));
        });
      });
    }
    function w(o, c) {
      const p = [].concat(f.aliases[o] || [], o), u = Object.keys(c), i = p.find((g) => u.includes(g));
      return i ? c[i] : !1;
    }
    function bt(o) {
      const c = Object.keys(f);
      return [].concat(c.map((u) => f[u])).some(function(u) {
        return Array.isArray(u) ? u.includes(o) : u[o];
      });
    }
    function Yt(o, ...c) {
      return [].concat(...c).some(function(u) {
        const i = o.match(u);
        return i && bt(i[1]);
      });
    }
    function Zt(o) {
      if (o.match(q) || !o.match(/^-[^-]+/))
        return !1;
      let c = !0, p;
      const u = o.slice(1).split("");
      for (let i = 0; i < u.length; i++) {
        if (p = o.slice(i + 2), !bt(u[i])) {
          c = !1;
          break;
        }
        if (u[i + 1] && u[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(u[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || u[i + 1] && u[i + 1].match(/\W/))
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
      return !w(o, f.bools) && !w(o, f.counts) && `${o}` in y ? y[o] : en(tn(o));
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
      Object.keys(f.counts).find((o) => w(o, f.arrays) ? (z = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", o)), !0) : w(o, f.nargs) ? (z = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", o)), !0) : !1);
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
    r = r.filter(function(l, h, y) {
      return y.indexOf(l) === h;
    });
    const a = r.pop();
    a !== void 0 && typeof a == "string" && (n[a] = r);
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
`).map((r) => r.split("	"));
    let s = 0;
    return n.forEach((r) => {
      r.length > 1 && T.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), T.stringWidth(r[0])));
    }), n.forEach((r) => {
      this.div(...r.map((a, l) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: l === 0 && r.length > 1 ? s : void 0
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
      s.forEach((l, h) => {
        const { width: y } = t[h], x = this.negatePadding(t[h]);
        let O = l;
        if (x > T.stringWidth(l) && (O += " ".repeat(x - T.stringWidth(l))), t[h].align && t[h].align !== "left" && this.wrap) {
          const M = xn[t[h].align];
          O = M(O, x), T.stringWidth(O) < x && (O += " ".repeat((y || 0) - T.stringWidth(O) - 1));
        }
        const L = t[h].padding || [0, 0, 0, 0];
        L[ye] && (a += " ".repeat(L[ye])), a += vt(t[h], O, "| "), a += O, a += vt(t[h], O, " |"), L[be] && (a += " ".repeat(L[be])), r === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), r = s ? s[0].length : 0, a = n.text, l = T.stringWidth(a.trimRight());
    return n.span ? this.wrap ? r < l ? t : (n.hidden = !0, a.trimRight() + " ".repeat(r - l) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let r;
    return t.forEach((a, l) => {
      a.width = s[l], this.wrap ? r = T.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : r = a.text.split(`
`), a.border && (r.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (r.unshift(...new Array(a.padding[On] || 0).fill("")), r.push(...new Array(a.padding[Sn] || 0).fill(""))), r.forEach((h, y) => {
        n[y] || n.push([]);
        const x = n[y];
        for (let O = 0; O < l; O++)
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
      return t.map((l) => l.width || T.stringWidth(l.text));
    let n = t.length, s = this.width;
    const r = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), a = n ? Math.floor(s / n) : 0;
    return r.map((l, h) => l === void 0 ? Math.max(a, Nn(t[h])) : l);
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
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), r = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let l = r === 1 ? n : s;
    this.cache[this.locale][n] && (l = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const h = [l];
    return ~l.indexOf("%d") && h.push(r), U.format.apply(U.format, h.concat(t));
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
      const l = n[a + 1];
      s += r, typeof l < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, r = n.locale, a = n.cb, l = this._resolveLocaleFile(s, r), h = JSON.stringify(this.cache[r], null, 2);
    U.fs.writeFile(l, h, "utf-8", function(y) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(y);
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
      const r = U.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
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
const D = "\x1B[44m", C = "\x1B[43m", K = "\x1B[41m", Ct = "\x1B[42m", b = "\x1B[0m", v = "\x1B[33m", A = "\x1B[36m", d = "\x1B[0m", Un = {
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
  n.length > Le && Pe.push({ filePath: t, message: `${n.length > Le * 2 ? K : C}(${n.length} lines)${b}` });
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
}, Hn = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
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
function H(...e) {
  return E(`${Z(B(...e))}?`);
}
function B(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(Yn, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${Z(B(...e))}+`);
}
const k = "i", P = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(B(...e).toString(), [...t || ""].join(""));
}, Te = [], ts = (e, t) => {
  if (!e)
    return;
  const n = N(W, "else", W, [P, k]), s = e.content.match(n);
  s?.length && Te.push({ filePath: t, message: `else clauses found ${K}(${s.length})${b}` });
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
  const n = N(W, "if", W, [P, k]), s = N(W, "else", W, [P, k]), r = N(W, "for", W, [P, k]), a = N(W, "while", W, [P, k]), l = N(W, "case", W, [P, k]), h = e.content.match(n), y = e.content.match(s), x = e.content.match(r), O = e.content.match(a), L = e.content.match(l), M = (h?.length || 0) + (y?.length || 0) + (x?.length || 0) + (O?.length || 0) + (L?.length || 0);
  M > ss && We.push({ filePath: t, message: `${M > os ? K : C}(${M})${b}` });
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
`).findIndex((l) => l.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, r = t.split(`
`).length;
  return s + r - 1;
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
  ), r = e.content.match(n), a = e.content.match(s);
  if (r?.length || a?.length) {
    const l = r?.length ? r[0] : a?.length ? a[0] : "", h = G(e.content, l);
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
  s?.length && (s.some((a) => a.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${C}without a key${b}` }));
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
  const t = ht.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(r);
  !s?.length && !a?.length && De.push({ filePath: e, message: `component name is ${C}not PascalCase, nor kebab-case.${b}` });
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
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !ys.test(a)).length && Ue.push({ filePath: t, message: `prop names are ${C}not camelCased${b}` });
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
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > vs) {
      const a = G(e.content, r), l = r.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${a} ${C}${l}${b}`
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
    H(S(ue(` 	
\r`))),
    S(I("/>")),
    H(S(ue(` 	
\r`))),
    H("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const a = N(":", S(J), H(" "), "=", H(" "), I(`'"`), [
    "g"
  ]);
  r?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const h = l.match(a);
    if (h?.length) {
      const y = G(e.source, l);
      Ge.push({ filePath: t, message: `line #${y} ${C}${h}${b}` });
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
    H(Bt, Mt),
    H(S(I(">"))),
    "></",
    S(J),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((a) => {
    const l = G(e.source, a), h = a.split(`
`).at(-1)?.trim() || "";
    qe.push({ filePath: t, message: `line #${l} ${C}${h}${b}` });
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
}, He = [], xt = [], Ns = ["v-slot", "v-bind", "v-on"], js = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Ns.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = G(e.source, s);
      He.push({ filePath: t, message: `line #${r} ${C}${s}${b}` }), xt.some((a) => a.filePath === t) || xt.push({ filePath: t });
    }
  });
}, Rs = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ps = 3, Ls = (e) => {
  const t = N(
    S(I("/")).grouped(),
    B(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = N(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), a = s.match(r);
    (!a || a.length < Ps) && Ke.push({ filePath: e, message: `${s} is not a ${C}full word.${b}` });
  }
}, Fs = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ full-word component names${d}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Ts = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), a = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: a }
  ].filter((y) => y.index !== -1);
  l.every((y, x) => x === 0 ? !0 : l[x - 1].index < y.index) || Qe.push({ filePath: t, message: `Top level elements are ${C}not following the correct order.${b}` });
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
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = s.exec(n)) !== null; ) {
    const l = a[1], h = a[2];
    if (h) {
      const x = Array.from(h.matchAll(r), (L) => L[1]).filter((L) => Ot.includes(L));
      let O = -1;
      for (const L of x) {
        const M = Ot.indexOf(L);
        if (M !== -1 && M < O) {
          Xe.push({
            filePath: t,
            message: `tag has attributes out of order ${C}(${l})${b}`
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
  const n = N("defineProps", H("<"), H("("), "{", S(Jn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > Bs && Ye.push({ filePath: t, message: `props found ${K}(${r})${b}` });
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
`).length > kt && Ze.push({ filePath: n, message: `function ${K}(${Hs(e)})${b} is too long` });
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
    let a = "", l = "", h = !1;
    if (n.slice(r, r + 8) === "function")
      r += 8, h = !0, a = Us(n, r), r = Vs(n, r);
    else if (n.slice(r, r + 5) === "const") {
      const y = Gs(n, r);
      y && (h = !0, a = y.name, r = y.bodyStart);
    }
    if (h) {
      const { body: y, end: x } = qs(n, r);
      l = y, r = x, Ds(a, l, t);
    } else
      r++;
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
  const s = t.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
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
    S(ue(`'"`), S(J), ue(`'"`), Y.times.any(), H(",", Y.times.any())),
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
  let r;
  const a = /* @__PURE__ */ new Set();
  for (; (r = n.exec(e.content)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((y) => a.add(y));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const h = l[1], y = l[2], x = l[3];
    a.has(x) && y === x && et.push({
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
    const r = s[1];
    r.length < Dt && tt.push({ filePath: t, message: `${K}(${r})${b}` });
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
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > no) {
      const a = r.split(`
`)[0], l = G(e.content, a);
      Ut.push({ filePath: t, message: `line #${l} ${C}computed${b}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
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
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const a = G(e.content.trim(), r), l = r.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${a} ${C}(${l})${b}` });
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
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(B("$parent").or("getCurrentInstance"), [P]), a = e.content.match(n), l = e.content.match(s);
  if (l) {
    const y = l[1].split(".")[0], x = a ? a[1] : "";
    if (x.includes(y)) {
      const O = G(e.content.trim(), x);
      we.push({
        filePath: t,
        message: `line #${O} ${C}(${y})${b}`
      });
    }
  }
  const h = e.content.match(r);
  if (h) {
    const y = G(e.content.trim(), h[0]);
    we.push({
      filePath: t,
      message: `line #${y} ${C}(${h[0]})${b}`
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
  e.content.match(n)?.forEach((r) => {
    const a = G(e.content, r);
    st.push({
      filePath: t,
      message: `line #${a} ${C}indentation: ${r.length}${b}`
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
  s.forEach((r, a) => {
    const l = r.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const h = s[a + 1]?.trim();
      (!h || !h.startsWith("{") && !l.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${a} if statement without curly braces: ${K}${l}${b}`
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
  e.content.match(n)?.forEach((r) => {
    const a = G(e.content, r);
    it.push({
      filePath: t,
      message: `line #${a} ${C}magic number: ${r.length}${b}`
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
    const r = s[1], a = s[2];
    a.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && a.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${C}<${r}>${b} should have its attributes on separate lines` });
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
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const a = r[1];
      wo.includes(a) && at.push({ filePath: t, message: `${C}(${a})${b}` });
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
  const t = {}, n = ({ file: a, rule: l, title: h, description: y, message: x }) => {
    const O = e === "rule" ? l : a;
    t[O] || (t[O] = []), t[O].push({ file: a, rule: l, title: h, description: y, message: x });
  }, s = (a) => {
    a().forEach((h) => {
      n(h);
    });
  };
  s(as), s(hs), s(gs), s(ms), s(us), s(bs), s(io), s(Rs), s(Fs), s(Eo), s(ws), s(Os), s(_s), s(oo), s(Cs), s(Ws), s(Ms), s(ao), s(Ao), s(is), s(fo), s(ns), s(Qs), s(po), s(go), s(bo), s(Ys), s(Hn), s(Js), s(Gn), s(to), s(zs);
  const r = [];
  return Object.keys(t).forEach((a) => {
    console.log(`
 - ${a}`), t[a].forEach((l) => {
      if (r.some((h) => h.file === l.file)) {
        const h = r.find((y) => y.file === l.file);
        h && h.errors++;
      } else
        r.push({ file: l.file, errors: 1 });
      console.log(e === "file" ? `   Rule: ${l.rule}` : `   File: ${l.file}`), console.log(`   Description: ${l.description}`), console.log(`   Message: ${l.message || "🚨"}
`);
    });
  }), r;
}, xo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`), n.includes("vue-essential") && (cs(t), fs(s, t), ls(e.styles, t), ds(e.template, t), ps(e.template, t)), n.includes("vue-strong") && ($s(t), Es(s, t), ro(s, t), so(s, t), Ss(e, t), As(e.template, t), xs(e, t), js(e, t), Ls(t), yo(e.template, t)), n.includes("vue-recommended") && (Ts(e.source, t), Is(e.template, t)), n.includes("vue-caution") && (co(s, t), vo(e.styles, t)), n.includes("rrd") && (rs(s, t), uo(s, t), ts(s, t), Ks(s, t), ho(e.template, t), mo(s, t), $o(s, t), Xs(s, t), qn(e.script, t), Zs(s, t), Vn(s, t), eo(s, t), ks(s, t));
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
      Oo.some((a) => s.includes(`${a}`)) && await Gt(s);
    else if (n.endsWith(".vue")) {
      lt++;
      const a = await Oe.readFile(s, "utf-8");
      ut += a.split(/\r\n|\r|\n/).length;
      const { descriptor: l } = dn(a);
      xo(l, s, Vt);
    }
  }
}, So = async (e, t = [], n) => {
  console.log(`

${D}Analyzing Vue files in ${e}${b}`);
  const s = te.filter((h) => !t.includes(h));
  console.log(`Applying ${D}${t.length}${b} rulesets ${D}${t}${b} and ignoring ${D}${s.length}${b} rulesets ${D}${s}${b} grouping by ${D}${n}${b}`), Vt = t, await Gt(e), console.log(`Found ${D}${lt}${b} Vue files`);
  const r = Co(n), a = r.reduce((h, { errors: y }) => h + y, 0);
  console.log(`Found ${D}${a}${b} errors, ${D}${ut}${b} lines of code in ${D}${lt}${b} files`);
  const l = Math.ceil((1 - a / ut) * 100);
  l < 75 && console.log(`${K}Code health is LOW: ${l}%${b}`), l >= 75 && l < 85 && console.log(`${C}Code health is MEDIUM ${l}%${b}`), l >= 85 && l < 95 && console.log(`${D}Code health is OK: ${l}%${b}`), l >= 95 && console.log(`${Ct}Code health is GOOD: ${l}%${b}`), r.forEach(({ file: h, errors: y }) => {
    console.log(`- ${h}, ${y} errors`);
  }), a || console.log(`${Ct}No code smells detected!${b}`);
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
${K}Cannot use both --ignore and --apply options together.${b}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), So(e.path, t, e.group);
  }
).help().argv;
function Nt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((r) => !te.includes(r));
    return s.length > 0 && (console.error(
      `
${K}Invalid ${e} values: ${s.join(
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
