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
    } else {
      // Process data only once after fetching
      const processedData = allBucketLists.map((bucket) => ({
        ...bucket,
        images: bucket.media_url ? JSON.parse(bucket.media_url) : [], // Parse images only if necessary
      }));

      setResultdata(processedData);
    }
  }, [allBucketLists, dispatch]); //

 // console.log("check data", resultdata);

  const handleBucketClick = (bucket) => {
    navigate(`/profile/${bucket}`);
  };

  const handleBucketRemove = async(bucketTitle)=>{
    //console.log("=====list_name====>", bucketTitle);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/delete-bucket/${bucketTitle}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        // Read response body as text or JSON once
        const errorData = await response.json();
        console.error("Error deleting bucket:", errorData);
        return; // Stop further execution
      }
  
      // Success case
      const data = await response.json();
      if(data.status == true){
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
  return (
    <>
      <Header />
      <ProfilePageHeaderData />
      <div className="min-h-screen bg-[#F0F7F7] p-4">
        <div className="container mx-auto flex flex-col gap-3">
          <p className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => navigate("/profile")}
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

          {/* <div className="container mx-auto flex gap-5">
            
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {resultdata &&
                  resultdata.map(
                    (post, index) =>
                      post.images.length > 0 && (
                        <div
                          key={post?.id}
                          className="h-[588px] bg-white relative rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 mb-4"
                        >
                          <div className="flex items-center mb-4">
                            <img
                              src={post?.profile_image || dummyUserImage}
                              alt="User Avatar"
                              className="w-[44px] h-[44px] rounded-full"
                            />
                            <div className="ml-3 w-full">
                              <div className="flex items-center justify-between">
                                <h4 className="font-poppins text-[20px] text-[#212626] font-semibold flex items-center gap-[5px]">
                                  {post.user_name}
                                  <span className="ml-1 text-blue-500 text-xs">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 0L14.2547 3.01208L15.7994 9.78017L11.4711 15.2078H4.52893L0.200577 9.78017L1.74535 3.01208L8 0Z"
                                        fill="#9747FF"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.6843 5.53463C11.8633 5.71362 11.8633 6.00382 11.6843 6.18281L7.40656 10.4606C7.22757 10.6396 6.93736 10.6396 6.75837 10.4606L4.31393 8.01615C4.13494 7.83716 4.13494 7.54696 4.31393 7.36797C4.49292 7.18898 4.78312 7.18898 4.96211 7.36797L7.08246 9.48832L11.0362 5.53463C11.2151 5.35564 11.5053 5.35564 11.6843 5.53463Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </span>
                                </h4>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                    stroke="#212626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                    stroke="#212626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                    stroke="#212626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p className="text-left text-[14px] text-[#667877] font-inter font-medium -mt-1">
                                
                                {post?.badge.split("-")[0]}{" "}
                                {post?.location &&
                                  post?.badge.split("-")[0] &&
                                  "•"}{" "}
                                {post?.location}
                              </p>
                            </div>
                          </div>
                          {post.images[0].match(
                            /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/
                          ) ? (
                            <video
                              src={post.images[0]}
                              alt="Post"
                              className="w-full rounded-[5px] h-[432px] object-cover"
                              controls
                              controlsList="nodownload"
                            />
                          ) : (
                            <img
                              src={post.images[0]}
                              alt="Post"
                              className="w-full rounded-[5px] h-[432px] object-cover"
                            />
                          )}
                          <div className="mt-4 text-sm flex justify-between items-center text-gray-600">
                            <div className="flex items-center gap-3 text-[12px] text-[#667877] font-inter font-medium">
                              <span>{post.list_name}</span>
                            </div>
                            <div className="text-right text-[12px] text-[#667877] font-inter font-medium">
                              {formatDate(post?.created_at)}
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-8">
            {resultdata.map((bucket, index) => (
              <div
              >
                <button onClick={()=>handleBucketRemove(bucket.list_name)}>Remove</button>
                <div onClick={() => handleBucketClick(bucket.list_name)}  key={index}
                className="bg-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 grid grid-cols-2 gap-2 cursor-pointer">
                {/* Large Image */}
                <div className="">
                  {/* <img
                    src={bucket.images[0]}
                    alt={bucket.list_name}
                    className="w-full h-full object-cover rounded-md"
                  /> */}
                  {bucket.images && bucket.images.length > 0 ? (
                    // Check if the first image is a video file
                    /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                      bucket.images[0]
                    ) ? (
                      <video
                        src={bucket.images[0]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                        controls
                        controlsList="nodownload"
                      />
                    ) : (
                      <img
                        src={bucket.images[0]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )
                  ) :null}
                </div>

                {/* Small Images */}
                <div className="grid grid-rows-2 gap-2">
                  {/* <img
                    src={bucket.images[1]}
                    alt={`${bucket.list_name} - small 1`}
                    className="w-full h-[250px] object-cover rounded-md"
                  /> */}
                  {bucket?.images && bucket.images[1] ? (
                    // Check if the second image is a video file
                    /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                      bucket.images[1]
                    ) ? (
                      <video
                        src={bucket.images[1]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                        controls
                        controlsList="nodownload"
                      />
                    ) : (
                      <img
                        src={bucket.images[1]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )
                  ) : (
                    null
                  )}

                  {/* <img
                    src={bucket.images[2]}
                    alt={`${bucket.list_name} - small 2`}
                    className="w-full h-[250px] object-cover rounded-md"
                  /> */}
                  {bucket?.images && bucket.images[2] ? (
                    // Check if the third image is a video file
                    /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/i.test(
                      bucket.images[2]
                    ) ? (
                      <video
                        src={bucket.images[2]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                        controls
                        controlsList="nodownload"
                      />
                    ) : (
                      <img
                        src={bucket.images[2]}
                        alt="Post"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )
                  ) : (
                    null
                  )}
                </div>
                <p className="font-poppins font-semibold text-[16px] text-[#212626] text-left">
                  {bucket.list_name}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BucketList;
