// React
import { useState, useEffect } from 'react'
// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Styles
import styles from './Submission.module.scss'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
// Components
import Layout from 'components/Layout'
import SubmissionForm from 'components/Forms/SubmissionForm'
// Utils
import back from 'utils/route/back'

let explainer = {
    default: {
        title: "Submitting Hacks",
        desc: "Hacklist will never steal your idea ( because you don't have to tell us what it is )! \nDefine how many people you want to sign up to your hack here."
    },
    industry: {
        title: "Industry",
        desc: "This helps us match hackers with hacks that they'll be interested in!"
    },
    contribution: {
        title: "Contribution",
        desc: "You'll be counted as a hacker for this project, and this is the skill you'll be bringing to the table."
    },
    title: {
        title: "Title",
        desc: "If you want, you can set a name for your hack. If not, you may leave this blank. We'll generate one for you."
    },
    eng: {
        title: "Engineers",
        desc: "Please select the min (leftmost point) and max number (rightmost point) of engineers you'd like to sign up to your hack!"
    },
    design: {
        title: "Designers",
        desc: "Please select the min (leftmost point) and max number (rightmost point) of designers you'd like to sign up to your hack!"
    },
    pm: {
        title: "Product Managers",
        desc: "Please select the min (leftmost point) and max number (rightmost point) of product managers you'd like to sign up to your hack!"
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
        <Layout title="Submission | Hacklist" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                    <Col sm="1" className="ml-auto center">
                        <p className="back-button" onClick={back}>{'< Back'}</p>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col className="py-5 my-0 my-xl-5">
                        <Row className="flex-column-reverse flex-md-row">
                            <SubmissionForm focusListener={field => setFocus(field)} usage='add' />
                            <Col className="mb-3 mb-md-0">

                                <SwitchTransition mode="out-in">
                                    <CSSTransition
                                        key={focus}
                                        addEndListener={(node, done) => {
                                            node.addEventListener("transitionend", done, false);
                                        }}
                                        classNames="fade"
                                    >
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
                                    </CSSTransition>
                                </SwitchTransition>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/*<Carousel autoplay={false} label='Get started'>*/}
                {/*    <Slide title="hello" />*/}
                {/*    <Slide title="goodbye" />*/}
                {/*</Carousel>*/}
            </Container>
        </Layout>
    )
}

export default AddSubmission