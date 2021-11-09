import { keyframes } from 'styled-components';

export const opacityFromTo = (from: number, to: number) => keyframes`
from {
    opacity: ${from};
}
to {
    opacity: ${to};
}
`;

export const slideYFromTo = (from: number, to: number) => keyframes`
from{
    transform: translateY(${from}px);
}
to{
    transform: translateY(${to}px);
}
`;

export const spinner = () => keyframes`
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;
