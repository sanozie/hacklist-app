// React
import { useState, useEffect, useDebugValue } from 'react'
// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Components
import Layout from 'components/Layout'
import styles from './Signup.module.scss'
import SignupConfig from 'components/Hacks/SignupConfig'
import Filters from './Filters'
import { MainProgression } from 'components/Progression'
// Utils
import dateMap from 'utils/data/datemap'
import back from 'utils/route/back'
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
    let [fetched, setFetched] = useState(false)

    // Fetching data every time signup occurs
    useEffect(() => {
        fetch(`/api/hacks?type=submissions&timeline=${MAX_TIMELINE}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(filterHacks(res, filterData, user))
                setFetched(true)
            })
    }, [signup])

    // Changing data every time filtered data changes
    useEffect(() => {
        setFilteredHacks(filterHacks(hacks, filterData, user))
    }, [filterData])

    useDebugValue({ filteredHacks, filterData })

    return [filteredHacks, setFilterData, signup, setSignup, fetched]
}

/**
 * Filtering hacks via filter data
 * @param {object} hacks
 * @param {object} filterData
 * @param {object} user
 * @returns {*}
 */
function filterHacks(hacks, filterData, user) {
    // First filter by if the user is already signed up || is the owner
    const ownerTrim = ([id, hack]) => hack.submitter !== user.uid
    const signupTrim = ([id, hack]) => !hack.signups[user.uid]
    // Add more filter data variables here
    const timelineTrim = ([id, hack]) => new Date(hack.submit_date) > dateMap(filterData.timeline)

    if (Object.keys(filterData).length === 0) {
        return Object.entries(hacks).filter(hack => ownerTrim(hack) && signupTrim(hack))
    } else {
        return Object.entries(hacks).filter(hack => timelineTrim(hack) && ownerTrim(hack) && signupTrim(hack))
    }
}


let Signup = ({user}) => {
    //Data Hooks
    let [filteredHacks, setFilterData, signup, setSignup, fetched] = useFilteredHacks(user)

    // MANDATORY LOCAL STORAGE SETTING OF LAST PAGE VISITED
    useEffect(() => {
        localStorage.setItem('lastVisited', 'Signup')
    }, [])

    return (
        <Layout title="Signup | Hacklist" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SIGNUP FOR HACKS</h1>
                    </Col>
                    <Col sm="1" className="ml-auto center">
                        <p className="back-button" onClick={back}>{'< Back'}</p>
                    </Col>
                </Row>
                <Row>
                    { !fetched && <MainProgression message="Fetching hacks" /> }
                    { fetched && (
                        <>
                            <Filters setFilterData={filterData => setFilterData(filterData)} />
                            <Col xs="12" md="8" className="mt-3 mt-md-0">
                                <Row>
                                    {(filteredHacks.length !== 0) && filteredHacks.map(([id, hack]) => (
                                        <SignupConfig key={id} hack={hack} hackId={id} uid={user.uid}
                                                          emitSignup={() => setSignup(!signup)} />
                                    ))}
                                    {(filteredHacks.length === 0) && (
                                        <h3>No Hacks available for signup at this time. Check again soon!</h3>
                                    )}
                                </Row>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup