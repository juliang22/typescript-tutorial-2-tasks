import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo as TodoModel } from '../model'
import Todo from './Todo'

interface TodoListProps {
	todos: TodoModel[]
	setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
	completedTodos: TodoModel[]
	setCompletedTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>
}

const TodoList = ({ todos, setTodos, setCompletedTodos, completedTodos }: TodoListProps): JSX.Element => {
	return (
		<div className="container">
			<Droppable droppableId='TodosList'>
				{
					(provided, snapshot) => (
						<div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
							<span className="todos__heading">
								Active Tasks
							</span>
							{todos.map((todo, index) => (
								<Todo
									index={index}
									todo={todo}
									key={todo.id}
									todos={todos}
									setTodos={setTodos}
								/>
							))}
							{provided.placeholder}
						</div>
					)
				}
			</Droppable>
			<Droppable droppableId='TodosRemove'>
				{
					(provided, snapshot) => (
						<div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
							<span className="todos__heading">
								Completed Tasks
							</span>
							{completedTodos.map((todo, index) => (
								<Todo
									index={index}
									todo={todo}
									key={todo.id}
									todos={completedTodos}
									setTodos={setCompletedTodos}
								/>
							))}
							{provided.placeholder}
						</div>
					)
				}
			</Droppable>
		</div>
	)
}

export default TodoList