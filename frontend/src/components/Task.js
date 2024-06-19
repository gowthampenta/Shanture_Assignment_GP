import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ task, onToggleComplete, onDelete }) => {
  return (
    <ListItem>
      <Checkbox checked={task.completed} onChange={onToggleComplete} />
      <ListItemText
        primary={task.description}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
      <IconButton edge="end" aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default Task;
