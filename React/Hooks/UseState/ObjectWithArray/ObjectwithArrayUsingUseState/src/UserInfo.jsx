import React, { useState } from 'react';

function UserInfo() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  const updateName = () => setUser({ ...user, name: 'Bob',age:23 });

  return (
    <div>
      <h2>Name: {user.name}</h2>
      <h2>Age: {user.age}</h2>
      <button onClick={updateName}>Change Name</button>
    </div>
  );
}

export default UserInfo;
