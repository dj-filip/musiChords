import { useGetArtistsQuery } from "@features/Artists/artistsApi";
import useAuthContext from "@features/Auth/hooks/useAuthContext";

import { Link } from "react-router-dom";
import ArtistBox from "./components/ArtistBox";


function Artists() {

  const { user } = useAuthContext();

  const { data: artists, error, isLoading } = useGetArtistsQuery();


  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="artists-container">
      <div className="img-boxes-container">
        <div className="grid img-boxes-wrap">
          {artists.map((artist) => (
            <Link
              key={artist._id}
              className="img-box"
              to={`/library`}
              state={{
                artistId: artist._id,
                artistName: artist.name,
                coverImage: artist.coverImage,
              }}
            >
              <ArtistBox
                artist={artist}
              />
            </Link>
          ))}
          {(() => {
            const emptyDivs = 5 - artists.length % 5;
            const ghostDivs = [];
            for (let i = 0; i < emptyDivs; i++) {
              ghostDivs.push(<div key={i} className="img-box"></div>);
            }
            return ghostDivs;
          })()}
        </div>
      </div>
    </div>
  )
}

export default Artists;