# [express*](https://github.com/genpressjs/node-general-express)

*with [ES6 Generators](http://wiki.ecmascript.org/doku.php?id=harmony:generators)

— [Обзор ECMAScript 6, следующей версии JavaScript](http://habrahabr.ru/post/175371/)
— [Отказываемся от коллбэков: Генераторы в ECMAScript 6](http://habrahabr.ru/post/210330/)

Why not?

 
## Require
```
--harmony
```

 
## Install
```
npm install genpress
```

 
## Usage

Example application:

```javascript
var App= require('genpress')
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
```

Example datastore:

```javascript
var Foo= {

    load: function () { return function (done) {
        var err, foo
        setTimeout(function () {
            if (Math.random() > .37) {
                foo= {type:'Foo'}
            } else {
                err= Error('Pizdec')
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
```

 
## License
MIT
