import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'

const init = async () => {
    try {
        let user = getUserFromCookie()
        let submissions = await fetch(`/api/hacks?type=usersubmissions&uid=${user.id}`)
        return submissions.json()
    } catch {
        return null
    }
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, init)

// Export
export const Submissions = {
    State,
    Dispatch,
    Provider,
}