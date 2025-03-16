import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    if (todo.trim() !== "") {
      alert(
        "Please clear or save the input box text before editing another item."
      );
      return;
    }

    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm("Are you sure want to delete todo?");
    if (isConfirmed) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      saveToLS();
    }
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 bg-gradient-to-r from-purple-100 to-indigo-100 min-h-[80vh] rounded-xl shadow-lg mt-16 max-w-4xl">
        {/* Add Todo Section */}
        <div className="addTodo my-5 text-center">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Add a Todo
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter a new todo..."
              className="w-full md:w-2/3 p-3 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="w-full md:w-auto bg-purple-800 hover:bg-purple-900 disabled:bg-purple-400 p-3 text-white text-sm font-bold rounded-lg transition-all"
            >
              Add Todo
            </button>
          </div>
        </div>

        {/* Show Finished Todos Checkbox */}
        <div className="my-5 flex items-center justify-center">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="w-5 h-5 mr-2 cursor-pointer"
          />
          <label htmlFor="show" className="text-purple-900 font-semibold">
            Show Finished Todos
          </label>
        </div>

        {/* Todo List Section */}
        <h2 className="text-2xl font-bold text-purple-900 mb-4 text-center">
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-purple-700 text-center">
              No todos to display
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo w-full flex flex-col md:flex-row items-center justify-between p-4 my-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div
                      className={`text-lg w-full md:w-auto break-words ${
                        item.isCompleted
                          ? "line-through text-gray-400"
                          : "text-purple-900"
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex gap-4 mt-4 md:mt-0 w-full md:w-auto justify-center">
                    {/* Edit Icon */}
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="text-purple-600 hover:text-purple-700 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={20} />
                    </button>

                    {/* Delete Icon */}
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="text-red-600 hover:text-red-700 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
