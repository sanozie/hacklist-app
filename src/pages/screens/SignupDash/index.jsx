// React
import { useContext } from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from "components/Layout"
import SignupRow from 'components/Hacks/SignupRow'

// Store
import { Signups } from 'store'
import { MainProgression } from 'components/Progression'


const SignupDash = ({user}) => {
    const signupsState = useContext(Signups.State)

    if (!signupsState) return <MainProgression />

    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Signups</h1>
                        </Row>
                        { signupsState !== null && Object.entries(signupsState).map(hack => {
                            let [hackID, hackValues] = hack
                            return (
                                <Row className="my-3">
                                    <SignupRow {...hackValues} uid={user.id} hackID={hackID} />
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default SignupDash