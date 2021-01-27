import { Container, createStyles, CssBaseline, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import HeaderContinaer from '../containers/header/HeaderContinaer';
import LeftMenuContainer from '../containers/header/LeftMenuContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

type MainPageProps = {};

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      display: 'flex',
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
  });
});

const MainPage: React.FC<MainPageProps> = () => {
  const classes: any = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderContinaer />
      <LeftMenuContainer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>ssdfsd</Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>sdfsdfsdfsdfs</Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>sdfsfsdfsf</Paper>
            </Grid>
          </Grid>
          <Box pt={4}>sdfsdfsdfsddf</Box>
        </Container>
      </main>
    </div>
  );
};

export default MainPage;
