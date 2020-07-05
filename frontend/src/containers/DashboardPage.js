import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputDash } from "../component/InputDash";
import OptionDash from "../component/OptionDash";

function DashboardPage() {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  const options = [{ key: "semester2", value: "Semester 2" }]


  return (
    <div className="flex justify-center h-screen flex-col">
      <div className=" container mx-auto w-full max-w-4xl m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <InputDash
            label="semesterss"
            nameprop="semester"
            referprop={register}
          />

          <OptionDash
            listoptions={options}
            label="semestersssssssss"
            nameprop="semester"
            referprop={register({ required: true })}
          />

          <InputDash label="course" nameprop="course" referprop={register} />

          <InputDash label="year" nameprop="year" referprop={register} />

          <InputDash
            label="instructor"
            nameprop="instructor"
            referprop={register}
          />
          <InputDash label="ratings" nameprop="ratings" referprop={register} />

          <InputDash label="status" nameprop="status" referprop={register} />

          <InputDash label="tags" nameprop="tags" referprop={register} />

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
