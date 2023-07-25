import { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [{ title, description, completed }, setTask] = useState({
    title: "",
    description: "",
  });

  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: taskId } = useParams();

  const isEdit = useMemo(() => !!taskId, [taskId]);

  useEffect(() => {
    if (isEdit) {
      const foundTask = tasks.find((t) => t.id === taskId);
      if (foundTask) setTask(foundTask);
    }
  }, [taskId, tasks, isEdit]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: `tasks/${isEdit ? "editTask" : "addTask"}`,
        payload: {
          id: taskId || uuid(),
          title,
          description,
          completed: isEdit ? completed : false,
        },
      });
      navigate("/");
    },
    [title, description, completed, dispatch, navigate, isEdit, taskId]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTask((prev) => ({ ...prev, [name]: value }));
    },
    [setTask]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <div>
        <label htmlFor="title" className="text-sm font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="w-full px-2 py-1 rounded-md bg-zinc-600 mb-2 text-sm"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-bold">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="w-full px-2 py-1 rounded-md bg-zinc-600 mb-2 text-sm"
          value={description}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 px-2 py-1 rounded-md text-sm w-full mt-2"
      >
        {isEdit ? "Edit" : "Create"}
      </button>
    </form>
  );
};

export default TaskForm;
