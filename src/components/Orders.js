import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  var rows = [];
  if (props.data) {
    rows = props.data;
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.currentTarget.style.display = "none";
    props.getFunc(true, props.setData);
  }

  return (
    <React.Fragment>
      <Title>Descending Order</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Prefecture</TableCell>
            <TableCell>Patients</TableCell>
            <TableCell>Exits</TableCell>
            <TableCell>Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.npatients}</TableCell>
              <TableCell>{row.nexits}</TableCell>
              <TableCell>{row.ndeaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={handleClick}>
          See more...
        </Link>
      </div>
    </React.Fragment>
  );
}
