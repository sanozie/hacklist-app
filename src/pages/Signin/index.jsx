import { useState, useEffect } from 'react'
//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from '../../components/Layout'
import styles from './Signin.module.scss'

//firebase
import { auth, firebaseClient } from '../../firebase'


let Signin = () => {
    handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        auth.signInWithPopup(provider)
        .then(() => {
        alert('You are signed In');
        })
        .catch(err => {
        alert('OOps something went wrong check your console');
        console.log(err);
        });
        }
        handleLogout = () => {
        auth.signOut().then(function() {
        alert('Logout successful');
        }).catch(function(error) {
        alert('OOps something went wrong check your console');
        console.log(err);
        });
        }
    return (
        <Layout title="Signin | DIYHacks" nav={false} signin={true}>
            <Container>
                <Row className="poster">
                    <Col sm className={styles.left_design}></Col>
                    <Col sm className={`${styles.right_design} h-100 center-vert`}>
                        <Row className="w-100">
                            <Col>
                                <Row className="justify-content-center py-2">
                                    <h1 id={styles.logo}>DIYHACKS</h1>
                                </Row>
                                <Row className="justify-content-center py-2">
                                    <button className="btn" onClick={handleSignIn}>Sign In With Google</button>
                                </Row>
                                <Row className="justify-content-center py-1">
                                    <p className={styles.copy}>Why do we use LinkedIn?</p>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signin