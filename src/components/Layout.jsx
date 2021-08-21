// Next
import Head from 'next/head'
// Components
import Navi from './Navi'

let Layout = props => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            {props.nav && (
                <Navi />
            )}
            {props.children}
        </>
    )
    
}

export default Layout;