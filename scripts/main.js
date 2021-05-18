const pm2 = require('pm2');

function startMain() {
	pm2.connect(true, function(err) {
		if (err) {
			console.error(err);
			process.exit(2);
		}

		pm2.delete("electron main", (err) => {
			pm2.start({
				name: "electron main",
				script: "npx electron .",
				watch: ["src/main"],
				env: {
					"NODE_ENV": "development",
				},
			}, function(err, apps) {
				// const options = {
				// 	stdio: ['pipe', 'pipe', 'pipe', 'ipc']
				// };
				// const s = spawn("npx", ["pm2", 'logs',  '--raw', '--lines 0'], options)
				// s.stdout.pipe(process.stdout)

			})
		})

	});
}

// process.on("SIGINT", () => {
// 	pm2.delete("all", (err) => {
// 		process.exit(0)
// 	})
// })
module.exports = startMain

if (require.main === module) {

	startMain()
}
