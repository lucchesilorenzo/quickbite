# Entity Relationship Diagram (ERD)

![ERD](/screenshots/erd.svg)

---

## Models and Relationships

### Models

| Model            | Namespace                     |
| ---------------- | ----------------------------- |
| Cart             | `App\Models\Cart`             |
| CartItem         | `App\Models\CartItem`         |
| Category         | `App\Models\Category`         |
| Delivery         | `App\Models\Delivery`         |
| MenuCategory     | `App\Models\MenuCategory`     |
| MenuItem         | `App\Models\MenuItem`         |
| Order            | `App\Models\Order`            |
| OrderItem        | `App\Models\OrderItem`        |
| Permission       | `App\Models\Permission`       |
| Restaurant       | `App\Models\Restaurant`       |
| DeliveryDay      | `App\Models\DeliveryDay`      |
| RestaurantOffer  | `App\Models\RestaurantOffer`  |
| RestaurantReview | `App\Models\RestaurantReview` |
| Role             | `App\Models\Role`             |
| User             | `App\Models\User`             |

---

### Relationships

#### Cart

- **BelongsTo** `customer` (User) via `user_id`
- **BelongsTo** `restaurant` via `restaurant_id`
- **HasMany** `cartItems` (CartItem) via `cart_id`

#### CartItem

- **BelongsTo** `cart` via `cart_id`
- **BelongsTo** `menuItem` via `menu_item_id`

#### Category

- **BelongsToMany** `restaurants`

#### Delivery

- **BelongsTo** `order` via `order_id`
- **BelongsTo** `rider` (User) via `user_id`

#### MenuCategory

- **BelongsTo** `restaurant` via `restaurant_id`
- **HasMany** `menuItems` via `menu_category_id`

#### MenuItem

- **BelongsTo** `menuCategory` via `menu_category_id`
- **HasMany** `cartItems` via `menu_item_id`
- **HasMany** `orderItems` via `menu_item_id`

#### Order

- **BelongsTo** `customer` (User) via `user_id`
- **BelongsTo** `restaurant` via `restaurant_id`
- **HasOne** `delivery` via `order_id`
- **HasMany** `orderItems` via `order_id`

#### OrderItem

- **BelongsTo** `order` via `order_id`
- **BelongsTo** `menuItem` via `menu_item_id`

#### Restaurant

- **BelongsToMany** `partners` (User)
- **BelongsToMany** `riders` (User)
- **BelongsToMany** `categories`
- **HasMany** `deliveryDays` (DeliveryDay) via `restaurant_id`
- **HasMany** `offers` (RestaurantOffer) via `restaurant_id`
- **HasMany** `menuCategories` via `restaurant_id`
- **HasMany** `reviews` (RestaurantReview) via `restaurant_id`
- **HasMany** `carts` via `restaurant_id`
- **HasMany** `orders` via `restaurant_id`

#### DeliveryDay

- **BelongsTo** `restaurant` via `restaurant_id`

#### RestaurantOffer

- **BelongsTo** `restaurant` via `restaurant_id`

#### RestaurantReview

- **BelongsTo** `customer` (User) via `user_id`
- **BelongsTo** `restaurant` via `restaurant_id`
- **BelongsTo** `order` via `order_id`

#### User

- **HasMany** `reviews` (RestaurantReview) via `user_id`
- **HasMany** `carts` via `user_id`
- **HasMany** `orders` via `user_id`
- **BelongsToMany** `ownedRestaurants` (Restaurant)
- **BelongsToMany** `coOwnedRestaurants` (Restaurant)
- **BelongsToMany** `riderRestaurants` (Restaurant)
- **MorphToMany** `roles` (Role)
- **MorphToMany** `permissions` (Permission)

---

## Relationship Legend

- **BelongsTo**: This model holds the foreign key referencing another model.
- **HasMany**: The related model holds a foreign key pointing back to this model.
- **BelongsToMany**: Many-to-many relationship through a pivot table.
- **MorphToMany**: Polymorphic many-to-many relationship.
