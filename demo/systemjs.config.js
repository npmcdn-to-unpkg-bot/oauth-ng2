(function (global) {
    var ngVer = '@2.0.0-rc.4'; // lock in the angular package version; do not let it float to current!
    var routerVer = '@3.0.0-beta.2'; // lock router version

    //map tells the System loader where to look for things
    var map = {
        'app': 'app',
        '@angular': 'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
        '@angular/router': 'https://npmcdn.com/@angular/router' + routerVer,
        'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
        'typescript': 'https://npmcdn.com/typescript@1.9.0-dev.20160409/lib/typescript.js',
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.ts', defaultExtension: 'ts' },
        'rxjs': { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'upgrade',
    ];

    // Add map entries for each angular package
    // only because we're pinning the version with `ngVer`.
    ngPackageNames.forEach(function (pkgName) {
        map['@angular/' + pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    });

    // Add package entries for angular packages
    ngPackageNames.forEach(function (pkgName) {
        // Bundled (~40 requests):
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };

        // Individual files (~300 requests):
        //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    // No umd for router yet
    packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

    // Forms not on rc yet
    packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };

    // Temporarily until we update the guides
    packages['@angular/router-deprecated'] = { main: '/bundles/router-deprecated' + '.umd.js', defaultExtension: 'js' };

    var config = {
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        map: map,
        packages: packages
    };

    System.config(config);    

    System.import('app')
        .then(function () {
            (function ($) {
                $(function () {

                    $('.button-collapse').sideNav();
                    $('.parallax').parallax();

                }); // end of document ready
            })(jQuery); // end of jQuery name space
        })
        .catch(function (err) { console.error(err); });
})(this);