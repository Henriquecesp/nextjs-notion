import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'

interface Data {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [data, setData] = useState<Data>({
    email: '',
    message: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData(oldData => ({ ...oldData, [name]: value }));
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/contact', data)
      .then(() => {
        return console.log('Thank you for contacting us!', data);
      })
      .catch((e) => {
        return console.log('Something bad happened', e.message);
      })
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Contact Form With Nextjs + Notion</h1>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.io"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Hi there!"
            value={data.message}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
