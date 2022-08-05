import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!, $userId: String!) {
    createTodo(input: {text: $text, userId: $userId}) {
      text
    }
  }
`;

const Home: NextPage = () => {
  // query 実装
  const { loading: queryLoading, error: queryErrror, data: queryData, refetch } = useQuery(GET_TODOS);

  // mutation 実装
  const [addTodo, { loading: mutationLoading, error, data: mutationData }] = useMutation(ADD_TODO, {
    onCompleted() {
      // mutation実行完了後、query再実行
      refetch();
    }
  });

  const [text, setText] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Create GraphQL NextJS Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        GraphQL NextJS Project

        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { text, userId: '1' } });
            setText('');
          }}
        >
          <input value={text} onChange={e => setText(e.target.value)}/>
          <button type="submit">createTodo</button>
        </form>

        <br/>

        {!queryLoading &&
          queryData.todos.map((todo: {id: string, text: string, done: boolean}) => (<li>{todo.text}</li>))
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
