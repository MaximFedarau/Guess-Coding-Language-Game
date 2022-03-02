import store from "../store"

import { Provider, connect } from "react-redux"

import Head from 'next/head'

import React from "react"

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
    fetch("https://api.github.com/users").then(
      response => response.json()
    ).then(
      data => store.dispatch(setData(data[3].login))
    )
  },[])

  return (
    <div>
      <Head>
        <title>Guess The Code</title>
      </Head>
      <h1>The beginning of the path:</h1>
      <p>{store.getState().GitHubReducer.data}</p>
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