import Head from "next/head"
import Navi from "./Navi";

let Layout = props => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.nav && (
                <Navi />
            )}
            {props.children}
        </>
    )
    
}

export default Layout;