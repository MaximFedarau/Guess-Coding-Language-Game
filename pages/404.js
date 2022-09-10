import { IoHelp } from 'react-icons/io5';

import { MainContainer } from 'components/Container/Container.styles';
import { colors } from 'constants/colors';

export default function Page404() {
  return (
    <MainContainer>
      <IoHelp
        size="16vw"
        style={{ minHeight: 144, minWidth: 144 }}
        color={colors['text-color']}
      />
    </MainContainer>
  );
}
