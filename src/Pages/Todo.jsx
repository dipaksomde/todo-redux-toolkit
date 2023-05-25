import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoAction, deleteTodoAction, getTodoAction, updateTodoAction } from '../redux/actions/todoAction'
import { invalidate } from '../redux/slice/todoSlice'

const Todo = () => {
  const [updatetodos, setUpdatetodos] = useState({})
  const [deletetodos, setdeletetodos] = useState()

    const dispatch = useDispatch()
    const {todos, todoAdded, loading, updateTodo, deletetodo, error }=useSelector(state=>state.todo)
    const [usertodo, setUsertodo] = useState({
        task : "JavaScript",
        desc : "lern JavaScript",
        priority : "hight"
    })
    const hanldeAddTodo = () => {
        dispatch(addTodoAction(usertodo))
    }
    const handleUpdate = () => {
      dispatch(updateTodoAction(updatetodos))
    }
    const hanldeDeleteTodo = () => {
      dispatch(deleteTodoAction(deletetodos))
    }
    
  const handlePriority = (arg) => {
    switch (arg) {
      case "high": return "bg-success"; break;
      case "medium": return "bg-secondary"; break;
      case "low": return "bg-info"; break;
      default: return "bg-danger"
    }
  }
  useEffect(() => {
   dispatch(getTodoAction())
  }, [])
  
    useEffect(() => {
      if (todoAdded || deletetodo || updateTodo) {
        dispatch(getTodoAction())
        setTimeout(() => {
          dispatch(invalidate(null))
        }, 2000);
      }
    }, [todoAdded, deletetodo, updateTodo ])

    useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(invalidate(null))
        }, 2000);
      }
    }, [error])
    
    
    
    
    const lod = loading && <div className='text-center'><div class="spinner-border text-primary"></div></div>
    
    if (error) {
      return <div class="alert alert-primary">
       {error}
      </div>
    }
  return <>
  {/* {todo&&todo.map(item=><li>{item.task}</li>)} */}
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6 offset-sm-3">
                   { lod}
                   {todoAdded && <div class="alert alert-primary"> Todo Added </div>}
                   { updateTodo&& <div class="alert alert-primary">Todo updated </div>}
                   {deletetodo && <div class="alert alert-primary">  Todo deleted </div>}
                      <div class="card">
                        <div class="card-header">Todo</div>
                        <div class="card-body">
                          <div>
                            <label for="task" class="form-label">First task</label>
                            <input  
                                value={usertodo.task}
                                name='task'
                                onChange={e => setUsertodo({...usertodo, task : e.target.value})}
                              type="text"
                              class="form-control"
                              id="task"
                              placeholder="Enter Your task"
                            />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please add task.</div>
                          </div>
                          <div class="mt-2">
                            <label for="desc" class="form-label">Description</label>
                            <input  
                                value={usertodo.desc}
                                name='desc'
                                onChange={e => setUsertodo({...usertodo, desc : e.target.value})}
                              type="text"
                              class="form-control"
                              id="desc"
                              placeholder="Enter task description"
                            />
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please add description</div>
                          </div>
                          <div class="mt-2">
                            <label for="priority"> Priority</label>
                            <select 
                                value={usertodo.priority}
                                name='priority'
                                onChange={e => setUsertodo({...usertodo, priority : e.target.value})}
                             class="form-select" id="priority">
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                          </div>
                          <button onClick={hanldeAddTodo} type="button" class="btn btn-primary w-100 mt-3">
                            Add Todo
                          </button>
                        </div>
                      </div>
                      {/* output start */}
                      {
                        todos && todos.map(item =>
                          <div className={`card mt-4  ${handlePriority(item.priority)}`}>
                        <div
                          class="card-header d-flex justify-content-between"
                          data-bs-toggle="collapse"
                          data-bs-target={`#task${item.id}`}
                        >
                         {item.task}
                          <div>
                            <button
                            onClick={e => setUpdatetodos(item)}
                              type="button"
                              class="btn btn-sm btn-warning"
                              data-bs-target="#editModal"
                              data-bs-toggle="modal"
                            >
                              edit
                            </button>
                            <button
                            onClick={e => setdeletetodos(item.id)}
                              type="button"
                              class="btn btn-sm btn-danger"
                              data-bs-target="#deleteModal"
                              data-bs-toggle="modal"
                            >
                              delete
                            </button>
                          </div>
                        </div>
                        <div class="collapse" id={`task${item.id}`}>
                          <div class="card-body">task 1 description</div>
                        </div>
                      </div>
                        )
                      }
                       {/* output end */}
                    </div>
                  </div>
                </div>
                {/* edit Modal  */}
                <div class="modal fade" id="editModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="editModal">Edit Todo</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div>
                          <label for="mtask" class="form-label">First task</label>
                          <input
                            name='task'
                            value={updatetodos.task}
                            onChange={e=> setUpdatetodos({...updatetodos, task: e.target.value})}
                            type="text"
                            class="form-control"
                            id="mtask"
                            placeholder="Enter Your task"
                          />
                          <div class="valid-feedback">Looks good!</div>
                          <div class="invalid-feedback">Please add task.</div>
                        </div>
                        <div class="mt-2">
                          <label for="mdesc" class="form-label">Description</label>
                          <input
                            name='desc'
                            value={updatetodos.desc}
                            onChange={e=> setUpdatetodos({...updatetodos, desc: e.target.value})}
                            type="text"
                            class="form-control"
                            id="mdesc"
                            placeholder="Enter task description"
                          />
                          <div class="valid-feedback">Looks good!</div>
                          <div class="invalid-feedback">Please add description</div>
                        </div>
                        <div class="mt-2">
                          <label for="mpriority"> Priority</label>
                          <select class="form-select" id="mpriority">
                              name='priority'
                              value={updatetodos.priority}
                              onChange={e=> setUpdatetodos({...updatetodos, priority: e.target.value})}
                            <option selected>Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <button onClick={handleUpdate} type="button" data-bs-dismiss="modal" class="btn btn-primary w-100 mt-3">
                          Update Todo
                        </button>
                        <button
                          type="button"
                          class="btn mt-2 w-100 btn-outline-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Delete Modal  */}
                <div class="modal fade" id="deleteModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-danger">
                          Are you sure you want delete this todo ?
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body text-danger">
                        <p class="text-center text-muted mb-5">
                          You can delete this todo at any time. If you change your mind, you
                          might not be able to recover it
                        </p>
                        <div class="btn-group w-100">
                          <button onClick={hanldeDeleteTodo} data-bs-dismiss="modal" type="button" class="btn btn-outline-danger">Yes</button>
                          <button data-bs-dismiss="modal" type="button" class="btn btn-success">NO</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  </>
}

export default Todo