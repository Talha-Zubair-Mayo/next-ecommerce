import React from "react";
import styles from "./Cart.module.scss";
import Layout from "../../src/Components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Cart_Remove_Item } from "../../src/Redux/Constants/CartConstants";
const Cart = () => {
  const CartItems = useSelector((state) => state?.CartItems?.cartItems);
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch({
      type: Cart_Remove_Item,
      payload: id,
    });
  };
  var total = CartItems.reduce((accum, item) => accum + item.price, 0);
  return (
    <Layout title="CartItems" description="CartItems">
      <>
        <div className="row mt-5">
          <div className="col-md-8">
            <div
              className="container bg-white rounded-top"
              id={styles.zero_pad}>
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
                    {CartItems?.length > 0 && (
                      <div className="font-weight-normal">
                        {CartItems?.length} items
                      </div>
                    )}{" "}
                  </div>
                  {CartItems?.length > 0 ? (
                    <>
                      <div
                        className="d-flex flex-row  mx-lg-5 "
                        id={styles.heading}>
                        <div className="px-lg-5 mr-lg-5" id={styles.produc}>
                          IMAGE
                        </div>
                        <div className="px-lg-5 mr-lg-5" id={styles.produc}>
                          TITLE
                        </div>
                        <div className="px-lg-5 ml-lg-5" id={styles.prc}>
                          PRICE
                        </div>
                        {/* <div className="px-lg-5 ml-lg-1" id={styles.quantity}>
                    QUANTITY
                  </div> */}
                        {/* <div className="px-lg-5 ml-lg-3" id={styles.total}>
                    TOTAL
                  </div> */}
                      </div>
                      {CartItems?.map((item, index) => (
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
                                src={item.image}
                                width="150"
                                height="150"
                                alt=""
                                id={styles.image}
                              />
                            </div>
                            <div className="d-flex flex-column pl-md-3 pl-1">
                              <div>
                                <h6 className={styles.h6}>{item.title}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="pl-md-0 pl-1">
                            <b>${item.price}</b>
                          </div>
                          {/* <div className="pl-md-0 pl-2">
                      <span className="fa fa-minus-square text-secondary"></span>
                      <span className="px-md-3 px-1">2</span>
                      <span className="fa fa-plus-square text-secondary"></span>
                    </div> */}
                          {/* <div className="pl-md-0 pl-1">
                      <b>$19.98</b>
                    </div> */}
                          <div
                            onClick={() => removeFromCartHandler(item._id)}
                            id={styles.closee}
                            className="close">
                            &times;
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <h3 className="text-center">No Product Found</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="container bg-white rounded-top mt-2">
              <div className={styles.Yorder}>
                <table className={styles.table}>
                  <tr>
                    <th className={styles.th} colSpan={2}>
                      Your order
                    </th>
                  </tr>

                  <tr>
                    <td className={styles.td}>Subtotal</td>
                    <td className={styles.td}>${total}</td>
                  </tr>
                </table>
                <br />

                <a className={styles.button} type="button">
                  Proceed To Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Cart;
