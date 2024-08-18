import cn from "yargs";
import { format as Ft, inspect as an } from "util";
import { normalize as ln, resolve as oe, dirname as Re, basename as un, extname as fn, relative as hn } from "path";
import { readFileSync as mt, statSync as Lt, readdirSync as mn, writeFile as pn } from "fs";
import { notStrictEqual as dn, strictEqual as gn } from "assert";
import { fileURLToPath as $n } from "url";
import Oe from "node:fs/promises";
import pt from "node:path";
import { parse as bn } from "@vue/compiler-sfc";
class ae extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ae);
  }
}
function Pt() {
  return yn() ? 0 : 1;
}
function yn() {
  return En() && !process.defaultApp;
}
function En() {
  return !!process.versions.electron;
}
function wn(e) {
  return e.slice(Pt() + 1);
}
function vn() {
  return process.argv[Pt()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ce(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let c = o ? o[0].length : 0; c < e.length; c++) {
      let l = e.charAt(c);
      s && (s = !1, l = l.toUpperCase()), c !== 0 && (l === "-" || l === "_") ? s = !0 : l !== "-" && l !== "_" && (n += l);
    }
    return n;
  }
}
function Tt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const c = n.charAt(o), l = e.charAt(o);
    c !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
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
function An(e) {
  if (Array.isArray(e))
    return e.map((l) => typeof l != "string" ? l + "" : l);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const c = [];
  for (let l = 0; l < e.length; l++) {
    if (n = s, s = e.charAt(l), s === " " && !o) {
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
class xn {
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
    }, n), o = An(t), c = typeof t == "string", l = Cn(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), f = Object.assign({
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
    }, s.configuration), $ = Object.assign(/* @__PURE__ */ Object.create(null), s.default), v = s.configObjects || [], S = s.envPrefix, P = f["populate--"], T = P ? "--" : "_", ne = /* @__PURE__ */ Object.create(null), dt = /* @__PURE__ */ Object.create(null), ee = s.__ || Y.format, h = {
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
    }, H = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, ve = new RegExp("^--" + f["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, m = Object.keys(r).map(function(u) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[u];
      }).filter(Boolean).pop();
      m && (h[m][a] = !0), h.arrays[a] = !0, h.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(r) {
      h.bools[r] = !0, h.keys.push(r);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(r) {
      h.strings[r] = !0, h.keys.push(r);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(r) {
      h.numbers[r] = !0, h.keys.push(r);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(r) {
      h.counts[r] = !0, h.keys.push(r);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(r) {
      h.normalize[r] = !0, h.keys.push(r);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([r, a]) => {
      typeof a == "number" && (h.nargs[r] = a, h.keys.push(r));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([r, a]) => {
      typeof a == "function" && (h.coercions[r] = a, h.keys.push(r));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(r) {
      h.configs[r] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([r, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (h.configs[r] = a);
    })), Jt(s.key, l, s.default, h.arrays), Object.keys($).forEach(function(r) {
      (h.aliases[r] || []).forEach(function(a) {
        $[a] = $[r];
      });
    });
    let G = null;
    rn();
    let he = [];
    const R = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), gt = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], m = a.replace(/^-{3,}/, "---");
      let u, i, g, p, b, L;
      if (a !== "--" && /^-/.test(a) && ge(a))
        Ae(a);
      else if (m.match(/^---+(=|$)/)) {
        Ae(a);
        continue;
      } else if (a.match(/^--.+=/) || !f["short-option-groups"] && a.match(/^-.+=/))
        p = a.match(/^--?([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && (w(p[1], h.arrays) ? r = pe(r, p[1], o, p[2]) : w(p[1], h.nargs) !== !1 ? r = me(r, p[1], o, p[2]) : N(p[1], p[2], !0));
      else if (a.match(ve) && f["boolean-negation"])
        p = a.match(ve), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], N(i, w(i, h.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !f["short-option-groups"] && a.match(/^-[^-]+/))
        p = a.match(/^--?(.+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], w(i, h.arrays) ? r = pe(r, i, o) : w(i, h.nargs) !== !1 ? r = me(r, i, o) : (b = o[r + 1], b !== void 0 && (!b.match(/^-/) || b.match(H)) && !w(i, h.bools) && !w(i, h.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, se(i))));
      else if (a.match(/^-.\..+=/))
        p = a.match(/^-([^=]+)=([\s\S]*)$/), p !== null && Array.isArray(p) && p.length >= 3 && N(p[1], p[2]);
      else if (a.match(/^-.\..+/) && !a.match(H))
        b = o[r + 1], p = a.match(/^-(.\..+)/), p !== null && Array.isArray(p) && p.length >= 2 && (i = p[1], b !== void 0 && !b.match(/^-/) && !w(i, h.bools) && !w(i, h.counts) ? (N(i, b), r++) : N(i, se(i)));
      else if (a.match(/^-[^-]+/) && !a.match(H)) {
        g = a.slice(1, -1).split(""), u = !1;
        for (let W = 0; W < g.length; W++) {
          if (b = a.slice(W + 2), g[W + 1] && g[W + 1] === "=") {
            L = a.slice(W + 3), i = g[W], w(i, h.arrays) ? r = pe(r, i, o, L) : w(i, h.nargs) !== !1 ? r = me(r, i, o, L) : N(i, L), u = !0;
            break;
          }
          if (b === "-") {
            N(g[W], b);
            continue;
          }
          if (/[A-Za-z]/.test(g[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) && w(b, h.bools) === !1) {
            N(g[W], b), u = !0;
            break;
          }
          if (g[W + 1] && g[W + 1].match(/\W/)) {
            N(g[W], b), u = !0;
            break;
          } else
            N(g[W], se(g[W]));
        }
        i = a.slice(-1)[0], !u && i !== "-" && (w(i, h.arrays) ? r = pe(r, i, o) : w(i, h.nargs) !== !1 ? r = me(r, i, o) : (b = o[r + 1], b !== void 0 && (!/^(-|--)[^-]/.test(b) || b.match(H)) && !w(i, h.bools) && !w(i, h.counts) || /^(true|false)$/.test(b) ? (N(i, b), r++) : N(i, se(i))));
      } else if (a.match(/^-[0-9]$/) && a.match(H) && w(a.slice(1), h.bools))
        i = a.slice(1), N(i, se(i));
      else if (a === "--") {
        he = o.slice(r + 1);
        break;
      } else if (f["halt-at-non-option"]) {
        he = o.slice(r);
        break;
      } else
        Ae(a);
    }
    bt(R, !0), bt(R, !1), Qt(R), Zt(), yt(R, h.aliases, $, !0), Xt(R), f["set-placeholder-key"] && Yt(R), Object.keys(h.counts).forEach(function(r) {
      re(R, r.split(".")) || N(r, 0);
    }), P && he.length && (R[T] = []), he.forEach(function(r) {
      R[T].push(r);
    }), f["camel-case-expansion"] && f["strip-dashed"] && Object.keys(R).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete R[r];
    }), f["strip-aliased"] && [].concat(...Object.keys(l).map((r) => l[r])).forEach((r) => {
      f["camel-case-expansion"] && r.includes("-") && delete R[r.split(".").map((a) => ce(a)).join(".")], delete R[r];
    });
    function Ae(r) {
      const a = de("_", r);
      (typeof a == "string" || typeof a == "number") && R._.push(a);
    }
    function me(r, a, m, u) {
      let i, g = w(a, h.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return X(u) || (G = Error(ee("Argument unexpected for: %s", a))), N(a, se(a)), r;
      let p = X(u) ? 0 : 1;
      if (f["nargs-eats-options"])
        m.length - (r + 1) + p < g && (G = Error(ee("Not enough arguments following: %s", a))), p = g;
      else {
        for (i = r + 1; i < m.length && (!m[i].match(/^-[^0-9]/) || m[i].match(H) || ge(m[i])); i++)
          p++;
        p < g && (G = Error(ee("Not enough arguments following: %s", a)));
      }
      let b = Math.min(p, g);
      for (!X(u) && b > 0 && (N(a, u), b--), i = r + 1; i < b + r + 1; i++)
        N(a, m[i]);
      return r + b;
    }
    function pe(r, a, m, u) {
      let i = [], g = u || m[r + 1];
      const p = w(a, h.nargs);
      if (w(a, h.bools) && !/^(true|false)$/.test(g))
        i.push(!0);
      else if (X(g) || X(u) && /^-/.test(g) && !H.test(g) && !ge(g)) {
        if ($[a] !== void 0) {
          const b = $[a];
          i = Array.isArray(b) ? b : [b];
        }
      } else {
        X(u) || i.push(xe(a, u, !0));
        for (let b = r + 1; b < m.length && !(!f["greedy-arrays"] && i.length > 0 || p && typeof p == "number" && i.length >= p || (g = m[b], /^-/.test(g) && !H.test(g) && !ge(g))); b++)
          r = b, i.push(xe(a, g, c));
      }
      return typeof p == "number" && (p && i.length < p || isNaN(p) && i.length === 0) && (G = Error(ee("Not enough arguments following: %s", a))), N(a, i), r;
    }
    function N(r, a, m = c) {
      if (/-/.test(r) && f["camel-case-expansion"]) {
        const g = r.split(".").map(function(p) {
          return ce(p);
        }).join(".");
        $t(r, g);
      }
      const u = xe(r, a, m), i = r.split(".");
      ie(R, i, u), h.aliases[r] && h.aliases[r].forEach(function(g) {
        const p = g.split(".");
        ie(R, p, u);
      }), i.length > 1 && f["dot-notation"] && (h.aliases[i[0]] || []).forEach(function(g) {
        let p = g.split(".");
        const b = [].concat(i);
        b.shift(), p = p.concat(b), (h.aliases[r] || []).includes(p.join(".")) || ie(R, p, u);
      }), w(r, h.normalize) && !w(r, h.arrays) && [r].concat(h.aliases[r] || []).forEach(function(p) {
        Object.defineProperty(gt, p, {
          enumerable: !0,
          get() {
            return a;
          },
          set(b) {
            a = typeof b == "string" ? Y.normalize(b) : b;
          }
        });
      });
    }
    function $t(r, a) {
      h.aliases[r] && h.aliases[r].length || (h.aliases[r] = [a], ne[a] = !0), h.aliases[a] && h.aliases[a].length || $t(a, r);
    }
    function xe(r, a, m) {
      m && (a = On(a)), (w(r, h.bools) || w(r, h.counts)) && typeof a == "string" && (a = a === "true");
      let u = Array.isArray(a) ? a.map(function(i) {
        return de(r, i);
      }) : de(r, a);
      return w(r, h.counts) && (X(u) || typeof u == "boolean") && (u = Se()), w(r, h.normalize) && w(r, h.arrays) && (Array.isArray(a) ? u = a.map((i) => Y.normalize(i)) : u = Y.normalize(a)), u;
    }
    function de(r, a) {
      return !f["parse-positional-numbers"] && r === "_" || !w(r, h.strings) && !w(r, h.bools) && !Array.isArray(a) && (Wt(a) && f["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !X(a) && w(r, h.numbers)) && (a = Number(a)), a;
    }
    function Qt(r) {
      const a = /* @__PURE__ */ Object.create(null);
      yt(a, h.aliases, $), Object.keys(h.configs).forEach(function(m) {
        const u = r[m] || a[m];
        if (u)
          try {
            let i = null;
            const g = Y.resolve(Y.cwd(), u), p = h.configs[m];
            if (typeof p == "function") {
              try {
                i = p(g);
              } catch (b) {
                i = b;
              }
              if (i instanceof Error) {
                G = i;
                return;
              }
            } else
              i = Y.require(g);
            Ce(i);
          } catch (i) {
            i.name === "PermissionDenied" ? G = i : r[m] && (G = Error(ee("Invalid JSON config file: %s", u)));
          }
      });
    }
    function Ce(r, a) {
      Object.keys(r).forEach(function(m) {
        const u = r[m], i = a ? a + "." + m : m;
        typeof u == "object" && u !== null && !Array.isArray(u) && f["dot-notation"] ? Ce(u, i) : (!re(R, i.split(".")) || w(i, h.arrays) && f["combine-arrays"]) && N(i, u);
      });
    }
    function Zt() {
      typeof v < "u" && v.forEach(function(r) {
        Ce(r);
      });
    }
    function bt(r, a) {
      if (typeof S > "u")
        return;
      const m = typeof S == "string" ? S : "", u = Y.env();
      Object.keys(u).forEach(function(i) {
        if (m === "" || i.lastIndexOf(m, 0) === 0) {
          const g = i.split("__").map(function(p, b) {
            return b === 0 && (p = p.substring(m.length)), ce(p);
          });
          (a && h.configs[g.join(".")] || !a) && !re(r, g) && N(g.join("."), u[i]);
        }
      });
    }
    function Xt(r) {
      let a;
      const m = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(u) {
        if (!m.has(u) && (a = w(u, h.coercions), typeof a == "function"))
          try {
            const i = de(u, a(r[u]));
            [].concat(h.aliases[u] || [], u).forEach((g) => {
              m.add(g), r[g] = i;
            });
          } catch (i) {
            G = i;
          }
      });
    }
    function Yt(r) {
      return h.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function yt(r, a, m, u = !1) {
      Object.keys(m).forEach(function(i) {
        re(r, i.split(".")) || (ie(r, i.split("."), m[i]), u && (dt[i] = !0), (a[i] || []).forEach(function(g) {
          re(r, g.split(".")) || ie(r, g.split("."), m[i]);
        }));
      });
    }
    function re(r, a) {
      let m = r;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(i) {
        m = m[i] || {};
      });
      const u = a[a.length - 1];
      return typeof m != "object" ? !1 : u in m;
    }
    function ie(r, a, m) {
      let u = r;
      f["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(L) {
        L = wt(L), typeof u == "object" && u[L] === void 0 && (u[L] = {}), typeof u[L] != "object" || Array.isArray(u[L]) ? (Array.isArray(u[L]) ? u[L].push({}) : u[L] = [u[L], {}], u = u[L][u[L].length - 1]) : u = u[L];
      });
      const i = wt(a[a.length - 1]), g = w(a.join("."), h.arrays), p = Array.isArray(m);
      let b = f["duplicate-arguments-array"];
      !b && w(i, h.nargs) && (b = !0, (!X(u[i]) && h.nargs[i] === 1 || Array.isArray(u[i]) && u[i].length === h.nargs[i]) && (u[i] = void 0)), m === Se() ? u[i] = Se(u[i]) : Array.isArray(u[i]) ? b && g && p ? u[i] = f["flatten-duplicate-arrays"] ? u[i].concat(m) : (Array.isArray(u[i][0]) ? u[i] : [u[i]]).concat([m]) : !b && !!g == !!p ? u[i] = m : u[i] = u[i].concat([m]) : u[i] === void 0 && g ? u[i] = p ? m : [m] : b && !(u[i] === void 0 || w(i, h.counts) || w(i, h.bools)) ? u[i] = [u[i], m] : u[i] = m;
    }
    function Jt(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(m) {
          h.aliases[m] || (h.aliases[m] = [].concat(l[m] || []), h.aliases[m].concat(m).forEach(function(u) {
            if (/-/.test(u) && f["camel-case-expansion"]) {
              const i = ce(u);
              i !== m && h.aliases[m].indexOf(i) === -1 && (h.aliases[m].push(i), ne[i] = !0);
            }
          }), h.aliases[m].concat(m).forEach(function(u) {
            if (u.length > 1 && /[A-Z]/.test(u) && f["camel-case-expansion"]) {
              const i = Tt(u, "-");
              i !== m && h.aliases[m].indexOf(i) === -1 && (h.aliases[m].push(i), ne[i] = !0);
            }
          }), h.aliases[m].forEach(function(u) {
            h.aliases[u] = [m].concat(h.aliases[m].filter(function(i) {
              return u !== i;
            }));
          }));
        });
      });
    }
    function w(r, a) {
      const m = [].concat(h.aliases[r] || [], r), u = Object.keys(a), i = m.find((g) => u.includes(g));
      return i ? a[i] : !1;
    }
    function Et(r) {
      const a = Object.keys(h);
      return [].concat(a.map((u) => h[u])).some(function(u) {
        return Array.isArray(u) ? u.includes(r) : u[r];
      });
    }
    function en(r, ...a) {
      return [].concat(...a).some(function(u) {
        const i = r.match(u);
        return i && Et(i[1]);
      });
    }
    function tn(r) {
      if (r.match(H) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, m;
      const u = r.slice(1).split("");
      for (let i = 0; i < u.length; i++) {
        if (m = r.slice(i + 2), !Et(u[i])) {
          a = !1;
          break;
        }
        if (u[i + 1] && u[i + 1] === "=" || m === "-" || /[A-Za-z]/.test(u[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) || u[i + 1] && u[i + 1].match(/\W/))
          break;
      }
      return a;
    }
    function ge(r) {
      return f["unknown-options-as-args"] && nn(r);
    }
    function nn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(H) || tn(r) ? !1 : !en(r, /^-+([^=]+?)=[\s\S]*$/, ve, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function se(r) {
      return !w(r, h.bools) && !w(r, h.counts) && `${r}` in $ ? $[r] : sn(on(r));
    }
    function sn(r) {
      return {
        [q.BOOLEAN]: !0,
        [q.STRING]: "",
        [q.NUMBER]: void 0,
        [q.ARRAY]: []
      }[r];
    }
    function on(r) {
      let a = q.BOOLEAN;
      return w(r, h.strings) ? a = q.STRING : w(r, h.numbers) ? a = q.NUMBER : w(r, h.bools) ? a = q.BOOLEAN : w(r, h.arrays) && (a = q.ARRAY), a;
    }
    function X(r) {
      return r === void 0;
    }
    function rn() {
      Object.keys(h.counts).find((r) => w(r, h.arrays) ? (G = Error(ee("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, h.nargs) ? (G = Error(ee("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, h.aliases),
      argv: Object.assign(gt, R),
      configuration: f,
      defaulted: Object.assign({}, dt),
      error: G,
      newAliases: Object.assign({}, ne)
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
      for (let c = o + 1; c < t.length; c++)
        if (t[o].filter(function(f) {
          return t[c].indexOf(f) !== -1;
        }).length) {
          t[o] = t[o].concat(t[c]), t.splice(c, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(l, f, $) {
      return $.indexOf(l) === f;
    });
    const c = o.pop();
    c !== void 0 && typeof c == "string" && (n[c] = o);
  }), n;
}
function Se(e) {
  return e !== void 0 ? e + 1 : 1;
}
function wt(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function On(e) {
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
const vt = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, At = (Ne = (_e = process == null ? void 0 : process.versions) === null || _e === void 0 ? void 0 : _e.node) !== null && Ne !== void 0 ? Ne : (je = process == null ? void 0 : process.version) === null || je === void 0 ? void 0 : je.slice(1);
if (At && Number(At.match(/^([^.]+)/)[1]) < vt)
  throw Error(`yargs parser supports a minimum Node.js version of ${vt}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Sn = process ? process.env : {}, It = new xn({
  cwd: process.cwd,
  env: () => Sn,
  format: Ft,
  normalize: ln,
  resolve: oe,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(mt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), fe = function(t, n) {
  return It.parse(t.slice(), n).argv;
};
fe.detailed = function(e, t) {
  return It.parse(e.slice(), t);
};
fe.camelCase = ce;
fe.decamelize = Tt;
fe.looksLikeNumber = Wt;
const _n = {
  right: Pn,
  center: Tn
}, Nn = 0, $e = 1, jn = 2, be = 3;
class Rn {
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
      o.length > 1 && I.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), I.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((c, l) => ({
        text: c.trim(),
        padding: this.measurePadding(c),
        width: l === 0 && o.length > 1 ? s : void 0
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
    const n = I.stripAnsi(t);
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
      s.forEach((l, f) => {
        const { width: $ } = t[f], v = this.negatePadding(t[f]);
        let S = l;
        if (v > I.stringWidth(l) && (S += " ".repeat(v - I.stringWidth(l))), t[f].align && t[f].align !== "left" && this.wrap) {
          const T = _n[t[f].align];
          S = T(S, v), I.stringWidth(S) < v && (S += " ".repeat(($ || 0) - I.stringWidth(S) - 1));
        }
        const P = t[f].padding || [0, 0, 0, 0];
        P[be] && (c += " ".repeat(P[be])), c += xt(t[f], S, "| "), c += S, c += xt(t[f], S, " |"), P[$e] && (c += " ".repeat(P[$e])), o === 0 && n.length > 0 && (c = this.renderInline(c, n[n.length - 1]));
      }), n.push({
        text: c.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, c = n.text, l = I.stringWidth(c.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, c.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, c + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((c, l) => {
      c.width = s[l], this.wrap ? o = I.wrap(c.text, this.negatePadding(c), { hard: !0 }).split(`
`) : o = c.text.split(`
`), c.border && (o.unshift("." + "-".repeat(this.negatePadding(c) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(c) + 2) + "'")), c.padding && (o.unshift(...new Array(c.padding[Nn] || 0).fill("")), o.push(...new Array(c.padding[jn] || 0).fill(""))), o.forEach((f, $) => {
        n[$] || n.push([]);
        const v = n[$];
        for (let S = 0; S < l; S++)
          v[S] === void 0 && v.push("");
        v.push(f);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[be] || 0) + (t.padding[$e] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || I.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), c = n ? Math.floor(s / n) : 0;
    return o.map((l, f) => l === void 0 ? Math.max(c, Fn(t[f])) : l);
  }
}
function xt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Fn(e) {
  const t = e.padding || [], n = 1 + (t[be] || 0) + (t[$e] || 0);
  return e.border ? n + 4 : n;
}
function Ln() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Pn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Tn(e, t) {
  e = e.trim();
  const n = I.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let I;
function Wn(e, t) {
  return I = t, new Rn({
    width: e?.width || Ln(),
    wrap: e?.wrap
  });
}
const Mt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Bt(e) {
  return e.replace(Mt, "");
}
function In(e, t) {
  const [n, s] = e.match(Mt) || ["", ""];
  e = Bt(e);
  let o = "";
  for (let c = 0; c < e.length; c++)
    c !== 0 && c % t === 0 && (o += `
`), o += e.charAt(c);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Mn(e) {
  return Wn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Bt,
    wrap: In
  });
}
function Bn(e, t) {
  let n = oe(".", e), s;
  for (Lt(n).isDirectory() || (n = Re(n)); ; ) {
    if (s = t(n, mn(n)), s)
      return oe(n, s);
    if (n = Re(s = n), s === n)
      break;
  }
}
const kn = {
  fs: {
    readFileSync: mt,
    writeFile: pn
  },
  format: Ft,
  resolve: oe,
  exists: (e) => {
    try {
      return Lt(e).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class zn {
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
    })) : s(), K.format.apply(K.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let c = function() {
    };
    typeof t[t.length - 1] == "function" && (c = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let l = o === 1 ? n : s;
    this.cache[this.locale][n] && (l = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: c
    })) : c();
    const f = [l];
    return ~l.indexOf("%d") && f.push(o), K.format.apply(K.format, f.concat(t));
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
      const l = n[c + 1];
      s += o, typeof l < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, c = n.cb, l = this._resolveLocaleFile(s, o), f = JSON.stringify(this.cache[o], null, 2);
    K.fs.writeFile(l, f, "utf-8", function($) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), c($);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      K.fs.readFileSync && (t = JSON.parse(K.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = K.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = K.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return K.exists(t);
  }
}
function Dn(e, t) {
  K = t;
  const n = new zn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Un = (e) => Dn(e, kn), Vn = "require is not supported by ESM", Ct = "loading a directory of commands is not supported yet for ESM";
let le;
try {
  le = $n(import.meta.url);
} catch {
  le = process.cwd();
}
const Gn = le.substring(0, le.lastIndexOf("node_modules"));
dn, gn, an, Gn || process.cwd(), un, Re, fn, hn, oe, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, mt, Un({
  directory: oe(le, "../../../locales"),
  updateFiles: !1
});
const Q = "\x1B[44m", x = "\x1B[43m", V = "\x1B[41m", Ot = "\x1B[42m", y = "\x1B[0m", A = "\x1B[33m", C = "\x1B[36m", d = "\x1B[0m", Kn = {
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
    "tooManyProps",
    "vForWithIndexKey"
  ]
}, te = Object.keys(Kn), Fe = [], Le = 100, qn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Le && Fe.push({ filePath: t, message: `${n.length > Le * 2 ? V : x}(${n.length} lines)${y}` });
}, Hn = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${d}`,
      description: `👉 ${A}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Le} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Pe = [], Qn = (e, t) => {
  !e || e.setup || Pe.push({ filePath: t, message: `${x}Plain <script> block${y} found` });
}, Zn = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${d}`,
      description: `👉 ${A} Consider using <script setup> to leverage the new SFC <script> syntax.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xn = /^(\(.*\)|\\?.)$/;
function J(e) {
  const t = e.toString();
  return Xn.test(t) ? t : `(?:${t})`;
}
const Yn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Jn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(Yn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${z(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${z(...n)})`),
    after: (...n) => E(`(?<=${z(...n)})${e}`),
    before: (...n) => E(`${e}(?=${z(...n)})`),
    notAfter: (...n) => E(`(?<!${z(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${z(...n)})`),
    times: Object.assign((n) => E(`${J(e)}{${n}}`), {
      any: () => E(`${J(e)}*`),
      atLeast: (n) => E(`${J(e)}{${n},}`),
      atMost: (n) => E(`${J(e)}{0,${n}}`),
      between: (n, s) => E(`${J(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${J(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(Jn, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const es = /[.*+?^${}()|[\]\\/]/g;
function ue(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function B(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ts(...e) {
  return E(`(?:${e.map((t) => z(t)).join("|")})`);
}
const ye = E(".");
E("\\b\\w+\\b");
const U = E("\\w"), M = E("\\b"), ns = E("\\d"), j = E("\\s"), kt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), zt = E("\\t"), Dt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Z(...e) {
  return E(`${J(z(...e))}?`);
}
function z(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(es, "\\$&") : t).join("")
  );
}
function O(...e) {
  return E(`${J(z(...e))}+`);
}
const D = "i", F = "g", _ = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(z(...e).toString(), [...t || ""].join(""));
}, Te = [], ss = (e, t) => {
  if (!e)
    return;
  const n = _(M, "else", M, [F, D]), s = e.content.match(n);
  s?.length && Te.push({ filePath: t, message: `else clauses found ${V}(${s.length})${y}` });
}, os = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${d}`,
      description: `👉 ${A}Try to rewrite the conditions in a way that the else clause is not necessary.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, We = [], rs = 5, is = 10, cs = (e, t) => {
  if (!e)
    return;
  const n = _(M, "if", M, [F, D]), s = _(M, "else", M, [F, D]), o = _(M, "for", M, [F, D]), c = _(M, "while", M, [F, D]), l = _(M, "case", M, [F, D]), f = e.content.match(n), $ = e.content.match(s), v = e.content.match(o), S = e.content.match(c), P = e.content.match(l), T = (f?.length || 0) + ($?.length || 0) + (v?.length || 0) + (S?.length || 0) + (P?.length || 0);
  T > rs && We.push({ filePath: t, message: `${T > is ? V : x}(${T})${y}` });
}, as = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${d}`,
      description: `👉 ${A}Try to reduce complexity.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ie = [], ls = (e) => {
  if (e.includes("pages"))
    return;
  const t = pt.basename(e);
  if (t === "App.vue")
    return;
  const n = _(kt.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e, message: `Component name is ${x}single word${y}` });
}, us = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${d}`,
      description: `👉 ${A}Rename the component to use multi-word name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], fs = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Me.push({
      filePath: t,
      message: `${x}global style${y} used`
    });
  });
}, hs = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${d}`,
      description: `👉 ${A}Use <style scoped>.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Be = [], ms = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps([", [F, D]);
  e.content.match(n)?.length && Be.push({ filePath: t, message: `${x}Props type${y} not defined` });
}, ps = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${d}`,
      description: `👉 ${A}Add at least type definition.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, k = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((l) => l.includes(t)) + 1;
  const n = e.indexOf(t), s = e.slice(0, n).split(`
`).length, o = t.split(`
`).length;
  return s + o - 1;
}, ke = [], ds = (e, t) => {
  if (!e)
    return;
  const n = _(
    "<",
    O(B(">")),
    " v-if",
    O(B(">")),
    " v-for",
    O(B(">")),
    ">",
    [F, D]
  ), s = _(
    "<",
    O(B(">")),
    " v-for",
    O(B(">")),
    " v-if",
    O(B(">")),
    ">",
    [F, D]
  ), o = e.content.match(n), c = e.content.match(s);
  if (o?.length || c?.length) {
    const l = o?.length ? o[0] : c?.length ? c[0] : "", f = k(e.content, l);
    ke.push({ filePath: t, message: `line #${f} ${x}v-if used with v-for${y}` });
  }
}, gs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${d}`,
      description: `👉 ${A}Move out the v-if to a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], $s = (e, t) => {
  if (!e)
    return;
  const n = _("<", O(B(">")), " v-for", O(B(">")), ">", [
    F,
    D
  ]), s = e.content.match(n);
  s?.length && (s.some((c) => c.includes(":key")) || ze.push({ filePath: t, message: `v-for used ${x}without a key${y}` }));
}, bs = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${d}`,
      description: `👉 ${A}Add a \`:key\` property to all v-for.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], ys = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = pt.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, c = t.match(o);
  !s?.length && !c?.length && De.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${y}` });
}, Es = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${d}`,
      description: `👉 ${A}Rename the component to use PascalCase or kebab-case file name.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], ws = /^[a-z]+([A-Z][a-z]*)*$/, vs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((c) => c.split(":")[0]).filter((c) => c.length).filter((c) => !ws.test(c)).length && Ue.push({ filePath: t, message: `prop names are ${x}not camelCased${y}` });
}, As = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${d}`,
      description: `👉 ${A}Rename the props to camelCase.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ve = [], xs = 40, Cs = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > xs) {
      const c = k(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      Ve.push({
        filePath: t,
        message: `line #${c} ${x}${l}${y}`
      });
    }
  });
}, Os = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${d}`,
      description: `👉 ${A}Refactor the expression into a computed property.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Ss = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    O(U),
    Z(O(ue(` 	
\r`))),
    O(B("/>")),
    Z(O(ue(` 	
\r`))),
    Z("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const c = _(":", O(U), Z(" "), "=", Z(" "), B(`'"`), [
    "g"
  ]);
  o?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const f = l.match(c);
    if (f?.length) {
      const $ = k(e.source, l);
      Ge.push({ filePath: t, message: `line #${$} ${x}${f}${y}` });
    }
  });
}, _s = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${d}`,
      description: `👉 ${A}Use quotes for attribute values.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ns = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = _(
    "<",
    O(kt.uppercase, U),
    Z(Dt, zt),
    Z(O(B(">"))),
    "></",
    O(U),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((c) => {
    const l = k(e.source, c), f = c.split(`
`).at(-1)?.trim() || "";
    Ke.push({ filePath: t, message: `line #${l} ${x}${f}${y}` });
  });
}, js = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${d}`,
      description: `👉 ${A}Components with no content should be self-closing.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], St = [], Rs = ["v-slot", "v-bind", "v-on"], Fs = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Rs.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = k(e.source, s);
      qe.push({ filePath: t, message: `line #${o} ${x}${s}${y}` }), St.some((c) => c.filePath === t) || St.push({ filePath: t });
    }
  });
}, Ls = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${d}`,
      description: `👉 ${A}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Ps = 3, Ts = (e) => {
  const t = _(
    O(B("/")).grouped(),
    z(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = _(
      ue("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [F]
    ), c = s.match(o);
    (!c || c.length < Ps) && He.push({ filePath: e, message: `${s} is not a ${x}full word.${y}` });
  }
}, Ws = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${d}`,
      description: `👉 ${A}Component names should prefer full words over abbreviations.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], Is = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), c = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: c }
  ].filter(($) => $.index !== -1);
  l.every(($, v) => v === 0 ? !0 : l[v - 1].index < $.index) || Qe.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${y}` });
}, Ms = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${d}`,
      description: `👉 ${A}Single-File Components should always order <script>, <template>, and <style> tags consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], _t = [
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
], Bs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let c;
  for (; (c = s.exec(n)) !== null; ) {
    const l = c[1], f = c[2];
    if (f) {
      const v = Array.from(f.matchAll(o), (P) => P[1]).filter((P) => _t.includes(P));
      let S = -1;
      for (const P of v) {
        const T = _t.indexOf(P);
        if (T !== -1 && T < S) {
          Ze.push({
            filePath: t,
            message: `tag has attributes out of order ${x}(${l})${y}`
          });
          break;
        }
        S = T;
      }
    }
  }
}, ks = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${d}`,
      description: `👉 ${A}The attributes of elements (including components) should be ordered consistently.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], zs = 5, Ds = (e, t) => {
  if (!e)
    return;
  const n = _("defineProps", Z("<"), Z("("), "{", O(ye), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > zs && Xe.push({ filePath: t, message: `props found ${V}(${o})${y}` });
  }
}, Us = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${d}`,
      description: `👉 ${A}Try to refactor your code to use less properties.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Ut = 20;
function Vs(e, t, n) {
  t.split(`
`).length > Ut && Ye.push({ filePath: n, message: `function ${V}(${Qs(e)})${y} is too long` });
}
function Gs(e, t) {
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
function Ks(e, t) {
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
    const c = e[o];
    c === "{" && n++, c === "}" && n--, s += c, o++;
  }
  return { body: s, end: o };
}
function Qs(e) {
  return e.replace(/^const\s*/, "");
}
const Zs = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let c = "", l = "", f = !1;
    if (n.slice(o, o + 8) === "function")
      o += 8, f = !0, c = Gs(n, o), o = Ks(n, o);
    else if (n.slice(o, o + 5) === "const") {
      const $ = qs(n, o);
      $ && (f = !0, c = $.name, o = $.bodyStart);
    }
    if (f) {
      const { body: $, end: v } = Hs(n, o);
      l = $, o = v, Vs(c, l, t);
    } else
      o++;
  }
}, Xs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${d}`,
      description: `👉 ${A}Functions must be shorter than ${Ut} lines.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Vt = 3, Nt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > Vt && Je.push({ filePath: n, message: `function ${x}${e}${y} has ${x}${s.length}${y} parameters` });
}, Ys = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Nt(s[1], s[2], t) : s[3] && Nt(s[3], s[4], t);
}, Js = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${d}`,
      description: `👉 ${A}Max number of function parameters should be ${Vt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], eo = (e, t) => {
  if (!e)
    return;
  const n = _(
    "defineProps(",
    j.times.any(),
    "[",
    j.times.any(),
    O(ue(`'"`), O(U), ue(`'"`), j.times.any(), Z(",", j.times.any())),
    "]",
    j.times.any(),
    ")",
    [F]
  ), s = _(
    "<",
    O(U).grouped(),
    j,
    B(">").times.any(),
    ":",
    O(U).grouped(),
    j.times.any(),
    "=",
    j.times.any(),
    '"props.',
    O(U).grouped(),
    '"',
    [F]
  );
  let o;
  const c = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach(($) => c.add($));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const f = l[1], $ = l[2], v = l[3];
    c.has(v) && $ === v && et.push({
      filePath: t,
      message: `Prop ${x}(${v})${y} is being drilled through ${x}${f}${y} component unmodified.`
    });
  }
}, to = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${d}`,
      description: `👉 ${A}Props should not be forwarded unmodified. Consider refactoring.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Gt = 4, no = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < Gt && tt.push({ filePath: t, message: `${V}(${o})${y}` });
  }
}, so = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${d}`,
      description: `👉 ${A}Variable names must have a minimum length of ${Gt}.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Kt = [], Ee = [], oo = 5, ro = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > oo) {
      const c = o.split(`
`)[0], l = k(e.content, c);
      Kt.push({ filePath: t, message: `line #${l} ${x}computed${y}` }), Ee.push({ filePath: t }), Ee.some((f) => f.filePath === t) || Ee.push({ filePath: t });
    }
  });
}, io = () => {
  const e = [];
  return Ee.length > 0 && Kt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${d}`,
      description: `👉 ${A}Refactor the computed properties to smaller ones.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], co = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const c = k(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    nt.push({ filePath: t, message: `line #${c} ${x}(${l})${y}` });
  });
}, ao = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${d}`,
      description: `👉 ${A}Whenever a build system is available to concatenate files, each component should be in its own file.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, we = [], lo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = _(z("$parent").or("getCurrentInstance"), [F]), c = e.content.match(n), l = e.content.match(s);
  if (l) {
    const $ = l[1].split(".")[0], v = c ? c[1] : "";
    if (v.includes($)) {
      const S = k(e.content.trim(), v);
      we.push({
        filePath: t,
        message: `line #${S} ${x}(${$})${y}`
      });
    }
  }
  const f = e.content.match(o);
  if (f) {
    const $ = k(e.content.trim(), f[0]);
    we.push({
      filePath: t,
      message: `line #${$} ${x}(${f[0]})${y}`
    });
  }
}, uo = () => {
  const e = [];
  return we.length > 0 && we.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${d}`,
      description: `👉 ${A}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], jt = 5, fo = 3, ho = (e, t) => {
  if (!e)
    return;
  const n = _(zt.times.atLeast(jt).or(j.times.atLeast(fo * jt)), [
    F,
    D
  ]);
  e.content.match(n)?.forEach((o) => {
    const c = k(e.content, o);
    st.push({
      filePath: t,
      message: `line #${c} ${x}indentation: ${o.length}${y}`
    });
  });
}, mo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${d}`,
      description: `👉 ${A}Try to refactor your component to child components, to avoid deep indentations.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ot = [], po = (e, t) => {
  if (!e)
    return;
  const n = _("<a", M, [F, D]), s = e.content.match(n);
  s?.length && ot.push({ filePath: t, message: `${s?.length} ${x}html link found${y}` });
}, go = () => {
  const e = [];
  return ot.length > 0 && ot.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${d}`,
      description: `👉 ${A}Use router-link or NuxtLink.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], $o = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, c) => {
    const l = o.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const f = s[c + 1]?.trim();
      (!f || !f.startsWith("{") && !l.endsWith("{")) && rt.push({
        filePath: t,
        message: `line #${c} if statement without curly braces: ${V}${l}${y}`
      });
    }
  });
}, bo = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${d}`,
      description: `👉 ${A}All if statements must be enclosed in curly braces for better readability and maintainability.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], yo = (e, t) => {
  if (!e)
    return;
  const n = _(ns, ts(")", Dt), [F]);
  e.content.match(n)?.forEach((o) => {
    const c = k(e.content, o);
    it.push({
      filePath: t,
      message: `line #${c} ${x}magic number: ${o.length}${y}`
    });
  });
}, Eo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${d}`,
      description: `👉 ${A}Extract magic numbers to a constant.${d} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, ct = [], wo = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], c = s[2];
    c.split(/\s+/).filter((f) => f.trim() !== "").length > 1 && c.split(`
`).length === 1 && ct.push({ filePath: t, message: `Element ${x}<${o}>${y} should have its attributes on separate lines` });
  }
}, vo = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${d}`,
      description: `👉 ${A}Elements with multiple attributes should span multiple lines, with one attribute per line.${d}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ao = [
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
], at = [], xo = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const c = o[1];
      Ao.includes(c) && at.push({ filePath: t, message: `${x}(${c})${y}` });
    }
  });
}, Co = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${d}`,
      description: `👉 ${A}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${d} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], Oo = (e, t) => {
  if (!e)
    return;
  const n = _(O(ye), j, "?", j, O(ye), j, ":", j, O(ye));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const c = k(e.content, o);
      lt.push({
        filePath: t,
        message: `line #${c} has ${x}nested ternary${y}`
      });
    }
  });
}, So = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${d}`,
      description: `👉 ${A}/* TODO tip to fix this issue */.${d} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], _o = (e, t) => {
  if (!e)
    return;
  const n = _('v-for="(', j.times.any(), O(U).grouped(), j.times.any(), ",", j.times.any(), O(U).grouped(), j.times.any(), ")", O(j), "in", O(j), O(U).grouped(), [F]), s = _(':key="', j.times.any(), O(U).grouped(), j.times.any(), '"', [F]), o = [...e.content.matchAll(n)], c = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [f, $, v, S] = l;
    c.forEach((P) => {
      const T = P[1];
      if (T === v) {
        const ne = k(e.content.trim(), T);
        ut.push({
          filePath: t,
          message: `line #${ne} ${x}index is being used as :key in v-for${y}`
        });
      }
    });
  });
}, No = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${d}`,
      description: `👉 ${A}Avoid using index as key in v-for loops.${d} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, jo = (e) => {
  const t = {}, n = ({ file: c, rule: l, title: f, description: $, message: v }) => {
    const S = e === "rule" ? l : c;
    t[S] || (t[S] = []), t[S].push({ file: c, rule: l, title: f, description: $, message: v });
  }, s = (c) => {
    c().forEach((f) => {
      n(f);
    });
  };
  s(us), s(ps), s(bs), s(gs), s(hs), s(Es), s(ao), s(Ls), s(Ws), s(vo), s(As), s(_s), s(js), s(io), s(Os), s(Ms), s(ks), s(uo), s(Co), s(as), s(mo), s(os), s(Xs), s(go), s(bo), s(Eo), s(So), s(Js), s(Zn), s(to), s(Hn), s(so), s(Us), s(No);
  const o = [];
  return Object.keys(t).forEach((c) => {
    console.log(`
 - ${c}`), t[c].forEach((l) => {
      const f = l.message.includes(V);
      if (o.some(($) => $.file === l.file)) {
        const $ = o.find((v) => v.file === l.file);
        $ && (f ? $.errors++ : $.warnings++);
      } else
        o.push({ file: l.file, errors: f ? 1 : 0, warnings: f ? 0 : 1 });
      console.log(e === "file" ? `   Rule: ${l.rule}` : `   File: ${l.file}`), console.log(`   Description: ${l.description}`), console.log(`   Message: ${l.message || "🚨"}
`);
    });
  }), o;
}, Ro = (e, t, n) => {
  const s = e.scriptSetup || e.script;
  console.log(`Analyzing ${t}...`);
  const o = t.endsWith(".vue");
  n.includes("vue-essential") && (ms(s, t), o && (ls(t), fs(e.styles, t), $s(e.template, t), ds(e.template, t))), n.includes("vue-strong") && (ro(s, t), o && (co(s, t), vs(s, t), ys(t), Ns(e, t), Cs(e.template, t), Ss(e, t), Fs(e, t), Ts(t), wo(e.template, t))), n.includes("vue-recommended") && o && (Is(e.source, t), Bs(e.template, t)), n.includes("vue-caution") && o && (lo(s, t), xo(e.styles, t)), n.includes("rrd") && (cs(s, t), ho(s, t), ss(s, t), Zs(s, t), $o(s, t), yo(s, t), Oo(s, t), Ys(s, t), eo(s, t), qn(s, t), no(s, t), Ds(s, t), o && (po(e.template, t), Qn(e.script, t), _o(e.template, t)));
};
let ft = 0, ht = 0, qt = [];
const Fo = ["node_modules", ".git", ".nuxt", "dist", "coverage"], Ht = async (e) => {
  const t = await Oe.readdir(e);
  for (const n of t) {
    const s = pt.join(e, n);
    if ((await Oe.stat(s)).isDirectory())
      Fo.some((c) => s.includes(c)) || await Ht(s);
    else if (n.endsWith(".vue") || n.endsWith(".ts") || n.endsWith(".js")) {
      ft++;
      const c = await Oe.readFile(s, "utf-8");
      ht += c.split(/\r\n|\r|\n/).length;
      const { descriptor: l } = bn(c);
      (n.endsWith(".ts") || n.endsWith(".js")) && (l.script = { content: c }), Ro(l, s, qt);
    }
  }
}, Lo = async (e, t = [], n) => {
  console.log(`

${Q}Analyzing Vue files in ${e}${y}`);
  const s = te.filter(($) => !t.includes($));
  console.log(`Applying ${Q}${t.length}${y} rulesets ${Q}${t}${y} and ignoring ${Q}${s.length}${y} rulesets ${Q}${s}${y} grouping by ${Q}${n}${y}`), qt = t, await Ht(e), console.log(`Found ${Q}${ft}${y} Vue files`);
  const o = jo(n), { errors: c, warnings: l } = o.reduce(($, { errors: v, warnings: S }) => ({ errors: $.errors + v, warnings: $.warnings + S }), { errors: 0, warnings: 0 });
  console.log(`Found ${V}${Intl.NumberFormat("en-US").format(c)} errors${y}, and ${x}${Intl.NumberFormat("en-US").format(l)} warnings${y}, ${Q}${Intl.NumberFormat("en-US").format(ht)} lines${y} of code in ${Q}${Intl.NumberFormat("en-US").format(ft)} files${y}`);
  const f = Math.ceil((1 - (c * 1.5 + l) / ht) * 100);
  f < 75 && console.log(`${V}Code health is LOW: ${f}%${y}`), f >= 75 && f < 85 && console.log(`${x}Code health is MEDIUM ${f}%${y}`), f >= 85 && f < 95 && console.log(`${Q}Code health is OK: ${f}%${y}`), f >= 95 && console.log(`${Ot}Code health is GOOD: ${f}%${y}`), !c && !l && console.log(`${Ot}No code smells detected!${y}`);
};
cn(wn(process.argv)).command(
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
    coerce: (t) => Po(t),
    default: "rule",
    group: "Group Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${V}Cannot use both --ignore and --apply options together.${y}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...te];
    e.apply && (t = e.apply), e.ignore && (t = te.filter((n) => !e.ignore.includes(n))), Lo(e.path, t, e.group);
  }
).help().argv;
function Rt(e) {
  return (t) => {
    const n = t.split(","), s = n.filter((o) => !te.includes(o));
    return s.length > 0 && (console.error(
      `
${V}Invalid ${e} values: ${s.join(
        ", "
      )}${y}. 
${A}Allowed values are: ${[...te].join(", ")}${d}

`
    ), process.exit(1)), n;
  };
}
function Po(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
