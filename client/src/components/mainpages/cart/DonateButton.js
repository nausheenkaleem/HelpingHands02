// import React from 'react';
// import PaypalExpressBtn from 'react-paypal-express-checkout';
// import StripeCheckout from 'react-stripe-checkout'
 
// export default class DonateButton extends React.Component {
        
//     render() {
//         const onSuccess = (payment) => {
//             // Congratulation, it came here means everything's fine!
//             		console.log("The payment was succeeded!", payment);
//                     this.props.tranSuccess(payment)
//         }
 
//         const onCancel = (data) => {
//             console.log('The payment was cancelled!', data);
//         }
 
//         const onError = (err) => {
//             console.log("Error!", err);
//              }
 
//         let env = 'sandbox'; // you can set here to 'production' for production
//         let currency = 'USD'; // or you can set this value from your props or state
//         let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
//         // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
       
//         // In order to get production's app-ID, you will have to send your app to Paypal for approval first
//         // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
//         //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
//         // For production app-ID:
//         //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
//         // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
//         let style = {
//             size: 'small',
//             color: 'blue',
//             shape: 'rect',
//             label: 'checkout',
//             tagline: false
//         }
        
       
            
        
//         return (
// <></>
//                      )
//         }}