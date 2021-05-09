module.exports = {
  apps : [
		{
			name: "electron renderer",
			interpreter: 'electron',
			script: ".",
			watch: [],
			autorestart: false
		},
		{
			name: "electron renderer",
			interpreter: 'webpack',
			script: "./configs/webpack.config.renderer.dev.js",
			"interpreter_args": [
				"serve",
				"--config"
			],
			watch: [],
			autorestart: false
		}
	]
};
