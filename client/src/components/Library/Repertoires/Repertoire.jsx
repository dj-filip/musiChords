import RepertoireIcon from "../../icons/RepertoireIcon";


const Repertoire = ({ repertoire, onClick }) => {

  return (
    <>
      <li
        onClick={() => onClick(repertoire)}
      >
        <div className="repertoire-icon-wrap">
          <RepertoireIcon />
        </div>
        <div className="flex-1">
          <h5 className="light-txt">{repertoire.name}</h5>
        </div>
      </li>

    </>
  )
}

export default Repertoire;