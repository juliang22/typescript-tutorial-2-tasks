import React, { useEffect, useRef, useState } from 'react'
import { Todo as TodoModel } from '../model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type TodoProps = {
	index: number
	todo: TodoModel
	todos: TodoModel[]
	setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
}
const Todo = ({ index, todo, todos, setTodos }: TodoProps) => {
	const [edit, setEdit] = useState<boolean>(false)
	const [editTodo, setEditTodo] = useState<string>(todo.todo)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [edit])


	const handleDone = (currId: number) => {
		setTodos(todos.map((todo) => todo.id === currId ? { ...todo, isDone: !todo.isDone } : todo))
	}

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id))
	}

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault()

		setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: editTodo } : todo))
		setEdit(false)
	}

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{
				(provided, snapshot) => (
					<form
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						action="submit"
						className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
						onSubmit={(e) => handleEdit(e, todo.id)}
					>
						{edit ? (
							<input
								ref={inputRef}
								value={editTodo}
								onChange={(e) => setEditTodo(e.target.value)}
								className="todos__single--text"
							/>
						) : todo.isDone ? (
							<s className="todos__single--text">{todo.todo}</s>
						) : (
							<span className="todos__single--text">{todo.todo}</span>
						)}

						<div>
							<span className="icon" onClick={e => {
								if (!edit && !todo.isDone) {
									setEdit(!edit)
								}
							}
							}>
								<AiFillEdit />
							</span>
							<span className="icon" onClick={() => handleDelete(todo.id)}>
								<AiFillDelete />
							</span>
							<span className="icon" onClick={() => handleDone(todo.id)}>
								<MdDone />
							</span>
						</div>
					</form>
				)
			}

		</Draggable>

	)
}

export default Todo