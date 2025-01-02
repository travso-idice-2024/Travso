import React, { useState, useEffect } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import { useDispatch, useSelector } from "react-redux";
import { getBlockedUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import adventureBadge from "../../../assets/Badges/AD.svg";
import soloTraveller from "../../../assets/Badges/ST.svg";
import explorerBadge from "../../../assets/Badges/EX.svg";
import foodieBadge from "../../../assets/Badges/FO.svg";
import luxuryTravelerBadge from "../../../assets/Badges/LT.svg";
const apiUrl = import.meta.env.VITE_API_URL;
//getBlockedUser

const data = [
  {
    id: 1,
    name: "Pankaj Reet Tech",
    username: "@Madhu.lika",
    image: Girl,
    badgeIcon: BadgesIconFirst,
    badgeTooltip:
      "Solo travel is an empowering and transformative experience where you venture out into the world on your own. It's an opportunity to discover new destinations, meet diverse people, and learn more about yourself.",
    buttonLabel: "Unblock",
  },
  {
    id: 2,
    name: "Rajeev Tech",
    username: "@RajeevTech",
    image: Girl,
    badgeIcon: BadgesIconFirst,
    badgeTooltip:
      "Travel opens your mind, broadens your perspective, and fills your life with memories and stories worth sharing.",
    buttonLabel: "Follow",
  },
  {
    id: 3,
    name: "Madhulika Designs",
    username: "@MadhuDesigns",
    image: Girl,
    badgeIcon: BadgesIconFirst,
    badgeTooltip:
      "Design is not just about aesthetics but also about creating experiences that are intuitive and meaningful.",
    buttonLabel: "Block",
  },
  {
    id: 4,
    name: "Reet Innovations",
    username: "@ReetInnovations",
    image: Girl,
    badgeIcon: BadgesIconFirst,
    badgeTooltip:
      "Innovation distinguishes between a leader and a follower. Take the leap and innovate.",
    buttonLabel: "Unblock",
  },
];

const BlockSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popupDataBlock, setPopupDataBlock] = useState(null);

  const { blockUsers } = useSelector((state) => state.auth || {});
  console.log("block users", blockUsers);

  useEffect(() => {
    if (!blockUsers) {
      dispatch(getBlockedUser());
    }
  }, [blockUsers]); //


   const unBlockUser = async (blockId)=>{
        //alert(postId);
        const token = localStorage.getItem('token'); // Get the authentication token
        const response =  await fetch(`${apiUrl}/auth/unblockUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ blockId }), // Pass postId in body
        });
  
        //console.log(response.ok == true);
        const data =  await response.json();
        //console.log(data);
        if (response.ok === true) {
          
          // setFlashMessage('success');
          // setFlashMessage(data.message);
          dispatch(getBlockedUser()); // Refresh the archived posts
          navigate('/settings');
        }
        setPopupDataBlock(null);
  
    }

  const handleButtonBlockOpen = (blockId) => {
    if (blockId) {
      setPopupDataBlock(blockId);
    }
  };

  return (
    <div className="bg-white rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-[24px] px-4 mb-4">
      <div className="flex flex-col gap-[32px]">
        <h5 className="font-poppins font-semibold text-[24px] text-[#212626] text-left">
          Blocked People
        </h5>
        <div className="flex flex-col gap-[20px] px-2">
          {blockUsers?.map((item) => (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div>
                  <img
                    src={item.profile_image}
                    alt={item.full_name}
                    className="w-[44px] h-[44px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                      {item.full_name}
                    </h5>
                    {
                      // Badge mapping and rendering
                      (() => {
                        const badges = {
                          Adventurer: adventureBadge,
                          Explorer: explorerBadge,
                          Foodie: foodieBadge,
                          "Solo Traveler": soloTraveller,
                          "Luxury Traveler": luxuryTravelerBadge,
                        };

                        const badgeParts = item?.badge?.split("-");
                        const badgeName = badgeParts?.[0]?.trim();
                        const badgeDescription = badgeParts?.[1]?.trim();
                        const badgeImage = badges[badgeName];

                        return badgeImage ? (
                          <div className="relative group">
                            <img
                              src={badgeImage}
                              alt={`${badgeName} Badge`}
                              className="w-[150px] h-[30px] ml-[-37px]"
                            />
                            <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[100px] text-justify">
                              {badgeName}
                            </div>
                          </div>
                        ) : null;
                      })()
                    }
                    {/* <div className="relative group">
                      <img
                        src={item.badgeIcon}
                        alt="BadgesIconFirst"
                        className="w-[24px] h-[24px]"
                      />
                      <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-justify">
                        {badgeDescription}
                      </div>
                    </div> */}
                  </div>
                  <div>
                    <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                      {item.user_name}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="bg-[#F0F7F7] w-[196px] h-[36px] rounded-[4px] flex items-center justify-center font-inter font-medium text-[14px] text-[#667877]"
                  onClick={() => handleButtonBlockOpen(item.blocked_id)}
                >
                  {item.buttonLabel}
                </button>
                {popupDataBlock && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.3] flex items-center justify-center z-50">
                    <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] px-[24px] py-[20px] shadow-md w-[360px]">
                      <div className="flex items-center justify-between">
                        <h6 className="font-poppins font-semibold text-[18px] text-[#212626]">
                          Unblock account
                        </h6>

                        {/* Close Button (X) */}
                        <button
                          className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                          onClick={() => setPopupDataBlock(null)}
                          aria-label="Close"
                        >
                          &#x2715;
                        </button>
                      </div>
                      <div className="flex flex-col gap-[16px] mt-5">
                        <h5 className="font-poppins font-semibold text-[18px] flex items-center justify-center text-[#212626]">
                          Are you sure you want to unblock this account?
                        </h5>
                        <div className="flex items-center justify-between w-full gap-[16px]">
                          <button className="bg-[#F0F7F7] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-[#667877] w-full"
                           onClick={() => setPopupDataBlock(null)}>
                            Keep Blocked
                          </button>
                          <button onClick={()=>unBlockUser(item.blocked_id)} className="bg-[#2DC6BE] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-white w-full">
                            Yes, unblock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockSetting;
