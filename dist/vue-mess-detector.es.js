import fe from "node:fs/promises";
import le from "node:path";
import vs from "yargs";
import Bs, { format as kn, inspect as Ss } from "util";
import { normalize as Os, resolve as ge, dirname as Dt, basename as Rs, extname as _s, relative as Ns } from "path";
import { readFileSync as Xt, statSync as Pn, readdirSync as js, writeFile as Ls } from "fs";
import { notStrictEqual as Ws, strictEqual as Ts } from "assert";
import { fileURLToPath as Ms } from "url";
import { parse as Is } from "@vue/compiler-sfc";
class ye extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ye);
  }
}
function zn() {
  return ks() ? 0 : 1;
}
function ks() {
  return Ps() && !process.defaultApp;
}
function Ps() {
  return !!process.versions.electron;
}
function zs(t) {
  return t.slice(zn() + 1);
}
function Vs() {
  return process.argv[zn()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function be(t) {
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
function Vn(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let u = 0; u < t.length; u++) {
    const o = n.charAt(u), r = t.charAt(u);
    o !== r && u > 0 ? s += `${e}${n.charAt(u)}` : s += r;
  }
  return s;
}
function Gn(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Gs(t) {
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
var te;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(te || (te = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ie;
class Hs {
  constructor(e) {
    ie = e;
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
    }, n), u = Gs(e), o = typeof e == "string", r = qs(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), a = Object.assign({
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
    }, s.configuration), h = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, v = a["populate--"], A = v ? "--" : "_", E = /* @__PURE__ */ Object.create(null), C = /* @__PURE__ */ Object.create(null), g = s.__ || ie.format, c = {
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
    }, y = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, B = new RegExp("^--" + a["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const D = typeof i == "object" ? i.key : i, m = Object.keys(i).map(function(f) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[f];
      }).filter(Boolean).pop();
      m && (c[m][D] = !0), c.arrays[D] = !0, c.keys.push(D);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(i) {
      c.bools[i] = !0, c.keys.push(i);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(i) {
      c.strings[i] = !0, c.keys.push(i);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(i) {
      c.numbers[i] = !0, c.keys.push(i);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(i) {
      c.counts[i] = !0, c.keys.push(i);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(i) {
      c.normalize[i] = !0, c.keys.push(i);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([i, D]) => {
      typeof D == "number" && (c.nargs[i] = D, c.keys.push(i));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([i, D]) => {
      typeof D == "function" && (c.coercions[i] = D, c.keys.push(i));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(i) {
      c.configs[i] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([i, D]) => {
      (typeof D == "boolean" || typeof D == "function") && (c.configs[i] = D);
    })), Es(s.key, r, s.default, c.arrays), Object.keys(h).forEach(function(i) {
      (c.aliases[i] || []).forEach(function(D) {
        h[D] = h[i];
      });
    });
    let j = null;
    xs();
    let L = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), Be = {};
    for (let i = 0; i < u.length; i++) {
      const D = u[i], m = D.replace(/^-{3,}/, "---");
      let f, l, w, b, x, V;
      if (D !== "--" && /^-/.test(D) && Re(D))
        Fe(D);
      else if (m.match(/^---+(=|$)/)) {
        Fe(D);
        continue;
      } else if (D.match(/^--.+=/) || !a["short-option-groups"] && D.match(/^-.+=/))
        b = D.match(/^--?([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && (O(b[1], c.arrays) ? i = Se(i, b[1], u, b[2]) : O(b[1], c.nargs) !== !1 ? i = he(i, b[1], u, b[2]) : I(b[1], b[2], !0));
      else if (D.match(B) && a["boolean-negation"])
        b = D.match(B), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], I(l, O(l, c.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !a["short-option-groups"] && D.match(/^-[^-]+/))
        b = D.match(/^--?(.+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], O(l, c.arrays) ? i = Se(i, l, u) : O(l, c.nargs) !== !1 ? i = he(i, l, u) : (x = u[i + 1], x !== void 0 && (!x.match(/^-/) || x.match(y)) && !O(l, c.bools) && !O(l, c.counts) || /^(true|false)$/.test(x) ? (I(l, x), i++) : I(l, pe(l))));
      else if (D.match(/^-.\..+=/))
        b = D.match(/^-([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && I(b[1], b[2]);
      else if (D.match(/^-.\..+/) && !D.match(y))
        x = u[i + 1], b = D.match(/^-(.\..+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], x !== void 0 && !x.match(/^-/) && !O(l, c.bools) && !O(l, c.counts) ? (I(l, x), i++) : I(l, pe(l)));
      else if (D.match(/^-[^-]+/) && !D.match(y)) {
        w = D.slice(1, -1).split(""), f = !1;
        for (let q = 0; q < w.length; q++) {
          if (x = D.slice(q + 2), w[q + 1] && w[q + 1] === "=") {
            V = D.slice(q + 3), l = w[q], O(l, c.arrays) ? i = Se(i, l, u, V) : O(l, c.nargs) !== !1 ? i = he(i, l, u, V) : I(l, V), f = !0;
            break;
          }
          if (x === "-") {
            I(w[q], x);
            continue;
          }
          if (/[A-Za-z]/.test(w[q]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(x) && O(x, c.bools) === !1) {
            I(w[q], x), f = !0;
            break;
          }
          if (w[q + 1] && w[q + 1].match(/\W/)) {
            I(w[q], x), f = !0;
            break;
          } else
            I(w[q], pe(w[q]));
        }
        l = D.slice(-1)[0], !f && l !== "-" && (O(l, c.arrays) ? i = Se(i, l, u) : O(l, c.nargs) !== !1 ? i = he(i, l, u) : (x = u[i + 1], x !== void 0 && (!/^(-|--)[^-]/.test(x) || x.match(y)) && !O(l, c.bools) && !O(l, c.counts) || /^(true|false)$/.test(x) ? (I(l, x), i++) : I(l, pe(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(y) && O(D.slice(1), c.bools))
        l = D.slice(1), I(l, pe(l));
      else if (D === "--") {
        L = u.slice(i + 1);
        break;
      } else if (a["halt-at-non-option"]) {
        L = u.slice(i);
        break;
      } else
        Fe(D);
    }
    cn(T, !0), cn(T, !1), ms(T), gs(), an(T, c.aliases, h, !0), Fs(T), a["set-placeholder-key"] && Cs(T), Object.keys(c.counts).forEach(function(i) {
      Ce(T, i.split(".")) || I(i, 0);
    }), v && L.length && (T[A] = []), L.forEach(function(i) {
      T[A].push(i);
    }), a["camel-case-expansion"] && a["strip-dashed"] && Object.keys(T).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete T[i];
    }), a["strip-aliased"] && [].concat(...Object.keys(r).map((i) => r[i])).forEach((i) => {
      a["camel-case-expansion"] && i.includes("-") && delete T[i.split(".").map((D) => be(D)).join(".")], delete T[i];
    });
    function Fe(i) {
      const D = Oe("_", i);
      (typeof D == "string" || typeof D == "number") && T._.push(D);
    }
    function he(i, D, m, f) {
      let l, w = O(D, c.nargs);
      if (w = typeof w != "number" || isNaN(w) ? 1 : w, w === 0)
        return oe(f) || (j = Error(g("Argument unexpected for: %s", D))), I(D, pe(D)), i;
      let b = oe(f) ? 0 : 1;
      if (a["nargs-eats-options"])
        m.length - (i + 1) + b < w && (j = Error(g("Not enough arguments following: %s", D))), b = w;
      else {
        for (l = i + 1; l < m.length && (!m[l].match(/^-[^0-9]/) || m[l].match(y) || Re(m[l])); l++)
          b++;
        b < w && (j = Error(g("Not enough arguments following: %s", D)));
      }
      let x = Math.min(b, w);
      for (!oe(f) && x > 0 && (I(D, f), x--), l = i + 1; l < x + i + 1; l++)
        I(D, m[l]);
      return i + x;
    }
    function Se(i, D, m, f) {
      let l = [], w = f || m[i + 1];
      const b = O(D, c.nargs);
      if (O(D, c.bools) && !/^(true|false)$/.test(w))
        l.push(!0);
      else if (oe(w) || oe(f) && /^-/.test(w) && !y.test(w) && !Re(w)) {
        if (h[D] !== void 0) {
          const x = h[D];
          l = Array.isArray(x) ? x : [x];
        }
      } else {
        oe(f) || l.push(He(D, f, !0));
        for (let x = i + 1; x < m.length && !(!a["greedy-arrays"] && l.length > 0 || b && typeof b == "number" && l.length >= b || (w = m[x], /^-/.test(w) && !y.test(w) && !Re(w))); x++)
          i = x, l.push(He(D, w, o));
      }
      return typeof b == "number" && (b && l.length < b || isNaN(b) && l.length === 0) && (j = Error(g("Not enough arguments following: %s", D))), I(D, l), i;
    }
    function I(i, D, m = o) {
      if (/-/.test(i) && a["camel-case-expansion"]) {
        const w = i.split(".").map(function(b) {
          return be(b);
        }).join(".");
        on(i, w);
      }
      const f = He(i, D, m), l = i.split(".");
      Ee(T, l, f), c.aliases[i] && c.aliases[i].forEach(function(w) {
        const b = w.split(".");
        Ee(T, b, f);
      }), l.length > 1 && a["dot-notation"] && (c.aliases[l[0]] || []).forEach(function(w) {
        let b = w.split(".");
        const x = [].concat(l);
        x.shift(), b = b.concat(x), (c.aliases[i] || []).includes(b.join(".")) || Ee(T, b, f);
      }), O(i, c.normalize) && !O(i, c.arrays) && [i].concat(c.aliases[i] || []).forEach(function(b) {
        Object.defineProperty(Be, b, {
          enumerable: !0,
          get() {
            return D;
          },
          set(x) {
            D = typeof x == "string" ? ie.normalize(x) : x;
          }
        });
      });
    }
    function on(i, D) {
      c.aliases[i] && c.aliases[i].length || (c.aliases[i] = [D], E[D] = !0), c.aliases[D] && c.aliases[D].length || on(D, i);
    }
    function He(i, D, m) {
      m && (D = Us(D)), (O(i, c.bools) || O(i, c.counts)) && typeof D == "string" && (D = D === "true");
      let f = Array.isArray(D) ? D.map(function(l) {
        return Oe(i, l);
      }) : Oe(i, D);
      return O(i, c.counts) && (oe(f) || typeof f == "boolean") && (f = Ue()), O(i, c.normalize) && O(i, c.arrays) && (Array.isArray(D) ? f = D.map((l) => ie.normalize(l)) : f = ie.normalize(D)), f;
    }
    function Oe(i, D) {
      return !a["parse-positional-numbers"] && i === "_" || !O(i, c.strings) && !O(i, c.bools) && !Array.isArray(D) && (Gn(D) && a["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !oe(D) && O(i, c.numbers)) && (D = Number(D)), D;
    }
    function ms(i) {
      const D = /* @__PURE__ */ Object.create(null);
      an(D, c.aliases, h), Object.keys(c.configs).forEach(function(m) {
        const f = i[m] || D[m];
        if (f)
          try {
            let l = null;
            const w = ie.resolve(ie.cwd(), f), b = c.configs[m];
            if (typeof b == "function") {
              try {
                l = b(w);
              } catch (x) {
                l = x;
              }
              if (l instanceof Error) {
                j = l;
                return;
              }
            } else
              l = ie.require(w);
            qe(l);
          } catch (l) {
            l.name === "PermissionDenied" ? j = l : i[m] && (j = Error(g("Invalid JSON config file: %s", f)));
          }
      });
    }
    function qe(i, D) {
      Object.keys(i).forEach(function(m) {
        const f = i[m], l = D ? D + "." + m : m;
        typeof f == "object" && f !== null && !Array.isArray(f) && a["dot-notation"] ? qe(f, l) : (!Ce(T, l.split(".")) || O(l, c.arrays) && a["combine-arrays"]) && I(l, f);
      });
    }
    function gs() {
      typeof p < "u" && p.forEach(function(i) {
        qe(i);
      });
    }
    function cn(i, D) {
      if (typeof d > "u")
        return;
      const m = typeof d == "string" ? d : "", f = ie.env();
      Object.keys(f).forEach(function(l) {
        if (m === "" || l.lastIndexOf(m, 0) === 0) {
          const w = l.split("__").map(function(b, x) {
            return x === 0 && (b = b.substring(m.length)), be(b);
          });
          (D && c.configs[w.join(".")] || !D) && !Ce(i, w) && I(w.join("."), f[l]);
        }
      });
    }
    function Fs(i) {
      let D;
      const m = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(f) {
        if (!m.has(f) && (D = O(f, c.coercions), typeof D == "function"))
          try {
            const l = Oe(f, D(i[f]));
            [].concat(c.aliases[f] || [], f).forEach((w) => {
              m.add(w), i[w] = l;
            });
          } catch (l) {
            j = l;
          }
      });
    }
    function Cs(i) {
      return c.keys.forEach((D) => {
        ~D.indexOf(".") || typeof i[D] > "u" && (i[D] = void 0);
      }), i;
    }
    function an(i, D, m, f = !1) {
      Object.keys(m).forEach(function(l) {
        Ce(i, l.split(".")) || (Ee(i, l.split("."), m[l]), f && (C[l] = !0), (D[l] || []).forEach(function(w) {
          Ce(i, w.split(".")) || Ee(i, w.split("."), m[l]);
        }));
      });
    }
    function Ce(i, D) {
      let m = i;
      a["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        m = m[l] || {};
      });
      const f = D[D.length - 1];
      return typeof m != "object" ? !1 : f in m;
    }
    function Ee(i, D, m) {
      let f = i;
      a["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(V) {
        V = Dn(V), typeof f == "object" && f[V] === void 0 && (f[V] = {}), typeof f[V] != "object" || Array.isArray(f[V]) ? (Array.isArray(f[V]) ? f[V].push({}) : f[V] = [f[V], {}], f = f[V][f[V].length - 1]) : f = f[V];
      });
      const l = Dn(D[D.length - 1]), w = O(D.join("."), c.arrays), b = Array.isArray(m);
      let x = a["duplicate-arguments-array"];
      !x && O(l, c.nargs) && (x = !0, (!oe(f[l]) && c.nargs[l] === 1 || Array.isArray(f[l]) && f[l].length === c.nargs[l]) && (f[l] = void 0)), m === Ue() ? f[l] = Ue(f[l]) : Array.isArray(f[l]) ? x && w && b ? f[l] = a["flatten-duplicate-arrays"] ? f[l].concat(m) : (Array.isArray(f[l][0]) ? f[l] : [f[l]]).concat([m]) : !x && !!w == !!b ? f[l] = m : f[l] = f[l].concat([m]) : f[l] === void 0 && w ? f[l] = b ? m : [m] : x && !(f[l] === void 0 || O(l, c.counts) || O(l, c.bools)) ? f[l] = [f[l], m] : f[l] = m;
    }
    function Es(...i) {
      i.forEach(function(D) {
        Object.keys(D || {}).forEach(function(m) {
          c.aliases[m] || (c.aliases[m] = [].concat(r[m] || []), c.aliases[m].concat(m).forEach(function(f) {
            if (/-/.test(f) && a["camel-case-expansion"]) {
              const l = be(f);
              l !== m && c.aliases[m].indexOf(l) === -1 && (c.aliases[m].push(l), E[l] = !0);
            }
          }), c.aliases[m].concat(m).forEach(function(f) {
            if (f.length > 1 && /[A-Z]/.test(f) && a["camel-case-expansion"]) {
              const l = Vn(f, "-");
              l !== m && c.aliases[m].indexOf(l) === -1 && (c.aliases[m].push(l), E[l] = !0);
            }
          }), c.aliases[m].forEach(function(f) {
            c.aliases[f] = [m].concat(c.aliases[m].filter(function(l) {
              return f !== l;
            }));
          }));
        });
      });
    }
    function O(i, D) {
      const m = [].concat(c.aliases[i] || [], i), f = Object.keys(D), l = m.find((w) => f.includes(w));
      return l ? D[l] : !1;
    }
    function ln(i) {
      const D = Object.keys(c);
      return [].concat(D.map((f) => c[f])).some(function(f) {
        return Array.isArray(f) ? f.includes(i) : f[i];
      });
    }
    function bs(i, ...D) {
      return [].concat(...D).some(function(f) {
        const l = i.match(f);
        return l && ln(l[1]);
      });
    }
    function $s(i) {
      if (i.match(y) || !i.match(/^-[^-]+/))
        return !1;
      let D = !0, m;
      const f = i.slice(1).split("");
      for (let l = 0; l < f.length; l++) {
        if (m = i.slice(l + 2), !ln(f[l])) {
          D = !1;
          break;
        }
        if (f[l + 1] && f[l + 1] === "=" || m === "-" || /[A-Za-z]/.test(f[l]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(m) || f[l + 1] && f[l + 1].match(/\W/))
          break;
      }
      return D;
    }
    function Re(i) {
      return a["unknown-options-as-args"] && ys(i);
    }
    function ys(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(y) || $s(i) ? !1 : !bs(i, /^-+([^=]+?)=[\s\S]*$/, B, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function pe(i) {
      return !O(i, c.bools) && !O(i, c.counts) && `${i}` in h ? h[i] : ws(As(i));
    }
    function ws(i) {
      return {
        [te.BOOLEAN]: !0,
        [te.STRING]: "",
        [te.NUMBER]: void 0,
        [te.ARRAY]: []
      }[i];
    }
    function As(i) {
      let D = te.BOOLEAN;
      return O(i, c.strings) ? D = te.STRING : O(i, c.numbers) ? D = te.NUMBER : O(i, c.bools) ? D = te.BOOLEAN : O(i, c.arrays) && (D = te.ARRAY), D;
    }
    function oe(i) {
      return i === void 0;
    }
    function xs() {
      Object.keys(c.counts).find((i) => O(i, c.arrays) ? (j = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : O(i, c.nargs) ? (j = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, c.aliases),
      argv: Object.assign(Be, T),
      configuration: a,
      defaulted: Object.assign({}, C),
      error: j,
      newAliases: Object.assign({}, E)
    };
  }
}
function qs(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(u) {
    e.push([].concat(t[u], u));
  }); s; ) {
    s = !1;
    for (let u = 0; u < e.length; u++)
      for (let o = u + 1; o < e.length; o++)
        if (e[u].filter(function(a) {
          return e[o].indexOf(a) !== -1;
        }).length) {
          e[u] = e[u].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(u) {
    u = u.filter(function(r, a, h) {
      return h.indexOf(r) === a;
    });
    const o = u.pop();
    o !== void 0 && typeof o == "string" && (n[o] = u);
  }), n;
}
function Ue(t) {
  return t !== void 0 ? t + 1 : 1;
}
function Dn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function Us(t) {
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
var Ze, Ke, Ye;
const fn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, hn = (Ke = (Ze = process == null ? void 0 : process.versions) === null || Ze === void 0 ? void 0 : Ze.node) !== null && Ke !== void 0 ? Ke : (Ye = process == null ? void 0 : process.version) === null || Ye === void 0 ? void 0 : Ye.slice(1);
if (hn && Number(hn.match(/^([^.]+)/)[1]) < fn)
  throw Error(`yargs parser supports a minimum Node.js version of ${fn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Zs = process ? process.env : {}, Hn = new Hs({
  cwd: process.cwd,
  env: () => Zs,
  format: kn,
  normalize: Os,
  resolve: ge,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(Xt(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), xe = function(e, n) {
  return Hn.parse(e.slice(), n).argv;
};
xe.detailed = function(t, e) {
  return Hn.parse(t.slice(), e);
};
xe.camelCase = be;
xe.decamelize = Vn;
xe.looksLikeNumber = Gn;
const Ks = {
  right: tu,
  center: nu
}, Ys = 0, Ne = 1, Qs = 2, je = 3;
class Xs {
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
      u.length > 1 && Z.stringWidth(u[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), Z.stringWidth(u[0])));
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
    const n = Z.stripAnsi(e);
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
      s.forEach((r, a) => {
        const { width: h } = e[a], p = this.negatePadding(e[a]);
        let d = r;
        if (p > Z.stringWidth(r) && (d += " ".repeat(p - Z.stringWidth(r))), e[a].align && e[a].align !== "left" && this.wrap) {
          const A = Ks[e[a].align];
          d = A(d, p), Z.stringWidth(d) < p && (d += " ".repeat((h || 0) - Z.stringWidth(d) - 1));
        }
        const v = e[a].padding || [0, 0, 0, 0];
        v[je] && (o += " ".repeat(v[je])), o += pn(e[a], d, "| "), o += d, o += pn(e[a], d, " |"), v[Ne] && (o += " ".repeat(v[Ne])), u === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), u = s ? s[0].length : 0, o = n.text, r = Z.stringWidth(o.trimRight());
    return n.span ? this.wrap ? u < r ? e : (n.hidden = !0, o.trimRight() + " ".repeat(u - r) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let u;
    return e.forEach((o, r) => {
      o.width = s[r], this.wrap ? u = Z.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : u = o.text.split(`
`), o.border && (u.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), u.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (u.unshift(...new Array(o.padding[Ys] || 0).fill("")), u.push(...new Array(o.padding[Qs] || 0).fill(""))), u.forEach((a, h) => {
        n[h] || n.push([]);
        const p = n[h];
        for (let d = 0; d < r; d++)
          p[d] === void 0 && p.push("");
        p.push(a);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[je] || 0) + (e.padding[Ne] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((r) => r.width || Z.stringWidth(r.text));
    let n = e.length, s = this.width;
    const u = e.map((r) => {
      if (r.width)
        return n--, s -= r.width, r.width;
    }), o = n ? Math.floor(s / n) : 0;
    return u.map((r, a) => r === void 0 ? Math.max(o, Js(e[a])) : r);
  }
}
function pn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Js(t) {
  const e = t.padding || [], n = 1 + (e[je] || 0) + (e[Ne] || 0);
  return t.border ? n + 4 : n;
}
function eu() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function tu(t, e) {
  t = t.trim();
  const n = Z.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function nu(t, e) {
  t = t.trim();
  const n = Z.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Z;
function su(t, e) {
  return Z = e, new Xs({
    width: t?.width || eu(),
    wrap: t?.wrap
  });
}
const qn = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Un(t) {
  return t.replace(qn, "");
}
function uu(t, e) {
  const [n, s] = t.match(qn) || ["", ""];
  t = Un(t);
  let u = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (u += `
`), u += t.charAt(o);
  return n && s && (u = `${n}${u}${s}`), u;
}
function ru(t) {
  return su(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Un,
    wrap: uu
  });
}
function ou(t, e) {
  let n = ge(".", t), s;
  for (Pn(n).isDirectory() || (n = Dt(n)); ; ) {
    if (s = e(n, js(n)), s) return ge(n, s);
    if (n = Dt(s = n), s === n) break;
  }
}
const iu = {
  fs: {
    readFileSync: Xt,
    writeFile: Ls
  },
  format: kn,
  resolve: ge,
  exists: (t) => {
    try {
      return Pn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let ee;
class cu {
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
    })) : s(), ee.format.apply(ee.format, [this.cache[this.locale][n] || n].concat(e));
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
    const a = [r];
    return ~r.indexOf("%d") && a.push(u), ee.format.apply(ee.format, a.concat(e));
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
    const e = this, n = this.writeQueue[0], s = n.directory, u = n.locale, o = n.cb, r = this._resolveLocaleFile(s, u), a = JSON.stringify(this.cache[u], null, 2);
    ee.fs.writeFile(r, a, "utf-8", function(h) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(h);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      ee.fs.readFileSync && (e = JSON.parse(ee.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = ee.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const u = ee.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(u) && (s = u);
    }
    return s;
  }
  _fileExistsSync(e) {
    return ee.exists(e);
  }
}
function au(t, e) {
  ee = e;
  const n = new cu(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const lu = (t) => au(t, iu), Du = "require is not supported by ESM", dn = "loading a directory of commands is not supported yet for ESM";
let we;
try {
  we = Ms(import.meta.url);
} catch {
  we = process.cwd();
}
const fu = we.substring(0, we.lastIndexOf("node_modules"));
Ws, Ts, Ss, fu || process.cwd(), Rs, Dt, _s, Ns, ge, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Xt, lu({
  directory: ge(we, "../../../locales"),
  updateFiles: !1
});
function hu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function pu(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function s() {
      return this instanceof s ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(s) {
    var u = Object.getOwnPropertyDescriptor(t, s);
    Object.defineProperty(n, s, u.get ? u : {
      enumerable: !0,
      get: function() {
        return t[s];
      }
    });
  }), n;
}
let Jt = [], Zn = 0;
const G = (t, e) => {
  Zn >= e && Jt.push(t);
};
G.WARN = 1;
G.INFO = 2;
G.DEBUG = 3;
G.reset = () => {
  Jt = [];
};
G.setDebugLevel = (t) => {
  Zn = t;
};
G.warn = (t) => G(t, G.WARN);
G.info = (t) => G(t, G.INFO);
G.debug = (t) => G(t, G.DEBUG);
G.debugMessages = () => Jt;
var en = G, tn = { exports: {} }, du = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const mu = du;
var gu = (t) => typeof t == "string" ? t.replace(mu(), "") : t, nn = { exports: {} };
const Kn = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
nn.exports = Kn;
nn.exports.default = Kn;
var Fu = nn.exports, Cu = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const Eu = gu, bu = Fu, $u = Cu, Yn = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = Eu(t), t.length === 0))
    return 0;
  t = t.replace($u(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += bu(s) ? 2 : 1);
  }
  return e;
};
tn.exports = Yn;
tn.exports.default = Yn;
var yu = tn.exports;
const mn = yu;
function Me(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function re(t) {
  let e = Me();
  return ("" + t).replace(e, "").split(`
`).reduce(function(u, o) {
    return mn(o) > u ? mn(o) : u;
  }, 0);
}
function $e(t, e) {
  return Array(e + 1).join(t);
}
function wu(t, e, n, s) {
  let u = re(t);
  if (e + 1 >= u) {
    let o = e - u;
    switch (s) {
      case "right": {
        t = $e(n, o) + t;
        break;
      }
      case "center": {
        let r = Math.ceil(o / 2), a = o - r;
        t = $e(n, a) + t + $e(n, r);
        break;
      }
      default: {
        t = t + $e(n, o);
        break;
      }
    }
  }
  return t;
}
let me = {};
function ve(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", me[e] = { set: t, to: !0 }, me[n] = { set: t, to: !1 }, me[t] = { on: e, off: n };
}
ve("bold", 1, 22);
ve("italics", 3, 23);
ve("underline", 4, 24);
ve("inverse", 7, 27);
ve("strikethrough", 9, 29);
function Qn(t, e) {
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
  let s = me[e[0]];
  s && (t[s.set] = s.to);
}
function Au(t) {
  let e = Me(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Qn(s, n), n = e.exec(t);
  return s;
}
function Xn(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e += me[u].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function xu(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(u) {
    t[u] && (e = me[u].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function vu(t, e) {
  if (t.length === re(t))
    return t.substr(0, e);
  for (; re(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Bu(t, e) {
  let n = Me(!0), s = t.split(Me()), u = 0, o = 0, r = "", a, h = {};
  for (; o < e; ) {
    a = n.exec(t);
    let p = s[u];
    if (u++, o + re(p) > e && (p = vu(p, e - o)), r += p, o += re(p), o < e) {
      if (!a)
        break;
      r += a[0], Qn(h, a);
    }
  }
  return Xn(h, r);
}
function Su(t, e, n) {
  if (n = n || "…", re(t) <= e)
    return t;
  e -= re(n);
  let u = Bu(t, e);
  u += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !u.includes(o) && (u += o), u;
}
function Ou() {
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
function Ru(t, e) {
  t = t || {}, e = e || Ou();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function _u(t, e) {
  let n = [], s = e.split(/(\s+)/g), u = [], o = 0, r;
  for (let a = 0; a < s.length; a += 2) {
    let h = s[a], p = o + re(h);
    o > 0 && r && (p += r.length), p > t ? (o !== 0 && n.push(u.join("")), u = [h], o = re(h)) : (u.push(r || "", h), o = p), r = s[a + 1];
  }
  return o && n.push(u.join("")), n;
}
function Nu(t, e) {
  let n = [], s = "";
  function u(r, a) {
    for (s.length && a && (s += a), s += r; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let r = 0; r < o.length; r += 2)
    u(o[r], r && o[r - 1]);
  return s.length && n.push(s), n;
}
function ju(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const u = n ? _u : Nu;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, u(t, e[o]));
  return s;
}
function Lu(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let u = xu(e, t[s]);
    e = Au(u);
    let o = Object.assign({}, e);
    n.push(Xn(o, u));
  }
  return n;
}
function Wu(t, e) {
  const n = "\x1B]", s = "\x07", u = ";";
  return [n, "8", u, u, t || e, s, e, n, "8", u, u, s].join("");
}
var Jn = {
  strlen: re,
  repeat: $e,
  pad: wu,
  truncate: Su,
  mergeOptions: Ru,
  wordWrap: ju,
  colorizeLines: Lu,
  hyperlink: Wu
}, es = { exports: {} }, Ge = { exports: {} }, Qe = { exports: {} }, Xe = { exports: {} }, Je = { exports: {} }, gn;
function Tu() {
  return gn || (gn = 1, function(t) {
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
  }(Je)), Je.exports;
}
const Mu = {}, Iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mu
}, Symbol.toStringTag, { value: "Module" })), ku = /* @__PURE__ */ pu(Iu);
var et, Fn;
function Pu() {
  return Fn || (Fn = 1, et = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", u = e.indexOf(s + t);
    return u !== -1 && (n === -1 ? !0 : u < n);
  }), et;
}
var tt, Cn;
function zu() {
  if (Cn) return tt;
  Cn = 1;
  var t = ku, e = Pu(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function u(a) {
    return a === 0 ? !1 : {
      level: a,
      hasBasic: !0,
      has256: a >= 2,
      has16m: a >= 3
    };
  }
  function o(a) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (a && !a.isTTY && s !== !0)
      return 0;
    var h = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(v) {
        return v in n;
      }) || n.CI_NAME === "codeship" ? 1 : h;
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
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", h);
  }
  function r(a) {
    var h = o(a);
    return u(h);
  }
  return tt = {
    supportsColor: r,
    stdout: r(process.stdout),
    stderr: r(process.stderr)
  }, tt;
}
var nt = { exports: {} }, En;
function Vu() {
  return En || (En = 1, function(t) {
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
        var a = o[r] || [" "], h = Math.floor(Math.random() * a.length);
        typeof o[r] < "u" ? u += o[r][h] : u += r;
      }), u;
    };
  }(nt)), nt.exports;
}
var st = { exports: {} }, bn;
function Gu() {
  return bn || (bn = 1, function(t) {
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
      function a(p) {
        var d = !1;
        return o.filter(function(v) {
          d = v === p;
        }), d;
      }
      function h(p, d) {
        var v = "", A, E;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (E in p)
          if (!a(E)) {
            switch (v = v + p[E], A = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                A.up = r(8), A.mid = r(2), A.down = r(8);
                break;
              case "maxi":
                A.up = r(16) + 3, A.mid = r(4) + 1, A.down = r(64) + 3;
                break;
              default:
                A.up = r(8) + 1, A.mid = r(6) / 2, A.down = r(8) + 1;
                break;
            }
            var C = ["up", "mid", "down"];
            for (var g in C)
              for (var c = C[g], y = 0; y <= A[c]; y++)
                d[c] && (v = v + u[c][r(u[c].length)]);
          }
        return v;
      }
      return h(n, s);
    };
  }(st)), st.exports;
}
var ut = { exports: {} }, $n;
function Hu() {
  return $n || ($n = 1, function(t) {
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
  }(ut)), ut.exports;
}
var rt = { exports: {} }, yn;
function qu() {
  return yn || (yn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, u) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(rt)), rt.exports;
}
var ot = { exports: {} }, wn;
function Uu() {
  return wn || (wn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, u, o) {
        return s === " " ? s : e[n[u++ % n.length]](s);
      };
    };
  }(ot)), ot.exports;
}
var it = { exports: {} }, An;
function Zu() {
  return An || (An = 1, function(t) {
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
  }(it)), it.exports;
}
var xn;
function Ku() {
  return xn || (xn = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Bs, s = e.styles = Tu(), u = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = zu().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(g) {
      return ("" + g).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(c, y) {
      if (!e.enabled)
        return c + "";
      var B = s[y];
      return !B && y in e ? e[y](c) : B.open + c + B.close;
    };
    var r = /[|\\{}()[\]^$+*?.]/g, a = function(g) {
      if (typeof g != "string")
        throw new TypeError("Expected a string");
      return g.replace(r, "\\$&");
    };
    function h(g) {
      var c = function y() {
        return v.apply(y, arguments);
      };
      return c._styles = g, c.__proto__ = d, c;
    }
    var p = function() {
      var g = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(c) {
        s[c].closeRe = new RegExp(a(s[c].close), "g"), g[c] = {
          get: function() {
            return h(this._styles.concat(c));
          }
        };
      }), g;
    }(), d = u(function() {
    }, p);
    function v() {
      var g = Array.prototype.slice.call(arguments), c = g.map(function(T) {
        return T != null && T.constructor === String ? T : n.inspect(T);
      }).join(" ");
      if (!e.enabled || !c)
        return c;
      for (var y = c.indexOf(`
`) != -1, B = this._styles, j = B.length; j--; ) {
        var L = s[B[j]];
        c = L.open + c.replace(L.closeRe, L.open) + L.close, y && (c = c.replace(o, function(T) {
          return L.close + T + L.open;
        }));
      }
      return c;
    }
    e.setTheme = function(g) {
      if (typeof g == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var c in g)
        (function(y) {
          e[y] = function(B) {
            if (typeof g[y] == "object") {
              var j = B;
              for (var L in g[y])
                j = e[g[y][L]](j);
              return j;
            }
            return e[g[y]](B);
          };
        })(c);
    };
    function A() {
      var g = {};
      return Object.keys(p).forEach(function(c) {
        g[c] = {
          get: function() {
            return h([c]);
          }
        };
      }), g;
    }
    var E = function(c, y) {
      var B = y.split("");
      return B = B.map(c), B.join("");
    };
    e.trap = Vu(), e.zalgo = Gu(), e.maps = {}, e.maps.america = Hu()(e), e.maps.zebra = qu()(e), e.maps.rainbow = Uu()(e), e.maps.random = Zu()(e);
    for (var C in e.maps)
      (function(g) {
        e[g] = function(c) {
          return E(e.maps[g], c);
        };
      })(C);
    u(e, A());
  }(Xe)), Xe.exports;
}
var vn;
function Yu() {
  return vn || (vn = 1, function(t) {
    var e = Ku();
    t.exports = e;
  }(Qe)), Qe.exports;
}
const { info: Qu, debug: ts } = en, U = Jn;
let Xu = class Le {
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
    er.forEach(function(h) {
      ct(s, u, h, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let r = this.options.style = this.options.style || {}, a = e.style;
    ct(r, a, "padding-left", this), ct(r, a, "padding-right", this), this.head = r.head || a.head, this.border = r.border || a.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = U.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
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
      return this.wrapLines(U.wordWrap(this.fixedWidth, this.content, o));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = U.colorizeLines(e);
    return this.href ? n.map((s) => U.hyperlink(this.href, s)) : n;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Sn, -1), this.height = this.heights.reduce(Sn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    let s = U.truncate(this.content, 10, this.truncate);
    e || Qu(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
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
      n.push(this._topLeftChar(u)), n.push(U.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(U.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof Le.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof Le.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof Le.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = Yu();
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
      let A = this.cells[this.y + u][this.x - 1];
      for (; A instanceof ft; )
        A = this.cells[A.y][A.x - 1];
      A instanceof ht || (o = this.chars.rightMid);
    }
    let r = U.repeat(" ", this.paddingLeft), a = n ? this.chars.right : "", h = U.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let v = U.truncate(p, d, this.truncate);
    return v = U.pad(v, d, " ", this.hAlign), v = r + v + h, this.stylizeLine(o, v, a);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = U.repeat(this.chars.bottom, this.width), u = e ? this.chars.bottomRight : "";
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
      for (; r instanceof ft; )
        r = this.cells[r.y][r.x - 1];
      r instanceof ht || (s = this.chars.rightMid);
    }
    let u = e ? this.chars.right : "", o = U.repeat(" ", this.width);
    return this.stylizeLine(s, o, u);
  }
}, ft = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && ts(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, ht = class {
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
    this.cellOffset = n - s, this.offset = Ju(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (ts(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function Bn(...t) {
  return t.filter((e) => e != null).shift();
}
function ct(t, e, n, s) {
  let u = n.split("-");
  u.length > 1 ? (u[1] = u[1].charAt(0).toUpperCase() + u[1].substr(1), u = u.join(""), s[u] = Bn(t[u], t[n], e[u], e[n])) : s[n] = Bn(t[n], e[n]);
}
function Ju(t, e, n) {
  let s = t[e];
  for (let u = 1; u < n; u++)
    s += 1 + t[e + u];
  return s;
}
function Sn(t, e) {
  return t + e + 1;
}
let er = [
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
Ge.exports = Xu;
Ge.exports.ColSpanCell = ft;
Ge.exports.RowSpanCell = ht;
var tr = Ge.exports;
const { warn: nr, debug: sr } = en, pt = tr, { ColSpanCell: ur, RowSpanCell: rr } = pt;
(function() {
  function t(E, C) {
    return E[C] > 0 ? t(E, C + 1) : C;
  }
  function e(E) {
    let C = {};
    E.forEach(function(g, c) {
      let y = 0;
      g.forEach(function(B) {
        B.y = c, B.x = c ? t(C, y) : y;
        const j = B.rowSpan || 1, L = B.colSpan || 1;
        if (j > 1)
          for (let T = 0; T < L; T++)
            C[B.x + T] = j;
        y = B.x + L;
      }), Object.keys(C).forEach((B) => {
        C[B]--, C[B] < 1 && delete C[B];
      });
    });
  }
  function n(E) {
    let C = 0;
    return E.forEach(function(g) {
      g.forEach(function(c) {
        C = Math.max(C, c.x + (c.colSpan || 1));
      });
    }), C;
  }
  function s(E) {
    return E.length;
  }
  function u(E, C) {
    let g = E.y, c = E.y - 1 + (E.rowSpan || 1), y = C.y, B = C.y - 1 + (C.rowSpan || 1), j = !(g > B || y > c), L = E.x, T = E.x - 1 + (E.colSpan || 1), Be = C.x, Fe = C.x - 1 + (C.colSpan || 1), he = !(L > Fe || Be > T);
    return j && he;
  }
  function o(E, C, g) {
    let c = Math.min(E.length - 1, g), y = { x: C, y: g };
    for (let B = 0; B <= c; B++) {
      let j = E[B];
      for (let L = 0; L < j.length; L++)
        if (u(y, j[L]))
          return !0;
    }
    return !1;
  }
  function r(E, C, g, c) {
    for (let y = g; y < c; y++)
      if (o(E, y, C))
        return !1;
    return !0;
  }
  function a(E) {
    E.forEach(function(C, g) {
      C.forEach(function(c) {
        for (let y = 1; y < c.rowSpan; y++) {
          let B = new rr(c);
          B.x = c.x, B.y = c.y + y, B.colSpan = c.colSpan, p(B, E[g + y]);
        }
      });
    });
  }
  function h(E) {
    for (let C = E.length - 1; C >= 0; C--) {
      let g = E[C];
      for (let c = 0; c < g.length; c++) {
        let y = g[c];
        for (let B = 1; B < y.colSpan; B++) {
          let j = new ur();
          j.x = y.x + B, j.y = y.y, g.splice(c + 1, 0, j);
        }
      }
    }
  }
  function p(E, C) {
    let g = 0;
    for (; g < C.length && C[g].x < E.x; )
      g++;
    C.splice(g, 0, E);
  }
  function d(E) {
    let C = s(E), g = n(E);
    sr(`Max rows: ${C}; Max cols: ${g}`);
    for (let c = 0; c < C; c++)
      for (let y = 0; y < g; y++)
        if (!o(E, y, c)) {
          let B = { x: y, y: c, colSpan: 1, rowSpan: 1 };
          for (y++; y < g && !o(E, y, c); )
            B.colSpan++, y++;
          let j = c + 1;
          for (; j < C && r(E, j, B.x, B.x + B.colSpan); )
            B.rowSpan++, j++;
          let L = new pt(B);
          L.x = B.x, L.y = B.y, nr(`Missing cell at ${L.y}-${L.x}.`), p(L, E[c]);
        }
  }
  function v(E) {
    return E.map(function(C) {
      if (!Array.isArray(C)) {
        let g = Object.keys(C)[0];
        C = C[g], Array.isArray(C) ? (C = C.slice(), C.unshift(g)) : C = [g, C];
      }
      return C.map(function(g) {
        return new pt(g);
      });
    });
  }
  function A(E) {
    let C = v(E);
    return e(C), d(C), a(C), h(C), C;
  }
  es.exports = {
    makeTableLayout: A,
    layoutTable: e,
    addRowSpanCells: a,
    maxWidth: n,
    fillInTable: d,
    computeWidths: On("colSpan", "desiredWidth", "x", 1),
    computeHeights: On("rowSpan", "desiredHeight", "y", 1)
  };
})();
function On(t, e, n, s) {
  return function(u, o) {
    let r = [], a = [], h = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? a.push(d) : r[d[n]] = Math.max(r[d[n]] || 0, d[e] || 0, s);
      });
    }), u.forEach(function(p, d) {
      typeof p == "number" && (r[d] = p);
    });
    for (let p = a.length - 1; p >= 0; p--) {
      let d = a[p], v = d[t], A = d[n], E = r[A], C = typeof u[A] == "number" ? 0 : 1;
      if (typeof E == "number")
        for (let g = 1; g < v; g++)
          E += 1 + r[A + g], typeof u[A + g] != "number" && C++;
      else
        E = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!h[A] || h[A] < E) && (h[A] = E);
      if (d[e] > E) {
        let g = 0;
        for (; C > 0 && d[e] > E; ) {
          if (typeof u[A + g] != "number") {
            let c = Math.round((d[e] - E) / C);
            E += c, r[A + g] += c, C--;
          }
          g++;
        }
      }
    }
    Object.assign(u, r, h);
    for (let p = 0; p < u.length; p++)
      u[p] = Math.max(s, u[p] || 0);
  };
}
var or = es.exports;
const ce = en, ir = Jn, at = or;
let ns = class extends Array {
  constructor(e) {
    super();
    const n = ir.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          ce.setDebugLevel(ce.WARN);
          break;
        case "number":
          ce.setDebugLevel(n.debug);
          break;
        case "string":
          ce.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          ce.setDebugLevel(ce.WARN), ce.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return ce.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = at.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(r) {
        r.mergeTableOptions(this.options, s);
      }, this);
    }, this), at.computeWidths(this.options.colWidths, s), at.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(r) {
        r.init(this.options);
      }, this);
    }, this);
    let u = [];
    for (let o = 0; o < s.length; o++) {
      let r = s[o], a = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && lt(r, "top", u);
      for (let h = 0; h < a; h++)
        lt(r, h, u);
      o + 1 == s.length && lt(r, "bottom", u);
    }
    return u.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
ns.reset = () => ce.reset();
function lt(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let u = s.join("");
  u.length && n.push(u);
}
var cr = ns, ar = cr;
const lr = /* @__PURE__ */ hu(ar), se = "\x1B[44m", R = "\x1B[43m", H = "\x1B[41m", ss = "\x1B[42m", $ = "\x1B[0m", _ = "\x1B[33m", N = "\x1B[36m", F = "\x1B[0m", Dr = [
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
], dt = [], fr = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let u;
    for (; (u = n.exec(s.content)) !== null; ) {
      const o = u[1];
      Dr.includes(o) && dt.push({ filePath: e, message: `${R}(${o})${$}` });
    }
  });
}, hr = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-caution ~ element selectors with scoped${F}`,
      description: `👉 ${_}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, pr = /^(\(.*\)|\\?.)$/;
function ae(t) {
  const e = t.toString();
  return pr.test(e) ? e : `(?:${e})`;
}
const dr = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, mr = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function S(t) {
  const e = (n) => S(`(?<${n}>${`${t}`.replace(dr, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => S(`${t}${Q(...n)}`), {
      referenceTo: (n) => S(`${t}\\k<${n}>`)
    }),
    or: (...n) => S(`(?:${t}|${Q(...n)})`),
    after: (...n) => S(`(?<=${Q(...n)})${t}`),
    before: (...n) => S(`${t}(?=${Q(...n)})`),
    notAfter: (...n) => S(`(?<!${Q(...n)})${t}`),
    notBefore: (...n) => S(`${t}(?!${Q(...n)})`),
    times: Object.assign((n) => S(`${ae(t)}{${n}}`), {
      any: () => S(`${ae(t)}*`),
      atLeast: (n) => S(`${ae(t)}{${n},}`),
      atMost: (n) => S(`${ae(t)}{0,${n}}`),
      between: (n, s) => S(`${ae(t)}{${n},${s}}`)
    }),
    optionally: () => S(`${ae(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => S(`${t}`.replace(mr, "($1$3)$2")),
    at: {
      lineStart: () => S(`^${t}`),
      lineEnd: () => S(`${t}$`)
    }
  };
}
const gr = /[.*+?^${}()|[\]\\/]/g;
function Ae(t) {
  return S(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Y(t) {
  return S(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Fr(...t) {
  return S(`(?:${t.map((e) => Q(e)).join("|")})`);
}
const We = S(".");
S("\\b\\w+\\b");
const J = S("\\w"), K = S("\\b"), Cr = S("\\d"), k = S("\\s"), us = Object.assign(S("[a-zA-Z]"), {
  lowercase: S("[a-z]"),
  uppercase: S("[A-Z]")
}), rs = S("\\t"), os = S("\\n");
S("\\r");
S("\\W+"), S("\\W"), S("\\B"), S("\\D"), S("\\S"), Object.assign(S("[^a-zA-Z]"), {
  lowercase: S("[^a-z]"),
  uppercase: S("[^A-Z]")
}), S("[^\\t]"), S("[^\\n]"), S("[^\\r]");
function ue(...t) {
  return S(`${ae(Q(...t))}?`);
}
function Q(...t) {
  return S(
    t.map((e) => typeof e == "string" ? e.replace(gr, "\\$&") : e).join("")
  );
}
function W(...t) {
  return S(`${ae(Q(...t))}+`);
}
const X = "i", P = "g", M = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(Q(...t).toString(), [...e || ""].join(""));
}, z = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((a, h) => h >= n && a.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((r, a) => r + a.length, 0), u = t.indexOf(e, s);
  return t.slice(0, u).split(`
`).length;
}, Ie = [], Er = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, u = M(Q("$parent").or("getCurrentInstance"), [P]), o = t.content.match(n), r = t.content.match(s);
  if (r) {
    const h = r[1].split(".")[0];
    if ((o ? o[1] : "").includes(h)) {
      const d = z(t.content.trim(), h);
      Ie.push({
        filePath: e,
        message: `line #${d} ${R}(${h})${$}`
      });
    }
  }
  const a = t.content.match(u);
  if (a) {
    const h = z(t.content.trim(), a[0]);
    Ie.push({
      filePath: e,
      message: `line #${h} ${R}(${a[0]})${$}`
    });
  }
}, br = () => {
  const t = [];
  return Ie.length > 0 && Ie.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-caution ~ implicit parent-child communication${F}`,
      description: `👉 ${_}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, mt = [], $r = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || mt.push({
      filePath: e,
      message: `${R}global style${$} used`
    });
  });
}, yr = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-essential ~ global style${F}`,
      description: `👉 ${_}Use <style scoped>.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, gt = [], wr = (t, e) => {
  if (!t)
    return;
  const n = M("defineProps([", [P, X]);
  t.content.match(n)?.length && gt.push({ filePath: e, message: `${R}Props type${$} not defined` });
}, Ar = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-essential ~ simple prop${F}`,
      description: `👉 ${_}Add at least type definition.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], xr = (t) => {
  if (t.includes("pages"))
    return;
  const e = le.basename(t);
  if (e === "App.vue")
    return;
  const n = M(us.uppercase);
  e.slice(1).match(n)?.length || Ft.push({ filePath: t, message: `Component name is ${R}single word${$}` });
}, vr = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-essential ~ single name component${F}`,
      description: `👉 ${_}Rename the component to use multi-word name.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], Br = (t, e) => {
  if (!t)
    return;
  const n = M("<", W(Y(">")), " v-for", W(Y(">")), ">", [
    P,
    X
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || Ct.push({ filePath: e, message: `v-for used ${R}without a key${$}` }));
}, Sr = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-essential ~ v-for has no key${F}`,
      description: `👉 ${_}Add a \`:key\` property to all v-for.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], Or = (t, e) => {
  if (!t)
    return;
  const n = M(
    "<",
    W(Y(">")),
    " v-if",
    W(Y(">")),
    " v-for",
    W(Y(">")),
    ">",
    [P, X]
  ), s = M(
    "<",
    W(Y(">")),
    " v-for",
    W(Y(">")),
    " v-if",
    W(Y(">")),
    ">",
    [P, X]
  ), u = t.content.match(n), o = t.content.match(s);
  if (u?.length || o?.length) {
    const r = u?.length ? u[0] : o?.length ? o[0] : "", a = z(t.content, r);
    Et.push({ filePath: e, message: `line #${a} ${R}v-if used with v-for${$}` });
  }
}, Rr = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-essential ~ v-if used with v-for${F}`,
      description: `👉 ${_}Move out the v-if to a computed property.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], Rn = [
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
], _r = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, u = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const r = o[1], a = o[2];
    if (a) {
      const p = Array.from(a.matchAll(u), (v) => v[1]).filter((v) => Rn.includes(v));
      let d = -1;
      for (const v of p) {
        const A = Rn.indexOf(v);
        if (A !== -1 && A < d) {
          bt.push({
            filePath: e,
            message: `tag has attributes out of order ${R}(${r})${$}`
          });
          break;
        }
        d = A;
      }
    }
  }
}, Nr = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-recommended ~ element attribute order${F}`,
      description: `👉 ${_}The attributes of elements (including components) should be ordered consistently.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], jr = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), u = n.indexOf("<template>"), o = n.indexOf("<style>"), r = [
    { name: "script", index: s },
    { name: "template", index: u },
    { name: "style", index: o }
  ].filter((h) => h.index !== -1);
  r.every((h, p) => p === 0 ? !0 : r[p - 1].index < h.index) || $t.push({ filePath: e, message: `Top level elements are ${R}not following the correct order.${$}` });
}, Lr = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-recommended ~ top level element order${F}`,
      description: `👉 ${_}Single-File Components should always order <script>, <template>, and <style> tags consistently.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], Wr = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = le.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), u = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(u);
  !s?.length && !o?.length && yt.push({ filePath: t, message: `component name is ${R}not PascalCase, nor kebab-case.${$}` });
}, Tr = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ component name is not PascalCase and not kebab-case${F}`,
      description: `👉 ${_}Rename the component to use PascalCase or kebab-case file name.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], Mr = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    const o = z(t.content.trim(), u), r = u.split(`
`).at(0)?.trim() || "";
    wt.push({ filePath: e, message: `line #${o} ${R}(${r})${$}` });
  });
}, Ir = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ component files${F}`,
      description: `👉 ${_}Whenever a build system is available to concatenate files, each component should be in its own file.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], _n = [], kr = ["v-slot", "v-bind", "v-on"], Pr = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  kr.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const u = z(t.source, s);
      At.push({ filePath: e, message: `line #${u} ${R}${s}${$}` }), _n.some((o) => o.filePath === e) || _n.push({ filePath: e });
    }
  });
}, zr = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ directive shorthands not used${F}`,
      description: `👉 ${_}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], Vr = 3, Gr = (t) => {
  const e = M(
    W(Y("/")).grouped(),
    Q(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], u = M(
      Ae("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [P]
    ), o = s.match(u);
    (!o || o.length < Vr) && xt.push({ filePath: t, message: `${s} is not a ${R}full word.${$}` });
  }
}, Hr = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ full-word component names${F}`,
      description: `👉 ${_}Component names should prefer full words over abbreviations.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], qr = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1], o = s[2];
    o.split(/\s+/).filter((a) => a.trim() !== "").length > 1 && o.split(`
`).length === 1 && vt.push({ filePath: e, message: `Element ${R}<${u}>${$} should have its attributes on separate lines` });
  }
}, Ur = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ multi-attribute elements${F}`,
      description: `👉 ${_}Elements with multiple attributes should span multiple lines, with one attribute per line.${F}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], Zr = /^[a-z]+([A-Z][a-z]*)*$/, Kr = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !Zr.test(o)).length && Bt.push({ filePath: e, message: `prop names are ${R}not camelCased${$}` });
}, Yr = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ prop names are not camelCased${F}`,
      description: `👉 ${_}Rename the props to camelCase.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], Qr = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = M(
    "<",
    W(J),
    ue(W(Ae(` 	
\r`))),
    W(Y("/>")),
    ue(W(Ae(` 	
\r`))),
    ue("/"),
    ">",
    ["g"]
  ), u = n?.content.match(s);
  if (u === null)
    return;
  const o = M(":", W(J), ue(" "), "=", ue(" "), Y(`'"`), [
    "g"
  ]);
  u?.forEach((r) => {
    if (!r.includes(":"))
      return;
    const a = r.match(o);
    if (a?.length) {
      const h = z(t.source, r);
      St.push({ filePath: e, message: `line #${h} ${R}${a}${$}` });
    }
  });
}, Xr = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ attribute value is not quoted${F}`,
      description: `👉 ${_}Use quotes for attribute values.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], Jr = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = M(
    "<",
    W(us.uppercase, J),
    ue(os, rs),
    ue(W(Y(">"))),
    "></",
    W(J),
    ">",
    ["g"]
  ), u = n?.content?.match(s);
  u !== null && u?.forEach((o) => {
    const r = z(t.source, o), a = o.split(`
`).at(-1)?.trim() || "";
    Ot.push({ filePath: e, message: `line #${r} ${R}${a}${$}` });
  });
}, eo = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ component is not self closing${F}`,
      description: `👉 ${_}Components with no content should be self-closing.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, is = [], Te = [], to = 5, no = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((u) => {
    if (u.split(`
`).length > to) {
      const o = u.split(`
`)[0], r = z(t.content, o);
      is.push({ filePath: e, message: `line #${r} ${R}computed${$}` }), Te.push({ filePath: e }), Te.some((a) => a.filePath === e) || Te.push({ filePath: e });
    }
  });
}, so = () => {
  const t = [];
  return Te.length > 0 && is.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ complicated computed property${F}`,
      description: `👉 ${_}Refactor the computed properties to smaller ones.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], uo = 40, ro = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((u) => u[1].trim()).forEach((u) => {
    if (u.length > uo) {
      const o = z(t.content, u), r = u.split(`
`).at(0)?.trim() || "";
      Rt.push({
        filePath: e,
        message: `line #${o} ${R}${r}${$}`
      });
    }
  });
}, oo = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}vue-strong ~ lengthy template expression${F}`,
      description: `👉 ${_}Refactor the expression into a computed property.${F} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], cs = 5, io = 2 * cs, co = (t, e) => {
  if (!t)
    return;
  const n = M(K, "if", K, [P, X]), s = M(K, "else", K, [P, X]), u = M(K, "for", K, [P, X]), o = M(K, "while", K, [P, X]), r = M(K, "case", K, [P, X]), a = t.content.match(n), h = t.content.match(s), p = t.content.match(u), d = t.content.match(o), v = t.content.match(r), A = (a?.length || 0) + (h?.length || 0) + (p?.length || 0) + (d?.length || 0) + (v?.length || 0);
  A > cs && _t.push({ filePath: e, message: `${A > io ? H : R}(${A})${$}` });
}, ao = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ cyclomatic complexity${F}`,
      description: `👉 ${_}Try to reduce complexity.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], Nn = 5, lo = 3, Do = (t, e) => {
  if (!t)
    return;
  const n = M(rs.times.atLeast(Nn).or(k.times.atLeast(lo * Nn)), [
    P,
    X
  ]);
  t.content.match(n)?.forEach((u) => {
    const o = z(t.content, u);
    Nt.push({
      filePath: e,
      message: `line #${o} ${R}indentation: ${u.length}${$}`
    });
  });
}, fo = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ deep indentation${F}`,
      description: `👉 ${_}Try to refactor your component to child components, to avoid deep indentations.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], ho = (t, e) => {
  if (!t)
    return;
  const n = M(K, "else", K, [P, X]), s = t.content.match(n);
  s?.length && jt.push({ filePath: e, message: `else clauses found ${H}(${s.length})${$}` });
}, po = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ else conditions${F}`,
      description: `👉 ${_}Try to rewrite the conditions in a way that the else clause is not necessary.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ke = [], Lt = 20, mo = 5, go = 8;
function Fo({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const u = e.split(`
`).length, o = bo(t);
  if (u > 2 * Lt) {
    ke.push({ filePath: s, message: `function ${H}(${o}#${n})${$} is too long: ${H}${u} lines${$}` });
    return;
  }
  u >= Lt && ke.push({ filePath: s, message: `function ${R}(${o}#${n})${$} is too long: ${R}${u} lines${$}` });
}
function Co(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const u = s[1], o = n.lastIndex;
    let r = 1, a = o;
    for (; r > 0 && a < t.length; )
      t[a] === "{" ? r++ : t[a] === "}" && r--, a++;
    const h = t.slice(o, a - 1).trim();
    return {
      name: u,
      body: h,
      end: a
      // Returns the position after the matched function
    };
  } else
    return null;
}
function Eo(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), u = n.exec(s);
  if (u) {
    const [, o] = u, r = e + u.index + u[0].length;
    let a = r, h = "";
    if (t[r] === "{") {
      let p = 1;
      for (a = r + 1; a < t.length && p > 0; )
        t[a] === "{" ? p++ : t[a] === "}" && p--, a++;
      h = t.slice(r + 1, a - 1).trim();
    } else {
      for (; a < t.length && t[a] !== ";"; )
        a++;
      h = t.slice(r, a).trim();
    }
    return {
      name: o,
      body: h,
      end: a
      // Position after the end of the function body
    };
  } else
    return null;
}
function bo(t) {
  return t.replace(/^const\s*/, "");
}
const $o = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let u = 0;
  for (; u < s; ) {
    let o = "", r = "", a = !1;
    if (n.slice(u, u + go) === "function") {
      const h = Co(n, u);
      h && (a = !0, o = h.name, r = h.body, u = h.end);
    }
    if (n.slice(u, u + mo) === "const") {
      const h = Eo(n, u);
      h && (a = !0, o = h.name, r = h.body, u = h.end);
    }
    if (a) {
      const h = z(n.trim(), o);
      Fo({ funcName: o, funcBody: r, lineNumber: h, filePath: e });
    } else
      u++;
  }
}, yo = () => {
  const t = [];
  return ke.length > 0 && ke.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ function size${F}`,
      description: `👉 ${_}Functions must be shorter than ${Lt} lines.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], wo = (t, e) => {
  if (!t)
    return;
  const n = M("<a", K, [P, X]), s = t.content.match(n);
  s?.length && Wt.push({ filePath: e, message: `${s?.length} ${R}html link found${$}` });
}, Ao = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ html link${F}`,
      description: `👉 ${_}Use router-link or NuxtLink.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], xo = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((u, o) => {
    const r = u.trim();
    if (r.startsWith("if (") && !r.includes("{")) {
      const a = s[o + 1]?.trim();
      (!a || !a.startsWith("{") && !r.endsWith("{")) && Tt.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: ${H}${r}${$}`
      });
    }
  });
}, vo = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ if without curly braces${F}`,
      description: `👉 ${_}All if statements must be enclosed in curly braces for better readability and maintainability.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], Bo = (t, e) => {
  if (!t)
    return;
  const n = M(W(Cr).as("magicNumber"), Fr(")", os), [P]);
  let s, u = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, r = Number.parseInt(o ?? "0");
    if (r > 1) {
      const a = z(t.content, String(r), u);
      Mt.push({
        filePath: e,
        message: `line #${a} ${R}magic number: ${r}${$}`
      }), u = a;
    }
  }
}, So = () => {
  const t = [];
  return Mt.length && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ magic numbers${F}`,
      description: `👉 ${_}Extract magic numbers to a constant.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, It = [], Oo = (t, e) => {
  if (!t)
    return;
  const n = M(W(We), k, "?", k, W(We), k, ":", k, W(We));
  t.content.match(n)?.forEach((u) => {
    if (u.split("?").length - 1 > 1) {
      const o = z(t.content, u);
      It.push({
        filePath: e,
        message: `line #${o} has ${R}nested ternary${$}`
      });
    }
  });
}, Ro = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ nested Ternary${F}`,
      description: `👉 ${_}/* TODO tip to fix this issue */.${F} See: https:///* TODO doc link */`,
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], _o = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((u) => {
    const o = z(t.content, u);
    kt.push({
      filePath: e,
      message: `line #${o} ${R}props destructuring found: ${u}${$}`
    });
  });
}, No = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ no Prop Destructure${F}`,
      description: `👉 ${_}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], jo = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((u) => {
    const o = z(t.content, u);
    Pt.push({
      filePath: e,
      message: `line #${o} ${R}Avoid using 'var' for variable declarations: ${u}${$}`
    });
  });
}, Lo = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ No Var Declaration${F}`,
      description: `👉 ${_}Avoid var declaration, use const or let instead of that.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], as = 3, jn = (t, e, n) => {
  const s = e.split(",").map((u) => u.trim()).filter((u) => u.length > 0);
  s.length > as && zt.push({ filePath: n, message: `function ${R}${t}${$} has ${R}${s.length}${$} parameters` });
}, Wo = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && jn(s[1], s[2], e), s[3] && jn(s[3], s[4], e);
}, To = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ parameter count${F}`,
      description: `👉 ${_}Max number of function parameters should be ${as}.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Mo = (t, e) => {
  !t || t.setup || Vt.push({ filePath: e, message: `${R}Plain <script> block${$} found` });
}, Io = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ Plain <script> blocks${F}`,
      description: `👉 ${_} Consider using <script setup> to leverage the new SFC <script> syntax.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], ko = (t, e) => {
  if (!t)
    return;
  const n = M(
    "defineProps(",
    k.times.any(),
    "[",
    k.times.any(),
    W(Ae(`'"`), W(J), Ae(`'"`), k.times.any(), ue(",", k.times.any())),
    "]",
    k.times.any(),
    ")",
    [P]
  ), s = M(
    "<",
    W(J).grouped(),
    k,
    Y(">").times.any(),
    ":",
    W(J).grouped(),
    k.times.any(),
    "=",
    k.times.any(),
    '"props.',
    W(J).grouped(),
    '"',
    [P]
  );
  let u;
  const o = /* @__PURE__ */ new Set();
  for (; (u = n.exec(t.content)) !== null; )
    u[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((h) => o.add(h));
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const a = r[1], h = r[2], p = r[3];
    o.has(p) && h === p && Gt.push({
      filePath: e,
      message: `Prop ${R}(${p})${$} is being drilled through ${R}${a}${$} component unmodified.`
    });
  }
}, Po = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ props drilling${F}`,
      description: `👉 ${_}Props should not be forwarded unmodified. Consider refactoring.${F}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], qt = 100, zo = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > qt && Ht.push({ filePath: e, message: `${n.length > qt * 2 ? H : R}(${n.length} lines)${$}` });
}, Vo = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ Long <script> blocks${F}`,
      description: `👉 ${_}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${qt} lines.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], ls = 4, Go = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[1];
    u.length < ls && Ut.push({ filePath: e, message: `${H}(${u})${$}` });
  }
}, Ho = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ short variable names${F}`,
      description: `👉 ${_}Variable names must have a minimum length of ${ls}.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], qo = 5, Uo = (t, e) => {
  if (!t)
    return;
  const n = M("defineProps", ue("<"), ue("("), "{", W(We), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const u = s[0].split(",").length;
    u > qo && Zt.push({ filePath: e, message: `props found ${H}(${u})${$}` });
  }
}, Zo = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ too many props${F}`,
      description: `👉 ${_}Try to refactor your code to use less properties.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], Ko = (t, e) => {
  if (!t)
    return;
  const n = M('v-for="(', k.times.any(), W(J).grouped(), k.times.any(), ",", k.times.any(), W(J).grouped(), k.times.any(), ")", W(k), "in", W(k), W(J).grouped(), [P]), s = M(':key="', k.times.any(), W(J).grouped(), k.times.any(), '"', [P]), u = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  u.forEach((r) => {
    const [a, h, p, d] = r;
    o.forEach((v) => {
      const A = v[1];
      if (A === p) {
        const E = z(t.content.trim(), A);
        Kt.push({
          filePath: e,
          message: `line #${E} ${R}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Yo = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ VFor With Index Key${F}`,
      description: `👉 ${_}Avoid using index as key in v-for loops.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Yt = [], Qo = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s[0], o = s[1], r = z(t.content.trim(), u);
    Yt.push({
      filePath: e,
      message: `line #${r} zero length comparison found ${R}(${o})${$}`
    });
  }
}, Xo = () => {
  const t = [];
  return Yt.length > 0 && Yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ Zero Length Comparison${F}`,
      description: `👉 ${_}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Pe = [], Jo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, a = z(t.content, o);
    if (r > n * 2) {
      Pe.push({
        filePath: e,
        message: `line #${a} ${H}has a v-if with ${r} lines${$}`
      });
      return;
    }
    r > n && Pe.push({
      filePath: e,
      message: `line #${a} ${R}has a v-if with ${r} lines${$}`
    });
  });
}, ei = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ big v-if${F}`,
      description: `👉 ${_}Big v-if can be moved out to its own component.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ze = [], ti = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const r = o.split(`
`).length, a = z(t.content, o);
    if (r > n * 2) {
      ze.push({
        filePath: e,
        message: `line #${a} ${H}has a v-show with ${r} lines${$}`
      });
      return;
    }
    r > n && ze.push({
      filePath: e,
      message: `line #${a} ${R}has a v-show with ${r} lines${$}`
    });
  });
}, ni = () => {
  const t = [];
  return ze.length > 0 && ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${N}rrd ~ big v-show${F}`,
      description: `👉 ${_}Big v-show can be moved out to its own component.${F} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, si = (t, e, n) => {
  const s = {}, u = [], o = ({ file: p, rule: d, title: v, description: A, message: E }) => {
    const C = t === "rule" ? d : p;
    s[C] || (s[C] = []), s[C].push({ file: p, rule: d, title: v, description: A, message: E });
  }, r = (p) => {
    p().forEach((v) => {
      o(v);
    });
  };
  r(vr), r(Ar), r(Sr), r(Rr), r(yr), r(Tr), r(Ir), r(zr), r(Hr), r(Ur), r(Yr), r(Xr), r(eo), r(so), r(oo), r(Lr), r(Nr), r(br), r(hr), r(ei), r(ni), r(ao), r(fo), r(po), r(yo), r(Ao), r(vo), r(So), r(Ro), r(No), r(Lo), r(To), r(Io), r(Po), r(Vo), r(Ho), r(Zo), r(Yo), r(Xo);
  const a = Object.keys(s).sort((p, d) => {
    const v = s[p].length, A = s[d].length;
    return e === "desc" ? A - v : v - A;
  }), h = {};
  return a.forEach((p) => {
    h[p] = [], s[p].forEach((d, v) => {
      h[p][v] = { id: "", description: "", message: "" };
      const A = d.message.includes(H);
      if (u.some((E) => E.file === d.file)) {
        const E = u.find((C) => C.file === d.file);
        E && (A ? E.errors++ : E.warnings++);
      } else
        u.push({ file: d.file, errors: A ? 1 : 0, warnings: A ? 0 : 1 });
      n === "error" && !A || (t === "file" && (h[p][v].id = d.rule), t !== "file" && (h[p][v].id = d.file), h[p][v].description = d.description, h[p][v].message = d.message || "🚨");
    });
  }), { output: h, health: u };
}, De = {
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
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlLink",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "nestedTernary",
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
}, sn = Object.keys(De), ui = (t, e, n) => {
  const s = t.scriptSetup || t.script, u = e.endsWith(".vue"), o = {
    // vue-essential
    simpleProp: () => wr(s, e),
    singleNameComponent: () => u && xr(e),
    globalStyle: () => u && $r(t.styles, e),
    vforNoKey: () => u && Br(t.template, e),
    vifWithVfor: () => u && Or(t.template, e),
    // vue-strong
    simpleComputed: () => no(s, e),
    componentFiles: () => u && Mr(s, e),
    propNameCasing: () => u && Kr(s, e),
    componentFilenameCasing: () => u && Wr(e),
    selfClosingComponents: () => u && Jr(t, e),
    templateSimpleExpression: () => u && ro(t.template, e),
    quotedAttributeValues: () => u && Qr(t, e),
    directiveShorthands: () => u && Pr(t, e),
    fullWordComponentName: () => u && Gr(e),
    multiAttributeElements: () => u && qr(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => u && jr(t.source, e),
    elementAttributeOrder: () => u && _r(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => u && Er(s, e),
    elementSelectorsWithScoped: () => u && fr(t.styles, e),
    // rrd
    bigVif: () => Jo(t.template, e),
    bigVShow: () => ti(t.template, e),
    cyclomaticComplexity: () => co(s, e),
    deepIndentation: () => Do(s, e),
    elseCondition: () => ho(s, e),
    functionSize: () => $o(s, e),
    ifWithoutCurlyBraces: () => xo(s, e),
    magicNumbers: () => Bo(s, e),
    nestedTernary: () => Oo(s, e),
    parameterCount: () => Wo(s, e),
    propsDrilling: () => ko(s, e),
    scriptLength: () => zo(s, e),
    shortVariableName: () => Go(s, e),
    tooManyProps: () => Uo(s, e),
    noPropDestructure: () => _o(s, e),
    noVarDeclaration: () => jo(s, e),
    zeroLengthComparison: () => Qo(s, e),
    htmlLink: () => u && wo(t.template, e),
    plainScript: () => u && Mo(t.script, e),
    vForWithIndexKey: () => u && Ko(t.template, e)
  };
  n.forEach((r) => {
    r in De ? De[r].forEach((a) => {
      a in o && o[a]();
    }) : r in o && o[r]();
  });
}, ri = 1.5, Ln = 75, Wn = 85, Tn = 95, Ds = [...sn, ...Object.values(De).flat()], oi = (t, e, n) => {
  const { errors: s, warnings: u } = t.reduce((a, { errors: h, warnings: p }) => ({ errors: a.errors + h, warnings: a.warnings + p }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found ${H}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${R}${Intl.NumberFormat("en-US").format(u)} warnings${$}, ${se}${Intl.NumberFormat("en-US").format(e)} lines${$} of code in ${se}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const r = Math.ceil((1 - (s * ri + u) / e) * 100);
  return r < Ln && o.push({ info: `${H}Code health is LOW: ${r}%${$}
` }), r >= Ln && r < Wn && o.push({ info: `${R}Code health is MEDIUM ${r}%${$}
` }), r >= Wn && r < Tn && o.push({ info: `${se}Code health is OK: ${r}%${$}
` }), r >= Tn && o.push({ info: `${ss}Code health is GOOD: ${r}%${$}
` }), { errors: s, warnings: u, output: o };
};
function ii(t) {
  const e = [], n = [];
  return Object.entries(De).forEach(([s, u]) => {
    if (u.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = u.filter((r) => t.includes(r));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
let Qt = 0, fs = 0, hs = [];
const ci = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], un = [], de = [], Mn = async (t, e) => {
  if (!un.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    Qt++;
    const n = await fe.readFile(e, "utf-8");
    fs += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Is(n);
    (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), de.push({ info: `Analyzing ${e}...` }), ui(s, e, hs);
  }
}, ps = async (t) => {
  if (!(await fe.stat(t)).isDirectory()) {
    await Mn(t, t);
    return;
  }
  const n = await fe.readdir(t);
  for (const s of n) {
    const u = le.join(t, s);
    (await fe.stat(u)).isDirectory() && !ci.some((r) => u.includes(r)) && !un.some((r) => u.endsWith(r)) && await ps(u), await Mn(u, u);
  }
}, ai = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: u, level: o, orderBy: r }) => {
  const a = e.filter((L) => !n.includes(L)), { rulesets: h, individualRules: p } = ii(a), d = h.length ? `${se}${h.join(", ")}${$}` : "N/A", v = p.length ? `${se}${p.join(", ")}${$}` : "N/A";
  let A = `      Applying ${h.length} rulesets: ${d}`;
  p.length > 0 && (A += `
      Applying ${p.length} individual rules: ${v}`);
  const E = n.filter((L) => !h.includes(L)), C = E.length ? `${se}${E.join(", ")}${$}` : "N/A";
  de.push({ info: `${se}Analyzing Vue, TS and JS files in ${t}${$}` }), de.push({
    info: `${A}
      Ignoring ${E.length} rules/rulesets: ${C}
      Excluding ${s || "-"}
      Output level ${se}${o}${$}
      Grouping by ${se}${u}${$}
      Ordering ${se}${r}${$}`
  }), hs = e.filter((L) => !n.includes(L)), s && un.push(...s.split(",")), await ps(t), de.push({ info: `Found ${se}${Qt}${$} files` });
  const { health: g, output: c } = si(u, r, o), { errors: y, warnings: B, output: j } = oi(g, fs, Qt);
  return !y && !B && de.push({ info: `
${ss}No code smells detected!${$}` }), { output: de, codeHealthOutput: j, reportOutput: c };
}, ds = ["text", "json", "table"], li = ["rule", "file"], Di = ["asc", "desc"], fi = ["all", "error"], hi = {
  groupBy: li,
  orderBy: Di,
  outputLevel: fi,
  outputFormat: ds
}, _e = (t, e) => {
  const n = hi[e];
  return n.includes(t) || (console.error(
    `
Invalid option "${t}" provided for flag "${e}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), t;
}, pi = async () => {
  let t = process.cwd();
  for (; t !== le.parse(t).root; ) {
    const e = le.join(t, "package.json");
    return await fe.access(e), t;
  }
  t = le.dirname(t);
}, In = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(De) : void 0;
  const n = e.split(","), s = [], u = [];
  return n.forEach((o) => {
    sn.includes(o) ? s.push(...De[o]) : Object.values(De).some((r) => r.includes(o)) ? s.push(o) : u.push(o);
  }), u.length > 0 && (console.error(
    `
${H}Invalid ${t} values: ${u.join(
      ", "
    )}${$}. 
${_}Allowed values are: ${Ds.join(", ")}${F}

`
  ), process.exit(1)), s;
}, rn = await pi();
rn || (console.error(`
${H}Cannot find project root.${$}

`), process.exit(1));
const di = JSON.parse(await fe.readFile(le.join(rn, "package.json"), "utf-8")), Ve = [];
let ne = {
  path: "./src",
  apply: Object.values(sn).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  order: "desc",
  output: "text"
};
try {
  const t = le.join(rn, "vue-mess-detector.json"), e = JSON.parse(await fe.readFile(t, "utf-8"));
  ne = { ...ne, ...e }, Ve.push({ info: `👉 Using configuration from ${t}` });
} catch {
  Ve.push({ info: "👉 Using default configuration" });
}
vs(zs(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (t) => t.config(ne).positional("path", {
    describe: "path to the Vue files",
    default: ne.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: Ds,
    coerce: In("apply"),
    group: "Filter Rulesets/Rules:",
    default: ne.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: ne.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (e) => _e(e, "groupBy"),
    default: ne.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (e) => _e(e, "outputLevel"),
    default: ne.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: In("ignore"),
    default: ne.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (e) => _e(e, "orderBy"),
    default: ne.order,
    group: "Order Results:"
  }).option("output", {
    describe: "Output format",
    choices: ds,
    coerce: (e) => _e(e, "outputFormat"),
    default: ne.output,
    group: "Output Format:"
  }),
  (t) => {
    ai({
      dir: t.path,
      apply: t.apply,
      ignore: t.ignore,
      exclude: t.exclude,
      groupBy: t.group,
      level: t.level,
      orderBy: t.order
    }).then((e) => {
      if (t.output == "table") {
        [...Ve, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput) {
          const s = new lr({
            head: ["id", "message"],
            colWidths: [40, 88],
            wordWrap: !0,
            wrapOnWordBoundary: !1
          });
          console.log("--------------------------------------------------------------------------------"), console.log(`Group: ${n}`), console.log(`Description: ${e.reportOutput[n][0].description}`), e.reportOutput[n].forEach((u) => {
            s.push([u.id, u.message]);
          }), console.log(s.toString());
        }
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      if (t.output == "text") {
        [...Ve, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput)
          e.reportOutput[n].forEach((s) => {
            console.log(s.id), console.log(s.description), console.log(s.message);
          });
        e.codeHealthOutput?.forEach((n) => {
          console.log(n.info);
        });
      }
      t.output == "json" && console.log(JSON.stringify(e, null, 2));
    }).catch((e) => {
      console.error(`${H}${e}${$}`);
    });
  }
).version("version", "Show version number", di.version).alias("version", "v").help().argv;
