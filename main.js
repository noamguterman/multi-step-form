let totalUsd = 0
let chosenPlanUsd = 0
let monthlyYearly = 'Monthly'
let chosenPlan = 'Arcade'
let arcadePlanUsd = 9
let advancedPlanUsd = 12
let proPlanUsd = 15
let onlineAddonUsd = 1
let storageAddonUsd = 2
let profileAddonUsd = 2
const nextBtn = document.getElementById('next-btn')
const backBtn = document.getElementById('back-btn')
const confirmBtn = document.getElementById('confirm-btn')
const changeBtn = document.getElementById('change-btn')
const yearlyToggle = document.getElementById('yearly')
const infoSection = document.getElementById('info')
const planSection = document.getElementById('plan')
const addonsSection = document.getElementById('addons')
const summarySection = document.getElementById('summary')
const confirmationSection = document.getElementById('confirmation')
const navBottom = document.getElementById('nav-bottom')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const planRadios = document.querySelectorAll('input[name="plan"]')
const [arcade, advanced, pro] = planRadios

nextBtn.addEventListener('click', validateInfo)
backBtn.addEventListener('click', handleBack)
confirmBtn.addEventListener('click', handleSubmit)
changeBtn.addEventListener('click', handleChange)
yearlyToggle.addEventListener('click', handleYearlyToggle)
name.addEventListener('input', () => validateField(name, 'Name'))
email.addEventListener('input', () => validateEmptyField(email, 'Email Address'))
phone.addEventListener('input', () => validateField(phone, 'Phone Number'))
window.addEventListener("load", adjustNavBottom)
window.addEventListener("resize", adjustNavBottom)
document.addEventListener("DOMContentLoaded", () => {
    handleLabelsTabbing()
})

function moveFocusToFirstInteractiveElement(sectionId) {
    const section = document.getElementById(sectionId)
    if (!section) return

    const focusableElements = section.querySelectorAll('input, button, [tabindex]:not([tabindex="-1"])')
    if (focusableElements.length > 0) {
        focusableElements[0].focus()
    }
}

function handleLabelsTabbing() {
    document.addEventListener('keydown', (e) => {
        if (e.key !== ' ' && e.key !== 'Enter') return
    
        let target = e.target
        let input = target.querySelector('input')
    
        if (input) {
            e.preventDefault()
    
            if (input.type === "radio") {
                input.checked = true;
                input.dispatchEvent(new Event("change"))
            } else if (input.type === "checkbox") {
                input.checked = !input.checked
                input.dispatchEvent(new Event("change"))

                if (input.id === "yearly") {
                    handleYearlyToggle()
                }
            }
        }
    })
}

function adjustNavBottom() {
    const form = document.querySelector("form")
    const navBottom = document.getElementById("nav-bottom")

    if (window.innerWidth <= 880) {
        if (navBottom.parentElement === form) {
            document.body.appendChild(navBottom)
        }
    } else {
        if (navBottom.parentElement !== form) {
            form.appendChild(navBottom)
        }
    }
}

function handleYearlyToggle() {
    const arcadeEl = document.getElementById('arcade-el')
    const advancedEl = document.getElementById('advanced-el')
    const proEl = document.getElementById('pro-el')
    const onlineEl = document.getElementById('online-el')
    const storageEl = document.getElementById('storage-el')
    const profileEl = document.getElementById('profile-el')
    const freeEl = Array.from(document.getElementsByClassName('free'))

    if (yearlyToggle.checked) {
        monthlyYearly = 'Yearly'
        arcadePlanUsd = 90
        advancedPlanUsd = 120
        proPlanUsd = 150
        onlineAddonUsd = 10
        storageAddonUsd = 20
        profileAddonUsd = 20
        arcadeEl.innerHTML = `$${arcadePlanUsd}/yr`
        advancedEl.innerHTML = `$${advancedPlanUsd}/yr`
        proEl.innerHTML = `$${proPlanUsd}/yr`
        freeEl.forEach(el => el.classList.remove('is-hidden'))
        onlineEl.innerHTML = `$${onlineAddonUsd}/yr`
        storageEl.innerHTML = `$${storageAddonUsd}/yr`
        profileEl.innerHTML = `$${profileAddonUsd}/yr`
    } else {
        monthlyYearly = 'Monthly'
        arcadePlanUsd = 9
        advancedPlanUsd = 12
        proPlanUsd = 15
        onlineAddonUsd = 1
        storageAddonUsd = 2
        profileAddonUsd = 2
        arcadeEl.innerHTML = `$${arcadePlanUsd}/mo`
        advancedEl.innerHTML = `$${advancedPlanUsd}/mo`
        proEl.innerHTML = `$${proPlanUsd}/mo`
        freeEl.forEach(el => {
            if (!el.classList.contains('is-hidden')) {
                el.classList.add('is-hidden')
            }
        })
        onlineEl.innerHTML = `$${onlineAddonUsd}/mo`
        storageEl.innerHTML = `$${storageAddonUsd}/mo`
        profileEl.innerHTML = `$${profileAddonUsd}/mo`
    }
}

function handleNextFromInfoToPlan() {
    if (!infoSection.classList.contains('is-hidden')) {
        infoSection.classList.add('is-hidden')
        planSection.classList.remove('is-hidden')
        backBtn.classList.remove('is-hidden')
        navBottom.style.justifyContent = 'space-between'
        step1.classList.remove('is-active')
        step2.classList.add('is-active')
        moveFocusToFirstInteractiveElement('plan')
    } else {
        validatePlan()
    }
}

function handleNextFromPlanToAddons() {
    if (!planSection.classList.contains('is-hidden')) {
        planSection.classList.add('is-hidden')
        addonsSection.classList.remove('is-hidden')
        step2.classList.remove('is-active')
        step3.classList.add('is-active')
        moveFocusToFirstInteractiveElement('addons')
    } else {
        handleNextFromAddonsToSummary()
        moveFocusToFirstInteractiveElement('summary')
    }
}

function handleNextFromAddonsToSummary() {
    handleSumarize()

    if (!addonsSection.classList.contains('is-hidden')) {
        addonsSection.classList.add('is-hidden')
        summarySection.classList.remove('is-hidden')
        nextBtn.classList.add('is-hidden')
        confirmBtn.classList.remove('is-hidden')
        step3.classList.remove('is-active')
        step4.classList.add('is-active')
        moveFocusToFirstInteractiveElement('summary')
    } else {
        return
    }
}

function handleSumarize() {
    const moYr = monthlyYearly === 'Monthly' ? '/mo' : '/yr'
    const monthYear = monthlyYearly === 'Monthly' ? 'month' : 'year'
    const planSumEl = document.getElementById('plan-sum-el')
    const planPriceEl = document.getElementById('plan-price-el')
    const totalTextEl = document.getElementById('total-text-el')
    const totalPriceEl = document.getElementById('total-price-el')
    totalUsd = 0

    sumPlan()
    sumAddons()
    planSumEl.innerHTML = `${chosenPlan} (${monthlyYearly})`
    planPriceEl.innerHTML = `$${chosenPlanUsd}${moYr}`
    totalTextEl.innerHTML = `Total (per ${monthYear})`
    totalPriceEl.innerHTML = `$${totalUsd}${moYr}`
}

function sumPlan() {
    if (arcade.checked) {
        chosenPlan = 'Arcade'
        chosenPlanUsd = arcadePlanUsd
        totalUsd += arcadePlanUsd
    }
    if (advanced.checked) {
        chosenPlan = 'Advanced'
        chosenPlanUsd = advancedPlanUsd
        totalUsd += advancedPlanUsd
    }
    if (pro.checked) {
        chosenPlan = 'Pro'
        chosenPlanUsd = proPlanUsd
        totalUsd += proPlanUsd
    }
}

function sumAddons() {
    let addonsSummaryHtml = ''
    const onlineAddon = document.getElementById('online')
    const storageAddon = document.getElementById('storage')
    const profileAddon = document.getElementById('profile')
    const addonsSummary = document.getElementById('addons-summary')
    const divider = document.getElementById('divider')
    const moYr = monthlyYearly === 'Monthly' ? '/mo' : '/yr'

    if (onlineAddon.checked) {
        totalUsd += onlineAddonUsd
        addonsSummaryHtml += `<div>
	        <p>Online Service</p>
	        <p>+$${onlineAddonUsd}${moYr}</p>
        </div>
        `
    }
    if (storageAddon.checked) {
        totalUsd += storageAddonUsd
        addonsSummaryHtml += `<div>
            <p>Larger Storage</p>
            <p>+$${storageAddonUsd}${moYr}</p>
        </div>
        `
    }
    if (profileAddon.checked) {
        totalUsd += profileAddonUsd
        addonsSummaryHtml += `<div>
            <p>Customizable Profile</p>
            <p>+$${profileAddonUsd}${moYr}</p>
        </div>
        `
    }

    addonsSummary.innerHTML = addonsSummaryHtml
    if (addonsSummaryHtml === '') {
        if (!divider.classList.contains('is-hidden')) {
            divider.classList.add('is-hidden')
        }
    } else {
        divider.classList.remove('is-hidden')
    }
}

function handleSubmit(e) {
    e.preventDefault()

    if (!summarySection.classList.contains('is-hidden')) {
        summarySection.classList.add('is-hidden')
        confirmationSection.classList.remove('is-hidden')
        confirmationSection.classList.add('confirmation-animation')
        backBtn.classList.add('is-hidden')
        confirmBtn.classList.add('is-hidden')
    } else {
        return
    }
}

function handleBack() {
    if (!planSection.classList.contains('is-hidden')) {
        planSection.classList.add('is-hidden')
        infoSection.classList.remove('is-hidden')
        backBtn.classList.add('is-hidden')
        navBottom.style.justifyContent = 'flex-end'
        step1.classList.add('is-active')
        step2.classList.remove('is-active')
        moveFocusToFirstInteractiveElement('info')
    } else if (!addonsSection.classList.contains('is-hidden')) {
        addonsSection.classList.add('is-hidden')
        planSection.classList.remove('is-hidden')
        step2.classList.add('is-active')
        step3.classList.remove('is-active')
        moveFocusToFirstInteractiveElement('plan')
    } else if (!summarySection.classList.contains('is-hidden')) {
        summarySection.classList.add('is-hidden')
        addonsSection.classList.remove('is-hidden')
        confirmBtn.classList.add('is-hidden')
        nextBtn.classList.remove('is-hidden')
        step3.classList.add('is-active')
        step4.classList.remove('is-active')
        moveFocusToFirstInteractiveElement('addons')
    } else if (!confirmationSection.classList.contains('is-hidden')) {
        confirmationSection.classList.add('is-hidden')
        summarySection.classList.remove('is-hidden')
        moveFocusToFirstInteractiveElement('summary')
    } else {
        return
    }
}

function handleChange() {
    handleBack()
    handleBack()
}

function validateInfo() {
    let isEmailValid = true
    const isNameValid = validateField(name, 'Name')
    const isPhoneValid = validateField(phone, 'Phone Number')
    const emailValue = email.value.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errorSpan = document.getElementById('email-error')
    
    if (emailValue === '') {
        email.classList.add('error')
        errorSpan.textContent = "This field is required"
        if (!errorSpan.classList.contains('show')) {
            errorSpan.classList.add('show')
        }
        isEmailValid = false
    } else if (!emailPattern.test(emailValue)) {
        email.classList.add('error')
        errorSpan.textContent = "Please enter a valid email"
        if (!errorSpan.classList.contains('show')) {
            errorSpan.classList.add('show')
        }
        isEmailValid = false
    } else {
        email.classList.remove('error')
        errorSpan.textContent = ""
        errorSpan.classList.remove('show')
    }

    if (isNameValid && isEmailValid && isPhoneValid) {
        handleNextFromInfoToPlan()
    }
}

function validateField(field, labelText) {
    const fieldValue = field.value.trim()
    const errorSpan = document.getElementById(field.id + "-error")
    field.setAttribute("aria-invalid", "false")
    errorSpan.textContent = ""
    errorSpan.classList.remove('show')

    if (fieldValue === "") {
        field.classList.add("error");
        field.setAttribute("aria-invalid", "true")
        errorSpan.textContent = "This field is required"
        if (!errorSpan.classList.contains('show')) {
            errorSpan.classList.add('show')
        }
        return false
    }

    if (field.id === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(fieldValue)) {
            field.classList.add("error")
            field.setAttribute("aria-invalid", "true")
            errorSpan.textContent = "Please enter a valid email"
            if (!errorSpan.classList.contains('show')) {
                errorSpan.classList.add('show')
            }
            return false
        }
    }

    if (field.id === "phone") {
        const phonePattern = /^\+?[0-9\s-]+$/
        if (!phonePattern.test(fieldValue)) {
            field.classList.add("error")
            field.setAttribute("aria-invalid", "true")
            errorSpan.textContent = "Please enter a valid phone number"
            if (!errorSpan.classList.contains('show')) {
                errorSpan.classList.add('show')
            }
            return false
        }
    }

    if (field.id === "name") {
        const namePattern = /^[A-Za-z\s]+$/
        if (!namePattern.test(fieldValue)) {
            field.classList.add("error")
            field.setAttribute("aria-invalid", "true")
            errorSpan.textContent = "Letters only please"
            if (!errorSpan.classList.contains('show')) {
                errorSpan.classList.add('show')
            }
            return false
        }
    }

    field.classList.remove("error")
    field.removeAttribute("aria-invalid")
    errorSpan.textContent = ""
    errorSpan.classList.remove('show')
    return true
}

function validateEmptyField(field, labelText) {
    const fieldValue = field.value.trim()
    const errorSpan = document.getElementById(field.id + "-error")
    errorSpan.textContent = ""

    if (fieldValue === "") {
        field.classList.add("error")
        errorSpan.textContent = "This field is required"
        errorSpan.classList.add('show')
        field.setAttribute("aria-invalid", "true")
        return false
    }

    field.classList.remove("error")
    errorSpan.classList.remove('show')
    field.removeAttribute("aria-invalid")
    return true
}

function validatePlan() {
    if (arcade.checked || advanced.checked || pro.checked) {
        handleNextFromPlanToAddons()
    }
}
