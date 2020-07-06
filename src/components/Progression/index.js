import styles from './Progression.module.scss'
import LinearProgress from '@material-ui/core/LinearProgress';

let Progression = () => {
    const progressionStyles = {
        root: styles.lin_progress_root,
        bar1Indeterminate: styles.lin_progress_bar1,
        bar2Indeterminate: styles.lin_progress_bar2
    }

    return (
        <LinearProgress classes={progressionStyles} />
    )
    
}

export default Progression