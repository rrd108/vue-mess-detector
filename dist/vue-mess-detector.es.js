import pe from "node:fs/promises";
import xr, { format as gs, inspect as yr } from "util";
import _r from "os";
import $r from "yargs";
import { normalize as vr, resolve as Ce, dirname as fn, basename as Ar, extname as Sr, relative as Br } from "path";
import { readFileSync as mn, statSync as ms, readdirSync as Rr, writeFile as Or } from "fs";
import { notStrictEqual as Nr, strictEqual as Lr } from "assert";
import { fileURLToPath as jr } from "url";
import P from "node:path";
import { parse as Tr } from "@vue/compiler-sfc";
import It from "node:fs";
import { fileURLToPath as Wr } from "node:url";
function bs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let bn = [], Es = 0;
const V = (t, e) => {
  Es >= e && bn.push(t);
};
V.WARN = 1;
V.INFO = 2;
V.DEBUG = 3;
V.reset = () => {
  bn = [];
};
V.setDebugLevel = (t) => {
  Es = t;
};
V.warn = (t) => V(t, V.WARN);
V.info = (t) => V(t, V.INFO);
V.debug = (t) => V(t, V.DEBUG);
V.debugMessages = () => bn;
var En = V, Cn = { exports: {} }, Mr = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const kr = Mr;
var Ir = (t) => typeof t == "string" ? t.replace(kr(), "") : t, Fn = { exports: {} };
const Cs = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
Fn.exports = Cs;
Fn.exports.default = Cs;
var Pr = Fn.exports, zr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const Hr = Ir, Vr = Pr, Gr = zr, Fs = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = Hr(t), t.length === 0))
    return 0;
  t = t.replace(Gr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += Vr(s) ? 2 : 1);
  }
  return e;
};
Cn.exports = Fs;
Cn.exports.default = Fs;
var Ur = Cn.exports;
const Nn = Ur;
function Ze(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ae(t) {
  let e = Ze();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, o) {
    return Nn(o) > r ? Nn(o) : r;
  }, 0);
}
function ye(t, e) {
  return Array(e + 1).join(t);
}
function qr(t, e, n, s) {
  let r = ae(t);
  if (e + 1 >= r) {
    let o = e - r;
    switch (s) {
      case "right": {
        t = ye(n, o) + t;
        break;
      }
      case "center": {
        let i = Math.ceil(o / 2), u = o - i;
        t = ye(n, u) + t + ye(n, i);
        break;
      }
      default: {
        t = t + ye(n, o);
        break;
      }
    }
  }
  return t;
}
let be = {};
function We(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", be[e] = { set: t, to: !0 }, be[n] = { set: t, to: !1 }, be[t] = { on: e, off: n };
}
We("bold", 1, 22);
We("italics", 3, 23);
We("underline", 4, 24);
We("inverse", 7, 27);
We("strikethrough", 9, 29);
function ws(t, e) {
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
  let s = be[e[0]];
  s && (t[s.set] = s.to);
}
function Zr(t) {
  let e = Ze(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    ws(s, n), n = e.exec(t);
  return s;
}
function xs(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += be[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function Kr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = be[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Jr(t, e) {
  if (t.length === ae(t))
    return t.substr(0, e);
  for (; ae(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Yr(t, e) {
  let n = Ze(!0), s = t.split(Ze()), r = 0, o = 0, i = "", u, a = {};
  for (; o < e; ) {
    u = n.exec(t);
    let h = s[r];
    if (r++, o + ae(h) > e && (h = Jr(h, e - o)), i += h, o += ae(h), o < e) {
      if (!u)
        break;
      i += u[0], ws(a, u);
    }
  }
  return xs(a, i);
}
function Qr(t, e, n) {
  if (n = n || "…", ae(t) <= e)
    return t;
  e -= ae(n);
  let r = Yr(t, e);
  r += n;
  const o = "\x1B]8;;\x07";
  return t.includes(o) && !r.includes(o) && (r += o), r;
}
function Xr() {
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
function eo(t, e) {
  t = t || {}, e = e || Xr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function to(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], o = 0, i;
  for (let u = 0; u < s.length; u += 2) {
    let a = s[u], h = o + ae(a);
    o > 0 && i && (h += i.length), h > t ? (o !== 0 && n.push(r.join("")), r = [a], o = ae(a)) : (r.push(i || "", a), o = h), i = s[u + 1];
  }
  return o && n.push(r.join("")), n;
}
function no(t, e) {
  let n = [], s = "";
  function r(i, u) {
    for (s.length && u && (s += u), s += i; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let o = e.split(/(\s+)/g);
  for (let i = 0; i < o.length; i += 2)
    r(o[i], i && o[i - 1]);
  return s.length && n.push(s), n;
}
function so(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? to : no;
  for (let o = 0; o < e.length; o++)
    s.push.apply(s, r(t, e[o]));
  return s;
}
function ro(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = Kr(e, t[s]);
    e = Zr(r);
    let o = Object.assign({}, e);
    n.push(xs(o, r));
  }
  return n;
}
function oo(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var ys = {
  strlen: ae,
  repeat: ye,
  pad: qr,
  truncate: Qr,
  mergeOptions: eo,
  wordWrap: so,
  colorizeLines: ro,
  hyperlink: oo
}, _s = { exports: {} }, Pt = { exports: {} }, Gt = { exports: {} }, Ut = { exports: {} }, qt = { exports: {} }, Ln;
function io() {
  return Ln || (Ln = 1, function(t) {
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
  }(qt)), qt.exports;
}
var Zt, jn;
function uo() {
  return jn || (jn = 1, Zt = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), Zt;
}
var Kt, Tn;
function ao() {
  if (Tn) return Kt;
  Tn = 1;
  var t = _r, e = uo(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function r(u) {
    return u === 0 ? !1 : {
      level: u,
      hasBasic: !0,
      has256: u >= 2,
      has16m: u >= 3
    };
  }
  function o(u) {
    if (s === !1)
      return 0;
    if (e("color=16m") || e("color=full") || e("color=truecolor"))
      return 3;
    if (e("color=256"))
      return 2;
    if (u && !u.isTTY && s !== !0)
      return 0;
    var a = s ? 1 : 0;
    if (process.platform === "win32") {
      var h = t.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(h[0]) >= 10 && Number(h[2]) >= 10586 ? Number(h[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(C) {
        return C in n;
      }) || n.CI_NAME === "codeship" ? 1 : a;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in n) {
      var f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : (n.TERM === "dumb", a);
  }
  function i(u) {
    var a = o(u);
    return r(a);
  }
  return Kt = {
    supportsColor: i,
    stdout: i(process.stdout),
    stderr: i(process.stderr)
  }, Kt;
}
var Jt = { exports: {} }, Wn;
function co() {
  return Wn || (Wn = 1, function(t) {
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
      return n.forEach(function(i) {
        i = i.toLowerCase();
        var u = o[i] || [" "], a = Math.floor(Math.random() * u.length);
        typeof o[i] < "u" ? r += o[i][a] : r += i;
      }), r;
    };
  }(Jt)), Jt.exports;
}
var Yt = { exports: {} }, Mn;
function lo() {
  return Mn || (Mn = 1, function(t) {
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
      function i(h) {
        var f = Math.floor(Math.random() * h);
        return f;
      }
      function u(h) {
        var f = !1;
        return o.filter(function(C) {
          f = C === h;
        }), f;
      }
      function a(h, f) {
        var C = "", m, d;
        f = f || {}, f.up = typeof f.up < "u" ? f.up : !0, f.mid = typeof f.mid < "u" ? f.mid : !0, f.down = typeof f.down < "u" ? f.down : !0, f.size = typeof f.size < "u" ? f.size : "maxi", h = h.split("");
        for (d in h)
          if (!u(d)) {
            switch (C = C + h[d], m = { up: 0, down: 0, mid: 0 }, f.size) {
              case "mini":
                m.up = i(8), m.mid = i(2), m.down = i(8);
                break;
              case "maxi":
                m.up = i(16) + 3, m.mid = i(4) + 1, m.down = i(64) + 3;
                break;
              default:
                m.up = i(8) + 1, m.mid = i(6) / 2, m.down = i(8) + 1;
                break;
            }
            var E = ["up", "mid", "down"];
            for (var g in E)
              for (var l = E[g], w = 0; w <= m[l]; w++)
                f[l] && (C = C + r[l][i(r[l].length)]);
          }
        return C;
      }
      return a(n, s);
    };
  }(Yt)), Yt.exports;
}
var Qt = { exports: {} }, kn;
function ho() {
  return kn || (kn = 1, function(t) {
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
  }(Qt)), Qt.exports;
}
var Xt = { exports: {} }, In;
function fo() {
  return In || (In = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(Xt)), Xt.exports;
}
var en = { exports: {} }, Pn;
function Do() {
  return Pn || (Pn = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, o) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(en)), en.exports;
}
var tn = { exports: {} }, zn;
function po() {
  return zn || (zn = 1, function(t) {
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
  }(tn)), tn.exports;
}
var Hn;
function go() {
  return Hn || (Hn = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = xr, s = e.styles = io(), r = Object.defineProperties, o = new RegExp(/[\r\n]+/g);
    e.supportsColor = ao().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
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
    var i = /[|\\{}()[\]^$+*?.]/g, u = function(g) {
      if (typeof g != "string")
        throw new TypeError("Expected a string");
      return g.replace(i, "\\$&");
    };
    function a(g) {
      var l = function w() {
        return C.apply(w, arguments);
      };
      return l._styles = g, l.__proto__ = f, l;
    }
    var h = function() {
      var g = {};
      return s.grey = s.gray, Object.keys(s).forEach(function(l) {
        s[l].closeRe = new RegExp(u(s[l].close), "g"), g[l] = {
          get: function() {
            return a(this._styles.concat(l));
          }
        };
      }), g;
    }(), f = r(function() {
    }, h);
    function C() {
      var g = Array.prototype.slice.call(arguments), l = g.map(function(R) {
        return R != null && R.constructor === String ? R : n.inspect(R);
      }).join(" ");
      if (!e.enabled || !l)
        return l;
      for (var w = l.indexOf(`
`) != -1, y = this._styles, v = y.length; v--; ) {
        var A = s[y[v]];
        l = A.open + l.replace(A.closeRe, A.open) + A.close, w && (l = l.replace(o, function(R) {
          return A.close + R + A.open;
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
              var v = y;
              for (var A in g[w])
                v = e[g[w][A]](v);
              return v;
            }
            return e[g[w]](y);
          };
        })(l);
    };
    function m() {
      var g = {};
      return Object.keys(h).forEach(function(l) {
        g[l] = {
          get: function() {
            return a([l]);
          }
        };
      }), g;
    }
    var d = function(l, w) {
      var y = w.split("");
      return y = y.map(l), y.join("");
    };
    e.trap = co(), e.zalgo = lo(), e.maps = {}, e.maps.america = ho()(e), e.maps.zebra = fo()(e), e.maps.rainbow = Do()(e), e.maps.random = po()(e);
    for (var E in e.maps)
      (function(g) {
        e[g] = function(l) {
          return d(e.maps[g], l);
        };
      })(E);
    r(e, m());
  }(Ut)), Ut.exports;
}
var Vn;
function mo() {
  return Vn || (Vn = 1, function(t) {
    var e = go();
    t.exports = e;
  }(Gt)), Gt.exports;
}
const { info: bo, debug: $s } = En, J = ys;
let Eo = class He {
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
    Fo.forEach(function(a) {
      nn(s, r, a, o);
    }), this.truncate = this.options.truncate || e.truncate;
    let i = this.options.style = this.options.style || {}, u = e.style;
    nn(i, u, "padding-left", this), nn(i, u, "padding-right", this), this.head = i.head || u.head, this.border = i.border || u.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = J.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let i = 1;
        for (; i < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + i], i++;
      }
      const { wrapOnWordBoundary: r = !0 } = e, { wrapOnWordBoundary: o = r } = this.options;
      return this.wrapLines(J.wordWrap(this.fixedWidth, this.content, o));
    }
    return this.wrapLines(this.content.split(`
`));
  }
  wrapLines(e) {
    const n = J.colorizeLines(e);
    return this.href ? n.map((s) => J.hyperlink(this.href, s)) : n;
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Un, -1), this.height = this.heights.reduce(Un, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    let s = J.truncate(this.content, 10, this.truncate);
    e || bo(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
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
    let i = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - o, this.drawRight, i, n);
  }
  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(e) {
    let n = [];
    return this.cells ? this.widths.forEach(function(s, r) {
      n.push(this._topLeftChar(r)), n.push(J.repeat(this.chars[this.y == 0 ? "top" : "mid"], s));
    }, this) : (n.push(this._topLeftChar(0)), n.push(J.repeat(this.chars[this.y == 0 ? "top" : "mid"], this.width))), e && n.push(this.chars[this.y == 0 ? "topRight" : "rightMid"]), this.wrapWithStyleColors("border", n.join(""));
  }
  _topLeftChar(e) {
    let n = this.x + e, s;
    if (this.y == 0)
      s = n == 0 ? "topLeft" : e == 0 ? "topMid" : "top";
    else if (n == 0)
      s = "leftMid";
    else if (s = e == 0 ? "midMid" : "bottomMid", this.cells && (this.cells[this.y - 1][n] instanceof He.ColSpanCell && (s = e == 0 ? "topMid" : "mid"), e == 0)) {
      let o = 1;
      for (; this.cells[this.y][n - o] instanceof He.ColSpanCell; )
        o++;
      this.cells[this.y][n - o] instanceof He.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = mo();
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
      let m = this.cells[this.y + r][this.x - 1];
      for (; m instanceof Dn; )
        m = this.cells[m.y][m.x - 1];
      m instanceof pn || (o = this.chars.rightMid);
    }
    let i = J.repeat(" ", this.paddingLeft), u = n ? this.chars.right : "", a = J.repeat(" ", this.paddingRight), h = this.lines[e], f = this.width - (this.paddingLeft + this.paddingRight);
    s && (h += this.truncate || "…");
    let C = J.truncate(h, f, this.truncate);
    return C = J.pad(C, f, " ", this.hAlign), C = i + C + a, this.stylizeLine(o, C, u);
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
    let n = this.chars[this.x == 0 ? "bottomLeft" : "bottomMid"], s = J.repeat(this.chars.bottom, this.width), r = e ? this.chars.bottomRight : "";
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
      let i = this.cells[this.y + n][this.x - 1];
      for (; i instanceof Dn; )
        i = this.cells[i.y][i.x - 1];
      i instanceof pn || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", o = J.repeat(" ", this.width);
    return this.stylizeLine(s, o, r);
  }
}, Dn = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && $s(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, pn = class {
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
    this.cellOffset = n - s, this.offset = Co(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : ($s(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function Gn(...t) {
  return t.filter((e) => e != null).shift();
}
function nn(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = Gn(t[r], t[n], e[r], e[n])) : s[n] = Gn(t[n], e[n]);
}
function Co(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function Un(t, e) {
  return t + e + 1;
}
let Fo = [
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
Pt.exports = Eo;
Pt.exports.ColSpanCell = Dn;
Pt.exports.RowSpanCell = pn;
var wo = Pt.exports;
const { warn: xo, debug: yo } = En, dn = wo, { ColSpanCell: _o, RowSpanCell: $o } = dn;
(function() {
  function t(d, E) {
    return d[E] > 0 ? t(d, E + 1) : E;
  }
  function e(d) {
    let E = {};
    d.forEach(function(g, l) {
      let w = 0;
      g.forEach(function(y) {
        y.y = l, y.x = l ? t(E, w) : w;
        const v = y.rowSpan || 1, A = y.colSpan || 1;
        if (v > 1)
          for (let R = 0; R < A; R++)
            E[y.x + R] = v;
        w = y.x + A;
      }), Object.keys(E).forEach((y) => {
        E[y]--, E[y] < 1 && delete E[y];
      });
    });
  }
  function n(d) {
    let E = 0;
    return d.forEach(function(g) {
      g.forEach(function(l) {
        E = Math.max(E, l.x + (l.colSpan || 1));
      });
    }), E;
  }
  function s(d) {
    return d.length;
  }
  function r(d, E) {
    let g = d.y, l = d.y - 1 + (d.rowSpan || 1), w = E.y, y = E.y - 1 + (E.rowSpan || 1), v = !(g > y || w > l), A = d.x, R = d.x - 1 + (d.colSpan || 1), M = E.x, ue = E.x - 1 + (E.colSpan || 1), re = !(A > ue || M > R);
    return v && re;
  }
  function o(d, E, g) {
    let l = Math.min(d.length - 1, g), w = { x: E, y: g };
    for (let y = 0; y <= l; y++) {
      let v = d[y];
      for (let A = 0; A < v.length; A++)
        if (r(w, v[A]))
          return !0;
    }
    return !1;
  }
  function i(d, E, g, l) {
    for (let w = g; w < l; w++)
      if (o(d, w, E))
        return !1;
    return !0;
  }
  function u(d) {
    d.forEach(function(E, g) {
      E.forEach(function(l) {
        for (let w = 1; w < l.rowSpan; w++) {
          let y = new $o(l);
          y.x = l.x, y.y = l.y + w, y.colSpan = l.colSpan, h(y, d[g + w]);
        }
      });
    });
  }
  function a(d) {
    for (let E = d.length - 1; E >= 0; E--) {
      let g = d[E];
      for (let l = 0; l < g.length; l++) {
        let w = g[l];
        for (let y = 1; y < w.colSpan; y++) {
          let v = new _o();
          v.x = w.x + y, v.y = w.y, g.splice(l + 1, 0, v);
        }
      }
    }
  }
  function h(d, E) {
    let g = 0;
    for (; g < E.length && E[g].x < d.x; )
      g++;
    E.splice(g, 0, d);
  }
  function f(d) {
    let E = s(d), g = n(d);
    yo(`Max rows: ${E}; Max cols: ${g}`);
    for (let l = 0; l < E; l++)
      for (let w = 0; w < g; w++)
        if (!o(d, w, l)) {
          let y = { x: w, y: l, colSpan: 1, rowSpan: 1 };
          for (w++; w < g && !o(d, w, l); )
            y.colSpan++, w++;
          let v = l + 1;
          for (; v < E && i(d, v, y.x, y.x + y.colSpan); )
            y.rowSpan++, v++;
          let A = new dn(y);
          A.x = y.x, A.y = y.y, xo(`Missing cell at ${A.y}-${A.x}.`), h(A, d[l]);
        }
  }
  function C(d) {
    return d.map(function(E) {
      if (!Array.isArray(E)) {
        let g = Object.keys(E)[0];
        E = E[g], Array.isArray(E) ? (E = E.slice(), E.unshift(g)) : E = [g, E];
      }
      return E.map(function(g) {
        return new dn(g);
      });
    });
  }
  function m(d) {
    let E = C(d);
    return e(E), f(E), u(E), a(E), E;
  }
  _s.exports = {
    makeTableLayout: m,
    layoutTable: e,
    addRowSpanCells: u,
    maxWidth: n,
    fillInTable: f,
    computeWidths: qn("colSpan", "desiredWidth", "x", 1),
    computeHeights: qn("rowSpan", "desiredHeight", "y", 1)
  };
})();
function qn(t, e, n, s) {
  return function(r, o) {
    let i = [], u = [], a = {};
    o.forEach(function(h) {
      h.forEach(function(f) {
        (f[t] || 1) > 1 ? u.push(f) : i[f[n]] = Math.max(i[f[n]] || 0, f[e] || 0, s);
      });
    }), r.forEach(function(h, f) {
      typeof h == "number" && (i[f] = h);
    });
    for (let h = u.length - 1; h >= 0; h--) {
      let f = u[h], C = f[t], m = f[n], d = i[m], E = typeof r[m] == "number" ? 0 : 1;
      if (typeof d == "number")
        for (let g = 1; g < C; g++)
          d += 1 + i[m + g], typeof r[m + g] != "number" && E++;
      else
        d = e === "desiredWidth" ? f.desiredWidth - 1 : 1, (!a[m] || a[m] < d) && (a[m] = d);
      if (f[e] > d) {
        let g = 0;
        for (; E > 0 && f[e] > d; ) {
          if (typeof r[m + g] != "number") {
            let l = Math.round((f[e] - d) / E);
            d += l, i[m + g] += l, E--;
          }
          g++;
        }
      }
    }
    Object.assign(r, i, a);
    for (let h = 0; h < r.length; h++)
      r[h] = Math.max(s, r[h] || 0);
  };
}
var vo = _s.exports;
const he = En, Ao = ys, sn = vo;
let vs = class extends Array {
  constructor(e) {
    super();
    const n = Ao.mergeOptions(e);
    if (Object.defineProperty(this, "options", {
      value: n,
      enumerable: n.debug
    }), n.debug) {
      switch (typeof n.debug) {
        case "boolean":
          he.setDebugLevel(he.WARN);
          break;
        case "number":
          he.setDebugLevel(n.debug);
          break;
        case "string":
          he.setDebugLevel(parseInt(n.debug, 10));
          break;
        default:
          he.setDebugLevel(he.WARN), he.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof n.debug}`);
      }
      Object.defineProperty(this, "messages", {
        get() {
          return he.debugMessages();
        }
      });
    }
  }
  toString() {
    let e = this, n = this.options.head && this.options.head.length;
    n ? (e = [this.options.head], this.length && e.push.apply(e, this)) : this.options.style.head = [];
    let s = sn.makeTableLayout(e);
    s.forEach(function(o) {
      o.forEach(function(i) {
        i.mergeTableOptions(this.options, s);
      }, this);
    }, this), sn.computeWidths(this.options.colWidths, s), sn.computeHeights(this.options.rowHeights, s), s.forEach(function(o) {
      o.forEach(function(i) {
        i.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let i = s[o], u = this.options.rowHeights[o];
      (o === 0 || !this.options.style.compact || o == 1 && n) && rn(i, "top", r);
      for (let a = 0; a < u; a++)
        rn(i, a, r);
      o + 1 == s.length && rn(i, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
vs.reset = () => he.reset();
function rn(t, e, n) {
  let s = [];
  t.forEach(function(o) {
    s.push(o.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var So = vs, Bo = So;
const Ro = /* @__PURE__ */ bs(Bo);
class Ae extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, Ae);
  }
}
function As() {
  return Oo() ? 0 : 1;
}
function Oo() {
  return No() && !process.defaultApp;
}
function No() {
  return !!process.versions.electron;
}
function Lo(t) {
  return t.slice(As() + 1);
}
function jo() {
  return process.argv[As()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function _e(t) {
  if (t !== t.toLowerCase() && t !== t.toUpperCase() || (t = t.toLowerCase()), t.indexOf("-") === -1 && t.indexOf("_") === -1)
    return t;
  {
    let n = "", s = !1;
    const r = t.match(/^-+/);
    for (let o = r ? r[0].length : 0; o < t.length; o++) {
      let i = t.charAt(o);
      s && (s = !1, i = i.toUpperCase()), o !== 0 && (i === "-" || i === "_") ? s = !0 : i !== "-" && i !== "_" && (n += i);
    }
    return n;
  }
}
function Ss(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const o = n.charAt(r), i = t.charAt(r);
    o !== i && r > 0 ? s += `${e}${n.charAt(r)}` : s += i;
  }
  return s;
}
function Bs(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function To(t) {
  if (Array.isArray(t))
    return t.map((i) => typeof i != "string" ? i + "" : i);
  t = t.trim();
  let e = 0, n = null, s = null, r = null;
  const o = [];
  for (let i = 0; i < t.length; i++) {
    if (n = s, s = t.charAt(i), s === " " && !r) {
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
var ie;
(function(t) {
  t.BOOLEAN = "boolean", t.STRING = "string", t.NUMBER = "number", t.ARRAY = "array";
})(ie || (ie = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let le;
class Wo {
  constructor(e) {
    le = e;
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
    }, n), r = To(e), o = typeof e == "string", i = Mo(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), u = Object.assign({
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
    }, s.configuration), a = Object.assign(/* @__PURE__ */ Object.create(null), s.default), h = s.configObjects || [], f = s.envPrefix, C = u["populate--"], m = C ? "--" : "_", d = /* @__PURE__ */ Object.create(null), E = /* @__PURE__ */ Object.create(null), g = s.__ || le.format, l = {
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
    }, w = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, y = new RegExp("^--" + u["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(c) {
      const p = typeof c == "object" ? c.key : c, F = Object.keys(c).map(function(b) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[b];
      }).filter(Boolean).pop();
      F && (l[F][p] = !0), l.arrays[p] = !0, l.keys.push(p);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(c) {
      l.bools[c] = !0, l.keys.push(c);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(c) {
      l.strings[c] = !0, l.keys.push(c);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(c) {
      l.numbers[c] = !0, l.keys.push(c);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(c) {
      l.counts[c] = !0, l.keys.push(c);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(c) {
      l.normalize[c] = !0, l.keys.push(c);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([c, p]) => {
      typeof p == "number" && (l.nargs[c] = p, l.keys.push(c));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([c, p]) => {
      typeof p == "function" && (l.coercions[c] = p, l.keys.push(c));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(c) {
      l.configs[c] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([c, p]) => {
      (typeof p == "boolean" || typeof p == "function") && (l.configs[c] = p);
    })), gr(s.key, i, s.default, l.arrays), Object.keys(a).forEach(function(c) {
      (l.aliases[c] || []).forEach(function(p) {
        a[p] = a[c];
      });
    });
    let v = null;
    wr();
    let A = [];
    const R = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), M = {};
    for (let c = 0; c < r.length; c++) {
      const p = r[c], F = p.replace(/^-{3,}/, "---");
      let b, D, _, x, $, I;
      if (p !== "--" && /^-/.test(p) && Ie(p))
        ue(p);
      else if (F.match(/^---+(=|$)/)) {
        ue(p);
        continue;
      } else if (p.match(/^--.+=/) || !u["short-option-groups"] && p.match(/^-.+=/))
        x = p.match(/^--?([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && (B(x[1], l.arrays) ? c = H(c, x[1], r, x[2]) : B(x[1], l.nargs) !== !1 ? c = re(c, x[1], r, x[2]) : L(x[1], x[2], !0));
      else if (p.match(y) && u["boolean-negation"])
        x = p.match(y), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], L(D, B(D, l.arrays) ? [!1] : !1));
      else if (p.match(/^--.+/) || !u["short-option-groups"] && p.match(/^-[^-]+/))
        x = p.match(/^--?(.+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], B(D, l.arrays) ? c = H(c, D, r) : B(D, l.nargs) !== !1 ? c = re(c, D, r) : ($ = r[c + 1], $ !== void 0 && (!$.match(/^-/) || $.match(w)) && !B(D, l.bools) && !B(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), c++) : L(D, me(D))));
      else if (p.match(/^-.\..+=/))
        x = p.match(/^-([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && L(x[1], x[2]);
      else if (p.match(/^-.\..+/) && !p.match(w))
        $ = r[c + 1], x = p.match(/^-(.\..+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], $ !== void 0 && !$.match(/^-/) && !B(D, l.bools) && !B(D, l.counts) ? (L(D, $), c++) : L(D, me(D)));
      else if (p.match(/^-[^-]+/) && !p.match(w)) {
        _ = p.slice(1, -1).split(""), b = !1;
        for (let G = 0; G < _.length; G++) {
          if ($ = p.slice(G + 2), _[G + 1] && _[G + 1] === "=") {
            I = p.slice(G + 3), D = _[G], B(D, l.arrays) ? c = H(c, D, r, I) : B(D, l.nargs) !== !1 ? c = re(c, D, r, I) : L(D, I), b = !0;
            break;
          }
          if ($ === "-") {
            L(_[G], $);
            continue;
          }
          if (/[A-Za-z]/.test(_[G]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && B($, l.bools) === !1) {
            L(_[G], $), b = !0;
            break;
          }
          if (_[G + 1] && _[G + 1].match(/\W/)) {
            L(_[G], $), b = !0;
            break;
          } else
            L(_[G], me(_[G]));
        }
        D = p.slice(-1)[0], !b && D !== "-" && (B(D, l.arrays) ? c = H(c, D, r) : B(D, l.nargs) !== !1 ? c = re(c, D, r) : ($ = r[c + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(w)) && !B(D, l.bools) && !B(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), c++) : L(D, me(D))));
      } else if (p.match(/^-[0-9]$/) && p.match(w) && B(p.slice(1), l.bools))
        D = p.slice(1), L(D, me(D));
      else if (p === "--") {
        A = r.slice(c + 1);
        break;
      } else if (u["halt-at-non-option"]) {
        A = r.slice(c);
        break;
      } else
        ue(p);
    }
    Bn(R, !0), Bn(R, !1), fr(R), Dr(), Rn(R, l.aliases, a, !0), pr(R), u["set-placeholder-key"] && dr(R), Object.keys(l.counts).forEach(function(c) {
      Fe(R, c.split(".")) || L(c, 0);
    }), C && A.length && (R[m] = []), A.forEach(function(c) {
      R[m].push(c);
    }), u["camel-case-expansion"] && u["strip-dashed"] && Object.keys(R).filter((c) => c !== "--" && c.includes("-")).forEach((c) => {
      delete R[c];
    }), u["strip-aliased"] && [].concat(...Object.keys(i).map((c) => i[c])).forEach((c) => {
      u["camel-case-expansion"] && c.includes("-") && delete R[c.split(".").map((p) => _e(p)).join(".")], delete R[c];
    });
    function ue(c) {
      const p = ke("_", c);
      (typeof p == "string" || typeof p == "number") && R._.push(p);
    }
    function re(c, p, F, b) {
      let D, _ = B(p, l.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return ce(b) || (v = Error(g("Argument unexpected for: %s", p))), L(p, me(p)), c;
      let x = ce(b) ? 0 : 1;
      if (u["nargs-eats-options"])
        F.length - (c + 1) + x < _ && (v = Error(g("Not enough arguments following: %s", p))), x = _;
      else {
        for (D = c + 1; D < F.length && (!F[D].match(/^-[^0-9]/) || F[D].match(w) || Ie(F[D])); D++)
          x++;
        x < _ && (v = Error(g("Not enough arguments following: %s", p)));
      }
      let $ = Math.min(x, _);
      for (!ce(b) && $ > 0 && (L(p, b), $--), D = c + 1; D < $ + c + 1; D++)
        L(p, F[D]);
      return c + $;
    }
    function H(c, p, F, b) {
      let D = [], _ = b || F[c + 1];
      const x = B(p, l.nargs);
      if (B(p, l.bools) && !/^(true|false)$/.test(_))
        D.push(!0);
      else if (ce(_) || ce(b) && /^-/.test(_) && !w.test(_) && !Ie(_)) {
        if (a[p] !== void 0) {
          const $ = a[p];
          D = Array.isArray($) ? $ : [$];
        }
      } else {
        ce(b) || D.push(Ht(p, b, !0));
        for (let $ = c + 1; $ < F.length && !(!u["greedy-arrays"] && D.length > 0 || x && typeof x == "number" && D.length >= x || (_ = F[$], /^-/.test(_) && !w.test(_) && !Ie(_))); $++)
          c = $, D.push(Ht(p, _, o));
      }
      return typeof x == "number" && (x && D.length < x || isNaN(x) && D.length === 0) && (v = Error(g("Not enough arguments following: %s", p))), L(p, D), c;
    }
    function L(c, p, F = o) {
      if (/-/.test(c) && u["camel-case-expansion"]) {
        const _ = c.split(".").map(function(x) {
          return _e(x);
        }).join(".");
        Q(c, _);
      }
      const b = Ht(c, p, F), D = c.split(".");
      we(R, D, b), l.aliases[c] && l.aliases[c].forEach(function(_) {
        const x = _.split(".");
        we(R, x, b);
      }), D.length > 1 && u["dot-notation"] && (l.aliases[D[0]] || []).forEach(function(_) {
        let x = _.split(".");
        const $ = [].concat(D);
        $.shift(), x = x.concat($), (l.aliases[c] || []).includes(x.join(".")) || we(R, x, b);
      }), B(c, l.normalize) && !B(c, l.arrays) && [c].concat(l.aliases[c] || []).forEach(function(x) {
        Object.defineProperty(M, x, {
          enumerable: !0,
          get() {
            return p;
          },
          set($) {
            p = typeof $ == "string" ? le.normalize($) : $;
          }
        });
      });
    }
    function Q(c, p) {
      l.aliases[c] && l.aliases[c].length || (l.aliases[c] = [p], d[p] = !0), l.aliases[p] && l.aliases[p].length || Q(p, c);
    }
    function Ht(c, p, F) {
      F && (p = ko(p)), (B(c, l.bools) || B(c, l.counts)) && typeof p == "string" && (p = p === "true");
      let b = Array.isArray(p) ? p.map(function(D) {
        return ke(c, D);
      }) : ke(c, p);
      return B(c, l.counts) && (ce(b) || typeof b == "boolean") && (b = on()), B(c, l.normalize) && B(c, l.arrays) && (Array.isArray(p) ? b = p.map((D) => le.normalize(D)) : b = le.normalize(p)), b;
    }
    function ke(c, p) {
      return !u["parse-positional-numbers"] && c === "_" || !B(c, l.strings) && !B(c, l.bools) && !Array.isArray(p) && (Bs(p) && u["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${p}`))) || !ce(p) && B(c, l.numbers)) && (p = Number(p)), p;
    }
    function fr(c) {
      const p = /* @__PURE__ */ Object.create(null);
      Rn(p, l.aliases, a), Object.keys(l.configs).forEach(function(F) {
        const b = c[F] || p[F];
        if (b)
          try {
            let D = null;
            const _ = le.resolve(le.cwd(), b), x = l.configs[F];
            if (typeof x == "function") {
              try {
                D = x(_);
              } catch ($) {
                D = $;
              }
              if (D instanceof Error) {
                v = D;
                return;
              }
            } else
              D = le.require(_);
            Vt(D);
          } catch (D) {
            D.name === "PermissionDenied" ? v = D : c[F] && (v = Error(g("Invalid JSON config file: %s", b)));
          }
      });
    }
    function Vt(c, p) {
      Object.keys(c).forEach(function(F) {
        const b = c[F], D = p ? p + "." + F : F;
        typeof b == "object" && b !== null && !Array.isArray(b) && u["dot-notation"] ? Vt(b, D) : (!Fe(R, D.split(".")) || B(D, l.arrays) && u["combine-arrays"]) && L(D, b);
      });
    }
    function Dr() {
      typeof h < "u" && h.forEach(function(c) {
        Vt(c);
      });
    }
    function Bn(c, p) {
      if (typeof f > "u")
        return;
      const F = typeof f == "string" ? f : "", b = le.env();
      Object.keys(b).forEach(function(D) {
        if (F === "" || D.lastIndexOf(F, 0) === 0) {
          const _ = D.split("__").map(function(x, $) {
            return $ === 0 && (x = x.substring(F.length)), _e(x);
          });
          (p && l.configs[_.join(".")] || !p) && !Fe(c, _) && L(_.join("."), b[D]);
        }
      });
    }
    function pr(c) {
      let p;
      const F = /* @__PURE__ */ new Set();
      Object.keys(c).forEach(function(b) {
        if (!F.has(b) && (p = B(b, l.coercions), typeof p == "function"))
          try {
            const D = ke(b, p(c[b]));
            [].concat(l.aliases[b] || [], b).forEach((_) => {
              F.add(_), c[_] = D;
            });
          } catch (D) {
            v = D;
          }
      });
    }
    function dr(c) {
      return l.keys.forEach((p) => {
        ~p.indexOf(".") || typeof c[p] > "u" && (c[p] = void 0);
      }), c;
    }
    function Rn(c, p, F, b = !1) {
      Object.keys(F).forEach(function(D) {
        Fe(c, D.split(".")) || (we(c, D.split("."), F[D]), b && (E[D] = !0), (p[D] || []).forEach(function(_) {
          Fe(c, _.split(".")) || we(c, _.split("."), F[D]);
        }));
      });
    }
    function Fe(c, p) {
      let F = c;
      u["dot-notation"] || (p = [p.join(".")]), p.slice(0, -1).forEach(function(D) {
        F = F[D] || {};
      });
      const b = p[p.length - 1];
      return typeof F != "object" ? !1 : b in F;
    }
    function we(c, p, F) {
      let b = c;
      u["dot-notation"] || (p = [p.join(".")]), p.slice(0, -1).forEach(function(I) {
        I = Zn(I), typeof b == "object" && b[I] === void 0 && (b[I] = {}), typeof b[I] != "object" || Array.isArray(b[I]) ? (Array.isArray(b[I]) ? b[I].push({}) : b[I] = [b[I], {}], b = b[I][b[I].length - 1]) : b = b[I];
      });
      const D = Zn(p[p.length - 1]), _ = B(p.join("."), l.arrays), x = Array.isArray(F);
      let $ = u["duplicate-arguments-array"];
      !$ && B(D, l.nargs) && ($ = !0, (!ce(b[D]) && l.nargs[D] === 1 || Array.isArray(b[D]) && b[D].length === l.nargs[D]) && (b[D] = void 0)), F === on() ? b[D] = on(b[D]) : Array.isArray(b[D]) ? $ && _ && x ? b[D] = u["flatten-duplicate-arrays"] ? b[D].concat(F) : (Array.isArray(b[D][0]) ? b[D] : [b[D]]).concat([F]) : !$ && !!_ == !!x ? b[D] = F : b[D] = b[D].concat([F]) : b[D] === void 0 && _ ? b[D] = x ? F : [F] : $ && !(b[D] === void 0 || B(D, l.counts) || B(D, l.bools)) ? b[D] = [b[D], F] : b[D] = F;
    }
    function gr(...c) {
      c.forEach(function(p) {
        Object.keys(p || {}).forEach(function(F) {
          l.aliases[F] || (l.aliases[F] = [].concat(i[F] || []), l.aliases[F].concat(F).forEach(function(b) {
            if (/-/.test(b) && u["camel-case-expansion"]) {
              const D = _e(b);
              D !== F && l.aliases[F].indexOf(D) === -1 && (l.aliases[F].push(D), d[D] = !0);
            }
          }), l.aliases[F].concat(F).forEach(function(b) {
            if (b.length > 1 && /[A-Z]/.test(b) && u["camel-case-expansion"]) {
              const D = Ss(b, "-");
              D !== F && l.aliases[F].indexOf(D) === -1 && (l.aliases[F].push(D), d[D] = !0);
            }
          }), l.aliases[F].forEach(function(b) {
            l.aliases[b] = [F].concat(l.aliases[F].filter(function(D) {
              return b !== D;
            }));
          }));
        });
      });
    }
    function B(c, p) {
      const F = [].concat(l.aliases[c] || [], c), b = Object.keys(p), D = F.find((_) => b.includes(_));
      return D ? p[D] : !1;
    }
    function On(c) {
      const p = Object.keys(l);
      return [].concat(p.map((b) => l[b])).some(function(b) {
        return Array.isArray(b) ? b.includes(c) : b[c];
      });
    }
    function mr(c, ...p) {
      return [].concat(...p).some(function(b) {
        const D = c.match(b);
        return D && On(D[1]);
      });
    }
    function br(c) {
      if (c.match(w) || !c.match(/^-[^-]+/))
        return !1;
      let p = !0, F;
      const b = c.slice(1).split("");
      for (let D = 0; D < b.length; D++) {
        if (F = c.slice(D + 2), !On(b[D])) {
          p = !1;
          break;
        }
        if (b[D + 1] && b[D + 1] === "=" || F === "-" || /[A-Za-z]/.test(b[D]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(F) || b[D + 1] && b[D + 1].match(/\W/))
          break;
      }
      return p;
    }
    function Ie(c) {
      return u["unknown-options-as-args"] && Er(c);
    }
    function Er(c) {
      return c = c.replace(/^-{3,}/, "--"), c.match(w) || br(c) ? !1 : !mr(c, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function me(c) {
      return !B(c, l.bools) && !B(c, l.counts) && `${c}` in a ? a[c] : Cr(Fr(c));
    }
    function Cr(c) {
      return {
        [ie.BOOLEAN]: !0,
        [ie.STRING]: "",
        [ie.NUMBER]: void 0,
        [ie.ARRAY]: []
      }[c];
    }
    function Fr(c) {
      let p = ie.BOOLEAN;
      return B(c, l.strings) ? p = ie.STRING : B(c, l.numbers) ? p = ie.NUMBER : B(c, l.bools) ? p = ie.BOOLEAN : B(c, l.arrays) && (p = ie.ARRAY), p;
    }
    function ce(c) {
      return c === void 0;
    }
    function wr() {
      Object.keys(l.counts).find((c) => B(c, l.arrays) ? (v = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", c)), !0) : B(c, l.nargs) ? (v = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", c)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(M, R),
      configuration: u,
      defaulted: Object.assign({}, E),
      error: v,
      newAliases: Object.assign({}, d)
    };
  }
}
function Mo(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(r) {
    e.push([].concat(t[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < e.length; r++)
      for (let o = r + 1; o < e.length; o++)
        if (e[r].filter(function(u) {
          return e[o].indexOf(u) !== -1;
        }).length) {
          e[r] = e[r].concat(e[o]), e.splice(o, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(r) {
    r = r.filter(function(i, u, a) {
      return a.indexOf(i) === u;
    });
    const o = r.pop();
    o !== void 0 && typeof o == "string" && (n[o] = r);
  }), n;
}
function on(t) {
  return t !== void 0 ? t + 1 : 1;
}
function Zn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function ko(t) {
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
var un, an, cn;
const Kn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Jn = (an = (un = process == null ? void 0 : process.versions) === null || un === void 0 ? void 0 : un.node) !== null && an !== void 0 ? an : (cn = process == null ? void 0 : process.version) === null || cn === void 0 ? void 0 : cn.slice(1);
if (Jn && Number(Jn.match(/^([^.]+)/)[1]) < Kn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Kn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Io = process ? process.env : {}, Rs = new Wo({
  cwd: process.cwd,
  env: () => Io,
  format: gs,
  normalize: vr,
  resolve: Ce,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(mn(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Me = function(e, n) {
  return Rs.parse(e.slice(), n).argv;
};
Me.detailed = function(t, e) {
  return Rs.parse(t.slice(), e);
};
Me.camelCase = _e;
Me.decamelize = Ss;
Me.looksLikeNumber = Bs;
const Po = {
  right: qo,
  center: Zo
}, zo = 0, Ve = 1, Ho = 2, Ge = 3;
class Vo {
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
      this.div(...r.map((o, i) => ({
        text: o.trim(),
        padding: this.measurePadding(o),
        width: i === 0 && r.length > 1 ? s : void 0
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
      s.forEach((i, u) => {
        const { width: a } = e[u], h = this.negatePadding(e[u]);
        let f = i;
        if (h > Y.stringWidth(i) && (f += " ".repeat(h - Y.stringWidth(i))), e[u].align && e[u].align !== "left" && this.wrap) {
          const m = Po[e[u].align];
          f = m(f, h), Y.stringWidth(f) < h && (f += " ".repeat((a || 0) - Y.stringWidth(f) - 1));
        }
        const C = e[u].padding || [0, 0, 0, 0];
        C[Ge] && (o += " ".repeat(C[Ge])), o += Yn(e[u], f, "| "), o += f, o += Yn(e[u], f, " |"), C[Ve] && (o += " ".repeat(C[Ve])), r === 0 && n.length > 0 && (o = this.renderInline(o, n[n.length - 1]));
      }), n.push({
        text: o.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, o = n.text, i = Y.stringWidth(o.trimRight());
    return n.span ? this.wrap ? r < i ? e : (n.hidden = !0, o.trimRight() + " ".repeat(r - i) + e.trimLeft()) : (n.hidden = !0, o + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((o, i) => {
      o.width = s[i], this.wrap ? r = Y.wrap(o.text, this.negatePadding(o), { hard: !0 }).split(`
`) : r = o.text.split(`
`), o.border && (r.unshift("." + "-".repeat(this.negatePadding(o) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(o) + 2) + "'")), o.padding && (r.unshift(...new Array(o.padding[zo] || 0).fill("")), r.push(...new Array(o.padding[Ho] || 0).fill(""))), r.forEach((u, a) => {
        n[a] || n.push([]);
        const h = n[a];
        for (let f = 0; f < i; f++)
          h[f] === void 0 && h.push("");
        h.push(u);
      });
    }), n;
  }
  negatePadding(e) {
    let n = e.width || 0;
    return e.padding && (n -= (e.padding[Ge] || 0) + (e.padding[Ve] || 0)), e.border && (n -= 4), n;
  }
  columnWidths(e) {
    if (!this.wrap)
      return e.map((i) => i.width || Y.stringWidth(i.text));
    let n = e.length, s = this.width;
    const r = e.map((i) => {
      if (i.width)
        return n--, s -= i.width, i.width;
    }), o = n ? Math.floor(s / n) : 0;
    return r.map((i, u) => i === void 0 ? Math.max(o, Go(e[u])) : i);
  }
}
function Yn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Go(t) {
  const e = t.padding || [], n = 1 + (e[Ge] || 0) + (e[Ve] || 0);
  return t.border ? n + 4 : n;
}
function Uo() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function qo(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function Zo(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Y;
function Ko(t, e) {
  return Y = e, new Vo({
    width: t?.width || Uo(),
    wrap: t?.wrap
  });
}
const Os = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Ns(t) {
  return t.replace(Os, "");
}
function Jo(t, e) {
  const [n, s] = t.match(Os) || ["", ""];
  t = Ns(t);
  let r = "";
  for (let o = 0; o < t.length; o++)
    o !== 0 && o % e === 0 && (r += `
`), r += t.charAt(o);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Yo(t) {
  return Ko(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Ns,
    wrap: Jo
  });
}
function Qo(t, e) {
  let n = Ce(".", t), s;
  for (ms(n).isDirectory() || (n = fn(n)); ; ) {
    if (s = e(n, Rr(n)), s) return Ce(n, s);
    if (n = fn(s = n), s === n) break;
  }
}
const Xo = {
  fs: {
    readFileSync: mn,
    writeFile: Or
  },
  format: gs,
  resolve: Ce,
  exists: (t) => {
    try {
      return ms(t).isFile();
    } catch {
      return !1;
    }
  }
};
let oe;
class ei {
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
    })) : s(), oe.format.apply(oe.format, [this.cache[this.locale][n] || n].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), r = e.shift();
    let o = function() {
    };
    typeof e[e.length - 1] == "function" && (o = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let i = r === 1 ? n : s;
    this.cache[this.locale][n] && (i = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o();
    const u = [i];
    return ~i.indexOf("%d") && u.push(r), oe.format.apply(oe.format, u.concat(e));
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
      const i = n[o + 1];
      s += r, typeof i < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, r = n.locale, o = n.cb, i = this._resolveLocaleFile(s, r), u = JSON.stringify(this.cache[r], null, 2);
    oe.fs.writeFile(i, u, "utf-8", function(a) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), o(a);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      oe.fs.readFileSync && (e = JSON.parse(oe.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = oe.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const r = oe.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(e) {
    return oe.exists(e);
  }
}
function ti(t, e) {
  oe = e;
  const n = new ei(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const ni = (t) => ti(t, Xo), si = "require is not supported by ESM", Qn = "loading a directory of commands is not supported yet for ESM";
let Se;
try {
  Se = jr(import.meta.url);
} catch {
  Se = process.cwd();
}
const ri = Se.substring(0, Se.lastIndexOf("node_modules"));
Nr, Lr, yr, ri || process.cwd(), Ar, fn, Sr, Br, Ce, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, mn, ni({
  directory: Ce(Se, "../../../locales"),
  updateFiles: !1
});
var oi = Ls;
function Ls(t, e, n) {
  t instanceof RegExp && (t = Xn(t, n)), e instanceof RegExp && (e = Xn(e, n));
  var s = js(t, e, n);
  return s && {
    start: s[0],
    end: s[1],
    pre: n.slice(0, s[0]),
    body: n.slice(s[0] + t.length, s[1]),
    post: n.slice(s[1] + e.length)
  };
}
function Xn(t, e) {
  var n = e.match(t);
  return n ? n[0] : null;
}
Ls.range = js;
function js(t, e, n) {
  var s, r, o, i, u, a = n.indexOf(t), h = n.indexOf(e, a + 1), f = a;
  if (a >= 0 && h > 0) {
    if (t === e)
      return [a, h];
    for (s = [], o = n.length; f >= 0 && !u; )
      f == a ? (s.push(f), a = n.indexOf(t, f + 1)) : s.length == 1 ? u = [s.pop(), h] : (r = s.pop(), r < o && (o = r, i = h), h = n.indexOf(e, f + 1)), f = a < h && a >= 0 ? a : h;
    s.length && (u = [o, i]);
  }
  return u;
}
var Ts = oi, ii = ci, Ws = "\0SLASH" + Math.random() + "\0", Ms = "\0OPEN" + Math.random() + "\0", wn = "\0CLOSE" + Math.random() + "\0", ks = "\0COMMA" + Math.random() + "\0", Is = "\0PERIOD" + Math.random() + "\0";
function ln(t) {
  return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
}
function ui(t) {
  return t.split("\\\\").join(Ws).split("\\{").join(Ms).split("\\}").join(wn).split("\\,").join(ks).split("\\.").join(Is);
}
function ai(t) {
  return t.split(Ws).join("\\").split(Ms).join("{").split(wn).join("}").split(ks).join(",").split(Is).join(".");
}
function Ps(t) {
  if (!t)
    return [""];
  var e = [], n = Ts("{", "}", t);
  if (!n)
    return t.split(",");
  var s = n.pre, r = n.body, o = n.post, i = s.split(",");
  i[i.length - 1] += "{" + r + "}";
  var u = Ps(o);
  return o.length && (i[i.length - 1] += u.shift(), i.push.apply(i, u)), e.push.apply(e, i), e;
}
function ci(t) {
  return t ? (t.substr(0, 2) === "{}" && (t = "\\{\\}" + t.substr(2)), $e(ui(t), !0).map(ai)) : [];
}
function li(t) {
  return "{" + t + "}";
}
function hi(t) {
  return /^-?0\d/.test(t);
}
function fi(t, e) {
  return t <= e;
}
function Di(t, e) {
  return t >= e;
}
function $e(t, e) {
  var n = [], s = Ts("{", "}", t);
  if (!s) return [t];
  var r = s.pre, o = s.post.length ? $e(s.post, !1) : [""];
  if (/\$$/.test(s.pre))
    for (var i = 0; i < o.length; i++) {
      var u = r + "{" + s.body + "}" + o[i];
      n.push(u);
    }
  else {
    var a = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), h = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), f = a || h, C = s.body.indexOf(",") >= 0;
    if (!f && !C)
      return s.post.match(/,.*\}/) ? (t = s.pre + "{" + s.body + wn + s.post, $e(t)) : [t];
    var m;
    if (f)
      m = s.body.split(/\.\./);
    else if (m = Ps(s.body), m.length === 1 && (m = $e(m[0], !1).map(li), m.length === 1))
      return o.map(function(L) {
        return s.pre + m[0] + L;
      });
    var d;
    if (f) {
      var E = ln(m[0]), g = ln(m[1]), l = Math.max(m[0].length, m[1].length), w = m.length == 3 ? Math.abs(ln(m[2])) : 1, y = fi, v = g < E;
      v && (w *= -1, y = Di);
      var A = m.some(hi);
      d = [];
      for (var R = E; y(R, g); R += w) {
        var M;
        if (h)
          M = String.fromCharCode(R), M === "\\" && (M = "");
        else if (M = String(R), A) {
          var ue = l - M.length;
          if (ue > 0) {
            var re = new Array(ue + 1).join("0");
            R < 0 ? M = "-" + re + M.slice(1) : M = re + M;
          }
        }
        d.push(M);
      }
    } else {
      d = [];
      for (var H = 0; H < m.length; H++)
        d.push.apply(d, $e(m[H], !1));
    }
    for (var H = 0; H < d.length; H++)
      for (var i = 0; i < o.length; i++) {
        var u = r + d[H] + o[i];
        (!e || f || u) && n.push(u);
      }
  }
  return n;
}
const pi = /* @__PURE__ */ bs(ii), di = 1024 * 64, Ke = (t) => {
  if (typeof t != "string")
    throw new TypeError("invalid pattern");
  if (t.length > di)
    throw new TypeError("pattern is too long");
}, gi = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
  "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
  "[:ascii:]": ["\\x00-\\x7f", !1],
  "[:blank:]": ["\\p{Zs}\\t", !0],
  "[:cntrl:]": ["\\p{Cc}", !0],
  "[:digit:]": ["\\p{Nd}", !0],
  "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
  "[:lower:]": ["\\p{Ll}", !0],
  "[:print:]": ["\\p{C}", !0],
  "[:punct:]": ["\\p{P}", !0],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
  "[:upper:]": ["\\p{Lu}", !0],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
  "[:xdigit:]": ["A-Fa-f0-9", !1]
}, xe = (t) => t.replace(/[[\]\\-]/g, "\\$&"), mi = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), es = (t) => t.join(""), bi = (t, e) => {
  const n = e;
  if (t.charAt(n) !== "[")
    throw new Error("not in a brace expression");
  const s = [], r = [];
  let o = n + 1, i = !1, u = !1, a = !1, h = !1, f = n, C = "";
  e: for (; o < t.length; ) {
    const g = t.charAt(o);
    if ((g === "!" || g === "^") && o === n + 1) {
      h = !0, o++;
      continue;
    }
    if (g === "]" && i && !a) {
      f = o + 1;
      break;
    }
    if (i = !0, g === "\\" && !a) {
      a = !0, o++;
      continue;
    }
    if (g === "[" && !a) {
      for (const [l, [w, y, v]] of Object.entries(gi))
        if (t.startsWith(l, o)) {
          if (C)
            return ["$.", !1, t.length - n, !0];
          o += l.length, v ? r.push(w) : s.push(w), u = u || y;
          continue e;
        }
    }
    if (a = !1, C) {
      g > C ? s.push(xe(C) + "-" + xe(g)) : g === C && s.push(xe(g)), C = "", o++;
      continue;
    }
    if (t.startsWith("-]", o + 1)) {
      s.push(xe(g + "-")), o += 2;
      continue;
    }
    if (t.startsWith("-", o + 1)) {
      C = g, o += 2;
      continue;
    }
    s.push(xe(g)), o++;
  }
  if (f < o)
    return ["", !1, 0, !1];
  if (!s.length && !r.length)
    return ["$.", !1, t.length - n, !0];
  if (r.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !h) {
    const g = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [mi(g), !1, f - n, !1];
  }
  const m = "[" + (h ? "^" : "") + es(s) + "]", d = "[" + (h ? "" : "^") + es(r) + "]";
  return [s.length && r.length ? "(" + m + "|" + d + ")" : s.length ? m : d, u, f - n, !0];
}, ve = (t, { windowsPathsNoEscape: e = !1 } = {}) => e ? t.replace(/\[([^\/\\])\]/g, "$1") : t.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1"), Ei = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), ts = (t) => Ei.has(t), Ci = "(?!(?:^|/)\\.\\.?(?:$|/))", Pe = "(?!\\.)", Fi = /* @__PURE__ */ new Set(["[", "."]), wi = /* @__PURE__ */ new Set(["..", "."]), xi = new Set("().*{}+?[]^$\\!"), yi = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), xn = "[^/]", ns = xn + "*?", ss = xn + "+?";
class U {
  type;
  #n;
  #s;
  #o = !1;
  #e = [];
  #t;
  #i;
  #a;
  #u = !1;
  #r;
  #c;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #h = !1;
  constructor(e, n, s = {}) {
    this.type = e, e && (this.#s = !0), this.#t = n, this.#n = this.#t ? this.#t.#n : this, this.#r = this.#n === this ? s : this.#n.#r, this.#a = this.#n === this ? [] : this.#n.#a, e === "!" && !this.#n.#u && this.#a.push(this), this.#i = this.#t ? this.#t.#e.length : 0;
  }
  get hasMagic() {
    if (this.#s !== void 0)
      return this.#s;
    for (const e of this.#e)
      if (typeof e != "string" && (e.type || e.hasMagic))
        return this.#s = !0;
    return this.#s;
  }
  // reconstructs the pattern
  toString() {
    return this.#c !== void 0 ? this.#c : this.type ? this.#c = this.type + "(" + this.#e.map((e) => String(e)).join("|") + ")" : this.#c = this.#e.map((e) => String(e)).join("");
  }
  #D() {
    if (this !== this.#n)
      throw new Error("should only call on root");
    if (this.#u)
      return this;
    this.toString(), this.#u = !0;
    let e;
    for (; e = this.#a.pop(); ) {
      if (e.type !== "!")
        continue;
      let n = e, s = n.#t;
      for (; s; ) {
        for (let r = n.#i + 1; !s.type && r < s.#e.length; r++)
          for (const o of e.#e) {
            if (typeof o == "string")
              throw new Error("string part in extglob AST??");
            o.copyIn(s.#e[r]);
          }
        n = s, s = n.#t;
      }
    }
    return this;
  }
  push(...e) {
    for (const n of e)
      if (n !== "") {
        if (typeof n != "string" && !(n instanceof U && n.#t === this))
          throw new Error("invalid part: " + n);
        this.#e.push(n);
      }
  }
  toJSON() {
    const e = this.type === null ? this.#e.slice().map((n) => typeof n == "string" ? n : n.toJSON()) : [this.type, ...this.#e.map((n) => n.toJSON())];
    return this.isStart() && !this.type && e.unshift([]), this.isEnd() && (this === this.#n || this.#n.#u && this.#t?.type === "!") && e.push({}), e;
  }
  isStart() {
    if (this.#n === this)
      return !0;
    if (!this.#t?.isStart())
      return !1;
    if (this.#i === 0)
      return !0;
    const e = this.#t;
    for (let n = 0; n < this.#i; n++) {
      const s = e.#e[n];
      if (!(s instanceof U && s.type === "!"))
        return !1;
    }
    return !0;
  }
  isEnd() {
    if (this.#n === this || this.#t?.type === "!")
      return !0;
    if (!this.#t?.isEnd())
      return !1;
    if (!this.type)
      return this.#t?.isEnd();
    const e = this.#t ? this.#t.#e.length : 0;
    return this.#i === e - 1;
  }
  copyIn(e) {
    typeof e == "string" ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    const n = new U(this.type, e);
    for (const s of this.#e)
      n.copyIn(s);
    return n;
  }
  static #l(e, n, s, r) {
    let o = !1, i = !1, u = -1, a = !1;
    if (n.type === null) {
      let d = s, E = "";
      for (; d < e.length; ) {
        const g = e.charAt(d++);
        if (o || g === "\\") {
          o = !o, E += g;
          continue;
        }
        if (i) {
          d === u + 1 ? (g === "^" || g === "!") && (a = !0) : g === "]" && !(d === u + 2 && a) && (i = !1), E += g;
          continue;
        } else if (g === "[") {
          i = !0, u = d, a = !1, E += g;
          continue;
        }
        if (!r.noext && ts(g) && e.charAt(d) === "(") {
          n.push(E), E = "";
          const l = new U(g, n);
          d = U.#l(e, l, d, r), n.push(l);
          continue;
        }
        E += g;
      }
      return n.push(E), d;
    }
    let h = s + 1, f = new U(null, n);
    const C = [];
    let m = "";
    for (; h < e.length; ) {
      const d = e.charAt(h++);
      if (o || d === "\\") {
        o = !o, m += d;
        continue;
      }
      if (i) {
        h === u + 1 ? (d === "^" || d === "!") && (a = !0) : d === "]" && !(h === u + 2 && a) && (i = !1), m += d;
        continue;
      } else if (d === "[") {
        i = !0, u = h, a = !1, m += d;
        continue;
      }
      if (ts(d) && e.charAt(h) === "(") {
        f.push(m), m = "";
        const E = new U(d, f);
        f.push(E), h = U.#l(e, E, h, r);
        continue;
      }
      if (d === "|") {
        f.push(m), m = "", C.push(f), f = new U(null, n);
        continue;
      }
      if (d === ")")
        return m === "" && n.#e.length === 0 && (n.#h = !0), f.push(m), m = "", n.push(...C, f), h;
      m += d;
    }
    return n.type = null, n.#s = void 0, n.#e = [e.substring(s - 1)], h;
  }
  static fromGlob(e, n = {}) {
    const s = new U(null, void 0, n);
    return U.#l(e, s, 0, n), s;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#n)
      return this.#n.toMMPattern();
    const e = this.toString(), [n, s, r, o] = this.toRegExpSource();
    if (!(r || this.#s || this.#r.nocase && !this.#r.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase()))
      return s;
    const u = (this.#r.nocase ? "i" : "") + (o ? "u" : "");
    return Object.assign(new RegExp(`^${n}$`, u), {
      _src: n,
      _glob: e
    });
  }
  get options() {
    return this.#r;
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(e) {
    const n = e ?? !!this.#r.dot;
    if (this.#n === this && this.#D(), !this.type) {
      const a = this.isStart() && this.isEnd(), h = this.#e.map((d) => {
        const [E, g, l, w] = typeof d == "string" ? U.#p(d, this.#s, a) : d.toRegExpSource(e);
        return this.#s = this.#s || l, this.#o = this.#o || w, E;
      }).join("");
      let f = "";
      if (this.isStart() && typeof this.#e[0] == "string" && !(this.#e.length === 1 && wi.has(this.#e[0]))) {
        const E = Fi, g = (
          // dots are allowed, and the pattern starts with [ or .
          n && E.has(h.charAt(0)) || // the pattern starts with \., and then [ or .
          h.startsWith("\\.") && E.has(h.charAt(2)) || // the pattern starts with \.\., and then [ or .
          h.startsWith("\\.\\.") && E.has(h.charAt(4))
        ), l = !n && !e && E.has(h.charAt(0));
        f = g ? Ci : l ? Pe : "";
      }
      let C = "";
      return this.isEnd() && this.#n.#u && this.#t?.type === "!" && (C = "(?:$|\\/)"), [
        f + h + C,
        ve(h),
        this.#s = !!this.#s,
        this.#o
      ];
    }
    const s = this.type === "*" || this.type === "+", r = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let o = this.#f(n);
    if (this.isStart() && this.isEnd() && !o && this.type !== "!") {
      const a = this.toString();
      return this.#e = [a], this.type = null, this.#s = void 0, [a, ve(this.toString()), !1, !1];
    }
    let i = !s || e || n || !Pe ? "" : this.#f(!0);
    i === o && (i = ""), i && (o = `(?:${o})(?:${i})*?`);
    let u = "";
    if (this.type === "!" && this.#h)
      u = (this.isStart() && !n ? Pe : "") + ss;
    else {
      const a = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !n && !e ? Pe : "") + ns + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && i ? ")" : this.type === "*" && i ? ")?" : `)${this.type}`;
      u = r + o + a;
    }
    return [
      u,
      ve(o),
      this.#s = !!this.#s,
      this.#o
    ];
  }
  #f(e) {
    return this.#e.map((n) => {
      if (typeof n == "string")
        throw new Error("string type in extglob ast??");
      const [s, r, o, i] = n.toRegExpSource(e);
      return this.#o = this.#o || i, s;
    }).filter((n) => !(this.isStart() && this.isEnd()) || !!n).join("|");
  }
  static #p(e, n, s = !1) {
    let r = !1, o = "", i = !1;
    for (let u = 0; u < e.length; u++) {
      const a = e.charAt(u);
      if (r) {
        r = !1, o += (xi.has(a) ? "\\" : "") + a;
        continue;
      }
      if (a === "\\") {
        u === e.length - 1 ? o += "\\\\" : r = !0;
        continue;
      }
      if (a === "[") {
        const [h, f, C, m] = bi(e, u);
        if (C) {
          o += h, i = i || f, u += C - 1, n = n || m;
          continue;
        }
      }
      if (a === "*") {
        s && e === "*" ? o += ss : o += ns, n = !0;
        continue;
      }
      if (a === "?") {
        o += xn, n = !0;
        continue;
      }
      o += yi(a);
    }
    return [o, ve(e), !!n, i];
  }
}
const _i = (t, { windowsPathsNoEscape: e = !1 } = {}) => e ? t.replace(/[?*()[\]]/g, "[$&]") : t.replace(/[?*()[\]\\]/g, "\\$&"), z = (t, e, n = {}) => (Ke(e), !n.nocomment && e.charAt(0) === "#" ? !1 : new zt(e, n).match(t)), $i = /^\*+([^+@!?\*\[\(]*)$/, vi = (t) => (e) => !e.startsWith(".") && e.endsWith(t), Ai = (t) => (e) => e.endsWith(t), Si = (t) => (t = t.toLowerCase(), (e) => !e.startsWith(".") && e.toLowerCase().endsWith(t)), Bi = (t) => (t = t.toLowerCase(), (e) => e.toLowerCase().endsWith(t)), Ri = /^\*+\.\*+$/, Oi = (t) => !t.startsWith(".") && t.includes("."), Ni = (t) => t !== "." && t !== ".." && t.includes("."), Li = /^\.\*+$/, ji = (t) => t !== "." && t !== ".." && t.startsWith("."), Ti = /^\*+$/, Wi = (t) => t.length !== 0 && !t.startsWith("."), Mi = (t) => t.length !== 0 && t !== "." && t !== "..", ki = /^\?+([^+@!?\*\[\(]*)?$/, Ii = ([t, e = ""]) => {
  const n = zs([t]);
  return e ? (e = e.toLowerCase(), (s) => n(s) && s.toLowerCase().endsWith(e)) : n;
}, Pi = ([t, e = ""]) => {
  const n = Hs([t]);
  return e ? (e = e.toLowerCase(), (s) => n(s) && s.toLowerCase().endsWith(e)) : n;
}, zi = ([t, e = ""]) => {
  const n = Hs([t]);
  return e ? (s) => n(s) && s.endsWith(e) : n;
}, Hi = ([t, e = ""]) => {
  const n = zs([t]);
  return e ? (s) => n(s) && s.endsWith(e) : n;
}, zs = ([t]) => {
  const e = t.length;
  return (n) => n.length === e && !n.startsWith(".");
}, Hs = ([t]) => {
  const e = t.length;
  return (n) => n.length === e && n !== "." && n !== "..";
}, Vs = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", rs = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
}, Vi = Vs === "win32" ? rs.win32.sep : rs.posix.sep;
z.sep = Vi;
const ee = Symbol("globstar **");
z.GLOBSTAR = ee;
const Gi = "[^/]", Ui = Gi + "*?", qi = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", Zi = "(?:(?!(?:\\/|^)\\.).)*?", Ki = (t, e = {}) => (n) => z(n, t, e);
z.filter = Ki;
const X = (t, e = {}) => Object.assign({}, t, e), Ji = (t) => {
  if (!t || typeof t != "object" || !Object.keys(t).length)
    return z;
  const e = z;
  return Object.assign((s, r, o = {}) => e(s, r, X(t, o)), {
    Minimatch: class extends e.Minimatch {
      constructor(r, o = {}) {
        super(r, X(t, o));
      }
      static defaults(r) {
        return e.defaults(X(t, r)).Minimatch;
      }
    },
    AST: class extends e.AST {
      /* c8 ignore start */
      constructor(r, o, i = {}) {
        super(r, o, X(t, i));
      }
      /* c8 ignore stop */
      static fromGlob(r, o = {}) {
        return e.AST.fromGlob(r, X(t, o));
      }
    },
    unescape: (s, r = {}) => e.unescape(s, X(t, r)),
    escape: (s, r = {}) => e.escape(s, X(t, r)),
    filter: (s, r = {}) => e.filter(s, X(t, r)),
    defaults: (s) => e.defaults(X(t, s)),
    makeRe: (s, r = {}) => e.makeRe(s, X(t, r)),
    braceExpand: (s, r = {}) => e.braceExpand(s, X(t, r)),
    match: (s, r, o = {}) => e.match(s, r, X(t, o)),
    sep: e.sep,
    GLOBSTAR: ee
  });
};
z.defaults = Ji;
const Gs = (t, e = {}) => (Ke(t), e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : pi(t));
z.braceExpand = Gs;
const Yi = (t, e = {}) => new zt(t, e).makeRe();
z.makeRe = Yi;
const Qi = (t, e, n = {}) => {
  const s = new zt(e, n);
  return t = t.filter((r) => s.match(r)), s.options.nonull && !t.length && t.push(e), t;
};
z.match = Qi;
const os = /[?*]|[+@!]\(.*?\)|\[|\]/, Xi = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
class zt {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(e, n = {}) {
    Ke(e), n = n || {}, this.options = n, this.pattern = e, this.platform = n.platform || Vs, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!n.windowsPathsNoEscape || n.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!n.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!n.nonegate, this.comment = !1, this.empty = !1, this.partial = !!n.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = n.windowsNoMagicRoot !== void 0 ? n.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1)
      return !0;
    for (const e of this.set)
      for (const n of e)
        if (typeof n != "string")
          return !0;
    return !1;
  }
  debug(...e) {
  }
  make() {
    const e = this.pattern, n = this.options;
    if (!n.nocomment && e.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!e) {
      this.empty = !0;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], n.debug && (this.debug = (...o) => console.error(...o)), this.debug(this.pattern, this.globSet);
    const s = this.globSet.map((o) => this.slashSplit(o));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let r = this.globParts.map((o, i, u) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const a = o[0] === "" && o[1] === "" && (o[2] === "?" || !os.test(o[2])) && !os.test(o[3]), h = /^[a-z]:/i.test(o[0]);
        if (a)
          return [...o.slice(0, 4), ...o.slice(4).map((f) => this.parse(f))];
        if (h)
          return [o[0], ...o.slice(1).map((f) => this.parse(f))];
      }
      return o.map((a) => this.parse(a));
    });
    if (this.debug(this.pattern, r), this.set = r.filter((o) => o.indexOf(!1) === -1), this.isWindows)
      for (let o = 0; o < this.set.length; o++) {
        const i = this.set[o];
        i[0] === "" && i[1] === "" && this.globParts[o][2] === "?" && typeof i[3] == "string" && /^[a-z]:$/i.test(i[3]) && (i[2] = "?");
      }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(e) {
    if (this.options.noglobstar)
      for (let s = 0; s < e.length; s++)
        for (let r = 0; r < e[s].length; r++)
          e[s][r] === "**" && (e[s][r] = "*");
    const { optimizationLevel: n = 1 } = this.options;
    return n >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : n >= 1 ? e = this.levelOneOptimize(e) : e = this.adjascentGlobstarOptimize(e), e;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(e) {
    return e.map((n) => {
      let s = -1;
      for (; (s = n.indexOf("**", s + 1)) !== -1; ) {
        let r = s;
        for (; n[r + 1] === "**"; )
          r++;
        r !== s && n.splice(s, r - s);
      }
      return n;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(e) {
    return e.map((n) => (n = n.reduce((s, r) => {
      const o = s[s.length - 1];
      return r === "**" && o === "**" ? s : r === ".." && o && o !== ".." && o !== "." && o !== "**" ? (s.pop(), s) : (s.push(r), s);
    }, []), n.length === 0 ? [""] : n));
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let n = !1;
    do {
      if (n = !1, !this.preserveMultipleSlashes) {
        for (let r = 1; r < e.length - 1; r++) {
          const o = e[r];
          r === 1 && o === "" && e[0] === "" || (o === "." || o === "") && (n = !0, e.splice(r, 1), r--);
        }
        e[0] === "." && e.length === 2 && (e[1] === "." || e[1] === "") && (n = !0, e.pop());
      }
      let s = 0;
      for (; (s = e.indexOf("..", s + 1)) !== -1; ) {
        const r = e[s - 1];
        r && r !== "." && r !== ".." && r !== "**" && (n = !0, e.splice(s - 1, 2), s -= 2);
      }
    } while (n);
    return e.length === 0 ? [""] : e;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(e) {
    let n = !1;
    do {
      n = !1;
      for (let s of e) {
        let r = -1;
        for (; (r = s.indexOf("**", r + 1)) !== -1; ) {
          let i = r;
          for (; s[i + 1] === "**"; )
            i++;
          i > r && s.splice(r + 1, i - r);
          let u = s[r + 1];
          const a = s[r + 2], h = s[r + 3];
          if (u !== ".." || !a || a === "." || a === ".." || !h || h === "." || h === "..")
            continue;
          n = !0, s.splice(r, 1);
          const f = s.slice(0);
          f[r] = "**", e.push(f), r--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < s.length - 1; i++) {
            const u = s[i];
            i === 1 && u === "" && s[0] === "" || (u === "." || u === "") && (n = !0, s.splice(i, 1), i--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (n = !0, s.pop());
        }
        let o = 0;
        for (; (o = s.indexOf("..", o + 1)) !== -1; ) {
          const i = s[o - 1];
          if (i && i !== "." && i !== ".." && i !== "**") {
            n = !0;
            const a = o === 1 && s[o + 1] === "**" ? ["."] : [];
            s.splice(o - 1, 2, ...a), s.length === 0 && s.push(""), o -= 2;
          }
        }
      }
    } while (n);
    return e;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(e) {
    for (let n = 0; n < e.length - 1; n++)
      for (let s = n + 1; s < e.length; s++) {
        const r = this.partsMatch(e[n], e[s], !this.preserveMultipleSlashes);
        if (r) {
          e[n] = [], e[s] = r;
          break;
        }
      }
    return e.filter((n) => n.length);
  }
  partsMatch(e, n, s = !1) {
    let r = 0, o = 0, i = [], u = "";
    for (; r < e.length && o < n.length; )
      if (e[r] === n[o])
        i.push(u === "b" ? n[o] : e[r]), r++, o++;
      else if (s && e[r] === "**" && n[o] === e[r + 1])
        i.push(e[r]), r++;
      else if (s && n[o] === "**" && e[r] === n[o + 1])
        i.push(n[o]), o++;
      else if (e[r] === "*" && n[o] && (this.options.dot || !n[o].startsWith(".")) && n[o] !== "**") {
        if (u === "b")
          return !1;
        u = "a", i.push(e[r]), r++, o++;
      } else if (n[o] === "*" && e[r] && (this.options.dot || !e[r].startsWith(".")) && e[r] !== "**") {
        if (u === "a")
          return !1;
        u = "b", i.push(n[o]), r++, o++;
      } else
        return !1;
    return e.length === n.length && i;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const e = this.pattern;
    let n = !1, s = 0;
    for (let r = 0; r < e.length && e.charAt(r) === "!"; r++)
      n = !n, s++;
    s && (this.pattern = e.slice(s)), this.negate = n;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(e, n, s = !1) {
    const r = this.options;
    if (this.isWindows) {
      const g = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), l = !g && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), w = typeof n[0] == "string" && /^[a-z]:$/i.test(n[0]), y = !w && n[0] === "" && n[1] === "" && n[2] === "?" && typeof n[3] == "string" && /^[a-z]:$/i.test(n[3]), v = l ? 3 : g ? 0 : void 0, A = y ? 3 : w ? 0 : void 0;
      if (typeof v == "number" && typeof A == "number") {
        const [R, M] = [e[v], n[A]];
        R.toLowerCase() === M.toLowerCase() && (n[A] = R, A > v ? n = n.slice(A) : v > A && (e = e.slice(v)));
      }
    }
    const { optimizationLevel: o = 1 } = this.options;
    o >= 2 && (e = this.levelTwoFileOptimize(e)), this.debug("matchOne", this, { file: e, pattern: n }), this.debug("matchOne", e.length, n.length);
    for (var i = 0, u = 0, a = e.length, h = n.length; i < a && u < h; i++, u++) {
      this.debug("matchOne loop");
      var f = n[u], C = e[i];
      if (this.debug(n, f, C), f === !1)
        return !1;
      if (f === ee) {
        this.debug("GLOBSTAR", [n, f, C]);
        var m = i, d = u + 1;
        if (d === h) {
          for (this.debug("** at the end"); i < a; i++)
            if (e[i] === "." || e[i] === ".." || !r.dot && e[i].charAt(0) === ".")
              return !1;
          return !0;
        }
        for (; m < a; ) {
          var E = e[m];
          if (this.debug(`
globstar while`, e, m, n, d, E), this.matchOne(e.slice(m), n.slice(d), s))
            return this.debug("globstar found match!", m, a, E), !0;
          if (E === "." || E === ".." || !r.dot && E.charAt(0) === ".") {
            this.debug("dot detected!", e, m, n, d);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), m++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, e, m, n, d), m === a));
      }
      let g;
      if (typeof f == "string" ? (g = C === f, this.debug("string match", f, C, g)) : (g = f.test(C), this.debug("pattern match", f, C, g)), !g)
        return !1;
    }
    if (i === a && u === h)
      return !0;
    if (i === a)
      return s;
    if (u === h)
      return i === a - 1 && e[i] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Gs(this.pattern, this.options);
  }
  parse(e) {
    Ke(e);
    const n = this.options;
    if (e === "**")
      return ee;
    if (e === "")
      return "";
    let s, r = null;
    (s = e.match(Ti)) ? r = n.dot ? Mi : Wi : (s = e.match($i)) ? r = (n.nocase ? n.dot ? Bi : Si : n.dot ? Ai : vi)(s[1]) : (s = e.match(ki)) ? r = (n.nocase ? n.dot ? Pi : Ii : n.dot ? zi : Hi)(s) : (s = e.match(Ri)) ? r = n.dot ? Ni : Oi : (s = e.match(Li)) && (r = ji);
    const o = U.fromGlob(e, this.options).toMMPattern();
    return r && typeof o == "object" && Reflect.defineProperty(o, "test", { value: r }), o;
  }
  makeRe() {
    if (this.regexp || this.regexp === !1)
      return this.regexp;
    const e = this.set;
    if (!e.length)
      return this.regexp = !1, this.regexp;
    const n = this.options, s = n.noglobstar ? Ui : n.dot ? qi : Zi, r = new Set(n.nocase ? ["i"] : []);
    let o = e.map((a) => {
      const h = a.map((f) => {
        if (f instanceof RegExp)
          for (const C of f.flags.split(""))
            r.add(C);
        return typeof f == "string" ? Xi(f) : f === ee ? ee : f._src;
      });
      return h.forEach((f, C) => {
        const m = h[C + 1], d = h[C - 1];
        f !== ee || d === ee || (d === void 0 ? m !== void 0 && m !== ee ? h[C + 1] = "(?:\\/|" + s + "\\/)?" + m : h[C] = s : m === void 0 ? h[C - 1] = d + "(?:\\/|" + s + ")?" : m !== ee && (h[C - 1] = d + "(?:\\/|\\/" + s + "\\/)" + m, h[C + 1] = ee));
      }), h.filter((f) => f !== ee).join("/");
    }).join("|");
    const [i, u] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    o = "^" + i + o + u + "$", this.negate && (o = "^(?!" + o + ").+$");
    try {
      this.regexp = new RegExp(o, [...r].join(""));
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  slashSplit(e) {
    return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^\/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
  }
  match(e, n = this.partial) {
    if (this.debug("match", e, this.pattern), this.comment)
      return !1;
    if (this.empty)
      return e === "";
    if (e === "/" && n)
      return !0;
    const s = this.options;
    this.isWindows && (e = e.split("\\").join("/"));
    const r = this.slashSplit(e);
    this.debug(this.pattern, "split", r);
    const o = this.set;
    this.debug(this.pattern, "set", o);
    let i = r[r.length - 1];
    if (!i)
      for (let u = r.length - 2; !i && u >= 0; u--)
        i = r[u];
    for (let u = 0; u < o.length; u++) {
      const a = o[u];
      let h = r;
      if (s.matchBase && a.length === 1 && (h = [i]), this.matchOne(h, a, n))
        return s.flipNegate ? !0 : !this.negate;
    }
    return s.flipNegate ? !1 : this.negate;
  }
  static defaults(e) {
    return z.defaults(e).Minimatch;
  }
}
z.AST = U;
z.Minimatch = zt;
z.escape = _i;
z.unescape = ve;
let Us = !1;
const eu = (t) => {
  Us = t;
}, hn = () => Us;
let qs = !1;
const tu = (t) => {
  qs = t;
}, nu = () => qs, de = {
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
    "computedSideEffects",
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlImageElements",
    "htmlLink",
    "hugeFiles",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "nestedTernary",
    "noDirectDomAccess",
    "noInlineStyles",
    "noPropDestructure",
    "noSkippedTests",
    "noTsLang",
    "noVarDeclaration",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ],
  security: [
    "apiWithoutMethod",
    "rateLimiter"
  ]
}, yn = Object.keys(de), su = 1.5, is = 75, us = 85, as = 95, ru = "\x1B]8;;", ou = "\x1B\\", iu = "\x1B]8;;\x1B\\", uu = [...Object.values(de).flat()], Zs = [...yn, ...uu], au = [
  "getElementById",
  "getElementsByClassName",
  "getElementsByTagName",
  "querySelector",
  "querySelectorAll"
], _n = ["index.vue", "app.vue"], cu = {
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
  maxFileSize: 300,
  topLevelElementOrder: "script-template-style"
}, lu = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((d, { errors: E, warnings: g }) => ({ errors: d.errors + E, warnings: d.warnings + g }), { errors: 0, warnings: 0 }), o = [], i = { errors: s, warnings: r, linesCount: e, filesCount: n, points: 0 };
  if (o.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` }), !e)
    return i.points = 0, o.push({ info: `Code Health can not be calculated, because there is no code in the given files
` }), { codeHealth: i, output: o };
  const u = Math.ceil((1 - (s * su + r) / e) * 100);
  i.points = u;
  const a = 60, h = r ? Math.max(1, Math.ceil(r / e * a)) : 0, f = s ? Math.max(1, a - Math.ceil(u * a / 100) - h) : 0, C = a - f - h, m = `<bg_ok>${"_".repeat(C)}</bg_ok><bg_warn>${"_".repeat(h)}</bg_warn><bg_err>${"_".repeat(f)}</bg_err>`;
  return o.push({ info: `Code Health: [${m}] ${u}%
` }), u < is && o.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= is && u < us && o.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= us && u < as && o.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= as && o.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { codeHealth: i, output: o };
}, Ks = async (t) => {
  const e = {
    path: "./src",
    apply: Object.values(yn).join(","),
    ignore: "",
    exclude: "",
    group: "rule",
    level: "all",
    sort: "desc",
    output: "text",
    override: cu
  }, n = P.join(t, "vue-mess-detector.json");
  try {
    const s = await pe.readFile(n, "utf-8"), r = JSON.parse(s);
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
}, $n = async (t) => {
  let e = t;
  for (; e !== P.parse(e).root; ) {
    const n = P.join(e, "package.json");
    try {
      return await pe.access(n), e;
    } catch {
      e = P.dirname(e);
    }
  }
  throw new Error("Project root not found");
};
function hu(t) {
  const e = [], n = [];
  return Object.entries(de).forEach(([s, r]) => {
    if (r.every((o) => t.includes(o)))
      e.push(s);
    else {
      const o = r.filter((i) => t.includes(i));
      n.push(...o);
    }
  }), { rulesets: e, individualRules: n };
}
const fu = (t) => {
  const e = P.join(t, "server");
  return It.existsSync(e);
}, Js = async (t) => {
  let e = "";
  if (!t) {
    const s = Wr(import.meta.url), r = P.dirname(s), o = P.resolve(r, "..");
    e = P.join(o, "package.json");
  }
  return t && (e = P.join(t, "package.json")), JSON.parse(await pe.readFile(e, "utf-8"));
}, vn = async () => await $n(process?.cwd() || "./") || "", Ys = async (t, e) => {
  const n = await vn(), s = P.join(n, "package.json");
  return It.existsSync(s) ? !!(await Js(e)).dependencies[t] : !1;
}, Qs = async (t) => {
  const e = await vn(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await Ys("nuxt", t) || n.some((s) => It.existsSync(P.join(e, s)));
}, Du = async (t) => {
  const e = await vn(), n = ["vue.config.js", "vue.config.ts"];
  return !await Qs(t) && (await Ys("vue", t) || n.some((r) => It.existsSync(P.join(e, r))));
}, T = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((u, a) => a >= n && u.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((i, u) => i + u.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Be = [], pu = () => Be.length = 0, du = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const i = o.split(`
`).length, u = T(t.content, o);
    if (i > n * 2) {
      Be.push({
        filePath: e,
        message: `line #${u} <bg_err>has a v-if with ${i} lines</bg_err>`
      });
      return;
    }
    i > n && Be.push({
      filePath: e,
      message: `line #${u} <bg_warn>has a v-if with ${i} lines</bg_warn>`
    });
  });
}, gu = () => {
  const t = [];
  return Be.length > 0 && Be.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), pu(), t;
}, Re = [], mu = () => Re.length = 0, bu = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((o) => {
    const i = o.split(`
`).length, u = T(t.content, o);
    if (i > n * 2) {
      Re.push({
        filePath: e,
        message: `line #${u} <bg_err>has a v-show with ${i} lines</bg_err>`
      });
      return;
    }
    i > n && Re.push({
      filePath: e,
      message: `line #${u} <bg_warn>has a v-show with ${i} lines</bg_warn>`
    });
  });
}, Eu = () => {
  const t = [];
  return Re.length > 0 && Re.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), mu(), t;
}, Cu = /^(\(.*\)|\\?.)$/;
function fe(t) {
  const e = t.toString();
  return Cu.test(e) ? e : `(?:${e})`;
}
const Fu = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, wu = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function S(t) {
  const e = (n) => S(`(?<${n}>${`${t}`.replace(Fu, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => S(`${t}${W(...n)}`), {
      referenceTo: (n) => S(`${t}\\k<${n}>`)
    }),
    or: (...n) => S(`(?:${t}|${W(...n)})`),
    after: (...n) => S(`(?<=${W(...n)})${t}`),
    before: (...n) => S(`${t}(?=${W(...n)})`),
    notAfter: (...n) => S(`(?<!${W(...n)})${t}`),
    notBefore: (...n) => S(`${t}(?!${W(...n)})`),
    times: Object.assign((n) => S(`${fe(t)}{${n}}`), {
      any: () => S(`${fe(t)}*`),
      atLeast: (n) => S(`${fe(t)}{${n},}`),
      atMost: (n) => S(`${fe(t)}{0,${n}}`),
      between: (n, s) => S(`${fe(t)}{${n},${s}}`)
    }),
    optionally: () => S(`${fe(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => S(`${t}`.replace(wu, "($1$3)$2")),
    at: {
      lineStart: () => S(`^${t}`),
      lineEnd: () => S(`${t}$`)
    }
  };
}
const xu = /[.*+?^${}()|[\]\\/]/g;
function Oe(t) {
  return S(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function K(t) {
  return S(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function Ee(...t) {
  return S(`(?:${t.map((e) => W(e)).join("|")})`);
}
const Ne = S(".");
S("\\b\\w+\\b");
const ne = S("\\w"), q = S("\\b"), yu = S("\\d"), k = S("\\s"), Xs = Object.assign(S("[a-zA-Z]"), {
  lowercase: S("[a-z]"),
  uppercase: S("[A-Z]")
}), er = S("\\t"), tr = S("\\n");
S("\\r");
S("\\W+"), S("\\W"), S("\\B"), S("\\D"), S("\\S"), Object.assign(S("[^a-zA-Z]"), {
  lowercase: S("[^a-z]"),
  uppercase: S("[^A-Z]")
}), S("[^\\t]"), S("[^\\n]"), S("[^\\r]");
function te(...t) {
  return S(`${fe(W(...t))}?`);
}
function W(...t) {
  return S(
    t.map((e) => typeof e == "string" ? e.replace(xu, "\\$&") : e).join("")
  );
}
function O(...t) {
  return S(`${fe(W(...t))}+`);
}
const De = "i", j = "g", N = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(W(...t).toString(), [...e || ""].join(""));
}, Z = (t) => {
  const e = N(
    W("/*").and(K("*").times.any(), te(`
`).as("newline"), W("*").notBefore("/").or(O(K("*")))).and("*/").or(
      W("//").and(O(Ne))
    ).or(
      W("<!--").and(O(Ne))
    ),
    [j]
  );
  return t.replace(e, (n) => {
    const s = n.match(/\n/g);
    return s ? s.join("") : "";
  });
}, Je = [], _u = () => Je.length = 0, $u = (t, e, n) => {
  const { script: s, template: r } = t;
  if (!s && !r)
    return;
  const o = 2 * n, i = N(
    Ee(
      "if",
      'v-if="',
      O(Ne).groupedAs("condition").and("?").and(O(Ne)).and(":"),
      // ternary
      "="
    ).and(
      O(
        Ee(
          "&&",
          "||",
          K(`"'`)
        )
      )
    ),
    [j]
  ), u = N(
    Ee("&&", "||"),
    [j]
  ), a = (h, f) => {
    h = Z(h);
    const C = h.match(i);
    C && C.forEach((m) => {
      const d = (m.match(u) || []).length + 1;
      if (d > n) {
        const E = T(h, m);
        Je.push({
          filePath: e,
          message: `line #${E} ${d > o ? "<bg_err>" : "<bg_warn>"}${f} has a complicated condition with ${d} blocks${d > o ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  s && a(s.content, "script"), r && a(r.content, "template");
}, vu = () => {
  const t = [];
  return Je.length > 0 && Je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), _u(), t;
}, Ye = [], Au = () => Ye.length = 0, Su = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((o) => {
    const i = o[1];
    if (s.test(i)) {
      const u = T(t.content.trim(), o[0]), a = i.trim(), h = a.length > 20 ? a.slice(0, 20) : a;
      Ye.push({
        filePath: e,
        message: `line #${u} side effect detected in computed property <bg_err>(${h})</bg_err>`
      });
    }
  });
}, Bu = () => {
  const t = [];
  return Ye.length > 0 && Ye.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), Au(), t;
}, Qe = [], Ru = () => Qe.length = 0, Ou = (t, e, n) => {
  if (!t)
    return;
  const s = 2 * n, r = N(q, "if", q, [j, De]), o = N(q, "else", q, [j, De]), i = N(q, "for", q, [j, De]), u = N(q, "while", q, [j, De]), a = N(q, "case", q, [j, De]), h = Z(t.content), f = h.match(r), C = h.match(o), m = h.match(i), d = h.match(u), E = h.match(a), g = (f?.length || 0) + (C?.length || 0) + (m?.length || 0) + (d?.length || 0) + (E?.length || 0);
  g > n && Qe.push({ filePath: e, message: `Cyclomatic complexity is ${g > s ? "<bg_err>very high" : "<bg_warn>high"} (${g})${g > s ? "</bg_err>" : "</bg_warn>"}` });
}, Nu = () => {
  const t = [];
  return Qe.length > 0 && Qe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), Ru(), t;
}, Xe = [], Lu = 3, ju = () => Xe.length = 0, Tu = (t, e, n) => {
  if (!t)
    return;
  const s = N(er.times.atLeast(n).at.lineStart().or(k.times.atLeast(Lu * n).at.lineStart()), [j]), o = Z(t.content).match(s);
  let i = 0;
  o?.forEach((u) => {
    const a = T(t.content, u, i);
    Xe.push({
      filePath: e,
      message: `line #${a} <bg_warn>indentation: ${u.length}</bg_warn>`
    }), i = a;
  });
}, Wu = () => {
  const t = [];
  return Xe.length > 0 && Xe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), ju(), t;
}, et = [], Mu = () => et.length = 0, ku = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/'[^']*'|"[^"]*"/g, ""), s = Z(n), r = N(q, "else", q, [j]), o = s.match(r);
  o?.length && et.push({ filePath: e, message: `else clauses found <bg_err>(${o.length})</bg_err>` });
}, Iu = () => {
  const t = [];
  return et.length > 0 && et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), Mu(), t;
}, Le = [], Pu = 5, zu = 8;
function Hu({ funcName: t, funcBody: e, lineNumber: n, filePath: s, max: r }) {
  const o = e.split(`
`).length, i = Uu(t);
  if (o > 2 * r) {
    Le.push({ filePath: s, message: `function <bg_err>(${i}#${n})</bg_err> is too long: <bg_err>${o} lines</bg_err>` });
    return;
  }
  o >= r && Le.push({ filePath: s, message: `function <bg_warn>(${i}#${n})</bg_warn> is too long: <bg_warn>${o} lines</bg_warn>` });
}
function Vu(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], o = n.lastIndex;
    let i = 1, u = o;
    for (; i > 0 && u < t.length; )
      t[u] === "{" ? i++ : t[u] === "}" && i--, u++;
    const a = t.slice(o, u - 1).trim();
    return {
      name: r,
      body: a,
      end: u
      // Returns the position after the matched function
    };
  } else
    return null;
}
function Gu(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, o] = r, i = e + r.index + r[0].length;
    let u = i, a = "";
    if (t[i] === "{") {
      let h = 1;
      for (u = i + 1; u < t.length && h > 0; )
        t[u] === "{" ? h++ : t[u] === "}" && h--, u++;
      a = t.slice(i + 1, u - 1).trim();
    } else {
      for (; u < t.length && t[u] !== ";"; )
        u++;
      a = t.slice(i, u).trim();
    }
    return {
      name: o,
      body: a,
      end: u
      // Position after the end of the function body
    };
  } else
    return null;
}
function Uu(t) {
  return t.replace(/^const\s*/, "");
}
const qu = () => Le.length = 0, Zu = (t, e, n) => {
  if (!t)
    return;
  const s = t.content, r = s.length;
  let o = 0;
  for (; o < r; ) {
    let i = "", u = "", a = !1;
    if (s.slice(o, o + zu) === "function") {
      const h = Vu(s, o);
      h && (a = !0, i = h.name, u = h.body, o = h.end);
    }
    if (s.slice(o, o + Pu) === "const") {
      const h = Gu(s, o);
      h && (a = !0, i = h.name, u = h.body, o = h.end);
    }
    if (a) {
      const h = T(s.trim(), i);
      Hu({ funcName: i, funcBody: u, lineNumber: h, filePath: e, max: n });
    } else
      o++;
  }
}, Ku = (t) => {
  const e = [];
  return Le.length > 0 && Le.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${n.message} 🚨`
    });
  }), qu(), e;
}, tt = [], Ju = () => tt.length = 0, Yu = (t, e) => {
  if (!t)
    return;
  const n = N("<", W("img").or("picture"), [j]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((o) => {
      const i = T(t.content, o, r), u = o.slice(1);
      tt.push({
        filePath: e,
        message: `line #${i} <bg_warn>${u} element found</bg_warn>`
      }), r = i;
    });
  }
}, Qu = () => {
  const t = [];
  return tt.length > 0 && tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), Ju(), t;
}, nt = [], Xu = () => nt.length = 0, ea = (t, e) => {
  if (!t)
    return;
  const n = Z(t.content), s = N("<a", q, [j, De]), r = n.match(s);
  r?.length && nt.push({ filePath: e, message: `${r?.length} <bg_warn>html link found</bg_warn>` });
}, ta = () => {
  const t = [];
  return nt.length > 0 && nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), Xu(), t;
}, je = [], na = () => je.length = 0, sa = (t, e, n, s) => {
  const r = 2 * s;
  let o = 0;
  n ? (o = t.scriptSetup?.content.trim().split(`
`).length ?? 0, o += t.template?.content.trim().split(`
`).length ?? 0, o += t.styles?.reduce((i, u) => i + u.content.trim().split(`
`).length, 0) ?? 0) : o = t.scriptSetup?.content.trim().split(`
`).length ?? 0, o > r ? je.push({
    filePath: e,
    message: `<bg_err>huge file (${o} lines)</bg_err>`
  }) : o > s && je.push({
    filePath: e,
    message: `<bg_warn>large file (${o} lines)</bg_warn>`
  });
}, ra = () => {
  const t = [];
  return je.length > 0 && je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ huge files</text_info>",
      description: "👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html",
      message: `${e.message} 🚨`
    });
  }), na(), t;
}, st = [], oa = () => st.length = 0, ia = (t, e) => {
  if (!t)
    return;
  const s = Z(t.content).split(`
`);
  let r = 0, o = null;
  s.forEach((i, u) => {
    const a = i.trim();
    if (r += (a.match(/\(/g) || []).length, r -= (a.match(/\)/g) || []).length, a.startsWith("if (") && o === null && (o = u), o !== null && r === 0) {
      const h = s.slice(o, u + 1).join(" ");
      if (!h.includes("{")) {
        const f = s[u + 1]?.trim();
        (!f || !f.startsWith("{") && !a.endsWith("{")) && st.push({
          filePath: e,
          message: `line #${o} if statement without curly braces: <bg_err>${h.trim()}</bg_err>`
        });
      }
      o = null;
    }
  });
}, ua = () => {
  const t = [];
  return st.length > 0 && st.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), oa(), t;
}, rt = [], aa = () => rt.length = 0, ca = (t, e) => {
  if (!t)
    return;
  const n = N(
    te(O(Ne)),
    Ee(q),
    O(yu).as("magicNumber"),
    Ee(")", tr),
    [j]
  );
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    if (s[0].trim().startsWith("const") || s[0].trim().startsWith("let"))
      return;
    const o = s.groups?.magicNumber, i = Number.parseInt(o ?? "0");
    if (i > 1) {
      const u = T(t.content, String(i), r);
      rt.push({
        filePath: e,
        message: `line #${u} <bg_warn>magic number: ${i}</bg_warn>`
      }), r = u;
    }
  }
}, la = () => {
  const t = [];
  return rt.length && rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), aa(), t;
}, ot = [], ha = () => ot.length = 0, fa = (t, e) => {
  if (!t)
    return;
  Z(t.content.trim()).split(`
`).forEach((r, o) => {
    (r.match(/\?(?![.?])/g) || []).length > 1 && ot.push({
      filePath: e,
      message: `line #${o + 1} has <bg_warn>nested ternary</bg_warn>`
    });
  });
}, Da = () => {
  const t = [];
  return ot.length > 0 && ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), ha(), t;
}, it = [], pa = () => it.length = 0, da = (t, e) => {
  if (!t)
    return;
  const n = N(
    q,
    Ee(...au.map((r) => W(r))),
    "(",
    [j]
  );
  t.content.match(n)?.forEach((r) => {
    const o = T(t.content.trim(), r);
    it.push({
      filePath: e,
      message: `line #${o} <bg_warn>Direct DOM access detected: ${r}</bg_warn>`
    });
  });
}, ga = () => {
  const t = [];
  return it.length > 0 && it.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no direct dom access</text_info>",
      description: "👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html",
      message: `${e.message} 🚨`
    });
  }), pa(), t;
}, ut = [], ma = () => ut.length = 0, ba = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((o) => {
    const i = T(t.content.trim(), o[0], r);
    ut.push({
      filePath: e,
      message: `line #${i} <bg_warn>Found inline style: ${o[0]}</bg_warn>`
    }), r = i;
  });
}, Ea = () => {
  const t = [];
  return ut.length > 0 && ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), ma(), t;
}, at = [], Ca = () => at.length = 0, Fa = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  Z(t.content).match(n)?.forEach((o) => {
    const i = T(t.content, o);
    at.push({
      filePath: e,
      message: `line #${i} <bg_warn>props destructuring found: ${o}</bg_warn>`
    });
  });
}, wa = () => {
  const t = [];
  return at.length > 0 && at.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), Ca(), t;
}, ct = [], xa = () => ct.length = 0, ya = (t, e) => {
  if (!t)
    return;
  const n = N(".", W("skipIf").or("skip").or("todo").grouped(), [j]);
  Z(t.content.trim()).split(`
`).forEach((o, i) => {
    const u = o.match(n);
    u && ct.push({
      filePath: e,
      message: `line #${i + 1} <bg_warn>skip test found: "${u[0]}"</bg_warn>`
    });
  });
}, _a = () => {
  const t = [];
  return ct.length > 0 && ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no skipped tests</text_info>",
      description: "👉 <text_warn>Skipped or todo tests were found. These should be addressed before merging.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-skipped-tests.html",
      message: `${e.message} 🚨`
    });
  }), xa(), t;
}, lt = [], $a = () => lt.length = 0, va = (t, e) => {
  t && (["ts", "tsx"].includes(t.lang) || lt.push({
    filePath: e,
    message: "<bg_warn>component uses js instead of ts</bg_warn>"
  }));
}, Aa = () => {
  const t = [];
  return lt.length > 0 && lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no ts lang</text_info>",
      description: "👉 <text_warn>Use typescript instead of javascript.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-ts-lang.html",
      message: `${e.message} 🚨`
    });
  }), $a(), t;
}, ht = [], Sa = () => ht.length = 0, Ba = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  Z(t.content).match(n)?.forEach((o) => {
    const i = T(t.content, o);
    ht.push({
      filePath: e,
      message: `line #${i} <bg_warn>Avoid using 'var' for variable declarations: ${o}</bg_warn>`
    });
  });
}, Ra = () => {
  const t = [];
  return ht.length > 0 && ht.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), Sa(), t;
}, ft = [], Oa = () => ft.length = 0, cs = (t, e, n, s) => {
  const r = e.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  r.length > s && ft.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${r.length}</bg_warn> parameters` });
}, Na = (t, e, n) => {
  if (!t)
    return;
  const s = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; )
    r[1] && cs(r[1], r[2], e, n), r[3] && cs(r[3], r[4], e, n);
}, La = (t) => {
  const e = [];
  return ft.length > 0 && ft.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${n.message} 🚨`
    });
  }), Oa(), e;
}, Dt = [], ja = () => Dt.length = 0, Ta = (t, e) => {
  !t || t.setup || Dt.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, Wa = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), ja(), t;
}, pt = [], Ma = () => pt.length = 0, ka = (t, e) => {
  if (!t)
    return;
  const n = N(
    "defineProps(",
    k.times.any(),
    "[",
    k.times.any(),
    O(Oe(`'"`), O(ne), Oe(`'"`), k.times.any(), te(",", k.times.any())),
    "]",
    k.times.any(),
    ")",
    [j]
  ), s = N(
    "<",
    O(ne).grouped(),
    k,
    K(">").times.any(),
    ":",
    O(ne).grouped(),
    k.times.any(),
    "=",
    k.times.any(),
    '"props.',
    O(ne).grouped(),
    '"',
    [j]
  );
  let r;
  const o = /* @__PURE__ */ new Set(), i = Z(t.content);
  for (; (r = n.exec(i)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((h) => o.add(h));
  let u;
  for (; (u = s.exec(t.content)) !== null; ) {
    const a = u[1], h = u[2], f = u[3];
    o.has(f) && h === f && pt.push({
      filePath: e,
      message: `Prop <bg_warn>(${f})</bg_warn> is being drilled through <bg_warn>${a}</bg_warn> component unmodified.`
    });
  }
}, Ia = () => {
  const t = [];
  return pt.length > 0 && pt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Ma(), t;
}, dt = [], Pa = () => dt.length = 0, za = (t, e, n) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.length > n && dt.push({ filePath: e, message: `${s.length > n * 2 ? "<bg_err>" : "<bg_warn>"}(${s.length} lines)${s.length > n * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, Ha = (t) => {
  const e = [];
  return dt.length > 0 && dt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${n.message} 🚨`
    });
  }), Pa(), e;
}, gt = [], Va = () => gt.length = 0, Ga = ["i", "key"], Ua = (t, e, n) => {
  if (!t)
    return;
  const s = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const o = r[1];
    o.length < n && !Ga.includes(o) && gt.push({ filePath: e, message: `variable: <bg_warn>(${o})</bg_warn>` });
  }
}, qa = (t) => {
  const e = [];
  return gt.length > 0 && gt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${n.message} 🚨`
    });
  }), Va(), e;
}, mt = [], Za = () => mt.length = 0, Ka = (t, e, n) => {
  if (!t)
    return;
  const s = N("defineProps", te("<"), te("("), "{", O(K("}")), "}", ["g", "s"]), o = Z(t.content).match(s);
  if (o?.length) {
    const i = o[0].split(",").length;
    i > n && mt.push({ filePath: e, message: `props found <bg_err>(${i})</bg_err>` });
  }
}, Ja = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), Za(), t;
}, bt = [], Ya = () => bt.length = 0, Qa = (t, e) => {
  if (!t)
    return;
  const n = N('v-for="(', k.times.any(), O(ne).grouped(), k.times.any(), ",", k.times.any(), O(ne).grouped(), k.times.any(), ")", O(k), "in", O(k), O(ne).grouped(), [j]), s = N(':key="', k.times.any(), O(ne).grouped(), k.times.any(), '"', [j]), r = [...t.content.matchAll(n)], o = [...t.content.matchAll(s)];
  r.forEach((i) => {
    const [u, a, h, f] = i;
    o.forEach((C) => {
      const m = C[1];
      if (m === h) {
        const d = T(t.content.trim(), m);
        bt.push({
          filePath: e,
          message: `line #${d} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, Xa = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), Ya(), t;
}, Et = [], ec = () => Et.length = 0, tc = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  const r = Z(t.content);
  for (; (s = n.exec(r)) !== null; ) {
    const o = s[0], i = s[1], u = T(r.trim(), o);
    Et.push({
      filePath: e,
      message: `line #${u} zero length comparison found <bg_warn>(${i})</bg_warn>`
    });
  }
}, nc = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Zero Length Comparison</text_info>",
      description: "👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html",
      message: `${e.message} 🚨`
    });
  }), ec(), t;
}, Ct = [], sc = ["get", "post", "put", "delete", "patch", "options", "head"], rc = () => Ct.length = 0, oc = (t, e) => {
  if (!e.includes("/server/api/"))
    return;
  const n = e.replace(/\.[^/.]+$/, "");
  if (sc.some((i) => n.toLowerCase().endsWith(`.${i}`)))
    return;
  const r = t.source;
  N(
    W("if"),
    O(" "),
    "(",
    W("event.node.req.method"),
    O(" "),
    "!="
  ).test(r) || Ct.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, ic = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    const n = e.filePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ API endpoint without HTTP method</text_info>",
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${n}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/api-without-method.html`,
      message: `${e.message} 🚨`
    });
  }), rc(), t;
}, Ft = [], uc = () => Ft.length = 0, ac = ["nuxt-api-shield", "nuxt-security"], cc = async (t, e) => {
  !t || e != "package.json" || ac.some((n) => t.source.includes(n)) || Ft.push({
    filePath: e,
    message: "<bg_warn>No rate limiter detected</bg_warn>"
  });
}, lc = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>security ~ rate Limiter</text_info>",
      description: "👉 <text_warn>Use a rate limiter, like nuxt-api-shield or nuxt-security.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/rate-limiter.html",
      message: `${e.message} 🚨`
    });
  }), uc(), t;
}, hc = [
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
], wt = [], fc = () => wt.length = 0, Dc = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const o = r[1];
      hc.includes(o) && wt.push({ filePath: e, message: `<bg_warn>(${o})</bg_warn>` });
    }
  });
}, pc = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), fc(), t;
}, Te = [], dc = () => Te.length = 0, gc = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(W("$parent").or("getCurrentInstance"), [j]), o = t.content.match(n), i = t.content.match(s);
  if (i) {
    const a = i[1].split(".")[0];
    if ((o ? o[1] : "").includes(a)) {
      const f = T(t.content.trim(), a);
      Te.push({
        filePath: e,
        message: `line #${f} <bg_warn>(${a})</bg_warn>`
      });
    }
  }
  const u = t.content.match(r);
  if (u) {
    const a = T(t.content.trim(), u[0]);
    Te.push({
      filePath: e,
      message: `line #${a} <bg_warn>(${u[0]})</bg_warn>`
    });
  }
}, mc = () => {
  const t = [];
  return Te.length > 0 && Te.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), dc(), t;
}, xt = [], bc = () => xt.length = 0, Ec = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || xt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, Cc = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), bc(), t;
}, yt = [], Fc = () => yt.length = 0, wc = (t, e) => {
  if (!t)
    return;
  const n = Z(t.content), s = N("defineProps", k.times.any(), "(", k.times.any(), "[", [j]);
  n.match(s)?.length && yt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, xc = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), Fc(), t;
}, _t = [], yc = () => _t.length = 0, _c = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = P.basename(t);
  if (_n.includes(e.toLowerCase()) || e.startsWith("[") && e.endsWith("].vue"))
    return;
  const n = N(Xs.uppercase);
  e.slice(1).match(n)?.length || _t.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, $c = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), yc(), t;
}, $t = [], vc = () => $t.length = 0, Ac = (t, e) => {
  if (!t)
    return;
  const n = /<[^>]+\sv-for\s*=\s*["'][^"']+["'][^>]*>/gi, s = t.content.match(n);
  s?.length && s.forEach((r) => {
    !r.includes(":key") && !r.includes("v-bind:key") && $t.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" });
  });
}, Sc = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), vc(), t;
}, vt = [], Bc = () => vt.length = 0, Rc = (t, e) => {
  if (!t)
    return;
  const n = N(
    "<",
    O(K(">")),
    " v-if",
    O(K(">")),
    " v-for",
    O(K(">")),
    ">",
    [j, De]
  ), s = N(
    "<",
    O(K(">")),
    " v-for",
    O(K(">")),
    " v-if",
    O(K(">")),
    ">",
    [j, De]
  ), r = t.content.match(n), o = t.content.match(s);
  if (r?.length || o?.length) {
    const i = r?.length ? r[0] : o?.length ? o[0] : "", u = T(t.content, i);
    vt.push({ filePath: e, message: `line #${u} <bg_err>v-if used with v-for</bg_err>` });
  }
}, Oc = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), Bc(), t;
}, At = [], ls = [
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
], Nc = () => At.length = 0, Lc = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let o;
  for (; (o = s.exec(n)) !== null; ) {
    const i = o[1], u = o[2];
    if (u) {
      const h = Array.from(u.matchAll(r), (C) => C[1]).filter((C) => ls.includes(C));
      let f = -1;
      for (const C of h) {
        const m = ls.indexOf(C);
        if (m !== -1 && m < f) {
          At.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${i})</bg_warn>`
          });
          break;
        }
        f = m;
      }
    }
  }
}, jc = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), Nc(), t;
}, St = [], Tc = () => St.length = 0, Wc = (t, e, n) => {
  const s = t.toString(), o = (n === "script-template-style" ? ["script setup", "template", "style scoped"] : ["template", "script setup", "style scoped"]).map((u) => ({
    name: u,
    index: s.indexOf(`<${u}>`)
  })).filter((u) => u.index !== -1);
  o.every((u, a) => a === 0 ? !0 : o[a - 1].index < u.index) || St.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, Mc = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script setup>, <template>, and <style scoped> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), Tc(), t;
}, Bt = [], kc = () => Bt.length = 0, Ic = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = P.basename(t);
  if (_n.includes(e.toLowerCase()) || e.startsWith("[") && e.endsWith("].vue"))
    return;
  const n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, o = e.match(r);
  !s?.length && !o?.length && Bt.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, Pc = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), kc(), t;
}, Rt = [], zc = () => Rt.length = 0, Hc = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const o = T(t.content.trim(), r), i = r.split(`
`).at(0)?.trim() || "";
    Rt.push({ filePath: e, message: `line #${o} <bg_warn>(${i})</bg_warn>` });
  });
}, Vc = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), zc(), t;
}, Ot = [], hs = [], Gc = ["v-slot", "v-bind", "v-on"], Uc = () => Ot.length = 0, qc = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Gc.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = T(t.source, s);
      Ot.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), hs.some((o) => o.filePath === e) || hs.push({ filePath: e });
    }
  });
}, Zc = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), Uc(), t;
}, Nt = [], Kc = () => Nt.length = 0, Jc = (t, e) => {
  const n = P.basename(t);
  if (_n.includes(n.toLowerCase()))
    return;
  const s = n?.split(".vue")[0];
  if (n.startsWith("[") && n.endsWith("].vue"))
    return;
  const r = N(
    Oe("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
    [j]
  ), o = s.match(r);
  (!o || o.length < e) && Nt.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
}, Yc = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), Kc(), t;
}, Lt = [], Qc = () => Lt.length = 0, Xc = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], o = s[2];
    o.split(/\s+/).filter((u) => u.trim() !== "").length > 1 && o.split(`
`).length === 1 && Lt.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, el = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Qc(), t;
};
function tl(t) {
  const e = /['"]?([\w-]+)['"]?\s*:|(\w+)\s*:/g, n = [];
  let s;
  for (; (s = e.exec(t)) !== null; ) {
    const r = s[1] || s[2];
    n.push(r);
  }
  return n;
}
const jt = [], nl = /^[a-z]+([A-Z][a-z]*)*$/, sl = () => jt.length = 0, rl = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\s*\(\s*(\{[\s\S]*?\})\s*\)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    tl(r).filter((u) => !nl.test(u)).length && jt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
  }
}, ol = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), sl(), t;
}, Tt = [], il = () => Tt.length = 0, ul = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    O(ne),
    te(O(Oe(` 	
\r`))),
    O(K("/>")),
    te(O(Oe(` 	
\r`))),
    te("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const o = N(":", O(ne), te(" "), "=", te(" "), K(`'"`), [
    "g"
  ]);
  r?.forEach((i) => {
    if (!i.includes(":"))
      return;
    const u = i.match(o);
    if (u?.length) {
      const a = T(t.source, i);
      Tt.push({ filePath: e, message: `line #${a} <bg_warn>${u}</bg_warn>` });
    }
  });
}, al = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), il(), t;
}, Wt = [], cl = () => Wt.length = 0, ll = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    O(Xs.uppercase, ne),
    te(tr, er),
    te(O(K(">"))),
    "></",
    O(ne),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((o) => {
    const i = T(t.source, o), u = o.split(`
`).at(-1)?.trim() || "";
    Wt.push({ filePath: e, message: `line #${i} <bg_warn>${u}</bg_warn>` });
  });
}, hl = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), cl(), t;
}, An = [], Ue = [], fl = () => An.length = 0, Dl = (t, e, n) => {
  if (!t)
    return;
  const s = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, o = Z(t.content).match(s);
  o?.length && o.forEach((i) => {
    if (i.split(`
`).length > n) {
      const u = i.split(`
`)[0], a = T(t.content, u);
      An.push({ filePath: e, message: `line #${a} <bg_warn>computed</bg_warn>` }), Ue.push({ filePath: e }), Ue.some((h) => h.filePath === e) || Ue.push({ filePath: e });
    }
  });
}, pl = () => {
  const t = [];
  return Ue.length > 0 && An.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), fl(), t;
}, Mt = [], dl = () => Mt.length = 0, gl = (t, e, n) => {
  if (!t)
    return;
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(s)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > n) {
      const i = T(t.content, o), u = o.split(`
`).at(0)?.trim() || "";
      Mt.push({
        filePath: e,
        message: `line #${i} <bg_warn>${u}</bg_warn>`
      });
    }
  });
}, ml = () => {
  const t = [];
  return Mt.length > 0 && Mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), dl(), t;
}, bl = (t, e, n, s) => {
  const r = t.scriptSetup || t.script, o = e.endsWith(".vue"), i = {
    // vue-essential
    simpleProp: () => wc(r, e),
    singleNameComponent: () => o && _c(e),
    globalStyle: () => o && Ec(t.styles, e),
    vforNoKey: () => o && Ac(t.template, e),
    vifWithVfor: () => o && Rc(t.template, e),
    // vue-strong
    simpleComputed: () => Dl(r, e, s.maxComputedLength),
    componentFiles: () => o && Hc(r, e),
    propNameCasing: () => o && rl(r, e),
    componentFilenameCasing: () => o && Ic(e),
    selfClosingComponents: () => o && ll(t, e),
    templateSimpleExpression: () => o && gl(t.template, e, s.maxExpressionLength),
    quotedAttributeValues: () => o && ul(t, e),
    directiveShorthands: () => o && qc(t, e),
    fullWordComponentName: () => o && Jc(e, s.minimumConsonantCount),
    multiAttributeElements: () => o && Xc(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => o && Wc(t.source, e, s.topLevelElementOrder),
    elementAttributeOrder: () => o && Lc(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => o && gc(r, e),
    elementSelectorsWithScoped: () => o && Dc(t.styles, e),
    // rrd
    bigVif: () => du(t.template, e, s.maxVifLines),
    bigVShow: () => bu(t.template, e, s.maxVshowLines),
    complicatedConditions: () => $u(t, e, s.warningThreshold),
    cyclomaticComplexity: () => Ou(r, e, s.complexityModerate),
    computedSideEffects: () => Su(r, e),
    deepIndentation: () => Tu(r, e, s.maxTabs),
    elseCondition: () => ku(r, e),
    functionSize: () => Zu(r, e, s.maxFunctionSize),
    htmlImageElements: () => hn() && Yu(t.template, e),
    htmlLink: () => o && ea(t.template, e),
    hugeFiles: () => sa(t, e, o, s.maxFileSize),
    ifWithoutCurlyBraces: () => ia(r, e),
    magicNumbers: () => ca(r, e),
    nestedTernary: () => fa(r, e),
    noDirectDomAccess: () => da(r, e),
    noInlineStyles: () => ba(t.template, e),
    noPropDestructure: () => Fa(r, e),
    noSkippedTests: () => ya(r, e),
    noTsLang: () => o && va(r, e),
    noVarDeclaration: () => Ba(r, e),
    parameterCount: () => Na(r, e, s.maxParameterCount),
    plainScript: () => o && Ta(t.script, e),
    propsDrilling: () => ka(r, e),
    scriptLength: () => za(r, e, s.maxScriptLength),
    shortVariableName: () => Ua(r, e, s.minVariableName),
    tooManyProps: () => Ka(r, e, s.maxPropsCount),
    vForWithIndexKey: () => o && Qa(t.template, e),
    zeroLengthComparison: () => tc(r, e),
    // security
    apiWithoutMethod: () => hn() && oc(t, e),
    rateLimiter: () => nu() && hn() && cc(t, e)
  };
  n.forEach((u) => {
    u in de && de[u].forEach((a) => {
      a in i && i[a]();
    }), u in i && i[u]();
  });
}, El = (t, e, n, s) => {
  const r = {}, o = {}, i = [], u = ({ file: f, rule: C, title: m, description: d, message: E }) => {
    const g = t === "rule" ? C : f;
    r[g] || (r[g] = []), r[g].push({ file: f, rule: C, title: m, description: d, message: E });
  }, a = (f) => {
    f().forEach((m) => {
      u(m);
    });
  };
  return a($c), a(xc), a(Sc), a(Oc), a(Cc), a(Pc), a(Vc), a(Zc), a(Yc), a(el), a(ol), a(al), a(hl), a(pl), a(ml), a(Mc), a(jc), a(mc), a(pc), a(gu), a(Eu), a(vu), a(Nu), a(Bu), a(Wu), a(Iu), a(() => Ku(s.maxFunctionSize)), a(Qu), a(ta), a(ra), a(ua), a(la), a(Da), a(ga), a(Ea), a(wa), a(_a), a(Aa), a(Ra), a(() => La(s.maxParameterCount)), a(Wa), a(Ia), a(() => Ha(s.maxScriptLength)), a(() => qa(s.minVariableName)), a(Ja), a(Xa), a(nc), a(ic), a(lc), Object.keys(r).sort((f, C) => {
    const m = r[f].length, d = r[C].length;
    return e === "desc" ? d - m : m - d;
  }).forEach((f) => {
    o[f] = [], r[f].forEach((C, m) => {
      const d = C.message.includes("<bg_err>");
      if (i.some((E) => E.file === C.file)) {
        const E = i.find((g) => g.file === C.file);
        E && d && E.errors++, E && !d && E.warnings++;
      } else
        i.push({ file: C.file, errors: d ? 1 : 0, warnings: d ? 0 : 1, output: [] });
      n === "error" && !d || (o[f][m] = { id: "", description: "", message: "", level: d ? "error" : "warning" }, t === "file" && (o[f][m].id = C.rule), t !== "file" && (o[f][m].id = C.file), o[f][m].description = C.description, o[f][m].message = C.message || "🚨");
    });
  }), { output: o, health: i };
};
let qe = 0, gn = 0, nr = [], sr = {};
const Cl = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], Sn = [], fs = async (t, e) => {
  if (!Sn.some((n) => z(e, n, { matchBase: !0 })) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js") || t.endsWith("package.json"))) {
    qe++;
    const n = await pe.readFile(e, "utf-8");
    gn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Tr(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), bl(s, e, nr, sr), `Analyzing ${e}...`;
  }
}, rr = async (t) => {
  const e = [];
  if (!(await pe.stat(t)).isDirectory()) {
    const r = await fs(t, t);
    return r && e.push(r), e;
  }
  const s = await pe.readdir(t);
  for (const r of s) {
    const o = P.join(t, r);
    if ((await pe.stat(o)).isDirectory() && !Cl.some((a) => o.includes(a)) && !Sn.some((a) => z(o, a))) {
      const a = await rr(o);
      a && e.push(...a);
    }
    const u = await fs(o, o);
    u && e.push(u);
  }
  return e;
}, Fl = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s = "", groupBy: r = "rule", level: o = "all", sortBy: i = "desc" }) => {
  qe = 0, gn = 0;
  const u = await $n(t), a = await Ks(u);
  e = e.length ? e : a.apply.split(","), n = n.length ? n : a.ignore ? a.ignore.split(",") : [], s = s || a.exclude, r = r || a.group, o = o || a.level, i = i || a.sort, sr = a.override;
  const h = e.filter((Q) => !n.includes(Q)), { rulesets: f, individualRules: C } = hu(h), m = f.length ? `<bg_info>${f.join(", ")}</bg_info>` : "N/A", d = C.length ? `<bg_info>${C.join(", ")}</bg_info>` : "N/A";
  let E = `      Applying ${f.length} rulesets: ${m}`;
  C.length > 0 && (E += `
      Applying ${C.length} individual rules: ${d}`);
  const g = n.filter((Q) => !f.includes(Q)), l = g.length ? `<bg_info>${g.join(", ")}</bg_info>` : "N/A", w = await Du(u), y = await Qs(u);
  eu(y);
  const v = fu(u);
  tu(v);
  const A = [];
  A.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` });
  const R = a.isDefault ? "👉 Using <bg_info>default</bg_info> configuration" : "👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>";
  A.push({ info: R }), A.push({ info: `      Project type: <bg_info>${y ? "Nuxt" : ""}${w ? "Vue" : ""}${!y && !w ? "?" : ""}</bg_info>` }), A.push({
    info: `${E}
      Ignoring ${g.length} rules: ${l}
      Excluding ${s || "-"}
      Output level <bg_info>${o}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${i}</bg_info>`
  }), nr = e.filter((Q) => !n.includes(Q)), s && Sn.push(...s.split(",").map((Q) => Q.trim()));
  const M = await rr(t);
  A.push(...M.map((Q) => ({ info: Q }))), A.push({ info: `Found <bg_info>${qe}</bg_info> files` });
  const { health: ue, output: re } = El(r, i, o, a.override), { codeHealth: H, output: L } = lu(ue, gn, qe);
  return !H.errors && !H.warnings && A.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: A, codeHealthOutput: L, reportOutput: re, codeHealth: H };
}, or = "\x1B[44m", wl = "\x1B[43m", ge = "\x1B[41m", xl = "\x1B[42m", se = "\x1B[0m", ir = "\x1B[33m", ur = "\x1B[36m", kt = "\x1B[0m", Ds = (t) => t.replace(/<bg_err>/g, ge).replace(/<bg_warn>/g, wl).replace(/<bg_info>/g, or).replace(/<bg_ok>/g, xl).replace(/<\/bg_err>/g, se).replace(/<\/bg_warn>/g, se).replace(/<\/bg_info>/g, se).replace(/<\/bg_ok>/g, se).replace(/<text_warn>/g, ir).replace(/<text_info>/g, ur).replace(/<\/text_warn>/g, kt).replace(/<\/text_info>/g, kt), yl = (t, e) => {
  const n = t.some((r) => r.startsWith("--ignore") || r.startsWith("-i")), s = t.some((r) => r.startsWith("--apply") || r.startsWith("-a"));
  n && s && (console.error(`${ge}Cannot use both --ignore and --apply options together.${se}`), process.exit(1)), e.apply && e.ignore && (console.error(`${ge}Cannot use both --ignore and --apply options together in the vue-mess-detector.json config file.${se}`), process.exit(1));
}, ps = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(de) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((o) => {
    yn.includes(o) ? s.push(...de[o]) : Object.values(de).some((i) => i.includes(o)) ? s.push(o) : r.push(o);
  }), r.length > 0 && (console.error(
    `
${ge}Invalid ${t} values: ${r.join(", ")}${se}. 
${ir}Allowed values are: ${Zs.join(", ")}${kt}

`
  ), process.exit(1)), s;
};
function ds(t, e) {
  return `${ru}file://${P.resolve(t)}${ou}${t}${iu}`;
}
const ar = ["rule", "file"], cr = ["asc", "desc"], lr = ["text", "json", "table"], hr = ["all", "error"], _l = {
  groupBy: ar,
  sortBy: cr,
  outputLevel: hr,
  outputFormat: lr
}, ze = (t, e) => {
  const n = _l[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${ge}${t}${se} provided for flag ${ur}${e}${kt}. Valid options are: ${or}${n.join(", ")}${se}.
`
  ), process.exit(1)), t;
}, $l = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4];
$n($l || "./src").then(async (t) => {
  const e = await Ks(t);
  yl(process.argv, e), Js().then(
    (n) => $r(Lo(process.argv)).config(e).command(
      "analyze [path]",
      "Analyze Vue files for code smells and best practices",
      (s) => s.positional("path", {
        describe: "path to the Vue files",
        default: "./src"
      }).option("apply", {
        alias: "a",
        describe: "Comma-separated list of rulesets/rules to apply.",
        choices: Zs,
        coerce: ps("apply"),
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
        choices: ar,
        coerce: (r) => ze(r, "groupBy"),
        default: "",
        group: "Group Results:"
      }).option("level", {
        alias: "l",
        describe: "Output level",
        choices: hr,
        coerce: (r) => ze(r, "outputLevel"),
        default: "",
        group: "Output:"
      }).option("ignore", {
        alias: "i",
        describe: "Comma-separated list of rulesets to ignore.",
        coerce: ps("ignore"),
        default: "",
        group: "Filter Rulesets:"
      }).option("sort", {
        alias: "s",
        describe: "Sort results at the output",
        choices: cr,
        coerce: (r) => ze(r, "sortBy"),
        default: "",
        group: "Sort Results:"
      }).option("output", {
        describe: "Output format",
        choices: lr,
        coerce: (r) => ze(r, "outputFormat"),
        default: "",
        group: "Output Format:"
      }).option("fileOutput", {
        alias: "f",
        describe: "Output file",
        default: "",
        group: "Output:"
      }).option("healthError", {
        describe: "Health error threshold",
        default: 0,
        group: "Health:"
      }),
      (s) => {
        const r = s.fileOutput, o = (i) => r ? (pe.appendFile(r, `${i}
`), i) : (console.log(Ds(i)), Ds(i));
        Fl({
          dir: s.path,
          apply: s.apply,
          ignore: s.ignore,
          exclude: s.exclude,
          groupBy: s.group,
          level: s.level,
          sortBy: s.sort
        }).then((i) => {
          if (s.output == "text") {
            [...i.output].forEach((u) => {
              o(u.info);
            });
            for (const u in i.reportOutput) {
              let a = u;
              s.group === "file" && (a = ds(u)), o(`
- <text_info> ${a}</text_info>`), i.reportOutput[u].forEach((h) => {
                let f = h.id;
                s.group === "rule" && (f = ds(h.id)), o(`   ${f}`), o(`   ${h.description}`), o(`   ${h.message}
`);
              });
            }
            i.codeHealthOutput?.forEach((u) => {
              o(u.info);
            });
          }
          if (s.output == "table") {
            r && (console.log(`We can not output ${ge}to a file in table mode${se}`), process.exit(1)), [...i.output].forEach((u) => {
              o(u.info);
            });
            for (const u in i.reportOutput) {
              const a = new Ro({
                head: ["id", "message"],
                colWidths: [60, 60],
                wordWrap: !0,
                wrapOnWordBoundary: !1
              });
              o("-".repeat(120)), s.group == "rule" && (o(`<text_info>Rule: ${u}</text_info>`), o(`Description: ${i.reportOutput[u][0].description}`), i.reportOutput[u].forEach((h) => {
                a.push([o(h.id), o(h.message)]);
              })), s.group == "file" && (o(`<text_info>File: ${u}</text_info>`), i.reportOutput[u].forEach((h) => {
                a.push([`${h.id}
${h.description.replace("See: ", `See:
`)}`, h.message]);
              })), o(a.toString());
            }
            i.codeHealthOutput?.forEach((u) => {
              o(u.info);
            });
          }
          s.output == "json" && o(JSON.stringify(i, null, 2)), i.codeHealth.points < s.healthError && (console.error(`${ge}Health error threshold (${s.healthError}) exceeded: ${i.codeHealth.points}${se}`), process.exit(1));
        }).catch((i) => {
          console.error(`${ge}${i}${se}`);
        });
      }
    ).version("version", "Show version number", n.version).alias("version", "v").help().argv
  );
});
export {
  uu as FLAT_RULES,
  Fl as analyze
};
