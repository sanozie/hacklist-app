// Local
import styles from './Signup.module.scss'
import dateFormatter from "../../utils/dateformatter";

//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {SubmissionCircleRow, SubmissionGraphRow} from "../../components/SubmissionGraphs";



let Hack = props => {
    return (
        <Col md={4}>
            <Row>
                <h2>{props.title}</h2>
            </Row>
            <Row>
                <h3>{props.industry}</h3>
            </Row>
            <Row>
                <Col xs={8}>
                    <SubmissionGraphRow sizeData={props.sizeData} />
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
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
            <Row>
                <Button variant="outline-light">SIGNUP</Button>
            </Row>
        </Col>
    )
}

export default Hack