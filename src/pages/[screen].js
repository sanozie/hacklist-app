import { useRouter } from 'next/router'
import Signin from "./screens/Signin";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import Submission from "./screens/Submission";

const Screen = () => {
    const router = useRouter()
    const { screen } = router.query
    console.log("screens")
    switch(screen) {
        case '/':
            return <Signin/>
            break
        case 'Dashboard':
            return <Dashboard/>
            break
        case 'Signup':
            return <Signup/>
            break
        case 'Submission':
            return <Submission/>
            break
        default:
            return <Signin/>
    }
    return <p>wau</p>
}

export default Screen
