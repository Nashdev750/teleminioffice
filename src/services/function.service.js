import Maize from 'assets/images/foodItems/Maize.png';
import Beans from 'assets/images/foodItems/Beans.png';
import InstantPorridge from 'assets/images/foodItems/Instant Porridge.png';
import CookingOil from 'assets/images/foodItems/Cooking Oil.png';
import Milk from 'assets/images/foodItems/Milk.png';
import Rice from 'assets/images/foodItems/Rice.png';
import Samp from 'assets/images/foodItems/Samp.png';
import SoyaMince from 'assets/images/foodItems/Soya Mince.png';
import Salt from 'assets/images/foodItems/Salt.png';
import Curry from 'assets/images/foodItems/Curry.png';
import ChickenLivers from 'assets/images/foodItems/ChickenLivers.png';
import Sugar from 'assets/images/foodItems/Sugar.png'; 

export function GroupDataPackageList(packages) {
    const groupedItems = [];
    packages.forEach(item => {
        const foundObject = groupedItems.find(i => i.name === item.name && i.package_size === item.package_size);
        if (foundObject) {
            foundObject.amount += item.amount;
        } else (
            groupedItems.push({
                name: item.name,
                package_size: item.package_size,
                package_display: "".concat(item.package_size, " ", item.unit),
                unit: item.unit,
                pack: item.pack,
                amount: item.amount
            })
        )
    });
    groupedItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
    return groupedItems;
}

export function GroupItemsData(items) {
    items?.sort((a, b) => (a.group > b.group) ? 1 : -1);

    const groupedItems = [];
    items.forEach(item => {
        const foundObject = groupedItems.find(i => i.group === item.group && i.item === item.item);
        if (foundObject) {
            foundObject.total += item.total;
            foundObject.packaging.push(...item.packaging);
        } else (
            groupedItems.push({ group: item.group, item: item.item, total: item.total, unit: item.unit, packaging: item.packaging })
        )
    });
    groupedItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
    return groupedItems;
}

export function GetItemsWithSameName(list, name) {
    const items = [];
    list.forEach(item => {
        if (item.name === name) {
            items.push(item);
        }
    });
    return items;
};

export function GetItemQuantities(groupedItemsByPackage) {

    const quantities = {
        Maize: GetItemsWithSameName(groupedItemsByPackage, "Maize"),
        Rice: GetItemsWithSameName(groupedItemsByPackage, "Rice"),
        Samp: GetItemsWithSameName(groupedItemsByPackage, "Samp"),
        Beans: GetItemsWithSameName(groupedItemsByPackage, "Beans"),
        "Soya Mince": GetItemsWithSameName(groupedItemsByPackage, "Soya Mince"),
        'Cooking Oil': GetItemsWithSameName(groupedItemsByPackage, "Cooking Oil"),
        'Milk': GetItemsWithSameName(groupedItemsByPackage, "Milk"),
        'Salt': GetItemsWithSameName(groupedItemsByPackage, "Salt"),
        'Instant Porridge': GetItemsWithSameName(groupedItemsByPackage, "Instant Porridge"),
        'Sugar': GetItemsWithSameName(groupedItemsByPackage, "Sugar"),
        'Curry': GetItemsWithSameName(groupedItemsByPackage, "Curry")
    };
    return quantities;
}

export const WareHouseFoodItems = [
    { name: 'Maize', quantity: undefined, img: Maize },
    { name: 'Rice', quantity: undefined, img: Rice },
    { name: 'Samp', quantity: undefined, img: Samp },
    { name: 'Soya Mince', quantity: undefined, img: SoyaMince },
    { name: 'Beans', quantity: undefined, img: Beans },
    { name: 'Cooking Oil', quantity: undefined, img: CookingOil },
    { name: 'Milk', quantity: undefined, img: Milk },
    { name: 'Instant Maize Meal', quantity: undefined, img: InstantPorridge },
    { name: 'Salt', quantity: undefined, img: Salt },
    { name: 'Chicken livers', quantity: undefined, img: ChickenLivers },
    { name: 'Curry', quantity: undefined, img: Curry },
    { name: 'Sugar', quantity: undefined, img: Sugar },
    { name: 'Tin Fish', quantity: undefined, img: Sugar }
];

export const IntakeFoodItems = [
    { name: 'Maize', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Maize },
    { name: 'Rice', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Rice },
    { name: 'Samp', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Samp },
    { name: 'Soya Mince', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: SoyaMince },
    { name: 'Beans', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Beans },
    { name: 'Cooking Oil', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: CookingOil },
    { name: 'Milk', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Milk },
    { name: 'Instant Maize Meal', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: InstantPorridge },
    { name: 'Salt', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Salt },
    { name: 'Chicken livers', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: ChickenLivers },
    { name: 'Curry', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Curry },
    { name: 'Sugar', totalExpected: 0, expected: undefined, received: undefined, totalReceived: 0, img: Sugar }
];