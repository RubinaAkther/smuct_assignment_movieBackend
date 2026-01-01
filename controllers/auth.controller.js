const home = async (req, res) => {
  try {
    res.status(200).send('This is a home page from controller file');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body)
    res.status(200).send({message: req.body});
  } catch (error) {
    res.status(404).send({ message: 'page not found' });
  }
};

module.exports = { home ,register};
