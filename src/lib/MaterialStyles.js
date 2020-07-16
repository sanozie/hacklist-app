import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        transition: '0.2s ease-in-out',
        "& .slider-label": {
            color: "rgba(255,255,255,0.5)"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

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

let MaterialStyles = () => {
    const classesInput = useStylesInput();
    const classesSliderEng = useStyleSliderEng();
    const classesSliderDesign = useStyleSliderDesign();
    const classesSliderPM = useStyleSliderPM();
    const classesPopup = usePopupStyles();
    const classesDialogText = useDialogueText();
    return { classesInput, classesSliderEng, classesSliderDesign, classesSliderPM, classesPopup, classesDialogText }
}


export { MaterialStyles }