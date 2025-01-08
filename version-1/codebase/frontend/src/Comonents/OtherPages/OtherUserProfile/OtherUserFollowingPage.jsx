import React from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OtherUserPageHeader from "./OtherUserPageHeader";
import OtherUserFollowingPostCard from "./OtherUserFollowingPostCard";
import OtherUserRightBar from "./OtherUserRightBar";

const OtherUserFollowingPage = () => {
 const navigate = useNavigate();

 /* getting all the details of other user */
    const { otherUserData } = useSelector((state) => state.auth);
    const { userName, userId } = useParams();


  return (
    <>
      <Header />
      <OtherUserPageHeader />
      <div className="min-h-screen bg-gray-50 p-4">
        <p className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate(`/profile/${userName}/${userId}`)}
          >
            <path
              d="M22.5 27L13.5 18L22.5 9"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Following ({otherUserData ? otherUserData?.following?.length : "0"})
        </p>
        <div className="container mx-auto flex gap-5">
          {/* Main Content */}
          <div className="w-full">
            <OtherUserFollowingPostCard />
          </div>
          <div className="flex flex-col">
            <OtherUserRightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserFollowingPage;