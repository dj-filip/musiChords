import { useEffect, useState } from "react";

import { BACKEND_URL } from "../../../config/serverConfig";


function AddSong() {
  const [songInput, setSongInput] = useState(''); // User input (chords and lyrics)
  const [formattedChords, setFormattedChords] = useState(''); // Processed output

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

  // Update formatted chords live as user types
  useEffect(() => {
    setFormattedChords(processChords(songInput));
  }, [songInput]);

  // Handle textarea input change
  const handleInputChange = (e) => {
    setSongInput(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Access form data
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${BACKEND_URL}/songs/addSong`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };

  const inputHandler = (e) => {
    console.log(e.target.value);
  }

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-column add-song-form">
      <input type="text" name="title" placeholder="Song Title" onChange={inputHandler} />
      <input type="text" name="artist" placeholder="Song Artist" onChange={inputHandler} />
      <input type="text" name="originalKey" placeholder="Original Key" onChange={inputHandler} />
      <textarea rows="2" name="intro" placeholder="Intro" onChange={inputHandler} />
      <textarea rows="10" name="lyricsChords" placeholder="Lyrics / Chords"
        onChange={handleInputChange} />
      <p
        className="lyrics"
        dangerouslySetInnerHTML={{ __html: formattedChords }} // Render HTML
        style={{ whiteSpace: 'pre-wrap' }} // Preserve line breaks and spacing
      ></p>
      <input type="file" name="coverImage" title="Cover Image" onChange={inputHandler} />
      <input type="submit" value="Add Song" />
    </form>
  )
}

export default AddSong;