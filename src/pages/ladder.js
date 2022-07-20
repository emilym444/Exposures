import React, {useState, useEffect} from "react";
import axios from "axios";
const Ladder = () => {
  // tags.concern
  const [newTag, setNewTag] = useState({concern: ""});
  const [tags, setTags] = useState([]);
  useEffect(tags => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/ladder"
    }).then(function(response) {
      setTags(response.data);
      console.log(response.data);
    });
  }, []);

  function handleChange(event) {
    const {name, value} = event.target;
    setNewTag(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function postTags(event) {
    const tagCopy = {
      concern: newTag.concern,
      id: newTag.id
    };
    setTags(prevPosts => {
      return [tagCopy, ...prevPosts];
    });
    axios({
      method: "post",
      data: {
        tags: tagCopy
      },
      withCredentials: true,
      url: "/ladder"
    }).then(res => setTags(res.data));
    event.preventDefault();
    setNewTag({concern: ""});
  }

  function handleRemove(id) {
    const updatedTags = tags.filter(tag => {
      return tag._id !== id;
    });
    console.log(id);
    axios({
      method: "get",
      data: id,
      withCredentials: true,
      url: "ladder/" + id
    }).then(res => console.log(res.data));
    setTags(updatedTags);
  }
  return (
    <div className="tag-container">
      <label>
        List your 10 concerns in ranking order. 1 is your biggest fear. 10 is
        something you fear or are worried about but it isn't your biggest
        concern.
      </label>
      {tags.length <= 9 ? (
        <input
          name="concern"
          placeholder="Concern"
          type="text"
          onChange={handleChange}
          value={newTag.concern}
        />
      ) : (
        <input name="concern" placeholder="Concern" type="hidden" />
      )}
      {tags.length <= 9 ? <button onClick={postTags}>Add</button> : null}
      <ol>
        {tags.map(tag => (
          <li key={tag._id}>
            {tag.concern}
            <button onClick={() => handleRemove(tag._id)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Ladder;
