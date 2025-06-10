import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './index.css'
import App from './App.jsx'
const stripePromise = loadStripe("pk_test_51RXRchGafYPTX5ucH9vPfgx6xSRUXVQpQQvBd58AReWiaU89h8etxEbtCOvOO1CbydIpsLCr9cW4uycPGm4WKpoS002FsbNDiZ");

createRoot(document.getElementById('root')).render(
<Elements stripe={stripePromise}>
  <App/>
</Elements>
)
