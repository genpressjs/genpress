var App= require('./index')



var app= App()

app.use(App.Express.logger('dev'))

app.use(function (req, res, next) {
    console.log('ok :)')
    next()
})

app.use(function * (req, res, next) {
    console.log('ok :)')
    next()
})

app.get('/'
,   function (req, res, next) {
        next()
    }
,   function * (req, res, next) {
        next()
    }
,   function * (req, res, next) {
        try {

            var foo= yield Foo.load()
            if (foo) {

                foo.bar= yield Foo.Bar.load(foo)
                foo.baz= yield Foo.Baz.load(foo)

                res.json(foo)

            } else {
                res.json(foo, 404) // NOT FOUND
            }

        } catch (err) {
            next(err)
        }
    }
)

app.use(function (err, req, res, next) {
    console.log('oops :(', err)
    next(err)
})

app.use(function * (err, req, res, next) {
    console.log('oops :(', err)
    res.json(err, 500)
})

app.listen(7000)



var Foo= {

    load: function () { return function (done) {
        var err, foo
        setTimeout(function () {
            if (Math.random() > .37) {
                foo= {type:'Foo'}
            } else {
                err= Error('pizdec')
            }
            done(err, foo)
        }, Math.random() * 100)
    }},

    Bar: {

        load: function (foo) { return function (done) {
            var err, bar
            setTimeout(function () {
                bar= {type:'Bar'}
                done(err, bar)
            }, Math.random() * 100)
        }},

    },

    Baz: {

        load: function (foo) { return function (done) {
            var err, baz
            setTimeout(function () {
                baz= {type:'Baz'}
                done(err, baz)
            }, Math.random() * 100)
        }},

    },

}
