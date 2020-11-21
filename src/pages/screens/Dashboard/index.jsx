
import { useState, useEffect } from 'react'

//swr (data-loading module)
import useSWR from 'swr'
// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//react-calendar (has custom styles on github)
//import Calendar from 'react-calendar'

// Utils
import fetcher from 'utils/fetcher'

// Local
import Layout from 'components/Layout'
import styles from './Dashboard.module.scss'
import { MainProgression } from 'components/Progression'
import { AddBadge } from 'components/DIYBadge'

// Page-Specific components
import Signups from './Signups'
import ActiveHacks from './ActiveHacks'
import Submissions from './Submissions'

// Firebase
import { firebase } from "db/client";

let swrConfig = {}

/**
 * Parent component for Dashboard
 */
let Dashboard = () => {
    let [uid, setUid] = useState(null)
    // If the user has already signed in.
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            setUid(firebase.auth().currentUser.uid)
        }
    })

    // TODO: Replace all of these with history API eventually if needed
    useEffect(() => {
        localStorage.setItem('lastVisited', 'Dashboard')
    }, [])

    let [addSubmission, setAddSubmission] = useState(false)
    let [addSignup, setAddSignup] = useState(false)
    const { data, error } = useSWR(`/api/user?uid=${uid}`, fetcher, swrConfig)
    /* TODO: Set up error handling for this component, prefeably by making a form. Right now, if there's an error,
    it will probably just have a loading screen forever.
     */
    if (error || !data) return <MainProgression />

    return (
        <Layout title="Dashboard | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <h1>YOUR STATS</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" className={styles.status_env}>
                        <Row className={styles.status_wrapper}
                             onMouseEnter={() => setAddSubmission(true)}
                             onMouseLeave={() => setAddSubmission(false)}>
                            <AddBadge title="Submit A Hack" display={addSubmission} link="/Submission/"/>
                            <Col className="d-flex flex-column">
                                <Row>
                                    <h2>Hack Submissions</h2>
                                </Row>
                                <Row className="flex-grow-1">
                                    <Col xs="12" className="center-vert">
                                        <div className="center-vert-env w-100">
                                            <Submissions data={data.submissions} className={styles.status_component_wraper} />
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    <Col md="4" className={styles.status_env}>
                        <Row className={styles.status_wrapper} onMouseEnter={() => setAddSignup(true)}
                             onMouseLeave={() => setAddSignup(false)}>
                            <AddBadge title="Signup For A Hack" display={addSignup} link="/Signup/"/>
                            <Col>
                                <Row>
                                    <h2>Signups</h2>
                                </Row>
                                <Signups data={data.signups} />
                            </Col>
                        </Row>

                    </Col>
                    <Col md="12" className={styles.status_env}>
                        <Row className={styles.status_wrapper}>
                            <Col>
                                <Row>
                                    <h2>Active Hacks</h2>
                                </Row>
                                <ActiveHacks data={data.activeHacks} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

//export default withAuth(Status);
export default Dashboard