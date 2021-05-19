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
import { Submissions }  from 'store'

/* TODO: To be honest, the logic for this component is utter trash. Complex for no reason. This should really
    be fixed eventually.
    The difference between dash & non-dash elements should be very clear and not so intertwined. Possibly create mini
    components for each use-case.
*/
let SubmissionConfig = props => {
    let submissionActions = useContext(Submissions.Dispatch)

    let handleEdit = () => {
    //     signupActions.update({ hackId: props.hackId, uid: props.uid, skill, hack: props.hack })
    //     if (!props.dash) {
    //         setSubmitted(true)
    //     }
    //     handleClose()
    }

    let handleDelete = () => {
    //     let hack = { hackId: props.hackId, uid: props.uid, skill, title: props.hack.title }
    //     let confirmWithdraw = new Promise((resolve, reject) => {
    //         props.confirmWithdraw(hack).then(() => {
    //             resolve()
    //         }).catch(() => {
    //             reject()
    //         })
    //     })
    //
    //     confirmWithdraw.then(() => {
    //         signupActions.delete(hack)
    //     })
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
                            <Row className="center m-1">
                                <Button onClick={handleEdit} variant="outline-light" color="primary"
                                        aria-describedby="editSubmission">
                                    EDIT
                                </Button>
                            </Row>
                            <Row className="center">
                                <Button onClick={handleDelete} variant="danger" aria-describedby="withdrawButton">
                                    DELETE
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}


export default SubmissionConfig