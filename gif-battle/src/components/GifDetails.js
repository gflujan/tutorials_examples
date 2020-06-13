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
import {
  addCaption,
  client,
  getAllGifs,
  getSingleGif,
  voteForCaption,
} from '../Realm';

// Styles
import '../App.css';

/* -------------------------------------------------------------------------- */
/* START OF CUSTOM GIF DETAILS COMPONENT */
/* -------------------------------------------------------------------------- */
const GifDetails = function () {
  const { id } = useParams();
  const [gif, setGif] = useState({});
  const [caption, setCaption] = useState('');

  const handleChangeEvent = e => {
    setCaption(e.target.value);
  };

  const insertCaption = e => {
    e.preventDefault();

    addCaption(id, caption).then(() => {
      gif.captions = gif.captions || [];
      gif.captions.push({ text: caption, votes: 1 });
      setCaption('');
      setGif(gif);
    });
  };

  const vote = (id, caption, direction) => {
    voteForCaption(id, caption, direction).then(data => {
      getSingleGif(id).then(data => {
        setGif(data);
      });

      console.log(data);
    });
  };

  if (gif.captions) {
    gif.captions.sort((a, b) => (b.votes > a.votes ? 1 : -1));
  }

  useEffect(() => {
    getSingleGif(id).then(data => {
      console.log(data);
      setGif(data);
    });
  }, [id]);

  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <img
            alt="Thee coolest Jiff around!"
            className="min-w-full"
            src={gif.url}
            title="Thee coolest Jiff around!"
          />
          <h2 className="-mt-16 text-center text-white font-semibold text-3xl">
            {gif.captions && gif.captions[0].text}
          </h2>
        </div>
        <div className="w-1/2">
          {gif.captions &&
            gif.captions.map(caption => {
              return (
                <div
                  className="bg-gray-200 my-2 flex flex-wrap"
                  key={gif._id.toString()}
                >
                  <div className="w-8/12 py-5 text-lg pl-2">
                    {caption.text} ({caption.votes})
                  </div>
                  <div
                    className="w-2/12 bg-green-300 text-lg text-center py-5"
                    onClick={() => vote(gif._id.toString(), caption, 1)}
                  >
                    +
                  </div>
                  <div
                    className="w-2/12 bg-red-300 text-lg text-center py-5"
                    onClick={() => vote(gif._id.toString(), caption, -1)}
                  >
                    -
                  </div>
                </div>
              );
            })}
          <form onSubmit={e => insertCaption(e)}>
            <input
              className="w-full border border-gray-300 block py-2 px-5"
              onChange={e => handleChangeEvent(e)}
              placeholder="Add your own caption"
              type="text"
              value={caption}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GifDetails;
