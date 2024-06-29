package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/Talfaza/bridgehub/middleware"
	"github.com/gofiber/fiber/v2"
)

func RouteSetup(app *fiber.App) {

	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
  app.Use(middleware.IsAuth)
	app.Post("/api/execute",controller.ExecuteCommand)  
	app.Get("/api/dashboard",controller.Dashboard)      // Dashboard route
}
