import React, { useState, useEffect } from 'react';

const USERS_URL = 'http://localhost:4000/users';

function App() {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        fetch(`${USERS_URL}?_page=${currentPage}&_limit=${perPage}`)
            .then(response => {
                const count = response.headers.get('X-Total-Count');
                return response.json().then(response => ({
                    results: response,
                    count
                }))

            } )
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, [currentPage, perPage]);

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
