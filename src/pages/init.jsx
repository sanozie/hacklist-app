import {useRouter} from "next/router";
import {useEffect} from "react"

export default function Init() {
    const router = useRouter()
    useEffect(() => {
        let startPage = 'Dashboard'
        let lastVisited = localStorage.getItem('lastVisited')
        if(lastVisited) {
            startPage = lastVisited
        }
        // Development console
        router.push('/[screen]', `/${startPage}`).then(() => {
            console.log(`routed to ${startPage}`)
        })
    }, [])

    return <div>Welcome</div>
}