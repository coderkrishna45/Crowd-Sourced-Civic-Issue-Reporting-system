// Subcategory options
const subOptions = {
    "Infrastructure": ["Road / Potholes", "Water Supply / Leakage", "Electricity / Street Lights", "Bridges / Flyovers"],
    "Civic": ["Garbage / Waste Management", "Public Transport Issues", "Parking / Traffic Signals", "Public Toilets"],
    "Environment": ["Illegal Dumping / Pollution", "Tree Cutting / Greenery", "Fire / Disaster Preparedness", "Law & Order / Public Safety"]
};

const category = document.getElementById("category");
const subCategory = document.getElementById("subCategory");

// Update subCategory dropdown based on selected category
category.addEventListener("change", function () {
    subCategory.innerHTML = '<option value="">Select Issue</option>'; 
    const options = subOptions[this.value] || [];
    options.forEach(function (option) {
        const el = document.createElement("option");
        el.value = option;
        el.textContent = option;
        subCategory.appendChild(el);
    });
});
// ... (Your subOptions and change listener code is correct) ...

document.getElementById("issueForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("Mobile").value.trim();
    const categoryValue = document.getElementById("category").value;
    const subCategoryValue = document.getElementById("subCategory").value;
    const description = document.getElementById("description").value.trim();

    if (mobile.length !== 10 || isNaN(mobile)) {
        return alert("Please enter a valid 10-digit mobile number.");
    }
    if (/\d/.test(name)) {
        return alert("Name cannot contain numbers.");
    }

    const issueData = {
        name: name,
        mobile: mobile,
        category: categoryValue,
        title: subCategoryValue, // Send 'subCategory' as 'title' to match the Schema
        description: description
    };

    fetch('http://localhost:3000/api/issues', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issueData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // FIX #2: Use the MongoDB '_id'
        document.getElementById('message').innerText = `Thank you ${name}. Your issue #${data._id} has been submitted!`;
        setTimeout(() => {
            document.getElementById('message').innerText = "";
        }, 4000);
        document.getElementById("issueForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert(`There was an error: ${error}. Please try again.`);
    });
});

// ... (Your dark mode toggle code is correct) ...

// Dark Mode Toggle
const toggle = document.getElementById("toggleBtn");

toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        toggle.innerText = "Switch to Light Mode";
    } else {
        toggle.innerText = "Switch to Dark Mode";
    }
});
