import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    const toProtectedRoutes = () => {
        const checkLocalStorage = localStorage.getItem('userId');
        if (checkLocalStorage == null) {
            alert('Please login or sign up to continue.')
        } else {
            return
    }
}

    return (
        <nav className='navbar navbar-dark navbar-expand-sm'>
            <h2 className='navbar-brand'>Moon Traders</h2>
            <nav className='ml-auto'>
                <div>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/dashboard'>
                                <button onClick={() => { toProtectedRoutes() }} className='btn btn-light btn-sm'>Portfolio</button>
                            </Link>
                        </li>
                        <li className='nav-item ml-auto'>
                            <Link className='nav-link' to='/trade'>
                                <button onClick={() => { toProtectedRoutes() }} className='btn btn-light btn-sm'>Trade</button>
                            </Link>
                        </li>
                        <li className='nav-item ml-auto'>
                            <Link className='nav-link' to='/'>
                                <button onClick={() => localStorage.clear()} className='btn btn-light btn-sm'>Log Out</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </nav>
    )
}

export default Navbar