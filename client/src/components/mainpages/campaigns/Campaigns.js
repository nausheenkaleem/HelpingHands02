import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import CampaignItem from '../utils/campaignItem/CampaignItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Campaigns() {
    const state = useContext(GlobalState)
    const [campaigns, setCampaigns] = state.campaignsAPI.campaigns
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.campaignsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        campaigns.forEach(campaign => {
            if(campaign._id === id) campaign.checked = !campaign.checked
        })
        setCampaigns([...campaigns])
    }

    const deleteCampaign = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post(url+ '/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteCampaign = axios.delete(url+`/api/campaigns/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteCampaign
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        campaigns.forEach(campaign => {
            campaign.checked = !isCheck
        })
        setCampaigns([...campaigns])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        campaigns.forEach(campaign => {
            if(campaign.checked) deleteCampaign(campaign._id, campaign.images.public_id)
        })
    }

    if(campaigns.length === 0) 
    return <h2 style={{textAlign: "center", fontSize: "2re"}}>No Campaigns Found</h2> 

    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="campaigns">
            {
                campaigns.map(campaign => {
                    return <CampaignItem key={campaign._id} campaign={campaign}
                    isAdmin={isAdmin} deleteCampaign={deleteCampaign} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {campaigns.length === 0 && <Loading />}
        </>
    )
}

export default Campaigns
