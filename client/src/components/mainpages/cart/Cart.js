// import React, {useContext, useState, useEffect} from 'react'
// import {GlobalState} from '../../../GlobalState'
// import axios from 'axios'
// import DonateButton from './DonateButton'

// function Cart() {
//     const state = useContext(GlobalState)
//     const [cart, setCart] = state.userAPI.cart
//     const [token] = state.token
//     const [total, setTotal] = useState(0)

//     useEffect(() =>{
//         const getTotal = () =>{
//             const total = cart.reduce((prev, item) => {
//                 return prev + (item.price * item.quantity)
//             },0)

//             setTotal(total)
//         }

//         getTotal()

//     },[cart])

//     const addToCart = async (cart) =>{
//         await axios.patch('/user/addcart', {cart}, {
//             headers: {Authorization: token}
//         })
//     }


//     const increment = (id) =>{
//         cart.forEach(item => {
//             if(item._id === id){
//                 item.quantity += 1
//             }
//         })

//         setCart([...cart])
//         addToCart(cart)
//     }

//     const decrement = (id) =>{
//         cart.forEach(item => {
//             if(item._id === id){
//                 item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
//             }
//         })

//         setCart([...cart])
//         addToCart(cart)
//     }

//     const removeCampaign = id =>{
//         if(window.confirm("Do you want to delete this campaign?")){
//             cart.forEach((item, index) => {
//                 if(item._id === id){
//                     cart.splice(index, 1)
//                 }
//             })

//             setCart([...cart])
//             addToCart(cart)
//         }
//     }

//     const tranSuccess = async(payment) => {
//         const {paymentID, address} = payment;

//         await axios.post('/api/payment', {cart, paymentID, address}, {
//             headers: {Authorization: token}
//         })

//         setCart([])
//         addToCart([])
//         alert("You have successfully placed an order.")
//     }


//     if(cart.length === 0) 
//         return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

//     return (
//         <div>
//             {
//                 cart.map(campaign => (
//                     <div className="detail cart" key={campaign._id}>
//                         <img src={campaign.images.url} alt="" />

//                         <div className="box-detail">
//                             <h2>{campaign.title}</h2>

//                             <h3>$ {campaign.price * campaign.quantity}</h3>
//                             <p>{campaign.description}</p>
//                             <p>{campaign.content}</p>

//                             <div className="amount">
//                                 <button onClick={() => decrement(campaign._id)}> - </button>
//                                 <span>{campaign.quantity}</span>
//                                 <button onClick={() => increment(campaign._id)}> + </button>
//                             </div>
                            
//                             <div className="delete" 
//                             onClick={() => removeCampaign(campaign._id)}>
//                                 X
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }

//             <div className="total">
//                 <h3>Total: $ {total}</h3>
//                 <DonateButton
//                 total={total}
//                 tranSuccess={tranSuccess} />
//             </div>
//         </div>
//     )
// }

// export default Cart
