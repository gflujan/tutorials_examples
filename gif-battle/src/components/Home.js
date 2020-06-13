/* -------------------------------------------------------------------------- */
/* ALL IMPORTS */
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
import { client, getAllGifs } from '../Realm';

// Styles
import '../App.css';

/* -------------------------------------------------------------------------- */
/* START OF CUSTOM HOME COMPONENT */
/* -------------------------------------------------------------------------- */
const Home = function () {
  const [gifs, setGifs] = useState([]);

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

  return (
    <div className="bg-gray-100">
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
            })
          }
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
