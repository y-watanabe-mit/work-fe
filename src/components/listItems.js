import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPrefecture = (e) => {
    // title
    const pref = e.currentTarget.dataset.pref;
    props.setTitle(props.setTitleFunc(pref));

    // data
    const code = e.currentTarget.dataset.code;
    props.setDataFunc(code, props.setData);
  };
  
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      disablePadding={true}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.area.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(props.area.prefs).map(key => (
            <ListItem button className={classes.nested} key={key} onClick={handleClickPrefecture} data-pref={props.area.prefs[key].name} data-code={props.area.prefs[key].code} >
              <ListItemText primary={props.area.prefs[key].name} />
            </ListItem>  
          ))}
        </List>
      </Collapse>
    </List>
  );
}