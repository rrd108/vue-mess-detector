# Strict Transport Security (HSTS)

Checks if your `nuxt.config` file has the Strict-Transport-Security (HSTS) header configured. The rule scans for `Strict-Transport-Security`, `strict-transport-security`, and `strictTransportSecurity` patterns in your Nuxt config.

## ❓ Why it's good to follow this rule?

The HSTS header ensures that browsers always connect to your site over HTTPS, protecting against downgrade attacks and cookie hijacking. Without HSTS, a man-in-the-middle attacker could intercept the first request and force a connection over HTTP, even if your site supports HTTPS.

When a browser receives the HSTS header, it remembers to only use HTTPS for your site for the specified `max-age` period, and optionally for all subdomains if `includeSubDomains` is set.

## 🤍 How to fix it?

Add the Strict-Transport-Security header to your Nuxt config, either manually or by using [nuxt-security](https://nuxt-security.vercel.app/).

### Option 1: Manual configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        },
      },
    },
  },
})
```

### Option 2: Using nuxt-security

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-security'],
  security: {
    headers: {
      strictTransportSecurity: 'max-age=31536000; includeSubDomains',
    },
  },
})
```