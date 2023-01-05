import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
//import logo from './images/logo.png'
import logo from '../../images/E-FLANELINHA2.png';
import './menu.css';

const Menu = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src={logo} alt='logo' />
                </a>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <a href='/about' onClick={closeMenu}>Detalhes</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#' onClick={closeMenu}>Entrar</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#testimonials' onClick={closeMenu}>Cadastrar Vagas</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#demo' onClick={closeMenu}>Consultar Vagas</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu;