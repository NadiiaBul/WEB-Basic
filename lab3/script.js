function generateUsers() {
    const userCountInput = document.getElementById("userCount");
    const userListContainer = document.getElementById("userList");
    const userCount = parseInt(userCountInput.value);

    if (isNaN(userCount) || userCount <= 0) {
        alert("Будь ласка, введіть коректну кількість користувачів.");
        return;
    }

    userListContainer.innerHTML = "<p>Завантаження...</p>";

    fetch(`https://randomuser.me/api/?results=${userCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Помилка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const users = data.results;

            userListContainer.innerHTML = "";

            users.forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");
                userCard.innerHTML = `
                    <img src="${user.picture.large}" alt="User Picture">
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>City:</strong> ${user.location.city}</p>
                `;
                userListContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error("Помилка при отриманні даних:", error);
            userListContainer.innerHTML = "<p>Помилка при завантаженні даних.</p>";
        });
}
