// React
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from "components/Layout"
import Hack from 'components/Hacks/Hack'

// Store
import { Submissions } from 'store'
import contingentLoad from 'utils/store/contingentLoad'

import Badge from "components/Badge";


const SubmissionDash = () => {
    let router = useRouter()
    let [editHack, setEditHack] = useState(false)


    const submissionsState = useContext(Submissions.State)
    const submissionsDispatch = useContext(Submissions.Dispatch)
    contingentLoad('submissions', submissionsState, submissionsDispatch, '/api/usersubmissions')

    // TODO: It looks like hovering causes a rerender.... this should be fixed
    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Submissions</h1>
                        </Row>
                            { submissionsState !== null && Object.entries(submissionsState).map(hack => {
                                let [hackID, hackValues] = hack
                                console.log(hack)
                                return (
                                    <Row onMouseEnter={() => setEditHack(true)}
                                         onMouseLeave={() => setEditHack(false)} className="my-3">
                                        <Col xs={10}>
                                            <Hack {...hackValues} />
                                        </Col>
                                    </Row>
                                )
                            })}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default SubmissionDash