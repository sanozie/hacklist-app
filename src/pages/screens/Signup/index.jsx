import React, {useState, useEffect, useRef, useDebugValue} from 'react'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Local
import Layout from 'components/Layout'
import styles from './Signup.module.scss'

// Utils
import dateMap from 'utils/datemap'

import Hack from './Hack'
import Filters from './Filters'

const MAX_TIMELINE = '6mon'

// Custom hack filtering hook
function useFilteredHacks() {
    let [hacks, setHacks] = useState([])
    let [filteredHacks, setFilteredHacks] = useState([])
    let [filterData, setFilterData] = useState({})
    let [signup, setSignup] = useState(false)

    // Fetching data every time signup occurs
    useEffect(() => {
        debugger
        fetch(`/api/submissions?timeline=${MAX_TIMELINE}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(filterHacks(res, filterData))
            })
    }, [signup])

    // Changing data every time filtered data changes
    useEffect(() => {
        setFilteredHacks(filterHacks(hacks, filterData))
    }, [filterData])

    useDebugValue("FilteredHacks")

    return [filteredHacks, setFilterData, signup, setSignup]
}

function filterHacks(hacks, filterData) {
    // Add more filter variables here
    const timelineTrim = hack => {
        return new Date(hack.submit_date) > dateMap(filterData.timeline)
    }

    if (Object.keys(filterData).length === 0) {
        return hacks
    } else {
        return hacks.filter(hack => timelineTrim(hack))
    }
}


let Signup = ({user}) => {
    //Data Hooks
    let [filteredHacks, setFilterData, signup, setSignup] = useFilteredHacks()

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
                                <Hack {...hack} uid={user.id} emitSignup={() => setSignup(!signup)}/>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup