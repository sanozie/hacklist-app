import React, { useState, useEffect, useDebugValue } from 'react'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Local
import Layout from 'components/Layout'
import styles from './Signup.module.scss'
import SignupRow from 'components/Hacks/SignupRow'
import Filters from './Filters'

// Utils
import dateMap from 'utils/datemap'

// Process
const MAX_TIMELINE = process.env.MAX_TIMELINE

/**
 * Custom Hack Filtering hook. Returns hooks to render based off of filter data.
 * @returns {(*[]|((value: (((prevState: {}) => {}) | {})) => void)|boolean|((value: (((prevState: boolean) => boolean) | boolean)) => void))[]}
 */
function useFilteredHacks(user) {
    let [hacks, setHacks] = useState([])
    let [filteredHacks, setFilteredHacks] = useState([])
    let [filterData, setFilterData] = useState({})
    let [signup, setSignup] = useState(false)

    // Fetching data every time signup occurs
    useEffect(() => {
        fetch(`/api/hacks?type=submissions&timeline=${MAX_TIMELINE}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(filterHacks(res, filterData, user))
            })
    }, [signup])

    // Changing data every time filtered data changes
    useEffect(() => {
        setFilteredHacks(filterHacks(hacks, filterData, user))
    }, [filterData])

    useDebugValue({ filteredHacks, filterData })

    return [filteredHacks, setFilterData, signup, setSignup]
}

/**
 * Filtering hacks via filter data
 * @param {object[]} hacks
 * @param {object} filterData
 * @param {object} user
 * @returns {*}
 */
function filterHacks(hacks, filterData, user) {
    // First filter by if the user is already signed up || is the owner
    const ownerTrim = hack => hack.submitter !== user.id
    const signupTrim = hack => !hack.signups[user.id]
    // Add more filter data variables here
    const timelineTrim = hack => new Date(hack.submit_date) > dateMap(filterData.timeline)

    if (Object.keys(filterData).length === 0) {
        return hacks.filter(hack => ownerTrim(hack) && signupTrim(hack))
    } else {
        return hacks.filter(hack => timelineTrim(hack) && ownerTrim(hack) && signupTrim(hack))
    }
}


let Signup = ({user}) => {
    //Data Hooks
    let [filteredHacks, setFilterData, signup, setSignup] = useFilteredHacks(user)

    // MANDATORY LOCAL STORAGE SETTING OF LAST PAGE VISITED
    useEffect(() => {
        localStorage.setItem('lastVisited', 'Signup')
    }, [])

    return (
        <Layout title="Signup | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Filters setFilterData={filterData => setFilterData(filterData)} />
                    <Col xs="8">
                        <Row>
                            {(filteredHacks.length !== 0) && filteredHacks.map(hack => (
                                <SignupRow {...hack} uid={user.id} emitSignup={() => setSignup(!signup)} />
                            ))}
                            {(filteredHacks.length === 0) && (
                                <h3>No Hacks available for signup at this time. Check again soon!</h3>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup