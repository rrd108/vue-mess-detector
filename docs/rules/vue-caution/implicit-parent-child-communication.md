# Implicit parent-child communication

Checks if props and events are used for parent-child component communication, instead of this.$parent or mutating props. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication

## ❓ Why it's good to follow this rule?

- **Predictability:** Using props and events for parent-child communication makes the data flow predictable. Developers can easily trace the flow of data between components, leading to fewer bugs and easier debugging.
- **Encapsulation:** Components remain more encapsulated, with clear interfaces for data input (props) and output (events).
- **Reusability:** Components that rely on props and events are more reusable, as they're not tightly coupled to parent components.
- **Debugging:** It's easier to debug issues when you can clearly see how data is being passed and modified.
- **Testing:** Components are easier to test in isolation when they rely on props and events rather than direct parent access.
- **Scalability:** As your application grows, consistent use of props and events helps manage complexity.
- **Prevents unexpected side effects:** Avoiding prop mutation reduces the risk of unexpected changes to parent state.

## 😱 Examples of code for which this rule will throw a warning

::: warning
Implicit parent-child communication can lead to unmanageable code and unexpected behavior. The following examples demonstrate cases where implicit communication occurs, such as *prop mutation* or using *$parent* or *getCurrentInstance*.
:::

### Example 1: Prop Mutation
```js
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <input v-model="todo.text"> // [!code warning]
</template>
```

In this example, the `v-model` directive directly mutates the `todo` prop, which is passed down from a parent component. This implicit communication can make the flow of data hard to follow.

### Example 2: Using getCurrentInstance
```vue{11,18-20}
<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const instance = getCurrentInstance()

function removeTodo() {
  const parent = instance.parent
  if (!parent)
    return

  parent.props.todos = parent.props.todos.filter((todo) => {
    return todo.id !== props.todo.id
  })
}
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo">×</button>
  </span>
</template>
```

In this example, the `getCurrentInstance` function is used to access the parent component’s properties, leading to an implicit and tight coupling between the parent and child components.

## 🤩 How to fix it?

::: tip
To avoid implicit parent-child communication, ensure that data flow is explicit and clear. Here are some strategies:
:::

### Fixing `Prop Mutation`
Instead of mutating props directly, emit an event to the parent component to handle the change:
```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateTodo'])

function updateText(newText) {
  emit('updateTodo', { ...todo, text: newText })
}
</script>

<template>
  <input :value="todo.text" @input="updateText($event.target.value)">
</template>
```

### Fixing `getCurrentInstance`

Instead of accessing the parent component via `getCurrentInstance`, pass down a callback function as a prop to handle the logic in the parent:
```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  },
  onRemove: {
    type: Function,
    required: true
  }
})

function removeTodo() {
  onRemove(todo)
}
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo">×</button>
  </span>
</template>
```

By refactoring in this way, the component maintains clear and predictable behavior without relying on implicit communication, making the codebase easier to manage and debug.
