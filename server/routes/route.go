package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/gofiber/fiber/v2"
)

func RouteSetup(app *fiber.App)  {

  app.Post("/api/register",controller.Register)

  
}
