import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    campaign_id: '',
    title: '',
    amount_req: 0,
    phone_number:'0',
    description: 'Add a description for your campaign',
    content: 'Enter all the details regarding your case',
    category: '',
    _id: ''
}

function CreateCampaign() {
    const state = useContext(GlobalState)
    const [campaign, setCampaign] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [isDonee] = state.userAPI.isDonee



    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const dashboard = useHistory()
    const param = useParams()

    const [campaigns] = state.campaignsAPI.campaigns
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.campaignsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            campaigns.forEach(campaign => {
                if(campaign._id === param.id) {
                    setCampaign(campaign)
                    setImages(campaign.images)
                }
            })
        }else{
            setOnEdit(false)
            setCampaign(initialState)
            setImages(false)
        }
    }, [param.id, campaigns])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') 
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setCampaign({...campaign, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/campaigns/${campaign._id}`, {...campaign, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/campaigns', {...campaign, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            dashboard.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_campaign">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="campaign_id">Campaign ID</label>
                    <input type="text" name="campaign_id" id="campaign_id" required
                    value={campaign.campaign_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={campaign.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="amount_req">Amount Required</label>
                    <input type="number" name="amount_req" id="amount_req" required
                    value={campaign.amount_req} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" name="phone_number" id="phone_number" required
                    value={campaign.phone_number} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={campaign.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={campaign.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={campaign.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateCampaign
