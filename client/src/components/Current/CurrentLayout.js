import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ProfileBar from '../Profile/ProfileBar';
import CurrentChat from './CurrentChat';
import CurrentUser from './CurrentUser';
import { deleteChat } from '../../redux/actions/chats';
import types from '../../redux/types';

const StyledCurrentLayout = styled.div`
    display: grid;
    grid-template-rows: 65px auto 60px;
    grid-template-areas:  "top"
                          "mid"
                          "bottom";

    .profile-bar {
      display: grid;
      align-items: center;
      grid-area: top;

      @media(max-width: 576px){
        grid-template-columns: auto 1fr;
      }
    }

    .current-user {
      grid-area: mid / bottom / -1;
    }

    .list-messages {
      grid-area: mid;
      height: 100%;
      overflow-y: auto;
    }

    .messages-box {
      grid-area: bottom;
      background-color: #f8f9fa;
    }
`;

export default function CurrentLayout() {
  const current = useSelector((state) => state.chats.current);
  const user = current.user || current.chat?.user;

  const dispatch = useDispatch();
  const handleClose = () => dispatch({ type: types.CLOSE_CURRENT });
  const handleDelete = () => dispatch(deleteChat(current.chat._id, current.chat.index));

  const showOptions = useMemo(() => (current.chat !== null), [current]);

  if (current.chat === null && current.user === null) {
    return null;
  }

  return (
    <StyledCurrentLayout className='col-12 col-lg-9 col-sm-8 current-layout h-100'>
      <div className='shadow-sm profile-bar bg-primary'>
        <i className='material-icons text-white d-sm-none pl-2' onClick={handleClose}>arrow_back</i>
        <div className='dropdown'>
          <ProfileBar avatar={user.avatar} username={user.username}>
            <Dropdown hidden={!showOptions}>
              <Dropdown.Toggle>
                <span className='material-icons text-white'>more_vert</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>Eliminar chat</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ProfileBar>
        </div>
      </div>
      {current.user !== null ? <CurrentUser /> : <CurrentChat />}
    </StyledCurrentLayout>
  );
}