import { useEffect } from "react";
import Router, { useRouter } from 'next/router'

// Components
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import Submission from "./screens/Submission";

// Client DB
import { firebase } from "db/client";

function isRouterReady(router) {
    return router.asPath !== router.route;
}

const Screen = () => {
    const router = useRouter()
    const { screen } = router.query

    // Not a good method for auth right now because of async, but good for now.
    // If user is unauthenticated, they will see a blip of the real site before
    // They're redirected to the signin page here. Process to make asynchronous nature
    // synchronous would be nice.
    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {
            if(!user) {
                return <Signin/>
            }
        })
    })

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
