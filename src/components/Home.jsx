import React, { useEffect } from "react";
import { Featured } from "./Featured";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/AuthSlice"; // Import login action
import { Tabs } from "@mantine/core";
import LanguageList from "./LanguageList";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        // Attempt to validate the access token
        const response = await fetch("/api/v1/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.status === 403) {
          // If access token is invalid, attempt to refresh it
          const refreshResponse = await fetch(
            "/api/v1/user/refreshAccessToken",
            {
              method: "POST",
              credentials: "include", // Include credentials to ensure cookies are sent
            }
          );
          const refreshData = await refreshResponse.json();

          if (refreshData.status === "Error") {
            // If refresh fails, log the user out
            dispatch(logout());
            navigate("/");
          }

          if (refreshData.status === "Success") {
            // If refresh is successful, dispatch login with new user data
            dispatch(
              login({
                full_name: refreshData.response.full_name,
                email: refreshData.response.email,
              })
            );
          }
        } else if (data.status === "Success") {
          // If access token is valid, dispatch login with existing user data
          dispatch(
            login({
              full_name: data.response.full_name,
              email: data.response.email,
            })
          );
        }
      } catch (err) {
        console.error("Error validating access token:", err);
      }
    };

    validateAccessToken();
  }, [dispatch, navigate]);

  return (
    <div className="">
      <Featured />
      <div className="h-screen gradient w-full md:px-20 pt-32">
        <h1 className="text-center text-4xl mb-10">Support of 60+ Languages</h1>
        <div className="">
          <Tabs keepMounted={false} defaultValue="first">
            <Tabs.List className="justify-center before:content-none">
              <Tabs.Tab value="first">Popular</Tabs.Tab>
              <Tabs.Tab value="second">Frontend</Tabs.Tab>
              <Tabs.Tab value="second">Backend</Tabs.Tab>
              <Tabs.Tab value="second">FullStack</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first" className="">
              <LanguageList />
            </Tabs.Panel>
            <Tabs.Panel value="second">Second panel</Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
