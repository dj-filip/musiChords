import { useEffect, useState } from "react";

import { BACKEND_URL } from "../../../config/serverConfig";


function AddSong() {
  const [songInput, setSongInput] = useState(''); // User input (chords and lyrics)
  const [artistNameInput, setArtistNameInput] = useState(''); // User input (chords and lyrics)
  const [formattedChords, setFormattedChords] = useState(''); // Processed output
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [selectedArtistId, setSelectedArtistId] = useState('');
  const [selectedArtistCoverImage, setSelectedArtistCoverImage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);



  // Fetch artist function
  const fetchArtists = async (setArtists) => {
    const result = await fetch(`${BACKEND_URL}/artists/getArtists`);
    const data = await result.json();

    setArtists(data);
  }


  const filterArtists = (artists, artistName) => {
    if (!artistName.trim()) return []; // If no search input, return all artists

    const regex = new RegExp(`(^|\\s)${artistName}`, 'i'); // Create a regex for matching

    const filteredArtists = artists.filter(artist => {
      // Assuming artist is an object with a 'name' field
      return regex.test(artist.name);
    });


    if (!filteredArtists.length) {
      return [];
    } else {
      return filteredArtists;
    }
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
    e.preventDefault(); // Prevent default form submission

    const songData = {
      title: e.target.title.value, // Assuming you have an input with name="title"
      artistName: artistName,
      artistId: selectedArtistId,
      originalKey: e.target.originalKey.value, // Assuming you have an input with name="originalKey"
      intro: e.target.intro.value, // Assuming you have an input with name="intro"
      lyricsChords: e.target.lyricsChords.value, // Assuming you have an input with name="lyricsChords"
      coverImage: selectedArtistCoverImage, // Assuming this is a string URL
  };

    try {
      const response = await fetch(`${BACKEND_URL}/songs/addSong`, {
        method: 'POST',
        headers: {
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
    setSelectedArtistId(artist._id);
    setSelectedArtistCoverImage(artist.coverImage);
    setArtistName(artist.name);
    setShowSuggestions(false);
    setFilteredArtists([]);
  }


  // Update formatted chords live nad fetch artist as user types;
  useEffect(() => {
    fetchArtists(setArtists);
  }, []);

  useEffect(() => {
    setFormattedChords(processChords(songInput));
  }, [songInput]);

  useEffect(() => {
    setFilteredArtists(filterArtists(artists, artistName));
    console.log(filteredArtists)
  }, [artistName]);

  console.log(selectedArtist);
  console.log(selectedArtistId);
  console.log(selectedArtistCoverImage);




  return (
    <form onSubmit={formSubmitHandler} className="flex flex-column add-song-form" autoComplete="off">
      <input type="text" name="title" placeholder="Song Title" onChange={inputHandler} />
      <div className="suggestions-input-wrap">
        <input type="text" name="artist" placeholder="Song Artist" value={artistName} onChange={(e) => {
          setArtistName(e.target.value);
          setShowSuggestions(true);
        }}></input>
        {showSuggestions && (
          <div className={`suggestions-menu ${filteredArtists.length ? 'suggestions-menu-active' : ''}`}>
            <ul>
              {filteredArtists?.map((artist) => {
                const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${artist.coverImage}`;

                return (
                  <li onClick={() => { handleSelectArtist(artist) }}>
                    <img src={imageUrl} alt={artist.name} />{artist.name}</li>
                )
              })}
            </ul>
          </div>
        )}

      </div>
      <input type="text" name="originalKey" placeholder="Original Key" onChange={inputHandler} />
      <textarea rows="2" name="intro" placeholder="Intro" onChange={inputHandler} />
      <textarea rows="10" name="lyricsChords" placeholder="Lyrics / Chords"
        onChange={handleInputChange} />
      <p
        className="lyrics"
        dangerouslySetInnerHTML={{ __html: formattedChords }} // Render HTML
        style={{ whiteSpace: 'pre-wrap' }} // Preserve line breaks and spacing
      ></p>
      <input type="submit" value="Add Song" />
    </form>
  )
}

export default AddSong;