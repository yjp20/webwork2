define(['Backbone', 'underscore','../WeBWorK', '../ProblemList'], function(Backbone, _, webwork, ProblemList){
    /**
     *
     * @type {*}
     */
    var Library = Backbone.Model.extend({
        defaults:function () {
            return{
                name:"",
                path: ""
            }
        },
    
        initialize:function () {
            var self = this;
            this.set({problems:new ProblemList});
    
            _.extend(this.get('problems').defaultRequestObject, {
                xml_command: "listLib",
                command: "files",
                maxdepth: 0,
                library_name: self.get('path') + "/"
            });
    
        }
    });
    
    return Library;

});