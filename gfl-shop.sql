-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Июн 08 2021 г., 17:23
-- Версия сервера: 8.0.25-0ubuntu0.20.04.1
-- Версия PHP: 7.3.28-2+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `gfl-shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id_cart` int NOT NULL,
  `id_product` int DEFAULT NULL,
  `product_options` int DEFAULT NULL,
  `product_count` int DEFAULT '0',
  `product_price` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id_category` int NOT NULL,
  `category_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `categiry_description` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `categiry_description`) VALUES
(1, 'Cat 1', 'Description for cat 1'),
(2, 'Cat 2', 'Description for cat 2'),
(11, 'Cat3', 'hdksjhf hdsjaf gasdgfkjgas'),
(12, 'Cat333333', 'hdksjhf hdsjaf gasdgfkjgas'),
(13, 'Cat3333вввв33', 'hdksjhf hdsjaf gasdgfkjgas');

-- --------------------------------------------------------

--
-- Структура таблицы `delivery_method`
--

CREATE TABLE `delivery_method` (
  `id_delivery_method` int NOT NULL,
  `name_delivery` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `delivery_method`
--

INSERT INTO `delivery_method` (`id_delivery_method`, `name_delivery`) VALUES
(1, 'Новая Почта'),
(2, 'УкрПочта');

-- --------------------------------------------------------

--
-- Структура таблицы `image`
--

CREATE TABLE `image` (
  `id_image` int NOT NULL,
  `image_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `image`
--

INSERT INTO `image` (`id_image`, `image_name`) VALUES
(25, 'c7f39e22-22ec-48e6-8274-48465b003d3f.jpg'),
(26, 'b168952d-391f-4188-9d04-57643326f52c.jpg'),
(27, '9dc23660-1d3b-424b-9c7c-502381121e07.jpg'),
(28, '38a59799-85f8-4bee-a1e9-bca4b73c32ca.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int NOT NULL,
  `id_order_details` int DEFAULT NULL,
  `id_client` int DEFAULT NULL,
  `date_of_order` date DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `payment_method` int DEFAULT NULL,
  `delivery_method` int DEFAULT NULL,
  `order_full_price` int DEFAULT NULL,
  `order_comments` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `id_order_details`, `id_client`, `date_of_order`, `order_status`, `payment_method`, `delivery_method`, `order_full_price`, `order_comments`) VALUES
(1, 1, 2, '2021-05-06', 2, 2, 1, 100, 'тест');

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

CREATE TABLE `order_details` (
  `id_order_details` int NOT NULL,
  `id_product` int DEFAULT NULL,
  `product_options` int DEFAULT NULL,
  `product_count` int DEFAULT NULL,
  `product_price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `order_details`
--

INSERT INTO `order_details` (`id_order_details`, `id_product`, `product_options`, `product_count`, `product_price`) VALUES
(1, 1, 1, 1, 50);

-- --------------------------------------------------------

--
-- Структура таблицы `order_status`
--

CREATE TABLE `order_status` (
  `id_order_status` int NOT NULL,
  `name_order_status` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `order_status`
--

INSERT INTO `order_status` (`id_order_status`, `name_order_status`) VALUES
(1, 'Принят'),
(2, 'Ожидает');

-- --------------------------------------------------------

--
-- Структура таблицы `payment_method`
--

CREATE TABLE `payment_method` (
  `id_payment_method` int NOT NULL,
  `name_payment_method` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `payment_method`
--

INSERT INTO `payment_method` (`id_payment_method`, `name_payment_method`) VALUES
(1, 'PayPal'),
(2, 'MasterCard');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id_product` int NOT NULL,
  `product_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `product_description` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `product_show` set('NO','YES') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'NO',
  `product_count` int DEFAULT NULL,
  `product_keywords` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `product_structure` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id_product`, `product_name`, `product_description`, `product_price`, `product_show`, `product_count`, `product_keywords`, `product_structure`) VALUES
(1, 'Футболка 1', 'охрененная', 100, 'YES', 10, 'футболка, одежда', 1),
(4, 'Футболка 2', 'Хорошая', 10, 'NO', 50, 'фут', 1),
(5, 'Футболка 3', 'плохаяб китайская', 1, 'YES', 100000, 'не покупать', 2),
(37, 'prod3', 'dasdasdasdsdadasd', 1, 'YES', 22, 'asdad asdasd', 2),
(38, 'prod3', 'dasdasdasdsdadasd', 1, 'YES', 22, 'asdad asdasd', 2),
(39, 'prod3', 'dasdasdasdsdadasd', 1, 'YES', 22, 'asdad asdasd', 2),
(40, 'prod3', 'dasdasdasdsdadasd', 1, 'YES', 22, 'asdad asdasd', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `product_category`
--

CREATE TABLE `product_category` (
  `id_product` int DEFAULT NULL,
  `id_category` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_category`
--

INSERT INTO `product_category` (`id_product`, `id_category`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `product_color`
--

CREATE TABLE `product_color` (
  `id_color` int NOT NULL,
  `color_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `color_code` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_color`
--

INSERT INTO `product_color` (`id_color`, `color_name`, `color_code`) VALUES
(1, 'Цвет 1', ''),
(2, 'Цвет 2', ''),
(3, 'Цвет 3', ''),
(4, 'Цвет 4', '');

-- --------------------------------------------------------

--
-- Структура таблицы `product_gallery`
--

CREATE TABLE `product_gallery` (
  `id_product` int DEFAULT NULL,
  `id_image` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_gallery`
--

INSERT INTO `product_gallery` (`id_product`, `id_image`) VALUES
(1, 27),
(4, 28);

-- --------------------------------------------------------

--
-- Структура таблицы `product_options`
--

CREATE TABLE `product_options` (
  `id_options` int NOT NULL,
  `id_product` int DEFAULT NULL,
  `product_type` int DEFAULT NULL,
  `product_color` int DEFAULT NULL,
  `product_size` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_options`
--

INSERT INTO `product_options` (`id_options`, `id_product`, `product_type`, `product_color`, `product_size`) VALUES
(1, 1, 1, 1, 1),
(2, 4, 1, 4, 4),
(3, 1, 1, 1, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `product_size`
--

CREATE TABLE `product_size` (
  `id_size` int NOT NULL,
  `size_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_size`
--

INSERT INTO `product_size` (`id_size`, `size_name`) VALUES
(1, 'XXXL'),
(2, 'XXL'),
(3, 'XL'),
(4, 'L'),
(5, 'M'),
(6, 'S');

-- --------------------------------------------------------

--
-- Структура таблицы `product_type`
--

CREATE TABLE `product_type` (
  `id_type` int NOT NULL,
  `type_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_type`
--

INSERT INTO `product_type` (`id_type`, `type_name`) VALUES
(2, 'Женская'),
(1, 'Мужская');

-- --------------------------------------------------------

--
-- Структура таблицы `structure`
--

CREATE TABLE `structure` (
  `id_structure` int NOT NULL,
  `structure_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `structure`
--

INSERT INTO `structure` (`id_structure`, `structure_name`) VALUES
(1, 'Хлопок'),
(2, 'Шерсть');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `user_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `user_password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `user_phone` int DEFAULT NULL,
  `id_status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `user_name`, `user_email`, `user_password`, `user_phone`, `id_status`) VALUES
(1, 'Admin', 'test@test.com', 'admin', 123456789, 1),
(2, 'Иван', 'user@test.com', 'user', 234567899, 2),
(62, 'admin', 'admin', '$2b$05$/TZoQLF0czmPFTRjjTgmwOs4zOoNH0TJ1NnZjmcTUhoovDrvI7oQu', 12345, 2),
(63, 'dimadima', 'dimadima', '$2b$05$CEr6U9d35jWsLfPmqnfj9eYcpKhU6zRa9nstIoB5s1VV9ZCIH6OSS', 12312321, 2),
(64, 'dimadimadima', 'dimadimadima', '$2b$05$xIZJdFDgtv5H4PxCPMqpP.jIA8YAlsOm.qSXjHvuT7q.To17icx6q', 32131313, 2),
(65, 'asdasd', 'adminssssdasdasd', '$2b$05$WbafGhLmcj9l/5nNCVI9pOOlOBsxdmwgkJgHay3nLxcyyGL9IotaO', 322424, 2),
(66, 'sdasdasdasdasd', 'adminasdasdasdasd', '$2b$05$2uyaMv.JjGHVPwCHpj06F.S5cYkhWM8eBRaVvrWcbYO2F/.15lbDy', 23423424, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users_status`
--

CREATE TABLE `users_status` (
  `id_status` int NOT NULL,
  `status_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users_status`
--

INSERT INTO `users_status` (`id_status`, `status_name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `fk_cart_products` (`id_product`),
  ADD KEY `fk_cart_product_options` (`product_options`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Индексы таблицы `delivery_method`
--
ALTER TABLE `delivery_method`
  ADD PRIMARY KEY (`id_delivery_method`);

--
-- Индексы таблицы `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `fk_orders_order_details` (`id_order_details`),
  ADD KEY `fk_orders_clients` (`id_client`),
  ADD KEY `fk_orders_order_status` (`order_status`),
  ADD KEY `fk_orders_payment_method` (`payment_method`),
  ADD KEY `fk_orders_delivery_method` (`delivery_method`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id_order_details`),
  ADD KEY `fk_order_details_products` (`id_product`),
  ADD KEY `fk_order_details` (`product_options`);

--
-- Индексы таблицы `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id_order_status`);

--
-- Индексы таблицы `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id_payment_method`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `fk_products_structure` (`product_structure`);

--
-- Индексы таблицы `product_category`
--
ALTER TABLE `product_category`
  ADD KEY `fk_product_category_products` (`id_product`),
  ADD KEY `fk_product_category_category` (`id_category`);

--
-- Индексы таблицы `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id_color`);

--
-- Индексы таблицы `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD KEY `fk_product_gallery_structure` (`id_product`),
  ADD KEY `fk_product_gallery_image` (`id_image`);

--
-- Индексы таблицы `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`id_options`),
  ADD KEY `fk_product_options_products` (`id_product`),
  ADD KEY `fk_product_type` (`product_type`),
  ADD KEY `fk_product_color` (`product_color`),
  ADD KEY `fk_product_size` (`product_size`);

--
-- Индексы таблицы `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id_size`);

--
-- Индексы таблицы `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id_type`),
  ADD UNIQUE KEY `unq_product_type_type_name` (`type_name`);

--
-- Индексы таблицы `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`id_structure`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_client_status` (`id_status`);

--
-- Индексы таблицы `users_status`
--
ALTER TABLE `users_status`
  ADD PRIMARY KEY (`id_status`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `delivery_method`
--
ALTER TABLE `delivery_method`
  MODIFY `id_delivery_method` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `image`
--
ALTER TABLE `image`
  MODIFY `id_image` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id_order_details` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id_order_status` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id_payment_method` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `product_color`
--
ALTER TABLE `product_color`
  MODIFY `id_color` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `product_options`
--
ALTER TABLE `product_options`
  MODIFY `id_options` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id_size` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id_type` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `structure`
--
ALTER TABLE `structure`
  MODIFY `id_structure` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT для таблицы `users_status`
--
ALTER TABLE `users_status`
  MODIFY `id_status` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_product_options` FOREIGN KEY (`product_options`) REFERENCES `product_options` (`id_options`),
  ADD CONSTRAINT `fk_cart_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_clients` FOREIGN KEY (`id_client`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `fk_orders_delivery_method` FOREIGN KEY (`delivery_method`) REFERENCES `delivery_method` (`id_delivery_method`),
  ADD CONSTRAINT `fk_orders_order_details` FOREIGN KEY (`id_order_details`) REFERENCES `order_details` (`id_order_details`),
  ADD CONSTRAINT `fk_orders_order_status` FOREIGN KEY (`order_status`) REFERENCES `order_status` (`id_order_status`),
  ADD CONSTRAINT `fk_orders_payment_method` FOREIGN KEY (`payment_method`) REFERENCES `payment_method` (`id_payment_method`);

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details` FOREIGN KEY (`product_options`) REFERENCES `product_options` (`id_options`),
  ADD CONSTRAINT `fk_order_details_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_structure` FOREIGN KEY (`product_structure`) REFERENCES `structure` (`id_structure`);

--
-- Ограничения внешнего ключа таблицы `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `fk_product_category_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `fk_product_category_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Ограничения внешнего ключа таблицы `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD CONSTRAINT `fk_product_gallery_image` FOREIGN KEY (`id_image`) REFERENCES `image` (`id_image`),
  ADD CONSTRAINT `fk_product_gallery_structure` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Ограничения внешнего ключа таблицы `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `fk_product_color` FOREIGN KEY (`product_color`) REFERENCES `product_color` (`id_color`),
  ADD CONSTRAINT `fk_product_options_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  ADD CONSTRAINT `fk_product_size` FOREIGN KEY (`product_size`) REFERENCES `product_size` (`id_size`),
  ADD CONSTRAINT `fk_product_type` FOREIGN KEY (`product_type`) REFERENCES `product_type` (`id_type`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_client_status` FOREIGN KEY (`id_status`) REFERENCES `users_status` (`id_status`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
