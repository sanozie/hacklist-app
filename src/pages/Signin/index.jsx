//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from '../../components/Layout'
import styles from './Signin.module.scss'

let something = () => {
    window.open('https://diyhacks---stage.firebaseapp.com/popup.html', 'name', 'height=585,width=400');
}

let Signin = () => {
    return (
        <Layout title="Signin | DIYHacks" nav={false}>
            <Container>
                <Row className="poster">
                    <Col sm className={styles.left_design}></Col>
                    <Col sm className={`${styles.right_design} h-100 center-vert`}>
                        <Row className="w-100">
                            <Col>
                                <Row className="justify-content-center py-2">
                                    <h1 id={styles.logo}>DIYHACKS</h1>
                                </Row>
                                <Row className="justify-content-center py-2">
                                    <img src='/signin/linkedinsignin.png' alt="LinkedIn Signin" className="hoverable" onClick={something}/>
                                </Row>
                                <Row className="justify-content-center py-1">
                                    <p className={styles.copy}>Why do we use LinkedIn?</p>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>      
            </Container>
        </Layout>
    )

}

export default Signin