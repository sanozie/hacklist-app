// React
import { useContext } from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from 'components/Layout'
import Hack from 'components/Hacks/Hack'
import { MainProgression } from 'components/Progression'

// Store
import { Submissions } from 'store'
import SubmissionConfig from 'components/Hacks/SubmissionConfig'

const SubmissionDash = ({user}) => {
    const submissionsState = useContext(Submissions.State)

    if (!submissionsState) return <MainProgression />

    // TODO: It looks like hovering causes a rerender.... this should be fixed
    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Submissions</h1>
                        </Row>
                            {Object.entries(submissionsState).map(([id, hack]) => {
                                return (
                                    <Row className="my-3">
                                        <SubmissionConfig hack={hack} uid={user.id} hackId={id} dash={true} />
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