import React, { useEffect, useState } from "react";

const HomePage = () => {
  const reviewMain = [
    {
      user: 123123123,
      course: "calculus",
      major: "compsci",
      semester: "semester_1",
      year: 2020,
      teacher: "daljo",
      ratings: 3,
      review: "enak abis bos",
      status: "public",
      createdAt: Date.now(),
    },
    {
      user: 1231231231,
      course: "calculus",
      major: "compsci",
      semester: "semester_1",
      year: 2020,
      teacher: "daljo",
      ratings: 3,
      review: "enak abis bos",
      status: "public",
      createdAt: Date.now(),
    },
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(reviewMain);
  }, [reviews]);

  return (
    <div>
      <h1>This is homepage</h1>
      <div className="flex justify-around ">
        {reviews.map((review) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            test {review.user} dan {review.course}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
