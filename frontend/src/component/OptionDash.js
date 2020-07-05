import React from "react";

const optionDash = (props) => {
  console.log("props");
  console.log(props.listprop);

  const content = props.listoptions.map((post) =>

    <option value="post.key">{post.value}</option>
  
  );


  return (
    <div className="md:flex md:items-center mb-6">
      <div class="md:w-1/5">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          {props.label}
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inline-full-name"
          name={props.nameprop}
          ref={props.referprop}
        >
        if(props.listoptions){
          content
        }
          <option>
            Really long option that will likely overlap the chevron
          </option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>
  );
};

export default optionDash;
