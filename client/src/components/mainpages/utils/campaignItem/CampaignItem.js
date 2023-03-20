import React from 'react'
import BtnRender from './BtnRender'
import ProgressBar from './progressBar'

function CampaignItem({campaign, isAdmin, deleteCampaign, handleCheck, isDonee}) {

    return (
        <div className="campaign_card">
            {
                isDonee || isAdmin && <input type="checkbox" checked={campaign.checked}
                onChange={() => handleCheck(campaign._id)} />
            }
            <img src={campaign.images.url} alt="" />

            <div className="campaign_box">
                <h2 title={campaign.title}>{campaign.title}</h2>
                {/* <span>Rs.{campaign.amount_req}</span> */}
                <ProgressBar bgcolor="teal" progress='30'   />
                <p>{campaign.description}</p>
            </div>

            
            <BtnRender campaign={campaign} deleteCampaign={deleteCampaign} />
        </div>
    )
}

export default CampaignItem
