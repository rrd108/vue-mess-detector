# Rate Limiter

Checks if in your `nuxt` project you use the `server` directory to handle API routes and if you have a rate limiter in use. 
Recognized rate limiters are [nuxt-api-shield](https://github.com/rrd108/nuxt-api-shield) and [nuxt-security](https://nuxt-security.vercel.app/).

## ❓ Why it's good to follow this rule?

A rate limiter is important to prevent abuse of your API by bad actors. It limits the number of requests a client can make to your API within a given time period, helping to protect your API from being overwhelmed by excessive traffic, crawling and brute force attacks.


## 🤩 How to fix it?

Install one of the recognized rate limiters and configure it in your project.