package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/Talfaza/bridgehub/utils"
)

func IsAuth(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	if _, err := utils.ClaimParsing(cookie); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Not Logged In",
		})
	}
	return c.Next()
}

