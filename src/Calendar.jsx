import React, { useState } from 'react'
import './Calendar.css'

// Helper function to get all days in current month
const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1)
  const days = []
  
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

// Helper function to get month name
const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[monthIndex]
}

// Helper function to get day names
const getDayNames = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

const Calendar = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const [selectedDate, setSelectedDate] = useState(null)

  // Predefined events array with date, title, and description
  const events = [
    { 
      date: "2025-10-10", 
      title: "Project Deadline", 
      description: "Submit final project files and documentation" 
    },
    { 
      date: "2025-10-15", 
      title: "Team Meeting", 
      description: "Weekly sync-up and progress review" 
    },
    { 
      date: "2025-10-20", 
      title: "Operating Systems Exam", 
      description: "Final examination for OS course" 
    },
    { 
      date: "2025-10-25", 
      title: "React Workshop", 
      description: "Advanced React concepts and best practices" 
    },
    { 
      date: "2025-10-30", 
      title: "Code Review", 
      description: "Peer code review session" 
    }
  ]

  // Get events for selected date
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().slice(0, 10)
    return events.filter(event => event.date === dateString)
  }

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date)
  }

  // Check if date has events
  const hasEvents = (date) => {
    const dateString = date.toISOString().slice(0, 10)
    return events.some(event => event.date === dateString)
  }

  // Check if date is selected
  const isSelected = (date) => {
    return selectedDate && 
           date.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10)
  }

  // Check if date is today
  const isToday = (date) => {
    const todayString = today.toISOString().slice(0, 10)
    const dateString = date.toISOString().slice(0, 10)
    return todayString === dateString
  }

  const days = getDaysInMonth(year, month)
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{getMonthName(month)} {year}</h2>
      </div>
      
      {/* Day names header */}
      <div className="calendar-days-header">
        {getDayNames().map(day => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map(day => {
          const dayClasses = [
            'calendar-day',
            hasEvents(day) ? 'has-events' : '',
            isSelected(day) ? 'selected' : '',
            isToday(day) ? 'today' : ''
          ].filter(Boolean).join(' ')

          return (
            <button
              key={day.toISOString().slice(0, 10)}
              className={dayClasses}
              onClick={() => handleDateClick(day)}
            >
              <span className="day-number">{day.getDate()}</span>
              {hasEvents(day) && <span className="event-indicator">•</span>}
            </button>
          )
        })}
      </div>

      {/* Event Display Section */}
      <div className="events-section">
        {selectedDate ? (
          <div className="events-container">
            <h3>
              Events for {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            
            {selectedEvents.length > 0 ? (
              <div className="events-list">
                {selectedEvents.map((event, index) => (
                  <div key={index} className="event-item">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-description">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events">
                <p>No events scheduled for this date</p>
              </div>
            )}
          </div>
        ) : (
          <div className="select-date-prompt">
            <p>Select a date to view events</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
