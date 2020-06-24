import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  console.log('atroden del form');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {procesarContenido(children)}
    </form>
  );    

  function procesarContenido(contenido) {
    if (Array.isArray(contenido)) {
      return procesarContenidoComoArray(contenido);
    } else
      return convertirEnInputSiCorresponde(contenido);
  }

  function procesarContenidoComoArray(contenido){
    return contenido.map((element,index) => {
      return convertirEnInputSiCorresponde(element, index);
    });
  }

  function convertirEnInputSiCorresponde(e, index, innerIndex) {
    if (tieneHijos(e)){
      
      if (tieneMasDeUnHijo(e)) {
        var nuevosHijos = e.props.children.map((element, innerIndex) => {
          return convertirEnInputSiCorresponde(element, index, innerIndex);
        })
        return React.cloneElement(e, {...{...e.props, key: `${index}-${innerIndex}`}}, nuevosHijos);
      }
      else {
        var nuevoHijo = convertirEnInputSiCorresponde(e.props.children, index);
        return React.cloneElement(e, {...{...e.props, key: `${index}-${innerIndex}-i`}}, nuevoHijo);
      }

    } else {
      return convertirElementoEnInputsDelForm(e);
    }
  }
  
  function tieneMasDeUnHijo(e){
    return Array.isArray(e.props.children);
  }

  function tieneHijos(e){
    return e.props && e.props.children;
  }

  function convertirElementoEnInputsDelForm(e) {
    if (e.props && e.props.name)
      return React.createElement(e.type, {
              ...{
                ...e.props,
                register: methods.register,
                key: e.props.name
              }
            })
    else
      return e;
  }
}