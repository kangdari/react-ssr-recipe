import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../module.js/users';
import { Preloader, usePreloader } from '../lib/PreloadContext';
import User from '../components/User';

const UserContainer = ({ id }) => {
    const user = useSelector(state=> state.users.user);
    const dispatch = useDispatch();


    usePreloader(()=> dispatch(getUser(id))); // 서버 사이드 렌더링 할 때 API 호출.
    useEffect(()=>{
        // id 값은 추후 URL 파라미터로 받아 오기 때문에 문자열로 이루어짐.
        // user 객체의 id는 정수형
        if(user && user.id === parseInt(id, 10)) return;
        // 사용자가 존재하고 아이디가 일치하면 요청x
        dispatch(getUser(id)); // 유저 요청
    }, [dispatch, id, user]); // id가 바뀔 때마다 새로 요청

    if (!user) return null
    return <User user={user}/>
};

export default UserContainer;