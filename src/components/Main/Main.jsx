import { useContext, useEffect, useState, useRef } from "react";
import { PlayingContext } from "../../contexts/PlayingContext";



const Main = () => {
  const { selectedSong, setSelectedSong, setSelectedSongTitle, isHiding, setIsHiding } = useContext(PlayingContext);
  const [processedLyricsChords, setProcessedLyricsChords] = useState('');
  const [processedIntro, setProcessedIntro] = useState('');
  const [transposeStep, setTransposeStep] = useState(0); // Step for chord transposition
  const [scale, setScale] = useState('');
  const [chords, setChords] = useState([]);
  const ref = useRef();
  let downY;


  const songChords = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];

  const majorChords = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];
  const minorChords = ['Am', 'Bm', 'Hm', 'Cm', 'C#m', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'];

  const sharpKeys = ['G', 'D', 'A', 'E', 'H', 'F#', 'C#', 'G#', 'Em', 'Hm', 'F#m', 'C#m', 'G#m'];
  const flatKeys = ['F', 'B', 'Eb', 'Ab', 'Db', 'Gb', 'Cm', 'Gm', 'Dm', 'Fm', 'Bm'];

  const sharpToFlatMap = { 'G#': 'Ab', 'D#': 'Eb', 'A#': 'B', 'E#': 'F', 'B#': 'C', 'Cb': 'H' };
  const flatToSharpMap = { 'Ab': 'G#', 'Eb': 'D#', 'B': 'A#', 'F': 'E#', 'C': 'B#', 'H': 'Cb' };

  const prefersSharps = (songKey) => sharpKeys.includes(songKey);
  const prefersFlats = (songKey) => flatKeys.includes(songKey);

  const transposeChord = (chord, steps, originalSongKey) => {
    console.log(chord);

    const chordRoot = chord.endsWith('m') || chord.endsWith('7') ? chord.replace(/[^A-Hb#]/g, '') : chord; // Extract root chord
    const index = chordRoot === 'Ab' ? 8 : songChords.indexOf(chordRoot);

    console.log(chordRoot);

    if (index === -1) return chord; // If chord not found, return original

    const newIndex = (index + steps + songChords.length) % songChords.length; // Circular transpose
    let transposedChord = chordRoot === 'Ab' && steps === 0 ? 'Ab' : songChords[newIndex];

    // Use sharp or flat depending on the original song key
    if (prefersSharps(originalSongKey) && flatToSharpMap[transposedChord]) {
      transposedChord = flatToSharpMap[transposedChord];
    } else if (prefersFlats(originalSongKey) && sharpToFlatMap[transposedChord]) {
      transposedChord = sharpToFlatMap[transposedChord];
    }

    transposedChord += chord.endsWith('m') ? 'm' : '';
    transposedChord += chord.endsWith('7') ? '7' : '';


    return chord.replace(chord, transposedChord);
  };

  useEffect(() => {
    const processChords = (input, transposeStep = 0) => {
      let processedChords = input;

      setScale(selectedSong.originalKey.endsWith('m') ? 'minor' : 'major');
      setChords(selectedSong.originalKey.endsWith('m') ? minorChords : majorChords);


      const originalSongKey = selectedSong.selectedSong || 'C'; // Defaults to 'C'


      // Handle space chords like `{ }`
      processedChords = processedChords.replace(/\{\s+\}/g, (x) => {
        let r = "";
        for (let i = 2; i < x.length; i++) {
          r += "&nbsp; ";
        }
        return r;
      });

      // Process and transpose inline chords `{_Chord}`
      processedChords = processedChords.replace(/\{_([A-H][#b]?m?)\}/g, (_, chord) => {
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
      const processedLyricsChords = processChords(selectedSong.lyricsChords, transposeStep);
      const processedIntro = processChords(selectedSong.intro, transposeStep);

      setProcessedLyricsChords(processedLyricsChords);
      setProcessedIntro(processedIntro);
    } else {
      setProcessedLyricsChords(null);
      setProcessedIntro(null);
    }


  }, [selectedSong, transposeStep]); // Re-process when selected song or transpose step changes

  // Event handlers for transpose buttons
  const handleTransposeUp = () => {
    setTransposeStep(transposeStep + 1); // Increase transpose step
    updateOriginalKey(1); // Update original key based on transposition
  };

  const handleTransposeDown = () => {
    setTransposeStep(transposeStep - 1); // Decrease transpose step
    updateOriginalKey(-1); // Update original key based on transposition
  };

  // Function to update original song key based on transpose step
  const updateOriginalKey = (direction) => {
    const originalSongKey = selectedSong.originalKey || 'C'; // Defaults to 'C'
    const originalIndex = chords.indexOf(originalSongKey);

    if (originalIndex !== -1) {
      const newIndex = (originalIndex + direction + chords.length) % chords.length;
      const newKey = chords[newIndex];

      setSelectedSong((prev) => ({
        ...prev,
        originalKey: newKey
      }));
    }
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
        <h3 className="song-key txt-center">{selectedSong.originalKey}</h3>
        <div className="song-lyrics-chords-wrap">
          <div className="flex just-center">
            <p className="lyrics txt-center" dangerouslySetInnerHTML={{ __html: "Intro:   " + processedIntro }}></p>
          </div>
          <p className="lyrics txt-center" dangerouslySetInnerHTML={{ __html: processedLyricsChords }}></p>
        </div>
      </main >
    ) : <main ref={ref} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
    </main>
  );
};

export default Main;