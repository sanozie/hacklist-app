import { useState, useEffect, useDebugValue } from 'react'

let useDialog = () => {
    const [open, setOpen] = useState(false)
    let [dialogState, setDialogState] = useState('closed')

    useEffect(() => {
        if(dialogState === 'submitted') {
            window.dialogConf.res()
            setDialogState('closed')
        }
    }, [dialogState])

    function handleOpen() {
        setOpen(true)
        setDialogState('open')
        window.dialogConf = {}
        window.dialogConf.progress = new Promise((resolve, reject) => {
            window.dialogConf.res = resolve
            window.dialogConf.rej = reject
        })
    }

    function handleClose() {
        setOpen(false)
        setDialogState('closed')
        window.dialogConf.rej()
    }

    function handleSubmit() {
        setOpen(false)
        setDialogState('submitted')
    }

    useDebugValue({ open, dialogState })

    return [open, handleOpen, handleClose, handleSubmit]
}

export default useDialog