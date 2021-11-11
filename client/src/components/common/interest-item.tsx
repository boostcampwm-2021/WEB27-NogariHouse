import { MouseEvent, useState } from 'react';
import styeld from 'styled-components';

interface InterestItemLayoutProps {
    selected : boolean,
}

const InterestItemLayout = styeld.div`
  color: ${(props: InterestItemLayoutProps) => (props.selected ? 'white' : 'black')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  padding: 10px;
  background: ${(props) => (props.selected ? '#586A9A' : '#FFFFFF')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
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
