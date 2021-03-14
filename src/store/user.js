import { getUserFromCookie } from 'utils/auth/userCookies'

import { createContext } from 'react'

import ProviderDecorator from './provider'

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, user)

// Export
export const Submissions = {
    State,
    Dispatch,
    Provider,
}