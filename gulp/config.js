
const config = {

    currentApp: 'app',

    currentAppUrl: '/app',

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
            folders: ['assets', 'libraries', 'core', 'js', 'menu', 'views'],
            coreFileName: 'bundle.js',
            fileName: 'modules.js',
            filePath: './public/app/',
            filePathCore: './public/app/core/',
            filePathJs: './public/app/js/',
            filePathManifest: './public/app/manifest/',
            filePathViews: './public/app/views/',
            filePathMenu: './public/app/menu/',

            envTargetFile: './public/app/env.js',
            envTargetPath: './public/app/',

            indexHtmlPath: './public/app/',
            layoutFile: './resources/templates/layouts/app.html',

            librariesPath: './public/app/libraries',
            assetsPath: './public/app/assets/',
            cssPath: './public/app/assets/css/',
            fontPath: './public/app/assets/fonts/',
            coreViews: './public/app/assets/views/base-modules/',

            base: './resources/scripts/core/base-modules/',

            modules: ['app.module.js', '**/*.module.js', '**/*.js'],

            excludes: [
                'routes/routes.config.js',
                'hr-*/*'
            ],

            description: 'Your bkacademy Management System',
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
        preprod: 'https://api-preprod.bkacademy.com',
        prod: 'https://api.bkacademy-app.com',
        thuydev: 'https://thuydev.bkacademy.com',
        local: 'http://api.bkacademy.local',
    },
    staticHostNames: {
        preprod: 'https://static-preprod.bkacademy.com',
        prod: 'https://static-files.bkacademy.com',
        thinhdev: 'https://static-preprod.bkacademy.com',
        minhdev: 'https://static-preprod.bkacademy.com',
        thinhdev_eu: 'https://static-preprod.bkacademy.com',
        trungdev: 'https://static-preprod.bkacademy.com',
        local: 'https://static-preprod.bkacademy.com',
        thinhdev_local: 'https://static-preprod.bkacademy.com',
        dev: 'https://static-preprod.bkacademy.com',
        prod_eu: 'https://static.bkacademy.com',
        thuydev: 'https://static-preprod.bkacademy.com',
        minhdev: 'https://static-preprod.bkacademy.com',
    },
    hubCrossDomain: {
        preprod: 'https://hub-frontend-preprod.bkacademy.com',
        prod: 'https://hub.relotalent.com',
        thinhdev: 'https://hub-thinhdev.bkacademy.com',
        minhdev: 'https://hub-thinhdev.bkacademy.com',
        thinhdev_eu: 'https://hub-thinhdev.bkacademy.com',
        trungdev: 'https://hub-thinhdev.bkacademy.com',
        local: 'http://hub.bkacademy.local',
        thinhdev_local: 'http://hub-frontend.bkacademy.local',
        prod_eu: 'https://hub.relotalent.com',
        dev: 'https://hub-thinhdev.bkacademy.com',
        thuydev: 'https://hub-thinhdev.bkacademy.com',
        minhdev: 'https://hub-thinhdev.bkacademy.com',
    },
    assigneeAppUrl: {
        preprod: 'https://preprod-assignee.bkacademy.com',
        prod: 'https://assignee.bkacademy.com',
        thinhdev: 'https://thinhdev-assignee.bkacademy.com',
        minhdev: 'https://minhdev-assignee.bkacademy.com',
        thinhdev_eu: 'https://thinhdev-assignee.bkacademy.com',
        binhdev: 'https://thinhdev-assignee.bkacademy.com',
        trungdev: 'https://thinhdev-assignee.bkacademy.com',
        local: 'http://assignee.bkacademy.local',
        thinhdev_local: 'http://assignee.bkacademy.local',
        prod_eu: 'https://assignee.relotalent.com',
        dev: 'https://thinhdev-assignee.bkacademy.com',
        thuydev: 'https://thinhdev-assignee.bkacademy.com',
        minhdev: 'https://minhdev-assignee.bkacademy.com',
    }
};

module.exports = config;
