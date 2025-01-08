import React from "react";
import { useParams } from "react-router-dom";
import OtherUserPageHeader from "./OtherUserPageHeader";
import OtherUserPostCard from "./OtherUserPostCard";
import OtherUserRightBar from "./OtherUserRightBar";
import OtherUserLeftBar from "./OtherUserLeftBar";
import Header from "../Header";

const OtherUserProfile = () => {
  const { userName, userId } = useParams();
  return (
    // <div>
    //     <div>
    //         <OtherUserPageHeader />
    //         <OtherUserRightBar userId={userId} userName={userName} />
    //         {/* <OtherUserPostCard userId={userId} userName={userName} /> */}
    //         {/* <OtherUserLeftBar userId={userId} userName={userName} /> */}
    //     </div>
    // </div>
    <>
      <Header />
      <OtherUserPageHeader />
      <div className="min-h-screen bg-[#F0F7F7] p-3 md:p-4">
        <div className="container mx-auto flex flex-col md:flex-row gap-3">

          {/* Sidebar */}
          <div className="md:w-[340px] flex flex-col">
            <OtherUserLeftBar userId={userId} userName={userName} />
          </div>

          {/* Main Content */}
          <div className="md:w-[696px] flex-grow hidden md:flex flex-col">
            <OtherUserPostCard userId={userId} userName={userName} />
          </div>

          {/* Rightbar */}
          <div className="md:w-[340px] flex flex-col">
            <OtherUserRightBar userId={userId} userName={userName} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfile;
