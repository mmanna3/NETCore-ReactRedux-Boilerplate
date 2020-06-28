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
    var a = e;

    if (typeof e.type === 'function'){        
      a = e.type(e.props);
    }

    if (a == null)
      return a;

    if (!a.props || !a.props.children || e.props.name) //Si no tengo hijos convierto.
      return convertir(e);

    var children = [];
    if (Array.isArray(a.props.children))
      children = a.props.children;
    else {
      children.push(a.props.children);
    }

    var newChildren = children.map((element, innerIndex) => {
      return procesar(element, index, innerIndex);
    })
    return React.cloneElement(a, {...{...a.props, key: `${index}-${innerIndex}`}}, newChildren);
      
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