

function ArtistBox({ artist }) {

  const { name: artistName, coverImage: coverImage } = artist;

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${coverImage}`;

  return (
    <div>
      <img src={imageUrl} alt="" />
      <div className="img-box-overlay">
      <h4 className="light-txt">{artistName}</h4>
      </div>
    </div>
  )
}

export default ArtistBox;