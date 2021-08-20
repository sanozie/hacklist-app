// React & Next
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
        setAvatar(userState?.photoURL)
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
                <Navbar.Brand onClick={() => router.push('/[screen]', '/Dashboard')} id={styles.logo}>HACKLIST</Navbar.Brand>
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto ">
                        <Nav.Link href="https://gmail.us4.list-manage.com/subscribe?u=10220f4953ebea0edf51592fb&id=e01dbaccaa"
                                  className={[styles.navlink, 'px-3']}>Mailing List</Nav.Link>
                        <Nav.Link href="https://join.slack.com/t/hacklistworkspace/shared_invite/zt-uhfdw4qs-xfqJej0fOsd7tX86ycmv_g"
                                  className={[styles.navlink, 'px-3']}>Slack</Nav.Link>
                        {/*<Nav.Item className='px-3'>*/}
                        {/*    <button id={styles.support} className='btn'>Support</button>*/}
                        {/*</Nav.Item>*/}
                    </Nav>
                </Navbar.Collapse>
                <Nav.Item className='px-3 py-2 py-lg-0' >
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