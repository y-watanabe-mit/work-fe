import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, name, npatients, nexits, ndeaths) {
  return { id, name, npatients, nexits, ndeaths };
}

const rows = [
  createData(0, 'Tokyo', 4073, 59, 19),
  createData(1, 'Chiba', 801, 101, 23),
  createData(2, 'Kanagawa', 975, 150, 29),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Descending Order</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Prefecture</TableCell>
            <TableCell>Patients</TableCell>
            <TableCell>Exits</TableCell>
            <TableCell>Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.npatients}</TableCell>
              <TableCell>{row.nexits}</TableCell>
              <TableCell>{row.ndeaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more...
        </Link>
      </div>
    </React.Fragment>
  );
}
