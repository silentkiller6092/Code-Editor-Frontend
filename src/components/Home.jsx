import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Featured } from "./Featured";
import { useDispatch } from "react-redux";
import { login } from "./redux/AuthSlice";
export default function GlobeDemo() {
  const dispatch = useDispatch();
  useEffect(() => {
    const validateAccessToekn = async () => {
      const accessToken = Cookies.get("accessToken");
      try {
        const response = await fetch("/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status == 403) {
        }
        const data = await response.json();

        if (data.status == "Success") {
          dispatch(
            login({
              full_name: data.response.full_name,
              email: data.response.email,
            })
          );
        }
      } catch (err) {}
    };
    validateAccessToekn();
  });
  return (
    <div>
      <Featured />
    </div>
  );
}
