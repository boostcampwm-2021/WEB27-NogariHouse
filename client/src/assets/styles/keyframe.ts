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

export const slideXFromTo = (from: number, to: number) => keyframes`
from{
    transform: translateX(${from}px);
}
to{
    transform: translateX(${to}px);
}
`;

export const spinner = () => keyframes`
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;

export const toastXFromTo = () => keyframes`
    from {transform: translateX(100%); }
    to {transform: translateX(0);}
`;
