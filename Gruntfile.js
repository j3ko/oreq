module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['src/<%= pkg.name %>.js'],
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' + 
						'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'src/<%= pkg.name %>.min.js'
			}
		},
		jasmine: {
			customTemplate: {
				src: 'src/<%= pkg.name %>.js',
				options: {
					specs: 'spec/_specs.js',
					helpers: 'spec/_helpers.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
};