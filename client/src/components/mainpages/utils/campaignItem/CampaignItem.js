import React from 'react'
import BtnRender from './BtnRender'

function CampaignItem({campaign, isAdmin, deleteCampaign, handleCheck}) {

    return (
        <div className="campaign_card">
            {
                isAdmin && <input type="checkbox" checked={campaign.checked}
                onChange={() => handleCheck(campaign._id)} />
            }
            <img src={campaign.images.url} alt="" />

            <div className="campaign_box">
                <h2 title={campaign.title}>{campaign.title}</h2>
                <span>${campaign.price}</span>
                <p>{campaign.description}</p>
            </div>

            
            <BtnRender campaign={campaign} deleteCampaign={deleteCampaign} />
        </div>
    )
}

export default CampaignItem
