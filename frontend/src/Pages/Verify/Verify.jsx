import { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const isCOD = searchParams.get("cod") === "true";
  const { url, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying payment security...");
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'failed'

  useEffect(() => {
    if (isCOD) {
      setStatus("success");
      setMessage("Order confirmed with Cash on Delivery! Preparing your food...");
      if (clearCart) clearCart();
      setTimeout(() => navigate("/myorders"), 1500);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.get(`${url}/api/order/verify`, {
          params: {
            success,
            orderId,
            session_id: sessionId
          }
        });

        if (response.data.success) {
          setStatus("success");
          setMessage("Payment verified! Redirecting to your live order tracking...");
          if (clearCart) clearCart();
          setTimeout(() => navigate("/myorders"), 1500);
        } else {
          setStatus("failed");
          setMessage("Payment was not completed. Returning to your cart...");
          setTimeout(() => navigate("/cart"), 2000);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
        setMessage("Could not confirm order status. Redirecting to home...");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    if (!orderId) {
      navigate("/");
      return;
    }

    void verifyPayment();
  }, [navigate, orderId, success, sessionId, isCOD, url, clearCart]);

  return (
    <div className="verify-page">
      <div className="verify-card">
        {status === "verifying" && <div className="verify-spinner"></div>}
        {status === "success" && <div className="verify-icon-success">✓</div>}
        {status === "failed" && <div className="verify-icon-failed">✕</div>}
        <h2 className="verify-title">
          {status === "success"
            ? "Order Confirmed!"
            : status === "failed"
            ? "Payment Incomplete"
            : "Verifying Your Order"}
        </h2>
        <p className="verify-message">{message}</p>
      </div>
    </div>
  );
};

export default Verify;
