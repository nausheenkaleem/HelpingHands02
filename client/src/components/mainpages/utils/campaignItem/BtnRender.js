import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({campaign, deleteCampaign}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_donate" to="#!" 
                    onClick={() =>deleteCampaign(campaign._id, campaign.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_campaign/${campaign._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_donate" to="#!" onClick={() => addCart(campaign)}>
                        Donate
                    </Link>
                    <Link id="btn_view" to={`/detail/${campaign._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
