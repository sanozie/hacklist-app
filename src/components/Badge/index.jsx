// React & Next
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
//Material UI
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import withStyles from '@material-ui/core/styles/withStyles'
import { makeStyles } from '@material-ui/core/styles'
//Local
import styles from './Badge.module.scss'

const MAX_SIGNUPS = process.env.MAX_SIGNUPS

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

const Badge = props => {
    const router = useRouter()
    const [display, setDisplay] = useState('none')
    const [opacity, setOpacity] = useState(0)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        // Set display animation logic
        if (props.display === false) {
            setOpacity(0)
            setTimeout(() =>
                setDisplay('none'), 300
            )
        } else {
            const opacityLevel = disabled ? 0.5 : 1
            setDisplay('block')
            setTimeout(() =>
                setOpacity(opacityLevel), 10
            )
        }

        // Set disabled logic
        if (props.signupCount >= MAX_SIGNUPS) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    })

    /**
     * Reroute to link provided by props
     */
    const reroute = () => {
        if (!disabled) {
            router.push('/[screen]', props.link)
        }
    }

    //Add tooltips to each
    const iconStyle = useIconStyle()
    let icon
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
                    <>
                        <b>{disabled ? "You're at the max amount of signups" : props.title}</b>
                    </>
                }
                placement={placement[props.placement].tooltip}
            >
                <span className={[styles.badge, styles[placement[props.placement].badge], styles[`badge_${props.type}`]].join(' ')}
                      style={{ display, opacity }} onClick={reroute}>
                    {icon}
                </span>
            </HtmlTooltip>

    )
}

Badge.PropTypes = {
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['br', 'tr']).isRequired,
    type: PropTypes.oneOf(['add', 'edit']).isRequired,
    signupCount: PropTypes.number
}

export default Badge