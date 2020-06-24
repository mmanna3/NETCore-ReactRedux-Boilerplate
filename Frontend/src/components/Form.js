import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {procesarContenido(children)}
    </form>
  );    

  function procesarContenido(contenido) {
    if (Array.isArray(contenido)) {
      return contenido.map(element => {
        return convertirElementosSinHijosEnInputsDelForm(element);
      });
    } else
      return convertirElementosSinHijosEnInputsDelForm(contenido);
  }

  function convertirElementosSinHijosEnInputsDelForm(e) {
    if (tieneHijos(e)){
      
      if (tieneMasDeUnHijo(e)) {
        var nuevosHijos = e.props.children.map(element => {
          return convertirElementosSinHijosEnInputsDelForm(element);          
        })
        return React.cloneElement(e, e.props, nuevosHijos);
      }
      else {
        var nuevoHijo = convertirElementosSinHijosEnInputsDelForm(e.props.children);
        return React.cloneElement(e, e.props, nuevoHijo);
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