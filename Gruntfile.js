/*
 * 不同livereload端口设置
 * connect livereload端口设置不同的值
 * watch 下的livrereload 与其一一对应
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);//自动加载grunt任务
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    //初始化配置
    grunt.initConfig({
        //grunt-contrib-watch配置
        watch: {
            //dev为定义监测任务的名字
            dev: {
                files: ['muti-page/*.*'],
                options: {
                    livereload: 3030
                }
            }
        },
        //grunt-contrib-connect配置
        connect: {
            dev: {
                options: {
                    base: "muti-page",
                    port: 2222,
                    hostname: '*',
                    livereload: 3030,
                    open: {
                        target: 'http://127.0.0.1:2222'
                    }
                }
            }
        },
        //压缩js
        requirejs: {
            std: {
                options: {
                    appDir: 'muti-page',
                    baseUrl: 'modules/app',
                    paths: {
                        app: '../app',
                        jquery: '../../resource/lib/jquery.min',
                        page: 'common/pagination'
                    },
                    dir: 'muti-page-built',
                    modules: [
                        //First set up the common build layer.
                        {
                            //module names are relative to baseUrl
                            name: '../main',
                            //List common dependencies here. Only need to list
                            //top level dependencies, "include" will find
                            //nested dependencies.
                            include: ['../../resource/lib/jquery.min']
                        },
                        
                        {
                            //module names are relative to baseUrl/paths config
                            name: '../src/index',
                            include: ['app/models/index'],
                            exclude: ['../main']
                        },

                        {
                            //module names are relative to baseUrl
                            name: '../src/news-company',
                            include: ['app/models/news-company'],
                            exclude: ['../main']
                        },

                        {
                            name: '../src/news-industry',
                            include: ['app/models/news-industry'],
                            exclude: ['../main']

                        },
                        {
                            name: '../src/map',
                            include: ['app/models/map'],
                            exclude: ['../main']

                        }
                    ]
                }
            }
        },
        //压缩CSS
        cssmin:{
            target:{
                files:[{
                    expand:true,
                    cwd:'muti-page/resource/css',
                    src:['*.css'],
                    dest:'muti-page-built/resource/css',
                    //ext:'.min.css'
                }]
            }
        },
        //处理html中css、js 引入合并问题
        usemin: {
            html: 'muti-page/*.html'
        },
        //压缩HTML     
        htmlmin:{
            options:{
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true       
            },
            html:{
                files:[{
                    expand: true, 
                    cwd: 'muti-page/', 
                    src: ['*.html'], 
                    dest: 'muti-page-built/'
                }]
            }
        },
        //清除log文件
        clean: {
            txt: 'muti-page-built/build.txt'
        },
    });

    grunt.loadTasks("build/tasks");
    //注册任务到grunt
    grunt.registerTask('dev', ['connect:dev', 'watch:dev']);
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('build', ['requirejs','cssmin','htmlmin','clean']);
};
