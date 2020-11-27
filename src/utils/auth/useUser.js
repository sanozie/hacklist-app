
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase } from 'db/client'
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

const useUser = () => {
    const [user, setUser] = useState()
    const router = useRouter()

    const logout = async () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                router.push('/Signin')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = firebase
            .auth()
            .onIdTokenChanged(async (user) => {
                if (user) {
                    const userData = await mapUserData(user)
                    setUserCookie(userData)
                    setUser(userData)
                } else {
                    removeUserCookie()
                    setUser(undefined)
                }
            })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            router.push('/[screen]', '/Signin')
            return
        }
        setUser(userFromCookie)

        return () => {
            cancelAuthListener()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { user, logout }
}

export { useUser }