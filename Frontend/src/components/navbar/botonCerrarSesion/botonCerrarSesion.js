import React from 'react'

const BotonCerrarSesion = () => {

    function onClick() {
        localStorage.removeItem('user');
    }
    
    return (
        <>
            <a className="button is-primary is-hidden-touch is-inverted is-outlined" onClick={onClick} href="/">
                Cerrar sesión
            </a>
            <a className="button is-primary is-hidden-desktop" onClick={onClick} href="/">
                Cerrar sesión
            </a>
        </>
    );
}

export default BotonCerrarSesion;