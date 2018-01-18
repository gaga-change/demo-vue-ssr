const Vue = require('vue')
const express = require('express')
const app = express()
const vueServerRenderer = require('vue-server-renderer')

const renderer = vueServerRenderer.createRenderer()


app.get('*', (req, res) => {
	const app = new Vue({
		template: `<div> <div>{{name}}</div> <div>url: {{url}}</div> </div>`,
		data: {
			name: 'gaga',
			url: req.url
		}
	})
	renderer.renderToString(app, (err, html) => {
		if (err) {
			console.log(err)
			res.send(404)
		} else {
			res.send(html)
		}
	})
})

app.listen('3000', () => {
	console.log('listen to 3000')
})