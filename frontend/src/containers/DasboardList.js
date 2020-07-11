import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useHistory } from 'react-router-dom'

const DasboardList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  // console.log(user);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchdata = async (req) => {
      console.log(user);
      try {
        const url = `http://localhost:3000/review/user/${user._id}`;
        setLoading(true);
        console.log(url);
        const res = await axios.get(url);
        // console.log(res.data.data);
        if (res.data != null) {
          setLoading(false);
        }
        if (res.data) {
          setReviews(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, [user]);

  const clickDetail = (userId) => {
    console.log(userId);
    history.push(`/dashboard/${userId}`);
  };

  console.log("reviews", reviews);

  return (
    <div className="flex w-full justify-around flex-wrap">
      {reviews.map((rev) => (
        <div
          className="container max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 px-4 py-5"
          key={rev._id}
          onClick={(e) => clickDetail(rev._id)}
        >
          <p className="py-2 text-lg text-gray-700">
            {rev.course} ini id course kae {rev._id}
          </p>

          <div className="flex items-center mt-4 text-gray">
            <h1 className="text-md">Instructor : </h1>
            <h3 className="text-gray-600">{rev.instructor}</h3>
            {rev.user}
          </div>
          <div>
            <h1 className="text-md">Faculty</h1>
            <h3 className="text-gray-600">{rev.ratings}</h3>
          </div>

          <div>
            <h1 className="text-md">Semester</h1>
            <h3 className="text-gray-600">{rev.semester}</h3>
          </div>
          <div>
            <h1 className="text-md">Year</h1>
            <h3 className="text-gray-600">{rev.year}</h3>
          </div>

          <div>
            <h1 className="text-md">Rating</h1>
            <h3 className="text-gray-600">{rev.ratings}</h3>
          </div>
          <div>
            <h5 className="text-md">Comment</h5>
            <p className="text-gray-600 text-sm">{rev.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DasboardList;
