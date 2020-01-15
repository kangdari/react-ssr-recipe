import React, { useEffect } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../module.js/users';
import { Preloader } from '../lib/PreloadContext';

const UsersContainer = ({ users, getUsers }) => {
    // 컴포넌트가 마운트되고 나서 호출
    useEffect(()=>{
        if(users) return; // 이미 users가 있다면 요청 x
        getUsers(); // 요청
    }, [getUsers, users]);

    return (
        <>
            <Users users={users}/>
            <Preloader resolve={getUsers}/>
        </>
    )
};
// UsersContainer와 redux 연동, connect 함수 사용
export default connect(
    state=> ({
        users: state.users.users
    }),
    {
        getUsers
    }
)(UsersContainer);