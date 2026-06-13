# Hearth Core — Build Roadmap

> Tracked by Lucy. Daily cron picks the next unchecked item, builds it, pushes, and reports to Matt.

## Phase 1 — Foundation ✅
- [x] Fastify server + all plugins (cors, helmet, rate-limit, jwt, pino)
- [x] MongoDB connection + Mongoose setup
- [x] Environment config with Zod validation
- [x] All 5 Mongoose models (User, Person, Log, Insight, Tag)
- [x] Route skeleton (all endpoints stubbed — 501 Not Implemented)
- [x] .env.example, .gitignore

## Phase 2 — Auth
- [ ] Registration: Argon2 hash + keypair generation + encrypted private key storage
- [ ] Login: re-derive Master Key, decrypt Private Key, issue JWT + refresh token
- [ ] Refresh token route
- [ ] Auth middleware (already wired as decorator, needs full flow)
- [ ] Zod validation schemas for auth request bodies

## Phase 3 — Souls (People) CRUD
- [ ] GET /api/souls — list all souls for user
- [ ] POST /api/souls — create soul
- [ ] GET /api/souls/:id — get soul + recent echoes summary
- [ ] PUT /api/souls/:id — update soul
- [ ] DELETE /api/souls/:id — soft delete

## Phase 4 — Echoes (Logs) CRUD
- [ ] GET /api/echoes — list echoes (paginated, filterable by soul)
- [ ] POST /api/echoes — create echo (with optional soul tags + aura)
- [ ] GET /api/echoes/:id — get single echo
- [ ] PUT /api/echoes/:id — update echo
- [ ] DELETE /api/echoes/:id — delete echo
- [ ] Auto-create soul when tagging unknown name

## Phase 5 — Traits
- [ ] GET /api/traits — list traits for user
- [ ] POST /api/traits — create trait
- [ ] DELETE /api/traits/:id — delete trait
- [ ] Seed predefined traits on user registration

## Phase 6 — Sparks (Insights)
- [ ] GET /api/sparks — list sparks (filterable by soul)
- [ ] POST /api/sparks — user-created spark
- [ ] GET /api/sparks/:id — single spark

## Phase 7 — AI / Essence Pipeline
- [ ] Essence file manager (create, read, append per soul + per user)
- [ ] Anthropic integration — summarise + update Essence on new Echo
- [ ] Async queue — batch Essence updates (avoid per-Echo API call blocking)
- [ ] On-demand Spark generation via AI

## Phase 8 — Notifications
- [ ] Firebase Admin setup
- [ ] FCM push hook (trigger on new AI Spark)

## Phase 9 — Hardening
- [ ] Global error handler
- [ ] Request validation error formatting
- [ ] Rate limit tuning
- [ ] Index audit
- [ ] Integration tests (auth + core flows)
