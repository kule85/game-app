import React, { FC, useState, useEffect } from 'react'
import { Alert, Zoom, Box } from '@mui/material'

import './style.scss'

type Props = {
  type: 'error' | 'success'
  message: string
}

const Notification: FC<Props> = ({ type, message }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {show && (
        <Box className="notification-holder">
          <Zoom in={show} style={{ transitionDelay: show ? '500ms' : '0ms' }}>
            <Alert variant="filled" severity={type}>
              {message}
            </Alert>
          </Zoom>
        </Box>
      )}
    </>
  )
}

export default Notification
