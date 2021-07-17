import { createContext, useContext, useEffect } from 'react'

import { Submissions } from 'store/submissions'
import { Signups } from 'store/signups'

const State = createContext()
const Dispatch = createContext()

/**
 * Store element that syncs data across different contexts
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Sync = ({children}) => {
    const submissionState = useContext(Submissions.State)
    const signupActions = useContext(Signups.Dispatch)

    // Syncing signups to submissions
    useEffect(() => {
        signupActions.init()
    }, [submissionState])

    return (
        <State.Provider value>
            <Dispatch.Provider value>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export { Sync }