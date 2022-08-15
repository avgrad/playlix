import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import ghIcon from './gh32.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    marginTop: theme.spacing(4),
    opacity: 0.7
  },
  ghLink: {
    '&:before': {
      content: '""',
      width: '1em',
      height: '1em',
      backgroundImage: `url(${ghIcon})`,
      backgroundSize: 'cover',
      display: 'inline-block',
      marginRight: 2,
      transform: 'translateY(2px)'
    }
  }
}));

function AppFrame(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <AppDrawer container={this} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth='md'>
          {props.children}
        </Container>
        <Container maxWidth='md' className={classes.footer}>
          <Grid container direction='row' justify='space-evenly'>
            <Grid item>
              <Typography variant='caption'>
                This application completely runs in your Browser, and does not store any of your data.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                Music track data is made available by Spotify via its Web API.
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction='row' justify='space-evenly'>
            <Grid item>
              <Typography variant='caption'>
                Version {process.env.npm_package_version}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                Created in 2019 by <Link href='https://github.com/avgrad' target='_blank'>avgrad</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                Released as Open Source on <Link href='https://github.com/avgrad/playlix' target='_blank' className={classes.ghLink}>GitHub</Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default AppFrame;
