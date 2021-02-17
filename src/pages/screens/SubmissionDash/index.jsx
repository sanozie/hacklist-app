// React
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from "components/Layout"
import SubmissionHack from 'components/Hacks/SubmissionHack'

// Store
import { Submissions } from 'store'
import Badge from "components/Badge";


const SubmissionDash = () => {
    let router = useRouter()
    let [editHack, setEditHack] = useState(false)


    const submissionsState = useContext(Submissions.State)
    const submissionsDispatch = useContext(Submissions.Dispatch)
    loadSubmissions(submissionsState, submissionsDispatch)

    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Submissions</h1>
                        </Row>
                            {submissionsState !== null && Object.entries(submissionsState).map(hack => {
                                let [hackID, hackValues] = hack
                                console.log(hack)
                                return (
                                    <Row onMouseEnter={() => setEditHack(true)}
                                         onMouseLeave={() => setEditHack(false)}>
                                        <Col xs={10}>
                                            <SubmissionHack {...hackValues} />
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

async function loadSubmissions(submissionsState, submissionsDispatch) {
    let local = JSON.parse(localStorage.getItem('submissions'))
    if(submissionsState !== null) {
        console.log('submission state')
    } else if (local) {
        submissionsDispatch({type: 'replace', data: local })
    } else {
        let data = await fetch('/api/usersubmissions').json()
        submissionsDispatch({type: 'replace', data })
    }
}

export default SubmissionDash