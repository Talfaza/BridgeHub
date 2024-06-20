package controller

import (
	"fmt"
	"regexp"

	"github.com/Talfaza/bridgehub/models"
	"github.com/gofiber/fiber/v2"
)
func mailCheck(email string)bool  {
	regex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)

  return regex.MatchString(email)
}

func Register(c *fiber.Ctx) error  {
  var data map[string]interface{}// interface means any type 
  var dataUser models.User 

  if err := c.BodyParser(&data); err != nil {
    fmt.Println("Could not convert the data!")
    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
      "message": "Failed to parse request body",
      "error":   err.Error(),
    })
  }

  //pass


  password, ok := data["password"].(string)
  if !ok || len(password) <= 8 {
    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
        "message": "Password must be greater than 8 characters",
    })
  }


}
