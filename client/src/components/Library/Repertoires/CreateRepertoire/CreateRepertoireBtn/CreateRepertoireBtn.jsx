import PlusIcon from "../../../../icons/PlusIcon";


function CreateRepertoireBtn({ setShowPopupMenu }) {


  return (
    <button 
      className="new-repertoire-btn circle-btn-wrap"
      onClick={() => setShowPopupMenu((prev) => !prev)}  
    >
      <PlusIcon />
    </button>
  )

}

export default CreateRepertoireBtn;