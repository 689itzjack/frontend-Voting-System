import React from 'react';
import './Title.css';

export const Title = ({textTitle, classType}) => {
    return <div className='titleContainer'>
        <label className={classType}>{textTitle}</label>
    </div>
}