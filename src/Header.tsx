import React from 'react';
import './headercss.css';
import image from './Images/banklog.jpeg'
type Props = {};

export const Header = (props:Props) => {
  return (
    <div className='Header-comp'>   
    <h1 >Banking Application</h1>
    <img src={image}alt=""></img>

    </div>
  )
}
