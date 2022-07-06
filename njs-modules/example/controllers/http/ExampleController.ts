import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExampleController {

    async index({ view }: HttpContextContract) {
        return view.render('example::example/example')
    }

}
