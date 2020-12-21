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
                <h1>hello</h1>
            </Container>
        </Layout>
    )
}

export default SubmissionDash