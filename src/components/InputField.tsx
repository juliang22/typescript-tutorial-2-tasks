import React, { useRef } from 'react'
import '../components/styles.css';

interface TodoProps {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
}
const InputField = ({ todo, setTodo, handleAdd }: TodoProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<form
			action=""
			className='input'
			onSubmit={e => {
				handleAdd(e)
				inputRef.current?.blur();
			}}
		>
			<input
				ref={inputRef}
				type="input"
				placeholder='Enter a task'
				className='input__box'
				value={todo}
				onChange={e => setTodo(e.target.value)}
			/>
			<button
				className='input_submit'
				type='submit'
			>
				Go
			</button>
		</form>

	)
}

export default InputField