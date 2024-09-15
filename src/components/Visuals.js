import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BubbleSort from './BubbleSort';
import MergeSort from './MergeSort';
import SelectionSort from './SelectionSort';

import './Visuals.css';

function Visuals() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();
   const color = myState.color;
   const range = myState.range;

   const changeValues = () => {
      dispatch({
         type:'CHANGE_VALUES'
      })
   }

   const handlePlayPause = (play) => {
      if(!myState.play){
         document.getElementById('change-btn').disabled = true;
         document.getElementById('change-btn').style.backgroundColor = 'grey';
         document.getElementById('play-btn').disabled = true;
         document.getElementById('play-btn').style.backgroundColor = 'grey';
      }
      else{
         return;
      }
      dispatch({
         type: 'PLAY_PAUSE',
         _play: play
      })
   }

   useEffect(() => {
      if(!myState.play){
         document.getElementById('play-btn').disabled = false;
         document.getElementById('play-btn').style.backgroundColor = 'rgb(0, 149, 199)';
         document.getElementById('change-btn').disabled = false;
         document.getElementById('change-btn').style.backgroundColor = 'rgb(0, 149, 199)';
      }
   },[myState.play]);

   let speed = myState.speed;
   if(myState.algorithm==='selection')
      speed *= 3;
   else if(myState.algorithm==='merge')
      speed *= 5;
  return (
    <div className="visuals">
      <div className="visualizer">
         {
            <div className="visual__items" style={{width:`${myState.values.length*11}px`}}>
               {
                  myState.values.map((item) => {
                     
                     return <div className="visual__item" key={item[1]} id={item[1]} style={{transition:`${speed/1000}s linear all`, transform:`translateX(${item[1]*11}px)`}}>
                              <h4>{item[0]}</h4>
                              <div className="visual" style={{height:`${item[0]*3}px`, backgroundColor:color, width:(range<35? '8px': '6px')}}></div>
                           </div>
                  })
               }   
            </div>
         }
      </div>
      <div className="visual__btns">
         <button id = 'change-btn' onClick = {changeValues}>change values</button>   
         <button id='play-btn' onClick = {() => handlePlayPause(true)}>play</button>
      </div>

      <BubbleSort/>
      <MergeSort />
      <SelectionSort />
   </div>
  )
}

export default Visuals;