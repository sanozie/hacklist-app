// React & Next
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// Components
import { MainProgression } from 'components/Progression'

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        let startPage = 'Dashboard'
        let lastVisited = localStorage.getItem('lastVisited')
        if(lastVisited) {
            startPage = lastVisited
        }
        router.push('/[screen]', `/${startPage}`)
    }, [])

    return <MainProgression message="Welcome" />
}
