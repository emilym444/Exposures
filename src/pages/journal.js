import React, {useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Ladder from "./ladder";

const Journal = () => {
  // const getTags, setGetTags = useState({tag:""})
  const [newPost, setPost] = useState({
    exposure: "",
    description: "",
    feeling: "",
    tag: "",
    date: new Date()
  });
  const [posts, setSubmitPost] = useState([]);
  useEffect(posts => {
    axios({
      method: "get",
      withCredentials: true,
      url: "https://cors-anywhere.herokuapp.com/https://exposures-ocd.herokuapp.com/journal"
    }).then(function(response) {
      setSubmitPost(response.data);
      console.log(response.data);
    });
  }, []);
  function handleChange(event) {
    const {name, value} = event.target;
    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function submitPost(event) {
    const postCopy = {
      exposure: newPost.exposure,
      description: newPost.description,
      feeling: newPost.feeling,
      date: newPost.date.toLocaleDateString(),
      tag: newPost.tag
    };
    setSubmitPost(prevPosts => {
      return [postCopy, ...prevPosts];
    });
    axios({
      method: "post",
      data: {
        entries: postCopy
      },
      withCredentials: true,
      url: "https://cors-anywhere.herokuapp.com/https://exposures-ocd.herokuapp.com/journal"
    }).then(res => setPost(res.data));
    event.preventDefault();
    setPost({
      exposure: "",
      description: "",
      feeling: "",
      tag: "",
      date: new Date()
    });
  }
  function handleRemove(id) {
    console.log(id);
    const updatedPosts = posts.filter(post => {
      console.log(post._id);
      console.log(post._id === id);
      return post._id !== id;
    });
    axios({
      method: "get",
      data: id,
      withCredentials: true,
      url: "https://cors-anywhere.herokuapp.com/https://exposures-ocd.herokuapp.com/journal/" + id
    }).then(res => console.log(res.data));
    setSubmitPost(updatedPosts);
  }
  return (
    <div className="journalBack">
      <div className="sideBar">
        <Ladder />
      </div>
      <div className="newNote">
        <h1 className="checkIn">Check in</h1>
        <textarea
          onChange={handleChange}
          name="exposure"
          type="text"
          placeholder="What was the exposure?"
          value={newPost.exposure}
          rows="3"
        />
        <textarea
          onChange={handleChange}
          name="description"
          type="text"
          placeholder="What happened?"
          value={newPost.description}
          rows="3"
        />
        <textarea
          onChange={handleChange}
          name="feeling"
          type="text"
          placeholder="How do you feel?"
          value={newPost.feeling}
          rows="3"
        />
        <textarea
          onChange={handleChange}
          name="tag"
          type="text"
          placeholder="What fear does this exposure relate to?"
          value={newPost.tag}
          rows="3"
        />
        <DatePicker
          className="datePick"
          dateFormat="MM-dd-yyyy"
          selected={newPost.date}
          onChange={date => {
            const event = {
              target: {
                name: "date",
                value: date
              }
            };
            handleChange(event);
          }}
        />

        <button onClick={submitPost} className="submit" type="submit">
          Post
        </button>
      </div>
      {posts.map(post => {
        return (
          <div className="note">
            <h3>Exposure</h3>
            <p className="noteText">{post.exposure}</p>
            <h3>What happened?</h3>
            <p className="noteText">{post.description}</p>
            <h3>How do you feel?</h3>
            <p className="noteText">{post.feeling}</p>
            <h3>Date</h3>
            <p className="noteText">{post.date}</p>
            <button onClick={() => handleRemove(post._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Journal;
