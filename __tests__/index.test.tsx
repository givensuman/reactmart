import React from 'react'
import ReactDOM from 'react-dom'

import useStore, { StoreProvider } from '../src/index'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
  <StoreProvider value={{ foo: 'bar' }}>
  </StoreProvider>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('returns state', () => {
  const div = document.createElement('div')
  const SomeComponent = () => {
    const { foo } = useStore()
    expect(foo.state).toBe('bar')
    return null
  }
  ReactDOM.render(
  <StoreProvider value={{ foo: 'bar' }}>
    <SomeComponent />
  </StoreProvider>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('sets new state', () => {
  const div = document.createElement('div')
  const SomeComponent = () => {
    const { foo } = useStore()
    React.useEffect(() => foo.set('baz'), [])
    return null
  }
  ReactDOM.render(
  <StoreProvider value={{ foo: 'bar' }}>
    <SomeComponent />
  </StoreProvider>, div)
  ReactDOM.unmountComponentAtNode(div)
})