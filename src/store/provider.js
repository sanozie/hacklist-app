// Reducer
import React, { useReducer, useEffect } from 'react'

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
const ProviderDecorator = (State, Dispatch, initializer, initArg = null) => {
    return ({children}) => {
        const [state, dispatch] = useReducer(reducer, initArg)

        useEffect(() => {
            initializer().then(data => {
                console.log(data)
                dispatch({ type: 'replace', data })
            })
        }, [])

        useEffect(() => {
            console.log(state)
        }, [state])

        return (
            <State.Provider value={state}>
                <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
            </State.Provider>
        )
    }
}

export default ProviderDecorator