import React from "react";

const Forgot = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (

    <form className="container" onSubmit={handleSubmit}>
      <h3>Forgot Password</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="Email"
          className="form-control"
          palceholder="Email"
          onChange={e => (this.email = e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-block">Submit</button>
    </form>
  
  );
};

export default Forgot;
