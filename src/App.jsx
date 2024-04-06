import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveTOLS = (parse) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showfinished);
  };

  const handelEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handelDelet = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    confirm("Are you sure to delet this ?") && setTodos([...newTodos]);
    saveTOLS();
  };
  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTOLS();
  };
  const handelChange = (e) => {
    setTodo(e.target.value);
  };
  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTOLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-5 md:mx-auto my-5 rounded-xl p-5 bg-violet-50  min-h-[80vh] ">
        <div className="addTodo">
          <h2 className="text-lg font-bold my-5">Add a Todo</h2>
          <input
            onChange={handelChange}
            value={todo}
            type="text"
            className="w-1/2 rounded-lg "
          />
          <button
            onClick={handelAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            <MdAssignmentAdd />
          </button>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showfinished}
        />
        Show Finished
        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos Yet.</div>}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-1/2 justify-between my-3"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handelCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handelEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handelDelet(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
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
