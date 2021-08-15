// React & Next
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
import { MaterialStyles, Slider } from 'lib/MaterialStyles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { Progression } from '../Progression'
import Dialog from '@material-ui/core/Dialog'
// Store
import { Submissions } from 'store'
import { User } from 'store'

/**
 * Submission Form Hook
 * @returns {({setIndustry: (value: (((prevState: string) => string) | string)) => void, state: string}|{state: string, setContribution: (value: (((prevState: string) => string) | string)) => void}|{setHackTitle: (value: (((prevState: string) => string) | string)) => void, state: string}|{setEngRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]}|{setDesignRange: (value: (((prevState: number[]) => number[]) | number[])) => void, state: number[]})[]}
 */
function useSubmissionForm(state, uid) {
    let [industryState, setIndustry] = useState(state ? state.industry : '')
    let [industryError, setIndustryError] = useState(false)
    let [contributionState, setContribution] = useState(state ? state.signups[uid].skill : '')
    let [contributionError, setContributionError] = useState(false)
    let [hackTitleState, setHackTitle] = useState(state ? state.title : '')
    let [hackTitleError, setHackTitleError] = useState(false)
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

    // Building limit map
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

    // Validation
    useEffect(() => {
        setHackTitleError(false)
    }, [hackTitleState])

    useEffect(() => {
        setContributionError(false)
    }, [contributionState])

    useEffect(() => {
        setIndustryError(false)
    }, [industryState])


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
        },
        hackTitleErr = {
        state: hackTitleError,
            setHackTitleError
        },
        industryErr = {
        state: industryError,
            setIndustryError
        },
        contributionErr = {
        state: contributionError,
            setContributionError
        }

    useDebugValue({ industry, contribution, hackTitle, limits, hackTitleErr, industryErr, contributionErr })

    return { industry, contribution, hackTitle, engRange, designRange, pmRange, limits, hackTitleErr, industryErr, contributionErr }
}


let SubmissionForm = props => {
    const router = useRouter()
    const { uid, displayName } = useContext(User.State)
    const submissionState = useContext(Submissions.State)?.state,
        submissionActions = useContext(Submissions.Dispatch)

    let form = useSubmissionForm(submissionState?.[props.hack?.hackId], uid)
    let [apiProgress, setApiProgress] = useState('idle')
    const [open, setOpen] = useState(false)
    let [focus, setFocus] = useState('default')

    // Styles
    const { classesFormControl, classesInput, classesPopup: { paper }, classesDialogText: { root } } = MaterialStyles()
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
                industry: form.industry.state,
                contribution: form.contribution.state,
                hackTitle: form.hackTitle.state,
                limits: form.limits,
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
        let valid = true
        if (form.hackTitle.state === '') {
            form.hackTitleErr.setHackTitleError(true)
            valid = false
        }
        if (form.industry.state === '') {
            form.industryErr.setIndustryError(true)
            valid = false
        }
        if (form.contribution.state === '') {
            form.contributionErr.setContributionError(true)
            valid = false
        }

        if (valid) {
            setOpen(true)
            setApiProgress('idle')
        }
    }

    useEffect(() =>{
        console.log(form.hackTitleErr.state)
    }, [form.hackTitleErr])

    return (
        <Col>
            <Row className="justify-content-center">
                <FormControl required variant="outlined" classes={classesFormControl}
                             onMouseDown={() => setFocus('industry')}>
                    <TextField
                        variant="outlined"
                        value={form.industry.state}
                        onChange={e => { form.industry.setIndustry(e.target.value) }}
                        label="Industry"
                        color="primary"
                        classes={classesInput}
                        select
                        required
                        error={form.industryErr.state}
                    >
                        <MenuItem value='Recruiting & Staffing'>
                            <Typography>Recruiting & Staffing</Typography>
                        </MenuItem>
                    </TextField>
                </FormControl>
                <FormControl required variant="outlined" classes={classesFormControl}
                             onMouseDown={() => setFocus('contribution')}>
                    <TextField
                        variant="outlined"
                        value={form.contribution.state}
                        onChange={e => { form.contribution.setContribution(e.target.value) }}
                        label="Contribution"
                        color="primary"
                        select
                        required
                        error={form.contributionErr.state}>
                        <MenuItem value='eng'>
                            <Typography>Engineering</Typography>
                        </MenuItem>
                        <MenuItem value='design'>
                            <Typography>Design</Typography>
                        </MenuItem>
                        <MenuItem value='pm'>
                            <Typography>Product Management</Typography>
                        </MenuItem>
                    </TextField>
                </FormControl>
                <FormControl variant="outlined" classes={classesFormControl} onMouseDown={() => setFocus('title')}>
                    <TextField
                        variant="outlined"
                        value={form.hackTitle.state}
                        onChange={e => { form.hackTitle.setHackTitle(e.target.value) }}
                        color="primary"
                        label="Title"
                        required
                        error={form.hackTitleErr.state} />
                </FormControl>
            </Row>
            <Row className="justify-content-center">
                <FormControl classes={classesFormControl} onMouseDown={() => setFocus('eng')}>
                    <label id="eng-range" className="slider-label">
                        <Typography>Engineering</Typography>
                    </label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={form.engRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="eng-range"
                        onChange={(event, newVal) => form.engRange.setEngRange(newVal)}
                        color="primary"
                    />
                </FormControl>
                <FormControl classes={classesFormControl} onMouseDown={() => setFocus('design')}>
                    <label id="design-range" className="slider-label">
                        <Typography>Design</Typography>
                    </label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={form.designRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="design-range"
                        onChange={(event, newVal) => form.designRange.setDesignRange(newVal)}
                        color='secondary'
                    />
                </FormControl>
                <FormControl classes={classesFormControl} onMouseDown={() => setFocus('pm')}>
                    <label id="pm-range" className="slider-label">
                        <Typography>Product Managers</Typography>
                    </label>
                    <Slider
                        max={5}
                        defaultValue={[1, 3]}
                        value={form.pmRange.state}
                        valueLabelDisplay="auto"
                        aria-labelledby="pm-range"
                        onChange={(event, newVal) => form.pmRange.setPmRange(newVal)}
                        color="tertiary"
                    />
                </FormControl>
            </Row>
            <Row className="justify-content-center">
                <Button variant="outline-light" onClick={handleOpen}>SUBMIT</Button>
            </Row>
            <Dialog
                maxWidth={'xs'}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="confirm"
                PaperProps={{ className: paper }}
            >
                <div style={getProgress('idle')}>
                    <DialogTitle id="confirm" className="text-center">
                        <Typography variant="h1">Confirm</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className={root}>
                            <Typography>Yes? You're ready to submit?</Typography>
                        </DialogContentText>
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
                        <Button className="btn btn-primary"
                                onClick={() => {router.push('/[screen]', '/Dashboard')}}>
                            BACK TO DASHBOARD
                        </Button>
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