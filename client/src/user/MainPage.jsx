import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../css/mainPage.css";

import { Input, Button, Table, message, Space } from "antd";
// import { DeleteFilled } from "@ant-design/icons";
import { isAutheticated, signout } from "../auth/helper/index";
import { getUrlsByUserId, createUrl, deleteUrl } from "./helper/index";
const MainPage = () => {
  const [values, setValues] = useState({
    full: "",
  });
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [didRedirect, setDidRedirect] = useState(false);

  //!load on first render
  useEffect(() => {
    if (isAutheticated()) {
      setUserId(isAutheticated().user._id);
      getUrlsByUserId(isAutheticated().user._id).then((data) => {
        if (data.status === 200) {
          data.data.map((d) => {
            setData((prevVal) => [
              ...prevVal,
              {
                id: d._id,
                full: d.full,
                short: d.short,
                clicks: d.clicks,
              },
            ]);
          });
        }
      });
    } else {
      setDidRedirect(true);
    }
  }, []);

  //!shirinking url logic
  const handleShrink = (e) => {
    e.preventDefault();
    setData([]);
    createUrl(userId, values).then((data) => {
      if (data.status === 200) {
        message.success("URL added");
        setValues({ full: "" });
        getUrlsByUserId(userId).then((data) => {
          if (data.status === 200) {
            data.data.map((d) => {
              setData((prevVal) => [
                ...prevVal,
                {
                  id: d._id,
                  full: d.full,
                  short: d.short,
                  clicks: d.clicks,
                },
              ]);
            });
          }
        });
      } else {
        message.error("Something went wrong");
      }
    });
  };

  //!delete logic
  const handleDelete = (e, id) => {
    e.preventDefault();
    setData([]);
    deleteUrl(userId, id).then((data) => {
      if (data.status === 200) {
        message.success("Successfully deleted");
        getUrlsByUserId(userId).then((data) => {
          if (data.status === 200) {
            data.data.map((d) => {
              setData((prevVal) => [
                ...prevVal,
                {
                  id: d._id,
                  full: d.full,
                  short: d.short,
                  clicks: d.clicks,
                },
              ]);
            });
          }
        });
      }
    });
  };

  //!open link whenever clicked on short or full link
  const handleFullLink = (e, link) => {
    e.preventDefault();
    window.open(link, "_blank");
  };

  //!signout logic
  const handleSignout = (e) => {
    e.preventDefault();
    signout().then((data) => {
      if (data.status === 200) {
        window.location.reload(false);
      }
    });
  };

  //!colums for table
  const columns = [
    {
      title: "Full Url",
      dataIndex: "full",
      key: "full",
      render: (text, record) => {
        return (
          <a onClick={(event) => handleFullLink(event, record.full)}>{text}</a>
        );
      },
    },
    {
      title: "Short Url",
      dataIndex: "short",
      key: "short",
      render: (text, record) => {
        return (
          <a onClick={(event) => handleFullLink(event, record.full)}>{text}</a>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a
            style={{ color: "red" }}
            onClick={(event) => handleDelete(event, record.id)}
          >
            delete
          </a>
        </Space>
      ),
    },
  ];

  //!logic to redirect to login page if not authenticated
  const performRedirect = () => {
    if (didRedirect === true) {
      return <Redirect to="/" />;
    }
  };

  const mainpage = () => {
    return (
      <div className="main-page">
        <div className="header">
          <div></div>
          <h1
            style={{
              color: "linear-gradient(to right, #77a1d3, #79cbca, #e684ae)",
            }}
          >
            Url Shortener
          </h1>
          <Button onClick={(event) => handleSignout(event)}>Sign Out</Button>
        </div>
        <div className="container">
          <div className="card">
            <h2>Input Url to shrink..</h2>
            <div className="input-group">
              <Input
                placeholder="Url..."
                value={values.full}
                onChange={(event) =>
                  setValues({ ...values, full: event.target.value })
                }
              />
              <Button type="primary" onClick={(event) => handleShrink(event)}>
                Shrink
              </Button>
            </div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {performRedirect()}
      {mainpage()}
    </React.Fragment>
  );
};

export default MainPage;
