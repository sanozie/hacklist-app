import { useState, useEffect, useMemo } from 'react'
import Router, { useRouter } from 'next/router'

//swr (data-loading module)
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from '../../components/Layout'
import styles from './Signup.module.scss'
import TextField from "@material-ui/core/TextField";
import {MaterialStyles} from "../../lib/MaterialStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Hack from './Hack'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        transition: '0.2s ease-in-out',
        "& .slider-label": {
            color: "rgba(255,255,255,0.5)"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));


let Signup = () => {
    let classes=useStyles();

    //Filter Hooks
    let [industry, setIndustry] = useState('')
    let [date, setDate] = useState('')

    return (
        <Layout title="Signup | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="3">
                        <Row>
                            <Col>
                                <Row>
                                    <h2>Filters</h2>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <FormControl required variant="outlined" className={classes.formControl}>
                                                <TextField
                                                    className={MaterialStyles().classesInput.root}
                                                    variant="outlined"
                                                    value={date}
                                                    onChange={e => { setDate(e.target.value) }}
                                                    label="Date"
                                                    select
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </TextField>
                                            </FormControl>
                                            <FormControl required variant="outlined" className={classes.formControl}>
                                                <TextField
                                                    className={MaterialStyles().classesInput.root}
                                                    variant="outlined"
                                                    value={industry}
                                                    onChange={e => { setIndustry(e.target.value) }}
                                                    label="Industry"
                                                    select
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </TextField>
                                            </FormControl>
                                        </Row>
                                        <Row>
                                            <h4>Skills</h4>
                                            <Chip
                                                label="Engineering"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                            <Chip
                                                label="Design"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                            <Chip
                                                label="Design"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                        </Row>
                                        <Row>
                                            <h4>Tags</h4>
                                            <Chip
                                                label="Website"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                            <Chip
                                                label="Mobile App"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                            <Chip
                                                label="iOS"
                                                onClick={()=>{}}
                                                variant="outlined"
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6">
                        <Hack/>
                    </Col>
                    <Col xs="3">
                        <Row>
                            <h2>Sort</h2>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <FormControl required variant="outlined" className={classes.formControl}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={date}
                                            onChange={e => { setDate(e.target.value) }}
                                            label="Date"
                                            select
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <FormControl required variant="outlined" className={classes.formControl}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={industry}
                                            onChange={e => { setIndustry(e.target.value) }}
                                            label="Industry"
                                            select
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </TextField>
                                    </FormControl>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
        )
}

export default Signup