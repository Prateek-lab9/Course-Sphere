import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [cardError, setCardError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("token"));
  const token = user?.token;
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchBuyCourseData = async () => {
      if (!token) {
        setError("Please login first to buy a course");
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:9001/api/v1/course/buy/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(res.data);
        setCourse(res.data.course);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        if (error?.response?.status === 400) {
          setError("You havce already purchased this course");
          navigate("/purchases");
        } else {
          setError(error?.response?.data?.errors);
        }
      }
      setLoading(false);
    };
    fetchBuyCourseData();
  }, [courseId]);

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("stripe or element not found");
      return;
    }
    setLoading(true);

    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("card not found");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Stripe payment method error: ", error);
      setLoading(false);
      setCardError(error.message);
    } else {
      console.log("[Payment Method created]: ", paymentMethod);
    }
    if (!clientSecret) {
      console.log("No client secret found");
      setLoading(false);
      return;
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded", paymentIntent);
      setCardError("your payment id: ", paymentIntent.id);
      const paymentInfo = {
        userId: user.user._id,
        email: user.user.email,
        courseId: course._id,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };
      console.log("payment info: ", paymentInfo);
      await axios.post("http://localhost:9001/api/v1/order/", paymentInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).then(response=>{console.log(response.data)}).catch((error)=>{
        console.log("Error in making payment")
      });
      toast.success("Payment Successful");
      navigate("/purchases");
    }
    setLoading(false);
  };

  return (
    <div className="bg-zinc-700 w-full h-screen md:pt-[10vh]">
      {error ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-md">
            <p className="text-lg font-semibold">{error}</p>
            <Link
              to="/purchases"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition mt-3 duration-200 flex items-center justify-center"
            >
              Purchases
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex sm:flex-col justify-center items-center gap:10 md:flex-row my-40 mx-40">
          <div className="px-12 py-4  border rounded-md border-zinc-400">
            <h1 className="text-xl text-white font-semibold underline">
              Order Details
            </h1>
            <div className="flex items-center text-center gap-2 mt-4">
              <h2 className="text-zinc-300 text-sm">Total Price</h2>
              <p className="text-red-400 font-semibold">${course.price}</p>
            </div>
            <div className="flex items-center text-center gap-2 mt-4">
              <h2 className="text-zinc-300 text-sm">Course Name</h2>
              <p className="text-red-400 font-semibold">{course.title}</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="border border-zinc-400 shadow-md rounded-md p-6 w-full max-w-sm">
              <h2 className="text-lg text-white font-semibold mb-4">
                Process Your Payment:
              </h2>
              <div className="mb-4">
                <label
                  className="block text-zinc-300 text-sm mb-2"
                  htmlFor="card-number"
                >
                  Credit/Debit Card
                </label>
                <form onSubmit={handlePurchase}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#fff",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />

                  <button
                    type="submit"
                    disabled={!stripe || loading} // Disable button when loading
                    className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                  >
                    {loading ? "Processing..." : "Pay"}
                  </button>
                </form>
                {cardError && (
                  <p className="text-red-500 font-semibold text-xs">
                    {cardError}
                  </p>
                )}
              </div>
              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center">
                <span className="mr-2">🅿️</span> Other Payments Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buy;
