const options = [
    {
    value: "A",
    label: "A马克思主义、列宁主义、毛泽东思想、邓小平理论",
    children: [
        {
        value: "A",
        label: "全部",
        },
        {
        value: "A1",
        label: "A1马克思、恩格斯著作",
        },
        {
        value: "A2",
        label: "A2毛泽东著作",
        },
        {
        value: "A3",
        label:
            "A3马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究",
        },
    ],
    },
    {
    value: "B",
    label: "B哲学、宗教",
    children: [
        {
        value: "B",
        label: "全部",
        },
        {
        value: "B0",
        label: "B0哲学理论",
        },
        {
        value: "B81",
        label: "B81逻辑学",
        },
        {
        value: "B84",
        label: "B84心理学",
        },
    ],
    },
    {
    value: "C",
    label: "C社会科学总论",
    children: [
        {
        value: "C",
        label: "全部",
        },
        {
        value: "C0",
        label: "C0社会科学理论与方法论",
        },
        {
        value: "C91",
        label: "C91社会学",
        },
        {
        value: "C8",
        label: "C8统计学",
        },
        {
        value: "C93",
        label: "C93管理学",
        },
    ],
    },
    {
    value: "D",
    label: "D政治、法律",
    children: [
        {
        value: "D",
        label: "全部",
        },
        {
        value: "D2",
        label: "D2中国共产党",
        },
        {
        value: "D8",
        label: "D8外交、国际关系",
        },
        {
        value: "D9",
        label: "D9法律",
        },
    ],
    },
    {
    value: "E",
    label: "E军事",
    children: [
        {
        value: "E",
        label: "全部",
        },
        {
        value: "E0",
        label: "E0军事理论",
        },
        {
        value: "E2",
        label: "E2中国军事",
        },
    ],
    },
    {
    value: "F",
    label: "F经济",
    children: [
        {
        value: "F",
        label: "全部",
        },
        {
        value: "F0",
        label: "F0经济学",
        },
        {
        value: "F8",
        label: "F8财政、金融",
        },
    ],
    },
    {
    value: "G",
    label: "G文化、科学、教育、体育",
    children: [
        {
        value: "G",
        label: "全部",
        },
        {
        value: "G4",
        label: "G4教育",
        },
        {
        value: "",
        label: "G8体育",
        },
    ],
    },
    {
    value: "H",
    label: "H语言、文字",
    children: [
        {
        value: "H",
        label: "全部",
        },
        {
        value: "H0",
        label: "H0语言学",
        },
        {
        value: "H1",
        label: "H1汉语",
        },
        {
        value: "H3",
        label: "H3常用外国语",
        },
    ],
    },
    {
    value: "I",
    label: "I文学",
    children: [
        {
        value: "I",
        label: "全部",
        },
        {
        value: "I1",
        label: "I1世界文学",
        },
        {
        value: "I2",
        label: "I2中国文学",
        },
    ],
    },
    {
    value: "J",
    label: "J艺术",
    children: [
        {
        value: "J",
        label: "全部",
        },
        {
        value: "J2",
        label: "J2绘画",
        },
        {
        value: "J9",
        label: "J9电影、电视艺术",
        },
    ],
    },
    {
    value: "K",
    label: "K历史、地理",
    children: [
        {
        value: "K",
        label: "全部",
        },
        {
        value: "K1",
        label: "K1世界史",
        },
        {
        value: "K2",
        label: "K2中国史",
        },
        {
        value: "K9",
        label: "K9地理",
        },
    ],
    },
    {
    value: "N",
    label: "N自然科学总论",
    children: [
        {
        value: "N",
        label: "全部",
        },
        {
        value: "N0",
        label: "N0自然科学理论与方法论",
        },
    ],
    },
    {
    value: "O",
    label: "O数理科学和化学",
    children: [
        {
        value: "O",
        label: "全部",
        },
        {
        value: "O1",
        label: "O1数学",
        },
        {
        value: "O4",
        label: "O4物理学",
        },
        {
        value: "O6",
        label: "O6化学",
        },
    ],
    },
    {
    value: "P",
    label: "P天文学、地球科学",
    children: [
        {
        value: "P",
        label: "全部",
        },
        {
        value: "P1",
        label: "P1天文学",
        },
        {
        value: "P9",
        label: "P9自然地理学",
        },
    ],
    },
    {
    value: "Q",
    label: "Q生物科学",
    children: [
        {
        value: "Q",
        label: "全部",
        },
        {
        value: "Q2",
        label: "Q2细胞生物学",
        },
        {
        value: "Q4",
        label: "Q4遗传学",
        },
        {
        value: "Q94",
        label: "Q94植物学",
        },
    ],
    },
    {
    value: "R",
    label: "R医药、卫生",
    children: [
        {
        value: "R",
        label: "全部",
        },
        {
        value: "R3",
        label: "R3基础医学",
        },
        {
        value: "R4",
        label: "R4临床医学",
        },
        {
        value: "R9",
        label: "R9药学",
        },
    ],
    },
    {
    value: "S",
    label: "S农业科学",
    children: [
        {
        value: "S",
        label: "全部",
        },
        {
        value: "S1",
        label: "S1农业基础科学",
        },
        {
        value: "S6",
        label: "S6园艺",
        },
    ],
    },
    {
    value: "T",
    label: "T工业技术",
    children: [
        {
        value: "T",
        label: "全部",
        },
        {
        value: "TB",
        label: "TB一般工业技术",
        },
        {
        value: "TN",
        label: "TN无线电电子学、电信技术",
        },
        {
        value: "TP",
        label: "TP自动化技术、计算机技术",
        },
    ],
    },
    {
    value: "U",
    label: "U交通运输",
    children: [
        {
        value: "U",
        label: "全部",
        },
        {
        value: "U2",
        label: "U2铁路运输",
        },
        {
        value: "U4",
        label: "U4公路运输",
        },
        {
        value: "U6",
        label: "U6水路运输",
        },
    ],
    },
    {
    value: "V",
    label: "V航空、航天",
    children: [
        {
        value: "V",
        label: "全部",
        },
        {
        value: "V2",
        label: "V2航空",
        },
        {
        value: "V4",
        label: "V4航天",
        },
    ],
    },
    {
    value: "X",
    label: "X环境科学、安全科学",
    children: [
        {
        value: "X",
        label: "全部",
        },
        {
        value: "X1",
        label: "X1环境科学基础理论",
        },
        {
        value: "X3",
        label: "X3环境保护管理",
        },
    ],
    },
    {
    value: "Z",
    label: "Z综合类图书",
    children: [
        {
        value: "Z",
        label: "全部",
        },
    ],
    },
]

const resetOptions = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "category": JSON.stringify(options)
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/editgory", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const getOptions = async () => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    // "category": JSON.stringify(options)
    // });

    // var requestOptions = {
    // method: 'POST',
    // headers: myHeaders,
    // body: raw,
    // redirect: 'follow'
    // };

    // fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/editgory", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    console.log("getOptions")
    const options =  await fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/category")
    .then(response => response.json())
    .then(result => {
        return JSON.parse(result.categoryString);
    })
    console.log(typeof options);
    return options;
}



export default {
    getOptions,
    resetOptions
}