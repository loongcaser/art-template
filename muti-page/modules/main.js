//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'modules/app',
    paths: {
        jquery: '../../resource/lib/jquery.min',
        page: 'common/pagination'
    }
});
/**
 * 系统入口，配置系统启动需要加载js文件
 */
require([
       'common/base'
    ],
    function(){
    }
);
