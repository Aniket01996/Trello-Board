import React, { useState } from 'react';
import Card from './Card';

const Board = ({ swimlanes: initialSwimlanes, updateTaskName }) => {
  const [swimlanes, setSwimlanes] = useState(initialSwimlanes);
  const [newTaskText, setNewTaskText] = useState('');

  const handleDragStart = (event, cardId, sourceSwimlaneId) => {
    event.dataTransfer.setData('text', cardId);
    event.dataTransfer.setData('swimlaneId', sourceSwimlaneId);
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event, targetSwimlaneId) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text');
    const sourceSwimlaneId = event.dataTransfer.getData('swimlaneId');

    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id === sourceSwimlaneId) {
        return {
          ...swimlane,
          cards: swimlane.cards.filter((card) => card.id !== cardId),
        };
      }
      if (swimlane.id === targetSwimlaneId) {
        const card = swimlanes.find((sl) => sl.id === sourceSwimlaneId)?.cards.find((c) => c.id === cardId);
        if (card) {
          const updatedCard = { ...card, swimlaneId: targetSwimlaneId };
          return {
            ...swimlane,
            cards: [...swimlane.cards, updatedCard],
          };
        }
      }
      return swimlane;
    });

    setSwimlanes(updatedSwimlanes);
  };

  const handleCardTextChange = (cardId, swimlaneId, newText) => {
    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id === swimlaneId) {
        const updatedCards = swimlane.cards.map((card) =>
          card.id === cardId ? { ...card, text: newText } : card
        );
        return {
          ...swimlane,
          cards: updatedCards,
        };
      }
      return swimlane;
    });

    setSwimlanes(updatedSwimlanes);
  };

  const addNewTask = (swimlaneId) => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: `card-${Date.now()}`,
        text: newTaskText,
      };

      const updatedSwimlanes = swimlanes.map((swimlane) => {
        if (swimlane.id === swimlaneId) {
          return {
            ...swimlane,
            cards: [...swimlane.cards, newTask],
          };
        }
        return swimlane;
      });

      updateTaskName(newTask.id, swimlaneId, newTask.text); 
      setSwimlanes(updatedSwimlanes);
      setNewTaskText('');
    }
  };

  return (
    <div className="board">
      {swimlanes.map((swimlane) => (
        <div key={swimlane.id} className="swimlane" onDrop={(event) => handleDrop(event, swimlane.id)} onDragOver={(event) => event.preventDefault()}>
          <h3>{swimlane.title}</h3>
          {swimlane.cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              onDragStart={(e) => handleDragStart(e, card.id, swimlane.id)}
              swimlaneId={swimlane.id}
              onCardTextChange={handleCardTextChange}
              draggable
            />
          ))}
          {swimlane.title === 'To Do' && (
            <div className="add-task-section">
              <input
                type="text"
                placeholder="Enter new task name"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
              <button onClick={() => addNewTask(swimlane.id)}>Add Task</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
