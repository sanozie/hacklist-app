import styles from './Progression.module.scss'
import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: '70vw',
        height: '2px',
    },
}));

let Progression = () => {
    const progressionStyles = {
        root: styles.lin_progress_root,
        bar1Indeterminate: styles.lin_progress_bar1,
        bar2Indeterminate: styles.lin_progress_bar2
    }

    return <LinearProgress classes={progressionStyles} />
    
}
let MainProgression = props => {
    const classes = useStyles();
    return (
        <div className="poster center">
            <div className={classes.root}>
                <p className="text-center mb-2">{props.message}</p>
                <Progression />
            </div>
        </div>
    )
}

export { Progression, MainProgression }