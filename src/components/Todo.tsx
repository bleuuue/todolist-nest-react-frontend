import React, { FC } from 'react';
import { mutate } from 'swr';
import DeleteTodo from './DeleteTodo';
import { AddTodoProps } from './AddTodo';
import UpdateTodo from './UpdateTodo';

export interface TodoProps extends AddTodoProps {
  id: number;
  title: string;
  desc: string;
}

const Todo: FC<TodoProps> = ({ id, title, desc, mutate }) => {
  return (
    <li>
      <UpdateTodo id={id} title={title} desc={desc} mutate={mutate} />
      <DeleteTodo id={id} mutate={mutate} />
    </li>
  );
};

export default Todo;
