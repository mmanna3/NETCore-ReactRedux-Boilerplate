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
    
    var a = e;

    if (typeof e.type === 'function'){        
      a = e.type(e.props);
    }

    if (a == null)
      return a;

    if (hasNoChildren(a)) //Si no tengo hijos convierto.
      return convertir(a);

    var children = getChildren(a);

    var newChildren = children.map((element, innerIndex) => {
      return procesar(element, index, innerIndex);
    })
    return React.cloneElement(a, {...{...a.props, key: `${index}-${innerIndex}`}}, newChildren);
      
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