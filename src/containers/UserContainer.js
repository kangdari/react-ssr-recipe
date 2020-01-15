import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../module.js/users';
import { Preloader } from '../lib/PreloadContext';
import User from '../components/User';

const UserContainer = ({ id }) => {
    const user = useSelector(state=> state.users.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        // id 값은 추후 URL 파라미터로 받아 오기 때문에 문자열로 이루어짐.
        // user 객체의 id는 정수형
        if(user && user.id === parseInt(id, 10)) return;
        // 사용자가 존재하고 아이디가 일치하면 요청x
        dispatch(getUser(id)); // 유저 요청
    }, [dispatch, id, user]); // id가 바뀔 때마다 새로 요청

    // 컨테이너 유효성 검사 후 return null을 해야 하는 경우에
    // null 대신 Preloader 반환
    // SSR을 해야하기 때문에 Preloader 컴포넌트를 반환, SSR 과정에서
    // 데이터가 없을 경우 GET_USER 액션 발생
    if (!user) {
        return <Preloader resolve={() => dispatch(getUser(id))} />
    }
    return <User user={user}/>
};

export default UserContainer;