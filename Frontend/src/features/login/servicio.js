export const actualizarUsuarioEnLocalStorage = (usuario) => {    
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.getItem('user'); //Raro, pero necesario. A veces tarda en actualizarlo.
}