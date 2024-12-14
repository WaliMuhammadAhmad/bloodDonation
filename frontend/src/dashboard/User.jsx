import React, { useState } from 'react';
import RenderUserProfile from './components/RenderUserProfile';
import RenderReview from './components/RenderReview';
import RenderUserProjects from './components/RenderUserProjects';
import RenderUserHome from './components/RenderUserHome';

const theme = {
    SidebarItems: 'font-display tracking-tight py-2 px-2 hover:rounded-l-xl hover:border hover:bg-zinc-800 cursor-pointer',
    HomeCards: 'w-1/2 mx-2 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10',
    HomeProject: 'px-5 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10',
    ProjectCards: 'flex justify-around items-center border rounded-xl bg-zinc-900',
}

function User() {
    const [selectedItem, setSelectedItem] = useState('Home');

    // Function to handle sidebar item click
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-zinc-900 text-white w-64 flex-shrink-0">
                <div className="py-6 pl-6 flex flex-col">
                    <h2 className="font-condensed lg:text-5xl sm:text-2xl font-bold">Dashboard</h2>
                    <ul className="mt-6">
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Home' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Home')}
                        >
                            Home
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Projects' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Projects')}
                        >
                            Projects
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Review' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Review')}
                        >
                            Review
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Profile' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Profile')}
                        >
                            Profile
                        </li>
                    </ul>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 bg-zinc-800 rounded-l-xl p-10">
                {selectedItem === 'Home' && <RenderUserHome />}
                {selectedItem === 'Projects' && <RenderUserProjects />}
                {selectedItem === 'Review' && <RenderReview />}
                {selectedItem === 'Profile' && <RenderUserProfile />}
            </div>
        </div>
    );
}

export default User;