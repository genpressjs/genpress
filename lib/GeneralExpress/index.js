var App= require('./services/App')

var express= require('express')
var general= module.exports= function () {
    return new App(
        express()
    )
}

general.Express=
general.express= express
