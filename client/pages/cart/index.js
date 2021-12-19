import React from "react";
import styles from "./Cart.module.css";
import Layout from "../../src/Components/Layout";
import { useSelector } from "react-redux";

const Cart = () => {
  const CartItems = useSelector((state) => state.CartItems.cartItems);

  return (
    <Layout title="CartItems" description="CartItems">
      <div className="container bg-white rounded-top mt-5" id={styles.zero_pad}>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12 pt-3">
            <div className="d-flex flex-column pt-4">
              <div>
                <h5
                  id={styles.h5}
                  className="text-uppercase font-weight-normal">
                  shopping Cart
                </h5>
              </div>
              {CartItems.length > 0 && (
                <div className="font-weight-normal">
                  {CartItems.length} items
                </div>
              )}{" "}
            </div>
            {CartItems.length > 0 ? (
              <>
                <div
                  className="d-flex flex-row px-lg-5 mx-lg-5 "
                  id={styles.heading}>
                  <div className="px-lg-5 mr-lg-5" id={styles.produc}>
                    PRODUCTS
                  </div>
                  <div className="px-lg-5 ml-lg-5" id={styles.prc}>
                    PRICE
                  </div>
                  <div className="px-lg-5 ml-lg-1" id={styles.quantity}>
                    QUANTITY
                  </div>
                  <div className="px-lg-5 ml-lg-3" id={styles.total}>
                    TOTAL
                  </div>
                </div>
                {CartItems.map((item, index) => (
                  <div
                    key={index}
                    className="
              d-flex
              flex-row
              justify-content-between
              align-items-center
              pt-lg-4 pt-2
              pb-3
              border-bottom
              mobile
            ">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <img
                          src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                          width="150"
                          height="150"
                          alt=""
                          id={styles.image}
                        />
                      </div>
                      <div className="d-flex flex-column pl-md-3 pl-1">
                        <div >
                          <h6 className={styles.h6}>{item.title}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="pl-md-0 pl-1">
                      <b>$9.99</b>
                    </div>
                    <div className="pl-md-0 pl-2">
                      <span className="fa fa-minus-square text-secondary"></span>
                      <span className="px-md-3 px-1">2</span>
                      <span className="fa fa-plus-square text-secondary"></span>
                    </div>
                    <div className="pl-md-0 pl-1">
                      <b>$19.98</b>
                    </div>
                    <div className="close">&times;</div>
                  </div>
                ))}
              </>
            ) : (
              <h3 className="text-center">NO Product Found</h3>
            )}
          </div>
        </div>
      </div>
      <div
        className="container bg-light rounded-bottom py-4"
        id={styles.zero_pad}>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div></div>
              <div className="px-md-0 px-1" id="footer-font">
                <b className="pl-md-4">
                  SUBTOTAL
                  <span className="pl-md-4">
                    {CartItems.length > 0 ? "$300" : "$0"}
                  </span>
                </b>
              </div>
              <div>
                <button className="btn btn-sm bg-dark text-white px-lg-5 px-3">
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
