

import { useRef, useState } from "react";
import { BACKEND_URL } from "../../../config/serverConfig";
import UploadBtn from "./UploadBtn";


function AddArtist() {

  const inputFile = useRef()

  const [inputFileName, setInputFileName] = useState();

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Access form data
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${BACKEND_URL}/artists/addArtist`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };

  console.log("INPUT FILE: ", inputFile)

  const handleInputFile = () => {
   setInputFileName(inputFile.current.files[0].name);
  }

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-column add-song-form">
      <input type="text" name="name" placeholder="Artist Name" />
      <input type="file" name="coverImage" title="Cover Image" ref={inputFile} onChange={handleInputFile}/>
      <div className="form-field-wrap flex align-center">
        <UploadBtn inputFile={inputFile} inputFileName={inputFileName} />
      </div>
      <input type="submit" value="Add Artist" className="form-btn"/>
    </form>
  )
}

export default AddArtist;