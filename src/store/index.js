import React from 'react'

// Material UI
import { ThemeProvider } from '@material-ui/core/styles'
import theme from "lib/AppTheme";

// Local Store
import { Submissions } from './submissions'

const providers = [<ThemeProvider theme={theme} />, <Submissions.Provider />]

const Store = ({ children: initial }) =>
    providers.reduce(
        (children, parent) => React.cloneElement(parent, { children }),
        initial
    )

export { Store, Submissions }