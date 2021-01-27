import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

type DashboardProps = {
  appName: string;
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: Function;
  handleDrawerClose: Function;
};

const useStyles = makeStyles((theme: Theme, drawerWidth: number) => {
  createStyles({
    toolbar: {
      paddingRight: 24,
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
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  });
});

const Dashboard: React.FC<DashboardProps> = ({ appName, open, drawerWidth, handleDrawerOpen, handleDrawerClose }) => {
  return <div></div>;
};

export default Dashboard;
