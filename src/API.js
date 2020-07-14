import axios from "axios";
const EPISODE_API = `https://rickandmortyapi.com/api/episode/?page=`;
const EPISODE_API_NAME = `https://rickandmortyapi.com/api/episode/?name=`;

export const getEpisode = async page => {
  const response = await axios.get(`${EPISODE_API}${page}`);
  return response.data;
};

export const getEpisodeByName = async name => {
  const response = await axios.get(`${EPISODE_API_NAME}${name}`);
  console.log(response.data);
  return response.data.results;
};
