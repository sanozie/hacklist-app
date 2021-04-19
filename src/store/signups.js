import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let signups = await fetch(`/api/hacks?type=usersignups&uid=${user.id}`)
        return await signups.json()
    } catch {
        return null
    }
}

const updater = async (update, state) => {
    let { hackId, uid, skill } = update
    state[hackId].signups = { ...state[hackId].signups, [uid]: { query: true, skill }}
    fetch(`/api/hacks?type=signup&uid=${uid}`, {
        method: 'POST',
        body: JSON.stringify(update)
    })
    console.log(state)
    return state
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, initializer, updater)


// Export
export const Signups = {
    State,
    Dispatch,
    Provider,
}