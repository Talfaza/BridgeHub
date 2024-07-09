package middleware

import (
	"github.com/Talfaza/bridgehub/utils"
	"github.com/gofiber/fiber/v2"
)

func IsAuthenticated(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	userID, err := utils.ParseJWT(cookie)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Not logged in",
		})
	}
	c.Locals("userID", userID)
	return c.Next()
}
