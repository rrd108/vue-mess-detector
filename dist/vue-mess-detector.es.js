import ue from "node:fs/promises";
import H from "node:path";
import Hs, { format as Un, inspect as Vs } from "util";
import Gs from "os";
import Us from "yargs";
import { normalize as qs, resolve as he, dirname as ut, basename as Zs, extname as Ks, relative as Ys } from "path";
import { readFileSync as Jt, statSync as qn, readdirSync as Js, writeFile as Qs } from "fs";
import { notStrictEqual as Xs, strictEqual as er } from "assert";
import { fileURLToPath as tr } from "url";
import { parse as nr } from "@vue/compiler-sfc";
import Qt from "node:fs";
import { fileURLToPath as sr } from "node:url";
function rr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let Xt = [], Zn = 0;
const M = (t, e) => {
  Zn >= e && Xt.push(t);
};
M.WARN = 1;
M.INFO = 2;
M.DEBUG = 3;
M.reset = () => {
  Xt = [];
};
M.setDebugLevel = (t) => {
  Zn = t;
};
M.warn = (t) => M(t, M.WARN);
M.info = (t) => M(t, M.INFO);
M.debug = (t) => M(t, M.DEBUG);
M.debugMessages = () => Xt;
var en = M, tn = { exports: {} }, or = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const ur = or;
var ir = (t) => typeof t == "string" ? t.replace(ur(), "") : t, nn = { exports: {} };
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
var ar = nn.exports, cr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const lr = ir, Dr = ar, fr = cr, Yn = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = lr(t), t.length === 0))
    return 0;
  t = t.replace(fr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += Dr(s) ? 2 : 1);
  }
  return e;
};
tn.exports = Yn;
tn.exports.default = Yn;
var hr = tn.exports;
const fn = hr;
function Ne(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function X(t) {
  let e = Ne();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return fn(o) > r ? fn(o) : r;
  }, 0);
}
function ge(t, e) {
  return Array(e + 1).join(t);
}
function pr(t, e, n, s) {
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
function Jn(t, e) {
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
function dr(t) {
  let e = Ne(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Jn(s, n), n = e.exec(t);
  return s;
}
function Qn(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += De[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function gr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = De[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function mr(t, e) {
  if (t.length === X(t))
    return t.substr(0, e);
  for (; X(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function br(t, e) {
  let n = Ne(!0), s = t.split(Ne()), r = 0, o = 0, u = "", i, f = {};
  for (; o < e; ) {
    i = n.exec(t);
    let h = s[r];
    if (r++, o + X(h) > e && (h = mr(h, e - o)), u += h, o += X(h), o < e) {
      if (!i)
        break;
      u += i[0], Jn(f, i);
    }
  }
  return Qn(f, u);
}
function Fr(t, e, n) {
  if (n = n || "…", X(t) <= e)
    return t;
  e -= X(n);
  let r = br(t, e);
  r += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !r.includes(o) && (r += o), r;
}
function Cr() {
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
function Er(t, e) {
  t = t || {}, e = e || Cr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function xr(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, u;
  for (let i = 0; i < s.length; i += 2) {
    let f = s[i], h = o + X(f);
    o > 0 && u && (h += u.length), h > t ? (o !== 0 && n.push(r.join("")), r = [f], o = X(f)) : (r.push(u || "", f), o = h), u = s[i + 1];
  }
  return o && n.push(r.join("")), n;
}
function wr(t, e) {
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
function _r(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? xr : wr;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, r(t, e[o]));
  return s;
}
function yr(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = gr(e, t[s]);
    e = dr(r);
    let o = Object.assign({}, e);
    n.push(Qn(o, r));
  }
  return n;
}
function Ar(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var Xn = {
  strlen: X,
  repeat: ge,
  pad: pr,
  truncate: Fr,
  mergeOptions: Er,
  wordWrap: _r,
  colorizeLines: yr,
  hyperlink: Ar
}, es = { exports: {} }, Me = { exports: {} }, ze = { exports: {} }, He = { exports: {} }, Ve = { exports: {} }, hn;
function vr() {
  return hn || (hn = 1, function(t) {
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
  }(Ve)), Ve.exports;
}
var Ge, pn;
function $r() {
  return pn || (pn = 1, Ge = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Ge;
}
var Ue, dn;
function Br() {
  if (dn) return Ue;
  dn = 1;
  var t = Gs, e = $r(), n = process.env, s = void 0;
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
    var f = s ? 1 : 0;
    if (process.platform === "win32") {
      var h = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(h[0]) >= 10 && Number(h[2]) >= 10586 ? Number(h[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(E) {
        return E in n;
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
  function u(i) {
    var f = o(i);
    return r(f);
  }
  return Ue = {
    supportsColor: u,
    stdout: u(process.stdout),
    stderr: u(process.stderr)
  }, Ue;
}
var qe = { exports: {} }, gn;
function Sr() {
  return gn || (gn = 1, function(t) {
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
        var i = o[u] || [" "], f = Math.floor(Math.random() * i.length);
        typeof o[u] < "u" ? r += o[u][f] : r += u;
      }), r;
    };
  }(qe)), qe.exports;
}
var Ze = { exports: {} }, mn;
function Or() {
  return mn || (mn = 1, function(t) {
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
      function f(h, d) {
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
            var b = ["up", "mid", "down"];
            for (var m in b)
              for (var c = b[m], w = 0; w <= C[c]; w++)
                d[c] && (E = E + r[c][u(r[c].length)]);
          }
        return E;
      }
      return f(n, s);
    };
  }(Ze)), Ze.exports;
}
var Ke = { exports: {} }, bn;
function Rr() {
  return bn || (bn = 1, function(t) {
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
  }(Ke)), Ke.exports;
}
var Ye = { exports: {} }, Fn;
function Nr() {
  return Fn || (Fn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(Ye)), Ye.exports;
}
var Je = { exports: {} }, Cn;
function Lr() {
  return Cn || (Cn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(Je)), Je.exports;
}
var Qe = { exports: {} }, En;
function jr() {
  return En || (En = 1, function(t) {
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
  }(Qe)), Qe.exports;
}
var xn;
function Tr() {
  return xn || (xn = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Hs, s = e.styles = vr(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = Br().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(m) {
      return ("" + m).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(c, w) {
      if (!e.enabled)
        return c + "";
      var y = s[w];
      return !y && w in e ? e[w](c) : y.open + c + y.close;
    };
    var u = /[|\\{}()[\]^$+*?.]/g, i = function(m) {
      if (typeof m != "string")
        throw new TypeError("Expected a string");
      return m.replace(u, "\\$&");
    };
    function f(m) {
      var c = function w() {
        return E.apply(w, arguments);
      };
      return c._styles = m, c.__proto__ = d, c;
    }
    var h = function() {
      var m = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(c) {
        s[c].closeRe = new RegExp(i(s[c].close), "g"), m[c] = {
          get: function() {
            return f(this._styles.concat(c));
          }
        };
      }), m;
    }(), d = r(function() {
    }, h);
    function E() {
      var m = Array.prototype.slice.call(arguments), c = m.map(function(O) {
        return O != null && O.constructor === String ? O : n.inspect(O);
      }).join(" ");
      if (!e.enabled || !c)
        return c;
      for (var w = c.indexOf(`
`) != -1, y = this._styles, S = y.length; S--; ) {
        var R = s[y[S]];
        c = R.open + c.replace(R.closeRe, R.open) + R.close, w && (c = c.replace(o, function(O) {
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
        (function(w) {
          e[w] = function(y) {
            if (typeof m[w] == "object") {
              var S = y;
              for (var R in m[w])
                S = e[m[w][R]](S);
              return S;
            }
            return e[m[w]](y);
          };
        })(c);
    };
    function C() {
      var m = {};
      return Object.keys(h).forEach(function(c) {
        m[c] = {
          get: function() {
            return f([c]);
          }
        };
      }), m;
    }
    var F = function(c, w) {
      var y = w.split("");
      return y = y.map(c), y.join("");
    };
    e.trap = Sr(), e.zalgo = Or(), e.maps = {}, e.maps.america = Rr()(e), e.maps.zebra = Nr()(e), e.maps.rainbow = Lr()(e), e.maps.random = jr()(e);
    for (var b in e.maps)
      (function(m) {
        e[m] = function(c) {
          return F(e.maps[m], c);
        };
      })(b);
    r(e, C());
  }(He)), He.exports;
}
var wn;
function Wr() {
  return wn || (wn = 1, function(t) {
    var e = Tr();
    t.exports = e;
  }(ze)), ze.exports;
}
const { info: Ir, debug: ts } = en, V = Xn;
let Mr = class ve {
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
    Pr.forEach(function(f) {
      Xe(s, r, f, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let u = this.options.style = this.options.style || {}, i = e.style;
    Xe(u, i, "padding-left", this), Xe(u, i, "padding-right", this), this.head = u.head || i.head, this.border = u.border || i.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = V.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(yn, -1), this.height = this.heights.reduce(yn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    e || Ir(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
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
        let s = Wr();
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
      for (; C instanceof it; )
        C = this.cells[C.y][C.x - 1];
      C instanceof at || (o = this.chars.rightMid);
    }
    let u = V.repeat(" ", this.paddingLeft), i = n ? this.chars.right : "", f = V.repeat(" ", this.paddingRight), h = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (h += this.truncate || "…");
    let E = V.truncate(h, d, this.truncate);
    return E = V.pad(E, d, " ", this.hAlign), E = u + E + f, this.stylizeLine(o, E, i);
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
      for (; u instanceof it; )
        u = this.cells[u.y][u.x - 1];
      u instanceof at || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = V.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, it = class {
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
}, at = class {
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
    this.cellOffset = n - s, this.offset = kr(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (ts(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function _n(...t) {
  return t.filter((e) => e != null).shift();
}
function Xe(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = _n(t[r], t[n], e[r], e[n])) : s[n] = _n(t[n], e[n]);
}
function kr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function yn(t, e) {
  return t + e + 1;
}
let Pr = [
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
Me.exports = Mr;
Me.exports.ColSpanCell = it;
Me.exports.RowSpanCell = at;
var zr = Me.exports;
const { warn: Hr, debug: Vr } = en, ct = zr, { ColSpanCell: Gr, RowSpanCell: Ur } = ct;
(function() {
  function t(F, b) {
    return F[b] > 0 ? t(F, b + 1) : b;
  }
  function e(F) {
    let b = {};
    F.forEach(function(m, c) {
      let w = 0;
      m.forEach(function(y) {
        y.y = c, y.x = c ? t(b, w) : w;
        const S = y.rowSpan || 1, R = y.colSpan || 1;
        if (S > 1)
          for (let O = 0; O < R; O++)
            b[y.x + O] = S;
        w = y.x + R;
      }), Object.keys(b).forEach((y) => {
        b[y]--, b[y] < 1 && delete b[y];
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
    let m = F.y, c = F.y - 1 + (F.rowSpan || 1), w = b.y, y = b.y - 1 + (b.rowSpan || 1), S = !(m > y || w > c), R = F.x, O = F.x - 1 + (F.colSpan || 1), ce = b.x, ae = b.x - 1 + (b.colSpan || 1), re = !(R > ae || ce > O);
    return S && re;
  }
  function o(F, b, m) {
    let c = Math.min(F.length - 1, m), w = { x: b, y: m };
    for (let y = 0; y <= c; y++) {
      let S = F[y];
      for (let R = 0; R < S.length; R++)
        if (r(w, S[R]))
          return !0;
    }
    return !1;
  }
  function u(F, b, m, c) {
    for (let w = m; w < c; w++)
      if (o(F, w, b))
        return !1;
    return !0;
  }
  function i(F) {
    F.forEach(function(b, m) {
      b.forEach(function(c) {
        for (let w = 1; w < c.rowSpan; w++) {
          let y = new Ur(c);
          y.x = c.x, y.y = c.y + w, y.colSpan = c.colSpan, h(y, F[m + w]);
        }
      });
    });
  }
  function f(F) {
    for (let b = F.length - 1; b >= 0; b--) {
      let m = F[b];
      for (let c = 0; c < m.length; c++) {
        let w = m[c];
        for (let y = 1; y < w.colSpan; y++) {
          let S = new Gr();
          S.x = w.x + y, S.y = w.y, m.splice(c + 1, 0, S);
        }
      }
    }
  }
  function h(F, b) {
    let m = 0;
    for (; m < b.length && b[m].x < F.x; )
      m++;
    b.splice(m, 0, F);
  }
  function d(F) {
    let b = s(F), m = n(F);
    Vr(`Max rows: ${b}; Max cols: ${m}`);
    for (let c = 0; c < b; c++)
      for (let w = 0; w < m; w++)
        if (!o(F, w, c)) {
          let y = { x: w, y: c, colSpan: 1, rowSpan: 1 };
          for (w++; w < m && !o(F, w, c); )
            y.colSpan++, w++;
          let S = c + 1;
          for (; S < b && u(F, S, y.x, y.x + y.colSpan); )
            y.rowSpan++, S++;
          let R = new ct(y);
          R.x = y.x, R.y = y.y, Hr(`Missing cell at ${R.y}-${R.x}.`), h(R, F[c]);
        }
  }
  function E(F) {
    return F.map(function(b) {
      if (!Array.isArray(b)) {
        let m = Object.keys(b)[0];
        b = b[m], Array.isArray(b) ? (b = b.slice(), b.unshift(m)) : b = [m, b];
      }
      return b.map(function(m) {
        return new ct(m);
      });
    });
  }
  function C(F) {
    let b = E(F);
    return e(b), d(b), i(b), f(b), b;
  }
  es.exports = {
    makeTableLayout: C,
    layoutTable: e,
    addRowSpanCells: i,
    maxWidth: n,
    fillInTable: d,
    computeWidths: An("colSpan", "desiredWidth", "x", 1),
    computeHeights: An("rowSpan", "desiredHeight", "y", 1)
  };
})();
function An(t, e, n, s) {
  return function(r, o) {
    let u = [], i = [], f = {};
    o.forEach(function(h) {
      h.forEach(function(d) {
        (d[t] || 1) > 1 ? i.push(d) : u[d[n]] = Math.max(u[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(h, d) {
      typeof h == "number" && (u[d] = h);
    });
    for (let h = i.length - 1; h >= 0; h--) {
      let d = i[h], E = d[t], C = d[n], F = u[C], b = typeof r[C] == "number" ? 0 : 1;
      if (typeof F == "number")
        for (let m = 1; m < E; m++)
          F += 1 + u[C + m], typeof r[C + m] != "number" && b++;
      else
        F = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!f[C] || f[C] < F) && (f[C] = F);
      if (d[e] > F) {
        let m = 0;
        for (; b > 0 && d[e] > F; ) {
          if (typeof r[C + m] != "number") {
            let c = Math.round((d[e] - F) / b);
            F += c, u[C + m] += c, b--;
          }
          m++;
        }
      }
    }
    Object.assign(r, u, f);
    for (let h = 0; h < r.length; h++)
      r[h] = Math.max(s, r[h] || 0);
  };
}
var qr = es.exports;
const ne = en, Zr = Xn, et = qr;
let ns = class extends Array {
  constructor(e) {
    super();
    const n = Zr.mergeOptions(e);
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
    let s = et.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(u) {
        u.mergeTableOptions(this.options, s);
      }, this);
    }, this), et.computeWidths(this.options.colWidths, s), et.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(u) {
        u.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let u = s[o], i = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && tt(u, "top", r);
      for (let f = 0; f < i; f++)
        tt(u, f, r);
      o + 1 == s.length && tt(u, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
ns.reset = () => ne.reset();
function tt(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Kr = ns, Yr = Kr;
const Jr = /* @__PURE__ */ rr(Yr);
class be extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, be);
  }
}
function ss() {
  return Qr() ? 0 : 1;
}
function Qr() {
  return Xr() && !process.defaultApp;
}
function Xr() {
  return !!process.versions.electron;
}
function eo(t) {
  return t.slice(ss() + 1);
}
function to() {
  return process.argv[ss()];
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
function rs(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const o = n.charAt(r), u = t.charAt(r);
    o !== u && r > 0 ? s += `${e}${n.charAt(r)}` : s += u;
  }
  return s;
}
function os(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function no(t) {
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
class so {
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
    }, n), r = no(e), o = typeof e == "string", u = ro(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), i = Object.assign({
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
    }, s.configuration), f = Object.assign(/* @__PURE__ */ Object.create(null), s.default), h = s.configObjects || [], d = s.envPrefix, E = i["populate--"], C = E ? "--" : "_", F = /* @__PURE__ */ Object.create(null), b = /* @__PURE__ */ Object.create(null), m = s.__ || te.format, c = {
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
      const D = typeof a == "object" ? a.key : a, g = Object.keys(a).map(function(p) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[p];
      }).filter(Boolean).pop();
      g && (c[g][D] = !0), c.arrays[D] = !0, c.keys.push(D);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(a) {
      c.bools[a] = !0, c.keys.push(a);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(a) {
      c.strings[a] = !0, c.keys.push(a);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(a) {
      c.numbers[a] = !0, c.keys.push(a);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(a) {
      c.counts[a] = !0, c.keys.push(a);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(a) {
      c.normalize[a] = !0, c.keys.push(a);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([a, D]) => {
      typeof D == "number" && (c.nargs[a] = D, c.keys.push(a));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([a, D]) => {
      typeof D == "function" && (c.coercions[a] = D, c.keys.push(a));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(a) {
      c.configs[a] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([a, D]) => {
      (typeof D == "boolean" || typeof D == "function") && (c.configs[a] = D);
    })), Ts(s.key, u, s.default, c.arrays), Object.keys(f).forEach(function(a) {
      (c.aliases[a] || []).forEach(function(D) {
        f[D] = f[a];
      });
    });
    let S = null;
    zs();
    let R = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), ce = {};
    for (let a = 0; a < r.length; a++) {
      const D = r[a], g = D.replace(/^-{3,}/, "---");
      let p, l, _, x, A, I;
      if (D !== "--" && /^-/.test(D) && ye(D))
        ae(D);
      else if (g.match(/^---+(=|$)/)) {
        ae(D);
        continue;
      } else if (D.match(/^--.+=/) || !i["short-option-groups"] && D.match(/^-.+=/))
        x = D.match(/^--?([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && ($(x[1], c.arrays) ? a = q(a, x[1], r, x[2]) : $(x[1], c.nargs) !== !1 ? a = re(a, x[1], r, x[2]) : L(x[1], x[2], !0));
      else if (D.match(y) && i["boolean-negation"])
        x = D.match(y), x !== null && Array.isArray(x) && x.length >= 2 && (l = x[1], L(l, $(l, c.arrays) ? [!1] : !1));
      else if (D.match(/^--.+/) || !i["short-option-groups"] && D.match(/^-[^-]+/))
        x = D.match(/^--?(.+)/), x !== null && Array.isArray(x) && x.length >= 2 && (l = x[1], $(l, c.arrays) ? a = q(a, l, r) : $(l, c.nargs) !== !1 ? a = re(a, l, r) : (A = r[a + 1], A !== void 0 && (!A.match(/^-/) || A.match(w)) && !$(l, c.bools) && !$(l, c.counts) || /^(true|false)$/.test(A) ? (L(l, A), a++) : L(l, le(l))));
      else if (D.match(/^-.\..+=/))
        x = D.match(/^-([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && L(x[1], x[2]);
      else if (D.match(/^-.\..+/) && !D.match(w))
        A = r[a + 1], x = D.match(/^-(.\..+)/), x !== null && Array.isArray(x) && x.length >= 2 && (l = x[1], A !== void 0 && !A.match(/^-/) && !$(l, c.bools) && !$(l, c.counts) ? (L(l, A), a++) : L(l, le(l)));
      else if (D.match(/^-[^-]+/) && !D.match(w)) {
        _ = D.slice(1, -1).split(""), p = !1;
        for (let k = 0; k < _.length; k++) {
          if (A = D.slice(k + 2), _[k + 1] && _[k + 1] === "=") {
            I = D.slice(k + 3), l = _[k], $(l, c.arrays) ? a = q(a, l, r, I) : $(l, c.nargs) !== !1 ? a = re(a, l, r, I) : L(l, I), p = !0;
            break;
          }
          if (A === "-") {
            L(_[k], A);
            continue;
          }
          if (/[A-Za-z]/.test(_[k]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(A) && $(A, c.bools) === !1) {
            L(_[k], A), p = !0;
            break;
          }
          if (_[k + 1] && _[k + 1].match(/\W/)) {
            L(_[k], A), p = !0;
            break;
          } else
            L(_[k], le(_[k]));
        }
        l = D.slice(-1)[0], !p && l !== "-" && ($(l, c.arrays) ? a = q(a, l, r) : $(l, c.nargs) !== !1 ? a = re(a, l, r) : (A = r[a + 1], A !== void 0 && (!/^(-|--)[^-]/.test(A) || A.match(w)) && !$(l, c.bools) && !$(l, c.counts) || /^(true|false)$/.test(A) ? (L(l, A), a++) : L(l, le(l))));
      } else if (D.match(/^-[0-9]$/) && D.match(w) && $(D.slice(1), c.bools))
        l = D.slice(1), L(l, le(l));
      else if (D === "--") {
        R = r.slice(a + 1);
        break;
      } else if (i["halt-at-non-option"]) {
        R = r.slice(a);
        break;
      } else
        ae(D);
    }
    cn(O, !0), cn(O, !1), Rs(O), Ns(), ln(O, c.aliases, f, !0), Ls(O), i["set-placeholder-key"] && js(O), Object.keys(c.counts).forEach(function(a) {
      pe(O, a.split(".")) || L(a, 0);
    }), E && R.length && (O[C] = []), R.forEach(function(a) {
      O[C].push(a);
    }), i["camel-case-expansion"] && i["strip-dashed"] && Object.keys(O).filter((a) => a !== "--" && a.includes("-")).forEach((a) => {
      delete O[a];
    }), i["strip-aliased"] && [].concat(...Object.keys(u).map((a) => u[a])).forEach((a) => {
      i["camel-case-expansion"] && a.includes("-") && delete O[a.split(".").map((D) => me(D)).join(".")], delete O[a];
    });
    function ae(a) {
      const D = _e("_", a);
      (typeof D == "string" || typeof D == "number") && O._.push(D);
    }
    function re(a, D, g, p) {
      let l, _ = $(D, c.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return ee(p) || (S = Error(m("Argument unexpected for: %s", D))), L(D, le(D)), a;
      let x = ee(p) ? 0 : 1;
      if (i["nargs-eats-options"])
        g.length - (a + 1) + x < _ && (S = Error(m("Not enough arguments following: %s", D))), x = _;
      else {
        for (l = a + 1; l < g.length && (!g[l].match(/^-[^0-9]/) || g[l].match(w) || ye(g[l])); l++)
          x++;
        x < _ && (S = Error(m("Not enough arguments following: %s", D)));
      }
      let A = Math.min(x, _);
      for (!ee(p) && A > 0 && (L(D, p), A--), l = a + 1; l < A + a + 1; l++)
        L(D, g[l]);
      return a + A;
    }
    function q(a, D, g, p) {
      let l = [], _ = p || g[a + 1];
      const x = $(D, c.nargs);
      if ($(D, c.bools) && !/^(true|false)$/.test(_))
        l.push(!0);
      else if (ee(_) || ee(p) && /^-/.test(_) && !w.test(_) && !ye(_)) {
        if (f[D] !== void 0) {
          const A = f[D];
          l = Array.isArray(A) ? A : [A];
        }
      } else {
        ee(p) || l.push(ke(D, p, !0));
        for (let A = a + 1; A < g.length && !(!i["greedy-arrays"] && l.length > 0 || x && typeof x == "number" && l.length >= x || (_ = g[A], /^-/.test(_) && !w.test(_) && !ye(_))); A++)
          a = A, l.push(ke(D, _, o));
      }
      return typeof x == "number" && (x && l.length < x || isNaN(x) && l.length === 0) && (S = Error(m("Not enough arguments following: %s", D))), L(D, l), a;
    }
    function L(a, D, g = o) {
      if (/-/.test(a) && i["camel-case-expansion"]) {
        const _ = a.split(".").map(function(x) {
          return me(x);
        }).join(".");
        an(a, _);
      }
      const p = ke(a, D, g), l = a.split(".");
      de(O, l, p), c.aliases[a] && c.aliases[a].forEach(function(_) {
        const x = _.split(".");
        de(O, x, p);
      }), l.length > 1 && i["dot-notation"] && (c.aliases[l[0]] || []).forEach(function(_) {
        let x = _.split(".");
        const A = [].concat(l);
        A.shift(), x = x.concat(A), (c.aliases[a] || []).includes(x.join(".")) || de(O, x, p);
      }), $(a, c.normalize) && !$(a, c.arrays) && [a].concat(c.aliases[a] || []).forEach(function(x) {
        Object.defineProperty(ce, x, {
          enumerable: !0,
          get() {
            return D;
          },
          set(A) {
            D = typeof A == "string" ? te.normalize(A) : A;
          }
        });
      });
    }
    function an(a, D) {
      c.aliases[a] && c.aliases[a].length || (c.aliases[a] = [D], F[D] = !0), c.aliases[D] && c.aliases[D].length || an(D, a);
    }
    function ke(a, D, g) {
      g && (D = oo(D)), ($(a, c.bools) || $(a, c.counts)) && typeof D == "string" && (D = D === "true");
      let p = Array.isArray(D) ? D.map(function(l) {
        return _e(a, l);
      }) : _e(a, D);
      return $(a, c.counts) && (ee(p) || typeof p == "boolean") && (p = nt()), $(a, c.normalize) && $(a, c.arrays) && (Array.isArray(D) ? p = D.map((l) => te.normalize(l)) : p = te.normalize(D)), p;
    }
    function _e(a, D) {
      return !i["parse-positional-numbers"] && a === "_" || !$(a, c.strings) && !$(a, c.bools) && !Array.isArray(D) && (os(D) && i["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${D}`))) || !ee(D) && $(a, c.numbers)) && (D = Number(D)), D;
    }
    function Rs(a) {
      const D = /* @__PURE__ */ Object.create(null);
      ln(D, c.aliases, f), Object.keys(c.configs).forEach(function(g) {
        const p = a[g] || D[g];
        if (p)
          try {
            let l = null;
            const _ = te.resolve(te.cwd(), p), x = c.configs[g];
            if (typeof x == "function") {
              try {
                l = x(_);
              } catch (A) {
                l = A;
              }
              if (l instanceof Error) {
                S = l;
                return;
              }
            } else
              l = te.require(_);
            Pe(l);
          } catch (l) {
            l.name === "PermissionDenied" ? S = l : a[g] && (S = Error(m("Invalid JSON config file: %s", p)));
          }
      });
    }
    function Pe(a, D) {
      Object.keys(a).forEach(function(g) {
        const p = a[g], l = D ? D + "." + g : g;
        typeof p == "object" && p !== null && !Array.isArray(p) && i["dot-notation"] ? Pe(p, l) : (!pe(O, l.split(".")) || $(l, c.arrays) && i["combine-arrays"]) && L(l, p);
      });
    }
    function Ns() {
      typeof h < "u" && h.forEach(function(a) {
        Pe(a);
      });
    }
    function cn(a, D) {
      if (typeof d > "u")
        return;
      const g = typeof d == "string" ? d : "", p = te.env();
      Object.keys(p).forEach(function(l) {
        if (g === "" || l.lastIndexOf(g, 0) === 0) {
          const _ = l.split("__").map(function(x, A) {
            return A === 0 && (x = x.substring(g.length)), me(x);
          });
          (D && c.configs[_.join(".")] || !D) && !pe(a, _) && L(_.join("."), p[l]);
        }
      });
    }
    function Ls(a) {
      let D;
      const g = /* @__PURE__ */ new Set();
      Object.keys(a).forEach(function(p) {
        if (!g.has(p) && (D = $(p, c.coercions), typeof D == "function"))
          try {
            const l = _e(p, D(a[p]));
            [].concat(c.aliases[p] || [], p).forEach((_) => {
              g.add(_), a[_] = l;
            });
          } catch (l) {
            S = l;
          }
      });
    }
    function js(a) {
      return c.keys.forEach((D) => {
        ~D.indexOf(".") || typeof a[D] > "u" && (a[D] = void 0);
      }), a;
    }
    function ln(a, D, g, p = !1) {
      Object.keys(g).forEach(function(l) {
        pe(a, l.split(".")) || (de(a, l.split("."), g[l]), p && (b[l] = !0), (D[l] || []).forEach(function(_) {
          pe(a, _.split(".")) || de(a, _.split("."), g[l]);
        }));
      });
    }
    function pe(a, D) {
      let g = a;
      i["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(l) {
        g = g[l] || {};
      });
      const p = D[D.length - 1];
      return typeof g != "object" ? !1 : p in g;
    }
    function de(a, D, g) {
      let p = a;
      i["dot-notation"] || (D = [D.join(".")]), D.slice(0, -1).forEach(function(I) {
        I = vn(I), typeof p == "object" && p[I] === void 0 && (p[I] = {}), typeof p[I] != "object" || Array.isArray(p[I]) ? (Array.isArray(p[I]) ? p[I].push({}) : p[I] = [p[I], {}], p = p[I][p[I].length - 1]) : p = p[I];
      });
      const l = vn(D[D.length - 1]), _ = $(D.join("."), c.arrays), x = Array.isArray(g);
      let A = i["duplicate-arguments-array"];
      !A && $(l, c.nargs) && (A = !0, (!ee(p[l]) && c.nargs[l] === 1 || Array.isArray(p[l]) && p[l].length === c.nargs[l]) && (p[l] = void 0)), g === nt() ? p[l] = nt(p[l]) : Array.isArray(p[l]) ? A && _ && x ? p[l] = i["flatten-duplicate-arrays"] ? p[l].concat(g) : (Array.isArray(p[l][0]) ? p[l] : [p[l]]).concat([g]) : !A && !!_ == !!x ? p[l] = g : p[l] = p[l].concat([g]) : p[l] === void 0 && _ ? p[l] = x ? g : [g] : A && !(p[l] === void 0 || $(l, c.counts) || $(l, c.bools)) ? p[l] = [p[l], g] : p[l] = g;
    }
    function Ts(...a) {
      a.forEach(function(D) {
        Object.keys(D || {}).forEach(function(g) {
          c.aliases[g] || (c.aliases[g] = [].concat(u[g] || []), c.aliases[g].concat(g).forEach(function(p) {
            if (/-/.test(p) && i["camel-case-expansion"]) {
              const l = me(p);
              l !== g && c.aliases[g].indexOf(l) === -1 && (c.aliases[g].push(l), F[l] = !0);
            }
          }), c.aliases[g].concat(g).forEach(function(p) {
            if (p.length > 1 && /[A-Z]/.test(p) && i["camel-case-expansion"]) {
              const l = rs(p, "-");
              l !== g && c.aliases[g].indexOf(l) === -1 && (c.aliases[g].push(l), F[l] = !0);
            }
          }), c.aliases[g].forEach(function(p) {
            c.aliases[p] = [g].concat(c.aliases[g].filter(function(l) {
              return p !== l;
            }));
          }));
        });
      });
    }
    function $(a, D) {
      const g = [].concat(c.aliases[a] || [], a), p = Object.keys(D), l = g.find((_) => p.includes(_));
      return l ? D[l] : !1;
    }
    function Dn(a) {
      const D = Object.keys(c);
      return [].concat(D.map((p) => c[p])).some(function(p) {
        return Array.isArray(p) ? p.includes(a) : p[a];
      });
    }
    function Ws(a, ...D) {
      return [].concat(...D).some(function(p) {
        const l = a.match(p);
        return l && Dn(l[1]);
      });
    }
    function Is(a) {
      if (a.match(w) || !a.match(/^-[^-]+/))
        return !1;
      let D = !0, g;
      const p = a.slice(1).split("");
      for (let l = 0; l < p.length; l++) {
        if (g = a.slice(l + 2), !Dn(p[l])) {
          D = !1;
          break;
        }
        if (p[l + 1] && p[l + 1] === "=" || g === "-" || /[A-Za-z]/.test(p[l]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) || p[l + 1] && p[l + 1].match(/\W/))
          break;
      }
      return D;
    }
    function ye(a) {
      return i["unknown-options-as-args"] && Ms(a);
    }
    function Ms(a) {
      return a = a.replace(/^-{3,}/, "--"), a.match(w) || Is(a) ? !1 : !Ws(a, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function le(a) {
      return !$(a, c.bools) && !$(a, c.counts) && `${a}` in f ? f[a] : ks(Ps(a));
    }
    function ks(a) {
      return {
        [Y.BOOLEAN]: !0,
        [Y.STRING]: "",
        [Y.NUMBER]: void 0,
        [Y.ARRAY]: []
      }[a];
    }
    function Ps(a) {
      let D = Y.BOOLEAN;
      return $(a, c.strings) ? D = Y.STRING : $(a, c.numbers) ? D = Y.NUMBER : $(a, c.bools) ? D = Y.BOOLEAN : $(a, c.arrays) && (D = Y.ARRAY), D;
    }
    function ee(a) {
      return a === void 0;
    }
    function zs() {
      Object.keys(c.counts).find((a) => $(a, c.arrays) ? (S = Error(m("Invalid configuration: %s, opts.count excludes opts.array.", a)), !0) : $(a, c.nargs) ? (S = Error(m("Invalid configuration: %s, opts.count excludes opts.narg.", a)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, c.aliases),
      argv: Object.assign(ce, O),
      configuration: i,
      defaulted: Object.assign({}, b),
      error: S,
      newAliases: Object.assign({}, F)
    };
  }
}
function ro(t) {
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
    r = r.filter(function(u, i, f) {
      return f.indexOf(u) === i;
    });
    const o = r.pop();
    o !== void 0 && typeof o == "string" && (n[o] = r);
  }), n;
}
function nt(t) {
  return t !== void 0 ? t + 1 : 1;
}
function vn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function oo(t) {
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
var st, rt, ot;
const $n = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Bn = (rt = (st = process == null ? void 0 : process.versions) === null || st === void 0 ? void 0 : st.node) !== null && rt !== void 0 ? rt : (ot = process == null ? void 0 : process.version) === null || ot === void 0 ? void 0 : ot.slice(1);
if (Bn && Number(Bn.match(/^([^.]+)/)[1]) < $n)
  throw Error(`yargs parser supports a minimum Node.js version of ${$n}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const uo = process ? process.env : {}, us = new so({
  cwd: process.cwd,
  env: () => uo,
  format: Un,
  normalize: qs,
  resolve: he,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(Jt(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), we = function(e, n) {
  return us.parse(e.slice(), n).argv;
};
we.detailed = function(t, e) {
  return us.parse(t.slice(), e);
};
we.camelCase = me;
we.decamelize = rs;
we.looksLikeNumber = os;
const io = {
  right: ho,
  center: po
}, ao = 0, $e = 1, co = 2, Be = 3;
class lo {
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
        const { width: f } = e[i], h = this.negatePadding(e[i]);
        let d = u;
        if (h > G.stringWidth(u) && (d += " ".repeat(h - G.stringWidth(u))), e[i].align && e[i].align !== "left" && this.wrap) {
          const C = io[e[i].align];
          d = C(d, h), G.stringWidth(d) < h && (d += " ".repeat((f || 0) - G.stringWidth(d) - 1));
        }
        const E = e[i].padding || [0, 0, 0, 0];
        E[Be] && (o += " ".repeat(E[Be])), o += Sn(e[i], d, "| "), o += d, o += Sn(e[i], d, " |"), E[$e] && (o += " ".repeat(E[$e])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
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
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[ao] || 0).fill("")), r.push(...new Array(o.padding[co] || 0).fill(""))), r.forEach((i, f) => {
        n[f] || n.push([]);
        const h = n[f];
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
    return r.map((u, i) => u === void 0 ? Math.max(o, Do(e[i])) : u);
  }
}
function Sn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Do(t) {
  const e = t.padding || [], n = 1 + (e[Be] || 0) + (e[$e] || 0);
  return t.border ? n + 4 : n;
}
function fo() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function ho(t, e) {
  t = t.trim();
  const n = G.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function po(t, e) {
  t = t.trim();
  const n = G.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let G;
function go(t, e) {
  return G = e, new lo({
    width: t?.width || fo(),
    wrap: t?.wrap
  });
}
const is = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function as(t) {
  return t.replace(is, "");
}
function mo(t, e) {
  const [n, s] = t.match(is) || ["", ""];
  t = as(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function bo(t) {
  return go(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: as,
    wrap: mo
  });
}
function Fo(t, e) {
  let n = he(".", t), s;
  for (qn(n).isDirectory() || (n = ut(n)); ; ) {
    if (s = e(n, Js(n)), s) return he(n, s);
    if (n = ut(s = n), s === n) break;
  }
}
const Co = {
  fs: {
    readFileSync: Jt,
    writeFile: Qs
  },
  format: Un,
  resolve: he,
  exists: (t) => {
    try {
      return qn(t).isFile();
    } catch {
      return !1;
    }
  }
};
let K;
class Eo {
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
    K.fs.writeFile(u, i, "utf-8", function(f) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(f);
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
function xo(t, e) {
  K = e;
  const n = new Eo(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const wo = (t) => xo(t, Co), _o = "require is not supported by ESM", On = "loading a directory of commands is not supported yet for ESM";
let Fe;
try {
  Fe = tr(import.meta.url);
} catch {
  Fe = process.cwd();
}
const yo = Fe.substring(0, Fe.lastIndexOf("node_modules"));
Xs, er, Vs, yo || process.cwd(), Zs, ut, Ks, Ys, he, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Jt, wo({
  directory: he(Fe, "../../../locales"),
  updateFiles: !1
});
let cs = !1;
const Ao = (t) => {
  cs = t;
}, Rn = () => cs, ie = {
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
}, sn = Object.keys(ie), vo = 1.5, Nn = 75, Ln = 85, jn = 95, ls = [...sn, ...Object.values(ie).flat()], $o = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((C, { errors: F, warnings: b }) => ({ errors: C.errors + F, warnings: C.warnings + b }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` });
  const u = Math.ceil((1 - (s * vo + r) / e) * 100), i = 60, f = r ? Math.max(1, Math.ceil(r / e * i)) : 0, h = s ? Math.max(1, i - Math.ceil(u * i / 100) - f) : 0, d = i - h - f, E = `<bg_ok>${"_".repeat(d)}</bg_ok><bg_warn>${"_".repeat(f)}</bg_warn><bg_err>${"_".repeat(h)}</bg_err>`;
  return o.push({ info: `Code Health: [${E}] ${u}%
` }), u < Nn && o.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= Nn && u < Ln && o.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= Ln && u < jn && o.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= jn && o.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { errors: s, warnings: r, output: o };
}, rn = async (t) => {
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
const Ds = async (t) => {
  let e = "";
  if (!t) {
    const s = sr(import.meta.url), r = H.dirname(s), o = H.resolve(r, "..");
    e = H.join(o, "package.json");
  }
  return t && (e = H.join(t, "package.json")), JSON.parse(await ue.readFile(e, "utf-8"));
}, on = async () => await rn(process?.cwd() || "./") || "", fs = async (t, e) => {
  const n = await on(), s = H.join(n, "package.json");
  return Qt.existsSync(s) ? !!(await Ds(e)).dependencies[t] : !1;
}, hs = async (t) => {
  const e = await on(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await fs("nuxt", t) || n.some((s) => Qt.existsSync(H.join(e, s)));
}, So = async (t) => {
  const e = await on(), n = ["vue.config.js", "vue.config.ts"];
  return !await hs(t) && (await fs("vue", t) || n.some((r) => Qt.existsSync(H.join(e, r))));
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
const Z = v("\\w"), U = v("\\b"), jo = v("\\d"), W = v("\\s"), ps = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), ds = v("\\t"), gs = v("\\n");
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
}, lt = [], To = ["get", "post", "put", "delete", "patch", "options", "head"], Wo = (t, e) => {
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
  ).test(r) || lt.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, Io = () => {
  const t = [];
  return lt.length > 0 && lt.forEach((e) => {
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
`).findIndex((i, f) => f >= n && i.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((u, i) => u + i.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Le = [], Mo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = j(t.content, o);
    if (u > n * 2) {
      Le.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-if with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && Le.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-if with ${u} lines</bg_warn>`
    });
  });
}, ko = () => {
  const t = [];
  return Le.length > 0 && Le.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, je = [], Po = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = j(t.content, o);
    if (u > n * 2) {
      je.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-show with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && je.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-show with ${u} lines</bg_warn>`
    });
  });
}, zo = () => {
  const t = [];
  return je.length > 0 && je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Dt = [], ms = 4, Tn = 2 * ms, Ho = (t, e) => {
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
  ), u = (i, f) => {
    const h = i.match(r);
    h && h.forEach((d) => {
      const E = (d.match(o) || []).length + 1;
      if (E > ms) {
        const C = j(i, d);
        Dt.push({
          filePath: e,
          message: `line #${C} ${E > Tn ? "<bg_err>" : "<bg_warn>"}${f} has a complicated condition with ${E} blocks${E > Tn ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  n && u(n.content, "script"), s && u(s.content, "template");
}, Vo = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ft = [], Go = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const u = o[1];
    if (s.test(u)) {
      const i = j(t.content.trim(), o[0]), f = u.trim(), h = f.length > 20 ? f.slice(0, 20) : f;
      ft.push({
        filePath: e,
        message: `line #${i} side effect detected in computed property <bg_err>(${h})</bg_err>`
      });
    }
  });
}, Uo = () => {
  const t = [];
  return ft.length > 0 && ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ht = [], bs = 5, Wn = 2 * bs, qo = (t, e) => {
  if (!t)
    return;
  const n = N(U, "if", U, [T, J]), s = N(U, "else", U, [T, J]), r = N(U, "for", U, [T, J]), o = N(U, "while", U, [T, J]), u = N(U, "case", U, [T, J]), i = t.content.match(n), f = t.content.match(s), h = t.content.match(r), d = t.content.match(o), E = t.content.match(u), C = (i?.length || 0) + (f?.length || 0) + (h?.length || 0) + (d?.length || 0) + (E?.length || 0);
  C > bs && ht.push({ filePath: e, message: `Cyclomatic complexity is ${C > Wn ? "<bg_err>very high" : "<bg_warn>high"} (${C})${C > Wn ? "</bg_err>" : "</bg_warn>"}` });
}, Zo = () => {
  const t = [];
  return ht.length > 0 && ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, pt = [], In = 5, Ko = 3, Yo = (t, e) => {
  if (!t)
    return;
  const n = N(ds.times.atLeast(In).at.lineStart().or(W.times.atLeast(Ko * In).at.lineStart()), [T]), s = t.content.match(n);
  let r = 0;
  s?.forEach((o) => {
    const u = j(t.content, o, r);
    pt.push({
      filePath: e,
      message: `line #${u} <bg_warn>indentation: ${o.length}</bg_warn>`
    }), r = u;
  });
}, Jo = () => {
  const t = [];
  return pt.length > 0 && pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, dt = [], Qo = (t, e) => {
  if (!t)
    return;
  const n = N(U, "else", U, [T, J]), s = t.content.match(n);
  s?.length && dt.push({ filePath: e, message: `else clauses found <bg_err>(${s.length})</bg_err>` });
}, Xo = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Te = [], gt = 20, eu = 5, tu = 8;
function nu({ funcName: t, funcBody: e, lineNumber: n, filePath: s }) {
  const r = e.split(`
`).length, o = ou(t);
  if (r > 2 * gt) {
    Te.push({ filePath: s, message: `function <bg_err>(${o}#${n})</bg_err> is too long: <bg_err>${r} lines</bg_err>` });
    return;
  }
  r >= gt && Te.push({ filePath: s, message: `function <bg_warn>(${o}#${n})</bg_warn> is too long: <bg_warn>${r} lines</bg_warn>` });
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
    const f = t.slice(o, i - 1).trim();
    return {
      name: r,
      body: f,
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
    let i = u, f = "";
    if (t[u] === "{") {
      let h = 1;
      for (i = u + 1; i < t.length && h > 0; )
        t[i] === "{" ? h++ : t[i] === "}" && h--, i++;
      f = t.slice(u + 1, i - 1).trim();
    } else {
      for (; i < t.length && t[i] !== ";"; )
        i++;
      f = t.slice(u, i).trim();
    }
    return {
      name: o,
      body: f,
      end: i
      // Position after the end of the function body
    };
  } else
    return null;
}
function ou(t) {
  return t.replace(/^const\s*/, "");
}
const uu = (t, e) => {
  if (!t)
    return;
  const n = t.content, s = n.length;
  let r = 0;
  for (; r < s; ) {
    let o = "", u = "", i = !1;
    if (n.slice(r, r + tu) === "function") {
      const f = su(n, r);
      f && (i = !0, o = f.name, u = f.body, r = f.end);
    }
    if (n.slice(r, r + eu) === "const") {
      const f = ru(n, r);
      f && (i = !0, o = f.name, u = f.body, r = f.end);
    }
    if (i) {
      const f = j(n.trim(), o);
      nu({ funcName: o, funcBody: u, lineNumber: f, filePath: e });
    } else
      r++;
  }
}, iu = () => {
  const t = [];
  return Te.length > 0 && Te.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${gt} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, mt = [], au = (t, e) => {
  if (!t)
    return;
  const n = N("<", P("img").or("picture"), [T]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const u = j(t.content, o, r), i = o.slice(1);
      mt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i} element found</bg_warn>`
      }), r = u;
    });
  }
}, cu = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], lu = (t, e) => {
  if (!t)
    return;
  const n = N("<a", U, [T, J]), s = t.content.match(n);
  s?.length && bt.push({ filePath: e, message: `${s?.length} <bg_warn>html link found</bg_warn>` });
}, Du = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], fu = (t, e) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.forEach((r, o) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const i = s[o + 1]?.trim();
      (!i || !i.startsWith("{") && !u.endsWith("{")) && Ft.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: <bg_err>${u}</bg_err>`
      });
    }
  });
}, hu = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], pu = (t, e) => {
  if (!t)
    return;
  const n = N(B(jo).as("magicNumber"), Se(")", gs), [T]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, u = Number.parseInt(o ?? "0");
    if (u > 1) {
      const i = j(t.content, String(u), r);
      Ct.push({
        filePath: e,
        message: `line #${i} <bg_warn>magic number: ${u}</bg_warn>`
      }), r = i;
    }
  }
}, du = () => {
  const t = [];
  return Ct.length && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Et = [], gu = (t, e) => {
  if (!t)
    return;
  const n = N(B(fe), W, "?", W, B(fe), W, ":", W, B(fe));
  t.content.match(n)?.forEach((r) => {
    if (r.split("?").length - 1 > 1) {
      const o = j(t.content, r);
      Et.push({
        filePath: e,
        message: `line #${o} has <bg_warn>nested ternary</bg_warn>`
      });
    }
  });
}, mu = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], bu = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const u = j(t.content.trim(), o[0], r);
    xt.push({
      filePath: e,
      message: `line #${u} <bg_warn>Found inline style: ${o[0]}</bg_warn>`
    }), r = u;
  });
}, Fu = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, wt = [], Cu = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  t.content.match(n)?.forEach((r) => {
    const o = j(t.content, r);
    wt.push({
      filePath: e,
      message: `line #${o} <bg_warn>props destructuring found: ${r}</bg_warn>`
    });
  });
}, Eu = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], xu = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  t.content.match(n)?.forEach((r) => {
    const o = j(t.content, r);
    _t.push({
      filePath: e,
      message: `line #${o} <bg_warn>Avoid using 'var' for variable declarations: ${r}</bg_warn>`
    });
  });
}, wu = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], Fs = 3, Mn = (t, e, n) => {
  const s = e.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > Fs && yt.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${s.length}</bg_warn> parameters` });
}, _u = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && Mn(s[1], s[2], e), s[3] && Mn(s[3], s[4], e);
}, yu = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${Fs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], Au = (t, e) => {
  !t || t.setup || At.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, vu = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], $u = (t, e) => {
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
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((f) => o.add(f));
  let u;
  for (; (u = s.exec(t.content)) !== null; ) {
    const i = u[1], f = u[2], h = u[3];
    o.has(h) && f === h && vt.push({
      filePath: e,
      message: `Prop <bg_warn>(${h})</bg_warn> is being drilled through <bg_warn>${i}</bg_warn> component unmodified.`
    });
  }
}, Bu = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], Oe = 100, Su = (t, e) => {
  if (!t)
    return;
  const n = t.content.split(`
`);
  n.length > Oe && $t.push({ filePath: e, message: `${n.length > Oe * 2 ? "<bg_err>" : "<bg_warn>"}(${n.length} lines)${n.length > Oe * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ou = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Oe} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, Bt = [], Cs = 4, Ru = ["i", "key"], Nu = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    r.length < Cs && !Ru.includes(r) && Bt.push({ filePath: e, message: `variable: <bg_warn>(${r})</bg_warn>` });
  }
}, Lu = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${Cs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], ju = 5, Tu = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps", Q("<"), Q("("), "{", B(fe), "}", ["g", "s"]), s = t.content.match(n);
  if (s?.length) {
    const r = s[0].split(",").length;
    r > ju && St.push({ filePath: e, message: `props found <bg_err>(${r})</bg_err>` });
  }
}, Wu = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ot = [], Iu = (t, e) => {
  if (!t)
    return;
  const n = N('v-for="(', W.times.any(), B(Z).grouped(), W.times.any(), ",", W.times.any(), B(Z).grouped(), W.times.any(), ")", B(W), "in", B(W), B(Z).grouped(), [T]), s = N(':key="', W.times.any(), B(Z).grouped(), W.times.any(), '"', [T]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((u) => {
    const [i, f, h, d] = u;
    o.forEach((E) => {
      const C = E[1];
      if (C === h) {
        const F = j(t.content.trim(), C);
        Ot.push({
          filePath: e,
          message: `line #${F} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, Mu = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], ku = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[0], o = s[1], u = j(t.content.trim(), r);
    Rt.push({
      filePath: e,
      message: `line #${u} zero length comparison found <bg_warn>(${o})</bg_warn>`
    });
  }
}, Pu = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
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
], Nt = [], Hu = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      zu.includes(o) && Nt.push({ filePath: e, message: `<bg_warn>(${o})</bg_warn>` });
    }
  });
}, Vu = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, We = [], Gu = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(P("$parent").or("getCurrentInstance"), [T]), o = t.content.match(n), u = t.content.match(s);
  if (u) {
    const f = u[1].split(".")[0];
    if ((o ? o[1] : "").includes(f)) {
      const d = j(t.content.trim(), f);
      We.push({
        filePath: e,
        message: `line #${d} <bg_warn>(${f})</bg_warn>`
      });
    }
  }
  const i = t.content.match(r);
  if (i) {
    const f = j(t.content.trim(), i[0]);
    We.push({
      filePath: e,
      message: `line #${f} <bg_warn>(${i[0]})</bg_warn>`
    });
  }
}, Uu = () => {
  const t = [];
  return We.length > 0 && We.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], qu = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || Lt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Zu = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], Ku = (t, e) => {
  if (!t)
    return;
  const n = N("defineProps([", [T, J]);
  t.content.match(n)?.length && jt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, Yu = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], Ju = (t) => {
  if (t.includes("pages"))
    return;
  const e = H.basename(t);
  if (e === "App.vue")
    return;
  const n = N(ps.uppercase);
  e.slice(1).match(n)?.length || Tt.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, Qu = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], Xu = (t, e) => {
  if (!t)
    return;
  const n = N("<", B(z(">")), " v-for", B(z(">")), ">", [
    T,
    J
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || Wt.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, ei = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], ti = (t, e) => {
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
    It.push({ filePath: e, message: `line #${i} <bg_err>v-if used with v-for</bg_err>` });
  }
}, ni = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], kn = [
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
      const h = Array.from(i.matchAll(r), (E) => E[1]).filter((E) => kn.includes(E));
      let d = -1;
      for (const E of h) {
        const C = kn.indexOf(E);
        if (C !== -1 && C < d) {
          Mt.push({
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
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], oi = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), o = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: o }
  ].filter((f) => f.index !== -1);
  u.every((f, h) => h === 0 ? !0 : u[h - 1].index < f.index) || kt.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, ui = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], ii = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = H.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && Pt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, ai = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], ci = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = j(t.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    zt.push({ filePath: e, message: `line #${o} <bg_warn>(${u})</bg_warn>` });
  });
}, li = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], Pn = [], Di = ["v-slot", "v-bind", "v-on"], fi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Di.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = j(t.source, s);
      Ht.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), Pn.some((o) => o.filePath === e) || Pn.push({ filePath: e });
    }
  });
}, hi = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], pi = 3, di = (t) => {
  const e = N(
    B(z("/")).grouped(),
    P(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = N(
      Ce("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [T]
    ), o = s.match(r);
    (!o || o.length < pi) && Vt.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
  }
}, gi = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], mi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((i) => i.trim() !== "").length > 1 && o.split(`
`).length === 1 && Gt.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, bi = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], Fi = /^[a-z]+([A-Z][a-z]*)*$/, Ci = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !Fi.test(o)).length && Ut.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
}, Ei = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], xi = (t, e) => {
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
      const f = j(t.source, u);
      qt.push({ filePath: e, message: `line #${f} <bg_warn>${i}</bg_warn>` });
    }
  });
}, wi = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], _i = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    B(ps.uppercase, Z),
    Q(gs, ds),
    Q(B(z(">"))),
    "></",
    B(Z),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const u = j(t.source, o), i = o.split(`
`).at(-1)?.trim() || "";
    Zt.push({ filePath: e, message: `line #${u} <bg_warn>${i}</bg_warn>` });
  });
}, yi = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Es = [], Re = [], Ai = 5, vi = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > Ai) {
      const o = r.split(`
`)[0], u = j(t.content, o);
      Es.push({ filePath: e, message: `line #${u} <bg_warn>computed</bg_warn>` }), Re.push({ filePath: e }), Re.some((i) => i.filePath === e) || Re.push({ filePath: e });
    }
  });
}, $i = () => {
  const t = [];
  return Re.length > 0 && Es.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], Bi = 40, Si = (t, e) => {
  if (!t)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > Bi) {
      const o = j(t.content, r), u = r.split(`
`).at(0)?.trim() || "";
      Kt.push({
        filePath: e,
        message: `line #${o} <bg_warn>${u}</bg_warn>`
      });
    }
  });
}, Oi = () => {
  const t = [];
  return Kt.length > 0 && Kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ri = (t, e, n) => {
  const s = t.scriptSetup || t.script, r = e.endsWith(".vue"), o = {
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
    apiWithoutMethod: () => Rn() && Wo(t, e),
    bigVif: () => Mo(t.template, e),
    bigVShow: () => Po(t.template, e),
    complicatedConditions: () => Ho(t, e),
    cyclomaticComplexity: () => qo(s, e),
    computedSideEffects: () => Go(s, e),
    deepIndentation: () => Yo(s, e),
    elseCondition: () => Qo(s, e),
    functionSize: () => uu(s, e),
    htmlImageElements: () => Rn() && au(t.template, e),
    htmlLink: () => r && lu(t.template, e),
    ifWithoutCurlyBraces: () => fu(s, e),
    magicNumbers: () => pu(s, e),
    nestedTernary: () => gu(s, e),
    noPropDestructure: () => Cu(s, e),
    noVarDeclaration: () => xu(s, e),
    parameterCount: () => _u(s, e),
    plainScript: () => r && Au(t.script, e),
    propsDrilling: () => $u(s, e),
    scriptLength: () => Su(s, e),
    shortVariableName: () => Nu(s, e),
    tooManyProps: () => Tu(s, e),
    vForWithIndexKey: () => r && Iu(t.template, e),
    zeroLengthComparison: () => ku(s, e),
    noInlineStyles: () => bu(t.template, e)
  };
  n.forEach((u) => {
    u in ie ? ie[u].forEach((i) => {
      i in o && o[i]();
    }) : u in o && o[u]();
  });
}, Ni = (t, e, n) => {
  const s = {}, r = {}, o = [], u = ({ file: h, rule: d, title: E, description: C, message: F }) => {
    const b = t === "rule" ? d : h;
    s[b] || (s[b] = []), s[b].push({ file: h, rule: d, title: E, description: C, message: F });
  }, i = (h) => {
    h().forEach((E) => {
      u(E);
    });
  };
  return i(Qu), i(Yu), i(ei), i(ni), i(Zu), i(ai), i(li), i(hi), i(gi), i(bi), i(Ei), i(wi), i(yi), i($i), i(Oi), i(ui), i(ri), i(Uu), i(Vu), i(Io), i(ko), i(zo), i(Vo), i(Zo), i(Uo), i(Jo), i(Xo), i(iu), i(cu), i(Du), i(hu), i(du), i(mu), i(Eu), i(wu), i(yu), i(vu), i(Bu), i(Ou), i(Lu), i(Wu), i(Mu), i(Pu), i(Fu), Object.keys(s).sort((h, d) => {
    const E = s[h].length, C = s[d].length;
    return e === "desc" ? C - E : E - C;
  }).forEach((h) => {
    r[h] = [], s[h].forEach((d, E) => {
      const C = d.message.includes("<bg_err>");
      if (o.some((F) => F.file === d.file)) {
        const F = o.find((b) => b.file === d.file);
        F && (C ? F.errors++ : F.warnings++);
      } else
        o.push({ file: d.file, errors: C ? 1 : 0, warnings: C ? 0 : 1, output: [] });
      n === "error" && !C || (r[h][E] = { id: "", description: "", message: "" }, t === "file" && (r[h][E].id = d.rule), t !== "file" && (r[h][E].id = d.file), r[h][E].description = d.description, r[h][E].message = d.message || "🚨");
    });
  }), { output: r, health: o };
};
let Yt = 0, xs = 0, ws = [];
const Li = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], un = [], zn = async (t, e) => {
  if (!un.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    Yt++;
    const n = await ue.readFile(e, "utf-8");
    xs += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = nr(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), Ri(s, e, ws), `Analyzing ${e}...`;
  }
}, _s = async (t) => {
  const e = [];
  if (!(await ue.stat(t)).isDirectory()) {
    const r = await zn(t, t);
    return r && e.push(r), e;
  }
  const s = await ue.readdir(t);
  for (const r of s) {
    const o = H.join(t, r);
    if ((await ue.stat(o)).isDirectory() && !Li.some((f) => o.includes(f)) && !un.some((f) => o.endsWith(f))) {
      const f = await _s(o);
      f && e.push(...f);
    }
    const i = await zn(o, o);
    i && e.push(i);
  }
  return e;
}, ji = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s, groupBy: r, level: o, sortBy: u }) => {
  const i = e.filter((q) => !n.includes(q)), { rulesets: f, individualRules: h } = Bo(i), d = f.length ? `<bg_info>${f.join(", ")}</bg_info>` : "N/A", E = h.length ? `<bg_info>${h.join(", ")}</bg_info>` : "N/A";
  let C = `      Applying ${f.length} rulesets: ${d}`;
  h.length > 0 && (C += `
      Applying ${h.length} individual rules: ${E}`);
  const F = n.filter((q) => !f.includes(q)), b = F.length ? `<bg_info>${F.join(", ")}</bg_info>` : "N/A", m = await rn(t), c = await So(m), w = await hs(m);
  Ao(w);
  const y = [];
  y.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` }), y.push({ info: `      Project type: <bg_info>${w ? "Nuxt" : ""}${c ? "Vue" : ""}${!w && !c ? "?" : ""}</bg_info>` }), y.push({
    info: `${C}
      Ignoring ${F.length} rules: ${b}
      Excluding ${s || "-"}
      Output level <bg_info>${o}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${u}</bg_info>`
  }), ws = e.filter((q) => !n.includes(q)), s && un.push(...s.split(","));
  const S = await _s(t);
  y.push(...S.map((q) => ({ info: q }))), y.push({ info: `Found <bg_info>${Yt}</bg_info> files` });
  const { health: R, output: O } = Ni(r, u, o), { errors: ce, warnings: ae, output: re } = $o(R, xs, Yt);
  return !ce && !ae && y.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: y, codeHealthOutput: re, reportOutput: O };
}, ys = "\x1B[44m", Ti = "\x1B[43m", Ee = "\x1B[41m", Wi = "\x1B[42m", se = "\x1B[0m", As = "\x1B[33m", vs = "\x1B[36m", Ie = "\x1B[0m", Hn = (t) => t.replace(/<bg_err>/g, Ee).replace(/<bg_warn>/g, Ti).replace(/<bg_info>/g, ys).replace(/<bg_ok>/g, Wi).replace(/<\/bg_err>/g, se).replace(/<\/bg_warn>/g, se).replace(/<\/bg_info>/g, se).replace(/<\/bg_ok>/g, se).replace(/<text_warn>/g, As).replace(/<text_info>/g, vs).replace(/<\/text_warn>/g, Ie).replace(/<\/text_info>/g, Ie), Vn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(ie) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    sn.includes(o) ? s.push(...ie[o]) : Object.values(ie).some((u) => u.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${Ee}Invalid ${t} values: ${r.join(", ")}${se}. 
${As}Allowed values are: ${ls.join(", ")}${Ie}

`
  ), process.exit(1)), s;
}, $s = ["rule", "file"], Bs = ["asc", "desc"], Ss = ["text", "json", "table"], Os = ["all", "error"], Ii = {
  groupBy: $s,
  sortBy: Bs,
  outputLevel: Os,
  outputFormat: Ss
}, Ae = (t, e) => {
  const n = Ii[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${Ee}${t}${se} provided for flag ${vs}${e}${Ie}. Valid options are: ${ys}${n.join(", ")}${se}.
`
  ), process.exit(1)), t;
};
function Gn(t) {
  const e = new RegExp(`--${t}(?:=[^\\s]*)?$`);
  return process.argv.some((n) => e.test(n));
}
const Mi = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4];
rn(Mi || "./src").then((t) => {
  Ds().then((e) => {
    const n = [];
    let s = {
      path: "./src",
      apply: Object.values(sn).join(","),
      ignore: void 0,
      exclude: void 0,
      group: "rule",
      level: "all",
      sort: "desc",
      output: "text"
    };
    const r = {
      applyFromCLI: Gn("apply"),
      ignoreFromCLI: Gn("ignore"),
      applyFromFile: !1,
      ignoreFromFile: !1
    };
    let o = "";
    const u = H.join(t, "vue-mess-detector.json");
    ue.readFile(u, "utf-8").then((i) => {
      const f = JSON.parse(i);
      s = { ...s, ...f }, r.applyFromFile = !!f.apply, r.ignoreFromFile = !!f.ignore, n.push({ info: `👉 Using configuration from ${u}` });
    }).catch(() => {
      n.push({ info: "👉 Using default configuration" });
    }).finally(
      () => Us(eo(process.argv)).command(
        "analyze [path]",
        "Analyze Vue files for code smells and best practices",
        (i) => i.config(s).positional("path", {
          describe: "path to the Vue files",
          default: s.path
        }).option("apply", {
          alias: "a",
          describe: "Comma-separated list of rulesets/rules to apply.",
          choices: ls,
          coerce: Vn("apply"),
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
          choices: $s,
          coerce: (f) => Ae(f, "groupBy"),
          default: s.group,
          group: "Group Results:"
        }).option("level", {
          alias: "l",
          describe: "Output level",
          choices: Os,
          coerce: (f) => Ae(f, "outputLevel"),
          default: s.level,
          group: "Output:"
        }).option("ignore", {
          alias: "i",
          describe: "Comma-separated list of rulesets to ignore.",
          coerce: Vn("ignore"),
          default: s.ignore,
          group: "Filter Rulesets:"
        }).option("sort", {
          alias: "s",
          describe: "Sort results at the output",
          choices: Bs,
          coerce: (f) => Ae(f, "sortBy"),
          default: s.sort,
          group: "Sort Results:"
        }).option("output", {
          describe: "Output format",
          choices: Ss,
          coerce: (f) => Ae(f, "outputFormat"),
          default: s.output,
          group: "Output Format:"
        }).option("fileOutput", {
          alias: "f",
          describe: "Output file",
          default: "",
          group: "Output:"
        }).check(() => {
          const f = r.applyFromCLI || r.applyFromFile, h = r.ignoreFromCLI || r.ignoreFromFile;
          return f && h && (console.error(`
<bg_err>Cannot use both --ignore and --apply options together.</bg_err>
`), process.exit(1)), !0;
        }),
        (i) => {
          o = i.fileOutput;
          const f = (h) => o ? (ue.appendFile(o, `${h}
`), h) : (console.log(Hn(h)), Hn(h));
          ji({
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
                f(d.info);
              });
              for (const d in h.reportOutput)
                f(`
- <text_info> ${d}</text_info>`), h.reportOutput[d].forEach((E) => {
                  f(`   ${E.id}`), f(`   ${E.description}`), f(`   ${E.message}
`);
                });
              h.codeHealthOutput?.forEach((d) => {
                f(d.info);
              });
            }
            if (i.output == "table") {
              o && (console.log(`We can not output ${Ee}to a file in table mode${se}`), process.exit(1)), [...n, ...h.output].forEach((d) => {
                f(d.info);
              });
              for (const d in h.reportOutput) {
                const E = new Jr({
                  head: ["id", "message"],
                  colWidths: [60, 60],
                  wordWrap: !0,
                  wrapOnWordBoundary: !1
                });
                f("-".repeat(120)), i.group == "rule" && (f(`<text_info>Rule: ${d}</text_info>`), f(`Description: ${h.reportOutput[d][0].description}`), h.reportOutput[d].forEach((C) => {
                  E.push([f(C.id), f(C.message)]);
                })), i.group == "file" && (f(`<text_info>File: ${d}</text_info>`), h.reportOutput[d].forEach((C) => {
                  E.push([`${C.id}
${C.description.replace("See: ", `See:
`)}`, C.message]);
                })), f(E.toString());
              }
              h.codeHealthOutput?.forEach((d) => {
                f(d.info);
              });
            }
            i.output == "json" && f(JSON.stringify(h, null, 2));
          }).catch((h) => {
            console.error(`${Ee}${h}${se}`);
          });
        }
      ).version("version", "Show version number", e.version).alias("version", "v").help().argv
    );
  });
});
export {
  ls as FLAT_RULESETS_RULES,
  ji as analyze
};
