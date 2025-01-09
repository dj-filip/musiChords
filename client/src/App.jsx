import { useEffect, useState } from 'react';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';

import { PlayingContext } from './contexts/PlayingContext';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import { BACKEND_URL } from './config/serverConfig';


let currentSongAudio;

// const songs = [
//   {
//     title: "Nađi novu ljubav",
//     artist: "Saša Matić",
//     cover: "./songs/cover-images/nadji-novu-ljubav-cover.jpg",
//     link: "./songs/audio/sasa-matic-nadji-novu-ljubav.mp3",
//     playlist: "rock",
//     originalKey: "G#m",
//     chords: `Nudiš mi zvezde, nudiš mi snove
//     Al' ja živim svoju bol
//     Nudiš mi sve što ljubav se zove
//     A znaš da neću biti tvoj

//     Šta li si kod mene zavolela?
//     Čemu li to nisi odolela?
//     Sudbina je moja od tvoje sreće daleko

//     Zlato moje

//     Ref.
//     Nađi novu ljubav, novo nebo
//     i niko neće znati
//     šta je s'nama bilo

//     Zašto ti srce pati
//     a ja ću da pijem
//     ja ću da živim ovaj život svoj
//     kako moram

//     Nađi novu ljubav, novo nebo
//     i niko neće znati
//     šta je s'nama bilo

//     Zašto ti srce pati
//     a ja ću da pijem
//     ja ću da živim kao pas bez nje
//     ne da mi Bog drugačije

//     Goni me vetar, nosi daleko
//     bolje da ti ne pričam
//     koja me tuga od tebe tera
//     al' ništa i ne osećam`,
//   }
// ]




const App = () => {

  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selectedSongTitle, setSelectedSongTitle] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [isHiding, setIsHiding] = useState(false);


  useEffect(() => {

    const fetchData = async () => {
      const result = await fetch(`${BACKEND_URL}/songs/getSongs`);
      const data = await result.json();

      setSongs(data);
    }

    fetchData();


    if (selectedSongTitle) {
      currentSongAudio?.pause();
      currentSongAudio = new Audio(selectedSongTitle);
      // currentSongAudio.play();
      setPlaying(false);
      const filteredSong = songs.find(song => song.title === selectedSongTitle);
      setSelectedSong({
        title: filteredSong?.title,
        artist: filteredSong?.artist,
        originalKey: filteredSong?.originalKey,
        intro: filteredSong?.intro,
        lyricsChords: filteredSong?.lyricsChords,
        coverImage: filteredSong?.coverImage,
      });
      ("SELECTED SONG CHORDS: " + selectedSong.title)
    }

  }, [selectedSongTitle]);


  useEffect(() => {
    if (selectedSong.title) {
      console.log("SELECTED SONG TITLE: " + selectedSong.title);
    }
  }, [selectedSong]);



  const handleOnPlay = () => {
    if (selectedSongTitle) {
      setPlaying(playing => !playing);
      if (!playing) {
        currentSongAudio.play();
      } else {
        currentSongAudio.pause();
      }
    }
  }

  return (
    <Router>
      <PlayingContext.Provider value={{ playing, setPlaying, handleOnPlay, selectedSongTitle, setSelectedSongTitle, songs, selectedSong, setSelectedSong, isHiding, setIsHiding }}>
        <Layout>
          <AppRoutes />
        </Layout>
      </PlayingContext.Provider>
    </Router>
  )
}

export default App;