const config = require('config');
const app = require('./server');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const host = config.has('database.host') ? config.get('database.host') : 'mongodb://mongo/diary';
const port = config.has('port') ? config.get('port') : 3000;

mongoose.connect(`${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    require('./seed/seeder');
    console.info(`MongoDB connection is successful on:${host}`)
}).catch(err => {
    console.error(err);
    process.exit();
});

app.listen(port, () => {
    console.log(`App listening on port:${port}`)
})