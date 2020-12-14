// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/mixins.scss';
import 'styles/variables.scss';
import 'styles/index.scss';

// Theme
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'lib/AppTheme'

//calendar styles
import 'react-calendar/dist/Calendar.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}