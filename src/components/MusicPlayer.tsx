import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // BTS songs playlist
  const songs: Song[] = [
    {
        id: 1,
        title: "Butter",
        artist: "BTS", 
        src: "/music/bts-butter.mp3"
    },
    {
      id: 2,
      title: "Dynamite",
      artist: "BTS",
      src: "/music/bts-dynamite.mp3"
    },
    {
        id: 3,
        title: "Butterfly",
        artist: "BTS",
        src: "/music/bts-butterfly.mp3"
      },
      {
        id: 4,
        title: "Run BTS",
        artist: "BTS",
        src: "/music/bts-runbts.mp3"
      },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Play next song when current song ends
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    const handleLoadedData = () => {
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentSongIndex, isPlaying, songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = songs[currentSongIndex].src;
    audio.load();
  }, [currentSongIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const currentSong = songs[currentSongIndex] || songs[0];

  return (
    <div className="music-player">
      <audio ref={audioRef} preload="auto" />
      
      {/* Floating music controls */}
      <div className="music-controls">
        <button 
          className="music-toggle"
          onClick={() => setShowControls(!showControls)}
          title="Music Controls"
        >
          🎵
        </button>
        
        {showControls && currentSong && (
          <div className="music-panel">
            <div className="song-info">
              <div className="song-title">{currentSong.title}</div>
              <div className="song-artist">{currentSong.artist}</div>
            </div>
            
            <div className="control-buttons">
              <button onClick={prevSong} className="control-btn" title="Previous">
                ⏮️
              </button>
              <button onClick={togglePlay} className="control-btn play-btn" title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button onClick={nextSong} className="control-btn" title="Next">
                ⏭️
              </button>
            </div>
            
            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                title="Volume"
              />
            </div>
            
            <div className="playlist-info">
              {currentSongIndex + 1} / {songs.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer; 