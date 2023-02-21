<h1 align='center'> 🛒 reactmart</h1>

---
<div align='center'>
<img src='https://img.shields.io/github/languages/code-size/givensuman/reactmart' alt='code size' /> 
&nbsp;
&nbsp;
<img src='https://img.shields.io/badge/build-passing-success' alt='passing' />
</div>
<br />

_Warning_: You probably don't need this library. If you're looking for third-party React state-management, check out the [zustand](https://www.npmjs.com/package/zustand) library first!

reactmart is a simple global state management solution built using React hooks. It's meant to imitate the design of Vuex of the Vue ecosystem, keeping your state in a plain-old-javascript-object (POJO).

This package ships with only three exports:

|name	|export |description   	|
|---	|---	|---	|
|useStore   	|default   	|Custom hook that returns store object   	|
|StoreProvider  |named   	|Context provider component   	|
|Store   |type   |  Type used internally to convert store into a stateful store type

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
        foo: "bar",
        biz: "baz"
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
    const { foo } = useStore()

    return (
        <>
            {/* Displays "bar" */}
            <h1>{foo.state}</h1>

            {/* Updates foo to "buz" */}
            <button 
                onClick={() => foo.set('buz')}
            >
                Click me
            </button>
        </>
    )
}
```
By its nature, `useStore` doesn't know what's in your store. You can explicitly define your store's shape with TypeScript generics:
```js
const store = useStore<{
    foo: string,
    bar: string
}>()

/*
typeof store == {
    foo: {
        readonly state: string,
        set: React.Dispatch<React.SetStateAction<string>>
    },
    bar: {
        readonly state: string,
        set: React.Dispatch<React.SetStateAction<string>>
    }
}
*/
```

It's recommended to seperate the store and provide its type throughout your app:
```js
// store.ts
import useStore from "reactmart"

export const store = {
    foo: "bar",
    biz: "baz"
}

export const useTypedStore = () => useStore<typeof store>()
```
Or manually get the shape of the store to do whatever you want with it:
```js
// store.ts
import type { Store } from "reactmart"

export const store = {
    foo: "bar",
    biz: "baz"
}

export type StoreType = Store<typeof store>
```
<br />