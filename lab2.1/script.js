document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const pibInput = form.querySelector('#pib');
        const variantInput = form.querySelector('#variant');
        const groupInput = form.querySelector('#group');
        const phoneInput = form.querySelector('#phone');
        const idCardInput = form.querySelector('#idCard');

        const pib = pibInput.value;
        const variant = variantInput.value;
        const group = groupInput.value;
        const phone = phoneInput.value;
        const idCard = idCardInput.value;

        const pibPattern = /^[А-ЯІЇЄҐа-яіїєґ\s.'-]{1,20}\s?[А-ЯІЇЄҐа-яіїєґ]?[.]$/i;
        const variantPattern = /^([1-9]\d?)$/;
        const groupPattern = /^[А-ЯІЇЄҐа-яіїєґ\s.'-]{1,2}-\d{2}$/i;
        const phonePattern = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
        const idCardPattern = /^№\d{6}$/i;

        function displayResult(message, isValid) {
            if (isValid) {
                alert(message);
            } else {
                alert('Помилка: ' + message);
            }
        }

        const isPibValid = pibPattern.test(pib);
        const isVariantValid = variantPattern.test(variant);
        const isGroupValid = groupPattern.test(group);
        const isPhoneValid = phonePattern.test(phone);
        const isIdCardValid = idCardPattern.test(idCard);

        pibInput.style.borderColor = isPibValid ? 'initial' : 'red';
        variantInput.style.borderColor = isVariantValid ? 'initial' : 'red';
        groupInput.style.borderColor = isGroupValid ? 'initial' : 'red';
        phoneInput.style.borderColor = isPhoneValid ? 'initial' : 'red';
        idCardInput.style.borderColor = isIdCardValid ? 'initial' : 'red';

        pibInput.style.backgroundColor = isPibValid ? 'initial' : '#FFCCCC';
        variantInput.style.backgroundColor = isVariantValid ? 'initial' : '#FFCCCC';
        groupInput.style.backgroundColor = isGroupValid ? 'initial' : '#FFCCCC';
        phoneInput.style.backgroundColor = isPhoneValid ? 'initial' : '#FFCCCC';
        idCardInput.style.backgroundColor = isIdCardValid ? 'initial' : '#FFCCCC';

        if (isPibValid && isVariantValid && isGroupValid && isPhoneValid && isIdCardValid) {
            const userInfo = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 16px;
                            margin: 0;
                            padding: 0;
                            font-style: italic;
                            background-color: #95FF8C;
                        }
                        .container {
                            width: 400px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            border-radius: 12px;
                            border: 3px solid #24D415;
                        }
                        label {
                            font-style: normal;
                        }
                        h2{
                            font-size: 20px;
                            font-weight: bold;
                            font-style: normal;
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .data {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Введені дані:</h2>
                        <div class="data">
                            <label class="label">ПІБ:</label> ${pib}
                        </div>
                        <div class="data">
                            <label class="label">Варіант:</label> ${variant}
                        </div>
                        <div class="data">
                            <label class="label">Група:</label> ${group}
                        </div>
                        <div class="data">
                            <label class="label">Телефон:</label> ${phone}
                        </div>
                        <div class="data">
                            <label class="label">ID-card:</label> ${idCard}
                        </div>
                    </div>
                </body>
                </html>
            `;
            const userInfoWindow = window.open('', '_blank');
            userInfoWindow.document.write(userInfo);
        }
    });
});
