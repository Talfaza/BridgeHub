package controller

import (
  "github.com/gofiber/fiber/v2"
	"github.com/Talfaza/bridgehub/database"
	"github.com/Talfaza/bridgehub/models"
	"github.com/Talfaza/bridgehub/utils"
)


func AddServer(c *fiber.Ctx) error  {
  var server  models.Server  
if err := c.BodyParser(&server); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Could not convert the data!",
			"error":   err.Error(),
		})
	}
	if err := database.DB.Create(&server).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not create server invalid payload",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Server Added Succesfully !",
	})

}


func GetUserServers(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	userId, err := utils.ClaimParsing(cookie)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Not Logged In",
		})
	}

	var servers []models.Server
	if err := database.DB.Where("user_id = ?", userId).Find(&servers).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not retrieve servers",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"servers": servers,
	})
}
