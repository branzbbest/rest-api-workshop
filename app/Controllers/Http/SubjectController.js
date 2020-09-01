'use strict'
const Database = use('Database')
const Subject = use('App/Models/Subject')

class SubjectController {
  async index({ request }) {
    const { references = undefined } = request.qs

    const subjects = Subject.query()

    if (references) {
      const extractedReferences = references.split(",")
      subjects.with(extractedReferences)
    }

    return { status: 200, error: undefined, data: await subjects.fetch() }
  }

  async show({ request }) {
    const { id } = request.params
    const subject = await Subject.find(id)

    return { status: 200, error: undefined, data: subject || {} }
  }

  async store({ request }) {
    const { title, teacher_id } = request.body

    const subject = await Subject.create({ title, teacher_id })

    return { stauts: 200, error: undefined, data: subject }
  }

  async showTeacher({ request }) {
    const { id } = request.params
    const subject = await Database
      .table('subjects')
      .where({ subject_id: id })
      .innerJoin('teachers', 'subjects.teacher_id', 'teachers.teacher_id')
      .first()

    return { status: 200, error: undefined, data: subject || {} }
  }
}

module.exports = SubjectController
