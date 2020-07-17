const knex = require('knex')
const config = require('../knexfile.js')
const mappers = require('./mappers.js')
const db = knex(config.development)

module.exports = {
    getProjects,
    addProject,
    getResources,
    getProjectTask,
    getProjectById,
    addResource,
    addTaskByProjectId,
    getTaskByProjectID

}


function addResource(resource) {
    return db('resource').insert(resource)
}


function getResources() {
    return db.select('resource_name as Name', 'resource_desc as Description').from('resource')
}

function addProject(project) {
    return db('project').insert(project)

}


function getProjects() {
    return db.select('id', 'project_name as Name', 'project_desc as Description', 'completed').from('project')
        .then(projects => projects.map(project => mappers.projectToBody(project)));
}


function addTaskByProjectId(task) {
    return db('task')
        .insert(task, 'id')
}


function getTaskByProjectID(id) {
    return db('project')
        .join('task', 'project.id', 'task.project_id')
        .where('project.id', '=', id)
        .select('project.project_name as Project Name', 'project.project_desc as Project Description', 'task.task_desc as Task Description', 'task.task_note as Task Note', 'task.completed')
        .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}


function getProjectTask(project_Id) {
    return db.select('id', 'task_desc as Description', 'task_note as Note').from("task")
        .where("project_id", project_Id)
        .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function getProjectById(id) {
    let query = db.select('id', 'project_name as Name', 'project_desc as Description', 'completed').from("project as p");

    if (id) {
        query.where("p.id", id).first();

        const promises = [query, getProjectTask(id)];

        return Promise.all(promises).then(function (results) {
            let [project, tasks] = results;

            if (project) {
                project.tasks = tasks;

                return mappers.projectToBody(project);
            } else {
                return null;
            }
        });
    } else {
        return query.then(projects => {
            return projects.map(project => mappers.projectToBody(project));
        });
    }
} 