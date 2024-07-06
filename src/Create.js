import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { userName } = useAuth(); // Fetch the logged-in user's name from context
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author: userName }; // Set the author to the logged-in user's name

    setIsPending(true);
    fetch('http://localhost:9000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('NEW BLOG ADDED');
      setIsPending(false);
      history.push('/');
    });
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <input 
          type="text" 
          value={userName} // Set the value of author field to the logged-in user's name
          readOnly
        />
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
}

export default Create;
