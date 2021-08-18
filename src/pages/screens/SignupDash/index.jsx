// React & Next
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
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
import Typography from '@material-ui/core/Typography'
// Components
import Layout from 'components/Layout'
import SignupConfig from 'components/Hacks/SignupConfig'
import { MainProgression } from 'components/Progression'
// Store
import { Signups } from 'store'
// Utils
import { useDialog } from 'utils/materialui'


const SignupDash = ({user}) => {
    const router = useRouter()
    const signupsState = useContext(Signups.State)?.state
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
        <Layout title="Submissions | Hacklist" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <h1 className="page-header">Your Signups</h1>
                        </Row>
                        { Object.keys(signupsState).length === 0 ? (
                            <Row className="my-5">
                                <Col>
                                    <Typography className="my-3">It looks like you haven't signed up to any hacks yet.</Typography>
                                    <Button onClick={() => router.push('/[screen]', '/Signup')}>SIGNUP TO HACKS</Button>
                                </Col>
                            </Row>
                        ) : Object.entries(signupsState).map(([id, hack]) => {
                            return (
                                <Row className="my-3">
                                    <SignupConfig key={id} hack={hack} uid={user.uid} hackId={id}
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
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h1" className="text-center">{ `Withdraw your signup from ${confirmHack}?`}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="text-center">
                        You'll have to sign up again manually if you continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="justify-content-center">
                    <Button onClick={handleClose} variant="outline-light" color="primary">
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