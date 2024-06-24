package controller

import (
	"log"
	"regexp"
	"strings"
	"github.com/Talfaza/bridgehub/database"
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
    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
      "message": "Could not convert the data!",
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
email, ok := data["email"].(string)
    if !ok {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "message": "Invalid email format",
        })
    }

    if !mailCheck(strings.TrimSpace(email)) {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "message": "Invalid Email",
        })
    }
  //checking if email is used 

  database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&dataUser)

  if dataUser.Id !=0 {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "message": "Email ALready Used",
      
        })
  }



  user := models.User{
    
    Username: data["username"].(string),
    Email: data["email"].(string),
  }




  user.HashingPass(data["password"].(string))
  err:=database.DB.Create(&user)
  if err != nil {
    log.Println(err)
  }
  return c.JSON(fiber.Map{
    "message": "Registration successful",
  })
}
