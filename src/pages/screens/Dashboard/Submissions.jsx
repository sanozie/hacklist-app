// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Styles
import styles from './Dashboard.module.scss'
// Components
import { SubmissionCircleRow, SubmissionGraphRow } from 'components/Graphs'

/**
 * Graph   shows Hack Submission data
 * @param {*} data
 */
let Submissions = ({ data }) => {
    let submissionValues = Object.values(data)
    let submissionCount = submissionValues.length

    return (
        <Row className="py-4 py-md-2 w-100">
            <Col xs="2" className="d-none d-md-flex position-relative">
                {(submissionCount === 0) && (
                    <div className={styles.strong_number}>0</div>
                )}
                {(submissionCount > 0) && (
                    <div className={styles.strong_number}>{submissionCount}</div>
                )}
            </Col>
            <Col xs="12" md="10" className="align-items-center my-auto align-items-center p-0">
                {(submissionCount === 0) && (
                    <p className={styles.new_info}>
                        Data on hacks you submit will be here.
                        <br />Each submission counts as a signup.
                        <br />You can be signed up to 3 hacks at once.</p>
                )}
                {(submissionCount > 0) && (
                    <Row className="justify-content-end mt-n4 pb-2 d-none d-lg-flex">
                        <Col lg="7"><h5>Minimums</h5></Col>
                        <Col lg="3"><h5>Maximums</h5></Col>
                    </Row>
                )}
                {(submissionCount > 0) && submissionValues.map(item => (
                    <Row className="py-1">
                        <Col lg="2" className="d-flex align-items-center">
                            <h4 className="submitted_hack_title flex-grow-1">
                                {item.title}
                            </h4>
                        </Col>
                        <Col lg="7" xs="12" className="align-items-center center py-1 pr-0 ">
                            <SubmissionGraphRow sizeData={item.sizeData} />
                        </Col>
                        <Col lg="3" className="d-none d-lg-block">
                            <SubmissionCircleRow sizeData={item.sizeData} />
                        </Col>
                    </Row>
                ))}
            </Col>
        </Row>
    )
}

export default Submissions