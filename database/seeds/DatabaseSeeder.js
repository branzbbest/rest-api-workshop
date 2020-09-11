'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const teachers = await Factory
      .model('App/Models/Teacher')
      .createMany(10)
    const subjects = await Factory
      .model('App/Models/Subject')
      .makeMany(20)

    const groups = await Factory
      .model('App/Models/Group')
      .createMany(100)

    let currentSubjectIndex = 0;
    const subjectPerIteration = 2;

    for (const teacher of teachers) {
      const selectedSubjects = subjects.slice(
        currentSubjectIndex,
        currentSubjectIndex + subjectPerIteration
      )
      await teacher
        .subjects()
        .saveMany(selectedSubjects)

      currentSubjectIndex += subjectPerIteration
    }
  }
}

module.exports = DatabaseSeeder
