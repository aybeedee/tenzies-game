import React from "react"
import {nanoid} from "nanoid"

export default function Die(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    let circleStyles = []
    
    for (let i = 0; i < 9; i++) {
        
        circleStyles[i] = {backgroundColor: "transparent"}
    }
    
    if (props.value === 1) {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return index === 4 ? {backgroundColor: "#2B283A"} : circle 
        })
    } 
    
    else if (props.value === 2) {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return (index === 2 || index === 6) ? {backgroundColor: "#2B283A"} : circle 
        })
    }
    
    else if (props.value === 3) {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return (index === 2 || index === 6 || index === 4) ? {backgroundColor: "#2B283A"} : circle 
        })
    }
    
    else if (props.value === 4) {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return (index === 0 || index === 2 || index === 6 || index === 8) ? {backgroundColor: "#2B283A"} : circle 
        })
    }
    
    else if (props.value === 5) {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return (index === 0 || index === 2 || index === 6 || index === 8 || index === 4) ? {backgroundColor: "#2B283A"} : circle 
        })
    }
    
    else {
        
        circleStyles = circleStyles.map((circle, index) => {
            
            return (index === 0 || index === 3 || index === 6 || index === 2 || index === 5 || index === 8) ? {backgroundColor: "#2B283A"} : circle 
        })   
    }
    
    const circleElements = circleStyles.map(circleStyle => {
        
        return <div key = {nanoid()} className = "die-circles" style = {circleStyle}></div>
    })
    
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <div className = "circles-container">
                {circleElements}
            </div>
        
        </div>
    )
}