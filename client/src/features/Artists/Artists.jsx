import { useEffect, useState } from "react";
import ArtistBox from "./ArtistBox/ArtistBox";

import { BACKEND_URL } from '../../config/serverConfig';
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function Artists() {

  const [artists, setArtists] = useState();

  const { user } = useAuthContext();


  useEffect(() => {
    const fetchArtists = async () => {
      // const result = await fetch(`${BACKEND_URL}/artists`, {
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });
      const result = await fetch(`${BACKEND_URL}/artists`);
      const data = await result.json();

      setArtists(data);
    }

    // if (user) {
    //   fetchArtists();
    // }

    fetchArtists();


    // const fetchArtist = async () => {
    //   const result = await fetch(`${BACKEND_URL}/artists/getArtist?name=Culture Club`);
    //   const data = await result.json();

    //   console.log(data);
    // }
    // fetchArtist();
  }, [user]);

  if (!artists) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="artists-container">
      <div className="img-boxes-container">
        <div className="grid img-boxes-wrap">
          {artists.map((artist) => (
            <Link
              className="img-box"
              to={`/library`}
              state={{
                artistId: artist._id,
                artistName: artist.name,
                coverImage: artist.coverImage,
              }}
            >
              <ArtistBox artist={artist} />
            </Link>
          ))}
          {(() => {
            const emptyDivs = 5 - artists.length % 5;
            const ghostDivs = [];
            for (let i = 0; i < emptyDivs; i++) {
              ghostDivs.push(<div className="img-box"></div>);
            }
            return ghostDivs;
          })()}
        </div>
      </div>
    </div>
  )
}

export default Artists;