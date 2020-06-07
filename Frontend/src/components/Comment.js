import React from 'react'
import styles from './Comment.module.css'

export const Comment = ({ comment }) => (
  <aside className={styles.comment}>
    <h2>{comment.title}</h2>
    <h3>{comment.email}</h3>
    <p>{comment.body}</p>
  </aside>
)
