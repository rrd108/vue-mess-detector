import Jt from "yargs";
import { format as St, inspect as en } from "util";
import { normalize as tn, resolve as ee, dirname as Ne, basename as nn, extname as sn, relative as on } from "path";
import { readFileSync as ct, statSync as xt, readdirSync as rn, writeFile as cn } from "fs";
import { notStrictEqual as an, strictEqual as ln } from "assert";
import { fileURLToPath as un } from "url";
import Ce from "node:fs/promises";
import at from "node:path";
import { parse as fn } from "@vue/compiler-sfc";
class oe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, oe);
  }
}
function Ot() {
  return hn() ? 0 : 1;
}
function hn() {
  return mn() && !process.defaultApp;
}
function mn() {
  return !!process.versions.electron;
}
function pn(e) {
  return e.slice(Ot() + 1);
}
function dn() {
  return process.argv[Ot()];
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
    const o = e.match(/^-+/);
    for (let a = o ? o[0].length : 0; a < e.length; a++) {
      let u = e.charAt(a);
      s && (s = !1, u = u.toUpperCase()), a !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function _t(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const a = n.charAt(o), u = e.charAt(o);
    a !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Nt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function gn(e) {
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
var V;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(V || (V = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let K;
class $n {
  constructor(t) {
    K = t;
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
    }, n), o = gn(t), a = typeof t == "string", u = bn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), w = Object.assign(/* @__PURE__ */ Object.create(null), s.default), x = s.configObjects || [], C = s.envPrefix, L = h["populate--"], I = L ? "--" : "_", le = /* @__PURE__ */ Object.create(null), lt = /* @__PURE__ */ Object.create(null), Y = s.__ || K.format, f = {
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
    }, G = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ee = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const c = typeof r == "object" ? r.key : r, m = Object.keys(r).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      m && (f[m][c] = !0), f.arrays[c] = !0, f.keys.push(c);
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
    })), qt(s.key, u, s.default, f.arrays), Object.keys(w).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(c) {
        w[c] = w[r];
      });
    });
    let k = null;
    Zt();
    let ue = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ut = {};
    for (let r = 0; r < o.length; r++) {
      const c = o[r], m = c.replace(/^-{3,}/, "---");
      let l, i, g, p, $, R;
      if (c !== "--" && /^-/.test(c) && pe(c))
        we(c);
      else if (m.match(/^---+(=|$)/)) {
        we(c);
        continue;
      } else if (c.match(/^--.+=/) || !h["short-option-groups"] && c.match(/^-.+=/))
        p = c.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (y(p[1], f.arrays) ? r = he(r, p[1], o, p[2]) : y(p[1], f.nargs) !== !1 ? r = fe(r, p[1], o, p[2]) : O(p[1], p[2], !0));
      else if (c.match(Ee) && h["boolean-negation"])
        p = c.match(Ee), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], O(i, y(i, f.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !h["short-option-groups"] && c.match(/^-[^-]+/))
        p = c.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], y(i, f.arrays) ? r = he(r, i, o) : y(i, f.nargs) !== !1 ? r = fe(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!$.match(/^-/) || $.match(G)) && !y(i, f.bools) && !y(i, f.counts) || /^(true|false)$/.test($) ? (O(i, $), r++) : O(i, J(i))));
      else if (c.match(/^-.\..+=/))
        p = c.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && O(p[1], p[2]);
      else if (c.match(/^-.\..+/) && !c.match(G))
        $ = o[r + 1], p = c.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], $ !== void 0 && !$.match(/^-/) && !y(i, f.bools) && !y(i, f.counts) ? (O(i, $), r++) : O(i, J(i)));
      else if (c.match(/^-[^-]+/) && !c.match(G)) {
        g = c.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < g.length; F++) {
          if ($ = c.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = c.slice(F + 3), i = g[F], y(i, f.arrays) ? r = he(r, i, o, R) : y(i, f.nargs) !== !1 ? r = fe(r, i, o, R) : O(i, R), l = !0;
            break;
          }
          if ($ === "-") {
            O(g[F], $);
            continue;
          }
          if (/[A-Za-z]/.test(g[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && y($, f.bools) === !1) {
            O(g[F], $), l = !0;
            break;
          }
          if (g[F + 1] && g[F + 1].match(/\W/)) {
            O(g[F], $), l = !0;
            break;
          } else
            O(g[F], J(g[F]));
        }
        i = c.slice(-1)[0], !l && i !== "-" && (y(i, f.arrays) ? r = he(r, i, o) : y(i, f.nargs) !== !1 ? r = fe(r, i, o) : ($ = o[r + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(G)) && !y(i, f.bools) && !y(i, f.counts) || /^(true|false)$/.test($) ? (O(i, $), r++) : O(i, J(i))));
      } else if (c.match(/^-[0-9]$/) && c.match(G) && y(c.slice(1), f.bools))
        i = c.slice(1), O(i, J(i));
      else if (c === "--") {
        ue = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        ue = o.slice(r);
        break;
      } else
        we(c);
    }
    ht(j, !0), ht(j, !1), Ut(j), Vt(), mt(j, f.aliases, w, !0), Dt(j), h["set-placeholder-key"] && Gt(j), Object.keys(f.counts).forEach(function(r) {
      te(j, r.split(".")) || O(r, 0);
    }), L && ue.length && (j[I] = []), ue.forEach(function(r) {
      j[I].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete j[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete j[r.split(".").map((c) => se(c)).join(".")], delete j[r];
    });
    function we(r) {
      const c = me("_", r);
      (typeof c == "string" || typeof c == "number") && j._.push(c);
    }
    function fe(r, c, m, l) {
      let i, g = y(c, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return q(l) || (k = Error(Y("Argument unexpected for: %s", c))), O(c, J(c)), r;
      let p = q(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        m.length - (r + 1) + p < g && (k = Error(Y("Not enough arguments following: %s", c))), p = g;
      else {
        for (i = r + 1; i < m.length && (!m[i].match(/^-[^0-9]/) || m[i].match(G) || pe(m[i])); i++)
          p++;
        p < g && (k = Error(Y("Not enough arguments following: %s", c)));
      }
      let $ = Math.min(p, g);
      for (!q(l) && $ > 0 && (O(c, l), $--), i = r + 1; i < $ + r + 1; i++)
        O(c, m[i]);
      return r + $;
    }
    function he(r, c, m, l) {
      let i = [], g = l || m[r + 1];
      const p = y(c, f.nargs);
      if (y(c, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (q(g) || q(l) && /^-/.test(g) && !G.test(g) && !pe(g)) {
        if (w[c] !== void 0) {
          const $ = w[c];
          i = Array.isArray($) ? $ : [$];
        }
      } else {
        q(l) || i.push(ve(c, l, !0));
        for (let $ = r + 1; $ < m.length && !(!h["greedy-arrays"] && i.length > 0 || p && typeof p == "number" && i.length >= p || (g = m[$], /^-/.test(g) && !G.test(g) && !pe(g))); $++)
          r = $, i.push(ve(c, g, a));
      }
      return typeof p == "number" && (p && i.length < p || isNaN(p) && i.length === 0) && (k = Error(Y("Not enough arguments following: %s", c))), O(c, i), r;
    }
    function O(r, c, m = a) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const g = r.split(".").map(function(p) {
          return se(p);
        }).join(".");
        ft(r, g);
      }
      const l = ve(r, c, m), i = r.split(".");
      ne(j, i, l), f.aliases[r] && f.aliases[r].forEach(function(g) {
        const p = g.split(".");
        ne(j, p, l);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const $ = [].concat(i);
        $.shift(), p = p.concat($), (f.aliases[r] || []).includes(p.join(".")) || ne(j, p, l);
      }), y(r, f.normalize) && !y(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(p) {
        Object.defineProperty(ut, p, {
          enumerable: !0,
          get() {
            return c;
          },
          set($) {
            c = typeof $ == "string" ? K.normalize($) : $;
          }
        });
      });
    }
    function ft(r, c) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [c], le[c] = !0), f.aliases[c] && f.aliases[c].length || ft(c, r);
    }
    function ve(r, c, m) {
      m && (c = yn(c)), (y(r, f.bools) || y(r, f.counts)) && typeof c == "string" && (c = c === "true");
      let l = Array.isArray(c) ? c.map(function(i) {
        return me(r, i);
      }) : me(r, c);
      return y(r, f.counts) && (q(l) || typeof l == "boolean") && (l = Se()), y(r, f.normalize) && y(r, f.arrays) && (Array.isArray(c) ? l = c.map((i) => K.normalize(i)) : l = K.normalize(c)), l;
    }
    function me(r, c) {
      return !h["parse-positional-numbers"] && r === "_" || !y(r, f.strings) && !y(r, f.bools) && !Array.isArray(c) && (Nt(c) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !q(c) && y(r, f.numbers)) && (c = Number(c)), c;
    }
    function Ut(r) {
      const c = /* @__PURE__ */ Object.create(null);
      mt(c, f.aliases, w), Object.keys(f.configs).forEach(function(m) {
        const l = r[m] || c[m];
        if (l)
          try {
            let i = null;
            const g = K.resolve(K.cwd(), l), p = f.configs[m];
            if (typeof p == "function") {
              try {
                i = p(g);
              } catch ($) {
                i = $;
              }
              if (i instanceof Error) {
                k = i;
                return;
              }
            } else
              i = K.require(g);
            Ae(i);
          } catch (i) {
            i.name === "PermissionDenied" ? k = i : r[m] && (k = Error(Y("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Ae(r, c) {
      Object.keys(r).forEach(function(m) {
        const l = r[m], i = c ? c + "." + m : m;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? Ae(l, i) : (!te(j, i.split(".")) || y(i, f.arrays) && h["combine-arrays"]) && O(i, l);
      });
    }
    function Vt() {
      typeof x < "u" && x.forEach(function(r) {
        Ae(r);
      });
    }
    function ht(r, c) {
      if (typeof C > "u")
        return;
      const m = typeof C == "string" ? C : "", l = K.env();
      Object.keys(l).forEach(function(i) {
        if (m === "" || i.lastIndexOf(m, 0) === 0) {
          const g = i.split("__").map(function(p, $) {
            return $ === 0 && (p = p.substring(m.length)), se(p);
          });
          (c && f.configs[g.join(".")] || !c) && !te(r, g) && O(g.join("."), l[i]);
        }
      });
    }
    function Dt(r) {
      let c;
      const m = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(l) {
        if (!m.has(l) && (c = y(l, f.coercions), typeof c == "function"))
          try {
            const i = me(l, c(r[l]));
            [].concat(f.aliases[l] || [], l).forEach((g) => {
              m.add(g), r[g] = i;
            });
          } catch (i) {
            k = i;
          }
      });
    }
    function Gt(r) {
      return f.keys.forEach((c) => {
        ~c.indexOf(".") || typeof r[c] > "u" && (r[c] = void 0);
      }), r;
    }
    function mt(r, c, m, l = !1) {
      Object.keys(m).forEach(function(i) {
        te(r, i.split(".")) || (ne(r, i.split("."), m[i]), l && (lt[i] = !0), (c[i] || []).forEach(function(g) {
          te(r, g.split(".")) || ne(r, g.split("."), m[i]);
        }));
      });
    }
    function te(r, c) {
      let m = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        m = m[i] || {};
      });
      const l = c[c.length - 1];
      return typeof m != "object" ? !1 : l in m;
    }
    function ne(r, c, m) {
      let l = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = dt(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const i = dt(c[c.length - 1]), g = y(c.join("."), f.arrays), p = Array.isArray(m);
      let $ = h["duplicate-arguments-array"];
      !$ && y(i, f.nargs) && ($ = !0, (!q(l[i]) && f.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === f.nargs[i]) && (l[i] = void 0)), m === Se() ? l[i] = Se(l[i]) : Array.isArray(l[i]) ? $ && g && p ? l[i] = h["flatten-duplicate-arrays"] ? l[i].concat(m) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([m]) : !$ && !!g == !!p ? l[i] = m : l[i] = l[i].concat([m]) : l[i] === void 0 && g ? l[i] = p ? m : [m] : $ && !(l[i] === void 0 || y(i, f.counts) || y(i, f.bools)) ? l[i] = [l[i], m] : l[i] = m;
    }
    function qt(...r) {
      r.forEach(function(c) {
        Object.keys(c || {}).forEach(function(m) {
          f.aliases[m] || (f.aliases[m] = [].concat(u[m] || []), f.aliases[m].concat(m).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const i = se(l);
              i !== m && f.aliases[m].indexOf(i) === -1 && (f.aliases[m].push(i), le[i] = !0);
            }
          }), f.aliases[m].concat(m).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const i = _t(l, "-");
              i !== m && f.aliases[m].indexOf(i) === -1 && (f.aliases[m].push(i), le[i] = !0);
            }
          }), f.aliases[m].forEach(function(l) {
            f.aliases[l] = [m].concat(f.aliases[m].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function y(r, c) {
      const m = [].concat(f.aliases[r] || [], r), l = Object.keys(c), i = m.find((g) => l.includes(g));
      return i ? c[i] : !1;
    }
    function pt(r) {
      const c = Object.keys(f);
      return [].concat(c.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function Kt(r, ...c) {
      return [].concat(...c).some(function(l) {
        const i = r.match(l);
        return i && pt(i[1]);
      });
    }
    function Qt(r) {
      if (r.match(G) || !r.match(/^-[^-]+/))
        return !1;
      let c = !0, m;
      const l = r.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (m = r.slice(i + 2), !pt(l[i])) {
          c = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || m === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return c;
    }
    function pe(r) {
      return h["unknown-options-as-args"] && Ht(r);
    }
    function Ht(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(G) || Qt(r) ? !1 : !Kt(r, /^-+([^=]+?)=[\s\S]*$/, Ee, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function J(r) {
      return !y(r, f.bools) && !y(r, f.counts) && `${r}` in w ? w[r] : Xt(Yt(r));
    }
    function Xt(r) {
      return {
        [V.BOOLEAN]: !0,
        [V.STRING]: "",
        [V.NUMBER]: void 0,
        [V.ARRAY]: []
      }[r];
    }
    function Yt(r) {
      let c = V.BOOLEAN;
      return y(r, f.strings) ? c = V.STRING : y(r, f.numbers) ? c = V.NUMBER : y(r, f.bools) ? c = V.BOOLEAN : y(r, f.arrays) && (c = V.ARRAY), c;
    }
    function q(r) {
      return r === void 0;
    }
    function Zt() {
      Object.keys(f.counts).find((r) => y(r, f.arrays) ? (k = Error(Y("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : y(r, f.nargs) ? (k = Error(Y("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(ut, j),
      configuration: h,
      defaulted: Object.assign({}, lt),
      error: k,
      newAliases: Object.assign({}, le)
    };
  }
}
function bn(e) {
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
    o = o.filter(function(u, h, w) {
      return w.indexOf(u) === h;
    });
    const a = o.pop();
    a !== void 0 && typeof a == "string" && (n[a] = o);
  }), n;
}
function Se(e) {
  return e !== void 0 ? e + 1 : 1;
}
function dt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function yn(e) {
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
var xe, Oe, _e;
const gt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, $t = (Oe = (xe = process == null ? void 0 : process.versions) === null || xe === void 0 ? void 0 : xe.node) !== null && Oe !== void 0 ? Oe : (_e = process == null ? void 0 : process.version) === null || _e === void 0 ? void 0 : _e.slice(1);
if ($t && Number($t.match(/^([^.]+)/)[1]) < gt)
  throw Error(`yargs parser supports a minimum Node.js version of ${gt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const En = process ? process.env : {}, jt = new $n({
  cwd: process.cwd,
  env: () => En,
  format: St,
  normalize: tn,
  resolve: ee,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(ct(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ae = function(t, n) {
  return jt.parse(t.slice(), n).argv;
};
ae.detailed = function(e, t) {
  return jt.parse(e.slice(), t);
};
ae.camelCase = se;
ae.decamelize = _t;
ae.looksLikeNumber = Nt;
const wn = {
  right: On,
  center: _n
}, vn = 0, de = 1, An = 2, ge = 3;
class Cn {
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
        const { width: w } = t[h], x = this.negatePadding(t[h]);
        let C = u;
        if (x > T.stringWidth(u) && (C += " ".repeat(x - T.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const I = wn[t[h].align];
          C = I(C, x), T.stringWidth(C) < x && (C += " ".repeat((w || 0) - T.stringWidth(C) - 1));
        }
        const L = t[h].padding || [0, 0, 0, 0];
        L[ge] && (a += " ".repeat(L[ge])), a += bt(t[h], C, "| "), a += C, a += bt(t[h], C, " |"), L[de] && (a += " ".repeat(L[de])), o === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
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
`), a.border && (o.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (o.unshift(...new Array(a.padding[vn] || 0).fill("")), o.push(...new Array(a.padding[An] || 0).fill(""))), o.forEach((h, w) => {
        n[w] || n.push([]);
        const x = n[w];
        for (let C = 0; C < u; C++)
          x[C] === void 0 && x.push("");
        x.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[ge] || 0) + (t.padding[de] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((u) => u.width || T.stringWidth(u.text));
    let n = t.length, s = this.width;
    const o = t.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), a = n ? Math.floor(s / n) : 0;
    return o.map((u, h) => u === void 0 ? Math.max(a, Sn(t[h])) : u);
  }
}
function bt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Sn(e) {
  const t = e.padding || [], n = 1 + (t[ge] || 0) + (t[de] || 0);
  return e.border ? n + 4 : n;
}
function xn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function On(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function _n(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Nn(e, t) {
  return T = t, new Cn({
    width: e?.width || xn(),
    wrap: e?.wrap
  });
}
const Rt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Lt(e) {
  return e.replace(Rt, "");
}
function jn(e, t) {
  const [n, s] = e.match(Rt) || ["", ""];
  e = Lt(e);
  let o = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (o += `
`), o += e.charAt(a);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Rn(e) {
  return Nn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Lt,
    wrap: jn
  });
}
function Ln(e, t) {
  let n = ee(".", e), s;
  for (xt(n).isDirectory() || (n = Ne(n)); ; ) {
    if (s = t(n, rn(n)), s)
      return ee(n, s);
    if (n = Ne(s = n), s === n)
      break;
  }
}
const Fn = {
  fs: {
    readFileSync: ct,
    writeFile: cn
  },
  format: St,
  resolve: ee,
  exists: (e) => {
    try {
      return xt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let U;
class Pn {
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
    U.fs.writeFile(u, h, "utf-8", function(w) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(w);
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
function Tn(e, t) {
  U = t;
  const n = new Pn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Wn = (e) => Tn(e, Fn), In = "require is not supported by ESM", yt = "loading a directory of commands is not supported yet for ESM";
let ie;
try {
  ie = un(import.meta.url);
} catch {
  ie = process.cwd();
}
const Bn = ie.substring(0, ie.lastIndexOf("node_modules"));
an, ln, en, Bn || process.cwd(), nn, Ne, sn, on, ee, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, ct, Wn({
  directory: ee(ie, "../../../locales"),
  updateFiles: !1
});
const Z = "\x1B[44m", S = "\x1B[43m", H = "\x1B[41m", Mn = "\x1B[42m", E = "\x1B[0m", v = "\x1B[33m", A = "\x1B[36m", d = "\x1B[0m", zn = {
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
    "scriptLength",
    "shortVariableName",
    "tooManyProps"
  ]
}, ce = Object.keys(zn), je = [], Re = 100, kn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Re && je.push({ filePath: t, message: `${n.length > Re * 2 ? H : S}(${n.length} lines)${E}` });
}, Un = () => {
  const e = [];
  return je.length > 0 && je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Re} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Le = [], Vn = (e, t) => {
  !e || e.setup || Le.push({ filePath: t, message: `${S}Plain <script> block${E} found` });
}, Dn = () => {
  const e = [];
  return Le.length > 0 && Le.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Gn = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return Gn.test(t) ? t : `(?:${t})`;
}
const qn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Kn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(qn, "$1$2")})`);
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
    times: Object.assign((n) => b(`${X(e)}{${n}}`), {
      any: () => b(`${X(e)}*`),
      atLeast: (n) => b(`${X(e)}{${n},}`),
      atMost: (n) => b(`${X(e)}{0,${n}}`),
      between: (n, s) => b(`${X(e)}{${n},${s}}`)
    }),
    optionally: () => b(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(Kn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const Qn = /[.*+?^${}()|[\]\\/]/g;
function Fe(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function B(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Hn(...e) {
  return b(`(?:${e.map((t) => M(t)).join("|")})`);
}
const Xn = b(".");
b("\\b\\w+\\b");
const be = b("\\w"), W = b("\\b"), Yn = b("\\d"), Zn = b("\\s"), re = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), Ft = b("\\t"), Pt = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function Q(...e) {
  return b(`${X(M(...e))}?`);
}
function M(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(Qn, "\\$&") : t).join("")
  );
}
function N(...e) {
  return b(`${X(M(...e))}+`);
}
const z = "i", P = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(M(...e).toString(), [...t || ""].join(""));
}, Pe = [], Jn = (e, t) => {
  if (!e)
    return;
  const n = _(W, "else", W, [P, z]), s = e.content.match(n);
  s?.length && Pe.push({ filePath: t, message: `else clauses found ${H}(${s.length})${E}` });
}, es = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ else conditions${d}`,
      description: `👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Te = [], ts = 5, ns = 10, ss = (e, t) => {
  if (!e)
    return;
  const n = _(W, "if", W, [P, z]), s = _(W, "else", W, [P, z]), o = _(W, "for", W, [P, z]), a = _(W, "while", W, [P, z]), u = _(W, "case", W, [P, z]), h = e.content.match(n), w = e.content.match(s), x = e.content.match(o), C = e.content.match(a), L = e.content.match(u), I = (h?.length || 0) + (w?.length || 0) + (x?.length || 0) + (C?.length || 0) + (L?.length || 0);
  I > ts && Te.push({ filePath: t, message: `${I > ns ? H : S}(${I})${E}` });
}, os = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${v}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], rs = (e) => {
  if (e.includes("pages"))
    return;
  const t = at.basename(e);
  if (t === "App.vue")
    return;
  const n = _(re.uppercase);
  t.slice(1).match(n)?.length || We.push({ filePath: e, message: `Component name is ${S}single word${E}` });
}, is = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ single name component${d}`,
      description: `👉 ${v}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], cs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Ie.push({
      filePath: t,
      message: `${S}global style${E} used`
    });
  });
}, as = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ global style${d}`,
      description: `👉 ${v}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], ls = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [P, z]);
  e.content.match(n)?.length && Be.push({ filePath: t, message: `${S}Props type${E} not defined` });
}, us = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ simple prop${d}`,
      description: `👉 ${v}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, D = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, Me = [], fs = (e, t) => {
  if (!e)
    return;
  const n = _(
    "<",
    N(B(">")),
    " v-if",
    N(B(">")),
    " v-for",
    N(B(">")),
    ">",
    [P, z]
  ), s = _(
    "<",
    N(B(">")),
    " v-for",
    N(B(">")),
    " v-if",
    N(B(">")),
    ">",
    [P, z]
  ), o = e.content.match(n), a = e.content.match(s);
  if (o?.length || a?.length) {
    const u = o?.length ? o[0] : a?.length ? a[0] : "", h = D(e.content, u);
    Me.push({ filePath: t, message: `line #${h} ${S}v-if used with v-for${E}` });
  }
}, hs = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
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
  const n = _("<", N(B(">")), " v-for", N(B(">")), ">", [
    P,
    z
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${S}without a key${E}` }));
}, ps = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${v}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], ds = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = at.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(o);
  !s?.length && !a?.length && ke.push({ filePath: e, message: `component name is ${S}not PascalCase, nor kebab-case.${E}` });
}, gs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], $s = _(
  N(re.lowercase).at.lineStart(),
  N(re.uppercase, re.lowercase.times.any().grouped()).at.lineEnd()
), bs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !$s.test(a)).length && Ue.push({ filePath: t, message: `prop names are ${S}not camelCased${E}` });
}, ys = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${v}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Es = 40, ws = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Es) {
      const a = D(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${a} ${S}${u}${E}`
      });
    }
  });
}, vs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${v}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], As = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    N(be),
    Q(N(Fe(` 	
\r`))),
    N(B("/>")),
    Q(N(Fe(` 	
\r`))),
    Q("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const a = _(":", N(be), Q(" "), "=", Q(" "), B(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(a);
    if (h?.length) {
      const w = D(e.source, u);
      De.push({ filePath: t, message: `line #${w} ${S}${h}${E}` });
    }
  });
}, Cs = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${v}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ss = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    N(re.uppercase, be),
    Q(Pt, Ft),
    Q(N(B(">"))),
    "></",
    N(be),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((a) => {
    const u = D(e.source, a), h = a.split(`
`).at(-1)?.trim() || "";
    Ge.push({ filePath: t, message: `line #${u} ${S}${h}${E}` });
  });
}, xs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${v}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Et = [], Os = ["v-slot", "v-bind", "v-on"], _s = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Os.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = D(e.source, s);
      qe.push({ filePath: t, message: `line #${o} ${S}${s}${E}` }), Et.some((a) => a.filePath === t) || Et.push({ filePath: t });
    }
  });
}, Ns = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], js = 3, Rs = (e) => {
  const t = _(
    N(B("/")).grouped(),
    M(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = _(
      Fe("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), a = s.match(o);
    (!a || a.length < js) && Ke.push({ filePath: e, message: `${s} is not a ${S}full word.${E}` });
  }
}, Ls = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ full-word component names${d}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Fs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), a = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: a }
  ].filter((w) => w.index !== -1);
  u.every((w, x) => x === 0 ? !0 : u[x - 1].index < w.index) || Qe.push({ filePath: t, message: `Top level elements are ${S}not following the correct order.${E}` });
}, Ps = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ top level element order${d}`,
      description: `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], wt = [
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
], Ts = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = s.exec(n)) !== null; ) {
    const u = a[1], h = a[2];
    if (h) {
      const x = Array.from(h.matchAll(o), (L) => L[1]).filter((L) => wt.includes(L));
      let C = -1;
      for (const L of x) {
        const I = wt.indexOf(L);
        if (I !== -1 && I < C) {
          He.push({
            filePath: t,
            message: `tag has attributes out of order ${S}(${u})${E}`
          });
          break;
        }
        C = I;
      }
    }
  }
}, Ws = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${v}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Is = 5, Bs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Q("<"), Q("("), "{", N(Xn), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > Is && Xe.push({ filePath: t, message: `props found ${H}(${o})${E}` });
  }
}, Ms = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ too many props${d}`,
      description: `👉 ${v}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Tt = 20;
function zs(e, t, n) {
  t.split(`
`).length > Tt && Ye.push({ filePath: n, message: `function ${H}(${Gs(e)})${E} is too long` });
}
function ks(e, t) {
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
function Ds(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const a = e[o];
    a === "{" && n++, a === "}" && n--, s += a, o++;
  }
  return { body: s, end: o };
}
function Gs(e) {
  return e.replace(/^const\s*/, "");
}
const qs = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let a = "", u = "", h = !1;
    if (n.slice(o, o + 8) === "function")
      o += 8, h = !0, a = ks(n, o), o = Us(n, o);
    else if (n.slice(o, o + 5) === "const") {
      const w = Vs(n, o);
      w && (h = !0, a = w.name, o = w.bodyStart);
    }
    if (h) {
      const { body: w, end: x } = Ds(n, o);
      u = w, o = x, zs(a, u, t);
    } else
      o++;
  }
}, Ks = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ function size${d}`,
      description: `👉 ${v}Functions must be shorter than ${Tt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Wt = 3, vt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Wt && Ze.push({ filePath: n, message: `function ${S}${e}${E} has ${S}${s.length}${E} parameters` });
}, Qs = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? vt(s[1], s[2], t) : s[3] && vt(s[3], s[4], t);
}, Hs = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ parameter count${d}`,
      description: `👉 ${v}Max number of function parameters should be ${Wt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], It = 4, Xs = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < It && Je.push({ filePath: t, message: `${H}(${o})${E}` });
  }
}, Ys = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ short variable names${d}`,
      description: `👉 ${v}Variable names must have a minimum length of ${It}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Bt = [], $e = [], Zs = 5, Js = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > Zs) {
      const a = o.split(`
`)[0], u = D(e.content, a);
      Bt.push({ filePath: t, message: `line #${u} ${S}computed${E}` }), $e.push({ filePath: t }), $e.some((h) => h.filePath === t) || $e.push({ filePath: t });
    }
  });
}, eo = () => {
  const e = [];
  return $e.length > 0 && Bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${v}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], to = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const a = D(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    et.push({ filePath: t, message: `line #${a} ${S}(${u})${E}` });
  });
}, no = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ component files${d}`,
      description: `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ye = [], so = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = _(M("$parent").or("getCurrentInstance"), [P]), a = e.content.match(n), u = e.content.match(s);
  if (u) {
    const w = u[1].split(".")[0], x = a ? a[1] : "";
    if (x.includes(w)) {
      const C = D(e.content.trim(), x);
      ye.push({
        filePath: t,
        message: `line #${C} ${S}(${w})${E}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const w = D(e.content.trim(), h[0]);
    ye.push({
      filePath: t,
      message: `line #${w} ${S}(${h[0]})${E}`
    });
  }
}, oo = () => {
  const e = [];
  return ye.length > 0 && ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], At = 5, ro = 3, io = (e, t) => {
  if (!e)
    return;
  const n = _(Ft.times.atLeast(At).or(Zn.times.atLeast(ro * At)), [
    P,
    z
  ]);
  e.content.match(n)?.forEach((o) => {
    const a = D(e.content, o);
    tt.push({
      filePath: t,
      message: `line #${a} ${S}indentation: ${o.length}${E}`
    });
  });
}, co = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ deep indentation${d}`,
      description: `👉 ${v}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], ao = (e, t) => {
  if (!e)
    return;
  const n = _("<a", W, [P, z]), s = e.content.match(n);
  s?.length && nt.push({ filePath: t, message: `${s?.length} ${S}html link found${E}` });
}, lo = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ html link${d}`,
      description: `👉 ${v}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], uo = (e, t) => {
  if (!e)
    return;
  const n = _(Yn, Hn(")", Pt), [P]);
  e.content.match(n)?.forEach((o) => {
    const a = D(e.content, o);
    st.push({
      filePath: t,
      message: `line #${a} ${S}magic number: ${o.length}${E}`
    });
  });
}, fo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ magic numbers${d}`,
      description: `👉 ${v}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ot = [], ho = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], a = s[2];
    a.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && a.split(`
`).length === 1 && ot.push({ filePath: t, message: `Element ${S}<${o}>${E} should have its attributes on separate lines` });
  }
}, mo = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${v}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, po = [
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
], rt = [], go = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const a = o[1];
      po.includes(a) && rt.push({ filePath: t, message: `${S}(${a})${E}` });
    }
  });
}, $o = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${v}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], bo = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, a) => {
    const u = o.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const h = s[a + 1]?.trim();
      (!h || !h.startsWith("{") && !u.endsWith("{")) && it.push({
        filePath: t,
        message: `line #${a} if statement without curly braces: ${H}${u}${E}`
      });
    }
  });
}, yo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${A}rrd ~ if without curly braces${d}`,
      description: `👉 ${v}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Eo = (e) => {
  let t = 0;
  const n = {}, s = ({ file: a, rule: u, title: h, description: w, message: x }) => {
    const C = e === "rule" ? u : a;
    n[C] || (n[C] = []), n[C].push({ file: a, rule: u, title: h, description: w, message: x });
  }, o = (a) => {
    a().forEach((h) => {
      s(h), t++;
    });
  };
  return o(is), o(us), o(ps), o(hs), o(as), o(gs), o(no), o(Ns), o(Ls), o(mo), o(ys), o(Cs), o(xs), o(eo), o(vs), o(Ps), o(Ws), o(oo), o($o), o(os), o(co), o(es), o(Ks), o(lo), o(yo), o(fo), o(Hs), o(Dn), o(Un), o(Ys), o(Ms), Object.keys(n).forEach((a) => {
    console.log(`
 - ${a}`), n[a].forEach((u) => {
      console.log(e === "file" ? `   Rule: ${u.rule}` : `   File: ${u.file}`), console.log(`   Description: ${u.description}`), console.log(`   Message: ${u.message || "🚨"}
`);
    });
  }), t;
}, wo = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`), n.includes("vue-essential") && (rs(t), ls(s, t), cs(e.styles, t), ms(e.template, t), fs(e.template, t)), n.includes("vue-strong") && (ds(t), bs(s, t), to(s, t), Js(s, t), Ss(e, t), ws(e.template, t), As(e, t), _s(e, t), Rs(t), ho(e.template, t)), n.includes("vue-recommended") && (Fs(e.source, t), Ts(e.template, t)), n.includes("vue-caution") && (so(s, t), go(e.styles, t)), n.includes("rrd") && (ss(s, t), io(s, t), Jn(s, t), qs(s, t), ao(e.template, t), bo(s, t), uo(s, t), Qs(s, t), Vn(e.script, t), kn(s, t), Xs(s, t), Bs(s, t));
};
let Mt = 0, zt = [];
const vo = [
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
], kt = async (e) => {
  const t = await Ce.readdir(e);
  for (const n of t) {
    const s = at.join(e, n);
    if ((await Ce.stat(s)).isDirectory())
      vo.some((a) => s.includes(`/${a}`)) && await kt(s);
    else if (n.endsWith(".vue")) {
      Mt++;
      const a = await Ce.readFile(s, "utf-8"), { descriptor: u } = fn(a);
      wo(u, s, zt);
    }
  }
}, Ao = async (e, t = [], n) => {
  console.log(`

${Z}Analyzing Vue files in ${e}${E}`);
  const s = ce.filter((o) => !t.includes(o));
  console.log(`Applying ${Z}${t.length}${E} rulesets ${Z}${t}${E} and ignoring ${Z}${s.length}${E} rulesets ${Z}${s}${E} grouping by ${Z}${n}${E}`), zt = t, await kt(e), console.log(`Found ${Z}${Mt}${E} Vue files`), Eo(n) || console.log(`${Mn}No code smells detected!${E}`);
};
Jt(pn(process.argv)).command(
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
  }).option("group", {
    describe: "Group results by rule or file",
    type: "string",
    coerce: (t) => Co(t),
    default: "rule"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${H}Cannot use both --ignore and --apply options together.${E}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...ce];
    e.apply && (t = e.apply), e.ignore && (t = ce.filter((n) => !e.ignore.includes(n))), Ao(e.path, t, e.group);
  }
).help().argv;
function Ct(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !ce.includes(o));
    return s.length > 0 && (console.error(
      `
${H}Invalid ${e} values: ${s.join(
        ", "
      )}${E}. 
${v}Allowed values are: ${[...ce].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function Co(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
