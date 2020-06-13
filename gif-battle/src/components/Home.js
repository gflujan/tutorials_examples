/* -------------------------------------------------------------------------- */
/* ALL IMPORTS */
/* LINK: GitHub repo for this project -- https://github.com/kukicado/jumpstart */
/* -------------------------------------------------------------------------- */
// React
import React, { useEffect, useState } from 'react';

// Packages
import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

// Context
// Components
// Assets
// Constants

// Utils / Methods
import { client, getAllGifs, searchGifs } from '../Realm';

// Styles
import '../App.css';

/* -------------------------------------------------------------------------- */
/* START OF CUSTOM HOME COMPONENT */
/* -------------------------------------------------------------------------- */
const Home = function () {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!client.auth.user) {
      client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
        getAllGifs().then(data => {
          setGifs(data);
        });
      });
    } else {
      getAllGifs().then(data => {
        setGifs(data);
      });
    }
  }, []);

  const executeSearch = event => {
    event.preventDefault();

    if (searchTerm.length) {
      searchGifs(searchTerm).then(results => {
        setSearchTerm('');
        setGifs(results);
      });
    }
  };

  const handleSearchChangeEvent = event => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <div className="bg-gray-100">
      <form onSubmit={e => executeSearch(e)}>
        <input
          className="w-full border border-gray-300 block py-2 px-5"
          name="Search Gifs"
          onChange={e => handleSearchChangeEvent(e)}
          placeholder="Search for a gif"
          type="text"
          value={searchTerm}
        />
      </form>
      <div className="container mx-auto text-center">
        <div className="flex flex-wrap py-5 pb-32">
          {gifs &&
            gifs.map(gif => {
              return (
                <Link
                  key={gif._id.toString()}
                  to={`/gif/${gif._id.toString()}`}
                >
                  <Gif gif={gif} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CUSTOM GIF COMPONENT */
/* -------------------------------------------------------------------------- */
const Gif = function ({ gif }) {
  if (gif.captions) {
    gif.captions.sort((a, b) => (b.votes > a.votes ? 1 : -1));
  }

  return (
    <div className="w-full p-5 m-5 text-white relative">
      <img alt="Gif" className="w-full" src={gif.url} title="Cool Gif" />
      <h2 className="-mt-12 font-semibold text-2xl">
        {gif.captions && gif.captions[0].text}
      </h2>
    </div>
  );
};

export default Home;
