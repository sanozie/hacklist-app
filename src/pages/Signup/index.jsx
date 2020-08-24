import { useState, useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'

//swr (data-loading module)
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Material UI
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';

//Local
import Layout from '../../components/Layout'
import styles from './Signup.module.scss'
import TextField from "@material-ui/core/TextField";
import {DesignChip, EngChip, MaterialStyles, PMChip, Tag, HtmlTooltip} from "../../lib/MaterialStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import Hack from './Hack'
import Filters from './Filters'

let fetchHacks = timeline => [

]

let Signup = () => {

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
                                    <Hack {...hack}/>
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