import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Local
import Layout from 'components/Layout'
import styles from './Submission.module.scss'
import SubmissionForm from 'components/Forms/SubmissionForm'

let explainer = {
    default: {
        title: "Submitting Hacks",
        desc: "DIYHacks will never steal your idea ( because you don't have to tell us what it is )!"
    },
    industry: {
        title: "Industry",
        desc: "This helps us match hackers with hacks that they'll be interested in!"
    },
    contribution: {
        title: "Contribution",
        desc: "Will you be contributing techncally? If so, put your role! If not, you may leave this blank."
    },
    title: {
        title: "Title",
        desc: "If you want, you can set a name for your hack. If not, you may leave this blank. We'll generate one for you."
    },
    eng: {
        title: "Engineers",
        desc: "Please select the min and max number of engineers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    },
    design: {
        title: "Designers",
        desc: "Please select the min and max number of designers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    },
    pm: {
        title: "Product Managers",
        desc: "Please select the min and max number of Pproduct managers you'd like to sign up to your hack! (Keep in mind that you'll have to talk to those that sign up!)"
    }
}

let AddSubmission = () => {
    let [title, setTitle] = useState('')
    let [desc, setDesc] = useState('')
    let [focus, setFocus] = useState('default')

    useEffect(() => {
        localStorage.setItem('lastVisited', 'AddSubmission')
    }, [])

    useEffect(() => {
        setTitle(explainer[focus].title)
        setDesc(explainer[focus].desc)
    }, [focus])

    return (
        <Layout title="Submission | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col className="py-5 my-5">
                        <Row>
                            <SubmissionForm focusListener={field => setFocus(field)} usage='add' />,
                            <Col>
                                <Row className={styles.desc_wrapper}>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <h2>{title}</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>{desc}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AddSubmission