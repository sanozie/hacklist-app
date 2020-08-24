//React
import { useState, useEffect, useRef } from 'react'
// Local
import styles from './Signup.module.scss'
import dateFormatter from "../../utils/dateformatter";

//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {SubmissionCircleRow, SubmissionGraphRow} from "../../components/SubmissionGraphs";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";

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

let Hack = props => {
    //Style Hooks
    let classes = useStyles();
    let [alreadySignedUp, setAlreadySignedUp] = useState(false)
    let [skill, setSkill] = useState('')


    let submitButton = useRef(null)
    let [popoverSubmitButton, setPopoverSubmitButton] = useState(null)
    let [openSubmit, setOpenSubmit] = useState(false)

    useEffect(() => {
        if(props.signups[props.uid]) {
            setAlreadySignedUp(true)
        }
    })
    let handleClose = () => {
        console.log('closed')
    }

    let handleSkill = () => {
        setOpenSubmit(true)
        setPopoverSubmitButton(submitButton.current)
        debugger
    }

    let handleSkillEnter = el => {
        //keyCode 13 is the Enter key
        if(el.keyCode === 13) {
            handleClose()
        }
    }


    return (
        <Col md={4}>
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
                {!alreadySignedUp  && (
                    <>
                        <Button ref={submitButton} onClick={handleSkill} variant="outline-light" aria-describedby="signupButton">SIGNUP</Button>
                        <Popover
                        id="signupButton"
                        open={openSubmit}
                        anchorEl={popoverSubmitButton}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                        transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                        >
                        <p>Sign up as:</p>
                        <FormControl required variant="outlined" className={`${classes.formControl} w-100`}>
                        <TextField
                        variant="outlined"
                        value={skill}
                        onChange={e => { setSkill(e.target.value) }}
                        onKeyDown={e => {handleSkillEnter(e)}}
                        label="Industry"
                        size="small"
                        select
                        >
                            <MenuItem value='eng'>Engineer</MenuItem>
                            <MenuItem value='design'>Designer</MenuItem>
                            <MenuItem value='pm'>Product Manager</MenuItem>
                        </TextField>
                        </FormControl>
                        </Popover>
                    </>
                )}
                {alreadySignedUp && (
                    <Button variant="outline-success">Signed Up</Button>
                )}
            </Row>
        </Col>
    )
}

export default Hack