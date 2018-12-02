//surveys field contain logic to render a single label and text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
