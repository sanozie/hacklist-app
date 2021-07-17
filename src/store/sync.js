import { createContext, useContext, useEffect } from 'react'

import { Submissions } from 'store/submissions'
import { Signups } from 'store/signups'

const State = createContext()
const Dispatch = createContext()
// Provider
const Sync = ({children}) => {
    const submissionState = useContext(Submissions.State)
    const signupState = useContext(Signups.State)



    return (
        <State.Provider value>
            <Dispatch.Provider value>{children}</Dispatch.Provider>
        </State.Provider>
    )
}

export { Sync }