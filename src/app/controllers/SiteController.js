const Course = require('../models/Couses')


class SiteControllers {

    //GET /home
    home(req, res) {
        res.render('home')
    }

    //GET /search
    search(req, res) {
        res.render('search')
    }

}

module.exports = new SiteControllers;