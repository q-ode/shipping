const v1Routes = require('./v1');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'success' });
  });

  app.use('/v1', v1Routes);
};
