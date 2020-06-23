import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getElementsWithChilds(children)}
    </form>
  );

  function getElementsWithChilds(element) {
    
    if (Array.isArray(element))
      return element.map(child => {
        return getElementsWithChilds(child);
      })
    else if (Array.isArray(element.props.children)) {
      var newChildren = element.props.children.map(child => {
        return getElementSinHijos(child);
      });
      return React.cloneElement(element, element.props, newChildren);
    }
    else
      return getElementSinHijos(element);
  }

  function getElementSinHijos(element) {
    if (element.props.name)
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