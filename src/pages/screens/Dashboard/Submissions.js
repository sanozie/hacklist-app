import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Dashboard.module.scss";
import {
    SubmissionCircleRow,
    SubmissionGraphRow
} from "../../components/SubmissionGraphs";

/**
 * Graph   shows Hack Submission data
 * @param {*} data
 */
let Submissions = ({ data }) => {
    return (
        <Row className="py-2 w-100">
            <Col xs="2" className="position-relative">
                {(data.length === 0) && (
                    <div className={styles.strong_number}>0</div>
                )}
                {(data.length > 0) && (
                    <div className={styles.strong_number}>{data.length}</div>
                )}
            </Col>
            <Col xs="10" className="align-items-center my-auto align-items-center">
                {(data.length === 0) && (
                    <p className={styles.new_info}>Data on hacks you submit will be here.
                        <br />
                        You can submit up to 3 hacks at once.</p>
                )}
                {(data.length > 0) && (
                    <Row className="justify-content-end mt-n4 pb-2 d-none d-lg-flex">
                        <Col lg="7"><h5>Minimums</h5></Col>
                        <Col lg="3"><h5>Maximums</h5></Col>
                    </Row>
                )}
                {(data.length > 0) && data.map(item => {
                        return (
                            <Row className="py-1">
                                <Col lg="2" className="d-flex align-items-center">
                                    <h4 className="submitted_hack_title flex-grow-1">
                                        {item.title}
                                    </h4>
                                </Col>
                                <Col lg="7" className=" align-items-center py-1">
                                    <SubmissionGraphRow sizeData={item.sizeData} />
                                </Col>
                                <Col lg="3">
                                    <SubmissionCircleRow sizeData={item.sizeData} />
                                </Col>
                            </Row>
                        )
                    }
                )}
            </Col>
        </Row>

    )
}

export default Submissions