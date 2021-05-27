// React
import { useContext, useState } from 'react'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Components
import Layout from 'components/Layout'
import { MainProgression } from 'components/Progression'
import DeleteDialog from './DeleteDialog'
import EditDialog from './DeleteDialog'

// Store
import { Submissions } from 'store'
import SubmissionConfig from 'components/Hacks/SubmissionConfig'
import { useDialog } from 'utils/materialui'


const SubmissionDash = ({user}) => {
    const submissionsState = useContext(Submissions.State)
    let [confirmHack, setConfirmHack] = useState(null)

    let [deleteDialogOpen, deleteDialogHandleOpen, deleteDialogHandleClose, deleteDialogHandleSubmit] = useDialog()
    let [editDialogOpen, editDialogHandleOpen, editDialogHandleClose, editDialogHandleSubmit] = useDialog()

    if (!submissionsState) return <MainProgression />

    let handleDelete = async (hack) => {
        setConfirmHack(hack.title)
        deleteDialogHandleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve())
                .catch(() => reject())
        })
    }

    let handleEdit = async (hack) => {
        setConfirmHack(hack.title)
        editDialogHandleOpen()
        return new Promise((resolve, reject) => {
            window.dialogConf.progress
                .then(() => resolve(window.dialogConf.data))
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
                                                          confirmDelete={handleDelete} confirmEdit={handleEdit}/>
                                    </Row>
                                )
                            })}
                    </Col>
                </Row>
            </Container>
            <DeleteDialog open={deleteDialogOpen} handleOpen={deleteDialogHandleOpen}
                          handleClose={deleteDialogHandleClose} handleSubmit={deleteDialogHandleSubmit}
                          confirmHack={confirmHack} />
            <EditDialog open={editDialogOpen} handleOpen={editDialogHandleOpen}
                        handleClose={editDialogHandleClose} handleSubmit={editDialogHandleSubmit}
                        confirmHack={confirmHack} />
        </Layout>
    )
}

export default SubmissionDash