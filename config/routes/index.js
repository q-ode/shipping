const v1Routes = require('./v1');
const v2Routes = require('./v2');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'success' });
  });

  app.use('/v1', v1Routes);
  app.use('/v2', v2Routes);
};
