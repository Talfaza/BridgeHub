package controller

import "github.com/gofiber/fiber/v2"

func Dashboard(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hello Dash",
	})
}

