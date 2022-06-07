import Header from '../components/Header'
import Tasks from '../components/Tasks'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask } from '../features/task/taskSlice';

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const taskList = useSelector((state) => state.tasks.value);

  // add a task

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    const id = Math.floor(Math.random() * 1000) + 1;

    dispatch(addTask({ id: id, text, day, reminder }));
  };

  // delete a task

  const deleteItem = (id) => {
    //  dispatch(deleteTask({id}))
    console.log(id);
    dispatch(deleteTask(id));
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            placeholder="Add Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Date & Time</label>
          <input
            type="text"
            placeholder="Add Task"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="form-control form-control-check">
          <label>Task</label>
          <input
            type="checkbox"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        {/* <input type='submit' value='Save Task' className="btn btn-block" onClick={() => {dispatch(addTask({id: 0, text, day, reminder}))}}/> */}
        <input type="submit" value="Save Task" className="btn btn-block" />
      </form>

      {/* {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task to show"
      )} */}

      <Tasks tasks={taskList} onDelete={(id) => deleteItem(id)} />
    </div>
  );
};

export default Home;
