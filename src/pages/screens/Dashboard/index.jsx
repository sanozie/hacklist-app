// React
import { useState, useEffect, useContext, useDebugValue } from 'react'
// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Styles
import styles from './Dashboard.module.scss'
// Components
import Signups from './Signups'
import Portfolio from './Portfolio'
import Submissions from './Submissions'
import { MainProgression } from 'components/Progression'
import Badge from 'components/Badge'
import Layout from 'components/Layout'
// Store
import { Submissions as SubmissionContext, Signups as SignupContext, Portfolio as PortfolioContext } from 'store'

function useBadgeOverlay() {
    let [submissionBadges, setSubmissionBadges] = useState(false)
    let [signupBadges, setSignupBadges] = useState(false)

    useDebugValue({ submissionBadges, signupBadges })

    return [submissionBadges, setSubmissionBadges, signupBadges, setSignupBadges]
}

/**
 * Parent component for Dashboard
 */
const Dashboard = () => {
    const [submissionBadges, setSubmissionBadges, signupBadges, setSignupBadges] = useBadgeOverlay()

    // Set global context for submissions & signups
    const signupsState = useContext(SignupContext.State)?.state
    const submissionsState = useContext(SubmissionContext.State)?.state
    const portfolioState = useContext(PortfolioContext.State)?.state

    const [signupCount, setSignupCount] = useState(0)

    useEffect(() => {
        // TODO: Replace this with history API eventually if needed
        localStorage.setItem('lastVisited', 'Dashboard')
    }, [])

    // Used for determining whether or not users have signed up to the maximum amount of hacks
    useEffect(() => {
        signupsState ? setSignupCount(Object.keys(signupsState).length) : null
    }, [signupsState])

    const showSubmissionBadges = () => {
        setSubmissionBadges(true)
        setSignupBadges(false)
    }

    const closeSubmissionBadges = () => {
        setSubmissionBadges(false)
    }

    const showSignupBadges = () => {
        setSignupBadges(true)
        setSubmissionBadges(false)
    }

    const closeSignupBadges = () => {
        setSignupBadges(false)
    }

    /* TODO: Set up error handling for this component, prefeably by making a form. Right now, if there's an error,
        it will probably just have a loading screen forever.
     */
    if (!signupsState || !submissionsState || !portfolioState) return <MainProgression message="Loading your data" />

    return (
        <Layout title="Dashboard | Hacklist" nav={true}>
            <Container className={styles.body}>
                <Row className="my-2 pt-5 pb-3 justify-content-center">
                    <h1 className="page-header pl-2">YOUR STATS</h1>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="6" md="8" className={`${styles.status_env} my-2 my-md-0`}>
                        {/* Figure out a better way to update this hover */}
                        <Row className="status-wrapper"
                             onMouseEnter={showSubmissionBadges}
                             onMouseLeave={closeSubmissionBadges}
                             onClick={showSubmissionBadges}>
                            <Badge title="Edit Submissions" display={submissionBadges} type="edit" link="/SubmissionDash/"
                                   placement="tr" />
                            <Badge title="Add Submissions" display={submissionBadges} type="add" link="/AddSubmission/"
                                   placement="br" signupCount={signupCount}/>
                            <Col className="d-flex flex-column">
                                <Row>
                                    <h2 className="pl-0 pl-md-4 pt-4 status-title">Hack Submissions</h2>
                                </Row>
                                <Row className="flex-grow-1">
                                    <Col xs="12" className="center-vert p-0 p-md-2">
                                        <div className="center-vert-env w-100">
                                            <Submissions data={submissionsState} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" md="4" className={`${styles.status_env} my-2 my-md-0`}>
                        <Row className="status-wrapper"
                             onMouseEnter={showSignupBadges}
                             onMouseLeave={closeSignupBadges}
                             onClick={showSignupBadges}>
                            <Badge title="Signup For A Hack" display={signupBadges}
                                   link="/Signup/" placement="br" type="add" signupCount={signupCount} />
                            <Badge title="Edit Your Signups" display={signupBadges}
                                   link="/SignupDash/" placement="tr" type="edit" />
                            <Col>
                                <Row>
                                    <h2 className="pl-0 pl-md-4 pt-4 status-title">Signups</h2>
                                </Row>
                                <Signups data={signupsState} />
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12" className={`${styles.status_env} my-2 my-md-0`}>
                        <Row className="status-wrapper">
                            <Col>
                                <Row>
                                    <h2 className="pl-4 pt-4">Portfolio</h2>
                                </Row>
                                <Portfolio data={portfolioState} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Dashboard