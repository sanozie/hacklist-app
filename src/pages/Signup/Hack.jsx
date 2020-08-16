// Local
import styles from './Signup.module.scss'

//Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

let Hack = props => {
    return(
        <Col>
            <Row>
                <Col>
                    <Row>
                        <h2>{props.title}</h2>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default Hack