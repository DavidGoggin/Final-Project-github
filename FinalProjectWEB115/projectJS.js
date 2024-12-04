// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to generate the meal plan page
function generateMealPlan() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const goal = document.getElementById("goal").value;

    // Validate email before proceeding
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealPlanHTML = `
        <html>
        <head>
            <title>${name}'s Weekly Meal Plan</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                th { background-color: #f4f4f4; }
            </style>
        </head>
        <body>
            <h1>${name}'s Weekly Meal Plan</h1>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Email:</strong> ${email}</p>
            <table>
                <tr><th>Day</th><th>Breakfast</th><th>Snack 1</th><th>Lunch</th><th>Snack 2</th><th>Dinner</th></tr>
                ${days.map(day => `
                    <tr>
                        <td>${day}</td>
                        <td>${document.getElementById(`${day.toLowerCase()}_breakfast`).value}</td>
                        <td>${document.getElementById(`${day.toLowerCase()}_snack1`).value}</td>
                        <td>${document.getElementById(`${day.toLowerCase()}_lunch`).value}</td>
                        <td>${document.getElementById(`${day.toLowerCase()}_snack2`).value}</td>
                        <td>${document.getElementById(`${day.toLowerCase()}_dinner`).value}</td>
                    </tr>`).join("")}
            </table>
        </body>
        </html>
    `;

    // Open a new window and insert the meal plan HTML content
    const newWindow = window.open('', '_blank');
    newWindow.document.write(mealPlanHTML);
    newWindow.document.close();
}

// Function to print the meal planner
function printPlanner() {
    window.print();
}

// Function to download the meal planner
function downloadPlanner() {
    const name = document.getElementById("name").value || "Meal_Plan";
    let content = `Name: ${name}\nEmail: ${document.getElementById("email").value}\nGoal: ${document.getElementById("goal").value}\n\n`;
    content += "Day\tBreakfast\tSnack 1\tLunch\tSnack 2\tDinner\n";

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach(day => {
        content += `${day}\t${document.getElementById(`${day.toLowerCase()}_breakfast`).value}\t${document.getElementById(`${day.toLowerCase()}_snack1`).value}\t${document.getElementById(`${day.toLowerCase()}_lunch`).value}\t${document.getElementById(`${day.toLowerCase()}_snack2`).value}\t${document.getElementById(`${day.toLowerCase()}_dinner`).value}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_Meal_Plan.txt`;
    link.click();
}

// Add event listeners to buttons after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.querySelector("button[onclick='generateMealPlan()']");
    const printButton = document.querySelector("button[onclick='printPlanner()']");
    const downloadButton = document.querySelector("button[onclick='downloadPlanner()']");

    generateButton.addEventListener("click", generateMealPlan);
    printButton.addEventListener("click", printPlanner);
    downloadButton.addEventListener("click", downloadPlanner);
});
