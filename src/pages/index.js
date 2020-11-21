import { useRouter } from 'next/router'
import Init from "./init"
import {useEffect} from "react";

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        let startPage = 'Dashboard'
        let lastVisited = localStorage.getItem('lastVisited')
        if(lastVisited) {
            startPage = lastVisited
        }
        console.log('was here')
        router.push('/[screen]', `/${startPage}`)
    }, [])

    return <div>Welcome</div>
}
