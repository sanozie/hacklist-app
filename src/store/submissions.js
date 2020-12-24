import { createContext, useReducer } from 'react'

// Context
const State = createContext()
const Dispatch = createContext()

// Reducer
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
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, null)

    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

// Export
export const Submissions = {
    State,
    Dispatch,
    Provider,
}