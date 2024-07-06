package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/Talfaza/bridgehub/utils"
	"log"
)

func IsAuth(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	log.Println("JWT Cookie:", cookie)
	userId, err := utils.ClaimParsing(cookie)
	if err != nil {
		log.Println("Error parsing JWT:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Not Logged In",
		})
	}
	log.Println("Authenticated user ID:", userId)
	return c.Next()
}
