import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Dashboard.module.scss";
import {CircleGraph, SubmissionGraph, SubmissionGraphOverflow} from "./ToolTippedComponenets";

/**
 * Graph that shows Hack Submission data
 * @param {*} data
 */
let Submissions = ({ data }) => {

    return (
        <Row className="py-2 w-100">
            <Col xs="2" className="position-relative">
                {(data.length == 0) && (
                    <div className={styles.strong_number}>0</div>
                )}
                {(data.length > 0) && (
                    <div className={styles.strong_number}>{data.length}</div>
                )}
            </Col>
            <Col xs="10" className="align-items-center my-auto align-items-center">
                {(data.length == 0) && (
                    <p className={styles.new_info}>Data on hacks you submit will be here. <br /> You can submit up to 3 hacks at once.</p>
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
                                    <Row className={`flex-grow-1 ${styles.submissions_graph_wrapper} position-relative`}>
                                        <SubmissionGraph classes={styles.eng_graph} width={`${item.sizeData.eng.width}%`} type="eng" signups={item.sizeData.eng.min_signup_num} />
                                        <SubmissionGraph classes={styles.design_graph} width={`${item.sizeData.design.width}%`} type="design" signups={item.sizeData.design.min_signup_num} />
                                        <SubmissionGraph classes={styles.pm_graph} width={`${item.sizeData.pm.width}%`} type="pm" signups={item.sizeData.pm.min_signup_num} />
                                        <SubmissionGraphOverflow width={`${item.sizeData.overflow_width}%`} />
                                    </Row>
                                </Col>
                                <Col lg="3">
                                    <Row xs={3} className="justify-content-center h-100 py-1 py-lg-0">
                                        {(item.sizeData.eng.circleFill != 0) && (
                                            <Col className={styles.submissions_circle_wrapper}>
                                                <div className={styles.submissions_circle}>
                                                    <CircleGraph value={item.sizeData.eng.circleFill} type="eng" signups={item.sizeData.eng.total_signup_num} />
                                                </div>
                                            </Col>
                                        )}
                                        {(item.sizeData.design.circleFill != 0) && (
                                            <Col className={styles.submissions_circle_wrapper}>
                                                <div className={styles.submissions_circle}>
                                                    <CircleGraph value={item.sizeData.design.circleFill} type="design" signups={item.sizeData.design.total_signup_num} />
                                                </div>
                                            </Col>
                                        )}
                                        {(item.sizeData.pm.circleFill != 0) && (
                                            <Col className={styles.submissions_circle_wrapper}>
                                                <div className={styles.submissions_circle}>
                                                    <CircleGraph value={item.sizeData.pm.circleFill} type="pm" signups={item.sizeData.pm.total_signup_num} />
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
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