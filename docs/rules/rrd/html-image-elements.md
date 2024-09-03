# HTML Image Elements

Checks if HTML `<img>` or `<picture>` elements are used in the template of a **Nuxt project**. We recommend using the `NuxtImg` and `NuxtPicture` components instead from [NuxtImage module](https://image.nuxt.com/).

## ❓ Why it's good to follow this rule?

- **Performance:** NuxtImg and NuxtPicture components provide optimized image loading and rendering.
- **Consistency:** Using Nuxt-specific components ensures better integration with the Nuxt ecosystem.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses HTML image elements instead of Nuxt-specific components.
:::

```vue
<img src="/gauranga.jpg" alt="Gauranga" />
<picture>
  <source srcset="/gauranga-large.jpg" media="(min-width: 800px)">
  <img src="/gauranga-small.jpg" alt="A picture">
</picture>
```

## 🤩 How to fix it?

::: tip
Replace the HTML `<img>` and `<picture>` elements with the `NuxtImg` component.
:::

```vue
<NuxtImg src="/gauranga.jpg" alt="Gauranga" />
<NuxtPicture src="/image.jpg" alt="A picture" />
```

By using <NuxtImg> and <NuxtPicture> components, you leverage Nuxt's built-in image optimization features, improving performance and maintaining consistency across your Nuxt project.
