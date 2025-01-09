import React, { useState, useEffect } from "react";
import { Progress } from "antd";

const Progressbar = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return prev + 10; // Increment progress
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <Progress
        percent={percent}
        showInfo={false}
        strokeColor="#25D366"
        trailColor="#d9d9d9"
        strokeWidth={8}
      />
    </div>
  );
};

export default Progressbar;
