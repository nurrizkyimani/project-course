import React, { useState } from "react";
import { useForm } from "react-hook-form";

function DashboardPage() {
  const [email, setEmail] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>semester</label>
        <input name="example" ref={register} />

        <label>major</label>
        <input name="amjor" ref={register({ required: true })} />

        <label>course</label>
        <input name="course" ref={register} required />

        <label>year</label>
        <input name="year" ref={register} required />

        <label>teacher</label>
        <input name="techer" ref={register} required />

        <label>ratings</label>
        <input name="ratings" ref={register} required />

        <label>status</label>
        <input name="status" ref={register} required />

        <label>tags</label>
        <input name="tags" ref={register} required />

        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
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
