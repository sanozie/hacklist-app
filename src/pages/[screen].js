// React & Next
import { useRouter } from 'next/router'
// Auth
import { useUser } from 'utils/auth/useUser'
// Pages
import Signin from './screens/Signin'
import Dashboard from './screens/Dashboard'
import Signup from './screens/Signup'
import AddSubmission from './screens/AddSubmission'
import AuthReroute from 'components/AuthReroute'
import SubmissionDash from './screens/SubmissionDash'
import SignupDash from './screens/SignupDash'

const Screen = () => {
    const router = useRouter()
    const { user } = useUser()
    const { screen } = router.query

    // Public paths
    if(screen === 'Signin') {
        return <Signin />
    }

    // Private path wall (no unauthenticated users access paths below)
    if (!user) {
        return <AuthReroute />
    }

    // Private paths
    switch(screen) {
        case '/':
            return <Signin />
        case 'Dashboard':
            return <Dashboard />
        case 'Signup':
            return <Signup user={user} />
        case 'AddSubmission':
            return <AddSubmission />
        case 'SubmissionDash':
            return <SubmissionDash user={user} />
        case 'SignupDash':
            return <SignupDash user={user} />
        default:
            return <Signin/>
    }
}


export default Screen
