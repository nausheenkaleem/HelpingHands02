import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import './home.css'

function Home ()  {
  return (
    <div className="container">
      <h1 className="title">For Cash/Cheque Deposit</h1>
      <section class='FlexContainer'>
            <div> <h3> Account Title:  </h3>
            <h3> Bank Name:  </h3>
            <h3> IBAN Number:  </h3>
            <h3> Branch Code: </h3>
            <h3> Branch Address:  </h3>
            <h3> Contact Number: </h3>


</div>
            <div><p className="description"> Syed Ali Hasan </p>
            <p className="description"> Silk bank </p>
                        <p className="description"> PK06 SAUD 0050 9650 0038 7087  </p>
                        <p className="description"> 5096</p>
                        <p className="description"> B15/2 Block 3 A Gulistan-e-Jauhar near Kamran Chowrangi </p>
                        <p className="description"> +92 336 3226931  </p>
            </div>

        </section>
    
    </div>
  );
};

export default Home;