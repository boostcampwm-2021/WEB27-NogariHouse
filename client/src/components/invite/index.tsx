import React, {
  useCallback, useRef, useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import toastListSelector from '@selectors/toast-list';
import { CustomInputBox, CustomInputBar } from '@styles/custom-inputbar';
import DefaultButton from '@common/default-button';
import toastMessage from '@constants/toast-message';
import LoadingSpinner from '@styles/loading-spinner';
import { testEmailValidation } from '@utils/index';
import { InviteBody, InviteInputLayout, InputTitle } from './style';

function InviteView({ history }: RouteComponentProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const setToastList = useSetRecoilState(toastListSelector);

  const inputOnChange = useCallback(() => {
    if (inputEmailRef.current?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);

  const fetchPostInviteMail = async (inputEmailValue: string) => {
    const { isUnique } = await fetch(`${process.env.REACT_APP_API_URL}/api/user/invite`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: inputEmailValue }),
    }).then((res) => res.json()) as { isUnique: boolean };
    if (isUnique) {
      setLoading(false);
      setToastList(toastMessage.inviteSuccess());
      history.push('/');
    } else {
      setLoading(false);
      setToastList(toastMessage.inviteWarning('exist'));
    }
  };

  const onClickInviteButton = () => {
    const inputEmailValue = inputEmailRef.current?.value as string;

    if (testEmailValidation(inputEmailValue)) {
      setLoading(true);
      fetchPostInviteMail(inputEmailValue);
    } else {
      setToastList(toastMessage.inviteWarning('validation'));
    }
  };

  return (
    <InviteBody>
      {loading && <LoadingSpinner />}
      <InviteInputLayout>
        <InputTitle> Enter the email to invite </InputTitle>
        <CustomInputBox>
          <CustomInputBar
            key="text"
            ref={inputEmailRef}
            onChange={inputOnChange}
            type="text"
            placeholder="E-mail Address"
          />
        </CustomInputBox>
      </InviteInputLayout>
      <DefaultButton
        buttonType="secondary"
        size="medium"
        onClick={onClickInviteButton}
        isDisabled={isDisabled}
      >
        NEXT
      </DefaultButton>
    </InviteBody>
  );
}

export default InviteView;
