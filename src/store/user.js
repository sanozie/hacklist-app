import { createContext, useEffect } from 'react'
import { useUser } from 'utils/auth/useUser'

const State = createContext()
const Dispatch = createContext()

/**
 * Context for user data
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Provider = ({children}) => {
    const { user, logout } = useUser()
    const actions = { logout }

    return (
        <State.Provider value={user}>
            <Dispatch.Provider value={actions}>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export const User = { State, Dispatch, Provider }