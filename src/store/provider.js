// Reducer
import React, { useReducer } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'delete':
            return {}
        case 'update':
            return {}
        case 'replace':
            return action.data
        default:
            return state
    }
}

// Provider
const ProviderDecorator = (State, Dispatch) => {
    return ({children}) => {
        const [state, dispatch] = useReducer(reducer, null)

        return (
            <State.Provider value={state}>
                <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
            </State.Provider>
        )
    }
}

export default ProviderDecorator