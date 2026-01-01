const e = require('express');
const express = require('express');
const router = express();

router.route('/').get((req, res) => {
  res.status(200).send('This is a home page from route file');
});

router.route('/auth/register').get((req, res) => {
  res.status(200).send("This is a register page")
})

module.exports = router;
