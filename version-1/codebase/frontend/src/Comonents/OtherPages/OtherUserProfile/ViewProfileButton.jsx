/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProfileButton = ({ aligned }) => {
  console.log("==aligned===>", aligned);
  const navigate = useNavigate();
  return (
    <>
      {aligned === "left" && (
        <div className={`flex justify-center mt-4 w-full font-inter font-medium text-[14px] h-[36px] rounded-[4px] bg-[#F0F7F7] text-[#667877] hover:bg-[#2DC6BE] hover:text-white`}>
          <button onClick={() => navigate('/profile')}>View Profile</button>
        </div>
      )}

      {aligned === "right" && (
        <div className={`flex justify-center w-[120px] h-[36px] text-[14px] border rounded-[4px] font-medium text-[#2DC6BE] border-[#2DC6BE] hover:bg-[#2DC6BE] hover:text-white`}>
          <button onClick={() => navigate('/profile')}>View Profile</button>
        </div>
      )}
    </>
  );
};

export default ViewProfileButton;
