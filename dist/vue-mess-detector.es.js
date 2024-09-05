import pe from "node:fs/promises";
import Z from "node:path";
import zs from "yargs";
import Vs, { format as Zn, inspect as Hs } from "util";
import { normalize as Gs, resolve as Ee, dirname as ft, basename as Us, extname as qs, relative as Zs } from "path";
import { readFileSync as un, statSync as Kn, readdirSync as Ks, writeFile as Ys } from "fs";
import { notStrictEqual as Js, strictEqual as Qs } from "assert";
import { fileURLToPath as Xs } from "url";
import eu from "os";
import { parse as tu } from "@vue/compiler-sfc";
import rn from "node:fs";
import { fileURLToPath as nu } from "node:url";
class xe extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, xe);
  }
}
function Yn() {
  return su() ? 0 : 1;
}
function su() {
  return uu() && !process.defaultApp;
}
function uu() {
  return !!process.versions.electron;
}
function ru(t) {
  return t.slice(Yn() + 1);
}
function ou() {
  return process.argv[Yn()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ye(t) {
  if (t !== t.toLowerCase() && t !== t.toUpperCase() || (t = t.toLowerCase()), t.indexOf("-") === -1 && t.indexOf("_") === -1)
    return t;
  {
    let n = "", s = !1;
    const u = t.match(/^-+/);
    for (let o = u ? u[0].length : 0; o < t.length; o++) {
      let r = t.charAt(o);
      s && (s = !1, r = r.toUpperCase()), o !== 0 && (r === "-" || r === "_") ? s = !0 : r !== "-" && r !== "_" && (n += r);
    }
    return n;
  }
}
function Jn(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let u = 0; u < t.length; u++) {
    const o = n.charAt(u), r = t.charAt(u);
    o !== r && u > 0 ? s += `${e}${n.charAt(u)}` : s += r;
  }
  return s;
}
function Qn(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function iu(t) {
  if (Array.isArray(t))
    return t.map((r) => typeof r != "string" ? r + "" : r);
  t = t.trim();
  let e = 0, n = null, s = null, u = null;
  const o = [];
  for (let r = 0; r < t.length; r++) {
    if (n = s, s = t.charAt(r), s === " " && !u) {
      n !== " " && e++;
      continue;
    }
    s === u ? u = null : (s === "'" || s === '"') && !u && (u = s), o[e] || (o[e] = ""), o[e] += s;
  }
  return o;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var se;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(se || (se = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ae;
class cu {
  constructor(e) {
    ae = e;
  }
  parse(e, n) {
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
    }, n), u = iu(e), o = typeof e == "string", r = au(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), c = Object.assign({
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
    }, s.configuration), f = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, A = c["populate--"], y = A ? "--" : "_", E = /* @__PURE__ */ Object.create(null), F = /* @__PURE__ */ Object.create(null), C = s.__ || ae.format, a = {
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
    }, w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, B = new RegExp("^--" + c["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const D = typeof i == "object" ? i.key : i, g = Object.keys(i).map(function(h) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[h];
      }).filter(Boolean).pop();
      g && (a[g][D] = !0), a.arrays[D] = !0, a.keys.push(D);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(i) {
      a.bools[i] = !0, a.keys.push(i);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(i) {
      a.strings[i] = !0, a.keys.push(i);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(i) {
      a.numbers[i] = !0, a.keys.push(i);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(i) {
      a.counts[i] = !0, a.keys.push(i);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(i) {
      a.normalize[i] = !0, a.keys.push(i);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, D]) => {
      typeof D == "number" && (a.nargs[i] = D, a.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, D]) => {
      typeof D == "function" && (a.coercions[i] = D, a.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      a.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, D]) => {
      (typeof D == "boolean" || typeof D == "function") && (a.configs[i] = D);
    })), js(s.key, r, s.default, a.arrays), Object.keys(f).forEach(function(i) {
      (a.aliases[i] || []).forEach(function(D) {
        f[D] = f[i];
      });
    });
    let L = null;
    Ps();
    let W = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), de = {};
    for (let i = 0; i < u.length; i++) {
      const D = u[i], g = D.replace(/^-{3,}/, "---");
      let h, l, x, b, v, H;
      if (D !== "--" && /^-/.test(D) && _e(D))
        te(D);
      else if (g.match(/^---+(=|$)/)) {
        te(D);
        continue;
      } else if (D.match(/^--.+=/) || !c["short-option-groups"] && D.match(/^-.+=/))
        b = D.match(/^--?([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && (R(b[1], a.arrays) ? i = Oe(i, b[1], u, b[2]) : R(b[1], a.nargs) !== !1 ? i = me(i, b[1], u, b[2]) : M(b[1], b[2], !0));
      else if (D.match(B) && c["boolean-negation"])
        b = D.match(B), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], M(l, R(l, a.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !c["short-option-groups"] && D.match(/^-[^-]+/))
        b = D.match(/^--?(.+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], R(l, a.arrays) ? i = Oe(i, l, u) : R(l, a.nargs) !== !1 ? i = me(i, l, u) : (v = u[i + 1], v !== void 0 && (!v.match(/^-/) || v.match(w)) && !R(l, a.bools) && !R(l, a.counts) || /^(true|false)$/.test(v) ? (M(l, v), i++) : M(l, ge(l))));
      else if (D.match(/^-.\..+=/))
        b = D.match(/^-([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && M(b[1], b[2]);
      else if (D.match(/^-.\..+/) && !D.match(w))
        v = u[i + 1], b = D.match(/^-(.\..+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], v !== void 0 && !v.match(/^-/) && !R(l, a.bools) && !R(l, a.counts) ? (M(l, v), i++) : M(l, ge(l)));
      else if (D.match(/^-[^-]+/) && !D.match(w)) {
        x = D.slice(1, -1).split(""), h = !1;
        for (let U = 0; U < x.length; U++) {
          if (v = D.slice(U + 2), x[U + 1] && x[U + 1] === "=") {
            H = D.slice(U + 3), l = x[U], R(l, a.arrays) ? i = Oe(i, l, u, H) : R(l, a.nargs) !== !1 ? i = me(i, l, u, H) : M(l, H), h = !0;
            break;
          }
          if (v === "-") {
            M(x[U], v);
            continue;
          }
          if (/[A-Za-z]/.test(x[U]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(v) && R(v, a.bools) === !1) {
            M(x[U], v), h = !0;
            break;
          }
          if (x[U + 1] && x[U + 1].match(/\W/)) {
            M(x[U], v), h = !0;
            break;
          } else
            M(x[U], ge(x[U]));
        }
        l = D.slice(-1)[0], !h && l !== "-" && (R(l, a.arrays) ? i = Oe(i, l, u) : R(l, a.nargs) !== !1 ? i = me(i, l, u) : (v = u[i + 1], v !== void 0 && (!/^(-|--)[^-]/.test(v) || v.match(w)) && !R(l, a.bools) && !R(l, a.counts) || /^(true|false)$/.test(v) ? (M(l, v), i++) : M(l, ge(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(w) && R(D.slice(1), a.bools))
        l = D.slice(1), M(l, ge(l));
      else if (D === "--") {
        W = u.slice(i + 1);
        break;
      } else if (c["halt-at-non-option"]) {
        W = u.slice(i);
        break;
      } else
        te(D);
    }
    mn(T, !0), mn(T, !1), Rs(T), _s(), gn(T, a.aliases, f, !0), Ns(T), c["set-placeholder-key"] && Ls(T), Object.keys(a.counts).forEach(function(i) {
      $e(T, i.split(".")) || M(i, 0);
    }), A && W.length && (T[y] = []), W.forEach(function(i) {
      T[y].push(i);
    }), c["camel-case-expansion"] && c["strip-dashed"] && Object.keys(T).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete T[i];
    }), c["strip-aliased"] && [].concat(...Object.keys(r).map((i) => r[i])).forEach((i) => {
      c["camel-case-expansion"] && i.includes("-") && delete T[i.split(".").map((D) => ye(D)).join(".")], delete T[i];
    });
    function te(i) {
      const D = Re("_", i);
      (typeof D == "string" || typeof D == "number") && T._.push(D);
    }
    function me(i, D, g, h) {
      let l, x = R(D, a.nargs);
      if (x = typeof x != "number" || isNaN(x) ? 1 : x, x === 0)
        return ce(h) || (L = Error(C("Argument unexpected for: %s", D))), M(D, ge(D)), i;
      let b = ce(h) ? 0 : 1;
      if (c["nargs-eats-options"])
        g.length - (i + 1) + b < x && (L = Error(C("Not enough arguments following: %s", D))), b = x;
      else {
        for (l = i + 1; l < g.length && (!g[l].match(/^-[^0-9]/) || g[l].match(w) || _e(g[l])); l++)
          b++;
        b < x && (L = Error(C("Not enough arguments following: %s", D)));
      }
      let v = Math.min(b, x);
      for (!ce(h) && v > 0 && (M(D, h), v--), l = i + 1; l < v + i + 1; l++)
        M(D, g[l]);
      return i + v;
    }
    function Oe(i, D, g, h) {
      let l = [], x = h || g[i + 1];
      const b = R(D, a.nargs);
      if (R(D, a.bools) && !/^(true|false)$/.test(x))
        l.push(!0);
      else if (ce(x) || ce(h) && /^-/.test(x) && !w.test(x) && !_e(x)) {
        if (f[D] !== void 0) {
          const v = f[D];
          l = Array.isArray(v) ? v : [v];
        }
      } else {
        ce(h) || l.push(Ue(D, h, !0));
        for (let v = i + 1; v < g.length && !(!c["greedy-arrays"] && l.length > 0 || b && typeof b == "number" && l.length >= b || (x = g[v], /^-/.test(x) && !w.test(x) && !_e(x))); v++)
          i = v, l.push(Ue(D, x, o));
      }
      return typeof b == "number" && (b && l.length < b || isNaN(b) && l.length === 0) && (L = Error(C("Not enough arguments following: %s", D))), M(D, l), i;
    }
    function M(i, D, g = o) {
      if (/-/.test(i) && c["camel-case-expansion"]) {
        const x = i.split(".").map(function(b) {
          return ye(b);
        }).join(".");
        dn(i, x);
      }
      const h = Ue(i, D, g), l = i.split(".");
      be(T, l, h), a.aliases[i] && a.aliases[i].forEach(function(x) {
        const b = x.split(".");
        be(T, b, h);
      }), l.length > 1 && c["dot-notation"] && (a.aliases[l[0]] || []).forEach(function(x) {
        let b = x.split(".");
        const v = [].concat(l);
        v.shift(), b = b.concat(v), (a.aliases[i] || []).includes(b.join(".")) || be(T, b, h);
      }), R(i, a.normalize) && !R(i, a.arrays) && [i].concat(a.aliases[i] || []).forEach(function(b) {
        Object.defineProperty(de, b, {
          enumerable: !0,
          get() {
            return D;
          },
          set(v) {
            D = typeof v == "string" ? ae.normalize(v) : v;
          }
        });
      });
    }
    function dn(i, D) {
      a.aliases[i] && a.aliases[i].length || (a.aliases[i] = [D], E[D] = !0), a.aliases[D] && a.aliases[D].length || dn(D, i);
    }
    function Ue(i, D, g) {
      g && (D = lu(D)), (R(i, a.bools) || R(i, a.counts)) && typeof D == "string" && (D = D === "true");
      let h = Array.isArray(D) ? D.map(function(l) {
        return Re(i, l);
      }) : Re(i, D);
      return R(i, a.counts) && (ce(h) || typeof h == "boolean") && (h = Ze()), R(i, a.normalize) && R(i, a.arrays) && (Array.isArray(D) ? h = D.map((l) => ae.normalize(l)) : h = ae.normalize(D)), h;
    }
    function Re(i, D) {
      return !c["parse-positional-numbers"] && i === "_" || !R(i, a.strings) && !R(i, a.bools) && !Array.isArray(D) && (Qn(D) && c["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !ce(D) && R(i, a.numbers)) && (D = Number(D)), D;
    }
    function Rs(i) {
      const D = /* @__PURE__ */ Object.create(null);
      gn(D, a.aliases, f), Object.keys(a.configs).forEach(function(g) {
        const h = i[g] || D[g];
        if (h)
          try {
            let l = null;
            const x = ae.resolve(ae.cwd(), h), b = a.configs[g];
            if (typeof b == "function") {
              try {
                l = b(x);
              } catch (v) {
                l = v;
              }
              if (l instanceof Error) {
                L = l;
                return;
              }
            } else
              l = ae.require(x);
            qe(l);
          } catch (l) {
            l.name === "PermissionDenied" ? L = l : i[g] && (L = Error(C("Invalid JSON config file: %s", h)));
          }
      });
    }
    function qe(i, D) {
      Object.keys(i).forEach(function(g) {
        const h = i[g], l = D ? D + "." + g : g;
        typeof h == "object" && h !== null && !Array.isArray(h) && c["dot-notation"] ? qe(h, l) : (!$e(T, l.split(".")) || R(l, a.arrays) && c["combine-arrays"]) && M(l, h);
      });
    }
    function _s() {
      typeof p < "u" && p.forEach(function(i) {
        qe(i);
      });
    }
    function mn(i, D) {
      if (typeof d > "u")
        return;
      const g = typeof d == "string" ? d : "", h = ae.env();
      Object.keys(h).forEach(function(l) {
        if (g === "" || l.lastIndexOf(g, 0) === 0) {
          const x = l.split("__").map(function(b, v) {
            return v === 0 && (b = b.substring(g.length)), ye(b);
          });
          (D && a.configs[x.join(".")] || !D) && !$e(i, x) && M(x.join("."), h[l]);
        }
      });
    }
    function Ns(i) {
      let D;
      const g = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(h) {
        if (!g.has(h) && (D = R(h, a.coercions), typeof D == "function"))
          try {
            const l = Re(h, D(i[h]));
            [].concat(a.aliases[h] || [], h).forEach((x) => {
              g.add(x), i[x] = l;
            });
          } catch (l) {
            L = l;
          }
      });
    }
    function Ls(i) {
      return a.keys.forEach((D) => {
        ~D.indexOf(".") || typeof i[D] > "u" && (i[D] = void 0);
      }), i;
    }
    function gn(i, D, g, h = !1) {
      Object.keys(g).forEach(function(l) {
        $e(i, l.split(".")) || (be(i, l.split("."), g[l]), h && (F[l] = !0), (D[l] || []).forEach(function(x) {
          $e(i, x.split(".")) || be(i, x.split("."), g[l]);
        }));
      });
    }
    function $e(i, D) {
      let g = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        g = g[l] || {};
      });
      const h = D[D.length - 1];
      return typeof g != "object" ? !1 : h in g;
    }
    function be(i, D, g) {
      let h = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(H) {
        H = Fn(H), typeof h == "object" && h[H] === void 0 && (h[H] = {}), typeof h[H] != "object" || Array.isArray(h[H]) ? (Array.isArray(h[H]) ? h[H].push({}) : h[H] = [h[H], {}], h = h[H][h[H].length - 1]) : h = h[H];
      });
      const l = Fn(D[D.length - 1]), x = R(D.join("."), a.arrays), b = Array.isArray(g);
      let v = c["duplicate-arguments-array"];
      !v && R(l, a.nargs) && (v = !0, (!ce(h[l]) && a.nargs[l] === 1 || Array.isArray(h[l]) && h[l].length === a.nargs[l]) && (h[l] = void 0)), g === Ze() ? h[l] = Ze(h[l]) : Array.isArray(h[l]) ? v && x && b ? h[l] = c["flatten-duplicate-arrays"] ? h[l].concat(g) : (Array.isArray(h[l][0]) ? h[l] : [h[l]]).concat([g]) : !v && !!x == !!b ? h[l] = g : h[l] = h[l].concat([g]) : h[l] === void 0 && x ? h[l] = b ? g : [g] : v && !(h[l] === void 0 || R(l, a.counts) || R(l, a.bools)) ? h[l] = [h[l], g] : h[l] = g;
    }
    function js(...i) {
      i.forEach(function(D) {
        Object.keys(D || {}).forEach(function(g) {
          a.aliases[g] || (a.aliases[g] = [].concat(r[g] || []), a.aliases[g].concat(g).forEach(function(h) {
            if (/-/.test(h) && c["camel-case-expansion"]) {
              const l = ye(h);
              l !== g && a.aliases[g].indexOf(l) === -1 && (a.aliases[g].push(l), E[l] = !0);
            }
          }), a.aliases[g].concat(g).forEach(function(h) {
            if (h.length > 1 && /[A-Z]/.test(h) && c["camel-case-expansion"]) {
              const l = Jn(h, "-");
              l !== g && a.aliases[g].indexOf(l) === -1 && (a.aliases[g].push(l), E[l] = !0);
            }
          }), a.aliases[g].forEach(function(h) {
            a.aliases[h] = [g].concat(a.aliases[g].filter(function(l) {
              return h !== l;
            }));
          }));
        });
      });
    }
    function R(i, D) {
      const g = [].concat(a.aliases[i] || [], i), h = Object.keys(D), l = g.find((x) => h.includes(x));
      return l ? D[l] : !1;
    }
    function Cn(i) {
      const D = Object.keys(a);
      return [].concat(D.map((h) => a[h])).some(function(h) {
        return Array.isArray(h) ? h.includes(i) : h[i];
      });
    }
    function Ts(i, ...D) {
      return [].concat(...D).some(function(h) {
        const l = i.match(h);
        return l && Cn(l[1]);
      });
    }
    function Ws(i) {
      if (i.match(w) || !i.match(/^-[^-]+/))
        return !1;
      let D = !0, g;
      const h = i.slice(1).split("");
      for (let l = 0; l < h.length; l++) {
        if (g = i.slice(l + 2), !Cn(h[l])) {
          D = !1;
          break;
        }
        if (h[l + 1] && h[l + 1] === "=" || g === "-" || /[A-Za-z]/.test(h[l]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) || h[l + 1] && h[l + 1].match(/\W/))
          break;
      }
      return D;
    }
    function _e(i) {
      return c["unknown-options-as-args"] && Is(i);
    }
    function Is(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(w) || Ws(i) ? !1 : !Ts(i, /^-+([^=]+?)=[\s\S]*$/, B, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ge(i) {
      return !R(i, a.bools) && !R(i, a.counts) && `${i}` in f ? f[i] : Ms(ks(i));
    }
    function Ms(i) {
      return {
        [se.BOOLEAN]: !0,
        [se.STRING]: "",
        [se.NUMBER]: void 0,
        [se.ARRAY]: []
      }[i];
    }
    function ks(i) {
      let D = se.BOOLEAN;
      return R(i, a.strings) ? D = se.STRING : R(i, a.numbers) ? D = se.NUMBER : R(i, a.bools) ? D = se.BOOLEAN : R(i, a.arrays) && (D = se.ARRAY), D;
    }
    function ce(i) {
      return i === void 0;
    }
    function Ps() {
      Object.keys(a.counts).find((i) => R(i, a.arrays) ? (L = Error(C("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : R(i, a.nargs) ? (L = Error(C("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(de, T),
      configuration: c,
      defaulted: Object.assign({}, F),
      error: L,
      newAliases: Object.assign({}, E)
    };
  }
}
function au(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(u) {
    e.push([].concat(t[u], u));
  }); s; ) {
    s = !1;
    for (let u = 0; u < e.length; u++)
      for (let o = u + 1; o < e.length; o++)
        if (e[u].filter(function(c) {
          return e[o].indexOf(c) !== -1;
        }).length) {
          e[u] = e[u].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(u) {
    u = u.filter(function(r, c, f) {
      return f.indexOf(r) === c;
    });
    const o = u.pop();
    o !== void 0 && typeof o == "string" && (n[o] = u);
  }), n;
}
function Ze(t) {
  return t !== void 0 ? t + 1 : 1;
}
function Fn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function lu(t) {
  return typeof t == "string" && (t[0] === "'" || t[0] === '"') && t[t.length - 1] === t[0] ? t.substring(1, t.length - 1) : t;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Ke, Ye, Je;
const En = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, $n = (Ye = (Ke = process == null ? void 0 : process.versions) === null || Ke === void 0 ? void 0 : Ke.node) !== null && Ye !== void 0 ? Ye : (Je = process == null ? void 0 : process.version) === null || Je === void 0 ? void 0 : Je.slice(1);
if ($n && Number($n.match(/^([^.]+)/)[1]) < En)
  throw Error(`yargs parser supports a minimum Node.js version of ${En}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Du = process ? process.env : {}, Xn = new cu({
  cwd: process.cwd,
  env: () => Du,
  format: Zn,
  normalize: Gs,
  resolve: Ee,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(un(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Be = function(e, n) {
  return Xn.parse(e.slice(), n).argv;
};
Be.detailed = function(t, e) {
  return Xn.parse(t.slice(), e);
};
Be.camelCase = ye;
Be.decamelize = Jn;
Be.looksLikeNumber = Qn;
const fu = {
  right: Cu,
  center: Fu
}, hu = 0, Le = 1, pu = 2, je = 3;
class du {
  constructor(e) {
    var n;
    this.width = e.width, this.wrap = (n = e.wrap) !== null && n !== void 0 ? n : !0, this.rows = [];
  }
  span(...e) {
    const n = this.div(...e);
    n.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...e) {
    if (e.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...e) && typeof e[0] == "string")
      return this.applyLayoutDSL(e[0]);
    const n = e.map((s) => typeof s == "string" ? this.colFromString(s) : s);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...e) {
    return e.length === 1 && typeof e[0] == "string" && /[\t\n]/.test(e[0]);
  }
  applyLayoutDSL(e) {
    const n = e.split(`
`).map((u) => u.split("	"));
    let s = 0;
    return n.forEach((u) => {
      u.length > 1 && Y.stringWidth(u[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), Y.stringWidth(u[0])));
    }), n.forEach((u) => {
      this.div(...u.map((o, r) => ({
        text: o.trim(),
        padding: this.measurePadding(o),
        width: r === 0 && u.length > 1 ? s : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(e) {
    return {
      text: e,
      padding: this.measurePadding(e)
    };
  }
  measurePadding(e) {
    const n = Y.stripAnsi(e);
    return [0, n.match(/\s*$/)[0].length, 0, n.match(/^\s*/)[0].length];
  }
  toString() {
    const e = [];
    return this.rows.forEach((n) => {
      this.rowToString(n, e);
    }), e.filter((n) => !n.hidden).map((n) => n.text).join(`
`);
  }
  rowToString(e, n) {
    return this.rasterize(e).forEach((s, u) => {
      let o = "";
      s.forEach((r, c) => {
        const { width: f } = e[c], p = this.negatePadding(e[c]);
        let d = r;
        if (p > Y.stringWidth(r) && (d += " ".repeat(p - Y.stringWidth(r))), e[c].align && e[c].align !== "left" && this.wrap) {
          const y = fu[e[c].align];
          d = y(d, p), Y.stringWidth(d) < p && (d += " ".repeat((f || 0) - Y.stringWidth(d) - 1));
        }
        const A = e[c].padding || [0, 0, 0, 0];
        A[je] && (o += " ".repeat(A[je])), o += bn(e[c], d, "| "), o += d, o += bn(e[c], d, " |"), A[Le] && (o += " ".repeat(A[Le])), u === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), u = s ? s[0].length : 0, o = n.text, r = Y.stringWidth(o.trimRight());
    return n.span ? this.wrap ? u < r ? e : (n.hidden = !0, o.trimRight() + " ".repeat(u - r) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let u;
    return e.forEach((o, r) => {
      o.width = s[r], this.wrap ? u = Y.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : u = o.text.split(`
`), o.border && (u.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), u.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (u.unshift(...new Array(o.padding[hu] || 0).fill("")), u.push(...new Array(o.padding[pu] || 0).fill(""))), u.forEach((c, f) => {
        n[f] || n.push([]);
        const p = n[f];
        for (let d = 0; d < r; d++)
          p[d] === void 0 && p.push("");
        p.push(c);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[je] || 0) + (e.padding[Le] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((r) => r.width || Y.stringWidth(r.text));
    let n = e.length, s = this.width;
    const u = e.map((r) => {
      if (r.width)
        return n--, s -= r.width, r.width;
    }), o = n ? Math.floor(s / n) : 0;
    return u.map((r, c) => r === void 0 ? Math.max(o, mu(e[c])) : r);
  }
}
function bn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function mu(t) {
  const e = t.padding || [], n = 1 + (e[je] || 0) + (e[Le] || 0);
  return t.border ? n + 4 : n;
}
function gu() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Cu(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function Fu(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Y;
function Eu(t, e) {
  return Y = e, new du({
    width: t?.width || gu(),
    wrap: t?.wrap
  });
}
const es = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function ts(t) {
  return t.replace(es, "");
}
function $u(t, e) {
  const [n, s] = t.match(es) || ["", ""];
  t = ts(t);
  let u = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (u += `
`), u += t.charAt(o);
  return n && s && (u = `${n}${u}${s}`), u;
}
function bu(t) {
  return Eu(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: ts,
    wrap: $u
  });
}
function yu(t, e) {
  let n = Ee(".", t), s;
  for (Kn(n).isDirectory() || (n = ft(n)); ; ) {
    if (s = e(n, Ks(n)), s) return Ee(n, s);
    if (n = ft(s = n), s === n) break;
  }
}
const wu = {
  fs: {
    readFileSync: un,
    writeFile: Ys
  },
  format: Zn,
  resolve: Ee,
  exists: (t) => {
    try {
      return Kn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let ne;
class xu {
  constructor(e) {
    e = e || {}, this.directory = e.directory || "./locales", this.updateFiles = typeof e.updateFiles == "boolean" ? e.updateFiles : !0, this.locale = e.locale || "en", this.fallbackToLanguage = typeof e.fallbackToLanguage == "boolean" ? e.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...e) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = e.shift();
    let s = function() {
    };
    return typeof e[e.length - 1] == "function" && (s = e.pop()), s = s || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: s
    })) : s(), ne.format.apply(ne.format, [this.cache[this.locale][n] || n].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), u = e.shift();
    let o = function() {
    };
    typeof e[e.length - 1] == "function" && (o = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let r = u === 1 ? n : s;
    this.cache[this.locale][n] && (r = this.cache[this.locale][n][u === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o();
    const c = [r];
    return ~r.indexOf("%d") && c.push(u), ne.format.apply(ne.format, c.concat(e));
  }
  setLocale(e) {
    this.locale = e;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(e) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (this.cache[this.locale][n] = e[n]);
  }
  _taggedLiteral(e, ...n) {
    let s = "";
    return e.forEach(function(u, o) {
      const r = n[o + 1];
      s += u, typeof r < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, u = n.locale, o = n.cb, r = this._resolveLocaleFile(s, u), c = JSON.stringify(this.cache[u], null, 2);
    ne.fs.writeFile(r, c, "utf-8", function(f) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(f);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      ne.fs.readFileSync && (e = JSON.parse(ne.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = ne.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const u = ne.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(u) && (s = u);
    }
    return s;
  }
  _fileExistsSync(e) {
    return ne.exists(e);
  }
}
function Au(t, e) {
  ne = e;
  const n = new xu(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const vu = (t) => Au(t, wu), Bu = "require is not supported by ESM", yn = "loading a directory of commands is not supported yet for ESM";
let Ae;
try {
  Ae = Xs(import.meta.url);
} catch {
  Ae = process.cwd();
}
const Su = Ae.substring(0, Ae.lastIndexOf("node_modules"));
Js, Qs, Hs, Su || process.cwd(), Us, ft, qs, Zs, Ee, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, un, vu({
  directory: Ee(Ae, "../../../locales"),
  updateFiles: !1
});
function Ou(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let on = [], ns = 0;
const G = (t, e) => {
  ns >= e && on.push(t);
};
G.WARN = 1;
G.INFO = 2;
G.DEBUG = 3;
G.reset = () => {
  on = [];
};
G.setDebugLevel = (t) => {
  ns = t;
};
G.warn = (t) => G(t, G.WARN);
G.info = (t) => G(t, G.INFO);
G.debug = (t) => G(t, G.DEBUG);
G.debugMessages = () => on;
var cn = G, an = { exports: {} }, Ru = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const _u = Ru;
var Nu = (t) => typeof t == "string" ? t.replace(_u(), "") : t, ln = { exports: {} };
const ss = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
t === 9001 || // LEFT-POINTING ANGLE BRACKET
t === 9002 || // RIGHT-POINTING ANGLE BRACKET
// CJK Radicals Supplement .. Enclosed CJK Letters and Months
11904 <= t && t <= 12871 && t !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
12880 <= t && t <= 19903 || // CJK Unified Ideographs .. Yi Radicals
19968 <= t && t <= 42182 || // Hangul Jamo Extended-A
43360 <= t && t <= 43388 || // Hangul Syllables
44032 <= t && t <= 55203 || // CJK Compatibility Ideographs
63744 <= t && t <= 64255 || // Vertical Forms
65040 <= t && t <= 65049 || // CJK Compatibility Forms .. Small Form Variants
65072 <= t && t <= 65131 || // Halfwidth and Fullwidth Forms
65281 <= t && t <= 65376 || 65504 <= t && t <= 65510 || // Kana Supplement
110592 <= t && t <= 110593 || // Enclosed Ideographic Supplement
127488 <= t && t <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
131072 <= t && t <= 262141);
ln.exports = ss;
ln.exports.default = ss;
var Lu = ln.exports, ju = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const Tu = Nu, Wu = Lu, Iu = ju, us = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = Tu(t), t.length === 0))
    return 0;
  t = t.replace(Iu(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += Wu(s) ? 2 : 1);
  }
  return e;
};
an.exports = us;
an.exports.default = us;
var Mu = an.exports;
const wn = Mu;
function Me(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ie(t) {
  let e = Me();
  return ("" + t).replace(e, "").split(`
`).reduce(function(u, o) {
    return wn(o) > u ? wn(o) : u;
  }, 0);
}
function we(t, e) {
  return Array(e + 1).join(t);
}
function ku(t, e, n, s) {
  let u = ie(t);
  if (e + 1 >= u) {
    let o = e - u;
    switch (s) {
      case "right": {
        t = we(n, o) + t;
        break;
      }
      case "center": {
        let r = Math.ceil(o / 2), c = o - r;
        t = we(n, c) + t + we(n, r);
        break;
      }
      default: {
        t = t + we(n, o);
        break;
      }
    }
  }
  return t;
}
let Ce = {};
function Se(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", Ce[e] = { set: t, to: !0 }, Ce[n] = { set: t, to: !1 }, Ce[t] = { on: e, off: n };
}
Se("bold", 1, 22);
Se("italics", 3, 23);
Se("underline", 4, 24);
Se("inverse", 7, 27);
Se("strikethrough", 9, 29);
function rs(t, e) {
  let n = e[1] ? parseInt(e[1].split(";")[0]) : 0;
  if (n >= 30 && n <= 39 || n >= 90 && n <= 97) {
    t.lastForegroundAdded = e[0];
    return;
  }
  if (n >= 40 && n <= 49 || n >= 100 && n <= 107) {
    t.lastBackgroundAdded = e[0];
    return;
  }
  if (n === 0) {
    for (let u in t)
      Object.prototype.hasOwnProperty.call(t, u) && delete t[u];
    return;
  }
  let s = Ce[e[0]];
  s && (t[s.set] = s.to);
}
function Pu(t) {
  let e = Me(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    rs(s, n), n = e.exec(t);
  return s;
}
function os(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e += Ce[u].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function zu(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e = Ce[u].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Vu(t, e) {
  if (t.length === ie(t))
    return t.substr(0, e);
  for (; ie(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Hu(t, e) {
  let n = Me(!0), s = t.split(Me()), u = 0, o = 0, r = "", c, f = {};
  for (; o < e; ) {
    c = n.exec(t);
    let p = s[u];
    if (u++, o + ie(p) > e && (p = Vu(p, e - o)), r += p, o += ie(p), o < e) {
      if (!c)
        break;
      r += c[0], rs(f, c);
    }
  }
  return os(f, r);
}
function Gu(t, e, n) {
  if (n = n || "…", ie(t) <= e)
    return t;
  e -= ie(n);
  let u = Hu(t, e);
  u += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !u.includes(o) && (u += o), u;
}
function Uu() {
  return {
    chars: {
      top: "─",
      "top-mid": "┬",
      "top-left": "┌",
      "top-right": "┐",
      bottom: "─",
      "bottom-mid": "┴",
      "bottom-left": "└",
      "bottom-right": "┘",
      left: "│",
      "left-mid": "├",
      mid: "─",
      "mid-mid": "┼",
      right: "│",
      "right-mid": "┤",
      middle: "│"
    },
    truncate: "…",
    colWidths: [],
    rowHeights: [],
    colAligns: [],
    rowAligns: [],
    style: {
      "padding-left": 1,
      "padding-right": 1,
      head: ["red"],
      border: ["grey"],
      compact: !1
    },
    head: []
  };
}
function qu(t, e) {
  t = t || {}, e = e || Uu();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function Zu(t, e) {
  let n = [], s = e.split(/(\s+)/g), u = [], o = 0, r;
  for (let c = 0; c < s.length; c += 2) {
    let f = s[c], p = o + ie(f);
    o > 0 && r && (p += r.length), p > t ? (o !== 0 && n.push(u.join("")), u = [f], o = ie(f)) : (u.push(r || "", f), o = p), r = s[c + 1];
  }
  return o && n.push(u.join("")), n;
}
function Ku(t, e) {
  let n = [], s = "";
  function u(r, c) {
    for (s.length && c && (s += c), s += r; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let r = 0; r < o.length; r += 2)
    u(o[r], r && o[r - 1]);
  return s.length && n.push(s), n;
}
function Yu(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const u = n ? Zu : Ku;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, u(t, e[o]));
  return s;
}
function Ju(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let u = zu(e, t[s]);
    e = Pu(u);
    let o = Object.assign({}, e);
    n.push(os(o, u));
  }
  return n;
}
function Qu(t, e) {
  const n = "\x1B]", s = "\x07", u = ";";
  return [n, "8", u, u, t || e, s, e, n, "8", u, u, s].join("");
}
var is = {
  strlen: ie,
  repeat: we,
  pad: ku,
  truncate: Gu,
  mergeOptions: qu,
  wordWrap: Yu,
  colorizeLines: Ju,
  hyperlink: Qu
}, cs = { exports: {} }, Ge = { exports: {} }, Qe = { exports: {} }, Xe = { exports: {} }, et = { exports: {} }, xn;
function Xu() {
  return xn || (xn = 1, function(t) {
    var e = {};
    t.exports = e;
    var n = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(n).forEach(function(s) {
      var u = n[s], o = e[s] = [];
      o.open = "\x1B[" + u[0] + "m", o.close = "\x1B[" + u[1] + "m";
    });
  }(et)), et.exports;
}
var tt, An;
function er() {
  return An || (An = 1, tt = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", u = e.indexOf(s + t);
    return u !== -1 && (n === -1 ? !0 : u < n);
  }), tt;
}
var nt, vn;
function tr() {
  if (vn) return nt;
  vn = 1;
  var t = eu, e = er(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function u(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (c && !c.isTTY && s !== !0)
      return 0;
    var f = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(A) {
        return A in n;
      }) || n.CI_NAME === "codeship" ? 1 : f;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in n) {
      var d = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", f);
  }
  function r(c) {
    var f = o(c);
    return u(f);
  }
  return nt = {
    supportsColor: r,
    stdout: r(process.stdout),
    stderr: r(process.stderr)
  }, nt;
}
var st = { exports: {} }, Bn;
function nr() {
  return Bn || (Bn = 1, function(t) {
    t.exports = function(n, s) {
      var u = "";
      n = n || "Run the trap, drop the bass", n = n.split("");
      var o = {
        a: ["@", "Ą", "Ⱥ", "Ʌ", "Δ", "Λ", "Д"],
        b: ["ß", "Ɓ", "Ƀ", "ɮ", "β", "฿"],
        c: ["©", "Ȼ", "Ͼ"],
        d: ["Ð", "Ɗ", "Ԁ", "ԁ", "Ԃ", "ԃ"],
        e: [
          "Ë",
          "ĕ",
          "Ǝ",
          "ɘ",
          "Σ",
          "ξ",
          "Ҽ",
          "੬"
        ],
        f: ["Ӻ"],
        g: ["ɢ"],
        h: ["Ħ", "ƕ", "Ң", "Һ", "Ӈ", "Ԋ"],
        i: ["༏"],
        j: ["Ĵ"],
        k: ["ĸ", "Ҡ", "Ӄ", "Ԟ"],
        l: ["Ĺ"],
        m: ["ʍ", "Ӎ", "ӎ", "Ԡ", "ԡ", "൩"],
        n: ["Ñ", "ŋ", "Ɲ", "Ͷ", "Π", "Ҋ"],
        o: [
          "Ø",
          "õ",
          "ø",
          "Ǿ",
          "ʘ",
          "Ѻ",
          "ם",
          "۝",
          "๏"
        ],
        p: ["Ƿ", "Ҏ"],
        q: ["্"],
        r: ["®", "Ʀ", "Ȑ", "Ɍ", "ʀ", "Я"],
        s: ["§", "Ϟ", "ϟ", "Ϩ"],
        t: ["Ł", "Ŧ", "ͳ"],
        u: ["Ʊ", "Ս"],
        v: ["ט"],
        w: ["Ш", "Ѡ", "Ѽ", "൰"],
        x: ["Ҳ", "Ӿ", "Ӽ", "ӽ"],
        y: ["¥", "Ұ", "Ӌ"],
        z: ["Ƶ", "ɀ"]
      };
      return n.forEach(function(r) {
        r = r.toLowerCase();
        var c = o[r] || [" "], f = Math.floor(Math.random() * c.length);
        typeof o[r] < "u" ? u += o[r][f] : u += r;
      }), u;
    };
  }(st)), st.exports;
}
var ut = { exports: {} }, Sn;
function sr() {
  return Sn || (Sn = 1, function(t) {
    t.exports = function(n, s) {
      n = n || "   he is here   ";
      var u = {
        up: [
          "̍",
          "̎",
          "̄",
          "̅",
          "̿",
          "̑",
          "̆",
          "̐",
          "͒",
          "͗",
          "͑",
          "̇",
          "̈",
          "̊",
          "͂",
          "̓",
          "̈",
          "͊",
          "͋",
          "͌",
          "̃",
          "̂",
          "̌",
          "͐",
          "̀",
          "́",
          "̋",
          "̏",
          "̒",
          "̓",
          "̔",
          "̽",
          "̉",
          "ͣ",
          "ͤ",
          "ͥ",
          "ͦ",
          "ͧ",
          "ͨ",
          "ͩ",
          "ͪ",
          "ͫ",
          "ͬ",
          "ͭ",
          "ͮ",
          "ͯ",
          "̾",
          "͛",
          "͆",
          "̚"
        ],
        down: [
          "̖",
          "̗",
          "̘",
          "̙",
          "̜",
          "̝",
          "̞",
          "̟",
          "̠",
          "̤",
          "̥",
          "̦",
          "̩",
          "̪",
          "̫",
          "̬",
          "̭",
          "̮",
          "̯",
          "̰",
          "̱",
          "̲",
          "̳",
          "̹",
          "̺",
          "̻",
          "̼",
          "ͅ",
          "͇",
          "͈",
          "͉",
          "͍",
          "͎",
          "͓",
          "͔",
          "͕",
          "͖",
          "͙",
          "͚",
          "̣"
        ],
        mid: [
          "̕",
          "̛",
          "̀",
          "́",
          "͘",
          "̡",
          "̢",
          "̧",
          "̨",
          "̴",
          "̵",
          "̶",
          "͜",
          "͝",
          "͞",
          "͟",
          "͠",
          "͢",
          "̸",
          "̷",
          "͡",
          " ҉"
        ]
      }, o = [].concat(u.up, u.down, u.mid);
      function r(p) {
        var d = Math.floor(Math.random() * p);
        return d;
      }
      function c(p) {
        var d = !1;
        return o.filter(function(A) {
          d = A === p;
        }), d;
      }
      function f(p, d) {
        var A = "", y, E;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (E in p)
          if (!c(E)) {
            switch (A = A + p[E], y = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                y.up = r(8), y.mid = r(2), y.down = r(8);
                break;
              case "maxi":
                y.up = r(16) + 3, y.mid = r(4) + 1, y.down = r(64) + 3;
                break;
              default:
                y.up = r(8) + 1, y.mid = r(6) / 2, y.down = r(8) + 1;
                break;
            }
            var F = ["up", "mid", "down"];
            for (var C in F)
              for (var a = F[C], w = 0; w <= y[a]; w++)
                d[a] && (A = A + u[a][r(u[a].length)]);
          }
        return A;
      }
      return f(n, s);
    };
  }(ut)), ut.exports;
}
var rt = { exports: {} }, On;
function ur() {
  return On || (On = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, u) {
        if (n === " ") return n;
        switch (s % 3) {
          case 0:
            return e.red(n);
          case 1:
            return e.white(n);
          case 2:
            return e.blue(n);
        }
      };
    };
  }(rt)), rt.exports;
}
var ot = { exports: {} }, Rn;
function rr() {
  return Rn || (Rn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, u) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(ot)), ot.exports;
}
var it = { exports: {} }, _n;
function or() {
  return _n || (_n = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, u, o) {
        return s === " " ? s : e[n[u++ % n.length]](s);
      };
    };
  }(it)), it.exports;
}
var ct = { exports: {} }, Nn;
function ir() {
  return Nn || (Nn = 1, function(t) {
    t.exports = function(e) {
      var n = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
      ];
      return function(s, u, o) {
        return s === " " ? s : e[n[Math.round(Math.random() * (n.length - 2))]](s);
      };
    };
  }(ct)), ct.exports;
}
var Ln;
function cr() {
  return Ln || (Ln = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Vs, s = e.styles = Xu(), u = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = tr().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(C) {
      return ("" + C).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(a, w) {
      if (!e.enabled)
        return a + "";
      var B = s[w];
      return !B && w in e ? e[w](a) : B.open + a + B.close;
    };
    var r = /[|\\{}()[\]^$+*?.]/g, c = function(C) {
      if (typeof C != "string")
        throw new TypeError("Expected a string");
      return C.replace(r, "\\$&");
    };
    function f(C) {
      var a = function w() {
        return A.apply(w, arguments);
      };
      return a._styles = C, a.__proto__ = d, a;
    }
    var p = function() {
      var C = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(a) {
        s[a].closeRe = new RegExp(c(s[a].close), "g"), C[a] = {
          get: function() {
            return f(this._styles.concat(a));
          }
        };
      }), C;
    }(), d = u(function() {
    }, p);
    function A() {
      var C = Array.prototype.slice.call(arguments), a = C.map(function(T) {
        return T != null && T.constructor === String ? T : n.inspect(T);
      }).join(" ");
      if (!e.enabled || !a)
        return a;
      for (var w = a.indexOf(`
`) != -1, B = this._styles, L = B.length; L--; ) {
        var W = s[B[L]];
        a = W.open + a.replace(W.closeRe, W.open) + W.close, w && (a = a.replace(o, function(T) {
          return W.close + T + W.open;
        }));
      }
      return a;
    }
    e.setTheme = function(C) {
      if (typeof C == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var a in C)
        (function(w) {
          e[w] = function(B) {
            if (typeof C[w] == "object") {
              var L = B;
              for (var W in C[w])
                L = e[C[w][W]](L);
              return L;
            }
            return e[C[w]](B);
          };
        })(a);
    };
    function y() {
      var C = {};
      return Object.keys(p).forEach(function(a) {
        C[a] = {
          get: function() {
            return f([a]);
          }
        };
      }), C;
    }
    var E = function(a, w) {
      var B = w.split("");
      return B = B.map(a), B.join("");
    };
    e.trap = nr(), e.zalgo = sr(), e.maps = {}, e.maps.america = ur()(e), e.maps.zebra = rr()(e), e.maps.rainbow = or()(e), e.maps.random = ir()(e);
    for (var F in e.maps)
      (function(C) {
        e[C] = function(a) {
          return E(e.maps[C], a);
        };
      })(F);
    u(e, y());
  }(Xe)), Xe.exports;
}
var jn;
function ar() {
  return jn || (jn = 1, function(t) {
    var e = cr();
    t.exports = e;
  }(Qe)), Qe.exports;
}
const { info: lr, debug: as } = cn, K = is;
let Dr = class Te {
  /**
   * A representation of a cell within the table.
   * Implementations must have `init` and `draw` methods,
   * as well as `colSpan`, `rowSpan`, `desiredHeight` and `desiredWidth` properties.
   * @param options
   * @constructor
   */
  constructor(e) {
    this.setOptions(e), this.x = null, this.y = null;
  }
  setOptions(e) {
    ["boolean", "number", "bigint", "string"].indexOf(typeof e) !== -1 && (e = { content: "" + e }), e = e || {}, this.options = e;
    let n = e.content;
    if (["boolean", "number", "bigint", "string"].indexOf(typeof n) !== -1)
      this.content = String(n);
    else if (!n)
      this.content = this.options.href || "";
    else
      throw new Error("Content needs to be a primitive, got: " + typeof n);
    this.colSpan = e.colSpan || 1, this.rowSpan = e.rowSpan || 1, this.options.href && Object.defineProperty(this, "href", {
      get() {
        return this.options.href;
      }
    });
  }
  mergeTableOptions(e, n) {
    this.cells = n;
    let s = this.options.chars || {}, u = e.chars, o = this.chars = {};
    hr.forEach(function(f) {
      at(s, u, f, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let r = this.options.style = this.options.style || {}, c = e.style;
    at(r, c, "padding-left", this), at(r, c, "padding-right", this), this.head = r.head || c.head, this.border = r.border || c.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = K.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let r = 1;
        for (; r < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + r], r++;
      }
      const { wrapOnWordBoundary: u = !0 } = e, { wrapOnWordBoundary: o = u } = this.options;
      return this.wrapLines(K.wordWrap(this.fixedWidth, this.content, o));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = K.colorizeLines(e);
    return this.href ? n.map((s) => K.hyperlink(this.href, s)) : n;
  }
  /**
   * Initializes the Cells data structure.
   *
   * @param tableOptions - A fully populated set of tableOptions.
   * In addition to the standard default values, tableOptions must have fully populated the
   * `colWidths` and `rowWidths` arrays. Those arrays must have lengths equal to the number
   * of columns or rows (respectively) in this table, and each array item must be a Number.
   *
   */
  init(e) {
    let n = this.x, s = this.y;
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Wn, -1), this.height = this.heights.reduce(Wn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
  }
  /**
   * Draws the given line of the cell.
   * This default implementation defers to methods `drawTop`, `drawBottom`, `drawLine` and `drawEmpty`.
   * @param lineNum - can be `top`, `bottom` or a numerical line number.
   * @param spanningCell - will be a number if being called from a RowSpanCell, and will represent how
   * many rows below it's being called from. Otherwise it's undefined.
   * @returns {String} The representation of this line.
   */
  draw(e, n) {
    if (e == "top") return this.drawTop(this.drawRight);
    if (e == "bottom") return this.drawBottom(this.drawRight);
    let s = K.truncate(this.content, 10, this.truncate);
    e || lr(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
    let u = Math.max(this.height - this.lines.length, 0), o;
    switch (this.vAlign) {
      case "center":
        o = Math.ceil(u / 2);
        break;
      case "bottom":
        o = u;
        break;
      default:
        o = 0;
    }
    if (e < o || e >= o + this.lines.length)
      return this.drawEmpty(this.drawRight, n);
    let r = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - o, this.drawRight, r, n);
  }
  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(e) {
    let n = [];
    return this.cells ? this.widths.forEach(function(s, u) {
      n.push(this._topLeftChar(u)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof Te.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof Te.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof Te.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = ar();
        for (let u = this[e].length - 1; u >= 0; u--)
          s = s[this[e][u]];
        return s(n);
      } catch {
        return n;
      }
    else
      return n;
  }
  /**
   * Renders a line of text.
   * @param lineNum - Which line of text to render. This is not necessarily the line within the cell.
   * There may be top-padding above the first line of text.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param forceTruncationSymbol - `true` if the rendered text should end with the truncation symbol even
   * if the text fits. This is used when the cell is vertically truncated. If `false` the text should
   * only include the truncation symbol if the text will not fit horizontally within the cell width.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawLine(e, n, s, u) {
    let o = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && u && this.cells) {
      let y = this.cells[this.y + u][this.x - 1];
      for (; y instanceof ht; )
        y = this.cells[y.y][y.x - 1];
      y instanceof pt || (o = this.chars.rightMid);
    }
    let r = K.repeat(" ", this.paddingLeft), c = n ? this.chars.right : "", f = K.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let A = K.truncate(p, d, this.truncate);
    return A = K.pad(A, d, " ", this.hAlign), A = r + A + f, this.stylizeLine(o, A, c);
  }
  stylizeLine(e, n, s) {
    return e = this.wrapWithStyleColors("border", e), s = this.wrapWithStyleColors("border", s), this.y === 0 && (n = this.wrapWithStyleColors("head", n)), e + n + s;
  }
  /**
   * Renders the bottom line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawBottom(e) {
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = K.repeat(this.chars.bottom, this.width), u = e ? this.chars.bottomRight : "";
    return this.wrapWithStyleColors("border", n + s + u);
  }
  /**
   * Renders a blank line of text within the cell. Used for top and/or bottom padding.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawEmpty(e, n) {
    let s = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && n && this.cells) {
      let r = this.cells[this.y + n][this.x - 1];
      for (; r instanceof ht; )
        r = this.cells[r.y][r.x - 1];
      r instanceof pt || (s = this.chars.rightMid);
    }
    let u = e ? this.chars.right : "", o = K.repeat(" ", this.width);
    return this.stylizeLine(s, o, u);
  }
}, ht = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && as(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, pt = class {
  /**
   * A placeholder Cell for a Cell that spans multiple rows.
   * It delegates rendering to the original cell, but adds the appropriate offset.
   * @param originalCell
   * @constructor
   */
  constructor(e) {
    this.originalCell = e;
  }
  init(e) {
    let n = this.y, s = this.originalCell.y;
    this.cellOffset = n - s, this.offset = fr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (as(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function Tn(...t) {
  return t.filter((e) => e != null).shift();
}
function at(t, e, n, s) {
  let u = n.split("-");
  u.length > 1 ? (u[1] = u[1].charAt(0).toUpperCase() + u[1].substr(1), u = u.join(""), s[u] = Tn(t[u], t[n], e[u], e[n])) : s[n] = Tn(t[n], e[n]);
}
function fr(t, e, n) {
  let s = t[e];
  for (let u = 1; u < n; u++)
    s += 1 + t[e + u];
  return s;
}
function Wn(t, e) {
  return t + e + 1;
}
let hr = [
  "top",
  "top-mid",
  "top-left",
  "top-right",
  "bottom",
  "bottom-mid",
  "bottom-left",
  "bottom-right",
  "left",
  "left-mid",
  "mid",
  "mid-mid",
  "right",
  "right-mid",
  "middle"
];
Ge.exports = Dr;
Ge.exports.ColSpanCell = ht;
Ge.exports.RowSpanCell = pt;
var pr = Ge.exports;
const { warn: dr, debug: mr } = cn, dt = pr, { ColSpanCell: gr, RowSpanCell: Cr } = dt;
(function() {
  function t(E, F) {
    return E[F] > 0 ? t(E, F + 1) : F;
  }
  function e(E) {
    let F = {};
    E.forEach(function(C, a) {
      let w = 0;
      C.forEach(function(B) {
        B.y = a, B.x = a ? t(F, w) : w;
        const L = B.rowSpan || 1, W = B.colSpan || 1;
        if (L > 1)
          for (let T = 0; T < W; T++)
            F[B.x + T] = L;
        w = B.x + W;
      }), Object.keys(F).forEach((B) => {
        F[B]--, F[B] < 1 && delete F[B];
      });
    });
  }
  function n(E) {
    let F = 0;
    return E.forEach(function(C) {
      C.forEach(function(a) {
        F = Math.max(F, a.x + (a.colSpan || 1));
      });
    }), F;
  }
  function s(E) {
    return E.length;
  }
  function u(E, F) {
    let C = E.y, a = E.y - 1 + (E.rowSpan || 1), w = F.y, B = F.y - 1 + (F.rowSpan || 1), L = !(C > B || w > a), W = E.x, T = E.x - 1 + (E.colSpan || 1), de = F.x, te = F.x - 1 + (F.colSpan || 1), me = !(W > te || de > T);
    return L && me;
  }
  function o(E, F, C) {
    let a = Math.min(E.length - 1, C), w = { x: F, y: C };
    for (let B = 0; B <= a; B++) {
      let L = E[B];
      for (let W = 0; W < L.length; W++)
        if (u(w, L[W]))
          return !0;
    }
    return !1;
  }
  function r(E, F, C, a) {
    for (let w = C; w < a; w++)
      if (o(E, w, F))
        return !1;
    return !0;
  }
  function c(E) {
    E.forEach(function(F, C) {
      F.forEach(function(a) {
        for (let w = 1; w < a.rowSpan; w++) {
          let B = new Cr(a);
          B.x = a.x, B.y = a.y + w, B.colSpan = a.colSpan, p(B, E[C + w]);
        }
      });
    });
  }
  function f(E) {
    for (let F = E.length - 1; F >= 0; F--) {
      let C = E[F];
      for (let a = 0; a < C.length; a++) {
        let w = C[a];
        for (let B = 1; B < w.colSpan; B++) {
          let L = new gr();
          L.x = w.x + B, L.y = w.y, C.splice(a + 1, 0, L);
        }
      }
    }
  }
  function p(E, F) {
    let C = 0;
    for (; C < F.length && F[C].x < E.x; )
      C++;
    F.splice(C, 0, E);
  }
  function d(E) {
    let F = s(E), C = n(E);
    mr(`Max rows: ${F}; Max cols: ${C}`);
    for (let a = 0; a < F; a++)
      for (let w = 0; w < C; w++)
        if (!o(E, w, a)) {
          let B = { x: w, y: a, colSpan: 1, rowSpan: 1 };
          for (w++; w < C && !o(E, w, a); )
            B.colSpan++, w++;
          let L = a + 1;
          for (; L < F && r(E, L, B.x, B.x + B.colSpan); )
            B.rowSpan++, L++;
          let W = new dt(B);
          W.x = B.x, W.y = B.y, dr(`Missing cell at ${W.y}-${W.x}.`), p(W, E[a]);
        }
  }
  function A(E) {
    return E.map(function(F) {
      if (!Array.isArray(F)) {
        let C = Object.keys(F)[0];
        F = F[C], Array.isArray(F) ? (F = F.slice(), F.unshift(C)) : F = [C, F];
      }
      return F.map(function(C) {
        return new dt(C);
      });
    });
  }
  function y(E) {
    let F = A(E);
    return e(F), d(F), c(F), f(F), F;
  }
  cs.exports = {
    makeTableLayout: y,
    layoutTable: e,
    addRowSpanCells: c,
    maxWidth: n,
    fillInTable: d,
    computeWidths: In("colSpan", "desiredWidth", "x", 1),
    computeHeights: In("rowSpan", "desiredHeight", "y", 1)
  };
})();
function In(t, e, n, s) {
  return function(u, o) {
    let r = [], c = [], f = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? c.push(d) : r[d[n]] = Math.max(r[d[n]] || 0, d[e] || 0, s);
      });
    }), u.forEach(function(p, d) {
      typeof p == "number" && (r[d] = p);
    });
    for (let p = c.length - 1; p >= 0; p--) {
      let d = c[p], A = d[t], y = d[n], E = r[y], F = typeof u[y] == "number" ? 0 : 1;
      if (typeof E == "number")
        for (let C = 1; C < A; C++)
          E += 1 + r[y + C], typeof u[y + C] != "number" && F++;
      else
        E = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!f[y] || f[y] < E) && (f[y] = E);
      if (d[e] > E) {
        let C = 0;
        for (; F > 0 && d[e] > E; ) {
          if (typeof u[y + C] != "number") {
            let a = Math.round((d[e] - E) / F);
            E += a, r[y + C] += a, F--;
          }
          C++;
        }
      }
    }
    Object.assign(u, r, f);
    for (let p = 0; p < u.length; p++)
      u[p] = Math.max(s, u[p] || 0);
  };
}
var Fr = cs.exports;
const le = cn, Er = is, lt = Fr;
let ls = class extends Array {
  constructor(e) {
    super();
    const n = Er.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          le.setDebugLevel(le.WARN);
          break;
        case "number":
          le.setDebugLevel(n.debug);
          break;
        case "string":
          le.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          le.setDebugLevel(le.WARN), le.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return le.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = lt.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(r) {
        r.mergeTableOptions(this.options, s);
      }, this);
    }, this), lt.computeWidths(this.options.colWidths, s), lt.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(r) {
        r.init(this.options);
      }, this);
    }, this);
    let u = [];
    for (let o = 0; o < s.length; o++) {
      let r = s[o], c = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && Dt(r, "top", u);
      for (let f = 0; f < c; f++)
        Dt(r, f, u);
      o + 1 == s.length && Dt(r, "bottom", u);
    }
    return u.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
ls.reset = () => le.reset();
function Dt(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let u = s.join("");
  u.length && n.push(u);
}
var $r = ls, br = $r;
const yr = /* @__PURE__ */ Ou(br), Q = "\x1B[44m", N = "\x1B[43m", k = "\x1B[41m", mt = "\x1B[42m", $ = "\x1B[0m", _ = "\x1B[33m", S = "\x1B[36m", m = "\x1B[0m", wr = [
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
], gt = [], xr = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let u;
    for (; (u = n.exec(s.content)) !== null; ) {
      const o = u[1];
      wr.includes(o) && gt.push({ filePath: e, message: `${N}(${o})${$}` });
    }
  });
}, Ar = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${_}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, vr = /^(\(.*\)|\\?.)$/;
function De(t) {
  const e = t.toString();
  return vr.test(e) ? e : `(?:${e})`;
}
const Br = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Sr = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function O(t) {
  const e = (n) => O(`(?<${n}>${`${t}`.replace(Br, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => O(`${t}${X(...n)}`), {
      referenceTo: (n) => O(`${t}\\k<${n}>`)
    }),
    or: (...n) => O(`(?:${t}|${X(...n)})`),
    after: (...n) => O(`(?<=${X(...n)})${t}`),
    before: (...n) => O(`${t}(?=${X(...n)})`),
    notAfter: (...n) => O(`(?<!${X(...n)})${t}`),
    notBefore: (...n) => O(`${t}(?!${X(...n)})`),
    times: Object.assign((n) => O(`${De(t)}{${n}}`), {
      any: () => O(`${De(t)}*`),
      atLeast: (n) => O(`${De(t)}{${n},}`),
      atMost: (n) => O(`${De(t)}{0,${n}}`),
      between: (n, s) => O(`${De(t)}{${n},${s}}`)
    }),
    optionally: () => O(`${De(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => O(`${t}`.replace(Sr, "($1$3)$2")),
    at: {
      lineStart: () => O(`^${t}`),
      lineEnd: () => O(`${t}$`)
    }
  };
}
const Or = /[.*+?^${}()|[\]\\/]/g;
function ve(t) {
  return O(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function q(t) {
  return O(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function We(...t) {
  return O(`(?:${t.map((e) => X(e)).join("|")})`);
}
const Fe = O(".");
O("\\b\\w+\\b");
const ee = O("\\w"), J = O("\\b"), Rr = O("\\d"), V = O("\\s"), Ds = Object.assign(O("[a-zA-Z]"), {
  lowercase: O("[a-z]"),
  uppercase: O("[A-Z]")
}), fs = O("\\t"), hs = O("\\n");
O("\\r");
O("\\W+"), O("\\W"), O("\\B"), O("\\D"), O("\\S"), Object.assign(O("[^a-zA-Z]"), {
  lowercase: O("[^a-z]"),
  uppercase: O("[^A-Z]")
}), O("[^\\t]"), O("[^\\n]"), O("[^\\r]");
function oe(...t) {
  return O(`${De(X(...t))}?`);
}
function X(...t) {
  return O(
    t.map((e) => typeof e == "string" ? e.replace(Or, "\\$&") : e).join("")
  );
}
function j(...t) {
  return O(`${De(X(...t))}+`);
}
const re = "i", z = "g", I = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(X(...t).toString(), [...e || ""].join(""));
}, P = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((c, f) => f >= n && c.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((r, c) => r + c.length, 0), u = t.indexOf(e, s);
  return t.slice(0, u).split(`
`).length;
}, ke = [], _r = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, u = I(X("$parent").or("getCurrentInstance"), [z]), o = t.content.match(n), r = t.content.match(s);
  if (r) {
    const f = r[1].split(".")[0];
    if ((o ? o[1] : "").includes(f)) {
      const d = P(t.content.trim(), f);
      ke.push({
        filePath: e,
        message: `line #${d} ${N}(${f})${$}`
      });
    }
  }
  const c = t.content.match(u);
  if (c) {
    const f = P(t.content.trim(), c[0]);
    ke.push({
      filePath: e,
      message: `line #${f} ${N}(${c[0]})${$}`
    });
  }
}, Nr = () => {
  const t = [];
  return ke.length > 0 && ke.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${_}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], Lr = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || Ct.push({
      filePath: e,
      message: `${k}global style${$} used`
    });
  });
}, jr = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ global style${m}`,
      description: `👉 ${_}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], Tr = (t, e) => {
  if (!t)
    return;
  const n = I("defineProps([", [z, re]);
  t.content.match(n)?.length && Ft.push({ filePath: e, message: `${k}Props type${$} not defined` });
}, Wr = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ simple prop${m}`,
      description: `👉 ${_}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], Ir = (t) => {
  if (t.includes("pages"))
    return;
  const e = Z.basename(t);
  if (e === "App.vue")
    return;
  const n = I(Ds.uppercase);
  e.slice(1).match(n)?.length || Et.push({ filePath: t, message: `Component name is ${k}single word${$}` });
}, Mr = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ single name component${m}`,
      description: `👉 ${_}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], kr = (t, e) => {
  if (!t)
    return;
  const n = I("<", j(q(">")), " v-for", j(q(">")), ">", [
    z,
    re
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || $t.push({ filePath: e, message: `v-for used ${k}without a key${$}` }));
}, Pr = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${_}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], zr = (t, e) => {
  if (!t)
    return;
  const n = I(
    "<",
    j(q(">")),
    " v-if",
    j(q(">")),
    " v-for",
    j(q(">")),
    ">",
    [z, re]
  ), s = I(
    "<",
    j(q(">")),
    " v-for",
    j(q(">")),
    " v-if",
    j(q(">")),
    ">",
    [z, re]
  ), u = t.content.match(n), o = t.content.match(s);
  if (u?.length || o?.length) {
    const r = u?.length ? u[0] : o?.length ? o[0] : "", c = P(t.content, r);
    bt.push({ filePath: e, message: `line #${c} ${k}v-if used with v-for${$}` });
  }
}, Vr = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${_}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], Mn = [
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
], Hr = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, u = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const r = o[1], c = o[2];
    if (c) {
      const p = Array.from(c.matchAll(u), (A) => A[1]).filter((A) => Mn.includes(A));
      let d = -1;
      for (const A of p) {
        const y = Mn.indexOf(A);
        if (y !== -1 && y < d) {
          yt.push({
            filePath: e,
            message: `tag has attributes out of order ${N}(${r})${$}`
          });
          break;
        }
        d = y;
      }
    }
  }
}, Gr = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${_}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], Ur = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), u = n.indexOf("<template>"), o = n.indexOf("<style>"), r = [
    { name: "script", index: s },
    { name: "template", index: u },
    { name: "style", index: o }
  ].filter((f) => f.index !== -1);
  r.every((f, p) => p === 0 ? !0 : r[p - 1].index < f.index) || wt.push({ filePath: e, message: `Top level elements are ${N}not following the correct order.${$}` });
}, qr = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-recommended ~ top level element order${m}`,
      description: `👉 ${_}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], Zr = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = Z.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), u = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(u);
  !s?.length && !o?.length && xt.push({ filePath: t, message: `component name is ${N}not PascalCase, nor kebab-case.${$}` });
}, Kr = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${_}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], Yr = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    const o = P(t.content.trim(), u), r = u.split(`
`).at(0)?.trim() || "";
    At.push({ filePath: e, message: `line #${o} ${N}(${r})${$}` });
  });
}, Jr = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component files${m}`,
      description: `👉 ${_}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], kn = [], Qr = ["v-slot", "v-bind", "v-on"], Xr = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Qr.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const u = P(t.source, s);
      vt.push({ filePath: e, message: `line #${u} ${N}${s}${$}` }), kn.some((o) => o.filePath === e) || kn.push({ filePath: e });
    }
  });
}, eo = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${_}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], to = 3, no = (t) => {
  const e = I(
    j(q("/")).grouped(),
    X(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], u = I(
      ve("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [z]
    ), o = s.match(u);
    (!o || o.length < to) && Bt.push({ filePath: t, message: `${s} is not a ${N}full word.${$}` });
  }
}, so = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ full-word component names${m}`,
      description: `👉 ${_}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], uo = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1], o = s[2];
    o.split(/\s+/).filter((c) => c.trim() !== "").length > 1 && o.split(`
`).length === 1 && St.push({ filePath: e, message: `Element ${N}<${u}>${$} should have its attributes on separate lines` });
  }
}, ro = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${_}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], oo = /^[a-z]+([A-Z][a-z]*)*$/, io = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !oo.test(o)).length && Ot.push({ filePath: e, message: `prop names are ${N}not camelCased${$}` });
}, co = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${_}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], ao = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = I(
    "<",
    j(ee),
    oe(j(ve(` 	
\r`))),
    j(q("/>")),
    oe(j(ve(` 	
\r`))),
    oe("/"),
    ">",
    ["g"]
  ), u = n?.content.match(s);
  if (u === null)
    return;
  const o = I(":", j(ee), oe(" "), "=", oe(" "), q(`'"`), [
    "g"
  ]);
  u?.forEach((r) => {
    if (!r.includes(":"))
      return;
    const c = r.match(o);
    if (c?.length) {
      const f = P(t.source, r);
      Rt.push({ filePath: e, message: `line #${f} ${N}${c}${$}` });
    }
  });
}, lo = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${_}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], Do = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = I(
    "<",
    j(Ds.uppercase, ee),
    oe(hs, fs),
    oe(j(q(">"))),
    "></",
    j(ee),
    ">",
    ["g"]
  ), u = n?.content?.match(s);
  u !== null && u?.forEach((o) => {
    const r = P(t.source, o), c = o.split(`
`).at(-1)?.trim() || "";
    _t.push({ filePath: e, message: `line #${r} ${N}${c}${$}` });
  });
}, fo = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${_}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ps = [], Ie = [], ho = 5, po = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((u) => {
    if (u.split(`
`).length > ho) {
      const o = u.split(`
`)[0], r = P(t.content, o);
      ps.push({ filePath: e, message: `line #${r} ${N}computed${$}` }), Ie.push({ filePath: e }), Ie.some((c) => c.filePath === e) || Ie.push({ filePath: e });
    }
  });
}, mo = () => {
  const t = [];
  return Ie.length > 0 && ps.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${_}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], go = 40, Co = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    if (u.length > go) {
      const o = P(t.content, u), r = u.split(`
`).at(0)?.trim() || "";
      Nt.push({
        filePath: e,
        message: `line #${o} ${N}${r}${$}`
      });
    }
  });
}, Fo = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${_}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pe = [], Eo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, c = P(t.content, o);
    if (r > n * 2) {
      Pe.push({
        filePath: e,
        message: `line #${c} ${k}has a v-if with ${r} lines${$}`
      });
      return;
    }
    r > n && Pe.push({
      filePath: e,
      message: `line #${c} ${N}has a v-if with ${r} lines${$}`
    });
  });
}, $o = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ big v-if${m}`,
      description: `👉 ${_}Big v-if can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ze = [], bo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, c = P(t.content, o);
    if (r > n * 2) {
      ze.push({
        filePath: e,
        message: `line #${c} ${k}has a v-show with ${r} lines${$}`
      });
      return;
    }
    r > n && ze.push({
      filePath: e,
      message: `line #${c} ${N}has a v-show with ${r} lines${$}`
    });
  });
}, yo = () => {
  const t = [];
  return ze.length > 0 && ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ big v-show${m}`,
      description: `👉 ${_}Big v-show can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], ds = 4, wo = 2 * ds, xo = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const u = I(
    We(
      "if",
      'v-if="',
      j(Fe).groupedAs("condition").and("?").and(j(Fe)).and(":"),
      // ternary
      "="
    ).and(
      j(
        We(
          "&&",
          "||",
          q(`"'`)
        )
      )
    ),
    [z]
  ), o = I(
    We("&&", "||"),
    [z]
  ), r = (c, f) => {
    const p = c.match(u);
    p && p.forEach((d) => {
      const A = (d.match(o) || []).length + 1;
      if (A > ds) {
        const y = P(c, d);
        Lt.push({
          filePath: e,
          message: `line #${y} ${A > wo ? k : N}${f} has a complicated condition with ${A} blocks${$}`
        });
      }
    });
  };
  n && r(n.content, "script"), s && r(s.content, "template");
}, Ao = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ complicated conditions${m}`,
      description: `👉 ${_}Simplify complex conditions by breaking them down into smaller, more manageable parts.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], ms = 5, vo = 2 * ms, Bo = (t, e) => {
  if (!t)
    return;
  const n = I(J, "if", J, [z, re]), s = I(J, "else", J, [z, re]), u = I(J, "for", J, [z, re]), o = I(J, "while", J, [z, re]), r = I(J, "case", J, [z, re]), c = t.content.match(n), f = t.content.match(s), p = t.content.match(u), d = t.content.match(o), A = t.content.match(r), y = (c?.length || 0) + (f?.length || 0) + (p?.length || 0) + (d?.length || 0) + (A?.length || 0);
  y > ms && jt.push({ filePath: e, message: `Cyclomatic complexity is ${y > vo ? `${k}very high` : `${N}high`} (${y})${$}` });
}, So = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${_}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], Oo = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const r = o[1];
    if (s.test(r)) {
      const c = P(t.content.trim(), o[0]), f = r.trim(), p = f.length > 20 ? f.slice(0, 20) : f;
      Tt.push({
        filePath: e,
        message: `line #${c} side effect detected in computed property ${k}(${p})${$}`
      });
    }
  });
}, Ro = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ computed side effects${m}`,
      description: `👉 ${_}Avoid side effects in computed properties. Computed properties should only derive and return a value.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], Pn = 5, _o = 3, No = (t, e) => {
  if (!t)
    return;
  const n = I(fs.times.atLeast(Pn).at.lineStart().or(V.times.atLeast(_o * Pn).at.lineStart()), [z]), s = t.content.match(n);
  let u = 0;
  s?.forEach((o) => {
    const r = P(t.content, o, u);
    Wt.push({
      filePath: e,
      message: `line #${r} ${N}indentation: ${o.length}${$}`
    }), u = r;
  });
}, Lo = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ deep indentation${m}`,
      description: `👉 ${_}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], jo = (t, e) => {
  if (!t)
    return;
  const n = I(J, "else", J, [z, re]), s = t.content.match(n);
  s?.length && It.push({ filePath: e, message: `else clauses found ${k}(${s.length})${$}` });
}, To = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ else conditions${m}`,
      description: `👉 ${_}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ve = [], Mt = 20, Wo = 5, Io = 8;
function Mo({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const u = e.split(`
`).length, o = zo(t);
  if (u > 2 * Mt) {
    Ve.push({ filePath: s, message: `function ${k}(${o}#${n})${$} is too long: ${k}${u} lines${$}` });
    return;
  }
  u >= Mt && Ve.push({ filePath: s, message: `function ${N}(${o}#${n})${$} is too long: ${N}${u} lines${$}` });
}
function ko(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const u = s[1], o = n.lastIndex;
    let r = 1, c = o;
    for (; r > 0 && c < t.length; )
      t[c] === "{" ? r++ : t[c] === "}" && r--, c++;
    const f = t.slice(o, c - 1).trim();
    return {
      name: u,
      body: f,
      end: c
      // Returns the position after the matched function
    };
  } else
    return null;
}
function Po(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), u = n.exec(s);
  if (u) {
    const [, o] = u, r = e + u.index + u[0].length;
    let c = r, f = "";
    if (t[r] === "{") {
      let p = 1;
      for (c = r + 1; c < t.length && p > 0; )
        t[c] === "{" ? p++ : t[c] === "}" && p--, c++;
      f = t.slice(r + 1, c - 1).trim();
    } else {
      for (; c < t.length && t[c] !== ";"; )
        c++;
      f = t.slice(r, c).trim();
    }
    return {
      name: o,
      body: f,
      end: c
      // Position after the end of the function body
    };
  } else
    return null;
}
function zo(t) {
  return t.replace(/^const\s*/, "");
}
const Vo = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let u = 0;
  for (; u < s; ) {
    let o = "", r = "", c = !1;
    if (n.slice(u, u + Io) === "function") {
      const f = ko(n, u);
      f && (c = !0, o = f.name, r = f.body, u = f.end);
    }
    if (n.slice(u, u + Wo) === "const") {
      const f = Po(n, u);
      f && (c = !0, o = f.name, r = f.body, u = f.end);
    }
    if (c) {
      const f = P(n.trim(), o);
      Mo({ funcName: o, funcBody: r, lineNumber: f, filePath: e });
    } else
      u++;
  }
}, Ho = () => {
  const t = [];
  return Ve.length > 0 && Ve.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ function size${m}`,
      description: `👉 ${_}Functions must be shorter than ${Mt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], Go = (t, e) => {
  if (!t)
    return;
  const n = I("<", X("img").or("picture"), [z]), s = t.content.match(n);
  if (s?.length) {
    let u = 0;
    s.forEach((o) => {
      const r = P(t.content, o, u), c = o.slice(1);
      kt.push({
        filePath: e,
        message: `line #${r} ${N}${c} element found${$}`
      }), u = r;
    });
  }
}, Uo = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ html image elements${m}`,
      description: `👉 ${_}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], qo = (t, e) => {
  if (!t)
    return;
  const n = I("<a", J, [z, re]), s = t.content.match(n);
  s?.length && Pt.push({ filePath: e, message: `${s?.length} ${N}html link found${$}` });
}, Zo = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ html link${m}`,
      description: `👉 ${_}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], Ko = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((u, o) => {
    const r = u.trim();
    if (r.startsWith("if (") && !r.includes("{")) {
      const c = s[o + 1]?.trim();
      (!c || !c.startsWith("{") && !r.endsWith("{")) && zt.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: ${k}${r}${$}`
      });
    }
  });
}, Yo = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ if without curly braces${m}`,
      description: `👉 ${_}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Jo = (t, e) => {
  if (!t)
    return;
  const n = I(j(Rr).as("magicNumber"), We(")", hs), [z]);
  let s, u = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, r = Number.parseInt(o ?? "0");
    if (r > 1) {
      const c = P(t.content, String(r), u);
      Vt.push({
        filePath: e,
        message: `line #${c} ${N}magic number: ${r}${$}`
      }), u = c;
    }
  }
}, Qo = () => {
  const t = [];
  return Vt.length && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ magic numbers${m}`,
      description: `👉 ${_}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Ht = [], Xo = (t, e) => {
  if (!t)
    return;
  const n = I(j(Fe), V, "?", V, j(Fe), V, ":", V, j(Fe));
  t.content.match(n)?.forEach((u) => {
    if (u.split("?").length - 1 > 1) {
      const o = P(t.content, u);
      Ht.push({
        filePath: e,
        message: `line #${o} has ${N}nested ternary${$}`
      });
    }
  });
}, ei = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ nested Ternary${m}`,
      description: `👉 ${_}Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], ti = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((u) => {
    const o = P(t.content, u);
    Gt.push({
      filePath: e,
      message: `line #${o} ${N}props destructuring found: ${u}${$}`
    });
  });
}, ni = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${_}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], si = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((u) => {
    const o = P(t.content, u);
    Ut.push({
      filePath: e,
      message: `line #${o} ${N}Avoid using 'var' for variable declarations: ${u}${$}`
    });
  });
}, ui = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ No Var Declaration${m}`,
      description: `👉 ${_}Avoid var declaration, use const or let instead of that.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], gs = 3, zn = (t, e, n) => {
  const s = e.split(",").map((u) => u.trim()).filter((u) => u.length > 0);
  s.length > gs && qt.push({ filePath: n, message: `function ${N}${t}${$} has ${N}${s.length}${$} parameters` });
}, ri = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && zn(s[1], s[2], e), s[3] && zn(s[3], s[4], e);
}, oi = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ parameter count${m}`,
      description: `👉 ${_}Max number of function parameters should be ${gs}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], ii = (t, e) => {
  !t || t.setup || Zt.push({ filePath: e, message: `${N}Plain <script> block${$} found` });
}, ci = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${_} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], ai = (t, e) => {
  if (!t)
    return;
  const n = I(
    "defineProps(",
    V.times.any(),
    "[",
    V.times.any(),
    j(ve(`'"`), j(ee), ve(`'"`), V.times.any(), oe(",", V.times.any())),
    "]",
    V.times.any(),
    ")",
    [z]
  ), s = I(
    "<",
    j(ee).grouped(),
    V,
    q(">").times.any(),
    ":",
    j(ee).grouped(),
    V.times.any(),
    "=",
    V.times.any(),
    '"props.',
    j(ee).grouped(),
    '"',
    [z]
  );
  let u;
  const o = /* @__PURE__ */ new Set();
  for (; (u = n.exec(t.content)) !== null; )
    u[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((f) => o.add(f));
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const c = r[1], f = r[2], p = r[3];
    o.has(p) && f === p && Kt.push({
      filePath: e,
      message: `Prop ${N}(${p})${$} is being drilled through ${N}${c}${$} component unmodified.`
    });
  }
}, li = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ props drilling${m}`,
      description: `👉 ${_}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Yt = [], Jt = 100, Di = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > Jt && Yt.push({ filePath: e, message: `${n.length > Jt * 2 ? k : N}(${n.length} lines)${$}` });
}, fi = () => {
  const t = [];
  return Yt.length > 0 && Yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${_}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Jt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Qt = [], Cs = 4, hi = ["i", "key"], pi = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1];
    u.length < Cs && !hi.includes(u) && Qt.push({ filePath: e, message: `variable: ${N}(${u})${$}` });
  }
}, di = () => {
  const t = [];
  return Qt.length > 0 && Qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ short variable names${m}`,
      description: `👉 ${_}Variable names must have a minimum length of ${Cs}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Xt = [], mi = 5, gi = (t, e) => {
  if (!t)
    return;
  const n = I("defineProps", oe("<"), oe("("), "{", j(Fe), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const u = s[0].split(",").length;
    u > mi && Xt.push({ filePath: e, message: `props found ${k}(${u})${$}` });
  }
}, Ci = () => {
  const t = [];
  return Xt.length > 0 && Xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ too many props${m}`,
      description: `👉 ${_}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, en = [], Fi = (t, e) => {
  if (!t)
    return;
  const n = I('v-for="(', V.times.any(), j(ee).grouped(), V.times.any(), ",", V.times.any(), j(ee).grouped(), V.times.any(), ")", j(V), "in", j(V), j(ee).grouped(), [z]), s = I(':key="', V.times.any(), j(ee).grouped(), V.times.any(), '"', [z]), u = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  u.forEach((r) => {
    const [c, f, p, d] = r;
    o.forEach((A) => {
      const y = A[1];
      if (y === p) {
        const E = P(t.content.trim(), y);
        en.push({
          filePath: e,
          message: `line #${E} ${N}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Ei = () => {
  const t = [];
  return en.length > 0 && en.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${_}Avoid using index as key in v-for loops.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, tn = [], $i = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[0], o = s[1], r = P(t.content.trim(), u);
    tn.push({
      filePath: e,
      message: `line #${r} zero length comparison found ${N}(${o})${$}`
    });
  }
}, bi = () => {
  const t = [];
  return tn.length > 0 && tn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${_}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, nn = [], yi = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let u = 0;
  s?.forEach((o) => {
    const r = P(t.content.trim(), o[0], u);
    nn.push({
      filePath: e,
      message: `line #${r} ${N}Found inline style: ${o[0]}${$}`
    }), u = r;
  });
}, wi = () => {
  const t = [];
  return nn.length > 0 && nn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ no Inline Styles${m}`,
      description: `👉 ${_}Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xi = (t, e, n) => {
  const s = {}, u = [], o = ({ file: p, rule: d, title: A, description: y, message: E }) => {
    const F = t === "rule" ? d : p;
    s[F] || (s[F] = []), s[F].push({ file: p, rule: d, title: A, description: y, message: E });
  }, r = (p) => {
    p().forEach((A) => {
      o(A);
    });
  };
  r(Mr), r(Wr), r(Pr), r(Vr), r(jr), r(Kr), r(Jr), r(eo), r(so), r(ro), r(co), r(lo), r(fo), r(mo), r(Fo), r(qr), r(Gr), r(Nr), r(Ar), r($o), r(yo), r(Ao), r(So), r(Ro), r(Lo), r(To), r(Ho), r(Uo), r(Zo), r(Yo), r(Qo), r(ei), r(ni), r(ui), r(oi), r(ci), r(li), r(fi), r(di), r(Ci), r(Ei), r(bi), r(wi);
  const c = Object.keys(s).sort((p, d) => {
    const A = s[p].length, y = s[d].length;
    return e === "desc" ? y - A : A - y;
  }), f = {};
  return c.forEach((p) => {
    f[p] = [], s[p].forEach((d, A) => {
      const y = d.message.includes(k);
      if (u.some((E) => E.file === d.file)) {
        const E = u.find((F) => F.file === d.file);
        E && (y ? E.errors++ : E.warnings++);
      } else
        u.push({ file: d.file, errors: y ? 1 : 0, warnings: y ? 0 : 1 });
      n === "error" && !y || (f[p][A] = { id: "", description: "", message: "" }, t === "file" && (f[p][A].id = d.rule), t !== "file" && (f[p][A].id = d.file), f[p][A].description = d.description, f[p][A].message = d.message || "🚨");
    });
  }), { output: f, health: u };
}, fe = {
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
    "bigVif",
    "bigVshow",
    "complicatedConditions",
    "cyclomaticComplexity",
    "computedSideEffects",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlImageElements",
    "htmlLink",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "nestedTernary",
    "noInlineStyles",
    "noPropDestructure",
    "noVarDeclaration",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ]
}, Dn = Object.keys(fe);
let Fs = !1;
const Ai = (t) => {
  Fs = t;
}, vi = () => Fs, Bi = (t, e, n) => {
  const s = t.scriptSetup || t.script, u = e.endsWith(".vue"), o = {
    // vue-essential
    simpleProp: () => Tr(s, e),
    singleNameComponent: () => u && Ir(e),
    globalStyle: () => u && Lr(t.styles, e),
    vforNoKey: () => u && kr(t.template, e),
    vifWithVfor: () => u && zr(t.template, e),
    // vue-strong
    simpleComputed: () => po(s, e),
    componentFiles: () => u && Yr(s, e),
    propNameCasing: () => u && io(s, e),
    componentFilenameCasing: () => u && Zr(e),
    selfClosingComponents: () => u && Do(t, e),
    templateSimpleExpression: () => u && Co(t.template, e),
    quotedAttributeValues: () => u && ao(t, e),
    directiveShorthands: () => u && Xr(t, e),
    fullWordComponentName: () => u && no(e),
    multiAttributeElements: () => u && uo(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => u && Ur(t.source, e),
    elementAttributeOrder: () => u && Hr(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => u && _r(s, e),
    elementSelectorsWithScoped: () => u && xr(t.styles, e),
    // rrd
    bigVif: () => Eo(t.template, e),
    bigVShow: () => bo(t.template, e),
    complicatedConditions: () => xo(t, e),
    cyclomaticComplexity: () => Bo(s, e),
    computedSideEffects: () => Oo(s, e),
    deepIndentation: () => No(s, e),
    elseCondition: () => jo(s, e),
    functionSize: () => Vo(s, e),
    htmlImageElements: () => vi() && Go(t.template, e),
    htmlLink: () => u && qo(t.template, e),
    ifWithoutCurlyBraces: () => Ko(s, e),
    magicNumbers: () => Jo(s, e),
    nestedTernary: () => Xo(s, e),
    noPropDestructure: () => ti(s, e),
    noVarDeclaration: () => si(s, e),
    parameterCount: () => ri(s, e),
    plainScript: () => u && ii(t.script, e),
    propsDrilling: () => ai(s, e),
    scriptLength: () => Di(s, e),
    shortVariableName: () => pi(s, e),
    tooManyProps: () => gi(s, e),
    vForWithIndexKey: () => u && Fi(t.template, e),
    zeroLengthComparison: () => $i(s, e),
    noInlineStyles: () => yi(t.template, e)
  };
  n.forEach((r) => {
    r in fe ? fe[r].forEach((c) => {
      c in o && o[c]();
    }) : r in o && o[r]();
  });
}, Si = 1.5, Vn = 75, Hn = 85, Gn = 95, Es = [...Dn, ...Object.values(fe).flat()], Oi = (t, e, n) => {
  const { errors: s, warnings: u } = t.reduce((y, { errors: E, warnings: F }) => ({ errors: y.errors + E, warnings: y.warnings + F }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found ${k}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${N}${Intl.NumberFormat("en-US").format(u)} warnings${$}, ${Q}${Intl.NumberFormat("en-US").format(e)} lines${$} of code in ${Q}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const r = Math.ceil((1 - (s * Si + u) / e) * 100), c = 60, f = u ? Math.max(1, Math.ceil(u / e * c)) : 0, p = s ? Math.max(1, c - Math.ceil(r * c / 100) - f) : 0, d = c - p - f, A = `${mt}${" ".repeat(d)}${N}${" ".repeat(f)}${k}${" ".repeat(p)}${$}`;
  return o.push({ info: `Code Health: [${A}] ${r}%
` }), r < Vn && o.push({ info: `${k}Code health is LOW: ${r}%${$}
` }), r >= Vn && r < Hn && o.push({ info: `${N}Code health is MEDIUM ${r}%${$}
` }), r >= Hn && r < Gn && o.push({ info: `${Q}Code health is OK: ${r}%${$}
` }), r >= Gn && o.push({ info: `${mt}Code health is GOOD: ${r}%${$}
` }), { errors: s, warnings: u, output: o };
};
function Ri(t) {
  const e = [], n = [];
  return Object.entries(fe).forEach(([s, u]) => {
    if (u.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = u.filter((r) => t.includes(r));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
const fn = async (t) => {
  let e = t;
  for (; e !== Z.parse(e).root; ) {
    const n = Z.join(e, "package.json");
    try {
      return await pe.access(n), e;
    } catch {
      e = Z.dirname(e);
    }
  }
  throw new Error("Project root not found");
}, $s = async (t) => {
  let e = "";
  if (!t) {
    const s = nu(import.meta.url), u = Z.dirname(s), o = Z.resolve(u, "..");
    e = Z.join(o, "package.json");
  }
  return t && (e = Z.join(t, "package.json")), JSON.parse(await pe.readFile(e, "utf-8"));
}, hn = await fn(process.cwd()) || "", bs = async (t, e) => {
  const n = Z.join(hn, "package.json");
  return rn.existsSync(n) ? !!(await $s(e)).dependencies[t] : !1;
}, ys = async (t) => {
  const e = ["nuxt.config.js", "nuxt.config.ts"];
  return await bs("nuxt", t) || e.some((n) => rn.existsSync(Z.join(hn, n)));
}, _i = async (t) => {
  const e = ["vue.config.js", "vue.config.ts"];
  return !await ys(t) && (await bs("vue", t) || e.some((s) => rn.existsSync(Z.join(hn, s))));
};
let sn = 0, ws = 0, xs = [];
const Ni = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], pn = [], he = [], Un = async (t, e) => {
  if (!pn.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    sn++;
    const n = await pe.readFile(e, "utf-8");
    ws += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = tu(n);
    (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), he.push({ info: `Analyzing ${e}...` }), Bi(s, e, xs);
  }
}, As = async (t) => {
  if (!(await pe.stat(t)).isDirectory()) {
    await Un(t, t);
    return;
  }
  const n = await pe.readdir(t);
  for (const s of n) {
    const u = Z.join(t, s);
    (await pe.stat(u)).isDirectory() && !Ni.some((r) => u.includes(r)) && !pn.some((r) => u.endsWith(r)) && await As(u), await Un(u, u);
  }
}, Li = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: u, level: o, sortBy: r }) => {
  const c = e.filter((te) => !n.includes(te)), { rulesets: f, individualRules: p } = Ri(c), d = f.length ? `${Q}${f.join(", ")}${$}` : "N/A", A = p.length ? `${Q}${p.join(", ")}${$}` : "N/A";
  let y = `      Applying ${f.length} rulesets: ${d}`;
  p.length > 0 && (y += `
      Applying ${p.length} individual rules: ${A}`);
  const E = n.filter((te) => !f.includes(te)), F = E.length ? `${Q}${E.join(", ")}${$}` : "N/A", C = await fn(t), a = await _i(C), w = await ys(C);
  Ai(w), he.push({ info: `${Q}Analyzing Vue, TS and JS files in ${t}${$}` }), he.push({ info: `      Project type: ${Q}${w ? "Nuxt" : ""}${a ? "Vue" : ""}${!w && !a ? "?" : ""}${$}` }), he.push({
    info: `${y}
      Ignoring ${E.length} rules/rulesets: ${F}
      Excluding ${s || "-"}
      Output level ${Q}${o}${$}
      Grouping by ${Q}${u}${$}
      Sorting ${Q}${r}${$}`
  }), xs = e.filter((te) => !n.includes(te)), s && pn.push(...s.split(",")), await As(t), he.push({ info: `Found ${Q}${sn}${$} files` });
  const { health: B, output: L } = xi(u, r, o), { errors: W, warnings: T, output: de } = Oi(B, ws, sn);
  return !W && !T && he.push({ info: `
${mt}No code smells detected!${$}` }), { output: he, codeHealthOutput: de, reportOutput: L };
}, vs = ["rule", "file"], Bs = ["asc", "desc"], Ss = ["text", "json", "table"], Os = ["all", "error"], ji = {
  groupBy: vs,
  sortBy: Bs,
  outputLevel: Os,
  outputFormat: Ss
}, Ne = (t, e) => {
  const n = ji[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${k}${t}${$} provided for flag ${S}${e}${m}. Valid options are: ${Q}${n.join(", ")}${$}.
`
  ), process.exit(1)), t;
}, qn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(fe) : void 0;
  const n = e.split(","), s = [], u = [];
  return n.forEach((o) => {
    Dn.includes(o) ? s.push(...fe[o]) : Object.values(fe).some((r) => r.includes(o)) ? s.push(o) : u.push(o);
  }), u.length > 0 && (console.error(
    `
${k}Invalid ${t} values: ${u.join(
      ", "
    )}${$}. 
${_}Allowed values are: ${Es.join(", ")}${m}

`
  ), process.exit(1)), s;
}, Ti = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4], Wi = await fn(Ti || "./src"), Ii = await $s(), He = [];
let ue = {
  path: "./src",
  apply: Object.values(Dn).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  sort: "desc",
  output: "text"
};
try {
  const t = Z.join(Wi, "vue-mess-detector.json"), e = JSON.parse(await pe.readFile(t, "utf-8"));
  ue = { ...ue, ...e }, He.push({ info: `👉 Using configuration from ${t}` });
} catch {
  He.push({ info: "👉 Using default configuration" });
}
zs(ru(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (t) => t.config(ue).positional("path", {
    describe: "path to the Vue files",
    default: ue.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: Es,
    coerce: qn("apply"),
    group: "Filter Rulesets/Rules:",
    default: ue.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: ue.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: vs,
    coerce: (e) => Ne(e, "groupBy"),
    default: ue.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: Os,
    coerce: (e) => Ne(e, "outputLevel"),
    default: ue.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: qn("ignore"),
    default: ue.ignore,
    group: "Filter Rulesets:"
  }).option("sort", {
    alias: "s",
    describe: "Sort results at the output",
    choices: Bs,
    coerce: (e) => Ne(e, "sortBy"),
    default: ue.sort,
    group: "Sort Results:"
  }).option("output", {
    describe: "Output format",
    choices: Ss,
    coerce: (e) => Ne(e, "outputFormat"),
    default: ue.output,
    group: "Output Format:"
  }),
  (t) => {
    Li({
      dir: t.path,
      apply: t.apply,
      ignore: t.ignore,
      exclude: t.exclude,
      groupBy: t.group,
      level: t.level,
      sortBy: t.sort
    }).then((e) => {
      if (t.output == "text") {
        [...He, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput)
          console.log(`
- ${S} ${n}${m}`), e.reportOutput[n].forEach((s) => {
            console.log(`   ${s.id}`), console.log(`   ${s.description}`), console.log(`   ${s.message}
`);
          });
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      if (t.output == "table") {
        [...He, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput) {
          const s = new yr({
            head: ["id", "message"],
            colWidths: [60, 60],
            wordWrap: !0,
            wrapOnWordBoundary: !1
          });
          console.log("-".repeat(120)), t.group == "rule" && (console.log(`${S}Rule: ${n}${m}`), console.log(`Description: ${e.reportOutput[n][0].description}`), e.reportOutput[n].forEach((u) => {
            s.push([u.id, u.message]);
          })), t.group == "file" && (console.log(`${S}File: ${n}${m}`), e.reportOutput[n].forEach((u) => {
            s.push([`${u.id}
${u.description.replace("See: ", `See:
`)}`, u.message]);
          })), console.log(s.toString());
        }
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      t.output == "json" && console.log(JSON.stringify(e, null, 2));
    }).catch((e) => {
      console.error(`${k}${e}${$}`);
    });
  }
).version("version", "Show version number", Ii.version).alias("version", "v").help().argv;
