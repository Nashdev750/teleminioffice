
import http from "http-commom"; 

async function GetAllSchools() {
    let SchoolList = [];
    await http.get('/school/all').then((response) => {
        if (response.status === 200) {
            SchoolList = JSON.parse(JSON.stringify(response.data));
        }
    })
    return SchoolList; 
}

const SchoolService = {
    GetAllSchools, 
};

export default SchoolService;