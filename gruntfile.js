module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.initConfig({
        browserSync: {
            bsFiles: {
                src: ['index.html', 'src/js/*.js', 'src/css/*.css']
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        }
    });

    grunt.registerTask('default', ['browserSync']);
};