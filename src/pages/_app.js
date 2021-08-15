// React & Next
import React from 'react'
import App from 'next/app'
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/mixins.scss';
import 'styles/variables.scss';
import 'styles/index.scss';
// Material UI
import theme from 'lib/AppTheme'
import { ThemeProvider } from '@material-ui/core/styles'
// Calendar styles
import 'react-calendar/dist/Calendar.css'
// Store
import { Store } from 'store'

function Application({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme} >
            <Store>
                <Component {...pageProps} />
            </Store>
        </ThemeProvider>
    )
}

Application.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}
export default Application