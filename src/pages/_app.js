import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mixins.scss';
import '../styles/variables.scss';
import '../styles/index.scss';

//calendar styles
import 'react-calendar/dist/Calendar.css';

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }