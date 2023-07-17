
const config = {

    currentApp: 'gms',

    currentAppUrl: '/gms',

    baseAssets: './resources/assets/',

    style: {
        base: './resources/sass/',
        coreSource: './resources/sass/core/',
    },

    font: {
        fontSource: './public/libraries/bootstrap/fonts/',
        fontTarget: './public/assets/fonts',
    },

    script: {
        sourcePath: './resources/scripts/core/',
        appPath: './public/',
        targetPath: './public/assets/js/',
        envTargetFile: './public/env.js',
        envTargetPath: './public/',

        coreTarget: './public/app/core/',
        coreTargetJs: './public/app/core/',
        coreTargetManifest: './public/core/manifest/',

        view: {
            base: './resources/scripts/core/base-modules/',
            target: './public/assets/views/base-modules',
        },
    },

    apps: {
        app: {
            fileName: 'app.js',
            filePath: './public/app/',
            filePathJs: './public/app/js/',
            filePathManifest: './public/app/manifest/',
            filePathCore: './public/app/core/',
            filePathViews: './public/app/views/',
            filePathMenu: './public/app/menu/',
            indexHtmlPath: './public/',

            layoutFile: './resources/templates/layouts/app.html',

            base: './resources/scripts/core/base-modules/',
            modules: ['app.module.js', '**/*.module.js', '**/*.js'],
            excludes: [
                'employees-*/*',
                'backend-*/*',
                'gms-*/*',
                'hr-*/*',
                'routes/routes.config.js',
                'gms.module.js',
                'employee.module.js',
                'base.module.js',
                'hr.module.js',
                'backend.module.js',
                'needform.module.js',
                'register.module.js'
            ],

        },

        gms: {
            folders: ['assets', 'libraries', 'core', 'js', 'menu', 'views'],
            coreFileName: 'bundle.js',
            fileName: 'modules.js',
            filePath: './public/gms/',
            filePathCore: './public/gms/core/',
            filePathJs: './public/gms/js/',
            filePathManifest: './public/gms/manifest/',
            filePathViews: './public/gms/views/',
            filePathMenu: './public/gms/menu/',

            envTargetFile: './public/gms/env.js',
            envTargetPath: './public/gms/',

            indexHtmlPath: './public/gms/',
            layoutFile: './resources/templates/layouts/gms.html',

            librariesPath: './public/gms/libraries',
            assetsPath: './public/gms/assets/',
            cssPath: './public/gms/assets/css/',
            fontPath: './public/gms/assets/fonts/',
            coreViews: './public/gms/assets/views/base-modules/',

            base: './resources/scripts/core/base-modules/',

            modules: ['gms.module.js', '**/*.module.js', '**/*.js'],

            excludes: [
                'routes/routes.config.js',
                'hr-*/*'
            ],

            description: 'Your Relocation Management System',
        },
    },

    vendorSource: '../vendor_base/',
    vendorSourceFromRoot: './vendor_base/',
    vendorTarget: './public/assets/js/',

    template: [
        './public/src/**/*',
        './public/assets/views/**/*',
        '!./public/assets/views/base-modules/**/*',
        '!./public/assets/libraries/**/*'
    ],

    apiHostNames: {
        preprod: 'https://api.reloday.com',
        prod: 'https://api.relotalent.com',
        thinhdev: 'https://thinhdev.reloday.com',
        minhdev: 'https://minhdev-api.reloday.com',
        thuydev: 'https://thuydev.reloday.com',
        trungdev: 'https://trungdev.reloday.com',
        dev: 'https://thinhdev.reloday.com',
        prod_eu: 'https://api-geo.relotalent.com',
        thinhdev_eu: 'https://eu-api.relotalent.com',
        thinhdev_local: 'http://api.reloday.local',
        local: 'http://api.reloday.local',
        minhdev: 'https://minhdev-api.reloday.com',
    },
    staticHostNames: {
        preprod: 'https://static.reloday.com',
        prod: 'https://static-files.relotalent.com',
        thinhdev: 'https://static.reloday.com',
        minhdev: 'https://static.reloday.com',
        thinhdev_eu: 'https://static.reloday.com',
        trungdev: 'https://static.reloday.com',
        local: 'https://static.reloday.com',
        thinhdev_local: 'https://static.reloday.com',
        dev: 'https://static.reloday.com',
        prod_eu: 'https://static.reloday.com',
        thuydev: 'https://static.reloday.com',
        minhdev: 'https://static.reloday.com',
    },
    hubCrossDomain: {
        preprod: 'https://hub-preprod-frontend.reloday.com',
        prod: 'https://hub.relotalent.com',
        thinhdev: 'https://hub-thinhdev.reloday.com',
        minhdev: 'https://hub-thinhdev.reloday.com',
        thinhdev_eu: 'https://hub-thinhdev.reloday.com',
        trungdev: 'https://hub-thinhdev.reloday.com',
        local: 'http://hub.reloday.local',
        thinhdev_local: 'http://hub-frontend.reloday.local',
        prod_eu: 'https://hub.relotalent.com',
        dev: 'https://hub-thinhdev.reloday.com',
        thuydev: 'https://hub-thinhdev.reloday.com',
        minhdev: 'https://hub-thinhdev.reloday.com',
    },
    assigneeAppUrl: {
        preprod: 'https://preprod-assignee.reloday.com',
        prod: 'https://assignee.relotalent.com',
        thinhdev: 'https://thinhdev-assignee.reloday.com',
        minhdev: 'https://minhdev-assignee.reloday.com',
        thinhdev_eu: 'https://thinhdev-assignee.reloday.com',
        binhdev: 'https://thinhdev-assignee.reloday.com',
        trungdev: 'https://thinhdev-assignee.reloday.com',
        local: 'http://assignee.reloday.local',
        thinhdev_local: 'http://assignee.reloday.local',
        prod_eu: 'https://assignee.relotalent.com',
        dev: 'https://thinhdev-assignee.reloday.com',
        thuydev: 'https://thinhdev-assignee.reloday.com',
        minhdev: 'https://minhdev-assignee.reloday.com',
    }
};

module.exports = config;
