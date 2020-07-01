import { useState } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from './navi.module.scss'

import Avatar from '@material-ui/core/Avatar';

import { auth, firebase } from '../../firebase'

let Navi = () => {
    let [avatar, setAvatar] = useState('')
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("auth stage chang hting")
        if (user) {
            setAvatar(user.photoURL)  
        }
      });
    
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
                <Avatar alt="Profile Picture" src={avatar}/>
            </Nav.Item>
            <Nav.Item className='px-3'>
                <button id={styles.support} className='btn'>Support DIYH</button>
            </Nav.Item>
        </Navbar>
    )
}

export default Navi;