import { useRouter } from 'next/router'

// Auth
import { useUser } from 'utils/auth/useUser'

// Components
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import AddSubmission from "./screens/AddSubmission";
import AuthReroute from 'components/AuthReroute'
import SubmissionDash from './screens/SubmissionDash'

const Screen = () => {
    const router = useRouter()
    const { screen } = router.query
    const { user } = useUser()

    // Public paths
    if(screen === 'Signin') {
        return <Signin />
    }

    // Private path wall (no unauthenticated users access paths below)
    if (!user && !router.query.deepRoute) {
        return <AuthReroute />
    }

    // Private paths
    switch(screen) {
        case '/':
            return <Signin />
        case 'Dashboard':
            return <Dashboard user={user}/>
        case 'Signup':
            return <Signup user={user} />
        case 'AddSubmission':
            return <AddSubmission />
        case 'SubmissionDash':
            return <SubmissionDash />
        default:
            return <Signin/>
    }

    return <p>Wau. Something's really, really broken. Sorry about that.</p>
}


export default Screen
