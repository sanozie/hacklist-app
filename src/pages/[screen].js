import { useEffect, useContext } from "react";
import Router, { useRouter } from 'next/router'

// Auth
import  { useUser } from 'utils/auth/useUser'

// Components
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import Submission from "./screens/Submission";
import AuthReroute from 'components/AuthReroute'

const Screen = () => {
    const router = useRouter()
    const { screen } = router.query
    const { user } = useUser()

    // Public paths
    if(screen === 'Signin') {
        return <Signin />
    }

    // Private path wall
    if (!user && !router.query.deepRoute) {
        return <AuthReroute />
    }

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
