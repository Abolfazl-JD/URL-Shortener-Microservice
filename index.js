require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const fs = require('fs');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*-----------------------------------------------------------------------------------------*/
/*---------------------------------------MY CODE-------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/

//1.function to manage local file storage (File data.json)
let data = [
  {
    "original_url": "https://www.w3schools.com/",
    "short_url": 715
  },
  {
    "original_url": "https://github.com/",
    "short_url": 299
  },
  {
    "original_url": "https://www.freecodecamp.org/",
    "short_url": 1982
  },
  {
    "original_url": "https://www.wikipedia.org/",
    "short_url": 2374
  },
  {
    "original_url": "https://www.tutorialrepublic.com/",
    "short_url": 220
  },
  {
    "original_url": "https://www.google.com/",
    "short_url": 4181
  },
  {
    "original_url": "https://www.tutorialspoint.com/",
    "short_url": 2745
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1677921275751",
    "short_url": 2529
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1677921277226",
    "short_url": 26
  },
  {
    "original_url": "https://paramsgit.github.io/gs/",
    "short_url": 477
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688403149867",
    "short_url": 6971
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688403151972",
    "short_url": 1176
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688403598832",
    "short_url": 11583
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688403599622",
    "short_url": 12615
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688654823499",
    "short_url": 12236
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1688654824633",
    "short_url": 10101
  },
  {
    "original_url": "http://social-logins.com/TEMP/FF?id=1704308798",
    "short_url": 4256
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1689943522758",
    "short_url": 11562
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1689943523983",
    "short_url": 11135
  },
  {
    "original_url": "https://url-shortener-microservice--viktoriussuwand.repl.co/",
    "short_url": 10617
  },
  {
    "original_url": "https://url-shortener-microservice--viktoriussuwand.repl.co/?v=1694195042721",
    "short_url": 8521
  },
  {
    "original_url": "https://url-shortener-microservice--viktoriussuwand.repl.co/?v=1694195044599",
    "short_url": 9164
  },
  {
    "original_url": "https://github.com",
    "short_url": 20242
  },
  {
    "original_url": "https://www.google.com",
    "short_url": 947
  },
  {
    "original_url": "https://www.freecodecamp.org",
    "short_url": 10495
  },
  {
    "original_url": "123",
    "short_url": 11091
  },
  {
    "original_url": "https://www.goolge.com",
    "short_url": 23340
  },
  {
    "original_url": "https://www.crunchyroll.com",
    "short_url": 3270
  },
  {
    "original_url": "https://axewbotx.is-a.dev",
    "short_url": 22592
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1698825089095",
    "short_url": 12187
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1698825089772",
    "short_url": 28180
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1698915498262",
    "short_url": 26470
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1698915499406",
    "short_url": 24941
  },
  {
    "original_url": "https://google.com",
    "short_url": 18963
  },
  {
    "original_url": "https://www.linkedin.com/in/dhruvsethi708/",
    "short_url": 5810
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700226656562",
    "short_url": 16967
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700226657871",
    "short_url": 1708
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700247871597",
    "short_url": 22713
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700247872085",
    "short_url": 21834
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700249035242",
    "short_url": 10514
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700249035922",
    "short_url": 9584
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700250834441",
    "short_url": 11096
  },
  {
    "original_url": "https://url-shortener-microservice.viktoriussuwand.repl.co/?v=1700250835109",
    "short_url": 7348
  },
  {
    "original_url": "https://url-shortener-microservice--viktoriussuwand.repl.co/?v=1701195291518",
    "short_url": 19319
  },
  {
    "original_url": "https://url-shortener-microservice--viktoriussuwand.repl.co/?v=1701195292232",
    "short_url": 32353
  },
  {
    "original_url": "https://example.org/",
    "short_url": 30767
  }
];

// Function to manage data
function dataManagement(action, input) {
  // Scenario for saving data
  if (action === 'save data' && input != null) {
    // Check if input.original_url already exists
    const inputExist = data.map(d => d.original_url);
    if (!inputExist.includes(input.original_url)) {
      // Add input element to data array
      data.push(input);
    }
  }
  // Scenario for loading data
  else if (action === 'load data' && input == null) {
    return data;
  }
}

//2.function for random short_url (using Math.random())
function gen_shorturl() {
  let all_Data = dataManagement('load data');
  // generate random number between 1 to data_length*1000
  let min = 1; let max = 1000;
  if (all_Data != undefined && all_Data.length > 0) { max = all_Data.length * 1000 }
  else { max = 1000; }
  let short = Math.ceil(Math.random() * (max - min + 1) + min);

  //get all existing short url
  if (all_Data === undefined) { return short; }
  else {
    //check if short url already exist
    let shortExist = all_Data.map(d => d.short_url);
    let check_short = shortExist.includes(short);
    if (check_short) { gen_shorturl(); } else { return short; }
  }

}

//3.middleware to handle user url input
app.post('/api/shorturl', (req, res) => {
  //Create variable needs
  let input = '', domain = '', param = '', short = 0;

  //Post url from user input
  input = req.body.url;
  if (input === null || input === '') {
    return res.json({ error: 'invalid url' });
  }

  //matches a string with regular expr => return array
  //url should contains : http:// or https://
  domain = input.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm);
  //search a string with regular expr, and replace the string -> delete https://
  param = domain[0].replace(/^https?:\/\//i, "");

  //Validate the url
  dns.lookup(param, (err, url_Ip) => {
    if (err) {
      //If url is not valid -> respond error
      console.log(url_Ip);
      return res.json({ error: 'invalid url' });
    }
    else {
      //If url is valid -> generate short url
      short = gen_shorturl();
      dict = { original_url: input, short_url: short };
      dataManagement("save data", dict);
      return res.json(dict);
    }
  });
});

//4.middleware to handle existing short url
app.get('/api/shorturl/:shorturl', (req, res) => {
  let input = Number(req.params.shorturl);
  let all_Data = dataManagement('load data');

  //check if short url already exist
  let shortExist = all_Data.map(d => d.short_url);
  let check_short = shortExist.includes(input);
  if (check_short && all_Data != undefined) {
    data_found = all_Data[shortExist.indexOf(input)];
    // res.json({data : data_found, short : input, existing : shortExist});
    res.redirect(data_found.original_url);
  }
  else {
    res.json({ data: 'No matching data', short: input, existing: shortExist });
  }
});

/*=========================================================================================*/

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});