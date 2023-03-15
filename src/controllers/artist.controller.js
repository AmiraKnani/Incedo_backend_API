const LastFM = require('last-fm')
const { createCsvWriter } = require('csv-writer');
const fs = require('fs');
const util = require('util');


const lastfm = new LastFM('74abc194fffe874af031175cf1fb6fd7')
const readFileAsync = util.promisify(fs.readFile);


//Test other endpoint artist.getInfo,
/*lastfm.artistInfo({ name: 'Cher' }, (err, data) => {
  if (err) console.error(err)
  else console.log(data)
}) */

// Search function
const searchArtist = async (artistName) => {
  return new Promise((resolve, reject) => {
    lastfm.artistSearch({ q: artistName }, (err, data) => {
      if (err) {
        reject(err);
        console.error(err)
      } else {
        resolve(data);
        //console.log(data)
      }
    });
  });
};

//Controller 
const artistSearchController = async (req, res, next) => {
  let artistName = req.query.artistName;
  try {
    let searchResult = await searchArtist(artistName);

    // If no results returned from the artist.search
    if (searchResult.result.length === 0) {
      const dictionary = await readFileAsync('./data/dictionary.json', 'utf8');
      const artistList = JSON.parse(dictionary).artistName;
      //console.log(artistList);
      const randomIndex = Math.floor(Math.random() * artistList.length);
      //console.log(randomIndex);
      const artistName = artistList[randomIndex];
      searchResult = await await searchArtist(artistName);
    }

    // Creation of CSV file 
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: './data/artistResult.csv',
      header: [
        { id: 'type', title: 'type' },
        { id: 'name', title: 'name' },
        { id: 'listeners', title: 'listeners' },
        { id: 'images', title: 'images' },
      ],
      append: true 
    });


    //Putting search result data in CSV file 
    const records = [];
    for (let i = 0; i < searchResult.result.length; i++) {
      const artist = searchResult.result[i];
      const images = artist.images;
      const record = {
        type: artist.type,
        name: artist.name,
        listeners: artist.listeners
      };
      record.images = images.join(' , ');
      records.push(record);
    }
    console.log('\u001b[' + 32 + 'm' + '✔ Artist search result saved to CSV' + '\u001b[0m');

    await csvWriter.writeRecords(records);
    res.json({
      searchResult
    })

  } catch (err) {
    next(err);
  }
};

module.exports = artistSearchController;



