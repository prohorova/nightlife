module.exports = {
  db: 'mongodb://localhost/nightlife',
  sessionSecret: 'devsecretkey',
  google: {
    clientID: '581951908751-d052rb3d1bgcmbbqbbfobessdbi5oqni.apps.googleusercontent.com',
    clientSecret: '25e6REdfolzzPxsRGPuZs5E5',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  yelp: {
    clientID: 'VOfQHpYX0eJmHRobvOACNA',
    clientSecret: 'MZJmEs0spLutcpouWnU3LiQqW7y11Bj2yjpziOk55PnS8jTqCFsAOmyNyq2qEAFh'
  }
}
