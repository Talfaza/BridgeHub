package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/gofiber/fiber/v2"
)

func RouteSetup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Post("/api/execute", controller.ExecuteCommand)  // Ensure this line is present
}
