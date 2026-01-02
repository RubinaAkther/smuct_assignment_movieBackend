const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync(req.body);
    req.body = parsed;
    next();
  } catch (err) {
    let message = 'Validation failed';

    if (Array.isArray(err.errors) && err.errors.length > 0) {
      message = err.errors[0].message;
    } else if (typeof err.message === 'string') {
      message = err.message;
    }

    if (message.startsWith('[')) {
      try {
        const parsed = JSON.parse(message);
        if (Array.isArray(parsed) && parsed[0].message)
          message = parsed[0].message;
      } catch (e) {}
    }

    res.status(400).json({ msg: message });
  }
};

module.exports = validate;
