let users = [];
let nextId = 1;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');
    const searchInput = document.getElementById('searchInput');

    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addUser();
    });

    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('searchBtn').addEventListener('click', searchUsers);
    
    // Real-time search
    searchInput.addEventListener('input', searchUsers);
});

function addUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const age = document.getElementById('userAge').value;
    const role = document.getElementById('userRole').value;
    const submitBtn = document.getElementById('submitBtn');
    const editId = submitBtn.dataset.editId;

    // Basic validation
    if (!name || !email || !age || !role) {
        alert('Please fill in all fields');
        return;
    }

    // Check if we're editing an existing user
    if (editId) {
        const userIndex = users.findIndex(u => u.id === parseInt(editId));
        if (userIndex !== -1) {
            users[userIndex].name = name;
            users[userIndex].email = email;
            users[userIndex].age = parseInt(age);
            users[userIndex].role = role;
            alert('User updated successfully!');
        }
        delete submitBtn.dataset.editId;
        submitBtn.textContent = 'Add User';
    } else {
        // Adding new user
        const user = {
            id: nextId++,
            name: name,
            email: email,
            age: parseInt(age),
            role: role
        };
        users.push(user);
        alert('User added successfully!');
    }

    displayUsers();
    clearForm();
}

function displayUsers(usersToDisplay = users) {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    
    if (usersToDisplay.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align: center;">No users found</td>';
        userTableBody.appendChild(row);
        return;
    }
    
    usersToDisplay.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.role}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userAge').value = '';
    document.getElementById('userRole').value = '';
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== id);
        displayUsers();
        alert('User deleted successfully!');
    }
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) {
        showErrorMessage('User not found');
        return;
    }

    // Populate form with user data
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userAge').value = user.age;
    document.getElementById('userRole').value = user.role;

    // Change submit button to update mode
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Update User';
    submitBtn.dataset.editId = id;

    // Scroll to form
    document.getElementById('userForm').scrollIntoView({ behavior: 'smooth' });
}

function showErrorMessage(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide the error message after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function searchUsers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayUsers();
        return;
    }
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
    );
    
    displayUsers(filteredUsers);
}
