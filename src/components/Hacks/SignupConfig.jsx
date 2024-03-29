//React
import { useState, useEffect, useRef, useContext } from 'react'
//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// Material UI
import Popover from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import { MaterialStyles } from 'lib/MaterialStyles'
// Components
import Hack from 'components/Hacks/Hack'
// Store
import { Signups }  from 'store'

/* TODO: To be honest, the logic for this component is utter trash. Complex for no reason. This should really
    be fixed eventually.
    The difference between dash & non-dash elements should be very clear and not so intertwined. Possibly create mini
    components for each use-case.
*/
let SignupConfig = props => {
    //Style Hooks
    const { classesFormControl } = MaterialStyles()

    // Util Hooks
    let [hackOwner, setHackOwner] = useState(false)
    let [skill, setSkill] = useState('')
    let [submitted, setSubmitted] = useState(false)
    let [submitErr, setSubmitErr] = useState(false)


    let submitButton = useRef(null)
    let [popoverSubmitButton, setPopoverSubmitButton] = useState(null)
    let [openSubmit, setOpenSubmit] = useState(false)

    let [buttonText, setButtonText] = useState("SIGNUP")

    let signupActions = useContext(Signups.Dispatch)

    useEffect(() => {
        if (props.hack.signups[props.uid]) {
            setButtonText('EDIT SKILL')
        }

        if (props.hack.submitter === props.uid) {
            setHackOwner(true)
            setButtonText('OWNER')
        }
    })

    useEffect(() => {
        setSubmitErr(false)
    }, [skill])

    let handleClose = () => {
        setOpenSubmit(false)
        setPopoverSubmitButton(null)
    }

    let handleSignup = () => {
        setOpenSubmit(true)
        setPopoverSubmitButton(submitButton.current)
    }

    let handleSubmit = () => {
        if(skill === '') {
            setSubmitErr(true)
        } else {
            signupActions.update({ hackId: props.hackId, uid: props.uid, skill, hack: props.hack })
            if (!props.dash) {
                setSubmitted(true)
            }
            handleClose()
        }
    }

    let handleWithdraw = () => {
        let hack = { hackId: props.hackId, uid: props.uid, skill, title: props.hack.title }
        let confirmWithdraw = new Promise((resolve, reject) => {
            props.confirmWithdraw(hack).then(() => {
                resolve()
            }).catch(() => {
                reject()
            })
        })

        confirmWithdraw.then(() => {
            signupActions.delete(hack)
        })
    }

    return (
        <Col md={12} className="m-md-3 p-0">
            <Row>
                <Col xs={10}>
                    <Hack {...props.hack} />
                </Col>
                <Col xs={2} className='my-auto'>
                    <Row>
                        <Col>
                            {!submitted && (
                                <Row className="center m-1">
                                    <>
                                        <Button ref={submitButton} onClick={handleSignup}
                                                variant="outline-light" color="primary" aria-describedby="signupButton"
                                                disabled={hackOwner}>
                                            { buttonText }
                                        </Button>
                                        <Popover
                                            id="signupButton"
                                            open={openSubmit}
                                            anchorEl={popoverSubmitButton}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center',
                                            }}>
                                            <Col className="my-1">
                                                <Row className="my-3 justify-content-center text-center">
                                                    <p>Sign up as:</p>
                                                </Row>
                                                <Row className="my-1">
                                                    <FormControl required variant="outlined"
                                                                 className={`${classesFormControl.formControl} w-100`}>
                                                        <TextField
                                                            variant="outlined"
                                                            value={skill}
                                                            onChange={e => { setSkill(e.target.value) }}
                                                            label="Skill"
                                                            size="small"
                                                            select
                                                            error={submitErr}>
                                                            <MenuItem value='eng'>
                                                                <Typography>Engineer</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='design'>
                                                                <Typography>Designer</Typography>
                                                            </MenuItem>
                                                            <MenuItem value='pm'>
                                                                <Typography>Product Manager</Typography>
                                                            </MenuItem>
                                                        </TextField>
                                                    </FormControl>
                                                </Row>
                                                <Row className="mt-2 mb-3 justify-content-center" >
                                                    <Button className="btn btn-primary" onClick={handleSubmit}>CONFIRM</Button>
                                                </Row>
                                            </Col>
                                        </Popover>
                                    </>
                                </Row>
                            )}
                            {submitted && (
                                <Row className="center">
                                    <Button variant="outline-success"
                                            aria-describedby="signupButton" disabled={true}>
                                        SIGNED UP
                                    </Button>
                                </Row>
                            )}
                            {!hackOwner && props.dash && (
                                <Row className="center">
                                    <Button ref={submitButton} onClick={handleWithdraw} variant="danger"
                                            aria-describedby="signupButton" disabled={hackOwner}>
                                        WITHDRAW
                                    </Button>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}


export default SignupConfig