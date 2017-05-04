{
    appDir: '../../muti-page',
    baseUrl: 'modules/app',
    paths: {
        app: '../app',
        jquery: '../../resource/lib/jquery',
        page: 'common/pagination'
    },
    dir: '../../muti-page-built',
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

        //Now set up a build layer for each page, but exclude
        //the common one. "exclude" will exclude
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //"include" the appropriate "app/main*" module since by default
        //it will not get added to the build since it is loaded by a nested
        //require in the page*.js files.
        
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
