import React, { useEffect, useRef, useState } from 'react';
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaBackward, FaPause, FaPlay } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';

const AudioPlayer = () => {
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const [CurrentTime, setCurrentTime] = useState(0);
    const [Duration, setDuration] = useState(0);
    const dispatch = useDispatch();
    const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
    const songPath = useSelector((state) => state.player.songPath);
    const img = useSelector((state) => state.player.img);

    const audioRef = useRef();

    // Debugging image path
    console.log("Redux image path:", img);

    // Build full image URL
    const imageUrl = img
        ? img.startsWith('http')
            ? img
            : `http://localhost:1000${img.startsWith('/') ? img : '/' + img}`
        : '/default-image.png';

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const closeAudioPlayerDiv = (e) => {
        e.preventDefault();
        dispatch(playerActions.closeDiv());
        dispatch(playerActions.changeImage(""));
        dispatch(playerActions.changeSong(""));
    };

    const handlePlayPodcast = () => {
        setIsSongPlaying((prev) => {
            const next = !prev;
            if (audioRef.current) {
                if (next) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }
            return next;
        });
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const Backward = () => {
        if (audioRef.current) {
            let newTime = Math.max(CurrentTime - 10, 0);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime)
        }
    }

    const Forward = () => {
        if (audioRef.current) {
            let newTime = Math.min(CurrentTime + 10, Duration);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime)
        }
    }

    useEffect(() => {
        setIsSongPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        const currentAudio = audioRef.current;
        if (currentAudio) {
            currentAudio.addEventListener('timeupdate', handleTimeUpdate);
            currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
        }
        return () => {
            if (currentAudio) {
                currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
                currentAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            }
        };
    }, [songPath]);

    return (
        <div className={`${PlayerDivState ? "fixed" : "hidden"} bottom-0 left-0 w-full bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}>
            <div className='hidden md:block w-1/3'>
                <img
                    src={imageUrl}
                    alt='Podcast'
                    className="size-12 rounded-full object-cover"
                    onError={(e) => {
                        e.currentTarget.onerror = null; // Prevent loop
                        e.currentTarget.src = '/default-image.png';
                    }}
                />
            </div>
            <div className='w-full md:w-1/3 flex flex-col items-center justify-center'>
                <div className='w-full flex items-center justify-center gap-4 text-xl'>
                    <button onClick={Backward}><IoPlaySkipBack /></button>
                    <button onClick={handlePlayPodcast}>
                        {isSongPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={Forward}><IoPlaySkipForward /></button>
                </div>
                <div className='w-full flex items-center justify-center mt-3'>
                    <input
                        type="range"
                        min="0"
                        max={Duration}
                        value={CurrentTime}
                        onChange={e => {
                            if (audioRef.current) {
                                audioRef.current.currentTime = e.target.value;
                                setCurrentTime(e.target.value);
                            }
                        }}
                        className='w-full hover:cursor-pointer'
                    />
                </div>
                <div className='w-full flex items-center justify-between text-sm'>
                    <span>{formatTime(CurrentTime)}</span>
                    <span>{formatTime(Duration)}</span>
                </div>
            </div>
            <div className='w-1/3 flex items-center justify-end'>
                <button onClick={closeAudioPlayerDiv}><ImCross /></button>
            </div>
            <audio ref={audioRef} src={songPath} />
        </div>
    );
};

export default AudioPlayer;
