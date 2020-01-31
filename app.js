let honor = 0;
let clickPower = 1;
let collectionInterval;
let autoMult = 0;

let clickUpgrades = {
  sword: {
    price: 10,
    quantity: 0,
    multiplier: 1,
  },
  enchantment: {
    price: 500,
    quantity: 0,
    multiplier: 5,
  }
}

let autoUpgrades = {
  butler: {
    price: 200,
    quantity: 0,
    multiplier: 2,
  },
  mercenary: {
    price: 500,
    quantity: 0,
    multiplier: 10
  }
}

let sword = clickUpgrades.sword

let enchant = clickUpgrades.enchantment
let enchantPower

let butler = autoUpgrades.butler
let butlerPower

let merc = autoUpgrades.mercenary
let mercPower

let purchasedUpgrades = []
let purchasedAutoUpgrades = []

function clickTotal() {
  clickPower = 1 + sword.quantity + (enchant.quantity * enchant.multiplier)
  return clickPower
}

function fight() {
  clickTotal()
  honor += clickPower
  update()
}

function upgradeSword() {
  if (honor >= sword.price) {
    sword.quantity++
    honor -= sword.price
    sword.price = sword.price * 1.25
  }
  update()
}

function upgradeEnchant() {
  if (honor >= enchant.price) {
    enchant.quantity++
    honor -= enchant.price
    enchant.price = enchant.price * 1.25
    enchantPower = (enchant.quantity * enchant.multiplier) + 0
  }
  update()
}

function upgradeButler() {
  if (honor >= butler.price) {
    butler.quantity++
    honor -= butler.price
    butler.price = butler.price * 1.25
    butlerPower = (butler.quantity * butler.multiplier) + 0
  }
  update()
}

function upgradeMerc() {
  if (honor >= merc.price) {
    merc.quantity++
    honor -= merc.price
    merc.price = merc.price * 1.25
    mercPower = (merc.quantity * merc.multiplier) + 0
  }
  update()
}

function collectAutoUpgrades() {
  autoMult = 0
  for (let key in autoUpgrades) {
    // autoMult += (butlerPower + mercPower)
    autoMult += (autoUpgrades[key].quantity * autoUpgrades[key].multiplier)
  }
  honor += autoMult
  console.log('Auto collect')
  console.log(autoMult)
  update()
}


function update() {

  document.getElementById('honor-status').innerText = `${honor.toFixed(2)}`

  document.getElementById('sword-upgrades').innerText = `${sword.quantity}`
  document.getElementById('sword-bonus').innerText = `${sword.quantity}`
  document.getElementById('sword-price').innerText = `${Math.trunc(sword.price)}`

  document.getElementById('enchant-upgrades').innerText = `${enchant.quantity}`
  document.getElementById('enchant-price').innerText = `${Math.trunc(enchant.price)}`
  document.getElementById('enchant-bonus').innerText = `${Math.trunc(enchant.quantity * enchant.multiplier)}`

  document.getElementById('butler-upgrades').innerText = `${butler.quantity}`
  document.getElementById('butler-price').innerText = `${Math.trunc(butler.price)}`
  document.getElementById('butler-bonus').innerText = `${Math.trunc(butler.quantity * butler.multiplier)}`

  document.getElementById('merc-upgrades').innerText = `${merc.quantity}`
  document.getElementById('merc-price').innerText = `${Math.trunc(merc.price)}`
  document.getElementById('merc-bonus').innerText = `${Math.trunc(merc.multiplier * merc.quantity)}`

}

function addMods() {
  let multTotal = 0
  for (let i = 0; i < purchasedUpgrades.length; i++) {
    multTotal += purchasedUpgrades[i].multiplier
  }
  return multTotal
}


function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 2000)
}

startInterval()
update()