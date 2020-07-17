exports.seed = function (knex) {
    return knex('resourceProject').del()
      .then(function () {
        return knex('resourceProject').insert([
          { id: 1, project_id: 1, resource_id: 1 }
        ]);
      });
  };