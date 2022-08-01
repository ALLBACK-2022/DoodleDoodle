import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

function Loading() {
  const Flex = styled.div`
    position: absolute;
    left: 40.5vw;
    top: 178.5vh;
  `;

  return (
    <Flex>
      <TailSpin color="#f8d359" height={40} width={40} />
    </Flex>
  );
}

export default Loading;
