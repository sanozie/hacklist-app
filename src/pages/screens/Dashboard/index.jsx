import { useState, useEffect, useContext, useDebugValue } from 'react'

//swr (data-loading module)
import useSWR from 'swr'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Utils
import fetcher from 'utils/fetcher'

// Local
import styles from './Dashboard.module.scss'

// Components
import Signups from './Signups'
import ActiveHacks from './ActiveHacks'
import Submissions from './Submissions'
import { MainProgression } from 'components/Progression'
import Badge from 'components/Badge'
import Layout from 'components/Layout'

// Context
import { Submissions as SubmissionContext, Signups as SignupContext } from 'store'

let swrConfig = {}

function useBadgeOverlay() {
    let [submissionBadges, setSubmissionBadges] = useState(false)
    let [signupBadges, setSignupBadges] = useState(false)

    useDebugValue({submissionBadges, signupBadges})

    return [submissionBadges, setSubmissionBadges, signupBadges, setSignupBadges]
}

/**
 * Parent component for Dashboard
 */
let Dashboard = ({ user }) => {
    let [submissionBadges, setSubmissionBadges, signupBadges, setSignupBadges] = useBadgeOverlay()

    // Set global context for submissions & signups
    const submissionsDispatch = useContext(SubmissionContext.Dispatch)
    const signupsDispatch = useContext(SignupContext.Dispatch)

    useEffect(() => {
        // TODO: Replace this with history API eventually if needed
        localStorage.setItem('lastVisited', 'Dashboard')
        console.log('does this even happen')
    }, [])

    const { data, error } = useSWR(`/api/user?uid=${user.id}`, fetcher, swrConfig)
    /* TODO: Set up error handling for this component, prefeably by making a form. Right now, if there's an error,
        it will probably just have a loading screen forever.
     */
    // Setting global context and local history on successful fetch
    useEffect(() => {
        submissionsDispatch({type: 'replace', data: data?.submissions })
        signupsDispatch({type: 'replace', data: data?.signups })
        localStorage.setItem('submissions', JSON.stringify(data?.submissions))
        localStorage.setItem('signups', JSON.stringify(data?.signups))
    }, [data])

    if (error || !data) return <MainProgression />

    return (
            <Layout title="Dashboard | DIYHacks" nav={true}>
                <Container className={styles.body}>
                    <Row className="my-2 pt-5 pb-3">
                        <h1 className="page-header pl-2">YOUR STATS</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="8" className={styles.status_env}>
                            {/* Figure out a better way to update this hover */}
                            <Row className="status-wrapper"
                                 onMouseEnter={() => setSubmissionBadges(true)}
                                 onMouseLeave={() => setSubmissionBadges(false)}>
                                <Badge title="Edit Submissions" display={submissionBadges} type="edit" link="/SubmissionDash/"
                                       placement="tr" />
                                <Badge title="Add Submissions" display={submissionBadges} type="add" link="/AddSubmission/"
                                       placement="br" />
                                <Col className="d-flex flex-column">
                                    <Row>
                                        <h2 className="pl-4 pt-4">Hack Submissions</h2>
                                    </Row>
                                    <Row className="flex-grow-1">
                                        <Col xs="12" className="center-vert">
                                            <div className="center-vert-env w-100">
                                                <Submissions data={data.submissions} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="4" className={styles.status_env}>
                            <Row className="status-wrapper" onMouseEnter={() => setSignupBadges(true)}
                                 onMouseLeave={() => setSignupBadges(false)}>
                                <Badge title="Signup For A Hack" display={signupBadges}
                                       link="/Signup/" placement="br" type="add" />
                                <Badge title="Edit Your Signups" display={signupBadges}
                                       link="/SignupDash/" placement="tr" type="edit" />
                                <Col>
                                    <Row>
                                        <h2 className="pl-4 pt-4">Signups</h2>
                                    </Row>
                                    <Signups data={data.signups} />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="12" className={styles.status_env}>
                            <Row className="status-wrapper">
                                <Col>
                                    <Row>
                                        <h2 className="pl-4 pt-4">Active Hacks</h2>
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

export default Dashboard