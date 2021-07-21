import React from 'react'
import App from 'next/app'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/mixins.scss';
import 'styles/variables.scss';
import 'styles/index.scss';
//calendar styles
import 'react-calendar/dist/Calendar.css';

import { Store } from 'store'

function Application({ Component, pageProps }) {
    return (
        <Store>
            <Component {...pageProps} />
        </Store>
    )
}

Application.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}
export default Application