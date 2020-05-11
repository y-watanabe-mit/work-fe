import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  var patients,exits,deaths;
  if (props.data) {
    patients = props.data.cpatientsJapan;
    exits = props.data.cexitsJapan;
    deaths = props.data.cdeathsJapan;
  }
  return (
    <React.Fragment>
      <Title>Domestic Status</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Patients
      </Typography>
      <Typography component="p" variant="h5">
        {patients}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Exits
      </Typography>
      <Typography component="p" variant="h5">
        {exits}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Deaths
      </Typography>
      <Typography component="p" variant="h5">
        {deaths}
      </Typography>
    </React.Fragment>
  );
}
