import { useState, useEffect } from 'react'
import Router from 'next/router'
//Material UI
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';

//Local
import styles from './Badge.module.scss'

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const useIconStyle = makeStyles({
    root: {
        fill: "#2b2b2b"
    }
})

let AddBadge = props => {
    let [display, setDisplay] = useState('none')
    let [opacity, setOpacity] = useState(0)

    useEffect(() => {
        if (props.display === false) {
            setOpacity(0)
            setTimeout(() =>
                setDisplay('none'), 300 // something very short
            )
        } else {
            setDisplay('block')
            setTimeout(() =>
                setOpacity(1), 10 // something very short
            )
        }
    })


    //Add tooltips to each
    const iconStyle = useIconStyle();
    return (
        <span className={styles.badge} style={{ display, opacity }} onClick={() => {
            Router.push({
                pathname: props.link
            })
        }}>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <b>{props.title}</b>
                    </React.Fragment>
                }
                placement="top"
            >

                <AddIcon className={iconStyle.root} />
            </HtmlTooltip>
        </span>
    )
}

export { AddBadge }