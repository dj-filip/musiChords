import CloseIcon from "../../../icons/CloseIcon";

import { BACKEND_URL } from "../../../../config/serverConfig";
import AddIcon from "../../../icons/AddIcon";


function CreateRepertoire({ setShowPopupMenu, fetchRepertoires, positionX, positionY, createRepertoireRef }) {


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

  console.log(positionX);


  return (
    <div 
      ref={createRepertoireRef}
      className="new-repertoire-popup-container"
      style={{
        top: positionY + 50 + 'px',
        left: positionX + 10 + 'px'
      }}
      >
      <div className="new-repertoire-popup flex flex-column">
        {/* <button
          className="close-btn"
          onClick={() => setShowPopupMenu(false)}
        >
          <CloseIcon />
        </button> */}
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="New Repertoire"
          />
          <button className="circle-icon-btn" type="submit"><AddIcon /></button>
        </form>
      </div>
    </div>
  )
}

export default CreateRepertoire;