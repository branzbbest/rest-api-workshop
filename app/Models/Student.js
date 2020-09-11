'use strict'

const Subject = require('./Subject')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
  subjects () {
    return this.hasMany('App/Models/Subject')
  }
}

module.exports = Student
