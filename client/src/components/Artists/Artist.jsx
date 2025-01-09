import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";


import PlaylistSong from "../Sidebar/Playlist/PlaylistSong";
import BackIcon from "../icons/BackIcon";


function Artist({ artist, setSelectedSong }) {

  const imageUrl = `${import.meta.env.VITE_IMAGES_URL}${artist.coverImage}`;


  return (
      <div className="artist-container">
        <div
          className="flex flex-column hero artist-hero"
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        >
          <NavLink to="/" className="circle-btn-wrap">
            <BackIcon />
          </NavLink>
          <h4 className="light-txt">{artist.name}</h4>
          <div className="artist-hero-overlay" />
        </div>
        <div className="playlist-wrap">
          {artist.songs.map((song) => {
            return (
              <PlaylistSong song={song} onClick={() => setSelectedSong(song)} />
            )
          })}
        </div>
      </div>
  )
}

export default Artist;