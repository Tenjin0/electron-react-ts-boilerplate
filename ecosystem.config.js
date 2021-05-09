module.exports = {
  apps : [{
		name: "electron main",
		interpreter: 'npm',
		script: "src/main/index.js",
		"interpreter_args": [
      "run",
      "start:main"
    ],
    watch: ['src/main'],
		autorestart: false
  },
	{
		name: "electron renderer",
		interpreter: 'npm',
		script: "src/renderer/index.js",
		"interpreter_args": [
      "run",
      "start:renderer"
    ],
    watch: [],
		autorestart: false
  }]
};
