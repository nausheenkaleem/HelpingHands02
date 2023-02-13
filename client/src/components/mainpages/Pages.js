import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Campaigns from './campaigns/Campaigns'
import DetailCampaign from './detailCampaign/DetailCampaign'
import Login from './auth/Login'
import DonorRegister from './auth/DonorRegister'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateCampaign from './createCampaign/CreateCampaign'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Campaigns} />
            <Route path="/detail/:id" exact component={DetailCampaign} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/donorRegister" exact component={isLogged ? NotFound : DonorRegister} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_campaign" exact component={isAdmin ? CreateCampaign : NotFound} />
            <Route path="/edit_campaign/:id" exact component={isAdmin ? CreateCampaign : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
