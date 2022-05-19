import React, {useState, useEffect} from "react";
import axios from "axios";

const Journal =() =>{

  const [newPost, setPost] = useState({exposure: "", description: "", feeling: ""});
  const [posts, setSubmitPost] = useState([]);
  useEffect((posts) => {
    axios({
    method:"get",
    withCredentials: true,
    url: "http://localhost:5000/journal"
  }).then(function(response) {
      setSubmitPost(response.data);
    })
  }, []);

  function handleChange(event) {
    const {name, value} = event.target
    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  };

  function submitPost() {
    setSubmitPost(prevPosts => {
      return [
        ...prevPosts,
        newPost
      ];
    });
    axios({
      method:"post",
      data:{
        entries: newPost,
      },
      withCredentials: true,
      url: "http://localhost:5000/journal"
    }).then((res) => setPost(res.data));
  };
  return(

<div>
  <div className="newNote">
      <h1 className="checkIn"> Check in </h1>
      <textarea onChange={handleChange} name="exposure" type="text" placeholder="What was the exposure?" value={newPost.exposure} rows="3"/>
      <textarea onChange={handleChange} name="description" type="text" placeholder="What happened?" value={newPost.description} rows="3"/>
      <textarea onChange={handleChange} name="feeling" type="text" placeholder="How do you feel?" value={newPost.feeling} rows="3"/>
      <button  onClick={submitPost} className="submit" type="submit">Post</button>
  </div>
    {
      posts.map((post) => {
        return (
          <div className="note">
          <h1>{post.exposure}</h1>
          <p>{post.description}</p>
          <p>{post.feeling}</p>
        </div>
      );
      })
    }

</div>

);
};

export default Journal;
