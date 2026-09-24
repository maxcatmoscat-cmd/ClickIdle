// =========================
// GAME DATA
// =========================

let money = 0;

// =========================
// SHOP
// =========================

const shopProducts = [

    {
        id: "bread",
        name: "ขนมปัง",
        icon: "🍞",
        description: "สินค้าพื้นฐาน",
        price: 500,
        idle: 100
    },

    {
        id: "coffee",
        name: "กาแฟ",
        icon: "☕",
        description: "ช่วยเพิ่มรายได้เล็กน้อย",
        price: 2000,
        idle: 500
    },

    {
        id: "burger",
        name: "เบอร์เกอร์",
        icon: "🍔",
        description: "สินค้าขายดี",
        price: 10000,
        idle: 2500
    },

    {
        id: "tv",
        name: "โทรทัศน์",
        icon: "📺",
        description: "เพิ่มรายได้อัตโนมัติ",
        price: 50000,
        idle: 10000
    },

    {
        id: "computer",
        name: "คอมพิวเตอร์",
        icon: "💻",
        description: "เครื่องทำเงินระดับสูง",
        price: 250000,
        idle: 50000
    },

    {
        id: "factory",
        name: "โรงงาน",
        icon: "🏭",
        description: "แหล่งรายได้ขนาดใหญ่",
        price: 1000000,
        idle: 100000
    }

];


// จำนวนสินค้าที่ซื้อ

let shopOwned = {};

shopProducts.forEach(product => {

    shopOwned[product.id] = 0;

});


// =========================
// CLICK
// =========================

let clickPower = 10;

let clickLevel = 1;

let clickPrice = 100;

let clickExp = 1;


// =========================
// CHARACTER
// =========================

let characterLevel = 1;

let characterExp = 0;

let characterExpMax = 100;


// =========================
// HOUSE
// =========================

let houseLevel = 1;

let houseBonus = 0;

let housePrice = 500;


// =========================
// IDLE
// =========================

let idlePower = 0;


// =========================
// HTML
// =========================

const background =
    document.querySelector(".background");

const moneyText =
    document.getElementById("money");

const clickPowerText =
    document.getElementById("clickPower");

const clickPriceText =
    document.getElementById("clickPrice");

const characterLevelText =
    document.getElementById("characterLevel");

const expFill =
    document.getElementById("expFill");

const expText =
    document.getElementById("expText");

const houseLevelText =
    document.getElementById("houseLevel");

const houseBonusText =
    document.getElementById("houseBonus");

const housePriceText =
    document.getElementById("housePrice");

const idlePowerText =
    document.getElementById("idlePower");

const character =
    document.getElementById("character");

const clickEffects =
    document.getElementById("clickEffects");

const shopButton =
    document.getElementById("shopButton");

const shopScreen =
    document.getElementById("shopScreen");

const closeShop =
    document.getElementById("closeShop");

const shopItems =
    document.getElementById("shopItems");

const clickButton = document.getElementById("clickButton");
const clickScreen = document.getElementById("clickScreen");
const closeClick = document.getElementById("closeClick");
const clickItems = document.getElementById("clickItems");


// =========================
// UPDATE UI
// =========================

function updateUI() {

    moneyText.textContent =
        Math.floor(money).toLocaleString();


    clickPowerText.textContent =
        clickPower.toLocaleString();


    clickPriceText.textContent =
        clickPrice.toLocaleString();


    characterLevelText.textContent =
        characterLevel;


    expText.textContent =
        `${characterExp} / ${characterExpMax}`;


    let expPercent =
        (characterExp / characterExpMax) * 100;


    expFill.style.width =
        expPercent + "%";


    houseLevelText.textContent =
        houseLevel;


    houseBonusText.textContent =
        houseBonus;


    housePriceText.textContent =
        housePrice.toLocaleString();


    idlePowerText.textContent =
        idlePower;
}


// =========================
// CLICK GAME
// =========================

document
    .querySelector(".game")
    .addEventListener(
        "click",
        function (event) {


            // ไม่ให้ปุ่มนับเป็นการคลิกหาเงิน

            if (

                event.target.tagName ===
                "BUTTON"

                ||

                event.target.closest(
                    ".bottom-button"
                )

                ||

                event.target.closest(
                    "#musicButton"
                )

            ) {

                return;

            }


            // =====================
            // CALCULATE MONEY
            // =====================

            let bonus =
                1 + (houseBonus / 100);


            let earned =
                clickPower * bonus;


            money += earned;


            // =====================
            // CHARACTER EXP
            // =====================

            characterExp += clickExp;


            checkCharacterLevel();


            // =====================
            // CHARACTER ANIMATION
            // =====================

            character.classList.add(
                "click"
            );


            setTimeout(
                () => {

                    character.classList.remove(
                        "click"
                    );

                },
                100
            );


            // =====================
            // MONEY EFFECT
            // =====================

            createMoneyEffect(

                event.clientX,

                event.clientY,

                earned

            );


            // =====================
            // UPDATE
            // =====================

            updateUI();

        }
    );


// =========================
// MONEY EFFECT
// =========================

function createMoneyEffect(
    x,
    y,
    amount
) {


    const effect =
        document.createElement("div");


    effect.className =
        "money-effect";


    effect.innerHTML = `

        <span>
            +${Math.floor(amount).toLocaleString()}
        </span>

        <img
            src="img/money.png"
        >

    `;


    effect.style.left =
        x + "px";


    effect.style.top =
        y + "px";


    clickEffects.appendChild(
        effect
    );


    setTimeout(
        () => {

            effect.remove();

        },
        700
    );

}

function createIdleEffect(amount) {
    const effect = document.createElement("div");

    effect.className = "money-effect";

    effect.innerHTML = `
        <span>+${Math.floor(amount).toLocaleString()}</span>
        <img src="img/money.png">
    `;

    effect.style.left = "50%";
    effect.style.top = "65%";

    clickEffects.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 700);
}


// =========================
// CHARACTER LEVEL
// =========================

function checkCharacterLevel() {


    while (
        characterExp >=
        characterExpMax
    ) {


        characterExp -=
            characterExpMax;


        characterLevel++;


        characterExpMax =
            Math.floor(characterExpMax * 1.35);


        changeCharacter();

    }

}


// =========================
// CHARACTER IMAGE
// =========================

function changeCharacter() {

    if (
        characterLevel >= 50
    ) {


        character.src =
            "img/idel7.png";


    }
    
    else if (
        characterLevel >= 40
    ) {


        character.src =
            "img/idel6.png";


    }


    else if (
        characterLevel >= 30
    ) {


        character.src =
            "img/idel5.png";


    }


    else if (
        characterLevel >= 20
    ) {


        character.src =
            "img/idel4.png";


    }

    else if (
        characterLevel >= 10
    ) {


        character.src =
            "img/idel3.png";


    }

    else if (
        characterLevel >= 5
    ) {


        character.src =
            "img/idel2.png";


    }

    else {


        character.src =
            "img/idel1.png";

    }

}


// =========================
// HOUSE IMAGE
// =========================

function changeHouse() {
    if (houseLevel >= 12) {


        background.style.backgroundImage =
            'url("img/back12.png")';


    }
    else if (houseLevel >= 11) {


        background.style.backgroundImage =
            'url("img/back11.png")';


    }
    else if (houseLevel >= 10) {


        background.style.backgroundImage =
            'url("img/back10.png")';


    }
    else if (houseLevel >= 9) {


        background.style.backgroundImage =
            'url("img/back9.png")';


    }
    else if (houseLevel >= 8) {


        background.style.backgroundImage =
            'url("img/back8.png")';


    }
    else if (houseLevel >= 7) {


        background.style.backgroundImage =
            'url("img/back7.png")';


    }
    else if (houseLevel >= 6) {


        background.style.backgroundImage =
            'url("img/back6.png")';


    }


    else if (houseLevel >= 5) {


        background.style.backgroundImage =
            'url("img/back5.png")';


    }


    else if (houseLevel >= 4) {


        background.style.backgroundImage =
            'url("img/back4.png")';


    }

    else if (houseLevel >= 3) {


        background.style.backgroundImage =
            'url("img/back3.png")';


    }

    else if (houseLevel >= 2) {


        background.style.backgroundImage =
            'url("img/back2.png")';


    }

    else {


        background.style.backgroundImage =
            'url("img/back1.png")';

    }

}


// =========================
// CLICK UPGRADE
// =========================

document
    .getElementById("upgradeClick")
    .addEventListener(
        "click",
        function (event) {


            event.stopPropagation();


            if (money >= clickPrice) {


                money -= clickPrice;


                clickLevel++;


                clickPower += clickPower;

                clickExp ++;


                clickPrice = Math.floor(clickPrice * 3);


                updateUI();


                saveGame();

            }

        }
    );


// =========================
// HOUSE UPGRADE
// =========================

document
    .getElementById("upgradeHouse")
    .addEventListener(
        "click",
        function (event) {


            event.stopPropagation();


            // =====================
            // CHECK MONEY
            // =====================

            if (money >= housePrice) {


                // จ่ายเงิน

                money -= housePrice;


                // เพิ่มบ้าน

                houseLevel++;


                // โบนัสบ้าน +10%

                houseBonus += 10;


                // ราคาใหม่

                housePrice = Math.floor(housePrice * 2.5);


                // เปลี่ยนภาพบ้าน

                changeHouse();


                // อัปเดต UI

                updateUI();


                saveGame();

                

            }

        }
    );


// =========================
// IDLE MONEY
// =========================

setInterval(function () {
    if (idlePower > 0) {
        money += idlePower;

        // เรียกให้แสดงไอคอน + จำนวนเงิน
        createIdleEffect(idlePower);

        updateUI();
    }
}, 1000);


// =========================
// MUSIC
// =========================

const bgm =
    document.getElementById("bgm");


bgm.volume = 0.3;


const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicOn = true;


// =========================
// MUSIC BUTTON
// =========================

musicButton.addEventListener(
    "click",
    function (event) {


        event.stopPropagation();


        if (
            musicOn
        ) {


            bgm.pause();


            musicOn = false;


            musicButton.textContent =
                "🔇";


        }

        else {


            bgm.play()
                .catch(() => { });


            musicOn = true;


            musicButton.textContent =
                "🔊";

        }

    }
);


// =========================
// START MUSIC
// =========================

document.addEventListener(
    "click",
    function startMusic() {


        if (
            musicOn &&
            bgm.paused
        ) {


            bgm.play()
                .catch(() => { });

        }


    },
    {
        once: true
    }
);

// =========================
// CREATE SHOP
// =========================

function renderShop() {

    shopItems.innerHTML = "";


    shopProducts.forEach(product => {

        const owned =
            shopOwned[product.id];


        const totalIdle =
            owned * product.idle;


        const item =
            document.createElement("div");


        item.className =
            "shop-item";


        item.innerHTML = `

            <div class="shop-item-top">

                <div class="shop-item-icon">
                    ${product.icon}
                </div>

                <div>

                    <div class="shop-item-name">
                        ${product.name}
                    </div>

                    <div class="shop-item-description">
                        ${product.description}
                    </div>

                </div>

            </div>


            <div class="shop-item-stats">

                +${product.idle} / sec

            </div>


            <div class="shop-item-price">

                ราคา:
                ${product.price.toLocaleString()}

                <br>

                ซื้อแล้ว:
                ${owned}

            </div>


            <button
                class="buy-product"
                data-id="${product.id}"
            >
                ซื้อ
            </button>

        `;


        const buyButton =
            item.querySelector(
                ".buy-product"
            );


        if (
            money < product.price
        ) {

            buyButton.disabled = true;

        }


        buyButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                buyProduct(product.id);

            }
        );


        shopItems.appendChild(item);

    });

}

// =========================
// BUY PRODUCT
// =========================

function buyProduct(productId) {

    const product =
        shopProducts.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    if (
        money < product.price
    ) {
        return;
    }


    // จ่ายเงิน

    money -=
        product.price;


    // เพิ่มจำนวนสินค้า

    shopOwned[product.id]++;


    // เพิ่ม Idle

    idlePower +=
        product.idle;


    // อัปเดต

    updateUI();

    renderShop();
    saveGame();

}

// =========================
// OPEN SHOP
// =========================

shopButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        shopScreen.classList.add(
            "active"
        );

        renderShop();

    }
);

// =========================
// CLOSE SHOP
// =========================

closeShop.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        shopScreen.classList.remove(
            "active"
        );

    }
);

shopScreen.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);

const clickProducts = [

    {
        id: "blueClick",
        name: "คลิกสีฟ้า",
        icon: "🔵",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 5000,
        click: 300,
        exp: 5
    },

    {
        id: "greenClick",
        name: "คลิกสีเขียว",
        icon: "🟢",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 20000,
        click: 500,
        exp: 10
    },

    {
        id: "purpleClick",
        name: "คลิกสีม่วง",
        icon: "🟣",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 100000,
        click: 1500,
        exp: 25
    },

    {
        id: "orangeClick",
        name: "คลิกสีส้ม",
        icon: "🟠",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 700000,
        click: 3000,
        exp: 50
    },

    {
        id: "redClick",
        name: "คลิกสีแดง",
        icon: "🔴",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 1000000,
        click: 5000,
        exp: 100
    },

    {
        id: "blackClick",
        name: "คลิกสีดำ",
        icon: "⚫",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 2500000,
        click: 10000,
        exp: 300
    },

    {
        id: "heartClick",
        name: "คลิกหัวใจ",
        icon: "💗",
        description: "เพิ่มพลังคลิกและ EXP",
        price: 2500000000,
        click: 1000000,
        exp: 30000
    }

];

function renderClickShop() {

    clickItems.innerHTML = "";

    clickProducts.forEach(product => {

        const item = document.createElement("div");

        item.className = "click-item";

        item.innerHTML = `

            <div class="click-item-top">

                <div class="click-item-icon">
                    ${product.icon}
                </div>

                <div>

                    <div class="click-item-name">
                        ${product.name}
                    </div>

                    <div class="click-item-description">
                        ${product.description}
                    </div>

                </div>

            </div>


            <div class="click-item-stats">

                CLICK +${product.click}

                <br>

                EXP +${product.exp}

            </div>


            <div class="click-item-price">

                ราคา: ${product.price.toLocaleString()}

            </div>


            <button
                class="buy-click-button"
                data-id="${product.id}"
                ${money < product.price ? "disabled" : ""}
            >
                ซื้อ
            </button>

        `;

        clickItems.appendChild(item);

    });

}

clickButton.addEventListener("click", function (event) {

    event.stopPropagation();

    clickScreen.classList.add("active");

    renderClickShop();

});

closeClick.addEventListener("click", function (event) {

    event.stopPropagation();

    clickScreen.classList.remove("active");

});

clickScreen.addEventListener("click", function (event) {

    event.stopPropagation();

});

clickItems.addEventListener("click", function (event) {

    const button = event.target.closest(".buy-click-button");

    if (!button) return;

    const productId = button.dataset.id;

    const product = clickProducts.find(
        item => item.id === productId
    );

    if (!product) return;

    if (money < product.price) return;


    // หักเงิน
    money -= product.price;


    // เพิ่มพลังคลิก
    clickPower += product.click;


    // เพิ่ม EXP ต่อคลิก
    clickExp += product.exp;


    updateUI();

    renderClickShop();

    saveGame();

});


// =========================
// START GAME
// =========================

// โหลดตัวละคร

changeCharacter();


// โหลดบ้าน

changeHouse();


// โหลด UI

updateUI();

// =========================
// SAVE SYSTEM
// =========================

const SAVE_KEY = "clickIdleSave";


// =========================
// SAVE GAME
// =========================

function saveGame() {

    const saveData = {

        money: money,

        // CLICK
        clickPower: clickPower,
        clickLevel: clickLevel,
        clickPrice: clickPrice,
        clickExp: clickExp,

        // CHARACTER
        characterLevel: characterLevel,
        characterExp: characterExp,
        characterExpMax: characterExpMax,

        // HOUSE
        houseLevel: houseLevel,
        houseBonus: houseBonus,
        housePrice: housePrice,

        // IDLE
        idlePower: idlePower,

        // SHOP
        shopOwned: shopOwned

    };


    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );

}


// =========================
// LOAD GAME
// =========================

function loadGame() {

    const savedData =
        localStorage.getItem(SAVE_KEY);


    // ยังไม่เคยมี Save
    if (!savedData) {

        return;

    }


    try {

        const data =
            JSON.parse(savedData);


        // MONEY
        money =
            data.money ?? 0;


        // CLICK
        clickPower =
            data.clickPower ?? 10;

        clickLevel =
            data.clickLevel ?? 1;

        clickPrice =
            data.clickPrice ?? 100;

        clickExp =
            data.clickExp ?? 1;


        // CHARACTER
        characterLevel =
            data.characterLevel ?? 1;

        characterExp =
            data.characterExp ?? 0;

        characterExpMax =
            data.characterExpMax ?? 100;


        // HOUSE
        houseLevel =
            data.houseLevel ?? 1;

        houseBonus =
            data.houseBonus ?? 0;

        housePrice =
            data.housePrice ?? 500;


        // IDLE
        idlePower =
            data.idlePower ?? 0;


        // SHOP
        if (data.shopOwned) {

            shopOwned = data.shopOwned;

        }


    } catch (error) {

        console.log(
            "ไม่สามารถโหลด Save ได้",
            error
        );

    }


    // เปลี่ยนภาพให้ตรงกับข้อมูล
    changeCharacter();

    changeHouse();


    // อัปเดตหน้าจอ
    updateUI();

}


// =========================
// RESET GAME
// =========================

const resetGameButton =
    document.getElementById(
        "resetGameButton"
    );


resetGameButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        const confirmReset =
            confirm(
                "⚠️ เริ่มเกมใหม่?\n\n" +
                "ข้อมูลการเล่นทั้งหมดจะถูกลบ\n" +
                "และไม่สามารถกู้คืนได้"
            );


        if (!confirmReset) {

            return;

        }


        // ลบ Save
        localStorage.removeItem(
            SAVE_KEY
        );


        // โหลดหน้าใหม่
        location.reload();

    }
);


// =========================
// LOAD ตอนเปิดเกม
// =========================

loadGame();


// =========================
// AUTO SAVE
// =========================

setInterval(
    function () {

        saveGame();

    },
    5000
);