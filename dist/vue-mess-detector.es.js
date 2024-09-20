import ie from "node:fs/promises";
import Ts, { format as Vn, inspect as ks } from "util";
import Is from "os";
import Ms from "yargs";
import { normalize as Ps, resolve as de, dirname as Zt, basename as zs, extname as Hs, relative as Vs } from "path";
import { readFileSync as Xt, statSync as qn, readdirSync as qs, writeFile as Us } from "fs";
import { notStrictEqual as Gs, strictEqual as Zs } from "assert";
import { fileURLToPath as Ks } from "url";
import V from "node:path";
import { parse as Ys } from "@vue/compiler-sfc";
import en from "node:fs";
import { fileURLToPath as Js } from "node:url";
function Qs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let tn = [], Un = 0;
const P = (t, e) => {
  Un >= e && tn.push(t);
};
P.WARN = 1;
P.INFO = 2;
P.DEBUG = 3;
P.reset = () => {
  tn = [];
};
P.setDebugLevel = (t) => {
  Un = t;
};
P.warn = (t) => P(t, P.WARN);
P.info = (t) => P(t, P.INFO);
P.debug = (t) => P(t, P.DEBUG);
P.debugMessages = () => tn;
var nn = P, sn = { exports: {} }, Xs = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const er = Xs;
var tr = (t) => typeof t == "string" ? t.replace(er(), "") : t, rn = { exports: {} };
const Gn = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
rn.exports = Gn;
rn.exports.default = Gn;
var nr = rn.exports, sr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const rr = tr, or = nr, ur = sr, Zn = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = rr(t), t.length === 0))
    return 0;
  t = t.replace(ur(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += or(s) ? 2 : 1);
  }
  return e;
};
sn.exports = Zn;
sn.exports.default = Zn;
var ir = sn.exports;
const pn = ir;
function Me(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ee(t) {
  let e = Me();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return pn(o) > r ? pn(o) : r;
  }, 0);
}
function be(t, e) {
  return Array(e + 1).join(t);
}
function ar(t, e, n, s) {
  let r = ee(t);
  if (e + 1 >= r) {
    let o = e - r;
    switch (s) {
      case "right": {
        t = be(n, o) + t;
        break;
      }
      case "center": {
        let u = Math.ceil(o / 2), i = o - u;
        t = be(n, i) + t + be(n, u);
        break;
      }
      default: {
        t = t + be(n, o);
        break;
      }
    }
  }
  return t;
}
let he = {};
function Se(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", he[e] = { set: t, to: !0 }, he[n] = { set: t, to: !1 }, he[t] = { on: e, off: n };
}
Se("bold", 1, 22);
Se("italics", 3, 23);
Se("underline", 4, 24);
Se("inverse", 7, 27);
Se("strikethrough", 9, 29);
function Kn(t, e) {
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
  let s = he[e[0]];
  s && (t[s.set] = s.to);
}
function cr(t) {
  let e = Me(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Kn(s, n), n = e.exec(t);
  return s;
}
function Yn(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += he[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function lr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = he[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Dr(t, e) {
  if (t.length === ee(t))
    return t.substr(0, e);
  for (; ee(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function fr(t, e) {
  let n = Me(!0), s = t.split(Me()), r = 0, o = 0, u = "", i, c = {};
  for (; o < e; ) {
    i = n.exec(t);
    let p = s[r];
    if (r++, o + ee(p) > e && (p = Dr(p, e - o)), u += p, o += ee(p), o < e) {
      if (!i)
        break;
      u += i[0], Kn(c, i);
    }
  }
  return Yn(c, u);
}
function hr(t, e, n) {
  if (n = n || "…", ee(t) <= e)
    return t;
  e -= ee(n);
  let r = fr(t, e);
  r += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !r.includes(o) && (r += o), r;
}
function pr() {
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
function dr(t, e) {
  t = t || {}, e = e || pr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function gr(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, u;
  for (let i = 0; i < s.length; i += 2) {
    let c = s[i], p = o + ee(c);
    o > 0 && u && (p += u.length), p > t ? (o !== 0 && n.push(r.join("")), r = [c], o = ee(c)) : (r.push(u || "", c), o = p), u = s[i + 1];
  }
  return o && n.push(r.join("")), n;
}
function mr(t, e) {
  let n = [], s = "";
  function r(u, i) {
    for (s.length && i && (s += i), s += u; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let u = 0; u < o.length; u += 2)
    r(o[u], u && o[u - 1]);
  return s.length && n.push(s), n;
}
function br(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? gr : mr;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, r(t, e[o]));
  return s;
}
function Cr(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = lr(e, t[s]);
    e = cr(r);
    let o = Object.assign({}, e);
    n.push(Yn(o, r));
  }
  return n;
}
function Fr(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var Jn = {
  strlen: ee,
  repeat: be,
  pad: ar,
  truncate: hr,
  mergeOptions: dr,
  wordWrap: br,
  colorizeLines: Cr,
  hyperlink: Fr
}, Qn = { exports: {} }, At = { exports: {} }, St = { exports: {} }, Rt = { exports: {} }, Ot = { exports: {} }, dn;
function Er() {
  return dn || (dn = 1, function(t) {
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
  }(Ot)), Ot.exports;
}
var Nt, gn;
function xr() {
  return gn || (gn = 1, Nt = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Nt;
}
var Lt, mn;
function wr() {
  if (mn) return Lt;
  mn = 1;
  var t = Is, e = xr(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function r(i) {
    return i === 0 ? !1 : {
      level: i,
      hasBasic: !0,
      has256: i >= 2,
      has16m: i >= 3
    };
  }
  function o(i) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (i && !i.isTTY && s !== !0)
      return 0;
    var c = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(x) {
        return x in n;
      }) || n.CI_NAME === "codeship" ? 1 : c;
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
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", c);
  }
  function u(i) {
    var c = o(i);
    return r(c);
  }
  return Lt = {
    supportsColor: u,
    stdout: u(process.stdout),
    stderr: u(process.stderr)
  }, Lt;
}
var jt = { exports: {} }, bn;
function _r() {
  return bn || (bn = 1, function(t) {
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
        var i = o[u] || [" "], c = Math.floor(Math.random() * i.length);
        typeof o[u] < "u" ? r += o[u][c] : r += u;
      }), r;
    };
  }(jt)), jt.exports;
}
var Wt = { exports: {} }, Cn;
function yr() {
  return Cn || (Cn = 1, function(t) {
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
      function i(p) {
        var d = !1;
        return o.filter(function(x) {
          d = x === p;
        }), d;
      }
      function c(p, d) {
        var x = "", E, b;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (b in p)
          if (!i(b)) {
            switch (x = x + p[b], E = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                E.up = u(8), E.mid = u(2), E.down = u(8);
                break;
              case "maxi":
                E.up = u(16) + 3, E.mid = u(4) + 1, E.down = u(64) + 3;
                break;
              default:
                E.up = u(8) + 1, E.mid = u(6) / 2, E.down = u(8) + 1;
                break;
            }
            var m = ["up", "mid", "down"];
            for (var g in m)
              for (var l = m[g], w = 0; w <= E[l]; w++)
                d[l] && (x = x + r[l][u(r[l].length)]);
          }
        return x;
      }
      return c(n, s);
    };
  }(Wt)), Wt.exports;
}
var Tt = { exports: {} }, Fn;
function $r() {
  return Fn || (Fn = 1, function(t) {
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
  }(Tt)), Tt.exports;
}
var kt = { exports: {} }, En;
function Ar() {
  return En || (En = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(kt)), kt.exports;
}
var It = { exports: {} }, xn;
function vr() {
  return xn || (xn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(It)), It.exports;
}
var Mt = { exports: {} }, wn;
function Br() {
  return wn || (wn = 1, function(t) {
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
  }(Mt)), Mt.exports;
}
var _n;
function Sr() {
  return _n || (_n = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Ts, s = e.styles = Er(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = wr().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(g) {
      return ("" + g).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(l, w) {
      if (!e.enabled)
        return l + "";
      var y = s[w];
      return !y && w in e ? e[w](l) : y.open + l + y.close;
    };
    var u = /[|\\{}()[\]^$+*?.]/g, i = function(g) {
      if (typeof g != "string")
        throw new TypeError("Expected a string");
      return g.replace(u, "\\$&");
    };
    function c(g) {
      var l = function w() {
        return x.apply(w, arguments);
      };
      return l._styles = g, l.__proto__ = d, l;
    }
    var p = function() {
      var g = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(l) {
        s[l].closeRe = new RegExp(i(s[l].close), "g"), g[l] = {
          get: function() {
            return c(this._styles.concat(l));
          }
        };
      }), g;
    }(), d = r(function() {
    }, p);
    function x() {
      var g = Array.prototype.slice.call(arguments), l = g.map(function(R) {
        return R != null && R.constructor === String ? R : n.inspect(R);
      }).join(" ");
      if (!e.enabled || !l)
        return l;
      for (var w = l.indexOf(`
`) != -1, y = this._styles, B = y.length; B--; ) {
        var N = s[y[B]];
        l = N.open + l.replace(N.closeRe, N.open) + N.close, w && (l = l.replace(o, function(R) {
          return N.close + R + N.open;
        }));
      }
      return l;
    }
    e.setTheme = function(g) {
      if (typeof g == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var l in g)
        (function(w) {
          e[w] = function(y) {
            if (typeof g[w] == "object") {
              var B = y;
              for (var N in g[w])
                B = e[g[w][N]](B);
              return B;
            }
            return e[g[w]](y);
          };
        })(l);
    };
    function E() {
      var g = {};
      return Object.keys(p).forEach(function(l) {
        g[l] = {
          get: function() {
            return c([l]);
          }
        };
      }), g;
    }
    var b = function(l, w) {
      var y = w.split("");
      return y = y.map(l), y.join("");
    };
    e.trap = _r(), e.zalgo = yr(), e.maps = {}, e.maps.america = $r()(e), e.maps.zebra = Ar()(e), e.maps.rainbow = vr()(e), e.maps.random = Br()(e);
    for (var m in e.maps)
      (function(g) {
        e[g] = function(l) {
          return b(e.maps[g], l);
        };
      })(m);
    r(e, E());
  }(Rt)), Rt.exports;
}
var yn;
function Rr() {
  return yn || (yn = 1, function(t) {
    var e = Sr();
    t.exports = e;
  }(St)), St.exports;
}
const { info: Or, debug: Xn } = nn, q = Jn;
let Nr = class je {
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
    jr.forEach(function(c) {
      Pt(s, r, c, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let u = this.options.style = this.options.style || {}, i = e.style;
    Pt(u, i, "padding-left", this), Pt(u, i, "padding-right", this), this.head = u.head || i.head, this.border = u.border || i.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = q.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
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
      return this.wrapLines(q.wordWrap(this.fixedWidth, this.content, o));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = q.colorizeLines(e);
    return this.href ? n.map((s) => q.hyperlink(this.href, s)) : n;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(An, -1), this.height = this.heights.reduce(An, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    let s = q.truncate(this.content, 10, this.truncate);
    e || Or(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
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
      n.push(this._topLeftChar(r)), n.push(q.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(q.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
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
        let s = Rr();
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
      let E = this.cells[this.y + r][this.x - 1];
      for (; E instanceof Kt; )
        E = this.cells[E.y][E.x - 1];
      E instanceof Yt || (o = this.chars.rightMid);
    }
    let u = q.repeat(" ", this.paddingLeft), i = n ? this.chars.right : "", c = q.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let x = q.truncate(p, d, this.truncate);
    return x = q.pad(x, d, " ", this.hAlign), x = u + x + c, this.stylizeLine(o, x, i);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = q.repeat(this.chars.bottom, this.width), r = e ? this.chars.bottomRight : "";
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
      for (; u instanceof Kt; )
        u = this.cells[u.y][u.x - 1];
      u instanceof Yt || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = q.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, Kt = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && Xn(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, Yt = class {
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
    this.cellOffset = n - s, this.offset = Lr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (Xn(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function $n(...t) {
  return t.filter((e) => e != null).shift();
}
function Pt(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = $n(t[r], t[n], e[r], e[n])) : s[n] = $n(t[n], e[n]);
}
function Lr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function An(t, e) {
  return t + e + 1;
}
let jr = [
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
At.exports = Nr;
At.exports.ColSpanCell = Kt;
At.exports.RowSpanCell = Yt;
var Wr = At.exports;
const { warn: Tr, debug: kr } = nn, Jt = Wr, { ColSpanCell: Ir, RowSpanCell: Mr } = Jt;
(function() {
  function t(b, m) {
    return b[m] > 0 ? t(b, m + 1) : m;
  }
  function e(b) {
    let m = {};
    b.forEach(function(g, l) {
      let w = 0;
      g.forEach(function(y) {
        y.y = l, y.x = l ? t(m, w) : w;
        const B = y.rowSpan || 1, N = y.colSpan || 1;
        if (B > 1)
          for (let R = 0; R < N; R++)
            m[y.x + R] = B;
        w = y.x + N;
      }), Object.keys(m).forEach((y) => {
        m[y]--, m[y] < 1 && delete m[y];
      });
    });
  }
  function n(b) {
    let m = 0;
    return b.forEach(function(g) {
      g.forEach(function(l) {
        m = Math.max(m, l.x + (l.colSpan || 1));
      });
    }), m;
  }
  function s(b) {
    return b.length;
  }
  function r(b, m) {
    let g = b.y, l = b.y - 1 + (b.rowSpan || 1), w = m.y, y = m.y - 1 + (m.rowSpan || 1), B = !(g > y || w > l), N = b.x, R = b.x - 1 + (b.colSpan || 1), le = m.x, ce = m.x - 1 + (m.colSpan || 1), oe = !(N > ce || le > R);
    return B && oe;
  }
  function o(b, m, g) {
    let l = Math.min(b.length - 1, g), w = { x: m, y: g };
    for (let y = 0; y <= l; y++) {
      let B = b[y];
      for (let N = 0; N < B.length; N++)
        if (r(w, B[N]))
          return !0;
    }
    return !1;
  }
  function u(b, m, g, l) {
    for (let w = g; w < l; w++)
      if (o(b, w, m))
        return !1;
    return !0;
  }
  function i(b) {
    b.forEach(function(m, g) {
      m.forEach(function(l) {
        for (let w = 1; w < l.rowSpan; w++) {
          let y = new Mr(l);
          y.x = l.x, y.y = l.y + w, y.colSpan = l.colSpan, p(y, b[g + w]);
        }
      });
    });
  }
  function c(b) {
    for (let m = b.length - 1; m >= 0; m--) {
      let g = b[m];
      for (let l = 0; l < g.length; l++) {
        let w = g[l];
        for (let y = 1; y < w.colSpan; y++) {
          let B = new Ir();
          B.x = w.x + y, B.y = w.y, g.splice(l + 1, 0, B);
        }
      }
    }
  }
  function p(b, m) {
    let g = 0;
    for (; g < m.length && m[g].x < b.x; )
      g++;
    m.splice(g, 0, b);
  }
  function d(b) {
    let m = s(b), g = n(b);
    kr(`Max rows: ${m}; Max cols: ${g}`);
    for (let l = 0; l < m; l++)
      for (let w = 0; w < g; w++)
        if (!o(b, w, l)) {
          let y = { x: w, y: l, colSpan: 1, rowSpan: 1 };
          for (w++; w < g && !o(b, w, l); )
            y.colSpan++, w++;
          let B = l + 1;
          for (; B < m && u(b, B, y.x, y.x + y.colSpan); )
            y.rowSpan++, B++;
          let N = new Jt(y);
          N.x = y.x, N.y = y.y, Tr(`Missing cell at ${N.y}-${N.x}.`), p(N, b[l]);
        }
  }
  function x(b) {
    return b.map(function(m) {
      if (!Array.isArray(m)) {
        let g = Object.keys(m)[0];
        m = m[g], Array.isArray(m) ? (m = m.slice(), m.unshift(g)) : m = [g, m];
      }
      return m.map(function(g) {
        return new Jt(g);
      });
    });
  }
  function E(b) {
    let m = x(b);
    return e(m), d(m), i(m), c(m), m;
  }
  Qn.exports = {
    makeTableLayout: E,
    layoutTable: e,
    addRowSpanCells: i,
    maxWidth: n,
    fillInTable: d,
    computeWidths: vn("colSpan", "desiredWidth", "x", 1),
    computeHeights: vn("rowSpan", "desiredHeight", "y", 1)
  };
})();
function vn(t, e, n, s) {
  return function(r, o) {
    let u = [], i = [], c = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? i.push(d) : u[d[n]] = Math.max(u[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(p, d) {
      typeof p == "number" && (u[d] = p);
    });
    for (let p = i.length - 1; p >= 0; p--) {
      let d = i[p], x = d[t], E = d[n], b = u[E], m = typeof r[E] == "number" ? 0 : 1;
      if (typeof b == "number")
        for (let g = 1; g < x; g++)
          b += 1 + u[E + g], typeof r[E + g] != "number" && m++;
      else
        b = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!c[E] || c[E] < b) && (c[E] = b);
      if (d[e] > b) {
        let g = 0;
        for (; m > 0 && d[e] > b; ) {
          if (typeof r[E + g] != "number") {
            let l = Math.round((d[e] - b) / m);
            b += l, u[E + g] += l, m--;
          }
          g++;
        }
      }
    }
    Object.assign(r, u, c);
    for (let p = 0; p < r.length; p++)
      r[p] = Math.max(s, r[p] || 0);
  };
}
var Pr = Qn.exports;
const se = nn, zr = Jn, zt = Pr;
let es = class extends Array {
  constructor(e) {
    super();
    const n = zr.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          se.setDebugLevel(se.WARN);
          break;
        case "number":
          se.setDebugLevel(n.debug);
          break;
        case "string":
          se.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          se.setDebugLevel(se.WARN), se.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return se.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = zt.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(u) {
        u.mergeTableOptions(this.options, s);
      }, this);
    }, this), zt.computeWidths(this.options.colWidths, s), zt.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(u) {
        u.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let u = s[o], i = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && Ht(u, "top", r);
      for (let c = 0; c < i; c++)
        Ht(u, c, r);
      o + 1 == s.length && Ht(u, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
es.reset = () => se.reset();
function Ht(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Hr = es, Vr = Hr;
const qr = /* @__PURE__ */ Qs(Vr);
class Fe extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Fe);
  }
}
function ts() {
  return Ur() ? 0 : 1;
}
function Ur() {
  return Gr() && !process.defaultApp;
}
function Gr() {
  return !!process.versions.electron;
}
function Zr(t) {
  return t.slice(ts() + 1);
}
function Kr() {
  return process.argv[ts()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Ce(t) {
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
function ns(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const o = n.charAt(r), u = t.charAt(r);
    o !== u && r > 0 ? s += `${e}${n.charAt(r)}` : s += u;
  }
  return s;
}
function ss(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Yr(t) {
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
var K;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(K || (K = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ne;
class Jr {
  constructor(e) {
    ne = e;
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
    }, n), r = Yr(e), o = typeof e == "string", u = Qr(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), i = Object.assign({
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
    }, s.configuration), c = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, x = i["populate--"], E = x ? "--" : "_", b = /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ Object.create(null), g = s.__ || ne.format, l = {
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
    }, w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, y = new RegExp("^--" + i["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(a) {
      const f = typeof a == "object" ? a.key : a, C = Object.keys(a).map(function(h) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[h];
      }).filter(Boolean).pop();
      C && (l[C][f] = !0), l.arrays[f] = !0, l.keys.push(f);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(a) {
      l.bools[a] = !0, l.keys.push(a);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(a) {
      l.strings[a] = !0, l.keys.push(a);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(a) {
      l.numbers[a] = !0, l.keys.push(a);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(a) {
      l.counts[a] = !0, l.keys.push(a);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(a) {
      l.normalize[a] = !0, l.keys.push(a);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([a, f]) => {
      typeof f == "number" && (l.nargs[a] = f, l.keys.push(a));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([a, f]) => {
      typeof f == "function" && (l.coercions[a] = f, l.keys.push(a));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(a) {
      l.configs[a] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([a, f]) => {
      (typeof f == "boolean" || typeof f == "function") && (l.configs[a] = f);
    })), Ss(s.key, u, s.default, l.arrays), Object.keys(c).forEach(function(a) {
      (l.aliases[a] || []).forEach(function(f) {
        c[f] = c[a];
      });
    });
    let B = null;
    Ws();
    let N = [];
    const R = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), le = {};
    for (let a = 0; a < r.length; a++) {
      const f = r[a], C = f.replace(/^-{3,}/, "---");
      let h, D, _, F, $, k;
      if (f !== "--" && /^-/.test(f) && Ne(f))
        ce(f);
      else if (C.match(/^---+(=|$)/)) {
        ce(f);
        continue;
      } else if (f.match(/^--.+=/) || !i["short-option-groups"] && f.match(/^-.+=/))
        F = f.match(/^--?([^=]+)=([\s\S]*)$/), F !== null && Array.isArray(F) && F.length >= 3 && (v(F[1], l.arrays) ? a = De(a, F[1], r, F[2]) : v(F[1], l.nargs) !== !1 ? a = oe(a, F[1], r, F[2]) : L(F[1], F[2], !0));
      else if (f.match(y) && i["boolean-negation"])
        F = f.match(y), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], L(D, v(D, l.arrays) ? [!1] : !1));
      else if (f.match(/^--.+/) || !i["short-option-groups"] && f.match(/^-[^-]+/))
        F = f.match(/^--?(.+)/), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], v(D, l.arrays) ? a = De(a, D, r) : v(D, l.nargs) !== !1 ? a = oe(a, D, r) : ($ = r[a + 1], $ !== void 0 && (!$.match(/^-/) || $.match(w)) && !v(D, l.bools) && !v(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), a++) : L(D, fe(D))));
      else if (f.match(/^-.\..+=/))
        F = f.match(/^-([^=]+)=([\s\S]*)$/), F !== null && Array.isArray(F) && F.length >= 3 && L(F[1], F[2]);
      else if (f.match(/^-.\..+/) && !f.match(w))
        $ = r[a + 1], F = f.match(/^-(.\..+)/), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], $ !== void 0 && !$.match(/^-/) && !v(D, l.bools) && !v(D, l.counts) ? (L(D, $), a++) : L(D, fe(D)));
      else if (f.match(/^-[^-]+/) && !f.match(w)) {
        _ = f.slice(1, -1).split(""), h = !1;
        for (let z = 0; z < _.length; z++) {
          if ($ = f.slice(z + 2), _[z + 1] && _[z + 1] === "=") {
            k = f.slice(z + 3), D = _[z], v(D, l.arrays) ? a = De(a, D, r, k) : v(D, l.nargs) !== !1 ? a = oe(a, D, r, k) : L(D, k), h = !0;
            break;
          }
          if ($ === "-") {
            L(_[z], $);
            continue;
          }
          if (/[A-Za-z]/.test(_[z]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && v($, l.bools) === !1) {
            L(_[z], $), h = !0;
            break;
          }
          if (_[z + 1] && _[z + 1].match(/\W/)) {
            L(_[z], $), h = !0;
            break;
          } else
            L(_[z], fe(_[z]));
        }
        D = f.slice(-1)[0], !h && D !== "-" && (v(D, l.arrays) ? a = De(a, D, r) : v(D, l.nargs) !== !1 ? a = oe(a, D, r) : ($ = r[a + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(w)) && !v(D, l.bools) && !v(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), a++) : L(D, fe(D))));
      } else if (f.match(/^-[0-9]$/) && f.match(w) && v(f.slice(1), l.bools))
        D = f.slice(1), L(D, fe(D));
      else if (f === "--") {
        N = r.slice(a + 1);
        break;
      } else if (i["halt-at-non-option"]) {
        N = r.slice(a);
        break;
      } else
        ce(f);
    }
    Dn(R, !0), Dn(R, !1), $s(R), As(), fn(R, l.aliases, c, !0), vs(R), i["set-placeholder-key"] && Bs(R), Object.keys(l.counts).forEach(function(a) {
      ge(R, a.split(".")) || L(a, 0);
    }), x && N.length && (R[E] = []), N.forEach(function(a) {
      R[E].push(a);
    }), i["camel-case-expansion"] && i["strip-dashed"] && Object.keys(R).filter((a) => a !== "--" && a.includes("-")).forEach((a) => {
      delete R[a];
    }), i["strip-aliased"] && [].concat(...Object.keys(u).map((a) => u[a])).forEach((a) => {
      i["camel-case-expansion"] && a.includes("-") && delete R[a.split(".").map((f) => Ce(f)).join(".")], delete R[a];
    });
    function ce(a) {
      const f = Oe("_", a);
      (typeof f == "string" || typeof f == "number") && R._.push(f);
    }
    function oe(a, f, C, h) {
      let D, _ = v(f, l.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return te(h) || (B = Error(g("Argument unexpected for: %s", f))), L(f, fe(f)), a;
      let F = te(h) ? 0 : 1;
      if (i["nargs-eats-options"])
        C.length - (a + 1) + F < _ && (B = Error(g("Not enough arguments following: %s", f))), F = _;
      else {
        for (D = a + 1; D < C.length && (!C[D].match(/^-[^0-9]/) || C[D].match(w) || Ne(C[D])); D++)
          F++;
        F < _ && (B = Error(g("Not enough arguments following: %s", f)));
      }
      let $ = Math.min(F, _);
      for (!te(h) && $ > 0 && (L(f, h), $--), D = a + 1; D < $ + a + 1; D++)
        L(f, C[D]);
      return a + $;
    }
    function De(a, f, C, h) {
      let D = [], _ = h || C[a + 1];
      const F = v(f, l.nargs);
      if (v(f, l.bools) && !/^(true|false)$/.test(_))
        D.push(!0);
      else if (te(_) || te(h) && /^-/.test(_) && !w.test(_) && !Ne(_)) {
        if (c[f] !== void 0) {
          const $ = c[f];
          D = Array.isArray($) ? $ : [$];
        }
      } else {
        te(h) || D.push(vt(f, h, !0));
        for (let $ = a + 1; $ < C.length && !(!i["greedy-arrays"] && D.length > 0 || F && typeof F == "number" && D.length >= F || (_ = C[$], /^-/.test(_) && !w.test(_) && !Ne(_))); $++)
          a = $, D.push(vt(f, _, o));
      }
      return typeof F == "number" && (F && D.length < F || isNaN(F) && D.length === 0) && (B = Error(g("Not enough arguments following: %s", f))), L(f, D), a;
    }
    function L(a, f, C = o) {
      if (/-/.test(a) && i["camel-case-expansion"]) {
        const _ = a.split(".").map(function(F) {
          return Ce(F);
        }).join(".");
        X(a, _);
      }
      const h = vt(a, f, C), D = a.split(".");
      me(R, D, h), l.aliases[a] && l.aliases[a].forEach(function(_) {
        const F = _.split(".");
        me(R, F, h);
      }), D.length > 1 && i["dot-notation"] && (l.aliases[D[0]] || []).forEach(function(_) {
        let F = _.split(".");
        const $ = [].concat(D);
        $.shift(), F = F.concat($), (l.aliases[a] || []).includes(F.join(".")) || me(R, F, h);
      }), v(a, l.normalize) && !v(a, l.arrays) && [a].concat(l.aliases[a] || []).forEach(function(F) {
        Object.defineProperty(le, F, {
          enumerable: !0,
          get() {
            return f;
          },
          set($) {
            f = typeof $ == "string" ? ne.normalize($) : $;
          }
        });
      });
    }
    function X(a, f) {
      l.aliases[a] && l.aliases[a].length || (l.aliases[a] = [f], b[f] = !0), l.aliases[f] && l.aliases[f].length || X(f, a);
    }
    function vt(a, f, C) {
      C && (f = Xr(f)), (v(a, l.bools) || v(a, l.counts)) && typeof f == "string" && (f = f === "true");
      let h = Array.isArray(f) ? f.map(function(D) {
        return Oe(a, D);
      }) : Oe(a, f);
      return v(a, l.counts) && (te(h) || typeof h == "boolean") && (h = Vt()), v(a, l.normalize) && v(a, l.arrays) && (Array.isArray(f) ? h = f.map((D) => ne.normalize(D)) : h = ne.normalize(f)), h;
    }
    function Oe(a, f) {
      return !i["parse-positional-numbers"] && a === "_" || !v(a, l.strings) && !v(a, l.bools) && !Array.isArray(f) && (ss(f) && i["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${f}`))) || !te(f) && v(a, l.numbers)) && (f = Number(f)), f;
    }
    function $s(a) {
      const f = /* @__PURE__ */ Object.create(null);
      fn(f, l.aliases, c), Object.keys(l.configs).forEach(function(C) {
        const h = a[C] || f[C];
        if (h)
          try {
            let D = null;
            const _ = ne.resolve(ne.cwd(), h), F = l.configs[C];
            if (typeof F == "function") {
              try {
                D = F(_);
              } catch ($) {
                D = $;
              }
              if (D instanceof Error) {
                B = D;
                return;
              }
            } else
              D = ne.require(_);
            Bt(D);
          } catch (D) {
            D.name === "PermissionDenied" ? B = D : a[C] && (B = Error(g("Invalid JSON config file: %s", h)));
          }
      });
    }
    function Bt(a, f) {
      Object.keys(a).forEach(function(C) {
        const h = a[C], D = f ? f + "." + C : C;
        typeof h == "object" && h !== null && !Array.isArray(h) && i["dot-notation"] ? Bt(h, D) : (!ge(R, D.split(".")) || v(D, l.arrays) && i["combine-arrays"]) && L(D, h);
      });
    }
    function As() {
      typeof p < "u" && p.forEach(function(a) {
        Bt(a);
      });
    }
    function Dn(a, f) {
      if (typeof d > "u")
        return;
      const C = typeof d == "string" ? d : "", h = ne.env();
      Object.keys(h).forEach(function(D) {
        if (C === "" || D.lastIndexOf(C, 0) === 0) {
          const _ = D.split("__").map(function(F, $) {
            return $ === 0 && (F = F.substring(C.length)), Ce(F);
          });
          (f && l.configs[_.join(".")] || !f) && !ge(a, _) && L(_.join("."), h[D]);
        }
      });
    }
    function vs(a) {
      let f;
      const C = /* @__PURE__ */ new Set();
      Object.keys(a).forEach(function(h) {
        if (!C.has(h) && (f = v(h, l.coercions), typeof f == "function"))
          try {
            const D = Oe(h, f(a[h]));
            [].concat(l.aliases[h] || [], h).forEach((_) => {
              C.add(_), a[_] = D;
            });
          } catch (D) {
            B = D;
          }
      });
    }
    function Bs(a) {
      return l.keys.forEach((f) => {
        ~f.indexOf(".") || typeof a[f] > "u" && (a[f] = void 0);
      }), a;
    }
    function fn(a, f, C, h = !1) {
      Object.keys(C).forEach(function(D) {
        ge(a, D.split(".")) || (me(a, D.split("."), C[D]), h && (m[D] = !0), (f[D] || []).forEach(function(_) {
          ge(a, _.split(".")) || me(a, _.split("."), C[D]);
        }));
      });
    }
    function ge(a, f) {
      let C = a;
      i["dot-notation"] || (f = [f.join(".")]), f.slice(0, -1).forEach(function(D) {
        C = C[D] || {};
      });
      const h = f[f.length - 1];
      return typeof C != "object" ? !1 : h in C;
    }
    function me(a, f, C) {
      let h = a;
      i["dot-notation"] || (f = [f.join(".")]), f.slice(0, -1).forEach(function(k) {
        k = Bn(k), typeof h == "object" && h[k] === void 0 && (h[k] = {}), typeof h[k] != "object" || Array.isArray(h[k]) ? (Array.isArray(h[k]) ? h[k].push({}) : h[k] = [h[k], {}], h = h[k][h[k].length - 1]) : h = h[k];
      });
      const D = Bn(f[f.length - 1]), _ = v(f.join("."), l.arrays), F = Array.isArray(C);
      let $ = i["duplicate-arguments-array"];
      !$ && v(D, l.nargs) && ($ = !0, (!te(h[D]) && l.nargs[D] === 1 || Array.isArray(h[D]) && h[D].length === l.nargs[D]) && (h[D] = void 0)), C === Vt() ? h[D] = Vt(h[D]) : Array.isArray(h[D]) ? $ && _ && F ? h[D] = i["flatten-duplicate-arrays"] ? h[D].concat(C) : (Array.isArray(h[D][0]) ? h[D] : [h[D]]).concat([C]) : !$ && !!_ == !!F ? h[D] = C : h[D] = h[D].concat([C]) : h[D] === void 0 && _ ? h[D] = F ? C : [C] : $ && !(h[D] === void 0 || v(D, l.counts) || v(D, l.bools)) ? h[D] = [h[D], C] : h[D] = C;
    }
    function Ss(...a) {
      a.forEach(function(f) {
        Object.keys(f || {}).forEach(function(C) {
          l.aliases[C] || (l.aliases[C] = [].concat(u[C] || []), l.aliases[C].concat(C).forEach(function(h) {
            if (/-/.test(h) && i["camel-case-expansion"]) {
              const D = Ce(h);
              D !== C && l.aliases[C].indexOf(D) === -1 && (l.aliases[C].push(D), b[D] = !0);
            }
          }), l.aliases[C].concat(C).forEach(function(h) {
            if (h.length > 1 && /[A-Z]/.test(h) && i["camel-case-expansion"]) {
              const D = ns(h, "-");
              D !== C && l.aliases[C].indexOf(D) === -1 && (l.aliases[C].push(D), b[D] = !0);
            }
          }), l.aliases[C].forEach(function(h) {
            l.aliases[h] = [C].concat(l.aliases[C].filter(function(D) {
              return h !== D;
            }));
          }));
        });
      });
    }
    function v(a, f) {
      const C = [].concat(l.aliases[a] || [], a), h = Object.keys(f), D = C.find((_) => h.includes(_));
      return D ? f[D] : !1;
    }
    function hn(a) {
      const f = Object.keys(l);
      return [].concat(f.map((h) => l[h])).some(function(h) {
        return Array.isArray(h) ? h.includes(a) : h[a];
      });
    }
    function Rs(a, ...f) {
      return [].concat(...f).some(function(h) {
        const D = a.match(h);
        return D && hn(D[1]);
      });
    }
    function Os(a) {
      if (a.match(w) || !a.match(/^-[^-]+/))
        return !1;
      let f = !0, C;
      const h = a.slice(1).split("");
      for (let D = 0; D < h.length; D++) {
        if (C = a.slice(D + 2), !hn(h[D])) {
          f = !1;
          break;
        }
        if (h[D + 1] && h[D + 1] === "=" || C === "-" || /[A-Za-z]/.test(h[D]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(C) || h[D + 1] && h[D + 1].match(/\W/))
          break;
      }
      return f;
    }
    function Ne(a) {
      return i["unknown-options-as-args"] && Ns(a);
    }
    function Ns(a) {
      return a = a.replace(/^-{3,}/, "--"), a.match(w) || Os(a) ? !1 : !Rs(a, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function fe(a) {
      return !v(a, l.bools) && !v(a, l.counts) && `${a}` in c ? c[a] : Ls(js(a));
    }
    function Ls(a) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[a];
    }
    function js(a) {
      let f = K.BOOLEAN;
      return v(a, l.strings) ? f = K.STRING : v(a, l.numbers) ? f = K.NUMBER : v(a, l.bools) ? f = K.BOOLEAN : v(a, l.arrays) && (f = K.ARRAY), f;
    }
    function te(a) {
      return a === void 0;
    }
    function Ws() {
      Object.keys(l.counts).find((a) => v(a, l.arrays) ? (B = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", a)), !0) : v(a, l.nargs) ? (B = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", a)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(le, R),
      configuration: i,
      defaulted: Object.assign({}, m),
      error: B,
      newAliases: Object.assign({}, b)
    };
  }
}
function Qr(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(r) {
    e.push([].concat(t[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < e.length; r++)
      for (let o = r + 1; o < e.length; o++)
        if (e[r].filter(function(i) {
          return e[o].indexOf(i) !== -1;
        }).length) {
          e[r] = e[r].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(r) {
    r = r.filter(function(u, i, c) {
      return c.indexOf(u) === i;
    });
    const o = r.pop();
    o !== void 0 && typeof o == "string" && (n[o] = r);
  }), n;
}
function Vt(t) {
  return t !== void 0 ? t + 1 : 1;
}
function Bn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function Xr(t) {
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
var qt, Ut, Gt;
const Sn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Rn = (Ut = (qt = process == null ? void 0 : process.versions) === null || qt === void 0 ? void 0 : qt.node) !== null && Ut !== void 0 ? Ut : (Gt = process == null ? void 0 : process.version) === null || Gt === void 0 ? void 0 : Gt.slice(1);
if (Rn && Number(Rn.match(/^([^.]+)/)[1]) < Sn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Sn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const eo = process ? process.env : {}, rs = new Jr({
  cwd: process.cwd,
  env: () => eo,
  format: Vn,
  normalize: Ps,
  resolve: de,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(Xt(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Re = function(e, n) {
  return rs.parse(e.slice(), n).argv;
};
Re.detailed = function(t, e) {
  return rs.parse(t.slice(), e);
};
Re.camelCase = Ce;
Re.decamelize = ns;
Re.looksLikeNumber = ss;
const to = {
  right: io,
  center: ao
}, no = 0, We = 1, so = 2, Te = 3;
class ro {
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
      r.length > 1 && U.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), U.stringWidth(r[0])));
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
    const n = U.stripAnsi(e);
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
      s.forEach((u, i) => {
        const { width: c } = e[i], p = this.negatePadding(e[i]);
        let d = u;
        if (p > U.stringWidth(u) && (d += " ".repeat(p - U.stringWidth(u))), e[i].align && e[i].align !== "left" && this.wrap) {
          const E = to[e[i].align];
          d = E(d, p), U.stringWidth(d) < p && (d += " ".repeat((c || 0) - U.stringWidth(d) - 1));
        }
        const x = e[i].padding || [0, 0, 0, 0];
        x[Te] && (o += " ".repeat(x[Te])), o += On(e[i], d, "| "), o += d, o += On(e[i], d, " |"), x[We] && (o += " ".repeat(x[We])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, o = n.text, u = U.stringWidth(o.trimRight());
    return n.span ? this.wrap ? r < u ? e : (n.hidden = !0, o.trimRight() + " ".repeat(r - u) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((o, u) => {
      o.width = s[u], this.wrap ? r = U.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : r = o.text.split(`
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[no] || 0).fill("")), r.push(...new Array(o.padding[so] || 0).fill(""))), r.forEach((i, c) => {
        n[c] || n.push([]);
        const p = n[c];
        for (let d = 0; d < u; d++)
          p[d] === void 0 && p.push("");
        p.push(i);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[Te] || 0) + (e.padding[We] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((u) => u.width || U.stringWidth(u.text));
    let n = e.length, s = this.width;
    const r = e.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), o = n ? Math.floor(s / n) : 0;
    return r.map((u, i) => u === void 0 ? Math.max(o, oo(e[i])) : u);
  }
}
function On(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function oo(t) {
  const e = t.padding || [], n = 1 + (e[Te] || 0) + (e[We] || 0);
  return t.border ? n + 4 : n;
}
function uo() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function io(t, e) {
  t = t.trim();
  const n = U.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function ao(t, e) {
  t = t.trim();
  const n = U.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let U;
function co(t, e) {
  return U = e, new ro({
    width: t?.width || uo(),
    wrap: t?.wrap
  });
}
const os = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function us(t) {
  return t.replace(os, "");
}
function lo(t, e) {
  const [n, s] = t.match(os) || ["", ""];
  t = us(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Do(t) {
  return co(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: us,
    wrap: lo
  });
}
function fo(t, e) {
  let n = de(".", t), s;
  for (qn(n).isDirectory() || (n = Zt(n)); ; ) {
    if (s = e(n, qs(n)), s) return de(n, s);
    if (n = Zt(s = n), s === n) break;
  }
}
const ho = {
  fs: {
    readFileSync: Xt,
    writeFile: Us
  },
  format: Vn,
  resolve: de,
  exists: (t) => {
    try {
      return qn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let Z;
class po {
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
    })) : s(), Z.format.apply(Z.format, [this.cache[this.locale][n] || n].concat(e));
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
    const i = [u];
    return ~u.indexOf("%d") && i.push(r), Z.format.apply(Z.format, i.concat(e));
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
    const e = this, n = this.writeQueue[0], s = n.directory, r = n.locale, o = n.cb, u = this._resolveLocaleFile(s, r), i = JSON.stringify(this.cache[r], null, 2);
    Z.fs.writeFile(u, i, "utf-8", function(c) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(c);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      Z.fs.readFileSync && (e = JSON.parse(Z.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = Z.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const r = Z.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(e) {
    return Z.exists(e);
  }
}
function go(t, e) {
  Z = e;
  const n = new po(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const mo = (t) => go(t, ho), bo = "require is not supported by ESM", Nn = "loading a directory of commands is not supported yet for ESM";
let xe;
try {
  xe = Ks(import.meta.url);
} catch {
  xe = process.cwd();
}
const Co = xe.substring(0, xe.lastIndexOf("node_modules"));
Gs, Zs, ks, Co || process.cwd(), zs, Zt, Hs, Vs, de, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Xt, mo({
  directory: de(xe, "../../../locales"),
  updateFiles: !1
});
let is = !1;
const Fo = (t) => {
  is = t;
}, Ln = () => is, ae = {
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
    "apiWithoutMethod",
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
    "hugeFiles",
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
}, on = Object.keys(ae), Eo = 1.5, jn = 75, Wn = 85, Tn = 95, xo = [...Object.values(ae).flat()], as = [...on, ...xo], wo = {
  maxExpressionLength: 40,
  maxComputedLength: 5,
  minimumConsonantCount: 3,
  maxPropsCount: 5,
  minVariableName: 4,
  maxParameterCount: 3,
  maxTabs: 5,
  maxVshowLines: 10,
  maxVifLines: 10,
  complexityModerate: 5,
  warningThreshold: 4,
  maxFunctionSize: 20,
  maxScriptLength: 100,
  maxFileSize: 300
}, _o = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((E, { errors: b, warnings: m }) => ({ errors: E.errors + b, warnings: E.warnings + m }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` });
  const u = Math.ceil((1 - (s * Eo + r) / e) * 100), i = 60, c = r ? Math.max(1, Math.ceil(r / e * i)) : 0, p = s ? Math.max(1, i - Math.ceil(u * i / 100) - c) : 0, d = i - p - c, x = `<bg_ok>${"_".repeat(d)}</bg_ok><bg_warn>${"_".repeat(c)}</bg_warn><bg_err>${"_".repeat(p)}</bg_err>`;
  return o.push({ info: `Code Health: [${x}] ${u}%
` }), u < jn && o.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= jn && u < Wn && o.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= Wn && u < Tn && o.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= Tn && o.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { errors: s, warnings: r, output: o };
}, cs = async (t) => {
  const e = {
    path: "./src",
    apply: Object.values(on).join(","),
    ignore: "",
    exclude: "",
    group: "rule",
    level: "all",
    sort: "desc",
    output: "text",
    override: wo
  }, n = V.join(t, "vue-mess-detector.json");
  try {
    const s = await ie.readFile(n, "utf-8"), r = JSON.parse(s);
    return {
      ...e,
      ...r,
      override: {
        ...e.override,
        ...r.override
      }
    };
  } catch {
    return {
      ...e,
      isDefault: !0
    };
  }
}, un = async (t) => {
  let e = t;
  for (; e !== V.parse(e).root; ) {
    const n = V.join(e, "package.json");
    try {
      return await ie.access(n), e;
    } catch {
      e = V.dirname(e);
    }
  }
  throw new Error("Project root not found");
};
function yo(t) {
  const e = [], n = [];
  return Object.entries(ae).forEach(([s, r]) => {
    if (r.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = r.filter((u) => t.includes(u));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
const ls = async (t) => {
  let e = "";
  if (!t) {
    const s = Js(import.meta.url), r = V.dirname(s), o = V.resolve(r, "..");
    e = V.join(o, "package.json");
  }
  return t && (e = V.join(t, "package.json")), JSON.parse(await ie.readFile(e, "utf-8"));
}, an = async () => await un(process?.cwd() || "./") || "", Ds = async (t, e) => {
  const n = await an(), s = V.join(n, "package.json");
  return en.existsSync(s) ? !!(await ls(e)).dependencies[t] : !1;
}, fs = async (t) => {
  const e = await an(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await Ds("nuxt", t) || n.some((s) => en.existsSync(V.join(e, s)));
}, $o = async (t) => {
  const e = await an(), n = ["vue.config.js", "vue.config.ts"];
  return !await fs(t) && (await Ds("vue", t) || n.some((r) => en.existsSync(V.join(e, r))));
}, Ao = /^(\(.*\)|\\?.)$/;
function ue(t) {
  const e = t.toString();
  return Ao.test(e) ? e : `(?:${e})`;
}
const vo = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Bo = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function A(t) {
  const e = (n) => A(`(?<${n}>${`${t}`.replace(vo, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => A(`${t}${I(...n)}`), {
      referenceTo: (n) => A(`${t}\\k<${n}>`)
    }),
    or: (...n) => A(`(?:${t}|${I(...n)})`),
    after: (...n) => A(`(?<=${I(...n)})${t}`),
    before: (...n) => A(`${t}(?=${I(...n)})`),
    notAfter: (...n) => A(`(?<!${I(...n)})${t}`),
    notBefore: (...n) => A(`${t}(?!${I(...n)})`),
    times: Object.assign((n) => A(`${ue(t)}{${n}}`), {
      any: () => A(`${ue(t)}*`),
      atLeast: (n) => A(`${ue(t)}{${n},}`),
      atMost: (n) => A(`${ue(t)}{0,${n}}`),
      between: (n, s) => A(`${ue(t)}{${n},${s}}`)
    }),
    optionally: () => A(`${ue(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => A(`${t}`.replace(Bo, "($1$3)$2")),
    at: {
      lineStart: () => A(`^${t}`),
      lineEnd: () => A(`${t}$`)
    }
  };
}
const So = /[.*+?^${}()|[\]\\/]/g;
function we(t) {
  return A(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function M(t) {
  return A(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ee(...t) {
  return A(`(?:${t.map((e) => I(e)).join("|")})`);
}
const pe = A(".");
A("\\b\\w+\\b");
const G = A("\\w"), H = A("\\b"), Ro = A("\\d"), T = A("\\s"), hs = Object.assign(A("[a-zA-Z]"), {
  lowercase: A("[a-z]"),
  uppercase: A("[A-Z]")
}), ps = A("\\t"), ds = A("\\n");
A("\\r");
A("\\W+"), A("\\W"), A("\\B"), A("\\D"), A("\\S"), Object.assign(A("[^a-zA-Z]"), {
  lowercase: A("[^a-z]"),
  uppercase: A("[^A-Z]")
}), A("[^\\t]"), A("[^\\n]"), A("[^\\r]");
function Y(...t) {
  return A(`${ue(I(...t))}?`);
}
function I(...t) {
  return A(
    t.map((e) => typeof e == "string" ? e.replace(So, "\\$&") : e).join("")
  );
}
function S(...t) {
  return A(`${ue(I(...t))}+`);
}
const J = "i", j = "g", O = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(I(...t).toString(), [...e || ""].join(""));
}, Pe = [], Oo = ["get", "post", "put", "delete", "patch", "options", "head"], No = () => Pe.length = 0, Lo = (t, e) => {
  if (!e.includes("/server/api/"))
    return;
  const n = e.replace(/\.[^/.]+$/, "");
  if (Oo.some((u) => n.toLowerCase().endsWith(`.${u}`)))
    return;
  const r = t.source;
  O(
    I("if"),
    S(" "),
    "(",
    I("event.node.req.method"),
    S(" "),
    "!="
  ).test(r) || Pe.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, jo = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    const n = e.filePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ API endpoint without HTTP method</text_info>",
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${n}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/api-without-method.html`,
      message: `${e.message} 🚨`
    });
  }), No(), t;
}, W = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((i, c) => c >= n && i.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((u, i) => u + i.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, _e = [], Wo = () => _e.length = 0, To = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = W(t.content, o);
    if (u > n * 2) {
      _e.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-if with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && _e.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-if with ${u} lines</bg_warn>`
    });
  });
}, ko = () => {
  const t = [];
  return _e.length > 0 && _e.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), Wo(), t;
}, ye = [], Io = () => ye.length = 0, Mo = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = W(t.content, o);
    if (u > n * 2) {
      ye.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-show with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && ye.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-show with ${u} lines</bg_warn>`
    });
  });
}, Po = () => {
  const t = [];
  return ye.length > 0 && ye.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), Io(), t;
}, Q = (t) => {
  const e = O(
    I("/*").and(M("*").times.any(), Y(`
`).as("newline"), I("*").notBefore("/").or(S(M("*")))).and("*/").or(
      I("//").and(S(pe))
    ),
    [j]
  );
  return t.replace(e, (n) => {
    const s = n.match(/\n/g);
    return s ? s.join("") : "";
  });
}, ze = [], zo = () => ze.length = 0, Ho = (t, e, n) => {
  const { script: s, template: r } = t;
  if (!s && !r)
    return;
  const o = 2 * n, u = O(
    Ee(
      "if",
      'v-if="',
      S(pe).groupedAs("condition").and("?").and(S(pe)).and(":"),
      // ternary
      "="
    ).and(
      S(
        Ee(
          "&&",
          "||",
          M(`"'`)
        )
      )
    ),
    [j]
  ), i = O(
    Ee("&&", "||"),
    [j]
  ), c = (p, d) => {
    p = Q(p);
    const x = p.match(u);
    x && x.forEach((E) => {
      const b = (E.match(i) || []).length + 1;
      if (b > n) {
        const m = W(p, E);
        ze.push({
          filePath: e,
          message: `line #${m} ${b > o ? "<bg_err>" : "<bg_warn>"}${d} has a complicated condition with ${b} blocks${b > o ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  s && c(s.content, "script"), r && c(r.content, "template");
}, Vo = () => {
  const t = [];
  return ze.length > 0 && ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), zo(), t;
}, He = [], qo = () => He.length = 0, Uo = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const u = o[1];
    if (s.test(u)) {
      const i = W(t.content.trim(), o[0]), c = u.trim(), p = c.length > 20 ? c.slice(0, 20) : c;
      He.push({
        filePath: e,
        message: `line #${i} side effect detected in computed property <bg_err>(${p})</bg_err>`
      });
    }
  });
}, Go = () => {
  const t = [];
  return He.length > 0 && He.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), qo(), t;
}, Ve = [], Zo = () => Ve.length = 0, Ko = (t, e, n) => {
  if (!t)
    return;
  const s = 2 * n, r = O(H, "if", H, [j, J]), o = O(H, "else", H, [j, J]), u = O(H, "for", H, [j, J]), i = O(H, "while", H, [j, J]), c = O(H, "case", H, [j, J]), p = Q(t.content), d = p.match(r), x = p.match(o), E = p.match(u), b = p.match(i), m = p.match(c), g = (d?.length || 0) + (x?.length || 0) + (E?.length || 0) + (b?.length || 0) + (m?.length || 0);
  g > n && Ve.push({ filePath: e, message: `Cyclomatic complexity is ${g > s ? "<bg_err>very high" : "<bg_warn>high"} (${g})${g > s ? "</bg_err>" : "</bg_warn>"}` });
}, Yo = () => {
  const t = [];
  return Ve.length > 0 && Ve.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), Zo(), t;
}, qe = [], Jo = 3, Qo = () => qe.length = 0, Xo = (t, e, n) => {
  if (!t)
    return;
  const s = O(ps.times.atLeast(n).at.lineStart().or(T.times.atLeast(Jo * n).at.lineStart()), [j]), o = Q(t.content).match(s);
  let u = 0;
  o?.forEach((i) => {
    const c = W(t.content, i, u);
    qe.push({
      filePath: e,
      message: `line #${c} <bg_warn>indentation: ${i.length}</bg_warn>`
    }), u = c;
  });
}, eu = () => {
  const t = [];
  return qe.length > 0 && qe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), Qo(), t;
}, Ue = [], tu = () => Ue.length = 0, nu = (t, e) => {
  if (!t)
    return;
  const n = O(H, "else", H, [j, J]), r = Q(t.content).match(n);
  r?.length && Ue.push({ filePath: e, message: `else clauses found <bg_err>(${r.length})</bg_err>` });
}, su = () => {
  const t = [];
  return Ue.length > 0 && Ue.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), tu(), t;
}, $e = [], ru = 5, ou = 8;
function uu({ funcName: t, funcBody: e, lineNumber: n, filePath: s, max: r }) {
  const o = e.split(`
`).length, u = cu(t);
  if (o > 2 * r) {
    $e.push({ filePath: s, message: `function <bg_err>(${u}#${n})</bg_err> is too long: <bg_err>${o} lines</bg_err>` });
    return;
  }
  o >= r && $e.push({ filePath: s, message: `function <bg_warn>(${u}#${n})</bg_warn> is too long: <bg_warn>${o} lines</bg_warn>` });
}
function iu(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], o = n.lastIndex;
    let u = 1, i = o;
    for (; u > 0 && i < t.length; )
      t[i] === "{" ? u++ : t[i] === "}" && u--, i++;
    const c = t.slice(o, i - 1).trim();
    return {
      name: r,
      body: c,
      end: i
      // Returns the position after the matched function
    };
  } else
    return null;
}
function au(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, o] = r, u = e + r.index + r[0].length;
    let i = u, c = "";
    if (t[u] === "{") {
      let p = 1;
      for (i = u + 1; i < t.length && p > 0; )
        t[i] === "{" ? p++ : t[i] === "}" && p--, i++;
      c = t.slice(u + 1, i - 1).trim();
    } else {
      for (; i < t.length && t[i] !== ";"; )
        i++;
      c = t.slice(u, i).trim();
    }
    return {
      name: o,
      body: c,
      end: i
      // Position after the end of the function body
    };
  } else
    return null;
}
function cu(t) {
  return t.replace(/^const\s*/, "");
}
const lu = () => $e.length = 0, Du = (t, e, n) => {
  if (!t)
    return;
  const s = t.content, r = s.length;
  let o = 0;
  for (; o < r; ) {
    let u = "", i = "", c = !1;
    if (s.slice(o, o + ou) === "function") {
      const p = iu(s, o);
      p && (c = !0, u = p.name, i = p.body, o = p.end);
    }
    if (s.slice(o, o + ru) === "const") {
      const p = au(s, o);
      p && (c = !0, u = p.name, i = p.body, o = p.end);
    }
    if (c) {
      const p = W(s.trim(), u);
      uu({ funcName: u, funcBody: i, lineNumber: p, filePath: e, max: n });
    } else
      o++;
  }
}, fu = (t) => {
  const e = [];
  return $e.length > 0 && $e.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${n.message} 🚨`
    });
  }), lu(), e;
}, Ge = [], hu = () => Ge.length = 0, pu = (t, e) => {
  if (!t)
    return;
  const n = O("<", I("img").or("picture"), [j]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const u = W(t.content, o, r), i = o.slice(1);
      Ge.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i} element found</bg_warn>`
      }), r = u;
    });
  }
}, du = () => {
  const t = [];
  return Ge.length > 0 && Ge.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), hu(), t;
}, Ze = [], gu = () => Ze.length = 0, mu = (t, e) => {
  if (!t)
    return;
  const n = O("<a", H, [j, J]), s = t.content.match(n);
  s?.length && Ze.push({ filePath: e, message: `${s?.length} <bg_warn>html link found</bg_warn>` });
}, bu = () => {
  const t = [];
  return Ze.length > 0 && Ze.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), gu(), t;
}, Ae = [], Cu = () => Ae.length = 0, Fu = (t, e, n, s) => {
  const r = 2 * s;
  let o = 0;
  n ? (o = t.scriptSetup?.content.trim().split(`
`).length ?? 0, o += t.template?.content.trim().split(`
`).length ?? 0, o += t.styles?.reduce((u, i) => u + i.content.trim().split(`
`).length, 0) ?? 0) : o = t.scriptSetup?.content.trim().split(`
`).length ?? 0, o > r ? Ae.push({
    filePath: e,
    message: `<bg_err>huge file (${o} lines)</bg_err>`
  }) : o > s && Ae.push({
    filePath: e,
    message: `<bg_warn>large file (${o} lines)</bg_warn>`
  });
}, Eu = () => {
  const t = [];
  return Ae.length > 0 && Ae.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ huge files</text_info>",
      description: "👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html",
      message: `${e.message} 🚨`
    });
  }), Cu(), t;
}, Ke = [], xu = () => Ke.length = 0, wu = (t, e) => {
  if (!t)
    return;
  const s = Q(t.content).split(`
`);
  s.forEach((r, o) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const i = s[o + 1]?.trim();
      (!i || !i.startsWith("{") && !u.endsWith("{")) && Ke.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: <bg_err>${u}</bg_err>`
      });
    }
  });
}, _u = () => {
  const t = [];
  return Ke.length > 0 && Ke.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), xu(), t;
}, Ye = [], yu = () => Ye.length = 0, $u = (t, e) => {
  if (!t)
    return;
  const n = O(Ee(H), S(Ro).as("magicNumber"), Ee(")", ds), [j]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, u = Number.parseInt(o ?? "0");
    if (u > 1) {
      const i = W(t.content, String(u), r);
      Ye.push({
        filePath: e,
        message: `line #${i} <bg_warn>magic number: ${u}</bg_warn>`
      }), r = i;
    }
  }
}, Au = () => {
  const t = [];
  return Ye.length && Ye.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), yu(), t;
}, Je = [], vu = () => Je.length = 0, Bu = (t, e) => {
  if (!t)
    return;
  const n = O(S(pe), T, "?", T, S(pe), T, ":", T, S(pe));
  Q(t.content).match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const u = W(t.content, o);
      Je.push({
        filePath: e,
        message: `line #${u} has <bg_warn>nested ternary</bg_warn>`
      });
    }
  });
}, Su = () => {
  const t = [];
  return Je.length > 0 && Je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), vu(), t;
}, Qe = [], Ru = () => Qe.length = 0, Ou = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const u = W(t.content.trim(), o[0], r);
    Qe.push({
      filePath: e,
      message: `line #${u} <bg_warn>Found inline style: ${o[0]}</bg_warn>`
    }), r = u;
  });
}, Nu = () => {
  const t = [];
  return Qe.length > 0 && Qe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Ru(), t;
}, Xe = [], Lu = () => Xe.length = 0, ju = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  Q(t.content).match(n)?.forEach((o) => {
    const u = W(t.content, o);
    Xe.push({
      filePath: e,
      message: `line #${u} <bg_warn>props destructuring found: ${o}</bg_warn>`
    });
  });
}, Wu = () => {
  const t = [];
  return Xe.length > 0 && Xe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), Lu(), t;
}, et = [], Tu = () => et.length = 0, ku = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  Q(t.content).match(n)?.forEach((o) => {
    const u = W(t.content, o);
    et.push({
      filePath: e,
      message: `line #${u} <bg_warn>Avoid using 'var' for variable declarations: ${o}</bg_warn>`
    });
  });
}, Iu = () => {
  const t = [];
  return et.length > 0 && et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), Tu(), t;
}, tt = [], Mu = () => tt.length = 0, kn = (t, e, n, s) => {
  const r = e.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  r.length > s && tt.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${r.length}</bg_warn> parameters` });
}, Pu = (t, e, n) => {
  if (!t)
    return;
  const s = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; )
    r[1] && kn(r[1], r[2], e, n), r[3] && kn(r[3], r[4], e, n);
}, zu = (t) => {
  const e = [];
  return tt.length > 0 && tt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${n.message} 🚨`
    });
  }), Mu(), e;
}, nt = [], Hu = () => nt.length = 0, Vu = (t, e) => {
  !t || t.setup || nt.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, qu = () => {
  const t = [];
  return nt.length > 0 && nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), Hu(), t;
}, st = [], Uu = () => st.length = 0, Gu = (t, e) => {
  if (!t)
    return;
  const n = O(
    "defineProps(",
    T.times.any(),
    "[",
    T.times.any(),
    S(we(`'"`), S(G), we(`'"`), T.times.any(), Y(",", T.times.any())),
    "]",
    T.times.any(),
    ")",
    [j]
  ), s = O(
    "<",
    S(G).grouped(),
    T,
    M(">").times.any(),
    ":",
    S(G).grouped(),
    T.times.any(),
    "=",
    T.times.any(),
    '"props.',
    S(G).grouped(),
    '"',
    [j]
  );
  let r;
  const o = /* @__PURE__ */ new Set(), u = Q(t.content);
  for (; (r = n.exec(u)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((p) => o.add(p));
  let i;
  for (; (i = s.exec(t.content)) !== null; ) {
    const c = i[1], p = i[2], d = i[3];
    o.has(d) && p === d && st.push({
      filePath: e,
      message: `Prop <bg_warn>(${d})</bg_warn> is being drilled through <bg_warn>${c}</bg_warn> component unmodified.`
    });
  }
}, Zu = () => {
  const t = [];
  return st.length > 0 && st.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Uu(), t;
}, rt = [], Ku = () => rt.length = 0, Yu = (t, e, n) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.length > n && rt.push({ filePath: e, message: `${s.length > n * 2 ? "<bg_err>" : "<bg_warn>"}(${s.length} lines)${s.length > n * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ju = (t) => {
  const e = [];
  return rt.length > 0 && rt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${n.message} 🚨`
    });
  }), Ku(), e;
}, ot = [], Qu = () => ot.length = 0, Xu = ["i", "key"], ei = (t, e, n) => {
  if (!t)
    return;
  const s = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const o = r[1];
    o.length < n && !Xu.includes(o) && ot.push({ filePath: e, message: `variable: <bg_warn>(${o})</bg_warn>` });
  }
}, ti = (t) => {
  const e = [];
  return ot.length > 0 && ot.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${n.message} 🚨`
    });
  }), Qu(), e;
}, ut = [], ni = () => ut.length = 0, si = (t, e, n) => {
  if (!t)
    return;
  const s = O("defineProps", Y("<"), Y("("), "{", S(M("}")), "}", ["g", "s"]), o = Q(t.content).match(s);
  if (o?.length) {
    const u = o[0].split(",").length;
    u > n && ut.push({ filePath: e, message: `props found <bg_err>(${u})</bg_err>` });
  }
}, ri = () => {
  const t = [];
  return ut.length > 0 && ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), ni(), t;
}, it = [], oi = () => it.length = 0, ui = (t, e) => {
  if (!t)
    return;
  const n = O('v-for="(', T.times.any(), S(G).grouped(), T.times.any(), ",", T.times.any(), S(G).grouped(), T.times.any(), ")", S(T), "in", S(T), S(G).grouped(), [j]), s = O(':key="', T.times.any(), S(G).grouped(), T.times.any(), '"', [j]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((u) => {
    const [i, c, p, d] = u;
    o.forEach((x) => {
      const E = x[1];
      if (E === p) {
        const b = W(t.content.trim(), E);
        it.push({
          filePath: e,
          message: `line #${b} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, ii = () => {
  const t = [];
  return it.length > 0 && it.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), oi(), t;
}, at = [], ai = () => at.length = 0, ci = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  const r = Q(t.content);
  for (; (s = n.exec(r)) !== null; ) {
    const o = s[0], u = s[1], i = W(r.trim(), o);
    at.push({
      filePath: e,
      message: `line #${i} zero length comparison found <bg_warn>(${u})</bg_warn>`
    });
  }
}, li = () => {
  const t = [];
  return at.length > 0 && at.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Zero Length Comparison</text_info>",
      description: "👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html",
      message: `${e.message} 🚨`
    });
  }), ai(), t;
}, Di = [
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
], ct = [], fi = () => ct.length = 0, hi = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      Di.includes(o) && ct.push({ filePath: e, message: `<bg_warn>(${o})</bg_warn>` });
    }
  });
}, pi = () => {
  const t = [];
  return ct.length > 0 && ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), fi(), t;
}, ve = [], di = () => ve.length = 0, gi = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = O(I("$parent").or("getCurrentInstance"), [j]), o = t.content.match(n), u = t.content.match(s);
  if (u) {
    const c = u[1].split(".")[0];
    if ((o ? o[1] : "").includes(c)) {
      const d = W(t.content.trim(), c);
      ve.push({
        filePath: e,
        message: `line #${d} <bg_warn>(${c})</bg_warn>`
      });
    }
  }
  const i = t.content.match(r);
  if (i) {
    const c = W(t.content.trim(), i[0]);
    ve.push({
      filePath: e,
      message: `line #${c} <bg_warn>(${i[0]})</bg_warn>`
    });
  }
}, mi = () => {
  const t = [];
  return ve.length > 0 && ve.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), di(), t;
}, lt = [], bi = () => lt.length = 0, Ci = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || lt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Fi = () => {
  const t = [];
  return lt.length > 0 && lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), bi(), t;
}, Dt = [], Ei = () => Dt.length = 0, xi = (t, e) => {
  if (!t)
    return;
  const n = O("defineProps([", [j, J]);
  t.content.match(n)?.length && Dt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, wi = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), Ei(), t;
}, ft = [], _i = () => ft.length = 0, yi = (t) => {
  if (t.includes("pages"))
    return;
  const e = V.basename(t);
  if (e === "App.vue")
    return;
  const n = O(hs.uppercase);
  e.slice(1).match(n)?.length || ft.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, $i = () => {
  const t = [];
  return ft.length > 0 && ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), _i(), t;
}, ht = [], Ai = () => ht.length = 0, vi = (t, e) => {
  if (!t)
    return;
  const n = O("<", S(M(">")), " v-for", S(M(">")), ">", [
    j,
    J
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || ht.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, Bi = () => {
  const t = [];
  return ht.length > 0 && ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), Ai(), t;
}, pt = [], Si = () => pt.length = 0, Ri = (t, e) => {
  if (!t)
    return;
  const n = O(
    "<",
    S(M(">")),
    " v-if",
    S(M(">")),
    " v-for",
    S(M(">")),
    ">",
    [j, J]
  ), s = O(
    "<",
    S(M(">")),
    " v-for",
    S(M(">")),
    " v-if",
    S(M(">")),
    ">",
    [j, J]
  ), r = t.content.match(n), o = t.content.match(s);
  if (r?.length || o?.length) {
    const u = r?.length ? r[0] : o?.length ? o[0] : "", i = W(t.content, u);
    pt.push({ filePath: e, message: `line #${i} <bg_err>v-if used with v-for</bg_err>` });
  }
}, Oi = () => {
  const t = [];
  return pt.length > 0 && pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), Si(), t;
}, dt = [], In = [
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
], Ni = () => dt.length = 0, Li = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const u = o[1], i = o[2];
    if (i) {
      const p = Array.from(i.matchAll(r), (x) => x[1]).filter((x) => In.includes(x));
      let d = -1;
      for (const x of p) {
        const E = In.indexOf(x);
        if (E !== -1 && E < d) {
          dt.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${u})</bg_warn>`
          });
          break;
        }
        d = E;
      }
    }
  }
}, ji = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), Ni(), t;
}, gt = [], Wi = () => gt.length = 0, Ti = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), o = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: o }
  ].filter((c) => c.index !== -1);
  u.every((c, p) => p === 0 ? !0 : u[p - 1].index < c.index) || gt.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, ki = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), Wi(), t;
}, mt = [], Ii = () => mt.length = 0, Mi = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = V.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && mt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, Pi = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), Ii(), t;
}, bt = [], zi = () => bt.length = 0, Hi = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = W(t.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    bt.push({ filePath: e, message: `line #${o} <bg_warn>(${u})</bg_warn>` });
  });
}, Vi = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), zi(), t;
}, Ct = [], Mn = [], qi = ["v-slot", "v-bind", "v-on"], Ui = () => Ct.length = 0, Gi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  qi.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = W(t.source, s);
      Ct.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), Mn.some((o) => o.filePath === e) || Mn.push({ filePath: e });
    }
  });
}, Zi = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), Ui(), t;
}, Ft = [], Ki = () => Ft.length = 0, Yi = (t, e) => {
  const n = O(
    S(M("/")).grouped(),
    I(".vue").at.lineEnd()
  ), s = t.match(n);
  if (s) {
    const r = s[0]?.split(".vue")[0], o = O(
      we("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [j]
    ), u = r.match(o);
    (!u || u.length < e) && Ft.push({ filePath: t, message: `${r} is not a <bg_warn>full word.</bg_warn>` });
  }
}, Ji = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), Ki(), t;
}, Et = [], Qi = () => Et.length = 0, Xi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((i) => i.trim() !== "").length > 1 && o.split(`
`).length === 1 && Et.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, ea = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Qi(), t;
}, xt = [], ta = /^[a-z]+([A-Z][a-z]*)*$/, na = () => xt.length = 0, sa = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !ta.test(o)).length && xt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
}, ra = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), na(), t;
}, wt = [], oa = () => wt.length = 0, ua = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = O(
    "<",
    S(G),
    Y(S(we(` 	
\r`))),
    S(M("/>")),
    Y(S(we(` 	
\r`))),
    Y("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const o = O(":", S(G), Y(" "), "=", Y(" "), M(`'"`), [
    "g"
  ]);
  r?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const i = u.match(o);
    if (i?.length) {
      const c = W(t.source, u);
      wt.push({ filePath: e, message: `line #${c} <bg_warn>${i}</bg_warn>` });
    }
  });
}, ia = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), oa(), t;
}, _t = [], aa = () => _t.length = 0, ca = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = O(
    "<",
    S(hs.uppercase, G),
    Y(ds, ps),
    Y(S(M(">"))),
    "></",
    S(G),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const u = W(t.source, o), i = o.split(`
`).at(-1)?.trim() || "";
    _t.push({ filePath: e, message: `line #${u} <bg_warn>${i}</bg_warn>` });
  });
}, la = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), aa(), t;
}, cn = [], ke = [], Da = () => cn.length = 0, fa = (t, e, n) => {
  if (!t)
    return;
  const s = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, r = t.content.match(s);
  r?.length && r.forEach((o) => {
    if (o.split(`
`).length > n) {
      const u = o.split(`
`)[0], i = W(t.content, u);
      cn.push({ filePath: e, message: `line #${i} <bg_warn>computed</bg_warn>` }), ke.push({ filePath: e }), ke.some((c) => c.filePath === e) || ke.push({ filePath: e });
    }
  });
}, ha = () => {
  const t = [];
  return ke.length > 0 && cn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), Da(), t;
}, yt = [], pa = () => yt.length = 0, da = (t, e, n) => {
  if (!t)
    return;
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(s)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > n) {
      const u = W(t.content, o), i = o.split(`
`).at(0)?.trim() || "";
      yt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i}</bg_warn>`
      });
    }
  });
}, ga = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), pa(), t;
}, ma = (t, e, n, s) => {
  const r = t.scriptSetup || t.script, o = e.endsWith(".vue"), u = {
    // vue-essential
    simpleProp: () => xi(r, e),
    singleNameComponent: () => o && yi(e),
    globalStyle: () => o && Ci(t.styles, e),
    vforNoKey: () => o && vi(t.template, e),
    vifWithVfor: () => o && Ri(t.template, e),
    // vue-strong
    simpleComputed: () => fa(r, e, s.maxComputedLength),
    componentFiles: () => o && Hi(r, e),
    propNameCasing: () => o && sa(r, e),
    componentFilenameCasing: () => o && Mi(e),
    selfClosingComponents: () => o && ca(t, e),
    templateSimpleExpression: () => o && da(t.template, e, s.maxExpressionLength),
    quotedAttributeValues: () => o && ua(t, e),
    directiveShorthands: () => o && Gi(t, e),
    fullWordComponentName: () => o && Yi(e, s.minimumConsonantCount),
    multiAttributeElements: () => o && Xi(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => o && Ti(t.source, e),
    elementAttributeOrder: () => o && Li(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => o && gi(r, e),
    elementSelectorsWithScoped: () => o && hi(t.styles, e),
    // rrd
    apiWithoutMethod: () => Ln() && Lo(t, e),
    bigVif: () => To(t.template, e, s.maxVifLines),
    bigVShow: () => Mo(t.template, e, s.maxVshowLines),
    complicatedConditions: () => Ho(t, e, s.warningThreshold),
    cyclomaticComplexity: () => Ko(r, e, s.complexityModerate),
    computedSideEffects: () => Uo(r, e),
    deepIndentation: () => Xo(r, e, s.maxTabs),
    elseCondition: () => nu(r, e),
    functionSize: () => Du(r, e, s.maxFunctionSize),
    htmlImageElements: () => Ln() && pu(t.template, e),
    htmlLink: () => o && mu(t.template, e),
    hugeFiles: () => Fu(t, e, o, s.maxFileSize),
    ifWithoutCurlyBraces: () => wu(r, e),
    magicNumbers: () => $u(r, e),
    nestedTernary: () => Bu(r, e),
    noPropDestructure: () => ju(r, e),
    noVarDeclaration: () => ku(r, e),
    parameterCount: () => Pu(r, e, s.maxParameterCount),
    plainScript: () => o && Vu(t.script, e),
    propsDrilling: () => Gu(r, e),
    scriptLength: () => Yu(r, e, s.maxScriptLength),
    shortVariableName: () => ei(r, e, s.minVariableName),
    tooManyProps: () => si(r, e, s.maxPropsCount),
    vForWithIndexKey: () => o && ui(t.template, e),
    zeroLengthComparison: () => ci(r, e),
    noInlineStyles: () => Ou(t.template, e)
  };
  n.forEach((i) => {
    i in ae && ae[i].forEach((c) => {
      c in u && u[c]();
    }), i in u && u[i]();
  });
}, ba = (t, e, n, s) => {
  const r = {}, o = {}, u = [], i = ({ file: d, rule: x, title: E, description: b, message: m }) => {
    const g = t === "rule" ? x : d;
    r[g] || (r[g] = []), r[g].push({ file: d, rule: x, title: E, description: b, message: m });
  }, c = (d) => {
    d().forEach((E) => {
      i(E);
    });
  };
  return c($i), c(wi), c(Bi), c(Oi), c(Fi), c(Pi), c(Vi), c(Zi), c(Ji), c(ea), c(ra), c(ia), c(la), c(ha), c(ga), c(ki), c(ji), c(mi), c(pi), c(jo), c(ko), c(Po), c(Vo), c(Yo), c(Go), c(eu), c(su), c(() => fu(s.maxFunctionSize)), c(du), c(bu), c(Eu), c(_u), c(Au), c(Su), c(Wu), c(Iu), c(() => zu(s.maxParameterCount)), c(qu), c(Zu), c(() => Ju(s.maxScriptLength)), c(() => ti(s.minVariableName)), c(ri), c(ii), c(li), c(Nu), Object.keys(r).sort((d, x) => {
    const E = r[d].length, b = r[x].length;
    return e === "desc" ? b - E : E - b;
  }).forEach((d) => {
    o[d] = [], r[d].forEach((x, E) => {
      const b = x.message.includes("<bg_err>");
      if (u.some((m) => m.file === x.file)) {
        const m = u.find((g) => g.file === x.file);
        m && b && m.errors++, m && !b && m.warnings++;
      } else
        u.push({ file: x.file, errors: b ? 1 : 0, warnings: b ? 0 : 1, output: [] });
      n === "error" && !b || (o[d][E] = { id: "", description: "", message: "" }, t === "file" && (o[d][E].id = x.rule), t !== "file" && (o[d][E].id = x.file), o[d][E].description = x.description, o[d][E].message = x.message || "🚨");
    });
  }), { output: o, health: u };
};
let Ie = 0, Qt = 0, gs = [], ms = {};
const Ca = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], ln = [], Pn = async (t, e) => {
  if (!ln.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    Ie++;
    const n = await ie.readFile(e, "utf-8");
    Qt += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Ys(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), ma(s, e, gs, ms), `Analyzing ${e}...`;
  }
}, bs = async (t) => {
  const e = [];
  if (!(await ie.stat(t)).isDirectory()) {
    const r = await Pn(t, t);
    return r && e.push(r), e;
  }
  const s = await ie.readdir(t);
  for (const r of s) {
    const o = V.join(t, r);
    if ((await ie.stat(o)).isDirectory() && !Ca.some((c) => o.includes(c)) && !ln.some((c) => o.endsWith(c))) {
      const c = await bs(o);
      c && e.push(...c);
    }
    const i = await Pn(o, o);
    i && e.push(i);
  }
  return e;
}, Fa = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s = "", groupBy: r = "rule", level: o = "all", sortBy: u = "desc" }) => {
  Ie = 0, Qt = 0;
  const i = await un(t), c = await cs(i);
  e = e.length ? e : c.apply.split(","), n = n.length ? n : c.ignore ? c.ignore.split(",") : [], s = s || c.exclude, r = r || c.group, o = o || c.level, u = u || c.sort, ms = c.override;
  const p = e.filter((X) => !n.includes(X)), { rulesets: d, individualRules: x } = yo(p), E = d.length ? `<bg_info>${d.join(", ")}</bg_info>` : "N/A", b = x.length ? `<bg_info>${x.join(", ")}</bg_info>` : "N/A";
  let m = `      Applying ${d.length} rulesets: ${E}`;
  x.length > 0 && (m += `
      Applying ${x.length} individual rules: ${b}`);
  const g = n.filter((X) => !d.includes(X)), l = g.length ? `<bg_info>${g.join(", ")}</bg_info>` : "N/A", w = await $o(i), y = await fs(i);
  Fo(y);
  const B = [];
  B.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` });
  const N = c.isDefault ? "👉 Using <bg_info>default</bg_info> configuration" : "👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>";
  B.push({ info: N }), B.push({ info: `      Project type: <bg_info>${y ? "Nuxt" : ""}${w ? "Vue" : ""}${!y && !w ? "?" : ""}</bg_info>` }), B.push({
    info: `${m}
      Ignoring ${g.length} rules: ${l}
      Excluding ${s || "-"}
      Output level <bg_info>${o}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${u}</bg_info>`
  }), gs = e.filter((X) => !n.includes(X)), s && ln.push(...s.split(","));
  const R = await bs(t);
  B.push(...R.map((X) => ({ info: X }))), B.push({ info: `Found <bg_info>${Ie}</bg_info> files` });
  const { health: le, output: ce } = ba(r, u, o, c.override), { errors: oe, warnings: De, output: L } = _o(le, Qt, Ie);
  return !oe && !De && B.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: B, codeHealthOutput: L, reportOutput: ce };
}, Cs = "\x1B[44m", Ea = "\x1B[43m", Be = "\x1B[41m", xa = "\x1B[42m", re = "\x1B[0m", Fs = "\x1B[33m", Es = "\x1B[36m", $t = "\x1B[0m", zn = (t) => t.replace(/<bg_err>/g, Be).replace(/<bg_warn>/g, Ea).replace(/<bg_info>/g, Cs).replace(/<bg_ok>/g, xa).replace(/<\/bg_err>/g, re).replace(/<\/bg_warn>/g, re).replace(/<\/bg_info>/g, re).replace(/<\/bg_ok>/g, re).replace(/<text_warn>/g, Fs).replace(/<text_info>/g, Es).replace(/<\/text_warn>/g, $t).replace(/<\/text_info>/g, $t), Hn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(ae) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    on.includes(o) ? s.push(...ae[o]) : Object.values(ae).some((u) => u.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${Be}Invalid ${t} values: ${r.join(", ")}${re}. 
${Fs}Allowed values are: ${as.join(", ")}${$t}

`
  ), process.exit(1)), s;
}, xs = ["rule", "file"], ws = ["asc", "desc"], _s = ["text", "json", "table"], ys = ["all", "error"], wa = {
  groupBy: xs,
  sortBy: ws,
  outputLevel: ys,
  outputFormat: _s
}, Le = (t, e) => {
  const n = wa[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${Be}${t}${re} provided for flag ${Es}${e}${$t}. Valid options are: ${Cs}${n.join(", ")}${re}.
`
  ), process.exit(1)), t;
}, _a = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4];
un(_a || "./src").then(async (t) => {
  const e = await cs(t);
  ls().then(
    (n) => Ms(Zr(process.argv)).config(e).command(
      "analyze [path]",
      "Analyze Vue files for code smells and best practices",
      (s) => s.positional("path", {
        describe: "path to the Vue files",
        default: "./src"
      }).option("apply", {
        alias: "a",
        describe: "Comma-separated list of rulesets/rules to apply.",
        choices: as,
        coerce: Hn("apply"),
        group: "Filter Rulesets/Rules:",
        default: ""
      }).option("exclude", {
        alias: "e",
        describe: "Exclude files or directories from the analysis",
        default: "",
        group: "Exclude files:"
      }).option("group", {
        alias: "g",
        describe: "Group results at the output",
        choices: xs,
        coerce: (r) => Le(r, "groupBy"),
        default: "",
        group: "Group Results:"
      }).option("level", {
        alias: "l",
        describe: "Output level",
        choices: ys,
        coerce: (r) => Le(r, "outputLevel"),
        default: "",
        group: "Output:"
      }).option("ignore", {
        alias: "i",
        describe: "Comma-separated list of rulesets to ignore.",
        coerce: Hn("ignore"),
        default: "",
        group: "Filter Rulesets:"
      }).option("sort", {
        alias: "s",
        describe: "Sort results at the output",
        choices: ws,
        coerce: (r) => Le(r, "sortBy"),
        default: "",
        group: "Sort Results:"
      }).option("output", {
        describe: "Output format",
        choices: _s,
        coerce: (r) => Le(r, "outputFormat"),
        default: "",
        group: "Output Format:"
      }).option("fileOutput", {
        alias: "f",
        describe: "Output file",
        default: "",
        group: "Output:"
      }),
      (s) => {
        const r = s.fileOutput, o = (u) => r ? (ie.appendFile(r, `${u}
`), u) : (console.log(zn(u)), zn(u));
        Fa({
          dir: s.path,
          apply: s.apply,
          ignore: s.ignore,
          exclude: s.exclude,
          groupBy: s.group,
          level: s.level,
          sortBy: s.sort
        }).then((u) => {
          if (s.output == "text") {
            [...u.output].forEach((i) => {
              o(i.info);
            });
            for (const i in u.reportOutput)
              o(`
- <text_info> ${i}</text_info>`), u.reportOutput[i].forEach((c) => {
                o(`   ${c.id}`), o(`   ${c.description}`), o(`   ${c.message}
`);
              });
            u.codeHealthOutput?.forEach((i) => {
              o(i.info);
            });
          }
          if (s.output == "table") {
            r && (console.log(`We can not output ${Be}to a file in table mode${re}`), process.exit(1)), [...u.output].forEach((i) => {
              o(i.info);
            });
            for (const i in u.reportOutput) {
              const c = new qr({
                head: ["id", "message"],
                colWidths: [60, 60],
                wordWrap: !0,
                wrapOnWordBoundary: !1
              });
              o("-".repeat(120)), s.group == "rule" && (o(`<text_info>Rule: ${i}</text_info>`), o(`Description: ${u.reportOutput[i][0].description}`), u.reportOutput[i].forEach((p) => {
                c.push([o(p.id), o(p.message)]);
              })), s.group == "file" && (o(`<text_info>File: ${i}</text_info>`), u.reportOutput[i].forEach((p) => {
                c.push([`${p.id}
${p.description.replace("See: ", `See:
`)}`, p.message]);
              })), o(c.toString());
            }
            u.codeHealthOutput?.forEach((i) => {
              o(i.info);
            });
          }
          s.output == "json" && o(JSON.stringify(u, null, 2));
        }).catch((u) => {
          console.error(`${Be}${u}${re}`);
        });
      }
    ).version("version", "Show version number", n.version).alias("version", "v").help().argv
  );
});
export {
  xo as FLAT_RULES,
  Fa as analyze
};
