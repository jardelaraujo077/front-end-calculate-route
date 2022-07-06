import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function ImageAvatars(props) {
    const matches = useMediaQuery('(max-width:500px)')
   
    const { title = '', src = '' } = props
    return (
        <Stack direction="row" spacing={2}>
            <Avatar style={{...styles.img, ...matches ? {top: 177,left: 77} : ''}} alt={title} src={src} />
            <span style={{...styles.text,  ...matches ? {top: 191,left: 107} : '' }}><b>{title}</b></span>

        </Stack>
    );
}
const styles = {
    img: {
        position: 'absolute',
        top: 11,
        left: 9,
    },
    text: {
        position: 'absolute',
        top: 27,
        left: 42
    }
}
