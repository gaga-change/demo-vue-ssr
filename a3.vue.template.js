const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const app = express()
const createRenderer = require('vue-server-renderer').createRenderer
const renderer = createRenderer({
	template: fs.readFileSync('./index.template.html', 'utf-8')
})

const context = {
	title: 'vue-ssr',
	meta: `
	  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	`
}

app.get('*', (req, res) => {
	const app = new Vue({
		template: `<div> <div>{{name}}</div> <div>url: {{url}}</div> </div>`,
		data: {
			name: 'gaga',
			url: req.url
		}
	})
	renderer.renderToString(app, context, (err, html) => {
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