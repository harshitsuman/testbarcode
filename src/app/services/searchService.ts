import { Injectable } from "@angular/core";

@Injectable()
export class searchService {


    constructor() {

    }


    searchFilter(data, status, county, state, orderType) {
        var orders;
        console.log(data, status, state, county, orderType, "datata")
        if (status == 'showALL') {
            orders = county == "showALL" && orderType == 'showALL' && state == 'showALL' ? data :
                county == "showALL" && orderType == 'showALL' ? data.filter(o => o.property.state == state) :
                    orderType == 'showALL' && state == 'showALL' ? data.filter(o => o.property.county == county) :
                        county == "showALL" && state == 'showALL' ? data.filter(o => o.order_type === orderType) :
                            county == "showALL" ? data.filter(o => o.order_type === orderType && o.property.state == state) :
                                orderType == 'showALL' ? data.filter(o => o.property.county == county && o.property.state == state) :
                                    data.filter(o => o.property.county == county && o.property.county == state)
        }
        else if (county == "showALL") {
            console.log("checked")
            orders = orderType == 'showALL' && state == 'showALL' ? data.filter(o => o.status == status) :
                orderType == 'showALL' ? data.filter(o => o.property.state == state && o.status == status) :
                    state == 'showALL' ? data.filter(o => o.order_type == orderType && o.status == status) :
                        data.filter(o => o.order_type == orderType && o.status == status && o.property.state == state)

        }
        else if (state == "showALL") {
            orders = orderType == 'showALL' ? data.filter(o => o.status == status && o.property.county == county) :
                data.filter(o => o.order_type == orderType && o.status == status && o.property.county == county)

        }
        else {
            orders = orderType == "showALL" ? data.filter(o => o.status == status && o.property.county == county && o.property.state == state) :
                data.filter(o => o.status == status && o.property.county == county && o.property.state == state && o.order_type == orderType)

        }

        return orders

    }
}