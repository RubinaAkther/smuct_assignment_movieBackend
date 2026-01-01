const home = async (req, res) => {
  try {
    res.status(200).send('This is a home page from controller file');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    res.status(200).send('This is a register page from controller');
  } catch (error) {
    res.status(404).send({ message: 'page not found' });
  }
};

module.exports = { home ,register};
