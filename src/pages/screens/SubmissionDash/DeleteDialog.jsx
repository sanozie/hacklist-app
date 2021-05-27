import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from 'react-bootstrap/Button'
import Dialog from '@material-ui/core/Dialog'

const DeleteDialog = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{ `Delete the ${props.confirmHack} hack?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can't undo this action.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} variant="outline-lignt" color="primary">
                    CANCEL
                </Button>
                <Button onClick={props.handleSubmit} variant="danger" color="primary" autoFocus>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog