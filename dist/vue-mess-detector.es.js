import pe from "node:fs/promises";
import wr, { format as ds, inspect as xr } from "util";
import yr from "os";
import _r from "yargs";
import { normalize as $r, resolve as Ee, dirname as hn, basename as vr, extname as Ar, relative as Sr } from "path";
import { readFileSync as gn, statSync as gs, readdirSync as Br, writeFile as Rr } from "fs";
import { notStrictEqual as Or, strictEqual as Nr } from "assert";
import { fileURLToPath as Lr } from "url";
import P from "node:path";
import { parse as jr } from "@vue/compiler-sfc";
import kt from "node:fs";
import { fileURLToPath as Tr } from "node:url";
function ms(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
let mn = [], bs = 0;
const G = (t, e) => {
  bs >= e && mn.push(t);
};
G.WARN = 1;
G.INFO = 2;
G.DEBUG = 3;
G.reset = () => {
  mn = [];
};
G.setDebugLevel = (t) => {
  bs = t;
};
G.warn = (t) => G(t, G.WARN);
G.info = (t) => G(t, G.INFO);
G.debug = (t) => G(t, G.DEBUG);
G.debugMessages = () => mn;
var bn = G, En = { exports: {} }, Wr = ({ onlyFirst: t = !1 } = {}) => {
  const e = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(e, t ? void 0 : "g");
};
const Mr = Wr;
var kr = (t) => typeof t == "string" ? t.replace(Mr(), "") : t, Cn = { exports: {} };
const Es = (t) => Number.isNaN(t) ? !1 : t >= 4352 && (t <= 4447 || // Hangul Jamo
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
Cn.exports = Es;
Cn.exports.default = Es;
var Ir = Cn.exports, Pr = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const zr = kr, Hr = Ir, Vr = Pr, Cs = (t) => {
  if (typeof t != "string" || t.length === 0 || (t = zr(t), t.length === 0))
    return 0;
  t = t.replace(Vr(), "  ");
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.codePointAt(n);
    s <= 31 || s >= 127 && s <= 159 || s >= 768 && s <= 879 || (s > 65535 && n++, e += Hr(s) ? 2 : 1);
  }
  return e;
};
En.exports = Cs;
En.exports.default = Cs;
var Gr = En.exports;
const On = Gr;
function Ze(t) {
  return t ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}
function ue(t) {
  let e = Ze();
  return ("" + t).replace(e, "").split(`
`).reduce(function(r, i) {
    return On(i) > r ? On(i) : r;
  }, 0);
}
function xe(t, e) {
  return Array(e + 1).join(t);
}
function Ur(t, e, n, s) {
  let r = ue(t);
  if (e + 1 >= r) {
    let i = e - r;
    switch (s) {
      case "right": {
        t = xe(n, i) + t;
        break;
      }
      case "center": {
        let o = Math.ceil(i / 2), u = i - o;
        t = xe(n, u) + t + xe(n, o);
        break;
      }
      default: {
        t = t + xe(n, i);
        break;
      }
    }
  }
  return t;
}
let me = {};
function We(t, e, n) {
  e = "\x1B[" + e + "m", n = "\x1B[" + n + "m", me[e] = { set: t, to: !0 }, me[n] = { set: t, to: !1 }, me[t] = { on: e, off: n };
}
We("bold", 1, 22);
We("italics", 3, 23);
We("underline", 4, 24);
We("inverse", 7, 27);
We("strikethrough", 9, 29);
function Fs(t, e) {
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
  let s = me[e[0]];
  s && (t[s.set] = s.to);
}
function qr(t) {
  let e = Ze(!0), n = e.exec(t), s = {};
  for (; n !== null; )
    Fs(s, n), n = e.exec(t);
  return s;
}
function ws(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e += me[r].off);
  }), n && n != "\x1B[49m" && (e += "\x1B[49m"), s && s != "\x1B[39m" && (e += "\x1B[39m"), e;
}
function Zr(t, e) {
  let n = t.lastBackgroundAdded, s = t.lastForegroundAdded;
  return delete t.lastBackgroundAdded, delete t.lastForegroundAdded, Object.keys(t).forEach(function(r) {
    t[r] && (e = me[r].on + e);
  }), n && n != "\x1B[49m" && (e = n + e), s && s != "\x1B[39m" && (e = s + e), e;
}
function Kr(t, e) {
  if (t.length === ue(t))
    return t.substr(0, e);
  for (; ue(t) > e; )
    t = t.slice(0, -1);
  return t;
}
function Jr(t, e) {
  let n = Ze(!0), s = t.split(Ze()), r = 0, i = 0, o = "", u, a = {};
  for (; i < e; ) {
    u = n.exec(t);
    let h = s[r];
    if (r++, i + ue(h) > e && (h = Kr(h, e - i)), o += h, i += ue(h), i < e) {
      if (!u)
        break;
      o += u[0], Fs(a, u);
    }
  }
  return ws(a, o);
}
function Yr(t, e, n) {
  if (n = n || "…", ue(t) <= e)
    return t;
  e -= ue(n);
  let r = Jr(t, e);
  r += n;
  const i = "\x1B]8;;\x07";
  return t.includes(i) && !r.includes(i) && (r += i), r;
}
function Qr() {
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
function Xr(t, e) {
  t = t || {}, e = e || Qr();
  let n = Object.assign({}, e, t);
  return n.chars = Object.assign({}, e.chars, t.chars), n.style = Object.assign({}, e.style, t.style), n;
}
function ei(t, e) {
  let n = [], s = e.split(/(\s+)/g), r = [], i = 0, o;
  for (let u = 0; u < s.length; u += 2) {
    let a = s[u], h = i + ue(a);
    i > 0 && o && (h += o.length), h > t ? (i !== 0 && n.push(r.join("")), r = [a], i = ue(a)) : (r.push(o || "", a), i = h), o = s[u + 1];
  }
  return i && n.push(r.join("")), n;
}
function ti(t, e) {
  let n = [], s = "";
  function r(o, u) {
    for (s.length && u && (s += u), s += o; s.length > t; )
      n.push(s.slice(0, t)), s = s.slice(t);
  }
  let i = e.split(/(\s+)/g);
  for (let o = 0; o < i.length; o += 2)
    r(i[o], o && i[o - 1]);
  return s.length && n.push(s), n;
}
function ni(t, e, n = !0) {
  let s = [];
  e = e.split(`
`);
  const r = n ? ei : ti;
  for (let i = 0; i < e.length; i++)
    s.push.apply(s, r(t, e[i]));
  return s;
}
function si(t) {
  let e = {}, n = [];
  for (let s = 0; s < t.length; s++) {
    let r = Zr(e, t[s]);
    e = qr(r);
    let i = Object.assign({}, e);
    n.push(ws(i, r));
  }
  return n;
}
function ri(t, e) {
  const n = "\x1B]", s = "\x07", r = ";";
  return [n, "8", r, r, t || e, s, e, n, "8", r, r, s].join("");
}
var xs = {
  strlen: ue,
  repeat: xe,
  pad: Ur,
  truncate: Yr,
  mergeOptions: Xr,
  wordWrap: ni,
  colorizeLines: si,
  hyperlink: ri
}, ys = { exports: {} }, It = { exports: {} }, Vt = { exports: {} }, Gt = { exports: {} }, Ut = { exports: {} }, Nn;
function ii() {
  return Nn || (Nn = 1, function(t) {
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
      var r = n[s], i = e[s] = [];
      i.open = "\x1B[" + r[0] + "m", i.close = "\x1B[" + r[1] + "m";
    });
  }(Ut)), Ut.exports;
}
var qt, Ln;
function oi() {
  return Ln || (Ln = 1, qt = function(t, e) {
    e = e || process.argv;
    var n = e.indexOf("--"), s = /^-{1,2}/.test(t) ? "" : "--", r = e.indexOf(s + t);
    return r !== -1 && (n === -1 ? !0 : r < n);
  }), qt;
}
var Zt, jn;
function ui() {
  if (jn) return Zt;
  jn = 1;
  var t = yr, e = oi(), n = process.env, s = void 0;
  e("no-color") || e("no-colors") || e("color=false") ? s = !1 : (e("color") || e("colors") || e("color=true") || e("color=always")) && (s = !0), "FORCE_COLOR" in n && (s = n.FORCE_COLOR.length === 0 || parseInt(n.FORCE_COLOR, 10) !== 0);
  function r(u) {
    return u === 0 ? !1 : {
      level: u,
      hasBasic: !0,
      has256: u >= 2,
      has16m: u >= 3
    };
  }
  function i(u) {
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
  function o(u) {
    var a = i(u);
    return r(a);
  }
  return Zt = {
    supportsColor: o,
    stdout: o(process.stdout),
    stderr: o(process.stderr)
  }, Zt;
}
var Kt = { exports: {} }, Tn;
function ai() {
  return Tn || (Tn = 1, function(t) {
    t.exports = function(n, s) {
      var r = "";
      n = n || "Run the trap, drop the bass", n = n.split("");
      var i = {
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
        var u = i[o] || [" "], a = Math.floor(Math.random() * u.length);
        typeof i[o] < "u" ? r += i[o][a] : r += o;
      }), r;
    };
  }(Kt)), Kt.exports;
}
var Jt = { exports: {} }, Wn;
function ci() {
  return Wn || (Wn = 1, function(t) {
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
      }, i = [].concat(r.up, r.down, r.mid);
      function o(h) {
        var f = Math.floor(Math.random() * h);
        return f;
      }
      function u(h) {
        var f = !1;
        return i.filter(function(C) {
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
                m.up = o(8), m.mid = o(2), m.down = o(8);
                break;
              case "maxi":
                m.up = o(16) + 3, m.mid = o(4) + 1, m.down = o(64) + 3;
                break;
              default:
                m.up = o(8) + 1, m.mid = o(6) / 2, m.down = o(8) + 1;
                break;
            }
            var E = ["up", "mid", "down"];
            for (var g in E)
              for (var l = E[g], w = 0; w <= m[l]; w++)
                f[l] && (C = C + r[l][o(r[l].length)]);
          }
        return C;
      }
      return a(n, s);
    };
  }(Jt)), Jt.exports;
}
var Yt = { exports: {} }, Mn;
function li() {
  return Mn || (Mn = 1, function(t) {
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
  }(Yt)), Yt.exports;
}
var Qt = { exports: {} }, kn;
function hi() {
  return kn || (kn = 1, function(t) {
    t.exports = function(e) {
      return function(n, s, r) {
        return s % 2 === 0 ? n : e.inverse(n);
      };
    };
  }(Qt)), Qt.exports;
}
var Xt = { exports: {} }, In;
function fi() {
  return In || (In = 1, function(t) {
    t.exports = function(e) {
      var n = ["red", "yellow", "green", "blue", "magenta"];
      return function(s, r, i) {
        return s === " " ? s : e[n[r++ % n.length]](s);
      };
    };
  }(Xt)), Xt.exports;
}
var en = { exports: {} }, Pn;
function Di() {
  return Pn || (Pn = 1, function(t) {
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
      return function(s, r, i) {
        return s === " " ? s : e[n[Math.round(Math.random() * (n.length - 2))]](s);
      };
    };
  }(en)), en.exports;
}
var zn;
function pi() {
  return zn || (zn = 1, function(t) {
    var e = {};
    t.exports = e, e.themes = {};
    var n = wr, s = e.styles = ii(), r = Object.defineProperties, i = new RegExp(/[\r\n]+/g);
    e.supportsColor = ui().supportsColor, typeof e.enabled > "u" && (e.enabled = e.supportsColor() !== !1), e.enable = function() {
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
    var o = /[|\\{}()[\]^$+*?.]/g, u = function(g) {
      if (typeof g != "string")
        throw new TypeError("Expected a string");
      return g.replace(o, "\\$&");
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
        l = A.open + l.replace(A.closeRe, A.open) + A.close, w && (l = l.replace(i, function(R) {
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
    e.trap = ai(), e.zalgo = ci(), e.maps = {}, e.maps.america = li()(e), e.maps.zebra = hi()(e), e.maps.rainbow = fi()(e), e.maps.random = Di()(e);
    for (var E in e.maps)
      (function(g) {
        e[g] = function(l) {
          return d(e.maps[g], l);
        };
      })(E);
    r(e, m());
  }(Gt)), Gt.exports;
}
var Hn;
function di() {
  return Hn || (Hn = 1, function(t) {
    var e = pi();
    t.exports = e;
  }(Vt)), Vt.exports;
}
const { info: gi, debug: _s } = bn, J = xs;
let mi = class He {
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
    let s = this.options.chars || {}, r = e.chars, i = this.chars = {};
    Ei.forEach(function(a) {
      tn(s, r, a, i);
    }), this.truncate = this.options.truncate || e.truncate;
    let o = this.options.style = this.options.style || {}, u = e.style;
    tn(o, u, "padding-left", this), tn(o, u, "padding-right", this), this.head = o.head || u.head, this.border = o.border || u.border, this.fixedWidth = e.colWidths[this.x], this.lines = this.computeLines(e), this.desiredWidth = J.strlen(this.content) + this.paddingLeft + this.paddingRight, this.desiredHeight = this.lines.length;
  }
  computeLines(e) {
    const n = e.wordWrap || e.textWrap, { wordWrap: s = n } = this.options;
    if (this.fixedWidth && s) {
      if (this.fixedWidth -= this.paddingLeft + this.paddingRight, this.colSpan) {
        let o = 1;
        for (; o < this.colSpan; )
          this.fixedWidth += e.colWidths[this.x + o], o++;
      }
      const { wrapOnWordBoundary: r = !0 } = e, { wrapOnWordBoundary: i = r } = this.options;
      return this.wrapLines(J.wordWrap(this.fixedWidth, this.content, i));
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
    this.widths = e.colWidths.slice(n, n + this.colSpan), this.heights = e.rowHeights.slice(s, s + this.rowSpan), this.width = this.widths.reduce(Gn, -1), this.height = this.heights.reduce(Gn, -1), this.hAlign = this.options.hAlign || e.colAligns[n], this.vAlign = this.options.vAlign || e.rowAligns[s], this.drawRight = n + this.colSpan == e.colWidths.length;
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
    e || gi(`${this.y}-${this.x}: ${this.rowSpan - e}x${this.colSpan} Cell ${s}`);
    let r = Math.max(this.height - this.lines.length, 0), i;
    switch (this.vAlign) {
      case "center":
        i = Math.ceil(r / 2);
        break;
      case "bottom":
        i = r;
        break;
      default:
        i = 0;
    }
    if (e < i || e >= i + this.lines.length)
      return this.drawEmpty(this.drawRight, n);
    let o = this.lines.length > this.height && e + 1 >= this.height;
    return this.drawLine(e - i, this.drawRight, o, n);
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
      let i = 1;
      for (; this.cells[this.y][n - i] instanceof He.ColSpanCell; )
        i++;
      this.cells[this.y][n - i] instanceof He.RowSpanCell && (s = "leftMid");
    }
    return this.chars[s];
  }
  wrapWithStyleColors(e, n) {
    if (this[e] && this[e].length)
      try {
        let s = di();
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
    let i = this.chars[this.x == 0 ? "left" : "middle"];
    if (this.x && r && this.cells) {
      let m = this.cells[this.y + r][this.x - 1];
      for (; m instanceof fn; )
        m = this.cells[m.y][m.x - 1];
      m instanceof Dn || (i = this.chars.rightMid);
    }
    let o = J.repeat(" ", this.paddingLeft), u = n ? this.chars.right : "", a = J.repeat(" ", this.paddingRight), h = this.lines[e], f = this.width - (this.paddingLeft + this.paddingRight);
    s && (h += this.truncate || "…");
    let C = J.truncate(h, f, this.truncate);
    return C = J.pad(C, f, " ", this.hAlign), C = o + C + a, this.stylizeLine(i, C, u);
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
      let o = this.cells[this.y + n][this.x - 1];
      for (; o instanceof fn; )
        o = this.cells[o.y][o.x - 1];
      o instanceof Dn || (s = this.chars.rightMid);
    }
    let r = e ? this.chars.right : "", i = J.repeat(" ", this.width);
    return this.stylizeLine(s, i, r);
  }
}, fn = class {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {
  }
  draw(e) {
    return typeof e == "number" && _s(`${this.y}-${this.x}: 1x1 ColSpanCell`), "";
  }
  init() {
  }
  mergeTableOptions() {
  }
}, Dn = class {
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
    this.cellOffset = n - s, this.offset = bi(e.rowHeights, s, this.cellOffset);
  }
  draw(e) {
    return e == "top" ? this.originalCell.draw(this.offset, this.cellOffset) : e == "bottom" ? this.originalCell.draw("bottom") : (_s(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`), this.originalCell.draw(this.offset + 1 + e));
  }
  mergeTableOptions() {
  }
};
function Vn(...t) {
  return t.filter((e) => e != null).shift();
}
function tn(t, e, n, s) {
  let r = n.split("-");
  r.length > 1 ? (r[1] = r[1].charAt(0).toUpperCase() + r[1].substr(1), r = r.join(""), s[r] = Vn(t[r], t[n], e[r], e[n])) : s[n] = Vn(t[n], e[n]);
}
function bi(t, e, n) {
  let s = t[e];
  for (let r = 1; r < n; r++)
    s += 1 + t[e + r];
  return s;
}
function Gn(t, e) {
  return t + e + 1;
}
let Ei = [
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
It.exports = mi;
It.exports.ColSpanCell = fn;
It.exports.RowSpanCell = Dn;
var Ci = It.exports;
const { warn: Fi, debug: wi } = bn, pn = Ci, { ColSpanCell: xi, RowSpanCell: yi } = pn;
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
    let g = d.y, l = d.y - 1 + (d.rowSpan || 1), w = E.y, y = E.y - 1 + (E.rowSpan || 1), v = !(g > y || w > l), A = d.x, R = d.x - 1 + (d.colSpan || 1), W = E.x, oe = E.x - 1 + (E.colSpan || 1), se = !(A > oe || W > R);
    return v && se;
  }
  function i(d, E, g) {
    let l = Math.min(d.length - 1, g), w = { x: E, y: g };
    for (let y = 0; y <= l; y++) {
      let v = d[y];
      for (let A = 0; A < v.length; A++)
        if (r(w, v[A]))
          return !0;
    }
    return !1;
  }
  function o(d, E, g, l) {
    for (let w = g; w < l; w++)
      if (i(d, w, E))
        return !1;
    return !0;
  }
  function u(d) {
    d.forEach(function(E, g) {
      E.forEach(function(l) {
        for (let w = 1; w < l.rowSpan; w++) {
          let y = new yi(l);
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
          let v = new xi();
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
    wi(`Max rows: ${E}; Max cols: ${g}`);
    for (let l = 0; l < E; l++)
      for (let w = 0; w < g; w++)
        if (!i(d, w, l)) {
          let y = { x: w, y: l, colSpan: 1, rowSpan: 1 };
          for (w++; w < g && !i(d, w, l); )
            y.colSpan++, w++;
          let v = l + 1;
          for (; v < E && o(d, v, y.x, y.x + y.colSpan); )
            y.rowSpan++, v++;
          let A = new pn(y);
          A.x = y.x, A.y = y.y, Fi(`Missing cell at ${A.y}-${A.x}.`), h(A, d[l]);
        }
  }
  function C(d) {
    return d.map(function(E) {
      if (!Array.isArray(E)) {
        let g = Object.keys(E)[0];
        E = E[g], Array.isArray(E) ? (E = E.slice(), E.unshift(g)) : E = [g, E];
      }
      return E.map(function(g) {
        return new pn(g);
      });
    });
  }
  function m(d) {
    let E = C(d);
    return e(E), f(E), u(E), a(E), E;
  }
  ys.exports = {
    makeTableLayout: m,
    layoutTable: e,
    addRowSpanCells: u,
    maxWidth: n,
    fillInTable: f,
    computeWidths: Un("colSpan", "desiredWidth", "x", 1),
    computeHeights: Un("rowSpan", "desiredHeight", "y", 1)
  };
})();
function Un(t, e, n, s) {
  return function(r, i) {
    let o = [], u = [], a = {};
    i.forEach(function(h) {
      h.forEach(function(f) {
        (f[t] || 1) > 1 ? u.push(f) : o[f[n]] = Math.max(o[f[n]] || 0, f[e] || 0, s);
      });
    }), r.forEach(function(h, f) {
      typeof h == "number" && (o[f] = h);
    });
    for (let h = u.length - 1; h >= 0; h--) {
      let f = u[h], C = f[t], m = f[n], d = o[m], E = typeof r[m] == "number" ? 0 : 1;
      if (typeof d == "number")
        for (let g = 1; g < C; g++)
          d += 1 + o[m + g], typeof r[m + g] != "number" && E++;
      else
        d = e === "desiredWidth" ? f.desiredWidth - 1 : 1, (!a[m] || a[m] < d) && (a[m] = d);
      if (f[e] > d) {
        let g = 0;
        for (; E > 0 && f[e] > d; ) {
          if (typeof r[m + g] != "number") {
            let l = Math.round((f[e] - d) / E);
            d += l, o[m + g] += l, E--;
          }
          g++;
        }
      }
    }
    Object.assign(r, o, a);
    for (let h = 0; h < r.length; h++)
      r[h] = Math.max(s, r[h] || 0);
  };
}
var _i = ys.exports;
const le = bn, $i = xs, nn = _i;
let $s = class extends Array {
  constructor(e) {
    super();
    const n = $i.mergeOptions(e);
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
    let s = nn.makeTableLayout(e);
    s.forEach(function(i) {
      i.forEach(function(o) {
        o.mergeTableOptions(this.options, s);
      }, this);
    }, this), nn.computeWidths(this.options.colWidths, s), nn.computeHeights(this.options.rowHeights, s), s.forEach(function(i) {
      i.forEach(function(o) {
        o.init(this.options);
      }, this);
    }, this);
    let r = [];
    for (let i = 0; i < s.length; i++) {
      let o = s[i], u = this.options.rowHeights[i];
      (i === 0 || !this.options.style.compact || i == 1 && n) && sn(o, "top", r);
      for (let a = 0; a < u; a++)
        sn(o, a, r);
      i + 1 == s.length && sn(o, "bottom", r);
    }
    return r.join(`
`);
  }
  get width() {
    return this.toString().split(`
`)[0].length;
  }
};
$s.reset = () => le.reset();
function sn(t, e, n) {
  let s = [];
  t.forEach(function(i) {
    s.push(i.draw(e));
  });
  let r = s.join("");
  r.length && n.push(r);
}
var vi = $s, Ai = vi;
const Si = /* @__PURE__ */ ms(Ai);
class ve extends Error {
  constructor(e) {
    super(e || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, ve);
  }
}
function vs() {
  return Bi() ? 0 : 1;
}
function Bi() {
  return Ri() && !process.defaultApp;
}
function Ri() {
  return !!process.versions.electron;
}
function Oi(t) {
  return t.slice(vs() + 1);
}
function Ni() {
  return process.argv[vs()];
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
    const r = t.match(/^-+/);
    for (let i = r ? r[0].length : 0; i < t.length; i++) {
      let o = t.charAt(i);
      s && (s = !1, o = o.toUpperCase()), i !== 0 && (o === "-" || o === "_") ? s = !0 : o !== "-" && o !== "_" && (n += o);
    }
    return n;
  }
}
function As(t, e) {
  const n = t.toLowerCase();
  e = e || "-";
  let s = "";
  for (let r = 0; r < t.length; r++) {
    const i = n.charAt(r), o = t.charAt(r);
    i !== o && r > 0 ? s += `${e}${n.charAt(r)}` : s += o;
  }
  return s;
}
function Ss(t) {
  return t == null ? !1 : typeof t == "number" || /^0x[0-9a-f]+$/i.test(t) ? !0 : /^0[^.]/.test(t) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Li(t) {
  if (Array.isArray(t))
    return t.map((o) => typeof o != "string" ? o + "" : o);
  t = t.trim();
  let e = 0, n = null, s = null, r = null;
  const i = [];
  for (let o = 0; o < t.length; o++) {
    if (n = s, s = t.charAt(o), s === " " && !r) {
      n !== " " && e++;
      continue;
    }
    s === r ? r = null : (s === "'" || s === '"') && !r && (r = s), i[e] || (i[e] = ""), i[e] += s;
  }
  return i;
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
let ce;
class ji {
  constructor(e) {
    ce = e;
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
    }, n), r = Li(e), i = typeof e == "string", o = Ti(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), u = Object.assign({
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
    }, s.configuration), a = Object.assign(/* @__PURE__ */ Object.create(null), s.default), h = s.configObjects || [], f = s.envPrefix, C = u["populate--"], m = C ? "--" : "_", d = /* @__PURE__ */ Object.create(null), E = /* @__PURE__ */ Object.create(null), g = s.__ || ce.format, l = {
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
    })), dr(s.key, o, s.default, l.arrays), Object.keys(a).forEach(function(c) {
      (l.aliases[c] || []).forEach(function(p) {
        a[p] = a[c];
      });
    });
    let v = null;
    Fr();
    let A = [];
    const R = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), W = {};
    for (let c = 0; c < r.length; c++) {
      const p = r[c], F = p.replace(/^-{3,}/, "---");
      let b, D, _, x, $, I;
      if (p !== "--" && /^-/.test(p) && Ie(p))
        oe(p);
      else if (F.match(/^---+(=|$)/)) {
        oe(p);
        continue;
      } else if (p.match(/^--.+=/) || !u["short-option-groups"] && p.match(/^-.+=/))
        x = p.match(/^--?([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && (B(x[1], l.arrays) ? c = H(c, x[1], r, x[2]) : B(x[1], l.nargs) !== !1 ? c = se(c, x[1], r, x[2]) : L(x[1], x[2], !0));
      else if (p.match(y) && u["boolean-negation"])
        x = p.match(y), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], L(D, B(D, l.arrays) ? [!1] : !1));
      else if (p.match(/^--.+/) || !u["short-option-groups"] && p.match(/^-[^-]+/))
        x = p.match(/^--?(.+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], B(D, l.arrays) ? c = H(c, D, r) : B(D, l.nargs) !== !1 ? c = se(c, D, r) : ($ = r[c + 1], $ !== void 0 && (!$.match(/^-/) || $.match(w)) && !B(D, l.bools) && !B(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), c++) : L(D, ge(D))));
      else if (p.match(/^-.\..+=/))
        x = p.match(/^-([^=]+)=([\s\S]*)$/), x !== null && Array.isArray(x) && x.length >= 3 && L(x[1], x[2]);
      else if (p.match(/^-.\..+/) && !p.match(w))
        $ = r[c + 1], x = p.match(/^-(.\..+)/), x !== null && Array.isArray(x) && x.length >= 2 && (D = x[1], $ !== void 0 && !$.match(/^-/) && !B(D, l.bools) && !B(D, l.counts) ? (L(D, $), c++) : L(D, ge(D)));
      else if (p.match(/^-[^-]+/) && !p.match(w)) {
        _ = p.slice(1, -1).split(""), b = !1;
        for (let U = 0; U < _.length; U++) {
          if ($ = p.slice(U + 2), _[U + 1] && _[U + 1] === "=") {
            I = p.slice(U + 3), D = _[U], B(D, l.arrays) ? c = H(c, D, r, I) : B(D, l.nargs) !== !1 ? c = se(c, D, r, I) : L(D, I), b = !0;
            break;
          }
          if ($ === "-") {
            L(_[U], $);
            continue;
          }
          if (/[A-Za-z]/.test(_[U]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test($) && B($, l.bools) === !1) {
            L(_[U], $), b = !0;
            break;
          }
          if (_[U + 1] && _[U + 1].match(/\W/)) {
            L(_[U], $), b = !0;
            break;
          } else
            L(_[U], ge(_[U]));
        }
        D = p.slice(-1)[0], !b && D !== "-" && (B(D, l.arrays) ? c = H(c, D, r) : B(D, l.nargs) !== !1 ? c = se(c, D, r) : ($ = r[c + 1], $ !== void 0 && (!/^(-|--)[^-]/.test($) || $.match(w)) && !B(D, l.bools) && !B(D, l.counts) || /^(true|false)$/.test($) ? (L(D, $), c++) : L(D, ge(D))));
      } else if (p.match(/^-[0-9]$/) && p.match(w) && B(p.slice(1), l.bools))
        D = p.slice(1), L(D, ge(D));
      else if (p === "--") {
        A = r.slice(c + 1);
        break;
      } else if (u["halt-at-non-option"]) {
        A = r.slice(c);
        break;
      } else
        oe(p);
    }
    Sn(R, !0), Sn(R, !1), hr(R), fr(), Bn(R, l.aliases, a, !0), Dr(R), u["set-placeholder-key"] && pr(R), Object.keys(l.counts).forEach(function(c) {
      Ce(R, c.split(".")) || L(c, 0);
    }), C && A.length && (R[m] = []), A.forEach(function(c) {
      R[m].push(c);
    }), u["camel-case-expansion"] && u["strip-dashed"] && Object.keys(R).filter((c) => c !== "--" && c.includes("-")).forEach((c) => {
      delete R[c];
    }), u["strip-aliased"] && [].concat(...Object.keys(o).map((c) => o[c])).forEach((c) => {
      u["camel-case-expansion"] && c.includes("-") && delete R[c.split(".").map((p) => ye(p)).join(".")], delete R[c];
    });
    function oe(c) {
      const p = ke("_", c);
      (typeof p == "string" || typeof p == "number") && R._.push(p);
    }
    function se(c, p, F, b) {
      let D, _ = B(p, l.nargs);
      if (_ = typeof _ != "number" || isNaN(_) ? 1 : _, _ === 0)
        return ae(b) || (v = Error(g("Argument unexpected for: %s", p))), L(p, ge(p)), c;
      let x = ae(b) ? 0 : 1;
      if (u["nargs-eats-options"])
        F.length - (c + 1) + x < _ && (v = Error(g("Not enough arguments following: %s", p))), x = _;
      else {
        for (D = c + 1; D < F.length && (!F[D].match(/^-[^0-9]/) || F[D].match(w) || Ie(F[D])); D++)
          x++;
        x < _ && (v = Error(g("Not enough arguments following: %s", p)));
      }
      let $ = Math.min(x, _);
      for (!ae(b) && $ > 0 && (L(p, b), $--), D = c + 1; D < $ + c + 1; D++)
        L(p, F[D]);
      return c + $;
    }
    function H(c, p, F, b) {
      let D = [], _ = b || F[c + 1];
      const x = B(p, l.nargs);
      if (B(p, l.bools) && !/^(true|false)$/.test(_))
        D.push(!0);
      else if (ae(_) || ae(b) && /^-/.test(_) && !w.test(_) && !Ie(_)) {
        if (a[p] !== void 0) {
          const $ = a[p];
          D = Array.isArray($) ? $ : [$];
        }
      } else {
        ae(b) || D.push(zt(p, b, !0));
        for (let $ = c + 1; $ < F.length && !(!u["greedy-arrays"] && D.length > 0 || x && typeof x == "number" && D.length >= x || (_ = F[$], /^-/.test(_) && !w.test(_) && !Ie(_))); $++)
          c = $, D.push(zt(p, _, i));
      }
      return typeof x == "number" && (x && D.length < x || isNaN(x) && D.length === 0) && (v = Error(g("Not enough arguments following: %s", p))), L(p, D), c;
    }
    function L(c, p, F = i) {
      if (/-/.test(c) && u["camel-case-expansion"]) {
        const _ = c.split(".").map(function(x) {
          return ye(x);
        }).join(".");
        Q(c, _);
      }
      const b = zt(c, p, F), D = c.split(".");
      Fe(R, D, b), l.aliases[c] && l.aliases[c].forEach(function(_) {
        const x = _.split(".");
        Fe(R, x, b);
      }), D.length > 1 && u["dot-notation"] && (l.aliases[D[0]] || []).forEach(function(_) {
        let x = _.split(".");
        const $ = [].concat(D);
        $.shift(), x = x.concat($), (l.aliases[c] || []).includes(x.join(".")) || Fe(R, x, b);
      }), B(c, l.normalize) && !B(c, l.arrays) && [c].concat(l.aliases[c] || []).forEach(function(x) {
        Object.defineProperty(W, x, {
          enumerable: !0,
          get() {
            return p;
          },
          set($) {
            p = typeof $ == "string" ? ce.normalize($) : $;
          }
        });
      });
    }
    function Q(c, p) {
      l.aliases[c] && l.aliases[c].length || (l.aliases[c] = [p], d[p] = !0), l.aliases[p] && l.aliases[p].length || Q(p, c);
    }
    function zt(c, p, F) {
      F && (p = Wi(p)), (B(c, l.bools) || B(c, l.counts)) && typeof p == "string" && (p = p === "true");
      let b = Array.isArray(p) ? p.map(function(D) {
        return ke(c, D);
      }) : ke(c, p);
      return B(c, l.counts) && (ae(b) || typeof b == "boolean") && (b = rn()), B(c, l.normalize) && B(c, l.arrays) && (Array.isArray(p) ? b = p.map((D) => ce.normalize(D)) : b = ce.normalize(p)), b;
    }
    function ke(c, p) {
      return !u["parse-positional-numbers"] && c === "_" || !B(c, l.strings) && !B(c, l.bools) && !Array.isArray(p) && (Ss(p) && u["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${p}`))) || !ae(p) && B(c, l.numbers)) && (p = Number(p)), p;
    }
    function hr(c) {
      const p = /* @__PURE__ */ Object.create(null);
      Bn(p, l.aliases, a), Object.keys(l.configs).forEach(function(F) {
        const b = c[F] || p[F];
        if (b)
          try {
            let D = null;
            const _ = ce.resolve(ce.cwd(), b), x = l.configs[F];
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
              D = ce.require(_);
            Ht(D);
          } catch (D) {
            D.name === "PermissionDenied" ? v = D : c[F] && (v = Error(g("Invalid JSON config file: %s", b)));
          }
      });
    }
    function Ht(c, p) {
      Object.keys(c).forEach(function(F) {
        const b = c[F], D = p ? p + "." + F : F;
        typeof b == "object" && b !== null && !Array.isArray(b) && u["dot-notation"] ? Ht(b, D) : (!Ce(R, D.split(".")) || B(D, l.arrays) && u["combine-arrays"]) && L(D, b);
      });
    }
    function fr() {
      typeof h < "u" && h.forEach(function(c) {
        Ht(c);
      });
    }
    function Sn(c, p) {
      if (typeof f > "u")
        return;
      const F = typeof f == "string" ? f : "", b = ce.env();
      Object.keys(b).forEach(function(D) {
        if (F === "" || D.lastIndexOf(F, 0) === 0) {
          const _ = D.split("__").map(function(x, $) {
            return $ === 0 && (x = x.substring(F.length)), ye(x);
          });
          (p && l.configs[_.join(".")] || !p) && !Ce(c, _) && L(_.join("."), b[D]);
        }
      });
    }
    function Dr(c) {
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
    function pr(c) {
      return l.keys.forEach((p) => {
        ~p.indexOf(".") || typeof c[p] > "u" && (c[p] = void 0);
      }), c;
    }
    function Bn(c, p, F, b = !1) {
      Object.keys(F).forEach(function(D) {
        Ce(c, D.split(".")) || (Fe(c, D.split("."), F[D]), b && (E[D] = !0), (p[D] || []).forEach(function(_) {
          Ce(c, _.split(".")) || Fe(c, _.split("."), F[D]);
        }));
      });
    }
    function Ce(c, p) {
      let F = c;
      u["dot-notation"] || (p = [p.join(".")]), p.slice(0, -1).forEach(function(D) {
        F = F[D] || {};
      });
      const b = p[p.length - 1];
      return typeof F != "object" ? !1 : b in F;
    }
    function Fe(c, p, F) {
      let b = c;
      u["dot-notation"] || (p = [p.join(".")]), p.slice(0, -1).forEach(function(I) {
        I = qn(I), typeof b == "object" && b[I] === void 0 && (b[I] = {}), typeof b[I] != "object" || Array.isArray(b[I]) ? (Array.isArray(b[I]) ? b[I].push({}) : b[I] = [b[I], {}], b = b[I][b[I].length - 1]) : b = b[I];
      });
      const D = qn(p[p.length - 1]), _ = B(p.join("."), l.arrays), x = Array.isArray(F);
      let $ = u["duplicate-arguments-array"];
      !$ && B(D, l.nargs) && ($ = !0, (!ae(b[D]) && l.nargs[D] === 1 || Array.isArray(b[D]) && b[D].length === l.nargs[D]) && (b[D] = void 0)), F === rn() ? b[D] = rn(b[D]) : Array.isArray(b[D]) ? $ && _ && x ? b[D] = u["flatten-duplicate-arrays"] ? b[D].concat(F) : (Array.isArray(b[D][0]) ? b[D] : [b[D]]).concat([F]) : !$ && !!_ == !!x ? b[D] = F : b[D] = b[D].concat([F]) : b[D] === void 0 && _ ? b[D] = x ? F : [F] : $ && !(b[D] === void 0 || B(D, l.counts) || B(D, l.bools)) ? b[D] = [b[D], F] : b[D] = F;
    }
    function dr(...c) {
      c.forEach(function(p) {
        Object.keys(p || {}).forEach(function(F) {
          l.aliases[F] || (l.aliases[F] = [].concat(o[F] || []), l.aliases[F].concat(F).forEach(function(b) {
            if (/-/.test(b) && u["camel-case-expansion"]) {
              const D = ye(b);
              D !== F && l.aliases[F].indexOf(D) === -1 && (l.aliases[F].push(D), d[D] = !0);
            }
          }), l.aliases[F].concat(F).forEach(function(b) {
            if (b.length > 1 && /[A-Z]/.test(b) && u["camel-case-expansion"]) {
              const D = As(b, "-");
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
    function Rn(c) {
      const p = Object.keys(l);
      return [].concat(p.map((b) => l[b])).some(function(b) {
        return Array.isArray(b) ? b.includes(c) : b[c];
      });
    }
    function gr(c, ...p) {
      return [].concat(...p).some(function(b) {
        const D = c.match(b);
        return D && Rn(D[1]);
      });
    }
    function mr(c) {
      if (c.match(w) || !c.match(/^-[^-]+/))
        return !1;
      let p = !0, F;
      const b = c.slice(1).split("");
      for (let D = 0; D < b.length; D++) {
        if (F = c.slice(D + 2), !Rn(b[D])) {
          p = !1;
          break;
        }
        if (b[D + 1] && b[D + 1] === "=" || F === "-" || /[A-Za-z]/.test(b[D]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(F) || b[D + 1] && b[D + 1].match(/\W/))
          break;
      }
      return p;
    }
    function Ie(c) {
      return u["unknown-options-as-args"] && br(c);
    }
    function br(c) {
      return c = c.replace(/^-{3,}/, "--"), c.match(w) || mr(c) ? !1 : !gr(c, /^-+([^=]+?)=[\s\S]*$/, y, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ge(c) {
      return !B(c, l.bools) && !B(c, l.counts) && `${c}` in a ? a[c] : Er(Cr(c));
    }
    function Er(c) {
      return {
        [ie.BOOLEAN]: !0,
        [ie.STRING]: "",
        [ie.NUMBER]: void 0,
        [ie.ARRAY]: []
      }[c];
    }
    function Cr(c) {
      let p = ie.BOOLEAN;
      return B(c, l.strings) ? p = ie.STRING : B(c, l.numbers) ? p = ie.NUMBER : B(c, l.bools) ? p = ie.BOOLEAN : B(c, l.arrays) && (p = ie.ARRAY), p;
    }
    function ae(c) {
      return c === void 0;
    }
    function Fr() {
      Object.keys(l.counts).find((c) => B(c, l.arrays) ? (v = Error(g("Invalid configuration: %s, opts.count excludes opts.array.", c)), !0) : B(c, l.nargs) ? (v = Error(g("Invalid configuration: %s, opts.count excludes opts.narg.", c)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, l.aliases),
      argv: Object.assign(W, R),
      configuration: u,
      defaulted: Object.assign({}, E),
      error: v,
      newAliases: Object.assign({}, d)
    };
  }
}
function Ti(t) {
  const e = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(t).forEach(function(r) {
    e.push([].concat(t[r], r));
  }); s; ) {
    s = !1;
    for (let r = 0; r < e.length; r++)
      for (let i = r + 1; i < e.length; i++)
        if (e[r].filter(function(u) {
          return e[i].indexOf(u) !== -1;
        }).length) {
          e[r] = e[r].concat(e[i]), e.splice(i, 1), s = !0;
          break;
        }
  }
  return e.forEach(function(r) {
    r = r.filter(function(o, u, a) {
      return a.indexOf(o) === u;
    });
    const i = r.pop();
    i !== void 0 && typeof i == "string" && (n[i] = r);
  }), n;
}
function rn(t) {
  return t !== void 0 ? t + 1 : 1;
}
function qn(t) {
  return t === "__proto__" ? "___proto___" : t;
}
function Wi(t) {
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
var on, un, an;
const Zn = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, Kn = (un = (on = process == null ? void 0 : process.versions) === null || on === void 0 ? void 0 : on.node) !== null && un !== void 0 ? un : (an = process == null ? void 0 : process.version) === null || an === void 0 ? void 0 : an.slice(1);
if (Kn && Number(Kn.match(/^([^.]+)/)[1]) < Zn)
  throw Error(`yargs parser supports a minimum Node.js version of ${Zn}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Mi = process ? process.env : {}, Bs = new ji({
  cwd: process.cwd,
  env: () => Mi,
  format: ds,
  normalize: $r,
  resolve: Ee,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (t) => {
    if (typeof require < "u")
      return require(t);
    if (t.match(/\.json$/))
      return JSON.parse(gn(t, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), Me = function(e, n) {
  return Bs.parse(e.slice(), n).argv;
};
Me.detailed = function(t, e) {
  return Bs.parse(t.slice(), e);
};
Me.camelCase = ye;
Me.decamelize = As;
Me.looksLikeNumber = Ss;
const ki = {
  right: Gi,
  center: Ui
}, Ii = 0, Ve = 1, Pi = 2, Ge = 3;
class zi {
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
      this.div(...r.map((i, o) => ({
        text: i.trim(),
        padding: this.measurePadding(i),
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
      let i = "";
      s.forEach((o, u) => {
        const { width: a } = e[u], h = this.negatePadding(e[u]);
        let f = o;
        if (h > Y.stringWidth(o) && (f += " ".repeat(h - Y.stringWidth(o))), e[u].align && e[u].align !== "left" && this.wrap) {
          const m = ki[e[u].align];
          f = m(f, h), Y.stringWidth(f) < h && (f += " ".repeat((a || 0) - Y.stringWidth(f) - 1));
        }
        const C = e[u].padding || [0, 0, 0, 0];
        C[Ge] && (i += " ".repeat(C[Ge])), i += Jn(e[u], f, "| "), i += f, i += Jn(e[u], f, " |"), C[Ve] && (i += " ".repeat(C[Ve])), r === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
      }), n.push({
        text: i.replace(/ +$/, ""),
        span: e.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(e, n) {
    const s = e.match(/^ */), r = s ? s[0].length : 0, i = n.text, o = Y.stringWidth(i.trimRight());
    return n.span ? this.wrap ? r < o ? e : (n.hidden = !0, i.trimRight() + " ".repeat(r - o) + e.trimLeft()) : (n.hidden = !0, i + e) : e;
  }
  rasterize(e) {
    const n = [], s = this.columnWidths(e);
    let r;
    return e.forEach((i, o) => {
      i.width = s[o], this.wrap ? r = Y.wrap(i.text, this.negatePadding(i), { hard: !0 }).split(`
`) : r = i.text.split(`
`), i.border && (r.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (r.unshift(...new Array(i.padding[Ii] || 0).fill("")), r.push(...new Array(i.padding[Pi] || 0).fill(""))), r.forEach((u, a) => {
        n[a] || n.push([]);
        const h = n[a];
        for (let f = 0; f < o; f++)
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
      return e.map((o) => o.width || Y.stringWidth(o.text));
    let n = e.length, s = this.width;
    const r = e.map((o) => {
      if (o.width)
        return n--, s -= o.width, o.width;
    }), i = n ? Math.floor(s / n) : 0;
    return r.map((o, u) => o === void 0 ? Math.max(i, Hi(e[u])) : o);
  }
}
function Jn(t, e, n) {
  return t.border ? /[.']-+[.']/.test(e) ? "" : e.trim().length !== 0 ? n : "  " : "";
}
function Hi(t) {
  const e = t.padding || [], n = 1 + (e[Ge] || 0) + (e[Ve] || 0);
  return t.border ? n + 4 : n;
}
function Vi() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Gi(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n < e ? " ".repeat(e - n) + t : t;
}
function Ui(t, e) {
  t = t.trim();
  const n = Y.stringWidth(t);
  return n >= e ? t : " ".repeat(e - n >> 1) + t;
}
let Y;
function qi(t, e) {
  return Y = e, new zi({
    width: t?.width || Vi(),
    wrap: t?.wrap
  });
}
const Rs = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Os(t) {
  return t.replace(Rs, "");
}
function Zi(t, e) {
  const [n, s] = t.match(Rs) || ["", ""];
  t = Os(t);
  let r = "";
  for (let i = 0; i < t.length; i++)
    i !== 0 && i % e === 0 && (r += `
`), r += t.charAt(i);
  return n && s && (r = `${n}${r}${s}`), r;
}
function Ki(t) {
  return qi(t, {
    stringWidth: (e) => [...e].length,
    stripAnsi: Os,
    wrap: Zi
  });
}
function Ji(t, e) {
  let n = Ee(".", t), s;
  for (gs(n).isDirectory() || (n = hn(n)); ; ) {
    if (s = e(n, Br(n)), s) return Ee(n, s);
    if (n = hn(s = n), s === n) break;
  }
}
const Yi = {
  fs: {
    readFileSync: gn,
    writeFile: Rr
  },
  format: ds,
  resolve: Ee,
  exists: (t) => {
    try {
      return gs(t).isFile();
    } catch {
      return !1;
    }
  }
};
let re;
class Qi {
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
    })) : s(), re.format.apply(re.format, [this.cache[this.locale][n] || n].concat(e));
  }
  __n() {
    const e = Array.prototype.slice.call(arguments), n = e.shift(), s = e.shift(), r = e.shift();
    let i = function() {
    };
    typeof e[e.length - 1] == "function" && (i = e.pop()), this.cache[this.locale] || this._readLocaleFile();
    let o = r === 1 ? n : s;
    this.cache[this.locale][n] && (o = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i();
    const u = [o];
    return ~o.indexOf("%d") && u.push(r), re.format.apply(re.format, u.concat(e));
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
    return e.forEach(function(r, i) {
      const o = n[i + 1];
      s += r, typeof o < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(e) {
    this.writeQueue.push(e), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const e = this, n = this.writeQueue[0], s = n.directory, r = n.locale, i = n.cb, o = this._resolveLocaleFile(s, r), u = JSON.stringify(this.cache[r], null, 2);
    re.fs.writeFile(o, u, "utf-8", function(a) {
      e.writeQueue.shift(), e.writeQueue.length > 0 && e._processWriteQueue(), i(a);
    });
  }
  _readLocaleFile() {
    let e = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      re.fs.readFileSync && (e = JSON.parse(re.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        e = {};
      else
        throw s;
    }
    this.cache[this.locale] = e;
  }
  _resolveLocaleFile(e, n) {
    let s = re.resolve(e, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const r = re.resolve(e, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (s = r);
    }
    return s;
  }
  _fileExistsSync(e) {
    return re.exists(e);
  }
}
function Xi(t, e) {
  re = e;
  const n = new Qi(t);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const eo = (t) => Xi(t, Yi), to = "require is not supported by ESM", Yn = "loading a directory of commands is not supported yet for ESM";
let Ae;
try {
  Ae = Lr(import.meta.url);
} catch {
  Ae = process.cwd();
}
const no = Ae.substring(0, Ae.lastIndexOf("node_modules"));
Or, Nr, xr, no || process.cwd(), vr, hn, Ar, Sr, Ee, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, gn, eo({
  directory: Ee(Ae, "../../../locales"),
  updateFiles: !1
});
var so = Ns;
function Ns(t, e, n) {
  t instanceof RegExp && (t = Qn(t, n)), e instanceof RegExp && (e = Qn(e, n));
  var s = Ls(t, e, n);
  return s && {
    start: s[0],
    end: s[1],
    pre: n.slice(0, s[0]),
    body: n.slice(s[0] + t.length, s[1]),
    post: n.slice(s[1] + e.length)
  };
}
function Qn(t, e) {
  var n = e.match(t);
  return n ? n[0] : null;
}
Ns.range = Ls;
function Ls(t, e, n) {
  var s, r, i, o, u, a = n.indexOf(t), h = n.indexOf(e, a + 1), f = a;
  if (a >= 0 && h > 0) {
    if (t === e)
      return [a, h];
    for (s = [], i = n.length; f >= 0 && !u; )
      f == a ? (s.push(f), a = n.indexOf(t, f + 1)) : s.length == 1 ? u = [s.pop(), h] : (r = s.pop(), r < i && (i = r, o = h), h = n.indexOf(e, f + 1)), f = a < h && a >= 0 ? a : h;
    s.length && (u = [i, o]);
  }
  return u;
}
var js = so, ro = uo, Ts = "\0SLASH" + Math.random() + "\0", Ws = "\0OPEN" + Math.random() + "\0", Fn = "\0CLOSE" + Math.random() + "\0", Ms = "\0COMMA" + Math.random() + "\0", ks = "\0PERIOD" + Math.random() + "\0";
function cn(t) {
  return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
}
function io(t) {
  return t.split("\\\\").join(Ts).split("\\{").join(Ws).split("\\}").join(Fn).split("\\,").join(Ms).split("\\.").join(ks);
}
function oo(t) {
  return t.split(Ts).join("\\").split(Ws).join("{").split(Fn).join("}").split(Ms).join(",").split(ks).join(".");
}
function Is(t) {
  if (!t)
    return [""];
  var e = [], n = js("{", "}", t);
  if (!n)
    return t.split(",");
  var s = n.pre, r = n.body, i = n.post, o = s.split(",");
  o[o.length - 1] += "{" + r + "}";
  var u = Is(i);
  return i.length && (o[o.length - 1] += u.shift(), o.push.apply(o, u)), e.push.apply(e, o), e;
}
function uo(t) {
  return t ? (t.substr(0, 2) === "{}" && (t = "\\{\\}" + t.substr(2)), _e(io(t), !0).map(oo)) : [];
}
function ao(t) {
  return "{" + t + "}";
}
function co(t) {
  return /^-?0\d/.test(t);
}
function lo(t, e) {
  return t <= e;
}
function ho(t, e) {
  return t >= e;
}
function _e(t, e) {
  var n = [], s = js("{", "}", t);
  if (!s) return [t];
  var r = s.pre, i = s.post.length ? _e(s.post, !1) : [""];
  if (/\$$/.test(s.pre))
    for (var o = 0; o < i.length; o++) {
      var u = r + "{" + s.body + "}" + i[o];
      n.push(u);
    }
  else {
    var a = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), h = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), f = a || h, C = s.body.indexOf(",") >= 0;
    if (!f && !C)
      return s.post.match(/,.*\}/) ? (t = s.pre + "{" + s.body + Fn + s.post, _e(t)) : [t];
    var m;
    if (f)
      m = s.body.split(/\.\./);
    else if (m = Is(s.body), m.length === 1 && (m = _e(m[0], !1).map(ao), m.length === 1))
      return i.map(function(L) {
        return s.pre + m[0] + L;
      });
    var d;
    if (f) {
      var E = cn(m[0]), g = cn(m[1]), l = Math.max(m[0].length, m[1].length), w = m.length == 3 ? Math.abs(cn(m[2])) : 1, y = lo, v = g < E;
      v && (w *= -1, y = ho);
      var A = m.some(co);
      d = [];
      for (var R = E; y(R, g); R += w) {
        var W;
        if (h)
          W = String.fromCharCode(R), W === "\\" && (W = "");
        else if (W = String(R), A) {
          var oe = l - W.length;
          if (oe > 0) {
            var se = new Array(oe + 1).join("0");
            R < 0 ? W = "-" + se + W.slice(1) : W = se + W;
          }
        }
        d.push(W);
      }
    } else {
      d = [];
      for (var H = 0; H < m.length; H++)
        d.push.apply(d, _e(m[H], !1));
    }
    for (var H = 0; H < d.length; H++)
      for (var o = 0; o < i.length; o++) {
        var u = r + d[H] + i[o];
        (!e || f || u) && n.push(u);
      }
  }
  return n;
}
const fo = /* @__PURE__ */ ms(ro), Do = 1024 * 64, Ke = (t) => {
  if (typeof t != "string")
    throw new TypeError("invalid pattern");
  if (t.length > Do)
    throw new TypeError("pattern is too long");
}, po = {
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
}, we = (t) => t.replace(/[[\]\\-]/g, "\\$&"), go = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), Xn = (t) => t.join(""), mo = (t, e) => {
  const n = e;
  if (t.charAt(n) !== "[")
    throw new Error("not in a brace expression");
  const s = [], r = [];
  let i = n + 1, o = !1, u = !1, a = !1, h = !1, f = n, C = "";
  e: for (; i < t.length; ) {
    const g = t.charAt(i);
    if ((g === "!" || g === "^") && i === n + 1) {
      h = !0, i++;
      continue;
    }
    if (g === "]" && o && !a) {
      f = i + 1;
      break;
    }
    if (o = !0, g === "\\" && !a) {
      a = !0, i++;
      continue;
    }
    if (g === "[" && !a) {
      for (const [l, [w, y, v]] of Object.entries(po))
        if (t.startsWith(l, i)) {
          if (C)
            return ["$.", !1, t.length - n, !0];
          i += l.length, v ? r.push(w) : s.push(w), u = u || y;
          continue e;
        }
    }
    if (a = !1, C) {
      g > C ? s.push(we(C) + "-" + we(g)) : g === C && s.push(we(g)), C = "", i++;
      continue;
    }
    if (t.startsWith("-]", i + 1)) {
      s.push(we(g + "-")), i += 2;
      continue;
    }
    if (t.startsWith("-", i + 1)) {
      C = g, i += 2;
      continue;
    }
    s.push(we(g)), i++;
  }
  if (f < i)
    return ["", !1, 0, !1];
  if (!s.length && !r.length)
    return ["$.", !1, t.length - n, !0];
  if (r.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !h) {
    const g = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [go(g), !1, f - n, !1];
  }
  const m = "[" + (h ? "^" : "") + Xn(s) + "]", d = "[" + (h ? "" : "^") + Xn(r) + "]";
  return [s.length && r.length ? "(" + m + "|" + d + ")" : s.length ? m : d, u, f - n, !0];
}, $e = (t, { windowsPathsNoEscape: e = !1 } = {}) => e ? t.replace(/\[([^\/\\])\]/g, "$1") : t.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1"), bo = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), es = (t) => bo.has(t), Eo = "(?!(?:^|/)\\.\\.?(?:$|/))", Pe = "(?!\\.)", Co = /* @__PURE__ */ new Set(["[", "."]), Fo = /* @__PURE__ */ new Set(["..", "."]), wo = new Set("().*{}+?[]^$\\!"), xo = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), wn = "[^/]", ts = wn + "*?", ns = wn + "+?";
class q {
  type;
  #n;
  #s;
  #i = !1;
  #e = [];
  #t;
  #o;
  #a;
  #u = !1;
  #r;
  #c;
  // set to true if it's an extglob with no children
  // (which really means one child of '')
  #h = !1;
  constructor(e, n, s = {}) {
    this.type = e, e && (this.#s = !0), this.#t = n, this.#n = this.#t ? this.#t.#n : this, this.#r = this.#n === this ? s : this.#n.#r, this.#a = this.#n === this ? [] : this.#n.#a, e === "!" && !this.#n.#u && this.#a.push(this), this.#o = this.#t ? this.#t.#e.length : 0;
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
        for (let r = n.#o + 1; !s.type && r < s.#e.length; r++)
          for (const i of e.#e) {
            if (typeof i == "string")
              throw new Error("string part in extglob AST??");
            i.copyIn(s.#e[r]);
          }
        n = s, s = n.#t;
      }
    }
    return this;
  }
  push(...e) {
    for (const n of e)
      if (n !== "") {
        if (typeof n != "string" && !(n instanceof q && n.#t === this))
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
    if (this.#o === 0)
      return !0;
    const e = this.#t;
    for (let n = 0; n < this.#o; n++) {
      const s = e.#e[n];
      if (!(s instanceof q && s.type === "!"))
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
    return this.#o === e - 1;
  }
  copyIn(e) {
    typeof e == "string" ? this.push(e) : this.push(e.clone(this));
  }
  clone(e) {
    const n = new q(this.type, e);
    for (const s of this.#e)
      n.copyIn(s);
    return n;
  }
  static #l(e, n, s, r) {
    let i = !1, o = !1, u = -1, a = !1;
    if (n.type === null) {
      let d = s, E = "";
      for (; d < e.length; ) {
        const g = e.charAt(d++);
        if (i || g === "\\") {
          i = !i, E += g;
          continue;
        }
        if (o) {
          d === u + 1 ? (g === "^" || g === "!") && (a = !0) : g === "]" && !(d === u + 2 && a) && (o = !1), E += g;
          continue;
        } else if (g === "[") {
          o = !0, u = d, a = !1, E += g;
          continue;
        }
        if (!r.noext && es(g) && e.charAt(d) === "(") {
          n.push(E), E = "";
          const l = new q(g, n);
          d = q.#l(e, l, d, r), n.push(l);
          continue;
        }
        E += g;
      }
      return n.push(E), d;
    }
    let h = s + 1, f = new q(null, n);
    const C = [];
    let m = "";
    for (; h < e.length; ) {
      const d = e.charAt(h++);
      if (i || d === "\\") {
        i = !i, m += d;
        continue;
      }
      if (o) {
        h === u + 1 ? (d === "^" || d === "!") && (a = !0) : d === "]" && !(h === u + 2 && a) && (o = !1), m += d;
        continue;
      } else if (d === "[") {
        o = !0, u = h, a = !1, m += d;
        continue;
      }
      if (es(d) && e.charAt(h) === "(") {
        f.push(m), m = "";
        const E = new q(d, f);
        f.push(E), h = q.#l(e, E, h, r);
        continue;
      }
      if (d === "|") {
        f.push(m), m = "", C.push(f), f = new q(null, n);
        continue;
      }
      if (d === ")")
        return m === "" && n.#e.length === 0 && (n.#h = !0), f.push(m), m = "", n.push(...C, f), h;
      m += d;
    }
    return n.type = null, n.#s = void 0, n.#e = [e.substring(s - 1)], h;
  }
  static fromGlob(e, n = {}) {
    const s = new q(null, void 0, n);
    return q.#l(e, s, 0, n), s;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== this.#n)
      return this.#n.toMMPattern();
    const e = this.toString(), [n, s, r, i] = this.toRegExpSource();
    if (!(r || this.#s || this.#r.nocase && !this.#r.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase()))
      return s;
    const u = (this.#r.nocase ? "i" : "") + (i ? "u" : "");
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
        const [E, g, l, w] = typeof d == "string" ? q.#p(d, this.#s, a) : d.toRegExpSource(e);
        return this.#s = this.#s || l, this.#i = this.#i || w, E;
      }).join("");
      let f = "";
      if (this.isStart() && typeof this.#e[0] == "string" && !(this.#e.length === 1 && Fo.has(this.#e[0]))) {
        const E = Co, g = (
          // dots are allowed, and the pattern starts with [ or .
          n && E.has(h.charAt(0)) || // the pattern starts with \., and then [ or .
          h.startsWith("\\.") && E.has(h.charAt(2)) || // the pattern starts with \.\., and then [ or .
          h.startsWith("\\.\\.") && E.has(h.charAt(4))
        ), l = !n && !e && E.has(h.charAt(0));
        f = g ? Eo : l ? Pe : "";
      }
      let C = "";
      return this.isEnd() && this.#n.#u && this.#t?.type === "!" && (C = "(?:$|\\/)"), [
        f + h + C,
        $e(h),
        this.#s = !!this.#s,
        this.#i
      ];
    }
    const s = this.type === "*" || this.type === "+", r = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let i = this.#f(n);
    if (this.isStart() && this.isEnd() && !i && this.type !== "!") {
      const a = this.toString();
      return this.#e = [a], this.type = null, this.#s = void 0, [a, $e(this.toString()), !1, !1];
    }
    let o = !s || e || n || !Pe ? "" : this.#f(!0);
    o === i && (o = ""), o && (i = `(?:${i})(?:${o})*?`);
    let u = "";
    if (this.type === "!" && this.#h)
      u = (this.isStart() && !n ? Pe : "") + ns;
    else {
      const a = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !n && !e ? Pe : "") + ts + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && o ? ")" : this.type === "*" && o ? ")?" : `)${this.type}`;
      u = r + i + a;
    }
    return [
      u,
      $e(i),
      this.#s = !!this.#s,
      this.#i
    ];
  }
  #f(e) {
    return this.#e.map((n) => {
      if (typeof n == "string")
        throw new Error("string type in extglob ast??");
      const [s, r, i, o] = n.toRegExpSource(e);
      return this.#i = this.#i || o, s;
    }).filter((n) => !(this.isStart() && this.isEnd()) || !!n).join("|");
  }
  static #p(e, n, s = !1) {
    let r = !1, i = "", o = !1;
    for (let u = 0; u < e.length; u++) {
      const a = e.charAt(u);
      if (r) {
        r = !1, i += (wo.has(a) ? "\\" : "") + a;
        continue;
      }
      if (a === "\\") {
        u === e.length - 1 ? i += "\\\\" : r = !0;
        continue;
      }
      if (a === "[") {
        const [h, f, C, m] = mo(e, u);
        if (C) {
          i += h, o = o || f, u += C - 1, n = n || m;
          continue;
        }
      }
      if (a === "*") {
        s && e === "*" ? i += ns : i += ts, n = !0;
        continue;
      }
      if (a === "?") {
        i += wn, n = !0;
        continue;
      }
      i += xo(a);
    }
    return [i, $e(e), !!n, o];
  }
}
const yo = (t, { windowsPathsNoEscape: e = !1 } = {}) => e ? t.replace(/[?*()[\]]/g, "[$&]") : t.replace(/[?*()[\]\\]/g, "\\$&"), z = (t, e, n = {}) => (Ke(e), !n.nocomment && e.charAt(0) === "#" ? !1 : new Pt(e, n).match(t)), _o = /^\*+([^+@!?\*\[\(]*)$/, $o = (t) => (e) => !e.startsWith(".") && e.endsWith(t), vo = (t) => (e) => e.endsWith(t), Ao = (t) => (t = t.toLowerCase(), (e) => !e.startsWith(".") && e.toLowerCase().endsWith(t)), So = (t) => (t = t.toLowerCase(), (e) => e.toLowerCase().endsWith(t)), Bo = /^\*+\.\*+$/, Ro = (t) => !t.startsWith(".") && t.includes("."), Oo = (t) => t !== "." && t !== ".." && t.includes("."), No = /^\.\*+$/, Lo = (t) => t !== "." && t !== ".." && t.startsWith("."), jo = /^\*+$/, To = (t) => t.length !== 0 && !t.startsWith("."), Wo = (t) => t.length !== 0 && t !== "." && t !== "..", Mo = /^\?+([^+@!?\*\[\(]*)?$/, ko = ([t, e = ""]) => {
  const n = Ps([t]);
  return e ? (e = e.toLowerCase(), (s) => n(s) && s.toLowerCase().endsWith(e)) : n;
}, Io = ([t, e = ""]) => {
  const n = zs([t]);
  return e ? (e = e.toLowerCase(), (s) => n(s) && s.toLowerCase().endsWith(e)) : n;
}, Po = ([t, e = ""]) => {
  const n = zs([t]);
  return e ? (s) => n(s) && s.endsWith(e) : n;
}, zo = ([t, e = ""]) => {
  const n = Ps([t]);
  return e ? (s) => n(s) && s.endsWith(e) : n;
}, Ps = ([t]) => {
  const e = t.length;
  return (n) => n.length === e && !n.startsWith(".");
}, zs = ([t]) => {
  const e = t.length;
  return (n) => n.length === e && n !== "." && n !== "..";
}, Hs = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", ss = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
}, Ho = Hs === "win32" ? ss.win32.sep : ss.posix.sep;
z.sep = Ho;
const ee = Symbol("globstar **");
z.GLOBSTAR = ee;
const Vo = "[^/]", Go = Vo + "*?", Uo = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", qo = "(?:(?!(?:\\/|^)\\.).)*?", Zo = (t, e = {}) => (n) => z(n, t, e);
z.filter = Zo;
const X = (t, e = {}) => Object.assign({}, t, e), Ko = (t) => {
  if (!t || typeof t != "object" || !Object.keys(t).length)
    return z;
  const e = z;
  return Object.assign((s, r, i = {}) => e(s, r, X(t, i)), {
    Minimatch: class extends e.Minimatch {
      constructor(r, i = {}) {
        super(r, X(t, i));
      }
      static defaults(r) {
        return e.defaults(X(t, r)).Minimatch;
      }
    },
    AST: class extends e.AST {
      /* c8 ignore start */
      constructor(r, i, o = {}) {
        super(r, i, X(t, o));
      }
      /* c8 ignore stop */
      static fromGlob(r, i = {}) {
        return e.AST.fromGlob(r, X(t, i));
      }
    },
    unescape: (s, r = {}) => e.unescape(s, X(t, r)),
    escape: (s, r = {}) => e.escape(s, X(t, r)),
    filter: (s, r = {}) => e.filter(s, X(t, r)),
    defaults: (s) => e.defaults(X(t, s)),
    makeRe: (s, r = {}) => e.makeRe(s, X(t, r)),
    braceExpand: (s, r = {}) => e.braceExpand(s, X(t, r)),
    match: (s, r, i = {}) => e.match(s, r, X(t, i)),
    sep: e.sep,
    GLOBSTAR: ee
  });
};
z.defaults = Ko;
const Vs = (t, e = {}) => (Ke(t), e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : fo(t));
z.braceExpand = Vs;
const Jo = (t, e = {}) => new Pt(t, e).makeRe();
z.makeRe = Jo;
const Yo = (t, e, n = {}) => {
  const s = new Pt(e, n);
  return t = t.filter((r) => s.match(r)), s.options.nonull && !t.length && t.push(e), t;
};
z.match = Yo;
const rs = /[?*]|[+@!]\(.*?\)|\[|\]/, Qo = (t) => t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
class Pt {
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
    Ke(e), n = n || {}, this.options = n, this.pattern = e, this.platform = n.platform || Hs, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!n.windowsPathsNoEscape || n.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!n.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!n.nonegate, this.comment = !1, this.empty = !1, this.partial = !!n.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = n.windowsNoMagicRoot !== void 0 ? n.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
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
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], n.debug && (this.debug = (...i) => console.error(...i)), this.debug(this.pattern, this.globSet);
    const s = this.globSet.map((i) => this.slashSplit(i));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let r = this.globParts.map((i, o, u) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const a = i[0] === "" && i[1] === "" && (i[2] === "?" || !rs.test(i[2])) && !rs.test(i[3]), h = /^[a-z]:/i.test(i[0]);
        if (a)
          return [...i.slice(0, 4), ...i.slice(4).map((f) => this.parse(f))];
        if (h)
          return [i[0], ...i.slice(1).map((f) => this.parse(f))];
      }
      return i.map((a) => this.parse(a));
    });
    if (this.debug(this.pattern, r), this.set = r.filter((i) => i.indexOf(!1) === -1), this.isWindows)
      for (let i = 0; i < this.set.length; i++) {
        const o = this.set[i];
        o[0] === "" && o[1] === "" && this.globParts[i][2] === "?" && typeof o[3] == "string" && /^[a-z]:$/i.test(o[3]) && (o[2] = "?");
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
      const i = s[s.length - 1];
      return r === "**" && i === "**" ? s : r === ".." && i && i !== ".." && i !== "." && i !== "**" ? (s.pop(), s) : (s.push(r), s);
    }, []), n.length === 0 ? [""] : n));
  }
  levelTwoFileOptimize(e) {
    Array.isArray(e) || (e = this.slashSplit(e));
    let n = !1;
    do {
      if (n = !1, !this.preserveMultipleSlashes) {
        for (let r = 1; r < e.length - 1; r++) {
          const i = e[r];
          r === 1 && i === "" && e[0] === "" || (i === "." || i === "") && (n = !0, e.splice(r, 1), r--);
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
          let o = r;
          for (; s[o + 1] === "**"; )
            o++;
          o > r && s.splice(r + 1, o - r);
          let u = s[r + 1];
          const a = s[r + 2], h = s[r + 3];
          if (u !== ".." || !a || a === "." || a === ".." || !h || h === "." || h === "..")
            continue;
          n = !0, s.splice(r, 1);
          const f = s.slice(0);
          f[r] = "**", e.push(f), r--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let o = 1; o < s.length - 1; o++) {
            const u = s[o];
            o === 1 && u === "" && s[0] === "" || (u === "." || u === "") && (n = !0, s.splice(o, 1), o--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (n = !0, s.pop());
        }
        let i = 0;
        for (; (i = s.indexOf("..", i + 1)) !== -1; ) {
          const o = s[i - 1];
          if (o && o !== "." && o !== ".." && o !== "**") {
            n = !0;
            const a = i === 1 && s[i + 1] === "**" ? ["."] : [];
            s.splice(i - 1, 2, ...a), s.length === 0 && s.push(""), i -= 2;
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
    let r = 0, i = 0, o = [], u = "";
    for (; r < e.length && i < n.length; )
      if (e[r] === n[i])
        o.push(u === "b" ? n[i] : e[r]), r++, i++;
      else if (s && e[r] === "**" && n[i] === e[r + 1])
        o.push(e[r]), r++;
      else if (s && n[i] === "**" && e[r] === n[i + 1])
        o.push(n[i]), i++;
      else if (e[r] === "*" && n[i] && (this.options.dot || !n[i].startsWith(".")) && n[i] !== "**") {
        if (u === "b")
          return !1;
        u = "a", o.push(e[r]), r++, i++;
      } else if (n[i] === "*" && e[r] && (this.options.dot || !e[r].startsWith(".")) && e[r] !== "**") {
        if (u === "a")
          return !1;
        u = "b", o.push(n[i]), r++, i++;
      } else
        return !1;
    return e.length === n.length && o;
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
        const [R, W] = [e[v], n[A]];
        R.toLowerCase() === W.toLowerCase() && (n[A] = R, A > v ? n = n.slice(A) : v > A && (e = e.slice(v)));
      }
    }
    const { optimizationLevel: i = 1 } = this.options;
    i >= 2 && (e = this.levelTwoFileOptimize(e)), this.debug("matchOne", this, { file: e, pattern: n }), this.debug("matchOne", e.length, n.length);
    for (var o = 0, u = 0, a = e.length, h = n.length; o < a && u < h; o++, u++) {
      this.debug("matchOne loop");
      var f = n[u], C = e[o];
      if (this.debug(n, f, C), f === !1)
        return !1;
      if (f === ee) {
        this.debug("GLOBSTAR", [n, f, C]);
        var m = o, d = u + 1;
        if (d === h) {
          for (this.debug("** at the end"); o < a; o++)
            if (e[o] === "." || e[o] === ".." || !r.dot && e[o].charAt(0) === ".")
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
    if (o === a && u === h)
      return !0;
    if (o === a)
      return s;
    if (u === h)
      return o === a - 1 && e[o] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return Vs(this.pattern, this.options);
  }
  parse(e) {
    Ke(e);
    const n = this.options;
    if (e === "**")
      return ee;
    if (e === "")
      return "";
    let s, r = null;
    (s = e.match(jo)) ? r = n.dot ? Wo : To : (s = e.match(_o)) ? r = (n.nocase ? n.dot ? So : Ao : n.dot ? vo : $o)(s[1]) : (s = e.match(Mo)) ? r = (n.nocase ? n.dot ? Io : ko : n.dot ? Po : zo)(s) : (s = e.match(Bo)) ? r = n.dot ? Oo : Ro : (s = e.match(No)) && (r = Lo);
    const i = q.fromGlob(e, this.options).toMMPattern();
    return r && typeof i == "object" && Reflect.defineProperty(i, "test", { value: r }), i;
  }
  makeRe() {
    if (this.regexp || this.regexp === !1)
      return this.regexp;
    const e = this.set;
    if (!e.length)
      return this.regexp = !1, this.regexp;
    const n = this.options, s = n.noglobstar ? Go : n.dot ? Uo : qo, r = new Set(n.nocase ? ["i"] : []);
    let i = e.map((a) => {
      const h = a.map((f) => {
        if (f instanceof RegExp)
          for (const C of f.flags.split(""))
            r.add(C);
        return typeof f == "string" ? Qo(f) : f === ee ? ee : f._src;
      });
      return h.forEach((f, C) => {
        const m = h[C + 1], d = h[C - 1];
        f !== ee || d === ee || (d === void 0 ? m !== void 0 && m !== ee ? h[C + 1] = "(?:\\/|" + s + "\\/)?" + m : h[C] = s : m === void 0 ? h[C - 1] = d + "(?:\\/|" + s + ")?" : m !== ee && (h[C - 1] = d + "(?:\\/|\\/" + s + "\\/)" + m, h[C + 1] = ee));
      }), h.filter((f) => f !== ee).join("/");
    }).join("|");
    const [o, u] = e.length > 1 ? ["(?:", ")"] : ["", ""];
    i = "^" + o + i + u + "$", this.negate && (i = "^(?!" + i + ").+$");
    try {
      this.regexp = new RegExp(i, [...r].join(""));
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
    const i = this.set;
    this.debug(this.pattern, "set", i);
    let o = r[r.length - 1];
    if (!o)
      for (let u = r.length - 2; !o && u >= 0; u--)
        o = r[u];
    for (let u = 0; u < i.length; u++) {
      const a = i[u];
      let h = r;
      if (s.matchBase && a.length === 1 && (h = [o]), this.matchOne(h, a, n))
        return s.flipNegate ? !0 : !this.negate;
    }
    return s.flipNegate ? !1 : this.negate;
  }
  static defaults(e) {
    return z.defaults(e).Minimatch;
  }
}
z.AST = q;
z.Minimatch = Pt;
z.escape = yo;
z.unescape = $e;
let Gs = !1;
const Xo = (t) => {
  Gs = t;
}, ln = () => Gs;
let Us = !1;
const eu = (t) => {
  Us = t;
}, tu = () => Us, de = {
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
}, xn = Object.keys(de), nu = 1.5, is = 75, os = 85, us = 95, su = "\x1B]8;;", ru = "\x1B\\", iu = "\x1B]8;;\x1B\\", ou = [...Object.values(de).flat()], qs = [...xn, ...ou], uu = [
  "getElementById",
  "getElementsByClassName",
  "getElementsByTagName",
  "querySelector",
  "querySelectorAll"
], yn = ["index.vue", "app.vue"], au = {
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
}, cu = (t, e, n) => {
  const { errors: s, warnings: r } = t.reduce((d, { errors: E, warnings: g }) => ({ errors: d.errors + E, warnings: d.warnings + g }), { errors: 0, warnings: 0 }), i = [], o = { errors: s, warnings: r, linesCount: e, filesCount: n, points: 0 };
  if (i.push({ info: `Found <bg_err>${Intl.NumberFormat("en-US").format(s)} errors</bg_err>, and <bg_warn>${Intl.NumberFormat("en-US").format(r)} warnings</bg_warn>, <bg_info>${Intl.NumberFormat("en-US").format(e)} lines</bg_info> of code in <bg_info>${Intl.NumberFormat("en-US").format(n)} files</bg_info>` }), !e)
    return o.points = 0, i.push({ info: `Code Health can not be calculated, because there is no code in the given files
` }), { codeHealth: o, output: i };
  const u = Math.ceil((1 - (s * nu + r) / e) * 100);
  o.points = u;
  const a = 60, h = r ? Math.max(1, Math.ceil(r / e * a)) : 0, f = s ? Math.max(1, a - Math.ceil(u * a / 100) - h) : 0, C = a - f - h, m = `<bg_ok>${"_".repeat(C)}</bg_ok><bg_warn>${"_".repeat(h)}</bg_warn><bg_err>${"_".repeat(f)}</bg_err>`;
  return i.push({ info: `Code Health: [${m}] ${u}%
` }), u < is && i.push({ info: `<bg_err>Code health is LOW: ${u}%</bg_err>
` }), u >= is && u < os && i.push({ info: `<bg_warn>Code health is MEDIUM ${u}%$</bg_warn>
` }), u >= os && u < us && i.push({ info: `<bg_info>Code health is OK: ${u}%</bg_info>
` }), u >= us && i.push({ info: `<bg_ok>Code health is GOOD: ${u}%</bg_ok>
` }), { codeHealth: o, output: i };
}, Zs = async (t) => {
  const e = {
    path: "./src",
    apply: Object.values(xn).join(","),
    ignore: "",
    exclude: "",
    group: "rule",
    level: "all",
    sort: "desc",
    output: "text",
    override: au
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
}, _n = async (t) => {
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
function lu(t) {
  const e = [], n = [];
  return Object.entries(de).forEach(([s, r]) => {
    if (r.every((i) => t.includes(i)))
      e.push(s);
    else {
      const i = r.filter((o) => t.includes(o));
      n.push(...i);
    }
  }), { rulesets: e, individualRules: n };
}
const hu = (t) => {
  const e = P.join(t, "server");
  return kt.existsSync(e);
}, Ks = async (t) => {
  let e = "";
  if (!t) {
    const s = Tr(import.meta.url), r = P.dirname(s), i = P.resolve(r, "..");
    e = P.join(i, "package.json");
  }
  return t && (e = P.join(t, "package.json")), JSON.parse(await pe.readFile(e, "utf-8"));
}, $n = async () => await _n(process?.cwd() || "./") || "", Js = async (t, e) => {
  const n = await $n(), s = P.join(n, "package.json");
  return kt.existsSync(s) ? !!(await Ks(e)).dependencies[t] : !1;
}, Ys = async (t) => {
  const e = await $n(), n = ["nuxt.config.js", "nuxt.config.ts"];
  return await Js("nuxt", t) || n.some((s) => kt.existsSync(P.join(e, s)));
}, fu = async (t) => {
  const e = await $n(), n = ["vue.config.js", "vue.config.ts"];
  return !await Ys(t) && (await Js("vue", t) || n.some((r) => kt.existsSync(P.join(e, r))));
}, T = (t, e, n = 0) => {
  if (!e.includes(`
`))
    return t.split(`
`).findIndex((u, a) => a >= n && u.includes(e)) + 1;
  const s = t.split(`
`).slice(0, n).reduce((o, u) => o + u.length, 0), r = t.indexOf(e, s);
  return t.slice(0, r).split(`
`).length;
}, Se = [], Du = () => Se.length = 0, pu = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-if[^>]*>[\s\S]*?<\/\1>|<[^>]*v-if[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((i) => {
    const o = i.split(`
`).length, u = T(t.content, i);
    if (o > n * 2) {
      Se.push({
        filePath: e,
        message: `line #${u} <bg_err>has a v-if with ${o} lines</bg_err>`
      });
      return;
    }
    o > n && Se.push({
      filePath: e,
      message: `line #${u} <bg_warn>has a v-if with ${o} lines</bg_warn>`
    });
  });
}, du = () => {
  const t = [];
  return Se.length > 0 && Se.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-if</text_info>",
      description: "👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html",
      message: `${e.message} 🚨`
    });
  }), Du(), t;
}, Be = [], gu = () => Be.length = 0, mu = (t, e, n) => {
  if (!t)
    return;
  const s = /<([a-z0-9-]+)[^>]*v-show[^>]*>[\s\S]*?<\/\1>|<[^>]*v-show[^>]*\/>/gi;
  (t.content.match(s) || []).forEach((i) => {
    const o = i.split(`
`).length, u = T(t.content, i);
    if (o > n * 2) {
      Be.push({
        filePath: e,
        message: `line #${u} <bg_err>has a v-show with ${o} lines</bg_err>`
      });
      return;
    }
    o > n && Be.push({
      filePath: e,
      message: `line #${u} <bg_warn>has a v-show with ${o} lines</bg_warn>`
    });
  });
}, bu = () => {
  const t = [];
  return Be.length > 0 && Be.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ big v-show</text_info>",
      description: "👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html",
      message: `${e.message} 🚨`
    });
  }), gu(), t;
}, Eu = /^(\(.*\)|\\?.)$/;
function De(t) {
  const e = t.toString();
  return Eu.test(e) ? e : `(?:${e})`;
}
const Cu = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, Fu = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function S(t) {
  const e = (n) => S(`(?<${n}>${`${t}`.replace(Cu, "$1$2")})`);
  return {
    toString: () => t.toString(),
    and: Object.assign((...n) => S(`${t}${k(...n)}`), {
      referenceTo: (n) => S(`${t}\\k<${n}>`)
    }),
    or: (...n) => S(`(?:${t}|${k(...n)})`),
    after: (...n) => S(`(?<=${k(...n)})${t}`),
    before: (...n) => S(`${t}(?=${k(...n)})`),
    notAfter: (...n) => S(`(?<!${k(...n)})${t}`),
    notBefore: (...n) => S(`${t}(?!${k(...n)})`),
    times: Object.assign((n) => S(`${De(t)}{${n}}`), {
      any: () => S(`${De(t)}*`),
      atLeast: (n) => S(`${De(t)}{${n},}`),
      atMost: (n) => S(`${De(t)}{0,${n}}`),
      between: (n, s) => S(`${De(t)}{${n},${s}}`)
    }),
    optionally: () => S(`${De(t)}?`),
    as: e,
    groupedAs: e,
    grouped: () => S(`${t}`.replace(Fu, "($1$3)$2")),
    at: {
      lineStart: () => S(`^${t}`),
      lineEnd: () => S(`${t}$`)
    }
  };
}
const wu = /[.*+?^${}()|[\]\\/]/g;
function Re(t) {
  return S(`[${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function V(t) {
  return S(`[^${t.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function be(...t) {
  return S(`(?:${t.map((e) => k(e)).join("|")})`);
}
const Oe = S(".");
S("\\b\\w+\\b");
const ne = S("\\w"), Z = S("\\b"), xu = S("\\d"), M = S("\\s"), Qs = Object.assign(S("[a-zA-Z]"), {
  lowercase: S("[a-z]"),
  uppercase: S("[A-Z]")
}), Xs = S("\\t"), er = S("\\n");
S("\\r");
S("\\W+"), S("\\W"), S("\\B"), S("\\D"), S("\\S"), Object.assign(S("[^a-zA-Z]"), {
  lowercase: S("[^a-z]"),
  uppercase: S("[^A-Z]")
}), S("[^\\t]"), S("[^\\n]"), S("[^\\r]");
function te(...t) {
  return S(`${De(k(...t))}?`);
}
function k(...t) {
  return S(
    t.map((e) => typeof e == "string" ? e.replace(wu, "\\$&") : e).join("")
  );
}
function O(...t) {
  return S(`${De(k(...t))}+`);
}
const he = "i", j = "g", N = (...t) => {
  const e = t.length > 1 && (Array.isArray(t[t.length - 1]) || t[t.length - 1] instanceof Set) ? t.pop() : void 0;
  return new RegExp(k(...t).toString(), [...e || ""].join(""));
}, K = (t) => {
  const e = N(
    k("/*").and(V("*").times.any(), te(`
`).as("newline"), k("*").notBefore("/").or(O(V("*")))).and("*/").or(
      k("//").and(O(Oe))
    ).or(
      k("<!--").and(O(Oe))
    ),
    [j]
  );
  return t.replace(e, (n) => {
    const s = n.match(/\n/g);
    return s ? s.join("") : "";
  });
}, Je = [], yu = () => Je.length = 0, _u = (t, e, n) => {
  const { script: s, template: r } = t;
  if (!s && !r)
    return;
  const i = 2 * n, o = N(
    be(
      "if",
      'v-if="',
      O(Oe).groupedAs("condition").and("?").and(O(Oe)).and(":"),
      // ternary
      "="
    ).and(
      O(
        be(
          "&&",
          "||",
          V(`"'`)
        )
      )
    ),
    [j]
  ), u = N(
    be("&&", "||"),
    [j]
  ), a = (h, f) => {
    h = K(h);
    const C = h.match(o);
    C && C.forEach((m) => {
      const d = (m.match(u) || []).length + 1;
      if (d > n) {
        const E = T(h, m);
        Je.push({
          filePath: e,
          message: `line #${E} ${d > i ? "<bg_err>" : "<bg_warn>"}${f} has a complicated condition with ${d} blocks${d > i ? "</bg_err>" : "</bg_warn>"}`
        });
      }
    });
  };
  s && a(s.content, "script"), r && a(r.content, "template");
}, $u = () => {
  const t = [];
  return Je.length > 0 && Je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ complicated conditions</text_info>",
      description: "👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html",
      message: `${e.message} 🚨`
    });
  }), yu(), t;
}, Ye = [], vu = () => Ye.length = 0, Au = (t, e) => {
  if (!t)
    return;
  const n = /computed\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*\)/g, s = /\b(set|push|pop|shift|unshift|splice|reverse|sort)\b|(?<!=)=(?!=)/;
  [...t.content.matchAll(n)].forEach((i) => {
    const o = i[1];
    if (s.test(o)) {
      const u = T(t.content.trim(), i[0]), a = o.trim(), h = a.length > 20 ? a.slice(0, 20) : a;
      Ye.push({
        filePath: e,
        message: `line #${u} side effect detected in computed property <bg_err>(${h})</bg_err>`
      });
    }
  });
}, Su = () => {
  const t = [];
  return Ye.length > 0 && Ye.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ computed side effects</text_info>",
      description: "👉 <text_warn>Avoid side effects in computed properties. Computed properties should only derive and return a value.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/computed-side-effects.html",
      message: `${e.message} 🚨`
    });
  }), vu(), t;
}, Qe = [], Bu = () => Qe.length = 0, Ru = (t, e, n) => {
  if (!t)
    return;
  const s = 2 * n, r = N(Z, "if", Z, [j, he]), i = N(Z, "else", Z, [j, he]), o = N(Z, "for", Z, [j, he]), u = N(Z, "while", Z, [j, he]), a = N(Z, "case", Z, [j, he]), h = K(t.content), f = h.match(r), C = h.match(i), m = h.match(o), d = h.match(u), E = h.match(a), g = (f?.length || 0) + (C?.length || 0) + (m?.length || 0) + (d?.length || 0) + (E?.length || 0);
  g > n && Qe.push({ filePath: e, message: `Cyclomatic complexity is ${g > s ? "<bg_err>very high" : "<bg_warn>high"} (${g})${g > s ? "</bg_err>" : "</bg_warn>"}` });
}, Ou = () => {
  const t = [];
  return Qe.length > 0 && Qe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ cyclomatic complexity</text_info>",
      description: "👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html",
      message: `${e.message} 🚨`
    });
  }), Bu(), t;
}, Xe = [], Nu = 3, Lu = () => Xe.length = 0, ju = (t, e, n) => {
  if (!t)
    return;
  const s = N(Xs.times.atLeast(n).at.lineStart().or(M.times.atLeast(Nu * n).at.lineStart()), [j]), i = K(t.content).match(s);
  let o = 0;
  i?.forEach((u) => {
    const a = T(t.content, u, o);
    Xe.push({
      filePath: e,
      message: `line #${a} <bg_warn>indentation: ${u.length}</bg_warn>`
    }), o = a;
  });
}, Tu = () => {
  const t = [];
  return Xe.length > 0 && Xe.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ deep indentation</text_info>",
      description: "👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html",
      message: `${e.message} 🚨`
    });
  }), Lu(), t;
}, et = [], Wu = () => et.length = 0, Mu = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/'[^']*'|"[^"]*"/g, ""), s = K(n), r = N(Z, "else", Z, [j]), i = s.match(r);
  i?.length && et.push({ filePath: e, message: `else clauses found <bg_err>(${i.length})</bg_err>` });
}, ku = () => {
  const t = [];
  return et.length > 0 && et.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ else conditions</text_info>",
      description: "👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html",
      message: `${e.message} 🚨`
    });
  }), Wu(), t;
}, Ne = [], Iu = 5, Pu = 8;
function zu({ funcName: t, funcBody: e, lineNumber: n, filePath: s, max: r }) {
  const i = e.split(`
`).length, o = Gu(t);
  if (i > 2 * r) {
    Ne.push({ filePath: s, message: `function <bg_err>(${o}#${n})</bg_err> is too long: <bg_err>${i} lines</bg_err>` });
    return;
  }
  i >= r && Ne.push({ filePath: s, message: `function <bg_warn>(${o}#${n})</bg_warn> is too long: <bg_warn>${i} lines</bg_warn>` });
}
function Hu(t, e) {
  const n = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\([^)]*\)\s*\{/g;
  n.lastIndex = e;
  const s = n.exec(t);
  if (s) {
    const r = s[1], i = n.lastIndex;
    let o = 1, u = i;
    for (; o > 0 && u < t.length; )
      t[u] === "{" ? o++ : t[u] === "}" && o--, u++;
    const a = t.slice(i, u - 1).trim();
    return {
      name: r,
      body: a,
      end: u
      // Returns the position after the matched function
    };
  } else
    return null;
}
function Vu(t, e) {
  const n = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*/, s = t.slice(e), r = n.exec(s);
  if (r) {
    const [, i] = r, o = e + r.index + r[0].length;
    let u = o, a = "";
    if (t[o] === "{") {
      let h = 1;
      for (u = o + 1; u < t.length && h > 0; )
        t[u] === "{" ? h++ : t[u] === "}" && h--, u++;
      a = t.slice(o + 1, u - 1).trim();
    } else {
      for (; u < t.length && t[u] !== ";"; )
        u++;
      a = t.slice(o, u).trim();
    }
    return {
      name: i,
      body: a,
      end: u
      // Position after the end of the function body
    };
  } else
    return null;
}
function Gu(t) {
  return t.replace(/^const\s*/, "");
}
const Uu = () => Ne.length = 0, qu = (t, e, n) => {
  if (!t)
    return;
  const s = t.content, r = s.length;
  let i = 0;
  for (; i < r; ) {
    let o = "", u = "", a = !1;
    if (s.slice(i, i + Pu) === "function") {
      const h = Hu(s, i);
      h && (a = !0, o = h.name, u = h.body, i = h.end);
    }
    if (s.slice(i, i + Iu) === "const") {
      const h = Vu(s, i);
      h && (a = !0, o = h.name, u = h.body, i = h.end);
    }
    if (a) {
      const h = T(s.trim(), o);
      zu({ funcName: o, funcBody: u, lineNumber: h, filePath: e, max: n });
    } else
      i++;
  }
}, Zu = (t) => {
  const e = [];
  return Ne.length > 0 && Ne.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ function size</text_info>",
      description: `👉 <text_warn>Functions must be shorter than ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${n.message} 🚨`
    });
  }), Uu(), e;
}, tt = [], Ku = () => tt.length = 0, Ju = (t, e) => {
  if (!t)
    return;
  const n = N("<", k("img").or("picture"), [j]), s = t.content.match(n);
  if (s?.length) {
    let r = 0;
    s.forEach((i) => {
      const o = T(t.content, i, r), u = i.slice(1);
      tt.push({
        filePath: e,
        message: `line #${o} <bg_warn>${u} element found</bg_warn>`
      }), r = o;
    });
  }
}, Yu = () => {
  const t = [];
  return tt.length > 0 && tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html image elements</text_info>",
      description: "👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html",
      message: `${e.message} 🚨`
    });
  }), Ku(), t;
}, nt = [], Qu = () => nt.length = 0, Xu = (t, e) => {
  if (!t)
    return;
  const n = K(t.content), s = N("<a", Z, [j, he]), r = n.match(s);
  r?.length && nt.push({ filePath: e, message: `${r?.length} <bg_warn>html link found</bg_warn>` });
}, ea = () => {
  const t = [];
  return nt.length > 0 && nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ html link</text_info>",
      description: "👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html",
      message: `${e.message} 🚨`
    });
  }), Qu(), t;
}, Le = [], ta = () => Le.length = 0, na = (t, e, n, s) => {
  const r = 2 * s;
  let i = 0;
  n ? (i = t.scriptSetup?.content.trim().split(`
`).length ?? 0, i += t.template?.content.trim().split(`
`).length ?? 0, i += t.styles?.reduce((o, u) => o + u.content.trim().split(`
`).length, 0) ?? 0) : i = t.scriptSetup?.content.trim().split(`
`).length ?? 0, i > r ? Le.push({
    filePath: e,
    message: `<bg_err>huge file (${i} lines)</bg_err>`
  }) : i > s && Le.push({
    filePath: e,
    message: `<bg_warn>large file (${i} lines)</bg_warn>`
  });
}, sa = () => {
  const t = [];
  return Le.length > 0 && Le.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ huge files</text_info>",
      description: "👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html",
      message: `${e.message} 🚨`
    });
  }), ta(), t;
}, st = [], ra = () => st.length = 0, ia = (t, e) => {
  if (!t)
    return;
  const s = K(t.content).split(`
`);
  let r = 0, i = null;
  s.forEach((o, u) => {
    const a = o.trim();
    if (r += (a.match(/\(/g) || []).length, r -= (a.match(/\)/g) || []).length, a.startsWith("if (") && i === null && (i = u), i !== null && r === 0) {
      const h = s.slice(i, u + 1).join(" ");
      if (!h.includes("{")) {
        const f = s[u + 1]?.trim();
        (!f || !f.startsWith("{") && !a.endsWith("{")) && st.push({
          filePath: e,
          message: `line #${i} if statement without curly braces: <bg_err>${h.trim()}</bg_err>`
        });
      }
      i = null;
    }
  });
}, oa = () => {
  const t = [];
  return st.length > 0 && st.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ if without curly braces</text_info>",
      description: "👉 <text_warn>All if statements must be enclosed in curly braces for better readability and maintainability.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html",
      message: `${e.message} 🚨`
    });
  }), ra(), t;
}, rt = [], ua = () => rt.length = 0, aa = (t, e) => {
  if (!t)
    return;
  const n = N(
    te(O(Oe)),
    be(Z),
    O(xu).as("magicNumber"),
    be(")", er),
    [j]
  );
  let s, r = 0;
  for (; (s = n.exec(t.content)) !== null; ) {
    if (s[0].trim().startsWith("const") || s[0].trim().startsWith("let"))
      return;
    const i = s.groups?.magicNumber, o = Number.parseInt(i ?? "0");
    if (o > 1) {
      const u = T(t.content, String(o), r);
      rt.push({
        filePath: e,
        message: `line #${u} <bg_warn>magic number: ${o}</bg_warn>`
      }), r = u;
    }
  }
}, ca = () => {
  const t = [];
  return rt.length && rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ magic numbers</text_info>",
      description: "👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html",
      message: `magic numbers found (${e.message}) 🚨`
    });
  }), ua(), t;
}, it = [], la = () => it.length = 0, ha = (t, e) => {
  if (!t)
    return;
  K(t.content.trim()).split(`
`).forEach((r, i) => {
    (r.match(/\?(?!\.)/g) || []).length > 1 && it.push({
      filePath: e,
      message: `line #${i + 1} has <bg_warn>nested ternary</bg_warn>`
    });
  });
}, fa = () => {
  const t = [];
  return it.length > 0 && it.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ nested Ternary</text_info>",
      description: "👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html",
      message: `${e.message} 🚨`
    });
  }), la(), t;
}, ot = [], Da = () => ot.length = 0, pa = (t, e) => {
  if (!t)
    return;
  const n = N(
    Z,
    be(...uu.map((r) => k(r))),
    "(",
    [j]
  );
  t.content.match(n)?.forEach((r) => {
    const i = T(t.content.trim(), r);
    ot.push({
      filePath: e,
      message: `line #${i} <bg_warn>Direct DOM access detected: ${r}</bg_warn>`
    });
  });
}, da = () => {
  const t = [];
  return ot.length > 0 && ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no direct dom access</text_info>",
      description: "👉 <text_warn>Avoid direct DOM manipulation in Vue components. Use refs or Vue's template syntax instead.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-direct-dom-access.html",
      message: `${e.message} 🚨`
    });
  }), Da(), t;
}, ut = [], ga = () => ut.length = 0, ma = (t, e) => {
  if (!t)
    return;
  const n = /style\s*=\s*['"][^'"]*['"]/g, s = [...t.content.matchAll(n)];
  let r = 0;
  s?.forEach((i) => {
    const o = T(t.content.trim(), i[0], r);
    ut.push({
      filePath: e,
      message: `line #${o} <bg_warn>Found inline style: ${i[0]}</bg_warn>`
    }), r = o;
  });
}, ba = () => {
  const t = [];
  return ut.length > 0 && ut.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Inline Styles</text_info>",
      description: "👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), ga(), t;
}, at = [], Ea = () => at.length = 0, Ca = (t, e) => {
  if (!t)
    return;
  const n = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g;
  K(t.content).match(n)?.forEach((i) => {
    const o = T(t.content, i);
    at.push({
      filePath: e,
      message: `line #${o} <bg_warn>props destructuring found: ${i}</bg_warn>`
    });
  });
}, Fa = () => {
  const t = [];
  return at.length > 0 && at.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no Prop Destructure</text_info>",
      description: "👉 <text_warn>Avoid destructuring props in the setup function. Use `props.propName` instead of `const { propName } = defineProps()`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html",
      message: `${e.message} 🚨`
    });
  }), Ea(), t;
}, ct = [], wa = () => ct.length = 0, xa = (t, e) => {
  t && t.lang !== "ts" && ct.push({
    filePath: e,
    message: "<bg_warn>component uses js instead of ts</bg_warn>"
  });
}, ya = () => {
  const t = [];
  return ct.length > 0 && ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ no ts lang</text_info>",
      description: "👉 <text_warn>Use typescript instead of javascript.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-ts-lang.html",
      message: `${e.message} 🚨`
    });
  }), wa(), t;
}, lt = [], _a = () => lt.length = 0, $a = (t, e) => {
  if (!t)
    return;
  const n = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g;
  K(t.content).match(n)?.forEach((i) => {
    const o = T(t.content, i);
    lt.push({
      filePath: e,
      message: `line #${o} <bg_warn>Avoid using 'var' for variable declarations: ${i}</bg_warn>`
    });
  });
}, va = () => {
  const t = [];
  return lt.length > 0 && lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ No Var Declaration</text_info>",
      description: "👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html",
      message: `${e.message} 🚨`
    });
  }), _a(), t;
}, ht = [], Aa = () => ht.length = 0, as = (t, e, n, s) => {
  const r = e.split(",").map((i) => i.trim()).filter((i) => i.length > 0);
  r.length > s && ht.push({ filePath: n, message: `function <bg_warn>${t}</bg_warn> has <bg_warn>${r.length}</bg_warn> parameters` });
}, Sa = (t, e, n) => {
  if (!t)
    return;
  const s = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; )
    r[1] && as(r[1], r[2], e, n), r[3] && as(r[3], r[4], e, n);
}, Ba = (t) => {
  const e = [];
  return ht.length > 0 && ht.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ parameter count</text_info>",
      description: `👉 <text_warn>Max number of function parameters should be ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${n.message} 🚨`
    });
  }), Aa(), e;
}, ft = [], Ra = () => ft.length = 0, Oa = (t, e) => {
  !t || t.setup || ft.push({ filePath: e, message: "<bg_warn>Plain <script> block</bg_warn> found" });
}, Na = () => {
  const t = [];
  return ft.length > 0 && ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Plain <script> blocks</text_info>",
      description: "👉 <text_warn> Consider using <script setup> to leverage the new SFC <script> syntax.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html",
      message: `${e.message} 🚨`
    });
  }), Ra(), t;
}, Dt = [], La = () => Dt.length = 0, ja = (t, e) => {
  if (!t)
    return;
  const n = N(
    "defineProps(",
    M.times.any(),
    "[",
    M.times.any(),
    O(Re(`'"`), O(ne), Re(`'"`), M.times.any(), te(",", M.times.any())),
    "]",
    M.times.any(),
    ")",
    [j]
  ), s = N(
    "<",
    O(ne).grouped(),
    M,
    V(">").times.any(),
    ":",
    O(ne).grouped(),
    M.times.any(),
    "=",
    M.times.any(),
    '"props.',
    O(ne).grouped(),
    '"',
    [j]
  );
  let r;
  const i = /* @__PURE__ */ new Set(), o = K(t.content);
  for (; (r = n.exec(o)) !== null; )
    r[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((h) => i.add(h));
  let u;
  for (; (u = s.exec(t.content)) !== null; ) {
    const a = u[1], h = u[2], f = u[3];
    i.has(f) && h === f && Dt.push({
      filePath: e,
      message: `Prop <bg_warn>(${f})</bg_warn> is being drilled through <bg_warn>${a}</bg_warn> component unmodified.`
    });
  }
}, Ta = () => {
  const t = [];
  return Dt.length > 0 && Dt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ props drilling</text_info>",
      description: "👉 <text_warn>Props should not be forwarded unmodified. Consider refactoring.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), La(), t;
}, pt = [], Wa = () => pt.length = 0, Ma = (t, e, n) => {
  if (!t)
    return;
  const s = t.content.split(`
`);
  s.length > n && pt.push({ filePath: e, message: `${s.length > n * 2 ? "<bg_err>" : "<bg_warn>"}(${s.length} lines)${s.length > n * 2 ? "</bg_err>" : "</bg_warn>"}` });
}, ka = (t) => {
  const e = [];
  return pt.length > 0 && pt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ Long <script> blocks</text_info>",
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${t} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${n.message} 🚨`
    });
  }), Wa(), e;
}, dt = [], Ia = () => dt.length = 0, Pa = ["i", "key"], za = (t, e, n) => {
  if (!t)
    return;
  const s = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let r;
  for (; (r = s.exec(t.content)) !== null; ) {
    const i = r[1];
    i.length < n && !Pa.includes(i) && dt.push({ filePath: e, message: `variable: <bg_warn>(${i})</bg_warn>` });
  }
}, Ha = (t) => {
  const e = [];
  return dt.length > 0 && dt.forEach((n) => {
    e.push({
      file: n.filePath,
      rule: "<text_info>rrd ~ short variable names</text_info>",
      description: `👉 <text_warn>Variable names must have a minimum length of ${t}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${n.message} 🚨`
    });
  }), Ia(), e;
}, gt = [], Va = () => gt.length = 0, Ga = (t, e, n) => {
  if (!t)
    return;
  const s = N("defineProps", te("<"), te("("), "{", O(V("}")), "}", ["g", "s"]), i = K(t.content).match(s);
  if (i?.length) {
    const o = i[0].split(",").length;
    o > n && gt.push({ filePath: e, message: `props found <bg_err>(${o})</bg_err>` });
  }
}, Ua = () => {
  const t = [];
  return gt.length > 0 && gt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ too many props</text_info>",
      description: "👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html",
      message: `${e.message} 🚨`
    });
  }), Va(), t;
}, mt = [], qa = () => mt.length = 0, Za = (t, e) => {
  if (!t)
    return;
  const n = N('v-for="(', M.times.any(), O(ne).grouped(), M.times.any(), ",", M.times.any(), O(ne).grouped(), M.times.any(), ")", O(M), "in", O(M), O(ne).grouped(), [j]), s = N(':key="', M.times.any(), O(ne).grouped(), M.times.any(), '"', [j]), r = [...t.content.matchAll(n)], i = [...t.content.matchAll(s)];
  r.forEach((o) => {
    const [u, a, h, f] = o;
    i.forEach((C) => {
      const m = C[1];
      if (m === h) {
        const d = T(t.content.trim(), m);
        mt.push({
          filePath: e,
          message: `line #${d} <bg_warn>index is being used as :key in v-for</bg_warn>`
        });
      }
    });
  });
}, Ka = () => {
  const t = [];
  return mt.length > 0 && mt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ VFor With Index Key</text_info>",
      description: "👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html",
      message: `${e.message} 🚨`
    });
  }), qa(), t;
}, bt = [], Ja = () => bt.length = 0, Ya = (t, e) => {
  if (!t)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  const r = K(t.content);
  for (; (s = n.exec(r)) !== null; ) {
    const i = s[0], o = s[1], u = T(r.trim(), i);
    bt.push({
      filePath: e,
      message: `line #${u} zero length comparison found <bg_warn>(${o})</bg_warn>`
    });
  }
}, Qa = () => {
  const t = [];
  return bt.length > 0 && bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ Zero Length Comparison</text_info>",
      description: "👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html",
      message: `${e.message} 🚨`
    });
  }), Ja(), t;
}, Et = [], Xa = ["get", "post", "put", "delete", "patch", "options", "head"], ec = () => Et.length = 0, tc = (t, e) => {
  if (!e.includes("/server/api/"))
    return;
  const n = e.replace(/\.[^/.]+$/, "");
  if (Xa.some((o) => n.toLowerCase().endsWith(`.${o}`)))
    return;
  const r = t.source;
  N(
    k("if"),
    O(" "),
    "(",
    k("event.node.req.method"),
    O(" "),
    "!="
  ).test(r) || Et.push({
    filePath: e,
    message: "API route <bg_warn>without HTTP method</bg_warn> specified in filename or content"
  });
}, nc = () => {
  const t = [];
  return Et.length > 0 && Et.forEach((e) => {
    const n = e.filePath.split("/").pop()?.replace(/\.[^/.]+$/, "");
    t.push({
      file: e.filePath,
      rule: "<text_info>rrd ~ API endpoint without HTTP method</text_info>",
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., ${n}.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/api-without-method.html`,
      message: `${e.message} 🚨`
    });
  }), ec(), t;
}, Ct = [], sc = () => Ct.length = 0, rc = ["nuxt-api-shield", "nuxt-security"], ic = async (t, e) => {
  !t || e != "package.json" || rc.some((n) => t.source.includes(n)) || Ct.push({
    filePath: e,
    message: "<bg_warn>No rate limiter detected</bg_warn>"
  });
}, oc = () => {
  const t = [];
  return Ct.length > 0 && Ct.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>security ~ rate Limiter</text_info>",
      description: "👉 <text_warn>Use a rate limiter, like nuxt-api-shield or nuxt-security.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/rate-limiter.html",
      message: `${e.message} 🚨`
    });
  }), sc(), t;
}, uc = [
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
], Ft = [], ac = () => Ft.length = 0, cc = (t, e) => {
  if (!t)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  t.forEach((s) => {
    let r;
    for (; (r = n.exec(s.content)) !== null; ) {
      const i = r[1];
      uc.includes(i) && Ft.push({ filePath: e, message: `<bg_warn>(${i})</bg_warn>` });
    }
  });
}, lc = () => {
  const t = [];
  return Ft.length > 0 && Ft.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ element selectors with scoped</text_info>",
      description: "👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html",
      message: `${e.message} 🚨`
    });
  }), ac(), t;
}, je = [], hc = () => je.length = 0, fc = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, r = N(k("$parent").or("getCurrentInstance"), [j]), i = t.content.match(n), o = t.content.match(s);
  if (o) {
    const a = o[1].split(".")[0];
    if ((i ? i[1] : "").includes(a)) {
      const f = T(t.content.trim(), a);
      je.push({
        filePath: e,
        message: `line #${f} <bg_warn>(${a})</bg_warn>`
      });
    }
  }
  const u = t.content.match(r);
  if (u) {
    const a = T(t.content.trim(), u[0]);
    je.push({
      filePath: e,
      message: `line #${a} <bg_warn>(${u[0]})</bg_warn>`
    });
  }
}, Dc = () => {
  const t = [];
  return je.length > 0 && je.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-caution ~ implicit parent-child communication</text_info>",
      description: "👉 <text_warn>Avoid implicit parent-child communication to maintain clear and predictable component behavior.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html",
      message: `${e.message} 🚨`
    });
  }), hc(), t;
}, wt = [], pc = () => wt.length = 0, dc = (t, e) => {
  t && t.forEach((n) => {
    n.scoped || wt.push({ filePath: e, message: "<bg_err>global style</bg_err> used" });
  });
}, gc = () => {
  const t = [];
  return wt.length > 0 && wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ global style</text_info>",
      description: "👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html",
      message: `${e.message} 🚨`
    });
  }), pc(), t;
}, xt = [], mc = () => xt.length = 0, bc = (t, e) => {
  if (!t)
    return;
  const n = K(t.content), s = N("defineProps", M.times.any(), "(", M.times.any(), "[", [j]);
  n.match(s)?.length && xt.push({ filePath: e, message: "<bg_err>Props type</bg_err> not defined" });
}, Ec = () => {
  const t = [];
  return xt.length > 0 && xt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ simple prop</text_info>",
      description: "👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html",
      message: `${e.message} 🚨`
    });
  }), mc(), t;
}, yt = [], Cc = () => yt.length = 0, Fc = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = P.basename(t);
  if (yn.includes(e.toLowerCase()) || e.startsWith("[") && e.endsWith("].vue"))
    return;
  const n = N(Qs.uppercase);
  e.slice(1).match(n)?.length || yt.push({ filePath: t, message: "Component name is <bg_err>single word</bg_err>" });
}, wc = () => {
  const t = [];
  return yt.length > 0 && yt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ single name component</text_info>",
      description: "👉 <text_warn>Rename the component to use multi-word name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html",
      message: `${e.message} 🚨`
    });
  }), Cc(), t;
}, _t = [], xc = () => _t.length = 0, yc = (t, e) => {
  if (!t)
    return;
  const n = N("<", O(V(">")), " v-for", O(V(">")), ">", [
    j,
    he
  ]), s = t.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || _t.push({ filePath: e, message: "v-for used <bg_err>without a key</bg_err>" }));
}, _c = () => {
  const t = [];
  return _t.length > 0 && _t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-for has no key</text_info>",
      description: "👉 <text_warn>Add a `:key` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html",
      message: `${e.message} 🚨`
    });
  }), xc(), t;
}, $t = [], $c = () => $t.length = 0, vc = (t, e) => {
  if (!t)
    return;
  const n = N(
    "<",
    O(V(">")),
    " v-if",
    O(V(">")),
    " v-for",
    O(V(">")),
    ">",
    [j, he]
  ), s = N(
    "<",
    O(V(">")),
    " v-for",
    O(V(">")),
    " v-if",
    O(V(">")),
    ">",
    [j, he]
  ), r = t.content.match(n), i = t.content.match(s);
  if (r?.length || i?.length) {
    const o = r?.length ? r[0] : i?.length ? i[0] : "", u = T(t.content, o);
    $t.push({ filePath: e, message: `line #${u} <bg_err>v-if used with v-for</bg_err>` });
  }
}, Ac = () => {
  const t = [];
  return $t.length > 0 && $t.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-essential ~ v-if used with v-for</text_info>",
      description: "👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html",
      message: `${e.message} 🚨`
    });
  }), $c(), t;
}, vt = [], cs = [
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
], Sc = () => vt.length = 0, Bc = (t, e) => {
  if (!t)
    return;
  const n = t.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let i;
  for (; (i = s.exec(n)) !== null; ) {
    const o = i[1], u = i[2];
    if (u) {
      const h = Array.from(u.matchAll(r), (C) => C[1]).filter((C) => cs.includes(C));
      let f = -1;
      for (const C of h) {
        const m = cs.indexOf(C);
        if (m !== -1 && m < f) {
          vt.push({
            filePath: e,
            message: `tag has attributes out of order <bg_warn>(${o})</bg_warn>`
          });
          break;
        }
        f = m;
      }
    }
  }
}, Rc = () => {
  const t = [];
  return vt.length > 0 && vt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ element attribute order</text_info>",
      description: "👉 <text_warn>The attributes of elements (including components) should be ordered consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html",
      message: `${e.message} 🚨`
    });
  }), Sc(), t;
}, At = [], Oc = () => At.length = 0, Nc = (t, e, n) => {
  const s = t.toString(), i = (n === "script-template-style" ? ["script setup", "template", "style scoped"] : ["template", "script setup", "style scoped"]).map((u) => ({
    name: u,
    index: s.indexOf(`<${u}>`)
  })).filter((u) => u.index !== -1);
  i.every((u, a) => a === 0 ? !0 : i[a - 1].index < u.index) || At.push({ filePath: e, message: "Top level elements are <bg_warn>not following the correct order.</bg_warn>" });
}, Lc = () => {
  const t = [];
  return At.length > 0 && At.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-recommended ~ top level element order</text_info>",
      description: "👉 <text_warn>Single-File Components should always order <script setup>, <template>, and <style scoped> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html",
      message: `${e.message} 🚨`
    });
  }), Oc(), t;
}, St = [], jc = () => St.length = 0, Tc = (t) => {
  if (t.includes("pages") || t.includes("layouts"))
    return;
  const e = P.basename(t);
  if (yn.includes(e.toLowerCase()) || e.startsWith("[") && e.endsWith("].vue"))
    return;
  const n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = e.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = e.match(r);
  !s?.length && !i?.length && St.push({ filePath: t, message: "component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>" });
}, Wc = () => {
  const t = [];
  return St.length > 0 && St.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>",
      description: "👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html",
      message: `${e.message} 🚨`
    });
  }), jc(), t;
}, Bt = [], Mc = () => Bt.length = 0, kc = (t, e) => {
  if (!t)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...t.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const i = T(t.content.trim(), r), o = r.split(`
`).at(0)?.trim() || "";
    Bt.push({ filePath: e, message: `line #${i} <bg_warn>(${o})</bg_warn>` });
  });
}, Ic = () => {
  const t = [];
  return Bt.length > 0 && Bt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component files</text_info>",
      description: "👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html",
      message: `${e.message} 🚨`
    });
  }), Mc(), t;
}, Rt = [], ls = [], Pc = ["v-slot", "v-bind", "v-on"], zc = () => Rt.length = 0, Hc = (t, e) => {
  if (!t)
    return;
  const n = t.template;
  Pc.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const r = T(t.source, s);
      Rt.push({ filePath: e, message: `line #${r} <bg_warn>${s}</bg_warn>` }), ls.some((i) => i.filePath === e) || ls.push({ filePath: e });
    }
  });
}, Vc = () => {
  const t = [];
  return Rt.length > 0 && Rt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ directive shorthands not used</text_info>",
      description: '👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html',
      message: `${e.message} 🚨`
    });
  }), zc(), t;
}, Ot = [], Gc = () => Ot.length = 0, Uc = (t, e) => {
  const n = P.basename(t);
  if (yn.includes(n.toLowerCase()))
    return;
  const s = n?.split(".vue")[0];
  if (n.startsWith("[") && n.endsWith("].vue"))
    return;
  const r = N(
    Re("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
    [j]
  ), i = s.match(r);
  (!i || i.length < e) && Ot.push({ filePath: t, message: `${s} is not a <bg_warn>full word.</bg_warn>` });
}, qc = () => {
  const t = [];
  return Ot.length > 0 && Ot.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ full-word component names</text_info>",
      description: "👉 <text_warn>Component names should prefer full words over abbreviations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html",
      message: `${e.message} 🚨`
    });
  }), Gc(), t;
}, Nt = [], Zc = () => Nt.length = 0, Kc = (t, e) => {
  if (!t)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1], i = s[2];
    i.split(/\s+/).filter((u) => u.trim() !== "").length > 1 && i.split(`
`).length === 1 && Nt.push({ filePath: e, message: `Element <bg_warn><${r}></bg_warn> should have its attributes on separate lines` });
  }
}, Jc = () => {
  const t = [];
  return Nt.length > 0 && Nt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ multi-attribute elements</text_info>",
      description: "👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>",
      message: `${e.message} 🚨`
    });
  }), Zc(), t;
};
function Yc(t) {
  const e = /['"]?([\w-]+)['"]?\s*:|(\w+)\s*:/g, n = [];
  let s;
  for (; (s = e.exec(t)) !== null; ) {
    const r = s[1] || s[2];
    n.push(r);
  }
  return n;
}
const Lt = [], Qc = /^[a-z]+([A-Z][a-z]*)*$/, Xc = () => Lt.length = 0, el = (t, e) => {
  if (!t)
    return;
  const n = /defineProps\s*\(\s*(\{[\s\S]*?\})\s*\)/g;
  let s;
  for (; (s = n.exec(t.content)) !== null; ) {
    const r = s[1];
    Yc(r).filter((u) => !Qc.test(u)).length && Lt.push({ filePath: e, message: "prop names are <bg_warn>not camelCased</bg_warn>" });
  }
}, tl = () => {
  const t = [];
  return Lt.length > 0 && Lt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ prop names are not camelCased</text_info>",
      description: "👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html",
      message: `${e.message} 🚨`
    });
  }), Xc(), t;
}, jt = [], nl = () => jt.length = 0, sl = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    O(ne),
    te(O(Re(` 	
\r`))),
    O(V("/>")),
    te(O(Re(` 	
\r`))),
    te("/"),
    ">",
    ["g"]
  ), r = n?.content.match(s);
  if (r === null)
    return;
  const i = N(":", O(ne), te(" "), "=", te(" "), V(`'"`), [
    "g"
  ]);
  r?.forEach((o) => {
    if (!o.includes(":"))
      return;
    const u = o.match(i);
    if (u?.length) {
      const a = T(t.source, o);
      jt.push({ filePath: e, message: `line #${a} <bg_warn>${u}</bg_warn>` });
    }
  });
}, rl = () => {
  const t = [];
  return jt.length > 0 && jt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ quoted attribute values</text_info>",
      description: "👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html",
      message: `${e.message} 🚨`
    });
  }), nl(), t;
}, Tt = [], il = () => Tt.length = 0, ol = (t, e) => {
  if (!t)
    return;
  const n = t.template, s = N(
    "<",
    O(Qs.uppercase, ne),
    te(er, Xs),
    te(O(V(">"))),
    "></",
    O(ne),
    ">",
    ["g"]
  ), r = n?.content?.match(s);
  r !== null && r?.forEach((i) => {
    const o = T(t.source, i), u = i.split(`
`).at(-1)?.trim() || "";
    Tt.push({ filePath: e, message: `line #${o} <bg_warn>${u}</bg_warn>` });
  });
}, ul = () => {
  const t = [];
  return Tt.length > 0 && Tt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ component is not self closing</text_info>",
      description: "👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html",
      message: `${e.message} 🚨`
    });
  }), il(), t;
}, vn = [], Ue = [], al = () => vn.length = 0, cl = (t, e, n) => {
  if (!t)
    return;
  const s = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, i = K(t.content).match(s);
  i?.length && i.forEach((o) => {
    if (o.split(`
`).length > n) {
      const u = o.split(`
`)[0], a = T(t.content, u);
      vn.push({ filePath: e, message: `line #${a} <bg_warn>computed</bg_warn>` }), Ue.push({ filePath: e }), Ue.some((h) => h.filePath === e) || Ue.push({ filePath: e });
    }
  });
}, ll = () => {
  const t = [];
  return Ue.length > 0 && vn.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ complicated computed property</text_info>",
      description: "👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html",
      message: `${e.message} 🚨`
    });
  }), al(), t;
}, Wt = [], hl = () => Wt.length = 0, fl = (t, e, n) => {
  if (!t)
    return;
  const s = /{{\s*([\s\S]*?)\s*}}/g;
  [...t.content.matchAll(s)].map((i) => i[1].trim()).forEach((i) => {
    if (i.length > n) {
      const o = T(t.content, i), u = i.split(`
`).at(0)?.trim() || "";
      Wt.push({
        filePath: e,
        message: `line #${o} <bg_warn>${u}</bg_warn>`
      });
    }
  });
}, Dl = () => {
  const t = [];
  return Wt.length > 0 && Wt.forEach((e) => {
    t.push({
      file: e.filePath,
      rule: "<text_info>vue-strong ~ lengthy template expression</text_info>",
      description: "👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html",
      message: `${e.message} 🚨`
    });
  }), hl(), t;
}, pl = (t, e, n, s) => {
  const r = t.scriptSetup || t.script, i = e.endsWith(".vue"), o = {
    // vue-essential
    simpleProp: () => bc(r, e),
    singleNameComponent: () => i && Fc(e),
    globalStyle: () => i && dc(t.styles, e),
    vforNoKey: () => i && yc(t.template, e),
    vifWithVfor: () => i && vc(t.template, e),
    // vue-strong
    simpleComputed: () => cl(r, e, s.maxComputedLength),
    componentFiles: () => i && kc(r, e),
    propNameCasing: () => i && el(r, e),
    componentFilenameCasing: () => i && Tc(e),
    selfClosingComponents: () => i && ol(t, e),
    templateSimpleExpression: () => i && fl(t.template, e, s.maxExpressionLength),
    quotedAttributeValues: () => i && sl(t, e),
    directiveShorthands: () => i && Hc(t, e),
    fullWordComponentName: () => i && Uc(e, s.minimumConsonantCount),
    multiAttributeElements: () => i && Kc(t.template, e),
    // vue-recommended
    topLevelElementOrder: () => i && Nc(t.source, e, s.topLevelElementOrder),
    elementAttributeOrder: () => i && Bc(t.template, e),
    // vue-caution
    implicitParentChildCommunication: () => i && fc(r, e),
    elementSelectorsWithScoped: () => i && cc(t.styles, e),
    // rrd
    bigVif: () => pu(t.template, e, s.maxVifLines),
    bigVShow: () => mu(t.template, e, s.maxVshowLines),
    complicatedConditions: () => _u(t, e, s.warningThreshold),
    cyclomaticComplexity: () => Ru(r, e, s.complexityModerate),
    computedSideEffects: () => Au(r, e),
    deepIndentation: () => ju(r, e, s.maxTabs),
    elseCondition: () => Mu(r, e),
    functionSize: () => qu(r, e, s.maxFunctionSize),
    htmlImageElements: () => ln() && Ju(t.template, e),
    htmlLink: () => i && Xu(t.template, e),
    hugeFiles: () => na(t, e, i, s.maxFileSize),
    ifWithoutCurlyBraces: () => ia(r, e),
    magicNumbers: () => aa(r, e),
    nestedTernary: () => ha(r, e),
    noDirectDomAccess: () => pa(r, e),
    noInlineStyles: () => ma(t.template, e),
    noPropDestructure: () => Ca(r, e),
    noTsLang: () => i && xa(r, e),
    noVarDeclaration: () => $a(r, e),
    parameterCount: () => Sa(r, e, s.maxParameterCount),
    plainScript: () => i && Oa(t.script, e),
    propsDrilling: () => ja(r, e),
    scriptLength: () => Ma(r, e, s.maxScriptLength),
    shortVariableName: () => za(r, e, s.minVariableName),
    tooManyProps: () => Ga(r, e, s.maxPropsCount),
    vForWithIndexKey: () => i && Za(t.template, e),
    zeroLengthComparison: () => Ya(r, e),
    // security
    apiWithoutMethod: () => ln() && tc(t, e),
    rateLimiter: () => tu() && ln() && ic(t, e)
  };
  n.forEach((u) => {
    u in de && de[u].forEach((a) => {
      a in o && o[a]();
    }), u in o && o[u]();
  });
}, dl = (t, e, n, s) => {
  const r = {}, i = {}, o = [], u = ({ file: f, rule: C, title: m, description: d, message: E }) => {
    const g = t === "rule" ? C : f;
    r[g] || (r[g] = []), r[g].push({ file: f, rule: C, title: m, description: d, message: E });
  }, a = (f) => {
    f().forEach((m) => {
      u(m);
    });
  };
  return a(wc), a(Ec), a(_c), a(Ac), a(gc), a(Wc), a(Ic), a(Vc), a(qc), a(Jc), a(tl), a(rl), a(ul), a(ll), a(Dl), a(Lc), a(Rc), a(Dc), a(lc), a(du), a(bu), a($u), a(Ou), a(Su), a(Tu), a(ku), a(() => Zu(s.maxFunctionSize)), a(Yu), a(ea), a(sa), a(oa), a(ca), a(fa), a(da), a(ba), a(Fa), a(ya), a(va), a(() => Ba(s.maxParameterCount)), a(Na), a(Ta), a(() => ka(s.maxScriptLength)), a(() => Ha(s.minVariableName)), a(Ua), a(Ka), a(Qa), a(nc), a(oc), Object.keys(r).sort((f, C) => {
    const m = r[f].length, d = r[C].length;
    return e === "desc" ? d - m : m - d;
  }).forEach((f) => {
    i[f] = [], r[f].forEach((C, m) => {
      const d = C.message.includes("<bg_err>");
      if (o.some((E) => E.file === C.file)) {
        const E = o.find((g) => g.file === C.file);
        E && d && E.errors++, E && !d && E.warnings++;
      } else
        o.push({ file: C.file, errors: d ? 1 : 0, warnings: d ? 0 : 1, output: [] });
      n === "error" && !d || (i[f][m] = { id: "", description: "", message: "", level: d ? "error" : "warning" }, t === "file" && (i[f][m].id = C.rule), t !== "file" && (i[f][m].id = C.file), i[f][m].description = C.description, i[f][m].message = C.message || "🚨");
    });
  }), { output: i, health: o };
};
let qe = 0, dn = 0, tr = [], nr = {};
const gl = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], An = [], hs = async (t, e) => {
  if (!An.some((n) => z(e, n, { matchBase: !0 })) && (t.endsWith(".vue") || t.endsWith(".ts") || t.endsWith(".js") || t.endsWith("package.json"))) {
    qe++;
    const n = await pe.readFile(e, "utf-8");
    dn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = jr(n);
    return (t.endsWith(".ts") || t.endsWith(".js")) && (s.script = { content: n }), pl(s, e, tr, nr), `Analyzing ${e}...`;
  }
}, sr = async (t) => {
  const e = [];
  if (!(await pe.stat(t)).isDirectory()) {
    const r = await hs(t, t);
    return r && e.push(r), e;
  }
  const s = await pe.readdir(t);
  for (const r of s) {
    const i = P.join(t, r);
    if ((await pe.stat(i)).isDirectory() && !gl.some((a) => i.includes(a)) && !An.some((a) => z(i, a))) {
      const a = await sr(i);
      a && e.push(...a);
    }
    const u = await hs(i, i);
    u && e.push(u);
  }
  return e;
}, ml = async ({ dir: t, apply: e = [], ignore: n = [], exclude: s = "", groupBy: r = "rule", level: i = "all", sortBy: o = "desc" }) => {
  qe = 0, dn = 0;
  const u = await _n(t), a = await Zs(u);
  e = e.length ? e : a.apply.split(","), n = n.length ? n : a.ignore ? a.ignore.split(",") : [], s = s || a.exclude, r = r || a.group, i = i || a.level, o = o || a.sort, nr = a.override;
  const h = e.filter((Q) => !n.includes(Q)), { rulesets: f, individualRules: C } = lu(h), m = f.length ? `<bg_info>${f.join(", ")}</bg_info>` : "N/A", d = C.length ? `<bg_info>${C.join(", ")}</bg_info>` : "N/A";
  let E = `      Applying ${f.length} rulesets: ${m}`;
  C.length > 0 && (E += `
      Applying ${C.length} individual rules: ${d}`);
  const g = n.filter((Q) => !f.includes(Q)), l = g.length ? `<bg_info>${g.join(", ")}</bg_info>` : "N/A", w = await fu(u), y = await Ys(u);
  Xo(y);
  const v = hu(u);
  eu(v);
  const A = [];
  A.push({ info: `<bg_info>Analyzing Vue, TS and JS files in ${t}</bg_info>` });
  const R = a.isDefault ? "👉 Using <bg_info>default</bg_info> configuration" : "👉 Using configuration from <bg_info>vue-mess-detector.json</bg_info>";
  A.push({ info: R }), A.push({ info: `      Project type: <bg_info>${y ? "Nuxt" : ""}${w ? "Vue" : ""}${!y && !w ? "?" : ""}</bg_info>` }), A.push({
    info: `${E}
      Ignoring ${g.length} rules: ${l}
      Excluding ${s || "-"}
      Output level <bg_info>${i}</bg_info>
      Grouping by <bg_info>${r}</bg_info>
      Sorting <bg_info>${o}</bg_info>`
  }), tr = e.filter((Q) => !n.includes(Q)), s && An.push(...s.split(",").map((Q) => Q.trim()));
  const W = await sr(t);
  A.push(...W.map((Q) => ({ info: Q }))), A.push({ info: `Found <bg_info>${qe}</bg_info> files` });
  const { health: oe, output: se } = dl(r, o, i, a.override), { codeHealth: H, output: L } = cu(oe, dn, qe);
  return !H.errors && !H.warnings && A.push({ info: `
<bg_ok>No code smells detected!</bg_ok>` }), { output: A, codeHealthOutput: L, reportOutput: se, codeHealth: H };
}, rr = "\x1B[44m", bl = "\x1B[43m", Te = "\x1B[41m", El = "\x1B[42m", fe = "\x1B[0m", ir = "\x1B[33m", or = "\x1B[36m", Mt = "\x1B[0m", fs = (t) => t.replace(/<bg_err>/g, Te).replace(/<bg_warn>/g, bl).replace(/<bg_info>/g, rr).replace(/<bg_ok>/g, El).replace(/<\/bg_err>/g, fe).replace(/<\/bg_warn>/g, fe).replace(/<\/bg_info>/g, fe).replace(/<\/bg_ok>/g, fe).replace(/<text_warn>/g, ir).replace(/<text_info>/g, or).replace(/<\/text_warn>/g, Mt).replace(/<\/text_info>/g, Mt), Ds = (t) => (e) => {
  if (!e)
    return t === "apply" ? Object.keys(de) : void 0;
  const n = e.split(","), s = [], r = [];
  return n.forEach((i) => {
    xn.includes(i) ? s.push(...de[i]) : Object.values(de).some((o) => o.includes(i)) ? s.push(i) : r.push(i);
  }), r.length > 0 && (console.error(
    `
${Te}Invalid ${t} values: ${r.join(", ")}${fe}. 
${ir}Allowed values are: ${qs.join(", ")}${Mt}

`
  ), process.exit(1)), s;
};
function ps(t, e) {
  return `${su}file://${P.resolve(t)}${ru}${t}${iu}`;
}
const ur = ["rule", "file"], ar = ["asc", "desc"], cr = ["text", "json", "table"], lr = ["all", "error"], Cl = {
  groupBy: ur,
  sortBy: ar,
  outputLevel: lr,
  outputFormat: cr
}, ze = (t, e) => {
  const n = Cl[e];
  return (!Array.isArray(n) || !n.includes(t)) && (console.error(
    `
Invalid option ${Te}${t}${fe} provided for flag ${or}${e}${Mt}. Valid options are: ${rr}${n.join(", ")}${fe}.
`
  ), process.exit(1)), t;
}, Fl = process.argv[2] == "analyze" ? process.argv[3] : process.argv[4];
_n(Fl || "./src").then(async (t) => {
  const e = await Zs(t);
  Ks().then(
    (n) => _r(Oi(process.argv)).config(e).command(
      "analyze [path]",
      "Analyze Vue files for code smells and best practices",
      (s) => s.positional("path", {
        describe: "path to the Vue files",
        default: "./src"
      }).option("apply", {
        alias: "a",
        describe: "Comma-separated list of rulesets/rules to apply.",
        choices: qs,
        coerce: Ds("apply"),
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
        choices: ur,
        coerce: (r) => ze(r, "groupBy"),
        default: "",
        group: "Group Results:"
      }).option("level", {
        alias: "l",
        describe: "Output level",
        choices: lr,
        coerce: (r) => ze(r, "outputLevel"),
        default: "",
        group: "Output:"
      }).option("ignore", {
        alias: "i",
        describe: "Comma-separated list of rulesets to ignore.",
        coerce: Ds("ignore"),
        default: "",
        group: "Filter Rulesets:"
      }).option("sort", {
        alias: "s",
        describe: "Sort results at the output",
        choices: ar,
        coerce: (r) => ze(r, "sortBy"),
        default: "",
        group: "Sort Results:"
      }).option("output", {
        describe: "Output format",
        choices: cr,
        coerce: (r) => ze(r, "outputFormat"),
        default: "",
        group: "Output Format:"
      }).option("fileOutput", {
        alias: "f",
        describe: "Output file",
        default: "",
        group: "Output:"
      }),
      (s) => {
        const r = s.fileOutput, i = (o) => r ? (pe.appendFile(r, `${o}
`), o) : (console.log(fs(o)), fs(o));
        ml({
          dir: s.path,
          apply: s.apply,
          ignore: s.ignore,
          exclude: s.exclude,
          groupBy: s.group,
          level: s.level,
          sortBy: s.sort
        }).then((o) => {
          if (s.output == "text") {
            [...o.output].forEach((u) => {
              i(u.info);
            });
            for (const u in o.reportOutput) {
              let a = u;
              s.group === "file" && (a = ps(u)), i(`
- <text_info> ${a}</text_info>`), o.reportOutput[u].forEach((h) => {
                let f = h.id;
                s.group === "rule" && (f = ps(h.id)), i(`   ${f}`), i(`   ${h.description}`), i(`   ${h.message}
`);
              });
            }
            o.codeHealthOutput?.forEach((u) => {
              i(u.info);
            });
          }
          if (s.output == "table") {
            r && (console.log(`We can not output ${Te}to a file in table mode${fe}`), process.exit(1)), [...o.output].forEach((u) => {
              i(u.info);
            });
            for (const u in o.reportOutput) {
              const a = new Si({
                head: ["id", "message"],
                colWidths: [60, 60],
                wordWrap: !0,
                wrapOnWordBoundary: !1
              });
              i("-".repeat(120)), s.group == "rule" && (i(`<text_info>Rule: ${u}</text_info>`), i(`Description: ${o.reportOutput[u][0].description}`), o.reportOutput[u].forEach((h) => {
                a.push([i(h.id), i(h.message)]);
              })), s.group == "file" && (i(`<text_info>File: ${u}</text_info>`), o.reportOutput[u].forEach((h) => {
                a.push([`${h.id}
${h.description.replace("See: ", `See:
`)}`, h.message]);
              })), i(a.toString());
            }
            o.codeHealthOutput?.forEach((u) => {
              i(u.info);
            });
          }
          s.output == "json" && i(JSON.stringify(o, null, 2));
        }).catch((o) => {
          console.error(`${Te}${o}${fe}`);
        });
      }
    ).version("version", "Show version number", n.version).alias("version", "v").help().argv
  );
});
export {
  ou as FLAT_RULES,
  ml as analyze
};
