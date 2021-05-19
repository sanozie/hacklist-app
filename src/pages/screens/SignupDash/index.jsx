// React
import { useState, useContext } from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Material UI
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

// Components
import Layout from 'components/Layout'
import SignupConfig from 'components/Hacks/SignupConfig'

// Store
import { Signups } from 'store'
import { MainProgression } from 'components/Progression'

// Utils
import { useDialog } from 'utils/materialui'


const SignupDash = ({user}) => {
    const signupsState = useContext(Signups.State)
    let [confirmHack, setConfirmHack] = useState(null)

    let [open, handleOpen, handleClose, handleSubmit] = useDialog()

    let handleWithdraw = async (hack) => {
        setConfirmHack(hack.title)
        handleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve())
                .catch(() => reject())
        })
    }

    if (!signupsState) return <MainProgression />

    return (
        <Layout title="Submissions | DIYHacks" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Signups</h1>
                        </Row>
                        { Object.entries(signupsState).map(([id, hack]) => {
                            return (
                                <Row className="my-3">
                                    <SignupConfig hack={hack} uid={user.id} hackId={id}
                                                  confirmWithdraw={handleWithdraw} dash={true} />
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
                <DialogTitle id="alert-dialog-title">{ `Withdraw your signup from ${confirmHack}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You'll have to sign up again manually if you continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outline-lignt" color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={handleSubmit} variant="danger" color="primary" autoFocus>
                        WITHDRAW
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    )
}

export default SignupDash