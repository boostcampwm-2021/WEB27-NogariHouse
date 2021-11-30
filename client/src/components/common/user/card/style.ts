import styled from 'styled-components';

interface ISizeProps {
    sizeType : 'follow' |'me' |'others'
  }

const sizes = {
  follow: { cardLayoutSize: 100, userNameSize: 24, descriptionSize: 18 },
  me: { cardLayoutSize: 100, userNameSize: 24, descriptionSize: 18 },
  others: { cardLayoutSize: 60, userNameSize: 16, descriptionSize: 12 },
};

export const UserCardLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
    margin-left: 0.8%;
    width: 99%;
    height: ${(props: ISizeProps) => sizes[props.sizeType].cardLayoutSize}px;
    color: black;
    text-decoration: none;

    &:hover {
    cursor: default;
    background-color: #eeebe4e4;
    box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
    }
  `;

export const UserInfoLayout = styled.div`
    display: flex;
    align-items: center;
  `;

export const UserImageLayout = styled.div`
    display:flex;
    align-items: center;
    margin: 0 20px;
  `;

export const UserDescLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;
  `;

export const UserName = styled.div`
    font-weight: bold;
    font-size: ${(props: ISizeProps) => sizes[props.sizeType].userNameSize}px;
    margin-bottom:3px;
    user-select: none;
  `;

export const UserId = styled.div`
    font-size: ${(props: ISizeProps) => sizes[props.sizeType].descriptionSize}px;
    margin-bottom:3px;
    user-select: none;
  `;

export const UserDescription = styled.div`
    font-size: ${(props: ISizeProps) => sizes[props.sizeType].descriptionSize}px;
    user-select: none;
  `;
