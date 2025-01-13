import React, { useEffect, useState } from "react";
import Header from "./Header";
import BucketImageFirst from "../../assets/bucketimageFirst.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import { useDispatch, useSelector } from "react-redux";
import ProfilePageHeaderData from "./ProfilePageHeaderData";
import { getAllBucketLists } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import dotThree from "../../assets/dotthree.png";
const apiUrl = import.meta.env.VITE_API_URL;

const bucketListData = [
  {
    title: "Generic Bucket List",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Connection Bucket List",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Day Travel Buddies",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Royal Travel Buddies",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
];

const BucketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allBucketLists } = useSelector((state) => state.postSlice);
  const [resultdata, setResultdata] = useState([]);

  useEffect(() => {
    if (!allBucketLists) {
      dispatch(getAllBucketLists());
    }
  }, [dispatch, allBucketLists]);

  console.log("allBucketLists", allBucketLists);

  // Show only first 2 bucket or all buckets based on state

  const handleBucketClick = (bucket) => {
    navigate(`/profile/${bucket}`);
  };

  const handleBucketRemove = async (bucketTitle) => {
    //console.log("=====list_name====>", bucketTitle);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/post/delete-bucket/${bucketTitle}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Read response body as text or JSON once
        const errorData = await response.json();
        console.error("Error deleting bucket:", errorData);
        return; // Stop further execution
      }

      // Success case
      const data = await response.json();
      if (data.status == true) {
        dispatch(getAllBucketLists());
        //navigate('/bucketlist');
      }
      console.log("Bucket removed successfully:", data);
    } catch (error) {
      console.error("Error in handleBucketRemove:", error.message);
    }
  };
  // format in format for dob like 25 Aug 2002 and for joined Feb 2022
  function formatDate(isoDate) {
    const date = new Date(isoDate);

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate(); // Day of the month
    const month = months[date.getUTCMonth()]; // Full month name
    const shortMonth = month.slice(0, 3); // Abbreviated month name
    const year = date.getUTCFullYear(); // Full year

    return `${day} ${shortMonth} ${year}`; // Example: 25 Aug 2002
  }

  const RemoveIconData =
    "https://cdn2.iconfinder.com/data/icons/medical-and-health-2-16/65/64-512.png";

  return (
    <>
      <Header />
      <ProfilePageHeaderData />
      <div className="min-h-screen bg-[#F0F7F7] p-4">
        <div className="container mx-auto flex flex-col gap-3">
          <p
            className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 27L13.5 18L22.5 9"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your Bucket list
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 h-auto">
            {allBucketLists &&
              allBucketLists?.map((bucket, index) => {
                const images = bucket.media_url ? bucket.media_url : [];
                //console.log(images.length);
                return (
                <div key={bucket?.id} className="relative">
                  <button
                    className="absolute bottom-2 right-0 text-white cursor-pointer rounded-[8px] px-4 p-1 z-10"
                    onClick={() => handleBucketRemove(bucket.list_name)}
                  >
                    <img
                      src={RemoveIconData}
                      alt="Remove Icon"
                      className="w-7 h-7"
                    />
                  </button>
                  <div
                    className="bg-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-3 md:p-4 cursor-pointer"
                    onClick={() => handleBucketClick(bucket.list_name)}
                  >
                    {images && images.length > 0 && (
                      <>
                        {images.length >= 3 ? (
                          // 3 or more images layout
                          <div className="grid grid-cols-2 gap-2">
                            {/* Large Image/Video */}
                            <div>
                              {/\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                                images[0]
                              ) ? (
                                <video
                                  src={images[0]}
                                  className="w-full h-[329px] object-cover rounded-md"
                                  controls
                                  controlsList="nodownload"
                                />
                              ) : (
                                <img
                                  src={images[0]}
                                  alt={bucket.list_name}
                                  className="w-full h-[329px] object-cover rounded-md"
                                />
                              )}
                            </div>

                            {/* Small Images/Videos */}
                            <div className="grid grid-rows-2 gap-2">
                              {images
                                .slice(1, 3)
                                .map((image, idx) =>
                                  /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                                    image
                                  ) ? (
                                    <video
                                      key={idx}
                                      src={image}
                                      className="w-full h-full md:h-[160px] object-cover rounded-md"
                                      controls
                                      controlsList="nodownload"
                                    />
                                  ) : (
                                    <img
                                      key={idx}
                                      src={image}
                                      alt={`${bucket.list_name} - small ${
                                        idx + 1
                                      }`}
                                      className="w-full h-full md:h-[160px] object-cover rounded-md"
                                    />
                                  )
                                )}
                            </div>
                          </div>
                        ) : images.length === 2 ? (
                          // 2 images layout
                          <div className="flex gap-2">
                            {images.map((image, idx) =>
                              /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                                image
                              ) ? (
                                <video
                                  key={idx}
                                  src={image}
                                  className="w-1/2 h-[329px] object-cover rounded-md"
                                  controls
                                  controlsList="nodownload"
                                />
                              ) : (
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`${bucket.list_name} - image ${idx + 1}`}
                                  className="w-1/2 h-[329px] object-cover rounded-md"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          // 1 image/video layout
                          <div>
                            {/\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                              images[0]
                            ) ? (
                              <video
                                src={images[0]}
                                className="w-full h-[329px] object-cover rounded-md"
                                controls
                                controlsList="nodownload"
                              />
                            ) : (
                              <img
                                src={images[0]}
                                alt={bucket.list_name}
                                className="w-full h-[329px] object-cover rounded-md"
                              />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Title */}
                    <p className="font-poppins font-semibold text-[14px] md:text-[16px] text-[#212626] text-left mt-2">
                      {/* {bucket.list_name} */}
                      {bucket.list_name &&
                        bucket.list_name.charAt(0).toUpperCase() +
                          bucket.list_name.slice(1)}
                    </p>
                  </div>
                </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BucketList;
