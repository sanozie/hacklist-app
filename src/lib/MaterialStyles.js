import {makeStyles, withStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const useFormControl = makeStyles(theme => ({
    root: {
        flexWrap: "wrap",
        minWidth: "200px !important",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        transition: '0.2s ease-in-out',
        "& .slider-label": {
            color: "rgba(255,255,255,0.5)"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const useStylesInput = makeStyles(() => ({
    root: {
        minWidth: 200,
        boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
    }
}));


const useStyleSliderEng = makeStyles(theme => ({
    root: {
        color: theme.primary
    }
})), useStyleSliderDesign = makeStyles(theme => ({
    root: {
        color: theme.secondary
    }
})), useStyleSliderPM = makeStyles({
    root: {
        color: "#FFE600"
    }
})

const usePopupStyles = makeStyles(() => ({
    paper: {
        backgroundColor: "#2b2b2b",
        color: 'white',
        minWidth: 200
    }
})), useDialogueText = makeStyles({
    root: {
        color: "white"
    }
})

const EngChip = withStyles({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        "&:hover, $deletable&:hover": {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: '#9D67E3 !important',
        border: '1px solid #9D67E3 !important',
    },
    outlinedSecondary: {
        backgroundColor: '#9D67E3 !important',
        color: '#2b2b2b !important',
        border: 'none'
    }
})(Chip);

const DesignChip = withStyles({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        "&:hover, $deletable&:hover": {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: '#50E3C1 !important',
        border: '1px solid #50E3C1 !important',
    },
    outlinedSecondary: {
        backgroundColor: '#50E3C1 !important',
        color: '#2b2b2b !important',
        border: 'none'
    }
})(Chip);

const PMChip = withStyles({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.5rem'
    },
    clickable: {
        "&:hover, $deletable&:hover": {
            opacity: 0.9
        }
    },
    outlinedPrimary: {
        color: '#FFE600',
        border: '1px solid #FFE600',
    },
    outlinedSecondary: {
        backgroundColor: '#FFE600 !important',
        color: '#2b2b2b !important',
        border: 'none'
    }
})(Chip)

const Tag = withStyles({
    root: {
        transition: '0.2s ease-in-out',
        margin: '0.3rem',
    },
    deletable: {
        "&:hover, $deletable&:hover": {
            opacity: 0.9
        }
    },
    deleteIconSmall: {
        fill: 'rgba(255,255,255,0.5)'
    }
})(Chip);

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

// TODO: Potentially make this a functional class
let MaterialStyles = () => {
    const classesFormControl = useFormControl();
    const classesInput = useStylesInput();
    const classesSliderEng = useStyleSliderEng();
    const classesSliderDesign = useStyleSliderDesign();
    const classesSliderPM = useStyleSliderPM();
    const classesPopup = usePopupStyles();
    const classesDialogText = useDialogueText();


    return { classesFormControl, classesInput, classesSliderEng, classesSliderDesign, classesSliderPM, classesPopup, classesDialogText }
}


export { MaterialStyles, EngChip, DesignChip, PMChip, Tag, HtmlTooltip }