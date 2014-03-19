function $generate(Generator) {

    if (Generator.length > 3) {

        return function (err, req, res, next) {
            return generate.apply(this, arguments)
        }

    } else {

        return function (req, res, next) {
            return generate.apply(this, arguments)
        }

    }

    function generate() {

        var generator= Generator.apply(this, arguments)
        var result, sync, value

        iterate()

        function iterate() {
            while (!(result= generator.next(value)).done) {
                result= result.value
                sync= undefined
                result(done)
                if (sync === undefined) {
                    sync= false
                    break
                }
            }
        }

        function done(err, v) {
            if (err) {
                return generator.throw(err)
            }
            value= v
            if (sync === undefined) {
                sync= true
            } else {
                iterate()
            }
        }

    }
}



module.exports= App



function App(app) {
    this.app= app
}



methods= require('express/node_modules/methods')
methods.map(function (method) {

    App.prototype[method]= function () {
        var args= []
        for (var argument, i= 0, l= arguments.length; l > i; i++) { argument= arguments[i]
            if (argument && argument.constructor && argument.constructor.name === 'GeneratorFunction') {
                argument= $generate(argument)
            }
            args.push(argument)
        }
        this.app[method].apply(this.app, args)
    }

})



App.prototype.use= function () {

    var args= []
    for (var argument, i= 0, l= arguments.length; l > i; i++) { argument= arguments[i]
        if (argument && argument.constructor && argument.constructor.name === 'GeneratorFunction') {
            argument= $generate(argument)
        }
        args.push(argument)
    }
    this.app.use.apply(this.app, args)
}



App.prototype.listen= function(port) {
    this.app.listen(port, function () {
        console.log('application listening on port', port)
    })
}
