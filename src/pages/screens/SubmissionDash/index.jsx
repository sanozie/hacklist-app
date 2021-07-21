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
import EditDialog from './EditDialog'

// Store
import { Submissions } from 'store'
import SubmissionConfig from 'components/Hacks/SubmissionConfig'
import { useDialog } from 'utils/materialui'


const SubmissionDash = ({user}) => {
    const submissionsState = useContext(Submissions.State)?.state
    let [focusedHack, setFocusedHack] = useState(null)

    let [deleteDialogOpen, deleteDialogHandleOpen, deleteDialogHandleClose, deleteDialogHandleSubmit] = useDialog()
    let [editDialogOpen, editDialogHandleOpen, editDialogHandleClose, editDialogHandleSubmit] = useDialog()

    let handleDelete = async hack => {
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
    }

    if (!submissionsState) return <MainProgression />

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
                                        <SubmissionConfig hack={hack} uid={user.uid} hackId={id} dash={true}
                                                          confirmDelete={handleDelete} confirmEdit={handleEdit}/>
                                    </Row>
                                )
                            })}
                    </Col>
                </Row>
            </Container>
            <DeleteDialog open={deleteDialogOpen} handleOpen={deleteDialogHandleOpen}
                          handleClose={deleteDialogHandleClose} handleSubmit={deleteDialogHandleSubmit}
                          hack={focusedHack} />
            <EditDialog open={editDialogOpen} handleOpen={editDialogHandleOpen}
                        handleClose={editDialogHandleClose} handleSubmit={editDialogHandleSubmit} hack={focusedHack}
                        finished={editDialogHandleClose} />
        </Layout>
    )
}

export default SubmissionDash