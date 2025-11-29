# Entity Relationship Diagram (ERD)

![ERD](/screenshots/erd.svg)

---

## Models and Relationships

### Models

| Model                  | Namespace                           |
| ---------------------- | ----------------------------------- |
| Cart                   | `App\Models\Cart`                   |
| CartItem               | `App\Models\CartItem`               |
| Category               | `App\Models\Category`               |
| Delivery               | `App\Models\Delivery`               |
| DeliveryDay            | `App\Models\DeliveryDay`            |
| JobApplication         | `App\Models\JobApplication`         |
| JobPost                | `App\Models\JobPost`                |
| MenuCategory           | `App\Models\MenuCategory`           |
| MenuItem               | `App\Models\MenuItem`               |
| NotificationPreference | `App\Models\NotificationPreference` |
| Offer                  | `App\Models\Offer`                  |
| Order                  | `App\Models\Order`                  |
| OrderItem              | `App\Models\OrderItem`              |
| Permission             | `App\Models\Permission`             |
| Restaurant             | `App\Models\Restaurant`             |
| Review                 | `App\Models\Review`                 |
| Role                   | `App\Models\Role`                   |
| User                   | `App\Models\User`                   |

---

# Entity Relationship Diagram

## Entities

### Cart (`App\Models\Cart`)

#### Attributes:

- `id` (uuid)
- `user_id` (uuid)
- `restaurant_id` (uuid)
- `cart_total` (numeric)
- `total_items` (int4)
- `total_unique_items` (int4)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### CartItem (`App\Models\CartItem`)

#### Attributes:

- `id` (uuid)
- `cart_id` (uuid)
- `menu_item_id` (uuid)
- `quantity` (int4)
- `item_total` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Category (`App\Models\Category`)

#### Attributes:

- `id` (uuid)
- `name` (varchar)
- `slug` (varchar)
- `image` (varchar)
- `is_default` (bool)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Delivery (`App\Models\Delivery`)

#### Attributes:

- `id` (uuid)
- `order_id` (uuid)
- `rider_id` (uuid)
- `rider_first_name` (varchar)
- `rider_last_name` (varchar)
- `rider_phone_number` (varchar)
- `delivered_at` (timestamp)
- `cancelled_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### DeliveryDay (`App\Models\DeliveryDay`)

#### Attributes:

- `id` (uuid)
- `restaurant_id` (uuid)
- `day` (varchar)
- `start_time` (time)
- `end_time` (time)
- `order` (int4)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### JobApplication (`App\Models\JobApplication`)

#### Attributes:

- `id` (uuid)
- `job_post_id` (uuid)
- `rider_id` (uuid)
- `first_name` (varchar)
- `last_name` (varchar)
- `email` (varchar)
- `phone_number` (varchar)
- `resume` (varchar)
- `status` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### JobPost (`App\Models\JobPost`)

#### Attributes:

- `id` (uuid)
- `restaurant_id` (uuid)
- `title` (varchar)
- `description_html` (text)
- `description_text` (text)
- `employment_type` (varchar)
- `salary` (numeric)
- `status` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### MenuCategory (`App\Models\MenuCategory`)

#### Attributes:

- `id` (uuid)
- `restaurant_id` (uuid)
- `name` (varchar)
- `description` (text)
- `order` (int4)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### MenuItem (`App\Models\MenuItem`)

#### Attributes:

- `id` (uuid)
- `menu_category_id` (uuid)
- `name` (varchar)
- `description` (text)
- `price` (numeric)
- `image` (varchar)
- `is_available` (bool)
- `order` (int4)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### NotificationPreference (`App\Models\NotificationPreference`)

#### Attributes:

- `id` (uuid)
- `user_id` (uuid)
- `type` (varchar)
- `enabled` (bool)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Offer (`App\Models\Offer`)

#### Attributes:

- `id` (uuid)
- `restaurant_id` (uuid)
- `discount_rate` (numeric)
- `min_discount_amount` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Order (`App\Models\Order`)

#### Attributes:

- `id` (uuid)
- `user_id` (uuid)
- `restaurant_id` (uuid)
- `order_code` (int4)
- `first_name` (varchar)
- `last_name` (varchar)
- `phone_number` (varchar)
- `street_address` (varchar)
- `building_number` (varchar)
- `postcode` (varchar)
- `city` (varchar)
- `state` (varchar)
- `country` (varchar)
- `delivery_time` (timestamp)
- `notes` (varchar)
- `payment_method` (varchar)
- `subtotal` (numeric)
- `delivery_fee` (numeric)
- `service_fee` (numeric)
- `discount_rate` (numeric)
- `discount` (numeric)
- `total` (numeric)
- `status` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### OrderItem (`App\Models\OrderItem`)

#### Attributes:

- `id` (uuid)
- `order_id` (uuid)
- `menu_item_id` (uuid)
- `name` (varchar)
- `quantity` (int4)
- `item_total` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Permission (`App\Models\Permission`)

#### Attributes:

- `uuid` (uuid)
- `name` (varchar)
- `guard_name` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Restaurant (`App\Models\Restaurant`)

#### Attributes:

- `id` (uuid)
- `name` (varchar)
- `slug` (varchar)
- `description` (text)
- `street_address` (varchar)
- `building_number` (varchar)
- `postcode` (varchar)
- `city` (varchar)
- `state` (varchar)
- `country` (varchar)
- `latitude` (float8)
- `longitude` (float8)
- `phone_number` (varchar)
- `email` (varchar)
- `min_amount` (numeric)
- `delivery_fee` (numeric)
- `service_fee` (numeric)
- `min_delivery_time` (int2)
- `max_delivery_time` (int2)
- `logo` (varchar)
- `cover` (varchar)
- `is_approved` (bool)
- `force_close` (bool)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Review (`App\Models\Review`)

#### Attributes:

- `id` (uuid)
- `user_id` (uuid)
- `restaurant_id` (uuid)
- `order_id` (uuid)
- `comment` (varchar)
- `rating` (int4)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Role (`App\Models\Role`)

#### Attributes:

- `uuid` (uuid)
- `name` (varchar)
- `guard_name` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### User (`App\Models\User`)

#### Attributes:

- `id` (uuid)
- `first_name` (varchar)
- `last_name` (varchar)
- `email` (varchar)
- `email_verified_at` (timestamp)
- `password` (varchar)
- `profile_picture` (varchar)
- `date_of_birth` (date)
- `phone_number` (varchar)
- `street_address` (varchar)
- `building_number` (varchar)
- `postcode` (varchar)
- `city` (varchar)
- `state` (varchar)
- `country` (varchar)
- `vehicle_type` (varchar)
- `drivers_license` (varchar)
- `is_approved` (bool)
- `remember_token` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Relationships

### Cart Relationships

- **BelongsTo** `customer` to User (Local Key: `user_id`, Foreign Key: `id`)
- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)
- **HasMany** `cartItems` to CartItem (Local Key: `id`, Foreign Key: `cart_id`)

### CartItem Relationships

- **BelongsTo** `cart` to Cart (Local Key: `cart_id`, Foreign Key: `id`)
- **BelongsTo** `menuItem` to MenuItem (Local Key: `menu_item_id`, Foreign Key: `id`)

### Category Relationships

- **BelongsToMany** `restaurants` to Restaurant (Local Key: `, Foreign Key: `)

### Delivery Relationships

- **BelongsTo** `order` to Order (Local Key: `order_id`, Foreign Key: `id`)
- **BelongsTo** `rider` to User (Local Key: `rider_id`, Foreign Key: `id`)

### DeliveryDay Relationships

- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)

### JobApplication Relationships

- **BelongsTo** `jobPost` to JobPost (Local Key: `job_post_id`, Foreign Key: `id`)
- **BelongsTo** `rider` to User (Local Key: `user_id`, Foreign Key: `id`)

### JobPost Relationships

- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)
- **HasMany** `jobApplications` to JobApplication (Local Key: `id`, Foreign Key: `job_post_id`)

### MenuCategory Relationships

- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)
- **HasMany** `menuItems` to MenuItem (Local Key: `id`, Foreign Key: `menu_category_id`)

### MenuItem Relationships

- **BelongsTo** `menuCategory` to MenuCategory (Local Key: `menu_category_id`, Foreign Key: `id`)
- **HasMany** `cartItems` to CartItem (Local Key: `id`, Foreign Key: `menu_item_id`)
- **HasMany** `orderItems` to OrderItem (Local Key: `id`, Foreign Key: `menu_item_id`)

### NotificationPreference Relationships

- **BelongsTo** `user` to User (Local Key: `user_id`, Foreign Key: `id`)

### Offer Relationships

- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)

### Order Relationships

- **BelongsTo** `customer` to User (Local Key: `user_id`, Foreign Key: `id`)
- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)
- **HasMany** `orderItems` to OrderItem (Local Key: `id`, Foreign Key: `order_id`)
- **HasOne** `delivery` to Delivery (Local Key: `id`, Foreign Key: `order_id`)

### OrderItem Relationships

- **BelongsTo** `order` to Order (Local Key: `order_id`, Foreign Key: `id`)
- **BelongsTo** `menuItem` to MenuItem (Local Key: `menu_item_id`, Foreign Key: `id`)

### Restaurant Relationships

- **BelongsToMany** `partners` to User (Local Key: `, Foreign Key: `)
- **BelongsToMany** `riders` to User (Local Key: `, Foreign Key: `)
- **BelongsToMany** `categories` to Category (Local Key: `, Foreign Key: `)
- **HasMany** `deliveryDays` to DeliveryDay (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `offers` to Offer (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `menuCategories` to MenuCategory (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `reviews` to Review (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `carts` to Cart (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `orders` to Order (Local Key: `id`, Foreign Key: `restaurant_id`)
- **HasMany** `jobPosts` to JobPost (Local Key: `id`, Foreign Key: `restaurant_id`)

### Review Relationships

- **BelongsTo** `customer` to User (Local Key: `user_id`, Foreign Key: `id`)
- **BelongsTo** `restaurant` to Restaurant (Local Key: `restaurant_id`, Foreign Key: `id`)
- **BelongsTo** `order` to Order (Local Key: `order_id`, Foreign Key: `id`)

### User Relationships

- **BelongsToMany** `restaurants` to Restaurant (Local Key: `, Foreign Key: `)
- **HasMany** `notificationPreferences` to NotificationPreference (Local Key: `id`, Foreign Key: `user_id`)
- **HasMany** `reviews` to Review (Local Key: `id`, Foreign Key: `user_id`)
- **HasMany** `carts` to Cart (Local Key: `id`, Foreign Key: `user_id`)
- **HasMany** `orders` to Order (Local Key: `id`, Foreign Key: `user_id`)
- **BelongsToMany** `ownedRestaurants` to Restaurant (Local Key: `, Foreign Key: `)
- **BelongsToMany** `coOwnedRestaurants` to Restaurant (Local Key: `, Foreign Key: `)
- **BelongsToMany** `riderRestaurants` to Restaurant (Local Key: `, Foreign Key: `)
- **HasMany** `jobApplications` to JobApplication (Local Key: `id`, Foreign Key: `user_id`)
- **MorphToMany** `roles` to Role (Local Key: `, Foreign Key: `)
- **MorphToMany** `permissions` to Permission (Local Key: `, Foreign Key: `)
