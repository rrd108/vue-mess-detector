import rn from "yargs";
import { format as Lt, inspect as cn } from "util";
import { normalize as an, resolve as se, dirname as Le, basename as ln, extname as un, relative as fn } from "path";
import { readFileSync as pt, statSync as Pt, readdirSync as hn, writeFile as pn } from "fs";
import { notStrictEqual as mn, strictEqual as dn } from "assert";
import { fileURLToPath as gn } from "url";
import Se from "node:fs/promises";
import mt from "node:path";
import { parse as $n } from "@vue/compiler-sfc";
class ce extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ce);
  }
}
function Ft() {
  return bn() ? 0 : 1;
}
function bn() {
  return yn() && !process.defaultApp;
}
function yn() {
  return !!process.versions.electron;
}
function En(e) {
  return e.slice(Ft() + 1);
}
function wn() {
  return process.argv[Ft()];
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
    for (let a = o ? o[0].length : 0; a < e.length; a++) {
      let u = e.charAt(a);
      s && (s = !1, u = u.toUpperCase()), a !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function Tt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const a = n.charAt(o), u = e.charAt(o);
    a !== u && o > 0 ? s += `${t}${n.charAt(o)}` : s += u;
  }
  return s;
}
function Wt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function vn(e) {
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
var q;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(q || (q = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let Y;
class An {
  constructor(t) {
    Y = t;
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
    }, n), o = vn(t), a = typeof t == "string", u = Cn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
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
    }, s.configuration), $ = Object.assign(/* @__PURE__ */ Object.create(null), s.default), A = s.configObjects || [], O = s.envPrefix, P = h["populate--"], B = P ? "--" : "_", he = /* @__PURE__ */ Object.create(null), dt = /* @__PURE__ */ Object.create(null), ee = s.__ || Y.format, f = {
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
    }, H = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ae = new RegExp("^--" + h["negation-prefix"] + "(.+)");
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
    })), Zt(s.key, u, s.default, f.arrays), Object.keys($).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(c) {
        $[c] = $[r];
      });
    });
    let V = null;
    on();
    let pe = [];
    const j = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), gt = {};
    for (let r = 0; r < o.length; r++) {
      const c = o[r], p = c.replace(/^-{3,}/, "---");
      let l, i, g, m, b, R;
      if (c !== "--" && /^-/.test(c) && $e(c))
        Ce(c);
      else if (p.match(/^---+(=|$)/)) {
        Ce(c);
        continue;
      } else if (c.match(/^--.+=/) || !h["short-option-groups"] && c.match(/^-.+=/))
        m = c.match(/^--?([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && (w(m[1], f.arrays) ? r = de(r, m[1], o, m[2]) : w(m[1], f.nargs) !== !1 ? r = me(r, m[1], o, m[2]) : N(m[1], m[2], !0));
      else if (c.match(Ae) && h["boolean-negation"])
        m = c.match(Ae), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], N(i, w(i, f.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !h["short-option-groups"] && c.match(/^-[^-]+/))
        m = c.match(/^--?(.+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : (b = o[r + 1], b !== void 0 && (!b.match(/^-/) || b.match(H)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, ne(i))));
      else if (c.match(/^-.\..+=/))
        m = c.match(/^-([^=]+)=([\s\S]*)$/), m !== null && Array.isArray(m) && m.length >= 3 && N(m[1], m[2]);
      else if (c.match(/^-.\..+/) && !c.match(H))
        b = o[r + 1], m = c.match(/^-(.\..+)/), m !== null && Array.isArray(m) && m.length >= 2 && (i = m[1], b !== void 0 && !b.match(/^-/) && !w(i, f.bools) && !w(i, f.counts) ? (N(i, b), r++) : N(i, ne(i)));
      else if (c.match(/^-[^-]+/) && !c.match(H)) {
        g = c.slice(1, -1).split(""), l = !1;
        for (let F = 0; F < g.length; F++) {
          if (b = c.slice(F + 2), g[F + 1] && g[F + 1] === "=") {
            R = c.slice(F + 3), i = g[F], w(i, f.arrays) ? r = de(r, i, o, R) : w(i, f.nargs) !== !1 ? r = me(r, i, o, R) : N(i, R), l = !0;
            break;
          }
          if (b === "-") {
            N(g[F], b);
            continue;
          }
          if (/[A-Za-z]/.test(g[F]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) && w(b, f.bools) === !1) {
            N(g[F], b), l = !0;
            break;
          }
          if (g[F + 1] && g[F + 1].match(/\W/)) {
            N(g[F], b), l = !0;
            break;
          } else
            N(g[F], ne(g[F]));
        }
        i = c.slice(-1)[0], !l && i !== "-" && (w(i, f.arrays) ? r = de(r, i, o) : w(i, f.nargs) !== !1 ? r = me(r, i, o) : (b = o[r + 1], b !== void 0 && (!/^(-|--)[^-]/.test(b) || b.match(H)) && !w(i, f.bools) && !w(i, f.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, ne(i))));
      } else if (c.match(/^-[0-9]$/) && c.match(H) && w(c.slice(1), f.bools))
        i = c.slice(1), N(i, ne(i));
      else if (c === "--") {
        pe = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        pe = o.slice(r);
        break;
      } else
        Ce(c);
    }
    bt(j, !0), bt(j, !1), Kt(j), Qt(), yt(j, f.aliases, $, !0), Xt(j), h["set-placeholder-key"] && Yt(j), Object.keys(f.counts).forEach(function(r) {
      oe(j, r.split(".")) || N(r, 0);
    }), P && pe.length && (j[B] = []), pe.forEach(function(r) {
      j[B].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(j).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete j[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(u).map((r) => u[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete j[r.split(".").map((c) => ie(c)).join(".")], delete j[r];
    });
    function Ce(r) {
      const c = ge("_", r);
      (typeof c == "string" || typeof c == "number") && j._.push(c);
    }
    function me(r, c, p, l) {
      let i, g = w(c, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return X(l) || (V = Error(ee("Argument unexpected for: %s", c))), N(c, ne(c)), r;
      let m = X(l) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + m < g && (V = Error(ee("Not enough arguments following: %s", c))), m = g;
      else {
        for (i = r + 1; i < p.length && (!p[i].match(/^-[^0-9]/) || p[i].match(H) || $e(p[i])); i++)
          m++;
        m < g && (V = Error(ee("Not enough arguments following: %s", c)));
      }
      let b = Math.min(m, g);
      for (!X(l) && b > 0 && (N(c, l), b--), i = r + 1; i < b + r + 1; i++)
        N(c, p[i]);
      return r + b;
    }
    function de(r, c, p, l) {
      let i = [], g = l || p[r + 1];
      const m = w(c, f.nargs);
      if (w(c, f.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (X(g) || X(l) && /^-/.test(g) && !H.test(g) && !$e(g)) {
        if ($[c] !== void 0) {
          const b = $[c];
          i = Array.isArray(b) ? b : [b];
        }
      } else {
        X(l) || i.push(xe(c, l, !0));
        for (let b = r + 1; b < p.length && !(!h["greedy-arrays"] && i.length > 0 || m && typeof m == "number" && i.length >= m || (g = p[b], /^-/.test(g) && !H.test(g) && !$e(g))); b++)
          r = b, i.push(xe(c, g, a));
      }
      return typeof m == "number" && (m && i.length < m || isNaN(m) && i.length === 0) && (V = Error(ee("Not enough arguments following: %s", c))), N(c, i), r;
    }
    function N(r, c, p = a) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const g = r.split(".").map(function(m) {
          return ie(m);
        }).join(".");
        $t(r, g);
      }
      const l = xe(r, c, p), i = r.split(".");
      re(j, i, l), f.aliases[r] && f.aliases[r].forEach(function(g) {
        const m = g.split(".");
        re(j, m, l);
      }), i.length > 1 && h["dot-notation"] && (f.aliases[i[0]] || []).forEach(function(g) {
        let m = g.split(".");
        const b = [].concat(i);
        b.shift(), m = m.concat(b), (f.aliases[r] || []).includes(m.join(".")) || re(j, m, l);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(m) {
        Object.defineProperty(gt, m, {
          enumerable: !0,
          get() {
            return c;
          },
          set(b) {
            c = typeof b == "string" ? Y.normalize(b) : b;
          }
        });
      });
    }
    function $t(r, c) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [c], he[c] = !0), f.aliases[c] && f.aliases[c].length || $t(c, r);
    }
    function xe(r, c, p) {
      p && (c = xn(c)), (w(r, f.bools) || w(r, f.counts)) && typeof c == "string" && (c = c === "true");
      let l = Array.isArray(c) ? c.map(function(i) {
        return ge(r, i);
      }) : ge(r, c);
      return w(r, f.counts) && (X(l) || typeof l == "boolean") && (l = _e()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(c) ? l = c.map((i) => Y.normalize(i)) : l = Y.normalize(c)), l;
    }
    function ge(r, c) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(c) && (Wt(c) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !X(c) && w(r, f.numbers)) && (c = Number(c)), c;
    }
    function Kt(r) {
      const c = /* @__PURE__ */ Object.create(null);
      yt(c, f.aliases, $), Object.keys(f.configs).forEach(function(p) {
        const l = r[p] || c[p];
        if (l)
          try {
            let i = null;
            const g = Y.resolve(Y.cwd(), l), m = f.configs[p];
            if (typeof m == "function") {
              try {
                i = m(g);
              } catch (b) {
                i = b;
              }
              if (i instanceof Error) {
                V = i;
                return;
              }
            } else
              i = Y.require(g);
            Oe(i);
          } catch (i) {
            i.name === "PermissionDenied" ? V = i : r[p] && (V = Error(ee("Invalid JSON config file: %s", l)));
          }
      });
    }
    function Oe(r, c) {
      Object.keys(r).forEach(function(p) {
        const l = r[p], i = c ? c + "." + p : p;
        typeof l == "object" && l !== null && !Array.isArray(l) && h["dot-notation"] ? Oe(l, i) : (!oe(j, i.split(".")) || w(i, f.arrays) && h["combine-arrays"]) && N(i, l);
      });
    }
    function Qt() {
      typeof A < "u" && A.forEach(function(r) {
        Oe(r);
      });
    }
    function bt(r, c) {
      if (typeof O > "u")
        return;
      const p = typeof O == "string" ? O : "", l = Y.env();
      Object.keys(l).forEach(function(i) {
        if (p === "" || i.lastIndexOf(p, 0) === 0) {
          const g = i.split("__").map(function(m, b) {
            return b === 0 && (m = m.substring(p.length)), ie(m);
          });
          (c && f.configs[g.join(".")] || !c) && !oe(r, g) && N(g.join("."), l[i]);
        }
      });
    }
    function Xt(r) {
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
            V = i;
          }
      });
    }
    function Yt(r) {
      return f.keys.forEach((c) => {
        ~c.indexOf(".") || typeof r[c] > "u" && (r[c] = void 0);
      }), r;
    }
    function yt(r, c, p, l = !1) {
      Object.keys(p).forEach(function(i) {
        oe(r, i.split(".")) || (re(r, i.split("."), p[i]), l && (dt[i] = !0), (c[i] || []).forEach(function(g) {
          oe(r, g.split(".")) || re(r, g.split("."), p[i]);
        }));
      });
    }
    function oe(r, c) {
      let p = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        p = p[i] || {};
      });
      const l = c[c.length - 1];
      return typeof p != "object" ? !1 : l in p;
    }
    function re(r, c, p) {
      let l = r;
      h["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(R) {
        R = wt(R), typeof l == "object" && l[R] === void 0 && (l[R] = {}), typeof l[R] != "object" || Array.isArray(l[R]) ? (Array.isArray(l[R]) ? l[R].push({}) : l[R] = [l[R], {}], l = l[R][l[R].length - 1]) : l = l[R];
      });
      const i = wt(c[c.length - 1]), g = w(c.join("."), f.arrays), m = Array.isArray(p);
      let b = h["duplicate-arguments-array"];
      !b && w(i, f.nargs) && (b = !0, (!X(l[i]) && f.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === f.nargs[i]) && (l[i] = void 0)), p === _e() ? l[i] = _e(l[i]) : Array.isArray(l[i]) ? b && g && m ? l[i] = h["flatten-duplicate-arrays"] ? l[i].concat(p) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([p]) : !b && !!g == !!m ? l[i] = p : l[i] = l[i].concat([p]) : l[i] === void 0 && g ? l[i] = m ? p : [p] : b && !(l[i] === void 0 || w(i, f.counts) || w(i, f.bools)) ? l[i] = [l[i], p] : l[i] = p;
    }
    function Zt(...r) {
      r.forEach(function(c) {
        Object.keys(c || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(u[p] || []), f.aliases[p].concat(p).forEach(function(l) {
            if (/-/.test(l) && h["camel-case-expansion"]) {
              const i = ie(l);
              i !== p && f.aliases[p].indexOf(i) === -1 && (f.aliases[p].push(i), he[i] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && h["camel-case-expansion"]) {
              const i = Tt(l, "-");
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
    function Et(r) {
      const c = Object.keys(f);
      return [].concat(c.map((l) => f[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(r) : l[r];
      });
    }
    function Jt(r, ...c) {
      return [].concat(...c).some(function(l) {
        const i = r.match(l);
        return i && Et(i[1]);
      });
    }
    function en(r) {
      if (r.match(H) || !r.match(/^-[^-]+/))
        return !1;
      let c = !0, p;
      const l = r.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (p = r.slice(i + 2), !Et(l[i])) {
          c = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || p === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return c;
    }
    function $e(r) {
      return h["unknown-options-as-args"] && tn(r);
    }
    function tn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(H) || en(r) ? !1 : !Jt(r, /^-+([^=]+?)=[\s\S]*$/, Ae, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ne(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in $ ? $[r] : nn(sn(r));
    }
    function nn(r) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[r];
    }
    function sn(r) {
      let c = q.BOOLEAN;
      return w(r, f.strings) ? c = q.STRING : w(r, f.numbers) ? c = q.NUMBER : w(r, f.bools) ? c = q.BOOLEAN : w(r, f.arrays) && (c = q.ARRAY), c;
    }
    function X(r) {
      return r === void 0;
    }
    function on() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (V = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(gt, j),
      configuration: h,
      defaulted: Object.assign({}, dt),
      error: V,
      newAliases: Object.assign({}, he)
    };
  }
}
function Cn(e) {
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
    o = o.filter(function(u, h, $) {
      return $.indexOf(u) === h;
    });
    const a = o.pop();
    a !== void 0 && typeof a == "string" && (n[a] = o);
  }), n;
}
function _e(e) {
  return e !== void 0 ? e + 1 : 1;
}
function wt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function xn(e) {
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
var Ne, je, Re;
const vt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, At = (je = (Ne = process == null ? void 0 : process.versions) === null || Ne === void 0 ? void 0 : Ne.node) !== null && je !== void 0 ? je : (Re = process == null ? void 0 : process.version) === null || Re === void 0 ? void 0 : Re.slice(1);
if (At && Number(At.match(/^([^.]+)/)[1]) < vt)
  throw Error(`yargs parser supports a minimum Node.js version of ${vt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const On = process ? process.env : {}, It = new An({
  cwd: process.cwd,
  env: () => On,
  format: Lt,
  normalize: an,
  resolve: se,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(pt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return It.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return It.parse(e.slice(), t);
};
fe.camelCase = ie;
fe.decamelize = Tt;
fe.looksLikeNumber = Wt;
const Sn = {
  right: Pn,
  center: Fn
}, _n = 0, be = 1, Nn = 2, ye = 3;
class jn {
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
        const { width: $ } = t[h], A = this.negatePadding(t[h]);
        let O = u;
        if (A > T.stringWidth(u) && (O += " ".repeat(A - T.stringWidth(u))), t[h].align && t[h].align !== "left" && this.wrap) {
          const B = Sn[t[h].align];
          O = B(O, A), T.stringWidth(O) < A && (O += " ".repeat(($ || 0) - T.stringWidth(O) - 1));
        }
        const P = t[h].padding || [0, 0, 0, 0];
        P[ye] && (a += " ".repeat(P[ye])), a += Ct(t[h], O, "| "), a += O, a += Ct(t[h], O, " |"), P[be] && (a += " ".repeat(P[be])), o === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
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
`), a.border && (o.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (o.unshift(...new Array(a.padding[_n] || 0).fill("")), o.push(...new Array(a.padding[Nn] || 0).fill(""))), o.forEach((h, $) => {
        n[$] || n.push([]);
        const A = n[$];
        for (let O = 0; O < u; O++)
          A[O] === void 0 && A.push("");
        A.push(h);
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
    return o.map((u, h) => u === void 0 ? Math.max(a, Rn(t[h])) : u);
  }
}
function Ct(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Rn(e) {
  const t = e.padding || [], n = 1 + (t[ye] || 0) + (t[be] || 0);
  return e.border ? n + 4 : n;
}
function Ln() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Pn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Fn(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Tn(e, t) {
  return T = t, new jn({
    width: e?.width || Ln(),
    wrap: e?.wrap
  });
}
const Mt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Bt(e) {
  return e.replace(Mt, "");
}
function Wn(e, t) {
  const [n, s] = e.match(Mt) || ["", ""];
  e = Bt(e);
  let o = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (o += `
`), o += e.charAt(a);
  return n && s && (o = `${n}${o}${s}`), o;
}
function In(e) {
  return Tn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Bt,
    wrap: Wn
  });
}
function Mn(e, t) {
  let n = se(".", e), s;
  for (Pt(n).isDirectory() || (n = Le(n)); ; ) {
    if (s = t(n, hn(n)), s)
      return se(n, s);
    if (n = Le(s = n), s === n)
      break;
  }
}
const Bn = {
  fs: {
    readFileSync: pt,
    writeFile: pn
  },
  format: Lt,
  resolve: se,
  exists: (e) => {
    try {
      return Pt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let G;
class kn {
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
    })) : s(), G.format.apply(G.format, [this.cache[this.locale][n] || n].concat(t));
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
    return ~u.indexOf("%d") && h.push(o), G.format.apply(G.format, h.concat(t));
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
    G.fs.writeFile(u, h, "utf-8", function($) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a($);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      G.fs.readFileSync && (t = JSON.parse(G.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = G.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = G.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return G.exists(t);
  }
}
function zn(e, t) {
  G = t;
  const n = new kn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Dn = (e) => zn(e, Bn), Un = "require is not supported by ESM", xt = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = gn(import.meta.url);
} catch {
  le = process.cwd();
}
const Vn = le.substring(0, le.lastIndexOf("node_modules"));
mn, dn, cn, Vn || process.cwd(), ln, Le, un, fn, se, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, pt, Dn({
  directory: se(le, "../../../locales"),
  updateFiles: !1
});
const K = "\x1B[44m", C = "\x1B[43m", D = "\x1B[41m", Ot = "\x1B[42m", y = "\x1B[0m", v = "\x1B[33m", x = "\x1B[36m", d = "\x1B[0m", Gn = {
  "vue-caution": [
    "elementSelectorsWithScoped",
    "implicitParentChildCommunication"
  ],
  "vue-essential": [
    "globalStyle",
    "simpleProp",
    "singleNameComponent",
    "vforNoKey",
    "vifWithVfor"
  ],
  "vue-recommended": [
    "elementAttributeOrder",
    "topLevelElementOrder"
  ],
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
    "nestedTernary",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps"
  ]
}, te = Object.keys(Gn), Pe = [], Fe = 100, qn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Fe && Pe.push({ filePath: t, message: `${n.length > Fe * 2 ? D : C}(${n.length} lines)${y}` });
}, Hn = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Fe} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Te = [], Kn = (e, t) => {
  !e || e.setup || Te.push({ filePath: t, message: `${C}Plain <script> block${y} found` });
}, Qn = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xn = /^(\(.*\)|\\?.)$/;
function Z(e) {
  const t = e.toString();
  return Xn.test(t) ? t : `(?:${t})`;
}
const Yn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Zn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(Yn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${k(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${k(...n)})`),
    after: (...n) => E(`(?<=${k(...n)})${e}`),
    before: (...n) => E(`${e}(?=${k(...n)})`),
    notAfter: (...n) => E(`(?<!${k(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${k(...n)})`),
    times: Object.assign((n) => E(`${Z(e)}{${n}}`), {
      any: () => E(`${Z(e)}*`),
      atLeast: (n) => E(`${Z(e)}{${n},}`),
      atMost: (n) => E(`${Z(e)}{0,${n}}`),
      between: (n, s) => E(`${Z(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${Z(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(Zn, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const Jn = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function es(...e) {
  return E(`(?:${e.map((t) => k(t)).join("|")})`);
}
const Ee = E(".");
E("\\b\\w+\\b");
const J = E("\\w"), W = E("\\b"), ts = E("\\d"), I = E("\\s"), ae = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), kt = E("\\t"), zt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Q(...e) {
  return E(`${Z(k(...e))}?`);
}
function k(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(Jn, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${Z(k(...e))}+`);
}
const z = "i", L = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(k(...e).toString(), [...t || ""].join(""));
}, We = [], ns = (e, t) => {
  if (!e)
    return;
  const n = _(W, "else", W, [L, z]), s = e.content.match(n);
  s?.length && We.push({ filePath: t, message: `else clauses found ${D}(${s.length})${y}` });
}, ss = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ else conditions${d}`,
      description: `👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], os = 5, rs = 10, is = (e, t) => {
  if (!e)
    return;
  const n = _(W, "if", W, [L, z]), s = _(W, "else", W, [L, z]), o = _(W, "for", W, [L, z]), a = _(W, "while", W, [L, z]), u = _(W, "case", W, [L, z]), h = e.content.match(n), $ = e.content.match(s), A = e.content.match(o), O = e.content.match(a), P = e.content.match(u), B = (h?.length || 0) + ($?.length || 0) + (A?.length || 0) + (O?.length || 0) + (P?.length || 0);
  B > os && Ie.push({ filePath: t, message: `${B > rs ? D : C}(${B})${y}` });
}, cs = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${v}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], as = (e) => {
  if (e.includes("pages"))
    return;
  const t = mt.basename(e);
  if (t === "App.vue")
    return;
  const n = _(ae.uppercase);
  t.slice(1).match(n)?.length || Me.push({ filePath: e, message: `Component name is ${C}single word${y}` });
}, ls = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ single name component${d}`,
      description: `👉 ${v}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], us = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Be.push({
      filePath: t,
      message: `${C}global style${y} used`
    });
  });
}, fs = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ global style${d}`,
      description: `👉 ${v}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], hs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [L, z]);
  e.content.match(n)?.length && ke.push({ filePath: t, message: `${C}Props type${y} not defined` });
}, ps = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ simple prop${d}`,
      description: `👉 ${v}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, U = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((u) => u.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, ze = [], ms = (e, t) => {
  if (!e)
    return;
  const n = _(
    "<",
    S(M(">")),
    " v-if",
    S(M(">")),
    " v-for",
    S(M(">")),
    ">",
    [L, z]
  ), s = _(
    "<",
    S(M(">")),
    " v-for",
    S(M(">")),
    " v-if",
    S(M(">")),
    ">",
    [L, z]
  ), o = e.content.match(n), a = e.content.match(s);
  if (o?.length || a?.length) {
    const u = o?.length ? o[0] : a?.length ? a[0] : "", h = U(e.content, u);
    ze.push({ filePath: t, message: `line #${h} ${C}v-if used with v-for${y}` });
  }
}, ds = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${v}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], gs = (e, t) => {
  if (!e)
    return;
  const n = _("<", S(M(">")), " v-for", S(M(">")), ">", [
    L,
    z
  ]), s = e.content.match(n);
  s?.length && (s.some((a) => a.includes(":key")) || De.push({ filePath: t, message: `v-for used ${C}without a key${y}` }));
}, $s = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${v}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], bs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = mt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(o);
  !s?.length && !a?.length && Ue.push({ filePath: e, message: `component name is ${C}not PascalCase, nor kebab-case.${y}` });
}, ys = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], Es = _(
  S(ae.lowercase).at.lineStart(),
  S(ae.uppercase, ae.lowercase.times.any().grouped()).at.lineEnd()
), ws = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !Es.test(a)).length && Ve.push({ filePath: t, message: `prop names are ${C}not camelCased${y}` });
}, vs = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${v}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], As = 40, Cs = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > As) {
      const a = U(e.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Ge.push({
        filePath: t,
        message: `line #${a} ${C}${u}${y}`
      });
    }
  });
}, xs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${v}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Os = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(J),
    Q(S(ue(` 	
\r`))),
    S(M("/>")),
    Q(S(ue(` 	
\r`))),
    Q("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const a = _(":", S(J), Q(" "), "=", Q(" "), M(`'"`), [
    "g"
  ]);
  o?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const h = u.match(a);
    if (h?.length) {
      const $ = U(e.source, u);
      qe.push({ filePath: t, message: `line #${$} ${C}${h}${y}` });
    }
  });
}, Ss = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${v}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], _s = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    S(ae.uppercase, J),
    Q(zt, kt),
    Q(S(M(">"))),
    "></",
    S(J),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((a) => {
    const u = U(e.source, a), h = a.split(`
`).at(-1)?.trim() || "";
    He.push({ filePath: t, message: `line #${u} ${C}${h}${y}` });
  });
}, Ns = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${v}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], St = [], js = ["v-slot", "v-bind", "v-on"], Rs = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  js.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = U(e.source, s);
      Ke.push({ filePath: t, message: `line #${o} ${C}${s}${y}` }), St.some((a) => a.filePath === t) || St.push({ filePath: t });
    }
  });
}, Ls = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Ps = 3, Fs = (e) => {
  const t = _(
    S(M("/")).grouped(),
    k(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = _(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [L]
    ), a = s.match(o);
    (!a || a.length < Ps) && Qe.push({ filePath: e, message: `${s} is not a ${C}full word.${y}` });
  }
}, Ts = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ full-word component names${d}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], Ws = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), a = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: a }
  ].filter(($) => $.index !== -1);
  u.every(($, A) => A === 0 ? !0 : u[A - 1].index < $.index) || Xe.push({ filePath: t, message: `Top level elements are ${C}not following the correct order.${y}` });
}, Is = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-recommended ~ top level element order${d}`,
      description: `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], _t = [
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
], Ms = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = s.exec(n)) !== null; ) {
    const u = a[1], h = a[2];
    if (h) {
      const A = Array.from(h.matchAll(o), (P) => P[1]).filter((P) => _t.includes(P));
      let O = -1;
      for (const P of A) {
        const B = _t.indexOf(P);
        if (B !== -1 && B < O) {
          Ye.push({
            filePath: t,
            message: `tag has attributes out of order ${C}(${u})${y}`
          });
          break;
        }
        O = B;
      }
    }
  }
}, Bs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${v}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], ks = 5, zs = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Q("<"), Q("("), "{", S(Ee), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > ks && Ze.push({ filePath: t, message: `props found ${D}(${o})${y}` });
  }
}, Ds = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ too many props${d}`,
      description: `👉 ${v}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Dt = 20;
function Us(e, t, n) {
  t.split(`
`).length > Dt && Je.push({ filePath: n, message: `function ${D}(${Ks(e)})${y} is too long` });
}
function Vs(e, t) {
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
function Gs(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function qs(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function Hs(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const a = e[o];
    a === "{" && n++, a === "}" && n--, s += a, o++;
  }
  return { body: s, end: o };
}
function Ks(e) {
  return e.replace(/^const\s*/, "");
}
const Qs = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let a = "", u = "", h = !1;
    if (n.slice(o, o + 8) === "function")
      o += 8, h = !0, a = Vs(n, o), o = Gs(n, o);
    else if (n.slice(o, o + 5) === "const") {
      const $ = qs(n, o);
      $ && (h = !0, a = $.name, o = $.bodyStart);
    }
    if (h) {
      const { body: $, end: A } = Hs(n, o);
      u = $, o = A, Us(a, u, t);
    } else
      o++;
  }
}, Xs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ function size${d}`,
      description: `👉 ${v}Functions must be shorter than ${Dt} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Ut = 3, Nt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Ut && et.push({ filePath: n, message: `function ${C}${e}${y} has ${C}${s.length}${y} parameters` });
}, Ys = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Nt(s[1], s[2], t) : s[3] && Nt(s[3], s[4], t);
}, Zs = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ parameter count${d}`,
      description: `👉 ${v}Max number of function parameters should be ${Ut}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Js = (e, t) => {
  if (!e)
    return;
  const n = _(
    "defineProps(",
    I.times.any(),
    "[",
    I.times.any(),
    S(ue(`'"`), S(J), ue(`'"`), I.times.any(), Q(",", I.times.any())),
    "]",
    I.times.any(),
    ")",
    [L]
  ), s = _(
    "<",
    S(J).grouped(),
    I,
    M(">").times.any(),
    ":",
    S(J).grouped(),
    I.times.any(),
    "=",
    I.times.any(),
    '"props.',
    S(J).grouped(),
    '"',
    [L]
  );
  let o;
  const a = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach(($) => a.add($));
  let u;
  for (; (u = s.exec(e.content)) !== null; ) {
    const h = u[1], $ = u[2], A = u[3];
    a.has(A) && $ === A && tt.push({
      filePath: t,
      message: `Prop ${C}(${A})${y} is being drilled through ${C}${h}${y} component unmodified.`
    });
  }
}, eo = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ props drilling${d}`,
      description: `👉 ${v}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], Vt = 4, to = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Vt && nt.push({ filePath: t, message: `${D}(${o})${y}` });
  }
}, no = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ short variable names${d}`,
      description: `👉 ${v}Variable names must have a minimum length of ${Vt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Gt = [], we = [], so = 5, oo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > so) {
      const a = o.split(`
`)[0], u = U(e.content, a);
      Gt.push({ filePath: t, message: `line #${u} ${C}computed${y}` }), we.push({ filePath: t }), we.some((h) => h.filePath === t) || we.push({ filePath: t });
    }
  });
}, ro = () => {
  const e = [];
  return we.length > 0 && Gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${v}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], io = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const a = U(e.content.trim(), o), u = o.split(`
`).at(0)?.trim() || "";
    st.push({ filePath: t, message: `line #${a} ${C}(${u})${y}` });
  });
}, co = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ component files${d}`,
      description: `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ve = [], ao = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = _(k("$parent").or("getCurrentInstance"), [L]), a = e.content.match(n), u = e.content.match(s);
  if (u) {
    const $ = u[1].split(".")[0], A = a ? a[1] : "";
    if (A.includes($)) {
      const O = U(e.content.trim(), A);
      ve.push({
        filePath: t,
        message: `line #${O} ${C}(${$})${y}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const $ = U(e.content.trim(), h[0]);
    ve.push({
      filePath: t,
      message: `line #${$} ${C}(${h[0]})${y}`
    });
  }
}, lo = () => {
  const e = [];
  return ve.length > 0 && ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], jt = 5, uo = 3, fo = (e, t) => {
  if (!e)
    return;
  const n = _(kt.times.atLeast(jt).or(I.times.atLeast(uo * jt)), [
    L,
    z
  ]);
  e.content.match(n)?.forEach((o) => {
    const a = U(e.content, o);
    ot.push({
      filePath: t,
      message: `line #${a} ${C}indentation: ${o.length}${y}`
    });
  });
}, ho = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ deep indentation${d}`,
      description: `👉 ${v}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], po = (e, t) => {
  if (!e)
    return;
  const n = _("<a", W, [L, z]), s = e.content.match(n);
  s?.length && rt.push({ filePath: t, message: `${s?.length} ${C}html link found${y}` });
}, mo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ html link${d}`,
      description: `👉 ${v}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], go = (e, t) => {
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
        message: `line #${a} if statement without curly braces: ${D}${u}${y}`
      });
    }
  });
}, $o = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ if without curly braces${d}`,
      description: `👉 ${v}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], bo = (e, t) => {
  if (!e)
    return;
  const n = _(ts, es(")", zt), [L]);
  e.content.match(n)?.forEach((o) => {
    const a = U(e.content, o);
    ct.push({
      filePath: t,
      message: `line #${a} ${C}magic number: ${o.length}${y}`
    });
  });
}, yo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ magic numbers${d}`,
      description: `👉 ${v}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, at = [], Eo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], a = s[2];
    a.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && a.split(`
`).length === 1 && at.push({ filePath: t, message: `Element ${C}<${o}>${y} should have its attributes on separate lines` });
  }
}, wo = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${v}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, vo = [
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
], lt = [], Ao = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const a = o[1];
      vo.includes(a) && lt.push({ filePath: t, message: `${C}(${a})${y}` });
    }
  });
}, Co = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${v}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], xo = (e, t) => {
  if (!e)
    return;
  const n = _(S(Ee), I, "?", I, S(Ee), I, ":", I, S(Ee));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const a = U(e.content, o);
      ut.push({
        filePath: t,
        message: `line #${a} has ${C}nested ternary${y}`
      });
    }
  });
}, Oo = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ nested Ternary${d}`,
      description: `👉 ${v}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, So = (e) => {
  const t = {}, n = ({ file: a, rule: u, title: h, description: $, message: A }) => {
    const O = e === "rule" ? u : a;
    t[O] || (t[O] = []), t[O].push({ file: a, rule: u, title: h, description: $, message: A });
  }, s = (a) => {
    a().forEach((h) => {
      n(h);
    });
  };
  s(ls), s(ps), s($s), s(ds), s(fs), s(ys), s(co), s(Ls), s(Ts), s(wo), s(vs), s(Ss), s(Ns), s(ro), s(xs), s(Is), s(Bs), s(lo), s(Co), s(cs), s(ho), s(ss), s(Xs), s(mo), s($o), s(yo), s(Oo), s(Zs), s(Qn), s(eo), s(Hn), s(no), s(Ds);
  const o = [];
  return Object.keys(t).forEach((a) => {
    console.log(`
 - ${a}`), t[a].forEach((u) => {
      const h = u.message.includes(D);
      if (o.some(($) => $.file === u.file)) {
        const $ = o.find((A) => A.file === u.file);
        $ && (h ? $.errors++ : $.warnings++);
      } else
        o.push({ file: u.file, errors: h ? 1 : 0, warnings: h ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${u.rule}` : `   File: ${u.file}`), console.log(`   Description: ${u.description}`), console.log(`   Message: ${u.message || "🚨"}
`);
    });
  }), o;
}, _o = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && (hs(s, t), o && (as(t), us(e.styles, t), gs(e.template, t), ms(e.template, t))), n.includes("vue-strong") && (oo(s, t), o && (io(s, t), ws(s, t), bs(t), _s(e, t), Cs(e.template, t), Os(e, t), Rs(e, t), Fs(t), Eo(e.template, t))), n.includes("vue-recommended") && o && (Ws(e.source, t), Ms(e.template, t)), n.includes("vue-caution") && o && (ao(s, t), Ao(e.styles, t)), n.includes("rrd") && (is(s, t), fo(s, t), ns(s, t), Qs(s, t), go(s, t), bo(s, t), xo(s, t), Ys(s, t), Js(s, t), qn(s, t), to(s, t), zs(s, t), o && (Kn(e.script, t), po(e.template, t)));
};
let ft = 0, ht = 0, qt = [];
const No = ["node_modules", ".git", ".nuxt", "dist", "coverage"], Ht = async (e) => {
  const t = await Se.readdir(e);
  for (const n of t) {
    const s = mt.join(e, n);
    if ((await Se.stat(s)).isDirectory())
      No.some((a) => s.includes(a)) || await Ht(s);
    else if (n.endsWith(".vue") || n.endsWith(".ts") || n.endsWith(".js")) {
      ft++;
      const a = await Se.readFile(s, "utf-8");
      ht += a.split(/\r\n|\r|\n/).length;
      const { descriptor: u } = $n(a);
      (n.endsWith(".ts") || n.endsWith(".js")) && (u.script = { content: a }), _o(u, s, qt);
    }
  }
}, jo = async (e, t = [], n) => {
  console.log(`

${K}Analyzing Vue files in ${e}${y}`);
  const s = te.filter(($) => !t.includes($));
  console.log(`Applying ${K}${t.length}${y} rulesets ${K}${t}${y} and ignoring ${K}${s.length}${y} rulesets ${K}${s}${y} grouping by ${K}${n}${y}`), qt = t, await Ht(e), console.log(`Found ${K}${ft}${y} Vue files`);
  const o = So(n), { errors: a, warnings: u } = o.reduce(($, { errors: A, warnings: O }) => ({ errors: $.errors + A, warnings: $.warnings + O }), { errors: 0, warnings: 0 });
  console.log(`Found ${D}${Intl.NumberFormat("en-US").format(a)} errors${y}, and ${C}${Intl.NumberFormat("en-US").format(u)} warnings${y}, ${K}${Intl.NumberFormat("en-US").format(ht)} lines${y} of code in ${K}${Intl.NumberFormat("en-US").format(ft)} files${y}`);
  const h = Math.ceil((1 - (a * 1.5 + u) / ht) * 100);
  h < 75 && console.log(`${D}Code health is LOW: ${h}%${y}`), h >= 75 && h < 85 && console.log(`${C}Code health is MEDIUM ${h}%${y}`), h >= 85 && h < 95 && console.log(`${K}Code health is OK: ${h}%${y}`), h >= 95 && console.log(`${Ot}Code health is GOOD: ${h}%${y}`), !a && !u && console.log(`${Ot}No code smells detected!${y}`);
};
rn(En(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    default: "./"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: te,
    coerce: Rt("ignore"),
    group: "Filter Rulesets:"
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: te,
    coerce: Rt("apply"),
    group: "Filter Rulesets:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Ro(t),
    default: "rule",
    group: "Group Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${D}Cannot use both --ignore and --apply options together.${y}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), jo(e.path, t, e.group);
  }
).help().argv;
function Rt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !te.includes(o));
    return s.length > 0 && (console.error(
      `
${D}Invalid ${e} values: ${s.join(
        ", "
      )}${y}. 
${v}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function Ro(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
