import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactEmbedGist from 'react-embed-gist';

import OptionButton from 'components/OptionButton/OptionButton.component';
import { languagesList } from 'constants/data';
import { setData } from 'store/code/code.slice';
import { codeDataSelector } from 'store/code/code.selector';

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector(codeDataSelector);

  React.useEffect(() => fastGenerateGists(), []);

  const [gameMechanics, setGameMechanics] = React.useState({
    rightLanguage: '',
    buttonData: [],
  });
  const [points, setPoints] = React.useState(0); // ! move points to separate state, because if we move it into gameMechanics object, then it may not have enough time to update between ending and restarting the game
  const [statusControls, setStatusControls] = React.useState({
    isFailed: false,
    isSuccess: false,
  });

  const fastGenerateGists = () => {
    const client = axios.create({
      method: 'get',
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    client(
      `https://api.github.com/gists/public?page=${Math.floor(
        Math.random() * 100,
      )}`,
    )
      .then((response) => {
        const gist =
          response.data[Math.floor(Math.random() * response.data.length)];
        const language = gist.files[Object.keys(gist.files)[0]].language;
        if (
          Object.keys(gist.files).length >= 2 || // more than one language (file)
          language === null || // no language at all
          language === 'Markdown' || // markdown, because it is similar to plain text or html
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
    dispatch(setData(''));
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
    setStatusControls({
      isSuccess: false,
      isFailed: false,
    });
  };

  return (
    <>
      <Head>
        <title>Guess This Code</title>
      </Head>
      <div>
        <h1>{`${points} points`}</h1>
        {statusControls.isFailed ? (
          <h1>{`You lose. The right answer was: ${gameMechanics.rightLanguage}`}</h1>
        ) : !data.length ? (
          <ClipLoader color="black" loading size={100} />
        ) : (
          <ReactEmbedGist
            gist={data}
            titleClass="title"
            contentClass="content"
            wrapperClass="wrapper"
          />
        )}
        {statusControls.isSuccess ? (
          <button onClick={handleNextButtonClick}>Next &#8594;</button>
        ) : (
          !statusControls.isFailed &&
          data && (
            <div>
              {gameMechanics.buttonData.map((value) => (
                <OptionButton key={value} onClick={handleOptionButtonClick}>
                  {value}
                </OptionButton>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
}
