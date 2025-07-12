import { FC } from "react";
import axios from "axios";

const HomePage: FC = async () => {

  let films = [];

  try {

    const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {

      params: {
        page: 1,
        limit: 10,
      },

      headers: {
        accept: 'application/json',
        'X-API-KEY': '6GS2239-4C3456F-NQ422KZ-YMN61WZ',
      },

    });

    console.log(response.data.docs);
    films = response.data.docs;

  } catch (error) {

    console.error(error);

  }

  return (

    <div>

    </div>

  );

};

export default HomePage;