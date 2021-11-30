import { useHistory } from 'react-router-dom';

import DefaultButton from '@common/default-button';
import NotFoundGif from '@images/not-found.gif';
import { NotFoundImg, NotFoundViewLayout } from './style';

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
