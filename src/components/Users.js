import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
    if(!users) return <div>loading...</div> // 유효성 검사, users가 null 값이라면 loading... 출력
    return (
        <div>
            <ul>
                {users.map(user=>(
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;