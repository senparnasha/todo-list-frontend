import "./Header.css";
import React, { useState, useEffect } from "react";
import "./ListAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function Header() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [editInput,setEditInput]=useState('')
  const [editingTask, setEditingTask] = useState(null);

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
    try {
      await axios.post("http://localhost:3000/deletetask", {
        task_id: taskId,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put("http://localhost:3000/updatetask", {
        task_id: editingTask.taskId,
        task: editInput,
      });
      setModal(false);
      setEditInput("");
      fetchData(); // Fetch the updated tasks after editing
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  function handleChange(event) {
    setInput(event.target.value);
  }
function handleEditChange(event){
  console.log(event.target.value)
  setEditInput(event.target.value)
}
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/addtask", {
        task: input,
      });
      setInput("");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openEditModal = (taskId, taskName) => {
    setEditingTask({ taskId: taskId, taskName: taskName });
    setEditInput(taskName);
    setModal(true);
  };

  return (
    <div className="top-box">
      <div className="input-box">
        <input type="text" value={input} onChange={handleChange} className="input-style" />
        <button className="btn" onClick={handleAdd}>
          Add
        </button>
        <div className="task-wrapper">
          {tasks.map((task) => (
            <div key={task._id} className="long-box">
              <div className="delete-box" onClick={() => handleDelete(task.task_id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="icon" />
              </div>
              <div className="edit-box" onClick={() => openEditModal(task.task_id, task.task)}>
                <FontAwesomeIcon icon={faEdit} className="icon" />
              </div>
              <div>{task.task}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Edit */}
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Task</ModalHeader>
        <ModalBody>
          <input type="text" value={editInput} onChange={handleEditChange} className="input-style" />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setModal(false)}>Cancel</button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Header;
