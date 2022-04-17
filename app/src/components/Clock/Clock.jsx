import React, { useEffect, useState } from "react";

function ClockTime() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    let x = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(x);
  }, []);
  return <div>{date.toLocaleTimeString("en-US")}</div>;
}

export default ClockTime;
