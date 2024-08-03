# 💻 rrd Rules

## Cyclomatic Complexity

Checks if the cyclomatic complexity of a component is too high. The default threshold is 5. Between 5 and 10 you get a warning, above 10 you get an error.

## Deep Indentation

Checks if the indentation of the component is too deep. The default for `tabs` is 5, for `spacees` is 15.

## `else` conditions

Checks if there are any `else` condition in the `<script>` block. This is a code smell because it can be hard to read and understand.

## Function Size

Checks if functions inside `<script setup>` block are less than 20 lines of code. It handles regular and arrow functions.

## Parameter Count

Checks if functions inside `<script setup>` block have less than 4 parameters. It handles regular and arrow functions.

## Plain Script

Checks if the script section of a Vue component is not using `<script setup>`

## Script Length

Checks if the script section of a Vue component is too long. The default threshold is 100 lines. Between 100 and 200 lines you get a warning, above 200 lines you get an error.

## Short Variable Name

Checks if variable names inside `<script setup>` block have less than 4 chars.

## Too many props

Checks if the component got more then 5 props.
