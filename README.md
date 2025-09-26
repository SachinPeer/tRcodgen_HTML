# HTML/CSS/JavaScript User Management System

A simple user management interface with **3 intentional bugs** for TestRigor testing.

## Features

- ✅ Add new users with name, email, age, and role
- ✅ Display users in a table format
- ✅ Search functionality (working)
- ✅ Delete user actions (working)
- ❌ Edit functionality (BUG - shows alert only)
- ❌ Email input validation (BUG - wrong input type)
- ❌ Button styling (BUG - inconsistent colors)

## How to Run

1. Open `index.html` in your web browser
2. No additional setup or dependencies required

## Files

- `index.html` - Main HTML structure (contains 1 bug)
- `styles.css` - CSS styling (contains 1 bug)
- `script.js` - JavaScript functionality (contains 1 bug)
- `SIMPLE_BUGS.md` - Documentation of the 3 bugs
- `README.md` - This file

## Intentional Bugs

| Bug | Type | Description | Severity |
|-----|------|-------------|----------|
| 1 | HTML | Email input uses `type="text"` instead of `type="email"` | Medium |
| 2 | CSS | Clear button has same color as Submit button | Low |
| 3 | JS | Edit button shows alert instead of working | High |

## TestRigor Test Cases

### Test Case 1: HTML Bug - Email Input Type
```
go to "html-version/index.html"
check that element "userEmail" has attribute "type" with value "email"
```
**Expected Result:** ❌ FAIL (currently "text")

### Test Case 2: CSS Bug - Button Color
```
go to "html-version/index.html"
check that element "clearBtn" has css property "background-color" with value "rgb(108, 117, 125)"
```
**Expected Result:** ❌ FAIL (currently blue like submit button)

### Test Case 3: JavaScript Bug - Edit Functionality
```
go to "html-version/index.html"
type "Test User" into "userName"
type "test@example.com" into "userEmail"
type "30" into "userAge"
select "admin" from "userRole"
click "Add User"
wait 1 second
click "Edit" in table row 1
check that no alert is displayed
check that "userName" field contains "Test User"
```
**Expected Result:** ❌ FAIL (shows alert instead of editing)

### Complete Test Suite
```
# Bug Detection Test Suite
go to "html-version/index.html"

# Test 1: HTML Bug
check that element "userEmail" has attribute "type" with value "email"

# Test 2: CSS Bug  
check that element "clearBtn" has css property "background-color" with value "rgb(108, 117, 125)"

# Test 3: JS Bug - Setup
type "John Doe" into "userName"
type "john@example.com" into "userEmail"
type "25" into "userAge"
select "user" from "userRole"
click "Add User"
wait 1 second

# Test 3: JS Bug - Verify Edit
click "Edit" in table row 1
check that no alert is displayed
check that "userName" field contains "John Doe"
```

## Working Features (For Positive Testing)

### Add User Test
```
go to "html-version/index.html"
type "Jane Smith" into "userName"
type "jane@example.com" into "userEmail"
type "28" into "userAge"
select "moderator" from "userRole"
click "Add User"
check that table contains "Jane Smith"
```

### Search Test
```
go to "html-version/index.html"
type "John" into "searchInput"
check that table contains "John"
check that table does not contain "Jane"
```

### Delete Test
```
go to "html-version/index.html"
click "Delete" in table row 1
click "OK" on confirmation dialog
check that table row 1 does not exist
```

These test cases will help identify the 3 intentional bugs while also verifying that other functionality works correctly.
