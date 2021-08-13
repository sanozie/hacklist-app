import styles from './Dashboard.module.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CircleGraph } from 'components/Graphs'

/**
 * Graph and info for signups
 * @param {*} data
 */
let Signups = ({ data }) => {
    let signupValues = Object.values(data)
    let signupCount = signupValues.length

    let signupCircle = {
        circle: styles.signup_circle,
        root: styles.circle_root
    }


    return (
        <Row className="py-4">
            <Col md="6" className="d-none d-md-flex">
                {(signupCount == 0) && (
                    <img src='/dashboard/signup-0.png' className="img-fluid" />
                )}
                {(signupCount > 0) && (
                    <img src={`/dashboard/signup-${signupCount}.png`} className="img-fluid" />
                )}
            </Col>
            <Col xs="12" md="6" className="center-vert h-100" style={{ padding: 0 }}>
                <div className="center-vert-env">
                    {(signupCount == 0) && (
                        <p className={styles.new_info}>Hacks you sign up for will be here. <br /> You can sign up for 3 hacks at once.</p>
                    )}
                    {(signupCount > 0) && signupValues.map(hack => {
                        return (
                            <Row key={hack.title}>
                                <Col xs="10" style={{ padding: 0 }}>
                                    <Row>
                                        <h4>{hack.title}</h4>
                                    </Row>
                                    <Row>
                                        <p className={styles.submitter_name}>{hack.submitter_name}</p>
                                    </Row>
                                </Col>
                                <Col xs="2" style={{ padding: 0 }}>
                                    <CircleGraph value={hack.circle} type="signup" signups={Object.keys(hack.signups).length} />
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            </Col>
        </Row>
    )
}

export default Signups