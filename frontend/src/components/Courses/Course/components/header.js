import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const HeaderCourse = () => (
  <header className="pb-2">
    <button
      type="button"
      className="bg-white rounded d-flex align-items-center"
    >
      <KeyboardBackspaceIcon className="text-dark" />
      Back
    </button>
  </header>
);

export default HeaderCourse;
