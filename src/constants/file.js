export const typeConvert = (type) => {
    if (type === 'villa') {
        return "ویلای";
    } else if (type === 'apartment') {
        return "آپارتمان";
    } else if (type === 'commercial') {
        return "تجاری";
    } else if (type === 'land') {
        return "زمین";
    } else if (type === 'hectare') {
        return "هکتاری";
    } else {
        return "";
    }
}


export const typeFileConvert2Persian = (type) => {
    if (type === 'villa') {
        return "ویلا";
    } else if (type === 'apartment') {
        return "آپارتمان";
    } else if (type === 'commercial') {
        return "اداری تجاری";
    } else if (type === 'land') {
        return "زمین";
    } else if (type === 'hectare') {
        return "هکتاری";
    } else {
        return "";
    }
}


export const typeConvert2Slug = (name) => {
    if (name === 'ویلا') {
        return "villa";
    } else if (name === 'آپارتمان') {
        return "apartment";
    } else if (name === 'اداری تجاری') {
        return "commercial";
    } else if (name === 'زمین') {
        return "land";
    } else if (name === 'هکتاری') {
        return "hectare";
    } else {
        return "";
    }
}

export const fileTypesList = [
    "ویلا", "آپارتمان", "اداری تجاری", "زمین", "هکتاری"
]


export const documentsTypeList = [
    "تک برگ",
    "شش دانگ",
    "بنچاق",
    "مشاع",
    "قولنامه ای",
    "شورایی",
    "بنیادی",
    "اوقاف",
    "شاهی",
    "دفترچه ای",
    "در دست اقدام",
];

export const apartmentEquipmentsList = [
    "انباری",
    "پارکینگ",
    "آسانسور",
    "سونا",
    "جکوزی",
    "مبله",
    "کمد دیواری",
    "ویو",
];

export const villaEquipmentsList = [
    "آسانسور",
    "استخر",
    "حیاط سازی",
    "روف گاردن",
    "جکوزی",
    "سونا",
    "ساحلی",
    "جنگلی",
    "شهرکی",
    "شاه نشین",
    "فول فرنیش",
];

export const villaTypesList = ["فلت", "دوبلکس", "تریبلکس", "طبقات جداگانه"]

export const usageStatusLandHectareList = [
    "مسکونی",
    "زراعی و کشاورزی",
    "جنگل جلگه ای",
    "اداری و تجاری",
    "ساحلی",
    "تفریحی توریستی",
    "باغات",
    "ذخیره شهری",
];

export const tissueStatusLandHectareList = [
    "داخل بافت",
    "الحاق به بافت",
    "خارج بافت",
];

export const commercialTypesList = [
    "اداری",
    "تجاری",
    "مغازه",
    "صنعتی",
    "دامداری و کشاورزی",
    "مسکونی",
];
