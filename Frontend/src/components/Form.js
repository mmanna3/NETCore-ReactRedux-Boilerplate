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
      return processElement(contenido);
  }

  function processContentAsArray(contenido){
    return contenido.map((element,index) => {
      return processElement(element, index);
    });
  }

  function processElement(e, index, innerIndex) {
    
    if (e.props && e.props.name) {
      return React.createElement(e.type, {
              ...{
                ...e.props,
                register: register(),
                key: e.props.name
              }
            })
    } else if (hasChildren(e)){
      
      if (hasMoreThanOneChild(e)) {
        var newChildren = e.props.children.map((element, innerIndex) => {
          return processElement(element, index, innerIndex);
        })
        return React.cloneElement(e, {...{...e.props, key: `${index}-${innerIndex}`}}, newChildren);
      }
      else {
        var newChild = processElement(e.props.children, index);
        return React.cloneElement(e, {...{...e.props, key: `${index}-${innerIndex}-i`}}, newChild);
      }

    } else {
      return e;
    }
  }
  
  function hasMoreThanOneChild(e){
    return Array.isArray(e.props.children);
  }

  function hasChildren(e){
    return e.props && e.props.children;
  }
}