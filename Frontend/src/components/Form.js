import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit, resetOnChanged }) {
  const { handleSubmit, register, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset();
  }, [resetOnChanged, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {processContent(children)}
    </form>
  );

  function processContent(contenido) {
    if (Array.isArray(contenido)) {
      return processContentAsArray(contenido);
    } else
      return procesar(contenido);
  }

  function processContentAsArray(contenido){
    return contenido.map((element,index) => {
      return procesar(element, index);
    });
  }

  function procesar(e, index, innerIndex) {    
    if (hasNameProperty(e))
      return convertir(e);
    

    if (typeof e.type === 'function'){        
      e = e.type(e.props);
    }

    if (e == null)
      return e;

    if (hasNoChildren(e)) //Si no tengo hijos convierto.
      return convertir(e);

    var children = getChildren(e);

    var newChildren = children.map((element, innerIndex) => {
      return procesar(element, index, innerIndex);
    })
    
    return React.cloneElement(e, {...{...e.props, key: `${index}-${innerIndex}`}}, newChildren);
      
  }

  function hasNameProperty(e){
    return e.props && e.props.name;
  }

  function hasNoChildren(e) {
    return !e.props || !e.props.children
  }

  function getChildren(a) {
    var children = [];
    if (Array.isArray(a.props.children))
      children = a.props.children;
    else {
      children.push(a.props.children);
    }
    return children;
  }

  function convertir(e){
    if (e.props && e.props.name)
      return React.createElement(e.type, {
        ...{
          ...e.props,
          register: register(),
          key: e.props.name
        }
      });
    else
      return e;
  }
}