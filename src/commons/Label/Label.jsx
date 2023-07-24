import React from "react";
import './Label.css';

export function Label({text, classLabel}){
    return <div>
        <label className={classLabel}>{text}</label>
        
    </div>
};

