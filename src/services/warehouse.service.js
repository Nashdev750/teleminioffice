
import http from "http-commom";

async function GetWarehouseLevel() {
    let warehouseLevel = [];
    await http.get('/warehouse/all').then((response) => {
        if (response.status === 200) {
            warehouseLevel = JSON.parse(JSON.stringify(response.data));
        }
    })
    return warehouseLevel;
}

async function UpdateWarehouseStockLevel(packageItems) {
    const updatePromises = packageItems.map(async (packageItem) => {
        const pack = { name: packageItem.name, packages: [{ size: packageItem.package_size, units: packageItem.quantity }] };
        const response = await http.patch('warehouse/update', pack);

        if (response.status === 200) {
            return JSON.parse(JSON.stringify(response.data)); 
        }
        return null;
    });

    const updatedStockLevels = await Promise.all(updatePromises);

    return updatedStockLevels;
}

const WarehouseService = {
    GetWarehouseLevel,
    UpdateWarehouseStockLevel,
};

export default WarehouseService;