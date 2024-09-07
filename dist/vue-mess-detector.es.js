import pe from "node:fs/promises";
import Z from "node:path";
import Hs, { format as Yn, inspect as Gs } from "util";
import Us from "os";
import qs from "yargs";
import { normalize as Zs, resolve as $e, dirname as ht, basename as Ks, extname as Ys, relative as Js } from "path";
import { readFileSync as un, statSync as Jn, readdirSync as Qs, writeFile as Xs } from "fs";
import { notStrictEqual as er, strictEqual as tr } from "assert";
import { fileURLToPath as nr } from "url";
import { parse as sr } from "@vue/compiler-sfc";
import on from "node:fs";
import { fileURLToPath as rr } from "node:url";
function ur(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let cn = [], Qn = 0;
const G = (t, e) => {
  Qn >= e && cn.push(t);
};
G.WARN = 1;
G.INFO = 2;
G.DEBUG = 3;
G.reset = () => {
  cn = [];
};
G.setDebugLevel = (t) => {
  Qn = t;
};
G.warn = (t) => G(t, G.WARN);
G.info = (t) => G(t, G.INFO);
G.debug = (t) => G(t, G.DEBUG);
G.debugMessages = () => cn;
var an = G, ln = { exports: {} }, or = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const ir = or;
var cr = (t) => typeof t == "string" ? t.replace(ir(), "") : t, Dn = { exports: {} };
const Xn = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
Dn.exports = Xn;
Dn.exports.default = Xn;
var ar = Dn.exports, lr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const Dr = cr, fr = ar, hr = lr, es = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = Dr(t), t.length === 0))
    return 0;
  t = t.replace(hr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += fr(s) ? 2 : 1);
  }
  return e;
};
ln.exports = es;
ln.exports.default = es;
var pr = ln.exports;
const En = pr;
function ke(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ie(t) {
  let e = ke();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return En(o) > r ? En(o) : r;
  }, 0);
}
function we(t, e) {
  return Array(e + 1).join(t);
}
function dr(t, e, n, s) {
  let r = ie(t);
  if (e + 1 >= r) {
    let o = e - r;
    switch (s) {
      case "right": {
        t = we(n, o) + t;
        break;
      }
      case "center": {
        let u = Math.ceil(o / 2), c = o - u;
        t = we(n, c) + t + we(n, u);
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
function ts(t, e) {
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
    for (let r in t)
      Object.prototype.hasOwnProperty.call(t, r) && delete t[r];
    return;
  }
  let s = Ce[e[0]];
  s && (t[s.set] = s.to);
}
function mr(t) {
  let e = ke(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    ts(s, n), n = e.exec(t);
  return s;
}
function ns(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += Ce[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function gr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = Ce[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Fr(t, e) {
  if (t.length === ie(t))
    return t.substr(0, e);
  for (; ie(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Cr(t, e) {
  let n = ke(!0), s = t.split(ke()), r = 0, o = 0, u = "", c, f = {};
  for (; o < e; ) {
    c = n.exec(t);
    let p = s[r];
    if (r++, o + ie(p) > e && (p = Fr(p, e - o)), u += p, o += ie(p), o < e) {
      if (!c)
        break;
      u += c[0], ts(f, c);
    }
  }
  return ns(f, u);
}
function Er(t, e, n) {
  if (n = n || "…", ie(t) <= e)
    return t;
  e -= ie(n);
  let r = Cr(t, e);
  r += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !r.includes(o) && (r += o), r;
}
function $r() {
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
function br(t, e) {
  t = t || {}, e = e || $r();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function yr(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, u;
  for (let c = 0; c < s.length; c += 2) {
    let f = s[c], p = o + ie(f);
    o > 0 && u && (p += u.length), p > t ? (o !== 0 && n.push(r.join("")), r = [f], o = ie(f)) : (r.push(u || "", f), o = p), u = s[c + 1];
  }
  return o && n.push(r.join("")), n;
}
function wr(t, e) {
  let n = [], s = "";
  function r(u, c) {
    for (s.length && c && (s += c), s += u; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let u = 0; u < o.length; u += 2)
    r(o[u], u && o[u - 1]);
  return s.length && n.push(s), n;
}
function xr(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? yr : wr;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, r(t, e[o]));
  return s;
}
function Ar(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = gr(e, t[s]);
    e = mr(r);
    let o = Object.assign({}, e);
    n.push(ns(o, r));
  }
  return n;
}
function vr(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var ss = {
  strlen: ie,
  repeat: we,
  pad: dr,
  truncate: Er,
  mergeOptions: br,
  wordWrap: xr,
  colorizeLines: Ar,
  hyperlink: vr
}, rs = { exports: {} }, Ue = { exports: {} }, Ke = { exports: {} }, Ye = { exports: {} }, Je = { exports: {} }, $n;
function Br() {
  return $n || ($n = 1, function(t) {
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
      var r = n[s], o = e[s] = [];
      o.open = "\x1B[" + r[0] + "m", o.close = "\x1B[" + r[1] + "m";
    });
  }(Je)), Je.exports;
}
var Qe, bn;
function Sr() {
  return bn || (bn = 1, Qe = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Qe;
}
var Xe, yn;
function Or() {
  if (yn) return Xe;
  yn = 1;
  var t = Us, e = Sr(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function r(c) {
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
  function u(c) {
    var f = o(c);
    return r(f);
  }
  return Xe = {
    supportsColor: u,
    stdout: u(process.stdout),
    stderr: u(process.stderr)
  }, Xe;
}
var et = { exports: {} }, wn;
function Rr() {
  return wn || (wn = 1, function(t) {
    t.exports = function(n, s) {
      var r = "";
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
      return n.forEach(function(u) {
        u = u.toLowerCase();
        var c = o[u] || [" "], f = Math.floor(Math.random() * c.length);
        typeof o[u] < "u" ? r += o[u][f] : r += u;
      }), r;
    };
  }(et)), et.exports;
}
var tt = { exports: {} }, xn;
function _r() {
  return xn || (xn = 1, function(t) {
    t.exports = function(n, s) {
      n = n || "   he is here   ";
      var r = {
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
      }, o = [].concat(r.up, r.down, r.mid);
      function u(p) {
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
                y.up = u(8), y.mid = u(2), y.down = u(8);
                break;
              case "maxi":
                y.up = u(16) + 3, y.mid = u(4) + 1, y.down = u(64) + 3;
                break;
              default:
                y.up = u(8) + 1, y.mid = u(6) / 2, y.down = u(8) + 1;
                break;
            }
            var C = ["up", "mid", "down"];
            for (var F in C)
              for (var a = C[F], w = 0; w <= y[a]; w++)
                d[a] && (A = A + r[a][u(r[a].length)]);
          }
        return A;
      }
      return f(n, s);
    };
  }(tt)), tt.exports;
}
var nt = { exports: {} }, An;
function Nr() {
  return An || (An = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
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
  }(nt)), nt.exports;
}
var st = { exports: {} }, vn;
function Lr() {
  return vn || (vn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(st)), st.exports;
}
var rt = { exports: {} }, Bn;
function jr() {
  return Bn || (Bn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(rt)), rt.exports;
}
var ut = { exports: {} }, Sn;
function Tr() {
  return Sn || (Sn = 1, function(t) {
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
      return function(s, r, o) {
        return s === " " ? s : e[n[Math.round(Math.random() * (n.length - 2))]](s);
      };
    };
  }(ut)), ut.exports;
}
var On;
function Wr() {
  return On || (On = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Hs, s = e.styles = Br(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = Or().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(F) {
      return ("" + F).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(a, w) {
      if (!e.enabled)
        return a + "";
      var B = s[w];
      return !B && w in e ? e[w](a) : B.open + a + B.close;
    };
    var u = /[|\\{}()[\]^$+*?.]/g, c = function(F) {
      if (typeof F != "string")
        throw new TypeError("Expected a string");
      return F.replace(u, "\\$&");
    };
    function f(F) {
      var a = function w() {
        return A.apply(w, arguments);
      };
      return a._styles = F, a.__proto__ = d, a;
    }
    var p = function() {
      var F = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(a) {
        s[a].closeRe = new RegExp(c(s[a].close), "g"), F[a] = {
          get: function() {
            return f(this._styles.concat(a));
          }
        };
      }), F;
    }(), d = r(function() {
    }, p);
    function A() {
      var F = Array.prototype.slice.call(arguments), a = F.map(function(T) {
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
    e.setTheme = function(F) {
      if (typeof F == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var a in F)
        (function(w) {
          e[w] = function(B) {
            if (typeof F[w] == "object") {
              var L = B;
              for (var W in F[w])
                L = e[F[w][W]](L);
              return L;
            }
            return e[F[w]](B);
          };
        })(a);
    };
    function y() {
      var F = {};
      return Object.keys(p).forEach(function(a) {
        F[a] = {
          get: function() {
            return f([a]);
          }
        };
      }), F;
    }
    var E = function(a, w) {
      var B = w.split("");
      return B = B.map(a), B.join("");
    };
    e.trap = Rr(), e.zalgo = _r(), e.maps = {}, e.maps.america = Nr()(e), e.maps.zebra = Lr()(e), e.maps.rainbow = jr()(e), e.maps.random = Tr()(e);
    for (var C in e.maps)
      (function(F) {
        e[F] = function(a) {
          return E(e.maps[F], a);
        };
      })(C);
    r(e, y());
  }(Ye)), Ye.exports;
}
var Rn;
function Ir() {
  return Rn || (Rn = 1, function(t) {
    var e = Wr();
    t.exports = e;
  }(Ke)), Ke.exports;
}
const { info: Mr, debug: us } = an, K = ss;
let kr = class je {
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
    let s = this.options.chars || {}, r = e.chars, o = this.chars = {};
    zr.forEach(function(f) {
      ot(s, r, f, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let u = this.options.style = this.options.style || {}, c = e.style;
    ot(u, c, "padding-left", this), ot(u, c, "padding-right", this), this.head = u.head || c.head, this.border = u.border || c.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = K.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let u = 1;
        for (; u < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + u], u++;
      }
      const { wrapOnWordBoundary: r = !0 } = e, { wrapOnWordBoundary: o = r } = this.options;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Nn, -1), this.height = this.heights.reduce(Nn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    e || Mr(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
    let r = Math.max(this.height - this.lines.length, 0), o;
    switch (this.vAlign) {
      case "center":
        o = Math.ceil(r / 2);
        break;
      case "bottom":
        o = r;
        break;
      default:
        o = 0;
    }
    if (e < o || e >= o + this.lines.length)
      return this.drawEmpty(this.drawRight, n);
    let u = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - o, this.drawRight, u, n);
  }
  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(e) {
    let n = [];
    return this.cells ? this.widths.forEach(function(s, r) {
      n.push(this._topLeftChar(r)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(K.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof je.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof je.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof je.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = Ir();
        for (let r = this[e].length - 1; r >= 0; r--)
          s = s[this[e][r]];
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
  drawLine(e, n, s, r) {
    let o = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && r && this.cells) {
      let y = this.cells[this.y + r][this.x - 1];
      for (; y instanceof pt; )
        y = this.cells[y.y][y.x - 1];
      y instanceof dt || (o = this.chars.rightMid);
    }
    let u = K.repeat(" ", this.paddingLeft), c = n ? this.chars.right : "", f = K.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let A = K.truncate(p, d, this.truncate);
    return A = K.pad(A, d, " ", this.hAlign), A = u + A + f, this.stylizeLine(o, A, c);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = K.repeat(this.chars.bottom, this.width), r = e ? this.chars.bottomRight : "";
    return this.wrapWithStyleColors("border", n + s + r);
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
      let u = this.cells[this.y + n][this.x - 1];
      for (; u instanceof pt; )
        u = this.cells[u.y][u.x - 1];
      u instanceof dt || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = K.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, pt = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && us(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, dt = class {
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
    this.cellOffset = n - s, this.offset = Pr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (us(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function _n(...t) {
  return t.filter((e) => e != null).shift();
}
function ot(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = _n(t[r], t[n], e[r], e[n])) : s[n] = _n(t[n], e[n]);
}
function Pr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function Nn(t, e) {
  return t + e + 1;
}
let zr = [
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
Ue.exports = kr;
Ue.exports.ColSpanCell = pt;
Ue.exports.RowSpanCell = dt;
var Vr = Ue.exports;
const { warn: Hr, debug: Gr } = an, mt = Vr, { ColSpanCell: Ur, RowSpanCell: qr } = mt;
(function() {
  function t(E, C) {
    return E[C] > 0 ? t(E, C + 1) : C;
  }
  function e(E) {
    let C = {};
    E.forEach(function(F, a) {
      let w = 0;
      F.forEach(function(B) {
        B.y = a, B.x = a ? t(C, w) : w;
        const L = B.rowSpan || 1, W = B.colSpan || 1;
        if (L > 1)
          for (let T = 0; T < W; T++)
            C[B.x + T] = L;
        w = B.x + W;
      }), Object.keys(C).forEach((B) => {
        C[B]--, C[B] < 1 && delete C[B];
      });
    });
  }
  function n(E) {
    let C = 0;
    return E.forEach(function(F) {
      F.forEach(function(a) {
        C = Math.max(C, a.x + (a.colSpan || 1));
      });
    }), C;
  }
  function s(E) {
    return E.length;
  }
  function r(E, C) {
    let F = E.y, a = E.y - 1 + (E.rowSpan || 1), w = C.y, B = C.y - 1 + (C.rowSpan || 1), L = !(F > B || w > a), W = E.x, T = E.x - 1 + (E.colSpan || 1), de = C.x, te = C.x - 1 + (C.colSpan || 1), me = !(W > te || de > T);
    return L && me;
  }
  function o(E, C, F) {
    let a = Math.min(E.length - 1, F), w = { x: C, y: F };
    for (let B = 0; B <= a; B++) {
      let L = E[B];
      for (let W = 0; W < L.length; W++)
        if (r(w, L[W]))
          return !0;
    }
    return !1;
  }
  function u(E, C, F, a) {
    for (let w = F; w < a; w++)
      if (o(E, w, C))
        return !1;
    return !0;
  }
  function c(E) {
    E.forEach(function(C, F) {
      C.forEach(function(a) {
        for (let w = 1; w < a.rowSpan; w++) {
          let B = new qr(a);
          B.x = a.x, B.y = a.y + w, B.colSpan = a.colSpan, p(B, E[F + w]);
        }
      });
    });
  }
  function f(E) {
    for (let C = E.length - 1; C >= 0; C--) {
      let F = E[C];
      for (let a = 0; a < F.length; a++) {
        let w = F[a];
        for (let B = 1; B < w.colSpan; B++) {
          let L = new Ur();
          L.x = w.x + B, L.y = w.y, F.splice(a + 1, 0, L);
        }
      }
    }
  }
  function p(E, C) {
    let F = 0;
    for (; F < C.length && C[F].x < E.x; )
      F++;
    C.splice(F, 0, E);
  }
  function d(E) {
    let C = s(E), F = n(E);
    Gr(`Max rows: ${C}; Max cols: ${F}`);
    for (let a = 0; a < C; a++)
      for (let w = 0; w < F; w++)
        if (!o(E, w, a)) {
          let B = { x: w, y: a, colSpan: 1, rowSpan: 1 };
          for (w++; w < F && !o(E, w, a); )
            B.colSpan++, w++;
          let L = a + 1;
          for (; L < C && u(E, L, B.x, B.x + B.colSpan); )
            B.rowSpan++, L++;
          let W = new mt(B);
          W.x = B.x, W.y = B.y, Hr(`Missing cell at ${W.y}-${W.x}.`), p(W, E[a]);
        }
  }
  function A(E) {
    return E.map(function(C) {
      if (!Array.isArray(C)) {
        let F = Object.keys(C)[0];
        C = C[F], Array.isArray(C) ? (C = C.slice(), C.unshift(F)) : C = [F, C];
      }
      return C.map(function(F) {
        return new mt(F);
      });
    });
  }
  function y(E) {
    let C = A(E);
    return e(C), d(C), c(C), f(C), C;
  }
  rs.exports = {
    makeTableLayout: y,
    layoutTable: e,
    addRowSpanCells: c,
    maxWidth: n,
    fillInTable: d,
    computeWidths: Ln("colSpan", "desiredWidth", "x", 1),
    computeHeights: Ln("rowSpan", "desiredHeight", "y", 1)
  };
})();
function Ln(t, e, n, s) {
  return function(r, o) {
    let u = [], c = [], f = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? c.push(d) : u[d[n]] = Math.max(u[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(p, d) {
      typeof p == "number" && (u[d] = p);
    });
    for (let p = c.length - 1; p >= 0; p--) {
      let d = c[p], A = d[t], y = d[n], E = u[y], C = typeof r[y] == "number" ? 0 : 1;
      if (typeof E == "number")
        for (let F = 1; F < A; F++)
          E += 1 + u[y + F], typeof r[y + F] != "number" && C++;
      else
        E = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!f[y] || f[y] < E) && (f[y] = E);
      if (d[e] > E) {
        let F = 0;
        for (; C > 0 && d[e] > E; ) {
          if (typeof r[y + F] != "number") {
            let a = Math.round((d[e] - E) / C);
            E += a, u[y + F] += a, C--;
          }
          F++;
        }
      }
    }
    Object.assign(r, u, f);
    for (let p = 0; p < r.length; p++)
      r[p] = Math.max(s, r[p] || 0);
  };
}
var Zr = rs.exports;
const le = an, Kr = ss, it = Zr;
let os = class extends Array {
  constructor(e) {
    super();
    const n = Kr.mergeOptions(e);
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
    let s = it.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(u) {
        u.mergeTableOptions(this.options, s);
      }, this);
    }, this), it.computeWidths(this.options.colWidths, s), it.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(u) {
        u.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let u = s[o], c = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && ct(u, "top", r);
      for (let f = 0; f < c; f++)
        ct(u, f, r);
      o + 1 == s.length && ct(u, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
os.reset = () => le.reset();
function ct(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Yr = os, Jr = Yr;
const Qr = /* @__PURE__ */ ur(Jr);
class Ae extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Ae);
  }
}
function is() {
  return Xr() ? 0 : 1;
}
function Xr() {
  return eu() && !process.defaultApp;
}
function eu() {
  return !!process.versions.electron;
}
function tu(t) {
  return t.slice(is() + 1);
}
function nu() {
  return process.argv[is()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function xe(t) {
  if (t !== t.toLowerCase() && t !== t.toUpperCase() || (t = t.toLowerCase()), t.indexOf("-") === -1 && t.indexOf("_") === -1)
    return t;
  {
    let n = "", s = !1;
    const r = t.match(/^-+/);
    for (let o = r ? r[0].length : 0; o < t.length; o++) {
      let u = t.charAt(o);
      s && (s = !1, u = u.toUpperCase()), o !== 0 && (u === "-" || u === "_") ? s = !0 : u !== "-" && u !== "_" && (n += u);
    }
    return n;
  }
}
function cs(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const o = n.charAt(r), u = t.charAt(r);
    o !== u && r > 0 ? s += `${e}${n.charAt(r)}` : s += u;
  }
  return s;
}
function as(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function su(t) {
  if (Array.isArray(t))
    return t.map((u) => typeof u != "string" ? u + "" : u);
  t = t.trim();
  let e = 0, n = null, s = null, r = null;
  const o = [];
  for (let u = 0; u < t.length; u++) {
    if (n = s, s = t.charAt(u), s === " " && !r) {
      n !== " " && e++;
      continue;
    }
    s === r ? r = null : (s === "'" || s === '"') && !r && (r = s), o[e] || (o[e] = ""), o[e] += s;
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
class ru {
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
    }, n), r = su(e), o = typeof e == "string", u = uu(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), c = Object.assign({
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
    }, s.configuration), f = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, A = c["populate--"], y = A ? "--" : "_", E = /* @__PURE__ */ Object.create(null), C = /* @__PURE__ */ Object.create(null), F = s.__ || ae.format, a = {
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
    })), Ws(s.key, u, s.default, a.arrays), Object.keys(f).forEach(function(i) {
      (a.aliases[i] || []).forEach(function(D) {
        f[D] = f[i];
      });
    });
    let L = null;
    Vs();
    let W = [];
    const T = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), de = {};
    for (let i = 0; i < r.length; i++) {
      const D = r[i], g = D.replace(/^-{3,}/, "---");
      let h, l, x, b, v, H;
      if (D !== "--" && /^-/.test(D) && Ne(D))
        te(D);
      else if (g.match(/^---+(=|$)/)) {
        te(D);
        continue;
      } else if (D.match(/^--.+=/) || !c["short-option-groups"] && D.match(/^-.+=/))
        b = D.match(/^--?([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && (R(b[1], a.arrays) ? i = Re(i, b[1], r, b[2]) : R(b[1], a.nargs) !== !1 ? i = me(i, b[1], r, b[2]) : M(b[1], b[2], !0));
      else if (D.match(B) && c["boolean-negation"])
        b = D.match(B), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], M(l, R(l, a.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !c["short-option-groups"] && D.match(/^-[^-]+/))
        b = D.match(/^--?(.+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], R(l, a.arrays) ? i = Re(i, l, r) : R(l, a.nargs) !== !1 ? i = me(i, l, r) : (v = r[i + 1], v !== void 0 && (!v.match(/^-/) || v.match(w)) && !R(l, a.bools) && !R(l, a.counts) || /^(true|false)$/.test(v) ? (M(l, v), i++) : M(l, ge(l))));
      else if (D.match(/^-.\..+=/))
        b = D.match(/^-([^=]+)=([\s\S]*)$/), b !== null && Array.isArray(b) && b.length >= 3 && M(b[1], b[2]);
      else if (D.match(/^-.\..+/) && !D.match(w))
        v = r[i + 1], b = D.match(/^-(.\..+)/), b !== null && Array.isArray(b) && b.length >= 2 && (l = b[1], v !== void 0 && !v.match(/^-/) && !R(l, a.bools) && !R(l, a.counts) ? (M(l, v), i++) : M(l, ge(l)));
      else if (D.match(/^-[^-]+/) && !D.match(w)) {
        x = D.slice(1, -1).split(""), h = !1;
        for (let U = 0; U < x.length; U++) {
          if (v = D.slice(U + 2), x[U + 1] && x[U + 1] === "=") {
            H = D.slice(U + 3), l = x[U], R(l, a.arrays) ? i = Re(i, l, r, H) : R(l, a.nargs) !== !1 ? i = me(i, l, r, H) : M(l, H), h = !0;
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
        l = D.slice(-1)[0], !h && l !== "-" && (R(l, a.arrays) ? i = Re(i, l, r) : R(l, a.nargs) !== !1 ? i = me(i, l, r) : (v = r[i + 1], v !== void 0 && (!/^(-|--)[^-]/.test(v) || v.match(w)) && !R(l, a.bools) && !R(l, a.counts) || /^(true|false)$/.test(v) ? (M(l, v), i++) : M(l, ge(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(w) && R(D.slice(1), a.bools))
        l = D.slice(1), M(l, ge(l));
      else if (D === "--") {
        W = r.slice(i + 1);
        break;
      } else if (c["halt-at-non-option"]) {
        W = r.slice(i);
        break;
      } else
        te(D);
    }
    gn(T, !0), gn(T, !1), Ns(T), Ls(), Fn(T, a.aliases, f, !0), js(T), c["set-placeholder-key"] && Ts(T), Object.keys(a.counts).forEach(function(i) {
      be(T, i.split(".")) || M(i, 0);
    }), A && W.length && (T[y] = []), W.forEach(function(i) {
      T[y].push(i);
    }), c["camel-case-expansion"] && c["strip-dashed"] && Object.keys(T).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete T[i];
    }), c["strip-aliased"] && [].concat(...Object.keys(u).map((i) => u[i])).forEach((i) => {
      c["camel-case-expansion"] && i.includes("-") && delete T[i.split(".").map((D) => xe(D)).join(".")], delete T[i];
    });
    function te(i) {
      const D = _e("_", i);
      (typeof D == "string" || typeof D == "number") && T._.push(D);
    }
    function me(i, D, g, h) {
      let l, x = R(D, a.nargs);
      if (x = typeof x != "number" || isNaN(x) ? 1 : x, x === 0)
        return ce(h) || (L = Error(F("Argument unexpected for: %s", D))), M(D, ge(D)), i;
      let b = ce(h) ? 0 : 1;
      if (c["nargs-eats-options"])
        g.length - (i + 1) + b < x && (L = Error(F("Not enough arguments following: %s", D))), b = x;
      else {
        for (l = i + 1; l < g.length && (!g[l].match(/^-[^0-9]/) || g[l].match(w) || Ne(g[l])); l++)
          b++;
        b < x && (L = Error(F("Not enough arguments following: %s", D)));
      }
      let v = Math.min(b, x);
      for (!ce(h) && v > 0 && (M(D, h), v--), l = i + 1; l < v + i + 1; l++)
        M(D, g[l]);
      return i + v;
    }
    function Re(i, D, g, h) {
      let l = [], x = h || g[i + 1];
      const b = R(D, a.nargs);
      if (R(D, a.bools) && !/^(true|false)$/.test(x))
        l.push(!0);
      else if (ce(x) || ce(h) && /^-/.test(x) && !w.test(x) && !Ne(x)) {
        if (f[D] !== void 0) {
          const v = f[D];
          l = Array.isArray(v) ? v : [v];
        }
      } else {
        ce(h) || l.push(qe(D, h, !0));
        for (let v = i + 1; v < g.length && !(!c["greedy-arrays"] && l.length > 0 || b && typeof b == "number" && l.length >= b || (x = g[v], /^-/.test(x) && !w.test(x) && !Ne(x))); v++)
          i = v, l.push(qe(D, x, o));
      }
      return typeof b == "number" && (b && l.length < b || isNaN(b) && l.length === 0) && (L = Error(F("Not enough arguments following: %s", D))), M(D, l), i;
    }
    function M(i, D, g = o) {
      if (/-/.test(i) && c["camel-case-expansion"]) {
        const x = i.split(".").map(function(b) {
          return xe(b);
        }).join(".");
        mn(i, x);
      }
      const h = qe(i, D, g), l = i.split(".");
      ye(T, l, h), a.aliases[i] && a.aliases[i].forEach(function(x) {
        const b = x.split(".");
        ye(T, b, h);
      }), l.length > 1 && c["dot-notation"] && (a.aliases[l[0]] || []).forEach(function(x) {
        let b = x.split(".");
        const v = [].concat(l);
        v.shift(), b = b.concat(v), (a.aliases[i] || []).includes(b.join(".")) || ye(T, b, h);
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
    function mn(i, D) {
      a.aliases[i] && a.aliases[i].length || (a.aliases[i] = [D], E[D] = !0), a.aliases[D] && a.aliases[D].length || mn(D, i);
    }
    function qe(i, D, g) {
      g && (D = ou(D)), (R(i, a.bools) || R(i, a.counts)) && typeof D == "string" && (D = D === "true");
      let h = Array.isArray(D) ? D.map(function(l) {
        return _e(i, l);
      }) : _e(i, D);
      return R(i, a.counts) && (ce(h) || typeof h == "boolean") && (h = at()), R(i, a.normalize) && R(i, a.arrays) && (Array.isArray(D) ? h = D.map((l) => ae.normalize(l)) : h = ae.normalize(D)), h;
    }
    function _e(i, D) {
      return !c["parse-positional-numbers"] && i === "_" || !R(i, a.strings) && !R(i, a.bools) && !Array.isArray(D) && (as(D) && c["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !ce(D) && R(i, a.numbers)) && (D = Number(D)), D;
    }
    function Ns(i) {
      const D = /* @__PURE__ */ Object.create(null);
      Fn(D, a.aliases, f), Object.keys(a.configs).forEach(function(g) {
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
            Ze(l);
          } catch (l) {
            l.name === "PermissionDenied" ? L = l : i[g] && (L = Error(F("Invalid JSON config file: %s", h)));
          }
      });
    }
    function Ze(i, D) {
      Object.keys(i).forEach(function(g) {
        const h = i[g], l = D ? D + "." + g : g;
        typeof h == "object" && h !== null && !Array.isArray(h) && c["dot-notation"] ? Ze(h, l) : (!be(T, l.split(".")) || R(l, a.arrays) && c["combine-arrays"]) && M(l, h);
      });
    }
    function Ls() {
      typeof p < "u" && p.forEach(function(i) {
        Ze(i);
      });
    }
    function gn(i, D) {
      if (typeof d > "u")
        return;
      const g = typeof d == "string" ? d : "", h = ae.env();
      Object.keys(h).forEach(function(l) {
        if (g === "" || l.lastIndexOf(g, 0) === 0) {
          const x = l.split("__").map(function(b, v) {
            return v === 0 && (b = b.substring(g.length)), xe(b);
          });
          (D && a.configs[x.join(".")] || !D) && !be(i, x) && M(x.join("."), h[l]);
        }
      });
    }
    function js(i) {
      let D;
      const g = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(h) {
        if (!g.has(h) && (D = R(h, a.coercions), typeof D == "function"))
          try {
            const l = _e(h, D(i[h]));
            [].concat(a.aliases[h] || [], h).forEach((x) => {
              g.add(x), i[x] = l;
            });
          } catch (l) {
            L = l;
          }
      });
    }
    function Ts(i) {
      return a.keys.forEach((D) => {
        ~D.indexOf(".") || typeof i[D] > "u" && (i[D] = void 0);
      }), i;
    }
    function Fn(i, D, g, h = !1) {
      Object.keys(g).forEach(function(l) {
        be(i, l.split(".")) || (ye(i, l.split("."), g[l]), h && (C[l] = !0), (D[l] || []).forEach(function(x) {
          be(i, x.split(".")) || ye(i, x.split("."), g[l]);
        }));
      });
    }
    function be(i, D) {
      let g = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        g = g[l] || {};
      });
      const h = D[D.length - 1];
      return typeof g != "object" ? !1 : h in g;
    }
    function ye(i, D, g) {
      let h = i;
      c["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(H) {
        H = jn(H), typeof h == "object" && h[H] === void 0 && (h[H] = {}), typeof h[H] != "object" || Array.isArray(h[H]) ? (Array.isArray(h[H]) ? h[H].push({}) : h[H] = [h[H], {}], h = h[H][h[H].length - 1]) : h = h[H];
      });
      const l = jn(D[D.length - 1]), x = R(D.join("."), a.arrays), b = Array.isArray(g);
      let v = c["duplicate-arguments-array"];
      !v && R(l, a.nargs) && (v = !0, (!ce(h[l]) && a.nargs[l] === 1 || Array.isArray(h[l]) && h[l].length === a.nargs[l]) && (h[l] = void 0)), g === at() ? h[l] = at(h[l]) : Array.isArray(h[l]) ? v && x && b ? h[l] = c["flatten-duplicate-arrays"] ? h[l].concat(g) : (Array.isArray(h[l][0]) ? h[l] : [h[l]]).concat([g]) : !v && !!x == !!b ? h[l] = g : h[l] = h[l].concat([g]) : h[l] === void 0 && x ? h[l] = b ? g : [g] : v && !(h[l] === void 0 || R(l, a.counts) || R(l, a.bools)) ? h[l] = [h[l], g] : h[l] = g;
    }
    function Ws(...i) {
      i.forEach(function(D) {
        Object.keys(D || {}).forEach(function(g) {
          a.aliases[g] || (a.aliases[g] = [].concat(u[g] || []), a.aliases[g].concat(g).forEach(function(h) {
            if (/-/.test(h) && c["camel-case-expansion"]) {
              const l = xe(h);
              l !== g && a.aliases[g].indexOf(l) === -1 && (a.aliases[g].push(l), E[l] = !0);
            }
          }), a.aliases[g].concat(g).forEach(function(h) {
            if (h.length > 1 && /[A-Z]/.test(h) && c["camel-case-expansion"]) {
              const l = cs(h, "-");
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
    function Is(i, ...D) {
      return [].concat(...D).some(function(h) {
        const l = i.match(h);
        return l && Cn(l[1]);
      });
    }
    function Ms(i) {
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
    function Ne(i) {
      return c["unknown-options-as-args"] && ks(i);
    }
    function ks(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(w) || Ms(i) ? !1 : !Is(i, /^-+([^=]+?)=[\s\S]*$/, B, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ge(i) {
      return !R(i, a.bools) && !R(i, a.counts) && `${i}` in f ? f[i] : Ps(zs(i));
    }
    function Ps(i) {
      return {
        [se.BOOLEAN]: !0,
        [se.STRING]: "",
        [se.NUMBER]: void 0,
        [se.ARRAY]: []
      }[i];
    }
    function zs(i) {
      let D = se.BOOLEAN;
      return R(i, a.strings) ? D = se.STRING : R(i, a.numbers) ? D = se.NUMBER : R(i, a.bools) ? D = se.BOOLEAN : R(i, a.arrays) && (D = se.ARRAY), D;
    }
    function ce(i) {
      return i === void 0;
    }
    function Vs() {
      Object.keys(a.counts).find((i) => R(i, a.arrays) ? (L = Error(F("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : R(i, a.nargs) ? (L = Error(F("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, a.aliases),
      argv: Object.assign(de, T),
      configuration: c,
      defaulted: Object.assign({}, C),
      error: L,
      newAliases: Object.assign({}, E)
    };
  }
}
function uu(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(r) {
    e.push([].concat(t[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < e.length; r++)
      for (let o = r + 1; o < e.length; o++)
        if (e[r].filter(function(c) {
          return e[o].indexOf(c) !== -1;
        }).length) {
          e[r] = e[r].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(r) {
    r = r.filter(function(u, c, f) {
      return f.indexOf(u) === c;
    });
    const o = r.pop();
    o !== void 0 && typeof o == "string" && (n[o] = r);
  }), n;
}
function at(t) {
  return t !== void 0 ? t + 1 : 1;
}
function jn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function ou(t) {
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
var lt, Dt, ft;
const Tn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Wn = (Dt = (lt = process == null ? void 0 : process.versions) === null || lt === void 0 ? void 0 : lt.node) !== null && Dt !== void 0 ? Dt : (ft = process == null ? void 0 : process.version) === null || ft === void 0 ? void 0 : ft.slice(1);
if (Wn && Number(Wn.match(/^([^.]+)/)[1]) < Tn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Tn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const iu = process ? process.env : {}, ls = new ru({
  cwd: process.cwd,
  env: () => iu,
  format: Yn,
  normalize: Zs,
  resolve: $e,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(un(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Oe = function(e, n) {
  return ls.parse(e.slice(), n).argv;
};
Oe.detailed = function(t, e) {
  return ls.parse(t.slice(), e);
};
Oe.camelCase = xe;
Oe.decamelize = cs;
Oe.looksLikeNumber = as;
const cu = {
  right: pu,
  center: du
}, au = 0, Te = 1, lu = 2, We = 3;
class Du {
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
`).map((r) => r.split("	"));
    let s = 0;
    return n.forEach((r) => {
      r.length > 1 && Y.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), Y.stringWidth(r[0])));
    }), n.forEach((r) => {
      this.div(...r.map((o, u) => ({
        text: o.trim(),
        padding: this.measurePadding(o),
        width: u === 0 && r.length > 1 ? s : void 0
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
    return this.rasterize(e).forEach((s, r) => {
      let o = "";
      s.forEach((u, c) => {
        const { width: f } = e[c], p = this.negatePadding(e[c]);
        let d = u;
        if (p > Y.stringWidth(u) && (d += " ".repeat(p - Y.stringWidth(u))), e[c].align && e[c].align !== "left" && this.wrap) {
          const y = cu[e[c].align];
          d = y(d, p), Y.stringWidth(d) < p && (d += " ".repeat((f || 0) - Y.stringWidth(d) - 1));
        }
        const A = e[c].padding || [0, 0, 0, 0];
        A[We] && (o += " ".repeat(A[We])), o += In(e[c], d, "| "), o += d, o += In(e[c], d, " |"), A[Te] && (o += " ".repeat(A[Te])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, o = n.text, u = Y.stringWidth(o.trimRight());
    return n.span ? this.wrap ? r < u ? e : (n.hidden = !0, o.trimRight() + " ".repeat(r - u) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((o, u) => {
      o.width = s[u], this.wrap ? r = Y.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : r = o.text.split(`
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[au] || 0).fill("")), r.push(...new Array(o.padding[lu] || 0).fill(""))), r.forEach((c, f) => {
        n[f] || n.push([]);
        const p = n[f];
        for (let d = 0; d < u; d++)
          p[d] === void 0 && p.push("");
        p.push(c);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[We] || 0) + (e.padding[Te] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((u) => u.width || Y.stringWidth(u.text));
    let n = e.length, s = this.width;
    const r = e.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), o = n ? Math.floor(s / n) : 0;
    return r.map((u, c) => u === void 0 ? Math.max(o, fu(e[c])) : u);
  }
}
function In(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function fu(t) {
  const e = t.padding || [], n = 1 + (e[We] || 0) + (e[Te] || 0);
  return t.border ? n + 4 : n;
}
function hu() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function pu(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function du(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Y;
function mu(t, e) {
  return Y = e, new Du({
    width: t?.width || hu(),
    wrap: t?.wrap
  });
}
const Ds = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function fs(t) {
  return t.replace(Ds, "");
}
function gu(t, e) {
  const [n, s] = t.match(Ds) || ["", ""];
  t = fs(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Fu(t) {
  return mu(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: fs,
    wrap: gu
  });
}
function Cu(t, e) {
  let n = $e(".", t), s;
  for (Jn(n).isDirectory() || (n = ht(n)); ; ) {
    if (s = e(n, Qs(n)), s) return $e(n, s);
    if (n = ht(s = n), s === n) break;
  }
}
const Eu = {
  fs: {
    readFileSync: un,
    writeFile: Xs
  },
  format: Yn,
  resolve: $e,
  exists: (t) => {
    try {
      return Jn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let ne;
class $u {
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
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), r = e.shift();
    let o = function() {
    };
    typeof e[e.length - 1] == "function" && (o = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let u = r === 1 ? n : s;
    this.cache[this.locale][n] && (u = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o();
    const c = [u];
    return ~u.indexOf("%d") && c.push(r), ne.format.apply(ne.format, c.concat(e));
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
    return e.forEach(function(r, o) {
      const u = n[o + 1];
      s += r, typeof u < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, r = n.locale, o = n.cb, u = this._resolveLocaleFile(s, r), c = JSON.stringify(this.cache[r], null, 2);
    ne.fs.writeFile(u, c, "utf-8", function(f) {
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
      const r = ne.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(e) {
    return ne.exists(e);
  }
}
function bu(t, e) {
  ne = e;
  const n = new $u(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const yu = (t) => bu(t, Eu), wu = "require is not supported by ESM", Mn = "loading a directory of commands is not supported yet for ESM";
let ve;
try {
  ve = nr(import.meta.url);
} catch {
  ve = process.cwd();
}
const xu = ve.substring(0, ve.lastIndexOf("node_modules"));
er, tr, Gs, xu || process.cwd(), Ks, ht, Ys, Js, $e, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, un, yu({
  directory: $e(ve, "../../../locales"),
  updateFiles: !1
});
let hs = !1;
const Au = (t) => {
  hs = t;
}, vu = () => hs, Q = "\x1B[44m", N = "\x1B[43m", k = "\x1B[41m", gt = "\x1B[42m", $ = "\x1B[0m", _ = "\x1B[33m", S = "\x1B[36m", m = "\x1B[0m", fe = {
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
}, fn = Object.keys(fe), Bu = 1.5, kn = 75, Pn = 85, zn = 95, ps = [...fn, ...Object.values(fe).flat()], Su = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((y, { errors: E, warnings: C }) => ({ errors: y.errors + E, warnings: y.warnings + C }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found ${k}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${N}${Intl.NumberFormat("en-US").format(r)} warnings${$}, ${Q}${Intl.NumberFormat("en-US").format(e)} lines${$} of code in ${Q}${Intl.NumberFormat("en-US").format(n)} files${$}` });
  const u = Math.ceil((1 - (s * Bu + r) / e) * 100), c = 60, f = r ? Math.max(1, Math.ceil(r / e * c)) : 0, p = s ? Math.max(1, c - Math.ceil(u * c / 100) - f) : 0, d = c - p - f, A = `${gt}${" ".repeat(d)}${N}${" ".repeat(f)}${k}${" ".repeat(p)}${$}`;
  return o.push({ info: `Code Health: [${A}] ${u}%
` }), u < kn && o.push({ info: `${k}Code health is LOW: ${u}%${$}
` }), u >= kn && u < Pn && o.push({ info: `${N}Code health is MEDIUM ${u}%${$}
` }), u >= Pn && u < zn && o.push({ info: `${Q}Code health is OK: ${u}%${$}
` }), u >= zn && o.push({ info: `${gt}Code health is GOOD: ${u}%${$}
` }), { errors: s, warnings: r, output: o };
}, hn = async (t) => {
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
};
function Ou(t) {
  const e = [], n = [];
  return Object.entries(fe).forEach(([s, r]) => {
    if (r.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = r.filter((u) => t.includes(u));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
const ds = async (t) => {
  let e = "";
  if (!t) {
    const s = rr(import.meta.url), r = Z.dirname(s), o = Z.resolve(r, "..");
    e = Z.join(o, "package.json");
  }
  return t && (e = Z.join(t, "package.json")), JSON.parse(await pe.readFile(e, "utf-8"));
}, pn = await hn(process.cwd()) || "", ms = async (t, e) => {
  const n = Z.join(pn, "package.json");
  return on.existsSync(n) ? !!(await ds(e)).dependencies[t] : !1;
}, gs = async (t) => {
  const e = ["nuxt.config.js", "nuxt.config.ts"];
  return await ms("nuxt", t) || e.some((n) => on.existsSync(Z.join(pn, n)));
}, Ru = async (t) => {
  const e = ["vue.config.js", "vue.config.ts"];
  return !await gs(t) && (await ms("vue", t) || e.some((s) => on.existsSync(Z.join(pn, s))));
}, P = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((c, f) => f >= n && c.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((u, c) => u + c.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Pe = [], _u = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, c = P(t.content, o);
    if (u > n * 2) {
      Pe.push({
        filePath: e,
        message: `line #${c} ${k}has a v-if with ${u} lines${$}`
      });
      return;
    }
    u > n && Pe.push({
      filePath: e,
      message: `line #${c} ${N}has a v-if with ${u} lines${$}`
    });
  });
}, Nu = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ big v-if${m}`,
      description: `👉 ${_}Big v-if can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, ze = [], Lu = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, c = P(t.content, o);
    if (u > n * 2) {
      ze.push({
        filePath: e,
        message: `line #${c} ${k}has a v-show with ${u} lines${$}`
      });
      return;
    }
    u > n && ze.push({
      filePath: e,
      message: `line #${c} ${N}has a v-show with ${u} lines${$}`
    });
  });
}, ju = () => {
  const t = [];
  return ze.length > 0 && ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ big v-show${m}`,
      description: `👉 ${_}Big v-show can be moved out to its own component.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Tu = /^(\(.*\)|\\?.)$/;
function De(t) {
  const e = t.toString();
  return Tu.test(e) ? e : `(?:${e})`;
}
const Wu = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Iu = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function O(t) {
  const e = (n) => O(`(?<${n}>${`${t}`.replace(Wu, "$1$2")})`);
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
    grouped: () => O(`${t}`.replace(Iu, "($1$3)$2")),
    at: {
      lineStart: () => O(`^${t}`),
      lineEnd: () => O(`${t}$`)
    }
  };
}
const Mu = /[.*+?^${}()|[\]\\/]/g;
function Be(t) {
  return O(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function q(t) {
  return O(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ie(...t) {
  return O(`(?:${t.map((e) => X(e)).join("|")})`);
}
const Ee = O(".");
O("\\b\\w+\\b");
const ee = O("\\w"), J = O("\\b"), ku = O("\\d"), V = O("\\s"), Fs = Object.assign(O("[a-zA-Z]"), {
  lowercase: O("[a-z]"),
  uppercase: O("[A-Z]")
}), Cs = O("\\t"), Es = O("\\n");
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
    t.map((e) => typeof e == "string" ? e.replace(Mu, "\\$&") : e).join("")
  );
}
function j(...t) {
  return O(`${De(X(...t))}+`);
}
const ue = "i", z = "g", I = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(X(...t).toString(), [...e || ""].join(""));
}, Ft = [], $s = 4, Pu = 2 * $s, zu = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const r = I(
    Ie(
      "if",
      'v-if="',
      j(Ee).groupedAs("condition").and("?").and(j(Ee)).and(":"),
      // ternary
      "="
    ).and(
      j(
        Ie(
          "&&",
          "||",
          q(`"'`)
        )
      )
    ),
    [z]
  ), o = I(
    Ie("&&", "||"),
    [z]
  ), u = (c, f) => {
    const p = c.match(r);
    p && p.forEach((d) => {
      const A = (d.match(o) || []).length + 1;
      if (A > $s) {
        const y = P(c, d);
        Ft.push({
          filePath: e,
          message: `line #${y} ${A > Pu ? k : N}${f} has a complicated condition with ${A} blocks${$}`
        });
      }
    });
  };
  n && u(n.content, "script"), s && u(s.content, "template");
}, Vu = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ complicated conditions${m}`,
      description: `👉 ${_}Simplify complex conditions by breaking them down into smaller, more manageable parts.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], Hu = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const u = o[1];
    if (s.test(u)) {
      const c = P(t.content.trim(), o[0]), f = u.trim(), p = f.length > 20 ? f.slice(0, 20) : f;
      Ct.push({
        filePath: e,
        message: `line #${c} side effect detected in computed property ${k}(${p})${$}`
      });
    }
  });
}, Gu = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ computed side effects${m}`,
      description: `👉 ${_}Avoid side effects in computed properties. Computed properties should only derive and return a value.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], bs = 5, Uu = 2 * bs, qu = (t, e) => {
  if (!t)
    return;
  const n = I(J, "if", J, [z, ue]), s = I(J, "else", J, [z, ue]), r = I(J, "for", J, [z, ue]), o = I(J, "while", J, [z, ue]), u = I(J, "case", J, [z, ue]), c = t.content.match(n), f = t.content.match(s), p = t.content.match(r), d = t.content.match(o), A = t.content.match(u), y = (c?.length || 0) + (f?.length || 0) + (p?.length || 0) + (d?.length || 0) + (A?.length || 0);
  y > bs && Et.push({ filePath: e, message: `Cyclomatic complexity is ${y > Uu ? `${k}very high` : `${N}high`} (${y})${$}` });
}, Zu = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${_}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], Vn = 5, Ku = 3, Yu = (t, e) => {
  if (!t)
    return;
  const n = I(Cs.times.atLeast(Vn).at.lineStart().or(V.times.atLeast(Ku * Vn).at.lineStart()), [z]), s = t.content.match(n);
  let r = 0;
  s?.forEach((o) => {
    const u = P(t.content, o, r);
    $t.push({
      filePath: e,
      message: `line #${u} ${N}indentation: ${o.length}${$}`
    }), r = u;
  });
}, Ju = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ deep indentation${m}`,
      description: `👉 ${_}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], Qu = (t, e) => {
  if (!t)
    return;
  const n = I(J, "else", J, [z, ue]), s = t.content.match(n);
  s?.length && bt.push({ filePath: e, message: `else clauses found ${k}(${s.length})${$}` });
}, Xu = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ else conditions${m}`,
      description: `👉 ${_}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ve = [], yt = 20, eo = 5, to = 8;
function no({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const r = e.split(`
`).length, o = uo(t);
  if (r > 2 * yt) {
    Ve.push({ filePath: s, message: `function ${k}(${o}#${n})${$} is too long: ${k}${r} lines${$}` });
    return;
  }
  r >= yt && Ve.push({ filePath: s, message: `function ${N}(${o}#${n})${$} is too long: ${N}${r} lines${$}` });
}
function so(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], o = n.lastIndex;
    let u = 1, c = o;
    for (; u > 0 && c < t.length; )
      t[c] === "{" ? u++ : t[c] === "}" && u--, c++;
    const f = t.slice(o, c - 1).trim();
    return {
      name: r,
      body: f,
      end: c
      // Returns the position after the matched function
    };
  } else
    return null;
}
function ro(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, o] = r, u = e + r.index + r[0].length;
    let c = u, f = "";
    if (t[u] === "{") {
      let p = 1;
      for (c = u + 1; c < t.length && p > 0; )
        t[c] === "{" ? p++ : t[c] === "}" && p--, c++;
      f = t.slice(u + 1, c - 1).trim();
    } else {
      for (; c < t.length && t[c] !== ";"; )
        c++;
      f = t.slice(u, c).trim();
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
function uo(t) {
  return t.replace(/^const\s*/, "");
}
const oo = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let r = 0;
  for (; r < s; ) {
    let o = "", u = "", c = !1;
    if (n.slice(r, r + to) === "function") {
      const f = so(n, r);
      f && (c = !0, o = f.name, u = f.body, r = f.end);
    }
    if (n.slice(r, r + eo) === "const") {
      const f = ro(n, r);
      f && (c = !0, o = f.name, u = f.body, r = f.end);
    }
    if (c) {
      const f = P(n.trim(), o);
      no({ funcName: o, funcBody: u, lineNumber: f, filePath: e });
    } else
      r++;
  }
}, io = () => {
  const t = [];
  return Ve.length > 0 && Ve.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ function size${m}`,
      description: `👉 ${_}Functions must be shorter than ${yt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], co = (t, e) => {
  if (!t)
    return;
  const n = I("<", X("img").or("picture"), [z]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const u = P(t.content, o, r), c = o.slice(1);
      wt.push({
        filePath: e,
        message: `line #${u} ${N}${c} element found${$}`
      }), r = u;
    });
  }
}, ao = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ html image elements${m}`,
      description: `👉 ${_}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], lo = (t, e) => {
  if (!t)
    return;
  const n = I("<a", J, [z, ue]), s = t.content.match(n);
  s?.length && xt.push({ filePath: e, message: `${s?.length} ${N}html link found${$}` });
}, Do = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ html link${m}`,
      description: `👉 ${_}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], fo = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((r, o) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const c = s[o + 1]?.trim();
      (!c || !c.startsWith("{") && !u.endsWith("{")) && At.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: ${k}${u}${$}`
      });
    }
  });
}, ho = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ if without curly braces${m}`,
      description: `👉 ${_}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], po = (t, e) => {
  if (!t)
    return;
  const n = I(j(ku).as("magicNumber"), Ie(")", Es), [z]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, u = Number.parseInt(o ?? "0");
    if (u > 1) {
      const c = P(t.content, String(u), r);
      vt.push({
        filePath: e,
        message: `line #${c} ${N}magic number: ${u}${$}`
      }), r = c;
    }
  }
}, mo = () => {
  const t = [];
  return vt.length && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ magic numbers${m}`,
      description: `👉 ${_}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Bt = [], go = (t, e) => {
  if (!t)
    return;
  const n = I(j(Ee), V, "?", V, j(Ee), V, ":", V, j(Ee));
  t.content.match(n)?.forEach((r) => {
    if (r.split("?").length - 1 > 1) {
      const o = P(t.content, r);
      Bt.push({
        filePath: e,
        message: `line #${o} has ${N}nested ternary${$}`
      });
    }
  });
}, Fo = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ nested Ternary${m}`,
      description: `👉 ${_}Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], Co = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const u = P(t.content.trim(), o[0], r);
    St.push({
      filePath: e,
      message: `line #${u} ${N}Found inline style: ${o[0]}${$}`
    }), r = u;
  });
}, Eo = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ no Inline Styles${m}`,
      description: `👉 ${_}Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], $o = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((r) => {
    const o = P(t.content, r);
    Ot.push({
      filePath: e,
      message: `line #${o} ${N}props destructuring found: ${r}${$}`
    });
  });
}, bo = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${_}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], yo = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((r) => {
    const o = P(t.content, r);
    Rt.push({
      filePath: e,
      message: `line #${o} ${N}Avoid using 'var' for variable declarations: ${r}${$}`
    });
  });
}, wo = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ No Var Declaration${m}`,
      description: `👉 ${_}Avoid var declaration, use const or let instead of that.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], ys = 3, Hn = (t, e, n) => {
  const s = e.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > ys && _t.push({ filePath: n, message: `function ${N}${t}${$} has ${N}${s.length}${$} parameters` });
}, xo = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && Hn(s[1], s[2], e), s[3] && Hn(s[3], s[4], e);
}, Ao = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ parameter count${m}`,
      description: `👉 ${_}Max number of function parameters should be ${ys}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], vo = (t, e) => {
  !t || t.setup || Nt.push({ filePath: e, message: `${N}Plain <script> block${$} found` });
}, Bo = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${_} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], So = (t, e) => {
  if (!t)
    return;
  const n = I(
    "defineProps(",
    V.times.any(),
    "[",
    V.times.any(),
    j(Be(`'"`), j(ee), Be(`'"`), V.times.any(), oe(",", V.times.any())),
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
  let r;
  const o = /* @__PURE__ */ new Set();
  for (; (r = n.exec(t.content)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((f) => o.add(f));
  let u;
  for (; (u = s.exec(t.content)) !== null; ) {
    const c = u[1], f = u[2], p = u[3];
    o.has(p) && f === p && Lt.push({
      filePath: e,
      message: `Prop ${N}(${p})${$} is being drilled through ${N}${c}${$} component unmodified.`
    });
  }
}, Oo = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ props drilling${m}`,
      description: `👉 ${_}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], Tt = 100, Ro = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > Tt && jt.push({ filePath: e, message: `${n.length > Tt * 2 ? k : N}(${n.length} lines)${$}` });
}, _o = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${_}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Tt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], ws = 4, No = ["i", "key"], Lo = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    r.length < ws && !No.includes(r) && Wt.push({ filePath: e, message: `variable: ${N}(${r})${$}` });
  }
}, jo = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ short variable names${m}`,
      description: `👉 ${_}Variable names must have a minimum length of ${ws}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], To = 5, Wo = (t, e) => {
  if (!t)
    return;
  const n = I("defineProps", oe("<"), oe("("), "{", j(Ee), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > To && It.push({ filePath: e, message: `props found ${k}(${r})${$}` });
  }
}, Io = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ too many props${m}`,
      description: `👉 ${_}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], Mo = (t, e) => {
  if (!t)
    return;
  const n = I('v-for="(', V.times.any(), j(ee).grouped(), V.times.any(), ",", V.times.any(), j(ee).grouped(), V.times.any(), ")", j(V), "in", j(V), j(ee).grouped(), [z]), s = I(':key="', V.times.any(), j(ee).grouped(), V.times.any(), '"', [z]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((u) => {
    const [c, f, p, d] = u;
    o.forEach((A) => {
      const y = A[1];
      if (y === p) {
        const E = P(t.content.trim(), y);
        Mt.push({
          filePath: e,
          message: `line #${E} ${N}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, ko = () => {
  const t = [];
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${_}Avoid using index as key in v-for loops.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], Po = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[0], o = s[1], u = P(t.content.trim(), r);
    kt.push({
      filePath: e,
      message: `line #${u} zero length comparison found ${N}(${o})${$}`
    });
  }
}, zo = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${_}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Vo = [
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
], Pt = [], Ho = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      Vo.includes(o) && Pt.push({ filePath: e, message: `${N}(${o})${$}` });
    }
  });
}, Go = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${_}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, He = [], Uo = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = I(X("$parent").or("getCurrentInstance"), [z]), o = t.content.match(n), u = t.content.match(s);
  if (u) {
    const f = u[1].split(".")[0];
    if ((o ? o[1] : "").includes(f)) {
      const d = P(t.content.trim(), f);
      He.push({
        filePath: e,
        message: `line #${d} ${N}(${f})${$}`
      });
    }
  }
  const c = t.content.match(r);
  if (c) {
    const f = P(t.content.trim(), c[0]);
    He.push({
      filePath: e,
      message: `line #${f} ${N}(${c[0]})${$}`
    });
  }
}, qo = () => {
  const t = [];
  return He.length > 0 && He.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${_}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], Zo = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || zt.push({
      filePath: e,
      message: `${k}global style${$} used`
    });
  });
}, Ko = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ global style${m}`,
      description: `👉 ${_}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Yo = (t, e) => {
  if (!t)
    return;
  const n = I("defineProps([", [z, ue]);
  t.content.match(n)?.length && Vt.push({ filePath: e, message: `${k}Props type${$} not defined` });
}, Jo = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ simple prop${m}`,
      description: `👉 ${_}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], Qo = (t) => {
  if (t.includes("pages"))
    return;
  const e = Z.basename(t);
  if (e === "App.vue")
    return;
  const n = I(Fs.uppercase);
  e.slice(1).match(n)?.length || Ht.push({ filePath: t, message: `Component name is ${k}single word${$}` });
}, Xo = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ single name component${m}`,
      description: `👉 ${_}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], ei = (t, e) => {
  if (!t)
    return;
  const n = I("<", j(q(">")), " v-for", j(q(">")), ">", [
    z,
    ue
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || Gt.push({ filePath: e, message: `v-for used ${k}without a key${$}` }));
}, ti = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${_}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], ni = (t, e) => {
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
    [z, ue]
  ), s = I(
    "<",
    j(q(">")),
    " v-for",
    j(q(">")),
    " v-if",
    j(q(">")),
    ">",
    [z, ue]
  ), r = t.content.match(n), o = t.content.match(s);
  if (r?.length || o?.length) {
    const u = r?.length ? r[0] : o?.length ? o[0] : "", c = P(t.content, u);
    Ut.push({ filePath: e, message: `line #${c} ${k}v-if used with v-for${$}` });
  }
}, si = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${_}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], Gn = [
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
], ri = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const u = o[1], c = o[2];
    if (c) {
      const p = Array.from(c.matchAll(r), (A) => A[1]).filter((A) => Gn.includes(A));
      let d = -1;
      for (const A of p) {
        const y = Gn.indexOf(A);
        if (y !== -1 && y < d) {
          qt.push({
            filePath: e,
            message: `tag has attributes out of order ${N}(${u})${$}`
          });
          break;
        }
        d = y;
      }
    }
  }
}, ui = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${_}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], oi = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), o = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: o }
  ].filter((f) => f.index !== -1);
  u.every((f, p) => p === 0 ? !0 : u[p - 1].index < f.index) || Zt.push({ filePath: e, message: `Top level elements are ${N}not following the correct order.${$}` });
}, ii = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-recommended ~ top level element order${m}`,
      description: `👉 ${_}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], ci = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = Z.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && Kt.push({ filePath: t, message: `component name is ${N}not PascalCase, nor kebab-case.${$}` });
}, ai = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${_}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Yt = [], li = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = P(t.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    Yt.push({ filePath: e, message: `line #${o} ${N}(${u})${$}` });
  });
}, Di = () => {
  const t = [];
  return Yt.length > 0 && Yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component files${m}`,
      description: `👉 ${_}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Jt = [], Un = [], fi = ["v-slot", "v-bind", "v-on"], hi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  fi.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = P(t.source, s);
      Jt.push({ filePath: e, message: `line #${r} ${N}${s}${$}` }), Un.some((o) => o.filePath === e) || Un.push({ filePath: e });
    }
  });
}, pi = () => {
  const t = [];
  return Jt.length > 0 && Jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${_}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Qt = [], di = 3, mi = (t) => {
  const e = I(
    j(q("/")).grouped(),
    X(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = I(
      Be("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [z]
    ), o = s.match(r);
    (!o || o.length < di) && Qt.push({ filePath: t, message: `${s} is not a ${N}full word.${$}` });
  }
}, gi = () => {
  const t = [];
  return Qt.length > 0 && Qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ full-word component names${m}`,
      description: `👉 ${_}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Xt = [], Fi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((c) => c.trim() !== "").length > 1 && o.split(`
`).length === 1 && Xt.push({ filePath: e, message: `Element ${N}<${r}>${$} should have its attributes on separate lines` });
  }
}, Ci = () => {
  const t = [];
  return Xt.length > 0 && Xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${_}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${e.message} 🚨`
    });
  }), t;
}, en = [], Ei = /^[a-z]+([A-Z][a-z]*)*$/, $i = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !Ei.test(o)).length && en.push({ filePath: e, message: `prop names are ${N}not camelCased${$}` });
}, bi = () => {
  const t = [];
  return en.length > 0 && en.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${_}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, tn = [], yi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = I(
    "<",
    j(ee),
    oe(j(Be(` 	
\r`))),
    j(q("/>")),
    oe(j(Be(` 	
\r`))),
    oe("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const o = I(":", j(ee), oe(" "), "=", oe(" "), q(`'"`), [
    "g"
  ]);
  r?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const c = u.match(o);
    if (c?.length) {
      const f = P(t.source, u);
      tn.push({ filePath: e, message: `line #${f} ${N}${c}${$}` });
    }
  });
}, wi = () => {
  const t = [];
  return tn.length > 0 && tn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${_}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, nn = [], xi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = I(
    "<",
    j(Fs.uppercase, ee),
    oe(Es, Cs),
    oe(j(q(">"))),
    "></",
    j(ee),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const u = P(t.source, o), c = o.split(`
`).at(-1)?.trim() || "";
    nn.push({ filePath: e, message: `line #${u} ${N}${c}${$}` });
  });
}, Ai = () => {
  const t = [];
  return nn.length > 0 && nn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${_}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, xs = [], Me = [], vi = 5, Bi = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > vi) {
      const o = r.split(`
`)[0], u = P(t.content, o);
      xs.push({ filePath: e, message: `line #${u} ${N}computed${$}` }), Me.push({ filePath: e }), Me.some((c) => c.filePath === e) || Me.push({ filePath: e });
    }
  });
}, Si = () => {
  const t = [];
  return Me.length > 0 && xs.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${_}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, sn = [], Oi = 40, Ri = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > Oi) {
      const o = P(t.content, r), u = r.split(`
`).at(0)?.trim() || "";
      sn.push({
        filePath: e,
        message: `line #${o} ${N}${u}${$}`
      });
    }
  });
}, _i = () => {
  const t = [];
  return sn.length > 0 && sn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: `${S}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${_}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Ni = (t, e, n) => {
  const s = t.scriptSetup || t.script, r = e.endsWith(".vue"), o = {
    // vue-essential
    simpleProp: () => Yo(s, e),
    singleNameComponent: () => r && Qo(e),
    globalStyle: () => r && Zo(t.styles, e),
    vforNoKey: () => r && ei(t.template, e),
    vifWithVfor: () => r && ni(t.template, e),
    // vue-strong
    simpleComputed: () => Bi(s, e),
    componentFiles: () => r && li(s, e),
    propNameCasing: () => r && $i(s, e),
    componentFilenameCasing: () => r && ci(e),
    selfClosingComponents: () => r && xi(t, e),
    templateSimpleExpression: () => r && Ri(t.template, e),
    quotedAttributeValues: () => r && yi(t, e),
    directiveShorthands: () => r && hi(t, e),
    fullWordComponentName: () => r && mi(e),
    multiAttributeElements: () => r && Fi(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => r && oi(t.source, e),
    elementAttributeOrder: () => r && ri(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => r && Uo(s, e),
    elementSelectorsWithScoped: () => r && Ho(t.styles, e),
    // rrd
    bigVif: () => _u(t.template, e),
    bigVShow: () => Lu(t.template, e),
    complicatedConditions: () => zu(t, e),
    cyclomaticComplexity: () => qu(s, e),
    computedSideEffects: () => Hu(s, e),
    deepIndentation: () => Yu(s, e),
    elseCondition: () => Qu(s, e),
    functionSize: () => oo(s, e),
    htmlImageElements: () => vu() && co(t.template, e),
    htmlLink: () => r && lo(t.template, e),
    ifWithoutCurlyBraces: () => fo(s, e),
    magicNumbers: () => po(s, e),
    nestedTernary: () => go(s, e),
    noPropDestructure: () => $o(s, e),
    noVarDeclaration: () => yo(s, e),
    parameterCount: () => xo(s, e),
    plainScript: () => r && vo(t.script, e),
    propsDrilling: () => So(s, e),
    scriptLength: () => Ro(s, e),
    shortVariableName: () => Lo(s, e),
    tooManyProps: () => Wo(s, e),
    vForWithIndexKey: () => r && Mo(t.template, e),
    zeroLengthComparison: () => Po(s, e),
    noInlineStyles: () => Co(t.template, e)
  };
  n.forEach((u) => {
    u in fe ? fe[u].forEach((c) => {
      c in o && o[c]();
    }) : u in o && o[u]();
  });
}, Li = (t, e, n) => {
  const s = {}, r = [], o = ({ file: p, rule: d, title: A, description: y, message: E }) => {
    const C = t === "rule" ? d : p;
    s[C] || (s[C] = []), s[C].push({ file: p, rule: d, title: A, description: y, message: E });
  }, u = (p) => {
    p().forEach((A) => {
      o(A);
    });
  };
  u(Xo), u(Jo), u(ti), u(si), u(Ko), u(ai), u(Di), u(pi), u(gi), u(Ci), u(bi), u(wi), u(Ai), u(Si), u(_i), u(ii), u(ui), u(qo), u(Go), u(Nu), u(ju), u(Vu), u(Zu), u(Gu), u(Ju), u(Xu), u(io), u(ao), u(Do), u(ho), u(mo), u(Fo), u(bo), u(wo), u(Ao), u(Bo), u(Oo), u(_o), u(jo), u(Io), u(ko), u(zo), u(Eo);
  const c = Object.keys(s).sort((p, d) => {
    const A = s[p].length, y = s[d].length;
    return e === "desc" ? y - A : A - y;
  }), f = {};
  return c.forEach((p) => {
    f[p] = [], s[p].forEach((d, A) => {
      const y = d.message.includes(k);
      if (r.some((E) => E.file === d.file)) {
        const E = r.find((C) => C.file === d.file);
        E && (y ? E.errors++ : E.warnings++);
      } else
        r.push({ file: d.file, errors: y ? 1 : 0, warnings: y ? 0 : 1 });
      n === "error" && !y || (f[p][A] = { id: "", description: "", message: "" }, t === "file" && (f[p][A].id = d.rule), t !== "file" && (f[p][A].id = d.file), f[p][A].description = d.description, f[p][A].message = d.message || "🚨");
    });
  }), { output: f, health: r };
};
let rn = 0, As = 0, vs = [];
const ji = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], dn = [], he = [], qn = async (t, e) => {
  if (!dn.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    rn++;
    const n = await pe.readFile(e, "utf-8");
    As += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = sr(n);
    (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), he.push({ info: `Analyzing ${e}...` }), Ni(s, e, vs);
  }
}, Bs = async (t) => {
  if (!(await pe.stat(t)).isDirectory()) {
    await qn(t, t);
    return;
  }
  const n = await pe.readdir(t);
  for (const s of n) {
    const r = Z.join(t, s);
    (await pe.stat(r)).isDirectory() && !ji.some((u) => r.includes(u)) && !dn.some((u) => r.endsWith(u)) && await Bs(r), await qn(r, r);
  }
}, Ti = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: r, level: o, sortBy: u }) => {
  const c = e.filter((te) => !n.includes(te)), { rulesets: f, individualRules: p } = Ou(c), d = f.length ? `${Q}${f.join(", ")}${$}` : "N/A", A = p.length ? `${Q}${p.join(", ")}${$}` : "N/A";
  let y = `      Applying ${f.length} rulesets: ${d}`;
  p.length > 0 && (y += `
      Applying ${p.length} individual rules: ${A}`);
  const E = n.filter((te) => !f.includes(te)), C = E.length ? `${Q}${E.join(", ")}${$}` : "N/A", F = await hn(t), a = await Ru(F), w = await gs(F);
  Au(w), he.push({ info: `${Q}Analyzing Vue, TS and JS files in ${t}${$}` }), he.push({ info: `      Project type: ${Q}${w ? "Nuxt" : ""}${a ? "Vue" : ""}${!w && !a ? "?" : ""}${$}` }), he.push({
    info: `${y}
      Ignoring ${E.length} rules: ${C}
      Excluding ${s || "-"}
      Output level ${Q}${o}${$}
      Grouping by ${Q}${r}${$}
      Sorting ${Q}${u}${$}`
  }), vs = e.filter((te) => !n.includes(te)), s && dn.push(...s.split(",")), await Bs(t), he.push({ info: `Found ${Q}${rn}${$} files` });
  const { health: B, output: L } = Li(r, u, o), { errors: W, warnings: T, output: de } = Su(B, As, rn);
  return !W && !T && he.push({ info: `
${gt}No code smells detected!${$}` }), { output: he, codeHealthOutput: de, reportOutput: L };
}, Zn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(fe) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    fn.includes(o) ? s.push(...fe[o]) : Object.values(fe).some((u) => u.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${k}Invalid ${t} values: ${r.join(
      ", "
    )}${$}. 
${_}Allowed values are: ${ps.join(", ")}${m}

`
  ), process.exit(1)), s;
}, Ss = ["rule", "file"], Os = ["asc", "desc"], Rs = ["text", "json", "table"], _s = ["all", "error"], Wi = {
  groupBy: Ss,
  sortBy: Os,
  outputLevel: _s,
  outputFormat: Rs
}, Le = (t, e) => {
  const n = Wi[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${k}${t}${$} provided for flag ${S}${e}${m}. Valid options are: ${Q}${n.join(", ")}${$}.
`
  ), process.exit(1)), t;
};
function Kn(t) {
  const e = new RegExp(`--${t}(?:=[^\\s]*)?$`);
  return process.argv.some((n) => e.test(n));
}
const Ii = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4], Mi = await hn(Ii || "./src"), ki = await ds(), Ge = [];
let re = {
  path: "./src",
  apply: Object.values(fn).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  sort: "desc",
  output: "text"
};
const Fe = {
  applyFromCLI: Kn("apply"),
  ignoreFromCLI: Kn("ignore"),
  applyFromFile: !1,
  ignoreFromFile: !1
};
try {
  const t = Z.join(Mi, "vue-mess-detector.json"), e = JSON.parse(await pe.readFile(t, "utf-8"));
  re = { ...re, ...e }, Fe.applyFromFile = !!e.apply, Fe.ignoreFromFile = !!e.ignore, Ge.push({ info: `👉 Using configuration from ${t}` });
} catch {
  Ge.push({ info: "👉 Using default configuration" });
}
qs(tu(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (t) => t.config(re).positional("path", {
    describe: "path to the Vue files",
    default: re.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: ps,
    coerce: Zn("apply"),
    group: "Filter Rulesets/Rules:",
    default: re.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: re.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: Ss,
    coerce: (e) => Le(e, "groupBy"),
    default: re.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: _s,
    coerce: (e) => Le(e, "outputLevel"),
    default: re.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: Zn("ignore"),
    default: re.ignore,
    group: "Filter Rulesets:"
  }).option("sort", {
    alias: "s",
    describe: "Sort results at the output",
    choices: Os,
    coerce: (e) => Le(e, "sortBy"),
    default: re.sort,
    group: "Sort Results:"
  }).option("output", {
    describe: "Output format",
    choices: Rs,
    coerce: (e) => Le(e, "outputFormat"),
    default: re.output,
    group: "Output Format:"
  }).check(() => {
    const e = Fe.applyFromCLI || Fe.applyFromFile, n = Fe.ignoreFromCLI || Fe.ignoreFromFile;
    return e && n && (console.error(`
${k}Cannot use both --ignore and --apply options together.${$}
`), process.exit(1)), !0;
  }),
  (t) => {
    Ti({
      dir: t.path,
      apply: t.apply,
      ignore: t.ignore,
      exclude: t.exclude,
      groupBy: t.group,
      level: t.level,
      sortBy: t.sort
    }).then((e) => {
      if (t.output == "text") {
        [...Ge, ...e.output].forEach((n) => {
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
        [...Ge, ...e.output].forEach((n) => {
          console.log(n.info);
        });
        for (const n in e.reportOutput) {
          const s = new Qr({
            head: ["id", "message"],
            colWidths: [60, 60],
            wordWrap: !0,
            wrapOnWordBoundary: !1
          });
          console.log("-".repeat(120)), t.group == "rule" && (console.log(`${S}Rule: ${n}${m}`), console.log(`Description: ${e.reportOutput[n][0].description}`), e.reportOutput[n].forEach((r) => {
            s.push([r.id, r.message]);
          })), t.group == "file" && (console.log(`${S}File: ${n}${m}`), e.reportOutput[n].forEach((r) => {
            s.push([`${r.id}
${r.description.replace("See: ", `See:
`)}`, r.message]);
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
).version("version", "Show version number", ki.version).alias("version", "v").help().argv;
