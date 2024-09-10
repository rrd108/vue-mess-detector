import ue from "node:fs/promises";
import z from "node:path";
import Us, { format as Kn, inspect as qs } from "util";
import Zs from "os";
import Ks from "yargs";
import { normalize as Ys, resolve as de, dirname as Dt, basename as Js, extname as Qs, relative as Xs } from "path";
import { readFileSync as tn, statSync as Yn, readdirSync as er, writeFile as tr } from "fs";
import { notStrictEqual as nr, strictEqual as sr } from "assert";
import { fileURLToPath as rr } from "url";
import { parse as or } from "@vue/compiler-sfc";
import nn from "node:fs";
import { fileURLToPath as ur } from "node:url";
function ir(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let sn = [], Jn = 0;
const M = (t, e) => {
  Jn >= e && sn.push(t);
};
M.WARN = 1;
M.INFO = 2;
M.DEBUG = 3;
M.reset = () => {
  sn = [];
};
M.setDebugLevel = (t) => {
  Jn = t;
};
M.warn = (t) => M(t, M.WARN);
M.info = (t) => M(t, M.INFO);
M.debug = (t) => M(t, M.DEBUG);
M.debugMessages = () => sn;
var rn = M, on = { exports: {} }, ar = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const cr = ar;
var lr = (t) => typeof t == "string" ? t.replace(cr(), "") : t, un = { exports: {} };
const Qn = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
un.exports = Qn;
un.exports.default = Qn;
var Dr = un.exports, fr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const hr = lr, pr = Dr, dr = fr, Xn = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = hr(t), t.length === 0))
    return 0;
  t = t.replace(dr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += pr(s) ? 2 : 1);
  }
  return e;
};
on.exports = Xn;
on.exports.default = Xn;
var gr = on.exports;
const gn = gr;
function We(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ee(t) {
  let e = We();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, u) {
    return gn(u) > r ? gn(u) : r;
  }, 0);
}
function be(t, e) {
  return Array(e + 1).join(t);
}
function mr(t, e, n, s) {
  let r = ee(t);
  if (e + 1 >= r) {
    let u = e - r;
    switch (s) {
      case "right": {
        t = be(n, u) + t;
        break;
      }
      case "center": {
        let o = Math.ceil(u / 2), a = u - o;
        t = be(n, a) + t + be(n, o);
        break;
      }
      default: {
        t = t + be(n, u);
        break;
      }
    }
  }
  return t;
}
let he = {};
function _e(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", he[e] = { set: t, to: !0 }, he[n] = { set: t, to: !1 }, he[t] = { on: e, off: n };
}
_e("bold", 1, 22);
_e("italics", 3, 23);
_e("underline", 4, 24);
_e("inverse", 7, 27);
_e("strikethrough", 9, 29);
function es(t, e) {
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
function br(t) {
  let e = We(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    es(s, n), n = e.exec(t);
  return s;
}
function ts(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += he[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function Fr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = he[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Cr(t, e) {
  if (t.length === ee(t))
    return t.substr(0, e);
  for (; ee(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Er(t, e) {
  let n = We(!0), s = t.split(We()), r = 0, u = 0, o = "", a, f = {};
  for (; u < e; ) {
    a = n.exec(t);
    let p = s[r];
    if (r++, u + ee(p) > e && (p = Cr(p, e - u)), o += p, u += ee(p), u < e) {
      if (!a)
        break;
      o += a[0], es(f, a);
    }
  }
  return ts(f, o);
}
function xr(t, e, n) {
  if (n = n || "…", ee(t) <= e)
    return t;
  e -= ee(n);
  let r = Er(t, e);
  r += n;
  const u = "\x1B]8;;\x07";
  return t.includes(u) && !r.includes(u) && (r += u), r;
}
function wr() {
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
function _r(t, e) {
  t = t || {}, e = e || wr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function yr(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], u = 0, o;
  for (let a = 0; a < s.length; a += 2) {
    let f = s[a], p = u + ee(f);
    u > 0 && o && (p += o.length), p > t ? (u !== 0 && n.push(r.join("")), r = [f], u = ee(f)) : (r.push(o || "", f), u = p), o = s[a + 1];
  }
  return u && n.push(r.join("")), n;
}
function Ar(t, e) {
  let n = [], s = "";
  function r(o, a) {
    for (s.length && a && (s += a), s += o; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let u = e.split(/(\s+)/g);
  for (let o = 0; o < u.length; o += 2)
    r(u[o], o && u[o - 1]);
  return s.length && n.push(s), n;
}
function vr(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? yr : Ar;
  for (let u = 0; u < e.length; u++)
    s.push.apply(s, r(t, e[u]));
  return s;
}
function $r(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = Fr(e, t[s]);
    e = br(r);
    let u = Object.assign({}, e);
    n.push(ts(u, r));
  }
  return n;
}
function Br(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var ns = {
  strlen: ee,
  repeat: be,
  pad: mr,
  truncate: xr,
  mergeOptions: _r,
  wordWrap: vr,
  colorizeLines: $r,
  hyperlink: Br
}, ss = { exports: {} }, He = { exports: {} }, qe = { exports: {} }, Ze = { exports: {} }, Ke = { exports: {} }, mn;
function Sr() {
  return mn || (mn = 1, function(t) {
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
      var r = n[s], u = e[s] = [];
      u.open = "\x1B[" + r[0] + "m", u.close = "\x1B[" + r[1] + "m";
    });
  }(Ke)), Ke.exports;
}
var Ye, bn;
function Or() {
  return bn || (bn = 1, Ye = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Ye;
}
var Je, Fn;
function Rr() {
  if (Fn) return Je;
  Fn = 1;
  var t = Zs, e = Or(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function r(a) {
    return a === 0 ? !1 : {
      level: a,
      hasBasic: !0,
      has256: a >= 2,
      has16m: a >= 3
    };
  }
  function u(a) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (a && !a.isTTY && s !== !0)
      return 0;
    var f = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(w) {
        return w in n;
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
  function o(a) {
    var f = u(a);
    return r(f);
  }
  return Je = {
    supportsColor: o,
    stdout: o(process.stdout),
    stderr: o(process.stderr)
  }, Je;
}
var Qe = { exports: {} }, Cn;
function Nr() {
  return Cn || (Cn = 1, function(t) {
    t.exports = function(n, s) {
      var r = "";
      n = n || "Run the trap, drop the bass", n = n.split("");
      var u = {
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
      return n.forEach(function(o) {
        o = o.toLowerCase();
        var a = u[o] || [" "], f = Math.floor(Math.random() * a.length);
        typeof u[o] < "u" ? r += u[o][f] : r += o;
      }), r;
    };
  }(Qe)), Qe.exports;
}
var Xe = { exports: {} }, En;
function Lr() {
  return En || (En = 1, function(t) {
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
      }, u = [].concat(r.up, r.down, r.mid);
      function o(p) {
        var d = Math.floor(Math.random() * p);
        return d;
      }
      function a(p) {
        var d = !1;
        return u.filter(function(w) {
          d = w === p;
        }), d;
      }
      function f(p, d) {
        var w = "", E, F;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (F in p)
          if (!a(F)) {
            switch (w = w + p[F], E = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                E.up = o(8), E.mid = o(2), E.down = o(8);
                break;
              case "maxi":
                E.up = o(16) + 3, E.mid = o(4) + 1, E.down = o(64) + 3;
                break;
              default:
                E.up = o(8) + 1, E.mid = o(6) / 2, E.down = o(8) + 1;
                break;
            }
            var b = ["up", "mid", "down"];
            for (var m in b)
              for (var c = b[m], x = 0; x <= E[c]; x++)
                d[c] && (w = w + r[c][o(r[c].length)]);
          }
        return w;
      }
      return f(n, s);
    };
  }(Xe)), Xe.exports;
}
var et = { exports: {} }, xn;
function jr() {
  return xn || (xn = 1, function(t) {
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
  }(et)), et.exports;
}
var tt = { exports: {} }, wn;
function Tr() {
  return wn || (wn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(tt)), tt.exports;
}
var nt = { exports: {} }, _n;
function Wr() {
  return _n || (_n = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, u) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(nt)), nt.exports;
}
var st = { exports: {} }, yn;
function Ir() {
  return yn || (yn = 1, function(t) {
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
      return function(s, r, u) {
        return s === " " ? s : e[n[Math.round(Math.random() * (n.length - 2))]](s);
      };
    };
  }(st)), st.exports;
}
var An;
function Mr() {
  return An || (An = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Us, s = e.styles = Sr(), r = Object.defineProperties, u = new RegExp(/[\r\n]+/g);
    e.supportsColor = Rr().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(m) {
      return ("" + m).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(c, x) {
      if (!e.enabled)
        return c + "";
      var A = s[x];
      return !A && x in e ? e[x](c) : A.open + c + A.close;
    };
    var o = /[|\\{}()[\]^$+*?.]/g, a = function(m) {
      if (typeof m != "string")
        throw new TypeError("Expected a string");
      return m.replace(o, "\\$&");
    };
    function f(m) {
      var c = function x() {
        return w.apply(x, arguments);
      };
      return c._styles = m, c.__proto__ = d, c;
    }
    var p = function() {
      var m = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(c) {
        s[c].closeRe = new RegExp(a(s[c].close), "g"), m[c] = {
          get: function() {
            return f(this._styles.concat(c));
          }
        };
      }), m;
    }(), d = r(function() {
    }, p);
    function w() {
      var m = Array.prototype.slice.call(arguments), c = m.map(function(O) {
        return O != null && O.constructor === String ? O : n.inspect(O);
      }).join(" ");
      if (!e.enabled || !c)
        return c;
      for (var x = c.indexOf(`
`) != -1, A = this._styles, B = A.length; B--; ) {
        var R = s[A[B]];
        c = R.open + c.replace(R.closeRe, R.open) + R.close, x && (c = c.replace(u, function(O) {
          return R.close + O + R.open;
        }));
      }
      return c;
    }
    e.setTheme = function(m) {
      if (typeof m == "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var c in m)
        (function(x) {
          e[x] = function(A) {
            if (typeof m[x] == "object") {
              var B = A;
              for (var R in m[x])
                B = e[m[x][R]](B);
              return B;
            }
            return e[m[x]](A);
          };
        })(c);
    };
    function E() {
      var m = {};
      return Object.keys(p).forEach(function(c) {
        m[c] = {
          get: function() {
            return f([c]);
          }
        };
      }), m;
    }
    var F = function(c, x) {
      var A = x.split("");
      return A = A.map(c), A.join("");
    };
    e.trap = Nr(), e.zalgo = Lr(), e.maps = {}, e.maps.america = jr()(e), e.maps.zebra = Tr()(e), e.maps.rainbow = Wr()(e), e.maps.random = Ir()(e);
    for (var b in e.maps)
      (function(m) {
        e[m] = function(c) {
          return F(e.maps[m], c);
        };
      })(b);
    r(e, E());
  }(Ze)), Ze.exports;
}
var vn;
function kr() {
  return vn || (vn = 1, function(t) {
    var e = Mr();
    t.exports = e;
  }(qe)), qe.exports;
}
const { info: Pr, debug: rs } = rn, V = ns;
let zr = class Oe {
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
    let s = this.options.chars || {}, r = e.chars, u = this.chars = {};
    Hr.forEach(function(f) {
      rt(s, r, f, u);
    }), this.truncate = this.options.truncate || e.truncate;
    let o = this.options.style = this.options.style || {}, a = e.style;
    rt(o, a, "padding-left", this), rt(o, a, "padding-right", this), this.head = o.head || a.head, this.border = o.border || a.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = V.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let o = 1;
        for (; o < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + o], o++;
      }
      const { wrapOnWordBoundary: r = !0 } = e, { wrapOnWordBoundary: u = r } = this.options;
      return this.wrapLines(V.wordWrap(this.fixedWidth, this.content, u));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = V.colorizeLines(e);
    return this.href ? n.map((s) => V.hyperlink(this.href, s)) : n;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Bn, -1), this.height = this.heights.reduce(Bn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    let s = V.truncate(this.content, 10, this.truncate);
    e || Pr(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
    let r = Math.max(this.height - this.lines.length, 0), u;
    switch (this.vAlign) {
      case "center":
        u = Math.ceil(r / 2);
        break;
      case "bottom":
        u = r;
        break;
      default:
        u = 0;
    }
    if (e < u || e >= u + this.lines.length)
      return this.drawEmpty(this.drawRight, n);
    let o = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - u, this.drawRight, o, n);
  }
  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(e) {
    let n = [];
    return this.cells ? this.widths.forEach(function(s, r) {
      n.push(this._topLeftChar(r)), n.push(V.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(V.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof Oe.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let u = 1;
      for (; this.cells[this.y][n - u] instanceof Oe.ColSpanCell; )
        u++;
      this.cells[this.y][n - u] instanceof Oe.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = kr();
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
    let u = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && r && this.cells) {
      let E = this.cells[this.y + r][this.x - 1];
      for (; E instanceof ft; )
        E = this.cells[E.y][E.x - 1];
      E instanceof ht || (u = this.chars.rightMid);
    }
    let o = V.repeat(" ", this.paddingLeft), a = n ? this.chars.right : "", f = V.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let w = V.truncate(p, d, this.truncate);
    return w = V.pad(w, d, " ", this.hAlign), w = o + w + f, this.stylizeLine(u, w, a);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = V.repeat(this.chars.bottom, this.width), r = e ? this.chars.bottomRight : "";
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
      let o = this.cells[this.y + n][this.x - 1];
      for (; o instanceof ft; )
        o = this.cells[o.y][o.x - 1];
      o instanceof ht || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", u = V.repeat(" ", this.width);
    return this.stylizeLine(s, u, r);
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
    return typeof e == "number" && rs(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
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
    this.cellOffset = n - s, this.offset = Vr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (rs(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function $n(...t) {
  return t.filter((e) => e != null).shift();
}
function rt(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = $n(t[r], t[n], e[r], e[n])) : s[n] = $n(t[n], e[n]);
}
function Vr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function Bn(t, e) {
  return t + e + 1;
}
let Hr = [
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
He.exports = zr;
He.exports.ColSpanCell = ft;
He.exports.RowSpanCell = ht;
var Gr = He.exports;
const { warn: Ur, debug: qr } = rn, pt = Gr, { ColSpanCell: Zr, RowSpanCell: Kr } = pt;
(function() {
  function t(F, b) {
    return F[b] > 0 ? t(F, b + 1) : b;
  }
  function e(F) {
    let b = {};
    F.forEach(function(m, c) {
      let x = 0;
      m.forEach(function(A) {
        A.y = c, A.x = c ? t(b, x) : x;
        const B = A.rowSpan || 1, R = A.colSpan || 1;
        if (B > 1)
          for (let O = 0; O < R; O++)
            b[A.x + O] = B;
        x = A.x + R;
      }), Object.keys(b).forEach((A) => {
        b[A]--, b[A] < 1 && delete b[A];
      });
    });
  }
  function n(F) {
    let b = 0;
    return F.forEach(function(m) {
      m.forEach(function(c) {
        b = Math.max(b, c.x + (c.colSpan || 1));
      });
    }), b;
  }
  function s(F) {
    return F.length;
  }
  function r(F, b) {
    let m = F.y, c = F.y - 1 + (F.rowSpan || 1), x = b.y, A = b.y - 1 + (b.rowSpan || 1), B = !(m > A || x > c), R = F.x, O = F.x - 1 + (F.colSpan || 1), ce = b.x, Z = b.x - 1 + (b.colSpan || 1), le = !(R > Z || ce > O);
    return B && le;
  }
  function u(F, b, m) {
    let c = Math.min(F.length - 1, m), x = { x: b, y: m };
    for (let A = 0; A <= c; A++) {
      let B = F[A];
      for (let R = 0; R < B.length; R++)
        if (r(x, B[R]))
          return !0;
    }
    return !1;
  }
  function o(F, b, m, c) {
    for (let x = m; x < c; x++)
      if (u(F, x, b))
        return !1;
    return !0;
  }
  function a(F) {
    F.forEach(function(b, m) {
      b.forEach(function(c) {
        for (let x = 1; x < c.rowSpan; x++) {
          let A = new Kr(c);
          A.x = c.x, A.y = c.y + x, A.colSpan = c.colSpan, p(A, F[m + x]);
        }
      });
    });
  }
  function f(F) {
    for (let b = F.length - 1; b >= 0; b--) {
      let m = F[b];
      for (let c = 0; c < m.length; c++) {
        let x = m[c];
        for (let A = 1; A < x.colSpan; A++) {
          let B = new Zr();
          B.x = x.x + A, B.y = x.y, m.splice(c + 1, 0, B);
        }
      }
    }
  }
  function p(F, b) {
    let m = 0;
    for (; m < b.length && b[m].x < F.x; )
      m++;
    b.splice(m, 0, F);
  }
  function d(F) {
    let b = s(F), m = n(F);
    qr(`Max rows: ${b}; Max cols: ${m}`);
    for (let c = 0; c < b; c++)
      for (let x = 0; x < m; x++)
        if (!u(F, x, c)) {
          let A = { x, y: c, colSpan: 1, rowSpan: 1 };
          for (x++; x < m && !u(F, x, c); )
            A.colSpan++, x++;
          let B = c + 1;
          for (; B < b && o(F, B, A.x, A.x + A.colSpan); )
            A.rowSpan++, B++;
          let R = new pt(A);
          R.x = A.x, R.y = A.y, Ur(`Missing cell at ${R.y}-${R.x}.`), p(R, F[c]);
        }
  }
  function w(F) {
    return F.map(function(b) {
      if (!Array.isArray(b)) {
        let m = Object.keys(b)[0];
        b = b[m], Array.isArray(b) ? (b = b.slice(), b.unshift(m)) : b = [m, b];
      }
      return b.map(function(m) {
        return new pt(m);
      });
    });
  }
  function E(F) {
    let b = w(F);
    return e(b), d(b), a(b), f(b), b;
  }
  ss.exports = {
    makeTableLayout: E,
    layoutTable: e,
    addRowSpanCells: a,
    maxWidth: n,
    fillInTable: d,
    computeWidths: Sn("colSpan", "desiredWidth", "x", 1),
    computeHeights: Sn("rowSpan", "desiredHeight", "y", 1)
  };
})();
function Sn(t, e, n, s) {
  return function(r, u) {
    let o = [], a = [], f = {};
    u.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? a.push(d) : o[d[n]] = Math.max(o[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(p, d) {
      typeof p == "number" && (o[d] = p);
    });
    for (let p = a.length - 1; p >= 0; p--) {
      let d = a[p], w = d[t], E = d[n], F = o[E], b = typeof r[E] == "number" ? 0 : 1;
      if (typeof F == "number")
        for (let m = 1; m < w; m++)
          F += 1 + o[E + m], typeof r[E + m] != "number" && b++;
      else
        F = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!f[E] || f[E] < F) && (f[E] = F);
      if (d[e] > F) {
        let m = 0;
        for (; b > 0 && d[e] > F; ) {
          if (typeof r[E + m] != "number") {
            let c = Math.round((d[e] - F) / b);
            F += c, o[E + m] += c, b--;
          }
          m++;
        }
      }
    }
    Object.assign(r, o, f);
    for (let p = 0; p < r.length; p++)
      r[p] = Math.max(s, r[p] || 0);
  };
}
var Yr = ss.exports;
const se = rn, Jr = ns, ot = Yr;
let os = class extends Array {
  constructor(e) {
    super();
    const n = Jr.mergeOptions(e);
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
    let s = ot.makeTableLayout(e);
    s.forEach(function(u) {
      u.forEach(function(o) {
        o.mergeTableOptions(this.options, s);
      }, this);
    }, this), ot.computeWidths(this.options.colWidths, s), ot.computeHeights(this.options.rowHeights, s), s.forEach(function(u) {
      u.forEach(function(o) {
        o.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let u = 0; u < s.length; u++) {
      let o = s[u], a = this.options.rowHeights[u];
      (u === 0 || !this.options.style.compact || u == 1 && n) && ut(o, "top", r);
      for (let f = 0; f < a; f++)
        ut(o, f, r);
      u + 1 == s.length && ut(o, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
os.reset = () => se.reset();
function ut(t, e, n) {
  let s = [];
  t.forEach(function(u) {
    s.push(u.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Qr = os, Xr = Qr;
const eo = /* @__PURE__ */ ir(Xr);
class Ce extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Ce);
  }
}
function us() {
  return to() ? 0 : 1;
}
function to() {
  return no() && !process.defaultApp;
}
function no() {
  return !!process.versions.electron;
}
function so(t) {
  return t.slice(us() + 1);
}
function ro() {
  return process.argv[us()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Fe(t) {
  if (t !== t.toLowerCase() && t !== t.toUpperCase() || (t = t.toLowerCase()), t.indexOf("-") === -1 && t.indexOf("_") === -1)
    return t;
  {
    let n = "", s = !1;
    const r = t.match(/^-+/);
    for (let u = r ? r[0].length : 0; u < t.length; u++) {
      let o = t.charAt(u);
      s && (s = !1, o = o.toUpperCase()), u !== 0 && (o === "-" || o === "_") ? s = !0 : o !== "-" && o !== "_" && (n += o);
    }
    return n;
  }
}
function is(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const u = n.charAt(r), o = t.charAt(r);
    u !== o && r > 0 ? s += `${e}${n.charAt(r)}` : s += o;
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
function oo(t) {
  if (Array.isArray(t))
    return t.map((o) => typeof o != "string" ? o + "" : o);
  t = t.trim();
  let e = 0, n = null, s = null, r = null;
  const u = [];
  for (let o = 0; o < t.length; o++) {
    if (n = s, s = t.charAt(o), s === " " && !r) {
      n !== " " && e++;
      continue;
    }
    s === r ? r = null : (s === "'" || s === '"') && !r && (r = s), u[e] || (u[e] = ""), u[e] += s;
  }
  return u;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Y;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(Y || (Y = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let ne;
class uo {
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
    }, n), r = oo(e), u = typeof e == "string", o = io(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), a = Object.assign({
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
    }, s.configuration), f = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, w = a["populate--"], E = w ? "--" : "_", F = /* @__PURE__ */ Object.create(null), b = /* @__PURE__ */ Object.create(null), m = s.__ || ne.format, c = {
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
    }, x = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, A = new RegExp("^--" + a["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(i) {
      const D = typeof i == "object" ? i.key : i, g = Object.keys(i).map(function(h) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[h];
      }).filter(Boolean).pop();
      g && (c[g][D] = !0), c.arrays[D] = !0, c.keys.push(D);
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
    })), Ms(s.key, o, s.default, c.arrays), Object.keys(f).forEach(function(i) {
      (c.aliases[i] || []).forEach(function(D) {
        f[D] = f[i];
      });
    });
    let B = null;
    Gs();
    let R = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ce = {};
    for (let i = 0; i < r.length; i++) {
      const D = r[i], g = D.replace(/^-{3,}/, "---");
      let h, l, _, C, y, I;
      if (D !== "--" && /^-/.test(D) && $e(D))
        Z(D);
      else if (g.match(/^---+(=|$)/)) {
        Z(D);
        continue;
      } else if (D.match(/^--.+=/) || !a["short-option-groups"] && D.match(/^-.+=/))
        C = D.match(/^--?([^=]+)=([\s\S]*)$/), C !== null && Array.isArray(C) && C.length >= 3 && ($(C[1], c.arrays) ? i = Ae(i, C[1], r, C[2]) : $(C[1], c.nargs) !== !1 ? i = le(i, C[1], r, C[2]) : L(C[1], C[2], !0));
      else if (D.match(A) && a["boolean-negation"])
        C = D.match(A), C !== null && Array.isArray(C) && C.length >= 2 && (l = C[1], L(l, $(l, c.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !a["short-option-groups"] && D.match(/^-[^-]+/))
        C = D.match(/^--?(.+)/), C !== null && Array.isArray(C) && C.length >= 2 && (l = C[1], $(l, c.arrays) ? i = Ae(i, l, r) : $(l, c.nargs) !== !1 ? i = le(i, l, r) : (y = r[i + 1], y !== void 0 && (!y.match(/^-/) || y.match(x)) && !$(l, c.bools) && !$(l, c.counts) || /^(true|false)$/.test(y) ? (L(l, y), i++) : L(l, De(l))));
      else if (D.match(/^-.\..+=/))
        C = D.match(/^-([^=]+)=([\s\S]*)$/), C !== null && Array.isArray(C) && C.length >= 3 && L(C[1], C[2]);
      else if (D.match(/^-.\..+/) && !D.match(x))
        y = r[i + 1], C = D.match(/^-(.\..+)/), C !== null && Array.isArray(C) && C.length >= 2 && (l = C[1], y !== void 0 && !y.match(/^-/) && !$(l, c.bools) && !$(l, c.counts) ? (L(l, y), i++) : L(l, De(l)));
      else if (D.match(/^-[^-]+/) && !D.match(x)) {
        _ = D.slice(1, -1).split(""), h = !1;
        for (let k = 0; k < _.length; k++) {
          if (y = D.slice(k + 2), _[k + 1] && _[k + 1] === "=") {
            I = D.slice(k + 3), l = _[k], $(l, c.arrays) ? i = Ae(i, l, r, I) : $(l, c.nargs) !== !1 ? i = le(i, l, r, I) : L(l, I), h = !0;
            break;
          }
          if (y === "-") {
            L(_[k], y);
            continue;
          }
          if (/[A-Za-z]/.test(_[k]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && $(y, c.bools) === !1) {
            L(_[k], y), h = !0;
            break;
          }
          if (_[k + 1] && _[k + 1].match(/\W/)) {
            L(_[k], y), h = !0;
            break;
          } else
            L(_[k], De(_[k]));
        }
        l = D.slice(-1)[0], !h && l !== "-" && ($(l, c.arrays) ? i = Ae(i, l, r) : $(l, c.nargs) !== !1 ? i = le(i, l, r) : (y = r[i + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(x)) && !$(l, c.bools) && !$(l, c.counts) || /^(true|false)$/.test(y) ? (L(l, y), i++) : L(l, De(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(x) && $(D.slice(1), c.bools))
        l = D.slice(1), L(l, De(l));
      else if (D === "--") {
        R = r.slice(i + 1);
        break;
      } else if (a["halt-at-non-option"]) {
        R = r.slice(i);
        break;
      } else
        Z(D);
    }
    hn(O, !0), hn(O, !1), js(O), Ts(), pn(O, c.aliases, f, !0), Ws(O), a["set-placeholder-key"] && Is(O), Object.keys(c.counts).forEach(function(i) {
      ge(O, i.split(".")) || L(i, 0);
    }), w && R.length && (O[E] = []), R.forEach(function(i) {
      O[E].push(i);
    }), a["camel-case-expansion"] && a["strip-dashed"] && Object.keys(O).filter((i) => i !== "--" && i.includes("-")).forEach((i) => {
      delete O[i];
    }), a["strip-aliased"] && [].concat(...Object.keys(o).map((i) => o[i])).forEach((i) => {
      a["camel-case-expansion"] && i.includes("-") && delete O[i.split(".").map((D) => Fe(D)).join(".")], delete O[i];
    });
    function Z(i) {
      const D = ve("_", i);
      (typeof D == "string" || typeof D == "number") && O._.push(D);
    }
    function le(i, D, g, h) {
      let l, _ = $(D, c.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return te(h) || (B = Error(m("Argument unexpected for: %s", D))), L(D, De(D)), i;
      let C = te(h) ? 0 : 1;
      if (a["nargs-eats-options"])
        g.length - (i + 1) + C < _ && (B = Error(m("Not enough arguments following: %s", D))), C = _;
      else {
        for (l = i + 1; l < g.length && (!g[l].match(/^-[^0-9]/) || g[l].match(x) || $e(g[l])); l++)
          C++;
        C < _ && (B = Error(m("Not enough arguments following: %s", D)));
      }
      let y = Math.min(C, _);
      for (!te(h) && y > 0 && (L(D, h), y--), l = i + 1; l < y + i + 1; l++)
        L(D, g[l]);
      return i + y;
    }
    function Ae(i, D, g, h) {
      let l = [], _ = h || g[i + 1];
      const C = $(D, c.nargs);
      if ($(D, c.bools) && !/^(true|false)$/.test(_))
        l.push(!0);
      else if (te(_) || te(h) && /^-/.test(_) && !x.test(_) && !$e(_)) {
        if (f[D] !== void 0) {
          const y = f[D];
          l = Array.isArray(y) ? y : [y];
        }
      } else {
        te(h) || l.push(Ge(D, h, !0));
        for (let y = i + 1; y < g.length && !(!a["greedy-arrays"] && l.length > 0 || C && typeof C == "number" && l.length >= C || (_ = g[y], /^-/.test(_) && !x.test(_) && !$e(_))); y++)
          i = y, l.push(Ge(D, _, u));
      }
      return typeof C == "number" && (C && l.length < C || isNaN(C) && l.length === 0) && (B = Error(m("Not enough arguments following: %s", D))), L(D, l), i;
    }
    function L(i, D, g = u) {
      if (/-/.test(i) && a["camel-case-expansion"]) {
        const _ = i.split(".").map(function(C) {
          return Fe(C);
        }).join(".");
        fn(i, _);
      }
      const h = Ge(i, D, g), l = i.split(".");
      me(O, l, h), c.aliases[i] && c.aliases[i].forEach(function(_) {
        const C = _.split(".");
        me(O, C, h);
      }), l.length > 1 && a["dot-notation"] && (c.aliases[l[0]] || []).forEach(function(_) {
        let C = _.split(".");
        const y = [].concat(l);
        y.shift(), C = C.concat(y), (c.aliases[i] || []).includes(C.join(".")) || me(O, C, h);
      }), $(i, c.normalize) && !$(i, c.arrays) && [i].concat(c.aliases[i] || []).forEach(function(C) {
        Object.defineProperty(ce, C, {
          enumerable: !0,
          get() {
            return D;
          },
          set(y) {
            D = typeof y == "string" ? ne.normalize(y) : y;
          }
        });
      });
    }
    function fn(i, D) {
      c.aliases[i] && c.aliases[i].length || (c.aliases[i] = [D], F[D] = !0), c.aliases[D] && c.aliases[D].length || fn(D, i);
    }
    function Ge(i, D, g) {
      g && (D = ao(D)), ($(i, c.bools) || $(i, c.counts)) && typeof D == "string" && (D = D === "true");
      let h = Array.isArray(D) ? D.map(function(l) {
        return ve(i, l);
      }) : ve(i, D);
      return $(i, c.counts) && (te(h) || typeof h == "boolean") && (h = it()), $(i, c.normalize) && $(i, c.arrays) && (Array.isArray(D) ? h = D.map((l) => ne.normalize(l)) : h = ne.normalize(D)), h;
    }
    function ve(i, D) {
      return !a["parse-positional-numbers"] && i === "_" || !$(i, c.strings) && !$(i, c.bools) && !Array.isArray(D) && (as(D) && a["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !te(D) && $(i, c.numbers)) && (D = Number(D)), D;
    }
    function js(i) {
      const D = /* @__PURE__ */ Object.create(null);
      pn(D, c.aliases, f), Object.keys(c.configs).forEach(function(g) {
        const h = i[g] || D[g];
        if (h)
          try {
            let l = null;
            const _ = ne.resolve(ne.cwd(), h), C = c.configs[g];
            if (typeof C == "function") {
              try {
                l = C(_);
              } catch (y) {
                l = y;
              }
              if (l instanceof Error) {
                B = l;
                return;
              }
            } else
              l = ne.require(_);
            Ue(l);
          } catch (l) {
            l.name === "PermissionDenied" ? B = l : i[g] && (B = Error(m("Invalid JSON config file: %s", h)));
          }
      });
    }
    function Ue(i, D) {
      Object.keys(i).forEach(function(g) {
        const h = i[g], l = D ? D + "." + g : g;
        typeof h == "object" && h !== null && !Array.isArray(h) && a["dot-notation"] ? Ue(h, l) : (!ge(O, l.split(".")) || $(l, c.arrays) && a["combine-arrays"]) && L(l, h);
      });
    }
    function Ts() {
      typeof p < "u" && p.forEach(function(i) {
        Ue(i);
      });
    }
    function hn(i, D) {
      if (typeof d > "u")
        return;
      const g = typeof d == "string" ? d : "", h = ne.env();
      Object.keys(h).forEach(function(l) {
        if (g === "" || l.lastIndexOf(g, 0) === 0) {
          const _ = l.split("__").map(function(C, y) {
            return y === 0 && (C = C.substring(g.length)), Fe(C);
          });
          (D && c.configs[_.join(".")] || !D) && !ge(i, _) && L(_.join("."), h[l]);
        }
      });
    }
    function Ws(i) {
      let D;
      const g = /* @__PURE__ */ new Set();
      Object.keys(i).forEach(function(h) {
        if (!g.has(h) && (D = $(h, c.coercions), typeof D == "function"))
          try {
            const l = ve(h, D(i[h]));
            [].concat(c.aliases[h] || [], h).forEach((_) => {
              g.add(_), i[_] = l;
            });
          } catch (l) {
            B = l;
          }
      });
    }
    function Is(i) {
      return c.keys.forEach((D) => {
        ~D.indexOf(".") || typeof i[D] > "u" && (i[D] = void 0);
      }), i;
    }
    function pn(i, D, g, h = !1) {
      Object.keys(g).forEach(function(l) {
        ge(i, l.split(".")) || (me(i, l.split("."), g[l]), h && (b[l] = !0), (D[l] || []).forEach(function(_) {
          ge(i, _.split(".")) || me(i, _.split("."), g[l]);
        }));
      });
    }
    function ge(i, D) {
      let g = i;
      a["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        g = g[l] || {};
      });
      const h = D[D.length - 1];
      return typeof g != "object" ? !1 : h in g;
    }
    function me(i, D, g) {
      let h = i;
      a["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(I) {
        I = On(I), typeof h == "object" && h[I] === void 0 && (h[I] = {}), typeof h[I] != "object" || Array.isArray(h[I]) ? (Array.isArray(h[I]) ? h[I].push({}) : h[I] = [h[I], {}], h = h[I][h[I].length - 1]) : h = h[I];
      });
      const l = On(D[D.length - 1]), _ = $(D.join("."), c.arrays), C = Array.isArray(g);
      let y = a["duplicate-arguments-array"];
      !y && $(l, c.nargs) && (y = !0, (!te(h[l]) && c.nargs[l] === 1 || Array.isArray(h[l]) && h[l].length === c.nargs[l]) && (h[l] = void 0)), g === it() ? h[l] = it(h[l]) : Array.isArray(h[l]) ? y && _ && C ? h[l] = a["flatten-duplicate-arrays"] ? h[l].concat(g) : (Array.isArray(h[l][0]) ? h[l] : [h[l]]).concat([g]) : !y && !!_ == !!C ? h[l] = g : h[l] = h[l].concat([g]) : h[l] === void 0 && _ ? h[l] = C ? g : [g] : y && !(h[l] === void 0 || $(l, c.counts) || $(l, c.bools)) ? h[l] = [h[l], g] : h[l] = g;
    }
    function Ms(...i) {
      i.forEach(function(D) {
        Object.keys(D || {}).forEach(function(g) {
          c.aliases[g] || (c.aliases[g] = [].concat(o[g] || []), c.aliases[g].concat(g).forEach(function(h) {
            if (/-/.test(h) && a["camel-case-expansion"]) {
              const l = Fe(h);
              l !== g && c.aliases[g].indexOf(l) === -1 && (c.aliases[g].push(l), F[l] = !0);
            }
          }), c.aliases[g].concat(g).forEach(function(h) {
            if (h.length > 1 && /[A-Z]/.test(h) && a["camel-case-expansion"]) {
              const l = is(h, "-");
              l !== g && c.aliases[g].indexOf(l) === -1 && (c.aliases[g].push(l), F[l] = !0);
            }
          }), c.aliases[g].forEach(function(h) {
            c.aliases[h] = [g].concat(c.aliases[g].filter(function(l) {
              return h !== l;
            }));
          }));
        });
      });
    }
    function $(i, D) {
      const g = [].concat(c.aliases[i] || [], i), h = Object.keys(D), l = g.find((_) => h.includes(_));
      return l ? D[l] : !1;
    }
    function dn(i) {
      const D = Object.keys(c);
      return [].concat(D.map((h) => c[h])).some(function(h) {
        return Array.isArray(h) ? h.includes(i) : h[i];
      });
    }
    function ks(i, ...D) {
      return [].concat(...D).some(function(h) {
        const l = i.match(h);
        return l && dn(l[1]);
      });
    }
    function Ps(i) {
      if (i.match(x) || !i.match(/^-[^-]+/))
        return !1;
      let D = !0, g;
      const h = i.slice(1).split("");
      for (let l = 0; l < h.length; l++) {
        if (g = i.slice(l + 2), !dn(h[l])) {
          D = !1;
          break;
        }
        if (h[l + 1] && h[l + 1] === "=" || g === "-" || /[A-Za-z]/.test(h[l]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) || h[l + 1] && h[l + 1].match(/\W/))
          break;
      }
      return D;
    }
    function $e(i) {
      return a["unknown-options-as-args"] && zs(i);
    }
    function zs(i) {
      return i = i.replace(/^-{3,}/, "--"), i.match(x) || Ps(i) ? !1 : !ks(i, /^-+([^=]+?)=[\s\S]*$/, A, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function De(i) {
      return !$(i, c.bools) && !$(i, c.counts) && `${i}` in f ? f[i] : Vs(Hs(i));
    }
    function Vs(i) {
      return {
        [Y.BOOLEAN]: !0,
        [Y.STRING]: "",
        [Y.NUMBER]: void 0,
        [Y.ARRAY]: []
      }[i];
    }
    function Hs(i) {
      let D = Y.BOOLEAN;
      return $(i, c.strings) ? D = Y.STRING : $(i, c.numbers) ? D = Y.NUMBER : $(i, c.bools) ? D = Y.BOOLEAN : $(i, c.arrays) && (D = Y.ARRAY), D;
    }
    function te(i) {
      return i === void 0;
    }
    function Gs() {
      Object.keys(c.counts).find((i) => $(i, c.arrays) ? (B = Error(m("Invalid configuration: %s, opts.count excludes opts.array.", i)), !0) : $(i, c.nargs) ? (B = Error(m("Invalid configuration: %s, opts.count excludes opts.narg.", i)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, c.aliases),
      argv: Object.assign(ce, O),
      configuration: a,
      defaulted: Object.assign({}, b),
      error: B,
      newAliases: Object.assign({}, F)
    };
  }
}
function io(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(r) {
    e.push([].concat(t[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < e.length; r++)
      for (let u = r + 1; u < e.length; u++)
        if (e[r].filter(function(a) {
          return e[u].indexOf(a) !== -1;
        }).length) {
          e[r] = e[r].concat(e[u]), e.splice(u, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(r) {
    r = r.filter(function(o, a, f) {
      return f.indexOf(o) === a;
    });
    const u = r.pop();
    u !== void 0 && typeof u == "string" && (n[u] = r);
  }), n;
}
function it(t) {
  return t !== void 0 ? t + 1 : 1;
}
function On(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function ao(t) {
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
var at, ct, lt;
const Rn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Nn = (ct = (at = process == null ? void 0 : process.versions) === null || at === void 0 ? void 0 : at.node) !== null && ct !== void 0 ? ct : (lt = process == null ? void 0 : process.version) === null || lt === void 0 ? void 0 : lt.slice(1);
if (Nn && Number(Nn.match(/^([^.]+)/)[1]) < Rn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Rn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const co = process ? process.env : {}, cs = new uo({
  cwd: process.cwd,
  env: () => co,
  format: Kn,
  normalize: Ys,
  resolve: de,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(tn(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ye = function(e, n) {
  return cs.parse(e.slice(), n).argv;
};
ye.detailed = function(t, e) {
  return cs.parse(t.slice(), e);
};
ye.camelCase = Fe;
ye.decamelize = is;
ye.looksLikeNumber = as;
const lo = {
  right: mo,
  center: bo
}, Do = 0, Re = 1, fo = 2, Ne = 3;
class ho {
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
      r.length > 1 && H.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), H.stringWidth(r[0])));
    }), n.forEach((r) => {
      this.div(...r.map((u, o) => ({
        text: u.trim(),
        padding: this.measurePadding(u),
        width: o === 0 && r.length > 1 ? s : void 0
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
    const n = H.stripAnsi(e);
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
      let u = "";
      s.forEach((o, a) => {
        const { width: f } = e[a], p = this.negatePadding(e[a]);
        let d = o;
        if (p > H.stringWidth(o) && (d += " ".repeat(p - H.stringWidth(o))), e[a].align && e[a].align !== "left" && this.wrap) {
          const E = lo[e[a].align];
          d = E(d, p), H.stringWidth(d) < p && (d += " ".repeat((f || 0) - H.stringWidth(d) - 1));
        }
        const w = e[a].padding || [0, 0, 0, 0];
        w[Ne] && (u += " ".repeat(w[Ne])), u += Ln(e[a], d, "| "), u += d, u += Ln(e[a], d, " |"), w[Re] && (u += " ".repeat(w[Re])), r === 0 && n.length > 0 && (u = this.renderInline(u, n[n.length - 1]));
      }), n.push({
        text: u.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, u = n.text, o = H.stringWidth(u.trimRight());
    return n.span ? this.wrap ? r < o ? e : (n.hidden = !0, u.trimRight() + " ".repeat(r - o) + e.trimLeft()) : (n.hidden = !0, u + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((u, o) => {
      u.width = s[o], this.wrap ? r = H.wrap(u.text, this.negatePadding(u), { hard: !0 }).split(`
`) : r = u.text.split(`
`), u.border && (r.unshift("." + "-".repeat(this.negatePadding(u) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(u) + 2) + "'")), u.padding && (r.unshift(...new Array(u.padding[Do] || 0).fill("")), r.push(...new Array(u.padding[fo] || 0).fill(""))), r.forEach((a, f) => {
        n[f] || n.push([]);
        const p = n[f];
        for (let d = 0; d < o; d++)
          p[d] === void 0 && p.push("");
        p.push(a);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[Ne] || 0) + (e.padding[Re] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((o) => o.width || H.stringWidth(o.text));
    let n = e.length, s = this.width;
    const r = e.map((o) => {
      if (o.width)
        return n--, s -= o.width, o.width;
    }), u = n ? Math.floor(s / n) : 0;
    return r.map((o, a) => o === void 0 ? Math.max(u, po(e[a])) : o);
  }
}
function Ln(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function po(t) {
  const e = t.padding || [], n = 1 + (e[Ne] || 0) + (e[Re] || 0);
  return t.border ? n + 4 : n;
}
function go() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function mo(t, e) {
  t = t.trim();
  const n = H.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function bo(t, e) {
  t = t.trim();
  const n = H.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let H;
function Fo(t, e) {
  return H = e, new ho({
    width: t?.width || go(),
    wrap: t?.wrap
  });
}
const ls = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ds(t) {
  return t.replace(ls, "");
}
function Co(t, e) {
  const [n, s] = t.match(ls) || ["", ""];
  t = Ds(t);
  let r = "";
  for (let u = 0; u < t.length; u++)
    u !== 0 && u % e === 0 && (r += `
`), r += t.charAt(u);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Eo(t) {
  return Fo(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Ds,
    wrap: Co
  });
}
function xo(t, e) {
  let n = de(".", t), s;
  for (Yn(n).isDirectory() || (n = Dt(n)); ; ) {
    if (s = e(n, er(n)), s) return de(n, s);
    if (n = Dt(s = n), s === n) break;
  }
}
const wo = {
  fs: {
    readFileSync: tn,
    writeFile: tr
  },
  format: Kn,
  resolve: de,
  exists: (t) => {
    try {
      return Yn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class _o {
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
    })) : s(), K.format.apply(K.format, [this.cache[this.locale][n] || n].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), r = e.shift();
    let u = function() {
    };
    typeof e[e.length - 1] == "function" && (u = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let o = r === 1 ? n : s;
    this.cache[this.locale][n] && (o = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: u
    })) : u();
    const a = [o];
    return ~o.indexOf("%d") && a.push(r), K.format.apply(K.format, a.concat(e));
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
    return e.forEach(function(r, u) {
      const o = n[u + 1];
      s += r, typeof o < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, r = n.locale, u = n.cb, o = this._resolveLocaleFile(s, r), a = JSON.stringify(this.cache[r], null, 2);
    K.fs.writeFile(o, a, "utf-8", function(f) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), u(f);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      K.fs.readFileSync && (e = JSON.parse(K.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = K.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const r = K.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(e) {
    return K.exists(e);
  }
}
function yo(t, e) {
  K = e;
  const n = new _o(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Ao = (t) => yo(t, wo), vo = "require is not supported by ESM", jn = "loading a directory of commands is not supported yet for ESM";
let Ee;
try {
  Ee = rr(import.meta.url);
} catch {
  Ee = process.cwd();
}
const $o = Ee.substring(0, Ee.lastIndexOf("node_modules"));
nr, sr, qs, $o || process.cwd(), Js, Dt, Qs, Xs, de, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, tn, Ao({
  directory: de(Ee, "../../../locales"),
  updateFiles: !1
});
let fs = !1;
const Bo = (t) => {
  fs = t;
}, So = () => fs, ie = {
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
}, an = Object.keys(ie), Oo = 1.5, Tn = 75, Wn = 85, In = 95, hs = [...an, ...Object.values(ie).flat()], Ro = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((E, { errors: F, warnings: b }) => ({ errors: E.errors + F, warnings: E.warnings + b }), { errors: 0, warnings: 0 }), u = [];
  u.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` });
  const o = Math.ceil((1 - (s * Oo + r) / e) * 100), a = 60, f = r ? Math.max(1, Math.ceil(r / e * a)) : 0, p = s ? Math.max(1, a - Math.ceil(o * a / 100) - f) : 0, d = a - p - f, w = `<bg_ok>${" ".repeat(d)}<bg_warn>${" ".repeat(f)}<bg_err>${" ".repeat(p)}</bg_err>`;
  return u.push({ info: `Code Health: [${w}] ${o}%
` }), o < Tn && u.push({ info: `<bg_err>Code health is LOW: ${o}%</bg_err>
` }), o >= Tn && o < Wn && u.push({ info: `<bg_warn>Code health is MEDIUM ${o}%$</bg_warn>
` }), o >= Wn && o < In && u.push({ info: `<bg_info>Code health is OK: ${o}%</bg_info>
` }), o >= In && u.push({ info: `<bg_ok>Code health is GOOD: ${o}%</bg_ok>
` }), { errors: s, warnings: r, output: u };
}, cn = async (t) => {
  let e = t;
  for (; e !== z.parse(e).root; ) {
    const n = z.join(e, "package.json");
    try {
      return await ue.access(n), e;
    } catch {
      e = z.dirname(e);
    }
  }
  throw new Error("Project root not found");
};
function No(t) {
  const e = [], n = [];
  return Object.entries(ie).forEach(([s, r]) => {
    if (r.every((u) => t.includes(u)))
      e.push(s);
    else {
      const u = r.filter((o) => t.includes(o));
      n.push(...u);
    }
  }), { rulesets: e, individualRules: n };
}
const ps = async (t) => {
  let e = "";
  if (!t) {
    const s = ur(import.meta.url), r = z.dirname(s), u = z.resolve(r, "..");
    e = z.join(u, "package.json");
  }
  return t && (e = z.join(t, "package.json")), JSON.parse(await ue.readFile(e, "utf-8"));
}, ln = await cn(process.cwd()) || "", ds = async (t, e) => {
  const n = z.join(ln, "package.json");
  return nn.existsSync(n) ? !!(await ps(e)).dependencies[t] : !1;
}, gs = async (t) => {
  const e = ["nuxt.config.js", "nuxt.config.ts"];
  return await ds("nuxt", t) || e.some((n) => nn.existsSync(z.join(ln, n)));
}, Lo = async (t) => {
  const e = ["vue.config.js", "vue.config.ts"];
  return !await gs(t) && (await ds("vue", t) || e.some((s) => nn.existsSync(z.join(ln, s))));
}, j = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((a, f) => f >= n && a.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((o, a) => o + a.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Ie = [], jo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((u) => {
    const o = u.split(`
`).length, a = j(t.content, u);
    if (o > n * 2) {
      Ie.push({
        filePath: e,
        message: `line #${a} <bg_err>has a v-if with ${o} lines</bg_err>`
      });
      return;
    }
    o > n && Ie.push({
      filePath: e,
      message: `line #${a} <bg_warn>has a v-if with ${o} lines</bg_warn>`
    });
  });
}, To = () => {
  const t = [];
  return Ie.length > 0 && Ie.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Me = [], Wo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((u) => {
    const o = u.split(`
`).length, a = j(t.content, u);
    if (o > n * 2) {
      Me.push({
        filePath: e,
        message: `line #${a} <bg_err>has a v-show with ${o} lines</bg_err>`
      });
      return;
    }
    o > n && Me.push({
      filePath: e,
      message: `line #${a} <bg_warn>has a v-show with ${o} lines</bg_warn>`
    });
  });
}, Io = () => {
  const t = [];
  return Me.length > 0 && Me.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Mo = /^(\(.*\)|\\?.)$/;
function oe(t) {
  const e = t.toString();
  return Mo.test(e) ? e : `(?:${e})`;
}
const ko = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Po = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(t) {
  const e = (n) => v(`(?<${n}>${`${t}`.replace(ko, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => v(`${t}${U(...n)}`), {
      referenceTo: (n) => v(`${t}\\k<${n}>`)
    }),
    or: (...n) => v(`(?:${t}|${U(...n)})`),
    after: (...n) => v(`(?<=${U(...n)})${t}`),
    before: (...n) => v(`${t}(?=${U(...n)})`),
    notAfter: (...n) => v(`(?<!${U(...n)})${t}`),
    notBefore: (...n) => v(`${t}(?!${U(...n)})`),
    times: Object.assign((n) => v(`${oe(t)}{${n}}`), {
      any: () => v(`${oe(t)}*`),
      atLeast: (n) => v(`${oe(t)}{${n},}`),
      atMost: (n) => v(`${oe(t)}{0,${n}}`),
      between: (n, s) => v(`${oe(t)}{${n},${s}}`)
    }),
    optionally: () => v(`${oe(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => v(`${t}`.replace(Po, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${t}`),
      lineEnd: () => v(`${t}$`)
    }
  };
}
const zo = /[.*+?^${}()|[\]\\/]/g;
function xe(t) {
  return v(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function P(t) {
  return v(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Le(...t) {
  return v(`(?:${t.map((e) => U(e)).join("|")})`);
}
const pe = v(".");
v("\\b\\w+\\b");
const q = v("\\w"), G = v("\\b"), Vo = v("\\d"), W = v("\\s"), ms = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), bs = v("\\t"), Fs = v("\\n");
v("\\r");
v("\\W+"), v("\\W"), v("\\B"), v("\\D"), v("\\S"), Object.assign(v("[^a-zA-Z]"), {
  lowercase: v("[^a-z]"),
  uppercase: v("[^A-Z]")
}), v("[^\\t]"), v("[^\\n]"), v("[^\\r]");
function X(...t) {
  return v(`${oe(U(...t))}?`);
}
function U(...t) {
  return v(
    t.map((e) => typeof e == "string" ? e.replace(zo, "\\$&") : e).join("")
  );
}
function S(...t) {
  return v(`${oe(U(...t))}+`);
}
const Q = "i", T = "g", N = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(U(...t).toString(), [...e || ""].join(""));
}, dt = [], Cs = 4, Mn = 2 * Cs, Ho = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const r = N(
    Le(
      "if",
      'v-if="',
      S(pe).groupedAs("condition").and("?").and(S(pe)).and(":"),
      // ternary
      "="
    ).and(
      S(
        Le(
          "&&",
          "||",
          P(`"'`)
        )
      )
    ),
    [T]
  ), u = N(
    Le("&&", "||"),
    [T]
  ), o = (a, f) => {
    const p = a.match(r);
    p && p.forEach((d) => {
      const w = (d.match(u) || []).length + 1;
      if (w > Cs) {
        const E = j(a, d);
        dt.push({
          filePath: e,
          message: `line #${E} ${w > Mn ? "<bg_err>" : "<bg_warn>"}${f} has a complicated condition with ${w} blocks${w > Mn ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  n && o(n.content, "script"), s && o(s.content, "template");
}, Go = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, gt = [], Uo = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((u) => {
    const o = u[1];
    if (s.test(o)) {
      const a = j(t.content.trim(), u[0]), f = o.trim(), p = f.length > 20 ? f.slice(0, 20) : f;
      gt.push({
        filePath: e,
        message: `line #${a} side effect detected in computed property <bg_err>(${p})</bg_err>`
      });
    }
  });
}, qo = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, mt = [], Es = 5, kn = 2 * Es, Zo = (t, e) => {
  if (!t)
    return;
  const n = N(G, "if", G, [T, Q]), s = N(G, "else", G, [T, Q]), r = N(G, "for", G, [T, Q]), u = N(G, "while", G, [T, Q]), o = N(G, "case", G, [T, Q]), a = t.content.match(n), f = t.content.match(s), p = t.content.match(r), d = t.content.match(u), w = t.content.match(o), E = (a?.length || 0) + (f?.length || 0) + (p?.length || 0) + (d?.length || 0) + (w?.length || 0);
  E > Es && mt.push({ filePath: e, message: `Cyclomatic complexity is ${E > kn ? "<bg_err>very high" : "<bg_warn>high"} (${E})${E > kn ? "</bg_err>" : "</bg_warn>"}` });
}, Ko = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], Pn = 5, Yo = 3, Jo = (t, e) => {
  if (!t)
    return;
  const n = N(bs.times.atLeast(Pn).at.lineStart().or(W.times.atLeast(Yo * Pn).at.lineStart()), [T]), s = t.content.match(n);
  let r = 0;
  s?.forEach((u) => {
    const o = j(t.content, u, r);
    bt.push({
      filePath: e,
      message: `line #${o} <bg_warn>indentation: ${u.length}</bg_warn>`
    }), r = o;
  });
}, Qo = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], Xo = (t, e) => {
  if (!t)
    return;
  const n = N(G, "else", G, [T, Q]), s = t.content.match(n);
  s?.length && Ft.push({ filePath: e, message: `else clauses found <bg_err>(${s.length})</bg_err>` });
}, eu = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ke = [], Ct = 20, tu = 5, nu = 8;
function su({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const r = e.split(`
`).length, u = uu(t);
  if (r > 2 * Ct) {
    ke.push({ filePath: s, message: `function <bg_err>(${u}#${n})</bg_err> is too long: <bg_err>${r} lines</bg_err>` });
    return;
  }
  r >= Ct && ke.push({ filePath: s, message: `function <bg_warn>(${u}#${n})</bg_warn> is too long: <bg_warn>${r} lines</bg_warn>` });
}
function ru(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], u = n.lastIndex;
    let o = 1, a = u;
    for (; o > 0 && a < t.length; )
      t[a] === "{" ? o++ : t[a] === "}" && o--, a++;
    const f = t.slice(u, a - 1).trim();
    return {
      name: r,
      body: f,
      end: a
      // Returns the position after the matched function
    };
  } else
    return null;
}
function ou(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, u] = r, o = e + r.index + r[0].length;
    let a = o, f = "";
    if (t[o] === "{") {
      let p = 1;
      for (a = o + 1; a < t.length && p > 0; )
        t[a] === "{" ? p++ : t[a] === "}" && p--, a++;
      f = t.slice(o + 1, a - 1).trim();
    } else {
      for (; a < t.length && t[a] !== ";"; )
        a++;
      f = t.slice(o, a).trim();
    }
    return {
      name: u,
      body: f,
      end: a
      // Position after the end of the function body
    };
  } else
    return null;
}
function uu(t) {
  return t.replace(/^const\s*/, "");
}
const iu = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let r = 0;
  for (; r < s; ) {
    let u = "", o = "", a = !1;
    if (n.slice(r, r + nu) === "function") {
      const f = ru(n, r);
      f && (a = !0, u = f.name, o = f.body, r = f.end);
    }
    if (n.slice(r, r + tu) === "const") {
      const f = ou(n, r);
      f && (a = !0, u = f.name, o = f.body, r = f.end);
    }
    if (a) {
      const f = j(n.trim(), u);
      su({ funcName: u, funcBody: o, lineNumber: f, filePath: e });
    } else
      r++;
  }
}, au = () => {
  const t = [];
  return ke.length > 0 && ke.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${Ct} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], cu = (t, e) => {
  if (!t)
    return;
  const n = N("<", U("img").or("picture"), [T]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((u) => {
      const o = j(t.content, u, r), a = u.slice(1);
      Et.push({
        filePath: e,
        message: `line #${o} <bg_warn>${a} element found</bg_warn>`
      }), r = o;
    });
  }
}, lu = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], Du = (t, e) => {
  if (!t)
    return;
  const n = N("<a", G, [T, Q]), s = t.content.match(n);
  s?.length && xt.push({ filePath: e, message: `${s?.length} <bg_warn>html link found</bg_warn>` });
}, fu = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], hu = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((r, u) => {
    const o = r.trim();
    if (o.startsWith("if (") && !o.includes("{")) {
      const a = s[u + 1]?.trim();
      (!a || !a.startsWith("{") && !o.endsWith("{")) && wt.push({
        filePath: e,
        message: `line #${u} if statement without curly braces: <bg_err>${o}</bg_err>`
      });
    }
  });
}, pu = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], du = (t, e) => {
  if (!t)
    return;
  const n = N(S(Vo).as("magicNumber"), Le(")", Fs), [T]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const u = s.groups?.magicNumber, o = Number.parseInt(u ?? "0");
    if (o > 1) {
      const a = j(t.content, String(o), r);
      _t.push({
        filePath: e,
        message: `line #${a} <bg_warn>magic number: ${o}</bg_warn>`
      }), r = a;
    }
  }
}, gu = () => {
  const t = [];
  return _t.length && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, yt = [], mu = (t, e) => {
  if (!t)
    return;
  const n = N(S(pe), W, "?", W, S(pe), W, ":", W, S(pe));
  t.content.match(n)?.forEach((r) => {
    if (r.split("?").length - 1 > 1) {
      const u = j(t.content, r);
      yt.push({
        filePath: e,
        message: `line #${u} has <bg_warn>nested ternary</bg_warn>`
      });
    }
  });
}, bu = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], Fu = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((u) => {
    const o = j(t.content.trim(), u[0], r);
    At.push({
      filePath: e,
      message: `line #${o} <bg_warn>Found inline style: ${u[0]}</bg_warn>`
    }), r = o;
  });
}, Cu = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], Eu = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((r) => {
    const u = j(t.content, r);
    vt.push({
      filePath: e,
      message: `line #${u} <bg_warn>props destructuring found: ${r}</bg_warn>`
    });
  });
}, xu = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], wu = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((r) => {
    const u = j(t.content, r);
    $t.push({
      filePath: e,
      message: `line #${u} <bg_warn>Avoid using 'var' for variable declarations: ${r}</bg_warn>`
    });
  });
}, _u = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], xs = 3, zn = (t, e, n) => {
  const s = e.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > xs && Bt.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${s.length}</bg_warn> parameters` });
}, yu = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && zn(s[1], s[2], e), s[3] && zn(s[3], s[4], e);
}, Au = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${xs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], vu = (t, e) => {
  !t || t.setup || St.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, $u = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], Bu = (t, e) => {
  if (!t)
    return;
  const n = N(
    "defineProps(",
    W.times.any(),
    "[",
    W.times.any(),
    S(xe(`'"`), S(q), xe(`'"`), W.times.any(), X(",", W.times.any())),
    "]",
    W.times.any(),
    ")",
    [T]
  ), s = N(
    "<",
    S(q).grouped(),
    W,
    P(">").times.any(),
    ":",
    S(q).grouped(),
    W.times.any(),
    "=",
    W.times.any(),
    '"props.',
    S(q).grouped(),
    '"',
    [T]
  );
  let r;
  const u = /* @__PURE__ */ new Set();
  for (; (r = n.exec(t.content)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((f) => u.add(f));
  let o;
  for (; (o = s.exec(t.content)) !== null; ) {
    const a = o[1], f = o[2], p = o[3];
    u.has(p) && f === p && Ot.push({
      filePath: e,
      message: `Prop <bg_warn>(${p})</bg_warn> is being drilled through <bg_warn>${a}</bg_warn> component unmodified.`
    });
  }
}, Su = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], je = 100, Ou = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > je && Rt.push({ filePath: e, message: `${n.length > je * 2 ? "<bg_err>" : "<bg_warn>"}(${n.length} lines)${n.length > je * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ru = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${je} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], ws = 4, Nu = ["i", "key"], Lu = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    r.length < ws && !Nu.includes(r) && Nt.push({ filePath: e, message: `variable: <bg_warn>(${r})</bg_warn>` });
  }
}, ju = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${ws}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], Tu = 5, Wu = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps", X("<"), X("("), "{", S(pe), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > Tu && Lt.push({ filePath: e, message: `props found <bg_err>(${r})</bg_err>` });
  }
}, Iu = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], Mu = (t, e) => {
  if (!t)
    return;
  const n = N('v-for="(', W.times.any(), S(q).grouped(), W.times.any(), ",", W.times.any(), S(q).grouped(), W.times.any(), ")", S(W), "in", S(W), S(q).grouped(), [T]), s = N(':key="', W.times.any(), S(q).grouped(), W.times.any(), '"', [T]), r = [...t.content.matchAll(n)], u = [...t.content.matchAll(s)];
  r.forEach((o) => {
    const [a, f, p, d] = o;
    u.forEach((w) => {
      const E = w[1];
      if (E === p) {
        const F = j(t.content.trim(), E);
        jt.push({
          filePath: e,
          message: `line #${F} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, ku = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], Pu = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[0], u = s[1], o = j(t.content.trim(), r);
    Tt.push({
      filePath: e,
      message: `line #${o} zero length comparison found <bg_warn>(${u})</bg_warn>`
    });
  }
}, zu = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Zero Length Comparison</text_info>",
      description: "👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Vu = [
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
], Wt = [], Hu = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const u = r[1];
      Vu.includes(u) && Wt.push({ filePath: e, message: `<bg_warn>(${u})</bg_warn>` });
    }
  });
}, Gu = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Pe = [], Uu = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(U("$parent").or("getCurrentInstance"), [T]), u = t.content.match(n), o = t.content.match(s);
  if (o) {
    const f = o[1].split(".")[0];
    if ((u ? u[1] : "").includes(f)) {
      const d = j(t.content.trim(), f);
      Pe.push({
        filePath: e,
        message: `line #${d} <bg_warn>(${f})</bg_warn>`
      });
    }
  }
  const a = t.content.match(r);
  if (a) {
    const f = j(t.content.trim(), a[0]);
    Pe.push({
      filePath: e,
      message: `line #${f} <bg_warn>(${a[0]})</bg_warn>`
    });
  }
}, qu = () => {
  const t = [];
  return Pe.length > 0 && Pe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], Zu = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || It.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Ku = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], Yu = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps([", [T, Q]);
  t.content.match(n)?.length && Mt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, Ju = () => {
  const t = [];
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], Qu = (t) => {
  if (t.includes("pages"))
    return;
  const e = z.basename(t);
  if (e === "App.vue")
    return;
  const n = N(ms.uppercase);
  e.slice(1).match(n)?.length || kt.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, Xu = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], ei = (t, e) => {
  if (!t)
    return;
  const n = N("<", S(P(">")), " v-for", S(P(">")), ">", [
    T,
    Q
  ]), s = t.content.match(n);
  s?.length && (s.some((u) => u.includes(":key")) || Pt.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, ti = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], ni = (t, e) => {
  if (!t)
    return;
  const n = N(
    "<",
    S(P(">")),
    " v-if",
    S(P(">")),
    " v-for",
    S(P(">")),
    ">",
    [T, Q]
  ), s = N(
    "<",
    S(P(">")),
    " v-for",
    S(P(">")),
    " v-if",
    S(P(">")),
    ">",
    [T, Q]
  ), r = t.content.match(n), u = t.content.match(s);
  if (r?.length || u?.length) {
    const o = r?.length ? r[0] : u?.length ? u[0] : "", a = j(t.content, o);
    zt.push({ filePath: e, message: `line #${a} <bg_err>v-if used with v-for</bg_err>` });
  }
}, si = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Vn = [
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
  let u;
  for (; (u = s.exec(n)) !== null; ) {
    const o = u[1], a = u[2];
    if (a) {
      const p = Array.from(a.matchAll(r), (w) => w[1]).filter((w) => Vn.includes(w));
      let d = -1;
      for (const w of p) {
        const E = Vn.indexOf(w);
        if (E !== -1 && E < d) {
          Vt.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${o})</bg_warn>`
          });
          break;
        }
        d = E;
      }
    }
  }
}, oi = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], ui = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), u = n.indexOf("<style>"), o = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: u }
  ].filter((f) => f.index !== -1);
  o.every((f, p) => p === 0 ? !0 : o[p - 1].index < f.index) || Ht.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, ii = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], ai = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = z.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, u = e.match(r);
  !s?.length && !u?.length && Gt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, ci = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], li = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const u = j(t.content.trim(), r), o = r.split(`
`).at(0)?.trim() || "";
    Ut.push({ filePath: e, message: `line #${u} <bg_warn>(${o})</bg_warn>` });
  });
}, Di = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], Hn = [], fi = ["v-slot", "v-bind", "v-on"], hi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  fi.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = j(t.source, s);
      qt.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), Hn.some((u) => u.filePath === e) || Hn.push({ filePath: e });
    }
  });
}, pi = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], di = 3, gi = (t) => {
  const e = N(
    S(P("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = N(
      xe("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [T]
    ), u = s.match(r);
    (!u || u.length < di) && Zt.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
  }
}, mi = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], bi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], u = s[2];
    u.split(/\s+/).filter((a) => a.trim() !== "").length > 1 && u.split(`
`).length === 1 && Kt.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, Fi = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, Yt = [], Ci = /^[a-z]+([A-Z][a-z]*)*$/, Ei = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((u) => u.split(":")[0]).filter((u) => u.length).filter((u) => !Ci.test(u)).length && Yt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
}, xi = () => {
  const t = [];
  return Yt.length > 0 && Yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Jt = [], wi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    S(q),
    X(S(xe(` 	
\r`))),
    S(P("/>")),
    X(S(xe(` 	
\r`))),
    X("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const u = N(":", S(q), X(" "), "=", X(" "), P(`'"`), [
    "g"
  ]);
  r?.forEach((o) => {
    if (!o.includes(":"))
      return;
    const a = o.match(u);
    if (a?.length) {
      const f = j(t.source, o);
      Jt.push({ filePath: e, message: `line #${f} <bg_warn>${a}</bg_warn>` });
    }
  });
}, _i = () => {
  const t = [];
  return Jt.length > 0 && Jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Qt = [], yi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    S(ms.uppercase, q),
    X(Fs, bs),
    X(S(P(">"))),
    "></",
    S(q),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((u) => {
    const o = j(t.source, u), a = u.split(`
`).at(-1)?.trim() || "";
    Qt.push({ filePath: e, message: `line #${o} <bg_warn>${a}</bg_warn>` });
  });
}, Ai = () => {
  const t = [];
  return Qt.length > 0 && Qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, _s = [], Te = [], vi = 5, $i = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > vi) {
      const u = r.split(`
`)[0], o = j(t.content, u);
      _s.push({ filePath: e, message: `line #${o} <bg_warn>computed</bg_warn>` }), Te.push({ filePath: e }), Te.some((a) => a.filePath === e) || Te.push({ filePath: e });
    }
  });
}, Bi = () => {
  const t = [];
  return Te.length > 0 && _s.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Xt = [], Si = 40, Oi = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > Si) {
      const u = j(t.content, r), o = r.split(`
`).at(0)?.trim() || "";
      Xt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${o}</bg_warn>`
      });
    }
  });
}, Ri = () => {
  const t = [];
  return Xt.length > 0 && Xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ni = (t, e, n) => {
  const s = t.scriptSetup || t.script, r = e.endsWith(".vue"), u = {
    // vue-essential
    simpleProp: () => Yu(s, e),
    singleNameComponent: () => r && Qu(e),
    globalStyle: () => r && Zu(t.styles, e),
    vforNoKey: () => r && ei(t.template, e),
    vifWithVfor: () => r && ni(t.template, e),
    // vue-strong
    simpleComputed: () => $i(s, e),
    componentFiles: () => r && li(s, e),
    propNameCasing: () => r && Ei(s, e),
    componentFilenameCasing: () => r && ai(e),
    selfClosingComponents: () => r && yi(t, e),
    templateSimpleExpression: () => r && Oi(t.template, e),
    quotedAttributeValues: () => r && wi(t, e),
    directiveShorthands: () => r && hi(t, e),
    fullWordComponentName: () => r && gi(e),
    multiAttributeElements: () => r && bi(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => r && ui(t.source, e),
    elementAttributeOrder: () => r && ri(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => r && Uu(s, e),
    elementSelectorsWithScoped: () => r && Hu(t.styles, e),
    // rrd
    bigVif: () => jo(t.template, e),
    bigVShow: () => Wo(t.template, e),
    complicatedConditions: () => Ho(t, e),
    cyclomaticComplexity: () => Zo(s, e),
    computedSideEffects: () => Uo(s, e),
    deepIndentation: () => Jo(s, e),
    elseCondition: () => Xo(s, e),
    functionSize: () => iu(s, e),
    htmlImageElements: () => So() && cu(t.template, e),
    htmlLink: () => r && Du(t.template, e),
    ifWithoutCurlyBraces: () => hu(s, e),
    magicNumbers: () => du(s, e),
    nestedTernary: () => mu(s, e),
    noPropDestructure: () => Eu(s, e),
    noVarDeclaration: () => wu(s, e),
    parameterCount: () => yu(s, e),
    plainScript: () => r && vu(t.script, e),
    propsDrilling: () => Bu(s, e),
    scriptLength: () => Ou(s, e),
    shortVariableName: () => Lu(s, e),
    tooManyProps: () => Wu(s, e),
    vForWithIndexKey: () => r && Mu(t.template, e),
    zeroLengthComparison: () => Pu(s, e),
    noInlineStyles: () => Fu(t.template, e)
  };
  n.forEach((o) => {
    o in ie ? ie[o].forEach((a) => {
      a in u && u[a]();
    }) : o in u && u[o]();
  });
}, Li = (t, e, n) => {
  const s = {}, r = [], u = ({ file: p, rule: d, title: w, description: E, message: F }) => {
    const b = t === "rule" ? d : p;
    s[b] || (s[b] = []), s[b].push({ file: p, rule: d, title: w, description: E, message: F });
  }, o = (p) => {
    p().forEach((w) => {
      u(w);
    });
  };
  o(Xu), o(Ju), o(ti), o(si), o(Ku), o(ci), o(Di), o(pi), o(mi), o(Fi), o(xi), o(_i), o(Ai), o(Bi), o(Ri), o(ii), o(oi), o(qu), o(Gu), o(To), o(Io), o(Go), o(Ko), o(qo), o(Qo), o(eu), o(au), o(lu), o(fu), o(pu), o(gu), o(bu), o(xu), o(_u), o(Au), o($u), o(Su), o(Ru), o(ju), o(Iu), o(ku), o(zu), o(Cu);
  const a = Object.keys(s).sort((p, d) => {
    const w = s[p].length, E = s[d].length;
    return e === "desc" ? E - w : w - E;
  }), f = {};
  return a.forEach((p) => {
    f[p] = [], s[p].forEach((d, w) => {
      const E = d.message.includes("<bg_err>");
      if (r.some((F) => F.file === d.file)) {
        const F = r.find((b) => b.file === d.file);
        F && (E ? F.errors++ : F.warnings++);
      } else
        r.push({ file: d.file, errors: E ? 1 : 0, warnings: E ? 0 : 1 });
      n === "error" && !E || (f[p][w] = { id: "", description: "", message: "" }, t === "file" && (f[p][w].id = d.rule), t !== "file" && (f[p][w].id = d.file), f[p][w].description = d.description, f[p][w].message = d.message || "🚨");
    });
  }), { output: f, health: r };
};
let en = 0, ys = 0, As = [];
const ji = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], Dn = [], ae = [], Gn = async (t, e) => {
  if (!Dn.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    en++;
    const n = await ue.readFile(e, "utf-8");
    ys += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = or(n);
    (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), ae.push({ info: `Analyzing ${e}...` }), Ni(s, e, As);
  }
}, vs = async (t) => {
  if (!(await ue.stat(t)).isDirectory()) {
    await Gn(t, t);
    return;
  }
  const n = await ue.readdir(t);
  for (const s of n) {
    const r = z.join(t, s);
    (await ue.stat(r)).isDirectory() && !ji.some((o) => r.includes(o)) && !Dn.some((o) => r.endsWith(o)) && await vs(r), await Gn(r, r);
  }
}, Ti = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: r, level: u, sortBy: o }) => {
  const a = e.filter((Z) => !n.includes(Z)), { rulesets: f, individualRules: p } = No(a), d = f.length ? `<bg_info>${f.join(", ")}</bg_info>` : "N/A", w = p.length ? `<bg_info>${p.join(", ")}</bg_info>` : "N/A";
  let E = `      Applying ${f.length} rulesets: ${d}`;
  p.length > 0 && (E += `
      Applying ${p.length} individual rules: ${w}`);
  const F = n.filter((Z) => !f.includes(Z)), b = F.length ? `<bg_info>${F.join(", ")}</bg_info>` : "N/A", m = await cn(t), c = await Lo(m), x = await gs(m);
  Bo(x), ae.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` }), ae.push({ info: `      Project type: <bg_info>${x ? "Nuxt" : ""}${c ? "Vue" : ""}${!x && !c ? "?" : ""}</bg_info>` }), ae.push({
    info: `${E}
      Ignoring ${F.length} rules: ${b}
      Excluding ${s || "-"}
      Output level <bg_info>${u}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${o}</bg_info>`
  }), As = e.filter((Z) => !n.includes(Z)), s && Dn.push(...s.split(",")), await vs(t), ae.push({ info: `Found <bg_info>${en}</bg_info> files` });
  const { health: A, output: B } = Li(r, o, u), { errors: R, warnings: O, output: ce } = Ro(A, ys, en);
  return !R && !O && ae.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: ae, codeHealthOutput: ce, reportOutput: B };
}, $s = "\x1B[44m", Wi = "\x1B[43m", we = "\x1B[41m", Ii = "\x1B[42m", re = "\x1B[0m", Bs = "\x1B[33m", Ss = "\x1B[36m", ze = "\x1B[0m", Un = (t) => t.replace(/<bg_err>/g, we).replace(/<bg_warn>/g, Wi).replace(/<bg_info>/g, $s).replace(/<bg_ok>/g, Ii).replace(/<\/bg_err>/g, re).replace(/<\/bg_warn>/g, re).replace(/<\/bg_info>/g, re).replace(/<\/bg_ok>/g, re).replace(/<text_warn>/g, Bs).replace(/<text_info>/g, Ss).replace(/<\/text_warn>/g, ze).replace(/<\/text_info>/g, ze), qn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(ie) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((u) => {
    an.includes(u) ? s.push(...ie[u]) : Object.values(ie).some((o) => o.includes(u)) ? s.push(u) : r.push(u);
  }), r.length > 0 && (console.error(
    `
${we}Invalid ${t} values: ${r.join(", ")}${re}. 
${Bs}Allowed values are: ${hs.join(", ")}${ze}

`
  ), process.exit(1)), s;
}, Os = ["rule", "file"], Rs = ["asc", "desc"], Ns = ["text", "json", "table"], Ls = ["all", "error"], Mi = {
  groupBy: Os,
  sortBy: Rs,
  outputLevel: Ls,
  outputFormat: Ns
}, Be = (t, e) => {
  const n = Mi[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${we}${t}${re} provided for flag ${Ss}${e}${ze}. Valid options are: ${$s}${n.join(", ")}${re}.
`
  ), process.exit(1)), t;
};
function Zn(t) {
  const e = new RegExp(`--${t}(?:=[^\\s]*)?$`);
  return process.argv.some((n) => e.test(n));
}
const ki = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4], Pi = await cn(ki || "./src"), zi = await ps(), Ve = [];
let J = {
  path: "./src",
  apply: Object.values(an).join(","),
  ignore: void 0,
  exclude: void 0,
  group: "rule",
  level: "all",
  sort: "desc",
  output: "text"
};
const fe = {
  applyFromCLI: Zn("apply"),
  ignoreFromCLI: Zn("ignore"),
  applyFromFile: !1,
  ignoreFromFile: !1
};
let Se = "";
try {
  const t = z.join(Pi, "vue-mess-detector.json"), e = JSON.parse(await ue.readFile(t, "utf-8"));
  J = { ...J, ...e }, fe.applyFromFile = !!e.apply, fe.ignoreFromFile = !!e.ignore, Ve.push({ info: `👉 Using configuration from ${t}` });
} catch {
  Ve.push({ info: "👉 Using default configuration" });
}
Ks(so(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (t) => t.config(J).positional("path", {
    describe: "path to the Vue files",
    default: J.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets/rules to apply.",
    choices: hs,
    coerce: qn("apply"),
    group: "Filter Rulesets/Rules:",
    default: J.apply
  }).option("exclude", {
    alias: "e",
    describe: "Exclude files or directories from the analysis",
    default: J.exclude,
    group: "Exclude files:"
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: Os,
    coerce: (e) => Be(e, "groupBy"),
    default: J.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: Ls,
    coerce: (e) => Be(e, "outputLevel"),
    default: J.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    coerce: qn("ignore"),
    default: J.ignore,
    group: "Filter Rulesets:"
  }).option("sort", {
    alias: "s",
    describe: "Sort results at the output",
    choices: Rs,
    coerce: (e) => Be(e, "sortBy"),
    default: J.sort,
    group: "Sort Results:"
  }).option("output", {
    describe: "Output format",
    choices: Ns,
    coerce: (e) => Be(e, "outputFormat"),
    default: J.output,
    group: "Output Format:"
  }).option("fileOutput", {
    alias: "f",
    describe: "Output file",
    default: "",
    group: "Output:"
  }).check(() => {
    const e = fe.applyFromCLI || fe.applyFromFile, n = fe.ignoreFromCLI || fe.ignoreFromFile;
    return e && n && (console.error(`
<bg_err>Cannot use both --ignore and --apply options together.</bg_err>
`), process.exit(1)), !0;
  }),
  (t) => {
    Se = t.fileOutput;
    const e = (n) => Se ? (ue.appendFile(Se, `${n}
`), n) : (console.log(Un(n)), Un(n));
    Ti({
      dir: t.path,
      apply: t.apply,
      ignore: t.ignore,
      exclude: t.exclude,
      groupBy: t.group,
      level: t.level,
      sortBy: t.sort
    }).then((n) => {
      if (t.output == "text") {
        [...Ve, ...n.output].forEach((s) => {
          e(s.info);
        });
        for (const s in n.reportOutput)
          e(`
- <text_info> ${s}</text_info>`), n.reportOutput[s].forEach((r) => {
            e(`   ${r.id}`), e(`   ${r.description}`), e(`   ${r.message}
`);
          });
        n.codeHealthOutput?.forEach((s) => {
          e(s.info);
        });
      }
      if (t.output == "table") {
        Se && (console.log(`We can not output ${we}to a file in table mode${re}`), process.exit(1)), [...Ve, ...n.output].forEach((s) => {
          e(s.info);
        });
        for (const s in n.reportOutput) {
          const r = new eo({
            head: ["id", "message"],
            colWidths: [60, 60],
            wordWrap: !0,
            wrapOnWordBoundary: !1
          });
          e("-".repeat(120)), t.group == "rule" && (e(`<text_info>Rule: ${s}</text_info>`), e(`Description: ${n.reportOutput[s][0].description}`), n.reportOutput[s].forEach((u) => {
            r.push([e(u.id), e(u.message)]);
          })), t.group == "file" && (e(`<text_info>File: ${s}</text_info>`), n.reportOutput[s].forEach((u) => {
            r.push([`${u.id}
${u.description.replace("See: ", `See:
`)}`, u.message]);
          })), e(r.toString());
        }
        n.codeHealthOutput?.forEach((s) => {
          e(s.info);
        });
      }
      t.output == "json" && e(JSON.stringify(n, null, 2));
    }).catch((n) => {
      console.error(`${we}${n}${re}`);
    });
  }
).version("version", "Show version number", zi.version).alias("version", "v").help().argv;
