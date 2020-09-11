'use strict'

const { test } = use('Test/Suite')('Subject Util')
const SubjectUtil = require("../../util/subjectUtil")
const MockSubjectModel = require("path/to/Mock/SubjectModel")

test("should get all subjects", async ({ assert }) => {
  const subjectUtil = new SubjectUtil(MockSubjectModel);
  const subjects = await subjectUtil.getAll()
  assert.isArray(subjects)
})
