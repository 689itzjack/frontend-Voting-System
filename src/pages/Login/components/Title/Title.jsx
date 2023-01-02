import React from 'react';
import './Title.css';

export const Title = ({textTitle}) => {
    return <div className='titleContainer'>
        <label className='titleLabel'>{textTitle}</label>
    </div>
}