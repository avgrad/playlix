import React from 'react';
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom';

//import PlaylistTable from './PlaylistTable';
import Playlist from './Playlist';
import AppFrame from './AppFrame/AppFrame';
import Home from './Home';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles';

// custom theme color green
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1DB954'
    }
  }
});

function PlaylistPage() {
  const { playlistId } = useParams();
  return <Playlist playlistId={playlistId} />
  //return <PlaylistTable playlistId={playlistId} />
}

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <AppFrame>
          <Switch>
            <Route path='/playlist/:playlistId'>
              <PlaylistPage />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </AppFrame>
      </Router>
    </MuiThemeProvider>
  );
}
