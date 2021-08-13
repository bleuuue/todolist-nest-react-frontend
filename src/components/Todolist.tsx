import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

interface Itodo {
  id: number;
  createAt: Date;
  updateAt: Date;
  title: string;
  desc: string;
  isCompleted: boolean;
}

const Todolist: FC = () => {
  const [todos, setTodos] = useState<Itodo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3010/todo');

        if (response.statusText === 'OK') {
          setTodos(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.id} - {todo.title} - {todo.desc}
          </li>
        );
      })}
    </div>
  );
};

export default Todolist;
