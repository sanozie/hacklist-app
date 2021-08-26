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
// Store
import { Submissions } from 'store'

const StartDialog = props => {
    const [signups, setSignups] = useState([])
    const submissionsState = useContext(Submissions.State).state

    const getUsers = async (id) => {
        const users = Object.keys(submissionsState[id].signups).map(uid => ({ uid }))
        console.log(users)
        const userData = await fetch('/api/user?type=users', {
            method: 'PUT',
            body: JSON.stringify(users)
        })
        setSignups(await userData.json())
    }

    useEffect(() => {
        if (props.hack) {
            getUsers(props.hack.hackId)
        }
    }, [props.hack])

    useEffect(() => {
        console.log(signups)
    }, [signups])

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
                { signups.map(user => (
                    <p>{ user.displayName }</p>
                ))}
            </DialogContent>
            <DialogActions className="justify-content-center">
                <Button onClick={props.handleClose} variant="outline-light" color="primary">
                    JOIN SLACK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StartDialog