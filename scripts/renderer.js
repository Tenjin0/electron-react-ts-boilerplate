const pm2 = require('pm2');

pm2.connect(true, function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }


  pm2.start({
   		name: "electron renderer",
			script: "npx webpack serve --config ./configs/webpack.config.renderer.dev.js",
			watch: false,
			env: {
				"NODE_ENV": "development",
			},
  }, function(err, apps) {
		if (err) throw err
		pm2.disconnect()
		// process.on("SIGINT", () => {
		// 	pm2.delete("all", (err) => {
		// 		process.exit(0)
		// 	})
		// })



  });
});

	// {
	// 	name: "electron main",
	// 	interpreter: 'electron',
	// 	script: ".",
	// 	watch: [],
	// 	env: {
	// 		"NODE_ENV": "development",
	// 	},
	// 	autorestart: false
	// }
