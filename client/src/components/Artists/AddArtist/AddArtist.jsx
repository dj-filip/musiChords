

import { BACKEND_URL } from "../../../config/serverConfig";


function AddArtist() {

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

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-column add-song-form">
      <input type="text" name="name" placeholder="Artist Name" />
      <input type="file" name="coverImage" title="Cover Image" />
      <input type="submit" value="Add Artist" />
    </form>
  )
}

export default AddArtist;