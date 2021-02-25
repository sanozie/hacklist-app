// React
import React, {useContext, useDebugValue, useEffect, useState} from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from "components/Layout"
import SignupRow from 'components/Hacks/SignupRow'

// Store
import { Signups } from 'store'
import contingentLoad from 'utils/store/contingentLoad'

// /**
//  * Custom Hack Filtering hook. Returns hooks to render based off of filter data.
//  * @returns {(*[]|((value: (((prevState: {}) => {}) | {})) => void)|boolean|((value: (((prevState: boolean) => boolean) | boolean)) => void))[]}
//  */
// function useSignupEditor(user) {
//     let [hacks, setHacks] = useState([])
//     let [filteredHacks, setFilteredHacks] = useState([])
//     let [filterData, setFilterData] = useState({})
//     let [signup, setSignup] = useState(false)
//
//     // Fetching data every time signup occurs
//     useEffect(() => {
//         fetch(`/api/submissions?timeline=${MAX_TIMELINE}`)
//             .then(res => res.json())
//             .then(res => {
//                 setHacks(res)
//                 setFilteredHacks(filterHacks(res, filterData, user))
//             })
//     }, [signup])
//
//     // Changing data every time filtered data changes
//     useEffect(() => {
//         setFilteredHacks(filterHacks(hacks, filterData, user))
//     }, [filterData])
//
//     useDebugValue({ filteredHacks, filterData })
//
//     return [filteredHacks, setFilterData, signup, setSignup]
// }


const SignupDash = ({user}) => {
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
                            return (
                                <Row className="my-3">
                                    <SignupRow {...hackValues} uid={user.id} />
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