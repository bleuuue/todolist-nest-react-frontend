import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import useSWR from 'swr';
import Todo from './Todo';

export interface Itodo {
  id: number;
  createAt: Date;
  updateAt: Date;
  title: string;
  desc: string;
  isCompleted: boolean;
}

const Todolist: FC = () => {
  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, mutate } = useSWR<Itodo[]>(
    `${process.env.REACT_APP_BACK_URL}/todo`,
    fetcher,
  );

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  // useEffect(() => {
  //   const getTodos = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3010/todo');

  //       if (response.statusText === 'OK') {
  //         setTodos(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getTodos();
  // }, [data]);

  return (
    <div>
      <AddTodo mutate={mutate} />
      {data.map((todo) => {
        return (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            desc={todo.desc}
            mutate={mutate}
          />
        );
      })}
    </div>
  );
};

export default Todolist;
