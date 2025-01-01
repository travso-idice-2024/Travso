/* eslint-disable react/prop-types */
/* This is Signup step 2 */

import { useDispatch } from "react-redux";
import backgroundImage from "../../../assets/signin.png";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { setInfluencerType } from "../../../redux/slices/authSlice";

const InfluencerPage = ({
  formData,
  formDataError,
  handleInputChange,
  handleInfluencerType,
  handleNext,
  handleBackStep,
  validate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogo = () => {
    navigate("/");
  };

  const handleNextStep2 = async () => {
    if (formData.isInfluencer) {
      const isValid = await validate();
      if (isValid) {
        handleNext();
        try {
          const isInfluencerResponse = await dispatch(
            setInfluencerType({
              smlink1: formData.smlink1,
              email: formData.email,
              mobileNumber: formData.mobileNumber,
            })
          ).unwrap();
        } catch (error) {
          console.log("Error during social media link verification:", error);
        }
      }
    } else {
      handleNext();
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-gradient-to-b from-teal-50 to-teal-200">
      {/* Left Section */}
      <div
        className="md:flex-[1.5] bg-cover bg-center relative md:rounded-r-[50px] overflow-hidden min-h-[50vh] md:min-h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-8 left-8 md:top-10 md:left-12 md:ml-10">
          <img
            src={logo}
            alt="Travso Logo"
            className="w-32 md:w-40 cursor-pointer"
            onClick={handleLogo}
          />{" "}
          {/* Logo size and responsiveness */}
        </div>
        <div className=" absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white text-left md:ml-10 md:pb-[35px]">
          <h1 className="font-poppins font-semibold text-[#FFFFFF] md:text-[40px] leading-10">
            Connect with Travel <br /> Buddies
          </h1>
          <p className="font-poppins font-normal mt-4 text-[16px] text-[#FFFFFF] hidden md:flex">
          Join a global community of travel enthusiasts to share your<br/> travel
            story, exchange insider tips, discover hidden gems, and <br/>celebrate
            the beauty of diverse destinations.
          </p>
          <p className="font-poppins font-normal mt-4 text-[16px] text-[#FFFFFF] flex md:hidden">
            Join a global community of travel enthusiasts to share your travel
            story, exchange insider tips, discover hidden gems, and celebrate
            the beauty of diverse destinations.
          </p>
          <div className="flex items-center mt-4 space-x-4 w-[50%] gap-[30px]">
            <div className="flex-1 relative">
              <div className="w-full h-0.5 bg-gray-300"></div>{" "}
              {/* Full horizontal line */}
              <div
                className="absolute top-0 left-0 h-0.5 bg-white"
                style={{ width: "60%" }}
              ></div>{" "}
              {/* 30% filled portion */}
            </div>
            <span className="text-sm">02</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-[1] flex flex-col items-center min-h-[50vh] md:min-h-full">
        <div className="rounded-lg w-11/12 md:w-3/4 lg:w-3/5">
          <h2 className="text-[36px] font-semibold mb-4 mt-12 text-center font-poppins text-customBlack">
            Signing in
          </h2>
          <p className="flex justify-between items-center mt-4">
            <span className=" text-customBlack">Are you an influencer?</span>
            <div className="space-x-2">
              <button
                className={`py-1 px-4 ${
                  formData.isInfluencer
                    ? "bg-teal-400 text-white rounded-[12px]"
                    : "border border-[#2DC6BE] bg-gradient text-teal-400 font-semibold rounded-[12px] hover:bg-teal-500 hover:text-white transition"
                } `}
                onClick={() => handleInfluencerType(true)}
              >
                Yes
              </button>
              <button
                className={`py-1 px-4  ${
                  !formData.isInfluencer
                    ? "bg-teal-400 text-white rounded-[12px]"
                    : "border border-[#2DC6BE] bg-gradient text-teal-400 font-semibold rounded-[12px] hover:bg-teal-500 hover:text-white transition"
                } `}
                onClick={() => handleInfluencerType(false)}
              >
                No
              </button>
            </div>
          </p>
          {formData.isInfluencer && (
            <div>
              <input
                type="text"
                name="smlink1"
                value={formData?.smlink1 || ""}
                placeholder="Social Media Link 1"
                onChange={handleInputChange}
                className="w-full p-2 border border-[#2DC6BE] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:font-poppins placeholder:text-customBlack mt-3"
              />
              <input
                type="text"
                name="smlink2"
                value={formData?.smlink2 || ""}
                placeholder="Social Media Link 2"
                onChange={handleInputChange}
                className="w-full p-2 border border-[#2DC6BE] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:font-poppins placeholder:text-customBlack mt-3"
              />
              {formDataError.smLinkError && (
                <p className="error text-left text-[#ff0000] text-sm">
                  {formDataError.smLinkError}
                </p>
              )}
            </div>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="mt-5 w-[48%] py-2 border border-[#2DC6BE] bg-gradient text-teal-400 font-semibold rounded-[12px] hover:bg-teal-500 hover:text-white transition"
              onClick={handleBackStep}
            >
              {"<"} Back
            </button>
            <button
              type="submit"
              className="mt-5 w-[48%] py-2 bg-teal-400 text-[white] font-semibold rounded-lg hover:bg-teal-500 transition"
              onClick={handleNextStep2}
            >
              Next
            </button>
          </div>
          {formData.isInfluencer && (
            <div className="mt-3">
              <p className="text-sm text-customBlack text-center text-semibold">
                Kindly provide your social links to verify your account as an
                Influencer!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerPage;
