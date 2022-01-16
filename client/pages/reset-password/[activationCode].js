import React from "react";
import Layout from "../../src/components/Layout";
import ResetPassowrd from "../../src/Views/ResetPassowrd";

const ResetPassowrdPage = ({ activationCode }) => {
  return (
    <Layout title="Reset Password" description="Reset Passowrd Page">
      <ResetPassowrd activationCode={activationCode} />
    </Layout>
  );
};

export default ResetPassowrdPage;

export async function getServerSideProps(context) {
  const { activationCode } = context.query;

  return {
    props: {
      activationCode: activationCode,
    },
  };
}
