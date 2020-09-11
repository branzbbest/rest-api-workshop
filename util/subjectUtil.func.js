const makeSubjectUtil = SubjectModel => {
  const _withReferences = (instance, references) => {
    if (references) {
      const extractedReferences = references.split(",")
      subject.with(extractedReferences)
    }
    return instance
  }

  return {
    getAll: reference => {
      const subjects = SubjectModel.query()

      return _withReferences(subjects, reference)
        .fetch()
    },

    getById: (subjectId, reference ) => {
      const subject = SubjectModel
        .query()
        .where('subject_id', subjectId)

      return _withReferences(subject)
        .fetch()
        .then(response => response.first())
    },

    create: (subjectInstance, reference) => {
      const { subject_id } = await SubjectModel.create(subjectInstance)
      const subject = SubjectModel
        .query()
        .where('subject_id', subject_id)

      return _withReference(subject, references)
        .fetch()
        .then(response => response.first())
    }
  }
}
