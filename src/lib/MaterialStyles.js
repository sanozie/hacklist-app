import {makeStyles, withStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesInput = makeStyles({
    root: {
        minWidth: 200,
        boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
        transition: "0.3s ease-in-out",
        "& .MuiOutlinedInput-input": {
            color: "rgba(255,255,255,0.4)",
            transition: "0.3s ease-in-out",
        },
        "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.4)",
            transition: "0.3s ease-in-out",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.4)",
            transition: "0.3s ease-in-out",
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "rgba(255,255,255,0.5)"
        },
        "&:hover .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.5)"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.5)"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#9D67E3"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#9D67E3"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9D67E3"
        }
    }
});


const useStyleSliderEng = makeStyles({
    root: {
        color: "#9D67E3"
    }
}), useStyleSliderDesign = makeStyles({
    root: {
        color: "#50E3C1"
    }
}), useStyleSliderPM = makeStyles({
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


let MaterialStyles = () => {
    const classesInput = useStylesInput();
    const classesSliderEng = useStyleSliderEng();
    const classesSliderDesign = useStyleSliderDesign();
    const classesSliderPM = useStyleSliderPM();
    const classesPopup = usePopupStyles();
    const classesDialogText = useDialogueText();


    return { classesInput, classesSliderEng, classesSliderDesign, classesSliderPM, classesPopup, classesDialogText }
}


export { MaterialStyles, EngChip, DesignChip, PMChip, Tag, HtmlTooltip }