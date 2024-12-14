import React from 'react'

function Collapse(props) {
    return (
        <div tabIndex={0} className="collapse collapse-plus font-display border border-zinc-800 bg-zinc-900">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-zinc-900 tracking-tight text-lg peer-checked:bg-[#004D43] peer-checked:text-white">
                {props.title}
            </div>
            <div tabIndex={0} className="collapse-content text-md peer-checked:bg-[#CDEA68] peer-checked:text-secondary-content">
                {props.description}
            </div>
        </div>
    )
}

export default Collapse