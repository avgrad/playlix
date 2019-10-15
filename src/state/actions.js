import { spotifyClient } from './spotify';

const receivePlaylistTracks = (playlistId, tracks) => ({
  type: 'RECEIVE_PLAYLIST_TRACKS',
  playlistId,
  tracks
});

export const setPlaylistLoading = (playlistId, loading) => ({
  type: 'SET_PLAYLIST_LOADING',
  playlistId,
  loading
});

const receivePlaylistInfos = (playlistId, data) => ({
  type: 'RECEIVE_PLAYLIST_DATA',
  playlistId,
  data
});

export const fetchPlaylistTracks = (playlistId) => dispatch => {
  // TODO check if playlist is already loaded?

  dispatch(setPlaylistLoading(playlistId, true));

  spotifyClient.getPlaylistTracks(playlistId)
    .then(playlistTracksResponse => dispatch(receivePlaylistTracksResponse(playlistId, playlistTracksResponse)))
    .catch(err => {
      console.error('Error while fetching Playlist Tracks for ' + playlistId, err);
      dispatch(setPlaylistLoading(playlistId, false));
    });
};

const receivePlaylistTracksResponse = (playlistId, playlistTracksResponse) => dispatch => {
  dispatch(receivePlaylistTracks(playlistId, playlistTracksResponse.items.map(playlistTrack => playlistTrack.track)));

  if (playlistTracksResponse.next) {
    spotifyClient.getGeneric(playlistTracksResponse.next)
      .then(nextPlaylistTracksResponse => dispatch(receivePlaylistTracksResponse(nextPlaylistTracksResponse)))
      .catch(err => {
        console.error('Error while fetching more Playlist Tracks for ' + playlistId, err);
        dispatch(setPlaylistLoading(playlistId, false));
      });
  } else {
    dispatch(setPlaylistLoading(playlistId, false));
  }
};

export const fetchUserPlaylistInfos = () => dispatch => {
  console.log('start loading playlists infos');
  spotifyClient.getUserPlaylists()
    .then(playlistResponse => dispatch(receivePlaylistInfosResponse(playlistResponse)))
    .catch(err => console.error('Error while fetching Playlist Infos for user', err));
};

const receivePlaylistInfosResponse = (playlistResponse) => dispatch => {
  playlistResponse.items.forEach(playlist => dispatch(receivePlaylistInfos(playlist.id, playlist)));

  if (playlistResponse.next != null) {
    spotifyClient.getGeneric(playlistResponse.next)
      .then(nextPlaylistResponse => dispatch(receivePlaylistInfosResponse(nextPlaylistResponse)))
      .catch(err => console.error('Error while fetching more Playlist Infos for user', err));
  } else console.log('playlist infos loading ended');
};

export const setAuth = (auth) => {
  // set access token to spotify instance...
  spotifyClient.setAccessToken(auth.access_token)

  return ({
    type: 'SET_AUTH',
    auth
  });
};

export const uiToggleSmallDrawerOpen = () => {
  return ({
    type: 'TOGGLE_SMALLDRAWER_OPEN'
  });
};

export const uiSetSmallDrawerOpen = (open) => {
  return ({
    type: 'SET_SMALLDRAWER_OPEN',
    open: !!open
  });
};
