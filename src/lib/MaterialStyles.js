import { makeStyles, withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import MuiSlider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

// Make Styles
const useFormControl = makeStyles(() => ({
    root: {
        flexWrap: 'wrap',
        minWidth: '200px !important',
        margin: '0.5rem !important',
        color: 'white',
    }
}))

const useStylesInput = makeStyles(() => ({
    root: {
        minWidth: 200,
        maxHeight: 50,
        boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
    }
}))

const usePopupStyles = makeStyles(() => ({
    paper: {
        backgroundColor: '#2b2b2b',
        color: 'white',
        minWidth: 200
    }
}))

const useDialogueText = makeStyles({
    root: {
        color: 'white'
    }
})

// With Styles
const Slider = withStyles(theme => ({
    root: props =>
        props.color === "tertiary"
            ? {
                color: theme.palette.tertiary.main,
            }
            : {}
}))(MuiSlider)

const EngChip = withStyles(theme => ({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        '&:hover, $deletable&:hover': {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: `${theme.palette.primary.main} !important`,
        border: `1px solid ${theme.palette.primary.main} !important`,
    },
    outlinedSecondary: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.base.main} !important`,
        border: 'none'
    }
}))(Chip)

const DesignChip = withStyles(theme => ({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        '&:hover, $deletable&:hover': {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: `${theme.palette.secondary.main} !important`,
        border: `1px solid ${theme.palette.secondary.main} !important`,
    },
    outlinedSecondary: {
        backgroundColor: `${theme.palette.secondary.main} !important`,
        color: `${theme.palette.base.main} !important`,
        border: 'none'
    }
}))(Chip)

const PMChip = withStyles(theme => ({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        '&:hover, $deletable&:hover': {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: `${theme.palette.tertiary.main} !important`,
        border: `1px solid ${theme.palette.tertiary.main} !important`,
    },
    outlinedSecondary: {
        backgroundColor: `${theme.palette.tertiary.main} !important`,
        color: `${theme.palette.base.main} !important`,
        border: 'none'
    }
}))(Chip)

const Tag = withStyles({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.3rem',
    },
    deletable: {
        '&:hover, $deletable&:hover': {
            opacity: 0.9
        }
    },
    deleteIconSmall: {
        fill: 'rgba(255,255,255,0.5)'
    }
})(Chip)

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip)

const MaterialStyles = () => {
    const classesFormControl = useFormControl();
    const classesInput = useStylesInput();
    const classesPopup = usePopupStyles();
    const classesDialogText = useDialogueText();

    return { classesFormControl, classesInput, classesPopup, classesDialogText }
}

export { MaterialStyles, EngChip, DesignChip, PMChip, Slider, Tag, HtmlTooltip }