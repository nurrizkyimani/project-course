import React, { useEffect, useState } from "react";
import axios from "axios";
import { history } from "history";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/review");
        // console.log(res.data.data);
        
        if (res.data) {
          setReviews(res.data.data);
          // console.log(reviews);
        }

        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    fetchdata();
  }, []);
  
  // console.log("reviews", reviews);

  return (
    <div className="flex w-full justify-around flex-wrap bg-gray-100">
      {reviews.map((rev) => (
        <div
          className="container max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-5 px-6 py-5"
          key={rev._id}
          
        >
          <h1 className=" text-2xl font-bold text-gray-700 border-b  pb-2 border-gray-300">
            {rev.course}
          </h1>

          <div className="items-center mt-4 text-gray">
            <h1 className="text-md">Id</h1>
            <h3 className="text-gray-600 ml-3">{rev._id}</h3>
        
          </div>

          <div className="items-center mt-4 text-gray">
            <h1 className="text-md">Instructor</h1>
            <h3 className="text-gray-600 ml-3">{rev.instructor}</h3>
        
          </div>
          <div>
            <h1 className="text-md ">Faculty</h1>
            <h3 className="text-gray-600 ml-4 text-sm">{rev.major}</h3>
          </div>

          <div>
            <h1 className="text-md">Semester</h1>
            <h3 className="text-gray-600 ml-4 text-sm">{rev.semester}</h3>
          </div>
          <div>
            <h1 className="text-md">Year</h1>
            <h3 className="text-gray-600 ml-4">{rev.year}</h3>
          </div>

          <div>
            <h1 className="text-md">Rating</h1>
            <h3 className="text-gray-600  text-sm ml-4">{rev.ratings}</h3>
          </div>
          <div>
            <h5 className="text-md">Comment</h5>
            <p className="text-gray-600 text-sm">{rev.review}</p>
          </div>

          <div class=" py-4">
            {rev.tags.map(tag => (
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
