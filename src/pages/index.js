import { useRouter } from 'next/router'
import Signin from './screens/Signin'
import Dashboard from './screens/Dashboard'
import Submission from './screens/Submission'
import Signup from './screens/Signup'


export default function Home() {
    let { pathname } = useRouter()
    return <Signin/>
}
