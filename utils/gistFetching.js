import axios from 'axios';

export const gistFetching = () => {
  return axios.get(
    `https://api.github.com/gists/public?page=${Math.floor(
      Math.random() * 100,
    )}`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    },
  );
};
