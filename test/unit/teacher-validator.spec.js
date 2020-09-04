'use strict'

const { test } = use('Test/Suite')('Teacher Validator')
const teacherValidator = require('../../service/TeacherValidator')

test('should receive object as first parameter', async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "wrong email",
    password: "12345687"
  })
  assert.isOk(validatedData)

  const validatedData2 = await teacherValidator("John", "Doe", "wrong email", "pass")
  assert.isNotOk(validatedData2)
})

test('should return error when pass incorrect data', async ({ assert }) => {
  const validatedData = await teacherValidator("John", "Doe", "wrong email", "12345")
  assert.isArray(validatedData.error)
})

test('should return only one error if single incorrect data is passed', async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "wrong email",
    password: "12345687"
  })
  assert.equal(validatedData.error.length, 1)
})

test('should return more than one error if multiple incorrect data is passed', async ({ assert }) => {
  const validatedData = await teacherValidator("John", "Doe", "wrong email", "12345")
  assert.isAbove(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({ assert }) => {
  const validatedData = await teacherValidator({
    first_name: "John",
    last_name: "Doe",
    email: "john@mail.com",
    password: "12345678"
  })

  assert.equal(validatedData.error, undefined)
})
