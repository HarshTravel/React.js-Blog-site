const logout = async () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserEmail('');
  
    // Fetch all blog IDs
    const response = await fetch('http://localhost:9000/blogs');
    const blogs = await response.json();
  
    // Delete each blog entry individually
    await Promise.all(blogs.map(blog => 
      fetch(`http://localhost:9000/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ));
  
    setBlogs([]);
  };
  