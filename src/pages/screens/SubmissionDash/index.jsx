// React & Next
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
// Material UI
import Typography from '@material-ui/core/Typography'
// Components
import Layout from 'components/Layout'
import { MainProgression } from 'components/Progression'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'
import StartDialog from './StartDialog'
// Store
import { Submissions } from 'store'
import SubmissionConfig from 'components/Hacks/SubmissionConfig'
import { useDialog } from 'utils/ui'
import back from '../../../utils/route/back'


const SubmissionDash = ({user}) => {
    const router = useRouter()
    const submissionsState = useContext(Submissions.State)?.state
    const [focusedHack, setFocusedHack] = useState(null)

    const [deleteDialogOpen, deleteDialogHandleOpen, deleteDialogHandleClose, deleteDialogHandleSubmit] = useDialog()
    const [editDialogOpen, editDialogHandleOpen, editDialogHandleClose, editDialogHandleSubmit] = useDialog()
    const [startDialogOpen, startDialogHandleOpen, startDialogHandleClose, startDialogHandleSubmit] = useDialog()

    const handleDelete = async hack => {
        setFocusedHack(hack)
        deleteDialogHandleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve())
                .catch(() => reject())
        })
    },
        handleEdit = async hack => {
        setFocusedHack(hack)
        editDialogHandleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve(window.dialogConf.data))
                .catch(() => reject())
        })
    },
        handleStart = async hack => {
            setFocusedHack(hack)
            startDialogHandleOpen()
            return new Promise((resolve, reject) => {
                window.dialogConf.progress
                    .then(() => resolve(window.dialogConf.data))
                    .catch(() => reject())
            })
        }

    if (!submissionsState) return <MainProgression />

    // TODO: It looks like hovering causes a rerender.... this should be fixed. Then again, state is changing on hover so ig it makes sense
    return (
        <Layout title="Submissions | Hacklist" nav={true}>
            <Container>
                <Row className="my-2 pt-5 pb-3">
                    <Col className="text-center">
                        <Row>
                            <Col>
                                <h1 className="page-header">Your Submissions</h1>
                            </Col>
                            <Col sm="1" className="ml-auto center">
                                <p className="back-button" onClick={back}>{'< Back'}</p>
                            </Col>
                        </Row>
                        { Object.keys(submissionsState).length === 0 ? (
                            <Row className="my-5">
                                <Col>
                                    <Typography className="my-3">It looks like you haven't submitted any hacks yet.</Typography>
                                    <Button onClick={() => router.push('/[screen]', '/AddSubmission')}>SUBMIT A HACK</Button>
                                </Col>
                            </Row>
                        ) : Object.entries(submissionsState).map(([id, hack]) => {
                            return (
                                <Row className="my-3">
                                    <SubmissionConfig key={id} hack={hack} uid={user.uid} hackId={id} dash={true}
                                                      confirmDelete={handleDelete} confirmEdit={handleEdit}
                                                      confirmStart={handleStart} />
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
            <DeleteDialog open={deleteDialogOpen} handleOpen={deleteDialogHandleOpen}
                          handleClose={deleteDialogHandleClose} handleSubmit={deleteDialogHandleSubmit}
                          hack={focusedHack} />
            <EditDialog open={editDialogOpen} handleOpen={editDialogHandleOpen} handleClose={editDialogHandleClose}
                        handleSubmit={editDialogHandleSubmit} hack={focusedHack} finished={editDialogHandleClose} />
            <StartDialog open={startDialogOpen} handleOpen={startDialogHandleOpen} handleClose={startDialogHandleClose}
                         handleSubmit={startDialogHandleSubmit} hack={focusedHack} />
        </Layout>
    )
}

export default SubmissionDash