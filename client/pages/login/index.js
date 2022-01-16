import React from "react";
import Layout from "../../src/Components/Layout";
import Login from "../../src/Views/Login";

const LoginPage = () => {
  return (
    <Layout title="Login" description={"Login Page"}>
      <Login />
    </Layout>
  );
};

export default LoginPage;
