// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Dashboard: https://codepen.io/themustafaomar/pen/jLMPKm

let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
let dropdownIsOpen = false

// Handle dropdown menues
if (dropdowns.length) {
  // Usually I don't recommend doing this (adding many event listeners to elements have the same handler)
  // Instead use event delegation: https://javascript.info/event-delegation
  // Why: https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js
  // But since we only have two dropdowns, no problem with that. 
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`)

      if (target) {
        if (target.classList.contains('show')) {
          target.classList.remove('show')
          dropdownIsOpen = false
        } else {
          target.classList.add('show')
          dropdownIsOpen = true
        }
      }
    })
  })
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
      let targetIsDropdown = dropdown == event.target

      if (dropdownButton == event.target) {
        return
      }

      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show')
      }
    })
  }
})

// Open links in mobiles
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
      let navbarMenu = document.querySelector('.navbar-menu')

      if (!navbarMenu.classList.contains('active')) {
        navbarMenu.classList.add('active')
      } else {
        navbarMenu.classList.remove('active')
      }
    })
}

handleSmallScreens()

//faq
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));
//god

// god mode on
// Federal tax brackets and rates for 2024
const federalTaxBrackets = [
  { income: 50197, taxRate: 0.15 },
  { income: 100392, taxRate: 0.205 },
  { income: 155625, taxRate: 0.26 },
  { income: 221708, taxRate: 0.29 },
  { income: Infinity, taxRate: 0.33 }
];

// Provincial tax brackets and rates for 2024 in Ontario

const provincialTaxBracketsOntario = [
    { income: 0, taxRate: 0.105 },
    { income: 49720, taxRate: 0.125 },
    { income: 142058, taxRate: 0.145 },
    { income: Infinity, taxRate: 0.15 }
];
const ontarioSurtaxBrackets = [
  { income: 220000, taxRate: 0.00 },
  { income: 500000, taxRate: 0.00 },
  { income: 1000000, taxRate: 0.00 },
  { income: Infinity, taxRate: 0.00 }
];

function getFederalTaxBrackets() {
  return federalTaxBrackets;
}

function getProvincialTaxBrackets() {


  return provincialTaxBracketsOntario;




}
document.querySelector('#calculate').addEventListener('click', function () {

  document.getElementById('finaltaxreturn').style.color = '#b80000';
  document.getElementById('finaltaxreturn1').style.textContent = 'Estimated Tax Owed';

});
function calculateTax() {
  const div = document.getElementById("calculator-right1");

  // Scroll to the div element.
  div.scrollIntoView({ behavior: "smooth" });
  const formatter = new Intl.NumberFormat('en-US');
  // Get the province selected
  const province = document.getElementById('province').value;

  // Get the income and other values entered by the user
  const inputElement = document.getElementById('employmentIncome');
  let inputValue = inputElement.value.replace(/\D/g, '');  // Remove non-numeric characters
  const employmentIncome = Number(inputValue) || 0;

  const inputElement1 = document.getElementById('selfEmploymentIncome');
  let inputValue1 = inputElement1.value.replace(/\D/g, '');  // Remove non-numeric characters
  const selfEmploymentIncome = Number(inputValue1) || 0;

  const inputElement2 = document.getElementById('rrspContribution');
  let inputValue2 = inputElement2.value.replace(/\D/g, '');  // Remove non-numeric characters
  const rrspContribution = Number(inputValue2) || 0;

  const inputElement3 = document.getElementById('capitalGains');
  let inputValue3 = inputElement3.value.replace(/\D/g, '');  // Remove non-numeric characters
  const capitalGains = Number(inputValue3) || 0;

  const inputElement4 = document.getElementById('eligibleDividends');
  let inputValue4 = inputElement4.value.replace(/\D/g, '');  // Remove non-numeric characters
  const eligibleDividends = Number(inputValue4) || 0;

  const inputElement5 = document.getElementById('otherIncome');
  let inputValue5 = inputElement5.value.replace(/\D/g, '');  // Remove non-numeric characters
  const otherIncome = Number(inputValue5) || 0;



  // Calculate the total income
  const totalIncome = employmentIncome + selfEmploymentIncome + otherIncome + capitalGains + eligibleDividends - rrspContribution;

  // Calculate the federal tax
  const federalTax = calculateFederalTax(province, totalIncome);

  // Calculate the provincial tax
  const provincialTax = calculateProvincialTax(province, totalIncome);

  // Calculate the CPP/EI premiums
  const cppEIPremiums = calculateCPPEIPremiums(totalIncome);

  // Calculate the total tax
  const totalTax = federalTax + provincialTax + cppEIPremiums;

  // Calculate the after-tax income
  const afterTaxIncome = totalIncome - totalTax;

  // Calculate the average tax rate
  const averageTaxRate = ((totalTax - cppEIPremiums) / totalIncome) * 100;

  // Calculate the marginal tax rate
  const marginalTaxRate = calculateMarginalTaxRate(province, totalIncome);
  // Calculate income tax return 
  const incometaxreturn = totalTax - cppEIPremiums;

  // Update the UI with the calculated values
  document.getElementById('totalIncome').innerText = '$' + formatter.format(totalIncome.toFixed(0));

  document.getElementById('federalTax').innerText = '$' + formatter.format(federalTax.toFixed(0));
  document.getElementById('provincialTax').innerText = '$' + formatter.format(provincialTax.toFixed(0));
  document.getElementById('cppEIPremiums').innerText = '$' + formatter.format(cppEIPremiums.toFixed(0));
  document.getElementById('totalTax').innerText = '$' + formatter.format(totalTax.toFixed(0));
  document.getElementById('afterTaxIncome').innerText = '$' + formatter.format(afterTaxIncome.toFixed(0));
  document.getElementById('averageTaxRate').innerText = averageTaxRate.toFixed(2) + '%';
  document.getElementById('marginalTaxRate').innerText = '$' + marginalTaxRate.toFixed(0) + '%';

  // Update the estimated tax return
  document.getElementById('finaltaxreturn').innerText = '$' + formatter.format(incometaxreturn.toFixed(0));

}

function calculateFederalTax(province, totalIncome) {
  const federalTaxBrackets = getFederalTaxBrackets();

  // Subtract the personal exemption.
  totalIncome -= 15000;

  // If the income is less than 0, set it to 0.
  if (totalIncome < 0) {
    totalIncome = 0;
  }

  // If the income is 0, the federal tax should be 0 as well.
  if (totalIncome === 0) {
    return 0;
  }

  let federalTax = 0;
  for (const bracket of federalTaxBrackets) {
    if (totalIncome <= bracket.income) {
      federalTax += bracket.taxRate * totalIncome;
      break;
    } else {
      federalTax += bracket.taxRate * bracket.income;
      totalIncome -= bracket.income;
    }
  }

  return federalTax;
}

function calculateProvincialTax(province, totalIncome) {
  const provincialTaxBrackets = getProvincialTaxBrackets(province);

  // Subtract the Ontario Basic Personal Amount.
  totalIncome -= 11141;

  // If the income is less than 0, set it to 0.
  if (totalIncome < 0) {
    totalIncome = 0;
  }

  // If the income is 0, the provincial tax should be 0 as well.
  if (totalIncome === 0) {
    return 0;
  }

  let provincialTax = 0;
  for (const bracket of provincialTaxBrackets) {
    if (totalIncome <= bracket.income) {
      provincialTax += bracket.taxRate * totalIncome;
      break;
    } else {
      provincialTax += bracket.taxRate * bracket.income;
      totalIncome -= bracket.income;
    }
  }

  // Calculate the surtax.
  let surtax = 0;
  for (const bracket of ontarioSurtaxBrackets) {
    if (totalIncome <= bracket.income) {
      const incomeAfterTax = totalIncome - provincialTaxBrackets[provincialTaxBrackets.length - 2].income;
      surtax += bracket.taxRate * Math.max(incomeAfterTax, 0);
      break;
    } else {
      totalIncome -= bracket.income;
    }
  }

  // Return the total provincial tax, including the surtax.
  return provincialTax + surtax;
}

function calculateCPPEIPremiums(totalIncome) {
  const cppContribution = Math.min(totalIncome * 0.0595, 3754.45);
  const eiContribution = Math.min(totalIncome * 0.0163, 1002.45);
  return cppContribution + eiContribution;
}

function calculateMarginalTaxRate(province, totalIncome) {
  const federalTaxBrackets = getFederalTaxBrackets();
  const provincialTaxBrackets = getProvincialTaxBrackets(province);

  let taxRate = 0;

  // Calculate the federal tax rate.
  for (const bracket of federalTaxBrackets) {
    if (totalIncome < bracket.income) {
      taxRate += bracket.taxRate;
      break;
    } else {
      totalIncome -= bracket.income;
    }
  }

  // Calculate the provincial tax rate.
  for (const bracket of provincialTaxBrackets) {
    if (totalIncome < bracket.income) {
      taxRate += bracket.taxRate;
      break;
    } else {
      totalIncome -= bracket.income;
    }
  }

  return taxRate * 100;
}
function calculateCPPEIPremiums(totalIncome) {
  const cppContribution = Math.min(totalIncome * 0.0595, 3754.45);
  const eiContribution = Math.min(totalIncome * 0.0163, 1002.45);
  return cppContribution + eiContribution;
}

function calculateMarginalTaxRate(province, totalIncome) {
  const federalTaxBrackets = getFederalTaxBrackets();
  const provincialTaxBrackets = getProvincialTaxBrackets(province);

  let taxRate = 0;

  // Calculate the federal tax rate
  for (const bracket of federalTaxBrackets) {
    if (totalIncome < bracket.income) {
      taxRate += bracket.taxRate;
      break;
    } else {
      totalIncome -= bracket.income;
    }
  }

  // Calculate the provincial tax rate
  for (const bracket of provincialTaxBrackets) {
    if (totalIncome < bracket.income) {
      taxRate += bracket.taxRate;
      break;
    } else {
      totalIncome -= bracket.income;
    }
  }

  return taxRate * 100;
}