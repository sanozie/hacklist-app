import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let submissions = await fetch(`/api/hacks?type=usersubmissions&uid=${user.id}`)
        return await submissions.json()
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
export const Submissions = {
    State,
    Dispatch,
    Provider,
}