import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Material
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/core/Slider'
import { MaterialStyles } from 'lib/MaterialStyles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import {Progression} from '../Progression'
import Dialog from '@material-ui/core/Dialog'
import {firebase} from '../../db/client'

// Store
import { Submissions } from 'store'

/**
 * Submission Form Hook
 * @returns {({setIndustry: (value: (((prevState: string) => string) | string)) => void, state: string}|{state: string, setContribution: (value: (((prevState: string) => string) | string)) => void}|{setHackTitle: (value: (((prevState: string) => string) | string)) => void, state: string}|{setEngRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]}|{setDesignRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]})[]}
 */
function useSubmissionForm(state, id) {
    let [industryState, setIndustry] = useState('')
    let [contributionState, setContribution] = useState('')
    let [hackTitleState, setHackTitle] = useState('')
    let [engRangeState, setEngRange] = useState([1, 3])
    let [designRangeState, setDesignRange] = useState([1, 3])
    let [pmRangeState, setPmRange] = useState([1, 3])

    let industry = {
        state: industryState,
        setIndustry
    },
        contribution = {
        state: contributionState,
            setContribution
        },
        hackTitle = {
        state: hackTitleState,
            setHackTitle
        },
        engRange = {
        state: engRangeState,
            setEngRange
        },
        designRange = {
        state: designRangeState,
            setDesignRange
        },
        pmRange = {
        state: pmRangeState,
            setPmRange
        }

    return [industry, contribution, hackTitle, engRange, designRange, pmRange]
}


let SubmissionForm = props => {
    const router = useRouter()
    const submissionState = useContext(Submissions.State)

    let [industry,
        contribution,
        hackTitle,
        engRange,
        designRange,
        pmRange] = useSubmissionForm(submissionState, props.hack?.hackId)
    let [apiProgress, setApiProgress] = useState('idle')
    const [open, setOpen] = useState(false)
    let [focus, setFocus] = useState('default')

    // Destructure hack to be edited to be used in default form values

    // Styles
    const formControlClasses = MaterialStyles().classesFormControl
    const inputsClasses = MaterialStyles().classesInput
    const getProgress = state =>  {
        return { display: apiProgress === state ? 'block' : 'none' }
    }

    useEffect(() => {
        if(props.focusListener) {
            props.focusListener(focus)
        }
    }, [focus])

    const handleSubmit = async () => {
        setApiProgress('pending')
        let { displayName, uid } = firebase.auth().currentUser
        setTimeout(() => {
            console.table(data)

        })
        let data = JSON.stringify({
            industry: industry.state,
            contribution: contribution.state,
            hackTitle: hackTitle.state,
            engRange: engRange.state,
            designRange: designRange.state,
            pmRange: pmRange.state,
            submitter_name: displayName,
            submitter: uid
        })
        try {
            await fetch('/api/submit', {
                method: 'POST',
                body: data
            })
            setApiProgress('success')
        } catch(err) {
            setApiProgress('error')
        }
    }

    return (
        <Col>
            <Row className="justify-content-center">
                <FormControl required variant="outlined"
                             classes={formControlClasses}
                             onMouseDown={() => setFocus('industry')}>
                    <TextField
                        variant="outlined"
                        value={industry.state}
                        onChange={e => { industry.setIndustry(e.target.value) }}
                        label="Industry"
                        color="primary"
                        classes={inputsClasses}
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
                <FormControl required variant="outlined"
                             classes={formControlClasses}
                             onMouseDown={() => setFocus('contribution')}>
                    <TextField
                        variant="outlined"
                        value={contribution.state}
                        onChange={e => { contribution.setContribution(e.target.value) }}
                        label="Contribution"
                        color="primary"
                        select
                        required>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl variant="outlined" classes={formControlClasses} onMouseDown={() => setFocus('title')}>
                    <TextField
                        variant="outlined"
                        value={hackTitle.state}
                        onChange={e => { hackTitle.setHackTitle(e.target.value) }}
                        color="primary"
                        label="Title" />
                    <FormHelperText>Optional</FormHelperText>
                </FormControl>
            </Row>
            <Row className="justify-content-center">
                <FormControl classes={formControlClasses} onMouseDown={() => setFocus('eng')}>
                    <label id="eng-range" className="slider-label">Engineering</label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={engRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="eng-range"
                        onChange={(event, newVal) => engRange.setEngRange(newVal)}
                        color="primary"
                    />
                </FormControl>
                <FormControl classes={formControlClasses} onMouseDown={() => setFocus('design')}>
                    <label id="design-range" className="slider-label">Design</label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={designRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="design-range"
                        onChange={(event, newVal) => designRange.setDesignRange(newVal)}
                        color='secondary'
                    />
                </FormControl>
                <FormControl classes={formControlClasses} onMouseDown={() => setFocus('pm')}>
                    <label id="pm-range" className="slider-label">Product Managers</label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={pmRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="pm-range"
                        onChange={(event, newVal) => pmRange.setPmRange(newVal)}
                        color="tertiary"
                    />
                </FormControl>
            </Row>
            <Row className="justify-content-center">
                <button className="btn btn-secondary" onClick={() => setOpen(true)}>SUBMIT</button>
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
                        <Button className="btn btn-primary" onClick={handleSubmit}>SUBMIT</Button>
                        <Button variant="outline-light" onClick={() => setOpen(false)}>CANCEL</Button>
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
        </Col>
    )
}

export default SubmissionForm