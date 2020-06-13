/* -------------------------------------------------------------------------- */
/* ALL IMPORTS */
/* -------------------------------------------------------------------------- */
// React

// Packages
import { RemoteMongoClient, Stitch } from 'mongodb-stitch-browser-sdk';

// Context
// Components
// Assets
// Constants
// Utils / Methods
// Styles

/* -------------------------------------------------------------------------- */
/* START OF REALM SDK IMPLEMENTATION */
/* -------------------------------------------------------------------------- */
const client = Stitch.initializeDefaultAppClient('gif-battle-plvnb');
const mongodb = client.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas',
);
const db = mongodb.db('gif-battle');

const getAllGifs = () => {
  return client.callFunction('getAllGifs');
};

const getSingleGif = id => {
  return client.callFunction('getSingleGif', [id]);
};

const voteForCaption = (id, caption, direction) => {
  return db.collection('gifs').updateOne(
    {
      '_id': {
        $oid: id,
      },
      'captions.text': caption.text,
    },
    {
      $inc: {
        'captions.$.votes': direction,
      },
    },
  );
};

const addCaption = (id, caption) => {
  return db.collection('gifs').updateOne(
    {
      _id: {
        $oid: id,
      },
    },
    {
      $push: {
        captions: {
          votes: 1,
          text: caption,
        },
      },
    },
  );
};

export { addCaption, client, getAllGifs, getSingleGif, voteForCaption };
