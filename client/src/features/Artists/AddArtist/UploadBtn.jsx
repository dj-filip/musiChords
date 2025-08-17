import UploadIcon from "../../../components/icons/UploadIcon";


function UploadBtn({ inputFile, inputFileName }) {
  return (
    <button
      type="button"
      onClick={() => {
        inputFile.current?.click()
      }}
      className="flex align-center upload-btn"
    >
      <UploadIcon />
      {inputFileName || "Choose Image"}
    </button>
  )
}

export default UploadBtn;