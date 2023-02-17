import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [dashboard, setDashboard] = state.userAPI.dashboard
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getDashboard = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setDashboard(res.data)
                }else{
                    const res = await axios.get('/user/dashboard', {
                        headers: {Authorization: token}
                    })
                    setDashboard(res.data)
                }
            }
            getDashboard()
        }
    },[token, isAdmin, setDashboard])

    return (
        <div className="dashboard-page">
            <h2>Dashboard</h2>

            <h4>You have {dashboard.length} donations</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Donation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dashboard.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/dashboard/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
