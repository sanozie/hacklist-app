import { createContext } from 'react'

import ProviderDecorator from './provider'

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch)

// Export
export const Signups = {
    State,
    Dispatch,
    Provider,
}