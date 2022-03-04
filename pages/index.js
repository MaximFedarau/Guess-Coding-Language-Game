import store from "../store"

import { Provider, connect } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader";

import Head from 'next/head'

import React from "react"
import axios from "axios"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

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
    generateGists()
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

  function generateGists() {
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
  }

  return (
    <div>
      <Head>
        <title>Guess The Code</title>
      </Head>
      <h1>The beginning of the path:</h1>
      {/*<p>{store.getState().GitHubReducer.data}</p>*/}
      {(store.getState().GitHubReducer.data === "") ? <ClipLoader color={"black"} loading={true} size={100}/>
: <SyntaxHighlighter language="java" showLineNumbers={true} wrapLines={true} customStyle={{maxHeight: "30rem"}}>
      {store.getState().GitHubReducer.data}
    </SyntaxHighlighter>}
      <br/><br/><button onClick={() => {
        generateGists()
        store.dispatch(setData(''))
      }}>Next</button>
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