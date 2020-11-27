import { useRouter } from "next/router";

const AuthReroute = () => {
    const router = useRouter()
    return (
        <div>
            Sorry, you're not signed in. Please sign back in.
            <button onClick={() => {router.push('/Signin')}}>Sign in</button>
        </div>
    )
}

export default AuthReroute