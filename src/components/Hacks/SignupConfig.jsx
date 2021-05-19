//React
import { useState, useEffect, useRef, useContext } from 'react'

//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Material UI
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { MaterialStyles } from "lib/MaterialStyles";

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
    let classes = MaterialStyles().classesFormControl

    // Util Hooks
    let [hackOwner, setHackOwner] = useState(false)
    let [skill, setSkill] = useState('')
    let [submitted, setSubmitted] = useState(false)


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

    let handleClose = () => {
        setOpenSubmit(false)
        setPopoverSubmitButton(null)
    }

    let handleSignup = () => {
        setOpenSubmit(true)
        setPopoverSubmitButton(submitButton.current)
    }

    let handleSubmit = () => {
        signupActions.update({ hackId: props.hackId, uid: props.uid, skill, hack: props.hack })
        if (!props.dash) {
            setSubmitted(true)
        }
        handleClose()
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
        <Col md={12} className="m-3">
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
                                            <p>Sign up as:</p>
                                            <FormControl required variant="outlined"
                                                         className={`${classes.formControl} w-100`}>
                                                <TextField
                                                    variant="outlined"
                                                    value={skill}
                                                    onChange={e => { setSkill(e.target.value) }}
                                                    label="Skill"
                                                    size="small"
                                                    select>
                                                    <MenuItem value='eng'>Engineer</MenuItem>
                                                    <MenuItem value='design'>Designer</MenuItem>
                                                    <MenuItem value='pm'>Product Manager</MenuItem>
                                                </TextField>
                                            </FormControl>
                                            <Button variant="outline-success" color="primary" onClick={handleSubmit}>Confirm</Button>
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