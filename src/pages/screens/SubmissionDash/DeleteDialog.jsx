// Material UI
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
// Bootstrap
import Button from 'react-bootstrap/Button'

const DeleteDialog = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-center">
                <Typography variant="h1">{ `Delete the ${props.hack?.title} hack?`}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="text-center">
                    You can't undo this action.
                </DialogContentText>
            </DialogContent>
            <DialogActions className="justify-content-center">
                <Button onClick={props.handleClose} variant="outline-light" color="primary">
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