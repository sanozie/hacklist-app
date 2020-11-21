import React, { useState, useEffect, useRef } from 'react'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from 'components/Layout'
import styles from './Signup.module.scss'

import Hack from './Hack'
import Filters from './Filters'

//Firebase
import { firebase } from 'db/client'

let Signup = () => {
    let uid = firebase.auth().currentUser.uid

    //Data Hooks
    let [hacks, setHacks] = useState([])
    const prevHacks = usePrevious(hacks)
    let [filteredHacks, setFilteredHacks] = useState([])
    let [timeline, setTimeline] = useState('6mon')
    let [filterData, setFilterData] = useState({})

    // MANDATORY LOCAL STORAGE SETTING OF LAST PAGE VISITED
    useEffect(() => {
        localStorage.setItem('lastVisited', 'Signup')
    }, [])

    //Fetching data everytime timeline is updated
    useEffect(() => {
        fetch(`/api/submissions?timeline=${timeline}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(res)
            })
    }, [timeline])

    return (
        <Layout title="Signup | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Filters setNewTimeline={newTimeline => setTimeline(newTimeline)} setNewFilterData={newFilterData => setFilterData(newFilterData)}/>
                    <Col xs="8">
                        <Row>
                            {(hacks.length !== 0) && hacks.map(hack => (
                                <Hack {...hack} id={uid}/>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup

// Hook
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}