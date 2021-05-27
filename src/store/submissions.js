import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'
import produce from 'immer'

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let submissions = await fetch(`/api/hacks?type=usersubmissions&uid=${user.id}`)
        return await submissions.json()
    } catch {
        return null
    }
}

const updater = async (hack, state) => {
    return null
}

const deleter = async (update, state) => {
    let { hackId } = update

    fetch(`/api/hacks?type=submission`, {
        method: 'DELETE',
        body: JSON.stringify(update)
    })

    return produce(state, draftState => {
        delete draftState[hackId]
    })
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, initializer, updater, deleter)

// Export
export const Submissions = {
    State,
    Dispatch,
    Provider,
}