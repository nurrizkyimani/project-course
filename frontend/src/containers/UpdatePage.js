import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputDash } from "../component/InputDash";
import OptionDash from "../component/OptionDash";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

function UpdatePage(props) {
  const location = useLocation();
  const { id } = useParams()
  const [urlSubmit, setUrlSubmit] = useState(`http://localhost:3000/review/submit`);
  const [restMethod, setRestMethod] = useState("POST");
  const [submitValue, setSubmitValue] = useState("");

  const data = () => {
    if (location.state != undefined) {
      return {
        course: location.state.params.course ,
        instructor: location.state.params.instructor || "",
        major: location.state.params.major || "",
        year: location.state.params.year || null, 
        status: location.state.params.status || 'private' ,
        ratings: location.state.params.ratings || 4,
        review: location.state.params.review || "",
        tags: location.state.params.tags || []
      }
    } else {
      return {}
    }
  }

  // console.log('data is ' , data());

  // console.log(location);
  
  // console.log('preloded', preloaded);

  // console.log('set', urlSubmit, restMethod);

    useEffect(() => {
      console.log('location exist');
      if (location.state == undefined) {
        setUrlSubmit(`http://localhost:3000/review/submit`)
        setRestMethod("POST")
        setSubmitValue("Submit")
      } else {
        if (location.state.isUpdate) {
          setUrlSubmit(`http://localhost:3000/review/${id}`)
          setRestMethod("PUT")
          setSubmitValue("Update")
        }
      }
      
    },[location])

  const options = [
    { key: "semester_1", value: "Semester 1" },
    { key: "semester_2", value: "Semester 2" },
    { key: "semester_3", value: "Semester 3" },
    { key: "semester_4", value: "Semester 4" },
    { key: "semester_5", value: "Semester 5" },
    { key: "semester_6", value: "Semester 6" },
    { key: "semester_7", value: "Semester 7" },
    { key: "semester_8", value: "Semester 8" },
  ];

  const statuses = [
    { key: "public", value: "public" },
    { key: "private", value: "private" },
  ];

  const ratings = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 },
  ];

  const { register, handleSubmit, watch, errors } = useForm({ defaultValues: data() });


  const onSubmit = async (data) => {
    const realdata = {
      course: data.course,
      major: data.major,
      semester: data.semester,
      year: data.year,
      instructor: data.instructor,
      ratings: data.ratings,
      review: data.review,
      status: data.status,
      tags: data.tags,
    };

    fetch(urlSubmit, {
      method: restMethod,
      body: JSON.stringify(realdata),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((res) => {
        console.log("ini result");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className="flex justify-center h-screen flex-col bg-gray-200">
      <div className=" container mx-auto w-full max-w-3xl m-auto">
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-center bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <OptionDash
            listoptions={statuses}
            label="Status"
            nameprop="status"
            referprop={register({ required: true })}
          />

          <OptionDash
            listoptions={options}
            label="Semesters"
            nameprop="semester"
            referprop={register({ required: true })}
          />

          <InputDash
            label="course"
            nameprop="course"
            referprop={register}
          />

          <InputDash
            label="year"
            nameprop="year"
            referprop={register}
          />

          <InputDash
            label="instructor"
            nameprop="instructor"
            referprop={register}
          />

          <InputDash
            label="Major"
            nameprop="major"
            referprop={register}
          />

          <OptionDash
            listoptions={ratings}
            label="Ratings"
            nameprop="ratings"
            referprop={register({ required: true })}
          />

          <InputDash
            label="review"
            nameprop="review"
            referprop={register}
          />

          <InputDash
            label="tags"
            nameprop="tags"
            referprop={register}
          />

          {errors.exampleRequired && <span>This field is required</span>}

          <div className="flex items-center justify-between pt-2">
            <input type="text" />
            <input className='p-2 px-4 rounded-lg text-lg hover:bg-gray-400 text-gray-800'
              type="submit"
              value={submitValue}
            />
            
          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdatePage;

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
