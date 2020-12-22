// React
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from "components/Layout";


const SubmissionDash = () => {
    let router = useRouter()
    let [submissions, setSubmissions] = useState({})

    useEffect(() => {
        console.log(router.query)
    }, [])

    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <h1>Your Submissions</h1>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default SubmissionDash