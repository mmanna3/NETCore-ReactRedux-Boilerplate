import React from "react";

export default function ValidationSummary({ errors }) {

  function errorsList() {
    var result = [];

    for (var key in errors)
      result.push(<li key={key}>{errors[key]}</li>);

    return result;
  }

  if (errors !== undefined)
    return (
      <div className="notification is-danger is-light">
        <div className="content">
          {errorsList()}
        </div>
      </div>
    );

  return null;
}