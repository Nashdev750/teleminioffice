import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import { WareHouseFoodItems } from 'services/function.service';
import WarehouseService from 'services/warehouse.service';
// assets 
import FoodItemlevelTemp from './FoodItemlevels';

function WarehouseLevel() {
    const [FoodItems, setFoodItems] = useState(WareHouseFoodItems);
    const RetrieveStockLevel = async () => {
        const warehouseData = await WarehouseService.GetWarehouseLevel();
        FoodItems?.forEach(fd => {
            const item = warehouseData.find(i => i.name === fd.name);
            if (item !== undefined) {
                fd.quantity = item.packages;
            }
        });
        setFoodItems([...FoodItems]);
    }

    useEffect(() => {
        RetrieveStockLevel();
    }, []);
    return (
        <MainCard title="Current Stock">
            <FoodItemlevelTemp stocklevel={FoodItems} />
        </MainCard>
    );
}

export default WarehouseLevel; 