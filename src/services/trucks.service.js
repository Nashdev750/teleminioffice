import http from "http-commom";

const GetAllTrucks = async () => { 
    let truckList = [];
    await http.get('/truck/all').then((response) => {
        if (response.status === 200) {
            truckList = response.data; 
        }
    })
    return truckList;
}

const TruckService = {
    GetAllTrucks
};

export default TruckService;