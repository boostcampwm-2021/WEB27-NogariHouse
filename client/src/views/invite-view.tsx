import React, {
  useCallback, useRef, useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import toastListSelector from '@selectors/toast-list';
import { CustomInputBox, CustomInputBar } from '@common/custom-inputbar';
import DefaultButton from '@common/default-button';
import LoadingSpinner from '@src/components/common/loading-spinner';
import { testEmailValidation } from '@src/utils';

const InviteBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InputTitle = styled.div`
  width: max-content;
  font-size: min(6vw, 40px);
  text-align: center;
`;

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
      body: JSON.stringify({ email: inputEmailValue }),
    }).then((res) => res.json()) as { isUnique: boolean };
    if (isUnique) {
      setLoading(false);
      setToastList({
        type: 'success',
        title: '전송 완료',
        description: '초대장이 발송되었습니다',
      });
      history.push('/');
    } else {
      setLoading(false);
      setToastList({
        type: 'warning',
        title: '초대장 에러',
        description: '이미 존재하는 이메일입니다',
      });
    }
  };

  const onClickInviteButton = () => {
    const inputEmailValue = inputEmailRef.current?.value as string;

    if (testEmailValidation(inputEmailValue)) {
      setLoading(true);
      fetchPostInviteMail(inputEmailValue);
    } else {
      setToastList({
        type: 'warning',
        title: '초대장 에러',
        description: '올바른 형식의 이메일을 입력해주세요',
      });
    }
  };

  return (
    <InviteBody>
      {loading && <LoadingSpinner />}
      <InputTitle> enter the email to invite </InputTitle>
      <CustomInputBox>
        <CustomInputBar
          key="text"
          ref={inputEmailRef}
          onChange={inputOnChange}
          type="text"
          placeholder="E-mail Address"
        />
      </CustomInputBox>
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
