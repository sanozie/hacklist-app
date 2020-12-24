import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//Material UI
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
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

const placement = {
    br: {
        badge: 'badge_place_bottom_right',
        tooltip: 'top'
    },
    tr: {
        badge: 'badge_place_top_right',
        tooltip: 'bottom'
    }
}

let Badge = props => {
    const router = useRouter()
    let [display, setDisplay] = useState('none')
    let [opacity, setOpacity] = useState(0)

    useEffect(() => {
        if (props.display === false) {
            setOpacity(0)
            setTimeout(() =>
                setDisplay('none'), 300
            )
        } else {
            setDisplay('block')
            setTimeout(() =>
                setOpacity(1), 10
            )
        }
    })

    //Add tooltips to each
    const iconStyle = useIconStyle();

    let icon;
    switch(props.type) {
        case 'add':
            icon = <AddIcon className={[iconStyle.root].join(' ')} />
            break;
        case 'edit':
            icon = <EditIcon className={[iconStyle.root].join(' ')} />
            break;
    }

    return (
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <b>{props.title}</b>
                    </React.Fragment>
                }
                placement={placement[props.placement].tooltip}
            >
                <span className={[styles.badge, styles[placement[props.placement].badge], styles[`badge_${props.type}`]].join(' ')}
                      style={{ display, opacity }} onClick={() => {router.push('/[screen]', props.link)}}>
                    {icon}
                </span>
            </HtmlTooltip>

    )
}

export default Badge