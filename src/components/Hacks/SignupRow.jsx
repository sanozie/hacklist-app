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

let SignupRow = props => {
    //Style Hooks
    let classes = MaterialStyles().classesFormControl

    // Util Hooks
    let [hackOwner, setHackOwner] = useState(false)
    let [skill, setSkill] = useState('')


    let submitButton = useRef(null)
    let [popoverSubmitButton, setPopoverSubmitButton] = useState(null)
    let [openSubmit, setOpenSubmit] = useState(false)

    let [buttonText, setButtonText] = useState("SIGNUP")

    let signupActions = useContext(Signups.Dispatch)

    useEffect(() => {
        if (props.signups[props.uid]) {
            setButtonText("EDIT SKILL")
        }

        if (props.submitter === props.uid) {
            setHackOwner(true)
            setButtonText("OWNER")
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

    // TODO: Figure out the hackId vs hackID thing
    let handleSubmit = () => {
        signupActions.update({ hackId: props.hackID, uid: props.uid, skill })
        handleClose()
    }

    let handleWithdraw = () => {
        let hack = { hackId: props.hackID, uid: props.uid, skill, title: props.title }
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
                    <Hack {...props} />
                </Col>
                <Col xs={2} className='my-auto'>
                    <Row>
                        <Col>
                            <Row className="center m-1">
                                <>
                                    <Button ref={submitButton} onClick={handleSignup}
                                            variant="outline-light" color="primary" aria-describedby="signupButton" disabled={hackOwner}>
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

export default SignupRow