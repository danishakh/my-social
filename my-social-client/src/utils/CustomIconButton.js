import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, toolTipTitle, btnClassName, toolTipClassName, placement}) => (
    <Tooltip title={toolTipTitle} className={toolTipClassName} placement={placement}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);