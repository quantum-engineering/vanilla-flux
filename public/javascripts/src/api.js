import request from "superagent"

function requestHelper(method, url) {
	return new Promise(function(resolve, reject) {
		request(method, url).end(function(err, res) {
			if(err) {
				reject(err)
			}
			resolve(res.body)
		})
	})
}

export let api = {
	get: function(success, failure) {
		request
			.get("/users")
			.end(function(err, res) {
				if(err) {
					console.info("fail")
					failure(err)
				}
				console.info("success")
				return success(res.body)
			})
	},
	update: function(id) {
		requestHelper("PUT", "/users")
	},
	create: function() {
		requestHelper("POST", "/users")
	}
}
