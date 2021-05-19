// React
import {useContext, useState} from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from 'components/Layout'
import Hack from 'components/Hacks/Hack'
import { MainProgression } from 'components/Progression'

// Store
import { Submissions } from 'store'
import SubmissionConfig from 'components/Hacks/SubmissionConfig'
import { useDialog } from 'utils/materialui'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "react-bootstrap/Button";

const SubmissionDash = ({user}) => {
    const submissionsState = useContext(Submissions.State)
    let [confirmHack, setConfirmHack] = useState(null)

    let [open, handleOpen, handleClose, handleSubmit] = useDialog()

    if (!submissionsState) return <MainProgression />

    let handleDelete = async (hack) => {
        setConfirmHack(hack.title)
        handleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve())
                .catch(() => reject())
        })
    }

    // TODO: It looks like hovering causes a rerender.... this should be fixed
    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Submissions</h1>
                        </Row>
                            {Object.entries(submissionsState).map(([id, hack]) => {
                                return (
                                    <Row className="my-3">
                                        <SubmissionConfig hack={hack} uid={user.id} hackId={id} dash={true}
                                                          confirmDelete={handleDelete}/>
                                    </Row>
                                )
                            })}
                    </Col>
                </Row>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ `Delete the ${confirmHack} hack?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can't undo this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outline-lignt" color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" color="primary" autoFocus>
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}

export default SubmissionDash