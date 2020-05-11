import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListSubheader from '@material-ui/core/ListSubheader';

import NestedList from './components/listItems';
import Chart from './components/Chart';
import Orders from './components/Orders';
import Deposits from './components/Deposits';

import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        y-watanabe works
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const prefectureCode = {
  Hokkaido: "01",
  Aomori: "02", Akita: "03", Iwate: "04", Yamagata: "05", Miyagi: "06", Fukushima: "07",
  Gunma: "08", Tochigi: "09", Ibaraki: "10", Chiba: "11", Saitama: "12", Tokyo: "13", Kanagawa: "14",
  Niigata: "15", Nagano: "16", Yamanashi: "17",
  Shizuoka: "18", Aichi: "19", Mie: "20", Gifu: "21",
  Toyama: "22", Ishikawa: "23", Fukui: "24",
  Shiga: "25", Wakayama: "26", Nara: "27", Kyoto: "28", Osaka: "29", Hyogo: "30",
  Tottori: "31", Shimane: "32", Okayama: "33", Hiroshima: "34", Yamaguchi: "35",
  Tokushima: "36", Kagawa: "37", Eihime: "38", Ehime: "38", Kochi: "39",
  Fukuoka: "40", Saga: "41", Nagasaki: "42", Kumamoto: "43", Oita: "44", Miyazaki: "45", Kagoshima: "46", Okinawa: "47"
}

const prefectures = {
    hokkaido: {
        name: "Hokkaido",
        prefs: [
            {code: "01", name: "Dekkaido"},
        ]
    },
    tohoku: {
        name: "Tohoku",
        prefs: [
          {code: "02", name: "Aomori"},
          {code: "03", name: "Akita"},
          {code: "04", name: "Iwate"},
          {code: "05", name: "Yamagata"},
          {code: "06", name: "Miyagi"},
          {code: "07", name: "Fukushima"},
        ]
    },
    kanto: {
        name: "Kanto",
        prefs: [
          {code: "08", name: "Gunma"},
          {code: "09", name: "Tochigi"},
          {code: "10", name: "Ibaraki"},
          {code: "11", name: "Chiba"},
          {code: "12", name: "Saitama"},
          {code: "13", name: "Tokyo"},
          {code: "14", name: "Kanagawa"},
        ]
    },
    koushinetsu: {
        name: "Koushinetsu",
        prefs: [
          {code: "15", name: "Niigata"},
          {code: "16", name: "Nagano"},
          {code: "17", name: "Yamanashi"},
        ]
    },
    tokai: {
        name: "Tokai",
        prefs: [
          {code: "18", name: "Shizuoka"},
          {code: "19", name: "Aichi"},
          {code: "20", name: "Mie"},
          {code: "21", name: "Gifu"},
        ]
    },
    hokuriku: {
        name: "Hokuriku",
        prefs: [
          {code: "22", name: "Toyama"},
          {code: "23", name: "Ishikawa"},
          {code: "24", name: "Fukui"},
        ]
    },
    kansai: {
        name: "Kansai",
        prefs: [
          {code: "25", name: "Shiga"},
          {code: "26", name: "Wakayama"},
          {code: "27", name: "Nara"},
          {code: "28", name: "Kyoto"},
          {code: "29", name: "Osaka"},
          {code: "30", name: "Hyogo"},
        ]
    },
    chugoku: {
        name: "Chugoku",
        prefs: [
          {code: "31", name: "Tottori"},
          {code: "32", name: "Shimane"},
          {code: "33", name: "Okayama"},
          {code: "34", name: "Hiroshima"},
          {code: "35", name: "Yamaguchi"},
        ]
    },
    shikoku: {
        name: "Shikoku",
        prefs: [
          {code: "36", name: "Tokushima"},
          {code: "37", name: "Kagawa"},
          {code: "38", name: "Ehime"},
          {code: "39", name: "Kouchi"},
        ]
    },
    kyushu: {
        name: "Kyushu",
        prefs: [
          {code: "40", name: "Fukuoka"},
          {code: "41", name: "Saga"},
          {code: "42", name: "Nagasaki"},
          {code: "43", name: "Kumamoto"},
          {code: "44", name: "Oita"},
          {code: "45", name: "Miyazaki"},
          {code: "46", name: "Kagoshima"},
          {code: "47", name: "Okinawa"},
        ]
    }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function createChart(date, patients, exits, deaths) {
  return { date, patients, exits, deaths };
}

// Generate Order Data
function createOrder(id, name, npatients, nexits, ndeaths) {
  return { id, name, npatients, nexits, ndeaths };
}

function setTitleFunc(pref) {
  return pref;
}

function setDataFunc(code, setData) {
  // Http Connect
  var url = "http://localhost:8080/findPrefectures?code=" + code;
  axios.get(url, {withCredentials: true}).then(res => {
    var list = [];
    var item = {};
    for (var i = 0; i < res.data.list.length; i++){
      item = res.data.list[i];
      list.push(createChart(item.cdate, item.cpatients, item.cexits, item.cdeaths));
    }
    setData(list);
  });
}

var isFirstView = false;

function getData() {
  var url = "https://www.stopcovid19.jp/data/covid19japan-all.json";
  var date,code,sql;
  axios.get(url, {withCredentials: true}).then(res => {
    res.data.forEach(function(oneDay) {
      var splited = oneDay.lastUpdate.split('-');
      date = splited[1] + '/' + splited[2];
      oneDay.area.forEach(function(pref) {
        // console.log(prefData.ndeaths);
        var a = 'insert into prefectures(code,name,cdate,cpatients,cexits,cdeaths) value (';
        code = prefectureCode[pref.name];
        var v = "'" + code + "','" + pref.name + "','" + date + "'," + pref.ncurrentpatients + "," + pref.nexits + "," + pref.ndeaths + ");";
        sql += a + v;
        // insert into prefectures(code,name,cdate,cpatients,cexits,cdeaths) value ('13','Tokyo','5/4',4504,59,19);
      });
    });
    console.log(sql);
  });
}

function getDeposit(setDeposit) {
  var url = "http://localhost:8080/domesticStatus";
  axios.get(url, {withCredentials: true}).then(res => {
    setDeposit(res.data);
  });
}

function getOrder(isMore, setOrder) {
  var limit = (isMore) ? 0 : 3;
  var list = [];
  var pref = {};
  var url = "http://localhost:8080/descendingOrder?limit=" + limit;
  axios.get(url, {withCredentials: true}).then(res => {
    for (var i = 0; i < res.data.list.length; i++){
      pref = res.data.list[i];
      list.push(createOrder(i, pref.name, pref.cpatients, pref.cexits, pref.cdeaths));
    }
    setOrder(list);
  });
}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Change Chart(FirstView is Tokyo)
  const [title, setTitle] = React.useState(setTitleFunc("Tokyo"));
  const [data, setData] = React.useState();
  const [deposit, setDeposit] = React.useState();
  const [order, setOrder] = React.useState();

  if (!isFirstView) {
    // Chart
    setDataFunc("13", setData);

    // Deposits
    getDeposit(setDeposit);

    // Order
    getOrder(false, setOrder);

    isFirstView = true;
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Covid-19 Japan 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        </div>
        <Divider />
        <ListSubheader component="div" id="nested-list-subheader">
          Area from Japan.
        </ListSubheader>
        {Object.keys(prefectures).map(key => (
            <NestedList area={prefectures[key]} key={key} setTitle={setTitle} setData={setData} setTitleFunc={setTitleFunc} setDataFunc={setDataFunc} />
        ))}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart title={title} data={data} />
              </Paper>
            </Grid>
            {/* Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits data={deposit} />
              </Paper>
            </Grid>
            {/* Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders data={order} getFunc={getOrder} setData={setOrder} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}