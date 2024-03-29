import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let portfolio = await fetch(`/api/hacks?type=portfolio&uid=${user.uid}`)
        let state = await portfolio.json(), headers = { updated: { last: null, method: null } }
        return { state, headers }
    } catch {
        return null
    }
}

const updater = async () => {
    return null
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, initializer, updater)

// Export
export const Portfolio = {
    State,
    Dispatch,
    Provider,
}