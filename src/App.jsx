import React from 'react'
import Calendar from './Calendar.jsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Interactive Event Calendar</h1>
        <p>Click on any date to view events for that day</p>
      </header>
      <main className="app-main">
        <Calendar />
      </main>
      <footer className="app-footer">
        <p>Built with React - Question 12 Lab Assignment</p>
      </footer>
    </div>
  )
}

export default App
