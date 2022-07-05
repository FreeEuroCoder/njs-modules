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

// node modules --init
// node modules <module_name> --prepare
// node modules <module_name> make:controller <file_name (controller_name)>
// node modules <module_name> make:model <file_name (model_name)>
// node modules <module_name> make:migration <file_name (migration_name)>

if (action == '--init') app_modules.init()
if (action == '--prepare') app_modules.prepare(module_name)
if (action == 'make:controller') app_modules.make_controller(module_name, file_name)
if (action == 'make:model') app_modules.make_model(module_name, file_name)
if (action == 'make:migration') app_modules.make_migration(module_name, file_name)

class app_modules {
    static make_model = (module_name, model_name) => {
        var child_process = require('child_process');

        var command = ["node ace make:model",model_name].join(" ")

        console.log(command)

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);

            var fromPath = ["app/Models/",model_name,".ts"].join('')
            var toPath = ["app_modules/",module_name,"/models/",model_name,".ts"].join('')
    
            console.log(fromPath);
            console.log(toPath);
    
            this.move_file(fromPath, toPath)
        })
    }

    static move_file = (fromPath, toPath) => {
        var fs = require('fs');
        var path = require('path');

        var from = path.resolve(fromPath);
        var to = path.resolve(toPath);

        fs.rename(fromPath, toPath, (err) => {
            if (err) throw err;
            else console.log('Successfully moved');
        });
    };
}

