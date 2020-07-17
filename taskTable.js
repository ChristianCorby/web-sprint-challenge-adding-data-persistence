exports.seed = function (knex) {
    return knex('task').del()
      .then(function () {
        return knex('task').insert([
          { id: 1, task_desc: 'example description', task_note: 'rowValue1', completed: false, project_id: 1 }
        ]);
      });
  };