import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const init = async () => {
    try {
        let user = getUserFromCookie()
        let signups = await fetch(`/api/hacks?type=usersignups&uid=${user.id}`, { method: 'GET'})
        return await signups.json()
    } catch {
        return null
    }
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, init)

// Export
export const Signups = {
    State,
    Dispatch,
    Provider,
}