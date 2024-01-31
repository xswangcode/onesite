user_config = require("./user.config")
web_config =require("./web.config")

module.exports = {
    ...user_config,
    ...web_config
}