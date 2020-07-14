import React from "react";

export const InputDash = (props) => {

  

  return (
    <div className="md:flex md:items-start mb-6">
      <div className="md:w-1/5">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          /* for="inline-full-name" */
        >
          {props.label}
        </label>
      </div>
      <div className="md:w-2/3">
        {
          props.label == 'review' ? 
            <textarea
              class="bg-gray-200 rounded border-2 border-gray-200 leading-tight resize-none w-full  text-gray-700  h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:shadow-outline"
              name={props.nameprop}
              ref={props.referprop}
              placeholder='Type Your Comment'
              >
            </textarea>

          : <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inline-full-name"
              name={props.nameprop}
              ref={props.referprop}
            />
        } 
      </div>
    </div>
  );
};
