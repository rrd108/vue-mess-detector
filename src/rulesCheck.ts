import type { SFCDescriptor } from '@vue/compiler-sfc';
import { checkScriptLength } from './rules/rrd/scriptLength';
import { checkPlainScript } from './rules/rrd/plainScript';
import { checkElseCondition } from './rules/rrd/elseCondition';
import { checkCyclomaticComplexity } from './rules/rrd/cyclomaticComplexity';
import { checkSingleNameComponent } from './rules/vue-essential/singleNameComponent';
import { checkGlobalStyle } from './rules/vue-essential/globalStyle';
import { checkSimpleProp } from './rules/vue-essential/simpleProp';
import { checkVifWithVfor } from './rules/vue-essential/vifWithVfor';
import { checkVforNoKey } from './rules/vue-essential/vforNoKey';
import { checkComponentFilenameCasing } from './rules/vue-strong/componentFilenameCasing';
import { checkPropNameCasing } from './rules/vue-strong/propNameCasing';
import { checkTemplateSimpleExpression } from './rules/vue-strong/templateSimpleExpression';
import { checkQuotedAttributeValues } from './rules/vue-strong/quotedAttributeValues';
import { checkSelfClosingComponents } from './rules/vue-strong/selfClosingComponents';
import { checkDirectiveShorthands } from './rules/vue-strong/directiveShorthands';
import { checkFullWordComponentName } from './rules/vue-strong/fullWordComponentName';
import { checkTopLevelElementOrder } from './rules/vue-recommended/topLevelElementOrder';
import { checkElementAttributeOrder } from './rules/vue-recommended/elementAttributeOrder';
import { checkTooManyProps } from './rules/rrd/tooManyProps';
import { checkFunctionSize } from './rules/rrd/functionSize';
import { checkParameterCount } from './rules/rrd/parameterCount';
import { checkPropsDrilling } from './rules/rrd/propsDrilling';
import { checkShortVariableName } from './rules/rrd/shortVariableName';
import { checkSimpleComputed } from './rules/vue-strong/simpleComputed';
import { checkComponentFiles } from './rules/vue-strong/componentFiles';
import { checkImplicitParentChildCommunication } from './rules/vue-caution/implicitParentChildCommunication';
import type { RuleSetType } from './rules/rules';
import { checkDeepIndentation } from './rules/rrd/deepIndentation';
import { checkElementSelectorsWithScoped } from './rules/vue-caution/elementSelectorsWithScoped';
import { checkHtmlLink } from './rules/rrd/htmlLink';
import { checkMagicNumbers } from './rules/rrd/magicNumbers';
import { checkMultiAttributeElements } from './rules/vue-strong/multiAttributeElements';
import { checkIfWithoutCurlyBraces } from './rules/rrd/ifWithoutCurlyBraces';
import { checkNestedTernary } from './rules/rrd/nestedTernary';
import { checkVForWithIndexKey } from './rules/rrd/vForWithIndexKey';
import { checkNoPropDestructure } from './rules/rrd/noPropDestructure';

export const checkRules = (descriptor: SFCDescriptor, filePath: string, apply: Array<RuleSetType>) => {
  const script = descriptor.scriptSetup || descriptor.script;
  console.log(`Analyzing ${filePath}...`);

  // ⚠️ contributors ⚠️ script rules can be used for ts, js and vue files, but template and style rules are only for vue files
  const isVueFile = filePath.endsWith('.vue');

  if (apply.includes('vue-essential')) {
    checkSimpleProp(script, filePath);

    if (isVueFile) {
      checkSingleNameComponent(filePath);
      checkGlobalStyle(descriptor.styles, filePath);
      checkVforNoKey(descriptor.template, filePath);
      checkVifWithVfor(descriptor.template, filePath);
    }
  }

  if (apply.includes('vue-strong')) {
    checkSimpleComputed(script, filePath);

    if (isVueFile) {
      checkComponentFiles(script, filePath);
      checkPropNameCasing(script, filePath);
      checkComponentFilenameCasing(filePath);
      checkSelfClosingComponents(descriptor, filePath);
      checkTemplateSimpleExpression(descriptor.template, filePath);
      checkQuotedAttributeValues(descriptor, filePath);
      checkDirectiveShorthands(descriptor, filePath);
      checkFullWordComponentName(filePath);
      checkMultiAttributeElements(descriptor.template, filePath);
    }
  }

  if (apply.includes('vue-recommended')) {
    // no rule for ts/js files

    if (isVueFile) {
      checkTopLevelElementOrder(descriptor.source, filePath);
      checkElementAttributeOrder(descriptor.template, filePath);
    }
  }

  if (apply.includes('vue-caution')) {
    // no rule for ts/js files

    if (isVueFile) {
      checkImplicitParentChildCommunication(script, filePath);
      checkElementSelectorsWithScoped(descriptor.styles, filePath);
    }
  }

  if (apply.includes('rrd')) {
    checkCyclomaticComplexity(script, filePath);
    checkDeepIndentation(script, filePath);
    checkElseCondition(script, filePath);
    checkFunctionSize(script, filePath);
    checkIfWithoutCurlyBraces(script, filePath);
    checkMagicNumbers(script, filePath);
    checkNestedTernary(script, filePath);
    checkParameterCount(script, filePath);
    checkPropsDrilling(script, filePath);
    checkScriptLength(script, filePath);
    checkShortVariableName(script, filePath);
    checkTooManyProps(script, filePath);
    checkNoPropDestructure(script, filePath);

    if (isVueFile) {
      checkHtmlLink(descriptor.template, filePath);
      checkPlainScript(descriptor.script, filePath);
      checkVForWithIndexKey(descriptor.template, filePath);
    }
  }
};
