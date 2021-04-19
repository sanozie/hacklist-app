import {createContext} from 'react'
import ProviderDecorator from './provider'
import {getUserFromCookie} from 'utils/auth/userCookies'
import produce from 'immer'
import {formatSignupData} from 'utils/formatdata'

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

    fetch(`/api/hacks?type=signup&uid=${uid}`, {
        method: 'POST',
        body: JSON.stringify(update)
    })

    return produce(state, draftState => {
        draftState[hackId].signups[uid].skill = skill
        Object.entries(draftState).forEach(([hackId, hackValue]) => {
            draftState[hackId] = formatSignupData(hackValue, 'client')
        })
    })
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