# HTML Links

Check if HTML links are used in the template.


## ❓ Why it's good to follow this rule?

- Vue router and NuxtLinks are more powerful than HTML links.


## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a HTML link.
:::

```html
<ul>
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>
```

## 🤩 How to fix it?

::: tip
Replace HTML links with Vue router links or NuxtLinks.
:::


```html
<ul>
  <li><router-link to="/home">Home</router-link></li>
  <li><NuxtLink to="/about">About</NuxtLink></li>
</ul>
```
