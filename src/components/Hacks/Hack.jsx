// Utils
import dateFormatter from 'utils/data/dateformatter';

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Components
import { SubmissionCircleRow, SubmissionGraphRow } from 'components/SubmissionGraphs';
import Badge from 'components/Badge'


let Hack = props => {
    return (
        <Row className="status-wrapper">
            <Col md={12} className="m-3">
                <Row>
                    <h2>{props.title}</h2>
                    <h3 className="align-items-end">{props.industry}</h3>
                </Row>
                <Row className="d-flex">
                    <Col lg="8" className="justify-content-start"><h5 className="d-flex">Minimums</h5></Col>
                    <Col lg="4"><h5>Maximums</h5></Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <SubmissionGraphRow sizeData={props.sizeData} />
                    </Col>
                    <Col xs={4}>
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