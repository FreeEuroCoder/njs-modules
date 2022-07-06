export default class njs_modules {
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

