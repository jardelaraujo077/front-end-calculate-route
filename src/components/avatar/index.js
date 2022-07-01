import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars(props) {
    const { title = '', src = '' } = props
    return (
        <Stack direction="row" spacing={2}>
            <Avatar style={styles.img} alt={title} src={src} />
            <span style={styles.text}><b>Jardel Araujo</b></span>

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
