import View from '@ioc:Adonis/Core/View'

export default class njs_modules {
    public static load() {
        this.loadViewsNamespaces();
        this.loadRoutes();
    }

    private static loadViewsNamespaces() {
        var path = require('path');
        var fs = require('fs');
        var directories = fs.readdirSync(__dirname).filter(file => fs.statSync(path.join(__dirname, file)).isDirectory())
        directories.forEach(function (directory) {   
            var namespacePath = [__dirname, directory, 'resources/views'].join('/')
            console.log('Created view namespace ' + directory + ' to ' + namespacePath)
            View.mount(directory, namespacePath)
        });
    }

    private static loadRoutes() {
        var path = require('path');
        var fs = require('fs');
        var directories = fs.readdirSync(__dirname).filter(file => fs.statSync(path.join(__dirname, file)).isDirectory())
        directories.forEach(function (directory) {   
            var routetsPath = [__dirname, directory, '/routes/api.ts'].join('/')
            if (fs.existsSync(routetsPath)) { import(routetsPath) }
            var routetsPath = [__dirname, directory, '/routes/web.ts'].join('/')
            if (fs.existsSync(routetsPath)) { import(routetsPath) }
        });
    }
} 
