# Database Schema Design

Based on the requirements, here is the relational database schema design.

## 1. User & Authentication

### `users`
Stores core user information.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `username` | VARCHAR(50) | Unique, Not Null | Immutable after registration |
| `nickname` | VARCHAR(50) | Not Null | Display name (editable) |
| `email` | VARCHAR(255) | Unique, Not Null | |
| `password_hash` | VARCHAR(255) | Not Null | |
| `avatar` | VARCHAR(255) | | URL to avatar image |
| `bio` | TEXT | | Personal introduction |
| `role` | ENUM | Default 'user' | 'user', 'creator', 'admin' |
| `level` | INT | Default 0 | 0-9 |
| `lightning` | INT | Default 0 | Experience points (Level progress) |
| `drops` | INT | Default 0 | Currency (Water droplets) |
| `invite_code` | CHAR(8) | Unique, Not Null | Random generated 8-char code |
| `inviter_id` | BIGINT | FK -> users.id | Who invited this user |
| `status` | ENUM | Default 'active' | 'active', 'banned' |
| `ban_reason` | TEXT | | Reason for ban (shown on profile) |
| `registration_ip` | VARCHAR(45) | | IPv4 or IPv6 |
| `created_at` | TIMESTAMP | Default NOW | |
| `updated_at` | TIMESTAMP | Default NOW | |
| `last_login_at` | TIMESTAMP | | Used for daily login calculation |

### `user_tags`
Admin tags for users.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `tag_name` | VARCHAR(50) | Not Null | |
| `created_by` | BIGINT | FK -> users.id | Admin who added the tag |

## 2. Map & Content

### `maps`
Stores map information.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `title` | VARCHAR(100) | Not Null | |
| `description` | TEXT | | |
| `cover_image` | VARCHAR(255) | | URL |
| `file_url` | VARCHAR(255) | Not Null | URL to map file |
| `author_id` | BIGINT | FK -> users.id | |
| `type` | ENUM | Not Null | 'original', 'repost' |
| `original_author` | VARCHAR(100) | | Required if repost |
| `original_link` | VARCHAR(255) | | Required if repost |
| `auth_proof` | VARCHAR(255) | | URL to permission screenshot (repost) |
| `status` | ENUM | Default 'pending' | 'pending', 'approved', 'rejected' |
| `reject_reason` | TEXT | | |
| `download_cost` | INT | Default 0 | Cost in Drops (1-10) |
| `views` | INT | Default 0 | |
| `created_at` | TIMESTAMP | Default NOW | |
| `updated_at` | TIMESTAMP | Default NOW | |

### `map_likes`
Tracks user likes (1 user = 1 like per map).

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `map_id` | BIGINT | FK -> maps.id | |
| `created_at` | TIMESTAMP | Default NOW | |

### `map_favorites`
User collections.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `map_id` | BIGINT | FK -> maps.id | |
| `created_at` | TIMESTAMP | Default NOW | |

### `map_downloads`
Tracks downloads to prevent double-charging on the same day.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `map_id` | BIGINT | FK -> maps.id | |
| `cost_paid` | INT | | Amount paid |
| `created_at` | TIMESTAMP | Default NOW | |

### `map_donations`
Tracks tips/donations to maps.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | Donor |
| `map_id` | BIGINT | FK -> maps.id | |
| `amount` | INT | Not Null | Drops amount |
| `created_at` | TIMESTAMP | Default NOW | |

## 3. Economy & Tasks

### `transactions`
Audit log for all currency/experience changes.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `type` | ENUM | Not Null | 'checkin', 'invite', 'task_login', 'task_view', 'task_like', 'task_donate', 'map_sold', 'map_reward', 'sys_grant' |
| `change_drops` | INT | Default 0 | + or - amount |
| `change_lightning` | INT | Default 0 | + or - amount |
| `related_id` | BIGINT | | ID of related map/user/log |
| `description` | VARCHAR(255) | | e.g. "Daily Check-in", "Map Download Income" |
| `created_at` | TIMESTAMP | Default NOW | |

### `daily_task_logs`
Tracks daily limits for tasks. Reset or create new row daily.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `date` | DATE | Not Null | e.g. 2023-10-27 |
| `view_count` | INT | Default 0 | Max 5 |
| `like_count` | INT | Default 0 | Max 5 |
| `donate_drops` | INT | Default 0 | Max 5 |
| `is_checked_in` | BOOLEAN | Default FALSE | |
| `login_rewarded` | BOOLEAN | Default FALSE | |

## 4. System & Management

### `exam_questions`
Question bank for Lv0 -> Lv1 exam.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `question` | TEXT | Not Null | |
| `options` | JSON | Not Null | Array of strings |
| `correct_index` | INT | Not Null | Index of correct option |
| `score` | INT | Default 1 | |

### `exam_attempts`
Records of users taking the exam.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `score` | INT | Not Null | |
| `passed` | BOOLEAN | Not Null | Score >= 60 |
| `created_at` | TIMESTAMP | Default NOW | |

### `reports`
User reports.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `reporter_id` | BIGINT | FK -> users.id | |
| `target_type` | ENUM | Not Null | 'map', 'user' |
| `target_id` | BIGINT | Not Null | |
| `reason` | VARCHAR(255) | | |
| `status` | ENUM | Default 'pending' | 'pending', 'verified', 'no_violation', 'observing' |
| `admin_note` | TEXT | | |
| `created_at` | TIMESTAMP | Default NOW | |
| `updated_at` | TIMESTAMP | Default NOW | |

### `creator_applications`
Records of users applying to be creators.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `user_id` | BIGINT | FK -> users.id | |
| `status` | ENUM | Default 'pending' | 'pending', 'approved', 'rejected' |
| `reason` | TEXT | | Reject reason |
| `created_at` | TIMESTAMP | Default NOW | |
| `updated_at` | TIMESTAMP | Default NOW | |

### `notices`
Announcements and notifications.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `title` | VARCHAR(255) | Not Null | |
| `content` | TEXT | Not Null | |
| `type` | ENUM | Not Null | 'announcement', 'notification' |
| `target_type` | ENUM | Default 'all' | 'all', 'group', 'user' |
| `target_id` | BIGINT | | If target is user |
| `created_at` | TIMESTAMP | Default NOW | |

### `smtp_configs`
Rotational SMTP settings.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | BIGINT | PK, Auto Increment | |
| `host` | VARCHAR(255) | Not Null | |
| `port` | INT | Not Null | |
| `username` | VARCHAR(255) | Not Null | |
| `password` | VARCHAR(255) | Not Null | |
| `daily_limit` | INT | Default 100 | Max emails per day |
| `today_sent` | INT | Default 0 | |
| `last_reset` | DATE | | When today_sent was last reset |
| `is_active` | BOOLEAN | Default TRUE | |

### `system_configs`
Dynamic system settings.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `key` | VARCHAR(50) | PK | e.g. 'registration_enabled', 'ip_reg_limit', 'level_thresholds' |
| `value` | TEXT | | JSON value or string |
| `description` | VARCHAR(255) | | |

## 5. Relationships & Constraints Summary

- **Users**: Unique `username`, `email`, `invite_code`.
- **Maps**: `author_id` links to `Users`. `status` controls visibility.
- **Daily Task Limits**: Logic should check `daily_task_logs` before awarding rewards.
- **Downloads**: Logic should check `map_downloads` with `created_at` = today before deducting drops.
- **Invites**: `inviter_id` is self-referencing FK on `Users`.
- **Leveling**: Store current `lightning` and `level` on `Users`. Recalculate level on `lightning` change based on `system_configs` thresholds.
