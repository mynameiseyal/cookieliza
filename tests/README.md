# API Testing with Playwright

This directory contains API tests for the CookieLiza application, focusing on the admin authentication system.

## Setup

1. Install dependencies (including Playwright):
```bash
npm install
```

2. Install Playwright browsers (optional for API tests, but recommended for future UI tests):
```bash
npx playwright install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
ADMIN_PASSWORD=your-admin-password-here
```

Or export it directly in your terminal:
```bash
export ADMIN_PASSWORD=your-admin-password-here
```

**Important:** The password must match the password configured on Vercel in production.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests with specific options
```bash
# Run only API tests
npx playwright test tests/admin-api.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with verbose output
npx playwright test --reporter=list
```

### View test report
After running tests, view the HTML report:
```bash
npm run test:report
```

## Test Coverage

### Admin API Authentication (`admin-api.spec.ts`)

**Authentication Flow:**
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Login with missing password
- ✅ Session validation with valid token
- ✅ Session validation with invalid token
- ✅ Logout functionality
- ✅ Session invalidation after logout

**Route Protection:**
- ✅ Redirect to login when accessing protected routes without authentication
- ✅ Allow access to protected routes with valid session

**Security & Edge Cases:**
- ✅ Concurrent login attempts
- ✅ Rate limiting on failed login attempts (brute force protection)
- ✅ Malformed JSON handling
- ✅ Empty request body handling
- ✅ SQL injection attempt protection
- ✅ XSS attempt protection
- ✅ Expired session cookie rejection

## API Endpoints Tested

### POST `/api/admin/auth`
**Purpose:** Login
**Request Body:**
```json
{
  "password": "string"
}
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "Authenticated successfully"
}
```
**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### GET `/api/admin/auth`
**Purpose:** Validate session
**Headers:** `Cookie: admin-session=<token>`
**Success Response (200):**
```json
{
  "authenticated": true
}
```
**Error Response (401):**
```json
{
  "authenticated": false
}
```

### DELETE `/api/admin/auth`
**Purpose:** Logout
**Headers:** `Cookie: admin-session=<token>`
**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Testing Against Production

The tests are configured to run against `https://cookieliza.vercel.app` by default. You can change the `BASE_URL` in `tests/admin-api.spec.ts` to test against:
- Local development: `http://localhost:3000`
- Staging: Your staging URL
- Production: `https://cookieliza.vercel.app`

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run API Tests
  run: |
    npm ci
    npx playwright install --with-deps
    npm test
  env:
    ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
```

## Test Structure

Each test follows the Arrange-Act-Assert pattern:
1. **Arrange:** Set up test data and prerequisites
2. **Act:** Execute the API call
3. **Assert:** Verify the response status, headers, and body

## Best Practices

- Tests are isolated and can run in any order
- Each test cleans up after itself (e.g., logout after login)
- Tests use environment variables for sensitive data
- Tests verify both happy paths and error cases
- Security-focused tests ensure protection against common attacks

## Troubleshooting

**Tests failing with 401 errors:**
- Verify your `ADMIN_PASSWORD` environment variable matches the deployed password
- Check that the Vercel environment variables are set correctly

**Tests timing out:**
- Check that the application is accessible at the BASE_URL
- Verify network connectivity
- Increase timeout in `playwright.config.ts` if needed

**Rate limiting errors:**
- The brute force protection test expects a 1-second delay
- If this test is flaky, adjust the tolerance in the assertion

## Future Test Additions

Consider adding tests for:
- Payment API endpoints
- Order creation and management
- Product CRUD operations
- Customer data handling
- Analytics data retrieval

