import CloseIcon from "../../../icons/CloseIcon";

import { BACKEND_URL } from "../../../../config/serverConfig";


function CreateRepertoire({ setShowPopupMenu, fetchRepertoires }) {

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Access form data
    const repertoireData = {
      name: e.target.name.value
    };


    try {
      const response = await fetch(`${BACKEND_URL}/repertoires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(repertoireData),
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setShowPopupMenu(false)
      fetchRepertoires();
    } catch (err) {
      console.error('Error submitting the form:', err);
    }
  };

  return (
    <div className="new-repertoire-popup-container">
      <div className="new-repertoire-popup flex flex-column">
        <button
          className="close-btn"
          onClick={() => setShowPopupMenu(false)}
        >
          <CloseIcon />
        </button>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="New Repertoire"
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  )
}

export default CreateRepertoire;