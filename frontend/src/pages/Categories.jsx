import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const cat = [
        {
            name: "Comedy",
            color: "bg-purple-200",
            to: "/categories/Comedy",
            img: "https://cdn.create.vista.com/downloads/b7cf25c7-8830-4920-80ec-99a05b2519ba_1024.jpeg"
        },
        {
            name: "Business",
            color: "bg-green-200",
            to: "/categories/Business",
            img: "https://dynamic.brandcrowd.com/template/preview/design/c8617fe9-6f83-4594-82fc-cde62e150da1?v=4&designTemplateVersion=2&size=design-preview-standalone-1x"
        },
        {
            name: "Education",
            color: "bg-red-200",
            to: "/categories/Education",
            img: "https://img.freepik.com/premium-vector/education-school-podcast-logo-design-vector-illustration-template_705052-1579.jpg"
        },
        {
            name: "Hobbies",
            color: "bg-zinc-200",
            to: "/categories/Hobbies",
            img: "https://sites.podcastpage.io/664cc9ad5c55feb9c159ba78/media/13e9d272fad4f8d319c2.jpg"
        },
        {
            name: "Government",
            color: "bg-indigo-200",
            to: "/categories/Government",
            img: "https://pbcdn1.podbean.com/imglogo/image-logo/15766608/Avenu_LocalGovernmentInsights_FinalArtboard_1-square_big.jpg"
        },
    ];

    return (
        <div className='h-screen lg:h-[78vh]'>
            <div className='px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {cat.map((items, i) => (
                    <Link
                        to={items.to}
                        key={i}
                        className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 transform cursor-pointer shadow-xl transition-all duration-300 relative h-[22vh] overflow-hidden`}
                    >
                        <div>{items.name}</div>
                        <div className='w-full flex items-center justify-end absolute -bottom-2 -right-2'>
                            <img
                                src={items.img}
                                alt={`${items.name} category`}
                                className='rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]'
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
