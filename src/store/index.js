import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from "lib/AppTheme";

const providers = [<ThemeProvider theme={theme} />]

const Store = ({ children: initial }) =>
    providers.reduce(
        (children, parent) => React.cloneElement(parent, { children }),
        initial
    )

export { Store }