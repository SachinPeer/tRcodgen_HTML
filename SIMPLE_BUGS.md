# Simple Bug Report - User Management System

This document lists **3 simple, testable bugs** that can be easily identified with TestRigor test cases.

## Bug Summary

| Bug Type | Location | Description | TestRigor Testable |
|----------|----------|-------------|-------------------|
| HTML | Line 24 | Email input has wrong type | ✅ Yes |
| CSS | Line 71-77 | Form buttons positioned at opposite corners creating broken layout | ✅ Yes |
| JavaScript | Line 93 | Edit button shows error message instead of editing | ✅ Yes |

---

## Bug 1: HTML Bug - Wrong Email Input Type

**File:** `index.html`  
**Line:** 24  
**Severity:** Medium

### Description
The email input field uses `type="text"` instead of `type="email"`.

```html
<!-- CURRENT (WRONG) -->
<input type="text" id="userEmail" required>

<!-- SHOULD BE -->
<input type="email" id="userEmail" required>
```

### Impact
- No email format validation
- Mobile users don't get email keyboard
- Poor user experience

### TestRigor Test Case
```
go to "html-version/index.html"
check that element "userEmail" has attribute "type" with value "email"
```

**Expected:** Test should FAIL (type is "text" not "email")

---

## Bug 2: CSS Bug - Form Buttons Positioned at Opposite Corners

**File:** `styles.css`  
**Line:** 71-77  
**Severity:** Medium

### Description
Form buttons are positioned at opposite corners using float properties, creating a broken layout.

```css
/* CURRENT (BUGGY) */
#submitBtn {
    float: left;
}

#clearBtn {
    float: right;
}
```

### Impact
- Poor visual layout - buttons appear disconnected
- Bad user experience - buttons don't look grouped together
- Breaks natural form flow and interaction patterns
- Unprofessional appearance

### TestRigor Test Case
```
go to "html-version/index.html"
check that element "submitBtn" has css property "float" with value "none"
check that element "clearBtn" has css property "float" with value "none"
```

**Expected:** Test should FAIL (Buttons have float properties instead of normal positioning)

---

## Bug 3: JavaScript Bug - Edit Button Shows Error Instead of Editing

**File:** `script.js`  
**Line:** 93  
**Severity:** High

### Description
Edit button displays an on-screen error message instead of implementing actual editing functionality.

```javascript
function editUser(id) {
    // BUG: Shows error message, doesn't actually edit
    showErrorMessage('Failed to edit');
}
```

### Impact
- Core functionality missing
- Users cannot edit existing data
- Error message indicates feature is not implemented

### TestRigor Test Case
```
go to "html-version/index.html"
type "John Doe" into "userName"
type "john@example.com" into "userEmail"  
type "25" into "userAge"
select "user" from "userRole"
click "Add User"
click "Edit" in table row 1
check that element "errorMessage" is not visible
check that "userName" field contains "John Doe"
```

**Expected:** Test should FAIL (Edit shows error message instead of populating form)

---

## Complete TestRigor Test Suite

```
# Test Suite: User Management Bugs

# Test 1: HTML Bug - Email input type
go to "html-version/index.html"
check that element "userEmail" has attribute "type" with value "email"

# Test 2: CSS Bug - Form button positioning
go to "html-version/index.html"
check that element "submitBtn" has css property "float" with value "none"
check that element "clearBtn" has css property "float" with value "none"

# Test 3: JavaScript Bug - Edit functionality
go to "html-version/index.html"
type "Test User" into "userName"
type "test@example.com" into "userEmail"
type "30" into "userAge" 
select "admin" from "userRole"
click "Add User"
wait 1 second
click "Edit" in table row 1
check that element "errorMessage" is not visible
check that "userName" field contains "Test User"
```

### Expected Results
- **Test 1:** ❌ FAIL - Email input type is "text" not "email"
- **Test 2:** ❌ FAIL - Form buttons have float properties instead of normal positioning
- **Test 3:** ❌ FAIL - Edit shows error message instead of populating form

---

## How to Fix (For Reference)

### Fix Bug 1 (HTML)
```html
<input type="email" id="userEmail" required>
```

### Fix Bug 2 (CSS) 
```css
/* Remove float properties to fix button positioning */
#submitBtn {
    /* Remove: float: left; */
}

#clearBtn {
    /* Remove: float: right; */
    /* Or add: float: none; */
}
```

### Fix Bug 3 (JavaScript)
```javascript
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userAge').value = user.age;
        document.getElementById('userRole').value = user.role;
    }
}
```
