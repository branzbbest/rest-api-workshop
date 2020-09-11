'use strict'
const Database = use('Database')
const Subject = use('App/Models/Subject')
const SubjectUtil = require("../../../util/subjectUtil")

class SubjectController {
  async index({ request }) {
    const { references } = request.qs

    const subjectUtil = new SubjectUtil(Subject)
    const subjects = await subjectUtil.getAll(references)

    return {
      status: 200,
      error: undefined,
      data: subjects
    }
  }

  async show({ request }) {
    const { id } = request.params
    const { references } = request.qs
    const subjectUtil = new SubjectUtil(Subject)
    const subject = await subjectUtil.getById(id, references)

    return {
      status: 200,
      error: undefined,
      data: subject
    }
  }

  async store({ request }) {
    const { title, teacher_id } = request.body
    const { references } = request.qs

    const subjectUtil = new SubjectUtil(Subject)
    const subject = await subjectUtil.create({ title, teacher_id }, references)

    return { stauts: 200, error: undefined, data: subject }
  }
}

module.exports = SubjectController
