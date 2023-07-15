import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import CampaignItem from '../utils/campaignItem/CampaignItem'


function DetailCampaign() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [campaigns] = state.campaignsAPI.campaigns
    const addCart = state.userAPI.addCart
    const [detailCampaign, setDetailCampaign] = useState([])

    // const handleToken = (totalAmount, token) => {
    //     try {
    //         Axios.post("http://localhost:5000/payment/pay", {
    //             token: token.id,
    //             amount: totalAmount
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const tokenHandler = (token) => {
    //     handleToken(100, token)
    // }

    useEffect(() =>{
        if(params.id){

            campaigns.forEach(campaign => {
                if(campaign._id === params.id) setDetailCampaign(campaign)
            })
        }
    },[params.id, campaigns])

    if(detailCampaign.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailCampaign.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailCampaign.title}</h2>
                        <h6>#id: {detailCampaign.campaign_id}</h6>
                    </div>
                    <span>Rs. {detailCampaign.amount_req}</span>
                    <p>{detailCampaign.phone_number}</p>
                    <p>{detailCampaign.description}</p>
                    <p>{detailCampaign.content}</p>

                    <p>Donations Received: {detailCampaign.donated}</p>
                    {/* <Link to="/cart" className="cart"
                    onClick={() => addCart(detailCampaign)}>
                        Donate Now
                    </Link> */}
                    <div className="total">
            <a href="https://donate.stripe.com/test_bIY28J18j8Fg9SU148">
              <button>Donate Now</button>
            </a> 
            {/* <StripeCheckout
            stripeKey=""
            token={tokenHandler}/> */}
          </div> 
                </div>
            </div>

            <div>
                <h2>Related campaigns</h2>
                <div className="campaigns">
                    {
                        campaigns.map(campaign => {
                            return campaign.category === detailCampaign.category
                                ? <CampaignItem key={campaign._id} campaign={campaign} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailCampaign
