import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {

  const { Component } = props;

  useEffect(() => {
    console.log("protected rouete")
    let login = window.sessionStorage.getItem("session_data-instance_0") === undefined ? null : this;
    // if (!login) {
    //   history.push("/login");
    // }
    {!login && <NavLink to="/"></NavLink>}
    if (!login) {
      return Redirect("/login");
    }
  }, []);


  return (
    <div>
      <Component />
    </div>
  );
}