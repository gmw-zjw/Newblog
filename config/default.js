module.exports = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    // mongodb: 'mongodb://localhost:27017/myblog'
      mongodb: 'mongodb://<dbuser>:<dbpassword>@ds117539.mlab.com:17539/myblog'
}
