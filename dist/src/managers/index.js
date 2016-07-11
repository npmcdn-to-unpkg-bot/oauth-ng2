System.register(['./endpoint.manager', './token.manager', './profile.manager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (endpoint_manager_1_1) {
                exportStar_1(endpoint_manager_1_1);
            },
            function (token_manager_1_1) {
                exportStar_1(token_manager_1_1);
            },
            function (profile_manager_1_1) {
                exportStar_1(profile_manager_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvbWFuYWdlcnMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
