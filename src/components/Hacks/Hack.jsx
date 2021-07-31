// Utils
import dateFormatter from 'utils/data/dateformatter';

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Components
import { SubmissionCircleRow, SubmissionGraphRow } from 'components/SubmissionGraphs';
import Badge from 'components/Badge'

// Styles
import styles from './Hack.module.scss'


let Hack = props => {
    return (
        <Row className="status-wrapper">
            <Col md={12} className="m-3">
                <Row>
                    <h2>{props.title}</h2>
                    <h3 className={`align-items-end ${styles.industry_label}`}>{props.industry}</h3>
                </Row>
                <Row className="d-none d-sm-flex my-1">
                    <Col lg="8" className="justify-content-start"><h5 className="d-flex">Minimums</h5></Col>
                    <Col lg="4"><h5>Maximums</h5></Col>
                </Row>
                <Row>
                    <Col sm={12} md={8} className="my-1 my-sm-0" >
                        <SubmissionGraphRow sizeData={props.sizeData} />
                    </Col>
                    <Col sm={4} className="d-none d-sm-block">
                        <SubmissionCircleRow sizeData={props.sizeData} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Row>
                            <p>Submitted</p>
                        </Row>
                        <Row>
                            <p>{dateFormatter(props.submit_date)}</p>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Hack