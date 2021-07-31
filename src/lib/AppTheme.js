import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: { type: 'dark' }
})
theme.palette.primary = theme.palette.augmentColor({ main: "#9D67E3" })
theme.palette.secondary = theme.palette.augmentColor({ main: "#50E3C1" })
theme.palette.tertiary = theme.palette.augmentColor({ main: "#FFD100" })
theme.palette.base = theme.palette.augmentColor({ main: "#2B2B2B" })

export default theme