// Components
import SubmissionForm from 'components/Forms/SubmissionForm'
// Material UI
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

const EditDialog = props => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h1" className="text-center">{ `Editing ${props.hack?.title}`}</Typography>
            </DialogTitle>
            <DialogContent>
                <SubmissionForm hack={props.hack} usage='update' finished={props.finished} handleFinish={props.handleSubmit}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog