import tn from "yargs";
import { format as Ot, inspect as nn } from "util";
import { normalize as sn, resolve as ne, dirname as Re, basename as on, extname as rn, relative as cn } from "path";
import { readFileSync as lt, statSync as _t, readdirSync as an, writeFile as ln } from "fs";
import { notStrictEqual as un, strictEqual as fn } from "assert";
import { fileURLToPath as hn } from "url";
import Se from "node:fs/promises";
import ut from "node:path";
import { parse as pn } from "@vue/compiler-sfc";
class ie extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ie);
  }
}
function Nt() {
  return mn() ? 0 : 1;
}
function mn() {
  return dn() && !process.defaultApp;
}
function dn() {
  return !!process.versions.electron;
}
function gn(e) {
  return e.slice(Nt() + 1);
}
function $n() {
  return process.argv[Nt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function re(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let a = o ? o[0].length : 0; a < e.length; a++) {
      let u = e.charAt(a);
      s && (s = !1, u = u.toUpperCase()), a !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function jt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const a = n.charAt(o), u = e.charAt(o);
    a !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Rt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function bn(e) {
  if (Array.isArray(e))
    return e.map((u) => typeof u != "string" ? u + "" : u);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const a = [];
  for (let u = 0; u < e.length; u++) {
    if (n = s, s = e.charAt(u), s === " " && !o) {
      n !== " " && t++;
      continue;
    }
    s === o ? o = null : (s === "'" || s === '"') && !o && (o = s), a[t] || (a[t] = ""), a[t] += s;
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
let Q;
class yn {
  constructor(t) {
    Q = t;
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
    }, n), o = bn(t), a = typeof t == "string", u = En(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), y = Object.assign(/* @__PURE__ */ Object.create(null), s.default), x = s.configObjects || [], S = s.envPrefix, L = h["populate--"], B = L ? "--" : "_", he = /* @__PURE__ */ Object.create(null), ft = /* @__PURE__ */ Object.create(null), J = s.__ || Q.format, f = {
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
    }, G = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ve = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const c = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      p && (f[p][c] = !0), f.arrays[c] = !0, f.keys.push(c);
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
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([r, c]) => {
      typeof c == "number" && (f.nargs[r] = c, f.keys.push(r));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([r, c]) => {
      typeof c == "function" && (f.coercions[r] = c, f.keys.push(r));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(r) {
      f.configs[r] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([r, c]) => {
      (typeof c == "boolean" || typeof c == "function") && (f.configs[r] = c);
    })), Qt(s.key, u, s.default, f.arrays), Object.keys(y).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(c) {
        y[c] = y[r];
      });
    });
    let z = null;
    en();
    let pe = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ht = {};
    for (let r = 0; r < o.length; r++) {
      const c = o[r], p = c.replace(/^-{3,}/, "---");
      let l, i, g, m, $, R;
      if (c !== "--" && /^-/.test(c) && $e(c))
        Ae(c);
      else if (p.match(/^---+(=|$)/)) {
        Ae(c);
        continue;
      } else if (c.match(/^--.+=/) || !h["short-option-groups"] && c.match(/^-.+=/))
        m = c.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], f.arrays) ? r = de(r, m[1], o, m[2]) : w(m[1], f.nargs) !== !1 ? r = me(r, m[1], o, m[2]) : _(m[1], m[2], !0));
      else if (c.match(ve) && h["boolean-negation"])
        m = c.match(ve), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], _(i, w(i, f.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !h["short-option-groups"] && c.match(/^-[^-]+/))
        m = c.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!$.match(/^-/) || $.match(G)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), r++) : _(i, te(i))));
      else if (c.match(/^-.\..+=/))
        m = c.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && _(m[1], m[2]);
      else if (c.match(/^-.\..+/) && !c.match(G))
        $ = o[r + 1], m = c.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], $ !== void 0 && !$.match(/^-/) && !w(i, f.bools) && !w(i, f.counts) ? (_(i, $), r++) : _(i, te(i)));
      else if (c.match(/^-[^-]+/) && !c.match(G)) {
        g = c.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < g.length; F++) {
          if ($ = c.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = c.slice(F + 3), i = g[F], w(i, f.arrays) ? r = de(r, i, o, R) : w(i, f.nargs) !== !1 ? r = me(r, i, o, R) : _(i, R), l = !0;
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
            _(g[F], te(g[F]));
        }
        i = c.slice(-1)[0], !l && i !== "-" && (w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(G)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test($) ? (_(i, $), r++) : _(i, te(i))));
      } else if (c.match(/^-[0-9]$/) && c.match(G) && w(c.slice(1), f.bools))
        i = c.slice(1), _(i, te(i));
      else if (c === "--") {
        pe = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        pe = o.slice(r);
        break;
      } else
        Ae(c);
    }
    mt(j, !0), mt(j, !1), Vt(j), Gt(), dt(j, f.aliases, y, !0), qt(j), h["set-placeholder-key"] && Kt(j), Object.keys(f.counts).forEach(function(r) {
      se(j, r.split(".")) || _(r, 0);
    }), L && pe.length && (j[B] = []), pe.forEach(function(r) {
      j[B].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete j[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete j[r.split(".").map((c) => re(c)).join(".")], delete j[r];
    });
    function Ae(r) {
      const c = ge("_", r);
      (typeof c == "string" || typeof c == "number") && j._.push(c);
    }
    function me(r, c, p, l) {
      let i, g = w(c, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return K(l) || (z = Error(J("Argument unexpected for: %s", c))), _(c, te(c)), r;
      let m = K(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + m < g && (z = Error(J("Not enough arguments following: %s", c))), m = g;
      else {
        for (i = r + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(G) || $e(p[i])); i++)
          m++;
        m < g && (z = Error(J("Not enough arguments following: %s", c)));
      }
      let $ = Math.min(m, g);
      for (!K(l) && $ > 0 && (_(c, l), $--), i = r + 1; i < $ + r + 1; i++)
        _(c, p[i]);
      return r + $;
    }
    function de(r, c, p, l) {
      let i = [], g = l || p[r + 1];
      const m = w(c, f.nargs);
      if (w(c, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (K(g) || K(l) && /^-/.test(g) && !G.test(g) && !$e(g)) {
        if (y[c] !== void 0) {
          const $ = y[c];
          i = Array.isArray($) ? $ : [$];
        }
      } else {
        K(l) || i.push(Ce(c, l, !0));
        for (let $ = r + 1; $ < p.length && !(!h["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || (g = p[$], /^-/.test(g) && !G.test(g) && !$e(g))); $++)
          r = $, i.push(Ce(c, g, a));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (z = Error(J("Not enough arguments following: %s", c))), _(c, i), r;
    }
    function _(r, c, p = a) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const g = r.split(".").map(function(m) {
          return re(m);
        }).join(".");
        pt(r, g);
      }
      const l = Ce(r, c, p), i = r.split(".");
      oe(j, i, l), f.aliases[r] && f.aliases[r].forEach(function(g) {
        const m = g.split(".");
        oe(j, m, l);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let m = g.split(".");
        const $ = [].concat(i);
        $.shift(), m = m.concat($), (f.aliases[r] || []).includes(m.join(".")) || oe(j, m, l);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(m) {
        Object.defineProperty(ht, m, {
          enumerable: !0,
          get() {
            return c;
          },
          set($) {
            c = typeof $ == "string" ? Q.normalize($) : $;
          }
        });
      });
    }
    function pt(r, c) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [c], he[c] = !0), f.aliases[c] && f.aliases[c].length || pt(c, r);
    }
    function Ce(r, c, p) {
      p && (c = wn(c)), (w(r, f.bools) || w(r, f.counts)) && typeof c == "string" && (c = c === "true");
      let l = Array.isArray(c) ? c.map(function(i) {
        return ge(r, i);
      }) : ge(r, c);
      return w(r, f.counts) && (K(l) || typeof l == "boolean") && (l = Oe()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(c) ? l = c.map((i) => Q.normalize(i)) : l = Q.normalize(c)), l;
    }
    function ge(r, c) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(c) && (Rt(c) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !K(c) && w(r, f.numbers)) && (c = Number(c)), c;
    }
    function Vt(r) {
      const c = /* @__PURE__ */ Object.create(null);
      dt(c, f.aliases, y), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || c[p];
        if (l)
          try {
            let i = null;
            const g = Q.resolve(Q.cwd(), l), m = f.configs[p];
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
              i = Q.require(g);
            xe(i);
          } catch (i) {
            i.name === "PermissionDenied" ? z = i : r[p] && (z = Error(J("Invalid JSON config file: %s", l)));
          }
      });
    }
    function xe(r, c) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], i = c ? c + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? xe(l, i) : (!se(j, i.split(".")) || w(i, f.arrays) && h["combine-arrays"]) && _(i, l);
      });
    }
    function Gt() {
      typeof x < "u" && x.forEach(function(r) {
        xe(r);
      });
    }
    function mt(r, c) {
      if (typeof S > "u")
        return;
      const p = typeof S == "string" ? S : "", l = Q.env();
      Object.keys(l).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const g = i.split("__").map(function(m, $) {
            return $ === 0 && (m = m.substring(p.length)), re(m);
          });
          (c && f.configs[g.join(".")] || !c) && !se(r, g) && _(g.join("."), l[i]);
        }
      });
    }
    function qt(r) {
      let c;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(l) {
        if (!p.has(l) && (c = w(l, f.coercions), typeof c == "function"))
          try {
            const i = ge(l, c(r[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              p.add(g), r[g] = i;
            });
          } catch (i) {
            z = i;
          }
      });
    }
    function Kt(r) {
      return f.keys.forEach((c) => {
        ~c.indexOf(".") || typeof r[c] > "u" && (r[c] = void 0);
      }), r;
    }
    function dt(r, c, p, l = !1) {
      Object.keys(p).forEach(function(i) {
        se(r, i.split(".")) || (oe(r, i.split("."), p[i]), l && (ft[i] = !0), (c[i] || []).forEach(function(g) {
          se(r, g.split(".")) || oe(r, g.split("."), p[i]);
        }));
      });
    }
    function se(r, c) {
      let p = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const l = c[c.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function oe(r, c, p) {
      let l = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = $t(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const i = $t(c[c.length - 1]), g = w(c.join("."), f.arrays), m = Array.isArray(p);
      let $ = h["duplicate-arguments-array"];
      !$ && w(i, f.nargs) && ($ = !0, (!K(l[i]) && f.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === f.nargs[i]) && (l[i] = void 0)), p === Oe() ? l[i] = Oe(l[i]) : Array.isArray(l[i]) ? $ && g && m ? l[i] = h["flatten-duplicate-arrays"] ? l[i].concat(p) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([p]) : !$ && !!g == !!m ? l[i] = p : l[i] = l[i].concat([p]) : l[i] === void 0 && g ? l[i] = m ? p : [p] : $ && !(l[i] === void 0 || w(i, f.counts) || w(i, f.bools)) ? l[i] = [l[i], p] : l[i] = p;
    }
    function Qt(...r) {
      r.forEach(function(c) {
        Object.keys(c || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const i = re(l);
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const i = jt(l, "-");
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
    function w(r, c) {
      const p = [].concat(f.aliases[r] || [], r), l = Object.keys(c), i = p.find((g) => l.includes(g));
      return i ? c[i] : !1;
    }
    function gt(r) {
      const c = Object.keys(f);
      return [].concat(c.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function Ht(r, ...c) {
      return [].concat(...c).some(function(l) {
        const i = r.match(l);
        return i && gt(i[1]);
      });
    }
    function Xt(r) {
      if (r.match(G) || !r.match(/^-[^-]+/))
        return !1;
      let c = !0, p;
      const l = r.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (p = r.slice(i + 2), !gt(l[i])) {
          c = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return c;
    }
    function $e(r) {
      return h["unknown-options-as-args"] && Yt(r);
    }
    function Yt(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(G) || Xt(r) ? !1 : !Ht(r, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function te(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in y ? y[r] : Zt(Jt(r));
    }
    function Zt(r) {
      return {
        [U.BOOLEAN]: !0,
        [U.STRING]: "",
        [U.NUMBER]: void 0,
        [U.ARRAY]: []
      }[r];
    }
    function Jt(r) {
      let c = U.BOOLEAN;
      return w(r, f.strings) ? c = U.STRING : w(r, f.numbers) ? c = U.NUMBER : w(r, f.bools) ? c = U.BOOLEAN : w(r, f.arrays) && (c = U.ARRAY), c;
    }
    function K(r) {
      return r === void 0;
    }
    function en() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (z = Error(J("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (z = Error(J("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(ht, j),
      configuration: h,
      defaulted: Object.assign({}, ft),
      error: z,
      newAliases: Object.assign({}, he)
    };
  }
}
function En(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let a = o + 1; a < t.length; a++)
        if (t[o].filter(function(h) {
          return t[a].indexOf(h) !== -1;
        }).length) {
          t[o] = t[o].concat(t[a]), t.splice(a, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(u, h, y) {
      return y.indexOf(u) === h;
    });
    const a = o.pop();
    a !== void 0 && typeof a == "string" && (n[a] = o);
  }), n;
}
function Oe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function $t(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function wn(e) {
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
const bt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, yt = (Ne = (_e = process == null ? void 0 : process.versions) === null || _e === void 0 ? void 0 : _e.node) !== null && Ne !== void 0 ? Ne : (je = process == null ? void 0 : process.version) === null || je === void 0 ? void 0 : je.slice(1);
if (yt && Number(yt.match(/^([^.]+)/)[1]) < bt)
  throw Error(`yargs parser supports a minimum Node.js version of ${bt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const vn = process ? process.env : {}, Pt = new yn({
  cwd: process.cwd,
  env: () => vn,
  format: Ot,
  normalize: sn,
  resolve: ne,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(lt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return Pt.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return Pt.parse(e.slice(), t);
};
fe.camelCase = re;
fe.decamelize = jt;
fe.looksLikeNumber = Rt;
const An = {
  right: Nn,
  center: jn
}, Cn = 0, be = 1, xn = 2, ye = 3;
class Sn {
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
      this.div(...o.map((a, u) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
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
      let a = "";
      s.forEach((u, h) => {
        const { width: y } = t[h], x = this.negatePadding(t[h]);
        let S = u;
        if (x > T.stringWidth(u) && (S += " ".repeat(x - T.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const B = An[t[h].align];
          S = B(S, x), T.stringWidth(S) < x && (S += " ".repeat((y || 0) - T.stringWidth(S) - 1));
        }
        const L = t[h].padding || [0, 0, 0, 0];
        L[ye] && (a += " ".repeat(L[ye])), a += Et(t[h], S, "| "), a += S, a += Et(t[h], S, " |"), L[be] && (a += " ".repeat(L[be])), o === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, a = n.text, u = T.stringWidth(a.trimRight());
    return n.span ? this.wrap ? o < u ? t : (n.hidden = !0, a.trimRight() + " ".repeat(o - u) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((a, u) => {
      a.width = s[u], this.wrap ? o = T.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : o = a.text.split(`
`), a.border && (o.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (o.unshift(...new Array(a.padding[Cn] || 0).fill("")), o.push(...new Array(a.padding[xn] || 0).fill(""))), o.forEach((h, y) => {
        n[y] || n.push([]);
        const x = n[y];
        for (let S = 0; S < u; S++)
          x[S] === void 0 && x.push("");
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
    }), a = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(a, On(t[h])) : u);
  }
}
function Et(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function On(e) {
  const t = e.padding || [], n = 1 + (t[ye] || 0) + (t[be] || 0);
  return e.border ? n + 4 : n;
}
function _n() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Nn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function jn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Rn(e, t) {
  return T = t, new Sn({
    width: e?.width || _n(),
    wrap: e?.wrap
  });
}
const Lt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ft(e) {
  return e.replace(Lt, "");
}
function Pn(e, t) {
  const [n, s] = e.match(Lt) || ["", ""];
  e = Ft(e);
  let o = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (o += `
`), o += e.charAt(a);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Ln(e) {
  return Rn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Ft,
    wrap: Pn
  });
}
function Fn(e, t) {
  let n = ne(".", e), s;
  for (_t(n).isDirectory() || (n = Re(n)); ; ) {
    if (s = t(n, an(n)), s)
      return ne(n, s);
    if (n = Re(s = n), s === n)
      break;
  }
}
const Tn = {
  fs: {
    readFileSync: lt,
    writeFile: ln
  },
  format: Ot,
  resolve: ne,
  exists: (e) => {
    try {
      return _t(e).isFile();
    } catch {
      return !1;
    }
  }
};
let D;
class Wn {
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
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = o === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const h = [u];
    return ~u.indexOf("%d") && h.push(o), D.format.apply(D.format, h.concat(t));
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
    return t.forEach(function(o, a) {
      const u = n[a + 1];
      s += o, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, a = n.cb, u = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    D.fs.writeFile(u, h, "utf-8", function(y) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(y);
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
      const o = D.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return D.exists(t);
  }
}
function In(e, t) {
  D = t;
  const n = new Wn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Bn = (e) => In(e, Tn), Mn = "require is not supported by ESM", wt = "loading a directory of commands is not supported yet for ESM";
let ae;
try {
  ae = hn(import.meta.url);
} catch {
  ae = process.cwd();
}
const kn = ae.substring(0, ae.lastIndexOf("node_modules"));
un, fn, nn, kn || process.cwd(), on, Re, rn, cn, ne, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, lt, Bn({
  directory: ne(ae, "../../../locales"),
  updateFiles: !1
});
const ee = "\x1B[44m", C = "\x1B[43m", X = "\x1B[41m", zn = "\x1B[42m", E = "\x1B[0m", v = "\x1B[33m", A = "\x1B[36m", d = "\x1B[0m", Dn = {
  "vue-caution": ["implicitParentChildCommunication", "elementSelectorsWithScoped"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["topLevelElementOrder", "elementAttributeOrder"],
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
}, le = Object.keys(Dn), Pe = [], Le = 100, Un = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Le && Pe.push({ filePath: t, message: `${n.length > Le * 2 ? X : C}(${n.length} lines)${E}` });
}, Vn = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Le} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Fe = [], Gn = (e, t) => {
  !e || e.setup || Fe.push({ filePath: t, message: `${C}Plain <script> block${E} found` });
}, qn = () => {
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
function Y(e) {
  const t = e.toString();
  return Kn.test(t) ? t : `(?:${t})`;
}
const Qn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Hn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(Qn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => b(`${e}${M(...n)}`), {
      referenceTo: (n) => b(`${e}\\k<${n}>`)
    }),
    or: (...n) => b(`(?:${e}|${M(...n)})`),
    after: (...n) => b(`(?<=${M(...n)})${e}`),
    before: (...n) => b(`${e}(?=${M(...n)})`),
    notAfter: (...n) => b(`(?<!${M(...n)})${e}`),
    notBefore: (...n) => b(`${e}(?!${M(...n)})`),
    times: Object.assign((n) => b(`${Y(e)}{${n}}`), {
      any: () => b(`${Y(e)}*`),
      atLeast: (n) => b(`${Y(e)}{${n},}`),
      atMost: (n) => b(`${Y(e)}{0,${n}}`),
      between: (n, s) => b(`${Y(e)}{${n},${s}}`)
    }),
    optionally: () => b(`${Y(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Hn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const Xn = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function I(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Yn(...e) {
  return b(`(?:${e.map((t) => M(t)).join("|")})`);
}
const Zn = b(".");
b("\\b\\w+\\b");
const Z = b("\\w"), W = b("\\b"), Jn = b("\\d"), H = b("\\s"), ce = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), Tt = b("\\t"), Wt = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function q(...e) {
  return b(`${Y(M(...e))}?`);
}
function M(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(Xn, "\\$&") : t).join("")
  );
}
function O(...e) {
  return b(`${Y(M(...e))}+`);
}
const k = "i", P = "g", N = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, Te = [], es = (e, t) => {
  if (!e)
    return;
  const n = N(W, "else", W, [P, k]), s = e.content.match(n);
  s?.length && Te.push({ filePath: t, message: `else clauses found ${X}(${s.length})${E}` });
}, ts = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ else conditions${d}`,
      description: `👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], ns = 5, ss = 10, os = (e, t) => {
  if (!e)
    return;
  const n = N(W, "if", W, [P, k]), s = N(W, "else", W, [P, k]), o = N(W, "for", W, [P, k]), a = N(W, "while", W, [P, k]), u = N(W, "case", W, [P, k]), h = e.content.match(n), y = e.content.match(s), x = e.content.match(o), S = e.content.match(a), L = e.content.match(u), B = (h?.length || 0) + (y?.length || 0) + (x?.length || 0) + (S?.length || 0) + (L?.length || 0);
  B > ns && We.push({ filePath: t, message: `${B > ss ? X : C}(${B})${E}` });
}, rs = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${v}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], is = (e) => {
  if (e.includes("pages"))
    return;
  const t = ut.basename(e);
  if (t === "App.vue")
    return;
  const n = N(ce.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${C}single word${E}` });
}, cs = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ single name component${d}`,
      description: `👉 ${v}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], as = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${C}global style${E} used`
    });
  });
}, ls = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ global style${d}`,
      description: `👉 ${v}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], us = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps([", [P, k]);
  e.content.match(n)?.length && Me.push({ filePath: t, message: `${C}Props type${E} not defined` });
}, fs = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ simple prop${d}`,
      description: `👉 ${v}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, V = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, ke = [], hs = (e, t) => {
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
  ), o = e.content.match(n), a = e.content.match(s);
  if (o?.length || a?.length) {
    const u = o?.length ? o[0] : a?.length ? a[0] : "", h = V(e.content, u);
    ke.push({ filePath: t, message: `line #${h} ${C}v-if used with v-for${E}` });
  }
}, ps = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${v}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], ms = (e, t) => {
  if (!e)
    return;
  const n = N("<", O(I(">")), " v-for", O(I(">")), ">", [
    P,
    k
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${C}without a key${E}` }));
}, ds = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${v}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], gs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = ut.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(o);
  !s?.length && !a?.length && De.push({ filePath: e, message: `component name is ${C}not PascalCase, nor kebab-case.${E}` });
}, $s = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], bs = N(
  O(ce.lowercase).at.lineStart(),
  O(ce.uppercase, ce.lowercase.times.any().grouped()).at.lineEnd()
), ys = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !bs.test(a)).length && Ue.push({ filePath: t, message: `prop names are ${C}not camelCased${E}` });
}, Es = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${v}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], ws = 40, vs = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > ws) {
      const a = V(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${a} ${C}${u}${E}`
      });
    }
  });
}, As = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${v}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = N(
    "<",
    O(Z),
    q(O(ue(` 	
\r`))),
    O(I("/>")),
    q(O(ue(` 	
\r`))),
    q("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const a = N(":", O(Z), q(" "), "=", q(" "), I(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(a);
    if (h?.length) {
      const y = V(e.source, u);
      Ge.push({ filePath: t, message: `line #${y} ${C}${h}${E}` });
    }
  });
}, xs = () => {
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
    O(ce.uppercase, Z),
    q(Wt, Tt),
    q(O(I(">"))),
    "></",
    O(Z),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((a) => {
    const u = V(e.source, a), h = a.split(`
`).at(-1)?.trim() || "";
    qe.push({ filePath: t, message: `line #${u} ${C}${h}${E}` });
  });
}, Os = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${v}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], vt = [], _s = ["v-slot", "v-bind", "v-on"], Ns = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  _s.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = V(e.source, s);
      Ke.push({ filePath: t, message: `line #${o} ${C}${s}${E}` }), vt.some((a) => a.filePath === t) || vt.push({ filePath: t });
    }
  });
}, js = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Rs = 3, Ps = (e) => {
  const t = N(
    O(I("/")).grouped(),
    M(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = N(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), a = s.match(o);
    (!a || a.length < Rs) && Qe.push({ filePath: e, message: `${s} is not a ${C}full word.${E}` });
  }
}, Ls = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ full-word component names${d}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Fs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), a = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: a }
  ].filter((y) => y.index !== -1);
  u.every((y, x) => x === 0 ? !0 : u[x - 1].index < y.index) || He.push({ filePath: t, message: `Top level elements are ${C}not following the correct order.${E}` });
}, Ts = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ top level element order${d}`,
      description: `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], At = [
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
], Ws = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = s.exec(n)) !== null; ) {
    const u = a[1], h = a[2];
    if (h) {
      const x = Array.from(h.matchAll(o), (L) => L[1]).filter((L) => At.includes(L));
      let S = -1;
      for (const L of x) {
        const B = At.indexOf(L);
        if (B !== -1 && B < S) {
          Xe.push({
            filePath: t,
            message: `tag has attributes out of order ${C}(${u})${E}`
          });
          break;
        }
        S = B;
      }
    }
  }
}, Is = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${v}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Bs = 5, Ms = (e, t) => {
  if (!e)
    return;
  const n = N("defineProps", q("<"), q("("), "{", O(Zn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Bs && Ye.push({ filePath: t, message: `props found ${X}(${o})${E}` });
  }
}, ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ too many props${d}`,
      description: `👉 ${v}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], It = 20;
function zs(e, t, n) {
  t.split(`
`).length > It && Ze.push({ filePath: n, message: `function ${X}(${qs(e)})${E} is too long` });
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
function Us(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function Vs(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function Gs(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const a = e[o];
    a === "{" && n++, a === "}" && n--, s += a, o++;
  }
  return { body: s, end: o };
}
function qs(e) {
  return e.replace(/^const\s*/, "");
}
const Ks = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let a = "", u = "", h = !1;
    if (n.slice(o, o + 8) === "function")
      o += 8, h = !0, a = Ds(n, o), o = Us(n, o);
    else if (n.slice(o, o + 5) === "const") {
      const y = Vs(n, o);
      y && (h = !0, a = y.name, o = y.bodyStart);
    }
    if (h) {
      const { body: y, end: x } = Gs(n, o);
      u = y, o = x, zs(a, u, t);
    } else
      o++;
  }
}, Qs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ function size${d}`,
      description: `👉 ${v}Functions must be shorter than ${It} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Bt = 3, Ct = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Bt && Je.push({ filePath: n, message: `function ${C}${e}${E} has ${C}${s.length}${E} parameters` });
}, Hs = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Ct(s[1], s[2], t) : s[3] && Ct(s[3], s[4], t);
}, Xs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ parameter count${d}`,
      description: `👉 ${v}Max number of function parameters should be ${Bt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Ys = (e, t) => {
  if (!e)
    return;
  const n = N(
    "defineProps(",
    H.times.any(),
    "[",
    H.times.any(),
    O(ue(`'"`), O(Z), ue(`'"`), H.times.any(), q(",", H.times.any())),
    "]",
    H.times.any(),
    ")",
    [P]
  ), s = N(
    "<",
    O(Z).grouped(),
    H,
    I(">").times.any(),
    ":",
    O(Z).grouped(),
    H.times.any(),
    "=",
    H.times.any(),
    '"props.',
    O(Z).grouped(),
    '"',
    [P]
  );
  let o;
  const a = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((y) => a.add(y));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], y = u[2], x = u[3];
    a.has(x) && y === x && et.push({
      filePath: t,
      message: `Prop ${C}(${x})${E} is being drilled through ${C}${h}${E} component unmodified.`
    });
  }
}, Zs = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ props drilling${d}`,
      description: `👉 ${v}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Mt = 4, Js = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Mt && tt.push({ filePath: t, message: `${X}(${o})${E}` });
  }
}, eo = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ short variable names${d}`,
      description: `👉 ${v}Variable names must have a minimum length of ${Mt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, kt = [], Ee = [], to = 5, no = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > to) {
      const a = o.split(`
`)[0], u = V(e.content, a);
      kt.push({ filePath: t, message: `line #${u} ${C}computed${E}` }), Ee.push({ filePath: t }), Ee.some((h) => h.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, so = () => {
  const e = [];
  return Ee.length > 0 && kt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${v}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], oo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const a = V(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${a} ${C}(${u})${E}` });
  });
}, ro = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component files${d}`,
      description: `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], io = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = N(M("$parent").or("getCurrentInstance"), [P]), a = e.content.match(n), u = e.content.match(s);
  if (u) {
    const y = u[1].split(".")[0], x = a ? a[1] : "";
    if (x.includes(y)) {
      const S = V(e.content.trim(), x);
      we.push({
        filePath: t,
        message: `line #${S} ${C}(${y})${E}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const y = V(e.content.trim(), h[0]);
    we.push({
      filePath: t,
      message: `line #${y} ${C}(${h[0]})${E}`
    });
  }
}, co = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], xt = 5, ao = 3, lo = (e, t) => {
  if (!e)
    return;
  const n = N(Tt.times.atLeast(xt).or(H.times.atLeast(ao * xt)), [
    P,
    k
  ]);
  e.content.match(n)?.forEach((o) => {
    const a = V(e.content, o);
    st.push({
      filePath: t,
      message: `line #${a} ${C}indentation: ${o.length}${E}`
    });
  });
}, uo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ deep indentation${d}`,
      description: `👉 ${v}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], fo = (e, t) => {
  if (!e)
    return;
  const n = N("<a", W, [P, k]), s = e.content.match(n);
  s?.length && ot.push({ filePath: t, message: `${s?.length} ${C}html link found${E}` });
}, ho = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ html link${d}`,
      description: `👉 ${v}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], po = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, a) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[a + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${a} if statement without curly braces: ${X}${u}${E}`
      });
    }
  });
}, mo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ if without curly braces${d}`,
      description: `👉 ${v}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], go = (e, t) => {
  if (!e)
    return;
  const n = N(Jn, Yn(")", Wt), [P]);
  e.content.match(n)?.forEach((o) => {
    const a = V(e.content, o);
    it.push({
      filePath: t,
      message: `line #${a} ${C}magic number: ${o.length}${E}`
    });
  });
}, $o = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ magic numbers${d}`,
      description: `👉 ${v}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ct = [], bo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], a = s[2];
    a.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && a.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${C}<${o}>${E} should have its attributes on separate lines` });
  }
}, yo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${v}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Eo = [
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
], at = [], wo = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const a = o[1];
      Eo.includes(a) && at.push({ filePath: t, message: `${C}(${a})${E}` });
    }
  });
}, vo = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${v}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ao = (e) => {
  let t = 0;
  const n = {}, s = ({ file: a, rule: u, title: h, description: y, message: x }) => {
    const S = e === "rule" ? u : a;
    n[S] || (n[S] = []), n[S].push({ file: a, rule: u, title: h, description: y, message: x });
  }, o = (a) => {
    a().forEach((h) => {
      s(h), t++;
    });
  };
  return o(cs), o(fs), o(ds), o(ps), o(ls), o($s), o(ro), o(js), o(Ls), o(yo), o(Es), o(xs), o(Os), o(so), o(As), o(Ts), o(Is), o(co), o(vo), o(rs), o(uo), o(ts), o(Qs), o(ho), o(mo), o($o), o(Xs), o(qn), o(Zs), o(Vn), o(eo), o(ks), Object.keys(n).forEach((a) => {
    console.log(`
 - ${a}`), n[a].forEach((u) => {
      console.log(e === "file" ? `   Rule: ${u.rule}` : `   File: ${u.file}`), console.log(`   Description: ${u.description}`), console.log(`   Message: ${u.message || "🚨"}
`);
    });
  }), t;
}, Co = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`), n.includes("vue-essential") && (is(t), us(s, t), as(e.styles, t), ms(e.template, t), hs(e.template, t)), n.includes("vue-strong") && (gs(t), ys(s, t), oo(s, t), no(s, t), Ss(e, t), vs(e.template, t), Cs(e, t), Ns(e, t), Ps(t), bo(e.template, t)), n.includes("vue-recommended") && (Fs(e.source, t), Ws(e.template, t)), n.includes("vue-caution") && (io(s, t), wo(e.styles, t)), n.includes("rrd") && (os(s, t), lo(s, t), es(s, t), Ks(s, t), fo(e.template, t), po(s, t), go(s, t), Hs(s, t), Gn(e.script, t), Ys(s, t), Un(s, t), Js(s, t), Ms(s, t));
};
let zt = 0, Dt = [];
const xo = [
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
], Ut = async (e) => {
  const t = await Se.readdir(e);
  for (const n of t) {
    const s = ut.join(e, n);
    if ((await Se.stat(s)).isDirectory())
      xo.some((a) => s.includes(`/${a}`)) && await Ut(s);
    else if (n.endsWith(".vue")) {
      zt++;
      const a = await Se.readFile(s, "utf-8"), { descriptor: u } = pn(a);
      Co(u, s, Dt);
    }
  }
}, So = async (e, t = [], n) => {
  console.log(`

${ee}Analyzing Vue files in ${e}${E}`);
  const s = le.filter((o) => !t.includes(o));
  console.log(`Applying ${ee}${t.length}${E} rulesets ${ee}${t}${E} and ignoring ${ee}${s.length}${E} rulesets ${ee}${s}${E} grouping by ${ee}${n}${E}`), Dt = t, await Ut(e), console.log(`Found ${ee}${zt}${E} Vue files`), Ao(n) || console.log(`${zn}No code smells detected!${E}`);
};
tn(gn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rulesets to ignore",
    type: "string",
    coerce: St("ignore")
  }).option("apply", {
    describe: "Comma-separated list of rulesets to apply",
    type: "string",
    coerce: St("apply")
  }).option("group", {
    describe: "Group results by rule or file",
    type: "string",
    coerce: (t) => Oo(t),
    default: "rule"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${X}Cannot use both --ignore and --apply options together.${E}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...le];
    e.apply && (t = e.apply), e.ignore && (t = le.filter((n) => !e.ignore.includes(n))), So(e.path, t, e.group);
  }
).help().argv;
function St(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !le.includes(o));
    return s.length > 0 && (console.error(
      `
${X}Invalid ${e} values: ${s.join(
        ", "
      )}${E}. 
${v}Allowed values are: ${[...le].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function Oo(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
