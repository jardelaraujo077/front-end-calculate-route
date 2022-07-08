import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
export default function BasicRating(props) {
  const { avalaible, star } = props
  const [value, setValue] = useState(star == 0 ? 1 : star);
  useEffect(() => {
      
  },[])

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Deixe sua avaliação</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          avalaible(newValue);
        }}
        onClick={(event, newValue) => {
          avalaible(newValue);
        }}
      />
     

    </Box>
  );
}