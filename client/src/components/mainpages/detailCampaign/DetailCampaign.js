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
                    <span>$ {detailCampaign.price}</span>
                    <p>{detailCampaign.description}</p>
                    <p>{detailCampaign.content}</p>
                    <p>Sold: {detailCampaign.sold}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailCampaign)}>
                        Buy Now
                    </Link>
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
