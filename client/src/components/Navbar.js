import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar navbar-dark navbar-expand-sm'>
            <h2 className='navbar-brand'>Stock Traderz</h2>
            <nav className='ml-auto'>
                <div>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/dashboard'>
                                <button className='btn btn-light btn-sm'>Portfolio</button>
                            </Link>
                        </li>
                        <li className='nav-item ml-auto'>
                            <Link className='nav-link' to='/trade'>
                                <button className='btn btn-light btn-sm'>Trade</button>
                            </Link>
                        </li>
                        <li className='nav-item ml-auto'>
                            <Link className='nav-link' to='/'>
                                <button className='btn btn-light btn-sm'>Log Out</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </nav>
    )
}

export default Navbar