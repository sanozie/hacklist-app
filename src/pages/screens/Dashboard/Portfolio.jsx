// Boostrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Styles
import styles from './Dashboard.module.scss'
// react-calendar (with custom styles on Github).
import Calendar from 'react-calendar'

/**
 * Information on current and past hacks of user.
 * @param {*} data
 */
const Portfolio = ({ data }) => {
    const activeHackValues = Object.values(data.actives)
    const activeHackCount = activeHackValues.length
    const archivedHackValues = Object.values(data.archive)
    const archivedHackLength = archivedHackValues.length

    const activeCalendarData = activeHackValues.map(item => {
        return new Date(item.date)
    })

    const archiveCalendarData = archivedHackValues.map(item => {
        return new Date(item.date)
    })

    // eventualy use the difference between active and past calendar data
    // to have different styling
    // but for now, dump them together. Watch to make sure sort is working
    const calendarData = [...activeCalendarData]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return (
        <Row className="py-4 position-relative">
            <Col lg="4" className="d-flex flex-column text-center">
                <Row className="justify-content-center">
                    {(activeHackCount === 0) && (
                        <h3>No Scheduled Hacks</h3>
                    )}
                    {(activeHackCount === 1) && (
                        <h3>1 Scheduled Hack</h3>
                    )}
                    {(activeHackCount > 1) && (
                        <h3>{data.actives.length} Scheduled Hacks</h3>
                    )}
                </Row>
                {(activeHackCount === 0) && (
                    <Row className="center flex-grow-1">
                        <p className={styles.new_info}>Once you are a part of an active hack, it's information will show up here!</p>
                    </Row>
                )}
                {(activeHackCount > 0) && (
                    <Row className="my-3">
                        <Col xs="12">
                            {activeHackValues.map(item => {
                                const newDate = new Date(item.date)
                                const monthNum = newDate.getMonth();
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
                <Calendar value={calendarData[0]}
                          nextLabel={null} next2Label={null}
                          prevLabel={null} prev2Label={null} />
            </Col>
            <Col lg="4">
                <Row className="center">
                    {(archivedHackLength === 0) && (
                        <h3>No Past Hacks</h3>
                    )}
                    {(archivedHackLength === 1) && (
                        <h3>1 Past Hack</h3>
                    )}
                    {(archivedHackLength > 1) && (
                        <h3>{archivedHackLength} Past Hacks</h3>
                    )}
                </Row>
                {(archivedHackLength == 0) && (
                    <Row className="center flex-grow-1">
                        <p className={styles.new_info}>Once you've started a hack, it will be viewable here!</p>
                    </Row>
                )}
                {(archivedHackLength > 0) && (
                    <Row className="my-3">
                        <Col xs="12">
                            {archivedHackValues.map(item => {
                                const newDate = new Date(item.date)
                                const monthNum = newDate.getMonth();
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

export default Portfolio