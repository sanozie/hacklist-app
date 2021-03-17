import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const init = async () => {
    try {
        let user = getUserFromCookie()
        let activeHacks = await fetch(`/api/hacks?type=activehacks&uid=${user.id}`)
        let pastHacks = await fetch(`/api/hacks?type=pasthacks&uid=${user.id}`)
        let active = await activeHacks.json()
        let past = await pastHacks.json()
        return { active, past }
    } catch {
        return null
    }
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, init)

// Export
export const ActiveHacks = {
    State,
    Dispatch,
    Provider,
}