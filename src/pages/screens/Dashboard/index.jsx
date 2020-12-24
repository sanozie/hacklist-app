import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

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
import { Submissions as SubmissionContext } from 'store'

let swrConfig = {}

/**
 * Parent component for Dashboard
 */
let Dashboard = ({ user }) => {
    let router = useRouter()

    let [addSubmission, setAddSubmission] = useState(false)
    let [addSignup, setAddSignup] = useState(false)

    useEffect(() => {
        // TODO: Replace this with history API eventually if needed
        localStorage.setItem('lastVisited', 'Dashboard')
    }, [])

    const { data, error } = useSWR(`/api/user?uid=${user.id}`, fetcher, swrConfig)
    /* TODO: Set up error handling for this component, prefeably by making a form. Right now, if there's an error,
        it will probably just have a loading screen forever.
     */

    if (error || !data) return <MainProgression />

    // Set global context for submissions
    const submissionsDispatch = useContext(SubmissionContext.Dispatch)
    submissionsDispatch({type: 'replace', data: data.submissions })

    localStorage.setItem('submissions', JSON.stringify(data.submissions))

    return (
        <Layout title="Dashboard | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="my-2 pt-5 pb-3">
                    <h1 className="pl-2">YOUR STATS</h1>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" className={styles.status_env}>
                        <Row className={styles.status_wrapper}
                             onMouseEnter={() => setAddSubmission(true)}
                             onMouseLeave={() => setAddSubmission(false)}>
                            <Badge title="Submit A Hack" display={addSubmission} type="add" link="/AddSubmission/"
                                   placement="br" />
                            <Badge title="Edit Submissions" display={addSubmission} type="edit" link="/SubmissionDash/"
                                   placement="tr" />
                            <Col className="d-flex flex-column">
                                <Row>
                                    <h2>Hack Submissions</h2>
                                </Row>
                                <Row className="flex-grow-1">
                                    <Col xs="12" className="center-vert">
                                        <div className="center-vert-env w-100">
                                            <Submissions data={data.submissions}
                                                         className={styles.status_component_wraper} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="4" className={styles.status_env}>
                        <Row className={styles.status_wrapper} onMouseEnter={() => setAddSignup(true)}
                             onMouseLeave={() => setAddSignup(false)}>
                            <Badge title="Signup For A Hack" display={addSignup}
                                   link="/Signup/" placement="br" type="add" />
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