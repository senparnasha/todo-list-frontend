import "./Header.css";

import React, { useState, useEffect } from "react";
import "./ListAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Header() {
  const [input, setInput] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/viewtask"); 
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const handleDelete = async (taskId) => {
    console.log("clikeed", taskId);
    try {
      await axios.post("http://localhost:3000/deletetask", {
        task_id: taskId,
      }); 
      fetchData(); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleEdit = async (taskId, newTaskName) => {};

  function handleChange(event) {
    setInput(event.target.value);
    

  }

  const handleAdd = async () => {
    console.log(input);
    
    try {
      const response = await axios.post("http://localhost:3000/addtask", {
        task: input,
      });
      fetchData();
      
      
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="top-box">
      <div className="input-box">
        <input type="text" onChange={handleChange} className="input-style" />
        <button className="btn" onClick={handleAdd}>
          Add
        </button>
        <div className="task-wrapper">
          {tasks.map((task) => (
            <div key={task._id} className="long-box">
              <div
                className="delete-box"
                onClick={() => handleDelete(task.task_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="icon" />
              </div>
              <div
                className="edit-box"
                onClick={() => handleEdit(task.task_id)}
              >
                <FontAwesomeIcon icon={faEdit} className="icon" />
              </div>
              <div>{task.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
