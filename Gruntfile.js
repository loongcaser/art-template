'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);//自动加载grunt任务
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    //初始化配置
    grunt.initConfig({
        template: {
            compile: {
                options: {
                    data: {
                        active:"active",
                        v: 1
                    }
                },
                files: [
                    { src: ['**/*.html', '!template/**/*.html'], dest: 'muti-page-built', expand: true, cwd: 'muti-page-built' }
                ]
            }
        },
        //grunt-contrib-watch配置
        watch: {
            //dev为定义监测任务的名字
            dev: {
                files: ['muti-page-built/*.*'],
                options: {
                    livereload: 3030
                }
            }
        },
        //grunt-contrib-connect配置
        connect: {
            dev: {
                options: {
                    base: "muti-page-built",
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
            html: 'muti-page-built/*.html'
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
                    cwd: 'muti-page-built/', 
                    src: ['*.html'], 
                    dest: 'muti-page-built/'
                }]
            }
        },
        //清除log文件
        clean: {
            txt: 'muti-page-built/build.txt'
        }
    });

    grunt.registerMultiTask('template', 'template inheritance and sub template', function() {
        var path = require('path');
        var template = require('art-template');

        var options = this.options({
            //模板根目录
            root: '/',
            //默认后缀名
            extname: '.html',
            data: {}
        });
        template.defaults.root = options.root;
        template.defaults.extname = options.extname;
        // 原生语法的界定符规则
        template.defaults.rules[0].test = /@%(#?)((?:==|=#|[=-])?)([\w\W]*?)(-?)%@/;
        template.defaults.rules[1].test = /@%(#?)((?:==|=#|[=-])?)([\w\W]*?)(-?)%@/;

        this.files.forEach(function(f) {
            var fileList = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }

            }).map(function(filepath) {
                var _html = template(path.resolve(__dirname, filepath), options.data);
                grunt.file.write(f.dest, _html);
            });
        });

    });

    grunt.loadTasks("build/tasks");

    grunt.registerTask('build', ['requirejs','template','cssmin','htmlmin','clean']);
    grunt.registerTask('dev', ['connect:dev', 'watch:dev']);
};