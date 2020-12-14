import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { HtmlTooltip } from 'lib/MaterialStyles'
import styles from './index.module.scss'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const SubmissionGraph = (props) => {
    let classes = `${styles.submissions_graph} ${props.classes}`
    let title = ""
    switch (props.type) {
        case "eng":
            title = "Engineering Signups (Filling Min):"
            break;
        case "design":
            title = "Design Signups (Filling Min):"
            break;
        case "pm":
            title = "Product Management Signups (Filling Min):"
            break;
    }
    return (
        <HtmlTooltip
            title={
                <>
                    <b>{title}</b>{` ${props.signups}`}
                </>
            }
            placement="top"
        >
            <div className={classes} style={{ width: props.width }}></div>
        </HtmlTooltip>
    )
}

const SubmissionGraphOverflow = (props) => {
    return (
        <div className={styles.submissions_graph_overflow} style={{ width: props.width }} />
    )
}

const CircleGraph = (props) => {
    let title = "",
        style = {},
        engCircle = {
            circle: styles.eng_circle,
            root: styles.circle_root,
            svg: styles.circle_svg
        },
        pmCircle = {
            circle: styles.pm_circle,
            root: styles.circle_root,
            svg: styles.circle_svg
        },
        designCircle = {
            circle: styles.design_circle,
            root: styles.circle_root,
            svg: styles.circle_svg
        },
        signupCircle = {
            circle: styles.signup_circle,
            root: styles.circle_root,
            svg: styles.circle_svg
        }

    switch (props.type) {
        case "eng":
            title = "Engineering Signups (Total):"
            style = engCircle
            break;
        case "design":
            title = "Design Signups (Total):"
            style = designCircle
            break;
        case "pm":
            title = "Product Management Signups (Total):"
            style = pmCircle
            break;
        case "signup":
            title = "Signups:"
            style = signupCircle
    }

    // TODO: Create a backdrop circle component that goes behind colored one.

    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <b>{title}</b>{` ${props.signups}`}
                </React.Fragment>
            }
            placement="top"
        >
            <CircularProgress variant="static" value={props.value} classes={style} />
        </HtmlTooltip>
    )
}

const SubmissionGraphRow = ({sizeData}) => {
    return (
        <Row className={`flex-grow-1 ${styles.submissions_graph_wrapper} position-relative`}>
            <SubmissionGraph classes={styles.eng_graph} width={`${sizeData.eng.width}%`} type="eng" signups={sizeData.eng.min_signup_num} />
            <SubmissionGraph classes={styles.design_graph} width={`${sizeData.design.width}%`} type="design" signups={sizeData.design.min_signup_num} />
            <SubmissionGraph classes={styles.pm_graph} width={`${sizeData.pm.width}%`} type="pm" signups={sizeData.pm.min_signup_num} />
            <SubmissionGraphOverflow width={`${sizeData.overflow_width}%`} />
        </Row>
    )
}

const SubmissionCircleRow = ({sizeData}) => {
    return (
        <Row xs={3} className="justify-content-center h-100 py-1 py-lg-0">
            {(sizeData.eng.circleFill !== 0) && (
                <Col className={styles.submissions_circle_wrapper}>
                    <div className={styles.submissions_circle}>
                        <CircleGraph value={sizeData.eng.circleFill} type="eng" signups={sizeData.eng.total_signup_num} />
                    </div>
                </Col>
            )}
            {(sizeData.design.circleFill !== 0) && (
                <Col className={styles.submissions_circle_wrapper}>
                    <div className={styles.submissions_circle}>
                        <CircleGraph value={sizeData.design.circleFill} type="design" signups={sizeData.design.total_signup_num} />
                    </div>
                </Col>
            )}
            {(sizeData.pm.circleFill !== 0) && (
                <Col className={styles.submissions_circle_wrapper}>
                    <div className={styles.submissions_circle}>
                        <CircleGraph value={sizeData.pm.circleFill} type="pm" signups={sizeData.pm.total_signup_num} />
                    </div>
                </Col>
            )}
        </Row>
    )
}

export { SubmissionGraphRow, SubmissionCircleRow, CircleGraph }