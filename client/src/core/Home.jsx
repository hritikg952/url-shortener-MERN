import React, { useState } from "react";
import "../css/home.css";
import "antd/dist/antd.css";
import { Card } from "antd";

import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
const Home = () => {
  const tabList = [
    {
      key: "signin",
      tab: "Sign In",
    },
    {
      key: "signup",
      tab: "Sign Up",
    },
  ];
  const contentList = {
    signin: <SignIn />,
    signup: <SignUp />,
  };

  const [tab, setTab] = useState("signin");

  const onTabChange = (key) => {
    setTab(key);
  };
  return (
    <div className="home-container">
      <Card
        hoverable
        style={{ width: "500px" }}
        tabList={tabList}
        activeTabKey={tab}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        {contentList[tab]}
      </Card>
    </div>
  );
};

export default Home;
