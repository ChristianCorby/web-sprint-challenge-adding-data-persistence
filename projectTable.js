exports.seed = function (knex) {
    return knex('project').del()
      .then(function () {
        return knex('project').insert([
          { id: 1, project_name: 'example project 1', project_desc: 'example description 1', completed: false }
        ]);
      });
  };