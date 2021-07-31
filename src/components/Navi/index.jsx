import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Material UI
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// Styles
import styles from './navi.module.scss'

// Store
import { User } from 'store'

let Navi = () => {
    let router = useRouter()
    let [avatar, setAvatar] = useState('')
    const [menuAnchor, setMenuAnchor] = useState(null)
    const userActions = useContext(User.Dispatch)
    const userState = useContext(User.State)

    useEffect(() => {
        setAvatar(userState.photoURL)
    }, [userState])

    const handleClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchor(null)
    };

    const handleLogout = () => {
        userActions.logout()
        handleClose()
    }
    
    return (
        <>
            <Navbar bg="light" expand="lg" id={styles.navbar}>
                <Navbar.Brand onClick={() => router.push('/[screen]', '/Dashboard')} id={styles.logo}>DIYHACKS</Navbar.Brand>
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto ">
                        <Nav.Link href="#home" className={[styles.navlink, 'px-3']}>Forum</Nav.Link>
                        <Nav.Link href="#link" className={[styles.navlink, 'px-3']}>About</Nav.Link>
                        <Nav.Item className='px-3'>
                            <button id={styles.support} className='btn'>Support DIYH</button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Nav.Item className='px-3' >
                    <Avatar alt="Profile Picture" src={avatar} onClick={handleClick}/>
                </Nav.Item>
            </Navbar>
            <Menu
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default Navi;