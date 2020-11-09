import Router, { useRouter } from 'next/router'
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import Submission from "./screens/Submission";
import { firebase } from "../firebase";
import {useEffect} from "react";

function isRouterReady(router) {
    return router.asPath !== router.route;
}

const Screen = () => {
    const router = useRouter()
    const { screen } = router.query
    useEffect(() => {
        debugger
        if(isRouterReady(router)) {
            firebase.auth().onAuthStateChanged(user => {
                if(!user) {
                    return <Signin/>
                }
            })
        }
    }, [router])

    // Lowkey... this shouldn't be working... but it is...
    // Write up here: https://www.notion.so/Routing-Solutions-067c1bb8e2094b6d80f562ea0fbfccee
    switch(screen) {
        case '/':
            return <Signin/>
        case 'Dashboard':
            return <Dashboard/>
        case 'Signup':
            return <Signup/>
        case 'Submission':
            return <Submission/>
        default:
            return <Signin/>
    }

    return <p>Wau. Something's really, really broken. Sorry about that.</p>
}

export default Screen
