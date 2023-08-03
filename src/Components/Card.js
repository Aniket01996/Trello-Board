import React, { useState } from 'react';

const Card = ({ id, text, onDragStart, swimlaneId, onCardTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    onCardTextChange(id, swimlaneId, newText); // Call the new callback prop to update text in the Board component
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      className="card"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p>{newText}</p>
      )}
    </div>
  );
};

export default Card;
