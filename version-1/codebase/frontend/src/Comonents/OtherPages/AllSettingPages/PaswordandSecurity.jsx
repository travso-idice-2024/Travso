import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPassword,updatePassword,getUserDetails } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import SuccessError from '../../OtherPages/SuccessError';

const PaswordandSecurity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSecondForm , setshowSecondForm] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMsgType, setFlashMsgType] = useState('');

  const [emailSetting, setEmailSetting] = useState(false);
  const [numberSetting, setNumberSetting] = useState(false);
  const [passwordSetting, setPasswordSetting] = useState(false);

 
 //for verifying password form
  const [vpPassword, setVPFormData] = useState({
    password:'',
  });

  //update password form
  const [upFormData, setUpFormData] = useState({
    password:'',
    confirmPassword:''
  });
  
   //vp and up form error handles
  const [upFormDataError, setUpFormDataError] = useState({});
  const [vpFormDataError, setVpFormDataError] = useState({});


  const [formData, setFormData] = useState({
    userEmail: "Madhulika@gmail.com",
    userNumber: "987654321",
    userPassword: "•••••••••••••",
  });
  const [showEyePassword, setShowEyePassword] = useState(false);
  const [showEyePasswordReenter, setShowEyePasswordReenter] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");


  const { loading, checkPass,updatePass,user } = useSelector((state) => state.auth);
  //console.log(user);

  useEffect(()=>{
    if(!user){
      dispatch(getUserDetails());
    }
  },[user]);

//vp
  const handleInputVPChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setVPFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //up
  const handleUpPassInputs = (e) => {
    const { name, value } = e.target;
    setUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    /* remove if field is value filled */
    Object.keys(upFormDataError).forEach((inputName) => {
      if(inputName === name && value !== '') {
          delete upFormDataError[inputName];
      }
    });
  }

  // validate up
const validateUpInputs = async() => {
  let formErrors = {};
    /* handle password and confirm password validation */
    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!upFormData.password) {
        formErrors.password = "*Password is required";
    } else if (!passwordPattern.test(upFormData.password)) {
        formErrors.password = "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    // confirm password validation
    if (!upFormData.confirmPassword) {
      formErrors.confirmPassword = "*Confirm password is required";
    } else if (upFormData.confirmPassword !== upFormData.password) {
        formErrors.confirmPassword = "*Passwords and Confirm password do not match";
    }

    setUpFormDataError(formErrors);
    return Object.keys(formErrors).length === 0;
}

// validate vp
const validateInputs = async() => {

  let formErrors = {};
  // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
    if (!vpPassword.password) {
        formErrors.password = "*Password is required";
    } else if (!passwordPattern.test(vpPassword.password)) {
        formErrors.password = "*Password must be at least 6 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setVpFormDataError(formErrors);
    return Object.keys(formErrors).length === 0;

}

  const togglePasswordVisibility = () => {
    setShowEyePassword(!showEyePassword);
  };
  //console.log(checkPass);
  //console.log(updatePass);
  var userData = user || {};

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e)=>{
  //   setconfirmPassword(e.target.value);
  // }

  // handle flash messages show
const handleFlashMessage = (errorMessage, msgType) => {
  setFlashMessage(errorMessage);
  setFlashMsgType(msgType);
  setTimeout(() => {
    setFlashMessage("");
    setFlashMsgType("");
  }, 3000); // Hide the message after 3 seconds
}

  //vp
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const isValid = await validateInputs();
    if(isValid) {
      const {password} = vpPassword;
     const response  = await dispatch(checkPassword({ password })).unwrap();
     //console.log("check data", response);
     if(response.status == true){
      handleFlashMessage(response.message, 'success');
      setshowSecondForm(true);
      setVPFormData({password: ''})
     }else if(response.status == false){
      handleFlashMessage(response.message, 'error');
      setVpFormDataError({password:response.message});
      //console.log(response.message)
     }else{
      console.log("error");
     }
    }
    //const data =  await response.json();
  };

 //up
  const handleUpdateSubmit = async(e) => {
    e.preventDefault();
    const isValid = await validateUpInputs();
  
    if(isValid) {
      // console.log("yes valid form")
      const {password} = upFormData;
      const {email,user_name,} = user;
        const response = await dispatch(updatePassword({email,userName:user_name,password})).unwrap();
        //console.log("check data update", response);
        if(response.status == true) {
          setUpFormData({password: '',confirmPassword:''})
          handleFlashMessage(response.message, 'success');
          setTimeout(()=>{
            navigate('/login');
          }, 3000);
          
        } else {
          setUpFormDataError({password:response.message});
          handleFlashMessage(response.message, 'error');
          //handleFlashMessage(response.message, 'success');
        }
    } else {
      console.log("not a valid form")
    }
  
  }




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


 
  const openChangeData = (item) => {
    if (item === "Email") {
      setEmailSetting(true);
    }
    if (item === "Number") {
      setNumberSetting(true);
    }
    if (item === "Password") {
      setPasswordSetting(true);
    }
  };

  return (
    <>
    
    <div className="bg-white rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-[24px] px-4 mb-4">
      <div className="flex flex-col gap-[32px]">
        <h5 className="font-poppins font-semibold text-[28px] text-[#212626] text-left">
          Password and Security
        </h5>
        <div className="flex gap-[32px] grid grid-cols-2">
          <div className="flex-col w-full">
            <div className="flex items-center justify-between mb-4">
              <p className="font-inter font-medium text-[14px] text-[#869E9D]">
                Current Email
              </p>
              <p
                className="font-inter font-medium text-[12px] text-[#2DC6BE] cursor-pointer"
                onClick={() => openChangeData("Email")}
              >
                Change
              </p>
            </div>
            <div>
              <input
                type="email"
                name="userEmail"
                // value={formData.userEmail}
                value={user?.email || ""}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
              />
            </div>
          </div>
          <div className="flex-col w-full">
            <div className="flex items-center justify-between mb-4">
              <p className="font-inter font-medium text-[14px] text-[#869E9D]">
                Phone number
              </p>
              <p
                className="font-inter font-medium text-[12px] text-[#2DC6BE] cursor-pointer"
                onClick={() => openChangeData("Number")}
              >
                Change
              </p>
            </div>
            <div className="w-full">
              <input
                type="number"
                name="userNumber"
                value={user?.mobile_number || ""}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                // placeholder="987654321"
                className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
              />
            </div>
          </div>
          <div className="flex-col w-full">
            <div className="flex items-center justify-between mb-4">
              <p className="font-inter font-medium text-[14px] text-[#869E9D]">
                Current Password
              </p>
              <p
                className="font-inter font-medium text-[12px] text-[#2DC6BE] cursor-pointer"
                onClick={() => openChangeData("Password")}
              >
                Change
              </p>
            </div>
            <div className="w-full">
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleInputChange}
                placeholder="Enter your password"
                // placeholder="•••••••••••••"
                className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
              />
            </div>
          </div>
        </div>

        {/* All Popup Data Setting */}
        {emailSetting && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.3] flex items-center justify-center z-50">
            <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] px-[24px] py-[20px] shadow-md w-[488px]">
              <div className="flex items-center justify-between">
                <h6 className="font-poppins font-semibold text-[18px] text-[#212626]">
                  Change email
                </h6>

                {/* Close Button (X) */}
                <button
                  className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                  onClick={() => setEmailSetting(false)}
                  aria-label="Close"
                >
                  &#x2715;
                </button>
              </div>
              <div className="flex flex-col gap-[18px] mt-6">
                <div className="flex items-center gap-[10px]">
                  <h5 className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626d4]">
                    Your current email is:
                  </h5>
                  <p className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626]">
                    Madhulika@gmail.com
                  </p>
                </div>
                <div className="flex flex-col w-full gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="font-inter font-medium text-[14px] text-[#212626d4]">
                      Enter new email
                    </p>
                  </div>
                  <div className="w-full">
                    <input
                      type="email"
                      name="useEmail"
                      placeholder="Enter your Email"
                      className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-[16px] mt-3">
                  <button className="bg-[#2DC6BE] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-white w-full">
                    Verify Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {numberSetting && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.3] flex items-center justify-center z-50">
            <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] px-[24px] py-[20px] shadow-md w-[488px]">
              <div className="flex items-center justify-between">
                <h6 className="font-poppins font-semibold text-[18px] text-[#212626]">
                  Change Phone number
                </h6>

                {/* Close Button (X) */}
                <button
                  className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                  onClick={() => setNumberSetting(false)}
                  aria-label="Close"
                >
                  &#x2715;
                </button>
              </div>
              <div className="flex flex-col gap-[18px] mt-6">
                <div className="flex items-center gap-[10px]">
                  <h5 className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626d4]">
                    Your current phone number is:
                  </h5>
                  <p className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626]">
                    1234567890
                  </p>
                </div>
                <div className="flex flex-col w-full gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="font-inter font-medium text-[14px] text-[#212626d4]">
                      Enter New Phone Number
                    </p>
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      name="useNumber"
                      placeholder="Enter your Number"
                      className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-[16px] mt-3">
                  <button className="bg-[#2DC6BE] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-white w-full">
                    Send OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {passwordSetting && (
          
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.3] flex items-center justify-center z-50">
            {flashMessage && <SuccessError message={flashMessage} messageType={flashMsgType}/>}
            <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] px-[24px] py-[20px] shadow-md w-[488px]">
              <div className="flex items-center justify-between">
                <h6 className="font-poppins font-semibold text-[18px] text-[#212626]">
                  Change Password
                </h6>

                {/* Close Button (X) */}
                <button
                  className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                  onClick={() => setPasswordSetting(false)}
                  aria-label="Close"
                >
                  &#x2715;
                </button>
              </div>
              <div className="flex flex-col gap-[18px] mt-6">
                {/* <div className="flex items-center gap-[10px]">
                  <h5 className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626d4]">
                    Your current phone number is:
                  </h5>
                  <p className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626]">
                    1234567890
                  </p>
                </div> */}
                <div className="flex flex-col w-full gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="font-inter font-medium text-[14px] text-[#212626d4]">
                      Enter current Password
                    </p>
                  </div>
                  <div className="w-full relative">
                    <input
                      type={showEyePassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={vpPassword.password}
                      onChange={handleInputVPChange}
                      className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
                    />
                    <div
                      className="absolute top-2/4 right-4 transform -translate-y-2/4 cursor-pointer text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showEyePassword ? (
                        <svg
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.74294 3.09232C10.1494 3.03223 10.5686 3 11.0004 3C16.1054 3 19.4553 7.50484 20.5807 9.28682C20.7169 9.5025 20.785 9.61034 20.8231 9.77667C20.8518 9.90159 20.8517 10.0987 20.8231 10.2236C20.7849 10.3899 20.7164 10.4985 20.5792 10.7156C20.2793 11.1901 19.8222 11.8571 19.2165 12.5805M5.72432 4.71504C3.56225 6.1817 2.09445 8.21938 1.42111 9.28528C1.28428 9.50187 1.21587 9.61016 1.17774 9.77648C1.1491 9.9014 1.14909 10.0984 1.17771 10.2234C1.21583 10.3897 1.28393 10.4975 1.42013 10.7132C2.54554 12.4952 5.89541 17 11.0004 17C13.0588 17 14.8319 16.2676 16.2888 15.2766M2.00042 1L20.0004 19M8.8791 7.87868C8.3362 8.42157 8.00042 9.17157 8.00042 10C8.00042 11.6569 9.34356 13 11.0004 13C11.8288 13 12.5788 12.6642 13.1217 12.1213"
                            stroke="#869E9D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {vpFormDataError.password &&<p className="text-red-500">{vpFormDataError.password}</p>}
                </div>
                <div className="flex items-center justify-between w-full gap-[16px] mt-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#2DC6BE] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-white w-full"
                  >
                    {/* Verify Password */}
                    {loading ? "Verifying..." : "Verify Password"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* update password */}
        {showSecondForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[0.3] flex items-center justify-center z-50">
            {flashMessage && <SuccessError message={flashMessage} messageType={flashMsgType}/>}
            <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] px-[24px] py-[20px] shadow-md w-[488px]">
              <div className="flex items-center justify-between">
                <h6 className="font-poppins font-semibold text-[18px] text-[#212626]">
                  Change Password
                </h6>

                {/* Close Button (X) */}
                <button
                  className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                  // onClick={() => setPasswordSetting(false)}
                  onClick={() => setshowSecondForm(false)}
                  aria-label="Close"
                >
                  &#x2715;
                </button>
              </div>
              <div className="flex flex-col gap-[18px] mt-6">
                {/* <div className="flex items-center gap-[10px]">
                  <h5 className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626d4]">
                    Your current phone number is:
                  </h5>
                  <p className="font-inter font-medium text-[14px] flex items-center justify-center text-[#212626]">
                    1234567890
                  </p>
                </div> */}
                <div className="flex flex-col w-full gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="font-inter font-medium text-[14px] text-[#212626d4]">
                      Enter New Password
                    </p>
                  </div>
                  <div className="w-full relative">
                    <input
                      type={showEyePassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={upFormData.password}
                      onChange={handleUpPassInputs}
                      className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
                    />
                    <div
                      className="absolute top-2/4 right-4 transform -translate-y-2/4 cursor-pointer text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showEyePassword ? (
                        <svg
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.74294 3.09232C10.1494 3.03223 10.5686 3 11.0004 3C16.1054 3 19.4553 7.50484 20.5807 9.28682C20.7169 9.5025 20.785 9.61034 20.8231 9.77667C20.8518 9.90159 20.8517 10.0987 20.8231 10.2236C20.7849 10.3899 20.7164 10.4985 20.5792 10.7156C20.2793 11.1901 19.8222 11.8571 19.2165 12.5805M5.72432 4.71504C3.56225 6.1817 2.09445 8.21938 1.42111 9.28528C1.28428 9.50187 1.21587 9.61016 1.17774 9.77648C1.1491 9.9014 1.14909 10.0984 1.17771 10.2234C1.21583 10.3897 1.28393 10.4975 1.42013 10.7132C2.54554 12.4952 5.89541 17 11.0004 17C13.0588 17 14.8319 16.2676 16.2888 15.2766M2.00042 1L20.0004 19M8.8791 7.87868C8.3362 8.42157 8.00042 9.17157 8.00042 10C8.00042 11.6569 9.34356 13 11.0004 13C11.8288 13 12.5788 12.6642 13.1217 12.1213"
                            stroke="#869E9D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {upFormDataError.password &&<p className="text-red-500">{upFormDataError.password}</p>}
                  
                </div>
                <div className="flex flex-col w-full gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="font-inter font-medium text-[14px] text-[#212626d4]">
                      Re-Enter New Password
                    </p>
                  </div>
                  <div className="w-full relative">
                    <input
                      type={showEyePasswordReenter ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-Enter your password"
                      value={upFormData.confirmPassword}
                      onChange={handleUpPassInputs}
                      className="w-full font-sans w-full p-2 h-[48px] bg-[#F0F7F7] border border-[#F0F7F7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0F7F7] placeholder:font-sans placeholder:font-normal placeholder:text-customBlack placeholder:text-[16px]"
                    />
                    <div
                      className="absolute top-2/4 right-4 transform -translate-y-2/4 cursor-pointer text-gray-500"
                      // onClick={togglePasswordVisibility}
                      onClick={() => setShowEyePasswordReenter(!showEyePasswordReenter)}
                    >
                      {showEyePasswordReenter ? (
                        <svg
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z"
                            stroke="#2DC6BE"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.74294 3.09232C10.1494 3.03223 10.5686 3 11.0004 3C16.1054 3 19.4553 7.50484 20.5807 9.28682C20.7169 9.5025 20.785 9.61034 20.8231 9.77667C20.8518 9.90159 20.8517 10.0987 20.8231 10.2236C20.7849 10.3899 20.7164 10.4985 20.5792 10.7156C20.2793 11.1901 19.8222 11.8571 19.2165 12.5805M5.72432 4.71504C3.56225 6.1817 2.09445 8.21938 1.42111 9.28528C1.28428 9.50187 1.21587 9.61016 1.17774 9.77648C1.1491 9.9014 1.14909 10.0984 1.17771 10.2234C1.21583 10.3897 1.28393 10.4975 1.42013 10.7132C2.54554 12.4952 5.89541 17 11.0004 17C13.0588 17 14.8319 16.2676 16.2888 15.2766M2.00042 1L20.0004 19M8.8791 7.87868C8.3362 8.42157 8.00042 9.17157 8.00042 10C8.00042 11.6569 9.34356 13 11.0004 13C11.8288 13 12.5788 12.6642 13.1217 12.1213"
                            stroke="#869E9D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {upFormDataError.confirmPassword && <p className="text-red-500">{upFormDataError.confirmPassword}</p>}
                  
                </div>
                <div className="flex items-center justify-between w-full gap-[16px] mt-3">
                  <button
                    onClick={handleUpdateSubmit}
                    disabled={loading}
                    className="bg-[#2DC6BE] h-[48px] flex items-center justify-center rounded-[7px] font-intern font-medium text-[16px] text-white w-full"
                  >
                 
                 Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
    
    
    </>
  );
};

export default PaswordandSecurity;
