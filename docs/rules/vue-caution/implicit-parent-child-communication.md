
# Implicit parent-child communication

Checks if props and events are used for parent-child component communication, instead of this.$parent or mutating props. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication

## Why it's good to follow this rule

- **Predictability:** Using props and events for parent-child communication makes the data flow predictable. Developers can easily trace the flow of data between components, leading to fewer bugs and easier debugging.
- **Maintainability:** Code is easier to maintain when the data flow is predictable and consistent.
- **Encapsulation:** Components remain more encapsulated, with clear interfaces for data input (props) and output (events).
- **Reusability:** Components that rely on props and events are more reusable, as they're not tightly coupled to parent components.
- **Debugging:** It's easier to debug issues when you can clearly see how data is being passed and modified.
- **Testing:** Components are easier to test in isolation when they rely on props and events rather than direct parent access.
- **Scalability:** As your application grows, consistent use of props and events helps manage complexity.
- **Prevents unexpected side effects:** Avoiding prop mutation reduces the risk of unexpected changes to parent state.
