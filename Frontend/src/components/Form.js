import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  console.log(display(children));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {display(children)}
    </form>
  );    

  function display(formContent) {
    if (Array.isArray(formContent)) {
      return formContent.map(element => { //Por cada elemento de formContent, voy a iterar hasta el final y crear un nuevo objeto react
        return iterar(element); //Termino devolvienro un nuevo array con elementos tuneados a React
      });
    } else
      return iterar(formContent);
  }

  function iterar(element) {  //Tiene que llegar hasta el fondo y al hijo sin hijos ponerle el register
    if (tieneHijos(element)){
      
      if (tieneMasDeUnHijo(element)) {
        var nuevosHijos = element.props.children.map(element => {
          return iterar(element);          
        })
        return React.cloneElement(element, element.props, nuevosHijos);
      }
      else {
        var nuevoHijo = iterar(element.props.children);
        return React.cloneElement(element, element.props, nuevoHijo);
      }
          
    } else {
      return getElementSinHijos(element);
    }
  }
  
  function tieneMasDeUnHijo(element){
    return Array.isArray(element.props.children);
  }

  function tieneHijos(element){
    return element.props && element.props.children;
  }

  // function display(formContent) {
    
  //   if (Array.isArray(formContent))
  //     formContent = React.createElement("div", {}, formContent);
    
  //   return getElementsWithChilds(formContent);
  // }  

  function getElementsWithChilds(element) {
    
    if (Array.isArray(element.props.children)) {

      var newChildren = element.props.children.map(child => {
        return getElementSinHijos(child);
      });            
      return React.cloneElement(element, element.props, newChildren);

    }
    else{

      return getElementSinHijos(element);

    }      
  }

  function getElementSinHijos(element) {
    if (element.props && element.props.name)
      return React.createElement(element.type, {
              ...{
                ...element.props,
                register: methods.register,
                key: element.props.name
              }
            })
    else
      return element;
  }
}