const showSpinner = () => document.getElementById("spinner-wrapper").style.display = "block";

const hideSpinner = () => document.getElementById("spinner-wrapper").style.display = "none";

const checkPaymentEntry = (paymentType) => {

    let simulateServerTime = 3000;

    if (paymentType === "bank") {
        showSpinner()
        const bankAccount = document.getElementById('bankAccount').value;
        if (bankAccount) {
            setTimeout(() => {
                hideSpinner()
                document.getElementById('backModal').style.display = "block";
            }, simulateServerTime);
        } else {
            alert("No has completado todos los datos")
        }
    } else {
        const card_name = document.getElementById('credit-card-name').value;
        const card_number = document.getElementById('credit-card-number').value;
        const card_month = document.getElementById('credit-card-month').value;
        const card_year = document.getElementById('credit-card-year').value;
        const card_cvv = document.getElementById('credit-card-cvv').value;

        if (card_name && card_number && card_month && card_year && card_cvv) {
            showSpinner()
            setTimeout(() => {
                hideSpinner()
                document.getElementById('backModal').style.display = "block";
            }, simulateServerTime);
        } else {
            alert("No has completado todos los datos")
        }
    }
}