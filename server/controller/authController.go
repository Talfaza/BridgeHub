package controller

import (
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/Talfaza/bridgehub/database"
	"github.com/Talfaza/bridgehub/models"
	"github.com/Talfaza/bridgehub/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)
func mailCheck(email string)bool  {
	regex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)

  return regex.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var dataUser models.User

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Could not convert the data!",
			"error":   err.Error(),
		})
	}

	// Validate and retrieve password
	password, ok := data["password"].(string)
	if !ok || len(password) < 8 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password must be at least 8 characters long",
		})
	}

	// Validate and retrieve email
	email, ok := data["email"].(string)
	if !ok || !mailCheck(strings.TrimSpace(email)) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid email format",
		})
	}

	// Check if email is already used
	database.DB.Where("email = ?", strings.TrimSpace(email)).First(&dataUser)
	if dataUser.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email already used",
		})
	}

	// Create new user
	user := models.User{
		Username: data["username"].(string),
		Email:    email,
	}

	if err := user.HashPassword(password); err != nil {

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to hash the password",
			"error":   err.Error(),
		})
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not create user",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Registration successful",
	})
}

func Login(c *fiber.Ctx) error  {
  var data map[string] string
	var dataUser models.User

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Could not convert the data!",
			"error":   err.Error(),
		})
	}
  database.DB.Where("email=?",data["email"]).First(&dataUser)

  if dataUser.ID == 0 {
   return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Email Doesn't exist",
		})

  }
  if err:= dataUser.ComparePassword(data["password"]);err!=nil{
    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Incorrect Password",
			"error":   err.Error(),
		})
  }

  token,err:= utils.GenerateJWT(strconv.Itoa(int(dataUser.ID)))
  if err != nil {
  	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could Not Generate JWT Token",
			"error":   err.Error(),
		})}

  cookie:= fiber.Cookie{
    Name: "jwt",
    Value: token,
    Expires: time.Now().Add(time.Hour*24),
    SameSite: "None", 
    Secure:   true, 
    HTTPOnly: true,
  }
  c.Cookie(&cookie) 
	return c.JSON(fiber.Map{
		"message": "Login successful",
    "user":dataUser,
    "token":token,
	})
}
  type Claims struct {
    jwt.StandardClaims
  }
func LogoutUser(c *fiber.Ctx) error {

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Logged out successfully",
	})
}
