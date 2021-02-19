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
import { Signups } from 'store'
import contingentLoad from 'utils/store/contingentLoad'


const SignupDash = () => {
    let router = useRouter()
    let [editHack, setEditHack] = useState(false)


    const signupsState = useContext(Signups.State)
    const signupsDispatch = useContext(Signups.Dispatch)
    contingentLoad('signups', signupsState, signupsDispatch, null)

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

export default SignupDash