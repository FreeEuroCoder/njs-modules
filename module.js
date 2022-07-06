import njs_modules from './njs_modules'

const { exec } = require("child_process");

if (process.argv.length == 2) {
    var action = process.argv[2]
}
if (process.argv.length == 3) {
    var module_name = process.argv[2]
    var action = process.argv[3]
}
if (process.argv.length == 4) {
    var module_name = process.argv[2]
    var action = process.argv[3]
    var file_name = process.argv[4]
}

// Implement njs-modules methods into adonis routes
// node modules --init

// Create modules all directories :  
// node modules --create <module_name>

// Make object all files : controllers (api + web), views (list, view and edit, ), and models, for list and crud
// node modules <module_name> make:object <object_name>
// node modules <module_name> make:controller <file_name (controller_name)>
// node modules <module_name> make:model <file_name (model_name)>
// node modules <module_name> make:migration <file_name (migration_name)>

if (action == '--init') app_modules.init()
if (action == '--prepare') app_modules.prepare(module_name)
if (action == 'make:controller') app_modules.make_controller(module_name, file_name)
if (action == 'make:model') app_modules.make_model(module_name, file_name)
if (action == 'make:migration') app_modules.make_migration(module_name, file_name)

