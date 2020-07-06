import React from "react";

const optionDash = (props) => {
  const content = props.listoptions.map((post) => (
    <option key={post.key} value={post.key}>
      {post.value}
    </option>
  ));

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
        <select
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inline-full-name"
          name={props.nameprop}
          ref={props.referprop}
        >
          if(props.listoptions){content}
        </select>
      </div>
    </div>
  );
};

export default optionDash;
