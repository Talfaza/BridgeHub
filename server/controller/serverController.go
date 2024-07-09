package controller

import (
	"strconv"

	"github.com/Talfaza/bridgehub/database"
	"github.com/Talfaza/bridgehub/models"
	"github.com/gofiber/fiber/v2"
)

func AddServer(c *fiber.Ctx) error {
	var server models.Server
	if err := c.BodyParser(&server); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid input",
		})
	}

	userIDStr := c.Locals("userID").(string)
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to parse user ID",
		})
	}
	server.UserID = uint(userID)

	if err := database.DB.Create(&server).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to add server",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Server added successfully",
	})
}

func GetServers(c *fiber.Ctx) error {
	userIDStr := c.Locals("userID").(string)
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to parse user ID",
		})
	}

	var servers []models.Server
	if err := database.DB.Where("user_id = ?", userID).Find(&servers).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve servers",
		})
	}

	return c.JSON(fiber.Map{
		"servers": servers,
	})
}
