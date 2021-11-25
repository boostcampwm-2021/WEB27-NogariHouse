import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import DefaultButton from '@common/default-button';
import NotFoundGif from '@images/not-found.gif';

const NotFoundImg = styled.img`
  box-sizing: border-box;
  width: 300px;
  margin: 0px 10px;
`;

const NotFoundViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  border-radius: 30px;
  background-color: #fff;
`;

function NotFoundChatView() {
  const history = useHistory();
  const leaveHandler = () => {
    history.push('/chat-rooms');
  };

  return (
    <NotFoundViewLayout>
      <h2>Not Allowed Access</h2>
      <NotFoundImg src={NotFoundGif} alt="Not Found" />
      <DefaultButton buttonType="secondary" size="medium" onClick={leaveHandler}>
        Go to the Chat List
      </DefaultButton>
    </NotFoundViewLayout>
  );
}

export default NotFoundChatView;
