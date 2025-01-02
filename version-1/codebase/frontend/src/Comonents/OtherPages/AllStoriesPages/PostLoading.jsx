/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Background from "../../../assets/Background.png";

const PostLoading = ({ isOpenLoader, onCloseLoader }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpenLoader) {
      setProgress(0); // Reset progress when the modal is opened
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpenLoader]);

  useEffect(() => {
    let interval;
    if (isOpenLoader) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(interval);
            onCloseLoader(); 
            return 100;
          }
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpenLoader, onCloseLoader]);

  if (!isOpenLoader) return null;

  return (
    <>
      <style>
        {`
          .no-scroll {
            overflow: hidden;
          }
        `}
      </style>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center z-50"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="bg-white rounded-[16px] shadow-3xl w-[400px] p-[24px] md:w-[400px] h-[355px] flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="px-4 flex justify-center items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
            <h4 className="text-[#212626] font-poppins font-semibold text-[24px]">
              Uploading your post
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center mt-5 gap-[30px]">
            <div className="flex flex-col items-center justify-center">
              {/* GIF Loader */}
              <img
                src="https://s3-alpha-sig.figma.com/img/c9e6/52dd/a0e5fbec4447bcc6b1e1ff0a6e77b367?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KYqpxDQkN28~t~CQ0Jv09mWZJcijlYHk~8-2QZtO6SNjcP~~6hLDwn~9yxSZw30yBmD1xrfRg8Cklo8hM9Muah6p6Ytc6pP4nwvIjnl5N1rPXiyirWCIP1PGvkb~DgvyqmLn97OUlSzqJgfbeZ6LVuO~RXiwAWVpVc-SxvqComtUCKqwJhVBYCmCVRS-5grP3lHbCq6dxMro3YnoG3AVe0AI6mrHDJqe-WKSgXO3u5gcw5S1qhrJhBTLqaRt20gBCbyqCxZwtcy-4q9CuLbvOPErqbCO0cFtvXJH9VyLV2goWum71qKpnUER-X3vIlt7v4LCviaAQMrUhbkcvWRjoQ__"
                alt="Loading GIF"
                className="w-24 h-24"
              />
              {/* Progress Percentage */}
              <div className="mt-4 text-lg font-inter font-medium text-[12px] text-[#000000]">
                {progress}%
              </div>
            </div>
            <div>
              <p className="font-inter font-medium text-[16px] text-[#667877] flex items-center">
                Kindly wait while your post is <br/>getting uploaded
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLoading;