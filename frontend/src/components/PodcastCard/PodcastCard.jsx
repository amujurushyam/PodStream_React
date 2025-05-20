import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { playerActions } from '../../store/player';

const PodcastCard = ({ items }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handlePlay = (e) => {
        e.preventDefault(); // prevent Link redirect if playing
        if (isLoggedIn) {
            dispatch(playerActions.setDiv());
            dispatch(playerActions.changeImage(`http://localhost:1000/${items.frontImage}`));
            dispatch(playerActions.changeSong(`http://localhost:1000/${items.audioFile}`));
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
            <Link to={`/description/${items._id}`}>
                <div>
                    <img
                        src={`http://localhost:1000/${items.frontImage}`}
                        alt={items.title}
                        className="rounded size-[42vh] object-cover w-full"
                    />
                </div>
                <div className="mt-2 text-xl font-bold">
                    {items.title.slice(0, 20)}
                </div>
                <div className="mt-2 leading-5 text-slate-500">
                    {items.description.slice(0, 50)}
                </div>
                <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
                    {items.category?.categoryName}
                </div>
            </Link>

            <button
                onClick={handlePlay}
                className="bg-green-900 text-white px-4 py-2 rounded mt-3 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
            >
                Play Now
            </button>
        </div>
    );
};

export default PodcastCard;
