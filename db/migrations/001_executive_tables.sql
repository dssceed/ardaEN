-- สร้างตาราง executive_section (กลุ่ม/ระดับตำแหน่ง)
CREATE TABLE IF NOT EXISTS `executive_section` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name_th`    VARCHAR(255) NOT NULL,
  `name_en`    VARCHAR(255) DEFAULT NULL,
  `rank`       INT NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- สร้างตาราง executive_member (รายชื่อผู้บริหาร)
CREATE TABLE IF NOT EXISTS `executive_member` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `section_id`  INT NOT NULL,
  `title`       VARCHAR(50) DEFAULT NULL,
  `first_name`  VARCHAR(255) NOT NULL,
  `last_name`   VARCHAR(255) NOT NULL,
  `position_th` VARCHAR(500) DEFAULT NULL,
  `position_en` VARCHAR(500) DEFAULT NULL,
  `phone`       VARCHAR(50) DEFAULT NULL,
  `email`       VARCHAR(255) DEFAULT NULL,
  `image`       VARCHAR(500) DEFAULT NULL,
  `col_order`   INT NOT NULL DEFAULT 0,
  `row_order`   INT NOT NULL DEFAULT 0,
  `status`      TINYINT NOT NULL DEFAULT 1,
  `created_at`  DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_executive_member_section`
    FOREIGN KEY (`section_id`) REFERENCES `executive_section`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
