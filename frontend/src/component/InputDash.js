import React from "react";

export const InputDash = (props) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/5">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          /* for="inline-full-name" */
        >
          {props.label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inline-full-name"
          name={props.nameprop}
          ref={props.referprop}
        />
      </div>
    </div>
  );
};
