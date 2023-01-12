import React from "react";

const NewUser = () => {
  return (
    <div className="">
      <h1 className="text-gray-500 text-xl">New User</h1>
      <div className="flex flex-wrap">
        <div className="w-30 flex flex-col mb-4">
          <label className="mb-2">Username</label>
          <input type="text" placeholder="john" className="border-1" />
        </div>
        <div className="w-30">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="w-30">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="w-30">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="w-30">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="w-30">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="w-30">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="w-30">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </div>
    </div>
  );
};

export default NewUser;
