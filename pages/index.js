import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactEmbedGist from 'react-embed-gist';
import { IoArrowForward, IoReload } from 'react-icons/io5';

import {
  MainContainer,
  GistContainer,
  ButtonsContainer,
} from 'components/Container/Container.styles';
import { PointText } from 'components/Text/Text.styles';
import { OptionButton, ActionButton } from 'components/Button/Button.styles';
import { gistFetching } from 'utils/gistFetching';
import { languagesList } from 'constants/data';
import { colors } from 'constants/colors';
import { setData } from 'store/code/code.slice';
import { codeDataSelector } from 'store/code/code.selector';

const INITIAL_STATUS_CONTROLS = {
  isFailed: false,
  isSuccess: false,
};

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(codeDataSelector);

  React.useEffect(() => fastGenerateGists(), []);

  const [gameMechanics, setGameMechanics] = React.useState({
    rightLanguage: '',
    buttonData: [],
  });
  const [points, setPoints] = React.useState(0);
  const [statusControls, setStatusControls] = React.useState(
    INITIAL_STATUS_CONTROLS,
  );

  const fastGenerateGists = () => {
    gistFetching()
      .then((response) => {
        const gist =
          response.data[Math.floor(Math.random() * response.data.length)];
        const language = gist.files[Object.keys(gist.files)[0]].language;
        if (
          Object.keys(gist.files).length > 1 || // more than one language (file)
          languagesList.indexOf(language) === -1 // not in languagesList
        ) {
          fastGenerateGists();
          return;
        }
        dispatch(setData(gist.owner.login + '/' + gist.id));
        setGameMechanics({
          rightLanguage: language,
          buttonData: getRandomLanguage(language),
        });
      })
      .catch((e) => {
        fastGenerateGists(); // we do not showing error screen, because it can be that the API page is down
        console.error(e);
      });
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const getRandomLanguage = (correctAnswer) => {
    let languageOptions = [correctAnswer];
    const filteredList = languagesList.filter(
      (value) => value !== correctAnswer,
    );

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * filteredList.length);
      const randomItem = filteredList[randomIndex];

      languageOptions = [...languageOptions, randomItem];
      filteredList.splice(randomIndex, 1);
    }

    return shuffle(languageOptions);
  };

  const handleOptionButtonClick = (event) => {
    if (event.target.textContent === gameMechanics.rightLanguage) {
      setPoints(points + 50);
      setStatusControls({
        isSuccess: true,
        isFailed: false,
      });
      return;
    }
    event.target.classList.add('fail');
    setStatusControls({
      isSuccess: true,
      isFailed: true,
    });
  };

  const handleNextButtonClick = () => {
    if (statusControls.isFailed) setPoints(0);
    fastGenerateGists();
    getRandomLanguage();
    dispatch(setData(''));
    setStatusControls(INITIAL_STATUS_CONTROLS);
  };

  return (
    <>
      <Head>
        <title>Guess This Code</title>
      </Head>
      <MainContainer>
        <PointText>{`${points}`}</PointText>
        {!statusControls.isFailed && !data.length ? (
          <ClipLoader
            color={colors['text-color']}
            loading
            size={100}
            data-testid="Spinner"
          />
        ) : (
          <GistContainer>
            <ReactEmbedGist
              gist={data} // ArnoldATProJanitorDevs/848455cb125900e107a550950c64013f - small gist - to test gap
              titleClass="gist-title"
              contentClass="gist-content"
              wrapperClass="gist-wrapper"
            />
          </GistContainer>
        )}
        {data && (
          <ButtonsContainer>
            {gameMechanics.buttonData.map((value) => (
              <OptionButton
                key={value}
                className={
                  statusControls.isSuccess &&
                  value === gameMechanics.rightLanguage
                    ? 'success'
                    : ''
                }
                disabled={statusControls.isFailed || statusControls.isSuccess}
                onClick={handleOptionButtonClick}
              >
                {value}
              </OptionButton>
            ))}
          </ButtonsContainer>
        )}
        {statusControls.isSuccess && (
          <ActionButton onClick={handleNextButtonClick}>
            {statusControls.isFailed ? (
              <IoReload size={40} color={colors['text-color']} />
            ) : (
              <IoArrowForward size={40} color={colors['text-color']} />
            )}
          </ActionButton>
        )}
      </MainContainer>
    </>
  );
};

export default Home;
