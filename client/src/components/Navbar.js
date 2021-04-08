import React from 'react';

function Navbar() {
    return (
        <nav className='navbar navbar-dark mr-auto'>
            <h2 className='navbar-brand'>Stock Traderz</h2>
            <nav className='ml-auto'>
                <button>Portfolio</button>
                <button>Trade</button>
                <button>Log Out</button>
            </nav>
        </nav>
    )
}

export default Navbar