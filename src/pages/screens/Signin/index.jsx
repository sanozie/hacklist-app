// React & Next
import { useEffect } from 'react'
import Router from 'next/router'
//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Components
import Layout from 'components/Layout'
// Styles
import styles from './Signin.module.scss'
// Firebase
import { auth, firebase } from 'db/client'

const Signin = () => {
    useEffect(() => {
        localStorage.setItem('lastVisited', 'Signin')
    }, [])

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
            .then(() => {
                Router.push('/[screen]', '/Dashboard')
            })
            .catch(err => {
                alert('There was a problem with your signin. Please try again or contact us.')
            });
    }

    const handleGithubSignIn = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        auth.signInWithPopup(provider)
            .then(() => {
                Router.push('/[screen]', '/Dashboard')
            })
            .catch(err => {
                alert('There was a problem with your signin. Please try again or contact us.');
            });
    }
    return (
        <Layout title="Signin | Hacklist" nav={false} signin={true}>
            <Container>
                <Row className="poster">
                    <Col sm className={styles.left_design }/>
                    <Col sm className={`${styles.right_design} h-100 center-vert`}>
                        <Row className="w-100">
                            <Col>
                                <Row className="justify-content-center py-2">
                                    <h1 id={styles.logo}>HACKLIST</h1>
                                </Row>
                                <Row className="justify-content-center w-100 px-5 py-2">
                                    <Col md="3" sm="4" className="text-center">
                                        <img src='signin/google.png' alt="Google SignIn" className={`${styles.signin_icon} img-fluid py-1`} onClick={handleGoogleSignIn}/>
                                    </Col>
                                    <Col md="3" sm="4" className="text-center">
                                        <img src='signin/github.png' alt="Github SignIn" className={`${styles.signin_icon} img-fluid py-1`} onClick={handleGithubSignIn}/>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center py-1">
                                    <p className={styles.copy}>© 2021</p>
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
