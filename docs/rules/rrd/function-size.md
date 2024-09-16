# Function Size

Checks if functions inside `script setup` block are less than **20** lines of code. It handles regular and arrow functions.

:::tip
  The default max size for this rule is **20**.
  
  You can override through the new `override` option in `vue-mess-detector.json`.

  ```json
  {
    // Other fields...

    "override": {
      "maxFunctionSize": 50
    }
  }
  ```
:::

## ❓ Why it's good to follow this rule?

- **Simple Responsibility**: A function that is too long is likely doing too many things. It is better to split your function into smaller functions/composables.
- **Readability**: Smaller functions are easier to read and understand.
- **Maintainability**: Smaller functions are easier to maintain and refactor.
- **Testability**: Smaller functions are easier to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains functions that exceed the recommended size limit. Large functions can be difficult to read, understand, and maintain.
:::

```javascript
function dummyRegularFunction() {
  const firstName = 'john'
  const lastName = 'doe'
  const age = 30

  if (age < 18) {
    console.log('Too young for this function!')
  }
  else {
    console.log('Hello ', firstName)
  }

  const hobbies = ['reading', 'gaming', 'cooking']
  for (const hobby of hobbies) {
    console.log('I enjoy ', hobby)
  }

  const getRandomNumber = () => Math.floor(Math.random() * 100)
  const randomNum = getRandomNumber()
  console.log('Random number: ', randomNum)

  return 'Function execution complete!'
}
```

Another example with an arrow function:

```javascript
const getOpenBookings = page =>
  axios
    .get(`${import.meta.env.VITE_APP_API_URL}bookings/listOpen.json?page=${page}`, store.tokenHeader)
    .then((res) => {
      bookings.value = res.data.bookings
      paginate.value = res.data.paginate

      const hobbies = ['reading', 'gaming', 'cooking']
      for (const hobby of hobbies) {
        console.log('I enjoy ', hobby)
      }

      bookings.value = res.data.bookings
      paginate.value = res.data.paginate
      bookings.value = res.data.bookings
      paginate.value = res.data.paginate
      bookings.value = res.data.bookings
      paginate.value = res.data.paginate
      // Additional repetitive lines...
    })
    .catch(err => console.error(err))
```

## 🤩 How to fix it?

::: tip
Refactor the function to reduce its size by breaking it down into smaller, more focused functions. This improves readability, testability, and maintainability.
:::

For the first example:

```javascript
function logAgeMessage(age) {
  if (age < 18) {
    console.log('Too young for this function!')
  }
  else {
    console.log('Hello ', firstName)
  }
}

function listHobbies(hobbies) {
  for (const hobby of hobbies) {
    console.log('I enjoy ', hobby)
  }
}

function dummyRegularFunction() {
  const firstName = 'john'
  const lastName = 'doe'
  const age = 30

  logAgeMessage(age)
  listHobbies(['reading', 'gaming', 'cooking'])

  const randomNum = Math.floor(Math.random() * 100)
  console.log('Random number: ', randomNum)

  return 'Function execution complete!'
}
```

For the arrow function:

```javascript
const handleResponse = (res) => {
  bookings.value = res.data.bookings
  paginate.value = res.data.paginate
  // Handle repetitive logic here or refactor further
}

const getOpenBookings = page =>
  axios
    .get(`${import.meta.env.VITE_APP_API_URL}bookings/listOpen.json?page=${page}`, store.tokenHeader)
    .then(handleResponse)
    .catch(err => console.error(err))
```
