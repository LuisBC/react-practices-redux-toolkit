import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({
      type: "tasks/deleteTask",
      payload: id,
    });
  };

  const handleUpdate = (id, title, description, completed) => {
    dispatch({
      type: "tasks/editTask",
      payload: {
        id,
        title,
        description,
        completed,
      },
    });
  };

  return (
    <div className="w-4/6 ">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">Tasks {tasks.length}</h1>
        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm"
        >
          New Task
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-3 rounded-md">
        {tasks.map(({ id, title, description, completed }) => (
          <div key={id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between mb-1">
              <h3>{title}</h3>
              <div className="flex gap-2">
                <Link
                  to={`/edit-task/${id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </header>
            <p className="mb-1">{description}</p>
            <div className="flex gap-3 justify-between">
              <label htmlFor="completed">Completed</label>
              <input
                id="completed"
                type="checkbox"
                className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                defaultChecked={completed}
                onChange={(e) =>
                  handleUpdate(id, title, description, e.target.checked)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
