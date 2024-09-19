import ie from "node:fs/promises";
import Vs, { format as Hn, inspect as Hs } from "util";
import Us from "os";
import qs from "yargs";
import { normalize as Gs, resolve as de, dirname as it, basename as Zs, extname as Ks, relative as Ys } from "path";
import { readFileSync as Jt, statSync as Un, readdirSync as Js, writeFile as Qs } from "fs";
import { notStrictEqual as Xs, strictEqual as er } from "assert";
import { fileURLToPath as tr } from "url";
import H from "node:path";
import { parse as nr } from "@vue/compiler-sfc";
import Qt from "node:fs";
import { fileURLToPath as sr } from "node:url";
function rr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let Xt = [], qn = 0;
const P = (t, e) => {
  qn >= e && Xt.push(t);
};
P.WARN = 1;
P.INFO = 2;
P.DEBUG = 3;
P.reset = () => {
  Xt = [];
};
P.setDebugLevel = (t) => {
  qn = t;
};
P.warn = (t) => P(t, P.WARN);
P.info = (t) => P(t, P.INFO);
P.debug = (t) => P(t, P.DEBUG);
P.debugMessages = () => Xt;
var en = P, tn = { exports: {} }, or = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const ur = or;
var ir = (t) => typeof t == "string" ? t.replace(ur(), "") : t, nn = { exports: {} };
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
nn.exports = Gn;
nn.exports.default = Gn;
var ar = nn.exports, cr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const lr = ir, Dr = ar, fr = cr, Zn = (t) => {
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
tn.exports = Zn;
tn.exports.default = Zn;
var hr = tn.exports;
const Dn = hr;
function Le(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ee(t) {
  let e = Le();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return Dn(o) > r ? Dn(o) : r;
  }, 0);
}
function be(t, e) {
  return Array(e + 1).join(t);
}
function pr(t, e, n, s) {
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
let pe = {};
function ye(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", pe[e] = { set: t, to: !0 }, pe[n] = { set: t, to: !1 }, pe[t] = { on: e, off: n };
}
ye("bold", 1, 22);
ye("italics", 3, 23);
ye("underline", 4, 24);
ye("inverse", 7, 27);
ye("strikethrough", 9, 29);
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
  let s = pe[e[0]];
  s && (t[s.set] = s.to);
}
function dr(t) {
  let e = Le(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Kn(s, n), n = e.exec(t);
  return s;
}
function Yn(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += pe[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function gr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = pe[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function mr(t, e) {
  if (t.length === ee(t))
    return t.substr(0, e);
  for (; ee(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function br(t, e) {
  let n = Le(!0), s = t.split(Le()), r = 0, o = 0, u = "", i, l = {};
  for (; o < e; ) {
    i = n.exec(t);
    let p = s[r];
    if (r++, o + ee(p) > e && (p = mr(p, e - o)), u += p, o += ee(p), o < e) {
      if (!i)
        break;
      u += i[0], Kn(l, i);
    }
  }
  return Yn(l, u);
}
function Cr(t, e, n) {
  if (n = n || "…", ee(t) <= e)
    return t;
  e -= ee(n);
  let r = br(t, e);
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
function Er(t, e) {
  t = t || {}, e = e || Fr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function xr(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, u;
  for (let i = 0; i < s.length; i += 2) {
    let l = s[i], p = o + ee(l);
    o > 0 && u && (p += u.length), p > t ? (o !== 0 && n.push(r.join("")), r = [l], o = ee(l)) : (r.push(u || "", l), o = p), u = s[i + 1];
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
    n.push(Yn(o, r));
  }
  return n;
}
function Ar(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var Jn = {
  strlen: ee,
  repeat: be,
  pad: pr,
  truncate: Cr,
  mergeOptions: Er,
  wordWrap: _r,
  colorizeLines: yr,
  hyperlink: Ar
}, Qn = { exports: {} }, ke = { exports: {} }, Ve = { exports: {} }, He = { exports: {} }, Ue = { exports: {} }, fn;
function vr() {
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
  }(Ue)), Ue.exports;
}
var qe, hn;
function $r() {
  return hn || (hn = 1, qe = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), qe;
}
var Ge, pn;
function Br() {
  if (pn) return Ge;
  pn = 1;
  var t = Us, e = $r(), n = process.env, s = void 0;
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
    var l = s ? 1 : 0;
    if (process.platform === "win32") {
      var p = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(E) {
        return E in n;
      }) || n.CI_NAME === "codeship" ? 1 : l;
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
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", l);
  }
  function u(i) {
    var l = o(i);
    return r(l);
  }
  return Ge = {
    supportsColor: u,
    stdout: u(process.stdout),
    stderr: u(process.stderr)
  }, Ge;
}
var Ze = { exports: {} }, dn;
function Sr() {
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
        var i = o[u] || [" "], l = Math.floor(Math.random() * i.length);
        typeof o[u] < "u" ? r += o[u][l] : r += u;
      }), r;
    };
  }(Ze)), Ze.exports;
}
var Ke = { exports: {} }, gn;
function Or() {
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
      function u(p) {
        var d = Math.floor(Math.random() * p);
        return d;
      }
      function i(p) {
        var d = !1;
        return o.filter(function(E) {
          d = E === p;
        }), d;
      }
      function l(p, d) {
        var E = "", x, b;
        d = d || {}, d.up = typeof d.up < "u" ? d.up : !0, d.mid = typeof d.mid < "u" ? d.mid : !0, d.down = typeof d.down < "u" ? d.down : !0, d.size = typeof d.size < "u" ? d.size : "maxi", p = p.split("");
        for (b in p)
          if (!i(b)) {
            switch (E = E + p[b], x = { up: 0, down: 0, mid: 0 }, d.size) {
              case "mini":
                x.up = u(8), x.mid = u(2), x.down = u(8);
                break;
              case "maxi":
                x.up = u(16) + 3, x.mid = u(4) + 1, x.down = u(64) + 3;
                break;
              default:
                x.up = u(8) + 1, x.mid = u(6) / 2, x.down = u(8) + 1;
                break;
            }
            var m = ["up", "mid", "down"];
            for (var g in m)
              for (var c = m[g], w = 0; w <= x[c]; w++)
                d[c] && (E = E + r[c][u(r[c].length)]);
          }
        return E;
      }
      return l(n, s);
    };
  }(Ke)), Ke.exports;
}
var Ye = { exports: {} }, mn;
function Rr() {
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
  }(Ye)), Ye.exports;
}
var Je = { exports: {} }, bn;
function Nr() {
  return bn || (bn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(Je)), Je.exports;
}
var Qe = { exports: {} }, Cn;
function Lr() {
  return Cn || (Cn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(Qe)), Qe.exports;
}
var Xe = { exports: {} }, Fn;
function jr() {
  return Fn || (Fn = 1, function(t) {
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
  }(Xe)), Xe.exports;
}
var En;
function Tr() {
  return En || (En = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = Vs, s = e.styles = vr(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = Br().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
      e.enabled = !0;
    }, e.disable = function() {
      e.enabled = !1;
    }, e.stripColors = e.strip = function(g) {
      return ("" + g).replace(/\x1B\[\d+m/g, "");
    }, e.stylize = function(c, w) {
      if (!e.enabled)
        return c + "";
      var y = s[w];
      return !y && w in e ? e[w](c) : y.open + c + y.close;
    };
    var u = /[|\\{}()[\]^$+*?.]/g, i = function(g) {
      if (typeof g != "string")
        throw new TypeError("Expected a string");
      return g.replace(u, "\\$&");
    };
    function l(g) {
      var c = function w() {
        return E.apply(w, arguments);
      };
      return c._styles = g, c.__proto__ = d, c;
    }
    var p = function() {
      var g = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(c) {
        s[c].closeRe = new RegExp(i(s[c].close), "g"), g[c] = {
          get: function() {
            return l(this._styles.concat(c));
          }
        };
      }), g;
    }(), d = r(function() {
    }, p);
    function E() {
      var g = Array.prototype.slice.call(arguments), c = g.map(function(O) {
        return O != null && O.constructor === String ? O : n.inspect(O);
      }).join(" ");
      if (!e.enabled || !c)
        return c;
      for (var w = c.indexOf(`
`) != -1, y = this._styles, B = y.length; B--; ) {
        var N = s[y[B]];
        c = N.open + c.replace(N.closeRe, N.open) + N.close, w && (c = c.replace(o, function(O) {
          return N.close + O + N.open;
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
        })(c);
    };
    function x() {
      var g = {};
      return Object.keys(p).forEach(function(c) {
        g[c] = {
          get: function() {
            return l([c]);
          }
        };
      }), g;
    }
    var b = function(c, w) {
      var y = w.split("");
      return y = y.map(c), y.join("");
    };
    e.trap = Sr(), e.zalgo = Or(), e.maps = {}, e.maps.america = Rr()(e), e.maps.zebra = Nr()(e), e.maps.rainbow = Lr()(e), e.maps.random = jr()(e);
    for (var m in e.maps)
      (function(g) {
        e[g] = function(c) {
          return b(e.maps[g], c);
        };
      })(m);
    r(e, x());
  }(He)), He.exports;
}
var xn;
function Wr() {
  return xn || (xn = 1, function(t) {
    var e = Tr();
    t.exports = e;
  }(Ve)), Ve.exports;
}
const { info: Mr, debug: Xn } = en, U = Jn;
let Ir = class Se {
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
    Pr.forEach(function(l) {
      et(s, r, l, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let u = this.options.style = this.options.style || {}, i = e.style;
    et(u, i, "padding-left", this), et(u, i, "padding-right", this), this.head = u.head || i.head, this.border = u.border || i.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = U.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
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
    let s = U.truncate(this.content, 10, this.truncate);
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
      n.push(this._topLeftChar(r)), n.push(U.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(U.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof Se.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof Se.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof Se.RowSpanCell && (s = "leftMid");
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
      let x = this.cells[this.y + r][this.x - 1];
      for (; x instanceof at; )
        x = this.cells[x.y][x.x - 1];
      x instanceof ct || (o = this.chars.rightMid);
    }
    let u = U.repeat(" ", this.paddingLeft), i = n ? this.chars.right : "", l = U.repeat(" ", this.paddingRight), p = this.lines[e], d = this.width - (this.paddingLeft + this.paddingRight);
    s && (p += this.truncate || "…");
    let E = U.truncate(p, d, this.truncate);
    return E = U.pad(E, d, " ", this.hAlign), E = u + E + l, this.stylizeLine(o, E, i);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = U.repeat(this.chars.bottom, this.width), r = e ? this.chars.bottomRight : "";
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
      for (; u instanceof at; )
        u = this.cells[u.y][u.x - 1];
      u instanceof ct || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = U.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, at = class {
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
}, ct = class {
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
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (Xn(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function wn(...t) {
  return t.filter((e) => e != null).shift();
}
function et(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = wn(t[r], t[n], e[r], e[n])) : s[n] = wn(t[n], e[n]);
}
function kr(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function _n(t, e) {
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
ke.exports = Ir;
ke.exports.ColSpanCell = at;
ke.exports.RowSpanCell = ct;
var zr = ke.exports;
const { warn: Vr, debug: Hr } = en, lt = zr, { ColSpanCell: Ur, RowSpanCell: qr } = lt;
(function() {
  function t(b, m) {
    return b[m] > 0 ? t(b, m + 1) : m;
  }
  function e(b) {
    let m = {};
    b.forEach(function(g, c) {
      let w = 0;
      g.forEach(function(y) {
        y.y = c, y.x = c ? t(m, w) : w;
        const B = y.rowSpan || 1, N = y.colSpan || 1;
        if (B > 1)
          for (let O = 0; O < N; O++)
            m[y.x + O] = B;
        w = y.x + N;
      }), Object.keys(m).forEach((y) => {
        m[y]--, m[y] < 1 && delete m[y];
      });
    });
  }
  function n(b) {
    let m = 0;
    return b.forEach(function(g) {
      g.forEach(function(c) {
        m = Math.max(m, c.x + (c.colSpan || 1));
      });
    }), m;
  }
  function s(b) {
    return b.length;
  }
  function r(b, m) {
    let g = b.y, c = b.y - 1 + (b.rowSpan || 1), w = m.y, y = m.y - 1 + (m.rowSpan || 1), B = !(g > y || w > c), N = b.x, O = b.x - 1 + (b.colSpan || 1), De = m.x, ce = m.x - 1 + (m.colSpan || 1), oe = !(N > ce || De > O);
    return B && oe;
  }
  function o(b, m, g) {
    let c = Math.min(b.length - 1, g), w = { x: m, y: g };
    for (let y = 0; y <= c; y++) {
      let B = b[y];
      for (let N = 0; N < B.length; N++)
        if (r(w, B[N]))
          return !0;
    }
    return !1;
  }
  function u(b, m, g, c) {
    for (let w = g; w < c; w++)
      if (o(b, w, m))
        return !1;
    return !0;
  }
  function i(b) {
    b.forEach(function(m, g) {
      m.forEach(function(c) {
        for (let w = 1; w < c.rowSpan; w++) {
          let y = new qr(c);
          y.x = c.x, y.y = c.y + w, y.colSpan = c.colSpan, p(y, b[g + w]);
        }
      });
    });
  }
  function l(b) {
    for (let m = b.length - 1; m >= 0; m--) {
      let g = b[m];
      for (let c = 0; c < g.length; c++) {
        let w = g[c];
        for (let y = 1; y < w.colSpan; y++) {
          let B = new Ur();
          B.x = w.x + y, B.y = w.y, g.splice(c + 1, 0, B);
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
    Hr(`Max rows: ${m}; Max cols: ${g}`);
    for (let c = 0; c < m; c++)
      for (let w = 0; w < g; w++)
        if (!o(b, w, c)) {
          let y = { x: w, y: c, colSpan: 1, rowSpan: 1 };
          for (w++; w < g && !o(b, w, c); )
            y.colSpan++, w++;
          let B = c + 1;
          for (; B < m && u(b, B, y.x, y.x + y.colSpan); )
            y.rowSpan++, B++;
          let N = new lt(y);
          N.x = y.x, N.y = y.y, Vr(`Missing cell at ${N.y}-${N.x}.`), p(N, b[c]);
        }
  }
  function E(b) {
    return b.map(function(m) {
      if (!Array.isArray(m)) {
        let g = Object.keys(m)[0];
        m = m[g], Array.isArray(m) ? (m = m.slice(), m.unshift(g)) : m = [g, m];
      }
      return m.map(function(g) {
        return new lt(g);
      });
    });
  }
  function x(b) {
    let m = E(b);
    return e(m), d(m), i(m), l(m), m;
  }
  Qn.exports = {
    makeTableLayout: x,
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
    let u = [], i = [], l = {};
    o.forEach(function(p) {
      p.forEach(function(d) {
        (d[t] || 1) > 1 ? i.push(d) : u[d[n]] = Math.max(u[d[n]] || 0, d[e] || 0, s);
      });
    }), r.forEach(function(p, d) {
      typeof p == "number" && (u[d] = p);
    });
    for (let p = i.length - 1; p >= 0; p--) {
      let d = i[p], E = d[t], x = d[n], b = u[x], m = typeof r[x] == "number" ? 0 : 1;
      if (typeof b == "number")
        for (let g = 1; g < E; g++)
          b += 1 + u[x + g], typeof r[x + g] != "number" && m++;
      else
        b = e === "desiredWidth" ? d.desiredWidth - 1 : 1, (!l[x] || l[x] < b) && (l[x] = b);
      if (d[e] > b) {
        let g = 0;
        for (; m > 0 && d[e] > b; ) {
          if (typeof r[x + g] != "number") {
            let c = Math.round((d[e] - b) / m);
            b += c, u[x + g] += c, m--;
          }
          g++;
        }
      }
    }
    Object.assign(r, u, l);
    for (let p = 0; p < r.length; p++)
      r[p] = Math.max(s, r[p] || 0);
  };
}
var Gr = Qn.exports;
const se = en, Zr = Jn, tt = Gr;
let es = class extends Array {
  constructor(e) {
    super();
    const n = Zr.mergeOptions(e);
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
    let s = tt.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(u) {
        u.mergeTableOptions(this.options, s);
      }, this);
    }, this), tt.computeWidths(this.options.colWidths, s), tt.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(u) {
        u.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let u = s[o], i = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && nt(u, "top", r);
      for (let l = 0; l < i; l++)
        nt(u, l, r);
      o + 1 == s.length && nt(u, "bottom", r);
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
function nt(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var Kr = es, Yr = Kr;
const Jr = /* @__PURE__ */ rr(Yr);
class Fe extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Fe);
  }
}
function ts() {
  return Qr() ? 0 : 1;
}
function Qr() {
  return Xr() && !process.defaultApp;
}
function Xr() {
  return !!process.versions.electron;
}
function eo(t) {
  return t.slice(ts() + 1);
}
function to() {
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
class so {
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
    }, s.configuration), l = Object.assign(/* @__PURE__ */ Object.create(null), s.default), p = s.configObjects || [], d = s.envPrefix, E = i["populate--"], x = E ? "--" : "_", b = /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ Object.create(null), g = s.__ || ne.format, c = {
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
      C && (c[C][f] = !0), c.arrays[f] = !0, c.keys.push(f);
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
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([a, f]) => {
      typeof f == "number" && (c.nargs[a] = f, c.keys.push(a));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([a, f]) => {
      typeof f == "function" && (c.coercions[a] = f, c.keys.push(a));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(a) {
      c.configs[a] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([a, f]) => {
      (typeof f == "boolean" || typeof f == "function") && (c.configs[a] = f);
    })), Ts(s.key, u, s.default, c.arrays), Object.keys(l).forEach(function(a) {
      (c.aliases[a] || []).forEach(function(f) {
        l[f] = l[a];
      });
    });
    let B = null;
    zs();
    let N = [];
    const O = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), De = {};
    for (let a = 0; a < r.length; a++) {
      const f = r[a], C = f.replace(/^-{3,}/, "---");
      let h, D, _, F, A, M;
      if (f !== "--" && /^-/.test(f) && $e(f))
        ce(f);
      else if (C.match(/^---+(=|$)/)) {
        ce(f);
        continue;
      } else if (f.match(/^--.+=/) || !i["short-option-groups"] && f.match(/^-.+=/))
        F = f.match(/^--?([^=]+)=([\s\S]*)$/), F !== null && Array.isArray(F) && F.length >= 3 && ($(F[1], c.arrays) ? a = fe(a, F[1], r, F[2]) : $(F[1], c.nargs) !== !1 ? a = oe(a, F[1], r, F[2]) : L(F[1], F[2], !0));
      else if (f.match(y) && i["boolean-negation"])
        F = f.match(y), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], L(D, $(D, c.arrays) ? [!1] : !1));
      else if (f.match(/^--.+/) || !i["short-option-groups"] && f.match(/^-[^-]+/))
        F = f.match(/^--?(.+)/), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], $(D, c.arrays) ? a = fe(a, D, r) : $(D, c.nargs) !== !1 ? a = oe(a, D, r) : (A = r[a + 1], A !== void 0 && (!A.match(/^-/) || A.match(w)) && !$(D, c.bools) && !$(D, c.counts) || /^(true|false)$/.test(A) ? (L(D, A), a++) : L(D, he(D))));
      else if (f.match(/^-.\..+=/))
        F = f.match(/^-([^=]+)=([\s\S]*)$/), F !== null && Array.isArray(F) && F.length >= 3 && L(F[1], F[2]);
      else if (f.match(/^-.\..+/) && !f.match(w))
        A = r[a + 1], F = f.match(/^-(.\..+)/), F !== null && Array.isArray(F) && F.length >= 2 && (D = F[1], A !== void 0 && !A.match(/^-/) && !$(D, c.bools) && !$(D, c.counts) ? (L(D, A), a++) : L(D, he(D)));
      else if (f.match(/^-[^-]+/) && !f.match(w)) {
        _ = f.slice(1, -1).split(""), h = !1;
        for (let z = 0; z < _.length; z++) {
          if (A = f.slice(z + 2), _[z + 1] && _[z + 1] === "=") {
            M = f.slice(z + 3), D = _[z], $(D, c.arrays) ? a = fe(a, D, r, M) : $(D, c.nargs) !== !1 ? a = oe(a, D, r, M) : L(D, M), h = !0;
            break;
          }
          if (A === "-") {
            L(_[z], A);
            continue;
          }
          if (/[A-Za-z]/.test(_[z]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(A) && $(A, c.bools) === !1) {
            L(_[z], A), h = !0;
            break;
          }
          if (_[z + 1] && _[z + 1].match(/\W/)) {
            L(_[z], A), h = !0;
            break;
          } else
            L(_[z], he(_[z]));
        }
        D = f.slice(-1)[0], !h && D !== "-" && ($(D, c.arrays) ? a = fe(a, D, r) : $(D, c.nargs) !== !1 ? a = oe(a, D, r) : (A = r[a + 1], A !== void 0 && (!/^(-|--)[^-]/.test(A) || A.match(w)) && !$(D, c.bools) && !$(D, c.counts) || /^(true|false)$/.test(A) ? (L(D, A), a++) : L(D, he(D))));
      } else if (f.match(/^-[0-9]$/) && f.match(w) && $(f.slice(1), c.bools))
        D = f.slice(1), L(D, he(D));
      else if (f === "--") {
        N = r.slice(a + 1);
        break;
      } else if (i["halt-at-non-option"]) {
        N = r.slice(a);
        break;
      } else
        ce(f);
    }
    an(O, !0), an(O, !1), Rs(O), Ns(), cn(O, c.aliases, l, !0), Ls(O), i["set-placeholder-key"] && js(O), Object.keys(c.counts).forEach(function(a) {
      ge(O, a.split(".")) || L(a, 0);
    }), E && N.length && (O[x] = []), N.forEach(function(a) {
      O[x].push(a);
    }), i["camel-case-expansion"] && i["strip-dashed"] && Object.keys(O).filter((a) => a !== "--" && a.includes("-")).forEach((a) => {
      delete O[a];
    }), i["strip-aliased"] && [].concat(...Object.keys(u).map((a) => u[a])).forEach((a) => {
      i["camel-case-expansion"] && a.includes("-") && delete O[a.split(".").map((f) => Ce(f)).join(".")], delete O[a];
    });
    function ce(a) {
      const f = ve("_", a);
      (typeof f == "string" || typeof f == "number") && O._.push(f);
    }
    function oe(a, f, C, h) {
      let D, _ = $(f, c.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return te(h) || (B = Error(g("Argument unexpected for: %s", f))), L(f, he(f)), a;
      let F = te(h) ? 0 : 1;
      if (i["nargs-eats-options"])
        C.length - (a + 1) + F < _ && (B = Error(g("Not enough arguments following: %s", f))), F = _;
      else {
        for (D = a + 1; D < C.length && (!C[D].match(/^-[^0-9]/) || C[D].match(w) || $e(C[D])); D++)
          F++;
        F < _ && (B = Error(g("Not enough arguments following: %s", f)));
      }
      let A = Math.min(F, _);
      for (!te(h) && A > 0 && (L(f, h), A--), D = a + 1; D < A + a + 1; D++)
        L(f, C[D]);
      return a + A;
    }
    function fe(a, f, C, h) {
      let D = [], _ = h || C[a + 1];
      const F = $(f, c.nargs);
      if ($(f, c.bools) && !/^(true|false)$/.test(_))
        D.push(!0);
      else if (te(_) || te(h) && /^-/.test(_) && !w.test(_) && !$e(_)) {
        if (l[f] !== void 0) {
          const A = l[f];
          D = Array.isArray(A) ? A : [A];
        }
      } else {
        te(h) || D.push(Pe(f, h, !0));
        for (let A = a + 1; A < C.length && !(!i["greedy-arrays"] && D.length > 0 || F && typeof F == "number" && D.length >= F || (_ = C[A], /^-/.test(_) && !w.test(_) && !$e(_))); A++)
          a = A, D.push(Pe(f, _, o));
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
      const h = Pe(a, f, C), D = a.split(".");
      me(O, D, h), c.aliases[a] && c.aliases[a].forEach(function(_) {
        const F = _.split(".");
        me(O, F, h);
      }), D.length > 1 && i["dot-notation"] && (c.aliases[D[0]] || []).forEach(function(_) {
        let F = _.split(".");
        const A = [].concat(D);
        A.shift(), F = F.concat(A), (c.aliases[a] || []).includes(F.join(".")) || me(O, F, h);
      }), $(a, c.normalize) && !$(a, c.arrays) && [a].concat(c.aliases[a] || []).forEach(function(F) {
        Object.defineProperty(De, F, {
          enumerable: !0,
          get() {
            return f;
          },
          set(A) {
            f = typeof A == "string" ? ne.normalize(A) : A;
          }
        });
      });
    }
    function X(a, f) {
      c.aliases[a] && c.aliases[a].length || (c.aliases[a] = [f], b[f] = !0), c.aliases[f] && c.aliases[f].length || X(f, a);
    }
    function Pe(a, f, C) {
      C && (f = oo(f)), ($(a, c.bools) || $(a, c.counts)) && typeof f == "string" && (f = f === "true");
      let h = Array.isArray(f) ? f.map(function(D) {
        return ve(a, D);
      }) : ve(a, f);
      return $(a, c.counts) && (te(h) || typeof h == "boolean") && (h = st()), $(a, c.normalize) && $(a, c.arrays) && (Array.isArray(f) ? h = f.map((D) => ne.normalize(D)) : h = ne.normalize(f)), h;
    }
    function ve(a, f) {
      return !i["parse-positional-numbers"] && a === "_" || !$(a, c.strings) && !$(a, c.bools) && !Array.isArray(f) && (ss(f) && i["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${f}`))) || !te(f) && $(a, c.numbers)) && (f = Number(f)), f;
    }
    function Rs(a) {
      const f = /* @__PURE__ */ Object.create(null);
      cn(f, c.aliases, l), Object.keys(c.configs).forEach(function(C) {
        const h = a[C] || f[C];
        if (h)
          try {
            let D = null;
            const _ = ne.resolve(ne.cwd(), h), F = c.configs[C];
            if (typeof F == "function") {
              try {
                D = F(_);
              } catch (A) {
                D = A;
              }
              if (D instanceof Error) {
                B = D;
                return;
              }
            } else
              D = ne.require(_);
            ze(D);
          } catch (D) {
            D.name === "PermissionDenied" ? B = D : a[C] && (B = Error(g("Invalid JSON config file: %s", h)));
          }
      });
    }
    function ze(a, f) {
      Object.keys(a).forEach(function(C) {
        const h = a[C], D = f ? f + "." + C : C;
        typeof h == "object" && h !== null && !Array.isArray(h) && i["dot-notation"] ? ze(h, D) : (!ge(O, D.split(".")) || $(D, c.arrays) && i["combine-arrays"]) && L(D, h);
      });
    }
    function Ns() {
      typeof p < "u" && p.forEach(function(a) {
        ze(a);
      });
    }
    function an(a, f) {
      if (typeof d > "u")
        return;
      const C = typeof d == "string" ? d : "", h = ne.env();
      Object.keys(h).forEach(function(D) {
        if (C === "" || D.lastIndexOf(C, 0) === 0) {
          const _ = D.split("__").map(function(F, A) {
            return A === 0 && (F = F.substring(C.length)), Ce(F);
          });
          (f && c.configs[_.join(".")] || !f) && !ge(a, _) && L(_.join("."), h[D]);
        }
      });
    }
    function Ls(a) {
      let f;
      const C = /* @__PURE__ */ new Set();
      Object.keys(a).forEach(function(h) {
        if (!C.has(h) && (f = $(h, c.coercions), typeof f == "function"))
          try {
            const D = ve(h, f(a[h]));
            [].concat(c.aliases[h] || [], h).forEach((_) => {
              C.add(_), a[_] = D;
            });
          } catch (D) {
            B = D;
          }
      });
    }
    function js(a) {
      return c.keys.forEach((f) => {
        ~f.indexOf(".") || typeof a[f] > "u" && (a[f] = void 0);
      }), a;
    }
    function cn(a, f, C, h = !1) {
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
      i["dot-notation"] || (f = [f.join(".")]), f.slice(0, -1).forEach(function(M) {
        M = An(M), typeof h == "object" && h[M] === void 0 && (h[M] = {}), typeof h[M] != "object" || Array.isArray(h[M]) ? (Array.isArray(h[M]) ? h[M].push({}) : h[M] = [h[M], {}], h = h[M][h[M].length - 1]) : h = h[M];
      });
      const D = An(f[f.length - 1]), _ = $(f.join("."), c.arrays), F = Array.isArray(C);
      let A = i["duplicate-arguments-array"];
      !A && $(D, c.nargs) && (A = !0, (!te(h[D]) && c.nargs[D] === 1 || Array.isArray(h[D]) && h[D].length === c.nargs[D]) && (h[D] = void 0)), C === st() ? h[D] = st(h[D]) : Array.isArray(h[D]) ? A && _ && F ? h[D] = i["flatten-duplicate-arrays"] ? h[D].concat(C) : (Array.isArray(h[D][0]) ? h[D] : [h[D]]).concat([C]) : !A && !!_ == !!F ? h[D] = C : h[D] = h[D].concat([C]) : h[D] === void 0 && _ ? h[D] = F ? C : [C] : A && !(h[D] === void 0 || $(D, c.counts) || $(D, c.bools)) ? h[D] = [h[D], C] : h[D] = C;
    }
    function Ts(...a) {
      a.forEach(function(f) {
        Object.keys(f || {}).forEach(function(C) {
          c.aliases[C] || (c.aliases[C] = [].concat(u[C] || []), c.aliases[C].concat(C).forEach(function(h) {
            if (/-/.test(h) && i["camel-case-expansion"]) {
              const D = Ce(h);
              D !== C && c.aliases[C].indexOf(D) === -1 && (c.aliases[C].push(D), b[D] = !0);
            }
          }), c.aliases[C].concat(C).forEach(function(h) {
            if (h.length > 1 && /[A-Z]/.test(h) && i["camel-case-expansion"]) {
              const D = ns(h, "-");
              D !== C && c.aliases[C].indexOf(D) === -1 && (c.aliases[C].push(D), b[D] = !0);
            }
          }), c.aliases[C].forEach(function(h) {
            c.aliases[h] = [C].concat(c.aliases[C].filter(function(D) {
              return h !== D;
            }));
          }));
        });
      });
    }
    function $(a, f) {
      const C = [].concat(c.aliases[a] || [], a), h = Object.keys(f), D = C.find((_) => h.includes(_));
      return D ? f[D] : !1;
    }
    function ln(a) {
      const f = Object.keys(c);
      return [].concat(f.map((h) => c[h])).some(function(h) {
        return Array.isArray(h) ? h.includes(a) : h[a];
      });
    }
    function Ws(a, ...f) {
      return [].concat(...f).some(function(h) {
        const D = a.match(h);
        return D && ln(D[1]);
      });
    }
    function Ms(a) {
      if (a.match(w) || !a.match(/^-[^-]+/))
        return !1;
      let f = !0, C;
      const h = a.slice(1).split("");
      for (let D = 0; D < h.length; D++) {
        if (C = a.slice(D + 2), !ln(h[D])) {
          f = !1;
          break;
        }
        if (h[D + 1] && h[D + 1] === "=" || C === "-" || /[A-Za-z]/.test(h[D]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(C) || h[D + 1] && h[D + 1].match(/\W/))
          break;
      }
      return f;
    }
    function $e(a) {
      return i["unknown-options-as-args"] && Is(a);
    }
    function Is(a) {
      return a = a.replace(/^-{3,}/, "--"), a.match(w) || Ms(a) ? !1 : !Ws(a, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function he(a) {
      return !$(a, c.bools) && !$(a, c.counts) && `${a}` in l ? l[a] : ks(Ps(a));
    }
    function ks(a) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[a];
    }
    function Ps(a) {
      let f = K.BOOLEAN;
      return $(a, c.strings) ? f = K.STRING : $(a, c.numbers) ? f = K.NUMBER : $(a, c.bools) ? f = K.BOOLEAN : $(a, c.arrays) && (f = K.ARRAY), f;
    }
    function te(a) {
      return a === void 0;
    }
    function zs() {
      Object.keys(c.counts).find((a) => $(a, c.arrays) ? (B = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", a)), !0) : $(a, c.nargs) ? (B = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", a)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, c.aliases),
      argv: Object.assign(De, O),
      configuration: i,
      defaulted: Object.assign({}, m),
      error: B,
      newAliases: Object.assign({}, b)
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
    r = r.filter(function(u, i, l) {
      return l.indexOf(u) === i;
    });
    const o = r.pop();
    o !== void 0 && typeof o == "string" && (n[o] = r);
  }), n;
}
function st(t) {
  return t !== void 0 ? t + 1 : 1;
}
function An(t) {
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
var rt, ot, ut;
const vn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, $n = (ot = (rt = process == null ? void 0 : process.versions) === null || rt === void 0 ? void 0 : rt.node) !== null && ot !== void 0 ? ot : (ut = process == null ? void 0 : process.version) === null || ut === void 0 ? void 0 : ut.slice(1);
if ($n && Number($n.match(/^([^.]+)/)[1]) < vn)
  throw Error(`yargs parser supports a minimum Node.js version of ${vn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const uo = process ? process.env : {}, rs = new so({
  cwd: process.cwd,
  env: () => uo,
  format: Hn,
  normalize: Gs,
  resolve: de,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(Jt(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Ae = function(e, n) {
  return rs.parse(e.slice(), n).argv;
};
Ae.detailed = function(t, e) {
  return rs.parse(t.slice(), e);
};
Ae.camelCase = Ce;
Ae.decamelize = ns;
Ae.looksLikeNumber = ss;
const io = {
  right: ho,
  center: po
}, ao = 0, Oe = 1, co = 2, Re = 3;
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
      r.length > 1 && q.stringWidth(r[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), q.stringWidth(r[0])));
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
    const n = q.stripAnsi(e);
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
        const { width: l } = e[i], p = this.negatePadding(e[i]);
        let d = u;
        if (p > q.stringWidth(u) && (d += " ".repeat(p - q.stringWidth(u))), e[i].align && e[i].align !== "left" && this.wrap) {
          const x = io[e[i].align];
          d = x(d, p), q.stringWidth(d) < p && (d += " ".repeat((l || 0) - q.stringWidth(d) - 1));
        }
        const E = e[i].padding || [0, 0, 0, 0];
        E[Re] && (o += " ".repeat(E[Re])), o += Bn(e[i], d, "| "), o += d, o += Bn(e[i], d, " |"), E[Oe] && (o += " ".repeat(E[Oe])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, o = n.text, u = q.stringWidth(o.trimRight());
    return n.span ? this.wrap ? r < u ? e : (n.hidden = !0, o.trimRight() + " ".repeat(r - u) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((o, u) => {
      o.width = s[u], this.wrap ? r = q.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : r = o.text.split(`
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[ao] || 0).fill("")), r.push(...new Array(o.padding[co] || 0).fill(""))), r.forEach((i, l) => {
        n[l] || n.push([]);
        const p = n[l];
        for (let d = 0; d < u; d++)
          p[d] === void 0 && p.push("");
        p.push(i);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[Re] || 0) + (e.padding[Oe] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((u) => u.width || q.stringWidth(u.text));
    let n = e.length, s = this.width;
    const r = e.map((u) => {
      if (u.width)
        return n--, s -= u.width, u.width;
    }), o = n ? Math.floor(s / n) : 0;
    return r.map((u, i) => u === void 0 ? Math.max(o, Do(e[i])) : u);
  }
}
function Bn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Do(t) {
  const e = t.padding || [], n = 1 + (e[Re] || 0) + (e[Oe] || 0);
  return t.border ? n + 4 : n;
}
function fo() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function ho(t, e) {
  t = t.trim();
  const n = q.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function po(t, e) {
  t = t.trim();
  const n = q.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let q;
function go(t, e) {
  return q = e, new lo({
    width: t?.width || fo(),
    wrap: t?.wrap
  });
}
const os = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function us(t) {
  return t.replace(os, "");
}
function mo(t, e) {
  const [n, s] = t.match(os) || ["", ""];
  t = us(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function bo(t) {
  return go(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: us,
    wrap: mo
  });
}
function Co(t, e) {
  let n = de(".", t), s;
  for (Un(n).isDirectory() || (n = it(n)); ; ) {
    if (s = e(n, Js(n)), s) return de(n, s);
    if (n = it(s = n), s === n) break;
  }
}
const Fo = {
  fs: {
    readFileSync: Jt,
    writeFile: Qs
  },
  format: Hn,
  resolve: de,
  exists: (t) => {
    try {
      return Un(t).isFile();
    } catch {
      return !1;
    }
  }
};
let Z;
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
    Z.fs.writeFile(u, i, "utf-8", function(l) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(l);
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
function xo(t, e) {
  Z = e;
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
const wo = (t) => xo(t, Fo), _o = "require is not supported by ESM", Sn = "loading a directory of commands is not supported yet for ESM";
let xe;
try {
  xe = tr(import.meta.url);
} catch {
  xe = process.cwd();
}
const yo = xe.substring(0, xe.lastIndexOf("node_modules"));
Xs, er, Hs, yo || process.cwd(), Zs, it, Ks, Ys, de, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Jt, wo({
  directory: de(xe, "../../../locales"),
  updateFiles: !1
});
let is = !1;
const Ao = (t) => {
  is = t;
}, On = () => is, ae = {
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
}, sn = Object.keys(ae), vo = 1.5, Rn = 75, Nn = 85, Ln = 95, as = [...sn, ...Object.values(ae).flat()], $o = {
  maxExpressionLength: 40,
  maxComputedLength: 5,
  minimalConsonantCount: 3,
  maxPropsCount: 5,
  minVariableName: 4,
  maxParameterCount: 3,
  maxTabs: 5,
  maxVshowLines: 10,
  maxVifLines: 10,
  complexityModerate: 5,
  warningThreshold: 4,
  maxFunctionSize: 20,
  maxScriptLength: 100
}, Bo = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((x, { errors: b, warnings: m }) => ({ errors: x.errors + b, warnings: x.warnings + m }), { errors: 0, warnings: 0 }), o = [];
  o.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` });
  const u = Math.ceil((1 - (s * vo + r) / e) * 100), i = 60, l = r ? Math.max(1, Math.ceil(r / e * i)) : 0, p = s ? Math.max(1, i - Math.ceil(u * i / 100) - l) : 0, d = i - p - l, E = `<bg_ok>${"_".repeat(d)}</bg_ok><bg_warn>${"_".repeat(l)}</bg_warn><bg_err>${"_".repeat(p)}</bg_err>`;
  return o.push({ info: `Code Health: [${E}] ${u}%
` }), u < Rn && o.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= Rn && u < Nn && o.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= Nn && u < Ln && o.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= Ln && o.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { errors: s, warnings: r, output: o };
}, cs = async (t) => {
  const e = {
    path: "./src",
    apply: Object.values(sn).join(","),
    ignore: "",
    exclude: "",
    group: "rule",
    level: "all",
    sort: "desc",
    output: "text",
    override: $o
  }, n = H.join(t, "vue-mess-detector.json");
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
}, rn = async (t) => {
  let e = t;
  for (; e !== H.parse(e).root; ) {
    const n = H.join(e, "package.json");
    try {
      return await ie.access(n), e;
    } catch {
      e = H.dirname(e);
    }
  }
  throw new Error("Project root not found");
};
function So(t) {
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
    const s = sr(import.meta.url), r = H.dirname(s), o = H.resolve(r, "..");
    e = H.join(o, "package.json");
  }
  return t && (e = H.join(t, "package.json")), JSON.parse(await ie.readFile(e, "utf-8"));
}, on = async () => await rn(process?.cwd() || "./") || "", Ds = async (t, e) => {
  const n = await on(), s = H.join(n, "package.json");
  return Qt.existsSync(s) ? !!(await ls(e)).dependencies[t] : !1;
}, fs = async (t) => {
  const e = await on(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await Ds("nuxt", t) || n.some((s) => Qt.existsSync(H.join(e, s)));
}, Oo = async (t) => {
  const e = await on(), n = ["vue.config.js", "vue.config.ts"];
  return !await fs(t) && (await Ds("vue", t) || n.some((r) => Qt.existsSync(H.join(e, r))));
}, Ro = /^(\(.*\)|\\?.)$/;
function ue(t) {
  const e = t.toString();
  return Ro.test(e) ? e : `(?:${e})`;
}
const No = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Lo = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function v(t) {
  const e = (n) => v(`(?<${n}>${`${t}`.replace(No, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => v(`${t}${I(...n)}`), {
      referenceTo: (n) => v(`${t}\\k<${n}>`)
    }),
    or: (...n) => v(`(?:${t}|${I(...n)})`),
    after: (...n) => v(`(?<=${I(...n)})${t}`),
    before: (...n) => v(`${t}(?=${I(...n)})`),
    notAfter: (...n) => v(`(?<!${I(...n)})${t}`),
    notBefore: (...n) => v(`${t}(?!${I(...n)})`),
    times: Object.assign((n) => v(`${ue(t)}{${n}}`), {
      any: () => v(`${ue(t)}*`),
      atLeast: (n) => v(`${ue(t)}{${n},}`),
      atMost: (n) => v(`${ue(t)}{0,${n}}`),
      between: (n, s) => v(`${ue(t)}{${n},${s}}`)
    }),
    optionally: () => v(`${ue(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => v(`${t}`.replace(Lo, "($1$3)$2")),
    at: {
      lineStart: () => v(`^${t}`),
      lineEnd: () => v(`${t}$`)
    }
  };
}
const jo = /[.*+?^${}()|[\]\\/]/g;
function we(t) {
  return v(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function k(t) {
  return v(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ee(...t) {
  return v(`(?:${t.map((e) => I(e)).join("|")})`);
}
const le = v(".");
v("\\b\\w+\\b");
const G = v("\\w"), V = v("\\b"), To = v("\\d"), W = v("\\s"), hs = Object.assign(v("[a-zA-Z]"), {
  lowercase: v("[a-z]"),
  uppercase: v("[A-Z]")
}), ps = v("\\t"), ds = v("\\n");
v("\\r");
v("\\W+"), v("\\W"), v("\\B"), v("\\D"), v("\\S"), Object.assign(v("[^a-zA-Z]"), {
  lowercase: v("[^a-z]"),
  uppercase: v("[^A-Z]")
}), v("[^\\t]"), v("[^\\n]"), v("[^\\r]");
function Y(...t) {
  return v(`${ue(I(...t))}?`);
}
function I(...t) {
  return v(
    t.map((e) => typeof e == "string" ? e.replace(jo, "\\$&") : e).join("")
  );
}
function S(...t) {
  return v(`${ue(I(...t))}+`);
}
const J = "i", j = "g", R = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(I(...t).toString(), [...e || ""].join(""));
}, Dt = [], Wo = ["get", "post", "put", "delete", "patch", "options", "head"], Mo = (t, e) => {
  if (!e.includes("/server/api/"))
    return;
  const n = e.replace(/\.[^/.]+$/, "");
  if (Wo.some((u) => n.toLowerCase().endsWith(`.${u}`)))
    return;
  const r = t.source;
  R(
    I("if"),
    S(" "),
    "(",
    I("event.node.req.method"),
    S(" "),
    "!="
  ).test(r) || Dt.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, Io = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    const n = e.filePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ API endpoint without HTTP method</text_info>",
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${n}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/api-without-method.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, T = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((i, l) => l >= n && i.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((u, i) => u + i.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, je = [], ko = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = T(t.content, o);
    if (u > n * 2) {
      je.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-if with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && je.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-if with ${u} lines</bg_warn>`
    });
  });
}, Po = () => {
  const t = [];
  return je.length > 0 && je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Te = [], zo = (t, e) => {
  if (!t)
    return;
  const n = 10, s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const u = o.split(`
`).length, i = T(t.content, o);
    if (u > n * 2) {
      Te.push({
        filePath: e,
        message: `line #${i} <bg_err>has a v-show with ${u} lines</bg_err>`
      });
      return;
    }
    u > n && Te.push({
      filePath: e,
      message: `line #${i} <bg_warn>has a v-show with ${u} lines</bg_warn>`
    });
  });
}, Vo = () => {
  const t = [];
  return Te.length > 0 && Te.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Q = (t) => {
  const e = R(
    I("/*").and(k("*").times.any(), Y(`
`).as("newline"), I("*").notBefore("/").or(S(k("*")))).and("*/").or(
      I("//").and(S(le))
    ),
    [j]
  );
  return t.replace(e, (n) => {
    const s = n.match(/\n/g);
    return s ? s.join("") : "";
  });
}, ft = [], gs = 4, jn = 2 * gs, Ho = (t, e) => {
  const { script: n, template: s } = t;
  if (!n && !s)
    return;
  const r = R(
    Ee(
      "if",
      'v-if="',
      S(le).groupedAs("condition").and("?").and(S(le)).and(":"),
      // ternary
      "="
    ).and(
      S(
        Ee(
          "&&",
          "||",
          k(`"'`)
        )
      )
    ),
    [j]
  ), o = R(
    Ee("&&", "||"),
    [j]
  ), u = (i, l) => {
    i = Q(i);
    const p = i.match(r);
    p && p.forEach((d) => {
      const E = (d.match(o) || []).length + 1;
      if (E > gs) {
        const x = T(i, d);
        ft.push({
          filePath: e,
          message: `line #${x} ${E > jn ? "<bg_err>" : "<bg_warn>"}${l} has a complicated condition with ${E} blocks${E > jn ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  n && u(n.content, "script"), s && u(s.content, "template");
}, Uo = () => {
  const t = [];
  return ft.length > 0 && ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, ht = [], qo = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const u = o[1];
    if (s.test(u)) {
      const i = T(t.content.trim(), o[0]), l = u.trim(), p = l.length > 20 ? l.slice(0, 20) : l;
      ht.push({
        filePath: e,
        message: `line #${i} side effect detected in computed property <bg_err>(${p})</bg_err>`
      });
    }
  });
}, Go = () => {
  const t = [];
  return ht.length > 0 && ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, pt = [], ms = 5, Tn = 2 * ms, Zo = (t, e) => {
  if (!t)
    return;
  const n = R(V, "if", V, [j, J]), s = R(V, "else", V, [j, J]), r = R(V, "for", V, [j, J]), o = R(V, "while", V, [j, J]), u = R(V, "case", V, [j, J]), i = Q(t.content), l = i.match(n), p = i.match(s), d = i.match(r), E = i.match(o), x = i.match(u), b = (l?.length || 0) + (p?.length || 0) + (d?.length || 0) + (E?.length || 0) + (x?.length || 0);
  b > ms && pt.push({ filePath: e, message: `Cyclomatic complexity is ${b > Tn ? "<bg_err>very high" : "<bg_warn>high"} (${b})${b > Tn ? "</bg_err>" : "</bg_warn>"}` });
}, Ko = () => {
  const t = [];
  return pt.length > 0 && pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, dt = [], Wn = 5, Yo = 3, Jo = (t, e) => {
  if (!t)
    return;
  const n = R(ps.times.atLeast(Wn).at.lineStart().or(W.times.atLeast(Yo * Wn).at.lineStart()), [j]), r = Q(t.content).match(n);
  let o = 0;
  r?.forEach((u) => {
    const i = T(t.content, u, o);
    dt.push({
      filePath: e,
      message: `line #${i} <bg_warn>indentation: ${u.length}</bg_warn>`
    }), o = i;
  });
}, Qo = () => {
  const t = [];
  return dt.length > 0 && dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, gt = [], Xo = (t, e) => {
  if (!t)
    return;
  const n = R(V, "else", V, [j, J]), r = Q(t.content).match(n);
  r?.length && gt.push({ filePath: e, message: `else clauses found <bg_err>(${r.length})</bg_err>` });
}, eu = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, We = [], tu = 5, nu = 8;
function su({ funcName: t, funcBody: e, lineNumber: n, filePath: s, max: r }) {
  const o = e.split(`
`).length, u = uu(t);
  if (o > 2 * r) {
    We.push({ filePath: s, message: `function <bg_err>(${u}#${n})</bg_err> is too long: <bg_err>${o} lines</bg_err>` });
    return;
  }
  o >= r && We.push({ filePath: s, message: `function <bg_warn>(${u}#${n})</bg_warn> is too long: <bg_warn>${o} lines</bg_warn>` });
}
function ru(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], o = n.lastIndex;
    let u = 1, i = o;
    for (; u > 0 && i < t.length; )
      t[i] === "{" ? u++ : t[i] === "}" && u--, i++;
    const l = t.slice(o, i - 1).trim();
    return {
      name: r,
      body: l,
      end: i
      // Returns the position after the matched function
    };
  } else
    return null;
}
function ou(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, o] = r, u = e + r.index + r[0].length;
    let i = u, l = "";
    if (t[u] === "{") {
      let p = 1;
      for (i = u + 1; i < t.length && p > 0; )
        t[i] === "{" ? p++ : t[i] === "}" && p--, i++;
      l = t.slice(u + 1, i - 1).trim();
    } else {
      for (; i < t.length && t[i] !== ";"; )
        i++;
      l = t.slice(u, i).trim();
    }
    return {
      name: o,
      body: l,
      end: i
      // Position after the end of the function body
    };
  } else
    return null;
}
function uu(t) {
  return t.replace(/^const\s*/, "");
}
const iu = (t, e, n) => {
  if (!t)
    return;
  const s = t.content, r = s.length;
  let o = 0;
  for (; o < r; ) {
    let u = "", i = "", l = !1;
    if (s.slice(o, o + nu) === "function") {
      const p = ru(s, o);
      p && (l = !0, u = p.name, i = p.body, o = p.end);
    }
    if (s.slice(o, o + tu) === "const") {
      const p = ou(s, o);
      p && (l = !0, u = p.name, i = p.body, o = p.end);
    }
    if (l) {
      const p = T(s.trim(), u);
      su({ funcName: u, funcBody: i, lineNumber: p, filePath: e, max: n });
    } else
      o++;
  }
}, au = (t) => {
  const e = [];
  return We.length > 0 && We.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${n.message} 🚨`
    });
  }), e;
}, mt = [], cu = (t, e) => {
  if (!t)
    return;
  const n = R("<", I("img").or("picture"), [j]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const u = T(t.content, o, r), i = o.slice(1);
      mt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i} element found</bg_warn>`
      }), r = u;
    });
  }
}, lu = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, bt = [], Du = (t, e) => {
  if (!t)
    return;
  const n = R("<a", V, [j, J]), s = t.content.match(n);
  s?.length && bt.push({ filePath: e, message: `${s?.length} <bg_warn>html link found</bg_warn>` });
}, fu = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ct = [], hu = (t, e) => {
  if (!t)
    return;
  const s = Q(t.content).split(`
`);
  s.forEach((r, o) => {
    const u = r.trim();
    if (u.startsWith("if (") && !u.includes("{")) {
      const i = s[o + 1]?.trim();
      (!i || !i.startsWith("{") && !u.endsWith("{")) && Ct.push({
        filePath: e,
        message: `line #${o} if statement without curly braces: <bg_err>${u}</bg_err>`
      });
    }
  });
}, pu = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ft = [], du = (t, e) => {
  if (!t)
    return;
  const n = R(Ee(V), S(To).as("magicNumber"), Ee(")", ds), [j]);
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    const o = s.groups?.magicNumber, u = Number.parseInt(o ?? "0");
    if (u > 1) {
      const i = T(t.content, String(u), r);
      Ft.push({
        filePath: e,
        message: `line #${i} <bg_warn>magic number: ${u}</bg_warn>`
      }), r = i;
    }
  }
}, gu = () => {
  const t = [];
  return Ft.length && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), t;
}, Et = [], mu = (t, e) => {
  if (!t)
    return;
  const n = R(S(le), W, "?", W, S(le), W, ":", W, S(le));
  Q(t.content).match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const u = T(t.content, o);
      Et.push({
        filePath: e,
        message: `line #${u} has <bg_warn>nested ternary</bg_warn>`
      });
    }
  });
}, bu = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, xt = [], Cu = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const u = T(t.content.trim(), o[0], r);
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
}, wt = [], Eu = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  Q(t.content).match(n)?.forEach((o) => {
    const u = T(t.content, o);
    wt.push({
      filePath: e,
      message: `line #${u} <bg_warn>props destructuring found: ${o}</bg_warn>`
    });
  });
}, xu = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, _t = [], wu = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  Q(t.content).match(n)?.forEach((o) => {
    const u = T(t.content, o);
    _t.push({
      filePath: e,
      message: `line #${u} <bg_warn>Avoid using 'var' for variable declarations: ${o}</bg_warn>`
    });
  });
}, _u = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, yt = [], bs = 3, Mn = (t, e, n) => {
  const s = e.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  s.length > bs && yt.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${s.length}</bg_warn> parameters` });
}, yu = (t, e) => {
  if (!t)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1] && Mn(s[1], s[2], e), s[3] && Mn(s[3], s[4], e);
}, Au = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${bs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, At = [], vu = (t, e) => {
  !t || t.setup || At.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, $u = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, vt = [], Bu = (t, e) => {
  if (!t)
    return;
  const n = R(
    "defineProps(",
    W.times.any(),
    "[",
    W.times.any(),
    S(we(`'"`), S(G), we(`'"`), W.times.any(), Y(",", W.times.any())),
    "]",
    W.times.any(),
    ")",
    [j]
  ), s = R(
    "<",
    S(G).grouped(),
    W,
    k(">").times.any(),
    ":",
    S(G).grouped(),
    W.times.any(),
    "=",
    W.times.any(),
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
    const l = i[1], p = i[2], d = i[3];
    o.has(d) && p === d && vt.push({
      filePath: e,
      message: `Prop <bg_warn>(${d})</bg_warn> is being drilled through <bg_warn>${l}</bg_warn> component unmodified.`
    });
  }
}, Su = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, $t = [], Ou = (t, e, n) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.length > n && $t.push({ filePath: e, message: `${s.length > n * 2 ? "<bg_err>" : "<bg_warn>"}(${s.length} lines)${s.length > n * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ru = (t) => {
  const e = [];
  return $t.length > 0 && $t.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${n.message} 🚨`
    });
  }), e;
}, Bt = [], Cs = 4, Nu = ["i", "key"], Lu = (t, e) => {
  if (!t)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    r.length < Cs && !Nu.includes(r) && Bt.push({ filePath: e, message: `variable: <bg_warn>(${r})</bg_warn>` });
  }
}, ju = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${Cs}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${e.message} 🚨`
    });
  }), t;
}, St = [], Tu = 5, Wu = (t, e) => {
  if (!t)
    return;
  const n = R("defineProps", Y("<"), Y("("), "{", S(le), "}", ["g", "s"]), r = Q(t.content).match(n);
  if (r?.length) {
    const o = r[0].split(",").length;
    o > Tu && St.push({ filePath: e, message: `props found <bg_err>(${o})</bg_err>` });
  }
}, Mu = () => {
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
  const n = R('v-for="(', W.times.any(), S(G).grouped(), W.times.any(), ",", W.times.any(), S(G).grouped(), W.times.any(), ")", S(W), "in", S(W), S(G).grouped(), [j]), s = R(':key="', W.times.any(), S(G).grouped(), W.times.any(), '"', [j]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((u) => {
    const [i, l, p, d] = u;
    o.forEach((E) => {
      const x = E[1];
      if (x === p) {
        const b = T(t.content.trim(), x);
        Ot.push({
          filePath: e,
          message: `line #${b} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, ku = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Rt = [], Pu = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  const r = Q(t.content);
  for (; (s = n.exec(r)) !== null; ) {
    const o = s[0], u = s[1], i = T(r.trim(), o);
    Rt.push({
      filePath: e,
      message: `line #${i} zero length comparison found <bg_warn>(${u})</bg_warn>`
    });
  }
}, zu = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
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
], Nt = [], Hu = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      Vu.includes(o) && Nt.push({ filePath: e, message: `<bg_warn>(${o})</bg_warn>` });
    }
  });
}, Uu = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Me = [], qu = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = R(I("$parent").or("getCurrentInstance"), [j]), o = t.content.match(n), u = t.content.match(s);
  if (u) {
    const l = u[1].split(".")[0];
    if ((o ? o[1] : "").includes(l)) {
      const d = T(t.content.trim(), l);
      Me.push({
        filePath: e,
        message: `line #${d} <bg_warn>(${l})</bg_warn>`
      });
    }
  }
  const i = t.content.match(r);
  if (i) {
    const l = T(t.content.trim(), i[0]);
    Me.push({
      filePath: e,
      message: `line #${l} <bg_warn>(${i[0]})</bg_warn>`
    });
  }
}, Gu = () => {
  const t = [];
  return Me.length > 0 && Me.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Lt = [], Zu = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || Lt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Ku = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, jt = [], Yu = (t, e) => {
  if (!t)
    return;
  const n = R("defineProps([", [j, J]);
  t.content.match(n)?.length && jt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, Ju = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Tt = [], Qu = (t) => {
  if (t.includes("pages"))
    return;
  const e = H.basename(t);
  if (e === "App.vue")
    return;
  const n = R(hs.uppercase);
  e.slice(1).match(n)?.length || Tt.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, Xu = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Wt = [], ei = (t, e) => {
  if (!t)
    return;
  const n = R("<", S(k(">")), " v-for", S(k(">")), ">", [
    j,
    J
  ]), s = t.content.match(n);
  s?.length && (s.some((o) => o.includes(":key")) || Wt.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, ti = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Mt = [], ni = (t, e) => {
  if (!t)
    return;
  const n = R(
    "<",
    S(k(">")),
    " v-if",
    S(k(">")),
    " v-for",
    S(k(">")),
    ">",
    [j, J]
  ), s = R(
    "<",
    S(k(">")),
    " v-for",
    S(k(">")),
    " v-if",
    S(k(">")),
    ">",
    [j, J]
  ), r = t.content.match(n), o = t.content.match(s);
  if (r?.length || o?.length) {
    const u = r?.length ? r[0] : o?.length ? o[0] : "", i = T(t.content, u);
    Mt.push({ filePath: e, message: `line #${i} <bg_err>v-if used with v-for</bg_err>` });
  }
}, si = () => {
  const t = [];
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, It = [], In = [
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
    const u = o[1], i = o[2];
    if (i) {
      const p = Array.from(i.matchAll(r), (E) => E[1]).filter((E) => In.includes(E));
      let d = -1;
      for (const E of p) {
        const x = In.indexOf(E);
        if (x !== -1 && x < d) {
          It.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${u})</bg_warn>`
          });
          break;
        }
        d = x;
      }
    }
  }
}, oi = () => {
  const t = [];
  return It.length > 0 && It.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, kt = [], ui = (t, e) => {
  const n = t.toString(), s = n.indexOf("<script setup>"), r = n.indexOf("<template>"), o = n.indexOf("<style>"), u = [
    { name: "script", index: s },
    { name: "template", index: r },
    { name: "style", index: o }
  ].filter((l) => l.index !== -1);
  u.every((l, p) => p === 0 ? !0 : u[p - 1].index < l.index) || kt.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, ii = () => {
  const t = [];
  return kt.length > 0 && kt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Pt = [], ai = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = H.basename(t), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && Pt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, ci = () => {
  const t = [];
  return Pt.length > 0 && Pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, zt = [], li = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = T(t.content.trim(), r), u = r.split(`
`).at(0)?.trim() || "";
    zt.push({ filePath: e, message: `line #${o} <bg_warn>(${u})</bg_warn>` });
  });
}, Di = () => {
  const t = [];
  return zt.length > 0 && zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Vt = [], kn = [], fi = ["v-slot", "v-bind", "v-on"], hi = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  fi.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = T(t.source, s);
      Vt.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), kn.some((o) => o.filePath === e) || kn.push({ filePath: e });
    }
  });
}, pi = () => {
  const t = [];
  return Vt.length > 0 && Vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), t;
}, Ht = [], di = 3, gi = (t) => {
  const e = R(
    S(k("/")).grouped(),
    I(".vue").at.lineEnd()
  ), n = t.match(e);
  if (n) {
    const s = n[0]?.split(".vue")[0], r = R(
      we("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [j]
    ), o = s.match(r);
    (!o || o.length < di) && Ht.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
  }
}, mi = () => {
  const t = [];
  return Ht.length > 0 && Ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Ut = [], bi = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((i) => i.trim() !== "").length > 1 && o.split(`
`).length === 1 && Ut.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, Ci = () => {
  const t = [];
  return Ut.length > 0 && Ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), t;
}, qt = [], Fi = /^[a-z]+([A-Z][a-z]*)*$/, Ei = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((o) => o.split(":")[0]).filter((o) => o.length).filter((o) => !Fi.test(o)).length && qt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
}, xi = () => {
  const t = [];
  return qt.length > 0 && qt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Gt = [], wi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = R(
    "<",
    S(G),
    Y(S(we(` 	
\r`))),
    S(k("/>")),
    Y(S(we(` 	
\r`))),
    Y("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const o = R(":", S(G), Y(" "), "=", Y(" "), k(`'"`), [
    "g"
  ]);
  r?.forEach((u) => {
    if (!u.includes(":"))
      return;
    const i = u.match(o);
    if (i?.length) {
      const l = T(t.source, u);
      Gt.push({ filePath: e, message: `line #${l} <bg_warn>${i}</bg_warn>` });
    }
  });
}, _i = () => {
  const t = [];
  return Gt.length > 0 && Gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Zt = [], yi = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = R(
    "<",
    S(hs.uppercase, G),
    Y(ds, ps),
    Y(S(k(">"))),
    "></",
    S(G),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const u = T(t.source, o), i = o.split(`
`).at(-1)?.trim() || "";
    Zt.push({ filePath: e, message: `line #${u} <bg_warn>${i}</bg_warn>` });
  });
}, Ai = () => {
  const t = [];
  return Zt.length > 0 && Zt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Fs = [], Ne = [], vi = 5, $i = (t, e) => {
  if (!t)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    if (r.split(`
`).length > vi) {
      const o = r.split(`
`)[0], u = T(t.content, o);
      Fs.push({ filePath: e, message: `line #${u} <bg_warn>computed</bg_warn>` }), Ne.push({ filePath: e }), Ne.some((i) => i.filePath === e) || Ne.push({ filePath: e });
    }
  });
}, Bi = () => {
  const t = [];
  return Ne.length > 0 && Fs.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), t;
}, Kt = [], Si = (t, e, n) => {
  if (!t)
    return;
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(s)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > n) {
      const u = T(t.content, o), i = o.split(`
`).at(0)?.trim() || "";
      Kt.push({
        filePath: e,
        message: `line #${u} <bg_warn>${i}</bg_warn>`
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
}, Ri = (t, e, n, s) => {
  const r = t.scriptSetup || t.script, o = e.endsWith(".vue"), u = {
    // vue-essential
    simpleProp: () => Yu(r, e),
    singleNameComponent: () => o && Qu(e),
    globalStyle: () => o && Zu(t.styles, e),
    vforNoKey: () => o && ei(t.template, e),
    vifWithVfor: () => o && ni(t.template, e),
    // vue-strong
    simpleComputed: () => $i(r, e),
    componentFiles: () => o && li(r, e),
    propNameCasing: () => o && Ei(r, e),
    componentFilenameCasing: () => o && ai(e),
    selfClosingComponents: () => o && yi(t, e),
    templateSimpleExpression: () => o && Si(t.template, e, s.maxExpressionLength),
    quotedAttributeValues: () => o && wi(t, e),
    directiveShorthands: () => o && hi(t, e),
    fullWordComponentName: () => o && gi(e),
    multiAttributeElements: () => o && bi(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => o && ui(t.source, e),
    elementAttributeOrder: () => o && ri(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => o && qu(r, e),
    elementSelectorsWithScoped: () => o && Hu(t.styles, e),
    // rrd
    apiWithoutMethod: () => On() && Mo(t, e),
    bigVif: () => ko(t.template, e),
    bigVShow: () => zo(t.template, e),
    complicatedConditions: () => Ho(t, e),
    cyclomaticComplexity: () => Zo(r, e),
    computedSideEffects: () => qo(r, e),
    deepIndentation: () => Jo(r, e),
    elseCondition: () => Xo(r, e),
    functionSize: () => iu(r, e, s.maxFunctionSize),
    htmlImageElements: () => On() && cu(t.template, e),
    htmlLink: () => o && Du(t.template, e),
    ifWithoutCurlyBraces: () => hu(r, e),
    magicNumbers: () => du(r, e),
    nestedTernary: () => mu(r, e),
    noPropDestructure: () => Eu(r, e),
    noVarDeclaration: () => wu(r, e),
    parameterCount: () => yu(r, e),
    plainScript: () => o && vu(t.script, e),
    propsDrilling: () => Bu(r, e),
    scriptLength: () => Ou(r, e, s.maxScriptLength),
    shortVariableName: () => Lu(r, e),
    tooManyProps: () => Wu(r, e),
    vForWithIndexKey: () => o && Iu(t.template, e),
    zeroLengthComparison: () => Pu(r, e),
    noInlineStyles: () => Cu(t.template, e)
  };
  n.forEach((i) => {
    i in ae ? ae[i].forEach((l) => {
      l in u && u[l]();
    }) : i in u && u[i]();
  });
}, Ni = (t, e, n, s) => {
  const r = {}, o = {}, u = [], i = ({ file: d, rule: E, title: x, description: b, message: m }) => {
    const g = t === "rule" ? E : d;
    r[g] || (r[g] = []), r[g].push({ file: d, rule: E, title: x, description: b, message: m });
  }, l = (d) => {
    d().forEach((x) => {
      i(x);
    });
  };
  return l(Xu), l(Ju), l(ti), l(si), l(Ku), l(ci), l(Di), l(pi), l(mi), l(Ci), l(xi), l(_i), l(Ai), l(Bi), l(Oi), l(ii), l(oi), l(Gu), l(Uu), l(Io), l(Po), l(Vo), l(Uo), l(Ko), l(Go), l(Qo), l(eu), l(() => au(s.maxFunctionSize)), l(lu), l(fu), l(pu), l(gu), l(bu), l(xu), l(_u), l(Au), l($u), l(Su), l(() => Ru(s.maxScriptLength)), l(ju), l(Mu), l(ku), l(zu), l(Fu), Object.keys(r).sort((d, E) => {
    const x = r[d].length, b = r[E].length;
    return e === "desc" ? b - x : x - b;
  }).forEach((d) => {
    o[d] = [], r[d].forEach((E, x) => {
      const b = E.message.includes("<bg_err>");
      if (u.some((m) => m.file === E.file)) {
        const m = u.find((g) => g.file === E.file);
        m && b && m.errors++, m && !b && m.warnings++;
      } else
        u.push({ file: E.file, errors: b ? 1 : 0, warnings: b ? 0 : 1, output: [] });
      n === "error" && !b || (o[d][x] = { id: "", description: "", message: "" }, t === "file" && (o[d][x].id = E.rule), t !== "file" && (o[d][x].id = E.file), o[d][x].description = E.description, o[d][x].message = E.message || "🚨");
    });
  }), { output: o, health: u };
};
let Yt = 0, Es = 0, xs = [], ws = {};
const Li = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], un = [], Pn = async (t, e) => {
  if (!un.some((n) => t.endsWith(n)) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js"))) {
    Yt++;
    const n = await ie.readFile(e, "utf-8");
    Es += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = nr(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), Ri(s, e, xs, ws), `Analyzing ${e}...`;
  }
}, _s = async (t) => {
  const e = [];
  if (!(await ie.stat(t)).isDirectory()) {
    const r = await Pn(t, t);
    return r && e.push(r), e;
  }
  const s = await ie.readdir(t);
  for (const r of s) {
    const o = H.join(t, r);
    if ((await ie.stat(o)).isDirectory() && !Li.some((l) => o.includes(l)) && !un.some((l) => o.endsWith(l))) {
      const l = await _s(o);
      l && e.push(...l);
    }
    const i = await Pn(o, o);
    i && e.push(i);
  }
  return e;
}, ji = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s = "", groupBy: r = "rule", level: o = "all", sortBy: u = "desc" }) => {
  const i = await rn(t), l = await cs(i);
  e = e.length ? e : l.apply.split(","), n = n.length ? n : l.ignore ? l.ignore.split(",") : [], s = s || l.exclude, r = r || l.group, o = o || l.level, u = u || l.sort, ws = l.override;
  const p = e.filter((X) => !n.includes(X)), { rulesets: d, individualRules: E } = So(p), x = d.length ? `<bg_info>${d.join(", ")}</bg_info>` : "N/A", b = E.length ? `<bg_info>${E.join(", ")}</bg_info>` : "N/A";
  let m = `      Applying ${d.length} rulesets: ${x}`;
  E.length > 0 && (m += `
      Applying ${E.length} individual rules: ${b}`);
  const g = n.filter((X) => !d.includes(X)), c = g.length ? `<bg_info>${g.join(", ")}</bg_info>` : "N/A", w = await Oo(i), y = await fs(i);
  Ao(y);
  const B = [];
  B.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` });
  const N = l.isDefault ? "👉 Using <bg_info>default</bg_info> configuration" : "👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>";
  B.push({ info: N }), B.push({ info: `      Project type: <bg_info>${y ? "Nuxt" : ""}${w ? "Vue" : ""}${!y && !w ? "?" : ""}</bg_info>` }), B.push({
    info: `${m}
      Ignoring ${g.length} rules: ${c}
      Excluding ${s || "-"}
      Output level <bg_info>${o}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${u}</bg_info>`
  }), xs = e.filter((X) => !n.includes(X)), s && un.push(...s.split(","));
  const O = await _s(t);
  B.push(...O.map((X) => ({ info: X }))), B.push({ info: `Found <bg_info>${Yt}</bg_info> files` });
  const { health: De, output: ce } = Ni(r, u, o, l.override), { errors: oe, warnings: fe, output: L } = Bo(De, Es, Yt);
  return !oe && !fe && B.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: B, codeHealthOutput: L, reportOutput: ce };
}, ys = "\x1B[44m", Ti = "\x1B[43m", _e = "\x1B[41m", Wi = "\x1B[42m", re = "\x1B[0m", As = "\x1B[33m", vs = "\x1B[36m", Ie = "\x1B[0m", zn = (t) => t.replace(/<bg_err>/g, _e).replace(/<bg_warn>/g, Ti).replace(/<bg_info>/g, ys).replace(/<bg_ok>/g, Wi).replace(/<\/bg_err>/g, re).replace(/<\/bg_warn>/g, re).replace(/<\/bg_info>/g, re).replace(/<\/bg_ok>/g, re).replace(/<text_warn>/g, As).replace(/<text_info>/g, vs).replace(/<\/text_warn>/g, Ie).replace(/<\/text_info>/g, Ie), Vn = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(ae) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    sn.includes(o) ? s.push(...ae[o]) : Object.values(ae).some((u) => u.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${_e}Invalid ${t} values: ${r.join(", ")}${re}. 
${As}Allowed values are: ${as.join(", ")}${Ie}

`
  ), process.exit(1)), s;
}, $s = ["rule", "file"], Bs = ["asc", "desc"], Ss = ["text", "json", "table"], Os = ["all", "error"], Mi = {
  groupBy: $s,
  sortBy: Bs,
  outputLevel: Os,
  outputFormat: Ss
}, Be = (t, e) => {
  const n = Mi[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${_e}${t}${re} provided for flag ${vs}${e}${Ie}. Valid options are: ${ys}${n.join(", ")}${re}.
`
  ), process.exit(1)), t;
}, Ii = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4];
rn(Ii || "./src").then(async (t) => {
  const e = await cs(t);
  ls().then(
    (n) => qs(eo(process.argv)).config(e).command(
      "analyze [path]",
      "Analyze Vue files for code smells and best practices",
      (s) => s.positional("path", {
        describe: "path to the Vue files",
        default: "./src"
      }).option("apply", {
        alias: "a",
        describe: "Comma-separated list of rulesets/rules to apply.",
        choices: as,
        coerce: Vn("apply"),
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
        choices: $s,
        coerce: (r) => Be(r, "groupBy"),
        default: "",
        group: "Group Results:"
      }).option("level", {
        alias: "l",
        describe: "Output level",
        choices: Os,
        coerce: (r) => Be(r, "outputLevel"),
        default: "",
        group: "Output:"
      }).option("ignore", {
        alias: "i",
        describe: "Comma-separated list of rulesets to ignore.",
        coerce: Vn("ignore"),
        default: "",
        group: "Filter Rulesets:"
      }).option("sort", {
        alias: "s",
        describe: "Sort results at the output",
        choices: Bs,
        coerce: (r) => Be(r, "sortBy"),
        default: "",
        group: "Sort Results:"
      }).option("output", {
        describe: "Output format",
        choices: Ss,
        coerce: (r) => Be(r, "outputFormat"),
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
        ji({
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
- <text_info> ${i}</text_info>`), u.reportOutput[i].forEach((l) => {
                o(`   ${l.id}`), o(`   ${l.description}`), o(`   ${l.message}
`);
              });
            u.codeHealthOutput?.forEach((i) => {
              o(i.info);
            });
          }
          if (s.output == "table") {
            r && (console.log(`We can not output ${_e}to a file in table mode${re}`), process.exit(1)), [...u.output].forEach((i) => {
              o(i.info);
            });
            for (const i in u.reportOutput) {
              const l = new Jr({
                head: ["id", "message"],
                colWidths: [60, 60],
                wordWrap: !0,
                wrapOnWordBoundary: !1
              });
              o("-".repeat(120)), s.group == "rule" && (o(`<text_info>Rule: ${i}</text_info>`), o(`Description: ${u.reportOutput[i][0].description}`), u.reportOutput[i].forEach((p) => {
                l.push([o(p.id), o(p.message)]);
              })), s.group == "file" && (o(`<text_info>File: ${i}</text_info>`), u.reportOutput[i].forEach((p) => {
                l.push([`${p.id}
${p.description.replace("See: ", `See:
`)}`, p.message]);
              })), o(l.toString());
            }
            u.codeHealthOutput?.forEach((i) => {
              o(i.info);
            });
          }
          s.output == "json" && o(JSON.stringify(u, null, 2));
        }).catch((u) => {
          console.error(`${_e}${u}${re}`);
        });
      }
    ).version("version", "Show version number", n.version).alias("version", "v").help().argv
  );
});
export {
  as as FLAT_RULESETS_RULES,
  ji as analyze
};
