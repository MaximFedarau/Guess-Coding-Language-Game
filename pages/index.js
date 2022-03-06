import store from "../store"

import { Provider, connect } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader";

import Head from 'next/head'

import React from "react"
import axios from "axios"

import ReactEmbedGist from "react-embed-gist"

import OptionButton from "../components/OptionButton"

//import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function setData(data) {
  return {
    type: "SET",
    data
  }
}

function mapStateToProps(state) {
  return {
    data: state.GitHubReducer.data
  }
}

const mapDispatchToProps = {
  setData
}

function Home() {

  React.useEffect(() => {
    fastGenerateGists()
    //console.log("useEffect")
  },[])

  /*function generateData() {
    fetch(`https://api.github.com/users?since=${Math.floor(Math.random()*10000)}`).then(
      async response => response.json()
    ).then(
      data => {
        store.dispatch(setData(data[Math.floor(Math.random() * 10)].login))
        fetch(`https://api.github.com/users/${store.getState().GitHubReducer.data}/repos`).then(
          response => response.json()
        ).then(
          data => {
            console.log(1)
          }
        )
      }
    )
  }

  function generateInfo() {
    const client = axios.create({
      auth: {
        username: "MaximFedarau",
        password: "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"
      }
    })
    client.get(`https://api.github.com/users?since=${Math.floor(Math.random()*10000)}`).then(response => {
      store.dispatch(setData(response.data[Math.floor(Math.random() * 10)].login))
      client.get(`https://api.github.com/users/${store.getState().GitHubReducer.data}/repos`).then(response => {
        if (response.data.length == 0) {
          console.log("It is 0")
          generateInfo()
        } else {
          client.get(`https://api.github.com/users/${store.getState().GitHubReducer.data}/repos`).then(response => {
            const repos = response.data
            const repo = repos[Math.floor(Math.random()*repos.length)]
            const name = repo.name
            const contents_url = `https://api.github.com/repos/${store.getState().GitHubReducer.data}/${name}/contents/`
            client.get(contents_url).then(response => console.log(response.data))
          })
        }
      })
    })
  }*/

  var token1 = "ghp_5dJl1u8fC"
  var token2 = "eTEAHrET7z1M31Mf"
  var token3 = "bU2Ac0K0s6W"

  /*function generateGists() {
    const client = axios.create({
      headers: {
        "Authorization": `token ${token1+token2+token3}`
      }

    })
    
    client.get(`https://api.github.com/gists/public?page=${Math.floor(Math.random()*100)}`).then(response => {
      const gist = response.data[Math.floor(Math.random()*response.data.length)]
      client.get(gist.url).then(response => {
        const language = response.data.files[Object.keys(response.data.files)[0]].language
        if (language===undefined) generateGists()
        const languagesList = ["Python","PHP","JavaScript",'TypeScript','Swift','Ruby','C#','CSS','TSX','Kotlin','Java','C++','Dart','Markdown','HTML','XML','Shell','YAMl','SCSS','Solidity','Go','Scala','Batchfile','Pug']


        if (languagesList.indexOf(language) === -1) {
          generateGists() }
        else {
          const content = response.data.files[Object.keys(response.data.files)[0]].content
          store.dispatch(setData(content))
        }
      })
    })
  }*/

  const [rightLanguage,setRightLanguage] = React.useState('')
  const [buttonData,setButtonData] = React.useState('')
  const [points,setPoints] = React.useState(0)
  const [showNextButton,setShowNextButton] = React.useState(false)
  const [showFail,setShowFail] = React.useState(false)
  const [disableButton,setDisableButton] = React.useState(false)

  function fastGenerateGists() {
    const client = axios.create({
      method: "get",
      headers: {
        "Authorization": `token ${token1+token2+token3}`,
        "Accept": "application/vnd.github.v3+json"
        //"Access-Control-Allow-Origin": "*"
      }
    })
    client.get(`https://api.github.com/gists/public?page=${Math.floor(Math.random()*50)+30}`).then(response => {
      //console.log("started api")
      const gist  = response.data[Math.floor(Math.random()*response.data.length)]
      const language = gist.files[Object.keys(gist.files)[0]].language
      const languagesList = ["Python","PHP","JavaScript",'TypeScript','Swift','Ruby','C#','CSS','TSX','Kotlin','Java','C++','Dart','HTML','XML','Shell','YAMl','SCSS','Solidity','Go','Scala','Batchfile','Pug','Fluent','Emacs Lisp','Lua']
      if (Object.keys(gist.files).length>=2 || language===null || language==="Markdown" || languagesList.indexOf(language) === -1) fastGenerateGists()
      else {
        //const link = `https://gist.github.com/${gist.owner.login}/${gist.id}`
        store.dispatch(setData(gist.owner.login+"/"+gist.id))
        setRightLanguage(language)
        //console.log("ready to set random data")
        setButtonData(getRandomLanguage(language))
      }
    }).catch(e => {
      fastGenerateGists()
      console.log(e)
    })
  }

  function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
  }

  function getRandomLanguage(correctAnswer) {
    let x = 3
    let languageOptions = [correctAnswer]
    const languagesList = ["Python","PHP","JavaScript",'TypeScript','Swift','Ruby','C#','CSS','TSX','Kotlin','Java','C++','Dart','HTML','XML','Shell','YAMl','SCSS','Solidity','Go','Scala','Batchfile','Pug','Fluent','Emacs Lisp','Lua']
    let filteredList = languagesList.filter((value) => {
      return value !== correctAnswer
    })
    while(x>0) {
      const randomIndex = Math.floor(Math.random()*filteredList.length)
      const randomItem = filteredList[randomIndex]
      languageOptions = languageOptions.concat([randomItem])
      filteredList = languagesList.filter((value) => {
        return value !== randomItem
      })
      x-=1
    }
    shuffle(languageOptions)
    return languageOptions
  }

  return (
    <div>
      <Head>
        <title>Guess This Code</title>
        <link rel="icon" href="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/128/faq-icon.png"/>
      </Head>
      <h1>{`${points} points`}</h1>
      {/*<p>{store.getState().GitHubReducer.data}</p>*/}
      {/*(store.getState().GitHubReducer.data === "") ? <ClipLoader color={"black"} loading={true} size={100}/>
: <SyntaxHighlighter language="java" showLineNumbers={true} wrapLines={true} customStyle={{maxHeight: "30rem"}}>
      {store.getState().GitHubReducer.data}
  </SyntaxHighlighter>*/}
      {(store.getState().GitHubReducer.data === "") ? <ClipLoader color={"black"} loading={true} size={100}/> : <ReactEmbedGist
  gist={store.getState().GitHubReducer.data}
  titleClass="title"
  contentClass="content"
  wrapperClass="wrapper"
  loadingFallback={""}
/>}<br/>
{(showFail) ? <h1>{`You lose. The right answer was: ${rightLanguage}`}</h1> : null}
{(store.getState().GitHubReducer.data === "") ? null : (<div>
  <OptionButton status={disableButton} name={buttonData[0]} act={() => {
    if (buttonData[0] === rightLanguage) {
      setPoints(points+50)
      setDisableButton(true)
      setShowNextButton(true)
    }
    else {
      store.dispatch(setData(""))
      setShowNextButton(true)
      setShowFail(true)
    }
  }}/>
  <OptionButton status={disableButton} name={buttonData[1]} act={() => {
    if (buttonData[1] === rightLanguage) {
      setPoints(points+50)
      setDisableButton(true)
      setShowNextButton(true)
    }
    else {
      store.dispatch(setData(""))
      setShowNextButton(true)
      setShowFail(true)
    }
  }}/>
  <OptionButton status={disableButton} name={buttonData[2]} act={() => {
    if (buttonData[2] === rightLanguage) {
      setPoints(points+50)
      setDisableButton(true)
      setShowNextButton(true)
    }
    else {
      store.dispatch(setData(""))
      setShowNextButton(true)
      setShowFail(true)
    }
  }}/>
  <OptionButton status={disableButton} name={buttonData[3]} act={() => {
    if (buttonData[3] === rightLanguage) {
      setPoints(points+50)
      setDisableButton(true)
      setShowNextButton(true)
    }
    else {
      store.dispatch(setData(""))
      setShowNextButton(true)
      setShowFail(true)
    }
  }}/>
</div>)}{/*buttonData.map((value) => {
  return <OptionButton name={value} act={() => {
    if (value===rightLanguage) console.log("yes")  
    else console.log("no")
  }}/> */}<br/><br/>
  {(showNextButton) ? <button onClick={() => {
        fastGenerateGists()
        getRandomLanguage()
        store.dispatch(setData(''))
        if (showFail) setPoints(0)
        setShowFail(false)
        setDisableButton(false)
        setShowNextButton(false)
      }}>{"Next ->"}</button> : null}
    </div>
  )
}

const ConnectedHome = connect(mapStateToProps,mapDispatchToProps)(Home)

export default function ReadyHome() {
  return (
    <Provider store={store}>
      <ConnectedHome/>
    </Provider>
  )
}