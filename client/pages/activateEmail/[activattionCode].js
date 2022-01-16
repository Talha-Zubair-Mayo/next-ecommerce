import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EmailActivationApi } from "../../src/Redux/api";
import { toast } from "react-toastify";
import ThankYou from "../../src/Views/ThankYouPage";
import Layout from "../../src/components/Layout";
const ActiVationPage = ({ activattionCode }) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    EmailActivationApi(activattionCode)
      .then((res) => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err.response);
        setIsSuccess(false);
      });
  }, []);

  return (
    <Layout title="Activation Page" description="">
      <ThankYou isSuccess={isSuccess} />
    </Layout>
  );
};

export default ActiVationPage;

export async function getServerSideProps(context) {
  const { activattionCode } = context.query;

  return {
    props: {
      activattionCode: activattionCode,
    },
  };
}
