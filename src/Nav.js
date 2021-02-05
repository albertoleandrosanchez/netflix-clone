import React, {useState,useEffect} from 'react'
import './Nav.css'


function Nav() {

    const [show,handleShow] = useState(false);

    useEffect(() => {
        console.log('a');
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){
                handleShow(true);
            }
            else{
                handleShow(false)
            }
        })
        return () => {
            console.log('show');
            //window.removeEventListener('scroll');
        }
    }, []);
    /*  
        Esto carga una sola vez cuando renderiza el nav
        el removeEventLister es por si las dudas que si se trigerea otra vez, no acumulen los eventlisteners 
    */

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img
                className='nav__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png'
                alt='Netflix Logo'
            />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='Netflix Avatar'
            />
        </div>
    )
}

export default Nav
