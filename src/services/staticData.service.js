const Months = ['January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'];

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Level = ['Primary', 'Secondary'];

const FoodGroup = ['Breakfast', 'Protein', 'Starch', 'Vegetable/Fruit', 'Seasoning'];

const Quantifiers = ['G', 'ML'];

const MenuItems = [
    {
        group: "Breakfast", item: "Instant Maize Meal",
        unit: 10, quatifier: "G", level: "Primary"
    },
    /* {
        group: "Breakfast", item: "Instant Sorghum (Banana)",
        unit: 10, quatifier: "g", level: "Primary"
    },
    {
        group: "Breakfast", item: "Creamy Instant Maize Meal (Strawberry)",
        unit: 10, quatifier: "g", level: "Primary"
    }, */
    {
        group: "Starch", item: "Maize",
        unit: 40, quatifier: "G", level: "Primary"
    },
    {
        group: "Starch", item: "Rice",
        unit: 35, quatifier: "G", level: "Primary"
    },
    {
        group: "Starch", item: "Samp",
        unit: 40, quatifier: "g", level: "Primary"
    },
    {
        group: "Protein", item: "Chicken livers",
        unit: 40, quatifier: "G", level: "Primary"
    },
    {
        group: "Protein", item: "Pilchards in Tomato",
        unit: 40, quatifier: "G", level: "Primary"
    },
    {
        group: "Protein", item: "Sugar Beans",
        unit: 30, quatifier: "G", level: "Primary"
    },
    {
        group: "Protein", item: "Soya Mince",
        unit: 25, quatifier: "G", level: "Primary"
    },
    {
        group: "Protein", item: "Milk (UHT)",
        unit: 200, quatifier: "ML", level: "Primary"
    },
    {
        group: "Seasoning", item: "Cooking Oil",
        unit: 2, quatifier: "ML", level: "Primary"
    },
    {
        group: "Seasoning", item: "Iodised Salt",
        unit: 1, quatifier: "G", level: "Primary"
    },
    {
        group: "Seasoning", item: "Sugar",
        unit: 0.5, quatifier: "G", level: "Primary"
    },
    {
        group: "Seasoning", item: "Curry",
        unit: 1, quatifier: "G", level: "Primary"
    },
    {
        group: "Protein", item: "Sugar",
        unit: 0.5, quatifier: "G", level: "Primary"
    }
]

const DetailHeaders = [
    { Header: "Food Group", accessor: "group", enableRowSpan: true },
    { Header: "Product", accessor: "item", enableRowSpan: true },
    { Header: "Expected", accessor: "totalView" }];


const PackageListHeaders = [
    { Header: "Food Item", accessor: "name", enableRowSpan: true },
    { Header: "Package Size", accessor: "package_display" },
    // { Header: "Unit", accessor: "unit" },
    // { Header: "Packaging Type", accessor: "pack" },
    { Header: "Quantity of Pakcages", accessor: "amount" }
];

const StaticDataService = {
    Months,
    Level,
    Days,
    FoodGroup,
    MenuItems,
    DetailHeaders,
    PackageListHeaders,
    Quantifiers
};

export default StaticDataService;