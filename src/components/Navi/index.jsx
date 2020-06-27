import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from './navi.module.scss'
let Navi = () => {
    return (
        <Navbar bg="light" expand="lg" id={styles.navbar}>
            <Navbar.Brand href="#home" id={styles.logo}>DIYHACKS</Navbar.Brand>
            <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ">
                    <Nav.Link href="#home" className={[styles.navlink, 'px-3']}>Forum</Nav.Link>
                    <Nav.Link href="#link" className={[styles.navlink, 'px-3']}>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>  
            <Nav.Item className='px-3'>
                <img src='/status/profpic.png' className={styles.profpic} />
            </Nav.Item>
            <Nav.Item className='px-3'>
                <button id={styles.support} className='btn'>Support DIYH</button>
            </Nav.Item>
        </Navbar>
    )
}

export default Navi;