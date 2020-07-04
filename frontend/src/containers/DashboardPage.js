import React, { useState } from "react";
import { useForm } from "react-hook-form";

function DashboardPage() {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center h-screen flex-col">
      <div className=" container mx-auto w-full max-w-4xl m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <div className="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Semester
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="inline-full-name"
                name="example"
                ref={register}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div class="md:w-1/5">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Major
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="inline-full-name"
                name="major"
                ref={register({ required: true })}
              />
            </div>
          </div>

          <div>
            <label>course</label>
            <input name="course" ref={register} required />
          </div>

          <div>
            <label>year</label>
            <input name="year" ref={register} required />
          </div>

          <div>
            <label>teacher</label>
            <input name="techer" ref={register} required />
          </div>
          <div>
            <label>ratings</label>
            <input name="ratings" ref={register} required />
          </div>
          <div>
            <label>status</label>
            <input name="status" ref={register} required />
          </div>
          <div>
            <label>tags</label>
            <input name="tags" ref={register} required />
          </div>
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;

//user
//course
//major
//semester
// year
// teacher
// ratings
// Review
// status
// tags
