package routes

import (
	"github.com/Talfaza/bridgehub/controller"
	"github.com/Talfaza/bridgehub/middleware"
	"github.com/gofiber/fiber/v2"
)

func RouteSetup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Post("/api/logout", controller.LogoutUser)
	app.Use(middleware.IsAuthenticated)

	app.Post("/api/addserver", controller.AddServer)
	app.Get("/api/getservers", controller.GetServers)
	app.Post("/api/execute", controller.ExecuteCommand)
}
