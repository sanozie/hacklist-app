// Reducer
import React, { useReducer, useEffect } from 'react'

const useAsyncReducer = (initializer, updater, deleter) => {
    let reducer = (state, action) => {
        switch (action.type) {
            case 'clear':
                return {}
            case 'replace':
                return action.data
            default:
                return state
        }
    }

    let [state, dispatch] = useReducer(reducer)

    // TODO: Handle errors for this eventually
    const asyncActions = () => {
        return {
            init: params => initializer(params).then(data => {
                dispatch({ type: 'replace', data })
            }),
            clear: () => dispatch({ type: 'clear' }),
            update: params => updater(params, state).then(data => {
                dispatch({ type: 'replace', data })
            }),
            delete: params => deleter(params, state).then(data => {
                dispatch({ type: 'replace', data })
            })
        }
    }

    let actions = asyncActions()

    return [state, actions]
}

// Provider
const ProviderDecorator = (State, Dispatch, initializer, updater, deleter) => {
    return ({children}) => {
        const [state, actions] = useAsyncReducer(initializer, updater, deleter)

        useEffect(() => {
            actions.init()
        }, [])

        return (
            <State.Provider value={state}>
                <Dispatch.Provider value={actions}>{children}</Dispatch.Provider>
            </State.Provider>
        )
    }
}

export default ProviderDecorator