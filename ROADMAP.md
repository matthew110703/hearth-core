# Hearth Core — Build Roadmap

> Tracked by Lucy. Each item is one day's work — small, focused, testable.
> Daily cron picks the next unchecked item, builds it, tests it, pushes only when green.

---

## Phase 1 — Foundation ✅
- [x] Fastify server + all plugins (cors, helmet, rate-limit, jwt, pino)
- [x] MongoDB connection + Mongoose setup
- [x] Environment config with Zod validation
- [x] All 5 Mongoose models (User, Person, Log, Insight, Tag)
- [x] Route skeleton (all endpoints stubbed — 501 Not Implemented)
- [x] .env.example, .gitignore

---

## Phase 2 — Auth

### Day 1 — Zod schemas + password hashing utility
- [ ] Zod schemas for register + login request bodies (src/schemas/auth.schema.js)
- [ ] Crypto utility: hashPassword(password) and verifyPassword(hash, password) using Argon2 (src/utils/crypto.js)
- [ ] Test: hash a password, verify it matches, verify wrong password fails

### Day 2 — Keypair generation + Master Key derivation
- [ ] Crypto utility: generateKeypair() → { publicKey, privateKey } using Node crypto (RSA-OAEP, 2048-bit)
- [ ] Crypto utility: deriveMasterKey(password, salt) using PBKDF2
- [ ] Crypto utility: encryptPrivateKey(privateKey, masterKey) and decryptPrivateKey(encrypted, masterKey)
- [ ] Test: generate keypair, derive master key, encrypt + decrypt private key successfully

### Day 3 — Registration endpoint
- [ ] POST /api/auth/register — validate body, hash password, generate keypair, derive master key, encrypt private key, save user
- [ ] Return: { message, userId } on success — never return the private key
- [ ] Test: register with valid body → 201, register duplicate email → 409, missing fields → 400

### Day 4 — Login endpoint
- [ ] POST /api/auth/login — validate body, find user, verify password, derive master key, decrypt private key, issue JWT access token + refresh token
- [ ] Save hashed refresh token to user document
- [ ] Return: { accessToken, refreshToken, user: { id, name, email } }
- [ ] Test: login valid → 200 + tokens, wrong password → 401, unknown email → 401

### Day 5 — Refresh token + logout
- [ ] POST /api/auth/refresh — validate refresh token, issue new access token
- [ ] POST /api/auth/logout — invalidate refresh token (clear from DB)
- [ ] Test: refresh with valid token → new access token, refresh with invalid → 401, logout clears token

---

## Phase 3 — Souls (People)

### Day 6 — Zod schemas + list souls
- [ ] Zod schemas for create/update soul request bodies (src/schemas/soul.schema.js)
- [ ] GET /api/souls — return all souls for authenticated user (id, name, occupation, createdAt)
- [ ] Test: returns empty array for new user, returns souls after creating some

### Day 7 — Create + get soul
- [ ] POST /api/souls — create soul (name required, rest optional)
- [ ] GET /api/souls/:id — get single soul, 404 if not found or belongs to another user
- [ ] Test: create → 201 + soul object, get existing → 200, get nonexistent → 404, get other user's soul → 404

### Day 8 — Update + delete soul
- [ ] PUT /api/souls/:id — update soul fields (partial update, name optional here)
- [ ] DELETE /api/souls/:id — soft delete (add deletedAt field to schema) or hard delete — decide and implement
- [ ] Test: update existing → 200, update nonexistent → 404, delete → 200, get deleted → 404

---

## Phase 4 — Echoes (Logs)

### Day 9 — Zod schemas + list echoes
- [ ] Zod schemas for create/update echo (src/schemas/echo.schema.js) — content required, peopleTagged optional array, aura optional, title optional
- [ ] GET /api/echoes — paginated list for user (default page size 20), optional ?soulId filter
- [ ] Test: empty list, list with items, filter by soulId

### Day 10 — Create echo
- [ ] POST /api/echoes — create echo, validate aura fields if present (scale 1-5, label enum)
- [ ] If peopleTagged includes a name string that doesn't exist → auto-create that soul
- [ ] Test: create minimal echo → 201, create with full aura → 201, create with new soul tag → 201 + soul auto-created

### Day 11 — Get + update echo
- [ ] GET /api/echoes/:id — single echo, 404 if not found or wrong user
- [ ] PUT /api/echoes/:id — update content, title, aura, peopleTagged
- [ ] Test: get existing → 200, get nonexistent → 404, update → 200 with updated fields

### Day 12 — Delete echo
- [ ] DELETE /api/echoes/:id — delete echo
- [ ] GET /api/souls/:id should include recentEchoes count (add to soul response)
- [ ] Test: delete → 200, get deleted → 404, soul response includes echo count

---

## Phase 5 — Traits

### Day 13 — Traits CRUD
- [ ] Zod schema for trait (src/schemas/trait.schema.js)
- [ ] GET /api/traits — list traits for user (filterable by ?scope=person|echo)
- [ ] POST /api/traits — create trait
- [ ] DELETE /api/traits/:id — delete trait
- [ ] Seed 10 predefined person traits and 5 echo traits on user registration
- [ ] Test: list → includes predefined, create custom → 201, delete → 200

---

## Phase 6 — Sparks (Insights)

### Day 14 — User-created sparks
- [ ] Zod schema for spark (src/schemas/spark.schema.js)
- [ ] GET /api/sparks — list sparks for user (filterable by ?soulId, ?type=person|user)
- [ ] POST /api/sparks — user creates a spark manually (source: 'user')
- [ ] GET /api/sparks/:id — single spark
- [ ] Test: create → 201, list → returns spark, filter by soulId → works

---

## Phase 7 — AI / Essence Pipeline

### Day 15 — Essence file manager
- [ ] Utility: createEssenceFile(userId, soulId?) — creates blank Essence .md file in ~/.hearth-data/essences/
- [ ] Utility: readEssenceFile(path) → plaintext string
- [ ] Utility: appendToEssenceFile(path, { userNotes, aiInsights, date }) — append-only, dated, user/AI sections clearly separated
- [ ] Test: create, read, append multiple times — structure stays valid

### Day 16 — Anthropic integration
- [ ] Utility: generateEssenceUpdate(currentEssence, newEcho) → updated essence string via Anthropic API
- [ ] Prompt engineering: observation-based, not verdict-based. Never judgmental.
- [ ] Test: mock Anthropic call, verify prompt shape is correct, verify response is handled gracefully

### Day 17 — Async Essence update queue
- [ ] On POST /api/echoes — after saving, trigger async Essence update (don't block the response)
- [ ] Queue with basic concurrency control — if same soul's Essence is already updating, defer
- [ ] Re-encrypt Essence immediately after AI returns — plaintext never persists to disk
- [ ] Test: create echo → response is immediate (not waiting for AI), Essence file updates in background

### Day 18 — On-demand Spark generation
- [ ] POST /api/sparks/generate — trigger AI to generate a spark for a soul based on their Essence
- [ ] Save result as a new spark (source: 'ai'), encrypted
- [ ] Test: generate for a soul with Essence data → returns spark + saves it

---

## Phase 8 — Notifications

### Day 19 — Firebase setup + push utility
- [ ] Firebase Admin SDK init (src/config/firebase.js)
- [ ] Utility: sendPushNotification(fcmToken, { title, body })
- [ ] Add fcmToken field to User model
- [ ] POST /api/auth/fcm-token — save FCM token for user
- [ ] Test: FCM token saved, utility called correctly (mock Firebase)

### Day 20 — Push on new AI Spark
- [ ] After AI generates a spark → send push notification to user
- [ ] Test: spark generation triggers notification (mock)

---

## Phase 9 — Hardening

### Day 21 — Global error handler + validation formatting
- [ ] Centralized error handler (src/utils/errorHandler.js)
- [ ] Consistent error response shape: { error, message, statusCode }
- [ ] Zod validation errors formatted cleanly (field-level messages, not raw Zod output)
- [ ] Test: hit endpoint with bad body → clean error shape, not raw stack trace

### Day 22 — Rate limit tuning + security audit
- [ ] Tighten rate limits on auth routes (stricter than general API)
- [ ] Review all routes: no route leaks other users' data
- [ ] Ensure all protected routes reject without valid JWT
- [ ] Test: auth rate limit → 429 after N requests, cross-user data access → 404

### Day 23 — Index audit + query optimisation
- [ ] Review all Mongoose queries — ensure indexes are used
- [ ] Add any missing compound indexes
- [ ] Pagination on list endpoints uses cursor or skip/limit consistently

### Day 24 — Integration test pass
- [ ] Full happy-path test: register → login → create soul → create echo → list echoes → get soul with echo count → create spark
- [ ] Full sad-path test: bad auth, missing fields, wrong user access
