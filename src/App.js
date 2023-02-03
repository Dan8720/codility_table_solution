import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://localhost:4000/users';

const [users, setUsers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [perPage] = useState(10);

useEffect(() => {
  fetch(`${USERS_URL}=${currentPage}&limit=${perPage}`)
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.log(error));
}, [currentPage, perPage]);

function App() {
  return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          </thead>
          <tbody>

          {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
          ))}

          </tbody>
        </table>
        <section className="pagination">
          <button className="first-page-btn">first</button>
          <button className="previous-page-btn">previous</button>
          <button className="next-page-btn">next</button>
          <button className="last-page-btn">last</button>
        </section>
      </div>
  );
}

export default App;
