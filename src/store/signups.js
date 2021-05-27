import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'
import produce from 'immer'
import { formatSignupData } from 'utils/formatdata'

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
    let { hackId, uid, skill, hack } = update

    fetch(`/api/hacks?type=signup&uid=${uid}`, {
        method: 'POST',
        body: JSON.stringify(update)
    })

    return produce(state, draftState => {
        if(!draftState[hackId]) {
            draftState[hackId] = hack
            draftState[hackId].signups[uid] = { query: true }
        }

        draftState[hackId].signups[uid].skill = skill
        Object.entries(draftState).forEach(([hackId, hackValue]) => {
            draftState[hackId] = formatSignupData(hackValue, 'client')
        })
    })
}

const deleter = async (update, state) => {
    let { hackId, uid } = update

    fetch(`/api/hacks?type=signup&uid=${uid}`, {
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
export const Signups = {
    State,
    Dispatch,
    Provider,
}