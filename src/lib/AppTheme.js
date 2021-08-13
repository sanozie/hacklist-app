import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: { type: 'dark' },
})
theme.palette.primary = theme.palette.augmentColor({ main: "#9D67E3" })
theme.palette.secondary = theme.palette.augmentColor({ main: "#50E3C1" })
theme.palette.tertiary = theme.palette.augmentColor({ main: "#FFD100" })
theme.palette.base = theme.palette.augmentColor({ main: "#2B2B2B" })

theme.typography.fontFamily = 'Raleway'
theme.typography.h1 = {
    fontWeight: 700,
    fontSize: 'calc(0.8rem + 0.8vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}
theme.typography.h2 = {
    fontWeight: 700,
    fontSize: 'calc(0.6rem + 0.6vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}
theme.typography.h3 = {
    fontWeight: 300,
    fontSize: 'calc(0.6rem + 0.6vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}
theme.typography.h4 = {
    fontWeight: 700,
    fontSize: 'calc(0.5rem + 0.5vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}
theme.typography.h5 = {
    fontWeight: 100,
    fontSize: 'calc(0.5rem + 0.5vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)',
    opacity: 0.7
}
theme.typography.body1 = { // p
    fontWeight: 300,
    fontSize: 'calc(0.5rem + 0.5vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}
theme.typography.body2 = { // p
    fontWeight: 100,
    fontSize: 'calc(0.5rem + 0.5vw)',
    letterSpacing: 'calc(0.03rem + 0.04vw)'
}

export default theme