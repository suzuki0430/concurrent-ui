import React from 'react';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: '14px',
  },
}));

export const DetailsContent = ({ company, name, image }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" style={{ marginTop: '10px' }}>
      <Grid container spacing={5} alignItems="center">
        <Grid item>
          <CardContent>
            <Typography
              style={{ fontSize: 16 }}
              color="textSecondary"
              gutterBottom
            >
              {company}
            </Typography>
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <Avatar alt="minami" src={image} className={classes.large} />
        </Grid>
      </Grid>
    </Card>
  );
};
