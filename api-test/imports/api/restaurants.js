import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

export const Restaurants = new Mongo.Collection('restaurants');


if (Meteor.isServer) {

    Meteor.publish('restaurants', function (query) {
        var self = this;

        try {
            var response = HTTP.get('https://bit.ly/2HIh7jU', {
                params: {
                    q: query
                }
            });


            var data_list = [];
            //var self = this;

            _.each(response.data.data.takingorders.listdata, function (item) {

                var doc = {
                    //_id:item.restaurantId,
                    RowNumber: item.RowNumber,
                    restaurantId: item.restaurantId,
                    ResturantName: item.ResturantName,
                    cusines_name_alllist: item.cusines_name_alllist,
                    ResturantLogo: item.ResturantLogo,
                    minimum_order_value: item.minimum_order_value,
                    TotalFeedback: item.TotalFeedback,
                    AVGFeedback: item.AVGFeedback,
                    milesDistance: item.milesDistance,
                    Day: item.Day,
                    starttime: item.starttime,
                    endtime: item.endtime,
                    defaultHeaderpath: item.defaultHeaderpath,


                    createdAt: new Date(),
                };
                //clear collection before inserting value
                Restaurants.find().forEach(function (restaurant) {
                    Restaurants.remove(restaurant._id);
                });
                // insert the values
                Restaurants.insert(doc);

                self.added('restaurants', Random.id(), doc);
            });

            this.ready();
            //return data_list;

        } catch (error) {
            console.log(error);
        }
        return Restaurants.find();
    });
}
