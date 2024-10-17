import { useContext, useEffect, useState, useRef } from "react";
import { PlayingContext } from "../../contexts/PlayingContext";



const Main = () => {
  const { selectedSong, setSelectedSong, setSelectedSongTitle, isHiding, setIsHiding } = useContext(PlayingContext);
  const [processedLyricsChords, setProcessedLyricsChords] = useState('');
  const [processedIntro, setProcessedIntro] = useState('');
  const [transposeStep, setTransposeStep] = useState(0); // Step for chord transposition
  const [songKey, setSongKey] = useState('');
  const [scale, setScale] = useState('');
  const [chords, setChords] = useState([]);
  const ref = useRef();
  let downY;


  const songChords = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'B', 'H'];
  // const songChords2 = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];


  const majorChords = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];
  const minorChords = ['Am', 'Bm', 'Hm', 'Cm', 'C#m', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'];

  const sharpKeys = ['G', 'D', 'A', 'E', 'H', 'F#', 'C#', 'Em', 'Hm', 'F#m', 'C#m'];
  const flatKeys = ['F', 'B', 'Eb', 'Ab', 'Db', 'Gb', 'Cm', 'Gm', 'Dm', 'Fm', 'Bm'];

  const sharpToFlatMap = { 'G#': 'Ab', 'D#': 'Eb', 'A#': 'B', 'E#': 'F', 'B#': 'C', 'Cb': 'H' };
  const flatToSharpMap = { 'Ab': 'G#', 'Eb': 'D#', 'B': 'A#', 'F': 'E#', 'C': 'B#', 'H': 'Cb' };

  const prefersSharps = (songKey) => sharpKeys.includes(songKey);
  const prefersFlats = (songKey) => flatKeys.includes(songKey);

  const transposeChord = (chord, steps, originalSongKey) => {
    console.log("SONG KEY: " + originalSongKey);

    const extractRoot = (_chord) => {
      return _chord.endsWith('m') || _chord.endsWith('7') ? _chord.replace(/[^A-Hb#]/g, '') : _chord;
    }

    const originalSongKeyRoot = extractRoot(originalSongKey);
    const chordRoot = extractRoot(chord);

    const index = songChords.indexOf(chordRoot);


    if (index === -1) return chord; // If chord not found, return original

    const newIndex = (index + steps + songChords.length) % songChords.length; // Circular transpose
    let transposedChord = songChords[newIndex];

    // Use sharp or flat depending on the original song key
    if (prefersFlats(originalSongKeyRoot) && flatToSharpMap[transposedChord]) {
      console.log("PREFERS FLATS, song key: " + originalSongKey + "song key: "+ originalSongKeyRoot);
      transposedChord = flatToSharpMap[transposedChord];
    } else if (prefersSharps(originalSongKeyRoot) && sharpToFlatMap[transposedChord]) {
      console.log("PREFERS SHARPS, song key: " + originalSongKey + "song key: "+ originalSongKeyRoot);
      transposedChord = sharpToFlatMap[transposedChord];
    }

    transposedChord += chord.endsWith('m') ? 'm' : '';
    transposedChord += chord.endsWith('7') ? '7' : '';


    return chord.replace(chord, transposedChord);
  };



  useEffect(() => {

    const processChords = (input, transposeStep = 0) => {
      let processedChords = input;

      const originalSongKey = songKey || 'C'; // Defaults to 'C'

      // Handle space chords like `{ }`
      processedChords = processedChords.replace(/\{\s+\}/g, (x) => {
        let r = "";
        for (let i = 2; i < x.length; i++) {
          r += "&nbsp; ";
        }
        return r;
      });

      // Process and transpose inline chords `{_Chord}`
      processedChords = processedChords.replace(/\{_([A-H][#b]?(m7|7|m?)?)\}/g, (_, chord) => {
        const transposedChord = transposeChord(chord, transposeStep, originalSongKey);
        return `<span class='chord-inline'>${transposedChord}</span>`;
      });

      // Process and transpose normal chords `{Chord}`
      processedChords = processedChords.replace(/\{([A-H][#b]?(m7|7|m?)?)\}/g, (_, chord) => {
        const transposedChord = transposeChord(chord, transposeStep, originalSongKey);
        return `<span class='chord light-txt'>${transposedChord}</span>`;
      });

      // Process and transpose transitions `[Transition]]`
      processedChords = processedChords.replace(/\[([^\]]+)\]/g, (_, transitionText) => {
        // Find and transpose any tones inside the transition text
        const transposedTransition = transitionText.replace(/([A-H][#b]?(m7|7|m?)?)/g, (tone) => {
          return transposeChord(tone, transposeStep, originalSongKey);
        });

        return `<span class='transition'>${transposedTransition}</span>`;
      });

      return processedChords;
    };


    if (selectedSong.title) {
      const updatedSongKey = transposeChord(selectedSong.originalKey, transposeStep, songKey);
      const processedLyricsChords = processChords(selectedSong.lyricsChords, transposeStep);
      const processedIntro = processChords(selectedSong.intro, transposeStep);

      setSongKey(updatedSongKey);
      setProcessedLyricsChords(processedLyricsChords);
      setProcessedIntro(processedIntro);
    } else {
      setProcessedLyricsChords(null);
      setProcessedIntro(null);
      setSongKey('C');
    }


  }, [selectedSong, transposeStep]); // Re-process when selected song or transpose step changes

  // Event handlers for transpose buttons
  const handleTransposeUp = () => {
    setTransposeStep(transposeStep + 1); // Increase transpose step
  };

  const handleTransposeDown = () => {
    setTransposeStep(transposeStep - 1); // Decrease transpose step
  };


  const onPointerMove = (e) => {
    const newY = e.clientY;


    if (e.clientY - ref.current.getBoundingClientRect().top < 80 && newY - downY > 5) {
      setIsHiding(true);

      ref.current.classList.remove("song-selected");
      setTimeout(() => {
        setSelectedSong({});
        setTransposeStep(0);
        setIsHiding(false);
      }, 1000);
      setSelectedSongTitle(null);

    }

  }

  const onPointerDown = (e) => {
    downY = e.clientY;
    ref.current.addEventListener('pointermove', onPointerMove);
  }

  const onPointerUp = (e) => {
    ref.current.removeEventListener('pointermove', onPointerMove);
  }


  return (

    selectedSong.title ? (
      <main className={`${isHiding ? "" : "song-selected"}`} ref={ref} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className="song-selected-heading">
          <button className="transpose-btns transpose-btn-left" onClick={handleTransposeDown}>b</button>
          <h3 className="txt-center light-txt">{selectedSong.title}</h3>
          <button className="transpose-btns transpose-btn-right" onClick={handleTransposeUp}>#</button>
        </div>
        <h5 className="txt-center">{selectedSong.artist}</h5>
        <h3 className="song-key txt-center">{songKey}</h3>
        <div className="song">
          <div className="flex just-center">
            <p className="lyrics txt-center" dangerouslySetInnerHTML={{ __html: "Intro:   " + processedIntro }}></p>
          </div>
          <p className="lyrics txt-center" dangerouslySetInnerHTML={{ __html: processedLyricsChords }}></p>
        </div>
      </main >
    ) : <main ref={ref} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
    </main >
  );
};

export default Main;