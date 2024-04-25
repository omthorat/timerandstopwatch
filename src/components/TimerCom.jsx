import './TimerCom.css'
import { useState,useRef } from 'react'
const TimerCom=()=>{
 
  let [hourValue,setHourVlaue]=useState("")
  let [minValue,setMinVlaue]=useState("")
  let [secValue,setSecVlaue]=useState("")
  const [startbtn,setStartbtn]=useState({display: "initial"})
  const [stopbtn,setStopbtn]=useState({display: "none"})
  const [intervalId,setIntervalId]=useState(null)
   const stopingRef=useRef()
  const onChangeHandler=(e,time)=>{
   const maxLength=2
   if(e.target.value.length<=maxLength){
    if(time==="hour"){
      setHourVlaue(e.target.value)
    }else if (time==="min"){
      setMinVlaue(e.target.value)
    }else if(time === "sec"){
      setSecVlaue(e.target.value)
    }
   }
  }
   const startTimer=()=>{
    if(hourValue==="" && minValue ==="" && secValue==="") return;
    function startInterval() {
      setStartbtn({display: "none"})
      setStopbtn({display: "initial"})
   
   const id=setInterval(()=>{
        timer()
      },1000)
      setIntervalId(id)
    }
   startInterval()
   }
  
  const stopInterval=(state)=>{
    console.log(state)
    stopingRef.current.innerHTML=state ==="pause"?"Countinue":"Start"
    setStartbtn({display: "initial"})
      setStopbtn({display: "none"})
      clearInterval(intervalId)
      setIntervalId(null)
  }

  const resetInterval=()=>{
    hourValue=""
    minValue=""
    secValue=""
    setHourVlaue(hourValue)
    setMinVlaue(minValue)
    setSecVlaue(secValue)
    stopInterval()
  }
   const timer=()=>{

    if(secValue > 60){
     minValue++;
     setMinVlaue(minValue)
     secValue=secValue -59

    }
    if(minValue > 60){
    hourValue++;
    setHourVlaue(hourValue)
    minValue=minValue-60
    }
    if(hourValue==="" && minValue ==="" && secValue===""){
      hourValue="";
      minValue="";
      secValue=""
    }else if(secValue != 0){
      
      secValue=`${secValue<=10?"0":""}${secValue - 1}`
      setSecVlaue(secValue)
    }
    else if(minValue != 0 && secValue == 0){
      secValue=59
      setSecVlaue(secValue)
      minValue=`${minValue<=10?"0":""}${minValue - 1}`
      setMinVlaue(minValue)
    }
    else if(hourValue != 0 && minValue == 0){
      console.log(hourValue)
      minValue=60
      setMinVlaue(secValue)
      hourValue=`${hourValue<=10?"0":""}${hourValue - 1}`
      setHourVlaue(hourValue)
    }
   }
 
    return(
        <>
        <div className="timer-func">
        <div className="hour-div">
        <label htmlFor="">Hour</label>
        <input type="number" value={hourValue} className="Hour" placeholder="00"  onChange={(e)=>onChangeHandler(e,"hour")}  />
        </div>
        <p>:</p>
        <div className="min-div">
        <label htmlFor="">Minutes</label>
        <input type="number" className="min" value={minValue} placeholder="00" onChange={(e)=>onChangeHandler(e,"min")}/>
        </div>
        <p>:</p>
        <div className="sec-div">
        <label htmlFor="">Seconds</label>
        <input type="number" className="sec" value={secValue} maxLength={2} placeholder="00" onChange={(e)=>onChangeHandler(e,"sec")}/>
        </div>
        </div>
        <div className='timerbtn'>
        <button className='start'ref={stopingRef} style={startbtn}onClick={()=>startTimer()}>Start</button>
        <button className='stop'  style={stopbtn} onClick={()=>stopInterval("pause")}>Stop</button>
        <button className='reset' onClick={()=>{resetInterval()}} >Reset</button>
        </div>

        </>
    )
}
export default TimerCom