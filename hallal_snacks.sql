-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2026 at 09:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hallal_snacks`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `items` text DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_email`, `items`, `total_price`, `status`, `created_at`) VALUES
(1, 'ramiyounis@gmail.com', '[{\"id\":3,\"name\":\"Cheese Chicken\",\"price\":\"5.50\",\"ingredients\":\"fries, coleslaw, chicken grilled breast, mozerlla cheese, mozerlla slice, cheddar slice, ketchup sauce, cheddar sauce, couktail sauce\",\"image_url\":\"/assets/Menu-items/ChickenBurger/cheese-chicken.jpeg\",\"category\":\"ChickenBurger\",\"imageUrl\":\"/assets/Menu-items/ChickenBurger/cheese-chicken.jpeg\",\"quantity\":1}]', 5.50, 'Pending', '2026-01-01 19:06:35'),
(2, 'reemalyaman@gmail.com', '[{\"id\":21,\"name\":\"Boneless\",\"price\":\"7.00\",\"ingredients\":\"tomato, pickels, iceberg, mozerlla cheese, turkey, cheddar slice, crispy, chipshotdog, bbq sauce, couktail sauce\",\"image_url\":\"/assets/Menu-items/Sandwiches/Boneless.jpeg\",\"category\":\"Sandwiches\",\"imageUrl\":\"/assets/Menu-items/Sandwiches/Boneless.jpeg\",\"quantity\":2},{\"id\":20,\"name\":\"Crispy Hotdog\",\"price\":\"6.00\",\"ingredients\":\"breaded hotdog, onion, pepper, pickles, khardal, meyo, ketchup, bbq sauce, cheddar sauce, chipshotdog\",\"image_url\":\"/assets/Menu-items/Sandwiches/crispy-hotdog.jpeg\",\"category\":\"Sandwiches\",\"imageUrl\":\"/assets/Menu-items/Sandwiches/crispy-hotdog.jpeg\",\"quantity\":3}]', 32.00, 'Pending', '2026-01-01 20:26:49'),
(3, 'reemalyaman@gmail.com', '[{\"id\":7,\"name\":\"Special Crunchy\",\"price\":\"7.00\",\"ingredients\":\"pickles, tomato, iceberg, crunchy chicken breast, mozerlla cheese, turkey, bbq sauce, avoca sauce, couktail sauce, cheddar sauce, chipshotdog\",\"image_url\":\"/assets/Menu-items/ChickenBurger/special-crunchy.jpeg\",\"category\":\"ChickenBurger\",\"imageUrl\":\"/assets/Menu-items/ChickenBurger/special-crunchy.jpeg\",\"quantity\":1}]', 7.00, 'Pending', '2026-01-01 20:28:19'),
(4, 'mohammad@gmail.com', '[{\"id\":29,\"name\":\"Cheese Fries Box\",\"price\":\"5.00\",\"ingredients\":\"Crispy fries topped with melted mozerlla cheese, cheddar sauce, bbq sauce, chipshotdog\",\"image_url\":\"/assets/Menu-items/Fries/cheese-fries-box.jpeg\",\"category\":\"Fries\",\"imageUrl\":\"/assets/Menu-items/Fries/cheese-fries-box.jpeg\",\"quantity\":1},{\"id\":27,\"name\":\"Widges Fries Box\",\"price\":\"3.00\",\"ingredients\":\"Widges fries, dip cheddar\",\"image_url\":\"/assets/Menu-items/Fries/widges-fries-box.jpeg\",\"category\":\"Fries\",\"imageUrl\":\"/assets/Menu-items/Fries/widges-fries-box.jpeg\",\"quantity\":1}]', 8.00, 'Pending', '2026-01-01 22:09:27');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `ingredients` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `ingredients`, `image_url`, `category`) VALUES
(1, 'Classic Chicken', 5.50, 'Tomato, onion, pickles, iceberg, chicken grilled breast, avoca sauce, cocktail sauce, cheddar sauce', '/assets/Menu-items/ChickenBurger/classic-chicken.jpeg', 'ChickenBurger'),
(2, 'BBQ Chicken', 5.50, 'Tomata, onion, pickles, iceberg, chicken grilled breast, avoca sauce, couktail sauce, bbq sauce, cheddar sauce', '/assets/Menu-items/ChickenBurger/BBQ-chicken.jpeg', 'ChickenBurger'),
(3, 'Cheese Chicken', 5.50, 'fries, coleslaw, chicken grilled breast, mozerlla cheese, mozerlla slice, cheddar slice, ketchup sauce, cheddar sauce, couktail sauce', '/assets/Menu-items/ChickenBurger/cheese-chicken.jpeg', 'ChickenBurger'),
(4, 'Spicy Chicken', 5.50, 'jalapeno, tomato, iceberg, chicken grilled breast, mexican sauce, avoca sauce, cheddar sauce', '/assets/Menu-items/ChickenBurger/spicy-chicken.jpeg', 'ChickenBurger'),
(5, 'Chicken Mushroom', 6.00, 'iceberg, chicken grill breast, mozerlla cheese, mushroom sauce, meyo sauce', '/assets/Menu-items/ChickenBurger/chicken-mushroom.jpeg', 'ChickenBurger'),
(6, 'Crunchy Chicken', 6.00, 'pickles, tomato, iceberg, crunchy chicken breast, avoca sauce, couktail sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/ChickenBurger/crunchy-chicken.jpeg', 'ChickenBurger'),
(7, 'Special Crunchy', 7.00, 'pickles, tomato, iceberg, crunchy chicken breast, mozerlla cheese, turkey, bbq sauce, avoca sauce, couktail sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/ChickenBurger/special-crunchy.jpeg', 'ChickenBurger'),
(8, 'Zinger', 6.00, 'jalapeno, tomato, iceberg, crunchy chicken breast, mexican sauce, avoca sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/ChickenBurger/zinger.jpeg', 'ChickenBurger'),
(9, 'Escalope Burger', 5.00, 'pickeles, fries, escalope chicken breast, coleslaw, garlic sauce, couktail sauce', '/assets/Menu-items/ChickenBurger/escalope-burger.jpeg', 'ChickenBurger'),
(10, 'Double Chicken Double Cheese', 8.50, 'Tomata, pickles, iceberg, 2 chicken grill breasts, mozerlla cheese, mozerlla slice, cheddar slice, avoca sauce, couktail sauce, cheddar sauce', '/assets/Menu-items/ChickenBurger/double-chicken-double-cheese.jpeg', 'ChickenBurger'),
(11, 'Beef BBQ', 6.00, 'Tomata, onion, pickles, iceberg, avoca sauce, couktail sauce, bbq sauce, cheddar sauce, grilled beef', '/assets/Menu-items/BeefBurger/Beef-BBQ.jpeg', 'BeefBurger'),
(12, 'Cheese Beef', 6.50, 'fries, coleslaw, grilled beef, mozerlla cheese, mozerlla slice, cheddar slice, ketchup sauce, cheddar sauce, couktail sauce', '/assets/Menu-items/BeefBurger/cheese-beef.jpeg', 'BeefBurger'),
(13, 'Lebanese Burger', 6.00, 'fries, coleslaw, grilled beef, ketchup sauce', '/assets/Menu-items/BeefBurger/lebanese-burger.jpeg', 'BeefBurger'),
(14, 'Beef Mushroom', 8.00, 'iceberg, grilled beef, mozerlla cheese, mushroom sauce, meyo sauce', '/assets/Menu-items/BeefBurger/beef-mushroom.jpeg', 'BeefBurger'),
(15, 'Special Beef', 8.00, 'pickles, tomato, iceberg, grilled beef, mozerlla cheese, turkey, bbq sauce, avoca sauce, couktail sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/BeefBurger/special-beef.jpeg', 'BeefBurger'),
(16, 'Double Beef Double Cheese', 11.00, 'Tomata, pickles, iceberg, 2 grilled Beef, mozerlla cheese, mozerlla slice, cheddar slice, avoca sauce, couktail sauce, cheddar sauce', '/assets/Menu-items/BeefBurger/double-beef-double-cheese.jpeg', 'BeefBurger'),
(17, 'Steak', 7.00, 'mozerlla cheese, corn, chipshotdog, meyo, spicy cooked beef', '/assets/Menu-items/Sandwiches/steak.jpeg', 'Sandwiches'),
(18, 'Philadelphia', 7.00, 'onions, peppers, fresh mushroom, mozerlla cheese, corn, meyo', '/assets/Menu-items/Sandwiches/Philadelphia.jpeg', 'Sandwiches'),
(19, 'Classic Hotdog', 6.00, 'grilled hotdog, onion, pepper, pickles, khardal, meyo, ketchup, bbq sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/Sandwiches/classic-hotdog.jpeg', 'Sandwiches'),
(20, 'Crispy Hotdog', 6.00, 'breaded hotdog, onion, pepper, pickles, khardal, meyo, ketchup, bbq sauce, cheddar sauce, chipshotdog', '/assets/Menu-items/Sandwiches/crispy-hotdog.jpeg', 'Sandwiches'),
(21, 'Boneless', 7.00, 'tomato, pickels, iceberg, mozerlla cheese, turkey, cheddar slice, crispy, chipshotdog, bbq sauce, couktail sauce', '/assets/Menu-items/Sandwiches/Boneless.jpeg', 'Sandwiches'),
(22, 'Fries Sandwich', 3.50, 'fries, coleslaw, ketchup, garlic, pickles, corn', '/assets/Menu-items/Sandwiches/fries-sandwich.jpeg', 'Sandwiches'),
(23, 'Fajita', 6.50, 'onions, peppers, mozerlla cheese, corn, avoca sauce', '/assets/Menu-items/Sandwiches/fajita.jpeg', 'Sandwiches'),
(24, 'Rosto', 7.00, 'tomato, iceberg, pickles, khardal, corn, meyo', '/assets/Menu-items/Sandwiches/Rosto.jpeg', 'Sandwiches'),
(25, 'Sojok', 5.00, 'pickles, tomato, iceberg, garlic, lemon', '/assets/Menu-items/Sandwiches/sojok.jpeg', 'Sandwiches'),
(26, 'Fries Box', 3.00, 'fries, dip coukatil sauce, dip ketchup', '/assets/Menu-items/Fries/fries-box.jpeg', 'Fries'),
(27, 'Widges Fries Box', 3.00, 'Widges fries, dip cheddar', '/assets/Menu-items/Fries/widges-fries-box.jpeg', 'Fries'),
(28, 'Curly Fries Box', 4.50, 'Curly fries, dip cheddar', '/assets/Menu-items/Fries/curly-fries-box.jpeg', 'Fries'),
(29, 'Cheese Fries Box', 5.00, 'Crispy fries topped with melted mozerlla cheese, cheddar sauce, bbq sauce, chipshotdog', '/assets/Menu-items/Fries/cheese-fries-box.jpeg', 'Fries');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'reemz@hallal.com', 'reemz123', 'admin'),
(8, 'reemo@gmail.com', 'lskneflan324', 'user'),
(9, 'ramiyounis@gmail.com', '123456', 'user'),
(10, 'reemalyaman@gmail.com', '223344', 'user'),
(11, 'mohammad@gmail.com', '8765432', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
