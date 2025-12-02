// Select screen and all buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const toggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");

let expression = "";

// Adjust display font automatically when content is long
function adjustFont() {
    if (expression.length > 12) {
        display.style.fontSize = "20px";   // Smaller font
    } else {
        display.style.fontSize = "30px";   // Normal font
    }
}

// Update calculator display
function updateScreen() {
    display.innerText = expression || "0";
    adjustFont();
}

// Convert visual operators to JS operators
function convert(expr) {
    return expr.replace(/×/g, "*").replace(/÷/g, "/");
}

// Button click handling
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        const id = btn.id;

        // CLEAR
        if (id === "clear") {
            expression = "";
            updateScreen();
            return;
        }

        // BACKSPACE
        if (id === "backspace") {
            expression = expression.slice(0, -1);
            updateScreen();
            return;
        }

        // EQUAL (=)
        if (id === "equal") {
            if (expression === "") return;

            try {
                const result = eval(convert(expression));
                expression = result.toString();
                updateScreen();
            } catch {
                display.innerText = "Error";
                setTimeout(() => {
                    expression = "";
                    updateScreen();
                }, 1200);
            }
            return;
        }

        // Append bracket buttons
        if (id === "open-paren" || id === "close-paren") {
            expression += value;
            updateScreen();
            return;
        }

        // Numbers + operators
        expression += value;
        updateScreen();
    });
});

// Theme toggler (dark <-> light)
toggleBtn.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    toggleBtn.classList.toggle("active");
});
