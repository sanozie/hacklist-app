import { createContext } from 'react'
import ProviderDecorator from './provider'
import { getUserFromCookie } from 'utils/auth/userCookies'
import produce from 'immer'
import { formatSubmissionData } from 'utils/data/formatdata'

// Mappings
const methodUsage = {
    add: 'POST',
    update: 'PUT'
}

const initializer = async () => {
    try {
        let user = getUserFromCookie()
        let submissions = await fetch(`/api/hacks?type=usersubmissions&uid=${user.uid}`)
        let state = await submissions.json(), headers = { updated: { last: null, method: null } }
        return { state, headers }
    } catch {
        return null
    }
}

const updater = async (params, state) => {
    let { usage, uid, data } = params

    let hack = await fetch(`/api/hacks?type=submission&uid=${uid}`, {
        method: methodUsage[usage],
        body: JSON.stringify(data)
    })
    const { hackId, hackData } = await hack.json()

    return produce(state, draftState => {
        draftState.state[hackId] = draftState.state[hackId]
            ? formatSubmissionData({ ...draftState.state[hackId], ...hackData }, 'client')
            : hackData
        draftState.headers.updated.last = hackId
        draftState.headers.updated.method = 'update'
    })
}

const deleter = async (update, state) => {
    let { hackId } = update

    fetch(`/api/hacks?type=submission`, {
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
export const Submissions = {
    State,
    Dispatch,
    Provider,
}