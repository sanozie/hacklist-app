// React
import { useState, useEffect, useContext } from 'react'
// Material UI
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
// Bootstrap
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// Store
import { Submissions } from 'store'

const StartDialog = props => {
    const [signups, setSignups] = useState([])
    const submissionsState = useContext(Submissions.State).state

    const getUsers = async (id) => {
        if (signups.length === 0) {
            const users = Object.keys(submissionsState[id].signups).map(uid => ({ uid }))
            console.log(users)
            const userData = await fetch('/api/user?type=users', {
                method: 'PUT',
                body: JSON.stringify(users)
            })
            setSignups(await userData.json())
        }
    }

    useEffect(() => {
        if (props.hack) {
            getUsers(props.hack.hackId)
        }
    }, [props.hack])

    useEffect(() => {
        console.log(signups)
    }, [signups])

    const handleClose = () => {
        window.open('https://join.slack.com/t/hacklistapp/shared_invite/zt-uhfdw4qs-xfqJej0fOsd7tX86ycmv_g', '_blank')
    }
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-center">
                <Typography variant="h1">{ `Start ${props.hack?.title}`}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="text-center">
                    Wohoo! You've got your signups! <br /> Add these people to a Slack group and explain your idea.
                </DialogContentText>
                <Row className="justify-content-center">
                    <Col xs={6}>
                        { signups.map(user => (
                            <Row className="py-1">
                                <Col>
                                    <h3>{ user.displayName }</h3>
                                    <p>{ user.email }</p>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </DialogContent>
            <DialogActions className="justify-content-center">
                <Button onClick={handleClose} variant="outline-light" color="primary">
                    JOIN SLACK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StartDialog