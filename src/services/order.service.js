import http from "http-commom";

async function GetMasterOrderList(orderListinput) {
    let OrderListReturn = [];
    await http.post('/report/orderlist/master', orderListinput).then((response) => {
        if (response.status === 200) {
            const orders = JSON.parse(JSON.stringify(response.data));
            OrderListReturn = orders;
        }
    });

    return OrderListReturn;
}

async function GetMonthStockTracking(month) {
    let StockInTake = [];
    await http.get(`/report/order/track?month=${month}`).then((response) => {
        if (response.status === 200) {
            StockInTake = JSON.parse(JSON.stringify(response.data));
        }
    });
    return StockInTake;
}
async function saveMonthStockTracking(items) {
    let StockInTake = [];
    await http.post(`/report/order/track`,items).then((response) => {
        if (response.status === 200) {
            StockInTake = JSON.parse(JSON.stringify(response.data));
        }
    });
    return StockInTake;
}
async function getStockLevel(month) {
    let StockLevel = [];
    await http.get(`/report/order/stock?month=${month}`).then((response) => {
        if (response.status === 200) {
            StockLevel = JSON.parse(JSON.stringify(response.data));
        }
    });
    return StockLevel;
}

async function GetFeedingSchoolDay(month) {
    let FeedingDays;
    await http.get(`report/calendar/${month}`).then((response) => {
        if (response.status === 200) {
            const days = response.data?.days;
            FeedingDays = days === undefined ? 0 : days.length;
        }
    })
    return FeedingDays;
}

async function GetMonthOrderList(monthOrderListInput) {
    let OrderList = [];
    await http.post('/report/orderlist', monthOrderListInput).then((response) => {
        if (response.status === 200) {
            const sOrders = JSON.parse(JSON.stringify(response.data));
            sOrders?.orders?.forEach(element => {
                element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
            });

            OrderList = sOrders;
        }
    });
    return OrderList;
}

async function CalculateMonthOrderList(orderListInput) {
    let OrderList;
    await http.post('/report/calculate', orderListInput).then((response) => {
        if (response.status === 200) {
            response.data?.orders?.forEach(element => {
                element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
            })
            OrderList = response.data
        }
    });
    return OrderList;
}


const OrderService = {
    GetMasterOrderList,
    GetMonthStockTracking,
    GetFeedingSchoolDay,
    GetMonthOrderList,
    CalculateMonthOrderList,
    saveMonthStockTracking,
    getStockLevel
};

export default OrderService;