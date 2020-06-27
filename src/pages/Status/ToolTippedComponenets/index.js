import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './index.module.scss'

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

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
                <React.Fragment>
                    <b>{title}</b>{` ${props.signups}`}
                </React.Fragment>
            }
            placement="top"
        >
            <div className={classes} style={{ width: props.width }}></div>
        </HtmlTooltip>
    )
}

const SubmissionGraphOverflow = (props) => {
    return (
        <div className={styles.submissions_graph_overflow} style={{ width: props.width }}></div>
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

export { SubmissionGraph, SubmissionGraphOverflow, CircleGraph }