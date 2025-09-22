import { useEffect, useState } from "react";

import { BACKEND_URL } from "@config/serverConfig";
import useAuthContext from "@features/Auth/hooks/useAuthContext";
import useDebounce from "@hooks/useDebounce";


function AddSong() {
  const [songInput, setSongInput] = useState('');
  const [artistNameInput, setArtistNameInput] = useState('');
  const [formattedChords, setFormattedChords] = useState('');
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);


  const { user } = useAuthContext();

  const debouncedSearchArtist = useDebounce(searchTerm, 200);

  // Fetch artist function
  const searchArtists = async (queryName, setArtists) => {
    // const result = await fetch(`${BACKEND_URL}/artists`, {
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`
    //   }
    // });
    const result = await fetch(`${BACKEND_URL}/artists?name=${encodeURIComponent(queryName)}`);
    const data = await result.json();

    setArtists(data);
  }


  // Function to process and format chords
  const processChords = (input) => {
    let processedChords = input;

    processedChords = processedChords.replace(/\{\s+\}/g, (x) => {
      let r = "";
      for (let i = 2; i < x.length; i++) {
        r += "&nbsp; ";
      }
      return r;
    });

    // Process and transpose {Chords}
    processedChords = processedChords.replace(/\{([A-H][#b]?(m7|7|m?)?)\}/g, (_, chord) => {
      return `<span class='chord'>${chord}</span>`;
    });

    // Process and transpose `[Transitions]]`
    processedChords = processedChords.replace(/\[([^\]]+)\]/g, (_, transitionText) => {
      // Find and transpose any tones inside the transition text
      // const transposedTransition = transitionText.replace(/([A-H][#b]?(m7|7|m?)?)/g, (tone) => {
      //   return transposeChord(tone, transposeStep, originalSongKey);
      // });

      return `<span class='transition'>${transitionText}</span>`;
    });

    return processedChords;
  };


  // Handle textarea input change
  const handleInputChange = (e) => {
    setSongInput(e.target.value);
  };

  const inputHandler = (e) => {
    setArtistNameInput(e.target.value)
  }


  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const songData = {
      title: e.target.title.value,
      artistName: selectedArtist.name,
      artistId: selectedArtist.id,
      originalKey: e.target.originalKey.value,
      intro: e.target.intro.value,
      lyricsChords: e.target.lyricsChords.value,
      coverImage: selectedArtist.coverImage,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/songs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songData)
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };


  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setShowSuggestions(false);
    setSearchTerm(artist.name)
  }


  // Update formatted chords live and fetch artist as user types;
  useEffect(() => {
    if (!debouncedSearchArtist.trim()) {
      setArtists([]);
      return
    }
    searchArtists(debouncedSearchArtist, setArtists)
  }, [debouncedSearchArtist]);

  useEffect(() => {
    setFormattedChords(processChords(songInput));
  }, [songInput]);

  // useEffect(() => {
  //   setFilteredArtists(filterSearchByName(artists, artistName));
  //   console.log(filteredArtists)
  // }, [artistName]);

  console.log(debouncedSearchArtist);





  return (
    <>
      <form onSubmit={formSubmitHandler} className="flex flex-column add-song-form" autoComplete="off">
        <input type="text" name="title" placeholder="Song Title"/>
        <div className="suggestions-input-wrap">
          <input type="text" name="artist" placeholder="Song Artist" value={searchTerm} onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}></input>
          {artists && showSuggestions && (
            <div className={`suggestions-menu ${artists.length ? 'suggestions-menu-active' : ''}`}>
              <ul>
                {artists?.map((artist) => {
                  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${artist.coverImage}`;

                  return (
                    <li onClick={() => { handleSelectArtist(artist) }} key={artist.id}>
                      <img src={imageUrl} alt={artist.name} />{artist.name}</li>
                  )
                })}
              </ul>
            </div>
          )}

        </div>
        <input type="text" name="originalKey" placeholder="Original Key" onChange={inputHandler} />
        <textarea rows="2" name="intro" placeholder="Intro"/>
        <textarea rows="10" name="lyricsChords" placeholder="Lyrics / Chords"/>
        <input type="submit" value="Add Song" />
      </form>
      <div className="lyrics-preview-wrap">
        <p
          className="lyrics gray-txt"
          dangerouslySetInnerHTML={{ __html: formattedChords }}
          style={{ whiteSpace: 'pre-wrap' }}
        ></p>
      </div>
    </>
  )
}

export default AddSong;