import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: '90%',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
      }
      
      const Childdiv = {
        height: '90%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:30,
        textAlign: 'right',

      }
      
      const progresstext = {
        padding: 20,
        color: 'white',
        fontWeight: 700        
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}
  
export default ProgressBar;