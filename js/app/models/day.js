define([
    'backbone'
], function (Backbone) {
    'use strict';

    var DayModel = Backbone.Model.extend({
        defaults: {
            'weekday': '',
            'conditions': '',
            'highCelsius': null,
            'lowCelsius': null,
            'highFahrenheit': null,
            'lowFahrenheit': null,
            'icon_url': ''
        },
        parse: function (data) {
            var map = {
                'weekday': data.date.weekday,
                'icon_url': data.icon_url,
                'conditions': data.conditions,
                'highCelsius': data.high.celsius,
                'lowCelsius': data.low.celsius,
                'highFahrenheit': data.high.fahrenheit,
                'lowFahrenheit': data.low.fahrenheit
            };
            return map;
        }
    })
    return DayModel;
})