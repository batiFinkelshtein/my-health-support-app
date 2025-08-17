const errorHandler = (err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.message && err.message.includes('Only JPEG/PNG/WEBP')) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};
module.exports = errorHandler;
