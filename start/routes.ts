/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs/promises'

router.on('/').render('pages/home').as('home')

router
  .get('/test/:slug', async (ctx) => {
    const url = app.makeURL(`resources/tests/${ctx.params.slug}.html`)

    try {
      const test = await fs.readFile(url, 'utf8')
      ctx.view.share({ test })
    } catch (error) {
      throw new Exception(`Could not find a test called ${ctx.params.slug}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }

    return ctx.view.render('pages/test/show')
  })
  .as('test.show')
  .where('slug', router.matchers.slug())

// router.get('/test', () => {}).as('test.index')

// router.get('/test/test1', () => {}).as('test.show')

// router.get('/test/create', () => {}).as('test.create')

// router.post('/test', () => {}).as('test.store')

// router.get('/test/test1/edit', () => {}).as('test.edit')

// router.put('/test/test1', () => {}).as('test.update')

// router.delete('/test/test1', () => {}).as('test.destroy')
