import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { user, addOrder, getOrders } = useAuth();
  const { token, shopItems, cartItems, setCartItems } = useCart();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isProcessing, setIsProcessing] = useState(false);

  function totalPrice(orderItems) {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let orderItems = [];
    shopItems.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: user._id,
      address: address,
      items: orderItems,
      amount: totalPrice(orderItems),
      paymentMethod: paymentMethod,
      payment: "Unpaid",
    };

    if (token && orderData.items.length > 0) {
      setIsProcessing(true);
      try {
        const response = await fetch(`${apiUrl}/order/place`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const res = await response.json();

        if (response.ok) {
          if (paymentMethod === "Razorpay") {
            const { orderId: mongoOrderId, razorpayOrderId, amount } = res;
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: amount,
              currency: "INR",
              name: "Fruitnest",
              description: "Order Payment",
              order_id: razorpayOrderId,
              image: "Images/logo.png",
              handler: async function (response) {
                try {
                  const paymentVerificationResponse = await fetch(
                    `${apiUrl}/order/verify`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                      }),
                    }
                  );

                  const verifyRes = await paymentVerificationResponse.json();

                  if (paymentVerificationResponse.ok) {
                    toast.success(
                      "Thank you for your purchase. Your order has been placed successfully."
                    );
                    setCartItems({});
                    addOrder(orderData);
                    getOrders();
                    setAddress({
                      firstname: "",
                      lastname: "",
                      email: user ? user.email : "",
                      phone: user ? user.phone : "",
                      street: "",
                      city: "",
                      state: "",
                      pincode: "",
                    });
                    navigate("/myorder");
                  } else {
                    toast.error(verifyRes.message || "Payment verification failed!");
                    setIsProcessing(false);
                  }
                } catch (error) {
                  console.error("Verification error:", error);
                  toast.error("Payment verification error!");
                  setIsProcessing(false);
                }
              },
              modal: {
                ondismiss: async function () {
                  // Handle payment cancellation
                  try {
                    const cancelResponse = await fetch(
                      `${apiUrl}/order/cancel-razorpay`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          orderId: mongoOrderId,
                        }),
                      }
                    );

                    if (cancelResponse.ok) {
                      toast.error("Payment failed");
                    }
                  } catch (error) {
                    console.error("Cancel error:", error);
                  }
                  setIsProcessing(false);
                },
              },
              prefill: {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                contact: address.phone,
              },
              theme: {
                color: "#ff9421",
              },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } else {
            toast.success(
              "Thank you for your purchase. Your order has been placed successfully."
            );
            setCartItems({});
            addOrder(orderData);
            getOrders();
            setAddress({
              firstname: "",
              lastname: "",
              email: user ? user.email : "",
              phone: user ? user.phone : "",
              street: "",
              city: "",
              state: "",
              pincode: "",
            });
            setIsProcessing(false);
            navigate("/myorder");
          }
        } else {
          toast.error(res.message);
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Order error:", error);
        toast.error("Error placing order. Please try again.");
        setIsProcessing(false);
      }
    } else if (orderData.items.length === 0) {
      toast.error("Cart is empty");
    } else {
      console.log("No token available");
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <section className="py-44 px-20 md:px-68 w-full sm:w-3/4">
        <form onSubmit={handleFormSubmit} className="">
          <h3 className="text-3xl pb-4 text-black font-semibold text-center">
            Address Form
          </h3>
          <div className="inputbox grid grid-cols-1 md:grid-cols-2 gap-x-8 text-[1.5rem]">
            <div className="mb-2">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                className="box p-2 mb-0 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.firstname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.lastname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                readOnly
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={user ? user.email : address.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                readOnly
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={user ? user.phone : address.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                name="street"
                id="street"
                required
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                required
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                required
                className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
                value={address.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="my-4 flex flex-col md:flex-row justify-center gap-x-8 text-[1.5rem]">
            <label className="">Payment Method:</label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Razorpay
            </label>
            <label className="flex  items-center">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>

          <div className="bttn items-center flex justify-center flex-col">
            <input
              type="submit"
              value={isProcessing ? "Processing..." : (paymentMethod === "COD" ? "Place Order" : "Proceed to Pay")}
              disabled={isProcessing}
              className={`btn mt-4 ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Order;
