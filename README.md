<h1 align='center'> 🛒 reactmart</h1>

---
<div align='center'>
<img src='https://img.shields.io/github/languages/code-size/givensuman/reactmart' alt='code size' /> 
&nbsp;
<img src='https://img.shields.io/badge/-Open%20Source-ff69b4' alt='open source' />
&nbsp;
<img src='https://img.shields.io/badge/build-passing-success' alt='passing' />
</div>
<br />

reactmart is a simple global state management solution built using React hooks. It's meant to imitate the design of Vuex of the Vue ecosystem, keeping your state in a plain-old-javascript-object (POJO).

This package ships with only two exports:

|name	|export |description   	|
|---	|---	|---	|
|useStore   	|default   	|Custom hook that returns store object   	|
|StoreProvider  |named   	|Context wrapper component   	|

Each key/value in your store is returned by `useStore` with a `state` value and `set` method attached.

- `state` is the current value of the state key.

- `set` is a function that takes a new state value and updates the `state` value.

<br />

To use reactmart, first wrap the `StoreProvider` component at the root of your project, and pass it the initial state of each store variable in object notation:
```js
// App.js
import React from 'react'
import { StoreProvider } from 'reactmart'
import Children from './Children'

export const App = () => 
    <StoreProvider value={{
        name: 'lemon',
        taste: 'sour',
        type: 'citrus'
    }}>
        <Children />
    </StoreProvider>
```
Then, in any child of `StoreProvider`, call `useStore` to access the store. It's useful to destructure the result:
```js
// Child.js
import React from ' react'
import useStore from 'reactmart'

export const Child = () => {
    const { name } = useStore()

    return (
        <>
        <h1>{name.state}</h1> // Displays 'lemon'
        <button 
        onClick={() => name.set('lime')} // Updates 'lemon' to 'lime'
        >Click me</button>
        </>
    )
}
```
Try it out and see how it fits your project! 
<br />