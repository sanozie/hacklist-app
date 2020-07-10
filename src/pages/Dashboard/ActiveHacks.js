import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Dashboard.module.scss";

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
    let calendarData = [...activeCalendarData]

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
                {(data.active.length == 0) && (
                    <Row className="center flex-grow-1">
                        <p className={styles.new_info}>Once you are a part of an active hack, it's information will show up here!</p>
                    </Row>
                )}
                {(data.active.length > 0) && (
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
                {(data.active.length == 0) && (
                    <Row className="center flex-grow-1">
                        <p className={styles.new_info}>Once you've completed a hack, it will be viewable here!</p>
                    </Row>
                )}
                {(data.past.length > 0) && (
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

export default ActiveHacks