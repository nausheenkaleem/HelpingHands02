import {useState, useEffect} from 'react'
import axios from 'axios'


function CampaignsAPI() {
    const [campaigns, setCampaigns] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getCampaigns = async () => {
            const res = await axios.get(`/api/campaigns?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setCampaigns(res.data.campaigns)
            setResult(res.data.result)
        }
        getCampaigns()
    },[callback, category, sort, search, page])
    
    return {
        campaigns: [campaigns, setCampaigns],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default CampaignsAPI
