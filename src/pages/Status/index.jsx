
import { useState, useEffect } from 'react'
import withAuth from '../helpers/withAuth';
//swr (data-loading module)
import useSWR from 'swr'
//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//Material UI
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//react-calendar (has custom styles on github)
//import Calendar from 'react-calendar'
//Utils
import fetcher from '../../utils/fetcher'
//local
import Layout from '../../components/Layout'
import styles from './Status.module.scss'
import { SubmissionGraph, SubmissionGraphOverflow, CircleGraph } from './ToolTippedComponents'

let swrConfig = {
    revalidateOnFocus: false
}
/**
 * Graph that shows Hack Submission data
 * @param {*} data 
 */
let Submissions = ({ data }) => {
    return (
        <Row className="py-2 w-100">
            <Col xs="2" className="position-relative">
                {!data.length && (
                    <div className={styles.strong_number}>0</div>
                )}
                {data.length && (
                    <div className={styles.strong_number}>{data.length}</div>
                )}
            </Col>
            <Col xs="10" className="align-items-center my-auto align-items-center">
                {!data.length && (
                    <p className={styles.new_info}>Data on hacks you submit will be here. <br /> You can submit up to hacks at once.</p>
                )}
                {data.length && (
                    <Row className="justify-content-end mt-n4 pb-2 d-none d-lg-flex">
                        <Col lg="7"><h5>Minimums</h5></Col>
                        <Col lg="3"><h5>Maximums</h5></Col>
                    </Row>
                )}
                {data.length && data.map(item => {
                    return (
                        <Row className="py-1">
                            <Col lg="2" className="d-flex align-items-center">

                                <h4 className="submitted_hack_title flex-grow-1">
                                    {item.title}
                                </h4>

                            </Col>
                            <Col lg="7" className=" align-items-center py-1">
                                <Row className={`flex-grow-1 ${styles.submissions_graph_wrapper} position-relative`}>
                                    <SubmissionGraph classes={styles.eng_graph} width={`${item.sizeData.eng.width}%`} type="eng" signups={item.sizeData.eng.min_signup_num} />
                                    <SubmissionGraph classes={styles.design_graph} width={`${item.sizeData.design.width}%`} type="design" signups={item.sizeData.design.min_signup_num} />
                                    <SubmissionGraph classes={styles.pm_graph} width={`${item.sizeData.pm.width}%`} type="pm" signups={item.sizeData.pm.min_signup_num} />
                                    <SubmissionGraphOverflow width={`${item.sizeData.overflow_width}%`} />
                                </Row>
                            </Col>
                            <Col lg="3">
                                <Row xs={3} className="justify-content-center h-100 py-1 py-lg-0">
                                    {(item.sizeData.eng.circleFill != 0) && (
                                        <Col className={styles.submissions_circle_wrapper}>
                                            <div className={styles.submissions_circle}>
                                                <CircleGraph value={item.sizeData.eng.circleFill} type="eng" signups={item.sizeData.eng.total_signup_num} />
                                            </div>
                                        </Col>
                                    )}
                                    {(item.sizeData.design.circleFill != 0) && (
                                        <Col className={styles.submissions_circle_wrapper}>
                                            <div className={styles.submissions_circle}>
                                                <CircleGraph value={item.sizeData.design.circleFill} type="design" signups={item.sizeData.design.total_signup_num} />
                                            </div>
                                        </Col>
                                    )}
                                    {(item.sizeData.pm.circleFill != 0) && (
                                        <Col className={styles.submissions_circle_wrapper}>
                                            <div className={styles.submissions_circle}>
                                                <CircleGraph value={item.sizeData.pm.circleFill} type="pm" signups={item.sizeData.pm.total_signup_num} />
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    )
                }
                )}
            </Col>
        </Row>

    )
}

/**
 * Information on current and past hacks of user.
 * @param {*} data 
 */
let ActiveHacks = ({ data }) => {
    let activeCalendarData = data.active.map(item => {
        return new Date(item.date)
    })

    let pastCalendarData = data.past.map(item => {
        return new Date(item.date)
    })


    // eventualy use the difference between active and past calendar data
    // to have different styling
    // but for now, dump them together
    let calendarData = [...activeCalendarData, ...pastCalendarData]

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return (
        <Row className="py-4">
            <Col lg="4" className="d-flex flex-column text-center">
                <Row className="justify-content-center">
                    {(data.active.length == 0) && (
                        <h3>No Scheduled Hacks</h3>
                    )}
                    {(data.active.length == 1) && (
                        <h3>1 Scheduled Hack</h3>
                    )}
                    {(data.active.length > 1) && (
                        <h3>{data.active.length} Scheduled Hacks</h3>
                    )}
                </Row>
                {!data.active.length && (
                    <Row className="center flex-grow-1">
                        <p className={styles.new_info}>Once you are a part of an active hack, it's information will show up here!</p>
                    </Row>
                )}
                {data.active.length && (
                    <Row className="my-3">
                        <Col xs="12">
                            {data.active.map(item => {
                                let newDate = new Date(item.date)
                                let monthNum = newDate.getMonth();
                                return (
                                    <Row>
                                        <Col xs="12">
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <h4>{item.title}</h4>
                                            </Row>
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <p className={styles.submitter_name}>Organizer: {item.submitter_name}</p>
                                            </Row>
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <p>Date: <span className={styles.date}>{`${months[monthNum]} ${newDate.getDate()}`}</span></p>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                )}

            </Col>
            <Col lg="4" className="center">
                {/*<Calendar className={styles.diyhacks_calendar} tileClassName={styles.diyhacks_calendar_tiles} defaultValue={calendarData} nextLabel={null} next2Label={null} prevLabel={null} prev2Label={null} />*/}
            </Col>
            <Col lg="4">
                <Row className="center">
                    {(data.past.length == 0) && (
                        <h3>No Past Hacks</h3>
                    )}
                    {(data.past.length == 1) && (
                        <h3>1 Past Hack</h3>
                    )}
                    {(data.past.length > 1) && (
                        <h3>{data.past.length} Past Hacks</h3>
                    )}
                </Row>
                {data.past.length && (
                    <Row className="my-3">
                        <Col xs="12">
                            {data.past.map(item => {
                                let newDate = new Date(item.date)
                                let monthNum = newDate.getMonth();
                                return (
                                    <Row>
                                        <Col xs="12">
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <h4>{item.title}</h4>
                                            </Row>
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <p>Organizer: {item.submitter_name}</p>
                                            </Row>
                                            <Row className="justify-content-lg-start justify-content-center">
                                                <p>Date: <span className={styles.date}>{`${months[monthNum]} ${newDate.getDate()}`}</span></p>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    )

}

/**
 * Graph and info for signups
 * @param {*} data 
 */
let Signups = ({ data }) => {

    let signupCircle = {
        circle: styles.signup_circle,
        root: styles.circle_root
    }
    return (
        <Row className="py-4">
            <Col xs="6">
                {!data.length && (
                    <img src={`/status/signup-0.png`} className="img-fluid" />
                )}
                {data.length && (
                    <img src={`/status/signup-${data.length}.png`} className="img-fluid" />
                )}
            </Col>
            <Col xs="6" className="center-vert h-100" style={{ padding: 0 }}>
                <div className="center-vert-env">
                    {!data.length && (
                        <p className={styles.new_info}>Hacks you sign up for will be here. <br /> You can sign up for 3 hacks at once.</p>
                    )}
                    {data.length && data.map(hack => {
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


let Overlay = () => {
    let [overlay, setOverlay] = useState(false);
    const addbtn = {
        root: styles.add_btn_root
    }, closebtn = {
        root: styles.close_btn_root
    }

    let display = overlay ? "block" : "none"
    let opacity = overlay ? 1 : 0
    let overlayStyle = {
        display,
        opacity,
        transition: "0.3s ease-in-out"
    }

    useEffect(() => {
        display = overlay ? "block" : "none"
        opacity = overlay ? 1 : 0
        overlayStyle = {
            display,
            opacity,
            transition: "0.3s ease-in-out"
        }
        console.log(overlay)
    }, [overlay])
    return (
        <>
            <div id={styles.overlay} className="poster-fixed center " style={overlayStyle}>
                <Container className="h-100 center">
                    <div className="center-env">
                        <Row className="h-xs-100 h-md-25">
                            <Col md="6" className="h-xs-25 h-md-100 my-2">
                                <Row className="h-100">
                                    <Col xs="12" className={`text-center ${styles.overlay_option} ${styles.new_hack}`}>
                                        <h1>Submit a Hack</h1>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6" className="h-xs-25 h-100 my-2">
                                <Row className="h-md-100">
                                    <Col xs="12" className={`text-center ${styles.overlay_option} ${styles.signup_hack}`}>
                                        <h1>Sign up for a Hack</h1>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Fab aria-label="close" classes={closebtn} onClick={() => setOverlay(false)}>
                                <CloseIcon style={{ color: "white" }}/>
                            </Fab>
                        </Row>
                    </div>

                </Container>
            </div>
            <div id={styles.blackspace} className="poster-fixed center" style={overlayStyle} onClick={() => setOverlay(false)}>
            </div>
            <Fab aria-label="add" classes={addbtn} onClick={() => setOverlay(true)}>
                <AddIcon style={{ color: "white" }} />
            </Fab>
        </>
    )
}

let Status = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '70vw',
            height: '2px',
        },
    }));
    const progressionStyles = {
        root: styles.lin_progress_root,
        bar1Indeterminate: styles.lin_progress_bar1,
        bar2Indeterminate: styles.lin_progress_bar2
    }

    const classes = useStyles();
    const { data, error } = useSWR('/api/user', fetcher, swrConfig)
    if (error) return <div>failed to load</div>
    if (!data) return <div className="poster center"><div className={classes.root}><LinearProgress classes={progressionStyles} /></div></div>
    return (
        <Layout title="Status | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="my-5 pt-5 pb-3">
                    <Col className="text-center">
                        <h1>YOUR STATS</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" className={styles.status_env}>
                        <Row className={styles.status_wrapper}>
                            <Col className="d-flex flex-column">
                                <Row>
                                    <h2>Hack Submissions</h2>
                                </Row>
                                <Row className="flex-grow-1">
                                    <Col xs="12" className="center-vert">
                                        <div className="center-vert-env w-100">
                                            <Submissions data={data.submissions} className={styles.status_component_wraper} />
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Col>
                    <Col md="4" className={styles.status_env}>
                        <Row className={styles.status_wrapper}>
                            <Col>
                                <Row>
                                    <h2>Signups</h2>
                                </Row>
                                <Signups data={data.signups} />
                            </Col>
                        </Row>

                    </Col>
                    <Col md="12" className={styles.status_env}>
                        <Row className={styles.status_wrapper}>
                            <Col>
                                <Row>
                                    <h2>Active Hacks</h2>
                                </Row>
                                <ActiveHacks data={data.activeHacks} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Overlay />
        </Layout>
    )
}

export default withAuth(Status);