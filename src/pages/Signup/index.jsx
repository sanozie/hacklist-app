import { useState, useEffect, useRef } from 'react'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from '../../components/Layout'
import styles from './Signup.module.scss'

import Hack from './Hack'
import Filters from './Filters'

//Firebase
import { firebase } from '../../firebase'

let Signup = () => {
    let uid = firebase.auth().currentUser.uid

    //Data Hooks
    let [hacks, setHacks] = useState([])
    let [filteredHacks, setFilteredHacks] = useState([])
    let [timeline, setTimeline] = useState('6mon')
    let [filterData, setFilterData] = useState({})

    let fetchHacks = timeline => {
        fetch(`/api/submissions?timeline=${timeline}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(res)
                debugger
            })
    }

    //Fetching initial data from Firebase
    useEffect(() => {
        fetchHacks(timeline)
    }, [])
    //Fetching data everytime timeline is updated
    useEffect(() => {
        fetchHacks(timeline)
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
                            {hacks.map(hack => (
                                    <Hack {...hack} id={uid}/>
                                )
                            )}
                        </Row>

                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup