import React, { useState } from 'react';
import './App.css';
import Board from '../src/Components/Board';

const App = () => {
  const [swimlanes, setSwimlanes] = useState([
    { id: 'to-do', title: 'To Do', cards: [{ id: 'card-1', text: 'Task 1' }, { id: 'card-2', text: 'Task 2' }] },
    { id: 'in-progress', title: 'In Progress', cards: [{ id: 'card-3', text: 'Task 3' }] },
    { id: 'completed', title: 'Completed', cards: [{ id: 'card-4', text: 'Task 4' }, { id: 'card-5', text: 'Task 5' }] },
  ]);

  const handleDrop = (event, targetSwimlaneId) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text');
    const sourceSwimlaneId = event.dataTransfer.getData('swimlaneId');
    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id === targetSwimlaneId) {
        const card = swimlanes.find((sl) => sl.id === sourceSwimlaneId).cards.find((c) => c.id === cardId);
        return { ...swimlane, cards: [...swimlane.cards, card] };
      } else if (swimlane.id === sourceSwimlaneId) {
        return { ...swimlane, cards: swimlane.cards.filter((card) => card.id !== cardId) };
      } else {
        return swimlane;
      }
    });
    setSwimlanes(updatedSwimlanes);
  };
  const updateTaskName = (cardId, swimlaneId, newText) => {
    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id === swimlaneId) {
        return {
          ...swimlane,
          cards: swimlane.cards.map((card) => (card.id === cardId ? { ...card, text: newText } : card)),
        };
      }
      return swimlane;
    });
    setSwimlanes(updatedSwimlanes);
  };

  return (
    <div className="App">
      <h1>Trello Board ...</h1>
      <Board swimlanes={swimlanes} handleDrop={handleDrop} updateTaskName={updateTaskName} />
    </div>
  );
};

export default App;
