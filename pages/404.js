import Head from 'next/head';
import { IoHelp } from 'react-icons/io5';

import { MainContainer } from 'components/Container/Container.styles';
import { colors } from 'constants/colors';

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <MainContainer>
        <IoHelp
          size="16vw"
          style={{ minHeight: 144, minWidth: 144 }}
          color={colors['text-color']}
        />
      </MainContainer>
    </>
  );
};

export default Page404;
