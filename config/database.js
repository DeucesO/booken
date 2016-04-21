module.exports = {
    url : function (env) {
        if (env === 'development')
        {
            return 'mongodb://localhost:27017/booken-test'
        }
        return 'mongodb://localhost:27017/booken'
    }
}