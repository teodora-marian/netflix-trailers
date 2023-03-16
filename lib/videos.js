import actionVideos from "../data/action.json";
import comedyVideos from "../data/comedy.json";
import horrorVideos from "../data/horror.json";
import sfVideos from "../data/sf.json";

export const getActionVideos = () => {
  return actionVideos.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    };
  });
};

export const getComedyVideos = () => {
  return comedyVideos.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    };
  });
};

export const getHorrorVideos = () => {
  return horrorVideos.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    };
  });
};

export const getSfVideos = () => {
  return sfVideos.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    };
  });
};
