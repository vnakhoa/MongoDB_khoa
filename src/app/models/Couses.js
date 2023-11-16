
const mongoose = require('mongoose')

var slug = require('mongoose-slug-updater')
var mongoose_delete = require('mongoose-delete')


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true }
}, { timestamps: true });

//Add plugin

mongoose.plugin(slug)
//override to exclude delete ==true khi xóa soft delete
Course.plugin(
    mongoose_delete,
    {
        overrideMethods: 'all',
        deletedAt: true,
    }
)



module.exports = mongoose.model('Course', Course)
