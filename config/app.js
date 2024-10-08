module.exports = {
    port: process.env.SERVER_PORT || 8000,
    prefixApiVersion: process.env.PREFIX_API_VERSION || "/api/v1",
    jwtAccessKey: process.env.JWT_ACCESS_TOKEN || "tiendang9102",
    static_folder: `${__dirname}/../src/public`,
    view_folder: `${__dirname}/../src/apps/views`,
    view_engine: 'ejs',
    tmp: `${__dirname}/../src/tmp/`,
    
    facebook: {
        FACEBOOK_APP_ID: 1489414501664481,
        FACEBOOK_APP_SECRET: "88241428d3c4ad4945e52ce661e10c1b",
        callbackURL: "http://localhost:8000/api/facebook/redirect",
    }
};
