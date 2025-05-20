import React from 'react'
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaPause } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';


const AudioPlayer = () => {
    const dispatch = useDispatch()
    const PlayerDivState = useSelector((state) => state.player.isPlayerDiv)
    const songPath = useSelector((state) => state.player.songPath)
    const img = useSelector((state) => state.player.img)

    const closeAudioPlayerDiv = (e) => {
        e.preventDefault()
        dispatch(playerActions.closeDiv())
        dispatch(playerActions.changeImage(""))
        dispatch(playerActions.changeSong())
    }
    return (
        <div className={`${PlayerDivState ? "fixed" : "hidden"} bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}>
            <div className='hidden md:block w-1/3'>
                <img src={img} alt='' className={`size-12 rounded-full object-cover`} />
            </div>
            <div className='w-full md:w-1/3 flex flex-col items-center justify-center'>
                <div className='w-full flex items-center justify-center gap-4 text-xl'> 
                    <button><IoPlaySkipBack />
                    </button>
                    <button><FaPause />
                    </button>
                    <button><IoPlaySkipForward />
                    </button> 
                </div>
                <div className='w-full flex items-center justify-center mt-3'>
                    <input type="range" min="0" max="100" className='w-full hover:cursor-pointer' />
                </div>
                <div className='w-full flex items-center justify-between text-sm'>
                    <span>0:00</span>
                    <span>3:00</span>
                </div>
            </div>
            <div className='w-1/3 flex items-center justify-end'>
                <button onClick={closeAudioPlayerDiv}><ImCross /></button>
            </div>
            <audio src={songPath} />
        </div>
    )
}

export default AudioPlayer
