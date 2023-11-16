
const Course = require('../models/Couses')

class CoursesControllers {

    //GET /courses
    async courses(req, res) {
        try {
            const courses = await Course.find({})
            // console.log('courses: ', courses)

            const newCourses = courses.map(course => course.toObject())

            //For Nodejs Express
            res.render('courses', {
                newCourses
            })

            //For POSTMAN return
            // res.json(newCourses)

        }
        catch (error) {
            console.log('Lỗi courses: ', error)
        }
    }

    //GET me/stored/trash
    async coursesDeleted(req, res) {
        try {
            const courses = await Course.findWithDeleted({ deleted: true })
            console.log('coursesDELETE: ', courses,)


            const courseDeleted = courses.map(course => course.toObject())

            res.render('restore/restore', {
                courseDeleted
            })

            //For POSTMAN return
            // res.json(newCourses)

        }
        catch (error) {
            console.log('Lỗi coursesDelete: ', error)
        }
    }

    //GET /courses/:slug
    async courseDetail(req, res) {
        try {
            //Lấy params động slug khi GET
            const slugParam = req.params.slug;
            console.log('slug: ', slugParam)

            //FindOne slug
            const courses = await Course.findOne({ slug: slugParam }).exec();
            console.log('courses: ', courses)

            let newCourses;
            if (Array.isArray(courses)) {
                //Chuyển course thành object trong javascript
                newCourses = courses.map(course => course.toObject())
            }
            else {
                if (courses == null) {
                    //Chuyển qua trang 404 với layouts trong viwes là 404.hbs
                    res.render('notExist', { layout: '404' })
                    return;
                }
                else {
                    newCourses = [courses.toObject()]
                }
            }

            //Truyền courses trong handlebars để render dữ liệu trong database
            res.render('showDetail', {
                newCourses
            })
        }
        catch (error) {
            console.log('Lỗi courses: ', error)
        }
    }


    //GET courses/create
    create(req, res) {
        res.render('create')
    }

    //POST courses/store
    async store(req, res) {
        try {
            const small = new Course(req.body);
            await small.save();

            //For NodeJS & Express
            res.redirect('/courses')

            // For POSTMAN return
            // res.json(small)

            console.log('saved successfully !!')
        }
        catch (error) {
            console.log('SAVED FAILD, Error: ', error)
        }

        // or to POST instead try...catch
        // await Tank.create({ size: 'small' });
    }

    // GET /courses/:id/edit
    async edit(req, res) {

        const course = await Course.findById(req.params.id);

        console.log(course)
        if (Array.isArray(course)) {
            //Chuyển course thành object trong javascript
            newCourses = course.map(item => item.toObject())
        }
        else {
            course.toObject()
        }

        // For POSTMAN return
        // res.json(course)

        //For NodeJS & Express
        res.render('me/edit', course)
    }

    //PUT course/:id
    async update(req, res) {
        const newCourseUpdated = await Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        console.log('UPDATE OBJECT: ', newCourseUpdated)

        //For NodeJS & Express
        res.redirect('/me/stored/courses')

        // For POSTMAN return
        // res.json(newCourseUpdated)
    }

    //PATCH course/:id/restore
    async restore(req, res) {
        const newCourseUpdated = await Course.restore({ _id: req.params.id })
        console.log('idididi: ', req.params.id)
        console.log('UPDATE OBJECT: ', newCourseUpdated)

        //For NodeJS & Express
        res.redirect('/me/stored/courses')

        // For POSTMAN return
        // res.json(newCourseUpdated)
    }

    // DELETE course/:id
    async delete(req, res) {
        try {

            //cóa mềm  soft delete khi đã cài thư viện mongoose-delete
            const dataDelete = await Course.delete({ _id: req.params.id });
            console.log('DATA DELETE: ', dataDelete)

            //For REDIRECT Nodejs Express Web
            res.redirect('/me/stored/courses')

            //For POSTMAN return
            // res.json('Deleted Successfully !!!')
        }
        catch (error) {
            consoele.log('Delete FAILD: ,', error)
        }

    }
}

module.exports = new CoursesControllers;