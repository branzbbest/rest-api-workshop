'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
const Teacher = use('App/Models/Teacher')
const TeacherValidator = require("../../../service/TeacherValidator")

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number)))
    return { error: `param: ${number} is not supported, please use number type param instead.` }

  return {}
}

class TeacherController {
  async index () {
    const teachers = await Teacher.all()

    return { status: 200, error: undefined, data: teachers }
  }

  async show ({ request, auth }) {
    const { id } = request.params

    const validatedValue = numberTypeParamValidator(id)

    if (validatedValue.error)
      return { status: 500, error: validatedValue.error, data: undefined }

    const teacher = await Teacher.find(id)

    return { status: 200, error: undefined, data: teacher || {} }
  }

  async store ({ request }) {
    const { first_name, last_name, email, password } = request.body

    const validatedData = await TeacherValidator(request.body)

    if (validatedData.error)
      return { status: 422, error: validatedData.error, data: undefined }

    const hashedPassword = await Hash.make(password)

    const teacher = await Database
      .table('teachers')
      .insert({ first_name, last_name, email, password: hashedPassword })

    return { status: 200, error: undefined, data: { first_name, last_name, email } }
  }

  async update({ request }) {
    // const body = request.body
    // const params = request.params
    const { body, params } = request
    const { id } = params
    const { first_name, last_name, email } = body

    const teacherId = await Database
      .table('teachers')
      .where({ teacher_id: id })
      .update({ first_name, last_name, email })

    const teacher = await Database
      .table('teachers')
      .where({ teacher_id: teacherId })
      .first()

    return { status: 200, error: undefined, data: teacher }
  }

  async destroy({ request }) {
    const { id } = request.params

    await Database
      .table('teachers')
      .where({ teacher_id: id })
      .delete()

    return { stauts: 200, error: undefined, data: { message: 'success' } }
  }
}

module.exports = TeacherController
