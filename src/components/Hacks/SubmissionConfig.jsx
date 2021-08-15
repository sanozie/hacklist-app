//React
import { useContext } from 'react'
//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
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

    let handleDelete = () => {
        let hack = { hackId: props.hackId, title: props.hack.title }
        let confirmDelete = new Promise((resolve, reject) => {
            props.confirmDelete(hack).then(() => {
                resolve()
            }).catch(() => {
                reject()
            })
        })

        confirmDelete.then(() => {
            submissionActions.delete(hack)
        })
    }

    let handleEdit = () => {
        let hack = { hackId: props.hackId, title: props.hack.title }
        let confirmEdit = new Promise((resolve, reject) => {
            props.confirmEdit(hack).then(data => {
                resolve(data)
            }).catch(() => {
                reject()
            })
        })

        confirmEdit.then(data => {
            submissionActions.update(data)
        })
    }


    return (
        <Col className="m-md-3 p-0">
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