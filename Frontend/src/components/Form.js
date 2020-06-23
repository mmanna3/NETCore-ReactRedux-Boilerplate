import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderElementsWithChilds(children)}
    </form>
  );

  function renderElementsWithChilds(element) {
    if (Array.isArray(element))
      return element.map(child => {
        return renderElement(child);
      })
    else
      return element;
  }

  function renderElement(child) {
    if (child.props.name)
      return React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
    else
      return child;
  }
}