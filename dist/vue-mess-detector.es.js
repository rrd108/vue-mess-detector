import ue from "node:fs/promises";
import H from "node:path";
import zs, { format as Gn, inspect as Hs } from "util";
import Vs from "os";
import Gs from "yargs";
import { normalize as Us, resolve as he, dirname as ot, basename as qs, extname as Zs, relative as Ks } from "path";
import { readFileSync as Kt, statSync as Un, readdirSync as Ys, writeFile as Js } from "fs";
import { notStrictEqual as Qs, strictEqual as Xs } from "assert";
import { fileURLToPath as er } from "url";
import { parse as tr } from "@vue/compiler-sfc";
import Yt from "node:fs";
import { fileURLToPath as nr } from "node:url";
function sr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let Jt = [], qn = 0;
const M = (t, e) => {
  qn >= e && Jt.push(t);
};
M.WARN = 1;
M.INFO = 2;
M.DEBUG = 3;
M.reset = () => {
  Jt = [];
};
M.setDebugLevel = (t) => {
  qn = t;
};
M.warn = (t) => M(t, M.WARN);
M.info = (t) => M(t, M.INFO);
M.debug = (t) => M(t, M.DEBUG);
M.debugMessages = () => Jt;
var Qt = M, Xt = { exports: {} }, rr = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const or = rr;
var ur = (t) => typeof t == "string" ? t.replace(or(), "") : t, en = { exports: {} };
const Zn = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
en.exports = Zn;
en.exports.default = Zn;
var ir = en.exports, ar = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const cr = ur, lr = ir, Dr = ar, Kn = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = cr(t), t.length === 0))
    return 0;
  t = t.replace(Dr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += lr(s) ? 2 : 1);
  }
  return e;
};
Xt.exports = Kn;
Xt.exports.default = Kn;
var fr = Xt.exports;
const Dn = fr;
function Re(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function X(t) {
  let e = Re();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return Dn(o) > r ? Dn(o) : r;
  }, 0);
}
function ge(t, e) {
  return Array(e + 1).join(t);
}
function hr(t, e, n, s) {
  let r = X(t);
  if (e + 1 >= r) {
    let o = e - r;
    switch (s) {
      case "right": {
        t = ge(n, o) + t;
        break;
      }
      case "center": {
        let u = Math.ceil(o / 2), i = o - u;
        t = ge(n, i) + t + ge(n, u);
        break;
      }
      default: {
        t = t + ge(n, o);
        break;
      }
    }
  }
  return t;
}
let De = {};
function xe(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", De[e] = { set: t, to: !0 }, De[n] = { set: t, to: !1 }, De[t] = { on: e, off: n };
}
xe("bold", 1, 22);
xe("italics", 3, 23);
xe("underline", 4, 24);
xe("inverse", 7, 27);
xe("strikethrough", 9, 29);
function Yn(t, e) {
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
  let s = De[e[0]];
  s && (t[s.set] = s.to);
}
function pr(t) {
  let e = Re(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Yn(s, n), n = e.exec(t);
  return s;
}
function Jn(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += De[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function dr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = De[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function gr(t, e) {
  if (t.length === X(t))
    return t.substr(0, e);
  for (; X(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function mr(t, e) {
  let n = Re(!0), s = t.split(Re()), r = 0, o = 0, u = "", i, c = {};
  for (; o < e; ) {
    i = n.exec(t);
    let h = s[r];
    if (r++, o + X(h) > e && (h = gr(h, e - o)), u += h, o += X(h), o < e) {
      if (!i)
        break;
      u += i[0], Yn(c, i);
    }
  }
  return Jn(c, u);
}
function br(t, e, n) {
  if (n = n || "…", X(t) <= e)
    return t;
  e -= X(n);
  let r = mr(t, e);
  r += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !r.includes(o) && (r += o), r;
}
function Fr() {
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
function Cr(t, e) {
  t = t || {}, e = e || Fr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function Er(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, u;
  for (let i = 0; i < s.length; i += 2) {
    let c = s[i], h = o + X(c);
    o > 0 && u && (h += u.length), h > t ? (o !== 0 && n.push(r.join("")), r = [c], o = X(c)) : (r.push(u || "", c), o = h), u = s[i + 1];
  }
  return o && n.push(r.join("")), n;
}
function xr(t, e) {
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
function wr(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? Er : xr;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, r(t, e[o]));
  return s;
}
function _r(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = dr(e, t[s]);
    e = pr(r);
    let o = Object.assign({}, e);
    n.push(Jn(o, r));
  }
  return n;
}
function yr(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var Qn = {
  strlen: X,
  repeat: ge,
  pad: hr,
  truncate: br,
  mergeOptions: Cr,
  wordWrap: wr,
  colorizeLines: _r,
  hyperlink: yr
}, Xn = { exports: {} }, Ie = { exports: {} }, Pe = { exports: {} }, ze = { exports: {} }, He = { exports: {} }, fn;
function Ar() {
  return fn || (fn = 1, function(t) {
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
  }(He)), He.exports;
}
var Ve, hn;
function vr() {
  return hn || (hn = 1, Ve = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Ve;
}
var Ge, pn;
function $r() {
  if (pn) return Ge;
  pn = 1;
  var t = Vs, e = vr(), n = process.env, s = void 0;
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
      var h = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(h[0]) >= 10 && Number(h[2]) >= 10586 ? Number(h[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(E) {
        return E in n;
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
  return Ge = {
    supportsColor: u,
    stdout: u(process.stdout),
    stderr: u(process.stderr)
  }, Ge;
}
var Ue = { exports: {} }, dn;
function Br() {
  return dn || (dn = 1, function(t) {
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
  }(Ue)), Ue.exports;
}
var qe = { exports: {} }, gn;
function Sr() {
  return gn || (gn = 1, function(t) {
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
      function u(h) {
        var d = Math.floor(Math.random() * h);
        return d;
      }
      function i(h) {
        var d = !1;
        return o.filter(function(E) {
          d = E === h;
        }), d;
      }
      function c(h, d) {
        var E = "", C, F;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", h = h.split("");
        for (F in h)
          if (!i(F)) {
            switch (E = E + h[F], C = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                C.up = u(8), C.mid = u(2), C.down = u(8);
                break;
              case "maxi":
                C.up = u(16) + 3, C.mid = u(4) + 1, C.down = u(64) + 3;
                break;
              default:
                C.up = u(8) + 1, C.mid = u(6) / 2, C.down = u(8) + 1;
                break;
            }
            var m = ["up", "mid", "down"];
            for (var g in m)
              for (var l = m[g], w = 0; w <= C[l]; w++)
                d[l] && (E = E + r[l][u(r[l].length)]);
          }
        return E;
      }
      return c(n, s);
    };
  }(qe)), qe.exports;
}
var Ze = { exports: {} }, mn;
function Or() {
  return mn || (mn = 1, function(t) {
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
  }(Ze)), Ze.exports;
}
var Ke = { exports: {} }, bn;
function Rr() {
  return bn || (bn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(Ke)), Ke.exports;
}
var Ye = { exports: {} }, Fn;
function Nr() {
  return Fn || (Fn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(Ye)), Ye.exports;
}
var Je = { exports: {} }, Cn;
function Lr() {
  return Cn || (Cn = 1, function(t) {
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
  }(Je)), Je.exports;
}
var En;
function jr() {
  return En || (En = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = zs, s = e.styles = Ar(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = $r().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
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
        return E.apply(w, arguments);
      };
      return l._styles = g, l.__proto__ = d, l;
    }
    var h = function() {
      var g = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(l) {
        s[l].closeRe = new RegExp(i(s[l].close), "g"), g[l] = {
          get: function() {
            return c(this._styles.concat(l));
          }
        };
      }), g;
    }(), d = r(function() {
    }, h);
    function E() {
      var g = Array.prototype.slice.call(arguments), l = g.map(function(O) {
        return O != null && O.constructor === String ? O : n.inspect(O);
      }).join(" ");
      if (!e.enabled || !l)
        return l;
      for (var w = l.indexOf(`
`) != -1, y = this._styles, S = y.length; S--; ) {
        var R = s[y[S]];
        l = R.open + l.replace(R.closeRe, R.open) + R.close, w && (l = l.replace(o, function(O) {
          return R.close + O + R.open;
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
              var S = y;
              for (var R in g[w])
                S = e[g[w][R]](S);
              return S;
            }
            return e[g[w]](y);
          };
        })(l);
    };
    function C() {
      var g = {};
      return Object.keys(h).forEach(function(l) {
        g[l] = {
          get: function() {
            return c([l]);
          }
        };
      }), g;
    }
    var F = function(l, w) {
      var y = w.split("");
      return y = y.map(l), y.join("");
    };
    e.trap = Br(), e.zalgo = Sr(), e.maps = {}, e.maps.america = Or()(e), e.maps.zebra = Rr()(e), e.maps.rainbow = Nr()(e), e.maps.random = Lr()(e);
    for (var m in e.maps)
      (function(g) {
        e[g] = function(l) {
          return F(e.maps[g], l);
        };
      })(m);
    r(e, C());
  }(ze)), ze.exports;
}
var xn;
function Tr() {
  return xn || (xn = 1, function(t) {
    var e = jr();
    t.exports = e;
  }(Pe)), Pe.exports;
}
const { info: Wr, debug: es } = Qt, V = Qn;
let Ir = class ve {
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
    kr.forEach(function(c) {
      Qe(s, r, c, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let u = this.options.style = this.options.style || {}, i = e.style;
    Qe(u, i, "padding-left", this), Qe(u, i, "padding-right", this), this.head = u.head || i.head, this.border = u.border || i.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = V.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
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
      return this.wrapLines(V.wordWrap(this.fixedWidth, this.content, o));
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(_n, -1), this.height = this.heights.reduce(_n, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    e || Wr(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
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
      n.push(this._topLeftChar(r)), n.push(V.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(V.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof ve.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof ve.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof ve.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = Tr();
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
      let C = this.cells[this.y + r][this.x - 1];
      for (; C instanceof ut; )
        C = this.cells[C.y][C.x - 1];
      C instanceof it || (o = this.chars.rightMid);
    }
    let u = V.repeat(" ", this.paddingLeft), i = n ? this.chars.right : "", c = V.repeat(" ", this.paddingRight), h = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (h += this.truncate || "…");
    let E = V.truncate(h, d, this.truncate);
    return E = V.pad(E, d, " ", this.hAlign), E = u + E + c, this.stylizeLine(o, E, i);
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
      let u = this.cells[this.y + n][this.x - 1];
      for (; u instanceof ut; )
        u = this.cells[u.y][u.x - 1];
      u instanceof it || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = V.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, ut = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && es(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, it = class {
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
    this.cellOffset = n - s, this.offset = Mr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (es(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function wn(...t) {
  return t.filter((e) => e != null).shift();
}
function Qe(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = wn(t[r], t[n], e[r], e[n])) : s[n] = wn(t[n], e[n]);
}
function Mr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function _n(t, e) {
  return t + e + 1;
}
let kr = [
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
Ie.exports = Ir;
Ie.exports.ColSpanCell = ut;
Ie.exports.RowSpanCell = it;
var Pr = Ie.exports;
const { warn: zr, debug: Hr } = Qt, at = Pr, { ColSpanCell: Vr, RowSpanCell: Gr } = at;
(function() {
  function t(F, m) {
    return F[m] > 0 ? t(F, m + 1) : m;
  }
  function e(F) {
    let m = {};
    F.forEach(function(g, l) {
      let w = 0;
      g.forEach(function(y) {
        y.y = l, y.x = l ? t(m, w) : w;
        const S = y.rowSpan || 1, R = y.colSpan || 1;
        if (S > 1)
          for (let O = 0; O < R; O++)
            m[y.x + O] = S;
        w = y.x + R;
      }), Object.keys(m).forEach((y) => {
        m[y]--, m[y] < 1 && delete m[y];
      });
    });
  }
  function n(F) {
    let m = 0;
    return F.forEach(function(g) {
      g.forEach(function(l) {
        m = Math.max(m, l.x + (l.colSpan || 1));
      });
    }), m;
  }
  function s(F) {
    return F.length;
  }
  function r(F, m) {
    let g = F.y, l = F.y - 1 + (F.rowSpan || 1), w = m.y, y = m.y - 1 + (m.rowSpan || 1), S = !(g > y || w > l), R = F.x, O = F.x - 1 + (F.colSpan || 1), ce = m.x, ae = m.x - 1 + (m.colSpan || 1), re = !(R > ae || ce > O);
    return S && re;
  }
  function o(F, m, g) {
    let l = Math.min(F.length - 1, g), w = { x: m, y: g };
    for (let y = 0; y <= l; y++) {
      let S = F[y];
      for (let R = 0; R < S.length; R++)
        if (r(w, S[R]))
          return !0;
    }
    return !1;
  }
  function u(F, m, g, l) {
    for (let w = g; w < l; w++)
      if (o(F, w, m))
        return !1;
    return !0;
  }
  function i(F) {
    F.forEach(function(m, g) {
      m.forEach(function(l) {
        for (let w = 1; w < l.rowSpan; w++) {
          let y = new Gr(l);
          y.x = l.x, y.y = l.y + w, y.colSpan = l.colSpan, h(y, F[g + w]);
        }
      });
    });
  }
  function c(F) {
    for (let m = F.length - 1; m >= 0; m--) {
      let g = F[m];
      for (let l = 0; l < g.length; l++) {
        let w = g[l];
        for (let y = 1; y < w.colSpan; y++) {
          let S = new Vr();
          S.x = w.x + y, S.y = w.y, g.splice(l + 1, 0, S);
        }
      }
    }
  }
  function h(F, m) {
    let g = 0;
    for (; g < m.length && m[g].x < F.x; )
      g++;
    m.splice(g, 0, F);
  }
  function d(F) {
    let m = s(F), g = n(F);
    Hr(`Max rows: ${m}; Max cols: ${g}`);
    for (let l = 0; l < m; l++)
      for (let w = 0; w < g; w++)
        if (!o(F, w, l)) {
          let y = { x: w, y: l, colSpan: 1, rowSpan: 1 };
          for (w++; w < g && !o(F, w, l); )
            y.colSpan++, w++;
          let S = l + 1;
          for (; S < m && u(F, S, y.x, y.x + y.colSpan); )
            y.rowSpan++, S++;
          let R = new at(y);
          R.x = y.x, R.y = y.y, zr(`Missing cell at ${R.y}-${R.x}.`), h(R, F[l]);
        }
  }
  function E(F) {
    return F.map(function(m) {
      if (!Array.isArray(m)) {
        let g = Object.keys(m)[0];
        m = m[g], Array.isArray(m) ? (m = m.slice(), m.unshift(g)) : m = [g, m];
      }
      return m.map(function(g) {
        return new at(g);
      });
    });
  }
  function C(F) {
    let m = E(F);
    return e(m), d(m), i(m), c(m), m;
  }
  Xn.exports = {
    makeTableLayout: C,
    layoutTable: e,
    addRowSpanCells: i,
    maxWidth: n,
    fillInTable: d,
    computeWidths: yn("colSpan", "desiredWidth", "x", 1),
    computeHeights: yn("rowSpan", "desiredHeight", "y", 1)
  };
})();
function yn(t, e, n, s) {
  return function(r, o) {
    let u = [], i = [], c = {};
    o.forEach(function(h) {
      h.forEach(function(d) {
        (d[t] || 1) > 1 ? i.push(d) : u[d[n]] = Math.max(u[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(h, d) {
      typeof h == "number" && (u[d] = h);
    });
    for (let h = i.length - 1; h >= 0; h--) {
      let d = i[h], E = d[t], C = d[n], F = u[C], m = typeof r[C] == "number" ? 0 : 1;
      if (typeof F == "number")
        for (let g = 1; g < E; g++)
          F += 1 + u[C + g], typeof r[C + g] != "number" && m++;
      else
        F = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!c[C] || c[C] < F) && (c[C] = F);
      if (d[e] > F) {
        let g = 0;
        for (; m > 0 && d[e] > F; ) {
          if (typeof r[C + g] != "number") {
            let l = Math.round((d[e] - F) / m);
            F += l, u[C + g] += l, m--;
          }
          g++;
        }
      }
    }
    Object.assign(r, u, c);
    for (let h = 0; h < r.length; h++)
      r[h] = Math.max(s, r[h] || 0);
  };
}
var Ur = Xn.exports;
const ne = Qt, qr = Qn, Xe = Ur;
let ts = class extends Array {
  constructor(e) {
    super();
    const n = qr.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          ne.setDebugLevel(ne.WARN);
          break;
        case "number":
          ne.setDebugLevel(n.debug);
          break;
        case "string":
          ne.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          ne.setDebugLevel(ne.WARN), ne.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return ne.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = Xe.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(u) {
        u.mergeTableOptions(this.options, s);
      }, this);
    }, this), Xe.computeWidths(this.options.colWidths, s), Xe.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(u) {
        u.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let u = s[o], i = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && et(u, "top", r);
      for (let c = 0; c < i; c++)
        et(u, c, r);
      o + 1 == s.length && et(u, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
ts.reset = () => ne.reset();
function et(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Zr = ts, Kr = Zr;
const Yr = /* @__PURE__ */ sr(Kr);
class be extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, be);
  }
}
function ns() {
  return Jr() ? 0 : 1;
}
function Jr() {
  return Qr() && !process.defaultApp;
}
function Qr() {
  return !!process.versions.electron;
}
function Xr(t) {
  return t.slice(ns() + 1);
}
function eo() {
  return process.argv[ns()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function me(t) {
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
function ss(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const o = n.charAt(r), u = t.charAt(r);
    o !== u && r > 0 ? s += `${e}${n.charAt(r)}` : s += u;
  }
  return s;
}
function rs(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function to(t) {
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
var Y;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(Y || (Y = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let te;
class no {
  constructor(e) {
    te = e;
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
    }, n), r = to(e), o = typeof e == "string", u = so(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), i = Object.assign({
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
    }, s.configuration), c = Object.assign(/* @__PURE__ */ Object.create(null), s.default), h = s.configObjects || [], d = s.envPrefix, E = i["populate--"], C = E ? "--" : "_", F = /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ Object.create(null), g = s.__ || te.format, l = {
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
      const f = typeof a == "object" ? a.key : a, b = Object.keys(a).map(function(p) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[p];
      }).filter(Boolean).pop();
      b && (l[b][f] = !0), l.arrays[f] = !0, l.keys.push(f);
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
    })), js(s.key, u, s.default, l.arrays), Object.keys(c).forEach(function(a) {
      (l.aliases[a] || []).forEach(function(f) {
        c[f] = c[a];
      });
    });
    let S = null;
    Ps();
    let R = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ce = {};
    for (let a = 0; a < r.length; a++) {
      const f = r[a], b = f.replace(/^-{3,}/, "---");
      let p, D, _, x, A, I;
      if (f !== "--" && /^-/.test(f) && ye(f))
        ae(f);
      else if (b.match(/^---+(=|$)/)) {
        ae(f);
        continue;
      } else if (f.match(/^--.+=/) || !i["short-option-groups"] && f.match(/^-.+=/))
        x = f.match(/^--?([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && ($(x[1], l.arrays) ? a = q(a, x[1], r, x[2]) : $(x[1], l.nargs) !== !1 ? a = re(a, x[1], r, x[2]) : L(x[1], x[2], !0));
      else if (f.match(y) && i["boolean-negation"])
        x = f.match(y), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], L(D, $(D, l.arrays) ? [!1] : !1));
      else if (f.match(/^--.+/) || !i["short-option-groups"] && f.match(/^-[^-]+/))
        x = f.match(/^--?(.+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], $(D, l.arrays) ? a = q(a, D, r) : $(D, l.nargs) !== !1 ? a = re(a, D, r) : (A = r[a + 1], A !== void 0 && (!A.match(/^-/) || A.match(w)) && !$(D, l.bools) && !$(D, l.counts) || /^(true|false)$/.test(A) ? (L(D, A), a++) : L(D, le(D))));
      else if (f.match(/^-.\..+=/))
        x = f.match(/^-([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && L(x[1], x[2]);
      else if (f.match(/^-.\..+/) && !f.match(w))
        A = r[a + 1], x = f.match(/^-(.\..+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], A !== void 0 && !A.match(/^-/) && !$(D, l.bools) && !$(D, l.counts) ? (L(D, A), a++) : L(D, le(D)));
      else if (f.match(/^-[^-]+/) && !f.match(w)) {
        _ = f.slice(1, -1).split(""), p = !1;
        for (let k = 0; k < _.length; k++) {
          if (A = f.slice(k + 2), _[k + 1] && _[k + 1] === "=") {
            I = f.slice(k + 3), D = _[k], $(D, l.arrays) ? a = q(a, D, r, I) : $(D, l.nargs) !== !1 ? a = re(a, D, r, I) : L(D, I), p = !0;
            break;
          }
          if (A === "-") {
            L(_[k], A);
            continue;
          }
          if (/[A-Za-z]/.test(_[k]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(A) && $(A, l.bools) === !1) {
            L(_[k], A), p = !0;
            break;
          }
          if (_[k + 1] && _[k + 1].match(/\W/)) {
            L(_[k], A), p = !0;
            break;
          } else
            L(_[k], le(_[k]));
        }
        D = f.slice(-1)[0], !p && D !== "-" && ($(D, l.arrays) ? a = q(a, D, r) : $(D, l.nargs) !== !1 ? a = re(a, D, r) : (A = r[a + 1], A !== void 0 && (!/^(-|--)[^-]/.test(A) || A.match(w)) && !$(D, l.bools) && !$(D, l.counts) || /^(true|false)$/.test(A) ? (L(D, A), a++) : L(D, le(D))));
      } else if (f.match(/^-[0-9]$/) && f.match(w) && $(f.slice(1), l.bools))
        D = f.slice(1), L(D, le(D));
      else if (f === "--") {
        R = r.slice(a + 1);
        break;
      } else if (i["halt-at-non-option"]) {
        R = r.slice(a);
        break;
      } else
        ae(f);
    }
    an(O, !0), an(O, !1), Os(O), Rs(), cn(O, l.aliases, c, !0), Ns(O), i["set-placeholder-key"] && Ls(O), Object.keys(l.counts).forEach(function(a) {
      pe(O, a.split(".")) || L(a, 0);
    }), E && R.length && (O[C] = []), R.forEach(function(a) {
      O[C].push(a);
    }), i["camel-case-expansion"] && i["strip-dashed"] && Object.keys(O).filter((a) => a !== "--" && a.includes("-")).forEach((a) => {
      delete O[a];
    }), i["strip-aliased"] && [].concat(...Object.keys(u).map((a) => u[a])).forEach((a) => {
      i["camel-case-expansion"] && a.includes("-") && delete O[a.split(".").map((f) => me(f)).join(".")], delete O[a];
    });
    function ae(a) {
      const f = _e("_", a);
      (typeof f == "string" || typeof f == "number") && O._.push(f);
    }
    function re(a, f, b, p) {
      let D, _ = $(f, l.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return ee(p) || (S = Error(g("Argument unexpected for: %s", f))), L(f, le(f)), a;
      let x = ee(p) ? 0 : 1;
      if (i["nargs-eats-options"])
        b.length - (a + 1) + x < _ && (S = Error(g("Not enough arguments following: %s", f))), x = _;
      else {
        for (D = a + 1; D < b.length && (!b[D].match(/^-[^0-9]/) || b[D].match(w) || ye(b[D])); D++)
          x++;
        x < _ && (S = Error(g("Not enough arguments following: %s", f)));
      }
      let A = Math.min(x, _);
      for (!ee(p) && A > 0 && (L(f, p), A--), D = a + 1; D < A + a + 1; D++)
        L(f, b[D]);
      return a + A;
    }
    function q(a, f, b, p) {
      let D = [], _ = p || b[a + 1];
      const x = $(f, l.nargs);
      if ($(f, l.bools) && !/^(true|false)$/.test(_))
        D.push(!0);
      else if (ee(_) || ee(p) && /^-/.test(_) && !w.test(_) && !ye(_)) {
        if (c[f] !== void 0) {
          const A = c[f];
          D = Array.isArray(A) ? A : [A];
        }
      } else {
        ee(p) || D.push(Me(f, p, !0));
        for (let A = a + 1; A < b.length && !(!i["greedy-arrays"] && D.length > 0 || x && typeof x == "number" && D.length >= x || (_ = b[A], /^-/.test(_) && !w.test(_) && !ye(_))); A++)
          a = A, D.push(Me(f, _, o));
      }
      return typeof x == "number" && (x && D.length < x || isNaN(x) && D.length === 0) && (S = Error(g("Not enough arguments following: %s", f))), L(f, D), a;
    }
    function L(a, f, b = o) {
      if (/-/.test(a) && i["camel-case-expansion"]) {
        const _ = a.split(".").map(function(x) {
          return me(x);
        }).join(".");
        un(a, _);
      }
      const p = Me(a, f, b), D = a.split(".");
      de(O, D, p), l.aliases[a] && l.aliases[a].forEach(function(_) {
        const x = _.split(".");
        de(O, x, p);
      }), D.length > 1 && i["dot-notation"] && (l.aliases[D[0]] || []).forEach(function(_) {
        let x = _.split(".");
        const A = [].concat(D);
        A.shift(), x = x.concat(A), (l.aliases[a] || []).includes(x.join(".")) || de(O, x, p);
      }), $(a, l.normalize) && !$(a, l.arrays) && [a].concat(l.aliases[a] || []).forEach(function(x) {
        Object.defineProperty(ce, x, {
          enumerable: !0,
          get() {
            return f;
          },
          set(A) {
            f = typeof A == "string" ? te.normalize(A) : A;
          }
        });
      });
    }
    function un(a, f) {
      l.aliases[a] && l.aliases[a].length || (l.aliases[a] = [f], F[f] = !0), l.aliases[f] && l.aliases[f].length || un(f, a);
    }
    function Me(a, f, b) {
      b && (f = ro(f)), ($(a, l.bools) || $(a, l.counts)) && typeof f == "string" && (f = f === "true");
      let p = Array.isArray(f) ? f.map(function(D) {
        return _e(a, D);
      }) : _e(a, f);
      return $(a, l.counts) && (ee(p) || typeof p == "boolean") && (p = tt()), $(a, l.normalize) && $(a, l.arrays) && (Array.isArray(f) ? p = f.map((D) => te.normalize(D)) : p = te.normalize(f)), p;
    }
    function _e(a, f) {
      return !i["parse-positional-numbers"] && a === "_" || !$(a, l.strings) && !$(a, l.bools) && !Array.isArray(f) && (rs(f) && i["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${f}`))) || !ee(f) && $(a, l.numbers)) && (f = Number(f)), f;
    }
    function Os(a) {
      const f = /* @__PURE__ */ Object.create(null);
      cn(f, l.aliases, c), Object.keys(l.configs).forEach(function(b) {
        const p = a[b] || f[b];
        if (p)
          try {
            let D = null;
            const _ = te.resolve(te.cwd(), p), x = l.configs[b];
            if (typeof x == "function") {
              try {
                D = x(_);
              } catch (A) {
                D = A;
              }
              if (D instanceof Error) {
                S = D;
                return;
              }
            } else
              D = te.require(_);
            ke(D);
          } catch (D) {
            D.name === "PermissionDenied" ? S = D : a[b] && (S = Error(g("Invalid JSON config file: %s", p)));
          }
      });
    }
    function ke(a, f) {
      Object.keys(a).forEach(function(b) {
        const p = a[b], D = f ? f + "." + b : b;
        typeof p == "object" && p !== null && !Array.isArray(p) && i["dot-notation"] ? ke(p, D) : (!pe(O, D.split(".")) || $(D, l.arrays) && i["combine-arrays"]) && L(D, p);
      });
    }
    function Rs() {
      typeof h < "u" && h.forEach(function(a) {
        ke(a);
      });
    }
    function an(a, f) {
      if (typeof d > "u")
        return;
      const b = typeof d == "string" ? d : "", p = te.env();
      Object.keys(p).forEach(function(D) {
        if (b === "" || D.lastIndexOf(b, 0) === 0) {
          const _ = D.split("__").map(function(x, A) {
            return A === 0 && (x = x.substring(b.length)), me(x);
          });
          (f && l.configs[_.join(".")] || !f) && !pe(a, _) && L(_.join("."), p[D]);
        }
      });
    }
    function Ns(a) {
      let f;
      const b = /* @__PURE__ */ new Set();
      Object.keys(a).forEach(function(p) {
        if (!b.has(p) && (f = $(p, l.coercions), typeof f == "function"))
          try {
            const D = _e(p, f(a[p]));
            [].concat(l.aliases[p] || [], p).forEach((_) => {
              b.add(_), a[_] = D;
            });
          } catch (D) {
            S = D;
          }
      });
    }
    function Ls(a) {
      return l.keys.forEach((f) => {
        ~f.indexOf(".") || typeof a[f] > "u" && (a[f] = void 0);
      }), a;
    }
    function cn(a, f, b, p = !1) {
      Object.keys(b).forEach(function(D) {
        pe(a, D.split(".")) || (de(a, D.split("."), b[D]), p && (m[D] = !0), (f[D] || []).forEach(function(_) {
          pe(a, _.split(".")) || de(a, _.split("."), b[D]);
        }));
      });
    }
    function pe(a, f) {
      let b = a;
      i["dot-notation"] || (f = [f.join(".")]), f.slice(0, -1).forEach(function(D) {
        b = b[D] || {};
      });
      const p = f[f.length - 1];
      return typeof b != "object" ? !1 : p in b;
    }
    function de(a, f, b) {
      let p = a;
      i["dot-notation"] || (f = [f.join(".")]), f.slice(0, -1).forEach(function(I) {
        I = An(I), typeof p == "object" && p[I] === void 0 && (p[I] = {}), typeof p[I] != "object" || Array.isArray(p[I]) ? (Array.isArray(p[I]) ? p[I].push({}) : p[I] = [p[I], {}], p = p[I][p[I].length - 1]) : p = p[I];
      });
      const D = An(f[f.length - 1]), _ = $(f.join("."), l.arrays), x = Array.isArray(b);
      let A = i["duplicate-arguments-array"];
      !A && $(D, l.nargs) && (A = !0, (!ee(p[D]) && l.nargs[D] === 1 || Array.isArray(p[D]) && p[D].length === l.nargs[D]) && (p[D] = void 0)), b === tt() ? p[D] = tt(p[D]) : Array.isArray(p[D]) ? A && _ && x ? p[D] = i["flatten-duplicate-arrays"] ? p[D].concat(b) : (Array.isArray(p[D][0]) ? p[D] : [p[D]]).concat([b]) : !A && !!_ == !!x ? p[D] = b : p[D] = p[D].concat([b]) : p[D] === void 0 && _ ? p[D] = x ? b : [b] : A && !(p[D] === void 0 || $(D, l.counts) || $(D, l.bools)) ? p[D] = [p[D], b] : p[D] = b;
    }
    function js(...a) {
      a.forEach(function(f) {
        Object.keys(f || {}).forEach(function(b) {
          l.aliases[b] || (l.aliases[b] = [].concat(u[b] || []), l.aliases[b].concat(b).forEach(function(p) {
            if (/-/.test(p) && i["camel-case-expansion"]) {
              const D = me(p);
              D !== b && l.aliases[b].indexOf(D) === -1 && (l.aliases[b].push(D), F[D] = !0);
            }
          }), l.aliases[b].concat(b).forEach(function(p) {
            if (p.length > 1 && /[A-Z]/.test(p) && i["camel-case-expansion"]) {
              const D = ss(p, "-");
              D !== b && l.aliases[b].indexOf(D) === -1 && (l.aliases[b].push(D), F[D] = !0);
            }
          }), l.aliases[b].forEach(function(p) {
            l.aliases[p] = [b].concat(l.aliases[b].filter(function(D) {
              return p !== D;
            }));
          }));
        });
      });
    }
    function $(a, f) {
      const b = [].concat(l.aliases[a] || [], a), p = Object.keys(f), D = b.find((_) => p.includes(_));
      return D ? f[D] : !1;
    }
    function ln(a) {
      const f = Object.keys(l);
      return [].concat(f.map((p) => l[p])).some(function(p) {
        return Array.isArray(p) ? p.includes(a) : p[a];
      });
    }
    function Ts(a, ...f) {
      return [].concat(...f).some(function(p) {
        const D = a.match(p);
        return D && ln(D[1]);
      });
    }
    function Ws(a) {
      if (a.match(w) || !a.match(/^-[^-]+/))
        return !1;
      let f = !0, b;
      const p = a.slice(1).split("");
      for (let D = 0; D < p.length; D++) {
        if (b = a.slice(D + 2), !ln(p[D])) {
          f = !1;
          break;
        }
        if (p[D + 1] && p[D + 1] === "=" || b === "-" || /[A-Za-z]/.test(p[D]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(b) || p[D + 1] && p[D + 1].match(/\W/))
          break;
      }
      return f;
    }
    function ye(a) {
      return i["unknown-options-as-args"] && Is(a);
    }
    function Is(a) {
      return a = a.replace(/^-{3,}/, "--"), a.match(w) || Ws(a) ? !1 : !Ts(a, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function le(a) {
      return !$(a, l.bools) && !$(a, l.counts) && `${a}` in c ? c[a] : Ms(ks(a));
    }
    function Ms(a) {
      return {
        [Y.BOOLEAN]: !0,
        [Y.STRING]: "",
        [Y.NUMBER]: void 0,
        [Y.ARRAY]: []
      }[a];
    }
    function ks(a) {
      let f = Y.BOOLEAN;
      return $(a, l.strings) ? f = Y.STRING : $(a, l.numbers) ? f = Y.NUMBER : $(a, l.bools) ? f = Y.BOOLEAN : $(a, l.arrays) && (f = Y.ARRAY), f;
    }
    function ee(a) {
      return a === void 0;
    }
    function Ps() {
      Object.keys(l.counts).find((a) => $(a, l.arrays) ? (S = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", a)), !0) : $(a, l.nargs) ? (S = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", a)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(ce, O),
      configuration: i,
      defaulted: Object.assign({}, m),
      error: S,
      newAliases: Object.assign({}, F)
    };
  }
}
function so(t) {
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
function tt(t) {
  return t !== void 0 ? t + 1 : 1;
}
function An(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function ro(t) {
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
var nt, st, rt;
const vn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, $n = (st = (nt = process == null ? void 0 : process.versions) === null || nt === void 0 ? void 0 : nt.node) !== null && st !== void 0 ? st : (rt = process == null ? void 0 : process.version) === null || rt === void 0 ? void 0 : rt.slice(1);
if ($n && Number($n.match(/^([^.]+)/)[1]) < vn)
  throw Error(`yargs parser supports a minimum Node.js version of ${vn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const oo = process ? process.env : {}, os = new no({
  cwd: process.cwd,
  env: () => oo,
  format: Gn,
  normalize: Us,
  resolve: he,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(Kt(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), we = function(e, n) {
  return os.parse(e.slice(), n).argv;
};
we.detailed = function(t, e) {
  return os.parse(t.slice(), e);
};
we.camelCase = me;
we.decamelize = ss;
we.looksLikeNumber = rs;
const uo = {
  right: fo,
  center: ho
}, io = 0, $e = 1, ao = 2, Be = 3;
class co {
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
      r.length > 1 && G.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), G.stringWidth(r[0])));
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
    const n = G.stripAnsi(e);
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
        const { width: c } = e[i], h = this.negatePadding(e[i]);
        let d = u;
        if (h > G.stringWidth(u) && (d += " ".repeat(h - G.stringWidth(u))), e[i].align && e[i].align !== "left" && this.wrap) {
          const C = uo[e[i].align];
          d = C(d, h), G.stringWidth(d) < h && (d += " ".repeat((c || 0) - G.stringWidth(d) - 1));
        }
        const E = e[i].padding || [0, 0, 0, 0];
        E[Be] && (o += " ".repeat(E[Be])), o += Bn(e[i], d, "| "), o += d, o += Bn(e[i], d, " |"), E[$e] && (o += " ".repeat(E[$e])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, o = n.text, u = G.stringWidth(o.trimRight());
    return n.span ? this.wrap ? r < u ? e : (n.hidden = !0, o.trimRight() + " ".repeat(r - u) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((o, u) => {
      o.width = s[u], this.wrap ? r = G.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : r = o.text.split(`
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[io] || 0).fill("")), r.push(...new Array(o.padding[ao] || 0).fill(""))), r.forEach((i, c) => {
        n[c] || n.push([]);
        const h = n[c];
        for (let d = 0; d < u; d++)
          h[d] === void 0 && h.push("");
        h.push(i);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[Be] || 0) + (e.padding[$e] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((u) => u.width || G.stringWidth(u.text));
    let n = e.length, s = this.width;
    const r = e.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), o = n ? Math.floor(s / n) : 0;
    return r.map((u, i) => u === void 0 ? Math.max(o, lo(e[i])) : u);
  }
}
function Bn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function lo(t) {
  const e = t.padding || [], n = 1 + (e[Be] || 0) + (e[$e] || 0);
  return t.border ? n + 4 : n;
}
function Do() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function fo(t, e) {
  t = t.trim();
  const n = G.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function ho(t, e) {
  t = t.trim();
  const n = G.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let G;
function po(t, e) {
  return G = e, new co({
    width: t?.width || Do(),
    wrap: t?.wrap
  });
}
const us = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function is(t) {
  return t.replace(us, "");
}
function go(t, e) {
  const [n, s] = t.match(us) || ["", ""];
  t = is(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function mo(t) {
  return po(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: is,
    wrap: go
  });
}
function bo(t, e) {
  let n = he(".", t), s;
  for (Un(n).isDirectory() || (n = ot(n)); ; ) {
    if (s = e(n, Ys(n)), s) return he(n, s);
    if (n = ot(s = n), s === n) break;
  }
}
const Fo = {
  fs: {
    readFileSync: Kt,
    writeFile: Js
  },
  format: Gn,
  resolve: he,
  exists: (t) => {
    try {
      return Un(t).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class Co {
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
    return ~u.indexOf("%d") && i.push(r), K.format.apply(K.format, i.concat(e));
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
    K.fs.writeFile(u, i, "utf-8", function(c) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(c);
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
function Eo(t, e) {
  K = e;
  const n = new Co(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const xo = (t) => Eo(t, Fo), wo = "require is not supported by ESM", Sn = "loading a directory of commands is not supported yet for ESM";
let Fe;
try {
  Fe = er(import.meta.url);
} catch {
  Fe = process.cwd();
}
const _o = Fe.substring(0, Fe.lastIndexOf("node_modules"));
Qs, Xs, Hs, _o || process.cwd(), qs, ot, Zs, Ks, he, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Kt, xo({
  directory: he(Fe, "../../../locales"),
  updateFiles: !1
});
let as = !1;
const yo = (t) => {
  as = t;
}, On = () => as, ie = {
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
}, tn = Object.keys(ie), Ao = 1.5, Rn = 75, Nn = 85, Ln = 95, cs = [...tn, ...Object.values(ie).flat()], vo = {
  maxFunctionSize: 20,
  maxScriptLength: 100
}, $o = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((C, { errors: F, warnings: m }) => ({ errors: C.errors + F, warnings: C.warnings + m }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` });
  const u = Math.ceil((1 - (s * Ao + r) / e) * 100), i = 60, c = r ? Math.max(1, Math.ceil(r / e * i)) : 0, h = s ? Math.max(1, i - Math.ceil(u * i / 100) - c) : 0, d = i - h - c, E = `<bg_ok>${"_".repeat(d)}</bg_ok><bg_warn>${"_".repeat(c)}</bg_warn><bg_err>${"_".repeat(h)}</bg_err>`;
  return o.push({ info: `Code Health: [${E}] ${u}%
` }), u < Rn && o.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= Rn && u < Nn && o.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= Nn && u < Ln && o.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= Ln && o.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { errors: s, warnings: r, output: o };
}, nn = async (t) => {
  let e = t;
  for (; e !== H.parse(e).root; ) {
    const n = H.join(e, "package.json");
    try {
      return await ue.access(n), e;
    } catch {
      e = H.dirname(e);
    }
  }
  throw new Error("Project root not found");
};
function Bo(t) {
  const e = [], n = [];
  return Object.entries(ie).forEach(([s, r]) => {
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
    const s = nr(import.meta.url), r = H.dirname(s), o = H.resolve(r, "..");
    e = H.join(o, "package.json");
  }
  return t && (e = H.join(t, "package.json")), JSON.parse(await ue.readFile(e, "utf-8"));
}, sn = async () => await nn(process?.cwd() || "./") || "", Ds = async (t, e) => {
  const n = await sn(), s = H.join(n, "package.json");
  return Yt.existsSync(s) ? !!(await ls(e)).dependencies[t] : !1;
}, fs = async (t) => {
  const e = await sn(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await Ds("nuxt", t) || n.some((s) => Yt.existsSync(H.join(e, s)));
}, So = async (t) => {
  const e = await sn(), n = ["vue.config.js", "vue.config.ts"];
  return !await fs(t) && (await Ds("vue", t) || n.some((r) => Yt.existsSync(H.join(e, r))));
}, Oo = /^(\(.*\)|\\?.)$/;
function oe(t) {
  const e = t.toString();
  return Oo.test(e) ? e : `(?:${e})`;
}
const Ro = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, No = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(t) {
  const e = (n) => v(`(?<${n}>${`${t}`.replace(Ro, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => v(`${t}${P(...n)}`), {
      referenceTo: (n) => v(`${t}\\k<${n}>`)
    }),
    or: (...n) => v(`(?:${t}|${P(...n)})`),
    after: (...n) => v(`(?<=${P(...n)})${t}`),
    before: (...n) => v(`${t}(?=${P(...n)})`),
    notAfter: (...n) => v(`(?<!${P(...n)})${t}`),
    notBefore: (...n) => v(`${t}(?!${P(...n)})`),
    times: Object.assign((n) => v(`${oe(t)}{${n}}`), {
      any: () => v(`${oe(t)}*`),
      atLeast: (n) => v(`${oe(t)}{${n},}`),
      atMost: (n) => v(`${oe(t)}{0,${n}}`),
      between: (n, s) => v(`${oe(t)}{${n},${s}}`)
    }),
    optionally: () => v(`${oe(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => v(`${t}`.replace(No, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${t}`),
      lineEnd: () => v(`${t}$`)
    }
  };
}
const Lo = /[.*+?^${}()|[\]\\/]/g;
function Ce(t) {
  return v(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function z(t) {
  return v(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Se(...t) {
  return v(`(?:${t.map((e) => P(e)).join("|")})`);
}
const fe = v(".");
v("\\b\\w+\\b");
const Z = v("\\w"), U = v("\\b"), jo = v("\\d"), W = v("\\s"), hs = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), ps = v("\\t"), ds = v("\\n");
v("\\r");
v("\\W+"), v("\\W"), v("\\B"), v("\\D"), v("\\S"), Object.assign(v("[^a-zA-Z]"), {
  lowercase: v("[^a-z]"),
  uppercase: v("[^A-Z]")
}), v("[^\\t]"), v("[^\\n]"), v("[^\\r]");
function Q(...t) {
  return v(`${oe(P(...t))}?`);
}
function P(...t) {
  return v(
    t.map((e) => typeof e == "string" ? e.replace(Lo, "\\$&") : e).join("")
  );
}
function B(...t) {
  return v(`${oe(P(...t))}+`);
}
const J = "i", T = "g", N = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(P(...t).toString(), [...e || ""].join(""));
}, ct = [], To = ["get", "post", "put", "delete", "patch", "options", "head"], Wo = (t, e) => {
  if (!e.includes("/server/api/"))
    return;
  const n = e.replace(/\.[^/.]+$/, "");
  if (To.some((u) => n.toLowerCase().endsWith(`.${u}`)))
    return;
  const r = t.source;
  N(
    P("if"),
    B(" "),
    "(",
    P("event.node.req.method"),
    B(" "),
    "!="
  ).test(r) || ct.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, Io = () => {
  const t = [];
  return ct.length > 0 && ct.forEach((e) => {
    const n = e.filePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ API endpoint without HTTP method</text_info>",
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${n}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/api-without-method.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, j = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((i, c) => c >= n && i.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((u, i) => u + i.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Ne = [], Mo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = j(t.content, o);
    if (u > n * 2) {
      Ne.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-if with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && Ne.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-if with ${u} lines</bg_warn>`
    });
  });
}, ko = () => {
  const t = [];
  return Ne.length > 0 && Ne.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Le = [], Po = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = j(t.content, o);
    if (u > n * 2) {
      Le.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-show with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && Le.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-show with ${u} lines</bg_warn>`
    });
  });
}, zo = () => {
  const t = [];
  return Le.length > 0 && Le.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, lt = [], gs = 4, jn = 2 * gs, Ho = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const r = N(
    Se(
      "if",
      'v-if="',
      B(fe).groupedAs("condition").and("?").and(B(fe)).and(":"),
      // ternary
      "="
    ).and(
      B(
        Se(
          "&&",
          "||",
          z(`"'`)
        )
      )
    ),
    [T]
  ), o = N(
    Se("&&", "||"),
    [T]
  ), u = (i, c) => {
    const h = i.match(r);
    h && h.forEach((d) => {
      const E = (d.match(o) || []).length + 1;
      if (E > gs) {
        const C = j(i, d);
        lt.push({
          filePath: e,
          message: `line #${C} ${E > jn ? "<bg_err>" : "<bg_warn>"}${c} has a complicated condition with ${E} blocks${E > jn ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  n && u(n.content, "script"), s && u(s.content, "template");
}, Vo = () => {
  const t = [];
  return lt.length > 0 && lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Dt = [], Go = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const u = o[1];
    if (s.test(u)) {
      const i = j(t.content.trim(), o[0]), c = u.trim(), h = c.length > 20 ? c.slice(0, 20) : c;
      Dt.push({
        filePath: e,
        message: `line #${i} side effect detected in computed property <bg_err>(${h})</bg_err>`
      });
    }
  });
}, Uo = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ft = [], ms = 5, Tn = 2 * ms, qo = (t, e) => {
  if (!t)
    return;
  const n = N(U, "if", U, [T, J]), s = N(U, "else", U, [T, J]), r = N(U, "for", U, [T, J]), o = N(U, "while", U, [T, J]), u = N(U, "case", U, [T, J]), i = t.content.match(n), c = t.content.match(s), h = t.content.match(r), d = t.content.match(o), E = t.content.match(u), C = (i?.length || 0) + (c?.length || 0) + (h?.length || 0) + (d?.length || 0) + (E?.length || 0);
  C > ms && ft.push({ filePath: e, message: `Cyclomatic complexity is ${C > Tn ? "<bg_err>very high" : "<bg_warn>high"} (${C})${C > Tn ? "</bg_err>" : "</bg_warn>"}` });
}, Zo = () => {
  const t = [];
  return ft.length > 0 && ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ht = [], Wn = 5, Ko = 3, Yo = (t, e) => {
  if (!t)
    return;
  const n = N(ps.times.atLeast(Wn).at.lineStart().or(W.times.atLeast(Ko * Wn).at.lineStart()), [T]), s = t.content.match(n);
  let r = 0;
  s?.forEach((o) => {
    const u = j(t.content, o, r);
    ht.push({
      filePath: e,
      message: `line #${u} <bg_warn>indentation: ${o.length}</bg_warn>`
    }), r = u;
  });
}, Jo = () => {
  const t = [];
  return ht.length > 0 && ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, pt = [], Qo = (t, e) => {
  if (!t)
    return;
  const n = N(U, "else", U, [T, J]), s = t.content.match(n);
  s?.length && pt.push({ filePath: e, message: `else clauses found <bg_err>(${s.length})</bg_err>` });
}, Xo = () => {
  const t = [];
  return pt.length > 0 && pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, je = [], eu = 5, tu = 8;
function nu({ funcName: t, funcBody: e, lineNumber: n, filePath: s, max: r }) {
  const o = e.split(`
`).length, u = ou(t);
  if (o > 2 * r) {
    je.push({ filePath: s, message: `function <bg_err>(${u}#${n})</bg_err> is too long: <bg_err>${o} lines</bg_err>` });
    return;
  }
  o >= r && je.push({ filePath: s, message: `function <bg_warn>(${u}#${n})</bg_warn> is too long: <bg_warn>${o} lines</bg_warn>` });
}
function su(t, e) {
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
function ru(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, o] = r, u = e + r.index + r[0].length;
    let i = u, c = "";
    if (t[u] === "{") {
      let h = 1;
      for (i = u + 1; i < t.length && h > 0; )
        t[i] === "{" ? h++ : t[i] === "}" && h--, i++;
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
function ou(t) {
  return t.replace(/^const\s*/, "");
}
const uu = (t, e, n) => {
  if (!t)
    return;
  const s = t.content, r = s.length;
  let o = 0;
  for (; o < r; ) {
    let u = "", i = "", c = !1;
    if (s.slice(o, o + tu) === "function") {
      const h = su(s, o);
      h && (c = !0, u = h.name, i = h.body, o = h.end);
    }
    if (s.slice(o, o + eu) === "const") {
      const h = ru(s, o);
      h && (c = !0, u = h.name, i = h.body, o = h.end);
    }
    if (c) {
      const h = j(s.trim(), u);
      nu({ funcName: u, funcBody: i, lineNumber: h, filePath: e, max: n });
    } else
      o++;
  }
}, iu = (t) => {
  const e = [];
  return je.length > 0 && je.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${n.message} 🚨`
    });
  }), e;
}, dt = [], au = (t, e) => {
  if (!t)
    return;
  const n = N("<", P("img").or("picture"), [T]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const u = j(t.content, o, r), i = o.slice(1);
      dt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i} element found</bg_warn>`
      }), r = u;
    });
  }
}, cu = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, gt = [], lu = (t, e) => {
  if (!t)
    return;
  const n = N("<a", U, [T, J]), s = t.content.match(n);
  s?.length && gt.push({ filePath: e, message: `${s?.length} <bg_warn>html link found</bg_warn>` });
}, Du = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, mt = [], fu = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((r, o) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const i = s[o + 1]?.trim();
      (!i || !i.startsWith("{") && !u.endsWith("{")) && mt.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: <bg_err>${u}</bg_err>`
      });
    }
  });
}, hu = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], pu = (t, e) => {
  if (!t)
    return;
  const n = N(B(jo).as("magicNumber"), Se(")", ds), [T]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, u = Number.parseInt(o ?? "0");
    if (u > 1) {
      const i = j(t.content, String(u), r);
      bt.push({
        filePath: e,
        message: `line #${i} <bg_warn>magic number: ${u}</bg_warn>`
      }), r = i;
    }
  }
}, du = () => {
  const t = [];
  return bt.length && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Ft = [], gu = (t, e) => {
  if (!t)
    return;
  const n = N(B(fe), W, "?", W, B(fe), W, ":", W, B(fe));
  t.content.match(n)?.forEach((r) => {
    if (r.split("?").length - 1 > 1) {
      const o = j(t.content, r);
      Ft.push({
        filePath: e,
        message: `line #${o} has <bg_warn>nested ternary</bg_warn>`
      });
    }
  });
}, mu = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], bu = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const u = j(t.content.trim(), o[0], r);
    Ct.push({
      filePath: e,
      message: `line #${u} <bg_warn>Found inline style: ${o[0]}</bg_warn>`
    }), r = u;
  });
}, Fu = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, Et = [], Cu = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((r) => {
    const o = j(t.content, r);
    Et.push({
      filePath: e,
      message: `line #${o} <bg_warn>props destructuring found: ${r}</bg_warn>`
    });
  });
}, Eu = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], xu = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((r) => {
    const o = j(t.content, r);
    xt.push({
      filePath: e,
      message: `line #${o} <bg_warn>Avoid using 'var' for variable declarations: ${r}</bg_warn>`
    });
  });
}, wu = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], bs = 3, In = (t, e, n) => {
  const s = e.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > bs && wt.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${s.length}</bg_warn> parameters` });
}, _u = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && In(s[1], s[2], e), s[3] && In(s[3], s[4], e);
}, yu = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${bs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], Au = (t, e) => {
  !t || t.setup || _t.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, vu = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], $u = (t, e) => {
  if (!t)
    return;
  const n = N(
    "defineProps(",
    W.times.any(),
    "[",
    W.times.any(),
    B(Ce(`'"`), B(Z), Ce(`'"`), W.times.any(), Q(",", W.times.any())),
    "]",
    W.times.any(),
    ")",
    [T]
  ), s = N(
    "<",
    B(Z).grouped(),
    W,
    z(">").times.any(),
    ":",
    B(Z).grouped(),
    W.times.any(),
    "=",
    W.times.any(),
    '"props.',
    B(Z).grouped(),
    '"',
    [T]
  );
  let r;
  const o = /* @__PURE__ */ new Set();
  for (; (r = n.exec(t.content)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((c) => o.add(c));
  let u;
  for (; (u = s.exec(t.content)) !== null; ) {
    const i = u[1], c = u[2], h = u[3];
    o.has(h) && c === h && yt.push({
      filePath: e,
      message: `Prop <bg_warn>(${h})</bg_warn> is being drilled through <bg_warn>${i}</bg_warn> component unmodified.`
    });
  }
}, Bu = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], Su = (t, e, n) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.length > n && At.push({ filePath: e, message: `${s.length > n * 2 ? "<bg_err>" : "<bg_warn>"}(${s.length} lines)${s.length > n * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ou = (t) => {
  const e = [];
  return At.length > 0 && At.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${n.message} 🚨`
    });
  }), e;
}, vt = [], Fs = 4, Ru = ["i", "key"], Nu = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    r.length < Fs && !Ru.includes(r) && vt.push({ filePath: e, message: `variable: <bg_warn>(${r})</bg_warn>` });
  }
}, Lu = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${Fs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], ju = 5, Tu = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps", Q("<"), Q("("), "{", B(fe), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > ju && $t.push({ filePath: e, message: `props found <bg_err>(${r})</bg_err>` });
  }
}, Wu = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], Iu = (t, e) => {
  if (!t)
    return;
  const n = N('v-for="(', W.times.any(), B(Z).grouped(), W.times.any(), ",", W.times.any(), B(Z).grouped(), W.times.any(), ")", B(W), "in", B(W), B(Z).grouped(), [T]), s = N(':key="', W.times.any(), B(Z).grouped(), W.times.any(), '"', [T]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((u) => {
    const [i, c, h, d] = u;
    o.forEach((E) => {
      const C = E[1];
      if (C === h) {
        const F = j(t.content.trim(), C);
        Bt.push({
          filePath: e,
          message: `line #${F} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, Mu = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], ku = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[0], o = s[1], u = j(t.content.trim(), r);
    St.push({
      filePath: e,
      message: `line #${u} zero length comparison found <bg_warn>(${o})</bg_warn>`
    });
  }
}, Pu = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Zero Length Comparison</text_info>",
      description: "👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, zu = [
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
], Ot = [], Hu = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      zu.includes(o) && Ot.push({ filePath: e, message: `<bg_warn>(${o})</bg_warn>` });
    }
  });
}, Vu = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Te = [], Gu = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(P("$parent").or("getCurrentInstance"), [T]), o = t.content.match(n), u = t.content.match(s);
  if (u) {
    const c = u[1].split(".")[0];
    if ((o ? o[1] : "").includes(c)) {
      const d = j(t.content.trim(), c);
      Te.push({
        filePath: e,
        message: `line #${d} <bg_warn>(${c})</bg_warn>`
      });
    }
  }
  const i = t.content.match(r);
  if (i) {
    const c = j(t.content.trim(), i[0]);
    Te.push({
      filePath: e,
      message: `line #${c} <bg_warn>(${i[0]})</bg_warn>`
    });
  }
}, Uu = () => {
  const t = [];
  return Te.length > 0 && Te.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], qu = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || Rt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Zu = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Nt = [], Ku = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps([", [T, J]);
  t.content.match(n)?.length && Nt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, Yu = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], Ju = (t) => {
  if (t.includes("pages"))
    return;
  const e = H.basename(t);
  if (e === "App.vue")
    return;
  const n = N(hs.uppercase);
  e.slice(1).match(n)?.length || Lt.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, Qu = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], Xu = (t, e) => {
  if (!t)
    return;
  const n = N("<", B(z(">")), " v-for", B(z(">")), ">", [
    T,
    J
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || jt.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, ei = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], ti = (t, e) => {
  if (!t)
    return;
  const n = N(
    "<",
    B(z(">")),
    " v-if",
    B(z(">")),
    " v-for",
    B(z(">")),
    ">",
    [T, J]
  ), s = N(
    "<",
    B(z(">")),
    " v-for",
    B(z(">")),
    " v-if",
    B(z(">")),
    ">",
    [T, J]
  ), r = t.content.match(n), o = t.content.match(s);
  if (r?.length || o?.length) {
    const u = r?.length ? r[0] : o?.length ? o[0] : "", i = j(t.content, u);
    Tt.push({ filePath: e, message: `line #${i} <bg_err>v-if used with v-for</bg_err>` });
  }
}, ni = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], Mn = [
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
], si = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const u = o[1], i = o[2];
    if (i) {
      const h = Array.from(i.matchAll(r), (E) => E[1]).filter((E) => Mn.includes(E));
      let d = -1;
      for (const E of h) {
        const C = Mn.indexOf(E);
        if (C !== -1 && C < d) {
          Wt.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${u})</bg_warn>`
          });
          break;
        }
        d = C;
      }
    }
  }
}, ri = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], oi = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), o = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: o }
  ].filter((c) => c.index !== -1);
  u.every((c, h) => h === 0 ? !0 : u[h - 1].index < c.index) || It.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, ui = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], ii = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = H.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && Mt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, ai = () => {
  const t = [];
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], ci = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = j(t.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    kt.push({ filePath: e, message: `line #${o} <bg_warn>(${u})</bg_warn>` });
  });
}, li = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], kn = [], Di = ["v-slot", "v-bind", "v-on"], fi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Di.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = j(t.source, s);
      Pt.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), kn.some((o) => o.filePath === e) || kn.push({ filePath: e });
    }
  });
}, hi = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], pi = 3, di = (t) => {
  const e = N(
    B(z("/")).grouped(),
    P(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = N(
      Ce("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [T]
    ), o = s.match(r);
    (!o || o.length < pi) && zt.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
  }
}, gi = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], mi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((i) => i.trim() !== "").length > 1 && o.split(`
`).length === 1 && Ht.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, bi = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], Fi = /^[a-z]+([A-Z][a-z]*)*$/, Ci = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !Fi.test(o)).length && Vt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
}, Ei = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], xi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    B(Z),
    Q(B(Ce(` 	
\r`))),
    B(z("/>")),
    Q(B(Ce(` 	
\r`))),
    Q("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const o = N(":", B(Z), Q(" "), "=", Q(" "), z(`'"`), [
    "g"
  ]);
  r?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const i = u.match(o);
    if (i?.length) {
      const c = j(t.source, u);
      Gt.push({ filePath: e, message: `line #${c} <bg_warn>${i}</bg_warn>` });
    }
  });
}, wi = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], _i = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    B(hs.uppercase, Z),
    Q(ds, ps),
    Q(B(z(">"))),
    "></",
    B(Z),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const u = j(t.source, o), i = o.split(`
`).at(-1)?.trim() || "";
    Ut.push({ filePath: e, message: `line #${u} <bg_warn>${i}</bg_warn>` });
  });
}, yi = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Cs = [], Oe = [], Ai = 5, vi = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > Ai) {
      const o = r.split(`
`)[0], u = j(t.content, o);
      Cs.push({ filePath: e, message: `line #${u} <bg_warn>computed</bg_warn>` }), Oe.push({ filePath: e }), Oe.some((i) => i.filePath === e) || Oe.push({ filePath: e });
    }
  });
}, $i = () => {
  const t = [];
  return Oe.length > 0 && Cs.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], Bi = 40, Si = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > Bi) {
      const o = j(t.content, r), u = r.split(`
`).at(0)?.trim() || "";
      qt.push({
        filePath: e,
        message: `line #${o} <bg_warn>${u}</bg_warn>`
      });
    }
  });
}, Oi = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ri = (t, e, n) => {
  const s = t.scriptSetup || t.script, r = e.endsWith(".vue"), { ...o } = on[0], u = {
    // vue-essential
    simpleProp: () => Ku(s, e),
    singleNameComponent: () => r && Ju(e),
    globalStyle: () => r && qu(t.styles, e),
    vforNoKey: () => r && Xu(t.template, e),
    vifWithVfor: () => r && ti(t.template, e),
    // vue-strong
    simpleComputed: () => vi(s, e),
    componentFiles: () => r && ci(s, e),
    propNameCasing: () => r && Ci(s, e),
    componentFilenameCasing: () => r && ii(e),
    selfClosingComponents: () => r && _i(t, e),
    templateSimpleExpression: () => r && Si(t.template, e),
    quotedAttributeValues: () => r && xi(t, e),
    directiveShorthands: () => r && fi(t, e),
    fullWordComponentName: () => r && di(e),
    multiAttributeElements: () => r && mi(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => r && oi(t.source, e),
    elementAttributeOrder: () => r && si(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => r && Gu(s, e),
    elementSelectorsWithScoped: () => r && Hu(t.styles, e),
    // rrd
    apiWithoutMethod: () => On() && Wo(t, e),
    bigVif: () => Mo(t.template, e),
    bigVShow: () => Po(t.template, e),
    complicatedConditions: () => Ho(t, e),
    cyclomaticComplexity: () => qo(s, e),
    computedSideEffects: () => Go(s, e),
    deepIndentation: () => Yo(s, e),
    elseCondition: () => Qo(s, e),
    functionSize: () => uu(s, e, o.maxFunctionSize),
    htmlImageElements: () => On() && au(t.template, e),
    htmlLink: () => r && lu(t.template, e),
    ifWithoutCurlyBraces: () => fu(s, e),
    magicNumbers: () => pu(s, e),
    nestedTernary: () => gu(s, e),
    noPropDestructure: () => Cu(s, e),
    noVarDeclaration: () => xu(s, e),
    parameterCount: () => _u(s, e),
    plainScript: () => r && Au(t.script, e),
    propsDrilling: () => $u(s, e),
    scriptLength: () => Su(s, e, o.maxScriptLength),
    shortVariableName: () => Nu(s, e),
    tooManyProps: () => Tu(s, e),
    vForWithIndexKey: () => r && Iu(t.template, e),
    zeroLengthComparison: () => ku(s, e),
    noInlineStyles: () => bu(t.template, e)
  };
  n.forEach((i) => {
    i in ie ? ie[i].forEach((c) => {
      c in u && u[c]();
    }) : i in u && u[i]();
  });
}, Ni = (t, e, n) => {
  const s = {}, r = {}, o = [], { ...u } = on[0], i = ({ file: d, rule: E, title: C, description: F, message: m }) => {
    const g = t === "rule" ? E : d;
    s[g] || (s[g] = []), s[g].push({ file: d, rule: E, title: C, description: F, message: m });
  }, c = (d) => {
    d().forEach((C) => {
      i(C);
    });
  };
  return c(Qu), c(Yu), c(ei), c(ni), c(Zu), c(ai), c(li), c(hi), c(gi), c(bi), c(Ei), c(wi), c(yi), c($i), c(Oi), c(ui), c(ri), c(Uu), c(Vu), c(Io), c(ko), c(zo), c(Vo), c(Zo), c(Uo), c(Jo), c(Xo), c(() => iu(u.maxFunctionSize)), c(cu), c(Du), c(hu), c(du), c(mu), c(Eu), c(wu), c(yu), c(vu), c(Bu), c(() => Ou(u.maxScriptLength)), c(Lu), c(Wu), c(Mu), c(Pu), c(Fu), Object.keys(s).sort((d, E) => {
    const C = s[d].length, F = s[E].length;
    return e === "desc" ? F - C : C - F;
  }).forEach((d) => {
    r[d] = [], s[d].forEach((E, C) => {
      const F = E.message.includes("<bg_err>");
      if (o.some((m) => m.file === E.file)) {
        const m = o.find((g) => g.file === E.file);
        m && F && m.errors++, m && !F && m.warnings++;
      } else
        o.push({ file: E.file, errors: F ? 1 : 0, warnings: F ? 0 : 1, output: [] });
      n === "error" && !F || (r[d][C] = { id: "", description: "", message: "" }, t === "file" && (r[d][C].id = E.rule), t !== "file" && (r[d][C].id = E.file), r[d][C].description = E.description, r[d][C].message = E.message || "🚨");
    });
  }), { output: r, health: o };
};
let Zt = 0, Es = 0, xs = [];
const Li = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], rn = [], Pn = async (t, e) => {
  if (!rn.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    Zt++;
    const n = await ue.readFile(e, "utf-8");
    Es += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = tr(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), Ri(s, e, xs), `Analyzing ${e}...`;
  }
}, ws = async (t) => {
  const e = [];
  if (!(await ue.stat(t)).isDirectory()) {
    const r = await Pn(t, t);
    return r && e.push(r), e;
  }
  const s = await ue.readdir(t);
  for (const r of s) {
    const o = H.join(t, r);
    if ((await ue.stat(o)).isDirectory() && !Li.some((c) => o.includes(c)) && !rn.some((c) => o.endsWith(c))) {
      const c = await ws(o);
      c && e.push(...c);
    }
    const i = await Pn(o, o);
    i && e.push(i);
  }
  return e;
}, ji = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: r, level: o, sortBy: u }) => {
  const i = e.filter((q) => !n.includes(q)), { rulesets: c, individualRules: h } = Bo(i), d = c.length ? `<bg_info>${c.join(", ")}</bg_info>` : "N/A", E = h.length ? `<bg_info>${h.join(", ")}</bg_info>` : "N/A";
  let C = `      Applying ${c.length} rulesets: ${d}`;
  h.length > 0 && (C += `
      Applying ${h.length} individual rules: ${E}`);
  const F = n.filter((q) => !c.includes(q)), m = F.length ? `<bg_info>${F.join(", ")}</bg_info>` : "N/A", g = await nn(t), l = await So(g), w = await fs(g);
  yo(w);
  const y = [];
  y.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` }), y.push({ info: `      Project type: <bg_info>${w ? "Nuxt" : ""}${l ? "Vue" : ""}${!w && !l ? "?" : ""}</bg_info>` }), y.push({
    info: `${C}
      Ignoring ${F.length} rules: ${m}
      Excluding ${s || "-"}
      Output level <bg_info>${o}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${u}</bg_info>`
  }), xs = e.filter((q) => !n.includes(q)), s && rn.push(...s.split(","));
  const S = await ws(t);
  y.push(...S.map((q) => ({ info: q }))), y.push({ info: `Found <bg_info>${Zt}</bg_info> files` });
  const { health: R, output: O } = Ni(r, u, o), { errors: ce, warnings: ae, output: re } = $o(R, Es, Zt);
  return !ce && !ae && y.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: y, codeHealthOutput: re, reportOutput: O };
}, _s = "\x1B[44m", Ti = "\x1B[43m", Ee = "\x1B[41m", Wi = "\x1B[42m", se = "\x1B[0m", ys = "\x1B[33m", As = "\x1B[36m", We = "\x1B[0m", zn = (t) => t.replace(/<bg_err>/g, Ee).replace(/<bg_warn>/g, Ti).replace(/<bg_info>/g, _s).replace(/<bg_ok>/g, Wi).replace(/<\/bg_err>/g, se).replace(/<\/bg_warn>/g, se).replace(/<\/bg_info>/g, se).replace(/<\/bg_ok>/g, se).replace(/<text_warn>/g, ys).replace(/<text_info>/g, As).replace(/<\/text_warn>/g, We).replace(/<\/text_info>/g, We), Hn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(ie) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    tn.includes(o) ? s.push(...ie[o]) : Object.values(ie).some((u) => u.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${Ee}Invalid ${t} values: ${r.join(", ")}${se}. 
${ys}Allowed values are: ${cs.join(", ")}${We}

`
  ), process.exit(1)), s;
}, vs = ["rule", "file"], $s = ["asc", "desc"], Bs = ["text", "json", "table"], Ss = ["all", "error"], Ii = {
  groupBy: vs,
  sortBy: $s,
  outputLevel: Ss,
  outputFormat: Bs
}, Ae = (t, e) => {
  const n = Ii[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${Ee}${t}${se} provided for flag ${As}${e}${We}. Valid options are: ${_s}${n.join(", ")}${se}.
`
  ), process.exit(1)), t;
};
function Vn(t) {
  const e = new RegExp(`--${t}(?:=[^\\s]*)?$`);
  return process.argv.some((n) => e.test(n));
}
const Mi = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4], on = [];
nn(Mi || "./src").then((t) => {
  ls().then((e) => {
    const n = [];
    let s = {
      path: "./src",
      apply: Object.values(tn).join(","),
      ignore: void 0,
      exclude: void 0,
      group: "rule",
      level: "all",
      sort: "desc",
      output: "text",
      override: vo
    };
    const r = {
      applyFromCLI: Vn("apply"),
      ignoreFromCLI: Vn("ignore"),
      applyFromFile: !1,
      ignoreFromFile: !1
    };
    let o = "";
    const u = H.join(t, "vue-mess-detector.json");
    ue.readFile(u, "utf-8").then((i) => {
      const c = JSON.parse(i);
      s = { ...s, ...c }, r.applyFromFile = !!c.apply, r.ignoreFromFile = !!c.ignore, n.push({ info: `👉 Using configuration from ${u}` });
    }).catch(() => {
      n.push({ info: "👉 Using default configuration" });
    }).finally(
      () => Gs(Xr(process.argv)).command(
        "analyze [path]",
        "Analyze Vue files for code smells and best practices",
        (i) => i.config(s).positional("path", {
          describe: "path to the Vue files",
          default: s.path
        }).option("apply", {
          alias: "a",
          describe: "Comma-separated list of rulesets/rules to apply.",
          choices: cs,
          coerce: Hn("apply"),
          group: "Filter Rulesets/Rules:",
          default: s.apply
        }).option("exclude", {
          alias: "e",
          describe: "Exclude files or directories from the analysis",
          default: s.exclude,
          group: "Exclude files:"
        }).option("group", {
          alias: "g",
          describe: "Group results at the output",
          choices: vs,
          coerce: (c) => Ae(c, "groupBy"),
          default: s.group,
          group: "Group Results:"
        }).option("level", {
          alias: "l",
          describe: "Output level",
          choices: Ss,
          coerce: (c) => Ae(c, "outputLevel"),
          default: s.level,
          group: "Output:"
        }).option("ignore", {
          alias: "i",
          describe: "Comma-separated list of rulesets to ignore.",
          coerce: Hn("ignore"),
          default: s.ignore,
          group: "Filter Rulesets:"
        }).option("sort", {
          alias: "s",
          describe: "Sort results at the output",
          choices: $s,
          coerce: (c) => Ae(c, "sortBy"),
          default: s.sort,
          group: "Sort Results:"
        }).option("output", {
          describe: "Output format",
          choices: Bs,
          coerce: (c) => Ae(c, "outputFormat"),
          default: s.output,
          group: "Output Format:"
        }).option("fileOutput", {
          alias: "f",
          describe: "Output file",
          default: "",
          group: "Output:"
        }).check(() => {
          const c = r.applyFromCLI || r.applyFromFile, h = r.ignoreFromCLI || r.ignoreFromFile;
          return c && h && (console.error(`
<bg_err>Cannot use both --ignore and --apply options together.</bg_err>
`), process.exit(1)), !0;
        }),
        (i) => {
          o = i.fileOutput;
          const c = (h) => o ? (ue.appendFile(o, `${h}
`), h) : (console.log(zn(h)), zn(h));
          on.push(s.override), ji({
            dir: i.path,
            apply: i.apply,
            ignore: i.ignore,
            exclude: i.exclude,
            groupBy: i.group,
            level: i.level,
            sortBy: i.sort
          }).then((h) => {
            if (i.output == "text") {
              [...n, ...h.output].forEach((d) => {
                c(d.info);
              });
              for (const d in h.reportOutput)
                c(`
- <text_info> ${d}</text_info>`), h.reportOutput[d].forEach((E) => {
                  c(`   ${E.id}`), c(`   ${E.description}`), c(`   ${E.message}
`);
                });
              h.codeHealthOutput?.forEach((d) => {
                c(d.info);
              });
            }
            if (i.output == "table") {
              o && (console.log(`We can not output ${Ee}to a file in table mode${se}`), process.exit(1)), [...n, ...h.output].forEach((d) => {
                c(d.info);
              });
              for (const d in h.reportOutput) {
                const E = new Yr({
                  head: ["id", "message"],
                  colWidths: [60, 60],
                  wordWrap: !0,
                  wrapOnWordBoundary: !1
                });
                c("-".repeat(120)), i.group == "rule" && (c(`<text_info>Rule: ${d}</text_info>`), c(`Description: ${h.reportOutput[d][0].description}`), h.reportOutput[d].forEach((C) => {
                  E.push([c(C.id), c(C.message)]);
                })), i.group == "file" && (c(`<text_info>File: ${d}</text_info>`), h.reportOutput[d].forEach((C) => {
                  E.push([`${C.id}
${C.description.replace("See: ", `See:
`)}`, C.message]);
                })), c(E.toString());
              }
              h.codeHealthOutput?.forEach((d) => {
                c(d.info);
              });
            }
            i.output == "json" && c(JSON.stringify(h, null, 2));
          }).catch((h) => {
            console.error(`${Ee}${h}${se}`);
          });
        }
      ).version("version", "Show version number", e.version).alias("version", "v").help().argv
    );
  });
});
export {
  cs as FLAT_RULESETS_RULES,
  ji as analyze,
  on as overrideConfig
};
