import { MouseEvent, useState } from 'react';
import styled from 'styled-components';

interface InterestItemLayoutProps {
    selected : boolean,
}

const InterestItemLayout = styled.div`
  color: ${(props: InterestItemLayoutProps) => (props.selected ? 'white' : 'black')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  padding: 10px;
  background: ${(props) => (props.selected ? '#586A9A' : '#fff')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: max-content;
  font-size: min(3vw, 16px);
`;

interface InterestItemProps {
  text: string,
  onClick: (e: MouseEvent) => void;
}

function InterestItem({ text, onClick } : InterestItemProps) {
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
