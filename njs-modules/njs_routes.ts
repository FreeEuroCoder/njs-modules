import Route from '@ioc:Adonis/Core/Route'

export default class njs_routes {

    private static parseHandler(handler: string) {
        var pHandler = {
            moduleName : '',
            controllerType : '',
            controllerName : '',
            functionName : ''
        }

        var reModuleName = new RegExp('^([^:]+)::')     
        pHandler.moduleName = handler.match(reModuleName)![1]

        var reControllerType = new RegExp('\\x28([^\\x29]+)\\x29')
        pHandler.controllerType = handler.match(reControllerType)![1]

        var reControllerName = new RegExp('\\x29([^\.]+)\.')
        pHandler.controllerName = handler.match(reControllerName)![1]

        var reFunctionName = new RegExp('\\.(.*)')
        pHandler.functionName = handler.match(reFunctionName)![1]

        return pHandler
    }

    public static get(pattern: string, handler: string) {
        var pHandler = this.parseHandler(handler)

        var httpHandlerPath = [[__dirname, pHandler.moduleName, 'controllers', pHandler.controllerType, pHandler.controllerName].join('/'), '.ts'].join('')
        var classRequire = require(httpHandlerPath)
        var classInstance = new classRequire.default()

        if (typeof classInstance[pHandler.functionName] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler)
            return Route.get(pattern, classInstance[pHandler.functionName])
        }
    }

    public static post(pattern: string, handler: string) {
        var pHandler = this.parseHandler(handler)

        var httpHandlerPath = [[__dirname, pHandler.moduleName, 'controllers', pHandler.controllerType, pHandler.controllerName].join('/'), '.ts'].join('')
        var classRequire = require(httpHandlerPath)
        var classInstance = new classRequire.default()

        if (typeof classInstance[pHandler.functionName] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler)
            return Route.post(pattern, classInstance[pHandler.functionName])
        }
    }
    
    public static api(pattern: string, handler: string) {
        var pHandler = this.parseHandler(handler)

        var httpHandlerPath = [[__dirname, pHandler.moduleName, 'controllers', pHandler.controllerType, pHandler.controllerName].join('/'), '.ts'].join('')
        var classRequire = require(httpHandlerPath)
        var classInstance = new classRequire.default()
        
        if (typeof classInstance['store'] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler + '.store')
            Route.post(pattern, classInstance['store'])
        }
        if (typeof classInstance['show'] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler + '.show')
            Route.get(pattern, classInstance['show'])
        }
        if (typeof classInstance['update'] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler + '.update')
            Route.put(pattern, classInstance['update'])
        }
        if (typeof classInstance['modify'] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler + '.modify')
            Route.patch(pattern, classInstance['modify'])
        }
        if (typeof classInstance['destroy'] === "function") {
            console.log('Registred route ' + pattern + ' to ' + handler + '.destroy')
            Route.delete(pattern, classInstance['destroy'])
        }
    }
}