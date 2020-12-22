import React from 'react'
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/mixins.scss';
import 'styles/variables.scss';
import 'styles/index.scss';

// Theme

import theme from 'lib/AppTheme'

//calendar styles
import 'react-calendar/dist/Calendar.css';

import { Store } from 'store'

export default function MyApp({ Component, pageProps }) {
    return (
        <Store>
            <Component {...pageProps} />
        </Store>
    )
}