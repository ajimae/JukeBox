export function groupSongs(songList, key = 'album') {
  const groupedSongsList = songList.reduce(function(ac, cv) {
    ac[cv[key]] = ac[cv[key]] || [];
    ac[cv[key]].push(cv);

    return ac;
  }, {});

  return groupedSongsList;
}
