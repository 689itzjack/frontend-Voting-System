import React from 'react';
import './Modal.css';
//import votingPhoto from '../../assets/images/Picture1.png'


export const Modal = ({opened, closeModal, addr}) => {

function handlerClose(){
    closeModal(false);
}

  return (
    <article className={`modal ${opened && 'is-open'}`}>

        <div className='modal-container'>

            <button className='modal-close' onClick={handlerClose}>X</button>
            <h1>Voting in process... </h1>
            <h2>The results till now are:</h2>
            <h2>The addr is: {addr}</h2>

        </div>

    </article>
  )
}
