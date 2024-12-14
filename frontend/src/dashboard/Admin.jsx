import React, { useState } from 'react';
import RenderAdminProfile from './components/RenderAdminProfile';
import RenderManageReview from './components/RenderManageReview';
import RenderManageUser from './components/RenderManageUser';
import RenderManageAdmin from './components/RenderManageAdmin';
import RenderManageTemplate from './components/RenderManageTemplate';
import RenderAddTemplate from './components/RenderAddTemplate';
import RenderProject from './components/RenderProject';
import RenderAdminHome from './components/RenderAdminHome';

const theme = {
    SidebarItems: 'font-display tracking-tight py-2 px-2 hover:rounded-l-xl hover:border hover:bg-zinc-800 cursor-pointer',
    HomeCards: 'w-1/2 mx-2 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10',
    HomeProject: 'px-5 bg-zinc-700 shadow-lg rounded-lg bg-zinc-900 py-10',
    ProjectCards: 'flex justify-around content-around items-center border rounded-xl bg-zinc-900',
}

function Admin() {

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
                            className={`${theme.SidebarItems} ${selectedItem === 'Add Template' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Add Template')}
                        >
                            Add Template
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Manage Templates' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Manage Templates')}
                        >
                            Manage Templates
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Manage User' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Manage User')}
                        >
                            Manage User
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Manage Admin' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Manage Admin')}
                        >
                            Manage Admin
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Manage Review' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Manage Review')}
                        >
                            Manage Review
                        </li>
                        <li
                            className={`${theme.SidebarItems} ${selectedItem === 'Manage Profile' ? 'bg-zinc-800 rounded-l-xl' : ''}`}
                            onClick={() => handleItemClick('Manage Profile')}
                        >
                            Manage Profile
                        </li>
                    </ul>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 bg-zinc-800 rounded-l-xl p-10">
                {selectedItem === 'Home' && <RenderAdminHome />}
                {selectedItem === 'Projects' && <RenderProject />}
                {selectedItem === 'Add Template' && <RenderAddTemplate />}
                {selectedItem === 'Manage Templates' && <RenderManageTemplate />}
                {selectedItem === 'Manage User' && <RenderManageUser />}
                {selectedItem === 'Manage Admin' && <RenderManageAdmin />}
                {selectedItem === 'Manage Review' && <RenderManageReview />}
                {selectedItem === 'Manage Profile' && <RenderAdminProfile />}
            </div>
        </div>
    )
}

export default Admin