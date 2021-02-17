//React
import { useState, useEffect, useRef } from 'react'

// Local
import styles from './Signup.module.scss'
import dateFormatter from "utils/dateformatter";

//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { SubmissionCircleRow, SubmissionGraphRow } from "components/SubmissionGraphs";

// Material UI
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { MaterialStyles } from "lib/MaterialStyles";

let Hack = props => {
    //Style Hooks
    let classes = MaterialStyles().classesFormControl

    // Util Hooks
    let [hackOwner, setHackOwner] = useState(false)
    let [skill, setSkill] = useState('')


    let submitButton = useRef(null)
    let [popoverSubmitButton, setPopoverSubmitButton] = useState(null)
    let [openSubmit, setOpenSubmit] = useState(false)

    let [buttonText, setButtonText] = useState("SIGNUP")

    useEffect(() => {
        if (props.signups[props.uid]) {
            setButtonText("EDIT")
        }

        if (props.submitter === props.uid) {
            setHackOwner(true)
            setButtonText("OWNER")
        }
    }, [props.uid])

    let handleClose = () => {
        setOpenSubmit(false)
        setPopoverSubmitButton(null)
    }

    let handleSignup = () => {
        setOpenSubmit(true)
        setPopoverSubmitButton(submitButton.current)
    }

    let handleSubmit = el => {
        const body = JSON.stringify({
            hackId: props.hackId,
            uid: props.uid,
            skill
        })
        fetch('/api/signup', {
            method: 'PUT',
            body
        }).then(res => {
            switch(res.status) {
                case 202:
                    props.emitSignup()
            }
        })
        handleClose()
    }


    return (
        <Col md={12} className="m-3">
            <Row>
                <h2>{props.title}</h2>
            </Row>
            <Row>
                <h3>{props.industry}</h3>
            </Row>
            <Row>
                <Col xs={8}>
                    <SubmissionGraphRow sizeData={props.sizeData} />
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <SubmissionCircleRow sizeData={props.sizeData} />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Row>
                        <p>Submitted</p>
                    </Row>
                    <Row>
                        <p>{dateFormatter(props.submit_date)}</p>
                    </Row>
                </Col>
            </Row>
            <Row>
                <>
                    <Button ref={submitButton} onClick={handleSignup}
                            variant="outline-light" aria-describedby="signupButton" disabled={hackOwner}>
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
                        <Button variant="outline-success" color='primary' onClick={handleSubmit}>Confirm</Button>
                    </Popover>
                </>
            </Row>
        </Col>
    )
}

export default Hack