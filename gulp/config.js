
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

            description: 'Your SMXD Management System',
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
        preprod: 'https://api.smxd.com',
        prod: 'https://api.relotalent.com',
        thinhdev: 'https://thinhdev.smxd.com',
        minhdev: 'https://minhdev-api.smxd.com',
        thuydev: 'https://thuydev.smxd.com',
        trungdev: 'https://trungdev.smxd.com',
        dev: 'https://thinhdev.smxd.com',
        prod_eu: 'https://api-geo.relotalent.com',
        thinhdev_eu: 'https://eu-api.relotalent.com',
        thinhdev_local: 'http://api.smxd.local',
        local: 'http://api.smxd.local',
        minhdev: 'https://minhdev-api.smxd.com',
    },
    staticHostNames: {
        preprod: 'https://static.sanmayxaydung.com',
        prod: 'https://static-files.relotalent.com',
        thinhdev: 'https://static.sanmayxaydung.com',
        minhdev: 'https://static.sanmayxaydung.com',
        thinhdev_eu: 'https://static.sanmayxaydung.com',
        trungdev: 'https://static.sanmayxaydung.com',
        local: 'https://static.sanmayxaydung.com',
        thinhdev_local: 'https://static.sanmayxaydung.com',
        dev: 'https://static.sanmayxaydung.com',
        prod_eu: 'https://static.sanmayxaydung.com',
        thuydev: 'https://static.sanmayxaydung.com',
        minhdev: 'https://static.sanmayxaydung.com',
    },
    hubCrossDomain: {
        preprod: 'https://hub-preprod-frontend.smxd.com',
        prod: 'https://hub.relotalent.com',
        thinhdev: 'https://hub-thinhdev.smxd.com',
        minhdev: 'https://hub-thinhdev.smxd.com',
        thinhdev_eu: 'https://hub-thinhdev.smxd.com',
        trungdev: 'https://hub-thinhdev.smxd.com',
        local: 'http://hub.smxd.local',
        thinhdev_local: 'http://hub-frontend.smxd.local',
        prod_eu: 'https://hub.relotalent.com',
        dev: 'https://hub-thinhdev.smxd.com',
        thuydev: 'https://hub-thinhdev.smxd.com',
        minhdev: 'https://hub-thinhdev.smxd.com',
    },
    assigneeAppUrl: {
        preprod: 'https://preprod-assignee.smxd.com',
        prod: 'https://assignee.relotalent.com',
        thinhdev: 'https://thinhdev-assignee.smxd.com',
        minhdev: 'https://minhdev-assignee.smxd.com',
        thinhdev_eu: 'https://thinhdev-assignee.smxd.com',
        binhdev: 'https://thinhdev-assignee.smxd.com',
        trungdev: 'https://thinhdev-assignee.smxd.com',
        local: 'http://assignee.smxd.local',
        thinhdev_local: 'http://assignee.smxd.local',
        prod_eu: 'https://assignee.relotalent.com',
        dev: 'https://thinhdev-assignee.smxd.com',
        thuydev: 'https://thinhdev-assignee.smxd.com',
        minhdev: 'https://minhdev-assignee.smxd.com',
    }
};

module.exports = config;
