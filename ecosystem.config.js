
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

module.exports = {
  apps : [

		{
			name: "electron renderer",
			interpreter: 'webpack',
			script: "./configs/webpack.config.renderer.dev.js",
			"interpreter_args": [
				"serve",
				"--config"
			],
			env: {
				"NODE_ENV": "development",
			},
			wait_ready: true,
			watch: [],
			autorestart: false
		}
	]
};
