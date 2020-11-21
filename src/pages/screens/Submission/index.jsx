import { useState, useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Material UI
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Local
import Layout from 'components/Layout'
import styles from './Submission.module.scss'
import { Progression }  from 'components/Progression'
import { MaterialStyles } from 'lib/MaterialStyles'

//Material UI
import { makeStyles } from '@material-ui/core/styles'
import {firebase} from "../../../db/client";

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



let explainer = {
    default: {
        title: "Submitting Hacks",
        desc: "DIYHacks will never steal your idea ( because you don't have to tell us what it is )!"
    },
    industry: {
        title: "Industry",
        desc: "This helps us match hackers with hacks that they'll be interested in!"
    },
    contribution: {
        title: "Contribution",
        desc: "Will you be contributing techncally? If so, put your role! If not, you may leave this blank."
    },
    title: {
        title: "Title",
        desc: "If you want, you can set a name for your hack. If not, you may leave this blank. We'll generate one for you."
    },
    eng: {
        title: "Engineers",
        desc: "Please select the min and max number of engineers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    },
    design: {
        title: "Designers",
        desc: "Please select the min and max number of designers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    },
    pm: {
        title: "Product Managers",
        desc: "Please select the min and max number of Pproduct managers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    }
}


let Submission = () => {
    const router = useRouter()

    let [industry, setIndustry] = useState('')
    let [contribution, setContribution] = useState('')
    let [hackTitle, setHackTitle] = useState('')
    let [engRange, setEngRange] = useState([1, 3])
    let [designRange, setDesignRange] = useState([1, 3])
    let [pmRange, setPmRange] = useState([1, 3])

    let [focus, setFocus] = useState('default')
    let [title, setTitle] = useState('')
    let [desc, setDesc] = useState('')

    let [apiProgress, setApiProgress] = useState('idle')
    let [fetchComplete, setFetchComplete] = useState(false)

    let name, [id, setID] = useState('')
    const [open, setOpen] = useState(false)

    const classes = useStyles();

    useEffect(() => {
        localStorage.setItem('lastVisited', 'Submission')
    }, [])

    useEffect(() => {
        setTitle(explainer[focus].title)
        setDesc(explainer[focus].desc)
    }, [focus])

    const handleSubmit = async () => {
        setApiProgress('pending')
        let { displayName, uid } = firebase.auth().currentUser
        let data = JSON.stringify({
            industry,
            contribution,
            hackTitle,
            engRange,
            designRange,
            pmRange,
            submitter_name: displayName,
            submitter: uid
        })

        await fetch('/api/submit', {
            method: 'POST',
            body: data
        })
        setApiProgress('success')
    }

    const getProgress = state =>  {
        return { display: apiProgress === state ? 'block' : 'none' }
    }
    return (
        <Layout title="Submission | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col className="py-5 my-5">
                        <Row>
                            <Col>
                                <Row className="justify-content-center">
                                    <FormControl required variant="outlined" className={classes.formControl} onMouseDown={() => setFocus('industry')}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={industry}
                                            onChange={e => { setIndustry(e.target.value) }}
                                            label="Industry"
                                            select
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <FormControl required variant="outlined" className={classes.formControl} onMouseDown={() => setFocus('contribution')}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={contribution}
                                            onChange={e => { setContribution(e.target.value) }}
                                            label="Contribution"
                                            select
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} onMouseDown={() => setFocus('title')}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={hackTitle}
                                            onChange={e => { setHackTitle(e.target.value) }}
                                            label="Title"
                                        >
                                        </TextField>
                                        <FormHelperText>Optional</FormHelperText>
                                    </FormControl>
                                </Row>
                                <Row className="justify-content-center">
                                    <FormControl className={classes.formControl} onMouseDown={() => setFocus('eng')}>
                                        <label id="eng-range" className="slider-label">Engineering</label>
                                        <Slider
                                            max={5}
                                            defaultValue={[1, 3]}
                                            value={engRange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="eng-range"
                                            onChange={(event, newVal) => setEngRange(newVal)}
                                            className={MaterialStyles().classesSliderEng.root}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl} onMouseDown={() => setFocus('design')}>
                                        <label id="design-range" className="slider-label">Design</label>
                                        <Slider
                                            max={5}
                                            defaultValue={[1, 3]}
                                            value={designRange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="design-range"
                                            onChange={(event, newVal) => setDesignRange(newVal)}
                                            className={MaterialStyles().classesSliderDesign.root}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl} onMouseDown={() => setFocus('pm')}>
                                        <label id="pm-range" className="slider-label">Product Managers</label>
                                        <Slider
                                            max={5}
                                            defaultValue={[1, 3]}
                                            value={pmRange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="pm-range"
                                            onChange={(event, newVal) => setPmRange(newVal)}
                                            className={MaterialStyles().classesSliderPM.root}
                                        />
                                    </FormControl>
                                </Row>
                                <Row className="justify-content-center">
                                    <button className="btn btn-secondary" onClick={() => setOpen(true)}>SUBMIT</button>
                                </Row>
                            </Col>
                            <Col>
                                <Row className={styles.desc_wrapper}>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <h2>{title}</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>{desc}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Dialog
                    maxWidth={'xs'}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="confirm"
                    PaperProps={{ className: MaterialStyles().classesPopup.paper }}
                >
                    <div style={getProgress('idle')}>
                        <DialogTitle id="confirm" className="text-center">Confirm</DialogTitle>
                        <DialogContent>
                            <DialogContentText className={MaterialStyles().classesDialogText.root}>Yes? You're ready to submit?</DialogContentText>
                        </DialogContent>
                        <DialogActions className="justify-content-center">
                            <button className="btn btn-primary" onClick={handleSubmit}>SUBMIT</button>
                        </DialogActions>
                    </div>

                    <div style={getProgress('pending')} >
                        <Progression />
                    </div>


                    <div style={getProgress('success')}>
                        <DialogTitle id="confirm" className="text-center">Submissions Updated</DialogTitle>
                        <DialogActions className="justify-content-center">
                            <button className="btn btn-primary"
                                    onClick={() => {router.push('/[screen]', '/Dashboard')}}>
                                BACK TO DASHBOARD
                            </button>
                        </DialogActions>
                    </div>
                </Dialog>
            </Container>
        </Layout>
    )
}

export default Submission