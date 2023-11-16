
const newsControllers = require('../app/controllers/NewsController')
const siteControllers = require('../app/controllers/SiteController')
const coursesControllers = require('../app/controllers/CourseController')
const meController = require('../app/controllers/MeController')

function route(app) {
    //home
    app.get('/', siteControllers.home)

    //search
    app.get('/search', siteControllers.search)


    //news   (can using app.use + create a file news.js and module.exports it to file index.routes.js INSTEAD USING app.get)
    app.get("/news", newsControllers.index);
    app.get("/news/:slug", newsControllers.show);

    //courses
    app.post('/courses/store', coursesControllers.store)
    app.get('/courses/create', coursesControllers.create)
    app.get('/courses/:slug', coursesControllers.courseDetail)
    app.get('/courses', coursesControllers.courses)


    //GET me/stored/course
    app.get('/me/stored/courses', meController.me)

    // GET /courses/:id/edit
    app.get('/courses/:id/edit', coursesControllers.edit)
    // PUT /courses/:id
    app.put('/courses/:id', coursesControllers.update)

    // app.get('/courses/:id/delete', coursesControllers.delete)
    // DELETE /courses/:id
    app.delete('/courses/:id', coursesControllers.delete)


    //GET me/stored/recycle
    app.get('/me/stored/trash', coursesControllers.coursesDeleted)
    // PUT /courses/:id/restore
    app.patch('/courses/:id/restore', coursesControllers.restore)
}

module.exports = route;