import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactEmbedGist from 'react-embed-gist';

import OptionButton from 'components/OptionButton';
import { languagesList } from 'constants/data';
import { setData } from 'store/code/code.slice';
import { codeDataSelector } from 'store/code/code.selector';

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector(codeDataSelector);

  React.useEffect(() => fastGenerateGists(), []);

  const [rightLanguage, setRightLanguage] = React.useState('');
  const [buttonData, setButtonData] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [showFail, setShowFail] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);

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
        setRightLanguage(language);
        setButtonData(getRandomLanguage(language));
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

  const handleOptionButtonClick = (value) => () => {
    if (value === rightLanguage) {
      setPoints(points + 50);
      setDisableButton(true);
      setShowNextButton(true);
      return;
    }
    dispatch(setData(''));
    setShowNextButton(true);
    setShowFail(true);
  };

  return (
    <>
      <Head>
        <title>Guess This Code</title>
      </Head>
      <div>
        <h1>{`${points} points`}</h1>
        {!data.length ? (
          <ClipLoader color={'black'} loading={true} size={100} />
        ) : (
          <ReactEmbedGist
            gist={data}
            titleClass="title"
            contentClass="content"
            wrapperClass="wrapper"
          />
        )}
        <br />
        {showFail && (
          <h1>{`You lose. The right answer was: ${rightLanguage}`}</h1>
        )}
        {data && (
          <div>
            {buttonData.map((value) => (
              <OptionButton
                key={value}
                status={disableButton}
                name={value}
                act={handleOptionButtonClick(value)}
              />
            ))}
          </div>
        )}
        <br />
        <br />
        {showNextButton && (
          <button
            onClick={() => {
              fastGenerateGists();
              getRandomLanguage();
              dispatch(setData(''));
              if (showFail) setPoints(0);
              setShowFail(false);
              setDisableButton(false);
              setShowNextButton(false);
            }}
          >
            {'Next ->'}
          </button>
        )}
      </div>
    </>
  );
}
