
const Course = require('../models/Couses')

class MeController {

    async me(req, res) {

        try {
            const courses = await Course.find({})
            console.log('courses: ', courses)

            //Chuyển thành object trong javascript
            const newCourses = courses.map(course => course.toObject())

            res.render('me/me', {
                newCourses
            })
        }
        catch (error) {
            console.log('Lỗi courses: ', error)
        }
    }
}
module.exports = new MeController;