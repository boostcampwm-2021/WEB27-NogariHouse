import { MouseEvent, useState } from 'react';
import styled from 'styled-components';

type TInterestItemLayoutProps = {
    selected : boolean,
}

interface IInterestItemProps {
  text: string,
  onClick: (e: MouseEvent) => void;
}

const InterestItemLayout = styled.div`
  color: ${(props: TInterestItemLayoutProps) => (props.selected ? 'white' : 'black')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  padding: 10px;
  background: ${(props) => (props.selected ? '#586A9A' : '#fff')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: max-content;
  font-size: min(3vw, 16px);
`;

function InterestItem({ text, onClick } : IInterestItemProps) {
  const [selected, setSelected] = useState(false);
  const innerOnClick = (e: MouseEvent) => {
    onClick(e);
    setSelected(!selected);
  };
  return (
    <InterestItemLayout onClick={innerOnClick} selected={selected}>
      {text}
    </InterestItemLayout>
  );
}

export default InterestItem;
