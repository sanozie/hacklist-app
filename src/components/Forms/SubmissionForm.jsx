import { useState, useEffect, useContext, useDebugValue } from 'react'
import PropTypes from 'prop-types'
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
import { useUser } from 'utils/auth/useUser'

/**
 * Submission Form Hook
 * @returns {({setIndustry: (value: (((prevState: string) => string) | string)) => void, state: string}|{state: string, setContribution: (value: (((prevState: string) => string) | string)) => void}|{setHackTitle: (value: (((prevState: string) => string) | string)) => void, state: string}|{setEngRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]}|{setDesignRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]})[]}
 */
function useSubmissionForm(state, uid) {
    let [industryState, setIndustry] = useState(state ? state.industry : '')
    let [contributionState, setContribution] = useState(state ? state.signups[uid].skill : '')
    let [hackTitleState, setHackTitle] = useState(state ? state.title : '')
    let [engRangeState, setEngRange] = useState([
        state ? state.limits.eng.min : 1,
        state ? state.limits.eng.max : 3
    ])
    let [designRangeState, setDesignRange] = useState([
        state ? state.limits.design.min : 1,
        state ? state.limits.design.max : 3
    ])
    let [pmRangeState, setPmRange] = useState([
        state ? state.limits.pm.min : 1,
        state ? state.limits.pm.max : 3
    ])
    let [limits, setLimits] = useState({})

    useEffect(() => {
        let limitMap = {
            max: designRangeState[1] + engRangeState[1] + pmRangeState[1],
            min: designRangeState[0] + engRangeState[0] + pmRangeState[0],
            design: {
                max: designRangeState[1],
                min: designRangeState[0]
            },
            eng: {
                max: engRangeState[1],
                min: engRangeState[0]
            },
            pm: {
                max: pmRangeState[1],
                min: pmRangeState[0]
            }
        }
        setLimits(limitMap)
    }, [engRangeState, designRangeState, pmRangeState])


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

    useDebugValue({ industry, contribution, hackTitle, limits })

    return [industry, contribution, hackTitle, engRange, designRange, pmRange, limits]
}


let SubmissionForm = props => {
    let { displayName, uid } = firebase.auth().currentUser
    const router = useRouter()
    const submissionState = useContext(Submissions.State)?.state,
        submissionActions = useContext(Submissions.Dispatch)

    let [industry,
        contribution,
        hackTitle,
        engRange,
        designRange,
        pmRange,
        limits] = useSubmissionForm(submissionState[props.hack?.hackId], uid)
    let [apiProgress, setApiProgress] = useState('idle')
    const [open, setOpen] = useState(false)
    let [focus, setFocus] = useState('default')

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

        const params = {
            usage: props.usage,
            uid,
            data: {
                industry: industry.state,
                contribution: contribution.state,
                hackTitle: hackTitle.state,
                limits,
                submitter_name: displayName,
                submitter: uid,
                hackId: props.hack?.hackId,
                signups: submissionState[props.hack?.hackId]?.signups
            }
        }

        // Needs to be for put and post
        try {

            switch(props.usage) {
                case 'add':
                    await submissionActions.update(params)
                    setApiProgress('success')
                    break
                case 'update':
                    await props.handleFinish(params)
                    setApiProgress('updated')
            }
        } catch(err) {
            setApiProgress('error')
        }
    }
    const handleOpen = () => {
        setOpen(true)
        setApiProgress('idle')
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
                        <MenuItem value='Recruiting & Staffing'>Recruiting & Staffing</MenuItem>
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
                        <MenuItem value='eng'>Engineering</MenuItem>
                        <MenuItem value='design'>Design</MenuItem>
                        <MenuItem value='pm'>Product Management</MenuItem>
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
                <button className="btn btn-secondary" onClick={handleOpen}>SUBMIT</button>
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

SubmissionForm.propTypes = {
    usage: PropTypes.oneOf(['add', 'update']).isRequired,
    focusListener: PropTypes.func,
}
export default SubmissionForm