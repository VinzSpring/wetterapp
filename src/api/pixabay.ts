import axios from "axios";

const API_KEY = "18073346-97b8107771fb4d83c036ee653";


export const PIXABAY = {
  async getRandomImage(queryStr: string, unit="metric"): Promise<string> {
    const imageUrls: string[] = (
      await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURI(queryStr)}&image_type=photo`
      )
    ).data.hits.map((x: any) => x.largeImageURL);        

    return imageUrls[~~(Math.random() * imageUrls.length)];
  },
};
