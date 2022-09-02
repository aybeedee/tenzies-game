import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [timeoutID, setTimeoutID] = React.useState(0)
    const [best, setBest] = React.useState(JSON.parse(localStorage.getItem("bestTime")) || 5000)
    
    React.useEffect(() => {
        
        if ((time !== 0) && (time < JSON.parse(localStorage.getItem("bestTime")))) {
            setBest(time)
        }
        localStorage.setItem("bestTime", JSON.stringify(best))
    }, [tenzies])
    
    React.useEffect(() => {
        setTimeoutID(setTimeout(() => {setTime(prevTime => (prevTime+1))}, 1000))
    }, [time])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            clearTimeout(timeoutID)
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevRolls => (prevRolls + 1))
            
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setTime(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {value: die.value, isHeld: !die.isHeld, id: die.id} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <p className = "rolls">Number of rolls: {rolls}</p>
            <p className = "time">Time: {time}</p>
            <p className = "best">Best time: {best === 5000 ? "none" : best}</p>
        </main>
    )
}