import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'
import produce from 'immer'
import { formatSignupData } from 'utils/data/formatdata'

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let signups = await fetch(`/api/hacks?type=usersignups&uid=${user.uid}`)
        let state = await signups.json(), headers = { updated: { last: null, method: null } }
        return { state, headers }
    } catch {
        return null
    }
}

const updater = async (update, state) => {
    let { hackId, uid, skill, hack } = update

    fetch(`/api/hacks?type=signup&uid=${uid}`, {
        method: 'POST',
        body: JSON.stringify(update)
    })

    return produce(state, draftState => {
        if(!draftState.state[hackId]) {
            draftState.state[hackId] = hack
            draftState.state[hackId].signups[uid] = { query: true }
        }

        draftState.state[hackId].signups[uid].skill = skill
        draftState.state[hackId] = formatSignupData(draftState.state[hackId], 'client')

        draftState.headers.updated.last = hackId
        draftState.headers.updated.method = 'update'
    })
}

const deleter = async (update, state) => {
    let { hackId, uid } = update

    fetch(`/api/hacks?type=signup&uid=${uid}`, {
        method: 'DELETE',
        body: JSON.stringify(update)
    })

    return produce(state, draftState => {
        delete draftState.state[hackId]
        draftState.headers.updated.last = hackId
        draftState.headers.updated.method = 'delete'
    })
}

// Context
const State = createContext()
const Dispatch = createContext()
const Provider = ProviderDecorator(State, Dispatch, initializer, updater, deleter)


// Export
export const Signups = {
    State,
    Dispatch,
    Provider,
}