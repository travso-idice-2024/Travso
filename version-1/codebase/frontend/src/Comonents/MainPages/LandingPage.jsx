import React from "react";
import logo from "../../assets/headerIcon/logo.png";
import Hero from "../../assets/LandingSVG//Hero.png";
import HeroMobile from "../../assets/LandingSVG//HeroMobile.svg";
import HeroSVG from "../../assets/LandingSVG/HeroSnap.jpeg";
import HeroSVGNew from "../../assets/LandingSVG/HeroSVGNew.svg";
import BadgeIcon from "../../assets/LandingSVG/BadgeIcon.svg";
import badgePhool from "../../assets/LandingSVG/badgePhool.svg";
import bucketSVG from "../../assets/LandingSVG/bucketSVG.svg";
import Africa from "../../assets/LandingSVG/UpdateSVG/Africa.svg";
import Goa from "../../assets/LandingSVG/UpdateSVG/Goa.svg";
import Calcutta from "../../assets/LandingSVG/UpdateSVG/Calcutta.svg";
import China from "../../assets/LandingSVG/UpdateSVG/china.svg";
import Himachal from "../../assets/LandingSVG/UpdateSVG/Himachal.svg";
import Korea from "../../assets/LandingSVG/UpdateSVG/korea.svg";
import Norway from "../../assets/LandingSVG/UpdateSVG/Norway.svg";
import Romania from "../../assets/LandingSVG/UpdateSVG/Romania.svg";
import Russia1 from "../../assets/LandingSVG/UpdateSVG/Russia.svg";
import Location from "../../assets/LandingSVG/location.svg";
import Left from "../../assets/LandingSVG/leftNewLine.svg";
import LeftMobile from "../../assets/LandingSVG/leftMobile.svg";
import RightMobile from "../../assets/LandingSVG/rightMobile.svg";
import Right from "../../assets/LandingSVG/rightNewLine.svg";
import leftPlane from "../../assets/LandingSVG/leftPlane.svg";
import rightPlane from "../../assets/LandingSVG/rightPlane.svg";
import PlusSVG from "../../assets/LandingSVG/PlusSVG.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="md:px-20 px-3 py-4 flex flex-col justify-between bg-gradient-to-b from-teal-50 to-teal-100 min-h-screen">
      <header className="px-3">
        <div className="w-full max-w-[99%] h-[80px] container mx-auto flex items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img src={logo} alt="TravSo Logo" className="h-10" />
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row mt-4 w-full gap-[20px]">
        <div className="flex flex-col items-start md:w-[500px] gap-[15px] px-4">
          <div className="flex items-center justify-center w-[200px] md:w-[170px] h-[55px] gap-[15px] bg-[#FFFFFF] rounded-full">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3076 13.7788C10.3076 13.1821 10.5447 12.6098 10.9666 12.1878C11.3886 11.7659 11.9609 11.5288 12.5576 11.5288C13.1544 11.5288 13.7267 11.7659 14.1486 12.1878C14.5706 12.6098 14.8076 13.1821 14.8076 13.7788C14.8076 14.3755 14.5706 14.9478 14.1486 15.3698C13.7267 15.7918 13.1544 16.0288 12.5576 16.0288C11.9609 16.0288 11.3886 15.7918 10.9666 15.3698C10.5447 14.9478 10.3076 14.3755 10.3076 13.7788Z"
                fill="#2DC6BE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.03162 8.42081C8.03136 8.00812 8.11245 7.59943 8.27026 7.21811C8.42806 6.83678 8.65949 6.49031 8.95131 6.19849C9.24312 5.90668 9.5896 5.67525 9.97092 5.51744C10.3522 5.35964 10.7609 5.27855 11.1736 5.27881H13.9416C14.3543 5.27855 14.763 5.35964 15.1443 5.51744C15.5256 5.67525 15.8721 5.90668 16.1639 6.19849C16.4558 6.49031 16.6872 6.83678 16.845 7.21811C17.0028 7.59943 17.0839 8.00812 17.0836 8.42081C17.0838 8.42795 17.0865 8.43479 17.0913 8.4401C17.096 8.44542 17.1025 8.44886 17.1096 8.44981L19.3396 8.62981C20.3386 8.71181 21.1596 9.44981 21.3466 10.4348C21.8214 12.9474 21.8566 15.5232 21.4506 18.0478L21.3536 18.6518C21.2646 19.2052 20.9926 19.7128 20.5811 20.0933C20.1695 20.4738 19.6423 20.7053 19.0836 20.7508L17.1406 20.9078C14.0903 21.1556 11.0249 21.1556 7.97462 20.9078L6.03162 20.7508C5.47282 20.7053 4.94545 20.4736 4.5339 20.0929C4.12235 19.7122 3.85042 19.2044 3.76162 18.6508L3.66462 18.0478C3.25762 15.5228 3.29362 12.9478 3.76862 10.4348C3.85945 9.95583 4.10501 9.51991 4.46758 9.194C4.83016 8.8681 5.2897 8.67024 5.77562 8.63081L8.00562 8.44981C8.0127 8.44886 8.0192 8.44542 8.02397 8.4401C8.02873 8.43479 8.03145 8.42795 8.03162 8.42081ZM12.5576 10.0288C11.5631 10.0288 10.6092 10.4239 9.90597 11.1272C9.20271 11.8304 8.80762 12.7842 8.80762 13.7788C8.80762 14.7734 9.20271 15.7272 9.90597 16.4305C10.6092 17.1337 11.5631 17.5288 12.5576 17.5288C13.5522 17.5288 14.506 17.1337 15.2093 16.4305C15.9125 15.7272 16.3076 14.7734 16.3076 13.7788C16.3076 12.7842 15.9125 11.8304 15.2093 11.1272C14.506 10.4239 13.5522 10.0288 12.5576 10.0288Z"
                fill="#2DC6BE"
              />
            </svg>

            <p className="text-[#2DC6BE] font-poppins font-semibold text-[14px]">
              CAPTURE
            </p>
          </div>
          <h5 className="text-left font-poppins font-semibold text-[28px] md:text-[58px] text-[#212626] leading-[40px] md:leading-[70px] md:w-[420px]">
          Expand Your <span className="text-[#2DC6BE]">Travel Horizons
            </span>{" "}
            {/* with Travso */}
          </h5>
          <p className="text-left font-inter font-medium text-[16px] text-[#212626]">
            Stay Travel Inspired, Join our curated community of travellers
            exploring collaboration across hospitality, food, and tourism!
          </p>
          <button className="w-[140px] h-[48px] rounded-[4px] flex items-center justify-center font-poppins font-semibold text-[#EEEEEE] bg-[#2DC6BE]" onClick={() => navigate('/signup')}>
            Join Today
          </button>
        </div>

        {/* Data svg and relative */}
        <div className="flex justify-center items-center m-auto relative">
          <img
            src={HeroSVGNew}
            alt="SVG"
            className="w-[300px] h-[300px] md:w-[540px] md:h-[530px] object-cover z-10"
          />

          {/* Absolute Data */}
          <div className="flex items-center justify-center w-[128px] h-[29px] md:w-[240px] md:h-[55px] gap-[0px] md:gap-[8px] bg-[#FFFFFF] rounded-full absolute bottom-10 -right-[15px] z-10">
            <img src={BadgeIcon} alt="BadgeIcon" />

            <p className="text-[#393E46] font-poppins font-semibold text-[9px] md:text-[14px]">
              Get Travel Badges
            </p>
          </div>
          <div className="flex items-center justify-center w-[128px] md:w-[260px] h-[29px] md:h-[72px] px-2 gap-[0px] md:gap-[5px] bg-[#FFFFFF] rounded-full absolute bottom-[135px] -right-[80px] z-10">
            <img src={badgePhool} alt="BadgeIcon" />

            <p className="text-[#212626] font-poppins font-semibold text-[10px] md:text-[15px] text-left">
              Connect with industry <br/>experts
            </p>
          </div>
          <div className="flex items-center justify-center w-[128px] h-[29px] md:w-[240px] md:h-[55px] gap-[0px] md:gap-[8px] bg-[#FFFFFF] rounded-full absolute bottom-[2px] left-[45px] z-10">
            <img src={bucketSVG} alt="bucketSVG"  />

            <p className="text-[#393E46] font-poppins font-semibold text-[9px] md:text-[14px]">
              Create your bucket list
            </p>
          </div>

          <div className="flex items-center justify-center w-[128px] h-[29px] md:w-[240px] md:h-[55px] gap-[0px] md:gap-[8px] bg-[#FFFFFF] rounded-full absolute bottom-[90px] -left-[45px] z-10">
            <img src={PlusSVG} alt="bucketSVG" />

            <p className="text-[#393E46] font-poppins font-semibold text-[9px] md:text-[14px]">
            Follow Your Travel Buddy
            </p>
          </div>

          <img
            src={Africa}
            alt="Africa"
            className="absolute -left-[15px] bottom-[86px] md:-left-[20px] md:bottom-[180px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
          <img
            src={Goa}
            alt="Goa"
            className="absolute left-[95px] top-[135px] md:left-[150px] md:top-[220px] w-[60px] h-[54px] md:w-[150px] md:h-[100px] z-10"
          />
          <img
            src={Calcutta}
            alt="Calcutta"
            className="absolute right-[70px] top-[124px] md:right-[110px] md:top-[210px] w-[60px] h-[54px] md:w-[150px] md:h-[100px] z-10"
          />
           <img
            src={Himachal}
            alt="Himachal"
            className="absolute left-[105px] top-[80px] md:left-[180px] md:top-[105px] w-[60px] h-[54px] md:w-[140px] md:h-[90px] z-10"
          />
          <img
            src={China}
            alt="China"
            className="absolute right-[83px] top-[90px] md:right-[130px] md:top-[135px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
           <img
            src={Korea}
            alt="Korea"
            className="absolute -right-[10px] top-[110px] md:-right-[20px] md:top-[195px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
          <img
            src={Romania}
            alt="Romania"
            className="absolute -left-[5px] top-[85px] md:-left-[20px] md:top-[150px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
          <img
            src={Norway}
            alt="Norway"
            className="absolute left-[18px] top-[50px] md:left-[45px] md:top-[45px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
          <img
            src={Russia1}
            alt="Russia"
            className="absolute right-[75px] top-[0px] md:right-[100px] md:top-[20px] w-[50px] h-[39px] md:w-[80px] md:h-[60px] z-10"
          />
          <img
            src={Location}
            alt="Location"
            className="absolute right-[0px] top-[50px] md:right-[8px] md:top-[80px] w-[20px] h-[20px] md:w-[30px] md:h-[24px] z-10"
          /> 
          <img
            src={Left}
            alt="Left"
            className="absolute -left-[70px] top-[62px] md:-left-[160px] md:top-[75px] z-0 h-[105px] md:h-[230px]"
          />
          <img
            src={leftPlane}
            alt="leftPlane"
            className="absolute -left-[25px] top-[40px] md:-left-[55px] md:top-[52px]"
          />
          <img
            src={Right}
            alt="Right"
            className="absolute -right-[30px] top-[26px] md:-right-[100px] md:top-[35px] z-0 h-[105px] md:h-[217px]"
          />
          <img
            src={rightPlane}
            alt="rightPlane"
            className="absolute right-[25px] top-[8px] md:right-[20px] md:top-[15px]"
          />
        </div>
        {/* <div className="flex justify-center items-center m-auto relative">
          <img
            src={Hero}
            alt="SVG"
            className="w-full h-[530px]"
          />
        </div> */}
      </div>
      <footer className="flex flex-col md:flex-row items-center justify-between mt-8">
        <div className="flex items-center gap-[15px] md:gap-[35px]">
          <p className="text-left font-inter font-medium text-[14px] md:text-[16px] text-[#212626]">
            Conatct us
          </p>
          <p className="text-left font-inter font-medium text-[14px] md:text-[16px] text-[#212626]">
            Privacy policy
          </p>
          <p className="text-left font-inter font-medium text-[14px] md:text-[16px] text-[#212626]">
            Terms and conditions
          </p>
        </div>
        <div>
          <p className="text-left font-inter font-medium text-[14px] md:text-[16px] text-[#212626]">
            Ⓒ 2025 Travso All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
