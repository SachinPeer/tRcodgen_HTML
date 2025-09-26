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
    
    // Basic validation
    if (!name || !email || !age || !role) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = {
        id: nextId++,
        name: name,
        email: email,
        age: parseInt(age),
        role: role
    };
    
    users.push(user);
    displayUsers();
    clearForm();
    alert('User added successfully!');
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
    // JS BUG: Edit button doesn't work - just shows alert
    alert('Edit functionality not implemented yet!');
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
