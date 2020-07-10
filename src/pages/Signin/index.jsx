import { useState, useEffect } from 'react'
import Router from 'next/router'
//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from '../../components/Layout'
import styles from './Signin.module.scss'

//firebase
import { auth, firebase } from '../../firebase'

let Signin = () => {
    // If the user has already signed in.
    // TODO: Make some kind of function that does this automatically instead of copy and pasting in files.
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            Router.push({
                pathname: "/Dashboard/",
                query: {uid: user.uid }
            })
        }
    })
    let handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result.user.uid)
                Router.push({
                    pathname: "/Dashboard/",  
                    query: {uid: result.user.uid }
                })
            })
            .catch(err => {
                alert('OOps something went wrong check your console');
                console.log(err);
            });
    }

    let handleFacebookSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    let handleGithubSignIn = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <Layout title="Signin | DIYHacks" nav={false} signin={true}>
            <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=2695759943969584&autoLogAppEvents=1" nonce="Lzx3EyRM"/>
            <Container>
                <Row className="poster">
                    <Col sm className={styles.left_design}></Col>
                    <Col sm className={`${styles.right_design} h-100 center-vert`}>
                        <Row className="w-100">
                            <Col>
                                <Row className="justify-content-center py-2">
                                    <h1 id={styles.logo}>DIYHACKS</h1>
                                </Row>
                                <Row className="justify-content-center w-100 px-5 py-2">
                                    <Col md="3" className="text-center">
                                        <img src='signin/google.png' alt="Google SignIn" className={`${styles.signin_icon} img-fluid py-1`} onClick={() => {handleGoogleSignIn()}}/>
                                    </Col>
                                    <Col md="3" className="text-center">
                                        <img src='signin/facebook.png' alt="Facebook SignIn" className={`${styles.signin_icon} img-fluid py-1`} onClick={() => {handleFacebookSignIn()}}/>
                                    </Col>
                                    <Col md="3" className="text-center">
                                        <img src='signin/github.png' alt="Github SignIn" className={`${styles.signin_icon} img-fluid py-1`} onClick={() => {handleGithubSignIn()}}/>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <p className={styles.copy}>Copywrite 2020</p>
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