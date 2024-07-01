package middleware

import (
    "github.com/gofiber/fiber/v2"
    "github.com/Talfaza/bridgehub/utils"
)

func IsAuth(c *fiber.Ctx) error {
    cookie := c.Cookies("jwt")
    if cookie == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "Not Logged In",
        })
    }

    _, err := utils.ClaimParsing(cookie)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "Invalid or expired token",
        })
    }

    return c.Next()
}
