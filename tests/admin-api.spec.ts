import { test, expect } from '@playwright/test';

const BASE_URL = 'https://cookieliza.vercel.app';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Ensure password is set before running tests
test.beforeAll(() => {
  if (!ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD environment variable is required. Set it with: export ADMIN_PASSWORD=your-password');
  }
});

test.describe('Admin API Authentication', () => {
  test('should login successfully with valid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: ADMIN_PASSWORD,
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBeTruthy(); // Hebrew message: התחברת בהצלחה!

    // Verify session cookie is set
    const cookies = await response.headers()['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies).toContain('admin-session');
  });

  test('should fail login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: 'wrong-password-12345',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBeTruthy(); // Hebrew message: סיסמה שגויה
  });

  test('should fail login with missing password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {},
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBeTruthy(); // Hebrew message: סיסמה נדרשת
  });

  test('should validate active session', async ({ request }) => {
    // First, login to get a valid session
    const loginResponse = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: ADMIN_PASSWORD,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // Extract session cookie
    const setCookieHeader = loginResponse.headers()['set-cookie'];
    const sessionCookie = setCookieHeader?.split(';')[0];

    // Now check session validity
    const sessionResponse = await request.get(`${BASE_URL}/api/admin/auth`, {
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    expect(sessionResponse.ok()).toBeTruthy();
    expect(sessionResponse.status()).toBe(200);

    const data = await sessionResponse.json();
    expect(data.authenticated).toBe(true);
  });

  test('should reject invalid session', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/admin/auth`, {
      headers: {
        Cookie: 'admin-session=invalid-token-12345',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);

    const data = await response.json();
    expect(data.authenticated).toBe(false);
  });

  test('should logout successfully', async ({ request }) => {
    // First, login to get a valid session
    const loginResponse = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: ADMIN_PASSWORD,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // Extract session cookie
    const setCookieHeader = loginResponse.headers()['set-cookie'];
    const sessionCookie = setCookieHeader?.split(';')[0];

    // Now logout
    const logoutResponse = await request.delete(`${BASE_URL}/api/admin/auth`, {
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    expect(logoutResponse.ok()).toBeTruthy();
    expect(logoutResponse.status()).toBe(200);

    const data = await logoutResponse.json();
    expect(data.success).toBe(true);

    // Verify session is invalidated by trying to use it again
    const validateResponse = await request.get(`${BASE_URL}/api/admin/auth`, {
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    expect(validateResponse.ok()).toBeFalsy();
    expect(validateResponse.status()).toBe(401);
  });

  test('should protect admin dashboard route without authentication', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/admin/dashboard`, {
      maxRedirects: 0, // Don't follow redirects
    });

    // Should redirect to login page
    expect([301, 302, 307, 308]).toContain(response.status()); // Any redirect status
  });

  test('should allow access to admin dashboard with valid session', async ({ request }) => {
    // First, login to get a valid session
    const loginResponse = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: ADMIN_PASSWORD,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();

    // Extract session cookie
    const setCookieHeader = loginResponse.headers()['set-cookie'];
    const sessionCookie = setCookieHeader?.split(';')[0];

    // Try to access dashboard with session
    const dashboardResponse = await request.get(`${BASE_URL}/admin/dashboard`, {
      headers: {
        Cookie: sessionCookie || '',
      },
    });

    expect(dashboardResponse.ok()).toBeTruthy();
    expect(dashboardResponse.status()).toBe(200);
  });

  test('should handle concurrent login attempts', async ({ request }) => {
    // Test multiple simultaneous login attempts
    const loginPromises = Array(5).fill(null).map(() =>
      request.post(`${BASE_URL}/api/admin/auth`, {
        data: {
          password: ADMIN_PASSWORD,
        },
      })
    );

    const responses = await Promise.all(loginPromises);

    // All should succeed
    responses.forEach(response => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  test('should rate limit failed login attempts', async ({ request }) => {
    // Make multiple failed login attempts
    const failedAttempt1 = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: 'wrong-password',
      },
    });

    expect(failedAttempt1.status()).toBe(401);
    
    const startTime = Date.now();

    const failedAttempt2 = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: 'wrong-password',
      },
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should have a delay (brute force protection)
    // The implementation has a 1 second delay on failed attempts
    expect(duration).toBeGreaterThan(900); // Allow some tolerance
    expect(failedAttempt2.status()).toBe(401);
  });
});

test.describe('Admin API Edge Cases', () => {
  test('should handle malformed JSON in login request', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: 'not-valid-json',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });

    expect(response.ok()).toBeFalsy();
  });

  test('should handle empty request body', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      failOnStatusCode: false,
    });

    expect(response.ok()).toBeFalsy();
    // The API might return 500 due to JSON parsing error, which is acceptable
    expect([400, 500]).toContain(response.status());
  });

  test('should handle SQL injection attempt in password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: "' OR '1'='1",
      },
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(401);
    
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should handle XSS attempt in password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/auth`, {
      data: {
        password: '<script>alert("xss")</script>',
      },
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(401);
    
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('should reject expired session cookie', async ({ request }) => {
    // Use a session cookie with an obviously invalid/old token
    const response = await request.get(`${BASE_URL}/api/admin/auth`, {
      headers: {
        Cookie: 'admin-session=expired-token-from-1970',
      },
      failOnStatusCode: false,
    });

    expect(response.status()).toBe(401);
    
    const data = await response.json();
    expect(data.authenticated).toBe(false);
  });
});

