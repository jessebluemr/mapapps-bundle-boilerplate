define([
    "dojo/_base/declare", "dojo/string", "dojo/number", "dijit/_Widget", "dijit/_TemplatedMixin"
], function(declare, d_string, d_number, _Widget, _TemplatedMixin) {

    var substitute = d_string.substitute;
    var format = function(num, places) {
        return d_number.format(num, {
            places: places
        });
    };

    return declare([_Widget, _TemplatedMixin], {
        baseClass: "ctExtentWriter",
        templateString: "<div><span class='${baseClass}Extent' dojoAttachPoint='extentNode'></span></div>",
        extentTemplate: "${extent.xmin}; ${extent.ymin} - ${extent.xmax}; ${extent.ymax}",
        extent: {
            xmin: -1,
            ymin: -1,
            xmax: -1,
            ymax: -1
        },
        decimalPlaces: 3,
        _setExtentAttr: function(extent) {
            this.extent = extent;
            var decimalPlaces = this.decimalPlaces;
            var ext = {
                xmin: format(extent.xmin, decimalPlaces),
                xmax: format(extent.xmax, decimalPlaces),
                ymin: format(extent.ymin, decimalPlaces),
                ymax: format(extent.ymax, decimalPlaces)
            };
            var txt = substitute(this.extentTemplate, {
                extent: ext
            });
            this.set("extenttxt", txt);
        },
        _setExtenttxtAttr: {
            node: "extentNode",
            type: "innerHTML"
        },
        setMapState: function(mapState) {
            var self = this;
            this.own(mapState.on("ViewPortChange", function(evt) {
                self.set("extent", evt.extent);
            }));
            self.set("extent", mapState.getExtent());
        }
    });
});