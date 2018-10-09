module.exports.delay = function (duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

module.exports.errorPromise = function (err) {
  return new Promise((resolve, reject) => {
    reject(err);
  });
};