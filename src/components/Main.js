import React from 'react'
import { useState } from 'react';

const Main = () => {
  
    
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const [subjects, setSubjects] = useState(storedSubjects);
    const [newSubject, setNewSubject] = useState('');
    const [hours, setHours] = useState(1);
  
    const handleInputChange = (event) => {
      setNewSubject(event.target.value);
    };
  
    const handleHoursChange = (event) => {
      setHours(event.target.value);
    };
  
    const addSubject = () => {
      if (newSubject.trim() !== '' && hours > 0) {
        const updatedSubjects = [...subjects, { name: newSubject, hours: parseInt(hours) }];
        setSubjects(updatedSubjects);
        localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
        setNewSubject('');
        setHours(1);
      }
    };
  
    const handleIncreaseHours = (index) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[index].hours += 1;
      setSubjects(updatedSubjects);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    };
  
    const handleDecreaseHours = (index) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[index].hours -= 1;
      if (updatedSubjects[index].hours < 1) {
        updatedSubjects[index].hours = 1;
      }
      setSubjects(updatedSubjects);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    };
  
    return (
      <div className="App">
        <h1>Education Planner</h1>
        <div className="input-container">
          <input type="text" value={newSubject} onChange={handleInputChange} placeholder="Enter subject name" />
          <input type="number" value={hours} onChange={handleHoursChange} placeholder="Enter study hours" />
          <button className='add-button' onClick={addSubject}>Add Subject</button>
        </div>
        <div className="subject-list">
          {subjects.map((subject, index) => (
            <div className="subject" key={index}>
              <span>{subject.name}</span>
              <div className="hours-container">
                <button className='minus-button' onClick={() => handleDecreaseHours(index)}>-</button>
                <span>{subject.hours} hours</span>
                <button className='plus-button' onClick={() => handleIncreaseHours(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  )
}

export default Main